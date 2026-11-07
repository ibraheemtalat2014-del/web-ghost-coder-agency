import React, { useState } from 'react';
import { PRICING_PACKAGES, AGENCY_CONFIG } from '../data/agencyData';
import { Check, Sparkles, MessageSquare, Phone, ArrowRight, Terminal, Clock } from 'lucide-react';

interface PricingProps {
  onSelectPackage: (packageName: string, price: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-400 mb-2 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3.5 py-1.5 rounded-xl">
              <Terminal className="w-4 h-4" />
              <span>04. TRANSPARENT PRICING &amp; PACKAGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Affordable Packages with <span className="coder-gradient-text">1 - 2 Days Delivery</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
              Clear, upfront fixed investments with zero hidden charges. Delivered rapidly in 24 - 48 hours.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-[#0b101e] rounded-2xl border border-slate-300 dark:border-cyan-500/30 shrink-0">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currency === 'PKR'
                  ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              PKR (Rs)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                currency === 'USD'
                  ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Global Preferable Order Banner */}
        <div className="mb-10 p-4 sm:p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-300 dark:border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-emerald-950 dark:text-emerald-300 font-mono">
                WhatsApp &amp; Call Orders Preferred: "Your choice is our code"
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                Daily ordering window: <strong className="text-emerald-800 dark:text-emerald-400 font-mono font-bold">4:00 PM to 8:00 PM PKT</strong>. Call or WhatsApp <strong className="text-slate-900 dark:text-white font-mono font-bold">03009464514</strong>.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              WhatsApp Direct
            </a>
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all"
            >
              Call Hotline
            </a>
          </div>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PRICING_PACKAGES.map((pkg) => {
            const displayPrice = currency === 'PKR' ? pkg.pricePKR : `$${pkg.priceUSD}`;
            const priceSub = currency === 'PKR' ? `$${pkg.priceUSD}` : pkg.pricePKR;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-xl ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-sky-50 via-white to-sky-50/50 dark:from-[#0f172a] dark:to-[#070d18] border-2 border-sky-400 dark:border-cyan-400 scale-[1.02] shadow-sky-500/10'
                    : 'bg-white dark:bg-[#0b101e] border border-slate-200 dark:border-cyan-500/20 hover:border-sky-300 dark:hover:border-cyan-400/40'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm font-mono font-bold text-sky-800 dark:text-cyan-400 bg-sky-100 dark:bg-cyan-950/70 px-3 py-1 rounded-lg border border-sky-200 dark:border-cyan-500/30">
                      {pkg.bestFor.split(',')[0]}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
                      ⚡ {pkg.turnaround}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {pkg.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {pkg.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#070b16] rounded-2xl border border-slate-200 dark:border-slate-800/80 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
                        {displayPrice}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                        ({priceSub})
                      </span>
                    </div>
                    <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-1 font-bold">
                      One-time fee · Full code ownership included
                    </div>
                  </div>

                  {/* Mandatory Order Note */}
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-500/30 mb-6 text-[11px] font-mono text-emerald-900 dark:text-emerald-300 leading-snug">
                    "WhatsApp and call orders are more comfortable and preferable. Your choice is our code."
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Included Deliverables:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: Direct Select & WhatsApp Order */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => onSelectPackage(pkg.name, displayPrice)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-black transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-md hover:scale-[1.02]'
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700'
                    }`}
                  >
                    Select {pkg.name} Package
                  </button>

                  <a
                    href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20want%20to%20order%20the%20${encodeURIComponent(pkg.name)}%20package%20(${encodeURIComponent(displayPrice)})%20with%201-2%20days%20delivery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Order on WhatsApp (Preferred)</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
