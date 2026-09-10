import React, { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";

import OutlookIcon from "../../../../assets/images/Outlook.png";
import CalendarIcon from "../../../../assets/images/calender.svg";
import SyncIcon from "../../../../assets/images/sync.svg";

const schedule = [
  { time: "09:30 AM", title: "Daily stand-up Call" },
  { time: "11:00 AM", title: "Client Meeting" },
  { time: "04:30 AM", title: "Daily Review Call" },
];

const OutlookDetails = () => {
  const { languageOpen } = useOutletContext();
  const navigate = useNavigate();
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div
      className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"}`}
    >
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        <div className="w-full flex-1 min-h-[650px] bg-white border border-[#DADADA] rounded-[25px] shadow-[0px_0px_4px_0px_#00000014] px-4 sm:px-6 py-5 sm:py-6 flex flex-col">
          {/* Header */}
          <div className="border-b border-[#DCDCDC] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/user/integrations")}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4866F6] hover:bg-[#3F5DE3] text-white cursor-pointer border-none transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h1 className="text-[#303030] text-[18px] font-semibold leading-[24px] whitespace-nowrap">
                Microsoft Outlook
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto h-[38px] px-4 rounded-[28px] bg-[#4866F6] hover:bg-[#3F5DE3] text-white text-[14px]  font-medium flex items-center justify-center cursor-pointer transition-colors border-none whitespace-nowrap"
              >
                View in Application
              </button>
              <button
                type="button"
                className="w-full sm:w-auto h-[38px] px-4 rounded-[28px] bg-[#4866F6] hover:bg-[#3F5DE3] text-white text-[14px] font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors border-none whitespace-nowrap"
              >
                Refresh
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Connection status */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto border border-[#E7E7E7] rounded-xl shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-3 py-2.5">
              <img
                src={OutlookIcon}
                alt="Outlook"
                className="w-[65px] h-[65px] object-contain"
              />

              <span className="flex items-center gap-2 bg-[#2FB66D1A] text-[#2FB66D] px-3 py-1.5 rounded-[12px] text-[12px] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#2FB66D]" />
                Connected
              </span>
            </div>

            <button
              type="button"
              className="w-full sm:w-auto h-[38px] px-5 rounded-[18px] border border-[#F0343D] text-[#F0343D] hover:bg-[#F0343D0D] text-[14px] font-medium bg-white flex items-center justify-center cursor-pointer transition-colors self-start sm:self-auto"
            >
              Disconnect
            </button>
          </div>

          {/* Today's Schedule */}
          <div className="mt-5 border border-[#E7E7E7] rounded-[20px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 sm:px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E7E7E7] pb-3">
              <h2 className="text-[#303030] text-[18px] font-semibold">
                Today's Schedule
              </h2>
              <div className="flex items-center gap-8 justify-between border border-gray-300 rounded-lg px-3 py-2 text-[#586D93] text-[14px] font-medium">
                <span>March 25 2026</span>
                <img src={CalendarIcon} alt="Calendar" className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 sm:gap-15 border border-[#4866F6] bg-[#EEF2FF] rounded-xl px-4 py-3"
                >
                  <span className="text-[#303030] text-[13px] font-medium w-[70px] shrink-0">
                    {item.time}
                  </span>
                  <span className="text-[#586D93] text-[13px] font-medium">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Availability status */}
          <div className="mt-5 border border-[#E7E7E7] rounded-[20px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 sm:px-5 py-4">
            <h2 className="text-[#303030] text-[18px] font-semibold border-b border-[#E7E7E7] pb-3">
              Availability status
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-[#E7E7E7] rounded-[14px] px-4 py-3">
                <p className="text-[#91A0B8] text-[13px] font-medium">
                  Current Status
                </p>
                <p className="mt-1 flex items-center gap-2 text-[#303030] text-[15px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#F0343D]" />
                  Busy until 03.30 PM
                </p>
              </div>
              <div className="border border-[#E7E7E7] rounded-[14px] px-4 py-3">
                <p className="text-[#91A0B8] text-[13px] font-medium">
                  Next Free Slot
                </p>
                <p className="mt-1 flex items-center gap-2 text-[#303030] text-[15px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2FB66D]" />
                  05:00 PM - 06.30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Calendar Sync */}
          <div className="mt-5 pt-5 pb-10 px-5 border-t border-[#E7E7E7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img src={SyncIcon} alt="Sync" className="w-4 h-4" />
                <h2 className="text-[#303030] text-[18px] font-semibold">
                  Calendar Sync
                </h2>
              </div>
              <div className="mt-2 flex items-center gap-6">
                <div>
                  <p className="text-[#91A0B8] text-[12px] font-medium">
                    Last synced
                  </p>
                  <p className="text-[#303030] mt-0.5 text-[13px] font-medium">
                    10.30 AM
                  </p>
                </div>
                <div>
                  <p className="text-[#91A0B8] text-[12px] font-medium">
                    Sync Status
                  </p>
                  <p className="flex items-center gap-1.5 mt-0.5 text-[#2FB66D] text-[13px] font-medium">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2FB66D] flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 text-white" strokeWidth={4} />
                    </span>
                    Synced
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setAutoSync((prev) => !prev)}
                className={`relative w-[42px] h-[22px] rounded-full transition-colors border-none cursor-pointer ${autoSync ? "bg-[#4866F6]" : "bg-[#C9D3F5]"}`}
              >
                <span
                  className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all ${autoSync ? "left-[22px]" : "left-[2px]"}`}
                />
              </button>
              <span className="text-[#586D93] text-[13px] font-medium">
                Auto-sync
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlookDetails;
