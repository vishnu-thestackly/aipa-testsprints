import React from "react";
import { ArrowLeft, Check, X } from "lucide-react";

import jiraIcon from "../../../assets/images/jira.svg";
import requestIcon from "../../../assets/images/request.png";
import timeIcon from "../../../assets/images/time.png";
import totalSalesIcon from "../../../assets/images/totalSales.svg";

const failedIcon = (
  <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#4866F6]">
    <X className="h-4 w-4 text-[#E4E8FE]" strokeWidth={3} />
  </div>
);

const performanceCards = [
  {
    label: "API Calls",
    value: "18,450",
    icon: (
      <img
        src={requestIcon}
        alt="API Calls"
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    ),
  },
  {
    label: "Success Rate",
    value: "96.8%",
    icon: (
      <img
        src={totalSalesIcon}
        alt="Success Rate"
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    ),
  },
  {
    label: "Avg Latency",
    value: "600ms",
    icon: (
      <img
        src={timeIcon}
        alt="Avg Latency"
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    ),
  },
  {
    label: "Failed Request",
    value: "120",
    icon: failedIcon,
  },
];

const commonErrors = ["Timeout", "Server Error"];

export default function JiraIntegrationDetails({ onBack }) {
  return (
    <div className="h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border border-gray-200 shadow-[0px_1px_4px_0px_#00000040] p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="pb-4 border-b border-[#CFCFCF]">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to Track API integration"
              className="w-8 h-8 rounded-full bg-[#4866F6] hover:bg-[#3F5DE3] flex items-center justify-center text-white border-none cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </button>
            <h1 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
              Jira Integration Details
            </h1>
          </div>
        </div>

        {/* Summary card */}
        <div className="rounded-[16px] sm:rounded-[20px] border border-[#E2E2E2] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[12px] border border-[#E7E7E7] bg-white flex items-center justify-center shrink-0">
                <img
                  src={jiraIcon}
                  alt="Jira"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div>
                <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#4866F6]">
                  Jira
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] text-[#34A853] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                    Connected
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4E5] text-[#F59E0B] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    Warning
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full md:w-auto items-stretch justify-between md:justify-start gap-5 sm:gap-6">
              <div>
                <p className="text-[12px] sm:text-[13px] text-[#91A0B8] font-medium">
                  Last synced
                </p>
                <p className="mt-1 text-[14px] sm:text-[15px] font-semibold text-[#3D3D3D]">
                  10 mins ago
                </p>
              </div>
              <div className="w-px self-stretch bg-[#D9D9D9]" />
              <div>
                <p className="text-[12px] sm:text-[13px] text-[#91A0B8] font-medium">
                  Sync Status
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[14px] sm:text-[15px] font-semibold text-[#34A853]">
                  <span className="w-4 h-4 rounded-full bg-[#34A853] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
                  </span>
                  Synced
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Issue banner */}
        <div className="flex items-center gap-3 rounded-[14px] border border-[#F5C78E] bg-[#FFF8EE] px-4 py-3 sm:px-5">
          <div className="w-9 h-9 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
            <span className="text-white text-[16px] font-bold leading-none">
              !
            </span>
          </div>
          <div>
            <p className="text-[13px] sm:text-[15px] font-semibold text-[#3D3D3D]">
              Performance Issue
            </p>
            <p className="mt-1 text-[12px] sm:text-[14px] text-[#586D93] leading-relaxed">
              Average latency is higher than the configured threshold.
            </p>
          </div>
        </div>

        {/* API Performance */}
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            API Performance
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {performanceCards.map(({ label, value, icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 sm:gap-4 rounded-[16px] border border-[#E2E2E2] bg-white px-4 py-4 shadow-[0px_1px_4px_rgba(0,0,0,0.04)] min-h-[88px]"
              >
                <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-[18px] sm:text-[20px] font-semibold text-[#3D3D3D] leading-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-[12px] sm:text-[13px] text-[#586D93]">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Error */}
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Common Error
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />
          <div className="mt-4 space-y-3">
            {commonErrors.map((error) => (
              <div
                key={error}
                className="flex items-center gap-3 rounded-[14px] border border-[#4866F6] bg-[#DAE0FD] px-4 py-3 sm:px-5 sm:py-3.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#3D3D3D]">
                  {error}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
