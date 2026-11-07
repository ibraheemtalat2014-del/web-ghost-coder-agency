import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_PPT_DECKS, AGENCY_CONFIG } from '../data/agencyData';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Layers,
  Terminal,
  Clock,
  ArrowRight,
  Code2,
  Cpu,
  Monitor,
  Flame,
  Zap,
  Activity,
  Presentation,
} from 'lucide-react';

interface PortfolioDeckProps {
  onOrderProject: (projectTitle: string) => void;
}

export const PortfolioDeck: React.FC<PortfolioDeckProps> = ({ onOrderProject }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'architecture' | 'code'>('overview');
  const [progress, setProgress] = useState(0);
  const autoPlayDuration = 6500; // 6.5 seconds per slide

  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentSlide = PORTFOLIO_PPT_DECKS[currentSlideIndex];

  // Auto-play timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      setProgress(0);
      return;
    }

    const intervalStep = 50;
    const increment = (intervalStep / autoPlayDuration) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    timerRef.current = window.setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % PORTFOLIO_PPT_DECKS.length);
      setProgress(0);
    }, autoPlayDuration);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, isPlaying]);

  const handlePrev = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev - 1 + PORTFOLIO_PPT_DECKS.length) % PORTFOLIO_PPT_DECKS.length);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentSlideIndex((prev) => (prev + 1) % PORTFOLIO_PPT_DECKS.length);
  };

  const handleSelectSlide = (idx: number) => {
    setProgress(0);
    setCurrentSlideIndex(idx);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="portfolio-deck" className="py-24 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/50 dark:from-[#0b1329] dark:via-[#0f172a] dark:to-[#0b1329] border-y border-sky-200 dark:border-cyan-400/30 relative overflow-hidden transition-colors">
      {/* Dynamic colorful ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[750px] h-[450px] bg-sky-400/10 dark:bg-cyan-500/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-emerald-400/10 dark:bg-emerald-500/18 blur-[160px] pointer-events-none rounded-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#38bdf810_1px,transparent_1px),linear-gradient(to_bottom,#38bdf810_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-black tracking-wider uppercase text-sky-800 dark:text-cyan-300 mb-3 bg-sky-100 dark:bg-cyan-950/90 border border-sky-300 dark:border-cyan-400/50 px-3.5 py-1.5 rounded-xl shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400 animate-ping inline-block" />
              <Presentation className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
              <span>// REAL-TIME MORPHING PORTFOLIO PITCH DECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Interactive Case Studies with{' '}
              <span className="coder-gradient-text">
                Fluid Morph Animations
              </span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-200 max-w-2xl font-medium">
              Watch each project seamlessly transform with smooth layout morphs, real performance statistics, and verifiable client deliverables.
            </p>
          </div>

          {/* Presentation Master Controls Toolbar */}
          <div className="flex items-center gap-3 bg-white dark:bg-[#0f1d38]/95 p-2.5 rounded-2xl border-2 border-sky-200 dark:border-cyan-400/40 shadow-xl shadow-sky-900/5 dark:shadow-cyan-950/60 backdrop-blur-xl">
            {/* Auto Play / Pause button */}
            <button
              onClick={togglePlay}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700'
              }`}
              title={isPlaying ? 'Pause Animated Slide Presentation' : 'Resume Automated Presentation'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Auto-Morphing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-700" />
                  <span>Paused</span>
                </>
              )}
            </button>

            {/* Manual Prev / Next controls */}
            <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-700 pl-3">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-cyan-950 text-slate-700 dark:text-cyan-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-cyan-500/30 transition-all cursor-pointer active:scale-95"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-cyan-950 text-slate-700 dark:text-cyan-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-cyan-500/30 transition-all cursor-pointer active:scale-95"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide counter */}
            <div className="text-xs font-mono font-black text-sky-800 dark:text-cyan-300 px-3 py-1 bg-sky-50 dark:bg-cyan-950/80 rounded-lg border border-sky-200 dark:border-cyan-500/40 tabular-nums">
              {currentSlideIndex + 1} / {PORTFOLIO_PPT_DECKS.length}
            </div>
          </div>
        </div>

        {/* MAIN PPT PRESENTATION STAGE FRAME */}
        <div
          className={`relative rounded-3xl overflow-hidden border-2 border-sky-300 dark:border-cyan-400/50 bg-white dark:bg-[#0f1d38]/95 shadow-2xl shadow-sky-900/10 dark:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.35)] backdrop-blur-2xl transition-all duration-500 ${
            isFullscreen ? 'fixed inset-4 z-50 my-0 bg-white dark:bg-[#0b1329] flex flex-col justify-between' : ''
          }`}
        >
          {/* Slide Top HUD Bar */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#0a1428] border-b border-slate-200 dark:border-cyan-400/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm" />
              </div>

              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 ml-2 hidden sm:flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span>WebGhostCoder_Portfolio_LiveDeck_v2.5.key</span>
              </span>
            </div>

            {/* Quick interactive view modes */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs font-mono font-extrabold text-sky-800 dark:text-cyan-300 bg-sky-100 dark:bg-cyan-950/90 px-3 py-1 rounded-lg border border-sky-200 dark:border-cyan-400/50">
                SLIDE_{currentSlide.slideNumber}
              </span>
              <span className="text-xs font-mono font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-400/50 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{currentSlide.turnaround}</span>
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Stage View' : 'Full Stage View'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Morph Animation Progress Bar (indicates auto-play countdown) */}
          <div className="w-full bg-slate-200 dark:bg-slate-900/90 h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 h-full transition-all duration-75 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* SLIDE CONTENT CANVAS WITH FLUID MORPH ANIMATIONS (AnimatePresence + Motion) */}
          <div className="p-6 sm:p-10 lg:p-12 relative min-h-[520px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Slide Narrative, Architecture & Results (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category & Client Badge */}
                  <div>
                    <div className="text-xs font-mono font-black text-sky-800 dark:text-cyan-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-400/40 text-sky-900 dark:text-cyan-300">
                        {currentSlide.categoryLabel}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">·</span>
                      <span className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-400/40">
                        Client: {currentSlide.client}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {currentSlide.title}
                    </h3>

                    <p className="text-sm sm:text-base font-semibold text-sky-800 dark:text-cyan-200 mt-2">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Morphable Tabs: Overview / Challenge & Solution / Architecture Details */}
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/60 pb-2">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'overview'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60'
                      }`}
                    >
                      Bento Breakdown
                    </button>
                    <button
                      onClick={() => setActiveTab('challenge')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'challenge'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60'
                      }`}
                    >
                      Problem vs Coder Fix
                    </button>
                    <button
                      onClick={() => setActiveTab('architecture')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeTab === 'architecture'
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60'
                      }`}
                    >
                      Stack &amp; Delivery
                    </button>
                  </div>

                  {/* Interactive Dynamic Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-rose-50/60 dark:bg-[#0a1428] rounded-2xl border border-rose-200 dark:border-rose-500/30 hover:border-rose-400 transition-colors">
                        <div className="text-xs font-mono font-black uppercase text-rose-700 dark:text-rose-400 mb-1.5 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" />
                          <span>The Challenge</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          {currentSlide.problemStatement}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50/60 dark:bg-[#0a1428] rounded-2xl border border-emerald-200 dark:border-emerald-500/40 hover:border-emerald-400 transition-colors">
                        <div className="text-xs font-mono font-black uppercase text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          <span>Coder Solution</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          {currentSlide.architectureSolution}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'challenge' && (
                    <div className="p-5 bg-slate-50 dark:bg-[#0a1428] rounded-2xl border border-sky-200 dark:border-cyan-400/40 space-y-3">
                      <div>
                        <span className="text-[11px] font-mono font-black uppercase text-rose-700 dark:text-rose-400">Bottleneck:</span>
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-medium mt-0.5">{currentSlide.problemStatement}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                        <span className="text-[11px] font-mono font-black uppercase text-emerald-800 dark:text-emerald-400">Engineering Solution:</span>
                        <p className="text-sm text-slate-800 dark:text-slate-100 font-medium mt-0.5">{currentSlide.architectureSolution}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'architecture' && (
                    <div className="p-5 bg-slate-50 dark:bg-[#0a1428] rounded-2xl border border-sky-200 dark:border-cyan-400/40 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-600 dark:text-slate-300 font-semibold">Turnaround Speed:</span>
                        <span className="text-emerald-800 dark:text-emerald-300 font-extrabold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/40">
                          {currentSlide.turnaround}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-600 dark:text-slate-300 font-semibold">Engineering Lead:</span>
                        <span className="text-sky-800 dark:text-cyan-300 font-bold">{AGENCY_CONFIG.ownerName} (CEO)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-600 dark:text-slate-300 font-semibold">Ordering Window:</span>
                        <span className="text-amber-800 dark:text-amber-300 font-bold">4:00 PM – 8:00 PM PKT</span>
                      </div>
                    </div>
                  )}

                  {/* Key Engineered Capabilities Checklist */}
                  <div>
                    <div className="text-xs font-mono font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Engineered Deliverables:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentSlide.keyHighlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-[#0a1428]/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight font-medium">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Metrics Banner with WhatsApp direct ordering */}
                  <div className="p-4 bg-gradient-to-r from-emerald-100 via-sky-50 to-emerald-100 dark:from-emerald-950 dark:via-[#0f2442] dark:to-cyan-950 rounded-2xl border-2 border-emerald-300 dark:border-emerald-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm dark:shadow-xl">
                    <div>
                      <div className="text-xs font-mono text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                        <span>Verified Client Result:</span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-300 dark:to-cyan-200 font-mono mt-0.5">
                        {currentSlide.metricsHighlight}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20am%20reviewing%20Slide%20${currentSlide.slideNumber}%20(${encodeURIComponent(currentSlide.title)})%20and%20want%20to%20order%20a%20similar%20website%20in%201-2%20days.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-95 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Order Similar on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: High-Impact Device Visual Mockup (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden border-2 border-sky-300 dark:border-cyan-400/50 bg-slate-900 shadow-2xl shadow-sky-900/10 dark:shadow-cyan-500/20 group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                      {/* Tech Stack Overlay Chips */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                        {currentSlide.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono font-bold text-sky-200 bg-slate-950/90 border border-sky-400/40 px-2.5 py-1 rounded-lg shadow-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Floating Morph Badge */}
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-mono font-black px-3 py-1 rounded-lg shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 fill-white" />
                        <span>1 - 2 Days Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Deck Bottom Thumbnails & Fast Navigation Strip */}
          <div className="px-6 py-5 bg-slate-50 dark:bg-[#0a1428] border-t border-slate-200 dark:border-cyan-400/30">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Slide Thumbnail Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                {PORTFOLIO_PPT_DECKS.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`px-3.5 py-2.5 rounded-xl text-left font-mono transition-all cursor-pointer flex items-center gap-2.5 shrink-0 ${
                      currentSlideIndex === idx
                        ? 'bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-black shadow-md scale-105'
                        : 'bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700/80 hover:border-sky-400 dark:hover:border-cyan-400/40'
                    }`}
                  >
                    <span className="text-xs">Slide {slide.slideNumber}</span>
                    <span className="text-xs opacity-90 hidden md:inline truncate max-w-[150px] font-bold">
                      {slide.categoryLabel}
                    </span>
                  </button>
                ))}
              </div>

              {/* Direct Ordering Time Notice & Slogan */}
              <div className="text-xs text-slate-700 dark:text-slate-300 hidden sm:flex items-center gap-3 bg-white dark:bg-[#0f1d38] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-cyan-400/30 shadow-xs">
                <span>Ordering Time: <strong className="text-emerald-700 dark:text-emerald-300">4:00 PM – 8:00 PM PKT</strong></span>
                <span className="text-slate-300 dark:text-slate-500">|</span>
                <span className="text-sky-700 dark:text-cyan-300 font-mono font-bold">Your choice is our code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
