"use client";
import Link from "next/link";

export default function OrgDesignSection() {
  return (
    <section id="org-design" className="py-15 bg-gradient-to-tl from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column with image instead of org chart */}
          <div>
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500">Organization Structure</span>
                <h3 className="text-xl font-bold">Leadership Team</h3>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src="/companystruc.png"
                  alt="Organizational Chart"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column with text */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-normal bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Visualize and Optimize Your Organization
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a clear view of your organizational structure and make data-driven decisions about team composition.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Real-time Org Visualization</h3>
                <p className="text-gray-600">
                  See your organization with detailed insights into roles, teams, and departments. Understand how changing market dynamics are affecting your organization internally & externally.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Skills Distribution</h3>
                <p className="text-gray-600">
                  Analyze skill distribution across the company. Quickly identify misalignments between role requirements, experience and competency.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Future-ready Planning</h3>
                <p className="text-gray-600">
                  Model different scenarios, simulate impact of changes from within your organization and outside.
                </p>
              </div>
            </div>

            <Link
              href="/demo"
              className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
            >
              Try ReeOrg’s sandbox version.
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
      </div>
    </section>
  );
}
