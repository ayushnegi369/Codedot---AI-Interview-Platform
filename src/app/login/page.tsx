import React from "react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#18181b] overflow-hidden">
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
      <div className="relative w-full max-w-md bg-[#18181b] rounded-2xl shadow-xl p-8 md:p-10 border border-gray-700/50 z-10 mx-4 sm:mx-6 md:mx-0 my-8 md:my-16">
        <div className="flex flex-col items-center mb-8">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 mb-2">
            <Image src="/logo.png" alt="Codedot Logo" width={32} height={32} className="shadow" />
            <h1 className="text-2xl font-bold text-white">Codedot</h1>
          </div>
          <p className="text-lg text-gray-300 text-center">Welcome back! Log in to your account</p>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg bg-[#23232a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold placeholder:font-normal placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg bg-[#23232a] text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#b7aaff] text-gray-900 font-bold py-3 text-lg hover:bg-[#a99be6] transition"
          >
            Log in
          </button>
          {/* OR separator */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700" />
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-700" />
          </div>
          {/* Google Login Button at the bottom */}
          <button type="button" className="flex items-center justify-center w-full gap-2 py-2 rounded-lg bg-white border border-gray-200 text-gray-900 font-semibold hover:bg-gray-50 transition">
            <span className="inline-block w-6 h-6 align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.09 1.53 7.49 2.81l5.54-5.39C33.64 3.61 29.28 1.5 24 1.5 14.98 1.5 7.06 7.73 3.88 15.44l6.44 5.01C12.13 14.13 17.61 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.21-.42-4.73H24v9.18h12.42c-.54 2.9-2.18 5.36-4.65 7.02l7.18 5.59C43.93 37.13 46.1 31.36 46.1 24.55z"/>
                  <path fill="#FBBC05" d="M10.32 28.45c-1.01-2.9-1.01-6.01 0-8.91l-6.44-5.01C1.56 18.36 0.5 21.07 0.5 24s1.06 5.64 3.38 9.47l6.44-5.02z"/>
                  <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.14 15.89-5.82l-7.18-5.59c-2 1.41-4.59 2.26-8.71 2.26-6.39 0-11.87-4.63-13.68-10.93l-6.44 5.02C7.06 40.27 14.98 46.5 24 46.5z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
            </span>
            <span className="font-bold">Log in with Google</span>
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-[#b7aaff] hover:underline font-semibold">Sign up</a>
        </div>
      </div>
    </div>
  );
}
