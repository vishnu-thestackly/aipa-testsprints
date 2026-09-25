import React, { useState, useRef } from "react";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";

import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";
import frame2 from "../../../assets/images/frame2.png";
import frame3 from "../../../assets/images/frame3.png";
import requestIcon from "../../../assets/images/request.png";

export default function UsageTrendAnalytics() {
  const [dateRange, setDateRange] = useState("");
  const [integration, setIntegration] = useState("All");
  const [userType, setUserType] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "",
    integration: "All",
    userType: "All",
  });

  const dateInputRef = useRef(null);

  const handleApply = () => {
    setAppliedFilters({ dateRange, integration, userType });
  };

  const summaryCards = [
    {
      id: 1,
      value: "25,480",
      label: "Conversations",
      image: frame2,
    },
    {
      id: 2,
      value: "18,920",
      label: "Actions",
      image: requestIcon,
      withCircleBg: true,
    },
    {
      id: 3,
      value: "16,740",
      label: "Completions",
      image: frame3,
    },
  ];

  const funnelStages = [
    {
      id: "conversations",
      label: "Conversations",
      value: "25,480",
      barWidth: 75,
      conversion: "74.2%",
    },
    {
      id: "actions",
      label: "Actions",
      value: "18,920",
      barWidth: 90,
      conversion: "88.5%",
    },
    {
      id: "completed",
      label: "Completed",
      value: "16,740",
      barWidth: 85,
      conversion: null,
    },
  ];

  const integrationRanking = [
    {
      slNo: 1,
      rank: 1,
      integration: "Outlook",
      usageCount: "4610",
      usagePercent: "34.3%",
      completionRate: "92.4%",
      trend: "up",
    },
    {
      slNo: 2,
      rank: 2,
      integration: "Exchange",
      usageCount: "6320",
      usagePercent: "25.4%",
      completionRate: "87.5%",
      trend: "up",
    },
    {
      slNo: 3,
      rank: 3,
      integration: "Jira",
      usageCount: "4230",
      usagePercent: "17.1%",
      completionRate: "85.3%",
      trend: "down",
    },
    {
      slNo: 4,
      rank: 4,
      integration: "Trello",
      usageCount: "3020",
      usagePercent: "15.1%",
      completionRate: "84.7%",
      trend: "down",
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Usage Trend Analysis
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto] gap-4 mt-6 mb-8 items-end">
          {/* Date Range */}
          <div>
            <label className="block text-[14px] font-medium text-black mb-1.5">
              Date Range
            </label>
            <div
              onClick={() => {
                if (dateInputRef.current) {
                  dateInputRef.current.showPicker?.() ||
                    dateInputRef.current.focus();
                }
              }}
              className="relative h-[44px] px-3.5 rounded-[12px] border border-[#D9DCE5] bg-white flex items-center justify-between cursor-pointer hover:border-[#4866F6] transition-colors w-full"
            >
              <span
                className={`text-[14px] ${dateRange ? "text-[#1E293B]" : "text-[#586D93]"}`}
              >
                {dateRange ? dateRange : "Select Date"}
              </span>
              <input
                ref={dateInputRef}
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <img
                src={calendarIcon}
                alt="Calendar"
                className="w-4 h-4 shrink-0 pointer-events-none"
              />
            </div>
          </div>

          {/* Integration */}
          <div>
            <label className="block text-[14px] font-medium text-black mb-1.5">
              Integration
            </label>
            <div className="relative w-full">
              <select
                value={integration}
                onChange={(e) => setIntegration(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 rounded-[12px] border border-[#D9DCE5] bg-white text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Outlook">Outlook</option>
                <option value="Exchange">Exchange</option>
                <option value="Jira">Jira</option>
                <option value="Trello">Trello</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* User Type */}
          <div>
            <label className="block text-[14px] font-medium text-black mb-1.5">
              User Type
            </label>
            <div className="relative w-full">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 rounded-[12px] border border-[#D9DCE5] bg-white text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Apply Button — sits beside User Type on tablet */}
          <div className="shrink-0">
            <button
              onClick={handleApply}
              className="w-full xl:w-auto h-[44px] px-8 rounded-[12px] bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <img src={filterIcon} alt="Apply" className="w-4 h-4" />
              <span>Apply</span>
            </button>
          </div>
        </div>

        {/* Divider Line below Filter Bar */}
        <div className="border-t border-[#CFCFCF] w-full mb-8" />

        {/* Summary KPI Cards — 2-col on tablet, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[20px] border border-[#E9EDF5] p-5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#4866F633] transition-all"
            >
              {card.withCircleBg ? (
                <div className="w-[54px] h-[54px] rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ) : (
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-[54px] h-[54px] object-contain shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[24px] font-bold text-[#1E293B] leading-tight">
                  {card.value}
                </div>
                <div className="text-[14px] text-[#586D93] mt-0.5 truncate">
                  {card.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation Funnel Section */}
        <div className="mb-10">
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Conversation Funnel
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {funnelStages.map((stage) => (
              <div key={stage.id}>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[14px] font-medium text-[#334155]">
                    {stage.label}
                  </span>
                  <span className="text-[14px] font-semibold text-[#1E293B]">
                    {stage.value}
                  </span>
                </div>
                <div className="w-full h-[10px] bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4866F6] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${stage.barWidth}%` }}
                  />
                </div>
                {stage.conversion && (
                  <div
                    className="flex items-center justify-end gap-1 mt-2"
                    style={{ width: `${stage.barWidth}%` }}
                  >
                    <ArrowDown
                      className="w-3.5 h-3.5 text-[#EF4444]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[13px] font-semibold text-[#EF4444]">
                      {stage.conversion}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-2">
            <p className="text-[16px] font-semibold text-[#1E293B]">
              Overall Conversation Rate:{" "}
              <span className="text-[#1E293B]">65.4%</span>
            </p>
          </div>
        </div>

        {/* Integration Utilization Ranking */}
        <div>
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Integration Utilization Ranking
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto blue-scrollbar rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full min-w-[860px] text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Rank</th>
                  <th className="py-4 px-6 font-medium">Integration</th>
                  <th className="py-4 px-6 font-medium">Usage Count</th>
                  <th className="py-4 px-6 font-medium">Usage%</th>
                  <th className="py-4 px-6 font-medium">Completion Rate</th>
                  <th className="py-4 px-6 font-medium text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {integrationRanking.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.rank}</td>
                    <td className="py-4 px-6 text-[#586D93] ">
                      {row.integration}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.usageCount}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.usagePercent}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.completionRate}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center">
                        {row.trend === "up" ? (
                          <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center">
                            <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
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
      </div>
    </div>
  );
}
