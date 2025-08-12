"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | ReeOrg</title>
        <meta name="description" content="ReeOrg's Privacy Policy" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Protecting your privacy is our priority
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Our Commitment to Your Privacy
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                Protecting your privacy and keeping your Personal Information safe is very important to us. 
                This Privacy Policy describes how we handle the Personal Information provided to us, or otherwise 
                collected by us, including through our website (the "Site") or in connection with our software 
                as a service application and platforms.
              </p>

              <div className="my-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
                <ul className="space-y-2">
                  <li><a href="#a1" className="text-indigo-600 hover:text-indigo-800">1. Understanding Our Role</a></li>
                  <li><a href="#a2" className="text-indigo-600 hover:text-indigo-800">2. Types of Personal Information We Collect</a></li>
                  <li><a href="#a3" className="text-indigo-600 hover:text-indigo-800">3. How We Use Your Information</a></li>
                  <li><a href="#a4" className="text-indigo-600 hover:text-indigo-800">4. Data Sharing and Disclosure</a></li>
                  <li><a href="#a5" className="text-indigo-600 hover:text-indigo-800">5. International Data Transfer</a></li>
                  <li><a href="#a6" className="text-indigo-600 hover:text-indigo-800">6. Your Privacy Rights</a></li>
                  <li><a href="#a7" className="text-indigo-600 hover:text-indigo-800">7. Protecting Your Personal Information</a></li>
                  <li><a href="#a8" className="text-indigo-600 hover:text-indigo-800">8. Data Retention</a></li>
                  <li><a href="#a9" className="text-indigo-600 hover:text-indigo-800">9. Use of Cookies</a></li>
                  <li><a href="#a10" className="text-indigo-600 hover:text-indigo-800">10. Children's Privacy</a></li>
                  <li><a href="#a11" className="text-indigo-600 hover:text-indigo-800">11. Modifications to This Policy</a></li>
                  <li><a href="#a12" className="text-indigo-600 hover:text-indigo-800">12. How to Contact Us</a></li>
                </ul>
              </div>

              <section id="a1" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Understanding Our Role: Data Controller vs Data Processor</h3>
                <p className="mb-4">
                  When it comes to your personal information, ReeOrg may act in one of two roles: as a Data Controller or as a Data Processor.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">When ReeOrg is a Data Controller</h4>
                  <p className="mb-4">
                    When ReeOrg acts as a Data Controller, it means we are responsible for deciding how and why your Personal Information is collected and used. This typically happens in situations where you provide your information directly to us.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">When ReeOrg is a Data Processor</h4>
                  <p>
                    In many cases, ReeOrg acts as a Data Processor. This happens when we process your Personal Information on behalf of one of our customers, who is the Data Controller.
                  </p>
                </div>
              </section>

              <section id="a2" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Personal Information We Collect</h3>
                <p className="mb-4">
                  The types of Personal Information we may collect about you include:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Information you provide directly to us</li>
                  <li>Information collected via our customers</li>
                  <li>Information collected through automated means</li>
                  <li>Information collected from third-party sources</li>
                </ul>
              </section>

              <section id="a3" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h3>
                <p className="mb-4">
                  ReeOrg may collect, hold, use and disclose your Personal Information for various purposes including:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>To enable you to access and use our Site</li>
                  <li>To provide product and services information at your request</li>
                  <li>To provide our Software Solution to our customers</li>
                  <li>To respond to your requests, inquiries, comments, and suggestions</li>
                  <li>For internal record keeping and administrative purposes</li>
                </ul>
              </section>

              <section id="a4" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h3>
                <p className="mb-4">
                  We may share Personal Information about you with certain third parties in specific circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>With vendors, consultants, and other service providers</li>
                  <li>With digital marketing agents conducting marketing on our behalf</li>
                  <li>In connection with mergers, acquisitions, or asset sales</li>
                  <li>When necessary to comply with legal obligations</li>
                  <li>With third parties with your consent</li>
                </ul>
              </section>

              <section id="a5" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5. International Data Transfer</h3>
                <p className="mb-4">
                  Personal Information we collect may be stored and processed in various countries where we have operations or engage service providers. These countries may not have the same data protection laws as the country in which you originally provided the data.
                </p>
              </section>

              <section id="a6" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h3>
                <p className="mb-4">
                  Depending on your jurisdiction, you may have certain rights regarding your Personal Information:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Right to Know/Access your information</li>
                  <li>Right to Correct inaccurate information</li>
                  <li>Right to Delete/Be Forgotten</li>
                  <li>Right to Restrict Cookies/Do Not Track</li>
                  <li>Right to Complain to authorities</li>
                  <li>Right to Opt Out/Unsubscribe from marketing</li>
                </ul>
              </section>

              <section id="a7" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Protecting Your Personal Information</h3>
                <p className="mb-4">
                  ReeOrg has implemented security controls and procedures for protecting your Personal Information from misuse, interference, unauthorized access, modification, or disclosure.
                </p>
              </section>

              <section id="a8" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h3>
                <p className="mb-4">
                  We only keep your Personal Information for so long as reasonably necessary for the purposes described in this Privacy Policy, as required by law, or as necessary to resolve disputes and enforce our rights and agreements.
                </p>
              </section>

              <section id="a9" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Use of Cookies</h3>
                <p className="mb-4">
                  Our Site uses cookies to help personalize your online experience. You can configure most browsers to reject cookies or to notify you when you are sent a cookie.
                </p>
              </section>

              <section id="a10" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h3>
                <p className="mb-4">
                  Our Services are intended for adults, and we do not knowingly collect Personal Information from children under 13.
                </p>
              </section>

              <section id="a11" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to This Policy</h3>
                <p className="mb-4">
                  We may modify this Privacy Policy from time to time. The most current version will govern our collection, use, and disclosure of information about you.
                </p>
              </section>

              <section id="a12" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">12. How to Contact Us</h3>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="bg-gray-50 p-4 rounded-lg inline-block">
                  <a href="mailto:contact@reeorg.com" className="text-indigo-600 hover:text-indigo-800">
                    contact@reeorg.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              ReeOrg
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
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
                className="h-6 w-6 text-gray-700"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
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
                className="h-6 w-6 text-gray-700"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/#features"
              className="block text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/privacy-policy"
              className="block text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              href="/#contact"
              className="block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">ReeOrg</h2>
            <p className="text-gray-400 mb-4">
              Transforming organizations through skills intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/#skills-dashboard" className="text-gray-300 hover:text-white transition-colors">Skills Dashboard</Link></li>
              <li><Link href="/#org-design" className="text-gray-300 hover:text-white transition-colors">Org Design</Link></li>
              <li><Link href="/#features" className="text-gray-300 hover:text-white transition-colors">Skills Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-condition" className="text-gray-300 hover:text-white transition-colors">Terms And Condition</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} ReeOrg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
