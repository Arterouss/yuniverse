"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/firebase";
import { Project } from "@/types";
import ProjectForm from "@/components/ProjectForm";
import { PlusCircle, Sparkles, FolderGit2 } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<Project, "id">) => {
    setIsSubmitting(true);
    try {
      const newId = await createProject(data);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-sky-400/40 text-xs font-semibold text-sky-300">
          <PlusCircle className="w-4 h-4 text-sky-400" />
          <span>New Cloud Firestore Entry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-ice-white tracking-tight">
          Create <span className="cosmic-gradient-text">Case Study</span>
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Input complete technical specifications, architecture notes, and gallery URLs to publish your work across the digital universe.
        </p>
      </div>

      <ProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
