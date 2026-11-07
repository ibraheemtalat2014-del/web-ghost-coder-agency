import React, { useState, useEffect, useRef } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import {
  MessageSquare,
  Phone,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Zap,
  Presentation,
  Clock,
  LayoutGrid,
  ChevronDown,
  Calculator,
  Tag,
  FolderGit2,
  Sparkles,
  HelpCircle,
  Code2,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onQuoteClick: () => void;
  onClientPortalClick: () => void;
  onOrdersClick?: () => void;
  onReplayIntro?: () => void;
}

export interface NavCardItem {
  id: string;
  name: string;
  shortLabel: string;
  href: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const NAV_CARDS: NavCardItem[] = [
  {
    id: 'services',
    name: 'Services & Pricing',
    shortLabel: 'Services',
    href: '#services',
    badge: 'From PKR 17,999',
    description: 'Hospital, School, Real Estate, E-Commerce, Google Ads',
    icon: Code2,
    color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-500/40',
  },
  {
    id: 'portfolio-deck',
    name: 'Portfolio PPTs',
    shortLabel: 'PPT Deck',
    href: '#portfolio-deck',
    badge: 'Interactive Slides',
    description: 'Slide presentation deck with live agency architecture',
    icon: Presentation,
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-500/40',
  },
  {
    id: 'portfolio',
    name: 'Sample Projects',
    shortLabel: 'Projects',
    href: '#portfolio',
    badge: 'Live Demos',
    description: 'Hospital, academy, store & Google Ads landing pages',
    icon: FolderGit2,
    color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-500/40',
  },
  {
    id: 'pricing',
    name: 'Pricing Packages',
    shortLabel: 'Packages',
    href: '#pricing',
    badge: '1 - 2 Days Turnaround',
    description: 'Starter, Pro, and Custom Enterprise fixed packages',
    icon: Tag,
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/40',
  },
  {
    id: 'estimator',
    name: 'Cost Estimator',
    shortLabel: 'Estimator',
    href: '#estimator',
    badge: 'Instant Quote',
    description: 'Interactive calculator for exact investment and hours',
    icon: Calculator,
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-500/40',
  },
  {
    id: 'process',
    name: '48h Rapid Process',
    shortLabel: '48h Process',
    href: '#process',
    badge: 'Strict Guarantee',
    description: 'From architecture to production launch in 24 - 48h',
    icon: Clock,
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-500/40',
  },
  {
    id: 'advantages',
    name: 'Why Choose Us',
    shortLabel: 'Advantages',
    href: '#advantages',
    badge: 'Direct Coder',
    description: 'Direct engineer access, zero middlemen, 100% code ownership',
    icon: Sparkles,
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-500/40',
  },
  {
    id: 'faq',
    name: 'FAQ & Direct Line',
    shortLabel: 'FAQ',
    href: '#faq',
    badge: '4 PM – 8 PM PKT',
    description: 'Fast answers, payment channels, and daily support',
    icon: HelpCircle,
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-500/40',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  onQuoteClick,
  onClientPortalClick,
  onOrdersClick,
  onReplayIntro,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMenuHubOpen, setIsMenuHubOpen] = useState(false);
  const hubRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close hub dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hubRef.current && !hubRef.current.contains(e.target as Node)) {
        setIsMenuHubOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setIsMenuHubOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT & CONTACT BAR: High contrast, large legible text (14px) */}
      {/* TOP ANNOUNCEMENT & CONTACT BAR: High contrast, large legible text (14px) - Fully Responsive */}
      <div className="w-full max-w-full overflow-hidden bg-sky-100/90 dark:bg-[#070b16] border-b border-sky-300/80 dark:border-cyan-500/30 text-sm py-2.5 px-4 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-medium">
          {/* Left: Schedule & Turnaround Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-emerald-600 dark:bg-emerald-950/90 text-white dark:text-emerald-300 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-sm border border-emerald-700 dark:border-emerald-500/50 shrink-0">
              <Clock className="w-4 h-4 text-emerald-200 dark:text-emerald-400 animate-pulse shrink-0" />
              <span>Ordering Window: 4:00 PM – 8:00 PM PKT</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-900 dark:text-slate-200 text-xs sm:text-sm hidden md:inline shrink-0">
              CEO &amp; Architect:{' '}
              <strong className="text-sky-700 dark:text-cyan-300 font-bold">
                {AGENCY_CONFIG.ownerName}
              </strong>
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden xl:inline">|</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs sm:text-sm hidden xl:inline shrink-0">
              ⚡ 1 - 2 Days Delivery Guarantee
            </span>
          </div>

          {/* Right: Phone & WhatsApp Links */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm shrink-0">
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors font-bold"
            >
              <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
              <span>{AGENCY_CONFIG.phoneDisplay}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors font-extrabold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER: Avant-Garde Card-Based Navigation Architecture */}
      <header
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/30 shadow-md shadow-slate-900/5 dark:shadow-cyan-950/30'
            : 'bg-white dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3">
          {/* ZONE 1: BRAND IDENTITY WITH CEO ATTRIBUTION */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 text-slate-900 dark:text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-500 flex items-center justify-center text-white font-mono font-black text-sm shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              &lt;/&gt;
            </div>
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-black tracking-tight font-sans">
                Web Ghost <span className="coder-gradient-text">Coder</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                CEO: <strong className="text-sky-700 dark:text-cyan-300">Ibraheem Talat</strong>
              </div>
            </div>
          </a>

          {/* ZONE 2: AVANT-GARDE RESPONSIVE CARD NAVIGATION (Adapts gracefully across lg / xl / 2xl) */}
          <nav className="hidden lg:flex items-center gap-2 shrink min-w-0" ref={hubRef}>
            {/* On 2XL screens: show top 3 cards */}
            <div className="hidden 2xl:flex items-center gap-2">
              {NAV_CARDS.slice(0, 3).map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    onClick={(e) => handleNavClick(e, card.href)}
                    className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 bg-slate-50/90 dark:bg-[#0d1424] hover:bg-white dark:hover:bg-[#121c33] transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 cursor-pointer"
                    title={card.description}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 ${card.color}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-none">
                        {card.shortLabel}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-none">
                        {card.badge}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* On XL screens: show top 2 cards */}
            <div className="hidden xl:flex 2xl:hidden items-center gap-2">
              {NAV_CARDS.slice(0, 2).map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    onClick={(e) => handleNavClick(e, card.href)}
                    className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 bg-slate-50/90 dark:bg-[#0d1424] hover:bg-white dark:hover:bg-[#121c33] transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 cursor-pointer"
                    title={card.description}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 ${card.color}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-none">
                        {card.shortLabel}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-none">
                        {card.badge}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* AVANT-GARDE "ALL WEBSITE MENUS" CARD DECK BUTTON & DROPDOWN - Anchor on all desktop viewports */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuHubOpen(!isMenuHubOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border transition-all cursor-pointer shadow-sm whitespace-nowrap shrink-0 ${
                  isMenuHubOpen
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-cyan-500/20'
                    : 'bg-slate-100 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 font-bold hover:bg-white dark:hover:bg-[#16223d]'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm">Website Menus (8 Cards)</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    isMenuHubOpen ? 'rotate-180 text-slate-950' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* DROPDOWN CARD MATRIX: Beautiful representable card deck for all 8 menus */}
              {isMenuHubOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[620px] max-w-[90vw] p-4 bg-white dark:bg-[#090e1c] rounded-2xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        Website Directory &amp; Menu Cards
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      8 Major Sections · 1-Click Jump
                    </span>
                  </div>

                  {/* 2-Column Grid of Representable Menu Cards */}
                  <div className="grid grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {NAV_CARDS.map((card, idx) => {
                      const Icon = card.icon;
                      return (
                        <a
                          key={card.id}
                          href={card.href}
                          onClick={(e) => handleNavClick(e, card.href)}
                          className="group flex flex-col justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 bg-slate-50 dark:bg-[#0e1628] hover:bg-cyan-50/50 dark:hover:bg-[#131f38] transition-all cursor-pointer shadow-sm"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${card.color} group-hover:scale-105 transition-transform`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 truncate">
                                  {idx + 1}. {card.name}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {card.description}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                            <span className="font-bold text-sky-700 dark:text-cyan-300">
                              {card.badge}
                            </span>
                            <span className="text-slate-400 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all flex items-center gap-0.5 font-bold">
                              <span>Open</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Ordering Hours & Hotline Notice at bottom of menu cards deck */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      ⚡ 1 - 2 Days Turnaround Guarantee
                    </span>
                    <span>Direct Hotline: 03009464514</span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ZONE 3: ACTIONS & CTA BUTTONS (Responsive width - never overflows) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Replay 3D Cinematic Intro button */}
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="flex px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 border border-cyan-300 dark:border-cyan-500/40 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5 shadow-sm"
                title="Play 3D Futuristic Coding Intro"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse shrink-0" />
                <span className="hidden xl:inline">3D Intro</span>
              </button>
            )}

            {/* Owner Orders Inbox Button */}
            {onOrdersClick && (
              <button
                type="button"
                onClick={onOrdersClick}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-500/40 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="View All Received Orders & Inquiries"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="hidden sm:inline">Inbox</span>
              </button>
            )}

            {/* Client Portal Button */}
            <button
              type="button"
              onClick={onClientPortalClick}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-sky-600 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#0f172a] dark:hover:bg-[#16223d] border border-slate-300 dark:border-cyan-500/30 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Open Client Portal"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 shrink-0" />
              <span className="hidden md:inline">Portal</span>
            </button>

            {/* Primary Get Free Quote CTA */}
            <button
              type="button"
              onClick={onQuoteClick}
              className="px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-extrabold text-white dark:text-slate-950 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 hover:from-sky-600 hover:to-emerald-600 dark:hover:from-cyan-300 dark:hover:to-emerald-300 rounded-xl shadow-md shadow-sky-500/25 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Free Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Mobile Menu Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER: 2-COLUMN REPRESENTABLE CARDS GRID */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/30 px-4 sm:px-6 py-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Ordering hours notification card */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/80 dark:to-cyan-950/80 rounded-2xl border border-emerald-300 dark:border-emerald-500/40 text-xs sm:text-sm font-mono text-emerald-900 dark:text-emerald-200 font-bold flex items-center justify-between">
              <span>⚡ Ordering: 4:00 PM – 8:00 PM PKT</span>
              <span>1 - 2 Days</span>
            </div>

            {/* Title for the Cards Menu */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 dark:text-slate-400 px-1">
              <span>WEBSITE DIRECTORY MENUS</span>
              <span>8 REPRESENTABLE CARDS</span>
            </div>

            {/* 2-Column Responsive Card Grid for Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {NAV_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    onClick={(e) => handleNavClick(e, card.href)}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1424] hover:bg-white dark:hover:bg-[#121c33] active:scale-98 transition-all cursor-pointer shadow-sm"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${card.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {idx + 1}. {card.name}
                      </div>
                      <div className="text-xs text-sky-700 dark:text-cyan-300 font-mono font-semibold">
                        {card.badge}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </a>
                );
              })}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-3 px-4 text-sm font-bold text-center bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 rounded-xl border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-cyan-500 animate-pulse" />
                  <span>Play 3D Cinematic Coding Intro</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onClientPortalClick();
                }}
                className="w-full py-3 px-4 text-sm font-bold text-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-800 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                <span>Open Client Project Portal</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3.5 px-4 text-sm font-black text-center bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl shadow-md cursor-pointer"
              >
                Get a Free Quote Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
