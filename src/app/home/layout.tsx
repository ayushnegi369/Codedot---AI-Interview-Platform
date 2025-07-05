import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Footer from "../../../components/Footer";
import "../globals.css";
import Navbar from "../../../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - Codedot",
  description: "Your Codedot homepage - Practice job interviews with AI",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-gradient-to-b from-black to-[#18181b] overflow-hidden`}>
      {/* Grid background overlay - covers less than half the page with fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-full h-[45vh] z-0"
        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
      >
        <svg
          className="w-full h-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="100" height="100" fill="transparent" />
              <rect x="0" y="0" width="100" height="100" fill="#23232a" opacity="0.15" />
              <rect x="100" y="0" width="100" height="100" fill="transparent" />
              <rect x="0" y="100" width="100" height="100" fill="transparent" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="#b7aaff"
                strokeWidth="1"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative min-h-screen flex z-10">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-black px-20 py-4">
            <Navbar />
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 px-20">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
