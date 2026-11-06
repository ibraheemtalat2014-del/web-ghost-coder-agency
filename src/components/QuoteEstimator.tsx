import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { Calculator, MessageSquare, Phone, ArrowRight, Check, Clock, ShieldCheck, Terminal } from 'lucide-react';

interface QuoteEstimatorProps {
  onApplyEstimateToForm: (data: {
    serviceType: string;
    budget: string;
    summary: string;
  }) => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ onApplyEstimateToForm }) => {
  const [projectType, setProjectType] = useState<string>('business');
  const [pagesCount, setPagesCount] = useState<number>(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'seo',
    'whatsapp',
  ]);

  const availableFeatures = [
    { id: 'whatsapp', label: 'Direct WhatsApp & Call Integration', priceUSD: 10, pricePKR: 2800 },
    { id: 'seo', label: 'Technical SEO & 95+ Google PageSpeed', priceUSD: 15, pricePKR: 4200 },
    { id: 'admissions', label: 'Online Admissions / Patient Booking Engine', priceUSD: 25, pricePKR: 7000 },
    { id: 'cms', label: 'Content Management Dashboard', priceUSD: 25, pricePKR: 7000 },
    { id: 'pixel', label: 'Google Ads & Meta Conversion Tracking Pixels', priceUSD: 15, pricePKR: 4200 },
    { id: 'payment', label: 'Online Payment Gateway Integration', priceUSD: 20, pricePKR: 5600 },
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Exact base prices per user request
  const getBasePrices = () => {
    switch (projectType) {
      case 'landing':
        return { usd: 65, pkr: 17999, name: 'High-Converting Landing Pages for Google Ads' };
      case 'business':
        return { usd: 94, pkr: 25999, name: 'Business Website Development' };
      case 'custom':
        return { usd: 119, pkr: 32999, name: 'Custom Website & Web Application Development' };
      case 'hospital':
        return { usd: 141, pkr: 38999, name: 'Hospital & Healthcare Website Development' };
      case 'school':
        return { usd: 144, pkr: 40000, name: 'School & Educational Website Development' };
      default:
        return { usd: 94, pkr: 25999, name: 'Business Website Development' };
    }
  };

  const base = getBasePrices();
  const pagesAddonUSD = Math.max(0, pagesCount - (projectType === 'landing' ? 1 : 4)) * 5;
  const pagesAddonPKR = pagesAddonUSD * 280;

  const featuresAddonUSD = selectedFeatures.reduce((acc, featId) => {
    const feat = availableFeatures.find((f) => f.id === featId);
    return acc + (feat ? feat.priceUSD : 0);
  }, 0);

  const featuresAddonPKR = selectedFeatures.reduce((acc, featId) => {
    const feat = availableFeatures.find((f) => f.id === featId);
    return acc + (feat ? feat.pricePKR : 0);
  }, 0);

  const totalUSD = base.usd + pagesAddonUSD + featuresAddonUSD;
  const totalPKR = base.pkr + pagesAddonPKR + featuresAddonPKR;

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Web Ghost Coder Agency! I used your Website Calculator.\n\nProject: ${base.name}\nPages: ${pagesCount}\nFeatures: ${selectedFeatures.join(', ')}\nEstimated Total: ${totalPKR.toLocaleString()} PKR ($${totalUSD})\nTurnaround: 1 - 2 Days\n\nWhatsApp and call orders are more comfortable and preferable. Your choice is our code!`
    );
    window.open(`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=${text}`, '_blank');
  };

  const handleApplyToForm = () => {
    onApplyEstimateToForm({
      serviceType: base.name,
      budget: `PKR ${totalPKR.toLocaleString()} ($${totalUSD})`,
      summary: `Estimated ${pagesCount} pages with ${selectedFeatures.length} add-on features. Delivery timeline: 1 - 2 Days.`,
    });
  };

  return (
    <section id="estimator" className="py-20 bg-[#060810] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 mb-2 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg">
            <Terminal className="w-3.5 h-3.5" />
            <span>// INSTANT COST ESTIMATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Instant Project Cost &amp; Timeline Calculator
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Configure your exact requirements. All packages are delivered in <span className="text-emerald-400 font-bold">1 - 2 Days</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-[#0b101e]/90 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-xl">
            {/* 1. Project Type Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                1. Select Website Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'landing', label: 'Google Ads Landing Page', price: 'PKR 17,999 ($65)' },
                  { id: 'business', label: 'Business Website', price: 'PKR 25,999 ($94)' },
                  { id: 'custom', label: 'Custom Web Application', price: 'PKR 32,999 ($119)' },
                  { id: 'hospital', label: 'Hospital & Healthcare', price: 'PKR 38,999 ($141)' },
                  { id: 'school', label: 'School & Educational', price: 'PKR 40,000 ($144)' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProjectType(type.id)}
                    className={`py-3 px-3 text-xs font-mono font-semibold rounded-xl text-left border transition-all cursor-pointer ${
                      projectType === type.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-white">{type.label}</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">{type.price} · 1-2 Days</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Number of Pages Slider */}
            {projectType !== 'landing' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    2. Estimated Total Web Pages: <span className="text-white font-mono font-bold text-sm">{pagesCount} Pages</span>
                  </label>
                  <span className="text-xs text-slate-400 font-mono">1 to 20 pages</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* 3. Feature Selection */}
            <div>
              <label className="block text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
                3. Choose Required Functionality &amp; Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-cyan-950/70 border-cyan-400/80 text-cyan-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                            : 'border-slate-700 bg-slate-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="leading-tight font-medium">{feat.label}</div>
                        <div className="text-[10px] font-mono text-emerald-400 mt-0.5">+PKR {feat.pricePKR} (${feat.priceUSD})</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferable note callout */}
            <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp and call orders are more comfortable and preferable. Your choice is our code.</span>
            </div>
          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 bg-gradient-to-b from-[#0b101e] via-[#0d162a] to-[#0b101e] p-6 sm:p-8 rounded-2xl border border-cyan-400/50 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
              <Calculator className="w-4 h-4" />
              <span>Calculated Price Summary</span>
            </div>

            <div className="border-b border-cyan-500/20 pb-5 mb-5">
              <div className="text-xs text-slate-400 mb-1 font-mono">Total Estimated Investment</div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 font-mono tabular-nums">
                  PKR {totalPKR.toLocaleString()}
                </div>
                <div className="text-lg font-bold text-slate-300 font-mono">
                  ≈ ${totalUSD} USD
                </div>
              </div>
              <div className="text-xs text-emerald-400 mt-3 flex items-center gap-2 font-mono font-bold bg-emerald-950/60 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span>Guaranteed Turnaround: 1 - 2 Days</span>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="space-y-2 mb-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Responsive Coder Grade React/Node Code</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>95+ Google PageSpeed &amp; SEO Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp Hotline with Senior Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Delivered Within 24 - 48 Hours</span>
              </div>
            </div>

            {/* Conversion CTA buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Order on WhatsApp (Preferred)</span>
              </button>

              <a
                href={`tel:${AGENCY_CONFIG.phone}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Directly: {AGENCY_CONFIG.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full py-2 px-4 rounded-xl text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Or Fill In Online Form &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
