// src/app/listener/page.tsx
import Link from "next/link";
import ListenerJoinForm from "@/components/ListenerJoinForm";

export const metadata = {
  title: "Listener | FreqCast",
};

export default function ListenerPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-black text-white">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold">Listener</h1>
        <p className="mt-2 text-zinc-400">
          Enter a creator’s frequency to tune in. We’ll add the actual player and
          streaming logic in a later step.
        </p>

        <ListenerJoinForm />

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