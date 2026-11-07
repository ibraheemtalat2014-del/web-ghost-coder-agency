import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#0b0e14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Client Outcomes &amp; Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Trusted by Business Leaders, Principals &amp; Doctors
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Real outcomes from organizations that modernized their web infrastructure with Web Ghost Coder Agency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                {/* Quote body */}
                <blockquote className="text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{test.quote}"
                </blockquote>
              </div>

              {/* Attribution and outcome */}
              <div className="pt-5 border-t border-slate-800/80">
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-3">
                  {test.outcome}
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    {test.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {test.role} · {test.organization}
                  </div>
                  <div className="text-[11px] text-amber-400/80 mt-1">
                    Project: {test.projectType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
