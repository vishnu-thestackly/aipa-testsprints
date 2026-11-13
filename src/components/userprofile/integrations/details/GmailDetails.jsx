import React, { useState } from "react";
import { Check } from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTheme } from "../../../../context/ThemeContext";

import Gmail from "../../../../assets/images/gmail.svg";
import ArrowIcon from "../../../../assets/images/Arrow.png";
import SyncIcon from "../../../../assets/images/sync.svg";
import EmailsIcon from "../../../../assets/images/emails.svg";
import DraftsIcon from "../../../../assets/images/drafts.svg";

const recentEmails = [
  { title: "Project Update Document", from: "John Cena", time: "11:00 AM" },
  { title: "Sprint Review Meeting", from: "Project Team", time: "10:30 AM" },
];

const GmailDetails = () => {
  const { languageOpen } = useOutletContext();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div
      className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        <div
          className={`w-full flex-1 min-h-[650px] ${
            isDark ? "bg-[#060D1B] border-[#152342]" : "bg-white border-[#DADADA]"
          } border rounded-[25px] shadow-[0px_0px_4px_0px_#00000014] px-4 sm:px-6 py-5 sm:py-6 flex flex-col transition-colors duration-300`}
        >
          {/* Header */}
          <div
            className={`border-b ${
              isDark ? "border-[#586D93]" : "border-[#DCDCDC]"
            } pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3`}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/user/integrations")}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4866F6] hover:bg-[#3F5DE3] text-white cursor-pointer border-none transition-colors shrink-0"
              >
                <img src={ArrowIcon} alt="Back" className="w-4 h-4 object-contain" />
              </button>
              <h1
                className={`${
                  isDark ? "text-white" : "text-[#303030]"
                } text-[18px] font-semibold leading-[24px] whitespace-nowrap`}
              >
                Gmail
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto h-[38px] px-4 rounded-[28px] bg-[#4866F6] hover:bg-[#3F5DE3] text-white text-[14px] font-medium flex items-center justify-center cursor-pointer transition-colors border-none whitespace-nowrap"
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
            <div
              className={`flex items-center gap-4 w-full sm:w-auto border ${
                isDark ? "border-[#586D93] bg-[#081026]" : "border-[#E7E7E7] bg-white"
              } rounded-[16px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-5 sm:px-6 py-3`}
            >
              <div
                className={`w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-[16px] ${
                  isDark ? "bg-[#181F2D]" : "border border-[#E7E7E7] bg-white"
                } flex items-center justify-center shrink-0 p-2`}
              >
                <img
                  src={Gmail}
                  alt="Gmail"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[#4866F6] text-[16px] font-medium">
                  dummyemail@gmail.com
                </span>
                <span
                  className={`flex items-center gap-2 ${
                    isDark ? "bg-[#07271E] text-[#2FB66D]" : "bg-[#2FB66D1A] text-[#2FB66D]"
                  } px-3 py-1 rounded-[12px] text-[13px] font-medium w-fit`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#2FB66D]" />
                  Connected
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`w-full sm:w-auto h-[38px] px-5 rounded-[18px] border border-[#F0343D] text-[#F0343D] ${
                isDark ? "bg-transparent hover:bg-[#F0343D1A]" : "bg-white hover:bg-[#F0343D0D]"
              } text-[14px] font-medium flex items-center justify-center cursor-pointer transition-colors self-start sm:self-auto`}
            >
              Disconnect
            </button>
          </div>

          {/* Email Summary */}
          <div
            className={`mt-5 border ${
              isDark ? "border-[#586D93] bg-transparent" : "border-[#E7E7E7] bg-white"
            } rounded-[20px] shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-4 sm:px-5 py-4`}
          >
            <h2
              className={`${
                isDark ? "text-white" : "text-[#303030]"
              } text-[18px] font-semibold border-b ${
                isDark ? "border-[#586D93]" : "border-[#E7E7E7]"
              } pb-3`}
            >
              Email Summary
            </h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`flex items-center gap-4 border ${
                  isDark ? "border-[#586D93] bg-[#081026]" : "border-[#E7E7E7] bg-white"
                } rounded-[14px] px-4 py-3`}
              >
                <div
                  className={`w-[52px] h-[52px] rounded-full ${
                    isDark ? "bg-[#181F2D]" : "bg-[#E4E8FE]"
                  } flex items-center justify-center shrink-0`}
                >
                  <img
                    src={EmailsIcon}
                    alt="Unread emails"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p
                    className={`${
                      isDark ? "text-white" : "text-[#303030]"
                    } text-[18px] font-semibold`}
                  >
                    12
                  </p>
                  <p
                    className={`${
                      isDark ? "text-[#7E8B9F]" : "text-[#91A0B8]"
                    } text-[13px] font-medium`}
                  >
                    Unread emails
                  </p>
                </div>
              </div>
              <div
                className={`flex items-center gap-4 border ${
                  isDark ? "border-[#586D93] bg-[#081026]" : "border-[#E7E7E7] bg-white"
                } rounded-[14px] px-4 py-3`}
              >
                <div
                  className={`w-[52px] h-[52px] rounded-full ${
                    isDark ? "bg-[#181F2D]" : "bg-[#E4E8FE]"
                  } flex items-center justify-center shrink-0`}
                >
                  <img src={DraftsIcon} alt="Drafts" className="w-6 h-6" />
                </div>
                <div>
                  <p
                    className={`${
                      isDark ? "text-white" : "text-[#303030]"
                    } text-[18px] font-semibold`}
                  >
                    2
                  </p>
                  <p
                    className={`${
                      isDark ? "text-[#7E8B9F]" : "text-[#91A0B8]"
                    } text-[13px] font-medium`}
                  >
                    Drafts
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <h3
              className={`mt-5 ${
                isDark ? "text-white" : "text-[#303030]"
              } text-[18px] font-semibold border-b ${
                isDark ? "border-[#586D93]" : "border-[#E7E7E7]"
              } pb-3`}
            >
              Upcoming Events
            </h3>
            <div className="mt-3 space-y-3">
              {recentEmails.map((email, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-4 border border-[#4866F6] ${
                    isDark ? "bg-[#071330]" : "bg-[#EEF2FF]"
                  } rounded-xl px-4 py-3`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#4866F6] shrink-0" />
                    <div className="min-w-0">
                      <p
                        className={`${
                          isDark ? "text-white" : "text-[#303030]"
                        } text-[13px] font-semibold truncate`}
                      >
                        {email.title}
                      </p>
                      <p
                        className={`${
                          isDark ? "text-[#586D93]" : "text-[#91A0B8]"
                        } text-[12px] font-medium truncate`}
                      >
                        From: {email.from}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`${
                      isDark ? "text-[#586D93]" : "text-[#303030]"
                    } text-[12px] font-semibold whitespace-nowrap shrink-0`}
                  >
                    {email.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Gmail Sync */}
          <div
            className={`mt-5 pt-5 pb-10 px-5 border-t ${
              isDark ? "border-[#586D93]" : "border-[#E7E7E7]"
            } flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`}
          >
            <div>
              <div className="flex items-center gap-2">
                <img src={SyncIcon} alt="Sync" className="w-4 h-4" />
                <h2
                  className={`${
                    isDark ? "text-white" : "text-[#303030]"
                  } text-[18px] font-semibold`}
                >
                  Gmail Sync
                </h2>
              </div>
              <div className="mt-2 flex items-center gap-6">
                <div>
                  <p
                    className={`${
                      isDark ? "text-[#7E8B9F]" : "text-[#91A0B8]"
                    } text-[12px] font-medium`}
                  >
                    Last synced
                  </p>
                  <p
                    className={`${
                      isDark ? "text-white" : "text-[#303030]"
                    } text-[13px] mt-0.5 font-medium`}
                  >
                    10:30 AM
                  </p>
                </div>
                <div>
                  <p
                    className={`${
                      isDark ? "text-[#7E8B9F]" : "text-[#91A0B8]"
                    } text-[12px] font-medium`}
                  >
                    Sync Status
                  </p>
                  <p className="flex items-center gap-1.5 mt-0.5 text-[#2FB66D] text-[13px] font-medium">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#2FB66D] flex items-center justify-center shrink-0">
                      <Check className={`w-2 h-2 ${isDark ? "text-black" : "text-white"}`} strokeWidth={4} />
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
                  autoSync ? "bg-[#4866F6]" : isDark ? "bg-[#1E283D]" : "bg-[#C9D3F5]"
                }`}
              >
                <span
                  className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white transition-all ${
                    autoSync ? "left-[22px]" : "left-[2px]"
                  }`}
                />
              </button>
              <span
                className={`${
                  isDark ? "text-[#7E8B9F]" : "text-[#586D93]"
                } text-[13px] font-medium`}
              >
                Auto-sync
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailDetails;
