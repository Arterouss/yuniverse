"use client";

import React from "react";
import { SKILLS_DATA } from "@/lib/data";
import { 
  Globe, Code2, Palette, Sparkles, Server, Terminal, Workflow, 
  Database, HardDrive, Zap, Container, Cpu, GitBranch, Bot, Layers
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, Code2, Palette, Sparkles, Server, Terminal, Workflow,
  Database, HardDrive, Zap, Container, Cpu, GitBranch, Bot, Layers
};

export default function SkillsMatrix() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {SKILLS_DATA.map((skill) => {
        const IconComponent = iconMap[skill.iconName] || Code2;
        return (
          <div
            key={skill.name}
            className="group cosmic-glass rounded-3xl p-6 border border-rose-400/20 hover:border-rose-400/60 shadow-[0_4px_20px_rgba(244,63,94,0.08)] hover:shadow-[0_10px_35px_rgba(244,63,94,0.22)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400/15 to-red-500/15 border border-rose-400/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-rose-400 font-mono bg-rose-400/10 px-3 py-1 rounded-full border border-rose-400/25">
                  {skill.level}%
                </span>
              </div>

              <h4 className="text-base font-bold text-ice-white mb-1 group-hover:text-rose-300 transition-colors">
                {skill.name}
              </h4>
              <span className="text-[11px] text-red-400/80 uppercase tracking-widest font-mono block mb-3">
                {skill.category}
              </span>
              {skill.highlight && (
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {skill.highlight}
                </p>
              )}
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-[#0B0608] h-2.5 rounded-full overflow-hidden border border-rose-400/20 p-0.5">
              <div
                style={{ width: `${skill.level}%` }}
                className="h-full bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.6)] transition-all duration-1000"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
