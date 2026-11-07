import React from 'react';
import { DEVELOPMENT_PROCESS, AGENCY_CONFIG } from '../data/agencyData';
import { ArrowRight, CheckCircle2, Terminal, MessageSquare, Phone } from 'lucide-react';

interface ProcessProps {
  onQuoteClick: () => void;
}

export const DevelopmentProcess: React.FC<ProcessProps> = ({ onQuoteClick }) => {
  return (
    <section id="process" className="py-20 bg-slate-50 dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-400 mb-2 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3.5 py-1.5 rounded-xl shadow-xs">
            <Terminal className="w-4 h-4" />
            <span>06. 48-HOUR SPRINT PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            From Concept to Live Website in <span className="coder-gradient-text">1 - 2 Days</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
            A battle-tested 48-hour development pipeline engineered for zero delays, constant progress updates, and rapid production deployment.
          </p>
        </div>

        {/* Step-by-step layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVELOPMENT_PROCESS.map((item, idx) => (
            <div
              key={item.step}
              className={`p-7 bg-[#0b101e]/80 hover:bg-[#0e1628] rounded-2xl border transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1 border-cyan-500/40' : 'border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              <div>
                {/* Step number and duration row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {item.step}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-500/40">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono font-semibold text-slate-400 mb-4">
                  {item.subtitle}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified in 24 - 48 hour delivery sprint</span>
              </div>
            </div>
          ))}

          {/* Call to action card inside grid */}
          <div className="p-7 bg-gradient-to-br from-cyan-950/40 via-[#0b101e] to-emerald-950/40 rounded-2xl border border-cyan-500/40 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Ready to Launch in 1 - 2 Days?</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp &amp; Call Orders Preferred</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                "Your choice is our code." Speak directly with senior full-stack coders and have your website live in 24 to 48 hours.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Order on WhatsApp (03009464514)</span>
              </a>

              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Us ({AGENCY_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
