"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjects } from "@/lib/firebase";
import { Project } from "@/types";
import FloatingGlassCards from "@/components/FloatingGlassCards";
import ProjectCard from "@/components/ProjectCard";
import EmptyStateCard from "@/components/EmptyStateCard";
import TechStackBento from "@/components/TechStackBento";
import Timeline from "@/components/Timeline";
import { Sparkles, ArrowRight, FolderGit2, Terminal, Rocket, Cpu, Layers } from "lucide-react";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await getProjects({ onlyPublished: true, onlyFeatured: true });
        setFeaturedProjects(data);
      } catch (error) {
        console.error("Error loading featured projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* 1. HERO BANNER */}
      <section className="relative pt-10 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-ice-white"
          >
            A Digital Universe <br className="hidden sm:inline" />
            <span className="cosmic-gradient-text drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
              of My Work
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to <strong className="text-sky-400 font-bold">YuuUnivers</strong> — explore my collection of projects, creative ideas, and digital experiences built with passion, innovation, and modern technology.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Rocket className="w-5 h-5" />
              <span>Explore Portofolio</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl cosmic-glass border border-sky-400/30 text-ice-white hover:text-sky-300 font-semibold text-sm tracking-wider uppercase hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all flex items-center justify-center gap-2"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Floating Glass Cards */}
        <FloatingGlassCards />
      </section>

      {/* 2. FEATURED CASE STUDIES (CRITICAL RULE ENFORCEMENT) */}
      <section id="projects" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 border-b border-sky-400/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Real-Time Cloud Firestore Data</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white">
              Featured Case Studies
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
          >
            <span>View All Projects in Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl cosmic-glass bg-white/[0.02] border border-sky-400/20" />
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          /* CRITICAL RULE: NO SEEDER/DATA DUMMY IN PUBLIC VIEW. Render blue glass Empty State Card */
          <EmptyStateCard />
        )}
      </section>

      {/* 3. INTERACTIVE TECH STACK BENTO GRID */}
      <section id="skills" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Interactive Skills Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white">
            Technical Stack Bento Grid
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Click across category tabs to explore proficiency metrics, architecture highlights, and core competencies across full-stack engineering and cloud architecture.
          </p>
        </div>

        <TechStackBento />
      </section>

      {/* 4. PROFESSIONAL CAREER TIMELINE */}
      <section id="timeline" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
            <Layers className="w-4 h-4" />
            <span>Career Milestones & Growth</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-ice-white">
            Professional Timeline
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            A chronological journey through high-impact engineering leadership, architectural transformations, and enterprise cloud deliveries.
          </p>
        </div>

        <Timeline />
      </section>
    </div>
  );
}
