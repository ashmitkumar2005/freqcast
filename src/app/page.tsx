"use client";
import React from "react";
import { TailwindConnectButton } from "@/components/ui/tailwindcss-buttons";


export default function Home() {
  return (
    
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight"><b>FreqCast</b></h1>
        <p className="mt-4 text-lg text-gray-300">
          Creators broadcast audio. Listeners tune in by frequency.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <TailwindConnectButton
            className="w-[300px]"
            iconSize={48}
            onClick={() => alert("Cast Your Vibe — Creator flow coming soon!")}
          >
            Cast Your Vibe
          </TailwindConnectButton>
          <button
            className="w-48 rounded-lg border border-white/20 px-5 py-3 font-medium hover:bg-white/10 transition"
            onClick={() => alert("Tune in — Listener flow coming soon!")}
          >
            Tune in
          </button>
        </div>

        
      </section>
    </main>
  );
}