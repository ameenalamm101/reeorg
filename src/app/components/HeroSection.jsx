"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    // Reduced top padding here
    <section className="relative pt-8 lg:pt-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 blur-3xl opacity-70"></div>
      </div>

      {/* Reduced top padding here */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                <br />The Workforce Intelligence Platform
              </span>{" "}
              For{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                <br />The AI Era
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ReeOrg helps you visualize your entire organization in real time org structure, roles, reporting lines, and risks, so you can simulate scenarios, redesign with confidence, and transform before disruption hits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Try ReeOrg’s sandbox version.
              </Link>
              <Link
                href="#features"
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          {/* Placeholder Image */}
          <div>
            <img
              src="/skillSec.jpeg"
              alt="Skills Dashboard Preview"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
