import React from 'react';
import {
  Code2,
  Presentation,
  FolderGit2,
  Tag,
  Calculator,
  Clock,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const WebsiteMenuCards: React.FC = () => {
  const menuCards = [
    {
      id: 'services',
      href: '#services',
      category: 'Core Engineering',
      title: 'Services & Pricing',
      description: 'Hospital portals, School admissions, Real Estate, E-Commerce, and Google Ads landing pages with 95+ PageSpeed.',
      badge: 'From PKR 17,999 ($65)',
      turnaround: '1 - 2 Days',
      icon: Code2,
      accent: 'from-sky-500 via-cyan-400 to-blue-500',
      badgeStyle: 'bg-sky-100 dark:bg-cyan-950/90 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/40',
      cta: 'Explore 5 Services',
    },
    {
      id: 'portfolio-deck',
      href: '#portfolio-deck',
      category: 'Interactive Showcase',
      title: 'Portfolio PPT Slides',
      description: 'Morphing 5-slide agency presentation deck demonstrating hospital systems, school admissions, and live code architecture.',
      badge: '5 Interactive Slides',
      turnaround: 'Live In-Browser',
      icon: Presentation,
      accent: 'from-purple-500 via-indigo-400 to-violet-500',
      badgeStyle: 'bg-purple-100 dark:bg-purple-950/90 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40',
      cta: 'View PPT Presentation',
    },
    {
      id: 'portfolio',
      href: '#portfolio',
      category: 'Case Studies',
      title: 'Sample Projects',
      description: 'Explore live, working sample projects including MediCare Hospital, Beacon Academy, and Nexus Growth Landing.',
      badge: 'Interactive Previews',
      turnaround: 'Filterable Portfolio',
      icon: FolderGit2,
      accent: 'from-cyan-500 via-teal-400 to-emerald-500',
      badgeStyle: 'bg-cyan-100 dark:bg-cyan-950/90 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40',
      cta: 'Inspect Live Work',
    },
    {
      id: 'pricing',
      href: '#pricing',
      category: 'Financial Packages',
      title: 'Pricing & Packages',
      description: 'Transparent fixed-rate investments: Starter (PKR 17,999), Professional (PKR 34,999), and Custom Enterprise (PKR 69,999).',
      badge: 'Zero Hidden Fees',
      turnaround: '24 - 48h Delivery',
      icon: Tag,
      accent: 'from-emerald-500 via-teal-400 to-cyan-500',
      badgeStyle: 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40',
      cta: 'Compare 3 Packages',
    },
    {
      id: 'estimator',
      href: '#estimator',
      category: 'Live Calculation',
      title: 'Interactive Cost Estimator',
      description: 'Select your website type, page count, and speed requirements to generate an instant price and delivery timeline estimate.',
      badge: 'Instant Real-Time Quote',
      turnaround: 'Calculated Live',
      icon: Calculator,
      accent: 'from-amber-500 via-orange-400 to-yellow-500',
      badgeStyle: 'bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40',
      cta: 'Calculate Your Build',
    },
    {
      id: 'process',
      href: '#process',
      category: 'Delivery Pipeline',
      title: '48-Hour Rapid Process',
      description: 'Our streamlined 5-step engineering pipeline: Discovery, Wireframing, Rapid Build, QA Testing, and Live Launch.',
      badge: 'Strict 1 - 2 Days Guarantee',
      turnaround: '48h Production',
      icon: Clock,
      accent: 'from-blue-500 via-sky-400 to-cyan-500',
      badgeStyle: 'bg-blue-100 dark:bg-blue-950/90 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/40',
      cta: 'See 5-Step Process',
    },
    {
      id: 'advantages',
      href: '#advantages',
      category: 'Agency Advantages',
      title: 'Why Choose Web Ghost',
      description: 'Led directly by CEO Ibraheem Talat. No junior delegates, no agency markup, 100% full source code ownership.',
      badge: 'Direct Coder Access',
      turnaround: 'Zero Middlemen',
      icon: Sparkles,
      accent: 'from-rose-500 via-pink-400 to-purple-500',
      badgeStyle: 'bg-rose-100 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/40',
      cta: 'View Agency Pillars',
    },
    {
      id: 'faq',
      href: '#faq',
      category: 'Client Support',
      title: 'FAQ & Direct Line',
      description: 'Answers on WhatsApp orders, payment milestones, revisions, domain hosting, and daily 4:00 PM – 8:00 PM PKT hours.',
      badge: 'Daily Ordering Support',
      turnaround: 'WhatsApp & Call',
      icon: HelpCircle,
      accent: 'from-indigo-500 via-purple-400 to-pink-500',
      badgeStyle: 'bg-indigo-100 dark:bg-indigo-950/90 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40',
      cta: 'Read Answers',
    },
  ];

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-white/70 dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Lead-in */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-700 dark:text-cyan-400 mb-2 bg-sky-50 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
              <Compass className="w-4 h-4" />
              <span>WEBSITE DIRECTORY &amp; MENU CARDS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Explore Our Website Through <span className="coder-gradient-text">Representable Cards</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              Click any menu card below to navigate directly to its dedicated section. Clear, readable, and organized for effortless discovery.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-300 dark:border-emerald-500/40 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>8 Representable Cards · 1-Click Smooth Jump</span>
          </div>
        </div>

        {/* 8-Card Responsive Bento Grid: Large, Highly Legible, Avant-Garde Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {menuCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href={card.href}
                onClick={(e) => handleCardClick(e, card.href)}
                className="group relative flex flex-col justify-between p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 bg-white dark:bg-[#0c1324] hover:bg-slate-50/80 dark:hover:bg-[#111b33] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Top Row: Category and Icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      0{idx + 1} · {card.category}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-5 h-5 text-sky-600 dark:text-cyan-400" />
                    </div>
                  </div>

                  {/* Card Title: Large and bold */}
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-2.5">
                    {card.title}
                  </h3>

                  {/* Card Description: High legibility */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-4 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Row: Badge and Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${card.badgeStyle} truncate`}>
                    {card.badge}
                  </span>

                  <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 shrink-0 font-sans">
                    <span>{card.cta}</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
