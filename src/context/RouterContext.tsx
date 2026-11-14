import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const BASE_URL = 'https://web-coder-agency.vercel.app';

export const VALID_ROUTES = [
  '/',
  '/about',
  '/website-for-shops-pakistan',
  '/website-development',
  '/web-design',
  '/ecommerce-development',
  '/business-websites',
  '/portfolio-websites',
  '/ai-website-development',
  '/custom-software-development',
  '/seo-services',
  '/portfolio',
  '/contact',
] as const;

export type ValidRoute = (typeof VALID_ROUTES)[number];

export interface QuotePrefillData {
  serviceType?: string;
  budget?: string;
  message?: string;
}

interface RouterContextValue {
  pathname: string;
  navigate: (to: string, options?: { replace?: boolean; prefill?: QuotePrefillData }) => void;
  isValidRoute: boolean;
  pendingPrefill: QuotePrefillData | null;
  clearPendingPrefill: () => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function normalizePathname(rawPath: string): string {
  const [pathOnly] = rawPath.split(/[?#]/);
  if (!pathOnly || pathOnly === '/') return '/';
  const cleaned = pathOnly.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(() =>
    normalizePathname(window.location.pathname)
  );
  const [pendingPrefill, setPendingPrefill] = useState<QuotePrefillData | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const next = normalizePathname(window.location.pathname);
      setPathname(next);
      if (window.location.hash) {
        setTimeout(() => {
          const el = document.querySelector(window.location.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean; prefill?: QuotePrefillData }) => {
      if (options?.prefill) {
        setPendingPrefill(options.prefill);
      }

      const hashIndex = to.indexOf('#');
      const targetPath = normalizePathname(hashIndex >= 0 ? to.slice(0, hashIndex) || '/' : to);
      const targetHash = hashIndex >= 0 ? to.slice(hashIndex) : '';

      const fullTarget = `${targetPath}${targetHash}`;
      const currentFull = `${normalizePathname(window.location.pathname)}${window.location.hash}`;

      if (fullTarget !== currentFull) {
        if (options?.replace) {
          window.history.replaceState({}, '', fullTarget);
        } else {
          window.history.pushState({}, '', fullTarget);
        }
      }

      setPathname(targetPath);

      if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  const clearPendingPrefill = useCallback(() => {
    setPendingPrefill(null);
  }, []);

  const isValidRoute = (VALID_ROUTES as readonly string[]).includes(pathname);

  return (
    <RouterContext.Provider
      value={{
        pathname,
        navigate,
        isValidRoute,
        pendingPrefill,
        clearPendingPrefill,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return ctx;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  prefill?: QuotePrefillData;
}

export const Link: React.FC<LinkProps> = ({ to, prefill, onClick, children, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigate(to, prefill ? { prefill } : undefined);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
