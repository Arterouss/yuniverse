"use client";

import React from "react";
import Link from "next/link";
import { BIO_PHILOSOPHY } from "@/lib/data";
import SkillsMatrix from "@/components/SkillsMatrix";
import { Sparkles, Award, CheckCircle2, ArrowRight, UserCheck, Code2, Rocket, Download } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-16">
      {/* 1. Bio Header Banner */}
      <section className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-sky-400/40 text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <UserCheck className="w-4 h-4 text-sky-400" />
            <span>Senior Full Stack Web Developer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ice-white leading-tight">
            Engineering the <br className="hidden sm:inline" />
            <span className="cosmic-gradient-text">Next-Gen Web</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {BIO_PHILOSOPHY.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Initiate Collaboration</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl cosmic-glass border border-sky-400/30 text-ice-white hover:text-sky-300 font-semibold text-sm tracking-wider uppercase hover:border-sky-400 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Download CV / Resume</span>
            </a>
          </div>
        </div>

        {/* Right 3D Orb Profile Display */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full cosmic-glass border-2 border-sky-400/40 flex items-center justify-center shadow-[0_0_60px_rgba(56,189,248,0.3)] animate-float-slow">
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-sky-400/20 via-cyan-500/10 to-blue-600/20 blur-xl pointer-events-none" />
            <div className="text-center space-y-3 z-10 p-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#080A0F] border border-sky-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                <Sparkles className="w-10 h-10 text-sky-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-ice-white">Yuu</h3>
              <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                Full Stack Web Developer
              </p>
              <div className="pt-2 flex justify-center gap-2 font-mono text-[11px] text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-sky-400/20">4+ Yrs Exp</span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-sky-400/20">100% Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Engineering Philosophy */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
            <Award className="w-4 h-4" />
            <span>Core Principles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white">
            Engineering Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BIO_PHILOSOPHY.philosophy.map((item, idx) => (
            <div
              key={idx}
              className="cosmic-glass rounded-3xl p-8 border border-sky-400/25 hover:border-sky-400/60 shadow-[0_4px_30px_rgba(56,189,248,0.08)] hover:shadow-[0_10px_40px_rgba(56,189,248,0.2)] transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-ice-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Complete Skills Matrix Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <Code2 className="w-4 h-4" />
            <span>Proficiency Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white">
            Complete Skills Matrix
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Detailed proficiency ratings, architectural highlights, and battle-tested expertise across modern frontend, serverless backend, real-time databases, and cloud web architectures.
          </p>
        </div>

        <SkillsMatrix />
      </section>
    </div>
  );
}
