import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Portfolio } from '../components/Portfolio';
import { PortfolioDeck } from '../components/PortfolioDeck';
import { PortfolioItem } from '../types';
import { Link } from '../context/RouterContext';
import { ArrowRight, Code2, Presentation, Search } from 'lucide-react';

interface PortfolioPageProps {
  onSelectProject: (project: PortfolioItem) => void;
  onQuoteClick: () => void;
  onOrderProject: (projectTitle: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onSelectProject,
  onQuoteClick,
  onOrderProject,
}) => {
  return (
    <>
      {/* Inner Page Hero Header with Primary H1 */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#060810] border-b border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Breadcrumbs items={[{ label: 'Our Projects' }]} />

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 mb-3 bg-sky-100 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
              <Presentation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>PORTFOLIO CASE STUDIES &amp; INTERACTIVE PPT DECK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Our Projects &amp;{' '}
              <span className="coder-gradient-text">Morphing Case Studies</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Browse real-world web systems built for educational academies, healthcare hospitals, B2B logistics enterprises, and high-converting Google Ads funnels—engineered cleanly in 1 to 2 days.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all"
              >
                <span>Order a Similar Website</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/website-development"
                className="px-5 py-3 rounded-xl bg-white dark:bg-[#0d1424] text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#131d36] transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>Website Development</span>
              </Link>
              <Link
                to="/seo-services"
                className="px-5 py-3 rounded-xl bg-white dark:bg-[#0d1424] text-slate-800 dark:text-emerald-300 border border-slate-300 dark:border-emerald-500/40 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#131d36] transition-all"
              >
                <Search className="w-4 h-4" />
                <span>SEO Optimization</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Portfolio onSelectProject={onSelectProject} onQuoteClick={onQuoteClick} />

      <PortfolioDeck onOrderProject={onOrderProject} />
    </>
  );
};
