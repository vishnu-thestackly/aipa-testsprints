import React, { useEffect, useState } from "react";
import ProfileNavbar from "../components/common/ProfileNavbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";
import {
  getOnboardingSummary,
  completeOnboarding,skipOnboarding,
} from "../api/authApi";
import BackGroundImage from "../assets/images/bghome.png";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

const SummaryField = ({ label, value }) => (
  <div className="mb-6">
    <p className="text-[#3D3D3D] text-[18px] font-medium mb-1">{label}</p>
    <p className="text-[#586D93] text-[16px] font-medium font-sfpro">{value}</p>
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="mb-6">
    <p className="text-[#3D3D3D] text-[18px] font-medium mb-4">{label}</p>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-[52px] h-[30px] bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-all duration-300" />
      <div className="absolute left-[4px] top-[4px] w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 peer-checked:translate-x-[22px]" />
    </label>
  </div>
);

const Completion = () => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep] = useState(5);
  const {
    data,
    updateOnboarding,
    meetingTimesDisplay,
    reminderFrequencyDisplay,
    emailStatus,
    calendarStatus,
  } = useOnboarding();

  const navigate = useNavigate();

  const integrationLabels = {
  gmail: "Email",
  google_calendar: "Calendar",
  outlook: "Outlook",
  exchange: "Exchange", 
  jira: "Jira",
  trello: "Trello",
};

  const steps = [
    "Personal Details",
    "AI Preferences",
    "Connect Integrations",
    "Notification Setup",
    "Completion",
  ];

  const handleBack = () => {
    navigate("/notification-setup");
  };

 const handleSave = async () => {
  try {
    setSaving(true);

    await completeOnboarding();

    localStorage.removeItem("onboardingData");

    navigate("/user/new-chat");
  } catch (error) {
    console.error("Complete Onboarding Error:", error);
  } finally {
    setSaving(false);
  }
};


useEffect(() => {
  const loadSummary = async () => {
    try {
      const response = await getOnboardingSummary();
      setSummary(response);
    } catch (error) {
      console.error("Summary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  loadSummary();
}, []);

if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden p-[20px] scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
          <div className="relative flex flex-col items-center justify-center mt-2 md:mt-2 lg:mt-0">
            <p className="text-[#4866F6] text-[clamp(18px,2vw,30px)] font-sfpro">
              Welcome to your
            </p>

            <h1 className="text-[#4866F6] text-[clamp(32px,4vw,60px)] font-bold font-sfpro text-center leading-tight">
              AI Personal Assistant
            </h1>
          </div>

          <OnboardingStepper currentStep={currentStep} steps={steps} />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-x-16 md:gap-y-6 lg:gap-40 mt-[50px] md:mt-[60px] lg:mt-[70px] max-w-[1300px] mx-auto">
            {/* Column 1 — Personal details */}
            <div>
              <div className="mb-6">
                <p className="text-[#3D3D3D] text-[18px] font-medium mb-2">
                  Image/Avatar
                </p>
              <div className="w-full h-[54px] border border-slate-200 shadow-[0_0_2px_1px_rgba(61,61,61,0.15)] rounded-[10px] px-4 flex items-center text-[#586D93] text-[16px] font-medium font-sfpro">
                {summary?.avatar_url
                  ? summary.avatar_url.split("/").pop()
                  : "No image uploaded"}
              </div>
              </div>

              <SummaryField label="Full Name" value={summary?.name || "—"} />
              <SummaryField label="Mobile number" value={summary?.phone || "—"} />
              {summary?.preferred_meeting_times && (
  <SummaryField
    label="Preferred Meeting Times"
    value={summary.preferred_meeting_times
      .split(", ")
      .map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      )
      .join(", ")}
  />
)}
              <SummaryField
                label="Email Tone Preference"
                value={summary?.email_tone || "—"}
              />
            </div>

            {/* Columns 2 & 3 — tablet: single right column; desktop: split */}
            <div className="md:col-span-1 lg:contents">
              <div className="lg:col-span-1">
                <h3 className="text-[18px] font-semibold text-[#3D3D3D] mb-6 font-sfpro">
                  Priority Defaults
                </h3>

                <SummaryField
                  label="Default Task Priority"
                 value={summary?.default_task_priority || "—"}
                />
              <Toggle
                label="Auto - Mark Urgent Task"
                checked={data.autoMarkUrgent}
                disabled
              />
                <SummaryField
                  label="Reminder Frequency"
                  value={reminderFrequencyDisplay}
                />

                <h3 className="text-[18px] font-semibold text-[#3D3D3D] mb-6 mt-8 font-sfpro">
                  Integrations
                </h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {summary?.connected_integrations?.length > 0 ? (
                  summary.connected_integrations.map((app) => (
              <div key={app}>
              <p className="text-[#3D3D3D] text-[16px] font-medium">
                        {integrationLabels[app] || app}
              </p>
              
                      <p className="text-[#4866F6] text-[14px] font-medium">
                        Connected
              </p>
              </div>
                  ))
                ) : (
              <p className="text-[#586D93] text-[16px]">
                    No integrations connected
              </p>
                )}
              </div>
              </div>

              <div className="lg:col-span-1 mt-2 md:mt-2 lg:mt-0">
                <h3 className="text-[18px] font-semibold text-[#3D3D3D] mb-6 font-sfpro">
                  Notifications
                </h3>

                <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-1 lg:gap-0">
                  <Toggle
                    label="Email Alerts"
                    checked={summary?.email_alerts}
                    onChange={(checked) =>
                      updateOnboarding({ emailAlerts: checked })
                    }
                  />
                  <Toggle
                    label="Reminders"
                    checked={summary?.reminders_enabled}
                    onChange={(checked) =>
                      updateOnboarding({ reminders: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-[25px] md:mt-[65px] gap-4 md:gap-10">
            <button
              type="button"
              onClick={handleBack}
              className="bg-white border border-[#4866F6] text-[#4866F6] md:px-20 md:py-3 px-10 py-2 rounded-full transition-all duration-300 text-[16px] font-medium hover:bg-[#5b76f7] hover:text-white cursor-pointer"
            >
              Back
            </button>

            <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-[#4866F6] hover:bg-[#3d5cf4] transition-all duration-300 text-white md:px-16 md:py-3 px-7 py-2 rounded-full text-[16px] font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save"}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completion;
