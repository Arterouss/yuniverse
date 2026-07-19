"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { 
  ShieldCheck, LayoutDashboard, FolderGit2, PlusCircle, 
  LogOut, Sparkles, Terminal, ArrowLeft, ExternalLink 
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAdmin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAdmin, loading, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-sky-400" />
          </div>
          <p className="text-sm font-mono text-sky-400 uppercase tracking-widest">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const adminNav = [
    { name: "Dashboard Stats", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects Management", href: "/admin/projects", icon: FolderGit2 },
    { name: "Create New Case Study", href: "/admin/projects/new", icon: PlusCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Admin Bar */}
      <div className="cosmic-glass rounded-3xl p-4 sm:p-6 mb-8 border border-sky-400/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-ice-white">YuuUnivers CMS Portal</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase">
                Admin Session Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Real-time Cloud Firestore synchronization interface
            </p>
          </div>
        </div>

        {/* Admin Navigation Tabs & Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/admin/projects" && pathname?.startsWith("/admin/projects") && pathname !== "/admin/projects/new");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 text-[#080A0F] font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                    : "bg-white/[0.03] text-slate-300 hover:text-sky-300 border border-sky-400/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-white/[0.03] text-slate-300 hover:text-sky-400 border border-sky-400/20 transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Open Public Site in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden lg:inline">Live Site</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-400/30 text-rose-300 hover:bg-rose-500/25 hover:text-rose-200 text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="animate-in fade-in duration-300">{children}</div>
    </div>
  );
}
