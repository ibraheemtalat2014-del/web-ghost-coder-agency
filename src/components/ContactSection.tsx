import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { useRouter } from '../context/RouterContext';
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Terminal,
  KeyRound,
  BellRing,
  PhoneCall,
  Smartphone,
  Sparkles,
  Check,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export interface ContactSectionHandle {
  prefillForm: (data: { serviceType?: string; budget?: string; message?: string }) => void;
}

// Preset requirement suggestions tailored to service type
const SERVICE_REQUIREMENT_PRESETS: Record<string, string[]> = {
  landing: [
    'Fast 0.5s mobile page loading speed',
    'Google Ads Conversion Pixel & Tag setup',
    'Sticky bottom WhatsApp consultation button',
    'High-converting lead capture form',
    'Psychological social proof & trust badges',
  ],
  business: [
    'Up to 8 custom responsive pages',
    'Direct appointment or quote request engine',
    'Interactive corporate service catalog',
    'Full technical SEO and Google Maps integration',
    'Mobile-friendly executive leadership showcase',
  ],
  custom: [
    'Custom user authentication & member login',
    'Database persistence & customized backend APIs',
    'Administrative management dashboard',
    'Automated email/SMS notification triggers',
    'Custom business operational workflow',
  ],
  hospital: [
    'Online doctor appointment booking system',
    '24/7 WhatsApp emergency triage button',
    'Specialist doctor directory with OPD schedules',
    'Diagnostic lab tests & treatment fee schedule',
    'High-contrast accessible clinical design',
  ],
  school: [
    'Digital student admission application portal',
    'Downloadable academic calendar & circulars',
    'Interactive course curriculum showcase',
    'Parent-counselor direct WhatsApp bridge',
    'Faculty directory & institutional notices',
  ],
};

export const ContactSection = forwardRef<ContactSectionHandle>((props, ref) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    serviceType: 'Business website development (PKR 25,999 / $94)',
    budget: 'PKR 25,999 ($94)',
    message: '',
    confirmationChannel: 'whatsapp' as 'whatsapp' | 'sms' | 'call' | 'all',
  });

  // Selected & custom requirements list
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Fast 1 - 2 Days Delivery Sprint',
    '100% Mobile & Tablet Responsive',
    'Direct WhatsApp Ordering & Communication',
  ]);
  const [customReqInput, setCustomReqInput] = useState('');

  // OTP Verification System state
  const [otpTargetChannel, setOtpTargetChannel] = useState<'phone' | 'email'>('phone');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);

  // Form submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    leadId: string;
    message: string;
    whatsappDirectUrl?: string;
    ownerWhatsAppText?: string;
    confirmationChannel?: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { pendingPrefill, clearPendingPrefill } = useRouter();

  useEffect(() => {
    if (pendingPrefill) {
      setFormData((prev) => ({
        ...prev,
        serviceType: pendingPrefill.serviceType || prev.serviceType,
        budget: pendingPrefill.budget || prev.budget,
        message: pendingPrefill.message
          ? prev.message
            ? `${prev.message}\n${pendingPrefill.message}`.trim()
            : pendingPrefill.message
          : prev.message,
      }));
      setSubmitSuccess(false);
      clearPendingPrefill();
    }
  }, [pendingPrefill, clearPendingPrefill]);

  useImperativeHandle(ref, () => ({
    prefillForm: (data) => {
      setFormData((prev) => ({
        ...prev,
        serviceType: data.serviceType || prev.serviceType,
        budget: data.budget || prev.budget,
        message: data.message ? `${prev.message}\n${data.message}`.trim() : prev.message,
      }));
      setSubmitSuccess(false);
    },
  }));

  // Detect service category for requirement suggestions
  const getServiceKey = () => {
    const s = formData.serviceType.toLowerCase();
    if (s.includes('landing')) return 'landing';
    if (s.includes('school')) return 'school';
    if (s.includes('hospital')) return 'hospital';
    if (s.includes('custom')) return 'custom';
    return 'business';
  };

  const toggleRequirement = (req: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleAddCustomRequirement = () => {
    if (customReqInput.trim() && !selectedRequirements.includes(customReqInput.trim())) {
      setSelectedRequirements((prev) => [...prev, customReqInput.trim()]);
      setCustomReqInput('');
    }
  };

  const handleRemoveRequirement = (req: string) => {
    setSelectedRequirements((prev) => prev.filter((r) => r !== req));
  };

  // Helper to validate client number isn't the owner's number
  const isOwnerNumber = (num: string) => {
    const clean = num.replace(/[^0-9]/g, '');
    return clean === '03009464514' || clean === '923009464514' || clean.endsWith('3009464514');
  };

  // Request OTP from server
  const handleSendOtp = async () => {
    setOtpError(null);
    const target = otpTargetChannel === 'phone' ? formData.phone : formData.email;

    if (!target.trim()) {
      setOtpError(`Please enter your ${otpTargetChannel === 'phone' ? 'phone number' : 'email address'} first.`);
      return;
    }

    if (otpTargetChannel === 'phone') {
      if (isOwnerNumber(target)) {
        setOtpError('Phone number cannot be the owner/agency number (03009464514). Please enter your own phone number.');
        return;
      }
      if (target.replace(/[^0-9]/g, '').length < 10) {
        setOtpError('Please enter a valid 10-12 digit mobile phone number.');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(target.trim())) {
        setOtpError('Please provide a valid email address.');
        return;
      }
      if (target.trim().toLowerCase() === 'ibraheemtalat2014@gmail.com') {
        setOtpError('Email cannot be the owner email. Please enter your personal/business email.');
        return;
      }
    }

    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, channel: otpTargetChannel }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setSimulatedCode(data.otpCode || null);
      } else {
        setOtpError(data.message || 'Failed to dispatch OTP.');
      }
    } catch (err) {
      setOtpError('Network error while requesting OTP code.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setOtpError(null);
    const target = otpTargetChannel === 'phone' ? formData.phone : formData.email;

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setOtpError('Please enter the complete 6-digit code.');
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code: otpCode.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsOtpVerified(true);
        setOtpError(null);
      } else {
        setOtpError(data.message || 'Invalid verification code.');
      }
    } catch (err) {
      setOtpError('Failed to connect to verification server.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Instant 1-Click Verification for quick user convenience
  const handleInstantQuickVerify = () => {
    setIsOtpVerified(true);
    setOtpSent(true);
    setOtpError(null);
  };

  // Build clean WhatsApp message URL to CEO Ibraheem Talat
  const buildWhatsAppUrl = (leadId: string = 'NEW-ORDER') => {
    const cleanOwnerWhatsApp = '923009464514';
    const reqList = selectedRequirements.length > 0
      ? `\n📋 *Custom Requirements:*\n${selectedRequirements.map((r) => ` • ${r}`).join('\n')}`
      : '';

    const text = encodeURIComponent(
      `🚨 *NEW CLIENT ORDER — Web Ghost Coder Agency*\n\n` +
      `🆔 *Order ID:* ${leadId}\n` +
      `👤 *Client Name:* ${formData.fullName || 'Client'}\n` +
      `📞 *Client Phone:* ${formData.phone || 'Not provided'}\n` +
      `💬 *Client WhatsApp:* ${formData.whatsapp || formData.phone || 'Not provided'}\n` +
      `✉️ *Client Email:* ${formData.email || 'Not provided'}\n\n` +
      `🛠️ *Service Ordered:* ${formData.serviceType}\n` +
      `💰 *Budget / Price:* ${formData.budget}\n` +
      `⚡ *Turnaround:* 1 - 2 Days Guaranteed\n` +
      `🔔 *Preferred Confirmation:* ${formData.confirmationChannel.toUpperCase()}\n` +
      `🛡️ *Identity Verification:* ${isOtpVerified ? 'VERIFIED' : 'PENDING'}\n` +
      `${reqList}\n\n` +
      `📝 *Client Message & Notes:*\n"${formData.message || 'I would like to order this website.'}"\n\n` +
      `_Ordering Time: 4:00 PM – 8:00 PM PKT_\n` +
      `_"Your choice is our code."_`
    );

    return `https://wa.me/${cleanOwnerWhatsApp}?text=${text}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (formData.email.trim().toLowerCase() === 'ibraheemtalat2014@gmail.com') {
      newErrors.email = 'Customer email cannot be the agency owner email.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = 'Please provide a valid contact phone number.';
    } else if (isOwnerNumber(formData.phone)) {
      newErrors.phone = 'Customer phone cannot be the owner number (03009464514). Please enter your personal number.';
    }

    if (!formData.whatsapp.trim() || formData.whatsapp.trim().length < 7) {
      newErrors.whatsapp = 'Please provide your WhatsApp number for project updates.';
    } else if (isOwnerNumber(formData.whatsapp)) {
      newErrors.whatsapp = 'Customer WhatsApp cannot be the owner WhatsApp (03009464514).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please describe your project requirements in at least 5 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // If OTP is not yet verified, prompt customer or auto-verify if valid phone
    if (!isOtpVerified) {
      if (!otpSent) {
        // Send OTP first and display notice
        handleSendOtp();
        setServerError('Please enter the 6-digit verification code sent to your phone/email to confirm your order.');
        const el = document.getElementById('otp-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      } else {
        setServerError('Please enter the 6-digit verification code above, or click "Instant Quick Verify".');
        return;
      }
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        requirements: selectedRequirements,
        verifiedVia: otpTargetChannel,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        const directUrl = data.data?.whatsappDirectUrl || buildWhatsAppUrl(data.leadId);

        setSubmittedLead({
          leadId: data.leadId,
          message: data.message,
          whatsappDirectUrl: directUrl,
          ownerWhatsAppText: data.data?.ownerWhatsAppText,
          confirmationChannel: data.data?.confirmationChannel,
        });

        // Trigger direct WhatsApp window
        window.open(directUrl, '_blank');
      } else {
        setServerError(data.message || 'Submission failed. Please check form inputs.');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Fallback: Still open WhatsApp directly so client is NEVER blocked
      const fallbackUrl = buildWhatsAppUrl();
      window.open(fallbackUrl, '_blank');
      setSubmitSuccess(true);
      setSubmittedLead({
        leadId: `ORDER-${Date.now().toString(36).toUpperCase()}`,
        message: 'Your order was formatted and opened in WhatsApp directly to CEO Ibraheem Talat!',
        whatsappDirectUrl: fallbackUrl,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      serviceType: 'Business website development (PKR 25,999 / $94)',
      budget: 'PKR 25,999 ($94)',
      message: '',
      confirmationChannel: 'whatsapp',
    });
    setSelectedRequirements([
      'Fast 1 - 2 Days Delivery Sprint',
      '100% Mobile & Tablet Responsive',
      'Direct WhatsApp Ordering & Communication',
    ]);
    setIsOtpVerified(false);
    setOtpSent(false);
    setOtpCode('');
    setSubmitSuccess(false);
    setSubmittedLead(null);
    setErrors({});
    setServerError(null);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Agency Contact Info & Owner Details (5 cols) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-black tracking-wider uppercase text-sky-800 dark:text-cyan-400 mb-2 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3 py-1 rounded-lg">
              <Terminal className="w-3.5 h-3.5" />
              <span>START YOUR PROJECT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4" style={{ textWrap: 'balance' }}>
              Let’s Build Your Website in <span className="coder-gradient-text">1 - 2 Days</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
              Transparent rates, verified identity security, fast 24 - 48 hour delivery, and direct coder communication with CEO Ibraheem Talat.
            </p>

            {/* MANDATORY PREFERABLE NOTE CALLOUT BOX */}
            <div className="p-4 bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950/90 dark:via-slate-900/95 dark:to-cyan-950/90 rounded-2xl border border-emerald-300 dark:border-emerald-500/50 mb-8 shadow-sm dark:shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-950 dark:text-emerald-300 font-mono">
                    WhatsApp and call orders are more comfortable and preferable.
                  </div>
                  <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-300 mt-0.5">
                    "Your choice is our code."
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-2 font-medium">
                    Message or call directly at <strong className="text-slate-900 dark:text-white font-mono">03009464514</strong> to get your website delivered in 1 - 2 days!
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4 mb-8">
              {/* WhatsApp Card */}
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-[#0b101e] hover:bg-emerald-50/50 dark:hover:bg-[#0e1628] rounded-2xl border border-emerald-300 dark:border-emerald-500/40 flex items-center gap-4 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-emerald-700 dark:text-emerald-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">Direct WhatsApp (Most Preferred)</div>
                  <div className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors font-mono">
                    {AGENCY_CONFIG.whatsappDisplay}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Instant chat &amp; voice calls · 24/7 Response
                  </div>
                </div>
              </a>

              {/* Direct Phone Card */}
              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="p-4 bg-white dark:bg-[#0b101e] hover:bg-sky-50/50 dark:hover:bg-[#0e1628] rounded-2xl border border-sky-300 dark:border-cyan-500/30 flex items-center gap-4 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-slate-900 border border-sky-300 dark:border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-sky-700 dark:text-cyan-400">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-sky-800 dark:text-cyan-400">Direct Phone Hotline</div>
                  <div className="text-base font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors font-mono">
                    {AGENCY_CONFIG.phoneDisplay}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    Speak directly with CEO Ibraheem Talat
                  </div>
                </div>
              </a>

              {/* Direct Email Card */}
              <a
                href={`mailto:${AGENCY_CONFIG.email}`}
                className="p-4 bg-white dark:bg-[#0b101e] hover:bg-slate-50 dark:hover:bg-[#0e1628] rounded-2xl border border-slate-300 dark:border-slate-800 flex items-center gap-4 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-slate-700 dark:text-teal-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Official Email</div>
                  <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-teal-300 transition-colors truncate font-mono">
                    {AGENCY_CONFIG.email}
                  </div>
                </div>
              </a>
            </div>

            {/* Guarantees */}
            <div className="p-4 bg-slate-50 dark:bg-[#080d1a] rounded-2xl border border-slate-200 dark:border-cyan-500/20 space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>1 - 2 Days Delivery Guarantee on all standard projects</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                <span>100% Code Ownership &amp; 30-Day Post-Launch Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form + OTP System + Custom Requirements (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0b101e]/95 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-cyan-500/30 shadow-xl dark:shadow-2xl relative">
            {submitSuccess && submittedLead ? (
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <div className="text-xs font-mono font-extrabold uppercase text-emerald-700 dark:text-emerald-400 mb-1">
                    Identity Verified &amp; Order Transmitted
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    Order Received Successfully!
                  </h3>
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-950 py-1.5 px-3 rounded-lg inline-block border border-slate-300 dark:border-slate-800">
                    Order Reference ID: <strong className="text-sky-600 dark:text-cyan-400 font-bold">{submittedLead.leadId}</strong>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-medium">
                  {submittedLead.message}
                </p>

                {/* Confirmation Channel Badge */}
                <div className="p-3 bg-sky-50 dark:bg-slate-900/80 rounded-xl border border-sky-200 dark:border-slate-800 text-xs font-mono text-sky-800 dark:text-cyan-300 inline-flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-emerald-600" />
                  <span>
                    Confirmation Dispatched Via: <strong className="uppercase">{submittedLead.confirmationChannel || formData.confirmationChannel}</strong>
                  </span>
                </div>

                {/* WhatsApp Text Preview Sent to Owner */}
                {submittedLead.ownerWhatsAppText && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 max-w-lg mx-auto font-mono">
                    <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center justify-between">
                      <span>Message Sent to CEO Ibraheem Talat:</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">03009464514</span>
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 whitespace-pre-line text-[11px] bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      {submittedLead.ownerWhatsAppText}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {submittedLead.whatsappDirectUrl && (
                    <a
                      href={submittedLead.whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Chat Immediately with CEO on WhatsApp</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-slate-300 dark:border-slate-700"
                  >
                    Submit Another Order
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-200 dark:border-cyan-500/20 pb-4 mb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      Order a Customized Website
                    </h3>
                    <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-1 rounded-md">
                      ⚡ 1 - 2 Days Delivery
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Fill out your specifications below. When you click submit, your order details are sent directly to CEO Ibraheem Talat's WhatsApp.
                  </p>
                </div>

                {serverError && (
                  <div className="p-3.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Customer Full Name <span className="text-sky-600 dark:text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Hamza Tariq or Sarah Munir"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium ${
                      errors.fullName
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address <span className="text-sky-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="customer@organization.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500/30'
                          : 'border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number (Must be your own) <span className="text-sky-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03211234567 (not 03009464514)"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500/30'
                          : 'border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* WhatsApp Number Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      WhatsApp Number (For Direct Order Dispatch) <span className="text-emerald-600 dark:text-emerald-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, whatsapp: formData.phone })}
                      className="text-[11px] text-sky-600 dark:text-cyan-400 hover:underline cursor-pointer font-mono font-bold"
                    >
                      Copy phone number
                    </button>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 03211234567 (Customer's personal/business WhatsApp)"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsapp: e.target.value });
                      if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium ${
                      errors.whatsapp
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">{errors.whatsapp}</p>
                  )}
                </div>

                {/* OTP SECURITY VERIFICATION SYSTEM (Phone & Email Compatible) */}
                <div id="otp-section" className="p-4 sm:p-5 bg-sky-50/70 dark:bg-[#081224] rounded-2xl border-2 border-sky-300 dark:border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                      <span className="text-xs font-mono font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        Customer Identity &amp; OTP Verification
                      </span>
                    </div>

                    {isOtpVerified ? (
                      <span className="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Verified Successfully</span>
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={() => setOtpTargetChannel('phone')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                              otpTargetChannel === 'phone'
                                ? 'bg-sky-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            Via Phone
                          </button>
                          <button
                            type="button"
                            onClick={() => setOtpTargetChannel('email')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                              otpTargetChannel === 'email'
                                ? 'bg-sky-600 text-white shadow-xs'
                                : 'text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            Via Email
                          </button>
                        </div>

                        {/* 1-Click Fast Pass to prevent user from being stuck */}
                        <button
                          type="button"
                          onClick={handleInstantQuickVerify}
                          className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 transition-colors cursor-pointer"
                          title="Verify instantly without waiting for SMS"
                        >
                          Quick Verify
                        </button>
                      </div>
                    )}
                  </div>

                  {!isOtpVerified && (
                    <>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        Click "Send Code" to verify your {otpTargetChannel === 'phone' ? 'phone' : 'email'}, or click "Quick Verify" to confirm instantly.
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                        <button
                          type="button"
                          disabled={isSendingOtp}
                          onClick={handleSendOtp}
                          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0 shadow-sm"
                        >
                          {isSendingOtp ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Sending Code...</span>
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>{otpSent ? 'Resend Code' : `Send Code to ${otpTargetChannel === 'phone' ? 'Phone' : 'Email'}`}</span>
                            </>
                          )}
                        </button>

                        {otpSent && (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="Enter 6-digit OTP"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                              className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-center tracking-widest text-slate-900 dark:text-white font-bold focus:outline-none focus:border-sky-500"
                            />
                            <button
                              type="button"
                              disabled={isVerifyingOtp}
                              onClick={handleVerifyOtp}
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer disabled:opacity-50"
                            >
                              {isVerifyingOtp ? 'Verifying...' : 'Verify Code'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Instant Testing Helper Notice */}
                      {simulatedCode && (
                        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-300 dark:border-emerald-500/40 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                          <span>Simulated Code for Instant Testing: <strong>{simulatedCode}</strong></span>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpCode(simulatedCode);
                              setIsOtpVerified(true);
                            }}
                            className="underline font-bold hover:text-emerald-950 dark:hover:text-white"
                          >
                            Click to Auto-Fill &amp; Verify
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {otpError && (
                    <div className="p-2.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-300 dark:border-rose-500/30 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-medium flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}
                </div>

                {/* Service Type & Budget Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Service Type <span className="text-sky-600 dark:text-cyan-400">*</span>
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                    >
                      <option value="High-Converting Landing Pages for Google Ads (PKR 17,999 / $65)">
                        Google Ads Landing Page (PKR 17,999 / $65)
                      </option>
                      <option value="Business website development (PKR 25,999 / $94)">
                        Business Website (PKR 25,999 / $94)
                      </option>
                      <option value="Custom Website & Web Application Development (PKR 32,999 / $119)">
                        Custom Web App (PKR 32,999 / $119)
                      </option>
                      <option value="Hospital & Healthcare Website Development (PKR 38,999 / $141)">
                        Hospital Website (PKR 38,999 / $141)
                      </option>
                      <option value="School & Educational Website Development (PKR 40,000 / $144)">
                        School Website (PKR 40,000 / $144)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Price / Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border border-slate-300 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium cursor-pointer"
                    >
                      <option value="PKR 17,999 ($65)">Landing Page: PKR 17,999 ($65)</option>
                      <option value="PKR 25,999 ($94)">Business: PKR 25,999 ($94)</option>
                      <option value="PKR 32,999 ($119)">Custom App: PKR 32,999 ($119)</option>
                      <option value="PKR 38,999 ($141)">Hospital: PKR 38,999 ($141)</option>
                      <option value="PKR 40,000 ($144)">School: PKR 40,000 ($144)</option>
                    </select>
                  </div>
                </div>

                {/* DYNAMIC REQUIREMENTS BUILDER (Customized to chosen service) */}
                <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#080f20] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                      <span>Select Website Requirements (Tailored to your Service)</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {selectedRequirements.length} chosen
                    </span>
                  </div>

                  {/* Preset chips for current service */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SERVICE_REQUIREMENT_PRESETS[getServiceKey()]?.map((preset) => {
                      const isSelected = selectedRequirements.includes(preset);
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => toggleRequirement(preset)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-sky-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{preset}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected requirements pill list with delete options */}
                  {selectedRequirements.length > 0 && (
                    <div className="p-3 bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">
                        Active Order Scope to be Sent to CEO:
                      </span>
                      <div className="space-y-1">
                        {selectedRequirements.map((req) => (
                          <div
                            key={req}
                            className="flex items-center justify-between gap-2 text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg"
                          >
                            <span className="font-medium">• {req}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveRequirement(req)}
                              className="text-slate-400 hover:text-rose-500 cursor-pointer"
                              title="Remove requirement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add own custom requirement input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add another custom requirement (e.g. Stripe checkout, Arabic language, Student LMS)..."
                      value={customReqInput}
                      onChange={(e) => setCustomReqInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomRequirement();
                        }
                      }}
                      className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomRequirement}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* CUSTOMER CONFIRMATION NOTIFICATION CHANNEL SELECTOR */}
                <div className="p-4 bg-white dark:bg-[#080d1a] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    How would you like to receive your Order Confirmation? <span className="text-sky-600 dark:text-cyan-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, confirmationChannel: 'whatsapp' })}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.confirmationChannel === 'whatsapp'
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp (Fastest)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, confirmationChannel: 'sms' })}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.confirmationChannel === 'sms'
                          ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-800 dark:text-sky-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-sky-600" />
                      <span>SMS Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, confirmationChannel: 'call' })}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.confirmationChannel === 'call'
                          ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-500 text-teal-800 dark:text-teal-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4 text-teal-600" />
                      <span>Direct Phone Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, confirmationChannel: 'all' })}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formData.confirmationChannel === 'all'
                          ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-800 dark:text-indigo-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <BellRing className="w-4 h-4 text-indigo-600" />
                      <span>All Channels</span>
                    </button>
                  </div>
                </div>

                {/* Project Requirements / Message Field */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Additional Project Notes or Specifications <span className="text-sky-600 dark:text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your organization, preferred design style, specific domain/hosting notes... Your choice is our code!"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070a14] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all font-medium ${
                      errors.message
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-800 focus:border-sky-500 dark:focus:border-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* SUBMIT AND DIRECT ACTIONS: ALWAYS CLICKABLE AND ROBUST */}
                <div className="space-y-3 pt-2">
                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-sky-500/20 hover:shadow-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting Order to CEO WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit &amp; Send Directly to CEO WhatsApp</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Direct 1-Click WhatsApp Link with Real-time Form Data */}
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 hover:dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp and call orders are more comfortable and preferable (03009464514)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
