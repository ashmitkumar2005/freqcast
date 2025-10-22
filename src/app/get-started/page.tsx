// src/app/get-started/page.tsx
import Link from "next/link";
import PillOption from "@/components/PillOption";


export const metadata = {
  title: "Get Started | FreqCast",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-black text-white">
      <section className="mx-auto max-w-5xl px-4 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-semibold text-center">
          Choose your role
        </h1>
        <p className="mt-3 text-center text-zinc-400">
          You can switch anytime.
        </p>
        
       <div className="flex items-center justify-center min-h-screen ">
      {/* Pill vertically expandable */}
      <PillOption size={100} />
        </div>


        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/creator"
            className="group rounded-2xl border border-zinc-800 p-8 transition hover:border-zinc-600 hover:bg-zinc-900/40"
          >
            <div className="text-xs tracking-widest uppercase text-zinc-400">
              For broadcasters
            </div>
            <div className="mt-2 text-2xl font-medium">I’m a Creator</div>
            <p className="mt-2 text-zinc-400">
              You’ll get a unique frequency and controls to upload audio or go live.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm">
              Go to Creator
            </div>
          </Link>

          <Link
            href="/listener"
            className="group rounded-2xl border border-zinc-800 p-8 transition hover:border-zinc-600 hover:bg-zinc-900/40"
          >
            <div className="text-xs tracking-widest uppercase text-zinc-400">
              For listeners
            </div>
            <div className="mt-2 text-2xl font-medium">I’m a Listener</div>
            <p className="mt-2 text-zinc-400">
              Enter a creator’s frequency to tune in to their cast.
            </p>
            <div className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm">
              Go to Listener
            </div>
          </Link>
        </div>
        <div></div>

        <p className="mt-12 text-center text-sm text-zinc-500">
          Tip: Bookmark your role page for quick access.
        </p>
      </section>
    </main>
  );
}