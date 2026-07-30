import React, { useState } from "react";
import ProfileNavbar from "../components/common/ProfileNavbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";
import { saveNotificationSettings,skipOnboarding } from "../api/authApi";
import BackGroundImage from "../assets/images/bghome.png";
import Downarrow from "../assets/images/Downarrow.png";
import EmailAlertIcon from "../assets/images/email_alert.svg";
import ReminderIcon from "../assets/images/reminder.svg";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

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

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[70px] md:w-[450px] lg:w-[900px] mx-auto">
            {notificationOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white border border-slate-100 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)] rounded-[16px] p-5"
              >
                <div className="flex justify-between items-start">
                  <div className="border border-slate-100 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)] rounded-[12px] p-3 w-14 h-14 flex items-center justify-center">
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

                    <div className="w-[52px] h-[30px] bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-all duration-300" />

                    <div className="absolute left-[4px] top-[4px] w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 peer-checked:translate-x-[22px]" />
                  </label>
                </div>

                <h3 className="text-[#4866F6] font-semibold text-[24px] mt-4 font-sfpro">
                  {option.title}
                </h3>

                <p className="text-[#7A7A7A] lg:w-3/4 md:w-3/4 text-[16px] mt-2 leading-snug font-sfpro">
                  {option.description}
                </p>
              </div>
            ))}
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

export default NotificationSetup;
