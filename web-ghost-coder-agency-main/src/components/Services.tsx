import React, { useState } from 'react';
import { AGENCY_SERVICES, AGENCY_CONFIG } from '../data/agencyData';
import { ServiceItem } from '../types';
import { Briefcase, GraduationCap, HeartPulse, Target, Code2, ArrowRight, Check, MessageSquare, Phone, Clock, Terminal } from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOrderService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOrderService }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-sky-600 dark:text-cyan-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-cyan-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-600 dark:text-cyan-400" />;
      case 'Target':
        return <Target className="w-6 h-6 text-amber-600 dark:text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-indigo-600 dark:text-cyan-400" />;
      default:
        return <Terminal className="w-6 h-6 text-sky-600 dark:text-cyan-400" />;
    }
  };

  const filteredServices = activeFilter === 'all'
    ? AGENCY_SERVICES
    : AGENCY_SERVICES.filter((s) => s.id === activeFilter);

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-[#060810] border-b border-slate-200 dark:border-cyan-500/20 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-black tracking-wider uppercase text-sky-800 dark:text-cyan-400 mb-2 bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/30 px-3 py-1 rounded-lg">
              <Terminal className="w-3.5 h-3.5" />
              <span>// SERVICES &amp; PRICING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Specialized Websites Built in <span className="coder-gradient-text">1 - 2 Days</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-medium">
              Transparent, affordable rates for businesses, schools, hospitals, and Google Ads campaigns. Fast 24 - 48 hour turnaround with direct coder access.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white dark:bg-[#0b101d] rounded-2xl border border-slate-200 dark:border-cyan-500/30 shrink-0 shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (5)
            </button>
            {AGENCY_SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded-xl transition-colors cursor-pointer ${
                  activeFilter === s.id
                    ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Global Ordering Banner */}
        <div className="mb-10 p-4 bg-gradient-to-r from-emerald-100 via-sky-50 to-emerald-100 dark:from-emerald-950/70 dark:via-[#0c1222] dark:to-cyan-950/70 rounded-2xl border border-emerald-300 dark:border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-emerald-950 dark:text-emerald-300 font-mono">
                WhatsApp &amp; Call Orders Preferred: "Your choice is our code"
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Daily ordering window: <strong className="text-emerald-800 dark:text-emerald-400 font-mono">4:00 PM – 8:00 PM PKT</strong>. Call or WhatsApp <strong className="text-slate-900 dark:text-white font-mono">03009464514</strong>.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Call 03009464514</span>
            </a>
          </div>
        </div>

        {/* Services Grid (All 5 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-7 bg-white dark:bg-[#0b101e] rounded-3xl border border-slate-200 dark:border-cyan-500/25 hover:border-sky-400 dark:hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Header row: Icon & Delivery badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-all shadow-xs">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-mono font-extrabold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/30">
                      ⚡ 1 - 2 Days Delivery
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-medium">
                  {service.shortDesc}
                </p>

                {/* Mandatory Note Banner on EVERY service card */}
                <div className="p-3 bg-emerald-50 dark:bg-[#08151f] rounded-xl border border-emerald-200 dark:border-emerald-500/30 mb-5">
                  <div className="text-[11px] font-mono font-bold text-emerald-900 dark:text-emerald-300 leading-tight">
                    "{service.orderNote}"
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-mono mt-1">
                    Ordering window: <strong>4:00 PM – 8:00 PM PKT</strong>
                  </div>
                </div>

                {/* Exact Price Banner */}
                <div className="p-3.5 bg-slate-50 dark:bg-[#070b16] rounded-2xl border border-slate-200 dark:border-slate-800 mb-5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">Fixed Pricing:</span>
                  <span className="text-sm sm:text-base font-black text-sky-700 dark:text-cyan-300 font-mono">
                    {service.startingPrice}
                  </span>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: Details, Direct WhatsApp & Order */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-bold transition-all text-center border border-slate-300 dark:border-slate-800 cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOrderService(service.title)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-xs font-mono font-bold transition-all text-center shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    Order Now
                  </button>
                </div>

                {/* Direct WhatsApp Ordering Button with pre-filled message */}
                <a
                  href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20would%20like%20to%20order%20the%20${encodeURIComponent(service.title)}%20(${encodeURIComponent(service.startingPrice)})%20with%201-2%20days%20delivery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp (Preferred)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
