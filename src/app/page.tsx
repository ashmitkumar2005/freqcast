"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  const [animate, setAnimate] = useState(false);
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
    // Begin staggered fade of content and start script lines.
    setEggStage("fade");
    // soft audio start
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => {});
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
      className="relative min-h-screen bg-black text-white"
      style={{
        backgroundImage: "url(/homback.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* background audio (optional; ignored if file missing) */}
      <audio ref={audioRef} src="/egg-ambience.mp3" preload="none" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/40 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl" />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-10 text-center">
        {/* FreqCast Text with subtle premium gradient (no cursor reactivity) */}
        <motion.div
          className="inline-block group"
          initial={false}
          animate={{ opacity: eggStage === "fade" ? 0 : 1, filter: eggStage === "fade" ? "blur(8px)" : "blur(0px)" }}
          transition={{ duration: eggStage === "fade" ? 1.4 : 0.5, ease: "easeInOut", delay: eggStage === "fade" ? 0.0 : 0 }}
        >
          <h1
            className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent bg-left bg-[length:200%_100%] transition-[background-position] duration-700 ease-out group-hover:bg-right transform-gpu transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 will-change-transform cursor-pointer select-none"
            style={{
              transform: `scale(${animate ? 1 : 1.12})`,
              opacity: animate ? 1 : 0,
            }}
            onClick={startEasterEgg}
            role="button"
            aria-label="Open surprise"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") startEasterEgg();
            }}
          >
            <b>FreqCast</b>
          </h1>
          <div className="mx-auto mt-2 h-px w-0 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3/4" />
        </motion.div>

        {/* Stagger fade-out of the rest, one by one */}
        <div className="mt-6 space-y-10">
          <motion.p
            className="mt-4 text-lg text-gray-300"
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 0.4 : 0 }}
          >
            Creators
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4"
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 1.0 : 0 }}
          >
            <TextHoverEffect text="VIBE" />
          </motion.div>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4"
            initial={false}
            animate={{ opacity: eggStage === "fade" ? 0 : 1, y: eggStage === "fade" ? 6 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: eggStage === "fade" ? 1.6 : 0 }}
          >
            <HoverBorderGradient
              containerClassName="rounded-full border border-gray-400"
              as="button"
              className="bg-black text-white"
            >
              Get Started
            </HoverBorderGradient>
          </motion.div>
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
    </main>
  );
}
