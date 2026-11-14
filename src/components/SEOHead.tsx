import React, { useEffect } from 'react';
import { BASE_URL, useRouter } from '../context/RouterContext';
import { NOT_FOUND_SEO, ROUTE_SEO_MAP } from '../data/seoRoutes';
import { FAQS } from '../data/agencyData';

const OG_IMAGE_URL = `${BASE_URL}/og-logo.png`;

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export const SEOHead: React.FC = () => {
  const { pathname, isValidRoute } = useRouter();
  const seo = isValidRoute && ROUTE_SEO_MAP[pathname] ? ROUTE_SEO_MAP[pathname] : NOT_FOUND_SEO;

  useEffect(() => {
    document.title = seo.title;

    setMetaTag('name', 'description', seo.description);
    setMetaTag('name', 'keywords', seo.keywords);
    setMetaTag('name', 'robots', seo.robots);
    setMetaTag('name', 'googlebot', seo.robots);

    setCanonicalLink(seo.canonical);

    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Web Ghost Coder Agency');
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', seo.canonical);
    setMetaTag('property', 'og:image', OG_IMAGE_URL);
    setMetaTag('property', 'og:image:alt', 'Web Coder Agency logo');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', OG_IMAGE_URL);
    setMetaTag('name', 'twitter:image:alt', 'Web Coder Agency logo');

    // Build dynamic Schema.org JSON-LD graph grounded in verified agency data
    const organizationSchema = {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Web Ghost Coder Agency',
      alternateName: 'Web Coder Agency',
      url: `${BASE_URL}/`,
      image: OG_IMAGE_URL,
      slogan: 'Your choice is our code.',
      description:
        'Web Coder Agency is a professional website development agency in Pakistan delivering fast websites for shops, businesses, schools, and hospitals in 1 to 2 days.',
      founder: {
        '@type': 'Person',
        name: 'Ibraheem Talat',
        jobTitle: 'CEO & Lead Full-Stack Architect',
      },
      telephone: '+92-300-9464514',
      email: 'ibraheemtalat2014@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
      },
      areaServed: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Place', name: 'International' },
      ],
      priceRange: 'PKR 17,999 - PKR 40,000',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '16:00',
          closes: '20:00',
        },
      ],
    };

    const websiteSchema = {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: 'Web Ghost Coder Agency',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'en',
    };

    const graph: Record<string, unknown>[] = [organizationSchema, websiteSchema];

    if (seo.path !== '/' && seo.schemaType !== 'NotFound') {
      const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_URL}/`,
        },
      ];

      if (seo.parentBreadcrumb && seo.parentBreadcrumb.path !== seo.path) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: seo.parentBreadcrumb.label,
          item: `${BASE_URL}${seo.parentBreadcrumb.path}`,
        });
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: seo.breadcrumbLabel,
          item: seo.canonical,
        });
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: seo.breadcrumbLabel,
          item: seo.canonical,
        });
      }

      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${seo.canonical}#breadcrumb`,
        itemListElement: breadcrumbItems,
      });
    }

    if (seo.schemaType === 'Service' && seo.serviceName) {
      graph.push({
        '@type': 'Service',
        '@id': `${seo.canonical}#service`,
        name: seo.serviceName,
        serviceType: seo.serviceCategory || seo.serviceName,
        description: seo.description,
        url: seo.canonical,
        provider: { '@id': `${BASE_URL}/#organization` },
        areaServed: [
          { '@type': 'Country', name: 'Pakistan' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
      });
    } else if (seo.schemaType === 'About') {
      graph.push({
        '@type': 'AboutPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
      });
    } else if (seo.schemaType === 'Portfolio') {
      graph.push({
        '@type': 'CollectionPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      });
    } else if (seo.schemaType === 'Contact') {
      graph.push({
        '@type': 'ContactPage',
        '@id': `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      });
    } else if (seo.schemaType === 'Home') {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    let scriptEl = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (!scriptEl) {
      // Remove any stale static ld+json scripts once dynamic router takes over to avoid duplicate/conflicting schemas
      const existingStaticScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingStaticScripts.forEach((s) => s.remove());

      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-page-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [seo]);

  return null;
};
