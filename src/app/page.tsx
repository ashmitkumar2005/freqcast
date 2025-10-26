"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import FadeIn from "@/components/FadeIn";
import localFont from "next/font/local";

const viola = localFont({ src: "./fonts/VIOLA.ttf", weight: "400", style: "normal" });
const casanova = localFont({ src: "./fonts/Casanova.ttf", weight: "400", style: "normal" });
const ailerons = localFont({ src: "./fonts/Ailerons-Typeface.otf", weight: "400", style: "normal" });
const axuno = localFont({ src: "./fonts/AxunoDemo-Regular-BF68fb7b9e28f8c.otf", weight: "400", style: "normal", display: "block", variable: "--font-axuno" });

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const [mx, setMx] = useState(50); // cursor x in % of viewport
  const [my, setMy] = useState(50); // cursor y in % of viewport
  const [eggStage, setEggStage] = useState<"idle" | "fade" | "chaos" | "script" | "cta" | "reward">("idle");
  const [redeemed, setRedeemed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lines = useMemo(
    () => [
      "Oh… you actually clicked me. 👀",
      "Why would you do that? 😐",
      "I trusted you… 😔",
      "But maybe… this was meant to happen. 😈",
      "You’ve changed everything now. ⚡",
      "Congratulations… You broke your Easter Egg. 💥🥚",
    ],
    []
  );
  const [lineIndex, setLineIndex] = useState<number>(-1);

  useEffect(() => {
    setAnimate(true);
    try {
      const v = localStorage.getItem("freqcast_egg_redeemed");
      if (v === "1") setRedeemed(true);
    } catch {}
  }, []);

  // Emoji set for chaos
  const chaosEmojis = useMemo(() => ["🎧", "🎵", "✨", "😈", "🥚", "🔥", "💥", "💫", "🎶", "⚡"], []);
  const bubbles = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: chaosEmojis[i % chaosEmojis.length],
      size: 24 + Math.floor(Math.random() * 28),
      xStart: Math.random() * 90, // vw
      yStart: Math.random() * 80, // vh
      dx: (Math.random() * 2 - 1) * 30, // delta vw-ish
      dy: (Math.random() * 2 - 1) * 20, // delta vh-ish
      dur: 3 + Math.random() * 3,
      delay: Math.random() * 1.5,
    })),
  [chaosEmojis]);

  const startEasterEgg = () => {
    if (eggStage !== "idle") return;
    // Begin fade and branch flow based on redeemed state
    setEggStage("fade");
    // soft audio start
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => {});
    }

    if (redeemed) {
      // Skip script. Go straight to chaos + CTA.
      setTimeout(() => {
        setEggStage("chaos");
        setTimeout(() => setEggStage("cta"), 900);
      }, 1200);
      return;
    }

    // drive one-line-at-a-time sequence
    const per = 4200; // ms per line window (slow, readable, cinematic)
    setLineIndex(0);
    // show script overlay flag
    setEggStage("script");
    lines.forEach((_, i) => {
      setTimeout(() => setLineIndex(i), i * per);
    });
    // advance to CTA after final line window
    setTimeout(() => setEggStage("cta"), lines.length * per + 1000);
  };

  useEffect(() => {
    if (eggStage === "idle") {
      setLineIndex(-1);
    }
  }, [eggStage]);

  return (
    <main
      className="relative min-h-screen bg-transparent text-white overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMx(x);
        setMy(y);
      }}
    >
      {/* Animated professional gradient background layer */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
                            radial-gradient(1200px 800px at ${20 + (mx - 50) * 0.06}% ${20 + (my - 50) * 0.04}%, rgba(139,92,246,0.56), transparent 60%),
                            radial-gradient(1000px 900px at ${80 - (mx - 50) * 0.06}% ${30 - (my - 50) * 0.04}%, rgba(56,189,248,0.50), transparent 60%),
                            radial-gradient(900px 700px at ${50 + (mx - 50) * 0.03}% ${80 + (my - 50) * 0.02}%, rgba(16,185,129,0.42), transparent 60%),
                            /* Added accents around hero header (top-center), stronger cursor response */
                            radial-gradient(700px 500px at ${50 + (mx - 50) * 0.10}% ${22 + (my - 50) * 0.08}%, rgba(244,114,182,0.40), transparent 65%),
                            radial-gradient(600px 420px at ${60 + (mx - 50) * 0.10}% ${18 + (my - 50) * 0.08}%, rgba(251,191,36,0.30), transparent 65%),
                            linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.18))`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {/* background audio (optional; ignored if file missing) */}
      <audio ref={audioRef} src="/egg-ambience.mp3" preload="none" />
      {/* Removed photo blur overlay for a cleaner gradient presentation */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-10 text-center mt-[24px]">
        {/* FreqCast Text with subtle premium gradient (no cursor reactivity) */}
        <motion.div
          className="inline-block group relative"
          initial={false}
          animate={{ opacity: eggStage === "fade" ? 0 : 1, filter: eggStage === "fade" ? "blur(8px)" : "blur(0px)" }}
          transition={{ duration: eggStage === "fade" ? 1.4 : 0.5, ease: "easeInOut", delay: eggStage === "fade" ? 0.0 : 0 }}
        >
          {/* Soft radial glow behind title */}
          <motion.div
            className="pointer-events-none absolute -inset-x-24 -top-28 mx-auto left-1/2 -translate-x-1/2 h-64 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.16), rgba(56,189,248,0.10), rgba(16,185,129,0.06), transparent 70%)",
            }}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 0.45, scale: [0.98, 1.04, 0.98], rotate: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
          <FadeIn delay={0.1}>
          <motion.h1
            className={`${viola.className} text-5xl md:text-6xl font-normal tracking-tight text-white transform-gpu transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 will-change-transform cursor-pointer select-none`}
            style={{
              transform: `scale(${animate ? 1 : 1.12})`,
              opacity: animate ? 1 : 0,
              textShadow: "0 1px 1px rgba(0,0,0,0.28), 0 4px 14px rgba(0,0,0,0.25), 0 10px 26px rgba(0,0,0,0.18)",
            }}
            onClick={startEasterEgg}
            role="button"
            aria-label="Open surprise"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") startEasterEgg();
            }}
          >
            <span>FreqCast</span>
          </motion.h1>
          </FadeIn>
          {/* Bottom, outer shadow under the title for visibility on bright backgrounds */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-full mt-2 h-6 w-3/4 -translate-x-1/2 rounded-[999px]"
            style={{
              background: "radial-gradient(closest-side, rgba(0,0,0,0.35), rgba(0,0,0,0.18), transparent 70%)",
              filter: "blur(12px)",
            }}
            initial={{ opacity: 0.45, scaleX: 0.98 }}
            animate={{ opacity: [0.45, 0.6, 0.45], scaleX: [0.98, 1.02, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="mx-auto mt-2 h-px w-0 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3/4" />
        </motion.div>

        {/* Stagger fade-out of the rest, one by one */}
        <div className="mt-6 space-y-10">
          <FadeIn delay={0.2}>
          <motion.p
            className={`${ailerons.className} mt-[10px] text-2xl md:text-3xl text-black font-bold tracking-wide`}
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 0.4 : 0 }}
          >
            The Creators
          </motion.p>
          </FadeIn>
          <FadeIn delay={0.35}>
          <motion.div
            className="mt-5 flex flex-col items-center justify-center gap-4"
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 1.0 : 0 }}
          >
            <TextHoverEffect text="VIBE" className={`${axuno.variable}`} />
          </motion.div>
          </FadeIn>
          <FadeIn delay={0.5}>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-5"
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 1.6 : 0 }}
          >
            <div className="flex flex-col items-center gap-3">
              <HoverBorderGradient
                containerClassName="rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition"
                as="button"
                className="w-full max-w-[360px] bg-transparent text-white flex items-center justify-center px-6 py-3 text-sm tracking-widest font-semibold uppercase transition transform hover:scale-[1.04]"
                onClick={() => alert("Cast Your Vibe — Creator flow coming soon!")}
              >
                <span className="uppercase tracking-widest font-bold">CAST YOUR VIBE</span>
              </HoverBorderGradient>

              <HoverBorderGradient
                containerClassName="rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition"
                as="button"
                className="w-full max-w-[360px] bg-transparent text-white flex items-center justify-center px-6 py-3 text-sm tracking-widest font-semibold uppercase transition transform hover:scale-[1.04]"
                onClick={() => alert("Tune in — Listener flow coming soon!")}
              >
                <span className="uppercase tracking-widest font-bold">TUNE IN</span>
              </HoverBorderGradient>
            </div>
          </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Fullscreen Easter Egg Overlay */}
      <AnimatePresence>
        {eggStage !== "idle" && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark or animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: eggStage === "fade" ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Chaos emojis (not shown during script per request) */}
            {(eggStage === "chaos" || eggStage === "cta" || eggStage === "reward") && (
              <div className="absolute inset-0 overflow-hidden">
                {bubbles.map((b) => (
                  <motion.div
                    key={b.id}
                    className="absolute select-none"
                    style={{ left: `${b.xStart}vw`, top: `${b.yStart}vh`, fontSize: b.size, filter: "drop-shadow(0 0 8px rgba(255,255,255,0.25))" }}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ x: [0, b.dx, -b.dx, 0], y: [0, b.dy, -b.dy, 0], opacity: [0, 1, 1, 1] }}
                    transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                  >
                    {b.emoji}
                  </motion.div>
                ))}
              </div>
            )}

            {/* One-line-at-a-time script center */}
            {eggStage === "script" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {lineIndex >= 0 && (
                    <motion.p
                      key={lineIndex}
                      className="text-center text-xl md:text-2xl text-zinc-200 px-6"
                      style={{ textShadow: "0 2px 20px rgba(255,255,255,0.15)" }}
                      initial={{ opacity: 0, y: 12, scale: 0.982, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, scale: 0.984, filter: "blur(10px)" }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                    >
                      {lines[lineIndex]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* CTA Button */}
            {(eggStage === "cta" || eggStage === "reward") && (
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence>
                  {eggStage === "cta" && (
                    <motion.button
                      className="relative z-10 rounded-2xl px-6 py-3 text-black bg-white/90 hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.35)] transition focus:outline-none"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        setEggStage("reward");
                        try {
                          localStorage.setItem("freqcast_egg_redeemed", "1");
                          setRedeemed(true);
                        } catch {}
                      }}
                    >
                      {redeemed ? "Already Redeemed" : "Redeem Your Gift"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Thank You Card */}
            {eggStage === "reward" && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div className="absolute inset-0 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                <motion.div
                  className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 text-center text-white shadow-[0_0_40px_rgba(255,255,255,0.25)] backdrop-blur-xl"
                  initial={{ opacity: 0, scale: 0.9, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.7 }}
                >
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">💫</div>
                  <h3 className="text-2xl font-semibold">Thank You</h3>
                  <p className="mt-3 text-zinc-300">You found the hidden heartbeat of FreqCast. Thank you for being curious.</p>
                  <button
                    className="mt-6 rounded-xl border border-white/20 px-5 py-2 hover:bg-white/10"
                    onClick={() => setEggStage("idle")}
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      
    </main>
  );
}
