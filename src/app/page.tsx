"use client";
import React from "react";
//import { TailwindConnectButton } from "@/components/ui/tailwindcss-buttons";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";


export default function Home() {
  return (

    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight"><b>FreqCast</b></h1>
        <p className="mt-4 text-lg text-gray-300">
          Creators VIBE & Listeners Tune IN
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <HoverBorderGradient
            containerClassName="rounded-full border border-gray-400"
            as="button"
            className="w-full max-w-[300px] bg-transparent text-white flex items-center justify-center px-4 py-2"
            onClick={() => alert("Cast Your Vibe — Creator flow coming soon!")}
          >
            <span className="uppercase tracking-widest font-bold">CAST YOUR VIBE</span>
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-full border border-gray-400"
            as="button"
            className="w-full max-w-[300px] bg-transparent text-white flex items-center justify-center px-4 py-2"
            onClick={() => alert("Tune in — Listener flow coming soon!")}
          >
            <span className="uppercase tracking-widest font-bold">TUNE IN</span>
          </HoverBorderGradient>
        </div>


      </section>
    </main>
  );
}