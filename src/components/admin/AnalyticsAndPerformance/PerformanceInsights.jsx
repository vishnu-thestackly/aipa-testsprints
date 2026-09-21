import React, { useState, useRef } from "react";
import {
  RefreshCw,
  ChevronDown
} from "lucide-react";

import exportIcon from "../../../assets/images/export_icon.svg";
import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";
import frame1 from "../../../assets/images/frame1.png";
import frame2 from "../../../assets/images/frame2.png";
import frame3 from "../../../assets/images/frame3.png";
import frame4 from "../../../assets/images/frame4.png";
import frame5 from "../../../assets/images/frame5.png";
import frame6 from "../../../assets/images/frame6.png";
import frame7 from "../../../assets/images/frame7.png";
import frame8 from "../../../assets/images/frame8.png";

export default function PerformanceInsights() {
  const [dateRange, setDateRange] = useState("");
  const [integration, setIntegration] = useState("All");
  const [intent, setIntent] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "",
    integration: "All",
    intent: "All",
  });

  const dateInputRef = useRef(null);

  const handleApply = () => {
    setAppliedFilters({ dateRange, integration, intent });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // 8 Metric Cards Data with frame1.png to frame8.png
  const metrics = [
    {
      id: 1,
      title: "Total Users",
      value: "12,480",
      change: "8.4%",
      isPositive: true,
      image: frame1,
    },
    {
      id: 2,
      title: "Conversation",
      value: "25,480",
      change: "12.5%",
      isPositive: true,
      image: frame2,
    },
    {
      id: 3,
      title: "Task Completion",
      value: "89.5%",
      change: "3.1%",
      isPositive: true,
      image: frame3,
    },
    {
      id: 4,
      title: "Intent Accuracy",
      value: "94.2%",
      change: "2.4%",
      isPositive: true,
      image: frame4,
    },
    {
      id: 5,
      title: "Error Rate",
      value: "4.8%",
      change: "1.2%",
      isPositive: false,
      image: frame5,
    },
    {
      id: 6,
      title: "Fallback Rate",
      value: "5.7%",
      change: "0.8%",
      isPositive: false,
      image: frame6,
    },
    {
      id: 7,
      title: "Avg Response",
      value: "1.8 Sec",
      change: "0.3 sec",
      isPositive: true,
      image: frame7,
    },
    {
      id: 8,
      title: "Memory Hit Rate",
      value: "78.6",
      change: "4.4%",
      isPositive: true,
      image: frame8,
    },
  ];

  // Top Performance Intents
  const topIntents = [
    { name: "Schedule Meeting", percentage: 96 },
    { name: "Create Task", percentage: 95 },
    { name: "Draft Email", percentage: 93.5 },
    { name: "Set Reminder", percentage: 91.4 },
  ];

  // Integration Utilization
  const integrations = [
    { name: "Outlook", percentage: 34.5 },
    { name: "EXchange", percentage: 25.5 },
    { name: "Jira", percentage: 19.5 },
    { name: "Trello", percentage: 14.5 },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">

      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Performance Insights
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

        {/* 8 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {metrics.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] border border-[#E9EDF5] p-5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#4866F633] transition-all"
            >
              {/* Frame Image on Left */}
              <img
                src={item.image}
                alt={item.title}
                className="w-[52px] h-[52px] object-contain shrink-0"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[22px] font-bold text-[#1E293B] leading-tight">
                  {item.value}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[14px] text-[#586D93] truncate">
                    {item.title}
                  </span>
                  <span
                    className={`text-[15px] font-semibold flex items-center shrink-0 ml-1 ${
                      item.isPositive ? "text-[#16A34A]" : "text-[#EF4444]"
                    }`}
                  >
                    {item.isPositive ? "↑" : "↓"} {item.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Trend Section */}
        <div className="mt-8">
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Performance Trend
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performance Intents */}
            <div className="bg-[#F8FAFD] rounded-[20px] p-6 border border-[#E9EDF5]">
              <h3 className="text-[15px] font-semibold text-[#1E293B] mb-5">
                Top Performance Intents
              </h3>

              <div className="space-y-4">
                {topIntents.map((intentItem) => (
                  <div key={intentItem.name}>
                    <div className="text-[13px] font-medium text-[#334155] mb-1.5">
                      {intentItem.name}
                    </div>
                    <div className="w-full h-[8px] bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4866F6] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${intentItem.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-[12px] font-medium text-[#64748B] mt-1">
                      {intentItem.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Utilization */}
            <div className="bg-[#F8FAFD] rounded-[20px] p-6 border border-[#E9EDF5]">
              <h3 className="text-[15px] font-semibold text-[#1E293B] mb-5">
                Integration Utilization
              </h3>

              <div className="space-y-4">
                {integrations.map((integrationItem) => (
                  <div key={integrationItem.name}>
                    <div className="text-[13px] font-medium text-[#334155] mb-1.5">
                      {integrationItem.name}
                    </div>
                    <div className="w-full h-[8px] bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4866F6] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${integrationItem.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-[12px] font-medium text-[#64748B] mt-1">
                      {integrationItem.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
