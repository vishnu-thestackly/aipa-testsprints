// =============================================================================
// Session & Authentication — parent shell
// Outer card + 2-way pill tab switcher:
//   1) Session Security
//   2) Authentication Security
// Each tab lives in its own file under ./tabs and is imported here.
// =============================================================================

import { useState } from "react";

import SessionSecurity from "./tabs/SessionSecurity";
import AuthenticationSecurity from "./tabs/AuthenticationSecurity";

// Tab definitions for the pill switcher
const TABS = [
  { id: "session", label: "Session Security" },
  { id: "authentication", label: "Authentication Security" },
];

export default function SessionAuthentication() {
  // Active tab: "session" | "authentication"
  const [activeTab, setActiveTab] = useState("session");

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">
        {/* ---------------------------------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------------------------------- */}
        <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
          <h2 className="text-[18px] font-medium text-[#3D3D3D]">
            Session & Authentication
          </h2>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Pill tab switcher — mobile scroll; desktop right-aligned */}
        {/* ---------------------------------------------------------------- */}
        <div className="px-4 md:px-5 lg:px-7">
          {/* Mobile / tablet */}
          <div className="w-full border border-[#D9D9D9] rounded-full bg-white p-1 overflow-hidden lg:hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max gap-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-[44px] min-w-[285px] px-6 whitespace-nowrap rounded-full text-[14px] font-medium transition-all duration-200 flex-shrink-0 cursor-pointer
                      ${
                        activeTab === tab.id
                          ? "bg-[#4866F6] text-white"
                          : "text-[#586D93]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex justify-end">
            <div className="w-[680px] h-[48px] flex items-center rounded-full border border-[#D9D9D9] bg-white p-1 gap-[5px]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 h-full rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer
                    ${
                      activeTab === tab.id
                        ? "bg-[#4866F6] text-white shadow-md"
                        : "text-[#586D93] hover:text-[#3D3D3D]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Tab content */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "session" && <SessionSecurity />}
        {activeTab === "authentication" && <AuthenticationSecurity />}
      </div>
    </div>
  );
}
