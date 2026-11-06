import React from 'react';
import { CORE_ADVANTAGES, AGENCY_CONFIG } from '../data/agencyData';
import { Zap, Sparkles, Coins, ArrowRight, Terminal, MessageSquare, Phone } from 'lucide-react';

interface AdvantagesProps {
  onQuoteClick: () => void;
}

export const Advantages: React.FC<AdvantagesProps> = ({ onQuoteClick }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-sky-600 dark:text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      default:
        return <Terminal className="w-6 h-6 text-sky-600 dark:text-cyan-400" />;
    }
  };

  return (
    <section id="advantages" className="py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-extrabold tracking-wider uppercase text-sky-800 dark:text-cyan-400 mb-2 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3 py-1 rounded-lg">
            <Terminal className="w-3.5 h-3.5" />
            <span>// THE CODER ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Built in <span className="coder-gradient-text">1 - 2 Days</span> with Modern Code &amp; Transparent Rates
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Forget about slow agencies that take weeks or months. We build, optimize, and deploy complete, high-converting websites in just 24 to 48 hours.
          </p>
        </div>

        {/* 3 Core Advantages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_ADVANTAGES.map((adv, idx) => (
            <div
              key={adv.title}
              className="p-8 bg-sky-50/60 hover:bg-sky-50/90 dark:bg-[#0b101e]/80 dark:hover:bg-[#0e1628] rounded-3xl border border-sky-200 dark:border-cyan-500/20 hover:border-sky-400 dark:hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Clean index and icon row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-all shadow-sm">
                    {getIcon(adv.icon)}
                  </div>
                  <span className="text-xs font-mono font-black text-sky-800 dark:text-cyan-400 bg-sky-100 dark:bg-cyan-950/80 px-2.5 py-1 rounded-md border border-sky-200 dark:border-cyan-500/20">
                    0{idx + 1}_FEATURE
                  </span>
                </div>

                {/* Advantage Title */}
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1.5 tracking-tight group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                  {adv.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs font-mono text-sky-700 dark:text-cyan-400 font-bold mb-4">
                  {adv.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                  {adv.description}
                </p>

                {/* Metrics Callout */}
                <div className="p-3 bg-white dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800/80 mb-6 shadow-xs">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-0.5">
                    Verified Coder Metric:
                  </span>
                  <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                    {adv.metric}
                  </span>
                </div>
              </div>

              {/* Card Action Link */}
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 group-hover:text-sky-900 dark:group-hover:text-cyan-300 transition-colors pt-4 border-t border-slate-200 dark:border-slate-800/80 cursor-pointer"
              >
                <span>Request {adv.title.split(' ')[0]} Sprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Advantage Bottom Ribbon Notice with WhatsApp and Call preference */}
        <div className="mt-12 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-300">
              WhatsApp and call orders are more comfortable and preferable. "Your choice is our code."
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-sm"
            >
              Order on WhatsApp
            </a>
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="py-2 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-all"
            >
              Call 03009464514
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
