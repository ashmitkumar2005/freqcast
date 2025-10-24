"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

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
    <main
      className="min-h-[calc(100vh-64px)] bg-black text-white bg-fixed"
      style={{
        backgroundImage: "url(/logback.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <section className="mx-auto max-w-sm px-4 py-16">
        <motion.div
          className="w-full rounded-2xl border border-white/10 bg-transparent p-8 backdrop-blur-2xl supports-[backdrop-filter]:backdrop-blur-2xl relative overflow-hidden min-h-[520px]"
          style={{ boxShadow: "0 0 52px rgba(255, 255, 255, 0.10)" }}
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/15" />
          <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-white/20 blur-2xl opacity-15" />
          
          <h1 className="text-2xl md:text-3xl font-semibold">Log in to Freqcast</h1>

          {/* Role toggle */}
          

          {/* Form */}
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

          <div className="mt-6 text-sm text-zinc-400">
            Don’t have an account?{" "}
            <Link
              href="/get-started"
              className="text-zinc-200 underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}