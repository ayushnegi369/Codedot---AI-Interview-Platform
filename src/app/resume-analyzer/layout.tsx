import React from "react";
import Image from "next/image";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-gradient-to-b from-black via-neutral-900 to-neutral-950">
      {/* Grid SVG Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 w-full h-full">
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-gradient)" />
          {/* Grid lines */}
          <g stroke="#ffffff22" strokeWidth="1">
            {Array.from({ length: 40 }).map((_, i) => (
              <line key={"v"+i} x1={i*40} y1="0" x2={i*40} y2="100%" />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={"h"+i} x1="0" y1={i*40} x2="100%" y2={i*40} />
            ))}
          </g>
          {/* Fade effect */}
          <rect width="100%" height="100%" fill="url(#bg-gradient)" fillOpacity="0.7" />
        </svg>
      </div>
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 relative z-10">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
