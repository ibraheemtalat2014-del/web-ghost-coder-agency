import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import {
  Terminal,
  Zap,
  Code2,
  Sparkles,
  ChevronRight,
  Volume2,
  VolumeX,
  FastForward,
  Cpu,
  Layers,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Activity,
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';
import { cyberAudio } from '../utils/cyberAudio';

interface CinematicIntroProps {
  onComplete: () => void;
}

const STAGES = [
  { id: 'matrix', label: 'INITIALIZING_CORE', time: '0.0s - 2.5s' },
  { id: 'assembling', label: 'COMPILING_SPECS', time: '2.5s - 5.5s' },
  { id: 'window', label: 'SYNTHESIZING_3D_MESH', time: '5.5s - 8.0s' },
  { id: 'zooming', label: 'HYDRATING_HOMEPAGE', time: '8.0s - 9.5s' },
];

const CODE_STREAM = [
  'const agency = new WebGhostCoderAgency({ ceo: "Ibraheem Talat" });',
  'await agency.compileClientVision({ turnaround: "1 - 2 Days", quality: "Extraordinary" });',
  'const architecture = new FullStackEngine({ react: true, node: true, tailwind: true });',
  'architecture.deployHospitalSystems({ triage: true, doctorRoster: true });',
  'architecture.deploySchoolAdmissions({ portal: true, documents: true });',
  'architecture.deployGoogleAdsLanding({ pageSpeed: "98/100", highConversion: true });',
  'agency.bindHotline({ phone: "03009464514", hours: "4:00 PM – 8:00 PM PKT" });',
  '// "Your choice is our code." Materializing 3D interactive website window...',
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 4-Stage State Machine across 9.2 seconds total
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // 3D Mouse Parallax & Tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 120 };
  const tiltX = useSpring(mouseY, springConfig);
  const tiltY = useSpring(mouseX, springConfig);

  const animationFrameRef = useRef<number | null>(null);

  // Toggle Mute
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    cyberAudio.setMuted(next);
  };

  // Mouse Move Parallax Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24); // +/- 12 degrees tilt
    mouseY.set(y * -20);
    setIsInteracting(true);
  };

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
    }
  }, [onComplete]);

  // Canvas Neon Cyberpunk Particles & Laser Grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for laser mesh
    const particleCount = Math.min(100, Math.floor(width / 16));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const neonColors = ['#00f5d4', '#00b4d8', '#a855f7', '#7c3aed', '#10b981'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        size: Math.random() * 2.5 + 1.2,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    // Binary code stream columns
    const columns = Math.floor(width / 28);
    const drops = Array.from({ length: columns }, () => Math.random() * -60);
    const chars = '01<>/{}[]=async=>*#$;:_~WGC12';

    const render = () => {
      ctx.fillStyle = 'rgba(3, 6, 13, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Draw faint cyber matrix code rain
      ctx.font = '11px "Fira Code", monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 28;
        const y = drops[i] * 19;

        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 245, 212, 0.35)' : 'rgba(168, 85, 247, 0.35)';
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.95;
      }

      // Draw glowing cyber constellation particles & laser lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with glowing laser lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, p2.color);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (1 - dist / 125) * 0.45;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 8.5s - 9.2s Precision Timeline Sequence
  useEffect(() => {
    // Stage 1 Typing Lines with Audio Beeps
    const timers: NodeJS.Timeout[] = [];

    CODE_STREAM.forEach((line, index) => {
      const delay = 250 + index * 320;
      timers.push(
        setTimeout(() => {
          setTypedLines((prev) => [...prev, line]);
          cyberAudio.playTypingBeep((index % 4) * 80);
        }, delay)
      );
    });

    // Stage 2: Assembling 3D Wireframe Window (at 2.6s)
    timers.push(
      setTimeout(() => {
        setCurrentStageIndex(1);
        cyberAudio.playLaserHum();
      }, 2600)
    );

    // Stage 3: Full Production Window Materialized (at 5.4s)
    timers.push(
      setTimeout(() => {
        setCurrentStageIndex(2);
        cyberAudio.playWindowLock();
      }, 5400)
    );

    // Stage 4: Hyperspeed Camera Zoom (at 8.0s)
    timers.push(
      setTimeout(() => {
        setCurrentStageIndex(3);
        cyberAudio.playZoomWarp();
      }, 8000)
    );

    // Stage 5: Final completion (at 9.2s)
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 9200)
    );

    // Percent counter across 9 seconds
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 90);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      clearInterval(interval);
    };
  }, [onComplete]);

  const activeStage = STAGES[currentStageIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={currentStageIndex === 3 ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#03060d] flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Background Canvas Particles and Matrix Code Streams */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Futuristic Cyber Lighting Auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-cyan-500/25 via-indigo-600/30 to-purple-600/25 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP CONTROL BAR: Branding, Stage Breadcrumbs, Audio Toggle & Skip */}
      <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center justify-between gap-4 z-50">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-300 to-purple-500 flex items-center justify-center text-slate-950 font-mono font-black text-xs shadow-lg shadow-cyan-500/40">
            &lt;/&gt;
          </div>
          <div>
            <div className="text-xs font-mono font-black text-white tracking-wider flex items-center gap-2">
              <span>WEB GHOST CODER</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-400/50">
                PROD_2026
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Architect: CEO Ibraheem Talat
            </div>
          </div>
        </div>

        {/* Step-by-Step Compilation Stage Tracker */}
        <div className="hidden lg:flex items-center gap-2 bg-[#090e1c]/90 px-4 py-2 rounded-2xl border border-cyan-500/30 shadow-xl backdrop-blur-md">
          {STAGES.map((stg, i) => (
            <div key={stg.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                  currentStageIndex === i
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-black shadow-md'
                    : currentStageIndex > i
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-slate-500'
                }`}
              >
                {currentStageIndex > i ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
                <span>{stg.label}</span>
              </div>
              {i < STAGES.length - 1 && <span className="text-slate-700 font-mono">/</span>}
            </div>
          ))}
        </div>

        {/* Actions: Sound Toggle + Skip Intro */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleMute}
            className={`p-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-md ${
              isMuted
                ? 'bg-slate-900/80 text-slate-400 border-slate-700'
                : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900'
            }`}
            title={isMuted ? 'Unmute Futuristic Cyber Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>

          <button
            onClick={onComplete}
            className="group px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-400/60 font-mono text-xs font-bold transition-all shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* MAIN CINEMATIC 3D PERSPECTIVE STAGE */}
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl px-4 sm:px-8 py-4 z-30"
        style={{ perspective: '1800px' }}
      >
        <AnimatePresence mode="wait">
          {/* STAGE 1: Glowing Matrix Terminal & Real-Time Code Stream (0.0s - 2.5s) */}
          {currentStageIndex === 0 && (
            <motion.div
              key="terminal-stage"
              initial={{ opacity: 0, scale: 0.88, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -25, rotateX: 18 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full max-w-3xl mx-auto rounded-3xl bg-[#090f1e]/90 border-2 border-cyan-400/50 p-6 sm:p-8 shadow-[0_0_70px_-10px_rgba(0,245,212,0.35)] backdrop-blur-2xl"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-cyan-500/25 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span className="text-xs font-mono text-cyan-300 ml-2 font-bold">
                    WebGhostCoder_Compiler_Engine.ts
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 animate-pulse font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>COMPILING_SPECS</span>
                </div>
              </div>

              {/* Typed code lines with syntax styling */}
              <div className="space-y-2 font-mono text-xs sm:text-sm text-cyan-200/90 min-h-[200px]">
                {typedLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-purple-400 select-none font-bold mt-0.5">&gt;</span>
                    <span className={idx === typedLines.length - 1 ? 'text-white font-bold bg-cyan-950/60 px-1 rounded' : 'text-slate-300'}>
                      {line}
                    </span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 select-none font-bold">&gt;</span>
                  <span className="w-2.5 h-4 bg-cyan-400 animate-pulse inline-block" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synthesizing 3D Architectural Window from code...</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-36 bg-slate-900 rounded-full h-2 overflow-hidden border border-cyan-500/30">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 h-full"
                      animate={{ width: `${percent}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{percent}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: 3D Wireframe Window Assembling with Interactive Mouse Tilt (2.5s - 5.5s) */}
          {currentStageIndex === 1 && (
            <motion.div
              key="assembling-stage"
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, rotateX: 30, rotateY: -18, scale: 0.72, z: -250 }}
              animate={{ opacity: 1, scale: 0.96, z: 0 }}
              exit={{ opacity: 1, scale: 1, z: 80 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] rounded-3xl bg-[#070b16]/95 border-2 border-cyan-400/70 shadow-[0_0_90px_15px_rgba(0,245,212,0.4)] backdrop-blur-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Window Titlebar */}
              <div className="flex items-center justify-between border-b border-cyan-400/30 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm" />
                  <span className="text-xs font-mono text-cyan-300 ml-2 font-bold hidden sm:inline">
                    https://webghostcoder.agency // 3D Wireframe Formation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-purple-300 font-bold bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/40 animate-pulse">
                    3D_TILT_ENABLED (Move Mouse)
                  </span>
                </div>
              </div>

              {/* Wireframe Holographic Grid Lines */}
              <div className="flex-1 my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  {/* Wireframe Hero text skeleton */}
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 0.8 }}
                    className="h-9 rounded-xl bg-gradient-to-r from-cyan-400/60 via-purple-500/50 to-cyan-400/40 border border-cyan-400/50 shadow-lg"
                  />
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="h-9 rounded-xl bg-gradient-to-r from-purple-500/50 to-emerald-400/50 border border-purple-400/50 shadow-lg"
                  />
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-4 rounded bg-slate-700/60"
                  />
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-4 rounded bg-slate-700/40"
                  />

                  {/* Wireframe CTA Buttons */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-40 h-11 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-90 animate-pulse flex items-center justify-center font-mono text-xs font-black text-slate-950">
                      Get Free Quote
                    </div>
                    <div className="w-40 h-11 rounded-xl border border-cyan-400/50 bg-slate-900/60 flex items-center justify-center font-mono text-xs font-bold text-cyan-300">
                      Explore Services
                    </div>
                  </div>
                </div>

                {/* Wireframe Right Column: 3D Holographic Cube */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="relative w-48 h-48 rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-transparent flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                    <motion.div
                      animate={{ rotateY: 360, rotateX: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="w-28 h-28 rounded-2xl border-2 border-purple-400/80 border-dashed flex flex-col items-center justify-center text-cyan-300 font-mono font-bold text-xs"
                    >
                      <Code2 className="w-6 h-6 text-emerald-400 mb-1" />
                      <span>&lt;1-2 DAYS&gt;</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Wireframe Bottom Specs */}
              <div className="border-t border-cyan-400/30 pt-3 flex flex-wrap items-center justify-between text-xs font-mono text-cyan-300 gap-2">
                <span>⚡ Delivery: 1 - 2 Days</span>
                <span>👤 CEO: Ibraheem Talat</span>
                <span>💬 WhatsApp: 03009464514</span>
              </div>
            </motion.div>
          )}

          {/* STAGE 3 & 4: Full 3D Window Materialization & Camera Zoom (5.5s - 9.2s) */}
          {(currentStageIndex === 2 || currentStageIndex === 3) && (
            <motion.div
              key="window-zoom-stage"
              style={{
                rotateX: currentStageIndex === 3 ? 0 : tiltX,
                rotateY: currentStageIndex === 3 ? 0 : tiltY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ rotateX: 12, rotateY: -8, scale: 0.9, opacity: 1, z: 0 }}
              animate={
                currentStageIndex === 3
                  ? {
                      rotateX: 0,
                      rotateY: 0,
                      scale: 3.4,
                      opacity: 0,
                      z: 800,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                    }
                  : {
                      rotateX: 0,
                      rotateY: 0,
                      scale: 1,
                      opacity: 1,
                      z: 100,
                      transition: { duration: 0.9, ease: 'easeOut' },
                    }
              }
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[620px] rounded-3xl bg-[#0b1120] border-4 border-cyan-400 shadow-[0_0_140px_25px_rgba(0,245,212,0.5)] overflow-hidden flex flex-col justify-between"
            >
              {/* Realistic OS Window Top Bar */}
              <div className="px-6 py-4 bg-[#080d1a] border-b-2 border-cyan-500/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span className="text-xs font-mono font-bold text-white ml-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Web Ghost Coder Agency — Live Production Portal</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/40">
                    ⚡ 1 - 2 DAYS DELIVERY
                  </span>
                </div>
              </div>

              {/* Realistic Hero View Inside Window before seamless zoom */}
              <div className="flex-1 p-6 sm:p-12 bg-gradient-to-br from-[#0c1428] via-[#090f1d] to-[#060a14] flex flex-col justify-center">
                <div className="max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 px-3.5 py-1.5 rounded-xl">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Web Ghost Coder Agency · CEO Ibraheem Talat</span>
                  </div>

                  <div role="presentation" className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                    Your Vision. Our Code.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                      Extraordinary Websites.
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    We transform your ideas into powerful digital experiences with modern designs, exceptional performance, and affordable pricing.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-400/30">
                      <span>Get a Free Quote</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 font-bold text-xs font-mono">
                      Ordering: 4:00 PM – 8:00 PM PKT
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold text-xs font-mono">
                      Hotline: 03009464514
                    </div>
                  </div>
                </div>
              </div>

              {/* Window Footer Bar */}
              <div className="px-6 py-3 bg-[#080d1a] border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>"WhatsApp and call orders are more comfortable and preferable."</span>
                <span className="text-cyan-300 font-bold animate-pulse">
                  Entering Live Homepage...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM STATUS HUD: Timeline Progress & Narrative */}
      <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 z-50 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-200 font-semibold">
            {currentStageIndex === 0 && 'STAGE 1: Compiling code streams & holographic particles...'}
            {currentStageIndex === 1 && 'STAGE 2: Assembling 3D window wireframe from code (Tilt Enabled)...'}
            {currentStageIndex === 2 && 'STAGE 3: 3D website window materialized! Ready to enter...'}
            {currentStageIndex === 3 && 'STAGE 4: Hyperspeed camera zoom into your homepage...'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-cyan-300 font-bold">
          <span>Turnaround: 1 - 2 Days</span>
          <span>·</span>
          <span>"Your choice is our code"</span>
        </div>
      </div>
    </motion.div>
  );
};
