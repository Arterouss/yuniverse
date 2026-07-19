"use client";

import React from "react";
import { motion } from "framer-motion";
import { TIMELINE_DATA } from "@/lib/data";
import { Briefcase, Calendar, Sparkles, CheckCircle2 } from "lucide-react";

export default function Timeline() {
  return (
    <div className="w-full max-w-4xl mx-auto relative px-2 sm:px-6">
      {/* Central/Left-Aligned Vertical Axis */}
      <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-400/80 via-red-400/40 to-transparent shadow-[0_0_15px_rgba(244,63,94,0.5)]" />

      <div className="space-y-12 sm:space-y-16 relative">
        {TIMELINE_DATA.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={`${item.year}-${item.company}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
                isEven ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Glowing Orb Indicator on the line */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 sm:top-1/2 sm:-translate-y-1/2 z-10">
                <div className="group relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 rounded-full bg-rose-400/20 animate-ping opacity-75" />
                  <div className="w-6 h-6 rounded-full bg-[#0B0608] border-2 border-rose-400 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] transition-transform duration-300 group-hover:scale-125">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Card Container */}
              <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-14 sm:pl-0 ${isEven ? "sm:pr-6" : "sm:pl-6"}`}>
                <div className="cosmic-glass rounded-3xl p-6 sm:p-8 border border-rose-400/25 hover:border-rose-400/60 shadow-[0_4px_30px_rgba(244,63,94,0.1)] hover:shadow-[0_10px_40px_rgba(244,63,94,0.25)] transition-all duration-300 group">
                  {/* Header with Badge inside card to avoid overflow clipping */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-gradient-to-r from-rose-400/20 to-red-400/20 text-rose-300 border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.year}</span>
                    </span>
                    <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.company}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-ice-white group-hover:text-rose-300 transition-colors mb-2">
                    {item.role}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlight Box */}
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/25 text-xs text-rose-200 mb-4 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-rose-400/15">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-rose-400/20 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
