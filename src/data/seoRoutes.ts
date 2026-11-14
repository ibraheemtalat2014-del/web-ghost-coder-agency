import { BASE_URL } from '../context/RouterContext';

export interface RouteSEOConfig {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  breadcrumbLabel: string;
  parentBreadcrumb?: { label: string; path: string };
  schemaType: 'Home' | 'About' | 'Service' | 'Portfolio' | 'Contact' | 'NotFound';
  serviceName?: string;
  serviceCategory?: string;
}

export const ROUTE_SEO_MAP: Record<string, RouteSEOConfig> = {
  '/': {
    path: '/',
    title: 'Web Coder Agency | Fast Website Development in Pakistan',
    description:
      'Web Coder Agency builds fast, mobile-friendly websites for shops and businesses in Pakistan, ready in 1 to 2 days. Online stores, business sites, school & hospital portals.',
    keywords:
      'Web Coder Agency, Web Ghost Coder Agency, Website Development in Pakistan, website for shop, website developer in Pakistan, online store website Pakistan, website banane wali company Pakistan',
    canonical: `${BASE_URL}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Home',
    schemaType: 'Home',
  },
  '/website-for-shops-pakistan': {
    path: '/website-for-shops-pakistan',
    title: 'Website for Your Shop in Pakistan, Delivered in 1 to 2 Days',
    description:
      'Affordable, professional websites for shop owners across Pakistan. We deliver your shop website in just 1 to 2 days. Get online and reach more customers 24/7.',
    keywords:
      'website for shop, website developer in Pakistan, online store website Pakistan, website banane wali company Pakistan, shop website Pakistan, ecommerce website for shopkeepers',
    canonical: `${BASE_URL}/website-for-shops-pakistan`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Website for Shops in Pakistan',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Website for Your Shop in Pakistan',
    serviceCategory: 'Shop & Online Store Website Development',
  },
  '/about': {
    path: '/about',
    title: 'About Us – CEO Ibraheem Talat | Web Ghost Coder Agency',
    description:
      'Learn about Web Ghost Coder Agency, founded by Ibraheem Talat. Discover our 1–2 days rapid development workflow, direct coder access, and engineering stack.',
    keywords:
      'About Web Ghost Coder Agency, Ibraheem Talat, Full-Stack Web Agency Pakistan, Fast Website Delivery, Direct Coder Access',
    canonical: `${BASE_URL}/about`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'About Us',
    schemaType: 'About',
  },
  '/website-development': {
    path: '/website-development',
    title: 'Website Development Services in Pakistan | Web Ghost Coder Agency',
    description:
      'Fast, mobile-friendly website development in Pakistan and globally. Clean React & Node.js code delivered in 1–2 days starting from PKR 17,999.',
    keywords:
      'Website Development in Pakistan, Full-Stack Website Development, React Website Development, Fast Loading Websites, Responsive Web Development',
    canonical: `${BASE_URL}/website-development`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Website Development',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Website Development Services',
    serviceCategory: 'Full-Stack Web Development',
  },
  '/web-design': {
    path: '/web-design',
    title: 'Professional Web Design & UI/UX Services | Web Ghost Coder Agency',
    description:
      'Modern, conversion-focused web design in Pakistan for businesses, schools, hospitals, and startups. Responsive mobile-first layouts built for performance.',
    keywords:
      'Professional Web Design, UI/UX Web Design Pakistan, Modern Website Design, Responsive Web Design, Mobile-First Website Design',
    canonical: `${BASE_URL}/web-design`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Web Design',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Professional Web Design & UI/UX',
    serviceCategory: 'Web Design',
  },
  '/ecommerce-development': {
    path: '/ecommerce-development',
    title: 'E-Commerce Website Development in Pakistan | Web Ghost Coder Agency',
    description:
      'Launch high-converting online stores with e-commerce development in Pakistan. Fast product catalogs, cart flows, WhatsApp checkout & mobile speed.',
    keywords:
      'E-commerce Development Pakistan, Online Store Website Development, Shopping Website Pakistan, WhatsApp Order Store, Custom E-commerce',
    canonical: `${BASE_URL}/ecommerce-development`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'E-Commerce Development',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'E-commerce Website Development',
    serviceCategory: 'E-commerce Solutions',
  },
  '/business-websites': {
    path: '/business-websites',
    title: 'Business Website Development Pakistan | Web Ghost Coder Agency',
    description:
      'Build corporate authority with business website development in Pakistan starting at PKR 25,999 ($94). Lead capture forms, WhatsApp hooks & 1–2 days delivery.',
    keywords:
      'Business Website Development, Corporate Website Pakistan, Company Website Design, B2B Website Development, Small Business Website Pakistan',
    canonical: `${BASE_URL}/business-websites`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Business Websites',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Business Website Development',
    serviceCategory: 'Corporate & Business Web Solutions',
  },
  '/portfolio-websites': {
    path: '/portfolio-websites',
    title: 'Portfolio Website Development | Creative & Executive Sites',
    description:
      'Stand out online with custom portfolio website development for founders, doctors, consultants, and creatives. Fast, interactive & mobile-ready.',
    keywords:
      'Portfolio Website Development, Personal Brand Website, Executive Portfolio Design, Freelancer Portfolio Site Pakistan',
    canonical: `${BASE_URL}/portfolio-websites`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Portfolio Websites',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Portfolio Website Development',
    serviceCategory: 'Personal & Creative Portfolio Design',
  },
  '/ai-website-development': {
    path: '/ai-website-development',
    title: 'AI Website Development & Smart Web Solutions | Web Ghost Coder Agency',
    description:
      'Integrate smart automation, interactive quote tools, and intelligent workflows with AI website development in Pakistan and globally by senior engineers.',
    keywords:
      'AI Website Development, Smart Web Applications Pakistan, AI-Powered Website Integration, Interactive Web Tools, Modern React AI Apps',
    canonical: `${BASE_URL}/ai-website-development`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'AI Website Development',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'AI Website Development',
    serviceCategory: 'Intelligent Web Applications',
  },
  '/custom-software-development': {
    path: '/custom-software-development',
    title: 'Custom Software & Web App Development | Web Ghost Coder Agency',
    description:
      'Tailored school portals, hospital booking platforms, and custom web software development starting from PKR 32,999 ($119) with 100% code ownership.',
    keywords:
      'Custom Software Development Pakistan, Custom Web Application Development, School Management Portal, Hospital Booking Software, React Node.js Apps',
    canonical: `${BASE_URL}/custom-software-development`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Custom Software Development',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Custom Software & Web Application Development',
    serviceCategory: 'Bespoke Software Engineering',
  },
  '/seo-services': {
    path: '/seo-services',
    title: 'Technical & Local SEO Services in Pakistan | Web Ghost Coder Agency',
    description:
      'Rank higher on Google with technical SEO services in Pakistan: clean semantic HTML, Schema.org JSON-LD, Core Web Vitals speed & Google Ads landing pages.',
    keywords:
      'SEO Services in Pakistan, Technical SEO Pakistan, On-Page SEO Optimization, Core Web Vitals Speed Optimization, Schema Markup Services',
    canonical: `${BASE_URL}/seo-services`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'SEO Services',
    parentBreadcrumb: { label: 'Website Development', path: '/website-development' },
    schemaType: 'Service',
    serviceName: 'Technical & On-Page SEO Services',
    serviceCategory: 'Search Engine Optimization',
  },
  '/portfolio': {
    path: '/portfolio',
    title: 'Our Projects & Portfolio Case Studies | Web Ghost Coder Agency',
    description:
      'Explore live portfolio case studies and interactive morphing PPT presentations for school portals, hospital booking systems, business sites & ad funnels.',
    keywords:
      'Web Ghost Coder Portfolio, Website Case Studies Pakistan, School Website Demo, Hospital Website Demo, Google Ads Landing Page Examples',
    canonical: `${BASE_URL}/portfolio`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Our Projects',
    schemaType: 'Portfolio',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us & Instant Quote | Web Ghost Coder Agency',
    description:
      'Order your website or calculate an instant quote. Direct WhatsApp and phone hotline (+92 300 9464514) daily 4:00 PM – 8:00 PM PKT. 1–2 days delivery.',
    keywords:
      'Contact Web Ghost Coder Agency, Order Website Pakistan, Website Quote Estimator, Ibraheem Talat Contact, WhatsApp Website Order',
    canonical: `${BASE_URL}/contact`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbLabel: 'Contact Us',
    schemaType: 'Contact',
  },
};

export const NOT_FOUND_SEO: RouteSEOConfig = {
  path: '/404',
  title: 'Page Not Found (404) | Web Ghost Coder Agency',
  description:
    'The page you are looking for could not be found. Explore Web Ghost Coder Agency services, portfolio projects, or contact us directly.',
  keywords: '404, Page Not Found, Web Ghost Coder Agency',
  canonical: `${BASE_URL}/`,
  robots: 'noindex, follow',
  breadcrumbLabel: '404 Not Found',
  schemaType: 'NotFound',
};
