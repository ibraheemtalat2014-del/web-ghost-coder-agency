import React from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Link } from '../context/RouterContext';
import { Phone, Mail, MessageSquare, ArrowUp, Zap } from 'lucide-react';
import { Logo } from './Logo';

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Summary */}
          <div className="space-y-4">
            <Link to="/" aria-label="Web Coder Agency logo" className="inline-flex items-center w-fit group">
              <Logo variant="footer" />
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed">
              Professional website development agency in Pakistan serving local &amp; international organizations with <strong className="text-emerald-400 font-mono">1 - 2 Days</strong> delivery.
            </p>

            <div className="pt-1 text-slate-400 space-y-1 font-mono text-[11px]">
              <div>CEO: <strong className="text-white">{AGENCY_CONFIG.ownerName}</strong></div>
              <div>Hours: <span className="text-emerald-400 font-semibold">4:00 PM – 8:00 PM PKT</span></div>
              <div>Hotline: <span className="text-cyan-300 font-bold">03009464514</span></div>
            </div>
          </div>

          {/* Web Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Web Solutions
            </div>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/website-for-shops-pakistan" className="hover:text-emerald-300 text-emerald-400 font-semibold transition-colors">
                  Website for Shops (Pakistan)
                </Link>
              </li>
              <li>
                <Link to="/website-development" className="hover:text-cyan-300 transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/web-design" className="hover:text-cyan-300 transition-colors">
                  Web Design &amp; UI/UX
                </Link>
              </li>
              <li>
                <Link to="/business-websites" className="hover:text-cyan-300 transition-colors">
                  Business Website Development
                </Link>
              </li>
              <li>
                <Link to="/portfolio-websites" className="hover:text-cyan-300 transition-colors">
                  Portfolio Website Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialized & Growth */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Specialized &amp; SEO
            </div>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/ecommerce-development" className="hover:text-cyan-300 transition-colors">
                  E-commerce Development
                </Link>
              </li>
              <li>
                <Link to="/ai-website-development" className="hover:text-cyan-300 transition-colors">
                  AI Website Development
                </Link>
              </li>
              <li>
                <Link to="/custom-software-development" className="hover:text-cyan-300 transition-colors">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link to="/seo-services" className="hover:text-cyan-300 transition-colors">
                  SEO Services in Pakistan
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Pages */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Agency Pages
            </div>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link to="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-cyan-300 transition-colors">
                  Our Projects &amp; PPT Deck
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact Us &amp; Free Quote
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-cyan-300 transition-colors text-slate-500">
                  XML Sitemap
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
              type="button"
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
