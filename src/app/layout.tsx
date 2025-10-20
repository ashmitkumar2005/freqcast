import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className={`${sfPro.className} min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white antialiased`}>
        <Navbar />
        {/* If your navbar is h-14, change pt-16 to pt-14 */}
        <div className="pt-16 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}