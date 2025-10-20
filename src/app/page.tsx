"use client";
import React from "react";
import { TailwindConnectButton } from "@/components/ui/tailwindcss-buttons";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";


export default function Home() {
  return (
    
  <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight"><b>FreqCast</b></h1>
        <p className="mt-4 text-lg text-gray-300">
          Creators broadcast audio. Listeners tune in by frequency.
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
          <button
            className="w-full max-w-[576px] shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
            onClick={() => alert("Tune in — Listener flow coming soon!")}
          >
            Tune in
          </button>
        </div>

        
      </section>
    </main>
  );
}