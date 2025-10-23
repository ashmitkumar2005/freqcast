"use client";

import React from "react";
import Link from "next/link";
import ExpandableLogo from "./ExpandableLogo";

export default function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                {/* Left: Logo */}
                <div className="shrink-0">
                    <a href="https://freqcast.vercel.app/">
                        <ExpandableLogo size={50} />
                    </a>
                </div>

                {/* Right: Links */}
                <nav className="flex items-center gap-4 text-sm text-gray-300">
                    <Link href="#" className="hover:text-white transition">
                        Creator
                    </Link>
                    <Link href="#" className="hover:text-white transition">
                        Listener
                    </Link>
                    <a
                        href="https://github.com/ashmitkumar69/freqcast"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        GitHub
                    </a>

                    {/* Animated Get Started Button */}
                    <Link
                        href="/get-started"
                        className="relative overflow-hidden rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-white shadow-sm transition-all duration-300 ease-out
                                   hover:scale-[1.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]
                                   active:scale-[0.96] active:shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                    >
                        <span className="relative z-10">Get Started</span>
                        {/* Ripple effect */}
                        <span className="absolute inset-0 bg-indigo-400 opacity-0 transition-opacity duration-300 rounded-md hover:opacity-20"></span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
