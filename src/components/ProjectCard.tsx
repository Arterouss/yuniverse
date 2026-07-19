"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles, Eye, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/Icons";
import { Project } from "@/types";
import { incrementProjectClicks } from "@/lib/firebase";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleExternalClick = (e: React.MouseEvent, type: "github" | "liveDemo") => {
    e.stopPropagation();
    if (project.id) {
      incrementProjectClicks(project.id, type);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cosmic-glass rounded-3xl overflow-hidden border border-sky-400/25 hover:border-sky-400/60 shadow-[0_4px_30px_rgba(56,189,248,0.12)] hover:shadow-[0_10px_40px_rgba(56,189,248,0.3)] transition-all duration-300 flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-[#080A0F]/60 border-b border-sky-400/15">
        <img
          src={project.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#080A0F]/80 backdrop-blur-md text-sky-400 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            {project.category}
          </span>
          {project.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-[#080A0F] font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>

        {/* Quick External Links Overlay */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleExternalClick(e, "github")}
              className="w-9 h-9 rounded-xl bg-[#080A0F]/80 backdrop-blur-md border border-sky-400/30 flex items-center justify-center text-slate-200 hover:text-sky-400 hover:border-sky-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              title="View GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleExternalClick(e, "liveDemo")}
              className="w-9 h-9 rounded-xl bg-[#080A0F]/80 backdrop-blur-md border border-sky-400/30 flex items-center justify-center text-slate-200 hover:text-sky-400 hover:border-sky-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              title="Launch Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Title and Tagline on Image bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 className="text-xl font-bold text-ice-white group-hover:text-sky-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-6" style={{ transform: "translateZ(15px)" }}>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {project.overview}
        </p>

        {/* Tech Stack Tags */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-sky-400/20 text-xs font-mono text-sky-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 rounded-lg bg-white/[0.04] border border-sky-400/10 text-xs font-mono text-slate-400">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="w-full py-3 px-4 rounded-xl cosmic-glass border border-sky-400/30 hover:border-sky-400 text-ice-white font-semibold text-sm flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-sky-500/20 group-hover:to-cyan-500/20 group-hover:text-sky-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]"
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
