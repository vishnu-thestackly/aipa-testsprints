// =============================================================================
// Behavior Learning — parent shell
// Outer card + 3-way pill tab switcher:
//   1) Behavior Learning Dashboard
//   2) AI Learning Engine
//   3) Explicit Feedback
// Each tab lives in its own file under ./tabs and is imported here.
// =============================================================================

import { useState } from "react";

import LearningDashboard from "./tabs/LearningDashboard";
import LearningEngine from "./tabs/LearningEngine";
import ExplicitFeedback from "./tabs/ExplicitFeedback";

export default function BehaviorLearning() {
  // Active tab: "dashboard" | "engine" | "feedback"
  const [activeTab, setActiveTab] = useState("dashboard");

  // Tab definitions for the pill switcher
  const tabs = [
    { id: "dashboard", label: "Behavior Learning Dashboard" },
    { id: "engine", label: "AI Learning Engine" },
    { id: "feedback", label: "Explicit Feedback" },
  ];

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">
        {/* ---------------------------------------------------------------- */}
        {/* Header */}
        {/* ---------------------------------------------------------------- */}
        <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
          <h2 className="text-[18px] font-medium text-[#3D3D3D]">
            Behavior Learning
          </h2>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Pill tab switcher */}
        {/* ---------------------------------------------------------------- */}
        <div className="px-4 md:px-5 lg:px-7">
          <div className="w-full border border-[#D9D9D9] rounded-full bg-white p-1 overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max xl:grid xl:grid-cols-3 xl:min-w-0 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`h-[44px] min-w-[200px] xl:min-w-0 px-6 xl:px-0 whitespace-nowrap rounded-full text-[14px] font-medium transition-all duration-200 xl:w-full flex-shrink-0 cursor-pointer
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
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Tab content */}
        {/* ---------------------------------------------------------------- */}

        {/* Tab 1: Behavior Learning Dashboard */}
        {activeTab === "dashboard" && <LearningDashboard />}

        {/* Tab 2: AI Learning Engine */}
        {activeTab === "engine" && <LearningEngine />}

        {/* Tab 3: Explicit Feedback */}
        {activeTab === "feedback" && <ExplicitFeedback />}
      </div>
    </div>
  );
}
