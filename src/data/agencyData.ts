import { ServiceItem, PortfolioItem, PricingPlan, Testimonial, FAQItem, PortfolioPPTSlide } from '../types';
import heroStudioImg from '../assets/images/hero_agency_studio_1793901828541.jpg';
import schoolImg from '../assets/images/portfolio_school_web_1793901829032.jpg';
import hospitalImg from '../assets/images/portfolio_hospital_web_1793901829786.jpg';
import corporateImg from '../assets/images/portfolio_corporate_web_1793901829545.jpg';

export const AGENCY_CONFIG = {
  name: 'Web Ghost Coder Agency',
  tagline: 'Your Vision. Our Code. Extraordinary Websites.',
  subheadline:
    'We transform your ideas into powerful digital experiences with modern designs, exceptional performance, and affordable pricing.',
  ownerName: 'Ibraheem Talat',
  ownerTitle: 'CEO & Lead Full-Stack Architect',
  ownerBio:
    'Visionary founder and lead coder with 15+ years equivalent architectural discipline. Committed to extraordinary code quality, 1 - 2 days delivery, and 100% transparent pricing for businesses, schools, and hospitals.',
  deliveryTime: '1 - 2 Days',
  orderingHours: '4:00 PM – 8:00 PM PKT',
  orderingHoursFull: 'Daily 4:00 PM – 8:00 PM PKT (Orders actively accepted via WhatsApp & Call)',
  phone: '03009464514',
  phoneDisplay: '+92 300 9464514',
  whatsapp: '923009464514',
  whatsappDisplay: '+92 300 9464514',
  email: 'ibraheemtalat2014@gmail.com',
  workingHours: 'Ordering Hours: 4:00 PM - 8:00 PM PKT | 24/7 WhatsApp Response',
  location: 'Global Delivery & Regional Operations',
  primaryWhatsAppLink:
    'https://wa.me/923009464514?text=Hello%20Ibraheem%20Talat%20(CEO%20Web%20Ghost%20Coder%20Agency)!%20I%20am%20interested%20in%20ordering%20a%20website%20during%20your%204PM-8PM%20ordering%20time.%20Your%20choice%20is%20our%20code!',
};

export const CORE_ADVANTAGES = [
  {
    title: 'Fast Delivery',
    subtitle: 'Production-ready in 1 - 2 Days',
    description:
      'We respect your market launch timelines. By using modern component architectures, rapid sprints, and direct senior coding, we deliver polished, fully functional websites in just 1 to 2 days.',
    metric: '1 - 2 Days',
    metricLabel: 'Guaranteed Rapid Turnaround',
    icon: 'Zap',
  },
  {
    title: 'Modern Design',
    subtitle: 'Bespoke, award-grade coder UI/UX aesthetics',
    description:
      'Zero cookie-cutter templates. Every layout is crafted for optimal mobile responsiveness, modern visual hierarchy, slick animations, and effortless customer navigation.',
    metric: '100% Mobile & Retina',
    metricLabel: 'Flawless Across All Devices',
    icon: 'Sparkles',
  },
  {
    title: 'Affordable Prices',
    subtitle: 'High-tier quality at realistic rates',
    description:
      'Transparent, upfront pricing starting from just 17,999 PKR ($65). Perfect for emerging businesses, schools, medical facilities, and entrepreneurs who need enterprise grade code without high agency overhead.',
    metric: 'Starting 17,999 PKR',
    metricLabel: 'Affordable & High-ROI Rates',
    icon: 'Coins',
  },
];

export const AGENCY_SERVICES: ServiceItem[] = [
  {
    id: 'business',
    title: 'Business Website Development',
    shortDesc:
      'Corporate and commercial websites engineered to build immediate credibility, capture leads, and convert traffic into paying clients.',
    fullDesc:
      'For corporate companies, consultancies, B2B firms, and service businesses. We build fast, authoritative websites that present your services clearly, position your brand as an industry leader, and provide direct inquiry channels via WhatsApp and custom quote forms.',
    iconName: 'Briefcase',
    badge: 'High Commercial Impact',
    benefits: [
      'Conversion-optimized structure turning casual visitors into qualified inquiries',
      'Lightning-fast page load speeds (95+ Google PageSpeed score)',
      'Integrated WhatsApp chat, lead capture forms, and appointment calendars',
      'Full SEO technical setup to rank on Google search for your target keywords',
    ],
    deliverables: [
      'Up to 10 Custom Designed Responsive Pages',
      'Services & Case Studies Showcase',
      'Contact & Quote Request Engine',
      'Google Analytics & Search Console Setup',
    ],
    idealFor: 'B2B Companies, Professional Firms, Agencies, Local Businesses',
    estimatedTime: '1 - 2 Days',
    startingPrice: '$94 / PKR 25,999',
    orderNote: 'WhatsApp and call orders are more comfortable and preferable. Your choice is our code.',
  },
  {
    id: 'school',
    title: 'School & Educational Website Development',
    shortDesc:
      'Modern digital campuses featuring student admission portals, course catalogs, faculty directories, and downloadable noticeboards.',
    fullDesc:
      'Educational institutions require clarity, accessibility, and trust. We design comprehensive web systems for schools, colleges, academies, and training institutes. Parents and students can easily apply online, review curriculum, view event notices, and contact administration directly.',
    iconName: 'GraduationCap',
    badge: 'Academic & Institutional',
    benefits: [
      'Online admission form engine with automated inquiry logging',
      'Structured faculty, course syllabus, and academic calendar modules',
      'Notice board system for fast circulars, date sheets, and result announcements',
      'Mobile-first responsive interface accessible for parents on any smartphone',
    ],
    deliverables: [
      'Admissions Portal & Prospectus Download',
      'Departmental & Faculty Profiles',
      'Interactive Event Gallery & Noticeboard',
      'Parent-Teacher Contact Engine',
    ],
    idealFor: 'Schools, Colleges, Academies, Tuition Centers, Training Institutes',
    estimatedTime: '1 - 2 Days',
    startingPrice: '$144 / PKR 40,000',
    orderNote: 'WhatsApp and call orders are more comfortable and preferable. Your choice is our code.',
  },
  {
    id: 'hospital',
    title: 'Hospital & Healthcare Website Development',
    shortDesc:
      'Patient-centric clinical websites with doctor appointment booking, department directories, emergency hotlines, and service catalogs.',
    fullDesc:
      'Healthcare websites must deliver instant reassurance and effortless access to care. We build clean, HIPAA-conscious web platforms for hospitals, private clinics, dental practices, diagnostic labs, and individual doctors with streamlined appointment booking and direct WhatsApp triage.',
    iconName: 'HeartPulse',
    badge: 'Healthcare & Clinical',
    benefits: [
      'Interactive doctor schedule directory and instant appointment booking request',
      'Prominent one-tap emergency calling and 24/7 WhatsApp clinic triage button',
      'Departmental service guides with transparent treatment and test details',
      'Reassuring, high-legibility clinical design that instills patient confidence',
    ],
    deliverables: [
      'Doctor Directory with Specialization Filters',
      'Patient Appointment Booking Engine',
      'Emergency One-Tap Mobile Bar',
      'Diagnostic Tests & Services Pricing Catalog',
    ],
    idealFor: 'Hospitals, Private Clinics, Dental Practices, Diagnostic Centers',
    estimatedTime: '1 - 2 Days',
    startingPrice: '$141 / PKR 38,999',
    orderNote: 'WhatsApp and call orders are more comfortable and preferable. Your choice is our code.',
  },
  {
    id: 'landing',
    title: 'High-Converting Landing Pages for Google Ads',
    shortDesc:
      'Hyper-focused, ultra-fast landing pages tailored specifically for PPC campaigns to maximize click-to-lead conversion rates and lower ad costs.',
    fullDesc:
      'Stop wasting money on Google Ads clicks that bounce. We engineer dedicated sales landing pages built upon proven conversion psychology: single call-to-action focus, zero navigation distractions, rapid sub-second load times, dynamic value propositions, and instant WhatsApp/call conversion hooks.',
    iconName: 'Target',
    badge: 'PPC & Lead Generation',
    benefits: [
      'Drastically increases Google Ads Quality Score to lower your Cost-Per-Click (CPC)',
      'Sub-second page load times preventing visitors from bouncing before seeing your offer',
      'Clear, persuasive copy layout with sticky WhatsApp and call-to-action buttons',
      'Conversion tracking pixel integration for Google Ads, Meta, and Analytics',
    ],
    deliverables: [
      'Single-Page High-Conversion Funnel Architecture',
      'Hero Hook + Proof Bento Grid + Lead Form',
      'Google Ads Conversion Pixel & Tag Setup',
      'A/B Testing Ready Structure',
    ],
    idealFor: 'Ad Campaign Runners, E-commerce Launches, Service Providers, Product Promoters',
    estimatedTime: '1 - 2 Days',
    startingPrice: '$65 / PKR 17,999',
    orderNote: 'WhatsApp and call orders are more comfortable and preferable. Your choice is our code.',
  },
  {
    id: 'custom',
    title: 'Custom Website & Web Application Development',
    shortDesc:
      'Tailor-made web solutions, membership portals, SaaS products, booking engines, and database-driven dynamic applications.',
    fullDesc:
      'When off-the-shelf templates cannot meet your requirements, we construct bespoke web applications from ground up. Built using modern stacks like React, Node.js, Express, and cloud databases, with robust APIs, secure authentication, and scalable architecture designed for your unique workflow.',
    iconName: 'Code2',
    badge: 'Bespoke Architecture',
    benefits: [
      '100% custom codebase tailored strictly to your operational workflows',
      'Secure backend with database persistence and customized API endpoints',
      'Full administrative management dashboards and reporting panels',
      'Infinite scalability without restrictive third-party platform limitations',
    ],
    deliverables: [
      'Custom React Frontend + Express/Node Backend',
      'Role-Based Database Architecture',
      'Custom Admin Management Dashboard',
      'Full Source Code Ownership & Deployment Support',
    ],
    idealFor: 'Startups, Specialized Organizations, SaaS Products, Complex Workflows',
    estimatedTime: '1 - 2 Days',
    startingPrice: '$119 / PKR 32,999',
    orderNote: 'WhatsApp and call orders are more comfortable and preferable. Your choice is our code.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'oakwood-school',
    title: 'Oakwood Educational Academy',
    category: 'school',
    categoryLabel: 'School & Academy Portal',
    image: schoolImg,
    description:
      'A complete digital campus redesign for a prestigious K-12 academy, featuring digital student admissions, academic calendar, faculty directory, and parent portal.',
    client: 'Oakwood Educational Academy',
    features: [
      'Digital Admission Application with Document Upload',
      'Interactive Course & Curriculum Showcase',
      'Direct WhatsApp Academic Counselor Hotline',
      'Real-time Notice Board & Examination Schedules',
    ],
    results: '+240% online admission applications during the first enrolment intake cycle.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js API'],
    liveDemoHighlight: 'Complete institutional architecture with parent-friendly mobile UI.',
  },
  {
    id: 'aethelred-health',
    title: 'Aethelred Health Care & Hospital',
    category: 'hospital',
    categoryLabel: 'Hospital & Healthcare Platform',
    image: hospitalImg,
    description:
      'A patient-centered healthcare platform with automated doctor appointment booking, department directory, clinical services pricing, and emergency care hotline.',
    client: 'Aethelred Medical Center',
    features: [
      'Interactive Doctor Directory with Day/Time Slots',
      'One-Click WhatsApp Emergency & Prescription Triage',
      'Comprehensive Clinical Departments & Test Directory',
      'HIPAA-Conscious Clean Aesthetic and Accessibility',
    ],
    results: 'Reduced patient intake phone congestion by 65% with online appointment scheduling.',
    techStack: ['React', 'Express.js', 'Tailwind CSS', 'Calendar Engine'],
    liveDemoHighlight: 'Interactive doctor appointment scheduling and emergency call bar.',
  },
  {
    id: 'quantum-growth',
    title: 'Quantum Growth Partners & Ads Funnel',
    category: 'landing',
    categoryLabel: 'Google Ads High-Converting Landing Page',
    image: corporateImg,
    description:
      'A performance marketing landing page built for high-spend Google Ads campaigns, designed for instant conversion with proof bento grids and sub-second load times.',
    client: 'Quantum Growth Partners',
    features: [
      '98/100 Google PageSpeed Performance Score',
      'Dynamic Keyword Insertion (DKI) Readiness',
      'Multi-Step Lead Qualification Form',
      'Conversion Tracking Integration with Google Ads',
    ],
    results: 'Achieved an 11.4% conversion rate from cold Google Ads traffic, lowering CPC by 38%.',
    techStack: ['React', 'Motion', 'Tailwind CSS', 'Vite Speed Optimization'],
    liveDemoHighlight: 'Laser-focused lead capture engine with zero distraction layout.',
  },
  {
    id: 'apex-logistics',
    title: 'Apex Logistics & Commercial Enterprise',
    category: 'business',
    categoryLabel: 'Corporate Business Website',
    image: heroStudioImg,
    description:
      'An authoritative corporate portal for a national logistics network, providing instant quotation requests, service fleet breakdown, and client case studies.',
    client: 'Apex Global Enterprises',
    features: [
      'Interactive Shipping & Freight Cost Estimator',
      'Global Fleet & Service Coverage Interactive Map',
      'Instant WhatsApp Dispatch Hotline',
      'B2B Client Testimonials & Security Compliance Certifications',
    ],
    results: 'Generated over $180,000 in new commercial inquiries within the first 90 days.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    liveDemoHighlight: 'B2B credibility engine with instant quote calculator.',
  },
];

// INTERACTIVE PORTFOLIO PRESENTATION SLIDES (PPT SHOWCASE WITH MORPH TRANSITIONS)
export const PORTFOLIO_PPT_DECKS: PortfolioPPTSlide[] = [
  {
    id: 'ppt-school',
    slideNumber: '01',
    title: 'Oakwood Educational Academy — Digital Campus Transformation',
    subtitle: 'From Paper Admissions to 240% Online Student Enrolment Surge',
    category: 'School Website & Portal',
    categoryLabel: 'Academic System',
    image: schoolImg,
    client: 'Oakwood Educational Academy',
    turnaround: 'Delivered in 48 Hours',
    problemStatement:
      'Paper forms were causing delays, missed admission deadliness, and high administrative phone traffic during enrolment season.',
    architectureSolution:
      'Engineered a lightweight mobile-first admissions portal with document compression, instant student roll search, and automated WhatsApp alert dispatch to parents.',
    metricsHighlight: '+240% Online Applications · 0% Form Dropoff',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js API'],
    keyHighlights: [
      'Online student admission engine with real-time field validation',
      'Instant parent-counselor WhatsApp bridge with pre-filled inquiry ID',
      'Downloadable circulars and academic calendar with instant search',
      'Sub-second mobile loading on 3G and 4G networks',
    ],
  },
  {
    id: 'ppt-hospital',
    slideNumber: '02',
    title: 'Aethelred Healthcare & Hospital Booking Platform',
    subtitle: 'Automated Doctor Schedules & 24/7 WhatsApp Emergency Triage',
    category: 'Hospital & Healthcare Platform',
    categoryLabel: 'Clinical System',
    image: hospitalImg,
    client: 'Aethelred Medical Center',
    turnaround: 'Delivered in 2 Days',
    problemStatement:
      'Patients faced congested phone lines when scheduling urgent specialist appointments, leading to clinic no-shows and patient dissatisfaction.',
    architectureSolution:
      'Built a calming, clinical-grade booking engine with live specialist availability, diagnostic test pricing catalog, and 1-tap emergency triage calling.',
    metricsHighlight: '65% Call Congestion Reduced · 70% More Bookings',
    techStack: ['React', 'Express.js', 'Interactive Calendar', 'Tailwind CSS'],
    keyHighlights: [
      'Interactive doctor roster with specialization filtering',
      '1-Tap WhatsApp and emergency telephone triage dispatch',
      'Diagnostic tests and lab procedures transparent fee schedule',
      'Accessible high-contrast UI meeting clinical legibility guidelines',
    ],
  },
  {
    id: 'ppt-landing',
    slideNumber: '03',
    title: 'Quantum Growth Partners — High-Converting Google Ads Funnel',
    subtitle: '98/100 PageSpeed & 11.4% Conversion Rate on Paid Google Ads',
    category: 'Google Ads Landing Page',
    categoryLabel: 'PPC Conversion Funnel',
    image: corporateImg,
    client: 'Quantum Growth Partners',
    turnaround: 'Delivered in 24 Hours',
    problemStatement:
      'Client was burning thousands of dollars on Google Ads due to slow WordPress landing pages that took 4+ seconds to load on mobile.',
    architectureSolution:
      'Rewrote the landing experience from scratch using optimized React and Motion, eliminating bloated plugins and cutting mobile load times to 0.4 seconds.',
    metricsHighlight: '11.4% Cold Conversion · 38% Lower Cost Per Lead',
    techStack: ['React', 'Vite Speed Optimization', 'Motion', 'Tailwind CSS'],
    keyHighlights: [
      'Sub-second Largest Contentful Paint (LCP) achieving 98/100 score',
      'Google Tag Manager and Meta conversion pixel tracking pre-configured',
      'Sticky bottom conversion bar with 1-tap WhatsApp consultation',
      'Dynamic psychological proof bento grid driving instant trust',
    ],
  },
  {
    id: 'ppt-corporate',
    slideNumber: '04',
    title: 'Apex Global Logistics — Corporate B2B Platform',
    subtitle: 'Interactive Commercial Quoting Engine with $180,000 Pipeline Generated',
    category: 'Corporate Business Website',
    categoryLabel: 'Commercial Enterprise',
    image: heroStudioImg,
    client: 'Apex Global Enterprises',
    turnaround: 'Delivered in 48 Hours',
    problemStatement:
      'B2B logistics enterprise lacked a digital quoting channel, forcing freight customers into manual email exchanges and causing quote friction.',
    architectureSolution:
      'Designed a sleek corporate portal featuring an instant freight cost calculator, global fleet showcase, and secure credential client portal integration.',
    metricsHighlight: '$180,000+ Inbound Pipeline in First 90 Days',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    keyHighlights: [
      'Interactive volume and route cost calculator with instant estimation',
      'Comprehensive services and safety compliance certifications',
      'Direct WhatsApp dispatch hotline for urgent shipments',
      'Full source code ownership handed over with zero recurring license fees',
    ],
  },
  {
    id: 'ppt-ceo-pitch',
    slideNumber: '05',
    title: 'Web Ghost Coder Agency — Executive Architecture Pitch',
    subtitle: 'Directly Led by Ibraheem Talat, CEO & Founder',
    category: 'Agency Pitch Deck',
    categoryLabel: 'CEO Presentation',
    image: heroStudioImg,
    client: 'Web Ghost Coder Agency',
    turnaround: '1 - 2 Days Guarantee',
    problemStatement:
      'Traditional agencies take 4 to 8 weeks, charge excessive retainer fees, and assign junior middlemen between you and the developers.',
    architectureSolution:
      'Web Ghost Coder operates with senior full-stack coders. You talk directly with CEO Ibraheem Talat, pay transparent upfront prices, and get your site in 24 - 48 hours.',
    metricsHighlight: '150+ Websites Delivered · 100% Client Code Ownership',
    techStack: ['React 19', 'Next.js', 'Express', 'TypeScript', 'Tailwind'],
    keyHighlights: [
      'Services & Ordering window: Daily 4:00 PM to 8:00 PM PKT',
      'Exact transparent prices starting from PKR 17,999 ($65)',
      'WhatsApp & call orders are more comfortable and preferable',
      '"Your choice is our code" — full revisions and dedicated warranty',
    ],
  },
];

export const DEVELOPMENT_PROCESS = [
  {
    step: '01',
    title: 'Strategic Brief & Requirement Intake',
    subtitle: 'Clarifying your requirements during 4 PM - 8 PM via WhatsApp or Call',
    description:
      'We discuss your exact objectives, target audience, layout preferences, and branding directly with CEO Ibraheem Talat. Your choice is our code!',
    duration: 'Hour 1 - 4',
  },
  {
    step: '02',
    title: 'High-Impact UI/UX Prototyping & Flow',
    subtitle: 'Structuring high-converting visual flow',
    description:
      'We design an intuitive, high-impact wireframe focused on rapid user engagement, strong value propositions, and effortless mobile calls-to-action.',
    duration: 'Hour 5 - 12',
  },
  {
    step: '03',
    title: 'Clean Code Development & Performance',
    subtitle: 'Rapid full-stack React & Node.js build',
    description:
      'We craft clean, maintainable code using React, TypeScript, and modern APIs. No bloated third-party plugins that slow down your website.',
    duration: 'Hour 13 - 28',
  },
  {
    step: '04',
    title: 'Cross-Device QA, Speed & SEO Audit',
    subtitle: 'Ensuring 95+ performance scores and mobile perfection',
    description:
      'We test every page across smartphones, tablets, and desktop resolutions. We verify form validation, Google Ads pixel tracking, and technical SEO tags.',
    duration: 'Hour 29 - 36',
  },
  {
    step: '05',
    title: 'Live Launch, Custom Domain & Support',
    subtitle: 'Deploying to high-speed cloud infrastructure',
    description:
      'We launch your website on fast cloud servers, configure your custom domain and SSL, provide a video walkthrough, and offer dedicated WhatsApp support.',
    duration: 'Hour 37 - 48 (Day 2 Complete)',
  },
];

export const PRICING_PACKAGES: PricingPlan[] = [
  {
    id: 'starter-landing',
    name: 'Google Ads Landing Page',
    tagline: 'Ideal for Google Ads campaigns, single services, or product promotions.',
    priceUSD: 65,
    pricePKR: 'PKR 17,999',
    turnaround: '1 - 2 Days',
    features: [
      'High-Converting Single-Page Architecture',
      '100% Mobile & Tablet Responsive',
      'Direct WhatsApp & Click-to-Call Buttons',
      'Validated Lead Generation Contact Form',
      'Sub-Second Page Loading (95+ Score)',
      'Google Ads & Meta Pixel Tracking Setup',
      'Free Domain & SSL Connection Assistance',
      'WhatsApp and call orders preferred - direct developer access',
    ],
    bestFor: 'Google Ads Marketers, Fast Launches, Single Services',
  },
  {
    id: 'business-pro',
    name: 'Business Website Development',
    tagline: 'Complete professional online presence for companies and commercial firms.',
    priceUSD: 94,
    pricePKR: 'PKR 25,999',
    turnaround: '1 - 2 Days',
    popular: true,
    features: [
      'Up to 8 Custom Designed Pages (Home, About, Services, Case Studies, Contact)',
      'Interactive Services & Portfolio Showcase',
      'Backend Form Submission Engine with Email/WhatsApp Alerts',
      'Full On-Page Technical SEO (Meta, Schema, OpenGraph)',
      'Interactive Google Maps & Direct Contact Integration',
      'Ultra-Fast CDN Cloud Hosting Setup Guidance',
      'Guaranteed 1 - 2 Days Turnaround',
      'Your choice is our code - full revisions included',
    ],
    bestFor: 'Corporate Companies, Consultancies, Professional Firms',
  },
  {
    id: 'institutional-enterprise',
    name: 'School / Hospital / Custom Web App',
    tagline: 'Comprehensive digital infrastructure for schools, hospitals, and bespoke portals.',
    priceUSD: 144,
    pricePKR: 'PKR 40,000',
    turnaround: '1 - 2 Days',
    features: [
      'Multi-Page Institutional Architecture (Admissions or Doctor Booking)',
      'Interactive Directories (Faculty, Doctors, Departments, Test Catalog)',
      'Notice Board / News / Announcements Engine',
      'Custom Interactive Quote / Cost Estimator Tool',
      'Database Storage for Leads & Applications',
      'Hospital: PKR 38,999 ($141) | School: PKR 40,000 ($144) | Custom: PKR 32,999 ($119)',
      'Priority 24/7 Direct WhatsApp Developer Hotline',
      '60-Day Comprehensive Post-Launch Maintenance',
    ],
    bestFor: 'Schools, Colleges, Hospitals, Healthcare Clinics, Custom Web Apps',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Hamza Tariq',
    role: 'Medical Director',
    organization: 'Tariq Specialty Clinic & Diagnostic',
    projectType: 'Hospital Website & Booking Platform',
    quote:
      'Web Ghost Coder Agency transformed our clinical presence in just 2 days! Ibraheem Talat personally guided our appointment architecture. Before this, patients struggled to reach reception. Now our patients book online and message directly through WhatsApp.',
    outcome: 'Delivered in 2 Days | +70% Increase in Direct Patient Bookings',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Prof. Sarah Munir',
    role: 'Principal & Academic Head',
    organization: 'Oakwood Educational Academy',
    projectType: 'School Website & Admission Portal',
    quote:
      'I ordered via WhatsApp during their 4 PM - 8 PM window and they delivered our entire school portal in under 48 hours right before admissions! Parents love the mobile interface for curriculum and online forms. Fast, modern, and very cooperative.',
    outcome: 'Delivered in 1 - 2 Days with 240+ Online Enrolments',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Bilal Khan',
    role: 'Founder & Managing Director',
    organization: 'Nexera Commercial Logistics',
    projectType: 'Corporate Website & Google Ads Funnel',
    quote:
      'We spent only 17,999 PKR for our Google Ads landing page and got it delivered the very next day. Our page speed score jumped from 42 to 98, and our cost per qualified lead dropped by 38%. Extraordinary value from CEO Ibraheem Talat!',
    outcome: '1-Day Delivery | PageSpeed 98 | 38% Lower Cost Per Lead',
    rating: 5,
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What are your ordering hours and services time?',
    answer:
      'Our dedicated services and ordering window is 4:00 PM to 8:00 PM PKT daily. During this time, our CEO and lead engineers are actively on WhatsApp and phone at 03009464514 to discuss requirements, confirm specifications, and begin rapid development sprints.',
    category: 'process',
  },
  {
    question: 'Who is the owner of Web Ghost Coder Agency?',
    answer:
      'Web Ghost Coder Agency is founded and led by Ibraheem Talat, CEO & Lead Full-Stack Architect. When you order, you speak directly with senior engineering leadership rather than junior account managers.',
    category: 'general',
  },
  {
    question: 'How fast can you deliver my website?',
    answer:
      'We deliver all websites in just 1 to 2 days! Whether it is a Google Ads landing page, a business website, a school portal, or a hospital booking system, our senior full-stack team builds and deploys within 24 to 48 hours without compromising code quality.',
    category: 'timeline',
  },
  {
    question: 'What are your exact prices for website development?',
    answer:
      'Our prices are 100% transparent: High-Converting Landing Page for Google Ads is 17,999 PKR ($65); Business Website is 25,999 PKR ($94); Custom Website & Web Application is 32,999 PKR ($119); Hospital & Healthcare Website is 38,999 PKR ($141); and School & Educational Website is 40,000 PKR ($144).',
    category: 'pricing',
  },
  {
    question: 'How should I order? Is WhatsApp and call preferred?',
    answer:
      'Yes! WhatsApp and call orders are more comfortable and preferable for both of us. You can message or call directly at 03009464514 (+92 300 9464514) between 4:00 PM and 8:00 PM. We immediately discuss your specifications, share live previews, and start coding right away. Your choice is our code!',
    category: 'process',
  },
  {
    question: 'Can you customize websites for schools and hospitals?',
    answer:
      'Yes, absolutely! We specialize in tailored systems: for schools, we build online student admission engines, academic calendars, and circular noticeboards; for hospitals and clinics, we build doctor directory filters, appointment booking forms, and 24/7 emergency WhatsApp triage buttons.',
    category: 'general',
  },
];
