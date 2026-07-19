"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjectById, updateProject } from "@/lib/firebase";
import { Project } from "@/types";
import ProjectForm from "@/components/ProjectForm";
import { Edit, Sparkles } from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getProjectById(id);
        if (data) {
          setProject(data);
        }
      } catch (error) {
        console.error("Error loading project for edit:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleSubmit = async (data: Omit<Project, "id">) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateProject(id, data);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4 animate-pulse">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-sky-400" />
        </div>
        <p className="text-sm font-mono text-sky-300">Loading case study specifications from Firestore...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-ice-white">Case Study Not Found</h2>
        <p className="text-slate-400 text-sm">The project ID &quot;{id}&quot; does not exist in Firestore.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-sky-400/40 text-xs font-semibold text-sky-300">
          <Edit className="w-4 h-4 text-sky-400" />
          <span>Update Cloud Firestore Entry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ice-white tracking-tight">
          Edit <span className="cosmic-gradient-text">{project.title}</span>
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed font-mono">
          Slug: /{project.slug} • Category: {project.category}
        </p>
      </div>

      <ProjectForm initialData={project} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
