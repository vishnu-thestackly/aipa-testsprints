import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/common/ProfileNavbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";
import {
  getAvailableIntegrations,
  getUserIntegrations,
  saveConnectedIntegrations,
  skipOnboarding,
  connectIntegration,
} from "../api/authApi";

import BackGroundImage from "../assets/images/bghome.png";
import Downarrow from "../assets/images/Downarrow.png";
import GmailIcon from "../assets/images/gmail.svg";
import ExchangeIcon from "../assets/images/exchange.svg";
import GoogleCalendarIcon from "../assets/images/google-calendar.svg";
import OutlookIcon from "../assets/images/outlook.svg";
import JiraIcon from "../assets/images/jira.svg";
import TrelloIcon from "../assets/images/trello.svg";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

const integrationIcons = {
  gmail: GmailIcon,
  exchange: ExchangeIcon,
  google_calendar: GoogleCalendarIcon,
  outlook: OutlookIcon,
  jira: JiraIcon,
  trello: TrelloIcon,
};


const ConnectIntegrations = () => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [currentStep] = useState(3);
  const { data, toggleIntegration } = useOnboarding();
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  const handleSkip = async () => {
  try {
    setSkipLoading(true);

    const response = await skipOnboarding();

    console.log(response.message); // Onboarding skipped.
    localStorage.removeItem("onboardingData");

    navigate("/notification-setup");
  } catch (error) {
    console.error("Skip Onboarding Error:", error);
  } finally {
    setSkipLoading(false);
  }
};

  const steps = [
    "Personal Details",
    "AI Preferences",
    "Connect Integrations",
    "Notification Setup",
    "Completion",
  ];

const handleContinue = async () => {
  try {
    setLoading(true);

    const connectedApps = Object.keys(
        data.connectedIntegrations
      ).filter((key) => data.connectedIntegrations[key]);

    await saveConnectedIntegrations({
      connected_apps: connectedApps,
    });

    navigate("/notification-setup");
  } catch (error) {
    console.error("Save Integrations Error:", error);
  } finally {
    setLoading(false);
  }
};


const handleIntegrationClick = async (integration) => {
  try {
    const response = await connectIntegration(integration.app_name);

    if (response.authorize_url) {
      window.location.href = response.authorize_url;
      return;
    }

    toggleIntegration(integration.app_name);
  } catch (error) {
    console.error("Integration Error:", error);
  }
};

  const handleBack = () => {
    navigate("/aipreferences");
  };

  useEffect(() => {
  const loadIntegrations = async () => {
  try {
    // Available integrations
    const availableResponse = await getAvailableIntegrations();

    // Connected integrations
    const connectedResponse = await getUserIntegrations();

    const connectedApps = new Set(
      connectedResponse
        .filter((item) => item.status === "active")
        .map((item) => item.app_name)
    );

    const updatedIntegrations = (availableResponse.integrations || []).map(
      (integration) => ({
        ...integration,
        connected: connectedApps.has(integration.app_name),
      })
    );

    setIntegrations(updatedIntegrations);

  } catch (error) {
    console.error("Load Integrations Error:", error);
  }
};

  loadIntegrations();
}, []);
console.log("Integrations:", integrations);
console.log("Length:", integrations.length);
  return (
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden p-[20px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <img
        src={BackGroundImage}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative z-10">
        <div className="w-full mb-[20px]">
          <ProfileNavbar onLanguageClick={setShowLanguage} />
        </div>

        <div className="w-full bg-white rounded-[40px] min-h-[85vh] border border-[#E7E7E7] shadow-sm px-[clamp(20px,4vw,60px)] py-[clamp(25px,4vw,45px)] transition-all duration-300">
          <div className="relative flex flex-col items-center justify-center mt-15 md:mt-[40px] lg:mt-0">
            <p className="text-[#4866F6] text-[clamp(18px,2vw,30px)] font-sfpro">
              Welcome to your
            </p>

            <h1 className="text-[#4866F6] text-[clamp(32px,4vw,60px)] font-bold font-sfpro text-center leading-tight">
              AI Personal Assistant
            </h1>

           <button
                onClick={handleSkip}
                disabled={skipLoading}
                className="absolute right-0 top-[-65px] md:top-[-40px] lg:top-0 bg-[#4866F6] text-white px-6 py-2 rounded-full text-m font-sfpro hover:bg-[#3d5cf4] transition-all duration-300 flex items-center disabled:opacity-50"
              >
                {skipLoading ? "Skipping..." : "Skip"}
                <img
                  src={Downarrow}
                  alt="downarrow"
                  className="inline-block w-4 h-4 ml-1"
                />
              </button>
          </div>

          <OnboardingStepper currentStep={currentStep} steps={steps} />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[70px] max-w-full mx-auto">
            {integrations.map((integration) => {
              const isConnected = integration.connected;

              return (
                <div
                  key={integration.app_name}
                  className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)]"
                >
                  <div className="flex justify-between items-start">
                    <div className="bg-white border border-slate-100 rounded-[12px] p-3 w-14 h-14 flex items-center justify-center shadow-[0_0_2px_1px_rgba(61,61,61,0.15)]">
                        <img
                            src={integrationIcons[integration.app_name] || GmailIcon}
                            alt={integration.display_name}
                            className="w-8 h-8 object-contain"
                          />
                      </div>
                    <button
                      type="button"
                     onClick={() => handleIntegrationClick(integration)}
                      className={`text-[16px] px-5 py-1.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                        isConnected
                          ? "bg-white border border-[#4866F6] text-[#4866F6]"
                          : "bg-[#4866F6] text-white hover:bg-[#3d5cf9]"
                      }`}
                    >
                      {isConnected ? "Connected" : "Connect"}
                    </button>
                  </div>

                  <h3 className="text-[#4866F6] font-semibold text-[24px] mt-4 font-sfpro">
                    {integration.display_name}
                  </h3>

                  <p className="text-[#7A7A7A] lg:w-3/4 md:w-full text-[16px] mt-2 leading-snug font-sfpro">
                    {integration.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-center mt-[40px] md:mt-[65px] gap-4 md:gap-10">
            <button
              type="button"
              onClick={handleBack}
              className="bg-white border border-[#4866F6] text-[#4866F6] md:px-20 md:py-3 px-10 py-2 rounded-full transition-all duration-300 text-[16px] font-medium hover:bg-[#5b76f7] hover:text-white cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={loading}
              className="bg-[#4866F6] hover:bg-[#3d5cf4] transition-all duration-300 text-white md:px-16 md:py-3 px-7 py-2 rounded-full text-[16px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectIntegrations;
 