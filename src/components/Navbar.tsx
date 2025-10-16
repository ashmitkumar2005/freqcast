import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-indigo-400">Freq</span>Cast
        </Link>

        <nav className="flex items-center gap-4 text-sm text-gray-300">
          <Link href="#" className="hover:text-white">Creator</Link>
          <Link href="#" className="hover:text-white">Listener</Link>
          <a
            href="https://github.com/ashmitkumar69/freqcast"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
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