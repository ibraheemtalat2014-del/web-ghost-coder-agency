import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AboutUs } from '../components/AboutUs';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { DevelopmentProcess } from '../components/DevelopmentProcess';
import { Testimonials } from '../components/Testimonials';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Link } from '../context/RouterContext';
import { ArrowRight, Code2, FolderGit2, ShieldCheck, Terminal } from 'lucide-react';

interface AboutPageProps {
  onQuoteClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onQuoteClick }) => {
  return (
    <>
      {/* Inner Page Hero Header with Primary H1 */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#060810] border-b border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 mb-3 bg-sky-100 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>ABOUT WEB GHOST CODER AGENCY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Full-Stack Precision Led Directly by{' '}
              <span className="coder-gradient-text">{AGENCY_CONFIG.ownerName}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Web Ghost Coder Agency delivers production-grade websites and custom web applications for businesses, schools, hospitals, and startups in Pakistan and worldwide in just 1 to 2 days—with transparent fixed pricing and direct engineer access.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/website-development"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>Explore Our Services</span>
              </Link>
              <Link
                to="/portfolio"
                className="px-5 py-3 rounded-xl bg-white dark:bg-[#0d1424] text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#131d36] transition-all"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Inspect Sample Projects</span>
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Core Leadership Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/30 shadow-xs">
              <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 uppercase">Founder &amp; CEO</div>
              <div className="text-base font-black text-slate-900 dark:text-white mt-1">{AGENCY_CONFIG.ownerName}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{AGENCY_CONFIG.ownerTitle}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-emerald-500/30 shadow-xs">
              <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">Ordering Window</div>
              <div className="text-base font-black text-slate-900 dark:text-white mt-1">{AGENCY_CONFIG.orderingHours}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">WhatsApp &amp; Call Preferred ({AGENCY_CONFIG.phone})</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/30 shadow-xs flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 uppercase">Code Philosophy</div>
                <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">"Your choice is our code."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutUs onQuoteClick={onQuoteClick} />

      <WhyChooseUs />

      <DevelopmentProcess onQuoteClick={onQuoteClick} />

      <Testimonials />
    </>
  );
};
