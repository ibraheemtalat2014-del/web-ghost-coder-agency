import React from 'react';
import { Link } from '../context/RouterContext';
import { ArrowRight, Code2, FolderGit2, Home, MessageSquare, Terminal } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const NotFoundPage: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#070b16] min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 px-3.5 py-1.5 rounded-xl mb-5">
          <Terminal className="w-4 h-4" />
          <span>HTTP 404 · ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Page Not Found <span className="coder-gradient-text">(404)</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
          The page URL you visited does not exist or may have moved. Use the verified links below to explore Web Ghost Coder Agency services, portfolio work, or start a quote.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm flex items-center gap-2 shadow-md hover:scale-[1.02] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/website-development"
            className="px-5 py-3.5 rounded-xl bg-white dark:bg-[#0d1424] text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#131d36] transition-all"
          >
            <Code2 className="w-4 h-4" />
            <span>Website Services</span>
          </Link>
          <Link
            to="/portfolio"
            className="px-5 py-3.5 rounded-xl bg-white dark:bg-[#0d1424] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-sm flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-[#131d36] transition-all"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Our Projects</span>
          </Link>
          <Link
            to="/contact"
            className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-3">
          <span>Need immediate assistance?</span>
          <a
            href={AGENCY_CONFIG.primaryWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1 hover:underline"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp {AGENCY_CONFIG.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
