import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import GmailIcon from "../../../assets/images/Gmail.png";
import ExchangeIcon from "../../../assets/images/Exchange.png";
import CalendarIcon from "../../../assets/images/Calender.png";
import OutlookIcon from "../../../assets/images/Outlook.png";
import JiraIcon from "../../../assets/images/Jira.png";
import TrelloIcon from "../../../assets/images/Trello.png";

import {
  getUserIntegrations,
  exchangeGoogleIntegrationCode,
} from "../../../api/authApi";

const Integrations = ({ onBack }) => {
  const { languageOpen } = useOutletContext();
  const navigate = useNavigate();

  const [connectedApps, setConnectedApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const apps = [
    {
      name: "Gmail",
      appName: "gmail",
      description: "Automatically Import your Gmail Conversations.",
      icon: GmailIcon,
    },
    {
      name: "Exchange",
      appName: "exchange",
      description: "Microsoft Exchange manages business email services.",
      icon: ExchangeIcon,
      route: "exchange",
    },
    {
      name: "Google Calendar",
      appName: "google_calendar",
      description: "Automatically Import your Calendar events.",
      icon: CalendarIcon,
    },
    {
      name: "Outlook",
      appName: "outlook",
      description: "Automatically Import your Outlook Conversations.",
      icon: OutlookIcon,
      route: "outlook",
    },
    {
      name: "Jira",
      appName: "jira",
      description:
        "Manage bugs, tasks, and feature requests across development.",
      icon: JiraIcon,
    },
    {
      name: "Trello",
      appName: "trello",
      description: "Organize tasks, track workflows, and manage projects.",
      icon: TrelloIcon,
    },
  ];

  const loadIntegrations = async () => {
    try {
      setLoading(true);

      const response = await getUserIntegrations();

      const activeApps = (response || [])
        .filter((item) => item.status === "active")
        .map((item) => item.app_name);

      setConnectedApps(activeApps);
    } catch (error) {
      console.error("Load Integrations Error:", error);
      setConnectedApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const connectGoogleCalendar = useGoogleLogin({
    flow: "auth-code",

    scope: "https://www.googleapis.com/auth/calendar",

    onSuccess: async (codeResponse) => {
      try {
        const response = await exchangeGoogleIntegrationCode(
          codeResponse.code,
          "google_calendar"
        );

        console.log(
          "Google Calendar exchange response:",
          response
        );

        await loadIntegrations();
      } catch (error) {
        console.error(
          "Google Calendar connection failed:",
          error
        );
      }
    },

    onError: (error) => {
      console.error(
        "Google Calendar OAuth failed:",
        error
      );
    },
  });

  const connectGmail = useGoogleLogin({
    flow: "auth-code",

    scope: "https://www.googleapis.com/auth/gmail.send",

    onSuccess: async (codeResponse) => {
      try {
        const response = await exchangeGoogleIntegrationCode(
          codeResponse.code,
          "gmail"
        );

        console.log(
          "Gmail exchange response:",
          response
        );

        await loadIntegrations();
      } catch (error) {
        console.error(
          "Gmail connection failed:",
          error
        );
      }
    },

    onError: (error) => {
      console.error(
        "Gmail OAuth failed:",
        error
      );
    },
  });

  const handleConnect = (app) => {
    if (app.appName === "gmail") {
      connectGmail();
      return;
    }

    if (app.appName === "google_calendar") {
      connectGoogleCalendar();
      return;
    }

    if (app.route) {
      navigate(`/user/integrations/${app.route}`);
    }
  };

  return (
    <div
      className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${
        languageOpen
          ? "mt-[60px] md:mt-[70px] lg:mt-[80px]"
          : "mt-0"
      }`}
    >
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        <div className="w-full flex-1 min-h-[650px] bg-white border border-[#DADADA] rounded-[25px] shadow-[0px_0px_4px_0px_#00000014] px-4 sm:px-6 py-5 sm:py-6 flex flex-col">
          <div className="border-b border-[#DCDCDC] pb-3 flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#586D93] cursor-pointer mr-1 border-none bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <h1 className="text-[#303030] text-[18px] font-[510] leading-[21px]">
              Connected Apps
            </h1>
          </div>

          <div className="mt-4 sm:mt-5 space-y-4">
            {apps.map((app, index) => {
              const isConnected = connectedApps.includes(
                app.appName
              );

              return (
                <div
                  key={index}
                  className="w-full min-h-[77px] border border-[#E7E7E7] rounded-[20px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.04)] px-3 py-3 flex items-center"
                >
                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center min-w-0 flex-1">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-[56px] h-[56px] object-contain"
                      />

                      <div className="ml-3 min-w-0">
                        <h2 className="text-[#006CEC] text-[16px] font-medium">
                          {app.name}
                        </h2>

                        <p className="text-[#91A0B8] text-[12px]">
                          {app.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        disabled={!isConnected}
                        onClick={() =>
                          isConnected &&
                          app.route &&
                          navigate(`/user/integrations/${app.route}`)
                        }
                        className={`h-[32px] w-[73px] rounded-[18px] border-none ${
                          isConnected
                            ? "bg-[#4866F6] text-white cursor-pointer"
                            : "bg-[#CFCFCF] text-[#3D3D3D] cursor-not-allowed"
                        }`}>
                        View
                      </button>
                      
                      <button
                        type="button"
                        disabled={loading || isConnected}
                        onClick={() => handleConnect(app)}
                        className={`h-[32px] w-30 rounded-[18px] text-white border-none cursor-pointer px-4 ${
                          isConnected
                            ? "bg-[#2FB66D]"
                            : "bg-[#4866F6]"
                        }`}
                      >
                        {isConnected
                          ? "Connected"
                          : "Connect"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;