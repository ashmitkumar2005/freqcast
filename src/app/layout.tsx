import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreqCast",
  description: "Creators broadcast audio. Listeners tune in by frequency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        {/* top padding so content isn't hidden behind the fixed navbar */}
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}