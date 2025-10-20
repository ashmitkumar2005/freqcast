export default function Footer() {
  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
        <p className="text-center text-[13px] text-zinc-400">
          Made with <span role="img" aria-label="love" className="mx-1 text-pink-500">❤️</span>
          by{" "}
          <a
            href="https://github.com/ashmitkumar69"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-zinc-300 hover:text-white hover:underline underline-offset-4"
          >
            Ashmit Kumar
          </a>
        </p>
      </div>
    </footer>
  );
}