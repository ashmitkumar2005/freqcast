"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandableLogo({ size = 100 }: { size?: number }) {
  const effectiveSize = Math.round(size * 0.8);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spring = { type: "spring" as const, stiffness: 120, damping: 20 };

  const baseGlow =
    "0 0 0 1px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.25)";
  const hoverGlow =
    "0 0 0 1px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)";

  const logoSlotSize = effectiveSize + 10;

  return (
    <motion.div
      ref={containerRef}
      aria-label="FreqCast"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center"
    >
      {/* Top pill (always visible) */}
      <motion.div
        className="flex items-center justify-center rounded-full border border-gray-400/40 text-white drop-shadow-[0_0_15px_#ffffff80] backdrop-blur-md bg-white/10 cursor-pointer select-none"
        initial={false}
        animate={{
          boxShadow: hovered ? hoverGlow : baseGlow,
          borderColor: hovered
            ? "rgba(255,255,255,0.6)"
            : "rgba(82,82,82,1)",
        }}
        transition={spring}
        style={{
          width: 260, // fixed longer pill
          height: 65,
          background: "rgba(255,255,255,0.08)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <div className="flex items-center gap-3 px-4">
          <Image
            src="/logo.png"
            alt="FreqCast"
            width={logoSlotSize}
            height={logoSlotSize}
            className="rounded-full"
          />
          <span className="text-lg font-semibold tracking-wide">FreqCast</span>
        </div>
      </motion.div>

      {/* Downward expanding section on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 10, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-3 w-[260px] rounded-2xl border border-gray-400/30 bg-white/5 backdrop-blur-lg text-gray-300 text-sm p-3 text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Explore, broadcast, and let the world tune in.  
            <br />Your space to create and connect 🎧
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
