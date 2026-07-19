"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, FolderGit2 } from "lucide-react";

interface EmptyStateCardProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function EmptyStateCard({
  title,
  description,
  ctaText,
  ctaHref,
}: EmptyStateCardProps) {
  const isFilterEmpty = title === "No Matching Projects Found";
  const isNotFound = title === "Case Study Not Found";

  // Public visitor defaults for clean, professional presentation
  const cardTitle = title || "Portfolio Case Studies Coming Soon";
  const cardDescription = isFilterEmpty
    ? "No case studies matched your selected category or keyword search. Try clearing your filters or exploring another domain."
    : isNotFound
    ? description
    : "Our full-stack architecture breakdowns, live deployments, and deep-dive engineering case studies are currently being curated. In the meantime, explore our technical skills matrix below or reach out for collaboration.";

  const primaryCtaText = isFilterEmpty ? "View All Projects" : isNotFound ? ctaText || "Return to Catalog" : "Contact & Collaborate";
  const primaryCtaHref = isFilterEmpty ? "/projects" : isNotFound ? ctaHref || "/projects" : "/contact";

  return (
    <div className="w-full max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl cosmic-glass border-2 border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.2)] relative overflow-hidden text-center my-10">
      {/* Blue Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-sky-400/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-sky-400/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-400/30 to-transparent pointer-events-none" />

      {/* Icon Orb */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-sky-400/20 via-cyan-500/20 to-blue-600/20 border border-sky-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.3)] animate-float-slow">
        <Sparkles className="w-10 h-10 text-sky-400 animate-pulse" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-ice-white tracking-tight mb-4">
        {cardTitle}
      </h3>

      <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
        {cardDescription}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={primaryCtaHref}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-[1.02] transition-all duration-300"
        >
          <FolderGit2 className="w-5 h-5" />
          <span>{primaryCtaText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl cosmic-glass border border-sky-400/30 text-sky-300 hover:text-white font-semibold text-sm transition-all hover:border-sky-400"
        >
          <span>Explore Skills & Bio</span>
        </Link>
      </div>
    </div>
  );
}
