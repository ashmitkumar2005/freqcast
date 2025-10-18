"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HoverBorderGradient } from "./ui/hover-border-gradient"; // note the path: ./ui inside components

type LogoProps = {
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
};

// Reusable PNG logo component that sources /public/logo.png.
// Pass width/height to control size and className for padding/margin.
function LogoImage({ width = 24, height = 24, className = "", alt = "FreqCast logo" }: LogoProps) {
    return (
        <Image src="/logo.png" width={width} height={height} alt={alt} className={className} priority />
    );
}

export default function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                {/* Left: exact Aceternity UI button (no changes) */}
                <div className="shrink-0">
                    <a href="https://freqcast.vercel.app/">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        >
                            <LogoImage width={64} height={64} className="p-0" />
                            <span><b>FreqCast</b></span>
                        </HoverBorderGradient>
                    </a>
                                </div>

                                {/* Right: your existing links */}
                <nav className="flex items-center gap-4 text-sm text-gray-300">
                    <Link href="#" className="hover:text-white">
                        Creator
                    </Link>
                    <Link href="#" className="hover:text-white">
                        Listener
                    </Link>
                    <a
                        href="https://github.com/ashmitkumar69/freqcast"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                    >
                        GitHub
                    </a>
                    <Link
                        href="/"
                        className="rounded-md bg-indigo-600 px-3 py-1.5 font-medium text-white transition hover:bg-indigo-500"
                    >
                        Get Started
                    </Link>
                </nav>
            </div>
        </header>
    );
}