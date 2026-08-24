import React from "react";
import { ChevronLeft } from "lucide-react";
import { useOutletContext } from "react-router-dom";

// App icons
import GmailIcon from "../../../assets/images/Gmail.png";
import ExchangeIcon from "../../../assets/images/Exchange.png";
import CalendarIcon from "../../../assets/images/Calender.png";
import OutlookIcon from "../../../assets/images/Outlook.png";
import JiraIcon from "../../../assets/images/Jira.png";
import TrelloIcon from "../../../assets/images/Trello.png";

const Integrations = ({ onBack }) => {
  const { languageOpen } = useOutletContext();
  const apps = [
    {
      name: "Gmail",
      description: "Automatically Import your Gmail, Conversations.",
      icon: GmailIcon,
      connected: true,
    },
    {
      name: "Exchange",
      description: "Microsoft Exchange manages business email services.",
      icon: ExchangeIcon,
      connected: false,
    },
    {
      name: "Google Calendar",
      description: "Automatically Import your Calendar events.",
      icon: CalendarIcon,
      connected: true,
    },
    {
      name: "Outlook",
      description: "Automatically Import your Outlook Conversations.",
      icon: OutlookIcon,
      connected: true,
    },
    {
      name: "Jira",
      description:
        "Manage bugs, tasks, and feature requests across development.",
      icon: JiraIcon,
      connected: false,
    },
    {
      name: "Trello",
      description: "Organize tasks, track workflows, and manage projects.",
      icon: TrelloIcon,
      connected: true,
    },
  ];

  return (
    <div className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"}`}>
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        {/* Main Container */}
        <div className="w-full flex-1 min-h-[650px] bg-white border border-[#DADADA] rounded-[25px] shadow-[0px_0px_4px_0px_#00000014] px-4 sm:px-6 py-5 sm:py-6 flex flex-col">
        {/* Header */}
        <div className="border-b border-[#DCDCDC] pb-3 flex items-center gap-2">
          {onBack && (
            <button 
              onClick={onBack} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#586D93] cursor-pointer mr-1 border-none bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-[#303030] text-[18px] font-[510] leading-[21px] tracking-[0%] font-['SF_Pro'] whitespace-nowrap">
            Connected Apps
          </h1>
        </div>

        {/* Apps List */}
        <div className="mt-4 sm:mt-5 space-y-4">
          {apps.map((app, index) => (
            <div
              key={index}
              className="
                w-full
                min-h-[77px]
                sm:min-h-[78px]
                md:min-h-[77px]
                border
                border-[#E7E7E7]
                rounded-[20px]
                bg-white
                shadow-[0px_1px_4px_rgba(0,0,0,0.04)]
                px-3
                sm:px-4
                md:px-3
                lg:px-[13px]
                py-3
                flex
                items-center
              "
            >
              {/* App Content */}
              <div
                className="
                  w-full
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  gap-3
                  sm:gap-4
                "
              >
                {/* Left Section */}
                <div className="flex items-center min-w-0 flex-1">
                  {/* Icon */}
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="
                      shrink-0
                      w-[56px]
                      h-[56px]
                      object-contain
                    "
                  />

                  {/* Name + Description */}
                  <div
                    className="
                      ml-3
                      sm:ml-3
                      min-w-0
                    "
                  >
                    <h2
                      className="
                        text-[#006CEC]
                        text-[16px]
                        sm:text-[17px]
                        md:text-[17px]
                        font-medium
                        leading-[22px]
                        truncate
                      "
                    >
                      {app.name}
                    </h2>

                    <p
                      className="
                        mt-[2px]
                        text-[#91A0B8]
                        text-[11px]
                        sm:text-[12px]
                        md:text-[12px]
                        leading-[18px]
                        font-normal
                        max-w-full
                      "
                    >
                      {app.description}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div
                  className="
                    shrink-0
                    flex
                    items-center
                    justify-between
                    sm:justify-end
                    gap-3
                    w-full
                    sm:w-auto
                    pl-0
                    sm:pl-0
                    mt-3
                    sm:mt-0
                  "
                >
                  {/* View Button */}
                  <button
                    type="button"
                    className="
                      flex-1
                      sm:flex-none
                      h-[32px]
                      w-full
                      sm:w-[73px]
                      rounded-[18px]
                      bg-[#4866F6]
                      hover:bg-[#3F5DE3]
                      text-white
                      text-[11px]
                      sm:text-[12px]
                      font-normal
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      transition-colors
                      duration-200
                      border-none
                    "
                  >
                    View
                  </button>

                  {/* Connect / Connected */}
                  <button
                    type="button"
                    className={`
                      flex-1
                      sm:flex-none
                      h-[32px]
                      ${
                        app.connected
                          ? "w-full sm:w-[95px] bg-[#2FB66D] hover:bg-[#33B469]"
                          : "w-full sm:w-[94px] bg-[#4866F6] hover:bg-[#3F5DE3]"
                      }
                      rounded-[18px]
                      text-white
                      text-[11px]
                      sm:text-[12px]
                      font-normal
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      transition-colors
                      duration-200
                      border-none
                    `}
                  >
                    {app.connected ? "Connected" : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Integrations;
