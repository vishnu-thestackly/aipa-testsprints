// =============================================================================
// Session & Authentication — Tab 1: Session Security
// Self-contained: mock data, helpers, and JSX live in this file.
// Sections:
//   - Session Policies (timeouts, concurrent toggle, max sessions)
//   - Token Security (encryption, storage, expiry)
//   - Save Configuration
//   - Active Sessions table + Revoke / Revoke All Other Sessions
// =============================================================================

import { useEffect, useRef, useState } from "react";

// -----------------------------------------------------------------------------
// MOCK DATA (swap for API response later)
// -----------------------------------------------------------------------------
const ACTIVE_SESSIONS = [
  {
    id: 1,
    user: "User001",
    device: "Chrome",
    login: "10:20",
    lastActivity: "10:45",
  },
  {
    id: 2,
    user: "User002",
    device: "Mobile",
    login: "11:00",
    lastActivity: "11:15",
  },
];

// -----------------------------------------------------------------------------
// SessionSecurity — Tab 1 content
// -----------------------------------------------------------------------------
export default function SessionSecurity() {
  const [concurrentSessions, setConcurrentSessions] = useState(true);
  const [maxSessions, setMaxSessions] = useState(3);
  // Ref for the Active Sessions table (drives the custom blue scrollbar)
  const tableScrollRef = useRef(null);

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 p-1">
      {/* ---------------------------------------------------------------- */}
      {/* Section title */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">
        Session Security
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Session Policies */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D] mt-4">
        Session Policies
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5">
        <SettingRow label="User Inactivity Timeout">
          <span className="text-[16px] text-[#586D93]">30 Minutes</span>
        </SettingRow>

        <SettingRow label="Admin Inactivity Timeout">
          <span className="text-[16px] text-[#586D93]">30 Minutes</span>
        </SettingRow>

        <SettingRow label="Concurrent Sessions">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={concurrentSessions}
              onChange={() => setConcurrentSessions((prev) => !prev)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-colors duration-300" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm" />
          </label>
        </SettingRow>

        <SettingRow label="Maximum Sessions">
          <input
            type="number"
            min={1}
            value={maxSessions}
            onChange={(e) => setMaxSessions(Number(e.target.value) || 1)}
            className="w-[64px] h-[36px] text-center rounded-[8px] border border-[#D9DCE5] text-[14px] text-[#586D93] focus:outline-none focus:border-[#4866F6]"
          />
        </SettingRow>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Token Security */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-2 border-b border-[#CFCFCF]" />
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Token Security
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-2">
        <SettingRow label="Token Encryption">
          <span className="inline-flex items-center justify-center h-[32px] px-5 rounded-md bg-[#4866F6] text-white text-[14px] font-medium">
            Enabled
          </span>
        </SettingRow>

        <SettingRow label="Secure Storage">
          <span className="inline-flex items-center justify-center h-[32px] px-5 rounded-md bg-[#4866F6] text-white text-[14px] font-medium">
            Enabled
          </span>
        </SettingRow>

        <SettingRow label="Token Expiry">
          <span className="text-[16px] text-[#586D93]">30 Minutes</span>
        </SettingRow>
      </div>

      {/* Save Configuration */}
      <div className="mt-5">
        <button
          type="button"
          className="cursor-pointer h-[44px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
        >
          Save Configuration
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Active Sessions table + bottom blue horizontal scroll indicator */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-8 border-b border-[#CFCFCF]" />
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Active Sessions
      </h3>
      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#CFCFCF]">
        <div
          ref={tableScrollRef}
          className="min-h-0 min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-lg:touch-auto min-[1441px]:overflow-x-visible"
        >
          <table className="w-full text-left border-collapse max-[1440px]:min-w-[720px] min-[1441px]:min-w-0">
            <thead>
              <tr className="bg-[#EEF2FF] text-[#3D3D3D] text-[14px] font-medium border-b border-[#E2E8F0]">
                <th className="py-4 px-5 font-medium">SL No</th>
                <th className="py-4 px-5 font-medium">User</th>
                <th className="py-4 px-5 font-medium">Device</th>
                <th className="py-4 px-5 font-medium">Login</th>
                <th className="py-4 px-5 font-medium">Last Activity</th>
                <th className="py-4 px-5 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
              {ACTIVE_SESSIONS.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="py-4 px-5 text-[#586D93]">{row.id}</td>
                  <td className="py-4 px-5 text-[#586D93]">{row.user}</td>
                  <td className="py-4 px-5 text-[#586D93]">{row.device}</td>
                  <td className="py-4 px-5 text-[#586D93]">{row.login}</td>
                  <td className="py-4 px-5 text-[#586D93]">
                    {row.lastActivity}
                  </td>
                  <td className="py-4 px-5 text-center">
                    <button
                      type="button"
                      className="cursor-pointer inline-flex items-center justify-center h-[32px] px-4 rounded-full bg-[#FF3B3026] text-[#FF3B30] text-[13px] font-medium hover:bg-[#FF3B3033] transition-colors"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom blue scrollbar — shown only when table overflows horizontally */}
        <div className="shrink-0 px-2 py-3 min-[1441px]:hidden">
          <div className="min-h-1">
            <HorizontalScrollIndicator
              scrollRef={tableScrollRef}
              className="block"
            />
          </div>
        </div>
      </div>

      {/* Revoke all other sessions */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="cursor-pointer h-[44px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3d57e6] text-white text-[14px] font-medium transition-colors"
        >
          Revoke All Other Sessions
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SettingRow — label on the left, control/value on the right
// -----------------------------------------------------------------------------
function SettingRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-[16px] font-medium text-[#3D3D3D]">{label}</p>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// HorizontalScrollIndicator — custom blue scrollbar for wide tables
// -----------------------------------------------------------------------------
function HorizontalScrollIndicator({ scrollRef, className = "" }) {
  const [thumb, setThumb] = useState({ width: 75, left: 0 });
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = scrollRef?.current;
    if (!element) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const overflow = scrollWidth > clientWidth + 1;
      setHasOverflow(overflow);

      if (!overflow) {
        setThumb({ width: 100, left: 0 });
        return;
      }

      const widthPercent = (clientWidth / scrollWidth) * 100;
      const maxLeft = 100 - widthPercent;
      const leftPercent =
        maxLeft <= 0 ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxLeft;

      setThumb({ width: widthPercent, left: leftPercent });
    };

    update();
    element.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollRef]);

  if (!hasOverflow) return null;

  return (
    <div
      className={`relative h-1 w-full rounded-full bg-[#E0E0E0] ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4866F6] transition-[left,width] duration-150 ease-out"
        style={{
          width: `${thumb.width}%`,
          left: `${thumb.left}%`,
        }}
      />
    </div>
  );
}
