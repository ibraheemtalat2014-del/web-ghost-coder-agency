import React, { useState } from 'react';
import { PortalUser, ProjectData } from '../../types/portal';
import { Lock, Mail, Key, X, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

interface PortalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: PortalUser, project: ProjectData) => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoSelect = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.user, data.project);
        onClose();
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again or use the demo switcher.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#070a14]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">Client Portal Sign In</h3>
              <p className="text-[11px] text-cyan-400 font-mono">Web Ghost Coder Agency · 1 - 2 Days Delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Demo Switcher Strip */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Quick Demo Accounts (1-Click)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Pass: password123</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect('sarah.munir@oakwood.edu')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Prof. Sarah Munir (School Portal)</div>
                  <div className="text-[11px] text-slate-400">Oakwood Educational Academy · 68% Progress</div>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  Select
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('dr.hamza@tariqclinic.com')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Dr. Hamza Tariq (Hospital System)</div>
                  <div className="text-[11px] text-slate-400">Tariq Specialty Clinic · 88% Progress</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                  Select
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('bilal@nexera.com')}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">Bilal Khan (Google Ads Landing Page)</div>
                  <div className="text-[11px] text-slate-400">Nexera Commercial Logistics · 100% Launched</div>
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                  Select
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Client Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah.munir@oakwood.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter your portal password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-400/20 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Client...</span>
              ) : (
                <>
                  <span>Access Client Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted 256-bit SSL portal connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
