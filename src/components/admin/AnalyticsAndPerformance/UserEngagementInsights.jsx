import React, { useState, useRef } from "react";
import { ChevronDown, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";
import frame1 from "../../../assets/images/frame1.png";
import frame7 from "../../../assets/images/frame7.png";
import requestIcon from "../../../assets/images/request.png";
import activeUserIcon from "../../../assets/images/active_user.png";

export default function UserEngagementInsights() {
  const [dateRange, setDateRange] = useState("");
  const [userType, setUserType] = useState("All");
  const [feature, setFeature] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({
    dateRange: "",
    userType: "All",
    feature: "All",
  });

  const dateInputRef = useRef(null);

  const handleApply = () => {
    setAppliedFilters({ dateRange, userType, feature });
  };

  const summaryCards = [
    {
      id: 1,
      value: "8,420",
      label: "Active Users",
      change: "12.5%",
      image: activeUserIcon,
      withCircleBg: true,
    },
    {
      id: 2,
      value: "5,680",
      label: "Returning Users",
      change: "12.5%",
      image: frame1,
    },
    {
      id: 3,
      value: "3.8",
      label: "Avg Sessions",
      change: "12.5%",
      image: requestIcon,
      withCircleBg: true,
    },
    {
      id: 4,
      value: "12m 45s",
      label: "Avg Session Time",
      change: "12.5%",
      image: frame7,
    },
  ];

  const featureTable = [
    {
      slNo: 1,
      feature: "AI Chat Assistant",
      usage: "82%",
      users: "8220",
      completionRate: "91%",
      trend: "up",
    },
    {
      slNo: 2,
      feature: "Task",
      usage: "77%",
      users: "6740",
      completionRate: "89%",
      trend: "up",
    },
    {
      slNo: 3,
      feature: "Email",
      usage: "64%",
      users: "5420",
      completionRate: "86%",
      trend: "up",
    },
    {
      slNo: 4,
      feature: "Scheduled Meeting",
      usage: "60%",
      users: "4810",
      completionRate: "90%",
      trend: "right",
    },
    {
      slNo: 5,
      feature: "Reminders",
      usage: "45%",
      users: "3620",
      completionRate: "80%",
      trend: "down",
    },
  ];

  // pie chart data
  const activityTrendData = [
    { name: "AI Chat Assistant", value: 20, color: "#4866F6" },
    { name: "Task", value: 20, color: "#7B8FF8" },
    { name: "Email", value: 15, color: "#A5B4FC" },
    { name: "Scheduled Meeting", value: 35, color: "#C7D2FE" },
    { name: "Reminders", value: 10, color: "#E0E7FF" },
  ];

  const activityLegend = [
    { name: "AI Chat Assistant", color: "#4866F6" },
    { name: "Task", color: "#7B8FF8" },
    { name: "Email", color: "#A5B4FC" },
    { name: "Scheduled Meeting", color: "#C7D2FE" },
    { name: "Reminders", color: "#E0E7FF" },
  ];

  // Pixel-space labels so cards sit on each slice (not container %)
  const renderActivityLabel = ({ cx, cy, midAngle, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const cos = Math.cos(-midAngle * RADIAN);
    const sin = Math.sin(-midAngle * RADIAN);
    const r = outerRadius + 15;
    const x = cx + r * cos;
    const y = cy + r * sin;

    const pointer =
      Math.abs(cos) >= Math.abs(sin)
        ? cos >= 0
          ? "left"
          : "right"
        : sin >= 0
          ? "top"
          : "bottom";

    const pointerClasses = {
      left: "absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white",
      right:
        "absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white",
      top: "absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-white",
      bottom:
        "absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-white",
    };

    return (
      <g>
        <foreignObject
          x={x - 28}
          y={y - 16}
          width={56}
          height={32}
          style={{ overflow: "visible" }}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="relative w-full h-full flex items-center justify-center overflow-visible"
          >
            <div className="relative bg-white px-2.5 py-0.5 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.12)] text-[12px] font-semibold text-[#334155] leading-5 whitespace-nowrap">
              {value}%
              <span className={pointerClasses[pointer]} />
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };

  const retentionItems = [
    "New Users",
    "Returning Users",
    "Weekly Active Users",
    "Drop-off Rate",
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            User Engagement Insights
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

          {/* Feature */}
          <div>
            <label className="block text-[14px] font-medium text-black mb-1.5">
              Feature
            </label>
            <div className="relative w-full">
              <select
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 rounded-[12px] border border-[#D9DCE5] bg-white text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="All">All</option>
                <option value="AI Chat Assistant">AI Chat Assistant</option>
                <option value="Task">Task</option>
                <option value="Email">Email</option>
                <option value="Scheduled Meeting">Scheduled Meeting</option>
                <option value="Reminders">Reminders</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#586D93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Apply Button */}
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

        {/* Divider */}
        <div className="border-t border-[#CFCFCF] w-full mb-8" />

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
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
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[22px] font-bold text-[#1E293B] leading-tight">
                    {card.value}
                  </div>
                  <span className="text-[14px] font-semibold text-[#16A34A] shrink-0">
                    ↑ {card.change}
                  </span>
                </div>
                <div className="text-[14px] text-[#586D93] mt-1">
                  {card.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Most Used Feature Table */}
        <div className="mb-10">
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Most Used Feature
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto blue-scrollbar rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full min-w-[780px] text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Feature</th>
                  <th className="py-4 px-6 font-medium">Usage</th>
                  <th className="py-4 px-6 font-medium">Users</th>
                  <th className="py-4 px-6 font-medium">Completion Rate</th>
                  <th className="py-4 px-6 font-medium text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {featureTable.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.feature}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.usage}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.users}</td>
                    <td className="py-4 px-6 text-[#586D93] text-center">
                      {row.completionRate}
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

        {/* Bottom Section: Activity Trend + Retention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity Trend */}
          <div className="rounded-[20px] p-6 border border-[#E9EDF5]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-4">
              User Activity Trend
            </h3>

            <div className="border-t border-[#CFCFCF] w-full mb-4" />

            <div className="relative w-full h-[280px] flex items-center justify-center overflow-visible">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  style={{ overflow: "visible" }}
                >
                  {" "}
                  <Pie
                    data={activityTrendData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={0}
                    dataKey="value"
                    nameKey="name"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                    strokeWidth={0}
                    label={renderActivityLabel}
                    labelLine={false}
                    isAnimationActive={false}
                  >
                    {activityTrendData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[1]">
                <span className="text-[14px] font-medium text-[#1E293B]">
                  Total
                </span>
                <span className="text-[14px] font-bold text-[#1E293B]">
                  100%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
              {activityLegend.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[12px] text-[#586D93]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Retention & Dropoff */}
          <div className=" rounded-[20px] p-6 border border-[#E9EDF5]">
            <h3 className="text-[18px] font-semibold text-[#1E293B] mb-5">
              Retention & Dropoff
            </h3>

            <div className="border-t border-[#CFCFCF] w-full mb-6" />

            <div className="space-y-3">
              {retentionItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-[12px] bg-[#EEF2FF] border border-[#4866F6]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                  <span className="text-[14px] font-medium text-[#334155]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
