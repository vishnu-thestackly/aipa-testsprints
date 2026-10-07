// =============================================================================
// Security Testing & Vulnerabilities — Tab 1: Security Testing
// Self-contained: mock data, helpers, and JSX live in this file.
// Sections:
//   - Test Type radios (OWASP / API / Authentication / Authorization)
//   - Environment dropdown + Start Security Test
//   - Test Result list with status pills
//   - Footer actions: View Findings, Download Reports, Retest
// =============================================================================

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// -----------------------------------------------------------------------------
// MOCK DATA (swap for API response later)
// -----------------------------------------------------------------------------
const TEST_TYPES = [
  "OWASP Top 10",
  "API Security",
  "Authentication",
  "Authorization",
];

const ENVIRONMENTS = ["Staging", "Development", "Production"];

const TEST_RESULTS = [
  { label: "Injection", status: "Passed", variant: "success" },
  { label: "Broken Authentication", status: "Passed", variant: "success" },
  { label: "Access Control", status: "Warning", variant: "warning" },
  { label: "Security Misconfiguration", status: "Failed", variant: "danger" },
  { label: "API Security", status: "Passed", variant: "success" },
];

// Status pill color map: success (green), warning (orange), danger (red)
const STATUS_STYLES = {
  success: "bg-[#33B46926] text-[#33B469]",
  warning: "bg-[#F59E0B26] text-[#F59E0B]",
  danger: "bg-[#FF3B3026] text-[#FF3B30]",
};

// -----------------------------------------------------------------------------
// SecurityTesting — Tab 1 content
// -----------------------------------------------------------------------------
export default function SecurityTesting() {
  const [testType, setTestType] = useState("OWASP Top 10");
  const [environment, setEnvironment] = useState("Staging");

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 p-1">
      {/* ---------------------------------------------------------------- */}
      {/* Test Type — radio group */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">Test Type</h3>

      <div className="mt-3 border-b border-[#CFCFCF]" />

      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
        {TEST_TYPES.map((type) => (
          <label
            key={type}
            className="inline-flex items-center gap-2.5 cursor-pointer"
          >
            <span className="relative flex h-[18px] w-[18px] items-center justify-center">
              <input
                type="radio"
                name="testType"
                value={type}
                checked={testType === type}
                onChange={() => setTestType(type)}
                className="peer sr-only"
              />
              <span className="h-[18px] w-[18px] rounded-full border-2 border-[#4866F6]" />
              <span className="absolute h-2.5 w-2.5 rounded-full bg-[#4866F6] opacity-0 peer-checked:opacity-100" />
            </span>
            <span className="text-[14px] text-[#3D3D3D]">{type}</span>
          </label>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Environment dropdown */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-6 w-full sm:w-[220px]">
        <label className="block text-[14px] font-medium text-[#3D3D3D] mb-1.5">
          Environment
        </label>
        <div className="relative">
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full h-[44px] appearance-none rounded-[8px] border border-[#D9DCE5] bg-white px-3.5 pr-9 text-[14px] text-[#586D93] focus:outline-none focus:border-[#4866F6] cursor-pointer"
          >
            {ENVIRONMENTS.map((env) => (
              <option key={env} value={env}>
                {env}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#586D93]" />
        </div>
      </div>

      {/* Start Security Test */}
      <div className="mt-5">
        <button
          type="button"
          className="cursor-pointer w-full sm:w-50 h-[44px] px-6 rounded-md bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
        >
          Start Security Test
        </button>
      </div>

      <div className="mt-6 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Test Result — category + status pill per row */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-5">
        <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-4">
          Test Result
        </h3>

        <div className="mt-3 mb-3 border-b border-[#CFCFCF]" />

        <div className="flex flex-col gap-4">
          {TEST_RESULTS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3"
            >
              <p className="text-[16px] font-medium text-[#3D3D3D]">
                {item.label}
              </p>
              <span
                className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-[12px] font-semibold min-w-[84px] ${
                  STATUS_STYLES[item.variant]
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Footer actions */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
        <ActionButton label="View Findings" />
        <ActionButton label="Download Reports" />
        <ActionButton label="Retest" />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ActionButton — primary blue pill used in the footer
// -----------------------------------------------------------------------------
function ActionButton({ label }) {
  return (
    <button
      type="button"
      className="cursor-pointer h-[44px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
    >
      {label}
    </button>
  );
}
