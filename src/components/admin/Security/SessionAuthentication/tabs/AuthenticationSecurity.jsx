// =============================================================================
// Session & Authentication — Tab 2: Authentication Security
// Self-contained: mock data, helpers, and JSX live in this file.
// Sections:
//   - Account Lockout (failed attempts, lockout duration, captcha)
//   - Password Policy (expiry, length, history, complexity)
//   - Two Factor Authentication (Admin 2FA, validation status)
//   - Footer: Run 2FA Validation + Save Configuration
// =============================================================================

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// -----------------------------------------------------------------------------
// MOCK DATA / OPTIONS (swap for API response later)
// -----------------------------------------------------------------------------
const LOCKOUT_DURATIONS = [
  "15 Minutes",
  "30 Minutes",
  "60 Minutes",
  "24 Hours",
];

const PASSWORD_EXPIRY = ["30 Days", "60 Days", "90 Days", "180 Days"];

// -----------------------------------------------------------------------------
// AuthenticationSecurity — Tab 2 content
// -----------------------------------------------------------------------------
export default function AuthenticationSecurity() {
  const [failedAttempts, setFailedAttempts] = useState(5);
  const [lockoutDuration, setLockoutDuration] = useState("15 Minutes");
  const [captcha, setCaptcha] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState("90 Days");
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordHistory, setPasswordHistory] = useState(5);
  const [complexity, setComplexity] = useState(true);
  const [admin2fa, setAdmin2fa] = useState(true);

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 p-1">
      {/* ---------------------------------------------------------------- */}
      {/* Section title */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">
        Authentication Security
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Account Lockout */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Account Lockout
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SuffixInput
          label="Failed Attempts"
          value={failedAttempts}
          onChange={setFailedAttempts}
          suffix="Attempts"
        />
        <SelectField
          label="Lockout Duration"
          value={lockoutDuration}
          onChange={setLockoutDuration}
          options={LOCKOUT_DURATIONS}
        />
      </div>

      <div className="mt-4">
        <ToggleRow
          label="Captcha"
          checked={captcha}
          onChange={() => setCaptcha((prev) => !prev)}
        />
      </div>
      <div className="border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Password Policy */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-6 text-[16px] font-medium text-[#3D3D3D]">
        Password Policy
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <SelectField
          label="Admin Password Expiry"
          value={passwordExpiry}
          onChange={setPasswordExpiry}
          options={PASSWORD_EXPIRY}
        />
        <SuffixInput
          label="Failed Attempts"
          value={passwordLength}
          onChange={setPasswordLength}
          suffix="Characters"
        />
        <SuffixInput
          label="Password History"
          value={passwordHistory}
          onChange={setPasswordHistory}
          suffix="Remembered"
        />
      </div>

      <div className="mt-4">
        <ToggleRow
          label="Complexity"
          checked={complexity}
          onChange={() => setComplexity((prev) => !prev)}
        />
      </div>
      <div className=" border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Two Factor Authentication */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-6 text-[16px] font-medium text-[#3D3D3D]">
        Two Factor Authentication
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-2">
        <ToggleRow
          label="Admin 2FA"
          checked={admin2fa}
          onChange={() => setAdmin2fa((prev) => !prev)}
        />

        <div className="flex items-center justify-between gap-4 py-4">
          <p className="text-[16px] font-medium text-[#3D3D3D]">
            Validation Status
          </p>
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-[12px] font-semibold min-w-[76px] bg-[#33B46926] text-[#33B469]">
            Passed
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Footer actions */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-5 flex flex-col sm:flex-row sm:justify-end gap-3">
        <button
          type="button"
          className="cursor-pointer h-[44px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
        >
          Run 2FA Validation
        </button>
        <button
          type="button"
          className="cursor-pointer h-[44px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SuffixInput — number input with a right-aligned unit label (e.g. Attempts)
// -----------------------------------------------------------------------------
function SuffixInput({ label, value, onChange, suffix }) {
  return (
    <div>
      <label className="block text-[16px] font-medium text-[#3D3D3D] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 1)}
          className="w-full h-[44px] rounded-[12px] border border-[#D9DCE5] bg-white pl-3.5 pr-28 text-[14px] text-[#3D3D3D] focus:outline-none focus:border-[#4866F6]"
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[#98A2B3]">
          {suffix}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SelectField — labeled dropdown with chevron
// -----------------------------------------------------------------------------
function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[16px] font-medium text-[#3D3D3D] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[44px] appearance-none rounded-[12px] border border-[#D9DCE5] bg-white px-3.5 pr-9 text-[14px] text-[#586D93] focus:outline-none focus:border-[#4866F6] cursor-pointer"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#586D93]" />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ToggleRow — label + blue on/off switch
// -----------------------------------------------------------------------------
function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-[16px] font-medium text-[#3D3D3D]">{label}</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-colors duration-300" />
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm" />
      </label>
    </div>
  );
}
