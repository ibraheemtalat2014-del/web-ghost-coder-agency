import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Phone, Mail, MessageSquare, ArrowUp, Shield, Terminal, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060b] border-t border-cyan-500/20 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Preferable note ribbon */}
        <div className="mb-10 p-4 bg-gradient-to-r from-emerald-950/70 via-[#0b101e] to-cyan-950/70 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-emerald-300 font-bold">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp and call orders are more comfortable and preferable. "Your choice is our code."</span>
          </div>
          <div className="flex items-center gap-3 font-mono">
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-bold"
            >
              WhatsApp: 03009464514
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="text-cyan-300 hover:text-cyan-200 underline font-bold"
            >
              Call: 03009464514
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & summary (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-slate-950 font-mono font-bold text-sm shadow-md">
                &lt;/&gt;
              </div>
              <span className="text-base font-bold text-white tracking-tight font-mono">
                Web Ghost <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Coder Agency</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              We engineer high-performance, modern websites and portals in just <strong className="text-emerald-400 font-mono">1 - 2 Days</strong> for businesses, schools, hospitals, and Google Ads campaigns.
            </p>

            <div className="pt-2 text-slate-400 space-y-1 font-mono text-[11px]">
              <div>Turnaround: <strong className="text-white">1 - 2 Days Guaranteed</strong></div>
              <div>Hotline: <span className="text-cyan-300 font-bold">03009464514</span></div>
              <div className="text-emerald-400 font-semibold">24/7 Direct WhatsApp &amp; Call Response</div>
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Exact Pricing
            </div>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors flex justify-between pr-2">
                  <span>Google Ads Landing:</span>
                  <span className="text-emerald-400">PKR 17,999</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors flex justify-between pr-2">
                  <span>Business Website:</span>
                  <span className="text-emerald-400">PKR 25,999</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors flex justify-between pr-2">
                  <span>Custom Web App:</span>
                  <span className="text-emerald-400">PKR 32,999</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors flex justify-between pr-2">
                  <span>Hospital System:</span>
                  <span className="text-emerald-400">PKR 38,999</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors flex justify-between pr-2">
                  <span>School Portal:</span>
                  <span className="text-emerald-400">PKR 40,000</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#advantages" className="hover:text-cyan-300 transition-colors">
                  The Coder Edge (1-2 Days)
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-cyan-300 transition-colors">
                  Sample Projects &amp; Case Studies
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-cyan-300 transition-colors">
                  Instant Cost Calculator
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-300 transition-colors">
                  48-Hour Sprint Pipeline
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-cyan-300 transition-colors">
                  Pricing Matrix
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-300 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Direct Contact
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${AGENCY_CONFIG.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{AGENCY_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={AGENCY_CONFIG.primaryWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>{AGENCY_CONFIG.whatsappDisplay} (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${AGENCY_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{AGENCY_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {AGENCY_CONFIG.name}. "Your choice is our code." All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span>1 - 2 Days Delivery Sprint</span>
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
