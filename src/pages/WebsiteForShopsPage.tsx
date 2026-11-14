import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AGENCY_CONFIG, PORTFOLIO_PROJECTS } from '../data/agencyData';
import { Link, useRouter } from '../context/RouterContext';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Headphones,
  LayoutGrid,
  MessageSquare,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Tag,
  Terminal,
  Zap,
} from 'lucide-react';

export const WebsiteForShopsPage: React.FC = () => {
  const { navigate } = useRouter();

  const handleOrderShopWebsite = () => {
    navigate('/contact#contact', {
      prefill: {
        serviceType: 'Business website development (PKR 25,999 / $94)',
        message:
          'Hello Web Coder Agency! I want a Website for My Shop in Pakistan (1 to 2 Days delivery) with online store, product catalog, and WhatsApp order button.',
      },
    });
  };

  const whatsappShopLink = `https://wa.me/${AGENCY_CONFIG.whatsapp}?text=${encodeURIComponent(
    'Hello Ibraheem Talat (Web Coder Agency)! I want to order a Website for My Shop in Pakistan (delivered in 1 to 2 days).'
  )}`;

  const whatWeBuildForShops = [
    {
      icon: ShoppingBag,
      title: 'Online Store',
      description:
        'A fast, reliable online store website Pakistan shopkeepers can run 24/7. Showcase all your categories and take orders day and night even when your physical shutter is closed.',
      tag: '24/7 Shopfront',
    },
    {
      icon: LayoutGrid,
      title: 'Product Catalog',
      description:
        'Clean, organized product catalog with clear photos, PKR prices, sizes/variants, and search filters so customers browse your website for shop items in seconds.',
      tag: 'Easy Browsing',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Order Button',
      description:
        'One-tap WhatsApp order button on every product card. Customers send the exact product name and price straight to your WhatsApp—no complicated checkout barriers.',
      tag: 'Instant Orders',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly Design',
      description:
        'Built mobile-first by a dedicated website developer in Pakistan so pages load rapidly on 3G/4G mobile data across Lahore, Karachi, Islamabad, and smaller cities.',
      tag: 'Fast on 3G / 4G',
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Share Your Shop Name & Products',
      description:
        'Call or WhatsApp 03009464514 between 4:00 PM and 8:00 PM PKT with your shop details, logo or photos, and list of products you sell.',
    },
    {
      step: '02',
      title: 'We Build Your Shop Website & Catalog',
      description:
        'Our senior team—a trusted website banane wali company Pakistan shop owners rely on—codes your mobile-ready online store, product catalog, and WhatsApp order buttons.',
    },
    {
      step: '03',
      title: 'Review & Go Live in 1 to 2 Days',
      description:
        'You test your shop website on your mobile phone, approve any final edits, and launch live online within 1 to 2 days ready for Google Search and WhatsApp sharing.',
    },
  ];

  const whyChooseUsReasons = [
    {
      icon: Zap,
      title: 'Fast 1 to 2 Day Delivery',
      description:
        'Do not wait weeks or months to take your shop online. We engineer and launch your complete website for shop growth in just 1 to 2 business days.',
    },
    {
      icon: Tag,
      title: 'Affordable Fixed Price',
      description:
        'Clear PKR pricing starting from PKR 17,999 ($65) for shop promo landing pages and PKR 25,999 ($94) for multi-page shop & business websites—zero hidden charges.',
    },
    {
      icon: Headphones,
      title: 'Support After Delivery',
      description:
        'As an experienced website developer in Pakistan led by CEO Ibraheem Talat, we provide direct WhatsApp and phone support after delivery so your shop stays running smoothly.',
    },
  ];

  const shopSamples = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <>
      {/* 1. HERO SECTION WITH EXACT H1 & FIRST LINE */}
      <section className="pt-10 pb-14 sm:pt-14 sm:pb-20 bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-[#0b1329] dark:via-[#0b1120] dark:to-[#070b16] border-b border-sky-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/website-development' },
              { label: 'Website for Shops in Pakistan' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-500/40 px-3.5 py-1.5 rounded-xl">
                  <Store className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>PAKISTAN SHOP WEBSITE SPECIALIST</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 px-3.5 py-1.5 rounded-xl">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Delivered in 1 to 2 Days</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.14] mb-5">
                Website for Your Shop in Pakistan, Delivered in 1 to 2 Days
              </h1>

              <p className="text-base sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed mb-4 font-semibold">
                We build affordable, professional websites for shop owners across Pakistan, and we deliver in just 1 to 2 days.
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                Whether you own a clothing boutique, electronics store, pharmacy, bakery, grocery mart, or showroom, partnering with a reliable website developer in Pakistan lets customers browse your catalog and place orders 24/7. As a customer-first website banane wali company Pakistan retailers trust, we turn your catalog into a fast online store website Pakistan buyers can order from on WhatsApp in one tap.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOrderShopWebsite}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Order Your Shop Website Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={whatsappShopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp {AGENCY_CONFIG.phone}</span>
                </a>
                <a
                  href={`tel:${AGENCY_CONFIG.phone}`}
                  className="px-5 py-4 rounded-2xl bg-white dark:bg-[#0d1424] text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm sm:text-base flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Right Shop Package Card */}
            <aside className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0b101e] border-2 border-sky-200 dark:border-cyan-500/40 shadow-xl space-y-5">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-sky-700 dark:text-cyan-400">
                  Shopkeeper Friendly Pricing
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  From PKR 17,999 ($65)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Full shop &amp; business websites from PKR 25,999 ($94)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/40 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 font-mono">
                  "WhatsApp &amp; call orders are preferred."
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  Daily hours: <strong>{AGENCY_CONFIG.orderingHours}</strong>
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  CEO: <strong>{AGENCY_CONFIG.ownerName}</strong>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Ready-to-share online store website Pakistan wide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Product catalog with clean PKR prices &amp; categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>One-tap WhatsApp Order button on every item</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Full code ownership &amp; post-delivery support</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE BUILD FOR SHOPS */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 bg-sky-50 dark:bg-cyan-950/60 border border-sky-200 dark:border-cyan-500/30 px-3 py-1 rounded-lg mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>WHAT WE BUILD FOR SHOPS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Everything Your Shop Needs to Sell Online 24/7
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every website for shop owners is engineered to turn local visitors and social media traffic into real customer orders without technical complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeBuildForShops.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-7 rounded-3xl bg-slate-50 dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/25 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-cyan-950/70 border border-sky-200 dark:border-cyan-500/40 flex items-center justify-center text-sky-700 dark:text-cyan-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-xl">
                        0{idx + 1} · {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS IN 3 SIMPLE STEPS & WHY CHOOSE US */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 3 Simple Steps */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3 py-1 rounded-lg mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>3 SIMPLE STEPS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                How It Works in 3 Simple Steps
              </h2>
            </div>

            <div className="space-y-4">
              {howItWorksSteps.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/25 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-lg mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WHY SHOP OWNERS CHOOSE US</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Why Choose Our Website Banane Wali Company in Pakistan
              </h2>
            </div>

            <div className="space-y-4">
              {whyChooseUsReasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-emerald-500/25 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SAMPLE WORK SECTION */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Sample Work Built in 1 to 2 Days
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                Explore clean, fast-loading websites crafted by our team for retail brands, institutions, and service businesses.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-bold text-sm inline-flex items-center gap-2 w-fit"
            >
              <span>View Full Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shopSamples.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={`${project.title} – ${project.categoryLabel} sample website built by Web Coder Agency in Pakistan`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-mono font-bold text-sky-700 dark:text-cyan-400 uppercase mb-1.5">
                      {project.categoryLabel}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    1 - 2 Days Delivery
                  </span>
                  <Link
                    to="/contact"
                    prefill={{
                      message: `I saw "${project.title}" on the Website for Shops page and want a similar website for my shop.`,
                    }}
                    className="text-sky-700 dark:text-cyan-300 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Order Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLEAR CONTACT CTA & INTERNAL LINKS */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-[#070b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0b101e] border-2 border-emerald-300 dark:border-emerald-500/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                READY IN 1 TO 2 DAYS · 4:00 PM – 8:00 PM PKT
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Launch Your Shop Website &amp; Start Getting Online Orders
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Contact CEO Ibraheem Talat directly to discuss your shop catalog, pricing, and domain. WhatsApp and call orders are preferred at <strong>{AGENCY_CONFIG.phone}</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleOrderShopWebsite}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Contact Us &amp; Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappShopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 03009464514</span>
              </a>
            </div>
          </div>

          {/* Internal Links Grid */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">
              Explore Related Services for Pakistani Shop &amp; Business Owners
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <Link
                to="/"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all"
              >
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">Home</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Back to Web Coder Agency overview, packages, and live pricing.
                </p>
              </Link>
              <Link
                to="/ecommerce-development"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all"
              >
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  E-Commerce Development
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Full online store architecture with shopping cart &amp; COD flow.
                </p>
              </Link>
              <Link
                to="/business-websites"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all"
              >
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  Business Websites
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Company &amp; showroom websites in Pakistan starting at PKR 25,999.
                </p>
              </Link>
              <Link
                to="/seo-services"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-all"
              >
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
                  SEO Services in Pakistan
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Rank your shop and business website higher on Google Search.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
