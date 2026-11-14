import React from 'react';
import { Link } from '../context/RouterContext';
import {
  Code2,
  Palette,
  ShoppingCart,
  Building2,
  Briefcase,
  Cpu,
  Layers,
  Search,
  ArrowUpRight,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const WebsiteMenuCards: React.FC = () => {
  const serviceDirectoryCards = [
    {
      id: 'website-development',
      to: '/website-development',
      category: 'Full-Stack Code',
      title: 'Website Development',
      description:
        'Fast, mobile-first React & Node.js websites engineered cleanly for businesses, schools, hospitals, and startups in Pakistan & globally.',
      badge: 'From PKR 17,999 ($65)',
      badgeStyle:
        'bg-sky-100 dark:bg-cyan-950/90 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/40',
      icon: Code2,
      cta: 'Explore Service',
    },
    {
      id: 'web-design',
      to: '/web-design',
      category: 'UI/UX Aesthetics',
      title: 'Web Design',
      description:
        'Modern conversion-centered UI/UX design systems with crisp typography, balanced contrast, and responsive layouts for all devices.',
      badge: 'Mobile-First UI/UX',
      badgeStyle:
        'bg-purple-100 dark:bg-purple-950/90 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40',
      icon: Palette,
      cta: 'Explore Service',
    },
    {
      id: 'ecommerce-development',
      to: '/ecommerce-development',
      category: 'Online Stores',
      title: 'E-Commerce Development',
      description:
        'High-speed online shopping storefronts with category filtering, shopping carts, Cash-on-Delivery checkout & WhatsApp order sync.',
      badge: 'COD & WhatsApp Ready',
      badgeStyle:
        'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40',
      icon: ShoppingCart,
      cta: 'Explore Service',
    },
    {
      id: 'business-websites',
      to: '/business-websites',
      category: 'Corporate & B2B',
      title: 'Business Website Development',
      description:
        'Authoritative company websites, school admission portals, and hospital booking systems delivered in just 1 to 2 days.',
      badge: 'PKR 25,999 ($94)',
      badgeStyle:
        'bg-blue-100 dark:bg-blue-950/90 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/40',
      icon: Building2,
      cta: 'Explore Service',
    },
    {
      id: 'portfolio-websites',
      to: '/portfolio-websites',
      category: 'Personal Brands',
      title: 'Portfolio Websites',
      description:
        'Interactive showcase websites and dynamic case-study decks designed for founders, doctors, consultants, and freelancers.',
      badge: 'Interactive Showcase',
      badgeStyle:
        'bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40',
      icon: Briefcase,
      cta: 'Explore Service',
    },
    {
      id: 'ai-website-development',
      to: '/ai-website-development',
      category: 'Smart Automation',
      title: 'AI Website Development',
      description:
        'Intelligent web applications featuring automated quote estimators, smart lead workflows, and secure server-side API integrations.',
      badge: 'Smart Web Systems',
      badgeStyle:
        'bg-cyan-100 dark:bg-cyan-950/90 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40',
      icon: Cpu,
      cta: 'Explore Service',
    },
    {
      id: 'custom-software-development',
      to: '/custom-software-development',
      category: 'Bespoke Portals',
      title: 'Custom Software Development',
      description:
        'Tailor-made school portals, hospital booking engines, role-based dashboards, and Express/Node.js dynamic web software.',
      badge: 'From PKR 32,999 ($119)',
      badgeStyle:
        'bg-indigo-100 dark:bg-indigo-950/90 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40',
      icon: Layers,
      cta: 'Explore Service',
    },
    {
      id: 'seo-services',
      to: '/seo-services',
      category: 'Google Growth',
      title: 'SEO Services',
      description:
        'Technical SEO in Pakistan & globally: clean semantic HTML, Schema.org JSON-LD, XML sitemaps, Core Web Vitals & Google Ads speed.',
      badge: 'Technical & Local SEO',
      badgeStyle:
        'bg-rose-100 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/40',
      icon: Search,
      cta: 'Explore Service',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white/70 dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-700 dark:text-cyan-400 mb-2 bg-sky-50 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
              <Compass className="w-4 h-4" />
              <span>SERVICE DIRECTORY &amp; DEDICATED PAGES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore Our 8 Specialized <span className="coder-gradient-text">Digital Services</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              Select any service card below to open its dedicated page with detailed deliverables, workflow, FAQs, and transparent rates.
            </p>
          </div>

          <Link
            to="/website-for-shops-pakistan"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-800 dark:text-emerald-200 font-bold bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/90 px-4 py-2.5 rounded-xl border border-emerald-400 dark:border-emerald-500/50 shrink-0 transition-all shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Shop Owners in Pakistan? View Shop Website Offer</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceDirectoryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.to}
                className="group relative flex flex-col justify-between p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 bg-white dark:bg-[#0c1324] hover:bg-slate-50/80 dark:hover:bg-[#111b33] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      0{idx + 1} · {card.category}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-4 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${card.badgeStyle} truncate`}>
                    {card.badge}
                  </span>

                  <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 shrink-0 font-sans">
                    <span>{card.cta}</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
