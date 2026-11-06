import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-mono text-xs font-bold ${
        theme === 'light'
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 shadow-sm'
          : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 shadow-sm'
      } ${className}`}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      aria-label="Toggle theme mode"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-4 h-4 text-indigo-600" />
          <span className="hidden sm:inline text-slate-700">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-amber-200">Light</span>
        </>
      )}
    </button>
  );
};
