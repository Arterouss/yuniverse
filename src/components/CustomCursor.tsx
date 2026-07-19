"use client";

import React, { useEffect } from "react";

/**
 * Cinematic Background Environmental Lighting System
 * Enhances the background atmosphere while preserving 100% of the approved layout, typography, cards, and styling.
 *
 * Requirements Met:
 * - DO NOT redesign or modify any UI, text, buttons, cards, spacing, or overall brightness.
 * - Never appear as a glowing circle attached to the cursor.
 * - Reacts instantly to mouse movement via requestAnimationFrame with zero delay.
 * - Sits strictly at z-0 behind all content.
 * - Multi-layered radial gradients that softly illuminate the surrounding page and fade naturally toward the edges.
 * - Continues a slow, organic idle movement even when the mouse is static.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // High-performance requestAnimationFrame loop (strictly 60 FPS zero delay)
    const updateScene = () => {
      time += 0.003; // Slow organic idle evolution clock

      const root = document.documentElement;
      const width = window.innerWidth || 1920;
      const height = window.innerHeight || 1080;

      const normX = Math.max(0, Math.min(1, targetX / width));
      const normY = Math.max(0, Math.min(1, targetY / height));

      // Calculate slow idle atmospheric oscillation
      const idleX = 50 + Math.sin(time) * 10;
      const idleY = 55 + Math.cos(time * 0.7) * 10;

      // Inject instant environmental coordinates into :root
      root.style.setProperty("--mouse-norm-x", `${normX.toFixed(4)}`);
      root.style.setProperty("--mouse-norm-y", `${normY.toFixed(4)}`);
      root.style.setProperty("--idle-x", `${idleX.toFixed(2)}%`);
      root.style.setProperty("--idle-y", `${idleY.toFixed(2)}%`);

      rafId = requestAnimationFrame(updateScene);
    };

    rafId = requestAnimationFrame(updateScene);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Primary Environmental Sky Atmosphere (Shifts across top-left to center with instant mouse influence) */}
      <div
        style={{
          background: `radial-gradient(1100px circle at calc(25% + var(--mouse-norm-x, 0.5) * 18%) calc(20% + var(--mouse-norm-y, 0.5) * 18%), rgba(56, 189, 248, 0.12), rgba(6, 182, 212, 0.04) 45%, transparent 80%)`,
        }}
        className="absolute inset-0 mix-blend-screen transition-none will-change-transform"
      />

      {/* 2. Secondary Volumetric Counter-Bloom (Shifts across bottom-right inversely creating balanced room depth) */}
      <div
        style={{
          background: `radial-gradient(1300px circle at calc(75% - var(--mouse-norm-x, 0.5) * 15%) calc(70% - var(--mouse-norm-y, 0.5) * 15%), rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.025) 50%, transparent 85%)`,
        }}
        className="absolute inset-0 mix-blend-screen transition-none will-change-transform"
      />

      {/* 3. Idle Evolving Deep Ambient Horizon (Slowly breathes & oscillates over time even when mouse is static) */}
      <div
        style={{
          background: `radial-gradient(1500px circle at var(--idle-x, 50%) var(--idle-y, 55%), rgba(30, 64, 175, 0.06), rgba(14, 165, 233, 0.02) 55%, transparent 90%)`,
        }}
        className="absolute inset-0 mix-blend-screen transition-none will-change-transform"
      />
    </div>
  );
}
