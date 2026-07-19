"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, incrementProjectClicks } from "@/lib/firebase";
import { Project } from "@/types";
import { 
  ExternalLink, ArrowLeft, Sparkles, Layers, Database, 
  CheckCircle2, Terminal, Eye, Calendar, Tag, ShieldCheck, Share2
} from "lucide-react";
import { Github } from "@/components/Icons";
import EmptyStateCard from "@/components/EmptyStateCard";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    async function loadDetail() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getProjectBySlug(slug);
        if (data) {
          setProject(data);
          setActiveImage(data.thumbnailUrl || "");
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slug]);

  const handleExternalClick = async (type: "github" | "liveDemo") => {
    if (project?.id) {
      await incrementProjectClicks(project.id, type);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse space-y-8">
        <div className="h-12 w-64 cosmic-glass rounded-2xl" />
        <div className="h-96 cosmic-glass rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 cosmic-glass rounded-3xl" />
          <div className="h-64 cosmic-glass rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <EmptyStateCard
          title="Case Study Not Found"
          description={`The requested project slug "${slug}" does not exist in Cloud Firestore or has not been published yet.`}
          ctaText="Return to Project Catalog"
          ctaHref="/projects"
        />
      </div>
    );
  }

  const allImages = [
    project.thumbnailUrl,
    ...(project.galleryUrls || []),
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      {/* Back Button */}
      <div className="pt-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cosmic-glass border border-rose-400/30 text-xs font-semibold text-rose-300 hover:text-white hover:border-rose-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Catalog</span>
        </Link>
      </div>

      {/* Hero Banner Header */}
      <div className="space-y-6 border-b border-rose-400/20 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-400/30">
            {project.category}
          </span>
          {project.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 text-[#0B0608] shadow-[0_0_15px_rgba(244,63,94,0.4)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Architecture</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ice-white leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Buttons with Click Counters */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick("liveDemo")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-400 via-red-500 to-pink-600 text-[#0B0608] font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:shadow-[0_0_45px_rgba(244,63,94,0.8)] hover:scale-105 transition-all flex items-center gap-2.5"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Launch Live Demo</span>
              {typeof project.liveDemoClicks === "number" && project.liveDemoClicks > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-[#0B0608]/30 rounded-md text-[11px] font-mono">
                  {project.liveDemoClicks} clicks
                </span>
              )}
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick("github")}
              className="px-8 py-4 rounded-2xl cosmic-glass border border-rose-400/30 text-ice-white hover:text-rose-300 font-semibold text-sm tracking-wider uppercase hover:border-rose-400 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] transition-all flex items-center gap-2.5"
            >
              <Github className="w-5 h-5" />
              <span>View GitHub Code</span>
              {typeof project.githubClicks === "number" && project.githubClicks > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-rose-400/20 rounded-md text-[11px] font-mono text-rose-300">
                  {project.githubClicks} clicks
                </span>
              )}
            </a>
          )}
        </div>
      </div>

      {/* Screenshot Gallery Viewer */}
      <div className="space-y-4">
        <div className="relative h-80 sm:h-[480px] rounded-3xl overflow-hidden cosmic-glass border border-rose-400/30 shadow-[0_10px_50px_rgba(244,63,94,0.15)]">
          <img
            src={activeImage || project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover sm:object-contain bg-[#0B0608]"
          />
        </div>

        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(url)}
                className={`relative w-28 sm:w-36 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === url
                    ? "border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-105"
                    : "border-rose-400/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Overview & Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Comprehensive Overview & Features */}
        <div className="lg:col-span-2 space-y-8">
          <div className="cosmic-glass rounded-3xl p-8 border border-rose-400/25 space-y-4 shadow-[0_4px_30px_rgba(244,63,94,0.08)]">
            <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-rose-400/15 pb-3">
              <Sparkles className="w-5 h-5 text-rose-400" />
              <span>Project Overview</span>
            </h3>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {project.overview}
            </p>
          </div>

          {/* Key Features List */}
          <div className="cosmic-glass rounded-3xl p-8 border border-rose-400/25 space-y-6 shadow-[0_4px_30px_rgba(244,63,94,0.08)]">
            <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-rose-400/15 pb-3">
              <CheckCircle2 className="w-5 h-5 text-red-400" />
              <span>Key Features & Engineering Highlights</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-rose-400/15 flex items-start gap-3 text-sm text-slate-200"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right 1 Col: Tech Stack Tags & Metadata */}
        <div className="space-y-8">
          <div className="cosmic-glass rounded-3xl p-8 border border-rose-400/25 space-y-6 shadow-[0_4px_30px_rgba(244,63,94,0.08)]">
            <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-rose-400/15 pb-3">
              <Terminal className="w-5 h-5 text-rose-400" />
              <span>Technology Stack</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-400/30 text-xs font-mono font-bold text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture & Database Schema Section */}
      {(project.architecture || project.databaseSchema) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {project.architecture && (
            <div className="cosmic-glass rounded-3xl p-8 border border-rose-400/25 space-y-4 shadow-[0_4px_30px_rgba(244,63,94,0.08)]">
              <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-rose-400/15 pb-3">
                <Layers className="w-5 h-5 text-rose-400" />
                <span>System Architecture</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-mono">
                {project.architecture}
              </p>
            </div>
          )}

          {project.databaseSchema && (
            <div className="cosmic-glass rounded-3xl p-8 border border-rose-400/25 space-y-4 shadow-[0_4px_30px_rgba(244,63,94,0.08)]">
              <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-rose-400/15 pb-3">
                <Database className="w-5 h-5 text-red-400" />
                <span>Database Schema & Security</span>
              </h3>
              <div className="p-4 rounded-2xl bg-[#0B0608]/90 border border-rose-400/20 font-mono text-xs text-red-300 overflow-x-auto leading-relaxed">
                <pre>{project.databaseSchema}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
