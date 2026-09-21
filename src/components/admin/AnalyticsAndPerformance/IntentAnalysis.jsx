import React, { useState, useRef } from "react";
import {
  ChevronDown,
  ArrowUp,
  ArrowRight,
  ArrowDown
} from "lucide-react";

import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";

export default function IntentAnalysis() {
  const [dateRange, setDateRange] = useState("");
  const [intent, setIntent] = useState("All");
  const [status, setStatus] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "",
    intent: "All",
    status: "All",
  });

  const dateInputRef = useRef(null);

  const handleApply = () => {
    setAppliedFilters({ dateRange, intent, status });
  };

  const topIntentsTable = [
    {
      slNo: 1,
      intent: "Schedule Meeting",
      usage: "4,320",
      accuracy: "96.5%",
      confidence: "94%",
      successRate: "94.4%",
      trend: "up",
    },
    {
      slNo: 2,
      intent: "Create Task",
      usage: "3,120",
      accuracy: "95.6%",
      confidence: "92%",
      successRate: "91.8%",
      trend: "up",
    },
    {
      slNo: 3,
      intent: "Draft Email",
      usage: "2,295",
      accuracy: "93.5%",
      confidence: "90%",
      successRate: "89.6%",
      trend: "right",
    },
    {
      slNo: 4,
      intent: "Set Reminder",
      usage: "2,070",
      accuracy: "91.4%",
      confidence: "88%",
      successRate: "86.3%",
      trend: "down",
    },
  ];

  const underPerformingTable = [
    {
      slNo: 1,
      intent: "Set Reminder",
      accuracy: "81.4%",
      fallback: "11.2%",
      confidence: "76%",
      issue: "Low Accuracy",
    },
    {
      slNo: 2,
      intent: "Draft Email",
      accuracy: "84.5%",
      fallback: "8.5%",
      confidence: "81%",
      issue: "High Fallback",
    },
    {
      slNo: 3,
      intent: "Create Task",
      accuracy: "87.2%",
      fallback: "6.8%",
      confidence: "85%",
      issue: "Low Confidence",
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">

      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Intent Analytics
          </h1>
        </div>

        {/* Filter Bar with Apply Button on Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 mt-6 mb-8">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-[14px] font-medium text-black mb-1.5">
                Date Range
              </label>
              <div
                onClick={() => {
                  if (dateInputRef.current) {
                    dateInputRef.current.showPicker?.() || dateInputRef.current.focus();
                  }
                }}
                className="relative h-[44px] px-3.5 rounded-[12px] border border-[#D9DCE5] bg-white flex items-center justify-between cursor-pointer hover:border-[#4866F6] transition-colors w-full"
              >
                <span className={`text-[14px] ${dateRange ? "text-[#1E293B]" : "text-[#586D93]"}`}>
                  {dateRange ? dateRange : "Select Date"}
                </span>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <img src={calendarIcon} alt="Calendar" className="w-4 h-4 shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Intent */}
            <div>
              <label className="block text-[14px] font-medium text-black mb-1.5">
                Intent
              </label>
              <div className="relative w-full">
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full h-[44px] px-3.5 pr-8 rounded-[12px] border border-[#D9DCE5] bg-white text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Schedule Meeting">Schedule Meeting</option>
                  <option value="Create Task">Create Task</option>
                  <option value="Draft Email">Draft Email</option>
                  <option value="Set Reminder">Set Reminder</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[14px] font-medium text-black mb-1.5">
                Status
              </label>
              <div className="relative w-full">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-[44px] px-3.5 pr-8 rounded-[12px] border border-[#D9DCE5] bg-white text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Apply Button on Right */}
          <div className="shrink-0">
            <button
              onClick={handleApply}
              className="w-full md:w-auto h-[44px] px-8 rounded-[12px] bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <img src={filterIcon} alt="Apply" className="w-4 h-4" />
              <span>Apply</span>
            </button>
          </div>
        </div>

        {/* Divider Line below Filter Bar */}
        <div className="border-t border-[#CFCFCF] w-full mb-8" />

        {/* Section 1: Top Performing Intents */}
        <div className="mb-10">
          <h2 className="text-[18px] font-semibold text-[#1E293B] pb-4">
            Top Performing Intents
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Intent</th>
                  <th className="py-4 px-6 font-medium">Usage</th>
                  <th className="py-4 px-6 font-medium">Accuracy</th>
                  <th className="py-4 px-6 font-medium">Confidence</th>
                  <th className="py-4 px-6 font-medium">Success Rate</th>
                  <th className="py-4 px-6 font-medium text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {topIntentsTable.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.intent}
                    </td>
                    <td className="py-4 px-6 text-[#586D93] font-medium">
                      {row.usage}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">{row.accuracy}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.confidence}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.successRate}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {row.trend === "up" && (
                          <div className="w-[54px] h-[30px] rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                          </div>
                        )}
                        {row.trend === "right" && (
                          <div className="w-[54px] h-[30px] rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                          </div>
                        )}
                        {row.trend === "down" && (
                          <div className="w-[54px] h-[30px] rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center">
                            <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Under Performing Intents */}
        <div>
          <div className="border-t border-[#CFCFCF] w-full mb-8" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] pb-4">
            Under Performing Intents
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Intent</th>
                  <th className="py-4 px-6 font-medium">Accuracy</th>
                  <th className="py-4 px-6 font-medium">Fallback</th>
                  <th className="py-4 px-6 font-medium">Confidence</th>
                  <th className="py-4 px-6 font-medium">Issue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {underPerformingTable.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.intent}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">{row.accuracy}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.fallback}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.confidence}
                    </td>
                    <td className="py-4 px-6 text-[#586D93] font-medium">
                      {row.issue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
