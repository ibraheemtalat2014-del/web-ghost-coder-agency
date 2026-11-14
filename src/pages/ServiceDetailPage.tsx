import React, { useState } from 'react';
import { ServicePageContent } from '../data/servicePagesData';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link, useRouter } from '../context/RouterContext';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Layers,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface ServiceDetailPageProps {
  content: ServicePageContent;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ content }) => {
  const { navigate } = useRouter();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleOrderThisService = () => {
    navigate('/contact', {
      prefill: {
        serviceType: content.preselectedFormService,
        message: `I would like to order ${content.shortTitle} (${content.investmentLabel}) from Web Ghost Coder Agency.`,
      },
    });
  };

  const whatsappServiceLink = `https://wa.me/${AGENCY_CONFIG.whatsapp}?text=${encodeURIComponent(
    `Hello Ibraheem Talat (Web Ghost Coder Agency)! I am interested in ${content.shortTitle} (${content.investmentLabel}). Ordering during your 4 PM - 8 PM PKT window. Your choice is our code!`
  )}`;

  const breadcrumbItems =
    content.route === '/website-development'
      ? [{ label: content.shortTitle }]
      : [
          { label: 'Services', to: '/website-development' },
          { label: content.shortTitle },
        ];

  return (
    <>
      {/* 1. HERO SECTION WITH UNIQUE H1 & BREADCRUMBS */}
      <section className="pt-10 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#070b16] border-b border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
                  <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{content.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 px-3.5 py-1.5 rounded-xl">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{content.turnaround}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-5">
                {content.h1Prefix}{' '}
                <span className="coder-gradient-text">{content.h1Highlight}</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-4 font-normal">
                {content.leadSummary}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {content.pakistanAndGlobalNote}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOrderThisService}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Order {content.shortTitle} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={whatsappServiceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ({AGENCY_CONFIG.phone})</span>
                </a>
                <a
                  href={`tel:${AGENCY_CONFIG.phone}`}
                  className="px-5 py-4 rounded-2xl bg-white dark:bg-[#0d1424] text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm sm:text-base flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Right Summary Card */}
            <aside className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0b101e] border-2 border-sky-200 dark:border-cyan-500/40 shadow-xl space-y-5">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-sky-700 dark:text-cyan-400">
                  Transparent Investment
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {content.investmentLabel}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/40 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 font-mono">
                  "WhatsApp &amp; call orders are preferred."
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  Daily hours: <strong>{AGENCY_CONFIG.orderingHours}</strong>
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  Led by CEO <strong>{AGENCY_CONFIG.ownerName}</strong>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 mb-3">
                  Key Deliverables Included
                </div>
                <ul className="space-y-2">
                  {content.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES SECTION (H2 + H3s) */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 border border-sky-200 dark:border-cyan-500/30 px-3 py-1 rounded-lg mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURE &amp; BENEFITS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Why Choose Our {content.shortTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50 dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/25 shadow-sm"
              >
                <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 mb-2">
                  0{idx + 1} · ENGINEERING STANDARD
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO THIS IS BUILT FOR & WORKFLOW */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Ideal Industries */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-lg mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TARGET INDUSTRIES &amp; USE CASES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Who Benefits Most From {content.shortTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {content.targetAudiences.map((aud, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800"
                >
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
                    {aud.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {aud.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Delivery Pipeline */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3 py-1 rounded-lg mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>STREAMLINED EXECUTION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                How We Deliver Your Project
              </h2>
            </div>

            <div className="space-y-4">
              {content.workflow.map((wf) => (
                <div
                  key={wf.step}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/25 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0">
                    {wf.step}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1">
                      {wf.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {wf.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE-SPECIFIC FAQS */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions: {content.shortTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {content.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-sky-50/60 dark:bg-[#0c1324] border-sky-400 dark:border-cyan-400/60 shadow-sm'
                      : 'bg-white dark:bg-[#0b101e] border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-600 dark:text-cyan-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/70 dark:border-slate-800 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INTERNAL LINKS TO RELATED SERVICES & CONVERSION CTA */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Explore Related Services &amp; Case Studies
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                Internal pathways across Web Ghost Coder Agency capabilities.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOrderThisService}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center gap-2 shadow-md cursor-pointer w-fit"
            >
              <span>Request Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.relatedRoutes.map((rel) => (
              <Link
                key={rel.to}
                to={rel.to}
                className="group p-6 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all flex flex-col justify-between shadow-xs hover:shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors mb-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {rel.description}
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 flex items-center gap-1">
                  <span>Open Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
