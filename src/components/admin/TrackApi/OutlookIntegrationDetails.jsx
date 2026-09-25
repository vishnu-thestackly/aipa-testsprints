import React from "react";
import { ArrowLeft, Check, X } from "lucide-react";

import outlookIcon from "../../../assets/images/outlook.svg";
import requestIcon from "../../../assets/images/request.png";
import timeIcon from "../../../assets/images/time.png";
import totalSalesIcon from "../../../assets/images/totalSales.svg";

const successIcon = (
  <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#4866F6]">
    <Check className="h-4 w-4 text-[#E4E8FE]" strokeWidth={3} />
  </div>
);

const failedIcon = (
  <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#4866F6]">
    <X className="h-4 w-4 text-[#E4E8FE]" strokeWidth={3} />
  </div>
);

const performanceCards = [
  {
    label: "Total API Calls",
    value: "25,678",
    icon: (
      <img
        src={requestIcon}
        alt="Total API Calls"
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    ),
  },
  {
    label: "Successful Calls",
    value: "25,565",
    icon: successIcon,
  },
  {
    label: "Failed Calls",
    value: "50",
    icon: failedIcon,
  },
  {
    label: "Success Rate",
    value: "99.8%",
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
    value: "180ms",
    icon: (
      <img
        src={timeIcon}
        alt="Avg Latency"
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    ),
  },
];

const recentActivity = [
  { title: "Create Meeting", duration: "169ms" },
  { title: "Get Calendar", duration: "180ms" },
  { title: "Check Availability", duration: "190ms" },
];

export default function OutlookIntegrationDetails({ onBack }) {
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
              Outlook Integration Details
            </h1>
          </div>
        </div>

        {/* Summary card */}
        <div className="rounded-[16px] sm:rounded-[20px] border border-[#E2E2E2] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[12px] border border-[#E7E7E7] bg-white flex items-center justify-center shrink-0">
                <img
                  src={outlookIcon}
                  alt="Outlook"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div>
                <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#4866F6]">
                  Outlook
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] text-[#34A853] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                    Connected
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7EF] text-[#34A853] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                    Healthy
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
                  2 mins ago
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

        {/* Recent API Activity */}
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Recent API Activity
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />
          <div className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 rounded-[14px] border border-[#4866F6] bg-[#DAE0FD] px-4 py-3 sm:px-5 sm:py-3.5"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13px] sm:text-[14px] font-semibold text-[#3D3D3D]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#586D93]">
                      {item.duration}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium text-[#34A853] shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                  Success
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
