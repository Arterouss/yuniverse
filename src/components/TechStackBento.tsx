"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/lib/data";
import { SkillItem } from "@/types";
import { 
  Globe, Code2, Palette, Sparkles, Server, Terminal, Workflow, 
  Database, HardDrive, Zap, Container, Cpu, GitBranch, Bot, Layers, CheckCircle
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Code2, Palette, Sparkles, Server, Terminal, Workflow,
  Database, HardDrive, Zap, Container, Cpu, GitBranch, Bot, Layers
};

export default function TechStackBento() {
  const categories = ["All", "Frontend", "Backend", "Database & Storage", "DevOps & Tools", "Web Architecture"];
  const [activeTab, setActiveTab] = useState("All");

  const filteredSkills = activeTab === "All"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeTab === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-[#080A0F] font-bold shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-105"
                  : "cosmic-glass text-slate-300 hover:text-sky-300 hover:border-sky-400/40"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Column Bento Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.iconName] || Code2;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group cosmic-glass rounded-3xl p-6 border border-sky-400/20 hover:border-sky-400/60 shadow-[0_4px_20px_rgba(56,189,248,0.08)] hover:shadow-[0_10px_35px_rgba(56,189,248,0.22)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/15 to-cyan-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-sky-400 font-mono bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/25">
                      {skill.level}%
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-ice-white mb-1 group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[11px] text-cyan-400/80 uppercase tracking-widest font-mono block mb-3">
                    {skill.category}
                  </span>
                  {skill.highlight && (
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {skill.highlight}
                    </p>
                  )}
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-[#080A0F] h-2.5 rounded-full overflow-hidden border border-sky-400/20 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
