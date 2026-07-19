"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAdmin, router]);

  if (isAdmin) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="cosmic-glass rounded-3xl p-8 sm:p-10 border-2 border-sky-400/40 shadow-[0_0_50px_rgba(56,189,248,0.25)] space-y-8 relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-sky-400/30 to-transparent blur-2xl pointer-events-none" />

        <div className="text-center space-y-3 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 p-[1px] shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            <div className="w-full h-full bg-[#080A0F] rounded-[23px] flex items-center justify-center">
              <Terminal className="w-8 h-8 text-sky-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ice-white tracking-tight">
            Admin CMS Portal
          </h1>
          <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">
            Restricted Access • Secure Authentication
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-rose-300 flex items-start gap-3 text-xs leading-relaxed">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@yunivers.com"
              className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Secret Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full px-4 py-3.5 rounded-xl bg-[#080A0F]/90 border border-sky-400/30 text-ice-white text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{isLoggingIn ? "Authenticating..." : "Authorize Portal Entry"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-sky-400/15 text-center">
          <div className="text-[10px] text-slate-500">
            Protected by Firebase Authentication & Enforce SSL Token Session
          </div>
        </div>
      </div>
    </div>
  );
}
