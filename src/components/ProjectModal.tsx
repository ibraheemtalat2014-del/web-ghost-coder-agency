import React from 'react';
import { PortfolioItem } from '../types';
import { AGENCY_CONFIG } from '../data/agencyData';
import { X, CheckCircle2, MessageSquare, Phone, ArrowRight, Terminal } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onOrderSimilar: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOrderSimilar }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0b101e] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#070a14]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>{project.categoryLabel}</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ⚡ 1 - 2 Days Delivery
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Preferable note banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/70 via-[#070a14] to-cyan-950/70 rounded-xl border border-emerald-500/40 shadow-md">
            <div className="flex items-start gap-2.5">
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-emerald-300">
                  WhatsApp and call orders are more comfortable and preferable.
                </div>
                <div className="text-xs font-mono text-cyan-300 font-semibold">
                  "Your choice is our code."
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Want a project like this built in 1 - 2 days? Message or call directly at 03009464514.
                </div>
              </div>
            </div>
          </div>

          {/* Image Banner */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview &amp; Client Need
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Outcome Metric Callout */}
          <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-500/30">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
              Verified Business Impact
            </div>
            <div className="text-base font-bold text-emerald-300 font-mono">
              {project.results}
            </div>
          </div>

          {/* Feature List */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Engineered Capabilities &amp; Modules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#080d19] rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
            <span className="text-slate-400 font-semibold">Technology Stack:</span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-cyan-300 bg-slate-900 border border-cyan-500/30 px-2.5 py-1 rounded-md text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 border-t border-cyan-500/20 bg-[#070a14] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20saw%20your%20case%20study%20for%20${encodeURIComponent(project.title)}%20and%20want%20a%20similar%20website%20in%201%20-%202%20days.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Order</span>
            </a>

            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us</span>
            </a>
          </div>

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
                onOrderSimilar(project.title);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Order Similar Website</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
