"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/firebase";
import { Project } from "@/types";
import { 
  FolderGit2, CheckCircle2, ExternalLink, PlusCircle, 
  Sparkles, ArrowRight, TrendingUp, Layers, Eye, Edit
} from "lucide-react";
import { Github } from "@/components/Icons";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.isPublished).length;
  const featuredProjects = projects.filter((p) => p.isFeatured).length;
  const totalGithubClicks = projects.reduce((acc, p) => acc + (p.githubClicks || 0), 0);
  const totalDemoClicks = projects.reduce((acc, p) => acc + (p.liveDemoClicks || 0), 0);

  return (
    <div className="space-y-10">
      {/* Welcome Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-ice-white tracking-tight">
            Real-Time <span className="cosmic-gradient-text">Telemetry & CMS</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Monitor spatial case study metrics and manage Firestore content items.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="cosmic-glass rounded-3xl p-6 border border-sky-400/30 space-y-3 shadow-[0_4px_25px_rgba(56,189,248,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Projects</span>
            <FolderGit2 className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-ice-white">{loading ? "..." : totalProjects}</div>
          <div className="text-xs text-sky-300 font-mono">
            {loading ? "..." : `${featuredProjects} featured items`}
          </div>
        </div>

        <div className="cosmic-glass rounded-3xl p-6 border border-cyan-400/30 space-y-3 shadow-[0_4px_25px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Published Status</span>
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-ice-white">{loading ? "..." : publishedProjects}</div>
          <div className="text-xs text-cyan-300 font-mono">
            {loading ? "..." : `${totalProjects - publishedProjects} drafts in queue`}
          </div>
        </div>

        <div className="cosmic-glass rounded-3xl p-6 border border-blue-400/30 space-y-3 shadow-[0_4px_25px_rgba(59,130,246,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">GitHub Clicks</span>
            <Github className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-ice-white">{loading ? "..." : totalGithubClicks}</div>
          <div className="text-xs text-blue-300 font-mono">Realtime telemetry telemetry</div>
        </div>

        <div className="cosmic-glass rounded-3xl p-6 border border-sky-400/30 space-y-3 shadow-[0_4px_25px_rgba(56,189,248,0.1)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Live Demo Clicks</span>
            <ExternalLink className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-ice-white">{loading ? "..." : totalDemoClicks}</div>
          <div className="text-xs text-sky-300 font-mono">Visitors launching previews</div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="cosmic-glass rounded-3xl p-8 border-2 border-sky-400/40 shadow-[0_0_40px_rgba(56,189,248,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 text-xs font-bold border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strict Zero-Dummy Data Rule</span>
          </div>
          <h3 className="text-xl font-bold text-ice-white">Ready to Showcase Your Latest Masterpiece?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            All public pages dynamically reflect entries added through this portal. Add full specifications, architecture notes, and gallery screenshots to populate the Home Universe.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-105 transition-all shrink-0 text-center"
        >
          Launch New Project Wizard
        </Link>
      </div>

      {/* Recent Projects Table Snippet */}
      <div className="cosmic-glass rounded-3xl p-6 sm:p-8 border border-sky-400/25 space-y-6">
        <div className="flex items-center justify-between border-b border-sky-400/15 pb-4">
          <h3 className="text-lg font-bold text-ice-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            <span>Recent Projects Overview</span>
          </h3>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1"
          >
            <span>Manage All ({totalProjects})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-white/[0.03]" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id || p.slug}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-sky-400/15 hover:border-sky-400/40 transition-all gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover bg-[#080A0F] border border-sky-400/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-ice-white">{p.title}</h4>
                    <span className="text-xs text-sky-400 font-mono">{p.category} • /{p.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${p.isPublished ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30" : "bg-slate-500/20 text-slate-300"}`}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                    {p.isFeatured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        Featured
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="p-2 rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30 transition-all"
                    title="Edit Case Study"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <p className="text-slate-400 text-sm">No projects currently exist in Firestore.</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold uppercase tracking-wider"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Project Now</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
