import React, { useState, useEffect, useRef } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { ALL_SERVICE_NAV_ITEMS } from '../data/servicePagesData';
import { Link, useRouter } from '../context/RouterContext';
import {
  MessageSquare,
  Phone,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  Zap,
  Clock,
  ChevronDown,
  Code2,
  ChevronRight,
  Palette,
  ShoppingCart,
  Building2,
  Briefcase,
  Cpu,
  Layers,
  Search,
  Store,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

interface NavbarProps {
  onQuoteClick: () => void;
  onClientPortalClick: () => void;
  onOrdersClick?: () => void;
  onReplayIntro?: () => void;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '/website-for-shops-pakistan': Store,
  '/website-development': Code2,
  '/web-design': Palette,
  '/ecommerce-development': ShoppingCart,
  '/business-websites': Building2,
  '/portfolio-websites': Briefcase,
  '/ai-website-development': Cpu,
  '/custom-software-development': Layers,
  '/seo-services': Search,
};

const SERVICE_COLORS: Record<string, string> = {
  '/website-for-shops-pakistan': 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/40',
  '/website-development': 'text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 border-sky-200 dark:border-cyan-500/40',
  '/web-design': 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-500/40',
  '/ecommerce-development': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-500/40',
  '/business-websites': 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-500/40',
  '/portfolio-websites': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-500/40',
  '/ai-website-development': 'text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-500/40',
  '/custom-software-development': 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-500/40',
  '/seo-services': 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-500/40',
};

export const Navbar: React.FC<NavbarProps> = ({
  onQuoteClick,
  onClientPortalClick,
  onOrdersClick,
  onReplayIntro,
}) => {
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

  const isServiceRouteActive = ALL_SERVICE_NAV_ITEMS.some((item) => item.route === pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinkClass = (active: boolean) =>
    `px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
      active
        ? 'bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-400/50 shadow-xs'
        : 'text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-[#0f172a] border border-transparent'
    }`;

  return (
    <>
      {/* TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="w-full max-w-full overflow-hidden bg-sky-100/90 dark:bg-[#070b16] border-b border-sky-300/80 dark:border-cyan-500/30 text-sm py-2.5 px-4 sm:px-6 lg:px-8 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-medium">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-emerald-600 dark:bg-emerald-950/90 text-white dark:text-emerald-300 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-xl shadow-sm border border-emerald-700 dark:border-emerald-500/50 shrink-0">
              <Clock className="w-4 h-4 text-emerald-200 dark:text-emerald-400 shrink-0" />
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
              1 - 2 Days Delivery Guarantee
            </span>
          </div>

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

      {/* MAIN HEADER: Multi-Page Responsive Navigation */}
      <header
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/30 shadow-md shadow-slate-900/5 dark:shadow-cyan-950/30'
            : 'bg-white dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3">
          {/* ZONE 1: BRAND IDENTITY */}
          <Link
            to="/"
            aria-label="Web Coder Agency logo"
            className="flex items-center whitespace-nowrap shrink-0 group"
          >
            <Logo
              variant="header"
              subtitle={
                <>
                  CEO: <strong className="text-sky-700 dark:text-cyan-300">Ibraheem Talat</strong>
                </>
              }
            />
          </Link>

          {/* ZONE 2: PRIMARY MULTI-PAGE NAVIGATION BAR (Home, About, Services Dropdown, Portfolio, Contact) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 shrink min-w-0"
            ref={servicesDropdownRef}
          >
            <Link to="/" className={navLinkClass(pathname === '/')}>
              Home
            </Link>

            <Link to="/about" className={navLinkClass(pathname === '/about')}>
              About
            </Link>

            {/* Services Working Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                  isServicesOpen || isServiceRouteActive
                    ? 'bg-sky-100 dark:bg-cyan-500/20 text-sky-800 dark:text-cyan-300 border-sky-300 dark:border-cyan-400/50 shadow-xs'
                    : 'text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-[#0f172a] border-transparent'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[640px] max-w-[90vw] p-4 bg-white dark:bg-[#090e1c] rounded-2xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white">
                        Specialized Web &amp; SEO Services
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      9 Dedicated Service Pages · 1 - 2 Days Sprint
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {ALL_SERVICE_NAV_ITEMS.map((item) => {
                      const Icon = SERVICE_ICONS[item.route] || Code2;
                      const color =
                        SERVICE_COLORS[item.route] ||
                        'text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 border-sky-200 dark:border-cyan-500/40';
                      const isActive = pathname === item.route;

                      return (
                        <Link
                          key={item.route}
                          to={item.route}
                          onClick={() => setIsServicesOpen(false)}
                          className={`group flex flex-col justify-between p-3 rounded-xl border transition-all cursor-pointer shadow-xs ${
                            isActive
                              ? 'border-cyan-500 bg-sky-50/80 dark:bg-cyan-950/40'
                              : 'border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 bg-slate-50 dark:bg-[#0e1628] hover:bg-cyan-50/50 dark:hover:bg-[#131f38]'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${color} group-hover:scale-105 transition-transform`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 truncate">
                                {item.title}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                {item.shortDesc}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                            <span className="font-bold text-sky-700 dark:text-cyan-300">
                              {item.badge}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 group-hover:translate-x-1 group-hover:text-cyan-500 transition-all flex items-center gap-0.5 font-bold">
                              <span>View Page</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Ordering Window: 4:00 PM – 8:00 PM PKT
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-sky-700 dark:text-cyan-300 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Start Custom Order</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/portfolio" className={navLinkClass(pathname === '/portfolio')}>
              Portfolio
            </Link>

            <Link to="/contact" className={navLinkClass(pathname === '/contact')}>
              Contact
            </Link>
          </nav>

          {/* ZONE 3: ACTIONS & CTA BUTTONS */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeToggle />

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="flex px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 border border-cyan-300 dark:border-cyan-500/40 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5 shadow-sm"
                title="Play 3D Futuristic Coding Intro"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="hidden 2xl:inline">3D Intro</span>
              </button>
            )}

            {onOrdersClick && (
              <button
                type="button"
                onClick={onOrdersClick}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-500/40 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="View All Received Orders & Inquiries"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="hidden sm:inline">Inbox</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClientPortalClick}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 hover:text-sky-600 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#0f172a] dark:hover:bg-[#16223d] border border-slate-300 dark:border-cyan-500/30 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Open Client Portal"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400 shrink-0" />
              <span className="hidden md:inline">Portal</span>
            </button>

            <button
              type="button"
              onClick={onQuoteClick}
              className="px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-extrabold text-white dark:text-slate-950 bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 hover:from-sky-600 hover:to-emerald-600 dark:hover:from-cyan-300 dark:hover:to-emerald-300 rounded-xl shadow-md shadow-sky-500/25 transition-all hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Free Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:outline-none shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/30 px-4 sm:px-6 py-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/80 dark:to-cyan-950/80 rounded-2xl border border-emerald-300 dark:border-emerald-500/40 text-xs sm:text-sm font-mono text-emerald-900 dark:text-emerald-200 font-bold flex items-center justify-between">
              <span>Ordering: 4:00 PM – 8:00 PM PKT</span>
              <span>1 - 2 Days</span>
            </div>

            {/* Primary Mobile Navigation Links */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border font-bold text-sm text-center transition-all ${
                  pathname === '/'
                    ? 'bg-sky-100 dark:bg-cyan-500/20 border-sky-400 text-sky-900 dark:text-cyan-300'
                    : 'bg-slate-50 dark:bg-[#0d1424] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border font-bold text-sm text-center transition-all ${
                  pathname === '/about'
                    ? 'bg-sky-100 dark:bg-cyan-500/20 border-sky-400 text-sky-900 dark:text-cyan-300'
                    : 'bg-slate-50 dark:bg-[#0d1424] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border font-bold text-sm text-center transition-all ${
                  pathname === '/portfolio'
                    ? 'bg-sky-100 dark:bg-cyan-500/20 border-sky-400 text-sky-900 dark:text-cyan-300'
                    : 'bg-slate-50 dark:bg-[#0d1424] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                Portfolio
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl border font-bold text-sm text-center transition-all ${
                  pathname === '/contact'
                    ? 'bg-sky-100 dark:bg-cyan-500/20 border-sky-400 text-sky-900 dark:text-cyan-300'
                    : 'bg-slate-50 dark:bg-[#0d1424] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Expandable Services Sub-Menu */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-slate-50/70 dark:bg-[#0b101e]">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs font-mono font-black uppercase tracking-wider text-slate-800 dark:text-cyan-300 px-1 py-1 cursor-pointer"
              >
                <span>Services Menu (9 Pages)</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {ALL_SERVICE_NAV_ITEMS.map((item) => {
                    const Icon = SERVICE_ICONS[item.route] || Code2;
                    const color =
                      SERVICE_COLORS[item.route] ||
                      'text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 border-sky-200 dark:border-cyan-500/40';
                    return (
                      <Link
                        key={item.route}
                        to={item.route}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1424] transition-all cursor-pointer"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-sky-700 dark:text-cyan-300 font-mono">
                            {item.badge}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-3 px-4 text-sm font-bold text-center bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-200 rounded-xl border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-cyan-500" />
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
