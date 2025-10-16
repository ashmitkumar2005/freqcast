import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Using your exact file
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
      <body className={`${sfPro.className} bg-black text-white antialiased`}>
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}