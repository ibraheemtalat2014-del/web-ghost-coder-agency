import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory + persistent fallback lead store
interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  serviceType: string;
  budget: string;
  message: string;
  requirements?: string[];
  confirmationChannel?: 'whatsapp' | 'sms' | 'call' | 'all';
  verifiedVia?: 'phone' | 'email';
  createdAt: string;
  ip?: string;
  source?: string;
}

// In-memory OTP store (target -> { code, expiresAt, channel })
interface OtpEntry {
  code: string;
  target: string;
  channel: 'phone' | 'email';
  expiresAt: number;
}
const otpStore = new Map<string, OtpEntry>();
const leadsStore: ContactLead[] = [];
const LEADS_FILE = path.join(__dirname, 'leads_inquiries.json');

// Load existing leads if available
try {
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      leadsStore.push(...parsed);
    }
  }
} catch (e) {
  console.warn('Could not read leads file:', e);
}

function persistLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsStore, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to persist leads to file:', e);
  }
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    agency: 'Web Ghost Coder Agency',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Orders & Leads Inbox endpoint
app.get('/api/leads', (req: Request, res: Response) => {
  res.json({
    success: true,
    totalOrders: leadsStore.length,
    orders: leadsStore,
  });
});

// Helper: Normalize phone numbers for comparison
function normalizePhoneNumber(raw: string): string {
  return raw.replace(/[^0-9]/g, '');
}

const OWNER_PHONE_RAW = '03009464514';
const OWNER_PHONE_CLEAN = '923009464514';
const OWNER_PHONE_LOCAL = '03009464514';

// Endpoint: Send OTP to customer Phone or Email
app.post('/api/otp/send', (req: Request, res: Response) => {
  try {
    const { target, channel } = req.body; // channel: 'phone' | 'email'

    if (!target || typeof target !== 'string' || target.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number or email address for OTP delivery.',
      });
    }

    const cleanTarget = target.trim();

    if (channel === 'phone') {
      const cleanPhone = normalizePhoneNumber(cleanTarget);
      // Validate customer phone is not same as owner's phone
      if (
        cleanPhone === OWNER_PHONE_RAW ||
        cleanPhone === OWNER_PHONE_CLEAN ||
        cleanPhone.endsWith('3009464514')
      ) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number. Customer phone cannot be the owner/agency contact number (03009464514). Please enter your own valid personal or business phone number.',
        });
      }
      if (cleanPhone.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid 10-12 digit mobile phone number.',
        });
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanTarget)) {
        return res.status(400).json({
          success: false,
          message: 'Please enter a valid email address for OTP verification.',
        });
      }
      if (cleanTarget.toLowerCase() === 'ibraheemtalat2014@gmail.com') {
        return res.status(400).json({
          success: false,
          message: 'Customer email cannot be the owner email (ibraheemtalat2014@gmail.com). Please enter your own personal or business email.',
        });
      }
    }

    // Generate secure 6-digit numeric OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(cleanTarget.toLowerCase(), {
      code: otpCode,
      target: cleanTarget,
      channel: channel === 'phone' ? 'phone' : 'email',
      expiresAt,
    });

    console.log(`[OTP SENT] Channel: ${channel} | Target: ${cleanTarget} | Code: ${otpCode}`);

    return res.json({
      success: true,
      message: `A 6-digit verification code has been dispatched to your ${channel === 'phone' ? 'phone via SMS/WhatsApp' : 'email inbox'}.`,
      otpCode, // Returned for instant simulated testing in development
      expiresInSeconds: 600,
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    return res.status(500).json({ success: false, message: 'Failed to dispatch verification code.' });
  }
});

// Endpoint: Verify OTP code
app.post('/api/otp/verify', (req: Request, res: Response) => {
  try {
    const { target, code } = req.body;

    if (!target || !code) {
      return res.status(400).json({ success: false, message: 'Target and 6-digit code are required.' });
    }

    const cleanTarget = target.trim().toLowerCase();
    const cleanCode = code.toString().trim();

    const entry = otpStore.get(cleanTarget);
    if (!entry) {
      return res.status(400).json({
        success: false,
        message: 'No active verification code found for this destination. Please request a new code.',
      });
    }

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(cleanTarget);
      return res.status(400).json({
        success: false,
        message: 'This verification code has expired. Please request a fresh code.',
      });
    }

    if (entry.code !== cleanCode) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect 6-digit verification code. Please check and try again.',
      });
    }

    // Mark as verified
    return res.json({
      success: true,
      message: 'Verification successful! Identity verified.',
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ success: false, message: 'Failed to verify OTP code.' });
  }
});

// Real contact submission endpoint with owner validation, OTP check, & rich WhatsApp message payload
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      whatsapp,
      serviceType,
      budget,
      message,
      requirements,
      confirmationChannel,
      verifiedVia,
      source,
    } = req.body;

    // Strict validation
    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    } else if (email.trim().toLowerCase() === 'ibraheemtalat2014@gmail.com') {
      errors.email = 'Customer email cannot be the owner/agency email.';
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      errors.phone = 'Please provide a valid phone number.';
    } else {
      const cleanPhone = normalizePhoneNumber(phone);
      if (
        cleanPhone === OWNER_PHONE_RAW ||
        cleanPhone === OWNER_PHONE_CLEAN ||
        cleanPhone.endsWith('3009464514')
      ) {
        errors.phone = 'Customer phone number cannot be the owner number (03009464514). Please enter your own valid number.';
      }
    }

    if (!whatsapp || typeof whatsapp !== 'string' || whatsapp.trim().length < 7) {
      errors.whatsapp = 'Please provide your WhatsApp number for quick project updates.';
    } else {
      const cleanWa = normalizePhoneNumber(whatsapp);
      if (
        cleanWa === OWNER_PHONE_RAW ||
        cleanWa === OWNER_PHONE_CLEAN ||
        cleanWa.endsWith('3009464514')
      ) {
        errors.whatsapp = 'Customer WhatsApp cannot be the owner WhatsApp (03009464514). Please enter your personal/business WhatsApp.';
      }
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      errors.message = 'Please provide project specifications in at least 5 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors,
      });
    }

    // Generate unique inquiry ID
    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    const newLead: ContactLead = {
      id: leadId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
      serviceType: serviceType?.trim() || 'General Web Development',
      budget: budget?.trim() || 'Not specified',
      message: message.trim(),
      requirements: Array.isArray(requirements) ? requirements : [],
      confirmationChannel: confirmationChannel || 'whatsapp',
      verifiedVia: verifiedVia || 'phone',
      createdAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress,
      source: source || 'Google Ads Landing / Website Contact Form',
    };

    leadsStore.unshift(newLead);
    persistLeads();

    // Prepare rich WhatsApp text message payload formatted for Owner Ibraheem Talat (03009464514)
    const cleanOwnerWhatsApp = '923009464514';
    const reqList = newLead.requirements && newLead.requirements.length > 0
      ? `\n📋 *Custom Requirements:*\n${newLead.requirements.map((r) => ` • ${r}`).join('\n')}`
      : '';

    const waText = encodeURIComponent(
      `🚨 *NEW CLIENT ORDER RECEIVED — Web Ghost Coder Agency*\n\n` +
      `🆔 *Order ID:* ${leadId}\n` +
      `👤 *Client Name:* ${newLead.fullName}\n` +
      `📞 *Client Phone:* ${newLead.phone}\n` +
      `💬 *Client WhatsApp:* ${newLead.whatsapp}\n` +
      `✉️ *Client Email:* ${newLead.email}\n\n` +
      `🛠️ *Service Ordered:* ${newLead.serviceType}\n` +
      `💰 *Budget / Price:* ${newLead.budget}\n` +
      `⚡ *Turnaround:* 1 - 2 Days Guaranteed\n` +
      `🔔 *Preferred Confirmation:* ${newLead.confirmationChannel?.toUpperCase() || 'WHATSAPP'}\n` +
      `🛡️ *OTP Verified Via:* ${newLead.verifiedVia?.toUpperCase() || 'PHONE'}\n` +
      `${reqList}\n\n` +
      `📝 *Client Message & Notes:*\n"${newLead.message}"\n\n` +
      `_Submitted: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} PKT_\n` +
      `_"Your choice is our code."_`
    );

    const whatsappDirectUrl = `https://wa.me/${cleanOwnerWhatsApp}?text=${waText}`;

    // Customer confirmation details
    const confirmationText = `Your order (${leadId}) is confirmed! Our CEO Ibraheem Talat has received your specifications and will reach out via ${newLead.confirmationChannel?.toUpperCase() || 'WhatsApp'} within your active ordering hours (4 PM - 8 PM PKT).`;

    return res.status(201).json({
      success: true,
      leadId,
      message: confirmationText,
      data: {
        leadId,
        receivedAt: newLead.createdAt,
        whatsappDirectUrl,
        ownerWhatsAppText: decodeURIComponent(waText),
        confirmationChannel: newLead.confirmationChannel,
      },
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your request. Please message us directly on WhatsApp at 03009464514.',
    });
  }
});

// Quick Instant Quote / Audit Request Endpoint
app.post('/api/quote-estimator', (req: Request, res: Response) => {
  const { serviceType, pages, features } = req.body;

  let basePriceUSD = 94;
  let basePricePKR = 25999;

  if (serviceType === 'landing') {
    basePriceUSD = 65;
    basePricePKR = 17999;
  } else if (serviceType === 'school') {
    basePriceUSD = 144;
    basePricePKR = 40000;
  } else if (serviceType === 'hospital') {
    basePriceUSD = 141;
    basePricePKR = 38999;
  } else if (serviceType === 'custom') {
    basePriceUSD = 119;
    basePricePKR = 32999;
  }

  const pageCount = Number(pages) || 5;
  const pageAddon = Math.max(0, pageCount - 3) * 5;
  const featuresCount = Array.isArray(features) ? features.length : 0;
  const featureAddon = featuresCount * 15;

  const estimatedTotalUSD = basePriceUSD + pageAddon + featureAddon;
  const estimatedTotalPKR = basePricePKR + (pageAddon + featureAddon) * 280;

  res.json({
    success: true,
    estimatedTotalUSD,
    estimatedTotalPKR,
    turnaroundDays: '1 to 2 business days',
    includedItems: [
      '1 - 2 Days Rapid Delivery Guarantee',
      '100% Responsive Modern Coder Architecture',
      '95+ Google PageSpeed & Technical SEO',
      'Direct WhatsApp Developer Hotline (03009464514)',
      'WhatsApp and call orders preferred - Your choice is our code',
    ],
  });
});

// Retrieve inquiries (for internal review)
app.get('/api/leads', (req: Request, res: Response) => {
  res.json({
    success: true,
    count: leadsStore.length,
    leads: leadsStore.slice(0, 50),
  });
});

// ==========================================
// CLIENT PORTAL DATA & ENDPOINTS
// ==========================================

interface PortalClient {
  id: string;
  name: string;
  email: string;
  password: string; // Plain demonstration password for mock/demo auth
  organization: string;
  role: string;
  projectId: string;
}

interface PortalProject {
  id: string;
  title: string;
  category: string;
  organization: string;
  clientName: string;
  progressPercent: number;
  currentPhase: string;
  startDate: string;
  targetLaunchDate: string;
  projectManager: {
    name: string;
    role: string;
    email: string;
    phone: string;
    whatsapp: string;
    status: string;
  };
  milestones: {
    id: string;
    stepNumber: string;
    title: string;
    description: string;
    status: 'completed' | 'in_progress' | 'upcoming';
    date: string;
    deliverables: string[];
  }[];
}

interface PortalDocument {
  id: string;
  projectId: string;
  title: string;
  category: 'Specification' | 'Design & Wireframe' | 'Deliverable' | 'Security & Handover';
  fileType: 'pdf' | 'doc' | 'link' | 'zip';
  fileSize: string;
  updatedAt: string;
  url: string;
  description: string;
}

interface PortalMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'project_manager';
  text: string;
  timestamp: string;
}

const PORTAL_CLIENTS: PortalClient[] = [
  {
    id: 'client-1',
    name: 'Prof. Sarah Munir',
    email: 'sarah.munir@oakwood.edu',
    password: 'password123',
    organization: 'Oakwood Educational Academy',
    role: 'Academic Principal',
    projectId: 'proj-oakwood',
  },
  {
    id: 'client-2',
    name: 'Dr. Hamza Tariq',
    email: 'dr.hamza@tariqclinic.com',
    password: 'password123',
    organization: 'Tariq Specialty Clinic & Diagnostic',
    role: 'Medical Director',
    projectId: 'proj-tariq',
  },
  {
    id: 'client-3',
    name: 'Bilal Khan',
    email: 'bilal@nexera.com',
    password: 'password123',
    organization: 'Nexera Commercial Logistics',
    role: 'Founder & CEO',
    projectId: 'proj-nexera',
  },
];

const PORTAL_PROJECTS: Record<string, PortalProject> = {
  'proj-oakwood': {
    id: 'proj-oakwood',
    title: 'Digital Academy Campus & Online Admissions Portal',
    category: 'School & Educational Academy',
    organization: 'Oakwood Educational Academy',
    clientName: 'Prof. Sarah Munir',
    progressPercent: 68,
    currentPhase: 'Stage 3: Clean Code & Admissions Module',
    startDate: 'October 24, 2026',
    targetLaunchDate: 'November 12, 2026',
    projectManager: {
      name: 'Ibraheem Talat',
      role: 'Lead Full-Stack Architect',
      email: 'ibraheemtalat2014@gmail.com',
      phone: '03009464514',
      whatsapp: '923009464514',
      status: 'Active · Online Now',
    },
    milestones: [
      {
        id: 'm1',
        stepNumber: '01',
        title: 'Institutional Discovery & Curriculum Audit',
        description: 'Audited academic calendar, course specifications, admission criteria, and parent requirements.',
        status: 'completed',
        date: 'Oct 25, 2026',
        deliverables: ['Information Architecture Map', 'Requirement Specification Doc v1.2'],
      },
      {
        id: 'm2',
        stepNumber: '02',
        title: 'Modern UI/UX Responsive Wireframing',
        description: 'Complete high-fidelity dark/light wireframes for student admission portal, noticeboard, and faculty directory.',
        status: 'completed',
        date: 'Oct 29, 2026',
        deliverables: ['Figma Design System', 'Parent Mobile Usability Review'],
      },
      {
        id: 'm3',
        stepNumber: '03',
        title: 'Clean Code Frontend & Admissions Engine',
        description: 'Implementing React components, student document upload handling, and direct counselor WhatsApp triage.',
        status: 'in_progress',
        date: 'Current Sprint (Due Nov 07)',
        deliverables: ['Staging Environment Sandbox', 'Student Form Validation Engine'],
      },
      {
        id: 'm4',
        stepNumber: '04',
        title: 'Cross-Device QA & Google PageSpeed Optimization',
        description: 'Performance testing on mobile 4G connections, accessibility compliance, and SEO audit.',
        status: 'upcoming',
        date: 'Nov 09, 2026',
        deliverables: ['Google PageSpeed 95+ Audit Report', 'Cross-Browser Test Matrix'],
      },
      {
        id: 'm5',
        stepNumber: '05',
        title: 'Production Cloud Deployment & Staff Walkthrough',
        description: 'Connecting custom academic domain, configuring SSL, and delivering administration guide.',
        status: 'upcoming',
        date: 'Nov 12, 2026',
        deliverables: ['Cloudflare SSL Certificate', 'Admin Operations Video Walkthrough'],
      },
    ],
  },
  'proj-tariq': {
    id: 'proj-tariq',
    title: 'Hospital Clinical Platform & Doctor Appointment Booking',
    category: 'Healthcare & Clinical Services',
    organization: 'Tariq Specialty Clinic & Diagnostic',
    clientName: 'Dr. Hamza Tariq',
    progressPercent: 88,
    currentPhase: 'Stage 4: QA & Doctor Booking Integration Verification',
    startDate: 'October 18, 2026',
    targetLaunchDate: 'November 08, 2026',
    projectManager: {
      name: 'Ibraheem Talat',
      role: 'Lead Full-Stack Architect',
      email: 'ibraheemtalat2014@gmail.com',
      phone: '03009464514',
      whatsapp: '923009464514',
      status: 'Active · Online Now',
    },
    milestones: [
      {
        id: 'tm1',
        stepNumber: '01',
        title: 'Clinical Workflow & Doctor Scheduling Architecture',
        description: 'Reviewed clinical specialties, diagnostic test catalog, and emergency triage priorities.',
        status: 'completed',
        date: 'Oct 19, 2026',
        deliverables: ['Doctor Availability Matrix', 'HIPAA Privacy Checklist'],
      },
      {
        id: 'tm2',
        stepNumber: '02',
        title: 'Patient-Centric UI/UX Prototyping',
        description: 'Reassuring clinical aesthetic design with high legibility and instant emergency hotline bar.',
        status: 'completed',
        date: 'Oct 23, 2026',
        deliverables: ['High-Fidelity Mobile UI Specs', 'One-Tap Emergency Flow'],
      },
      {
        id: 'tm3',
        stepNumber: '03',
        title: 'Booking Engine & WhatsApp Triage Development',
        description: 'Real-time calendar slotting with automated WhatsApp notifications to clinic reception.',
        status: 'completed',
        date: 'Oct 31, 2026',
        deliverables: ['Appointment Database Schema', 'SMS & WhatsApp Gateway'],
      },
      {
        id: 'tm4',
        stepNumber: '04',
        title: 'Security Hardening & Cross-Browser Speed Testing',
        description: 'Validating zero-latency appointment submission and responsive patient review.',
        status: 'in_progress',
        date: 'Current Sprint (Due Nov 06)',
        deliverables: ['Security Penetration Report', '98+ PageSpeed Verification'],
      },
      {
        id: 'tm5',
        stepNumber: '05',
        title: 'Final Domain Launch & Reception Training',
        description: 'DNS propagation, Google Business profile linking, and staff onboarding.',
        status: 'upcoming',
        date: 'Nov 08, 2026',
        deliverables: ['Production Cloud DNS', 'Staff Onboarding Session'],
      },
    ],
  },
  'proj-nexera': {
    id: 'proj-nexera',
    title: 'Enterprise Corporate Portal & Google Ads Lead Funnel',
    category: 'Corporate & Performance Marketing',
    organization: 'Nexera Commercial Logistics',
    clientName: 'Bilal Khan',
    progressPercent: 100,
    currentPhase: 'Stage 5: Live In Production & Continuous Support',
    startDate: 'October 08, 2026',
    targetLaunchDate: 'October 28, 2026',
    projectManager: {
      name: 'Ibraheem Talat',
      role: 'Lead Full-Stack Architect',
      email: 'ibraheemtalat2014@gmail.com',
      phone: '03009464514',
      whatsapp: '923009464514',
      status: 'Active · Online Now',
    },
    milestones: [
      {
        id: 'nm1',
        stepNumber: '01',
        title: 'Market Positioning & Google Ads Strategy',
        description: 'Formulated conversion hooks, competitive differentiation, and ad landing structure.',
        status: 'completed',
        date: 'Oct 09, 2026',
        deliverables: ['Conversion Architecture Spec', 'Competitor Speed Benchmark'],
      },
      {
        id: 'nm2',
        stepNumber: '02',
        title: 'High-Converting Landing Page Design',
        description: 'Bespoke corporate dark theme with interactive shipping cost estimator.',
        status: 'completed',
        date: 'Oct 14, 2026',
        deliverables: ['Interactive UX Wireframe', 'Conversion Copy Blueprint'],
      },
      {
        id: 'nm3',
        stepNumber: '03',
        title: 'React & Node.js Engine Development',
        description: 'Clean modular code with sub-second loading and Google Tag Manager integration.',
        status: 'completed',
        date: 'Oct 20, 2026',
        deliverables: ['Staging Deployment', 'Tracking Pixel Verification'],
      },
      {
        id: 'nm4',
        stepNumber: '04',
        title: 'Performance QA & Google Ads Pixel Verification',
        description: 'Rigorous mobile speed testing achieving 99/100 score on Google PageSpeed Insights.',
        status: 'completed',
        date: 'Oct 25, 2026',
        deliverables: ['99/100 PageSpeed Certificate', 'Google Ads Conversion Tag Live'],
      },
      {
        id: 'nm5',
        stepNumber: '05',
        title: 'Live Launch & Post-Launch Growth Warranty',
        description: 'Successfully deployed to global edge CDN with zero downtime.',
        status: 'completed',
        date: 'Oct 28, 2026',
        deliverables: ['100% Codebase Handover Repo', '30-Day Technical Warranty'],
      },
    ],
  },
};

const PORTAL_DOCUMENTS: Record<string, PortalDocument[]> = {
  'proj-oakwood': [
    {
      id: 'doc-1',
      projectId: 'proj-oakwood',
      title: 'Oakwood Academy Technical Requirements Specification (v1.2)',
      category: 'Specification',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      updatedAt: 'Oct 26, 2026',
      url: '#',
      description: 'Comprehensive functional requirements covering admission workflow, document upload rules, and security.',
    },
    {
      id: 'doc-2',
      projectId: 'proj-oakwood',
      title: 'Complete UI/UX Design System & Mobile Prototypes',
      category: 'Design & Wireframe',
      fileType: 'link',
      fileSize: 'Interactive',
      updatedAt: 'Oct 30, 2026',
      url: '#',
      description: 'High-fidelity Figma wireframes, color palette tokens, typography rules, and component states.',
    },
    {
      id: 'doc-3',
      projectId: 'proj-oakwood',
      title: 'Staging Environment Preview Access Link',
      category: 'Deliverable',
      fileType: 'link',
      fileSize: 'Live Sandbox',
      updatedAt: 'Nov 04, 2026',
      url: '#',
      description: 'Password-protected live staging server displaying the latest build of the academic portal.',
    },
    {
      id: 'doc-4',
      projectId: 'proj-oakwood',
      title: 'Academic Noticeboard & Circulars Data Schema',
      category: 'Specification',
      fileType: 'doc',
      fileSize: '480 KB',
      updatedAt: 'Nov 02, 2026',
      url: '#',
      description: 'Database schema and JSON structure for fast circulars, date sheets, and result announcements.',
    },
  ],
  'proj-tariq': [
    {
      id: 'tdoc-1',
      projectId: 'proj-tariq',
      title: 'Clinical System Architecture & Doctor Roster Matrix',
      category: 'Specification',
      fileType: 'pdf',
      fileSize: '3.1 MB',
      updatedAt: 'Oct 20, 2026',
      url: '#',
      description: 'Detailed specification of clinical departments, doctor consultation timings, and triage rules.',
    },
    {
      id: 'tdoc-2',
      projectId: 'proj-tariq',
      title: 'Emergency 1-Tap Triage & WhatsApp Integration Protocol',
      category: 'Specification',
      fileType: 'pdf',
      fileSize: '1.2 MB',
      updatedAt: 'Oct 24, 2026',
      url: '#',
      description: 'Routing logic for emergency clinical inquiries and direct WhatsApp patient assistance.',
    },
    {
      id: 'tdoc-3',
      projectId: 'proj-tariq',
      title: 'Staging Environment Sandbox Link (Doctor Booking Test)',
      category: 'Deliverable',
      fileType: 'link',
      fileSize: 'Live Sandbox',
      updatedAt: 'Nov 03, 2026',
      url: '#',
      description: 'Interactive test clinic portal to trial booking patient appointments and receiving notifications.',
    },
  ],
  'proj-nexera': [
    {
      id: 'ndoc-1',
      projectId: 'proj-nexera',
      title: 'Google Ads High-Converting Landing Page Strategy Guide',
      category: 'Specification',
      fileType: 'pdf',
      fileSize: '2.8 MB',
      updatedAt: 'Oct 10, 2026',
      url: '#',
      description: 'Conversion rate optimization blueprint, value propositions, and headline copy variations.',
    },
    {
      id: 'ndoc-2',
      projectId: 'proj-nexera',
      title: 'Google PageSpeed 99/100 Core Web Vitals Audit Report',
      category: 'Deliverable',
      fileType: 'pdf',
      fileSize: '1.6 MB',
      updatedAt: 'Oct 26, 2026',
      url: '#',
      description: 'Verified speed benchmark certifying sub-second Largest Contentful Paint (LCP) and zero layout shift.',
    },
    {
      id: 'ndoc-3',
      projectId: 'proj-nexera',
      title: 'Production SSL, DNS Records & Codebase Handover Archive',
      category: 'Security & Handover',
      fileType: 'zip',
      fileSize: '14.2 MB',
      updatedAt: 'Oct 28, 2026',
      url: '#',
      description: 'Complete React codebase source files, deployment scripts, environment keys, and DNS guidelines.',
    },
  ],
};

const PORTAL_MESSAGES: Record<string, PortalMessage[]> = {
  'proj-oakwood': [
    {
      id: 'msg-1',
      projectId: 'proj-oakwood',
      senderId: 'pm-1',
      senderName: 'Ibraheem Talat (Project Manager)',
      senderRole: 'project_manager',
      text: 'Welcome Prof. Sarah! We have officially commenced Stage 3 of the Oakwood Academy portal. The online admission forms and mobile verification are looking fantastic.',
      timestamp: 'Nov 04, 2026 · 10:15 AM',
    },
    {
      id: 'msg-2',
      projectId: 'proj-oakwood',
      senderId: 'client-1',
      senderName: 'Prof. Sarah Munir',
      senderRole: 'client',
      text: 'Thank you Ibraheem! Could you please ensure the admission form includes an option for parents to upload both PDF and JPEG document attachments?',
      timestamp: 'Nov 04, 2026 · 11:30 AM',
    },
    {
      id: 'msg-3',
      projectId: 'proj-oakwood',
      senderId: 'pm-1',
      senderName: 'Ibraheem Talat (Project Manager)',
      senderRole: 'project_manager',
      text: 'Absolutely! That is already enabled with real-time compression so parents on mobile connections can upload certificates in under 2 seconds without errors.',
      timestamp: 'Nov 04, 2026 · 11:45 AM',
    },
  ],
  'proj-tariq': [
    {
      id: 'tmsg-1',
      projectId: 'proj-tariq',
      senderId: 'pm-1',
      senderName: 'Ibraheem Talat (Project Manager)',
      senderRole: 'project_manager',
      text: 'Good morning Dr. Hamza! We completed testing the doctor scheduling engine. Would you like to review the staging preview today?',
      timestamp: 'Nov 05, 2026 · 09:20 AM',
    },
    {
      id: 'tmsg-2',
      projectId: 'proj-tariq',
      senderId: 'client-2',
      senderName: 'Dr. Hamza Tariq',
      senderRole: 'client',
      text: 'Yes Ibraheem, the demo was very smooth. The direct WhatsApp button for emergency triage works right away on my phone.',
      timestamp: 'Nov 05, 2026 · 09:40 AM',
    },
  ],
  'proj-nexera': [
    {
      id: 'nmsg-1',
      projectId: 'proj-nexera',
      senderId: 'client-3',
      senderName: 'Bilal Khan',
      senderRole: 'client',
      text: 'Ibraheem, our Google Ads campaign has been running for a week now on the new landing page. Conversion rate is up past 11%! Excellent work.',
      timestamp: 'Nov 02, 2026 · 04:15 PM',
    },
    {
      id: 'nmsg-2',
      projectId: 'proj-nexera',
      senderId: 'pm-1',
      senderName: 'Ibraheem Talat (Project Manager)',
      senderRole: 'project_manager',
      text: 'Thrilled to hear that Bilal! Your 30-day warranty is fully active, so message anytime if you want to test new headline variations.',
      timestamp: 'Nov 02, 2026 · 04:30 PM',
    },
  ],
};

// Portal Login Endpoint
app.post('/api/portal/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password to log in.',
    });
  }

  // Find user by email
  const user = PORTAL_CLIENTS.find(
    (c) => c.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (!user || user.password !== password.trim()) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please use one of the quick demo accounts or verify your login details.',
    });
  }

  const project = PORTAL_PROJECTS[user.projectId];

  return res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token: `PORTAL-TOKEN-${user.id}-${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.organization,
      role: user.role,
      projectId: user.projectId,
    },
    project,
  });
});

// Portal Project Status
app.get('/api/portal/projects/:id', (req: Request, res: Response) => {
  const project = PORTAL_PROJECTS[req.params.id];
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found.' });
  }
  return res.json({ success: true, project });
});

// Portal Documents
app.get('/api/portal/documents/:projectId', (req: Request, res: Response) => {
  const docs = PORTAL_DOCUMENTS[req.params.projectId] || [];
  return res.json({ success: true, documents: docs });
});

// Portal Messages
app.get('/api/portal/messages/:projectId', (req: Request, res: Response) => {
  const messages = PORTAL_MESSAGES[req.params.projectId] || [];
  return res.json({ success: true, messages });
});

// Post New Portal Message
app.post('/api/portal/messages', (req: Request, res: Response) => {
  const { projectId, senderId, senderName, senderRole, text } = req.body;

  if (!projectId || !text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Message content cannot be empty.' });
  }

  if (!PORTAL_MESSAGES[projectId]) {
    PORTAL_MESSAGES[projectId] = [];
  }

  const newMsg: PortalMessage = {
    id: `msg-${Date.now()}`,
    projectId,
    senderId: senderId || 'client',
    senderName: senderName || 'Client',
    senderRole: senderRole || 'client',
    text: text.trim(),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
  };

  PORTAL_MESSAGES[projectId].push(newMsg);

  // Pre-generate WhatsApp sync link for instant communication with PM
  const project = PORTAL_PROJECTS[projectId];
  const pmWhatsApp = project?.projectManager?.whatsapp || '923009464514';
  const waSyncText = encodeURIComponent(
    `[Client Portal Message - ${project?.organization || 'Project'}]\nFrom: ${newMsg.senderName}\n\n"${newMsg.text}"`
  );
  const whatsappSyncUrl = `https://wa.me/${pmWhatsApp}?text=${waSyncText}`;

  return res.status(201).json({
    success: true,
    message: newMsg,
    whatsappSyncUrl,
  });
});


async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    const VALID_PUBLIC_ROUTES = new Set([
      '/',
      '/about',
      '/website-for-shops-pakistan',
      '/website-development',
      '/web-design',
      '/ecommerce-development',
      '/business-websites',
      '/portfolio-websites',
      '/ai-website-development',
      '/custom-software-development',
      '/seo-services',
      '/portfolio',
      '/contact',
    ]);
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      const cleanPath = req.path.length > 1 ? req.path.replace(/\/+$/, '') : req.path;
      const status = VALID_PUBLIC_ROUTES.has(cleanPath) ? 200 : 404;
      res.status(status).sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Web Ghost Coder Agency Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
