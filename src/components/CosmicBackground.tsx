"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#0B0608]">
      {/* Deep Space Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(244, 63, 94, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 63, 94, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Primary Rose Velvet Glow Orb - Top Left */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent blur-[120px] opacity-80"
      />

      {/* Secondary Ruby Glow Orb - Bottom Right */}
      <motion.div
        animate={{
          x: [0, -90, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[45%] -right-[15%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-tl from-red-500/20 via-rose-600/10 to-transparent blur-[140px] opacity-75"
      />

      {/* Tertiary Burgundy Wine Orb - Center */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 60, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-rose-500/15 blur-[100px]"
      />

      {/* Floating Starlight Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-400"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 17 + 11) % 95}%`,
              left: `${(i * 29 + 7) % 95}%`,
            }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 4) * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}
