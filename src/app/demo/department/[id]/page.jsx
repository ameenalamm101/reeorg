"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { departmentsDemoData } from "../../departments";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "skills", label: "Top Skills" },
  { value: "goals", label: "Goals" },
];

export default function DepartmentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");

  const department = departmentsDemoData.find((d) => d.id === id);

  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-xl font-bold mb-4">Department Not Found</h2>
        <button
          onClick={() => router.push("/demo")}
          className="px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 font-medium text-sm transition-colors"
        >
          Back to Organizational Chart
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 px-2 py-6 max-w-3xl mx-auto bg-transparent">
      {/* Back Button */}
      <div className="mt-2 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-gray-900 font-medium group transition-colors text-sm"
        >
          <svg
            className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Organization Chart
        </button>
      </div>

      {/* Department Header */}
      <div className="rounded-xl shadow overflow-hidden p-0 mb-6 border border-gray-200 bg-[#d7dbe0] flex items-center" style={{ minHeight: 120 }}>
        <div className="flex items-center gap-6 w-full px-8 py-6">
          <div className="flex-shrink-0 w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow border-4 border-gray-300">
            {department.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold">{department.name} Department</h1>
            <p className="text-gray-700 mt-2 text-base truncate">{department.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-sm
                ${
                  activeTab === tab.value
                    ? "bg-gray-800 text-white shadow border-0"
                    : "bg-[#eceff2] text-gray-800"
                }`}
            style={{
              minWidth: 120,
              boxShadow: activeTab === tab.value ? "0 4px 12px rgba(36,37,38,.12)" : undefined,
              borderBottom: activeTab === tab.value ? "4px solid #222" : undefined
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
              Department Head
            </div>
            <div className="text-base font-bold text-gray-900">{department.head}</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col items-center">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
              Members
            </div>
            <div className="text-base font-bold text-gray-900">{department.members}</div>
          </div>
        </div>
      )}

      {activeTab === "skills" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
          {(!department.topSkills || department.topSkills.length === 0) ? (
            <div className="col-span-full text-gray-600 text-sm">No skills listed.</div>
          ) : (
            department.topSkills.map((skill, i) => (
              <div
                key={skill}
                className="relative group bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow hover:shadow-md transition-shadow duration-300"
                style={{ minHeight: 60, minWidth: 140 }}
              >
                <div className="text-md font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {skill}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "goals" && (
        <div className="space-y-3 mt-1">
          {department.goals && department.goals.length > 0 ? (
            department.goals.map((goal, idx) => (
              <div
                key={goal}
                className="border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3 bg-white"
                style={{ minHeight: 60 }}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-700 text-white text-xs font-bold shadow">
                  {idx + 1}
                </div>
                <div className="flex-1 text-gray-800 text-sm leading-snug">{goal}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-sm">No goals listed.</div>
          )}
        </div>
      )}
    </div>
  );
}