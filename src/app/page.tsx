"use client";
import React from "react";


export default function Home() {
  return (
    
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight"><b>FreqCast</b></h1>
        <p className="mt-4 text-lg text-gray-300">
          Creators broadcast audio. Listeners tune in by frequency.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500 transition"
            onClick={() => alert("We’ll hook this up next!")}
          >
            Get Started
          </button>
          <button
            className="rounded-lg border border-white/20 px-5 py-3 font-medium hover:bg-white/10 transition"
            onClick={() => alert("More coming soon 😎")}
          >
            Learn More
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Next: we’ll add Creator/Listener flows and Aceternity UI polish.
        </p>
      </section>
    </main>
  );
}