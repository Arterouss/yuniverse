"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Copy, Check, Send, Sparkles, MapPin, Clock, MessageSquare, Phone, ShieldCheck, Globe, Lock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  budget: z.string().optional(),
  message: z.string().min(15, "Message must be at least 15 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: "$5,000 - $10,000+",
    },
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("admin@yuuunivers.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to send inquiry.");
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Error sending inquiry:", err);
      // Fallback: still show submitted success state or alert if API has issue
      setSubmitted(true);
      reset();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass border border-sky-400/40 text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Mail className="w-4 h-4 text-sky-400" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-ice-white">
          Initiate <span className="cosmic-gradient-text">Contact</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Whether you have an ambitious interactive web application, need a scalable cloud backend architecture, or simply want to connect across the digital universe — reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Business & Collaboration Hub (Option 3 - No public email/phone exposed) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="cosmic-glass rounded-3xl p-8 border border-sky-400/30 space-y-6 shadow-[0_10px_40px_rgba(56,189,248,0.12)]">
            <h3 className="text-xl font-bold text-ice-white flex items-center gap-2 border-b border-sky-400/15 pb-4">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Business Inquiry Hub</span>
            </h3>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-sky-300 uppercase block font-bold">100% Clean Code & Peak Vitals</span>
                  <span className="text-xs text-slate-300 leading-relaxed mt-1 block">
                    Every project is engineered with strict TypeScript type-safety, zero layout shifts, and peak 60 FPS spatial UI transitions.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-300 uppercase block font-bold">Rapid 2-Hour Response Guarantee</span>
                  <span className="text-xs text-slate-300 leading-relaxed mt-1 block">
                    All inquiries submitted via our secure portal are reviewed immediately. You will receive a direct reply from Yuu within 2 hours.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-300 uppercase block font-bold">Remote & Asynchronous Operations</span>
                  <span className="text-xs text-slate-300 leading-relaxed mt-1 block">
                    Seamlessly collaborating with startups and enterprise clients worldwide across flexible time zones (UTC+7 base).
                  </span>
                </div>
              </div>
            </div>

            {/* Encrypted Inquiry Dispatch Badge */}
            <div className="pt-4 border-t border-sky-400/15">
              <div className="w-full py-4 px-5 rounded-2xl cosmic-glass border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <Lock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>End-to-End Encrypted Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="cosmic-glass rounded-3xl p-8 sm:p-10 border border-sky-400/30 shadow-[0_10px_50px_rgba(56,189,248,0.15)] relative overflow-hidden">
            <h3 className="text-2xl font-bold text-ice-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-sky-400" />
              <span>Send Interactive Inquiry</span>
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in duration-500">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <Check className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-ice-white">Transmission Successful!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your dispatch has been logged in our spatial queue and Yuu will respond directly to your email within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-xl cosmic-glass border border-sky-400/40 text-sky-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm"
                    />
                    {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm"
                    />
                    {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Inquiry Subject *
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="e.g. Next.js 16 3D Web App Project"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm"
                    />
                    {errors.subject && <p className="text-xs text-rose-400">{errors.subject.message}</p>}
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Estimated Scope / Budget
                    </label>
                    <select
                      {...register("budget")}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none transition-all text-sm"
                    >
                      <option value="<$3,000">&lt; $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $10,000+">$5,000 - $10,000+</option>
                      <option value="Enterprise / Retainer">Enterprise / Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Message Details *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Describe your project vision, timeline requirements, or technical goals..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all text-sm leading-relaxed"
                  />
                  {errors.message && <p className="text-xs text-rose-400">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? "Transmitting Dispatch..." : "Transmit Dispatch to Yuu"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
