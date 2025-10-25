// src/app/get-started/page.tsx
import Link from "next/link";
import BackgroundFade from "@/components/BackgroundFade";

export const metadata = {
    title: "Get Started | FreqCast",
};

export default function GetStartedPage() {
    return (
        <main className="relative min-h-[calc(100vh-64px)] bg-black text-white overflow-hidden">
            {/* Gradient background (fixed, under navbar) */}
            <BackgroundFade
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `radial-gradient(1200px 800px at 20% 20%, rgba(139,92,246,0.28), transparent 60%),
                                      radial-gradient(1000px 900px at 80% 30%, rgba(56,189,248,0.24), transparent 60%),
                                      radial-gradient(900px 700px at 50% 80%, rgba(16,185,129,0.22), transparent 60%),
                                      linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.75))`,
                }}
            />
            <section className="relative z-10 mx-auto max-w-5xl px-4 py-10 md:py-10">
                <h1 className="text-4xl md:text-6xl font-semibold text-center py-1">
                    Choose your role
                </h1>
                <p className="mt-3 text-center text-zinc-400">
                    You can switch anytime.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Creator Card */}
                    <Link
                        href="/creator"
                        className="group rounded-2xl border border-zinc-800 p-8 transition transform duration-300 hover:border-zinc-400 hover:bg-zinc-900/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(132,204,22,0.6)] backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl bg-transparent"
                    >
                        <div className="text-xs tracking-widest uppercase text-zinc-400">
                            For broadcasters
                        </div>
                        <div className="mt-2 text-2xl font-medium">I’m a Creator</div>
                        <p className="mt-2 text-zinc-400">
                            As a Vibing Jockey, get your Unique Frequency to Cast your Vibe
                        </p>
                        <div className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm
                            transition transform duration-200 hover:scale-110 hover:bg-zinc-800 hover:border-zinc-500"
                        >
                            Hop on as Vibe Jockey
                        </div>
                    </Link>

                    {/* Listener Card */}
                    <Link
                        href="/listener"
                        className="group rounded-2xl border border-zinc-800 p-8 transition transform duration-300 hover:border-zinc-400 hover:bg-zinc-900/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.6)] backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl bg-transparent"
                    >
                        <div className="text-xs tracking-widest uppercase text-zinc-400">
                            For listeners
                        </div>
                        <div className="mt-2 text-2xl font-medium">I’m a Listener</div>
                        <p className="mt-2 text-zinc-400">
                            Enter a VJ&apos;s Frequency to Tune IN to their Cast
                        </p>
                        <div className="mt-6 inline-flex items-center rounded-full border border-zinc-700 px-4 py-2 text-sm
                            transition transform duration-200 hover:scale-110 hover:bg-zinc-800 hover:border-zinc-500"
                        >
                            Tune in to the Vibe
                        </div>
                    </Link>
                </div>

                <p className="mt-12 text-center text-sm text-zinc-500">
                    Tip: Bookmark your role page for quick access.
                </p>
            </section>
        </main>
    );
}
