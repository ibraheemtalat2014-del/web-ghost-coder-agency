export interface ServicePageFeature {
  title: string;
  description: string;
}

export interface ServicePageWorkflowStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServicePageFAQ {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  slug: string;
  route: string;
  badge: string;
  shortTitle: string;
  h1Prefix: string;
  h1Highlight: string;
  leadSummary: string;
  pakistanAndGlobalNote: string;
  turnaround: string;
  investmentLabel: string;
  preselectedFormService: string;
  highlights: ServicePageFeature[];
  deliverables: string[];
  targetAudiences: { title: string; detail: string }[];
  workflow: ServicePageWorkflowStep[];
  faqs: ServicePageFAQ[];
  relatedRoutes: { title: string; description: string; to: string }[];
}

export const SERVICE_PAGES_DATA: Record<string, ServicePageContent> = {
  '/website-development': {
    slug: 'website-development',
    route: '/website-development',
    badge: 'FULL-STACK WEB ENGINEERING',
    shortTitle: 'Website Development',
    h1Prefix: 'Professional Website Development in',
    h1Highlight: 'Pakistan & Worldwide',
    leadSummary:
      'We build fast, mobile-first, SEO-structured websites using React, TypeScript, and Node.js—engineered cleanly from scratch and delivered in 1 to 2 days.',
    pakistanAndGlobalNote:
      'Serving businesses, schools, hospitals, and growing startups across Lahore, Karachi, Islamabad, and international markets with transparent PKR and USD rates.',
    turnaround: '1 - 2 Days Standard Delivery',
    investmentLabel: 'Starting from PKR 17,999 ($65)',
    preselectedFormService: 'Business website development (PKR 25,999 / $94)',
    highlights: [
      {
        title: 'Clean TypeScript & React Codebase',
        description:
          'Zero bloated page-builders or slow third-party themes. Every component is cleanly engineered for sub-second loading and long-term maintainability.',
      },
      {
        title: '95+ Performance & Mobile Speed',
        description:
          'Optimized asset bundling, responsive grid layouts, and lightweight DOM structure ensure effortless browsing even on mobile 3G/4G networks in Pakistan.',
      },
      {
        title: 'Direct Lead & WhatsApp Hooks',
        description:
          'Built-in validated inquiry forms, click-to-call buttons, and instant WhatsApp routing directly to your team so no customer inquiry goes cold.',
      },
      {
        title: 'Full Source Code Ownership',
        description:
          'Once your website launches on Vercel or your preferred custom domain, you retain complete ownership of your codebase with zero lock-in fees.',
      },
    ],
    deliverables: [
      'Responsive multi-device frontend (Mobile, Tablet, Laptop, Desktop)',
      'Structured HTML5 semantics & technical SEO foundation',
      'Validated contact form with WhatsApp & direct phone integration',
      'SSL & custom domain deployment guidance (Vercel, Netlify, or cPanel)',
      'Post-launch walkthrough directly with CEO Ibraheem Talat',
      'Clean typography, light & dark UI adaptability, and accessible navigation',
    ],
    targetAudiences: [
      {
        title: 'Growing Companies in Pakistan',
        detail: 'Establish immediate brand authority with fast local loading and PKR pricing transparency.',
      },
      {
        title: 'International Founders & Agencies',
        detail: 'Get senior full-stack execution at competitive rates ($65–$144) without multi-week delays.',
      },
      {
        title: 'Schools & Healthcare Clinics',
        detail: 'Specialized admissions and doctor appointment workflows built specifically for institutional trust.',
      },
      {
        title: 'Google Ads Campaigns',
        detail: 'Dedicated single-focus landing pages structured to boost Quality Score and lower CPC.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Requirement Call or WhatsApp Brief',
        detail: 'Connect directly during our daily 4:00 PM – 8:00 PM PKT window at 03009464514 to outline your goals.',
      },
      {
        step: '02',
        title: 'Architecture & Wireframe Alignment',
        detail: 'We structure your pages, navigation routes, calls-to-action, and visual hierarchy before coding.',
      },
      {
        step: '03',
        title: 'Rapid Full-Stack Build',
        detail: 'Senior developers write modular React, Tailwind, and Express/API modules with zero template bloat.',
      },
      {
        step: '04',
        title: 'Cross-Device QA & Live Deployment',
        detail: 'We test every form, link, and screen breakpoint, then deploy live to your domain within 1 - 2 days.',
      },
    ],
    faqs: [
      {
        question: 'How quickly can my website be launched?',
        answer:
          'Most business websites, landing pages, school sites, and hospital platforms are engineered, tested, and deployed within 1 to 2 days after confirming specifications.',
      },
      {
        question: 'Do I own the website code after delivery?',
        answer:
          'Yes. We provide complete source code ownership and assist with connecting your custom domain and cloud hosting.',
      },
      {
        question: 'What is the easiest way to start my order?',
        answer:
          'WhatsApp and phone call orders at 03009464514 (+92 300 9464514) are preferred between 4:00 PM and 8:00 PM PKT, or you can submit your project scope through our Contact page.',
      },
    ],
    relatedRoutes: [
      {
        title: 'Web Design & UI/UX',
        description: 'Custom visual interfaces, design systems, and mobile-first layouts.',
        to: '/web-design',
      },
      {
        title: 'Business Website Development',
        description: 'Corporate websites built for B2B credibility and commercial inquiries.',
        to: '/business-websites',
      },
      {
        title: 'SEO Services',
        description: 'Technical SEO, structured data, and speed optimization to rank on Google.',
        to: '/seo-services',
      },
    ],
  },

  '/web-design': {
    slug: 'web-design',
    route: '/web-design',
    badge: 'UI/UX & VISUAL DESIGN SYSTEMS',
    shortTitle: 'Web Design',
    h1Prefix: 'Professional Web Design &',
    h1Highlight: 'Conversion UI/UX',
    leadSummary:
      'Clean, memorable user interfaces engineered to earn trust in seconds—combining crisp typography, intentional whitespace, and seamless mobile ergonomics.',
    pakistanAndGlobalNote:
      'Designed for ambitious Pakistani brands and international teams that want modern digital polish without confusing navigation or heavy animations.',
    turnaround: '1 - 2 Days Design + Build',
    investmentLabel: 'Included from PKR 17,999 ($65)',
    preselectedFormService: 'Business website development (PKR 25,999 / $94)',
    highlights: [
      {
        title: 'Mobile-First Responsive Grid Systems',
        description:
          'Over 75% of visitors in Pakistan browse on smartphones. Every hero banner, card layout, and action button is proportioned cleanly for thumb reach.',
      },
      {
        title: 'Accessible Contrast & Readable Typography',
        description:
          'Carefully calibrated font pairing (Space Grotesk, Inter Tight, and Fira Code) with high contrast ratios across both light and dark modes.',
      },
      {
        title: 'Conversion-Centered Information Flow',
        description:
          'Clear above-the-fold value propositions, scannable benefit cards, and friction-free calls to action that guide visitors straight to inquiry.',
      },
      {
        title: 'Purposeful Micro-Interactions',
        description:
          'Smooth GPU-accelerated hover states and fluid transitions that elevate perceived brand authority without slowing page rendering.',
      },
    ],
    deliverables: [
      'Bespoke homepage & inner-page visual hierarchy',
      'Adaptive Light & Dark theme color tokens',
      'Interactive cards, modals, and responsive navigation menus',
      'Consistent brand iconography and button contrast rules',
      'Cross-browser validation (Chrome, Safari, Edge, mobile browsers)',
      'Clean Tailwind CSS styling directly in production code',
    ],
    targetAudiences: [
      {
        title: 'Brands Replacing Outdated Sites',
        detail: 'Upgrade legacy layouts into crisp, high-trust digital storefronts.',
      },
      {
        title: 'Medical & Educational Institutions',
        detail: 'Calm, structured layouts that help patients and parents find information immediately.',
      },
      {
        title: 'Consultants & SaaS Founders',
        detail: 'Clean visual storytelling that communicates complex services effortlessly.',
      },
      {
        title: 'Paid Ad Campaigns',
        detail: 'Distraction-free landing layouts built specifically to maximize return on ad spend.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Brand Identity & Tone Review',
        detail: 'We align on your industry positioning, target customers, and preferred color aesthetics.',
      },
      {
        step: '02',
        title: 'Layout Architecture & Wireframing',
        detail: 'Mapping H1/H2/H3 structure, hero focal points, and conversion touchpoints.',
      },
      {
        step: '03',
        title: 'Interactive Component Crafting',
        detail: 'Designing reusable cards, navigation dropdowns, and responsive breakpoints.',
      },
      {
        step: '04',
        title: 'Device Polish & Launch',
        detail: 'Fine-tuning spacing across phones, tablets, laptops, and large monitors before release.',
      },
    ],
    faqs: [
      {
        question: 'Do you use pre-made WordPress themes?',
        answer:
          'No. We design and code custom responsive interfaces directly in React and Tailwind CSS so your site looks unique and loads fast.',
      },
      {
        question: 'Can you redesign my existing slow website?',
        answer:
          'Yes. We rebuild outdated sites into modern, responsive web experiences within 1 to 2 days while keeping your core brand identity intact.',
      },
      {
        question: 'Will my design work cleanly on small phones and large desktops?',
        answer:
          'Yes. Every page is tested across mobile, tablet, laptop, and wide desktop viewports with zero horizontal overflow.',
      },
    ],
    relatedRoutes: [
      {
        title: 'Website Development',
        description: 'Full-stack React and Node.js implementation behind your visual design.',
        to: '/website-development',
      },
      {
        title: 'Portfolio Website Development',
        description: 'Showcase your work with executive and creative portfolio websites.',
        to: '/portfolio-websites',
      },
      {
        title: 'View Our Projects',
        description: 'Inspect real design & architecture examples in our live portfolio.',
        to: '/portfolio',
      },
    ],
  },

  '/ecommerce-development': {
    slug: 'ecommerce-development',
    route: '/ecommerce-development',
    badge: 'ONLINE STORES & COMMERCE',
    shortTitle: 'E-Commerce Development',
    h1Prefix: 'Fast E-Commerce Website',
    h1Highlight: 'Development in Pakistan',
    leadSummary:
      'Launch modern online storefronts engineered for rapid product browsing, smooth cart flows, and direct Cash-on-Delivery / WhatsApp order confirmations.',
    pakistanAndGlobalNote:
      'Built specifically for Pakistani retail brands and D2C sellers who need fast mobile product pages, COD-friendly checkout, and direct WhatsApp order sync.',
    turnaround: 'Rapid Sprint Delivery',
    investmentLabel: 'Starting from PKR 32,999 ($119)',
    preselectedFormService: 'Custom website & web application (PKR 32,999 / $119)',
    highlights: [
      {
        title: 'Instant Category & Product Filtering',
        description:
          'Zero page reloads when customers filter by category, size, or price—keeping shoppers engaged and improving mobile checkout completion.',
      },
      {
        title: 'COD & WhatsApp Order Flows',
        description:
          'Tailored for local e-commerce buyers in Pakistan: customers can finalize orders via clean checkout forms or send their itemized cart directly via WhatsApp.',
      },
      {
        title: 'High-Speed Product Galleries',
        description:
          'Lightweight image presentation with descriptive alt tags and clean product spec tabs designed to rank in Google Shopping and Image Search.',
      },
      {
        title: 'Admin-Ready Catalog Structure',
        description:
          'Clean data models and API endpoints so inventory, pricing in PKR/USD, and customer order records stay organized.',
      },
    ],
    deliverables: [
      'Responsive storefront with category navigation & search',
      'Interactive shopping cart & order summary drawer',
      'Cash on Delivery (COD) & WhatsApp instant order routing',
      'SEO-friendly product titles, descriptions & image alt text',
      'Order confirmation notifications & tracking structure',
      'Google Analytics / Meta Pixel purchase event readiness',
    ],
    targetAudiences: [
      {
        title: 'Clothing & Apparel Brands',
        detail: 'Clean visual lookbooks paired with effortless variant selection and COD checkout.',
      },
      {
        title: 'Electronics & Gadget Retailers',
        detail: 'Structured spec tables, comparison highlights, and instant WhatsApp support.',
      },
      {
        title: 'Specialty Food & Cosmetic Stores',
        detail: 'High-trust product pages engineered for social media and Google Ads traffic.',
      },
      {
        title: 'Wholesale & B2B Catalogs',
        detail: 'Bulk quote request carts connecting retailers directly to your sales hotline.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Catalog & Payment Flow Scoping',
        detail: 'Define your product categories, pricing currency (PKR/USD), and preferred order channels.',
      },
      {
        step: '02',
        title: 'Storefront UI & Cart Engineering',
        detail: 'Build fast product grids, quick-view modals, and zero-friction checkout screens.',
      },
      {
        step: '03',
        title: 'Order Notification & Pixel Setup',
        detail: 'Wire WhatsApp order summaries, validated customer phone/address capture, and ad tracking.',
      },
      {
        step: '04',
        title: 'Checkout Testing & Launch',
        detail: 'Test complete add-to-cart to order confirmation across mobile and desktop before going live.',
      },
    ],
    faqs: [
      {
        question: 'Can customers order via Cash on Delivery or WhatsApp?',
        answer:
          'Yes! We specialize in frictionless checkout flows tailored for Pakistan, supporting both standard COD order forms and direct WhatsApp cart dispatch.',
      },
      {
        question: 'Why choose a custom React store over heavy plugins?',
        answer:
          'Heavy store plugins slow down mobile phones and hurt Google Ads ROAS. Clean React storefronts load near-instantly and maximize conversion rates.',
      },
      {
        question: 'Do you support both PKR and international USD stores?',
        answer:
          'Yes, storefronts can be configured for Pakistani Rupees (PKR), USD, or multi-currency display depending on your target customers.',
      },
    ],
    relatedRoutes: [
      {
        title: 'Custom Software Development',
        description: 'Need custom inventory portals or database dashboards? Explore bespoke engineering.',
        to: '/custom-software-development',
      },
      {
        title: 'SEO Services',
        description: 'Optimize your store categories and product pages to capture organic search traffic.',
        to: '/seo-services',
      },
      {
        title: 'Contact Us',
        description: 'Share your product count and store vision for a custom build timeline.',
        to: '/contact',
      },
    ],
  },

  '/business-websites': {
    slug: 'business-websites',
    route: '/business-websites',
    badge: 'CORPORATE & COMMERCIAL SITES',
    shortTitle: 'Business Website Development',
    h1Prefix: 'Business Website Development for',
    h1Highlight: 'Companies & Institutions',
    leadSummary:
      'Authoritative corporate websites, school admission portals, and hospital booking platforms engineered to build immediate credibility and generate qualified inquiries.',
    pakistanAndGlobalNote:
      'From B2B logistics firms and law/accounting practices to private schools and specialty clinics in Pakistan, every business site is built for lead generation.',
    turnaround: '1 - 2 Days Guaranteed',
    investmentLabel: 'PKR 25,999 ($94) Corporate · Specialized Institutions Available',
    preselectedFormService: 'Business website development (PKR 25,999 / $94)',
    highlights: [
      {
        title: 'Built for Commercial Credibility',
        description:
          'Clear leadership attribution, structured service breakdowns, and verified case studies immediately reassure prospective corporate buyers and clients.',
      },
      {
        title: 'Specialized Industry Modules',
        description:
          'Whether you need corporate B2B quoting, school student admissions (PKR 40,000 / $144), or hospital doctor directories (PKR 38,999 / $141), we tailor every workflow.',
      },
      {
        title: 'Multi-Channel Inquiry Capture',
        description:
          'Verified contact forms paired with 1-tap WhatsApp and phone links ensure decision-makers can reach you during business hours effortlessly.',
      },
      {
        title: 'On-Page SEO Architecture Included',
        description:
          'Structured Organization JSON-LD, clean URLs, and fast load times help local customers find your business first on Google Search.',
      },
    ],
    deliverables: [
      'Up to 10 custom-designed responsive pages & sections',
      'Company overview, specialized services & case study showcase',
      'Validated quote/inquiry form with WhatsApp notification dispatch',
      'Google Maps / local Pakistan business SEO readiness',
      'Technical SEO tags, Open Graph cards & sitemap setup',
      'Guaranteed 1 - 2 days turnaround with direct CEO access',
    ],
    targetAudiences: [
      {
        title: 'B2B Firms & Logistics Companies',
        detail: 'Present service capabilities, instant cost calculators, and corporate inquiry channels.',
      },
      {
        title: 'Schools, Colleges & Academies',
        detail: 'Complete digital campus sites with admissions portals, calendars, and parent noticeboards.',
      },
      {
        title: 'Hospitals & Diagnostic Clinics',
        detail: 'Doctor directories, appointment request forms, and 24/7 emergency WhatsApp triage.',
      },
      {
        title: 'Real Estate & Consultancies',
        detail: 'High-trust project showcases built to capture serious investor and client leads.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Business Discovery & Goal Mapping',
        detail: 'Discuss your services, target market, and client conversion path via WhatsApp or call.',
      },
      {
        step: '02',
        title: 'Multi-Page Structure & Copy Layout',
        detail: 'Organize Home, About, Services, Portfolio, and Contact routes for clear buyer journeys.',
      },
      {
        step: '03',
        title: 'Full-Stack Engineering & Form Verification',
        detail: 'Implement responsive components, inquiry validation, and Schema.org business markup.',
      },
      {
        step: '04',
        title: 'Production Launch in 1 - 2 Days',
        detail: 'Deploy your live corporate website with verified speed, mobile compatibility, and domain SSL.',
      },
    ],
    faqs: [
      {
        question: 'What is included in the PKR 25,999 ($94) Business Website package?',
        answer:
          'It includes a multi-page custom responsive design, services and portfolio showcase, validated inquiry/quote forms, WhatsApp/call integration, and full on-page technical SEO delivered in 1–2 days.',
      },
      {
        question: 'Do you build websites specifically for Pakistani schools and hospitals?',
        answer:
          'Yes! Hospitals & Healthcare websites (PKR 38,999 / $141) include doctor rosters and booking engines; School & Academy portals (PKR 40,000 / $144) include admissions workflows and circulars.',
      },
      {
        question: 'Can we upgrade or add more pages later?',
        answer:
          'Yes. Because the site is built with clean modular React components, adding new services, case studies, or portal modules later is seamless.',
      },
    ],
    relatedRoutes: [
      {
        title: 'SEO Services',
        description: 'Boost search visibility across Pakistan & international keywords.',
        to: '/seo-services',
      },
      {
        title: 'Our Projects',
        description: 'Review Oakwood Academy, Aethelred Hospital, and Apex Logistics case studies.',
        to: '/portfolio',
      },
      {
        title: 'Website Development',
        description: 'Explore our full-stack technical capabilities and rapid sprint architecture.',
        to: '/website-development',
      },
    ],
  },

  '/portfolio-websites': {
    slug: 'portfolio-websites',
    route: '/portfolio-websites',
    badge: 'PERSONAL BRANDS & CREATIVES',
    shortTitle: 'Portfolio Website Development',
    h1Prefix: 'Portfolio Website Development for',
    h1Highlight: 'Founders & Professionals',
    leadSummary:
      'Showcase your expertise, case studies, and interactive presentations with a high-impact portfolio website designed to win higher-value clients and opportunities.',
    pakistanAndGlobalNote:
      'Ideal for executives, architects, doctors, freelancers, photographers, and creative studios across Pakistan and worldwide.',
    turnaround: '1 - 2 Days Delivery',
    investmentLabel: 'Starting from PKR 17,999 ($65)',
    preselectedFormService: 'High-converting landing page for Google Ads (PKR 17,999 / $65)',
    highlights: [
      {
        title: 'Interactive Case Study & Slide Decks',
        description:
          'Go beyond static screenshots with filterable project galleries, detailed problem-vs-solution breakdowns, and smooth interactive modal previews.',
      },
      {
        title: 'Personal Authority & Bio Storytelling',
        description:
          'Present your career milestones, technical skills, client outcomes, and direct booking links with editorial precision.',
      },
      {
        title: 'Fluid Motion & Modern Polish',
        description:
          'Smooth Framer Motion transitions and clean spatial hierarchy leave an unforgettable first impression on recruiters and enterprise clients.',
      },
      {
        title: 'Instant Client Contact Routing',
        description:
          'Frictionless inquiry forms, downloadable CV/profile integration, and 1-click WhatsApp consultation links.',
      },
    ],
    deliverables: [
      'Custom Hero & Personal Authority Section',
      'Filterable Work Showcase + Detailed Project Modal',
      'Interactive Presentation / Slide Deck option',
      'Skills, Process & Testimonials Integration',
      'Direct WhatsApp & Email Inquiry Form',
      'Personal Brand SEO & Open Graph Social Sharing Cards',
    ],
    targetAudiences: [
      {
        title: 'Freelancers & Remote Engineers',
        detail: 'Stand out to international clients on LinkedIn, Upwork, and direct outreach.',
      },
      {
        title: 'Founders & Executives',
        detail: 'Establish authoritative personal presence with verified leadership credentials.',
      },
      {
        title: 'Architects, Designers & Agencies',
        detail: 'Display visual projects crisply with mobile-friendly high-res galleries.',
      },
      {
        title: 'Consultants & Specialists',
        detail: 'Convert profile visitors directly into scheduled consultation calls.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Curate Your Best Work',
        detail: 'Share your top 3–6 projects, bio summary, and target audience via WhatsApp.',
      },
      {
        step: '02',
        title: 'Storyline & Visual Architecture',
        detail: 'We craft a distinctive visual layout that highlights outcomes rather than clutter.',
      },
      {
        step: '03',
        title: 'Interactive Gallery & Animation Build',
        detail: 'Develop smooth project filters, detail modals, and crisp mobile views.',
      },
      {
        step: '04',
        title: 'SEO Setup & Custom Domain Launch',
        detail: 'Configure your name/brand metadata so your portfolio ranks cleanly when searched.',
      },
    ],
    faqs: [
      {
        question: 'Can you include interactive animations or a 3D/morph showcase?',
        answer:
          'Yes! Look at our own Portfolio page for live examples of smooth morph animations and interactive case studies engineered in React and Motion.',
      },
      {
        question: 'How fast can my personal portfolio go live?',
        answer:
          'Within 1 to 2 days once you share your bio, project highlights, and preferred contact channels.',
      },
      {
        question: 'Will my portfolio look great when shared on LinkedIn or WhatsApp?',
        answer:
          'Yes. Every portfolio site includes configured Open Graph title, description, and preview image tags for clean social link previews.',
      },
    ],
    relatedRoutes: [
      {
        title: 'See Live Portfolio & PPT Deck',
        description: 'Experience our interactive project case studies and morphing slide deck.',
        to: '/portfolio',
      },
      {
        title: 'Web Design & UI/UX',
        description: 'Explore how we craft distinctive visual layouts and typography.',
        to: '/web-design',
      },
      {
        title: 'Contact Us',
        description: 'Send your project summary and launch your portfolio in 1–2 days.',
        to: '/contact',
      },
    ],
  },

  '/ai-website-development': {
    slug: 'ai-website-development',
    route: '/ai-website-development',
    badge: 'INTELLIGENT WEB APPLICATIONS',
    shortTitle: 'AI Website Development',
    h1Prefix: 'AI Website Development &',
    h1Highlight: 'Smart Automation Workflows',
    leadSummary:
      'Build intelligent websites with smart interactive tools, automated lead qualification, dynamic calculators, and modern server-side API integrations.',
    pakistanAndGlobalNote:
      'Empowering modern businesses in Pakistan and international startups with practical, fast, API-driven web features that save manual team hours.',
    turnaround: 'Rapid Custom Sprint',
    investmentLabel: 'Starting from PKR 32,999 ($119)',
    preselectedFormService: 'Custom website & web application (PKR 32,999 / $119)',
    highlights: [
      {
        title: 'Secure Server-Side API Architecture',
        description:
          'All intelligent endpoints and API integrations run safely on Node.js/Express backends—never exposing sensitive API keys in browser code.',
      },
      {
        title: 'Interactive Estimators & Smart Workflows',
        description:
          'Custom interactive quote builders, automated requirement checklists, and intelligent intake triage that pre-qualify leads before they message you.',
      },
      {
        title: 'Smart Document & Portal Assistants',
        description:
          'Structured knowledge filtering, instant FAQ search, and streamlined client project portals built with TypeScript reliability.',
      },
      {
        title: 'Zero Performance Penalty',
        description:
          'Clean async loading states and optimized React rendering keep core marketing pages lightning fast for Google Search rankings.',
      },
    ],
    deliverables: [
      'Custom React + Node.js/Express full-stack architecture',
      'Secure backend proxy endpoints (`/api/*`) with environment variable isolation',
      'Interactive cost calculator, smart intake form, or dynamic workflow tool',
      'Automated lead dispatch formatting for WhatsApp & Email workflows',
      'Mobile-responsive dashboard & client view',
      'Technical SEO preserved across public landing routes',
    ],
    targetAudiences: [
      {
        title: 'Tech Startups & SaaS Builders',
        detail: 'Ship your interactive MVP or smart web application quickly with clean full-stack TypeScript.',
      },
      {
        title: 'Service Agencies & Consultancies',
        detail: 'Automate project scoping, pricing estimates, and lead qualification around the clock.',
      },
      {
        title: 'Educational & Healthcare Systems',
        detail: 'Streamline student admissions triage and patient appointment routing cleanly.',
      },
      {
        title: 'Operations Teams',
        detail: 'Replace manual spreadsheets with fast browser-based tools and automated reporting.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Automation & Feature Architecture',
        detail: 'Identify which manual intake or customer workflow should be automated for highest ROI.',
      },
      {
        step: '02',
        title: 'Backend API & Security Design',
        detail: 'Build clean Express routes with strict validation and zero exposed credentials.',
      },
      {
        step: '03',
        title: 'Interactive Frontend Engineering',
        detail: 'Create responsive React interfaces with clear states, error handling, and instant feedback.',
      },
      {
        step: '04',
        title: 'End-to-End Testing & Deployment',
        detail: 'Verify API responses, security rules, and production build performance before release.',
      },
    ],
    faqs: [
      {
        question: 'Are API keys kept safe in AI or API-integrated websites?',
        answer:
          'Yes. Any third-party API keys or integrations are handled strictly on the backend server via environment variables, never exposed in frontend code.',
      },
      {
        question: 'What kind of smart features can you build into my website?',
        answer:
          'We build interactive cost/quote calculators, multi-step dynamic intake forms, automated WhatsApp summary builders, smart search/filtering, and custom client portals.',
      },
      {
        question: 'Will smart interactive features hurt my Google SEO rankings?',
        answer:
          'No. Public marketing pages remain lightweight, crawlable, and fast with dedicated SEO metadata and structured data.',
      },
    ],
    relatedRoutes: [
      {
        title: 'Custom Software Development',
        description: 'Full-stack portals, authentication, and bespoke web applications.',
        to: '/custom-software-development',
      },
      {
        title: 'Website Development',
        description: 'Core full-stack web engineering delivered in 1 - 2 days.',
        to: '/website-development',
      },
      {
        title: 'Try Our Quote Estimator & Contact',
        description: 'Test our interactive estimator and submit your custom scope.',
        to: '/contact',
      },
    ],
  },

  '/custom-software-development': {
    slug: 'custom-software-development',
    route: '/custom-software-development',
    badge: 'BESPOKE WEB APPLICATIONS & PORTALS',
    shortTitle: 'Custom Software Development',
    h1Prefix: 'Custom Software & Web App',
    h1Highlight: 'Development Solutions',
    leadSummary:
      'When ready-made templates fall short, we engineer tailored client portals, booking engines, institutional dashboards, and database-driven web applications.',
    pakistanAndGlobalNote:
      'Trusted by startups, healthcare centers, academic academies, and commercial enterprises needing reliable TypeScript + Node.js systems.',
    turnaround: '1 - 2 Days Core Sprint · Scoped Milestones for Large Apps',
    investmentLabel: 'Starting from PKR 32,999 ($119)',
    preselectedFormService: 'Custom website & web application (PKR 32,999 / $119)',
    highlights: [
      {
        title: 'Role-Based Client & Admin Portals',
        description:
          'Secure authentication flows, project milestone trackers, document sharing, and real-time inquiry management dashboards tailored to your workflow.',
      },
      {
        title: 'School & Hospital Management Modules',
        description:
          'Specialized student admission pipelines, academic calendars, OPD doctor schedules, and diagnostic catalogs built with intuitive UX.',
      },
      {
        title: 'Clean Express / Node.js REST APIs',
        description:
          'Modular backend architecture with strict input validation, OTP verification workflows, and clean JSON API contracts.',
      },
      {
        title: 'Scalable Modular Architecture',
        description:
          'Built with React 19, TypeScript, and Tailwind CSS so your internal software grows smoothly alongside your business.',
      },
    ],
    deliverables: [
      'Custom React + TypeScript frontend application',
      'Express / Node.js backend routes with form & data validation',
      'Role-aware dashboard views & client communication hubs',
      'Verified OTP / inquiry persistence & WhatsApp sync integration',
      'Clean environment variable separation & deployment scripts',
      '100% source code ownership transferred upon completion',
    ],
    targetAudiences: [
      {
        title: 'Schools & Educational Networks',
        detail: 'Digital admission workflows, faculty directories, and downloadable parent circulars.',
      },
      {
        title: 'Hospitals & Multi-Doctor Clinics',
        detail: 'Doctor roster filtering, appointment booking requests, and emergency dispatch bars.',
      },
      {
        title: 'Commercial Enterprises & Logistics',
        detail: 'Custom route/freight calculators, lead tracking dashboards, and client portals.',
      },
      {
        title: 'Startups Building Custom Products',
        detail: 'Fast, clean MVP development without bloated legacy codebases.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Technical Specification & Data Modeling',
        detail: 'Map every user role, form field, dashboard panel, and API route directly with Ibraheem Talat.',
      },
      {
        step: '02',
        title: 'Backend API & Validation Engineering',
        detail: 'Build secure endpoints, OTP/lead storage, and error handling before UI wiring.',
      },
      {
        step: '03',
        title: 'Dashboard & Portal UI Assembly',
        detail: 'Craft clean, responsive interfaces that non-technical staff and clients can use immediately.',
      },
      {
        step: '04',
        title: 'Production Audit & Handover',
        detail: 'Run TypeScript compilation, security checks, and deploy live with documentation.',
      },
    ],
    faqs: [
      {
        question: 'What does Custom Website & Web App Development start at?',
        answer:
          'Custom Website & Web Application projects start at PKR 32,999 ($119), while specialized Hospital systems start at PKR 38,999 ($141) and School portals at PKR 40,000 ($144).',
      },
      {
        question: 'Can you build a client tracking portal like the one on your site?',
        answer:
          'Yes! Click the Portal button in our navigation bar to preview the exact style of authenticated project dashboards we build for organizations.',
      },
      {
        question: 'Do you sign off with full source code access?',
        answer:
          'Yes, you receive complete ownership of your codebase and clean deployment setup.',
      },
    ],
    relatedRoutes: [
      {
        title: 'AI Website Development',
        description: 'Explore smart interactive calculators and automated intake workflows.',
        to: '/ai-website-development',
      },
      {
        title: 'Business Website Development',
        description: 'Need a corporate site or institutional platform? View full deliverables.',
        to: '/business-websites',
      },
      {
        title: 'About Our Engineering Stack',
        description: 'Meet CEO Ibraheem Talat and review our React, TypeScript & Node.js stack.',
        to: '/about',
      },
    ],
  },

  '/seo-services': {
    slug: 'seo-services',
    route: '/seo-services',
    badge: 'TECHNICAL & LOCAL GOOGLE SEO',
    shortTitle: 'SEO Services',
    h1Prefix: 'Technical & Local SEO Services in',
    h1Highlight: 'Pakistan & International Markets',
    leadSummary:
      'Turn your website into an organic lead engine with clean semantic HTML, valid Schema.org JSON-LD, XML sitemaps, sub-second page speeds, and Google Ads alignment.',
    pakistanAndGlobalNote:
      'Engineered to help Pakistani businesses, clinics, and academies rank on Google Search while maintaining global technical SEO standards.',
    turnaround: '1 - 2 Days SEO Audit & Implementation',
    investmentLabel: 'Included in Business Builds · Standalone Optimization Available',
    preselectedFormService: 'Business website development (PKR 25,999 / $94)',
    highlights: [
      {
        title: 'Clean Multi-Page URL & Heading Hierarchy',
        description:
          'Every service gets its own indexable canonical URL, one clear H1 heading, logical H2/H3 structure, and breadcrumb navigation.',
      },
      {
        title: 'Rich Schema.org JSON-LD Markup',
        description:
          'Valid Organization, ProfessionalService, Service, FAQPage, and BreadcrumbList structured data so Google understands your exact offerings.',
      },
      {
        title: 'Core Web Vitals & Speed Optimization',
        description:
          'Minimal JavaScript bundle overhead, clean image sizing, and fast Vite production output delivering 95+ performance scores.',
      },
      {
        title: 'Google Search Console & Ads Synergy',
        description:
          'Verified sitemap.xml, clean robots.txt, Open Graph social cards, and high Quality Score landing structure that lowers Google Ads CPC.',
      },
    ],
    deliverables: [
      'Unique keyword-focused Titles & Meta Descriptions per page',
      'Canonical URLs, Open Graph & Twitter Card metadata',
      'Valid JSON-LD structured data (Service, Organization, BreadcrumbList)',
      'Updated XML Sitemap (`sitemap.xml`) & `robots.txt` configuration',
      'Descriptive image `alt` attributes & accessibility improvements',
      'Google Search Console verification & crawlability check',
    ],
    targetAudiences: [
      {
        title: 'Local Pakistani Businesses',
        detail: 'Capture high-intent searches across Pakistan without paying for every single click.',
      },
      {
        title: 'Sites Struggling to Index',
        detail: 'Convert hidden single-page sites into clean multi-page architectures Google loves to crawl.',
      },
      {
        title: 'Google Ads Advertisers',
        detail: 'Improve landing page relevance and load speed to boost Quality Score and cut ad spend.',
      },
      {
        title: 'Schools & Medical Practices',
        detail: 'Help local parents and patients discover your admissions or clinic specialties organically.',
      },
    ],
    workflow: [
      {
        step: '01',
        title: 'Crawl, Speed & Metadata Audit',
        detail: 'Identify duplicate titles, missing canonical tags, heading errors, and slow assets.',
      },
      {
        step: '02',
        title: 'Keyword & Page Architecture Mapping',
        detail: 'Assign clean URLs and unique topic focus per service page with zero keyword stuffing.',
      },
      {
        step: '03',
        title: 'On-Page, Schema & Speed Implementation',
        detail: 'Implement semantic HTML, JSON-LD structured data, alt tags, and sitemap/robots files.',
      },
      {
        step: '04',
        title: 'Indexing Check & Search Console Sync',
        detail: 'Verify meta tags, canonical resolution, and clean production rendering before launch.',
      },
    ],
    faqs: [
      {
        question: 'Do you use black-hat SEO tricks or fake backlinks?',
        answer:
          'Never. We follow strict Google Search Essentials: clean semantic code, genuine service pages, fast page loading, accurate Schema markup, and real user value.',
      },
      {
        question: 'Does a multi-page structure help SEO compared to a single page?',
        answer:
          'Yes! Giving each core service its own dedicated URL, H1, title, and description allows search engines to index and rank each service specifically.',
      },
      {
        question: 'Can you also build fast Google Ads landing pages alongside SEO?',
        answer:
          'Yes! Our High-Converting Landing Pages for Google Ads start at PKR 17,999 ($65) and deliver in 1–2 days.',
      },
    ],
    relatedRoutes: [
      {
        title: 'Website for Your Shop in Pakistan',
        description: 'Get an online store with product catalog & WhatsApp orders in 1–2 days.',
        to: '/website-for-shops-pakistan',
      },
      {
        title: 'Business Website Development',
        description: 'Launch an SEO-ready corporate website for PKR 25,999 ($94).',
        to: '/business-websites',
      },
      {
        title: 'Request an SEO Audit or Build',
        description: 'Contact CEO Ibraheem Talat directly on WhatsApp or via our inquiry form.',
        to: '/contact',
      },
    ],
  },
};

export const ALL_SERVICE_NAV_ITEMS = [
  {
    route: '/website-for-shops-pakistan',
    title: 'Website for Shops (Pakistan)',
    shortDesc: 'Online store, product catalog & WhatsApp orders in 1–2 days',
    badge: 'Shopkeepers Special',
  },
  {
    route: '/website-development',
    title: 'Website Development',
    shortDesc: 'Full-stack React & Node.js websites in 1–2 days',
    badge: 'From PKR 17,999',
  },
  {
    route: '/web-design',
    title: 'Web Design',
    shortDesc: 'Modern mobile-first UI/UX & brand interfaces',
    badge: 'Conversion UI/UX',
  },
  {
    route: '/ecommerce-development',
    title: 'E-commerce Development',
    shortDesc: 'Fast online stores with COD & WhatsApp checkout',
    badge: 'Online Stores',
  },
  {
    route: '/business-websites',
    title: 'Business Website Development',
    shortDesc: 'Corporate, school & hospital web platforms',
    badge: 'PKR 25,999 ($94)',
  },
  {
    route: '/portfolio-websites',
    title: 'Portfolio Website Development',
    shortDesc: 'Executive & creative showcase websites',
    badge: 'Personal Brands',
  },
  {
    route: '/ai-website-development',
    title: 'AI Website Development',
    shortDesc: 'Smart tools, interactive calculators & automation',
    badge: 'Smart Web Apps',
  },
  {
    route: '/custom-software-development',
    title: 'Custom Software Development',
    shortDesc: 'Portals, booking engines & database apps',
    badge: 'From PKR 32,999',
  },
  {
    route: '/seo-services',
    title: 'SEO Services',
    shortDesc: 'Technical SEO, Schema markup & Core Web Vitals',
    badge: 'Google Ranking',
  },
];
