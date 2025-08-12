"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { allemployees } from "./allemployees";
import { departmentsDemoData } from "./departments";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatbotBubble from "../components/chatbot/ChatbotBubble";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// --- Layout constants ---
const BOX_WIDTH = 220;
const BOX_HEIGHT = 100;
const V_GAP = 48;
const H_GAP = 48;

// --- Utility Functions ---
// Helper to filter out "Bots & AI" and similar departments
function filterOutBotsAiDepartments(departmentsData) {
  return departmentsData.filter(
    (d) =>
      d.name &&
      d.name.trim() !== "" &&
      d.name.toLowerCase() !== "bots & ai" &&
      d.name.toLowerCase() !== "bots and ai" &&
      d.name.toLowerCase() !== "bots & ai tools"
  );
}
function filterEmployeesWithoutBotsAi(employees) {
  return employees.filter(
    (e) =>
      (e.department || "").toLowerCase() !== "bots & ai" &&
      (e.department || "").toLowerCase() !== "bots and ai" &&
      (e.department || "").toLowerCase() !== "bots & ai tools"
  );
}

function groupByDepartment(data) {
  const departments = {};
  for (const emp of data) {
    // Skip employees with no department or empty department string
    if (!emp.department || !emp.department.trim()) continue;
    const dept = emp.department.trim();
    // Remove bots & ai departments from org chart
    if (
      dept.toLowerCase() === "bots & ai" ||
      dept.toLowerCase() === "bots and ai" ||
      dept.toLowerCase() === "bots & ai tools"
    ) {
      continue;
    }
    const deptObj = departmentsDemoData.find(
      (d) => d.name && d.name.toLowerCase() === dept.toLowerCase()
    );
    const deptId = deptObj
      ? deptObj.id
      : dept.toLowerCase().replace(/\s+/g, "_");
    if (!departments[deptId]) {
      departments[deptId] = { deptObj, emps: [] };
    }
    departments[deptId].emps.push(emp);
  }
  return departments;
}

const generateInitialOrgData = () => {
  const departments = groupByDepartment(allemployees);

  const departmentNodes = Object.entries(departments).map(
    ([deptId, { deptObj, emps }]) => ({
      id: `dept-${deptId}`,
      departmentId: deptId,
      name: deptObj ? deptObj.name : deptId,
      position: `${deptObj ? deptObj.name : deptId} Department`,
      department: deptObj ? deptObj.name : deptId,
      email: "",
      children: emps.map((e) => ({
        ...e,
        expanded: false,
        children: [],
      })),
      expanded: false,
    })
  );

  return {
    id: "ceo-",
    name: "James Elton",
    position: "Chief Executive Officer",
    email: "",
    children: departmentNodes,
    expanded: true,
  };
};

function DemoBox({
  children,
  style = {},
  className = "",
  highlight = "",
  onClick,
}) {
  let border = "border-gray-300";
  if (highlight === "ceo") border = "border-blue-300";
  if (highlight === "dept") border = "border-green-300";
  if (highlight === "employee") border = "border-gray-300";
  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-200 border-2 ${border} ${className} ${
        onClick ? "cursor-pointer" : ""
      }`}
      style={{
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        ...style,
      }}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
}

function VLine({ from, to, left }) {
  const top = Math.min(from, to);
  const height = Math.abs(to - from);
  return (
    <div
      style={{
        position: "absolute",
        left: left,
        top: top,
        width: 2,
        height: height,
        background: "#cbd5e1",
        zIndex: 0,
        transform: "translateX(-1px)",
      }}
    />
  );
}

function HLine({ from, to, top }) {
  const left = Math.min(from, to);
  const width = Math.abs(to - from);
  return (
    <div
      style={{
        position: "absolute",
        left: left,
        top: top,
        height: 2,
        width: width,
        background: "#cbd5e1",
        zIndex: 0,
        transform: "translateY(-1px)",
      }}
    />
  );
}

function ChevronIcon({ up, className = "" }) {
  return up ? (
    <ChevronUp className={`w-4 h-4 mr-1 ${className}`} />
  ) : (
    <ChevronDown className={`w-4 h-4 mr-1 ${className}`} />
  );
}


function DemoEmployeeBox({
  employee,
  onToggleExpand,
  onAddSubordinate,
  highlight,
  canExpand,
  expanded,
  boxRef,
}) {
  const router = useRouter();
  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

  const showExpandBtn =
    onToggleExpand &&
    (employee.id === "ceo-" ||
      (employee.children && employee.children.length > 0) ||
      employee.id.startsWith("dept-"));

  // Make the whole box clickable
  const handleBoxClick = (e) => {
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("svg")
    ) {
      return;
    }
    if (employee.id.startsWith("dept-")) {
      router.push(`/demo/department/${employee.departmentId}`);
    } else if (employee.id !== "ceo-empty") {
      router.push(`/demo/employee/${employee.id}`);
    }
  };

  return (
    <DemoBox highlight={highlight} onClick={handleBoxClick}>
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0 mr-3">
          {employee.imageUrl ? (
            <img
              src={employee.imageUrl}
              alt={employee.name}
              className="w-10 h-10 rounded-full object-cover border-2"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-medium
              ${
                highlight === "ceo"
                  ? "bg-blue-400"
                  : highlight === "dept"
                  ? "bg-green-400"
                  : "bg-gray-400"
              }
            `}
            >
              {getInitials(employee.name)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div
              className={`text-sm font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors truncate`}
            >
              {employee.name}
            </div>
            <Link className="ml-1 text-blue-500 hover:text-blue-700" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          </div>
          <div
            className={`text-xs ${
              highlight === "ceo"
                ? "text-blue-600 font-semibold"
                : highlight === "dept"
                ? "text-green-600 font-semibold"
                : "text-gray-600 font-semibold"
            }`}
          >
            {employee.position}
          </div>
        </div>
      </div>
      {showExpandBtn && (
        <div
          style={{
            position: "absolute",
            left: "28%",
            bottom: "-10px", 
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <Button
            size="sm"
            variant="outline"
            className={`flex items-center text-xs px-2 py-1
              ${
                highlight === "ceo"
                  ? "border-blue-200 text-blue-600 hover:bg-blue-50"
                  : highlight === "dept"
                  ? "border-green-200 text-green-600 hover:bg-green-50"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            type="button"
            ref={boxRef}
          >
            <ChevronIcon up={expanded} />
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      )}
    </DemoBox>
  );
}

// ...rest of the code remains unchanged...

// --- Add Employee Modal ---
function AddEmployeeModal({ isOpen, onClose, onAddEmployee, parentId }) {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    imageUrl: "",
    children: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parentId) {
      onAddEmployee(parentId, newEmployee);
      setNewEmployee({
        name: "",
        position: "",
        department: "",
        email: "",
        imageUrl: "",
        children: [],
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {["name", "position", "department", "email", "imageUrl"].map(
              (field, index) => (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  key={index}
                >
                  <Label htmlFor={field} className="text-right capitalize">
                    {field}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    value={newEmployee[field]}
                    onChange={handleChange}
                    className="col-span-3"
                    required={field !== "imageUrl"}
                  />
                </div>
              )
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Add Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- Chart Layout/Tree Logic ---
function computeLayout(
  node,
  depth = 0,
  xOffset = 0,
  forceCenter = false,
  totalWidth = null,
  extraTop = 0
) {
  if (forceCenter && depth === 0 && totalWidth !== null) {
    return {
      ...node,
      x: (totalWidth - BOX_WIDTH) / 2,
      y: extraTop,
      width: BOX_WIDTH,
      children: [],
    };
  }
  if (!node.children || node.children.length === 0) {
    return {
      ...node,
      x: xOffset,
      y: depth * (BOX_HEIGHT + V_GAP) + extraTop,
      width: BOX_WIDTH,
      children: [],
    };
  }
  const showChildren = node.expanded ? node.children : [];
  if (showChildren.length === 0) {
    return {
      ...node,
      x: xOffset,
      y: depth * (BOX_HEIGHT + V_GAP) + extraTop,
      width: BOX_WIDTH,
      children: [],
    };
  }
  const children = [];
  let childX = xOffset;
  for (const child of showChildren) {
    const cLayout = computeLayout(
      child,
      depth + 1,
      childX,
      false,
      null,
      extraTop
    );
    children.push(cLayout);
    childX += cLayout.width + H_GAP;
  }
  const totalChildrenWidth =
    children.reduce((acc, c) => acc + c.width, 0) +
    H_GAP * (children.length - 1);
  const myX = xOffset + (totalChildrenWidth - BOX_WIDTH) / 2;

  return {
    ...node,
    x: myX,
    y: depth * (BOX_HEIGHT + V_GAP) + extraTop,
    width: Math.max(totalChildrenWidth, BOX_WIDTH),
    children,
  };
}
function renderTree(layout, handlers, refsMap) {
  const nodes = [];
  const lines = [];

  function walk(n) {
    const canExpand =
      n.id === "ceo-" ||
      (n.children && n.children.length > 0) ||
      n.id.startsWith("dept-");

    nodes.push(
      <div
        key={n.id}
        ref={refsMap[n.id]}
        style={{
          position: "absolute",
          left: n.x,
          top: n.y,
          zIndex: 1,
        }}
      >
        <DemoEmployeeBox
          employee={n}
          onToggleExpand={
            canExpand ? () => handlers.handleToggleExpand(n.id) : undefined
          }
          onAddSubordinate={() => handlers.handleAddSubordinate(n.id)}
          highlight={
            n.id.startsWith("ceo")
              ? "ceo"
              : n.id.startsWith("dept")
              ? "dept"
              : "employee"
          }
          canExpand={canExpand}
          expanded={n.expanded}
          boxRef={refsMap[n.id]}
        />
      </div>
    );
    if (n.expanded && n.children && n.children.length > 0) {
      const parentCenterX = n.x + BOX_WIDTH / 2;
      const parentBottomY = n.y + BOX_HEIGHT;

      if (n.children.length === 1) {
        const c = n.children[0];
        lines.push(
          <VLine
            key={`v-${n.id}-${c.id}`}
            from={parentBottomY}
            to={c.y}
            left={parentCenterX}
          />
        );
      } else {
        lines.push(
          <VLine
            key={`v-${n.id}-multi`}
            from={parentBottomY}
            to={parentBottomY + V_GAP / 2}
            left={parentCenterX}
          />
        );
        const leftMost = n.children[0].x + BOX_WIDTH / 2;
        const rightMost = n.children[n.children.length - 1].x + BOX_WIDTH / 2;
        lines.push(
          <HLine
            key={`h-${n.id}-multi`}
            from={leftMost}
            to={rightMost}
            top={parentBottomY + V_GAP / 2}
          />
        );
        n.children.forEach((c) => {
          lines.push(
            <VLine
              key={`v-link-${n.id}-${c.id}`}
              from={parentBottomY + V_GAP / 2}
              to={c.y}
              left={c.x + BOX_WIDTH / 2}
            />
          );
        });
      }
      n.children.forEach(walk);
    }
  }
  walk(layout);
  return { nodes, lines };
}

const COMPANY_ID = "company-unstoppable";
const COMPANY_NAME = "Unstoppable Inc.";

function CompanyBox({ onClick, boxRef }) {
  return (
    <div
      ref={boxRef}
      className="relative flex items-center justify-center shadow-lg rounded-lg bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-2 border-purple-300 cursor-pointer hover:shadow-xl transition-shadow duration-200"
      style={{
        width: 240,
        height: 56,
        margin: "0 auto",
        fontWeight: 700,
        fontSize: "1.3rem",
        color: "#7c3aed",
        letterSpacing: "0.04em",
        textShadow: "0 2px 8px #fff8",
        userSelect: "none",
      }}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span>{COMPANY_NAME}</span>
        <Link className="ml-2 text-purple-500 hover:text-purple-700" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </Link>
      </div>
    </div>
  );
}

function renderTreeWithCompany(
  layout,
  handlers,
  refsMap,
  showCompany,
  companyBoxRef,
  companyLineProps
) {
  const base = renderTree(layout, handlers, refsMap);
  if (!showCompany) return base;
  const ceoLayout = layout;
  const ceoX = ceoLayout.x;
  const ceoY = ceoLayout.y;

  const companyBoxWidth = 240;
  const companyBoxHeight = 56;
  const companyBoxX = ceoX + BOX_WIDTH / 2 - companyBoxWidth / 2;
  const companyBoxY = Math.max(ceoY - 64, 0);

  const lineFrom = companyBoxY + companyBoxHeight;
  const lineTo = ceoY;
  const lineLeft = ceoX + BOX_WIDTH / 2;

  base.nodes.unshift(
    <div
      key={COMPANY_ID}
      ref={companyBoxRef}
      style={{
        position: "absolute",
        left: companyBoxX,
        top: companyBoxY,
        zIndex: 2,
      }}
    >
      <CompanyBox
        onClick={handlers.handleCompanyClick}
        boxRef={companyBoxRef}
      />
    </div>
  );
  base.lines.unshift(
    <VLine
      key="company-ceo-line"
      from={lineFrom}
      to={lineTo}
      left={lineLeft}
      {...(companyLineProps || {})}
    />
  );
  return base;
}

// --- Responsive Company Summary Modal ---
function CompanySummaryModal({
  open,
  onClose,
  allemployees,
  departmentsDemoData,
}) {
  if (!open) return null;

  // Remove bots & ai departments and employees
  const departments = filterOutBotsAiDepartments(departmentsDemoData);
  const filteredEmployees = filterEmployeesWithoutBotsAi(allemployees);

  // Keep only the first 8 departments for display, and force totalDepartments to 8
  const departmentsToShow = departments.slice(0, 8);
  const totalDepartments = 8;
  const totalEmployees = filteredEmployees.length;

  function subFunctionCountForDept(dept) {
    const positions = new Set(
      filteredEmployees
        .filter(
          (e) =>
            (e.department || "").toLowerCase() ===
            (dept.name || "").toLowerCase()
        )
        .map((e) => e.position)
    );
    return positions.size;
  }
  const totalSubFunctions = departmentsToShow.reduce(
    (acc, dept) => acc + subFunctionCountForDept(dept),
    0
  );
  function employeeCountForDept(deptName) {
    return filteredEmployees.filter(
      (e) =>
        (e.department || "").toLowerCase() === (deptName || "").toLowerCase()
    ).length;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl
          p-0 sm:p-8
          rounded-none sm:rounded-2xl
          min-h-[100svh] sm:min-h-0
          flex flex-col
        "
        style={{
          boxSizing: "border-box",
          padding: 0,
        }}
      >
        {/* Scrollable content */}
        <div
          className="
            flex-1 flex flex-col
            overflow-y-auto
            px-4 py-6 sm:p-0
            mb-[70px] sm:mb-0
            max-h-[calc(100svh-70px)]
            sm:max-h-[80vh]
          "
        >
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl md:text-2xl text-center">
              Unstoppable Inc. - Company Summary
            </DialogTitle>
          </DialogHeader>
          <div className="mb-3 flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="flex-1 min-w-[120px]">
              <div className="mb-2 text-base">
                <b>Total Employees:</b> {totalEmployees}
              </div>
              <div className="mb-2 text-base">
                <b>Total Departments:</b> {totalDepartments}
              </div>
              <div className="mb-2 text-base">
                <b>Total Sub Functions:</b> {totalSubFunctions}
              </div>
            </div>
          </div>
          <div
            className="
            mt-2 
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            gap-2
          "
          >
            {departmentsToShow.map((dept) => (
              <div
                key={dept.id || dept.name}
                className="
                  border border-gray-200 rounded bg-gray-50 flex flex-col
                  px-3 py-2
                  text-sm
                  min-w-0
                  max-h-[180px]
                  overflow-hidden
                "
                style={{
                  fontSize: "1rem",
                }}
              >
                <div className="font-semibold text-blue-700 truncate mb-1">
                  {dept.name}
                </div>
                <div>
                  <span className="font-medium">Employees:</span>{" "}
                  {employeeCountForDept(dept.name)}
                </div>
                <div>
                  <span className="font-medium">Sub Functions:</span>{" "}
                  {subFunctionCountForDept(dept)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Fixed Close Button */}
        <div
          className="
            fixed bottom-0 left-0 w-full
            sm:static sm:w-auto
            z-50
            px-4 pb-4 pt-2
            bg-white/90
            border-t border-gray-200
            sm:rounded-b-2xl
            flex justify-center
          "
          style={{
            maxWidth: "inherit",
          }}
        >
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
            style={{ maxWidth: 400 }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ... (rest of the code, including CreateOrgChartRequestModal and expandOrCollapseAll, remains unchanged)

function CreateOrgChartRequestModal({ open, onClose }) {
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

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setEmail("");
      setRole("");
      setCompanySize("");
      setSubmitted(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Request a Demo</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
            <p className="text-gray-600 mb-4">
              Thank you for requesting the demo! Our team will reach out to you
              to schedule a call and understand your requirements.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-1">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <Label htmlFor="role" className="mb-1">
                Role
              </Label>
              <Input
                id="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your role"
              />
            </div>

            <div>
              <Label htmlFor="companySize" className="mb-1">
                Company Size
              </Label>
              <select
                id="companySize"
                required
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>
                  Select company size
                </option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Get Started</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function expandOrCollapseAll(node, expand) {
  return {
    ...node,
    expanded: expand,
    children: node.children
      ? node.children.map((child) => expandOrCollapseAll(child, expand))
      : [],
  };
}

export default function OrgChartDemoStyledLikeOrgChart() {
  const router = useRouter();
  const [orgData, setOrgData] = useState(generateInitialOrgData());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shouldCenterCEO, setShouldCenterCEO] = useState(true);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showCreateOrgChartModal, setShowCreateOrgChartModal] = useState(false);

  const chartContainerRef = useRef(null);
  const boxRefs = useRef({});
  const companyBoxRef = useRef();

  function getBoxRef(id) {
    if (!boxRefs.current[id]) boxRefs.current[id] = React.createRef();
    return boxRefs.current[id];
  }

  useEffect(() => {
    const savedChart = localStorage.getItem("organizationChartAll");
    if (savedChart) {
      let loaded = JSON.parse(savedChart);
      loaded.expanded = true;
      if (loaded.children) {
        loaded.children = loaded.children.map((dept) => ({
          ...dept,
          expanded: false,
          children: dept.children.map((emp) => ({ ...emp, expanded: false })),
        }));
      }
      setOrgData(loaded);
      setIsCollapsed(false);
    } else {
      setOrgData(generateInitialOrgData());
      setIsCollapsed(false);
    }
    setShouldCenterCEO(true);
  }, []);

  useEffect(() => {
    if (!shouldCenterCEO) return;
    setTimeout(() => {
      const chartContainer = chartContainerRef.current;
      const ceoBox = getBoxRef("ceo-").current;
      if (chartContainer && ceoBox) {
        const chartRect = chartContainer.getBoundingClientRect();
        const ceoRect = ceoBox.getBoundingClientRect();
        const containerScrollLeft = chartContainer.scrollLeft;
        const ceoBoxCenter = ceoRect.left - chartRect.left + ceoRect.width / 2;
        const scrollLeft =
          ceoBoxCenter - chartRect.width / 2 + containerScrollLeft;
        chartContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
        const containerScrollTop = chartContainer.scrollTop;
        const ceoBoxCenterTop =
          ceoRect.top - chartRect.top + ceoRect.height / 2;
        const scrollTop =
          ceoBoxCenterTop - chartRect.height / 2 + containerScrollTop;
        chartContainer.scrollTo({
          top: Math.max(0, scrollTop),
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }
      setShouldCenterCEO(false);
    }, 100);
  }, [orgData, isCollapsed]);

  const generateId = () => Math.random().toString(36).substring(2, 11);

  const handleToggleExpand = (employeeId) => {
    setOrgData((prevOrgData) => {
      const updateEmployeeExpanded = (employee) => {
        if (employee.id === employeeId) {
          return { ...employee, expanded: !employee.expanded };
        }
        if (employee.children) {
          return {
            ...employee,
            children: employee.children.map(updateEmployeeExpanded),
          };
        }
        return employee;
      };
      const updated = updateEmployeeExpanded(prevOrgData);
      return updated;
    });

    setTimeout(() => {
      const chartContainer = chartContainerRef.current;
      const box = getBoxRef(employeeId).current;
      if (chartContainer && box) {
        const chartRect = chartContainer.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const containerScrollLeft = chartContainer.scrollLeft;
        const containerScrollTop = chartContainer.scrollTop;
        const boxCenter = boxRect.left - chartRect.left + boxRect.width / 2;
        const boxCenterTop = boxRect.top - chartRect.top + boxRect.height / 2;
        const scrollLeft =
          boxCenter - chartRect.width / 2 + containerScrollLeft;
        const scrollTop =
          boxCenterTop - chartRect.height / 2 + containerScrollTop;
        chartContainer.scrollTo({
          left: Math.max(0, scrollLeft),
          top: Math.max(0, scrollTop),
          behavior: "smooth",
        });
      }
    }, 120);
  };

  const toggleCollapseAll = () => {
    setShouldCenterCEO(true);
    setOrgData((prevData) => {
      const updated = expandOrCollapseAll(prevData, isCollapsed);
      localStorage.setItem("organizationChartAll", JSON.stringify(updated));
      return updated;
    });
    setIsCollapsed((prev) => !prev);
  };

  const handleAddSubordinate = (employeeId) => {
    setSelectedParentId(employeeId);
    setModalOpen(true);
  };

  const handleAddEmployee = (parentId, newEmployee) => {
    setShouldCenterCEO(false);
    const newEmployeeWithId = {
      ...newEmployee,
      id: generateId(),
      expanded: true,
    };
    const updateEmployeeChildren = (employee) => {
      if (employee.id === parentId) {
        const updatedChildren = employee.children
          ? [...employee.children, newEmployeeWithId]
          : [newEmployeeWithId];
        return { ...employee, children: updatedChildren, expanded: true };
      }
      if (employee.children) {
        return {
          ...employee,
          children: employee.children.map(updateEmployeeChildren),
        };
      }
      return employee;
    };
    const updatedData = updateEmployeeChildren(orgData);
    setOrgData(updatedData);
    localStorage.setItem("organizationChartAll", JSON.stringify(updatedData));
  };

  let layout = null,
    chartWidth = 0,
    chartHeight = 0,
    chartNodes = [],
    chartLines = [];
  if (orgData) {
    let normalLayout = computeLayout(orgData, 0, 0, false, null, 80);
    function getBounds(n) {
      let minX = n.x,
        maxX = n.x + BOX_WIDTH,
        maxY = n.y + BOX_HEIGHT;
      if (n.children) {
        for (const c of n.children) {
          const b = getBounds(c);
          minX = Math.min(minX, b.minX);
          maxX = Math.max(maxX, b.maxX);
          maxY = Math.max(maxY, b.maxY);
        }
      }
      return { minX, maxX, maxY };
    }
    const { minX, maxX, maxY } = getBounds(normalLayout);
    chartWidth = Math.max(maxX - minX + 64, 1.5 * BOX_WIDTH);
    chartHeight = maxY + 120;

    if (
      !orgData.expanded ||
      !orgData.children ||
      orgData.children.length === 0
    ) {
      layout = computeLayout(orgData, 0, 0, true, chartWidth, 80);
    } else {
      layout = normalLayout;
    }

    const refsMap = {};
    function collectRefs(node) {
      refsMap[node.id] = getBoxRef(node.id);
      if (node.children) node.children.forEach(collectRefs);
    }
    collectRefs(layout);

    const { nodes, lines } = renderTreeWithCompany(
      layout,
      {
        handleToggleExpand,
        handleAddSubordinate,
        handleCompanyClick: () => setShowCompanyModal(true),
      },
      refsMap,
      true,
      companyBoxRef,
      {}
    );
    chartNodes = nodes;
    chartLines = lines;
  }

  const navbarFont = "font-semibold tracking-tight";
  const isAnyDepartmentExpanded = orgData?.children?.some((d) => d.expanded);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-200">
      {/* --- Centered Chatbot for Mobile and Desktop --- */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center items-center z-50 pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <div className="max-w-xs w-full flex justify-center">
            <ChatbotBubble />
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 backdrop-blur-sm">
        <div className="flex flex-row justify-between items-center gap-4 max-w-full px-2 sm:px-6 py-4">
          <div className="flex-1 flex items-center">
            <span className="block sm:hidden text-lg font-bold text-gray-800 truncate">
              Demo Organizational Chart
            </span>
            <h1 className="hidden sm:block text-2xl font-bold text-gray-800">
              Demo Organizational Chart
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              className={`shadow-sm flex items-center text-black ${navbarFont} px-2 cursor-pointer`}
              onClick={toggleCollapseAll}
              type="button"
            >
              <ChevronIcon up={!isCollapsed} className="text-black w-5 h-5" />
              <span className="hidden sm:inline text-base">
                {isCollapsed ? "Expand All" : "Collapse All"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`shadow-sm flex items-center text-black ${navbarFont} px-2 cursor-pointer`}
              type="button"
              onClick={() => setShowCreateOrgChartModal(true)}
            >
              <Globe className="w-6 h-6 text-black" />
              <span className="hidden sm:inline text-base">
                Create Org Chart
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div style={{ height: 80 }} />
      <div
        ref={chartContainerRef}
        className="overflow-x-auto overflow-y-auto h-[calc(100vh-80px)] p-2 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100"
        style={{ minWidth: "100%" }}
      >
        {layout ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: chartHeight,
              minWidth: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                position: "relative",
                width: chartWidth,
                minHeight: chartHeight,
                background: "transparent",
              }}
            >
              {chartLines}
              {chartNodes}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No organization chart available.
            </p>
            <Button
              variant="outline"
              className="shadow-sm"
              type="button"
              onClick={() => setShowCreateOrgChartModal(true)}
            >
              <Globe className="w-6 h-6" />
              <span>Create New Chart</span>
            </Button>
          </div>
        )}
      </div>
      <AddEmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEmployee={handleAddEmployee}
        parentId={selectedParentId}
      />
      <CompanySummaryModal
        open={showCompanyModal}
        onClose={() => setShowCompanyModal(false)}
        allemployees={allemployees}
        departmentsDemoData={departmentsDemoData}
      />
      <CreateOrgChartRequestModal
        open={showCreateOrgChartModal}
        onClose={() => setShowCreateOrgChartModal(false)}
      />
    </div>
  );
}
