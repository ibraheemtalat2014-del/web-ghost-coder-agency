import React from 'react';

interface LogoMarkProps {
  className?: string;
  decorative?: boolean;
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  className = 'w-9 h-9',
  decorative = false,
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Web Coder Agency logo'}
      aria-hidden={decorative ? true : undefined}
    >
      {!decorative && <title>Web Coder Agency logo</title>}
      {/* Browser window base in deep blue */}
      <rect x="2" y="4" width="44" height="40" rx="9" fill="#0f2b5b" />
      {/* Browser top title bar */}
      <path d="M2 13C2 8.02944 6.02944 4 11 4H37C41.9706 4 46 8.02944 46 13V15H2V13Z" fill="#173c7a" />
      {/* Minimal browser window dots */}
      <circle cx="9.5" cy="9.5" r="1.8" fill="#14b8a6" />
      <circle cx="15" cy="9.5" r="1.8" fill="#38bdf8" />
      <circle cx="20.5" cy="9.5" r="1.8" fill="#93c5fd" />
      {/* Subtle globe wireframe inside browser viewport */}
      <circle cx="24" cy="29.5" r="10.5" stroke="#2255a4" strokeWidth="1.5" />
      <ellipse cx="24" cy="29.5" rx="5" ry="10.5" stroke="#2255a4" strokeWidth="1.3" />
      <line x1="13.5" y1="29.5" x2="34.5" y2="29.5" stroke="#2255a4" strokeWidth="1.3" />
      {/* Code brackets "</>" in bright teal & crisp white */}
      <path
        d="M16.5 24.5L11 29.5L16.5 34.5"
        stroke="#2dd4bf"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 24.5L37 29.5L31.5 34.5"
        stroke="#2dd4bf"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 23.2L22 35.8"
        stroke="#ffffff"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface LogoProps {
  variant?: 'header' | 'footer';
  subtitle?: React.ReactNode;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  subtitle,
  className = '',
}) => {
  const isFooter = variant === 'footer';

  return (
    <span
      className={`inline-flex items-center ${isFooter ? 'gap-2' : 'gap-2.5 sm:gap-3'} select-none ${className}`}
      aria-label="Web Coder Agency logo"
    >
      <LogoMark
        decorative
        className={`${
          isFooter ? 'w-7 h-7' : 'w-9 h-9 sm:w-10 sm:h-10'
        } shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-xs`}
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`font-sans tracking-tight flex items-baseline gap-1.5 ${
            isFooter
              ? 'text-sm sm:text-base text-white'
              : 'text-base sm:text-lg text-[#0f2b5b] dark:text-white'
          }`}
        >
          <span className="font-bold">Web Coder</span>
          <span
            className={`font-light ${
              isFooter
                ? 'text-teal-300'
                : 'hidden sm:inline text-teal-600 dark:text-teal-300'
            }`}
          >
            Agency
          </span>
        </span>
        {subtitle && (
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
};
