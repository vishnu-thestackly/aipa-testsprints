import React, { useState, useRef } from "react";
import {
  RefreshCw,
  ChevronDown
} from "lucide-react";

import exportIcon from "../../../assets/images/export_icon.svg";
import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";
import frame01 from "../../../assets/images/frame01.png";
import frame02 from "../../../assets/images/frame02.png";
import frame03 from "../../../assets/images/frame03.png";
import frame04 from "../../../assets/images/frame04.png";

export default function PerformanceOverview() {
  const [dateRange, setDateRange] = useState("");
  const [integration, setIntegration] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "",
    integration: "All",
  });

  const dateInputRef = useRef(null);

  const handleApply = () => {
    setAppliedFilters({ dateRange, integration });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const overviewCards = [
    {
      id: 1,
      value: "94.2%",
      label: "Intent Accuracy",
      image: frame01,
    },
    {
      id: 2,
      value: "89.5%",
      label: "Task Success",
      image: frame02,
    },
    {
      id: 3,
      value: "4.5%",
      label: "Error Rate",
      image: frame03,
    },
    {
      id: 4,
      value: "5.7%",
      label: "Fallback Rate",
      image: frame04,
    },
  ];

  const metricsTable = [
    {
      slNo: 1,
      metric: "Response Time",
      current: "1.8 Sec",
      previous: "1.5 Sec",
      target: "<2",
      status: "Good",
    },
    {
      slNo: 2,
      metric: "Confidence Score",
      current: "93.4%",
      previous: "91.4%",
      target: ">90%",
      status: "Good",
    },
    {
      slNo: 3,
      metric: "Memory Hit Rate",
      current: "78.6%",
      previous: "74%",
      target: ">75%",
      status: "Good",
    },
    {
      slNo: 4,
      metric: "Intent Accuracy",
      current: "94.8%",
      previous: "92.1%",
      target: ">90%",
      status: "Good",
    },
    {
      slNo: 5,
      metric: "Task Completion",
      current: "89.5%",
      previous: "86%",
      target: ">90%",
      status: "Review",
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">

      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Performance Overview
          </h1>

          <div className="flex items-center gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="h-[40px] px-5 rounded-full bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>

            {/* Export Button */}
            <button
              type="button"
              className="h-[40px] px-5 rounded-full bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span>Export</span>
              <img src={exportIcon} alt="Export" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar with Apply Button on Right (matching Performance Insights sizing) */}
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
                  <option value="EXchange">EXchange</option>
                  <option value="Jira">Jira</option>
                  <option value="Trello">Trello</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Empty 3rd slot placeholder to maintain identical box sizes */}
            <div className="hidden sm:block"></div>
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

        {/* 4 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {overviewCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[20px] border border-[#E9EDF5] p-5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#4866F633] transition-all"
            >
              {/* Frame Image on Left */}
              <img
                src={card.image}
                alt={card.label}
                className="w-[54px] h-[54px] object-contain shrink-0"
              />

              {/* Content */}
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

        {/* AI Performance Metrics Section */}
        <div className="mt-8">
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            AI Performance Metrics
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Metric</th>
                  <th className="py-4 px-6 font-medium">Current</th>
                  <th className="py-4 px-6 font-medium">Previous</th>
                  <th className="py-4 px-6 font-medium">Target</th>
                  <th className="py-4 px-6 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {metricsTable.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.metric}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.current}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">{row.previous}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.target}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-[12px] font-semibold min-w-[76px] ${
                          row.status === "Good"
                            ? "bg-[#33B46926] text-[#33B469]"
                            : "bg-[#F59E0B26] text-[#F59E0B]"
                        }`}
                      >
                        {row.status}
                      </span>
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
