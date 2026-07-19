"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@/types";
import { Plus, Trash2, Sparkles, Save, ArrowLeft, Image as ImageIcon, CheckCircle, AlertCircle, Upload, Loader2, FolderUp } from "lucide-react";
import Link from "next/link";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required and must be URL-safe"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  category: z.enum(["Frontend", "Backend", "Full Stack", "Mobile", "UI/UX Design"]),
  thumbnailUrl: z.string().url("Please provide a valid URL for the thumbnail image"),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  architecture: z.string().optional(),
  databaseSchema: z.string().optional(),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  liveDemoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: Omit<Project, "id">) => Promise<void>;
  isSubmitting?: boolean;
}

export default function ProjectForm({ initialData, onSubmit, isSubmitting = false }: ProjectFormProps) {
  const [features, setFeatures] = useState<string[]>(initialData?.features || ["Real-time synchronization across clients", "Responsive 3D spatial user interface", "Server-side rendering & static generation"]);
  const [newFeature, setNewFeature] = useState("");

  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Firebase Cloud Firestore", "Framer Motion"]);
  const [newTech, setNewTech] = useState("");

  const [galleryUrls, setGalleryUrls] = useState<string[]>(initialData?.galleryUrls || [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  ]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const compressImageToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) {
          return reject(new Error("File reader empty result"));
        }
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            const maxWidth = 900;
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              return resolve(e.target?.result as string);
            }
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
            resolve(dataUrl);
          } catch (canvasErr) {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => {
          resolve(e.target?.result as string);
        };
        img.src = e.target.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleLocalImageUpload = async (file: File): Promise<string> => {
    // 100% GRATIS (FREE) & KILAT (< 50ms):
    // Kita langsung kompres & optimasi gambar lokal di browser menjadi format Base64 (900px, quality 0.78)
    // yang super ringan (< 80 KB) sehingga bisa langsung disimpan ke Cloud Firestore Anda TANPA BIAYA SEPESERPUN!
    // Tidak perlu upgrade ke Blaze plan atau membayar Firebase Storage sama sekali.
    const fallbackDataUrl = await compressImageToDataUrl(file);
    return fallbackDataUrl;
  };

  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    try {
      const url = await handleLocalImageUpload(file);
      setValue("thumbnailUrl", url, { shouldValidate: true });
    } catch (err) {
      setFormError("Failed to upload thumbnail image from laptop.");
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleGalleryFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await handleLocalImageUpload(files[i]);
        setGalleryUrls((prev) => [...prev, url]);
      }
    } catch (err) {
      setFormError("Failed to upload gallery images from laptop.");
    } finally {
      setUploadingGallery(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      tagline: initialData?.tagline || "",
      category: initialData?.category || "Full Stack",
      thumbnailUrl: initialData?.thumbnailUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      overview: initialData?.overview || "",
      architecture: initialData?.architecture || "Built on Next.js 16 App Router utilizing Server Actions, React 19 concurrent features, and edge rendering. Data is synchronized in real-time using Firebase Cloud Firestore with strict security validation rules and Upstash caching.",
      databaseSchema: initialData?.databaseSchema || "Collection: projects -> { slug: string, title: string, category: string, technologies: string[], features: string[], isFeatured: boolean, isPublished: boolean, createdAt: timestamp }",
      githubUrl: initialData?.githubUrl || "https://github.com/yuuunivers/portfolio-case",
      liveDemoUrl: initialData?.liveDemoUrl || "https://yuuunivers.vercel.app",
      isFeatured: initialData?.isFeatured ?? true,
      isPublished: initialData?.isPublished ?? true,
    },
  });

  const titleValue = watch("title");

  const generateSlug = () => {
    if (titleValue) {
      const generated = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated, { shouldValidate: true });
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const addTech = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (idx: number) => {
    setTechnologies(technologies.filter((_, i) => i !== idx));
  };

  const addGallery = () => {
    if (newGalleryUrl.trim() && !galleryUrls.includes(newGalleryUrl.trim())) {
      setGalleryUrls([...galleryUrls, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };

  const removeGallery = (idx: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== idx));
  };

  const onFormSubmit = async (data: ProjectFormData) => {
    setFormError(null);
    if (features.length === 0) {
      setFormError("Please add at least one feature/highlight.");
      return;
    }
    if (technologies.length === 0) {
      setFormError("Please add at least one technology item.");
      return;
    }

    try {
      await onSubmit({
        ...data,
        features,
        technologies,
        galleryUrls,
        createdAt: initialData?.createdAt || Date.now(),
        updatedAt: Date.now(),
        githubClicks: initialData?.githubClicks || 0,
        liveDemoClicks: initialData?.liveDemoClicks || 0,
      });
    } catch (e: any) {
      setFormError(e?.message || "Failed to save project.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8 max-w-4xl mx-auto">
      {formError && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-rose-300 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Main Metadata Section */}
      <div className="cosmic-glass rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-ice-white flex items-center gap-2 border-b border-sky-400/20 pb-4">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <span>Project Identity & Classification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Project Title *
            </label>
            <input
              {...register("title")}
              placeholder="e.g. YuuUnivers E-Commerce Platform"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm"
            />
            {errors.title && <p className="text-xs text-rose-400">{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={generateSlug}
                className="text-[11px] text-sky-400 hover:text-cyan-300 font-semibold underline"
              >
                Auto-generate from Title
              </button>
            </div>
            <input
              {...register("slug")}
              placeholder="e.g. yuuunivers-ai-engine"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all font-mono text-sm"
            />
            {errors.slug && <p className="text-xs text-rose-400">{errors.slug.message}</p>}
          </div>

          {/* Tagline */}
          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Tagline (One-line summary) *
            </label>
            <input
              {...register("tagline")}
              placeholder="e.g. Next.js 16 3D Spatial Glass Portofolio & Real-time CMS"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm"
            />
            {errors.tagline && <p className="text-xs text-rose-400">{errors.tagline.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Category *
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Mobile">Mobile</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

          {/* Thumbnail URL / Local File Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Thumbnail Image (Upload SS or Paste URL) *</span>
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-xs font-bold transition-all">
                {uploadingThumb ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                ) : (
                  <Upload className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span>{uploadingThumb ? "Processing..." : "📁 Upload from Laptop"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbFileChange}
                  disabled={uploadingThumb}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                {...register("thumbnailUrl")}
                placeholder="https://... or upload from laptop above"
                className="flex-grow px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm font-mono"
              />
              {watch("thumbnailUrl") && (
                <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-sky-400/40 relative bg-black/40">
                  <img src={watch("thumbnailUrl")} alt="Thumb Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            {errors.thumbnailUrl && <p className="text-xs text-rose-400">{errors.thumbnailUrl.message}</p>}
          </div>
        </div>
      </div>

      {/* Overview & Architecture */}
      <div className="cosmic-glass rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-ice-white flex items-center gap-2 border-b border-sky-400/20 pb-4">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>Case Study Deep Dive</span>
        </h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Comprehensive Overview *
            </label>
            <textarea
              {...register("overview")}
              rows={4}
              placeholder="Describe what this project solves, how it works, and why it matters..."
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm leading-relaxed"
            />
            {errors.overview && <p className="text-xs text-rose-400">{errors.overview.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              System Architecture (Optional / Recommended)
            </label>
            <textarea
              {...register("architecture")}
              rows={3}
              placeholder="Explain system components, SSR/ISR strategy, API pipelines, or GPU shaders..."
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Database Schema & Security (Optional / Recommended)
            </label>
            <textarea
              {...register("databaseSchema")}
              rows={3}
              placeholder="Detail collections, relationships, indexing, and authentication checks..."
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all font-mono text-xs leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Arrays: Features, Tech Stack, Gallery */}
      <div className="cosmic-glass rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-ice-white flex items-center gap-2 border-b border-sky-400/20 pb-4">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span>Technologies, Highlights & Gallery</span>
        </h3>

        {/* Technologies List */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Technologies Used (Tags) *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
              placeholder="Add tech (e.g. Next.js 16, Cloud Firestore, Framer Motion)..."
              className="flex-grow px-4 py-2.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white text-sm focus:border-sky-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-5 py-2.5 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-400/40 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {technologies.map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-400/30 text-xs font-mono text-sky-300"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTech(idx)}
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Features / Highlights List */}
        <div className="space-y-3 pt-4 border-t border-sky-400/10">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Key Features & Engineering Highlights *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
              placeholder="Add highlight bullet point..."
              className="flex-grow px-4 py-2.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white text-sm focus:border-sky-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
          <ul className="space-y-2 pt-2">
            {features.map((feat, idx) => (
              <li
                key={`${feat}-${idx}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-sky-400/15 text-sm text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span>{feat}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery URLs / Local Screenshot Upload */}
        <div className="space-y-3 pt-4 border-t border-sky-400/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Gallery Screenshots (Upload SS from Laptop or Paste URLs)
            </label>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/40 text-xs font-bold transition-all">
              {uploadingGallery ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
              ) : (
                <FolderUp className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span>{uploadingGallery ? "Processing SS..." : "📁 Upload Multiple SS from Laptop"}</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryFilesChange}
                disabled={uploadingGallery}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGallery(); } }}
              placeholder="Or paste screenshot URL here..."
              className="flex-grow px-4 py-2.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white text-sm focus:border-sky-400 focus:outline-none font-mono"
            />
            <button
              type="button"
              onClick={addGallery}
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-400/40 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add URL
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {galleryUrls.map((url, idx) => (
              <div key={`${url}-${idx}`} className="relative h-24 rounded-xl overflow-hidden border border-sky-400/30 group bg-black/40">
                <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGallery(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-500 text-white opacity-80 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* External Links & Visibility */}
      <div className="cosmic-glass rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-ice-white flex items-center gap-2 border-b border-sky-400/20 pb-4">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <span>Links & Visibility Controls</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              GitHub Repository URL
            </label>
            <input
              {...register("githubUrl")}
              placeholder="https://github.com/yuuunivers/..."
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Live Demo URL
            </label>
            <input
              {...register("liveDemoUrl")}
              placeholder="https://your-demo-url.vercel.app"
              className="w-full px-4 py-3 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm"
            />
          </div>

          {/* Toggle switches */}
          <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-sky-400/10">
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl bg-white/[0.03] border border-sky-400/25 flex-grow w-full">
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-5 h-5 accent-sky-400 rounded"
                  />
                )}
              />
              <div>
                <span className="text-sm font-bold text-ice-white block">Featured Case Study</span>
                <span className="text-xs text-slate-400">Showcase this project prominently on the Home Universe Hero section.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl bg-white/[0.03] border border-sky-400/25 flex-grow w-full">
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-5 h-5 accent-emerald-400 rounded"
                  />
                )}
              />
              <div>
                <span className="text-sm font-bold text-ice-white block">Published Status</span>
                <span className="text-xs text-slate-400">Make visible to public visitors in Project Catalog.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl cosmic-glass border border-sky-400/30 text-slate-300 hover:text-white font-semibold text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? "Saving Case Study..." : "Save to Cloud Firestore"}</span>
        </button>
      </div>
    </form>
  );
}
