import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { ShieldCheck, Zap, Code, Award, PhoneCall, Gauge, Terminal, MessageSquare } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: 'Guaranteed 1 - 2 Days Rapid Delivery',
      desc: 'We operate rapid agile sprints. By eliminating agency red-tape, our full-stack senior coders build and launch your complete website in just 24 to 48 hours.',
    },
    {
      icon: <Gauge className="w-5 h-5 text-emerald-400" />,
      title: 'Sub-Second Speeds & 95+ Google PageSpeed',
      desc: 'We build lightweight modern frontends using React, TypeScript, and clean CSS. Zero bloated WordPress templates that slow down your website and inflate ad costs.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
      title: 'Full Source Code Ownership & No Vendor Lock-in',
      desc: 'You receive 100% ownership of your codebase, domain credentials, and deployment accounts. No recurring platform lock-in fees.',
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-cyan-400" />,
      title: 'Direct WhatsApp Developer Hotline (03009464514)',
      desc: 'WhatsApp and call orders are more comfortable and preferable. Direct communication with senior software engineers with zero junior middlemen.',
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      title: 'Specialized for Schools, Hospitals & Google Ads',
      desc: 'We understand the specific regulatory, functional, and appointment/admissions demands of medical clinics, schools, and PPC landing pages.',
    },
    {
      icon: <Code className="w-5 h-5 text-teal-400" />,
      title: 'Honest, Transparent Pricing with No Hidden Fees',
      desc: 'Landing Pages at PKR 17,999 ($65), Business Sites at PKR 25,999 ($94), Custom Apps at PKR 32,999 ($119), Hospitals at PKR 38,999 ($141), and Schools at PKR 40,000 ($144).',
    },
  ];

  return (
    <section className="py-20 bg-[#060810] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
            <Terminal className="w-3.5 h-3.5" />
            <span>// COMPETITIVE ADVANTAGE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Why Clients Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Web Ghost Coder Agency</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Compare our agile 1 - 2 days engineering sprints against slow, traditional agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, i) => (
            <div
              key={i}
              className="p-6 bg-[#0b101e]/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center mb-4">
                  {pt.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
