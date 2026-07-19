import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12">
      <div className="w-full p-8 sm:p-14 rounded-3xl cosmic-glass border-2 border-sky-400/40 shadow-[0_0_50px_rgba(56,189,248,0.25)] relative overflow-hidden text-center">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-sky-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-purple-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Floating Icon Orb */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-sky-400/20 via-cyan-500/20 to-blue-600/20 border border-sky-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] animate-float-slow">
          <Compass className="w-12 h-12 text-sky-400 animate-pulse" />
        </div>

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-sky-400/40 text-xs font-mono uppercase tracking-widest text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Error 404 — Dimension Uncharted</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ice-white mb-6">
          Lost in the <span className="cosmic-gradient-text">Cosmic Void</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          The spatial dimension or case study you are searching for does not exist across our digital universe, or has been moved to a different orbital sector.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-[1.02] transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Return to Digital Universe</span>
            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl cosmic-glass border border-sky-400/30 text-sky-300 hover:text-white font-semibold text-sm transition-all hover:border-sky-400"
          >
            <span>Explore Project Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
