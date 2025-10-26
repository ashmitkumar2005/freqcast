import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const sfPro = localFont({
  src: [{ path: "./fonts/SF-Pro-Display-Regular.otf", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-sfpro",
});

export const metadata: Metadata = {
  title: "FreqCast",
  description: "Creators broadcast audio. Listeners tune in by frequency.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${sfPro.className} ${sfPro.variable} min-h-screen flex flex-col bg-transparent text-white antialiased`}
      >
        {/* Global background covering navbar, content, and footer */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(1200px 800px at 20% 22%, rgba(139,92,246,0.42), transparent 60%),
              radial-gradient(1000px 900px at 80% 28%, rgba(56,189,248,0.36), transparent 60%),
              radial-gradient(900px 700px at 50% 78%, rgba(16,185,129,0.30), transparent 60%)
            `,
          }}
        />
        <Navbar />
        <PageTransition>
          <div className="pt-16 flex-1">{children}</div>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
