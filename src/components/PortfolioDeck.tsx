import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
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
  Smartphone,
  Flame,
  Zap,
  Activity,
  Presentation,
  Compass,
  Wand2,
} from 'lucide-react';

interface PortfolioDeckProps {
  onOrderProject: (projectTitle: string) => void;
}

type MorphMode = 'fluid' | 'origami' | 'cyber';
type DeviceView = 'desktop' | 'mobile' | 'code';

// Dynamic organic SVG morph paths for real fluid morphing animation
const MORPH_PATHS = [
  'M45.5,-78.9C58.3,-71.4,67.8,-57.8,75.4,-43.5C83,-29.2,88.7,-14.6,88.1,-0.3C87.6,13.9,80.7,27.8,72.6,41.2C64.4,54.6,55,67.6,42.4,75.1C29.8,82.7,14.9,84.9,0.3,84.4C-14.3,83.9,-28.6,80.8,-42.1,73.8C-55.6,66.8,-68.3,55.9,-76.3,42.1C-84.3,28.3,-87.6,11.7,-86.3,-4.7C-85.1,-21.2,-79.3,-37.5,-69.5,-50.2C-59.7,-62.9,-46,-72,-31.8,-78.8C-17.7,-85.6,-3,-90.1,11,-88.3C25,-86.5,32.7,-86.4,45.5,-78.9Z',
  'M48.2,-80.7C61.4,-73.4,70.5,-59.1,77.5,-44.2C84.5,-29.3,89.5,-14.7,87.9,-0.9C86.3,12.8,78.2,25.6,70.6,38.6C63,51.6,56,64.8,44.7,73.8C33.4,82.8,17.7,87.6,1.4,85.2C-14.9,82.8,-29.8,73.2,-43.3,64C-56.8,54.8,-68.9,46,-76.5,33.5C-84.1,21,-87.2,4.8,-84.9,-10.8C-82.6,-26.4,-74.9,-41.4,-64,-52.8C-53.1,-64.2,-39,-72,-24.8,-78.7C-10.6,-85.4,3.7,-91.1,18.7,-89.3C33.7,-87.5,35,-88,48.2,-80.7Z',
  'M41.8,-72.6C53.7,-64.9,62.6,-51.7,70.1,-37.8C77.6,-23.9,83.7,-9.3,83.3,5.1C82.8,19.5,75.8,33.7,66.7,46.1C57.6,58.5,46.4,69.1,33.1,75.4C19.8,81.7,4.4,83.7,-10.6,81.8C-25.6,79.9,-40.2,74.1,-52.4,65.2C-64.6,56.3,-74.4,44.3,-80.9,30.3C-87.4,16.3,-90.6,0.3,-87.9,-14.8C-85.2,-29.9,-76.6,-44.1,-65,-53.4C-53.4,-62.7,-38.8,-67.1,-24.9,-73.9C-11,-80.7,2.2,-89.9,16.4,-88.9C30.6,-87.9,29.9,-80.3,41.8,-72.6Z',
];

export const PortfolioDeck: React.FC<PortfolioDeckProps> = ({ onOrderProject }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'architecture' | 'code'>('overview');
  const [morphMode, setMorphMode] = useState<MorphMode>('fluid');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [progress, setProgress] = useState(0);
  const autoPlayDuration = 6500; // 6.5 seconds per slide

  // 3D Mouse Parallax Tilt
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentSlide = PORTFOLIO_PPT_DECKS[currentSlideIndex];

  // Mouse Parallax handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * -10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Keyboard Escape listener to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

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

  // Morph Animation Transition Profiles
  const getMorphAnimationProps = () => {
    switch (morphMode) {
      case 'origami':
        return {
          initial: { opacity: 0, rotateY: 35, scale: 0.92, z: -120 },
          animate: { opacity: 1, rotateY: 0, scale: 1, z: 0 },
          exit: { opacity: 0, rotateY: -35, scale: 0.92, z: -120 },
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };
      case 'cyber':
        return {
          initial: { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, scale: 1.08, filter: 'blur(8px)' },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };
      case 'fluid':
      default:
        return {
          initial: { opacity: 0, scale: 0.96, y: 15 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 1.04, y: -15 },
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };
    }
  };

  return (
    <section
      id="portfolio-deck"
      className="py-20 sm:py-24 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/50 dark:from-[#070b16] dark:via-[#090e1c] dark:to-[#070b16] border-y border-sky-200 dark:border-cyan-500/20 relative overflow-hidden transition-colors w-full max-w-full"
    >
      {/* Dynamic ambient lighting accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-sky-400/10 dark:bg-cyan-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-emerald-400/10 dark:bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-sky-800 dark:text-cyan-300 mb-3 bg-sky-100 dark:bg-cyan-950/90 border border-sky-300 dark:border-cyan-400/50 px-3.5 py-1.5 rounded-xl shadow-xs">
              <Presentation className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>02. REAL-TIME MORPHING PORTFOLIO PPT DECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Interactive Case Studies with{' '}
              <span className="coder-gradient-text">Fluid Morph Animations</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              Watch each project seamlessly transform with smooth layout morphs, verifiable hospital and school metrics, and live code architecture.
            </p>
          </div>

          {/* Morph Animation Control Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white dark:bg-[#0c1324] p-2 rounded-2xl border-2 border-slate-200 dark:border-cyan-500/30 shadow-lg backdrop-blur-xl">
            {/* Morph Style Selector */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#070b16] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setMorphMode('fluid')}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  morphMode === 'fluid'
                    ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Fluid Liquid Morph Animation"
              >
                Fluid Morph
              </button>
              <button
                onClick={() => setMorphMode('origami')}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  morphMode === 'origami'
                    ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="3D Origami Page Flip"
              >
                3D Fold
              </button>
              <button
                onClick={() => setMorphMode('cyber')}
                className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  morphMode === 'cyber'
                    ? 'bg-sky-600 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Cyber Quantum Warp"
              >
                Cyber Warp
              </button>
            </div>

            {/* Auto Play / Pause button */}
            <button
              onClick={togglePlay}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700'
              }`}
              title={isPlaying ? 'Pause Auto-Morph' : 'Resume Auto-Morph'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden sm:inline">Auto-Morphing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-slate-700" />
                  <span className="hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer active:scale-95 border border-slate-300 dark:border-slate-700"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer active:scale-95 border border-slate-300 dark:border-slate-700"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide counter */}
            <div className="text-xs font-mono font-black text-sky-800 dark:text-cyan-300 px-2.5 py-1 bg-sky-50 dark:bg-cyan-950/80 rounded-lg border border-sky-200 dark:border-cyan-500/40 tabular-nums">
              {currentSlideIndex + 1} / {PORTFOLIO_PPT_DECKS.length}
            </div>
          </div>
        </div>

        {/* MAIN PPT PRESENTATION STAGE FRAME */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: '1400px',
          }}
          className={`relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-cyan-400/50 bg-white dark:bg-[#0b101e] shadow-2xl transition-all duration-500 ${
            isFullscreen
              ? 'fixed inset-0 z-[9999] m-0 rounded-none bg-slate-950/98 backdrop-blur-3xl p-4 sm:p-8 flex flex-col justify-between overflow-y-auto'
              : ''
          }`}
        >
          {/* Top Stage Bar */}
          <div className="px-6 py-3.5 bg-slate-50 dark:bg-[#070b16] border-b border-slate-200 dark:border-cyan-400/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm" />
              </div>

              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hidden sm:flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-cyan-400" />
                <span>WebGhostCoder_Architecture_PPT_{currentSlide.slideNumber}.ts</span>
              </span>
            </div>

            {/* Controls: Device form factor morph toggle + Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Device Viewport Morph Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800">
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    deviceView === 'desktop'
                      ? 'bg-white dark:bg-cyan-500 text-slate-950 shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Desktop Layout Preview"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    deviceView === 'mobile'
                      ? 'bg-white dark:bg-cyan-500 text-slate-950 shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Mobile Responsive Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              <span className="text-xs font-mono font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-400/50 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{currentSlide.turnaround}</span>
              </span>

              {/* Fullscreen Button with Escape notice */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold font-mono"
                title={isFullscreen ? 'Exit Stage View (Esc)' : 'Expand to Fullscreen View'}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4 text-rose-500" />
                    <span>Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                    <span className="hidden sm:inline">Stage View</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Morph Countdown Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 h-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* STAGE CANVAS: Real Fluid Morphing Layout */}
          <div className="p-6 sm:p-10 lg:p-12 relative min-h-[500px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                {...getMorphAnimationProps()}
                style={{
                  rotateX: springY,
                  rotateY: springX,
                  transformStyle: 'preserve-3d',
                }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
              >
                {/* Left Column: Slide Narrative, Tab Breakdown, Metrics (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category and Client Badges */}
                  <div>
                    <div className="text-xs font-mono font-bold text-sky-800 dark:text-cyan-300 uppercase tracking-widest mb-2 flex items-center gap-2 flex-wrap">
                      <motion.span
                        layoutId="ppt-category-pill"
                        className="px-3 py-1 rounded-lg bg-sky-100 dark:bg-cyan-950/80 border border-sky-300 dark:border-cyan-400/40 text-sky-900 dark:text-cyan-300 font-bold"
                      >
                        {currentSlide.categoryLabel}
                      </motion.span>
                      <span className="text-slate-400 dark:text-slate-600">·</span>
                      <span className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-300 dark:border-emerald-400/40">
                        Client: {currentSlide.client}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {currentSlide.title}
                    </h3>

                    <p className="text-base sm:text-lg font-semibold text-sky-800 dark:text-cyan-300 mt-2">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Morphable Tabs: Overview / Challenge / Architecture */}
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                    {[
                      { id: 'overview', label: 'Bento Overview' },
                      { id: 'challenge', label: 'Problem vs Fix' },
                      { id: 'architecture', label: 'Stack & Delivery' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                          activeTab === tab.id
                            ? 'text-white dark:text-slate-950'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTabPill"
                            className="absolute inset-0 bg-sky-600 dark:bg-cyan-400 rounded-xl -z-10 shadow-sm"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Tab Panels */}
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div className="p-4 bg-rose-50/70 dark:bg-[#0c1424] rounded-2xl border border-rose-200 dark:border-rose-500/30">
                        <div className="text-xs font-mono font-black uppercase text-rose-700 dark:text-rose-400 mb-1.5 flex items-center gap-1.5">
                          <Flame className="w-4 h-4" />
                          <span>The Challenge</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {currentSlide.problemStatement}
                        </p>
                      </div>

                      <div className="p-4 bg-emerald-50/70 dark:bg-[#0c1424] rounded-2xl border border-emerald-200 dark:border-emerald-500/40">
                        <div className="text-xs font-mono font-black uppercase text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" />
                          <span>Coder Solution</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {currentSlide.architectureSolution}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'challenge' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-slate-50 dark:bg-[#0c1424] rounded-2xl border border-slate-200 dark:border-cyan-500/30 space-y-3"
                    >
                      <div>
                        <span className="text-xs font-mono font-black uppercase text-rose-700 dark:text-rose-400">
                          Bottleneck:
                        </span>
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                          {currentSlide.problemStatement}
                        </p>
                      </div>
                      <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-mono font-black uppercase text-emerald-800 dark:text-emerald-400">
                          Engineering Solution:
                        </span>
                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mt-0.5">
                          {currentSlide.architectureSolution}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'architecture' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-slate-50 dark:bg-[#0c1424] rounded-2xl border border-slate-200 dark:border-cyan-500/30 space-y-3 text-xs sm:text-sm font-mono"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Turnaround Speed:</span>
                        <span className="text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-500/40">
                          {currentSlide.turnaround}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Engineering Lead:</span>
                        <span className="text-sky-800 dark:text-cyan-300 font-bold">
                          {AGENCY_CONFIG.ownerName} (CEO)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Ordering Hours:</span>
                        <span className="text-amber-800 dark:text-amber-300 font-bold">4:00 PM – 8:00 PM PKT</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Key Highlights Checklist */}
                  <div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Engineered Deliverables:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentSlide.keyHighlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#0c1424] p-2.5 rounded-xl border border-slate-200 dark:border-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight font-medium">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Morphing Verified Metrics Banner */}
                  <motion.div
                    layoutId="slide-result-pill"
                    className="p-4 sm:p-5 bg-gradient-to-r from-emerald-100 via-sky-50 to-emerald-100 dark:from-emerald-950 dark:via-[#0c172a] dark:to-cyan-950 rounded-2xl border-2 border-emerald-300 dark:border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div>
                      <div className="text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                        <span>Verified Client Result:</span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-emerald-950 dark:text-emerald-200 font-mono mt-0.5">
                        {currentSlide.metricsHighlight}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${AGENCY_CONFIG.whatsapp}?text=Hello%20Web%20Ghost%20Coder%20Agency!%20I%20am%20reviewing%20Slide%20${currentSlide.slideNumber}%20(${encodeURIComponent(currentSlide.title)})%20and%20want%20to%20order%20a%20similar%20website%20in%201-2%20days.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-95 cursor-pointer shrink-0"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Order Similar on WhatsApp</span>
                    </a>
                  </motion.div>
                </div>

                {/* Right Column: Device Frame with Layout Morphing between Desktop & Mobile */}
                <div className="lg:col-span-5 flex justify-center relative">
                  {/* Fluid Morphing SVG Liquid Aura in Background */}
                  <svg className="absolute -inset-10 w-[125%] h-[125%] pointer-events-none opacity-30 dark:opacity-40 -z-10" viewBox="-100 -100 200 200">
                    <defs>
                      <linearGradient id="morph-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f5d4" />
                        <stop offset="50%" stopColor="#00b4d8" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={MORPH_PATHS[currentSlideIndex % MORPH_PATHS.length]}
                      animate={{ d: MORPH_PATHS }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                      fill="url(#morph-glow)"
                    />
                  </svg>

                  {/* Morphable Device Mockup Stage */}
                  <motion.div
                    layoutId="slide-device-frame"
                    className={`relative rounded-3xl overflow-hidden border-3 border-slate-300 dark:border-cyan-400/60 bg-slate-900 shadow-2xl transition-all duration-500 group ${
                      deviceView === 'mobile'
                        ? 'w-[280px] aspect-[9/18] rounded-[36px] border-4'
                        : 'w-full aspect-[4/3] rounded-3xl'
                    }`}
                  >
                    {/* Device Top Bar */}
                    <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="truncate max-w-[140px] text-cyan-300 font-bold">
                        {currentSlide.categoryLabel}
                      </span>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative w-full h-[calc(100%-36px)] overflow-hidden">
                      <motion.img
                        key={currentSlide.image}
                        initial={{ scale: 1.08, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        src={currentSlide.image}
                        alt={currentSlide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                      {/* Tech Stack Overlay Chips */}
                      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5">
                        {currentSlide.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono font-bold text-sky-200 bg-slate-950/90 border border-sky-400/40 px-2 py-0.5 rounded-md shadow-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Floating Morph Badge */}
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[11px] font-mono font-extrabold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-white" />
                        <span>1 - 2 Days Delivery</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Deck Bottom Thumbnails & Navigation Strip */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#070b16] border-t border-slate-200 dark:border-cyan-400/30">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {/* Slide Thumbnail Tabs with Morph Indicator */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
                {PORTFOLIO_PPT_DECKS.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative px-3.5 py-2 rounded-xl text-left font-mono transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                      currentSlideIndex === idx
                        ? 'text-white font-black shadow-md'
                        : 'bg-white dark:bg-[#0c1324] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    {currentSlideIndex === idx && (
                      <motion.div
                        layoutId="activeSlideThumbnail"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="text-xs font-bold">Slide {slide.slideNumber}</span>
                    <span className="text-xs opacity-90 hidden md:inline truncate max-w-[140px]">
                      {slide.categoryLabel}
                    </span>
                  </button>
                ))}
              </div>

              {/* Ordering Window Notice */}
              <div className="text-xs text-slate-700 dark:text-slate-300 hidden sm:flex items-center gap-3 bg-white dark:bg-[#0c1324] px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-cyan-400/30">
                <span>Ordering Time: <strong className="text-emerald-700 dark:text-emerald-300">4:00 PM – 8:00 PM PKT</strong></span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-sky-700 dark:text-cyan-300 font-mono font-bold">Your choice is our code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
