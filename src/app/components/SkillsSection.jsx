"use client";
import Link from "next/link";

export default function SkillsSection() {
  return (
    <section id="skills-dashboard" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-purple-800 bg-clip-text text-transparent">
              Intelligent Dashboard that talks to you. In real-time.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a comprehensive view of your workforce across your organization with dynamic dashboards and AI-driven reporting.
            </p>
            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  Employee Profiles
                </h3>
                <p className="text-gray-600">
                  Detailed professional and skills and tools-first profiles for every team member with proficiency levels, growth trends, and potential red flags.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  Skill Level Analytics
                </h3>
                <p className="text-gray-600">
                  Detailed breakdown and analytics of skill levels, job roles, and performance over time.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  Learning and Career Path recommendations.
                </h3>
                <p className="text-gray-600">
                  AI-powered suggestions for individual development to stay relevant and valuable for the company.
                </p>
              </div>
            </div>

            <Link href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Explore Skills Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          {/* Two images stacked vertically */}
          <div className="space-y-6">
            <img
              src="/talent.jpeg" 
              alt="Skill Development Chart"
              className="rounded-xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
