// src/components/ListenerJoinForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ListenerJoinForm() {
  const [freq, setFreq] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!freq.trim()) {
      alert("Please enter a frequency");
      return;
    }
    // For now we just keep you on the same page with a query param.
    // Later, we’ll route to a live player page.
    router.push(`/listener?freq=${encodeURIComponent(freq)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
      <input
        value={freq}
        onChange={(e) => setFreq(e.target.value)}
        placeholder="Enter frequency (e.g., 104.5 or 824391)"
        className="w-full rounded-xl border border-zinc-800 bg-transparent px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-600"
      />
      <button
        type="submit"
        className="rounded-xl border border-zinc-800 px-5 py-3 text-sm transition hover:bg-zinc-900"
      >
        Join
      </button>
    </form>
  );
}