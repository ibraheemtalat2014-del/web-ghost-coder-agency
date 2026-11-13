import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { ArrowRight, Terminal, CheckCircle2, ShieldCheck, Zap, MessageSquare, Phone, Presentation, Clock, Award, Code2, Sparkles } from 'lucide-react';
import heroStudioImg from '../assets/images/hero_agency_studio_1793901828541.jpg';

interface HeroProps {
  onQuoteClick: () => void;
  onExploreServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onExploreServicesClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-sky-200 dark:border-cyan-500/20 bg-gradient-to-b from-sky-50/60 via-white to-sky-50/40 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#0b1329]">
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-sky-400/15 dark:bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[320px] bg-emerald-400/15 dark:bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          {/* Left Column: Core Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Coder badge with CEO & Ordering hours - Highly readable typography */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide uppercase text-sky-800 dark:text-cyan-300 bg-sky-100 dark:bg-[#0d1527] border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl shadow-sm">
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Web Ghost Coder Agency</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 px-3.5 py-1.5 rounded-xl shadow-sm">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Ordering Window: 4:00 PM – 8:00 PM PKT</span>
              </div>
            </div>

            {/* Required Headline - Clear and impactful */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-5" style={{ textWrap: 'balance' }}>
              Your Vision. Our Code.{' '}
              <span className="coder-gradient-text">
                Extraordinary Websites.
              </span>
            </h1>

            {/* Required Supporting Text - Highly readable, comfortable line-height */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl mb-6 font-normal">
              We transform your ideas into powerful digital experiences with modern designs, exceptional performance, and affordable pricing.
            </p>

            {/* CEO Leadership Tag */}
            <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-[#0c1324] border border-sky-200 dark:border-cyan-500/30 rounded-2xl mb-6 w-fit shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 flex items-center justify-center text-white dark:text-slate-950 font-bold text-xs font-mono shadow-sm">
                IT
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Founded &amp; Led by:</span>{' '}
                <strong className="text-slate-900 dark:text-white font-bold">{AGENCY_CONFIG.ownerName}</strong>{' '}
                <span className="text-sky-600 dark:text-cyan-400 font-semibold">({AGENCY_CONFIG.ownerTitle})</span>
              </div>
            </div>

            {/* WhatsApp and Call Preferable Order Notice Banner */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-white to-sky-50 dark:from-emerald-950/80 dark:via-[#0c1426] dark:to-cyan-950/80 border-2 border-emerald-300 dark:border-emerald-500/50 rounded-2xl mb-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <div className="flex items-center gap-2.5 text-sm sm:text-base font-extrabold text-emerald-900 dark:text-emerald-300">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp &amp; call orders are more comfortable and preferable.</span>
                </div>
                <span className="text-xs sm:text-sm font-mono font-bold text-sky-800 dark:text-cyan-300 bg-sky-100 dark:bg-cyan-950/80 px-3 py-1 rounded-lg border border-sky-300 dark:border-cyan-500/40">
                  "Your choice is our code"
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                Active daily ordering window: <strong className="text-emerald-800 dark:text-emerald-400 font-bold font-mono">4:00 PM to 8:00 PM PKT</strong>. Direct hotline: <strong className="text-slate-900 dark:text-white font-mono font-bold">03009464514</strong>.
              </div>
            </div>

            {/* Core Pillars Cards - Readable and distinct */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8 text-sm text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-3 py-3 px-3.5 bg-white dark:bg-[#0c1324] border border-sky-200 dark:border-cyan-500/30 rounded-2xl shadow-sm">
                <Zap className="w-5 h-5 text-sky-600 dark:text-cyan-400 shrink-0" />
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">1 - 2 Days Delivery</span>
              </div>
              <div className="flex items-center gap-3 py-3 px-3.5 bg-white dark:bg-[#0c1324] border border-emerald-200 dark:border-emerald-500/30 rounded-2xl shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">Clean Coder UI/UX</span>
              </div>
              <div className="flex items-center gap-3 py-3 px-3.5 bg-white dark:bg-[#0c1324] border border-teal-200 dark:border-teal-500/30 rounded-2xl shadow-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">From PKR 17,999 ($65)</span>
              </div>
            </div>

            {/* Clear CTA Buttons - Generous sizing */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onQuoteClick}
                className="px-7 py-4 text-sm sm:text-base font-black text-white dark:text-slate-950 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 hover:from-sky-600 hover:to-emerald-600 dark:hover:from-cyan-300 dark:hover:to-emerald-300 rounded-2xl shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreServicesClick}
                className="px-6 py-4 text-sm sm:text-base font-bold text-sky-900 dark:text-cyan-200 bg-sky-100 hover:bg-sky-200 dark:bg-[#0d1424] dark:hover:bg-[#141f38] dark:hover:text-white border border-sky-300 dark:border-cyan-500/40 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <span>Explore Our Services</span>
              </button>
              <a
                href="#portfolio-deck"
                className="px-5 py-4 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/50 dark:hover:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Presentation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>View PPT Deck</span>
              </a>
            </div>

            {/* Instant Contact Badges for Direct Lead Capture */}
            <div className="pt-6 border-t border-sky-200 dark:border-cyan-500/20 flex flex-wrap items-center gap-5 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-extrabold text-sky-800 dark:text-cyan-400 font-mono">Direct Contact:</span>
              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors font-bold font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span>Call: {AGENCY_CONFIG.phoneDisplay}</span>
              </a>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={AGENCY_CONFIG.primaryWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors text-emerald-600 dark:text-emerald-400 font-extrabold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {AGENCY_CONFIG.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full rounded-3xl overflow-hidden border-2 border-sky-300 dark:border-cyan-500/40 bg-white dark:bg-[#070b16] shadow-2xl shadow-sky-900/10 dark:shadow-cyan-500/10 group">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto lg:h-[500px] w-full bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center">
                <img
                  src={heroStudioImg}
                  alt="Web Ghost Coder Agency modern website development studio workspace in Pakistan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to static public path or sleek SVG container
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = '/assets/images/hero_agency_studio_1793901828541.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Micro-Card Overlays with CEO name and Ordering time */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-[#090e1c]/95 backdrop-blur-md rounded-2xl border border-sky-200 dark:border-cyan-500/40 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-black text-sky-900 dark:text-cyan-300">
                      CEO: {AGENCY_CONFIG.ownerName}
                    </span>
                    <span className="text-[11px] font-mono font-black text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
                      ⚡ 4:00 PM – 8:00 PM
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">
                    Bespoke web development for businesses, schools, hospitals, and Google Ads funnels.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-10 border-t border-sky-200 dark:border-cyan-500/20">
          <div className="p-4 bg-white dark:bg-[#0a0f1e] rounded-2xl border border-sky-200 dark:border-cyan-500/25 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-mono tabular-nums">
              150+
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold font-mono">Projects Delivered</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#0a0f1e] rounded-2xl border border-emerald-200 dark:border-emerald-500/30 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-mono tabular-nums">
              1 - 2 Days
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold font-mono">Turnaround Guarantee</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#0a0f1e] rounded-2xl border border-sky-200 dark:border-cyan-500/25 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-sky-600 dark:text-cyan-300 tracking-tight font-mono tabular-nums">
              4 PM - 8 PM
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold font-mono">Ordering Hours Window</div>
          </div>
          <div className="p-4 bg-white dark:bg-[#0a0f1e] rounded-2xl border border-teal-200 dark:border-teal-500/25 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight font-mono tabular-nums">
              From $65
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-semibold font-mono">PKR 17,999 Starting</div>
          </div>
        </div>
      </div>
    </section>
  );
};
