"use client";

import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/firebase";
import { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import EmptyStateCard from "@/components/EmptyStateCard";
import { Search, Filter, Sparkles, FolderGit2, ShieldAlert } from "lucide-react";

export default function ProjectCatalog() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "UI/UX Design"];

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      try {
        const data = await getProjects({
          onlyPublished: true,
          category: selectedCategory,
          searchQuery: searchQuery,
        });
        setProjects(data);
      } catch (error) {
        console.error("Error loading project catalog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto pt-6 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-rose-400/40 text-xs font-semibold text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <FolderGit2 className="w-4 h-4 text-rose-400" />
          <span>Complete Digital Archive</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ice-white">
          Project <span className="cosmic-gradient-text">Catalog</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore comprehensive engineering case studies stored dynamically in Firebase Cloud Firestore. Filter by category, search technologies, or dive deep into database schemas and architecture notes.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="cosmic-glass rounded-3xl p-6 border border-rose-400/25 space-y-6 shadow-[0_10px_35px_rgba(244,63,94,0.1)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tech stack, or keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0B0608]/90 border border-rose-400/30 text-ice-white text-sm focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400/50 transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 text-[#0B0608] font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                      : "bg-white/[0.04] text-slate-300 hover:text-rose-300 border border-rose-400/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-3xl cosmic-glass bg-white/[0.02] border border-rose-400/20" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <EmptyStateCard
          title={searchQuery || selectedCategory !== "All" ? "No Matching Projects Found" : undefined}
        />
      )}
    </div>
  );
}
