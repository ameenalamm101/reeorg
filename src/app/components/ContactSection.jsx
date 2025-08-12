"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("company_size", companySize);

    try {
      await fetch("https://formspree.io/f/myzwrdyw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } catch {
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Content */}
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Get Started Today
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform Your
                <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Organization?
                </span>
              </h2>

              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Join forward-thinking companies using ReeOrg to build more effective teams, identify risks early, and develop talent strategically for the AI era.
              </p>

              {/* Benefits list */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    <span className="font-semibold text-white">Deep Workforce Insights:</span> Gain comprehensive understanding of your organization's talent landscape with AI-powered analytics
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    <span className="font-semibold text-white">Proactive Risk Management:</span> Identify and address market risks, skill gaps, and internal red flags before they impact performance
                  </p>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    <span className="font-semibold text-white">Future-Ready Strategy:</span> Stay ahead with AI-driven scoring, predictive analysis, and targeted development plans
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative flex items-center">
                    Try ReeOrg's Demo
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Right column - Contact form */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Contact Our Team</h3>
                <p className="text-blue-100 mb-8">
                  Get personalized insights on how ReeOrg can transform your organization
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500 text-white mb-6">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Thank You!</h4>
                    <p className="text-blue-100 leading-relaxed">
                      Thank you for your interest in ReeOrg! Our team will reach out within 24 hours to schedule a personalized demo and discuss your specific needs.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Work Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                        Job Title
                      </label>
                      <input
                        id="role"
                        name="role"
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="e.g., CHRO, VP of People, HR Director"
                      />
                    </div>

                    <div>
                      <label htmlFor="companySize" className="block text-sm font-medium text-white mb-2">
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        required
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      >
                        <option value="" disabled className="text-gray-900">
                          Select company size
                        </option>
                        <option value="1-10" className="text-gray-900">1-10 employees</option>
                        <option value="11-50" className="text-gray-900">11-50 employees</option>
                        <option value="51-200" className="text-gray-900">51-200 employees</option>
                        <option value="201-500" className="text-gray-900">201-500 employees</option>
                        <option value="501-1000" className="text-gray-900">501-1000 employees</option>
                        <option value="1000+" className="text-gray-900">1000+ employees</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      Schedule Demo
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}