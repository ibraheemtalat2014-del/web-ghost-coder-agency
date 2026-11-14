import React from 'react';
import { Hero } from '../components/Hero';
import { WebsiteMenuCards } from '../components/WebsiteMenuCards';
import { Advantages } from '../components/Advantages';
import { Services } from '../components/Services';
import { Pricing } from '../components/Pricing';
import { DevelopmentProcess } from '../components/DevelopmentProcess';
import { Testimonials } from '../components/Testimonials';
import { ServiceItem } from '../types';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Link } from '../context/RouterContext';
import { ArrowRight, FolderGit2, MessageSquare, Phone, Store, Terminal } from 'lucide-react';

interface HomePageProps {
  onQuoteClick: () => void;
  onExploreServicesClick: () => void;
  onSelectService: (service: ServiceItem) => void;
  onOrderService: (serviceTitle: string) => void;
  onSelectPackage: (packageName: string, price: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onQuoteClick,
  onExploreServicesClick,
  onSelectService,
  onOrderService,
  onSelectPackage,
}) => {
  return (
    <>
      <Hero
        onQuoteClick={onQuoteClick}
        onExploreServicesClick={onExploreServicesClick}
      />

      <WebsiteMenuCards />

      <Advantages onQuoteClick={onQuoteClick} />

      <Services
        onSelectService={onSelectService}
        onOrderService={onOrderService}
      />

      <Pricing onSelectPackage={onSelectPackage} />

      <DevelopmentProcess onQuoteClick={onQuoteClick} />

      <Testimonials />

      {/* Multi-Page Quick Action Banner to Portfolio & Contact */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-[#070b16] dark:via-[#0b1120] dark:to-[#070b16] border-t border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0b101e] border-2 border-sky-200 dark:border-cyan-500/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-300 bg-sky-100 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3 py-1 rounded-lg mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>READY TO LAUNCH IN 1 - 2 DAYS?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Explore Live Case Studies or Start Your Project Today
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Inspect our portfolio presentations built for schools, hospitals, and corporate firms, or connect directly with CEO Ibraheem Talat during our daily 4:00 PM – 8:00 PM PKT ordering window.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
              >
                <span>Open Quote &amp; Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/website-for-shops-pakistan"
                className="px-5 py-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 hover:bg-emerald-200 dark:hover:bg-emerald-900/90 text-emerald-900 dark:text-emerald-200 border border-emerald-400 dark:border-emerald-500/50 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Website for Your Shop</span>
              </Link>
              <Link
                to="/portfolio"
                className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-cyan-500/40 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <FolderGit2 className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>View Our Projects</span>
              </Link>
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 03009464514</span>
              </a>
              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="px-4 py-3.5 rounded-xl bg-white dark:bg-[#090e1c] text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
