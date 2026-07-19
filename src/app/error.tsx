"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12">
      <div className="w-full p-8 sm:p-14 rounded-3xl cosmic-glass border-2 border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden text-center">
        {/* Floating Icon Orb */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-red-500/20 via-pink-500/20 to-purple-600/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-float-slow">
          <AlertCircle className="w-12 h-12 text-red-400 animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-red-500/40 text-xs font-mono uppercase tracking-widest text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.2)] mb-4">
          <span>Runtime Dimension Exception</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white mb-6">
          System Anomaly Detected
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
          We encountered an unexpected anomaly while rendering this spatial component. You can attempt to realign the state or return to the main universe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
            <span>Re-render Component</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl cosmic-glass border border-sky-400/30 text-sky-300 hover:text-white font-semibold text-sm transition-all hover:border-sky-400"
          >
            <Home className="w-4 h-4" />
            <span>Return to Universe</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
