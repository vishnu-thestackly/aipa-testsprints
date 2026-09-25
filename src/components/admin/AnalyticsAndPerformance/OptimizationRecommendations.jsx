import React from "react";

import frame01 from "../../../assets/images/frame01.png";
import frame04 from "../../../assets/images/frame04.png";
import frame5 from "../../../assets/images/frame5.png";

export default function OptimizationRecommendations() {
  const summaryCards = [
    {
      id: 1,
      title: "Retraining Intents",
      value: "6 Intents",
      status: "High Priority",
      image: frame04,
    },
    {
      id: 2,
      title: "API Optimization",
      value: "4 Suggestions",
      status: "Review Needed",
      image: frame01,
    },
    {
      id: 3,
      title: "Engagement Issues",
      value: "3 Issues",
      status: "Review Needed",
      image: frame5,
    },
  ];

  const funnelTable = [
    {
      slNo: 1,
      integration: "Outlook",
      apiCalls: "28,000",
      latency: "1.8 Sec",
      failures: "820",
      recommendation: "Cache frequently data",
    },
    {
      slNo: 2,
      integration: "Exchange",
      apiCalls: "21,280",
      latency: "1.5 Sec",
      failures: "540",
      recommendation: "Reduce repeated calls",
    },
    {
      slNo: 3,
      integration: "Jira",
      apiCalls: "15,920",
      latency: "2.4 Sec",
      failures: "380",
      recommendation: "Batch API requests",
    },
    {
      slNo: 4,
      integration: "Trello",
      apiCalls: "12,450",
      latency: "1.9 Sec",
      failures: "210",
      recommendation: "Optimize request frequency",
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      {/* Main Container Card */}
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Top Header */}
        <div className="pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Optimization Recommendations
          </h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8 mb-10">
          {summaryCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[20px] border border-[#E9EDF5] p-5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#4866F633] transition-all"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-[54px] h-[54px] object-contain shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] text-[#586D93] truncate">
                  {card.title}
                </div>
                <div className="text-[20px] font-bold text-[#1E293B] leading-tight mt-0.5">
                  {card.value}
                </div>
                <div className="text-[13px] text-[#586D93] mt-0.5">
                  {card.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation Funnel Table */}
        <div>
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Conversation Funnel
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="w-full overflow-x-auto blue-scrollbar rounded-[16px] border border-[#CFCFCF]">
            <table className="w-full min-w-[780px] text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                  <th className="py-4 px-6 font-medium">SL No</th>
                  <th className="py-4 px-6 font-medium">Integration</th>
                  <th className="py-4 px-6 font-medium">API Calls</th>
                  <th className="py-4 px-6 font-medium">Latency</th>
                  <th className="py-4 px-6 font-medium">Failures</th>
                  <th className="py-4 px-6 font-medium">Recommendations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                {funnelTable.map((row) => (
                  <tr
                    key={row.slNo}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                    <td className="py-4 px-6 text-[#586D93]">
                      {row.integration}
                    </td>
                    <td className="py-4 px-6 text-[#586D93]">{row.apiCalls}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.latency}</td>
                    <td className="py-4 px-6 text-[#586D93]">{row.failures}</td>
                    <td className="py-4 px-6 text-[#586D93] font-normal">
                      {row.recommendation}
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
