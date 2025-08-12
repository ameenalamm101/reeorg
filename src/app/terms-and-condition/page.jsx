"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";


export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Terms of Use | ReeOrg</title>
        <meta name="description" content="ReeOrg's Terms of Use" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Terms of Use
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Please read these terms carefully before using our website
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Legal Agreement Between You and ReeOrg
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                This website (Site) is operated by ReeOrg (we, our or us). By accessing and/or using our Site, 
                you agree to these terms of use and our Privacy Policy (Terms). We may vary these terms from time 
                to time by publishing an updated version on our Site. We recommend that you check these Terms 
                regularly to ensure that you are aware of any changes as materials and information on this Site 
                are subject to change without notice.
              </p>

              <section id="general-restrictions" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">General Restrictions</h3>
                <p className="mb-4">
                  In using this Site, you must not:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>violate any applicable laws;</li>
                  <li>do anything that would constitute a breach of an individual's privacy or other legal rights;</li>
                  <li>distribute viruses, corrupted files or any other software or program that may damage, modify, tamper with, or interfere with our Site;</li>
                  <li>use our Site to send unsolicited email messages; or</li>
                  <li>facilitate or assist a third party to do any of the above acts.</li>
                </ul>
              </section>

              <section id="general-information" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">General Information</h3>
                <p className="mb-4">
                  The Content on this Site is not comprehensive and is for general information purposes only. It does not take into account your specific needs, objectives and circumstances, and it is not advice. While we use reasonable attempts to ensure the accuracy and completeness of the Content, we make no representation or warranty in relation to it, to the maximum extent permitted by law.
                </p>
              </section>

              <section id="license" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">License to use the Site</h3>
                <p className="mb-4">
                  We grant you a non-exclusive, royalty-free, revocable, worldwide, non-transferable license to use our Site in accordance with these Terms. All other uses are prohibited without our prior written consent.
                </p>
              </section>

              <section id="ip-rights" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h3>
                <p className="mb-4">
                  Unless otherwise stated, we own or license all rights, title and interest (including intellectual property rights) in our Site and all of the Content. Your use of our Site and any of the Content does not grant or transfer to you any rights, title or interest them. You must not:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>copy or use, in whole or in part, any Content;</li>
                  <li>reproduce, distribute, disseminate, sell, publish, broadcast or circulate any Content to any third party; or</li>
                  <li>breach any intellectual property rights connected with our Site or the Content, including (without limitation) altering or modifying any of the Content, causing any of the content to be framed or embedded in another website or platform, or create derivative works from the Content.</li>
                </ul>
              </section>

              <section id="third-party-links" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Links to Third Parties</h3>
                <p className="mb-4">
                  Our Site may contain links to websites operated by third parties. Unless expressly stated otherwise, we do not control, endorse or approve, and are not responsible for, the content on those websites. You should make your own investigations with respect to the suitability of those websites.
                </p>
              </section>

              <section id="indemnity" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Indemnity</h3>
                <p className="mb-4">
                  To the maximum extent permitted by law, you must indemnify us, and hold us harmless, against any Liability suffered or incurred by us arising from or in connection with your use of our Site or any breach of these Terms or any applicable laws by you. This indemnity is a continuing obligation, independent from the other obligations under these Terms, and continues after these Terms end. It is not necessary for us to suffer or incur any Liability before enforcing a right of indemnity under these Terms.
                </p>
              </section>

              <section id="liability" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h3>
                <p className="mb-4">
                  To the maximum extent permitted by law, we are not responsible for any loss, damage or expense, whether directly or indirectly suffered by you or any third party, arising from or in connection with your use of our Site and/or the Content, including if the Content is incorrect, incomplete or out-of-date.
                </p>
              </section>

              <section id="general" className="my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">General</h3>
                <p className="mb-4">
                  If a provision of these Terms is held to be unenforceable, that provision must be read down as narrowly as necessary to allow it to be valid or enforceable. If it is not possible to read down (in whole or in part) a provision, that provision (or that part of that provision) shall be severed without affecting the validity or enforceability of the remainder of that provision or the rest of these Terms. These Terms are effective until terminated by us, which we may do at any time and without notice to you. In the event of termination, all restrictions imposed on you by these Terms and limitations of liability set out in these Terms will survive. Your use of our Site and these Terms are governed by the laws of New South Wales, Australia, and you irrevocably submit to the exclusive jurisdiction of the courts of New South Wales, Australia.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:contact@reeorg.com" className="text-indigo-600 hover:text-indigo-800">
                    contact@reeorg.com
                  </a>
                </p>
              </div>
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
              href="/terms-of-use"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Terms of Use
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
              href="/terms-of-use"
              className="block text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Terms of Use
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

// Footer component remains unchanged
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
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="text-gray-300 hover:text-white transition-colors">Terms of Use</Link></li>
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
