import React, { useState } from "react";
import { Check } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";

import GoogleCalendarIcon from "../../../../assets/images/google-calender.png";
import ArrowIcon from "../../../../assets/images/Arrow.png";
import SyncIcon from "../../../../assets/images/sync.svg";

const todaySchedule = [
  { title: "Daily Standup Call", time: "09:30 AM" },
  { title: "Sprint Review", time: "11:00 AM" },
  { title: "Project Review", time: "03:00 PM" },
  { title: "Daily Review Call", time: "04:30 PM" },
];

const availableSlots = [
  "10:00 AM - 11:00 AM",
  "12:00 PM - 02:00 PM",
  "05:00 PM - 06:00 PM",
];

const upcomingEvents = [
  { title: "Project Planning", sub: "Tomorrow", time: "10:00 AM" },
  { title: "Team Meeting", sub: "Monday", time: "03:00 AM" },
];

const CalendarDetails = () => {
  const { languageOpen } = useOutletContext();
  const navigate = useNavigate();
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div
      className={`h-full overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        <div className="w-full flex-1 min-h-[650px] bg-white border border-[#DADADA] rounded-[20px] sm:rounded-[25px] shadow-[0px_0px_4px_0px_#00000014] px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col">
          {/* Header */}
          <div className="border-b border-[#DCDCDC] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/user/integrations")}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4866F6] hover:bg-[#3F5DE3] text-white cursor-pointer border-none transition-colors shrink-0"
              >
                <img src={ArrowIcon} alt="Back" className="w-4 h-4 object-contain" />
              </button>
              <h1 className="text-[#303030] text-[16px] sm:text-[18px] font-semibold leading-[24px] whitespace-nowrap">
                Google Calendar
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto h-[38px] px-4 sm:px-5 rounded-[28px] bg-[#4866F6] hover:bg-[#3F5DE3] text-white text-[13px] sm:text-[14px] font-medium flex items-center justify-center cursor-pointer transition-colors border-none whitespace-nowrap"
              >
                View in Application
              </button>
              <button
                type="button"
                className="w-full sm:w-auto h-[38px] px-4 sm:px-5 rounded-[28px] bg-[#4866F6] hover:bg-[#3F5DE3] text-white text-[13px] sm:text-[14px] font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors border-none whitespace-nowrap"
              >
                Refresh
                <FiRefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Connection status */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto border border-[#E7E7E7] rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-3 sm:px-6 py-2.5 sm:py-3.5 min-w-0 max-w-full">
              <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-[12px] border border-[#E7E7E7] flex items-center justify-center shrink-0 p-1.5 sm:p-2">
                <img
                  src={GoogleCalendarIcon}
                  alt="Google Calendar"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <span className="text-[#4866F6] text-[13px] sm:text-[15px] font-medium truncate">
                  dummyemail@gmail.com
                </span>
                <span className="flex items-center gap-1.5 bg-[#2FB66D1A] text-[#2FB66D] px-2 sm:px-2.5 py-0.5 rounded-[12px] text-[11px] sm:text-[12px] font-medium w-fit">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2FB66D]" />
                  Connected
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full sm:w-auto h-[38px] px-5 sm:px-6 rounded-[18px] border border-[#F0343D] text-[#F0343D] hover:bg-[#F0343D0D] text-[13px] sm:text-[14px] font-medium bg-white flex items-center justify-center cursor-pointer transition-colors self-start sm:self-auto shrink-0"
            >
              Disconnect
            </button>
          </div>

          {/* Schedule & Availability Details Card */}
          <div className="mt-4 sm:mt-5 border border-[#E7E7E7] rounded-[18px] sm:rounded-[20px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-3.5 sm:px-6 py-4 sm:py-5">
            {/* Today's Schedule */}
            <h2 className="text-[#303030] text-[16px] sm:text-[18px] font-semibold border-b border-[#E7E7E7] pb-3">
              Today's Schedule
            </h2>
            <div className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 sm:gap-4 border border-[#4866F6] bg-[#EEF2FF] rounded-[12px] sm:rounded-[14px] px-3 sm:px-5 py-2.5 sm:py-3.5"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4866F6] shrink-0" />
                    <p className="text-[#303030] text-[11px] sm:text-[13px] font-semibold truncate">
                      {item.title}
                    </p>
                  </div>
                  <span className="text-[#303030] text-[11px] sm:text-[12px] font-semibold whitespace-nowrap shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="border-t border-[#E7E7E7] pt-4 sm:pt-5 mt-5 sm:mt-6">
              <h2 className="text-[#303030] text-[16px] sm:text-[18px] font-semibold border-b border-[#E7E7E7] pb-3">
                Availability
              </h2>
              <div className="mt-3.5 sm:mt-4 pb-4 sm:pb-5 border-b border-[#E7E7E7]">
                <h3 className="text-[#303030] text-[16px] sm:text-[18px] font-semibold mb-2.5 sm:mb-3">
                  Available Today
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {availableSlots.map((slot, index) => (
                    <p
                      key={index}
                      className="text-[#586D93] text-[15px] sm:text-[18px] font-medium"
                    >
                      {slot}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <h2 className="text-[#303030] text-[16px] sm:text-[18px] font-semibold pt-4 sm:pt-5 pb-1">
              Upcoming Events
            </h2>
            <div className="mt-3 space-y-2.5 sm:space-y-3">
              {upcomingEvents.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 sm:gap-4 border border-[#4866F6] bg-[#EEF2FF] rounded-[12px] sm:rounded-[14px] px-3 sm:px-5 py-2.5 sm:py-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4866F6] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[#303030] text-[11px] sm:text-[13px] font-semibold truncate">
                        {item.title}
                      </p>
                      <p className="text-[#91A0B8] text-[10px] sm:text-[11px] font-medium truncate">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#303030] text-[11px] sm:text-[12px] font-semibold whitespace-nowrap shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Calendar Sync */}
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 pb-6 sm:pb-8 px-1 sm:px-2 border-t border-[#E7E7E7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img src={SyncIcon} alt="Sync" className="w-4 h-4" />
                <h2 className="text-[#303030] text-[15px] sm:text-[17px] font-semibold">
                  Google Calendar Sync
                </h2>
              </div>
              <div className="mt-2 flex items-center gap-6 sm:gap-8">
                <div>
                  <p className="text-[#91A0B8] text-[11px] sm:text-[12px] font-medium">
                    Last synced
                  </p>
                  <p className="text-[#303030] text-[12px] sm:text-[13px] mt-0.5 font-semibold">
                    3 Mins ago
                  </p>
                </div>
                <div>
                  <p className="text-[#91A0B8] text-[11px] sm:text-[12px] font-medium">
                    Sync Status
                  </p>
                  <p className="flex items-center gap-1.5 mt-0.5 text-[#2FB66D] text-[12px] sm:text-[13px] font-semibold">
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
                className={`relative w-[42px] h-[22px] rounded-full transition-colors border-none cursor-pointer ${
                  autoSync ? "bg-[#4866F6]" : "bg-[#C9D3F5]"
                }`}
              >
                <span
                  className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all ${
                    autoSync ? "left-[22px]" : "left-[2px]"
                  }`}
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

export default CalendarDetails;
