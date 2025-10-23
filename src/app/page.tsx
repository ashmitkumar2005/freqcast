"use client";

import React, { useEffect, useState, useRef } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const maxRadius = 150; // pixels, fixed repulsion range
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setAnimate(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxRadius) {
        setOffset({ x: 0, y: 0 }); // outside range → no motion
      } else {
        const factor = (maxRadius - distance) / maxRadius; // inside range → proportional
        setOffset({
          x: -dx * 0.3 * factor,
          y: -dy * 0.3 * factor,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 py-10 text-center">
        {/* FreqCast Text with Zoom-Out + Fixed Range Repel */}
        <h1
          ref={textRef}
          className="text-5xl font-extrabold tracking-tight transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${animate ? 1 : 1.2}) translate(${offset.x}px, ${offset.y}px)`,
            opacity: animate ? 1 : 0,
          }}
        >
          <b>FreqCast</b>
        </h1>

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
