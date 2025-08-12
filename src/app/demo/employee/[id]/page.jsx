"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { allemployees } from "../../allemployees";

function findEmployeeById(employees, id) {
  if (!employees) return null;
  return employees.find((emp) => emp.id === id);
}

function getEducation(employee) {
  if (!employee || !employee.education) return [];
  if (typeof employee.education === "object") {
    return Array.isArray(employee.education)
      ? employee.education
      : [employee.education];
  }
  return [
    {
      id: 1,
      institution: employee.education?.split(" ")[1] || "Unknown University",
      degree: employee.education || "Unknown Degree",
      location: "—",
      startDate: "",
      endDate: "",
      gpa: "",
    },
  ];
}

function getExperience(employee) {
  if (!employee) return [];
  if (Array.isArray(employee.experience)) {
    return employee.experience.map((exp, i) => ({
      id: i + 1,
      ...exp,
    }));
  }
  return employee.position || employee.jobDescription
    ? [
        {
          id: 1,
          company: "Current Company",
          position: employee.position,
          location: "",
          startDate: "",
          endDate: "Present",
          current: true,
          responsibilities: employee.jobDescription || [],
        },
      ]
    : [];
}

function getSkills(employee) {
  if (!employee || !employee.skills) return [];
  return (employee.skills || []).map((skill, i) => ({
    id: i + 1,
    name: skill,
    proficiency: 4,
    category: "General",
  }));
}

function getTools(employee) {
  if (!employee || !employee.tools) return [];
  return (employee.tools || []).map((tool, i) => ({
    id: i + 1,
    name: tool,
    proficiency: 4,
    category: "Tool",
  }));
}

function getJobDescription(employee) {
  if (!employee || !employee.jobDescription) return [];
  return employee.jobDescription || [];
}

function getPayroll(employee) {
  if (!employee || !employee.payroll) return null;
  const { baseSalary, bonus, stockOptions, lastRaiseDate, raisePercentage } = employee.payroll;
  return {
    baseSalary,
    bonus,
    stockOptions,
    lastRaiseDate,
    raisePercentage,
  };
}

function getPerformance(employee) {
  if (!employee || !employee.performance) return null;
  return employee.performance;
}

export default function EmployeePage() {
  const { id } = useParams();
  const router = useRouter();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("education");

  useEffect(() => {
    setLoading(true);
    const emp = findEmployeeById(allemployees, id);
    setEmployee(emp || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
        <button
          onClick={() => router.push("/demo")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-semibold transition-colors"
        >
          Back to Demo Chart
        </button>
      </div>
    );
  }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

  const education = getEducation(employee);
  const experience = getExperience(employee);
  const skills = getSkills(employee);
  const tools = getTools(employee);
  const jobDescription = getJobDescription(employee);
  const payroll = getPayroll(employee);
  const performance = getPerformance(employee);

  const tabs = [
    { value: "education", label: "Education" },
    { value: "experience", label: "Experience" },
    { value: "skills", label: "Skills" },
    { value: "tools", label: "Tools" },
    { value: "jobDescription", label: "Job Description" },
    { value: "payroll", label: "Payroll" },
    { value: "performance", label: "Performance" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-500 hover:text-gray-900 font-medium group transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Organization Chart
        </button>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl overflow-hidden p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {getInitials(employee.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <p className="text-sm text-gray-700 font-medium">
              {employee.position}
            </p>
            <div className="flex flex-wrap text-sm text-gray-600 gap-4 mt-2">
              <span>{employee.email}</span>
              <span>{employee.department}</span>
              {employee.redFlag && (
                <span className="text-red-500 font-bold">
                  Red Flag: {employee.redFlag}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center sm:justify-start gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.value
                  ? "bg-gray-700 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "education" && (
        <div className="space-y-4">
          {education.length === 0 ? (
            <div className="text-gray-600">No education listed.</div>
          ) : (
            education.map((edu) => (
              <div
                key={edu.id || 1}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-gray-700 text-sm">
                  {edu.institution} {edu.location && `— ${edu.location}`}
                </p>
                {(edu.startDate || edu.endDate) && (
                  <p className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                )}
                {edu.gpa && (
                  <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "experience" && (
        <div className="space-y-4">
          {experience.length === 0 ? (
            <div className="text-gray-600">No experience listed.</div>
          ) : (
            experience.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.position}
                  </h3>
                  {job.current && (
                    <span className="text-xs text-white bg-gray-700 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm">
                  {job.company} {job.location && `— ${job.location}`}
                </p>
                {(job.startDate || job.endDate) && (
                  <p className="text-gray-500 text-sm">
                    {job.startDate} - {job.endDate}
                  </p>
                )}
                <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                  {(job.responsibilities || []).map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "skills" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {skills.length === 0 ? (
            <div className="col-span-full text-gray-600">No skills listed.</div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="relative group bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative mb-3">
                  <svg className="w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="176"
                      strokeDashoffset={176 - (176 * skill.proficiency) / 5}
                      className="text-gray-700 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800 text-lg">
                    {skill.proficiency}/5
                  </div>
                </div>
                <h3 className="text-md font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs text-gray-600">{skill.category}</span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "tools" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {tools.length === 0 ? (
            <div className="col-span-full text-gray-600">No tools listed.</div>
          ) : (
            tools.map((tool) => (
              <div
                key={tool.id}
                className="relative group bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative mb-3">
                  <svg className="w-16 h-16">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="176"
                      strokeDashoffset={176 - (176 * tool.proficiency) / 5}
                      className="text-gray-700 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800 text-lg">
                    {tool.proficiency}/5
                  </div>
                </div>
                <h3 className="text-md font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-xs text-gray-600">{tool.category}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* LEFT-ALIGNED BOXES: Job Description, Payroll, Performance */}
      {activeTab === "jobDescription" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-4xl"
          style={{ boxShadow: "0 2px 8px 0 rgba(60,72,88,.05)" }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
          {jobDescription.length === 0 ? (
            <div className="text-gray-600">No job description listed.</div>
          ) : (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {jobDescription.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-4xl"
          style={{ boxShadow: "0 2px 8px 0 rgba(60,72,88,.05)" }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Payroll Information</h3>
          {!payroll ? (
            <div className="text-gray-600">No payroll information listed.</div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Base Salary: </span>
                <span>${payroll.baseSalary?.toLocaleString() || "-"}</span>
              </div>
              <div>
                <span className="font-medium">Bonus: </span>
                <span>${payroll.bonus?.toLocaleString() || "-"}</span>
              </div>
              <div>
                <span className="font-medium">Stock Options: </span>
                <span>{payroll.stockOptions || "-"} shares</span>
              </div>
              <div>
                <span className="font-medium">Last Raise Date: </span>
                <span>{payroll.lastRaiseDate || "-"}</span>
              </div>
              <div>
                <span className="font-medium">Raise Percentage: </span>
                <span>{payroll.raisePercentage ? payroll.raisePercentage + "%" : "-"}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "performance" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full max-w-4xl"
          style={{ boxShadow: "0 2px 8px 0 rgba(60,72,88,.05)" }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
          {!performance ? (
            <div className="text-gray-600">No performance data listed.</div>
          ) : (
            <>
              <div className="mb-4">
                <span className="font-medium">Overall Completion: </span>
                <span>{performance.overallCompletion || 0}%</span>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${performance.overallCompletion || 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Goals</h4>
                {(performance.goals && performance.goals.length > 0) ? (
                  <ul className="space-y-2">
                    {performance.goals.map((goal, idx) => (
                      <li key={idx} className="border border-gray-100 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{goal.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            goal.status === "on track"
                              ? "bg-green-100 text-green-700"
                              : goal.status === "delayed"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            {goal.status}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          Target Date: {goal.targetDate}
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${goal.completion || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{goal.completion || 0}%</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-600">No goals listed.</div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}