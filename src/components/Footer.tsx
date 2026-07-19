"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowUp, Heart, Terminal } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080A0F] border-t border-sky-400/20 pt-16 pb-12 overflow-hidden shadow-[0_-10px_30px_rgba(56,189,248,0.05)]">
      {/* Background Cosmic Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-gradient-to-r from-sky-500/10 via-cyan-500/15 to-blue-600/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                <div className="w-full h-full bg-[#080A0F] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="cosmic-gradient-text font-black tracking-tight text-xl">
                YuuUnivers
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A Digital Universe of My Work. Built from scratch with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Cloud Firestore.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Arterouss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl cosmic-glass flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-400/50 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/bayu-anggara-715b813b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl cosmic-glass flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-400/50 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl cosmic-glass flex items-center justify-center text-slate-500 opacity-40 cursor-not-allowed border-transparent transition-all"
                aria-label="Twitter (Coming Soon)"
                title="Coming Soon"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="w-10 h-10 rounded-xl cosmic-glass flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-400/50 transition-all shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                aria-label="Email Contact Portal"
                title="Send Inquiry to Private Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ice-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Cosmic Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Home Universe
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Skills Matrix & Bio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-sky-400 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal & System */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ice-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Admin & System
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors"
                >
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Admin CMS Portal</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="text-slate-400 hover:text-sky-400 transition-colors"
                >
                  CMS Dashboard
                </Link>
              </li>
              <li className="text-xs text-slate-500 font-mono pt-2">
                Status: <span className="text-emerald-400 font-semibold">● 100% Online</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-400/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            © {new Date().getFullYear()} YuuUnivers. Crafted with <Heart className="w-3.5 h-3.5 text-sky-400 inline fill-sky-400" /> for the digital frontier.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl cosmic-glass text-xs font-semibold text-sky-300 hover:text-white border border-sky-400/30 hover:border-sky-400 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
          >
            <span>Back to Orbit</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
