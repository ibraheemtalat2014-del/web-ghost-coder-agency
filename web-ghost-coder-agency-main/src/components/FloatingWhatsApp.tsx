import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-xl text-xs text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Need a website? Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={AGENCY_CONFIG.primaryWhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        title="Chat on WhatsApp with Web Ghost Coder Agency"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageSquare className="w-6 h-6 fill-slate-950 text-slate-950" />
      </a>
    </div>
  );
};
