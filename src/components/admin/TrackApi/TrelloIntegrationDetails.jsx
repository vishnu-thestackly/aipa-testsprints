import React from "react";
import { ArrowLeft, Check } from "lucide-react";

import trelloIcon from "../../../assets/images/trello.svg";

const possibleCauses = [
  "Authentication Expired",
  "API Unavailable",
  "Network/Connection Issue",
];

export default function TrelloIntegrationDetails({ onBack }) {
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
              Trello Integration Details
            </h1>
          </div>
        </div>

        {/* Summary card */}
        <div className="rounded-[16px] sm:rounded-[20px] border border-[#E2E2E2] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-[12px] border border-[#E7E7E7] bg-white flex items-center justify-center shrink-0">
                <img
                  src={trelloIcon}
                  alt="Trello"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </div>
              <div>
                <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#4866F6]">
                  Trello
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFE5E5] text-[#F0343D] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#F0343D]" />
                    Not Connected
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFE5E5] text-[#F0343D] px-3 py-1 text-[12px] sm:text-[13px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#F0343D]" />
                    Offline
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
                  30 mins ago
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

        {/* Error banner */}
        <div className="flex items-start gap-3 rounded-[14px] border border-[#F5A3A7] bg-[#FFF0F0] px-4 py-3 sm:px-5">
          <div className="w-8 h-8 rounded-full bg-[#F0343D] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-[15px] font-bold leading-none">
              !
            </span>
          </div>
          <div>
            <p className="text-[13px] sm:text-[14px] font-semibold text-[#3D3D3D]">
              Unable to Connect to trello API
            </p>
            <p className="mt-1 text-[12px] sm:text-[13px] text-[#586D93] leading-relaxed">
              We are Currently unable to establish a Connection with the Trello
              API
            </p>
          </div>
        </div>

        {/* Possible Causes */}
        <div>
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Possible Causes
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />
          <div className="mt-4 space-y-3">
            {possibleCauses.map((cause) => (
              <div
                key={cause}
                className="flex items-center gap-3 rounded-[14px] border border-[#4866F6] bg-[#DAE0FD] px-4 py-3 sm:px-5 sm:py-3.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#3D3D3D]">
                  {cause}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
