import React, { useState, useEffect } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { MessageSquare, Phone, Menu, X, ArrowUpRight, Terminal, Zap, Presentation, Clock, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onQuoteClick: () => void;
  onClientPortalClick: () => void;
  onOrdersClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick, onClientPortalClick, onOrdersClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services & Pricing', href: '#services' },
    { name: 'Portfolio PPTs', href: '#portfolio-deck' },
    { name: 'Why Us', href: '#advantages' },
    { name: 'Sample Projects', href: '#portfolio' },
    { name: 'Estimator', href: '#estimator' },
    { name: '48h Process', href: '#process' },
    { name: 'Packages', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification / Quick Contact Utility Bar with Light/Dark Theme Adaptation */}
      <div className="bg-sky-50 dark:bg-[#0b1426] border-b border-sky-200 dark:border-cyan-400/35 text-xs py-2 px-4 sm:px-8 text-slate-700 dark:text-slate-200 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono flex-wrap">
            <span className="text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-400/50 px-2.5 py-0.5 rounded-lg shadow-sm">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>Ordering Time: 4:00 PM – 8:00 PM PKT</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">|</span>
            <span className="text-sky-900 dark:text-cyan-200 hidden md:inline">
              CEO: <strong className="text-slate-900 dark:text-white">{AGENCY_CONFIG.ownerName}</strong>
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden md:inline">|</span>
            <span className="text-sky-700 dark:text-cyan-300 font-bold hidden lg:inline">
              ⚡ 1 - 2 Days Delivery Guarantee
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
              <span>{AGENCY_CONFIG.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors font-extrabold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar with Light/Dark Themes */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#060810]/95 backdrop-blur-md border-b border-sky-200 dark:border-cyan-500/30 shadow-md shadow-sky-900/5 dark:shadow-cyan-950/40'
            : 'bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-mono font-extrabold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div className="leading-tight">
              <div className="font-mono text-sm sm:text-base font-extrabold">
                Web Ghost <span className="coder-gradient-text">Coder</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Led by <strong className="text-sky-600 dark:text-cyan-300">Ibraheem Talat, CEO</strong>
              </div>
            </div>
          </a>

          {/* Zone 2: 4-6 clean single-line nav links */}
          <nav className="hidden xl:flex items-center gap-4 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-sky-600 dark:hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Theme Toggle + Client Portal + Primary Quote CTA) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Owner Orders Inbox Button */}
            {onOrdersClick && (
              <button
                onClick={onOrdersClick}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-500/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="View All Received Orders & Inquiries"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Orders Inbox</span>
              </button>
            )}

            <button
              onClick={onClientPortalClick}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#0b101e] dark:hover:bg-[#12192e] border border-slate-300 dark:border-cyan-500/30 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
              <span>Client Portal</span>
            </button>

            <button
              onClick={onQuoteClick}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white dark:text-slate-950 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 hover:from-sky-600 hover:to-emerald-600 dark:hover:from-cyan-300 dark:hover:to-emerald-300 rounded-xl shadow-md shadow-sky-500/25 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Free Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white dark:bg-[#0a0e1c] border-b border-slate-200 dark:border-cyan-500/30 px-6 py-6 space-y-4 shadow-xl">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-300 dark:border-emerald-500/40 text-xs font-mono text-emerald-800 dark:text-emerald-300">
              ⚡ Ordering Hours: 4:00 PM – 8:00 PM PKT | CEO: Ibraheem Talat
            </div>

            <div className="flex flex-col space-y-3 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-400 py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onClientPortalClick();
                }}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold text-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-800"
              >
                Open Client Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold text-center bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl shadow-md"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
