"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const [eggOpen, setEggOpen] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url(/homback.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/40 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl" />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-10 text-center">
        {/* FreqCast Text with subtle premium gradient (no cursor reactivity) */}
        <div className="inline-block group">
          <h1
            className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent bg-left bg-[length:200%_100%] transition-[background-position] duration-700 ease-out group-hover:bg-right transform-gpu transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 will-change-transform cursor-pointer select-none"
            style={{
              transform: `scale(${animate ? 1 : 1.12})`,
              opacity: animate ? 1 : 0,
            }}
            onClick={() => setEggOpen(true)}
            role="button"
            aria-label="Open surprise"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setEggOpen(true);
            }}
          >
            <b>FreqCast</b>
          </h1>
          <div className="mx-auto mt-2 h-px w-0 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3/4" />
        </div>

        <AnimatePresence>
          {eggOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEggOpen(false)}
              />
              <motion.div
                className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.9, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, y: 6, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.6 }}
              >
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">🎧</div>
                <h2 className="text-xl font-semibold">Thanks for exploring FreqCast</h2>
                <p className="mt-2 text-sm text-zinc-300">You found a little easter egg. Have a great day!</p>
                <button
                  onClick={() => setEggOpen(false)}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-4 text-lg text-gray-300">Creators</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <TextHoverEffect text="VIBE" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <HoverBorderGradient
            containerClassName="rounded-full border border-gray-400"
            as="button"
            className="w-full max-w-[300px] bg-transparent text-white flex items-center justify-center px-4 py-2"
            onClick={() =>
              alert("Cast Your Vibe — Creator flow coming soon!")
            }
          >
            <span className="uppercase tracking-widest font-bold">
              CAST YOUR VIBE
            </span>
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-full border border-gray-400"
            as="button"
            className="w-full max-w-[300px] bg-transparent text-white flex items-center justify-center px-4 py-2"
            onClick={() =>
              alert("Tune in — Listener flow coming soon!")
            }
          >
            <span className="uppercase tracking-widest font-bold">
              TUNE IN
            </span>
          </HoverBorderGradient>
        </div>
      </section>
    </main>
  );
}
