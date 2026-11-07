import React from 'react';
import { ServiceItem } from '../types';
import { AGENCY_CONFIG } from '../data/agencyData';
import { X, CheckCircle2, MessageSquare, Phone, ArrowRight, Clock, Tag, Terminal } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOrderService: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOrderService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b101e] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#070a14]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>{service.badge}</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ⚡ Turnaround: 1 - 2 Days
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* MANDATORY PREFERABLE ORDER NOTE BANNER */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/70 via-slate-950/90 to-cyan-950/70 rounded-xl border border-emerald-500/50 shadow-md">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-emerald-300">
                  WhatsApp and call orders are more comfortable and preferable.
                </div>
                <div className="text-xs font-mono text-cyan-300 font-semibold mt-0.5">
                  "Your choice is our code."
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  Call or message us directly at <strong className="text-white">03009464514 (+92 300 9464514)</strong> to get started right away with zero delays!
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-emerald-500/20">
              <a
                href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20want%20to%20order%20the%20${encodeURIComponent(service.title)}%20for%20${encodeURIComponent(service.startingPrice)}.%20Delivery%3A%201%20-%202%20Days.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Order via WhatsApp (Instant)</span>
              </a>

              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Directly (03009464514)</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Service Overview
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#080d19] rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fixed Rate</span>
              </div>
              <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono">
                {service.startingPrice}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Transparent, all-inclusive price</div>
            </div>

            <div className="p-4 bg-[#080d19] rounded-xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Guaranteed Delivery</span>
              </div>
              <div className="text-lg font-bold text-emerald-400 font-mono">1 - 2 Days</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Rapid 24 to 48 hour turnaround</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Included Deliverables &amp; Benefits
            </h4>
            <div className="space-y-2.5">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 border-t border-cyan-500/20 bg-[#070a14] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20want%20to%20discuss%20${encodeURIComponent(service.title)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOrderService(service.title);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Order ({service.startingPrice})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
