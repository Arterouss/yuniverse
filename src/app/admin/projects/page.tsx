"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject, updateProject } from "@/lib/firebase";
import { Project } from "@/types";
import { 
  FolderGit2, PlusCircle, Edit, Trash2, Eye, ExternalLink, 
  Sparkles, CheckCircle2, XCircle, AlertCircle 
} from "lucide-react";

export default function AdminProjectsTablePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleTogglePublished = async (project: Project) => {
    if (!project.id) return;
    try {
      const nextVal = !project.isPublished;
      await updateProject(project.id, { isPublished: nextVal });
      setProjects(projects.map((p) => p.id === project.id ? { ...p, isPublished: nextVal } : p));
    } catch (error) {
      console.error("Error toggling publish:", error);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    if (!project.id) return;
    try {
      const nextVal = !project.isFeatured;
      await updateProject(project.id, { isFeatured: nextVal });
      setProjects(projects.map((p) => p.id === project.id ? { ...p, isFeatured: nextVal } : p));
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-ice-white tracking-tight">
            Projects <span className="cosmic-gradient-text">Management</span>
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Edit specifications, toggle visibility status, or delete items from Cloud Firestore.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Case Study</span>
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#080A0F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cosmic-glass rounded-3xl p-8 max-w-md w-full border-2 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.3)] space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-ice-white">Permanent Deletion</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Are you sure you want to delete this case study from Cloud Firestore? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-6 py-3 rounded-xl cosmic-glass border border-sky-400/30 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-6 py-3 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:bg-rose-500 transition-all"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="cosmic-glass rounded-3xl overflow-hidden border border-sky-400/30 shadow-[0_10px_40px_rgba(56,189,248,0.1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-sky-400/20 bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Project Info</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status Controls</th>
                <th className="py-4 px-6">Telemetry</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-400/10 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-mono">
                    Loading project entries from Cloud Firestore...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center space-y-4">
                    <p className="text-slate-400 font-mono text-base">No case studies available yet.</p>
                    <Link
                      href="/admin/projects/new"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold uppercase"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add First Case Study</span>
                    </Link>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id || project.slug} className="hover:bg-white/[0.02] transition-colors">
                    {/* Project Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={project.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"}
                          alt={project.title}
                          className="w-12 h-12 rounded-xl object-cover bg-[#080A0F] border border-sky-400/20 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-ice-white hover:text-sky-300 transition-colors">
                            {project.title}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">/{project.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 font-mono text-xs text-sky-300">
                      <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25">
                        {project.category}
                      </span>
                    </td>

                    {/* Status Toggle Controls */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(project)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border transition-all ${
                            project.isPublished
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/25"
                              : "bg-slate-500/15 text-slate-400 border-slate-400/30 hover:text-slate-200"
                          }`}
                          title="Click to toggle Published status"
                        >
                          {project.isPublished ? "● Published" : "○ Draft"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(project)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold border transition-all flex items-center gap-1 ${
                            project.isFeatured
                              ? "bg-sky-500/20 text-sky-300 border-sky-400/50 hover:bg-sky-500/30 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                              : "bg-white/[0.03] text-slate-400 border-sky-400/15 hover:text-sky-300"
                          }`}
                          title="Click to toggle Featured status on Home Hero"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{project.isFeatured ? "Featured" : "Standard"}</span>
                        </button>
                      </div>
                    </td>

                    {/* Telemetry Clicks */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-300">
                      <div>GH: <span className="text-sky-400 font-bold">{project.githubClicks || 0}</span> clicks</div>
                      <div>Demo: <span className="text-cyan-400 font-bold">{project.liveDemoClicks || 0}</span> clicks</div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-white/[0.04] text-slate-300 hover:text-sky-400 border border-sky-400/20 transition-all"
                          title="View Case Study Live"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-2 rounded-xl bg-sky-500/15 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30 transition-all"
                          title="Edit Case Study Specifications"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => project.id && setDeleteConfirmId(project.id)}
                          className="p-2 rounded-xl bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 border border-rose-400/30 transition-all"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
