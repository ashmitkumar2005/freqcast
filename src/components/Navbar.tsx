"use client";

import Link from "next/link";
import ExpandableLogo from "./ExpandableLogo";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-100 border-b border-white/0 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="shrink-0">
          <Link href="https://freqcast.vercel.app/">
            <ExpandableLogo size={45} />
          </Link>
        </div>

        {/* Right: Links */}
        <nav className="flex items-center gap-3 text-sm text-gray-300">
          {/* GitHub Button */}
          <Link
            href="https://github.com/ashmitkumar69/freqcast"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-red-600 rounded-md text-white transition transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/60 hover:bg-red-700"
          >
            GitHub
          </Link>

          {/* Login Button */}
          <Link
            href="/login"
            className="rounded-md bg-white px-3 py-1 font-medium text-black transition transform hover:scale-105 hover:shadow-lg hover:shadow-gray-400/40 hover:bg-gray-100"
          >
            Login
          </Link>

          {/* Get Started Button */}
          <Link
            href="/get-started"
            className="rounded-md bg-indigo-600 px-2.5 py-1 font-medium text-white transition transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/60 hover:bg-indigo-500"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
