"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo Section - Left */}
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Codedot Logo" width={32} height={32} className="shadow" />
                        <h1 className="text-xl font-bold text-white">Codedot</h1>
                    </div>

                    {/* Navigation Links - Center (Hidden on mobile) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                            Home
                        </Link>
                        <Link href="/coditor" className="text-gray-300 hover:text-white transition-colors duration-200">
                            Coditor
                        </Link>
                        <Link href="/resume-analyzer" className="text-gray-300 hover:text-white transition-colors duration-200">
                            Resume Analyzer
                        </Link>
                    </div>

                    {/* User Profile - Right */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Image src="/user-avatar.png" alt="User Profile" width={32} height={32} className="shadow rounded-full" />
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-4 pt-4">
                            <Link 
                                href="/" 
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/about" 
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Coditor
                            </Link>
                            <Link 
                                href="/contact" 
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Resume Analyzer
                            </Link>
                            <div className="pt-2">
                                <Image src="/user-avatar.png" alt="User Profile" width={32} height={32} className="shadow rounded-full" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}