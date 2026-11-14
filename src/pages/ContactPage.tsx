import React, { useRef } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuoteEstimator } from '../components/QuoteEstimator';
import { ContactSection, ContactSectionHandle } from '../components/ContactSection';
import { FAQ } from '../components/FAQ';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Link } from '../context/RouterContext';
import { Clock, MessageSquare, Phone, Terminal } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactRef = useRef<ContactSectionHandle>(null);

  const handleApplyEstimate = (data: { serviceType: string; budget: string; summary: string }) => {
    contactRef.current?.prefillForm({
      serviceType: data.serviceType,
      budget: data.budget,
      message: data.summary,
    });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Inner Page Hero Header with Primary H1 */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#060810] border-b border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 mb-3 bg-sky-100 dark:bg-cyan-950/70 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>DIRECT DEVELOPER HOTLINE &amp; INSTANT QUOTE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
                Contact Us &amp; Launch Your Website in{' '}
                <span className="coder-gradient-text">1 - 2 Days</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Calculate your exact cost below or submit your verified inquiry directly to CEO {AGENCY_CONFIG.ownerName}. WhatsApp and call orders are preferred daily during our {AGENCY_CONFIG.orderingHours} service window.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {AGENCY_CONFIG.phone}</span>
              </a>
              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="px-5 py-3.5 rounded-xl bg-white dark:bg-[#0d1424] text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>Call {AGENCY_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>Ordering Hours: {AGENCY_CONFIG.orderingHours}</span>
            </span>
            <span>·</span>
            <Link to="/website-development" className="hover:text-sky-600 dark:hover:text-cyan-300 underline font-semibold">
              Compare Website Services
            </Link>
            <span>·</span>
            <Link to="/portfolio" className="hover:text-sky-600 dark:hover:text-cyan-300 underline font-semibold">
              View Portfolio Work
            </Link>
          </div>
        </div>
      </section>

      <QuoteEstimator onApplyEstimateToForm={handleApplyEstimate} />

      <ContactSection ref={contactRef} />

      <FAQ />
    </>
  );
};
