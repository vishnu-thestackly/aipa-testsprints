import React, { useState } from "react";
import ProfileNavbar from "../components/common/ProfileNavbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";
import { saveNotificationSettings, skipOnboarding } from "../api/authApi";
import BackGroundImage from "../assets/images/bghome.png";
import Downarrow from "../assets/images/Downarrow.png";
import EmailAlertIcon from "../assets/images/email_alert.svg";
import ReminderIcon from "../assets/images/reminder.svg";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { useTheme } from "../context/ThemeContext";

const notificationOptions = [
  {
    id: "emailAlerts",
    title: "Email Alerts",
    description:
      "Receive instant email notifications for important updates and activities.",
    icon: EmailAlertIcon,
  },
  {
    id: "reminders",
    title: "Reminders",
    description:
      "Stay on track with timely reminders for tasks, meetings, and schedules.",
    icon: ReminderIcon,
  },
];

const NotificationSetup = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [currentStep] = useState(4);
  const { data, updateOnboarding } = useOnboarding();

  const navigate = useNavigate();
  const handleSkip = async () => {
  try {
    setSkipLoading(true);

    const response = await skipOnboarding();

    console.log(response.message); // Onboarding skipped.
    localStorage.removeItem("onboardingData");

    navigate("/completion");
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

  const toggleValues = {
    emailAlerts: data.emailAlerts,
    reminders: data.reminders,
  };

  const toggleSetters = {
    emailAlerts: (checked) => updateOnboarding({ emailAlerts: checked }),
    reminders: (checked) => updateOnboarding({ reminders: checked }),
  };

  const handleContinue = async () => {
  try {
    setLoading(true);

    const payload = {
      email_alerts: data.emailAlerts,
      reminders_enabled: data.reminders,
    };

    await saveNotificationSettings(payload);

    navigate("/completion");
  } catch (error) {
    console.error("Notification Settings Error:", error);
  } finally {
    setLoading(false);
  }
};

  const handleBack = () => {
    navigate("/connect-integrations");
  };

  return (
    <div className={`relative min-h-screen w-full overflow-y-auto overflow-x-hidden p-[20px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDark ? "bg-[#030712]" : ""}`}>
      {/* BACKGROUND IMAGE */}
      {isDark ? (
        <div className="fixed inset-0 bg-[#030712] -z-10" />
      ) : (
        <img
          src={BackGroundImage}
          alt="background"
          className="fixed inset-0 w-full h-full object-cover -z-10"
        />
      )}

      <div className="relative z-10">
        <div className="w-full mb-[20px]">
          <ProfileNavbar onLanguageClick={setShowLanguage} />
        </div>

        <div className={`w-full rounded-[40px] min-h-[85vh] shadow-sm px-[clamp(20px,4vw,60px)] py-[clamp(25px,4vw,45px)] transition-all duration-300 ${
          isDark
            ? "bg-[#060C1F]"
            : "bg-white border border-[#E7E7E7]"
        }`}>
          <div className="relative flex flex-col items-center justify-center mt-15 md:mt-[40px] lg:mt-0">
            <p className={`text-[clamp(18px,2vw,30px)] font-sfpro ${isDark ? "text-white" : "text-[#4866F6]"}`}>
              Welcome to your
            </p>

            <h1 className={`text-[clamp(32px,4vw,60px)] font-bold font-sfpro text-center leading-tight ${isDark ? "text-white" : "text-[#4866F6]"}`}>
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

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[70px] md:w-[450px] lg:w-[900px] mx-auto">
            {notificationOptions.map((option) => (
              <div
                key={option.id}
                className={`rounded-[16px] p-5 transition-all duration-300 ${
                  isDark
                    ? "bg-[#060C1F] border border-[#586D93] shadow-none"
                    : "bg-white border border-slate-100 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`rounded-[12px] p-3 w-14 h-14 flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-[#131E3D] shadow-none"
                      : "border border-slate-100 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)]"
                  }`}>
                    <img
                      src={option.icon}
                      alt={option.title}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={toggleValues[option.id]}
                      onChange={(e) =>
                        toggleSetters[option.id](e.target.checked)
                      }
                      className="sr-only peer"
                    />

                    <div className={`w-[52px] h-[30px] rounded-full transition-all duration-300 ${
                      isDark
                        ? "bg-[#131E3D] border border-[#586D93] peer-checked:bg-[#4866F6] peer-checked:border-[#4866F6]"
                        : "bg-[#D9D9D9] peer-checked:bg-[#4866F6]"
                    }`} />

                    <div className={`absolute left-[4px] top-[4px] w-[22px] h-[22px] rounded-full transition-all duration-300 peer-checked:translate-x-[22px] ${
                      isDark ? "bg-[#586D93] peer-checked:bg-[#060C1F]" : "bg-white"
                    }`} />
                  </label>
                </div>

                <h3 className="text-[#4866F6] font-semibold text-[24px] mt-4 font-sfpro">
                  {option.title}
                </h3>

                <p className={`lg:w-3/4 md:w-3/4 text-[16px] mt-2 leading-snug font-sfpro ${
                  isDark ? "text-[#8D97A9]" : "text-[#7A7A7A]"
                }`}>
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center mt-[40px] md:mt-[65px] gap-4 md:gap-10">
            <button
              type="button"
              onClick={handleBack}
              className={`md:px-20 md:py-3 px-10 py-2 rounded-full transition-all duration-300 text-[16px] font-medium cursor-pointer ${
                isDark
                  ? "bg-transparent border border-[#4866F6] text-[#4866F6] hover:bg-[#131E3D]"
                  : "bg-white border border-[#4866F6] text-[#4866F6] hover:bg-[#5b76f7] hover:text-white"
              }`}
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

export default NotificationSetup;
