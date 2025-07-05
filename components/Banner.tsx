import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden rounded-2xl max-w-[1600px] mx-auto my-4 shadow-2xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Section - Content */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></span>
                AI-Powered Interview Practice
              </div>
              
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Get Interview-Ready with{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Practice
              </h1>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl">
                Practice real interview questions, get instant feedback, and land your dream job. 
                Our AI analyzes your responses and provides personalized coaching.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Free Practice
                <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/banner-image.png"
                alt="AI Interview Practice"
                width={300}
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-1 -right-1 w-12 h-12 bg-blue-500/20 rounded-full blur-md"></div>
            <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-purple-500/20 rounded-full blur-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
