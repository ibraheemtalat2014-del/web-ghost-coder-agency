import React, { useState } from 'react';
import { FAQS, AGENCY_CONFIG } from '../data/agencyData';
import { ChevronDown, MessageSquare, Phone, Terminal } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#060810] border-b border-cyan-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
            <Terminal className="w-3.5 h-3.5" />
            <span>// FAQ &amp; ORDER INFO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Everything you need to know about our 1 - 2 days delivery process, pricing, and WhatsApp/Call orders.
          </p>
        </div>

        {/* Preferable note alert */}
        <div className="mb-8 p-4 bg-gradient-to-r from-emerald-950/70 via-[#0b101e] to-cyan-950/70 rounded-xl border border-emerald-500/40 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300 font-semibold">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp and call orders are more comfortable and preferable. "Your choice is our code."</span>
          </div>
          <a
            href={AGENCY_CONFIG.primaryWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-cyan-300 hover:underline font-bold"
          >
            Chat: 03009464514 &rarr;
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'timeline', label: '1 - 2 Days Delivery' },
            { id: 'pricing', label: 'Exact Pricing' },
            { id: 'process', label: 'WhatsApp / Call Ordering' },
            { id: 'general', label: 'General & Support' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIdx(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md'
                  : 'bg-[#0b101e] border border-cyan-500/20 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#0b101e]/80 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-[#0b101e] rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-white">Have a custom question or specific requirements?</div>
            <div className="text-xs text-slate-400 mt-0.5">
              WhatsApp and call orders are preferred. Speak directly with our lead architect.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="px-4 py-2 text-xs font-mono font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us</span>
            </a>
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-mono font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>WhatsApp (03009464514)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
