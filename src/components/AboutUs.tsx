import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Cpu, CheckCircle2, ArrowRight, Terminal, MessageSquare, Phone } from 'lucide-react';

interface AboutProps {
  onQuoteClick: () => void;
}

export const AboutUs: React.FC<AboutProps> = ({ onQuoteClick }) => {
  const techStack = [
    { name: 'React 19 & Next.js', desc: 'Ultra-fast interactive user interfaces' },
    { name: 'TypeScript', desc: 'Type-safe, bug-resistant engineering' },
    { name: 'Tailwind CSS', desc: 'Modern responsive aesthetic styling' },
    { name: 'Node.js & Express', desc: 'Scalable backend API architectures' },
    { name: 'Google Ads & SEO', desc: '95+ PageSpeed & conversion tracking' },
    { name: '1 - 2 Days Cloud Sprint', desc: 'Rapid 48-hour production deployment' },
  ];

  return (
    <section className="py-20 bg-[#060810] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
              <Terminal className="w-3.5 h-3.5" />
              <span>// ABOUT OUR AGENCY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6" style={{ textWrap: 'balance' }}>
              Clean Code, Lightning Speeds &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">1 - 2 Days Delivery</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              <p>
                Founded on the belief that exceptional websites shouldn’t require weeks of waiting or inflated budgets, <strong className="text-white font-mono">Web Ghost Coder Agency</strong> delivers full-stack web solutions in just <strong className="text-emerald-400 font-mono">1 to 2 days</strong> for businesses, schools, healthcare providers, and high-performing Google Ads campaigns.
              </p>
              <p>
                We specialize in turning visitors into customers through high-converting designs, sub-second loading speeds, and robust backend integrations. <strong className="text-cyan-300">WhatsApp and call orders are more comfortable and preferable for us</strong>—giving you direct, zero-delay access to our senior full-stack coders.
              </p>
              <p className="text-emerald-300 font-semibold italic">
                "Your choice is our code."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[#0b101e] rounded-xl border border-cyan-500/30">
                <div className="text-sm font-bold text-white mb-1 font-mono">Rapid 48-Hour Guarantee</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Every standard website is delivered within 1 - 2 days without sacrificing quality or performance.
                </div>
              </div>
              <div className="p-4 bg-[#0b101e] rounded-xl border border-emerald-500/30">
                <div className="text-sm font-bold text-white mb-1 font-mono">Direct Coder Hotline</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  Call or WhatsApp 03009464514 anytime to order, review staging links, or request immediate revisions.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors inline-flex items-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Order via WhatsApp (03009464514)</span>
              </a>

              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call ({AGENCY_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Technical Stack Grid (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b101e]/90 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-6">
              <Cpu className="w-4 h-4" />
              <span>Full-Stack Engineering Stack</span>
            </div>

            <div className="space-y-4">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#070a14] rounded-xl border border-slate-800 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{tech.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{tech.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
              <span>Codebase Handover:</span>
              <span className="text-emerald-400 font-semibold">100% Full Ownership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
