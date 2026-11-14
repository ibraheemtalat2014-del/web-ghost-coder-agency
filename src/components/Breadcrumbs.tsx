import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="inline-flex flex-wrap items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-[#0b101e]/90 border border-slate-200 dark:border-cyan-500/25 text-xs sm:text-sm font-mono shadow-xs">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 font-semibold transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className="text-sky-700 dark:text-cyan-300 font-bold"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
