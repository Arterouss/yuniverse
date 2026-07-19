"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ShieldCheck, Terminal, Rocket, User, Mail, FolderGit2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Universe", href: "/", icon: Rocket },
    { name: "Projects", href: "/projects", icon: FolderGit2 },
    { name: "Skills & Bio", href: "/about", icon: User },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#080A0F]/85 backdrop-blur-xl border-b border-sky-400/20 shadow-[0_4px_30px_rgba(56,189,248,0.12)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold tracking-wider"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#080A0F] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="cosmic-gradient-text font-black tracking-tight text-lg sm:text-xl">
              YuuUnivers
            </span>
            <span className="text-[10px] text-sky-400/80 font-mono tracking-widest uppercase">
              My Portofolio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full cosmic-glass-light border border-sky-400/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "text-slate-300 hover:text-sky-400 hover:bg-sky-400/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-400 animate-pulse" : "text-slate-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Admin CMS Link */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider overflow-hidden cosmic-glass border border-sky-400/30 text-sky-300 hover:text-white transition-all duration-300 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            {isAdmin ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>CMS Dashboard</span>
              </>
            ) : (
              <>
                <Terminal className="w-4 h-4 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Admin CMS</span>
              </>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className="p-2 rounded-xl cosmic-glass text-sky-400 border border-sky-400/30 text-xs"
            title="Admin CMS Portal"
          >
            {isAdmin ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Terminal className="w-5 h-5" />}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl cosmic-glass text-slate-200 hover:text-sky-400 border border-sky-400/30 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pb-6 pt-3 bg-[#080A0F]/95 backdrop-blur-2xl border-b border-sky-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "text-slate-300 hover:text-sky-400 hover:bg-sky-400/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-sky-400/10 mt-2">
              <Link
                href={isAdmin ? "/admin/dashboard" : "/admin/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider cosmic-glass border border-sky-400/40 text-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Enter CMS Dashboard</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-5 h-5 text-sky-400" />
                    <span>Admin CMS Portal Login</span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
