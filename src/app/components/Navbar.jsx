"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PRODUCT_OPTIONS = [
  { href: "/#features", label: "Workforce Intelligence" },
  { href: "/#skills-dashboard", label: "Talent Management" },
  { href: "/#features", label: "Skills Intelligence" },
  { href: "/#org-design", label: "Org Design" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [featuresDropdown, setFeaturesDropdown] = useState(false);
  const [featuresDropdownMobile, setFeaturesDropdownMobile] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) setFeaturesDropdown(false);
  }, [isOpen]);

  useEffect(() => {
    if (!featuresDropdown) return;
    const handleClick = (e) => {
      const dropdown = document.getElementById("features-dropdown");
      const trigger = document.getElementById("features-trigger");
      if (
        dropdown && !dropdown.contains(e.target) &&
        trigger && !trigger.contains(e.target)
      ) {
        setFeaturesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [featuresDropdown]);

  // --- Dropdown open/close with delay (desktop only) ---
  const handleDropdownMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setFeaturesDropdown(true);
  };
  const handleDropdownMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setFeaturesDropdown(false);
    }, 200);
  };

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
            <div
              className="relative"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                id="features-trigger"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
                aria-haspopup="true"
                aria-expanded={featuresDropdown}
                tabIndex={0}
                type="button"
                onClick={e => e.preventDefault()}
              >
                Solutions
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${featuresDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {featuresDropdown && (
                <div
                  id="features-dropdown"
                  className="absolute left-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-100 z-50"
                >
                  <ul className="py-2">
                    {PRODUCT_OPTIONS.map((opt) => (
                      <li key={opt.label}>
                        <Link
                          href={opt.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm"
                          onClick={() => setFeaturesDropdown(false)}
                        >
                          {opt.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
              setFeaturesDropdownMobile(false);
            }}
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
            <div>
              <button
                className="w-full text-left text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-1"
                onClick={() => setFeaturesDropdownMobile(!featuresDropdownMobile)}
                aria-haspopup="true"
                aria-expanded={featuresDropdownMobile}
                type="button"
              >
                Solutions
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${featuresDropdownMobile ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {featuresDropdownMobile && (
                <ul className="mt-2 space-y-1 pl-2">
                  {PRODUCT_OPTIONS.map((opt) => (
                    <li key={opt.label}>
                      <Link
                        href={opt.href}
                        className="block px-2 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm rounded"
                        onClick={() => {
                          setIsOpen(false);
                          setFeaturesDropdownMobile(false);
                        }}
                      >
                        {opt.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/#about"
              className="block text-gray-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
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
