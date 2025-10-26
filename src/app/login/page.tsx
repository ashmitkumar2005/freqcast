"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import FadeIn from "@/components/FadeIn";

type Role = "creator" | "listener";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("creator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }
    setBusy(true);

    // Fake login flow for now
    setTimeout(() => {
      setBusy(false);

      // Where to send the user after “login”
      // If you already created /creator and /listener pages, this will work.
      // Otherwise change redirectTo to "/get-started" or "/".
      const redirectTo = role === "creator" ? "/creator" : "/listener";
      router.push(redirectTo);
    }, 600);
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] bg-transparent text-white overflow-hidden">
      {/* Gradient background layer (distinct type & palette vs Get Started) */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `
            conic-gradient(from 210deg at 50% 30%, rgba(255,180,80,0.35), rgba(236,72,153,0.35), rgba(59,130,246,0.30), rgba(255,180,80,0.35)),
            radial-gradient(900px 680px at 20% 80%, rgba(244,114,182,0.25), transparent 60%),
            radial-gradient(700px 520px at 82% 20%, rgba(34,197,94,0.22), transparent 65%)
          `,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    
      <section className="mx-auto max-w-sm px-4 min-h-[calc(100vh-64px-56px)] flex items-start justify-center pt-20">
        <motion.div
          className="w-full rounded-2xl border border-white/15 bg-black/30 p-8 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl relative overflow-hidden min-h-[520px]"
          style={{ boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)" }}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-black/60 blur-xl opacity-20" />
          
          <FadeIn delay={0.2}>
            <h1 className="text-2xl md:text-3xl font-semibold">Log in to Freqcast</h1>
          </FadeIn>

          {/* Role toggle */}
          

          <FadeIn delay={0.35}>
            <form onSubmit={onSubmit} className="mt-6 grid w-full gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-zinc-400">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 rounded-xl border border-zinc-800 bg-transparent px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-600"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-400">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-w-0 rounded-xl border border-zinc-800 bg-transparent px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-600"
                />
              </div>

              <div className="flex items-center justify-end text-sm">
                <Link href="#" className="text-zinc-300 underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="mt-2 rounded-xl border border-zinc-800 px-5 py-3 text-sm transition hover:bg-zinc-900 disabled:opacity-50"
              >
                {busy ? "Signing in..." : "Log in"}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="mt-6 text-sm text-zinc-400">
              Don’t have an account?{" "}
              <Link
                href="/get-started"
                className="text-zinc-200 underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </FadeIn>
        </motion.div>
      </section>
    </main>
  );
}