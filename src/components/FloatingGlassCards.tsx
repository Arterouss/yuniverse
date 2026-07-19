"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, Zap, Award, Layers, ShieldCheck, Flame, ArrowUpRight } from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth tilt (max 8 degrees)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cosmic-glass rounded-3xl p-6 transition-shadow duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
}

export default function FloatingGlassCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto z-10">
      {/* Card 1: Available for Work */}
      <TiltCard className="hover:border-sky-400/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] border-t-2 border-t-sky-400/40">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Available for Work</span>
          </span>
        </div>
        <h3 className="text-lg font-bold text-ice-white mb-2">
          High-Velocity Engineering
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Ready to turn visionary concepts into high-converting, scalable spatial web interfaces with extreme performance.
        </p>
        <div className="pt-3 border-t border-sky-400/15 flex items-center justify-between text-xs font-mono text-sky-300">
          <span>Response: &lt; 2 hours</span>
          <span className="flex items-center gap-1">
            Global Remote <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </TiltCard>

      {/* Card 2: Full Stack Mastery */}
      <TiltCard className="hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] border-t-2 border-t-cyan-400/40">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Layers className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 font-mono">
            Next.js 16 + Cloud
          </span>
        </div>
        <h3 className="text-lg font-bold text-ice-white mb-2">
          Full Stack Mastery
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Deep architectural fluency across Next.js App Router, Cloud Firestore real-time synchronization, and modern serverless architectures.
        </p>
        <div className="pt-3 border-t border-cyan-400/15 flex flex-wrap gap-1.5">
          {["TypeScript", "Turbopack", "Tailwind v4", "Firestore"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-sky-400/20 text-[11px] text-slate-300 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </TiltCard>

      {/* Card 3: Lighthouse 100% */}
      <TiltCard className="hover:border-blue-400/50 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)] border-t-2 border-t-blue-400/40">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Award className="w-6 h-6" />
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Audit Score</span>
          </span>
        </div>
        <h3 className="text-lg font-bold text-ice-white mb-2">
          100% Lighthouse Peak
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Obsessive attention to web vitals: zero layout shift, GPU-accelerated 60 FPS transitions, and crystal-clear accessibility.
        </p>
        <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-blue-400/15 text-center font-mono">
          {[
            { label: "Perf", val: "100" },
            { label: "Acc", val: "100" },
            { label: "BP", val: "100" },
            { label: "SEO", val: "100" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] rounded-lg p-1 border border-sky-400/20">
              <div className="text-xs font-bold text-sky-400">{stat.val}</div>
              <div className="text-[9px] text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}
