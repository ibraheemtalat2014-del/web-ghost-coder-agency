import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, AGENCY_CONFIG } from '../data/agencyData';
import { PortfolioItem } from '../types';
import { ExternalLink, CheckCircle, Terminal, MessageSquare, Phone } from 'lucide-react';

interface PortfolioProps {
  onSelectProject: (project: PortfolioItem) => void;
  onQuoteClick: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onQuoteClick }) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-[#060810] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
              <Terminal className="w-3.5 h-3.5" />
              <span>PORTFOLIO &amp; ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Sample Projects Built in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">1 - 2 Days</span>
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Browse our portfolio of specialized websites and portals designed for schools, hospitals, corporate brands, and performance marketing funnels.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0b101e] rounded-xl border border-cyan-500/30 shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('school')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'school' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              School
            </button>
            <button
              onClick={() => setFilter('hospital')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'hospital' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hospital
            </button>
            <button
              onClick={() => setFilter('landing')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'landing' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Google Ads
            </button>
            <button
              onClick={() => setFilter('business')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'business' ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Corporate
            </button>
          </div>
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0b101e]/80 hover:bg-[#0e1628] rounded-2xl border border-slate-800 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 flex flex-col group shadow-xl"
            >
              {/* Screenshot Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={`${project.title} – ${project.categoryLabel} website built by Web Ghost Coder Agency`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-[#0b101e]/20 to-transparent" />

                {/* Category Unboxed Marker */}
                <div className="absolute top-4 left-4 bg-[#070a14]/90 backdrop-blur-md px-3 py-1 rounded-md border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                  {project.categoryLabel}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold text-white font-mono">{project.client}</span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    ⚡ 1 - 2 Days Turnaround
                  </span>
                </div>
              </div>

              {/* Project Details Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlighted Project Features */}
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome strip and CTA */}
                <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    <span className="text-slate-400 block font-medium font-mono">Outcome:</span>
                    <span className="text-emerald-400 font-mono font-bold">{project.results}</span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-mono font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>View Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Project CTA strip */}
        <div className="mt-12 p-8 bg-[#0b101e]/80 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold font-mono">
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp and call orders are more comfortable and preferable.</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              "Your choice is our code." Live within 1 - 2 days!
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Tell us your organization type and features via WhatsApp. We will start your 24 - 48 hour delivery sprint immediately.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={AGENCY_CONFIG.primaryWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Order</span>
            </a>
            <a
              href={`tel:${AGENCY_CONFIG.phone}`}
              className="flex-1 sm:flex-initial px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
