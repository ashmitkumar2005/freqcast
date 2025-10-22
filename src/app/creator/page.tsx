// src/app/creator/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Creator | FreqCast",
};

export default function CreatorPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-black text-white">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold">Creator</h1>
        <p className="mt-2 text-zinc-400">
          In the next step, you’ll get a unique frequency and controls to upload audio
          or go live via microphone.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-xl border border-zinc-800 p-6">
            <div className="text-sm text-zinc-400">Your frequency</div>
            <div className="mt-1 text-2xl text-zinc-500">Not assigned yet</div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6 opacity-60">
            Upload audio (coming in Part 4)
          </div>
          <div className="rounded-xl border border-zinc-800 p-6 opacity-60">
            Go live with mic (coming in Part 4)
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/get-started" className="rounded-full border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Back
          </Link>
          <Link href="/" className="rounded-full border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}