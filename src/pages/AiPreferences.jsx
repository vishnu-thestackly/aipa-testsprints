import React, { useState } from "react";
import UserNavbar from "../components/common/Navbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";

import BackGroundImage from "../assets/images/bghome.png";
import Downarrow from "../assets/images/Downarrow.png";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

import { saveAiPreferences,skipOnboarding } from "../api/authApi";

const AiPreferences = () => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const { data, updateOnboarding, toggleMeetingTime, toggleReminderFrequency } =
    useOnboarding();

  const navigate = useNavigate();
  const handleSkip = async () => {
  try {
    setSkipLoading(true);

    const response = await skipOnboarding();

    console.log(response.message); // Onboarding skipped.
    localStorage.removeItem("onboardingData");

    navigate("/user/new-chat");
  } catch (error) {
    console.error("Skip Onboarding Error:", error);
  } finally {
    setSkipLoading(false);
  }
};
  const [loading, setLoading] = useState(false);

  // STEP DATA
  const steps = [
    "Personal Details",
    "AI Preferences",
    "Connect Integrations",
    "Notification Setup",
    "Completion",
  ];

  // CONTINUE BUTTON
  const handleContinue = async () => {
  try {
    setLoading(true);

    const payload = {
  preferred_meeting_times:
    data.meetingTimes.length > 0
      ? data.meetingTimes.join(", ").toLowerCase()
      : "all",

  email_tone: data.emailTone,

  default_task_priority: data.taskPriority,

  auto_mark_urgent: data.autoMarkUrgent,

  reminder_frequency:
    data.reminderFrequency.length > 0
      ? data.reminderFrequency.join(", ")
      : "Daily",
};


    const response = await saveAiPreferences(payload);

    console.log("AI Preferences Saved:", response);

    setCurrentStep(3);
    navigate("/connect-integrations");
  } catch (error) {
    console.error("AI Preferences Error:", error);
  } finally {
    setLoading(false);
  }
};

  // BACK BUTTON
  const handleBack = () => {
    setCurrentStep(1);
    navigate("/");
  };

  

  return (
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden p-[20px] scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* BACKGROUND IMAGE */}
      <img
        src={BackGroundImage}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      {/* MAIN WRAPPER */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <div className="w-full mb-[20px]">
          <UserNavbar onLanguageClick={setShowLanguage} />
        </div>

        {/* CARD */}
        <div
          className={`w-full bg-white rounded-[40px] min-h-[85vh] border border-[#E7E7E7] shadow-sm px-[clamp(20px,4vw,60px)] py-[clamp(25px,4vw,45px)] transition-all duration-300`}
        >
          {/* HEADER */}
          <div className="relative flex flex-col items-center justify-center mt-15 md:mt-[40px] lg:mt-0">
            <p className="text-[#4866F6] text-[clamp(18px,2vw,30px)] font-sfpro">
              Welcome to your
            </p>

            <h1 className="text-[#4866F6] text-[clamp(32px,4vw,60px)] font-bold font-sfpro text-center leading-tight">
              AI Personal Assistant
            </h1>

            {/* SKIP BUTTON */}
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

          {/* CONTENT SECTION */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-15 mt-[70px] lg:ml-10 md:ml-5 ml:0">
            {/* LEFT SIDE */}
            <div className="pr-0 lg:pr-10 lg:border-r border-[#E5E5E5]">
              {/* PREFERRED MEETING TIMES */}
              <div>
                <h3 className="text-[20px] font-semibold text-[#4A4A4A] mb-6">
                  Preferred Meeting Times
                </h3>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:flex md:flex-wrap md:gap-15">
                  {["All", "Morning", "Afternoon", "Evening"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={data.meetingTimes.includes(item)}
                        onChange={() => toggleMeetingTime(item)}
                        className="w-[18px] h-[18px] appearance-none border-2 border-[#4866F6] rounded-[4px] cursor-pointer checked:bg-[#4866F6] checked:border-[#4866F6] relative checked:after:content-['✓'] checked:after:text-white checked:after:text-[12px] checked:after:font-bold checked:after:absolute checked:after:top-[-3px] checked:after:left-[2px]"
                      />

                      <span className="text-[#7A7A7A] text-[15px]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* EMAIL TONE */}
              <div className="mt-12">
                <h3 className="text-[20px] font-semibold text-[#4A4A4A] mb-6">
                  Email Tone Preference
                </h3>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:flex md:flex-wrap md:gap-15">
                  {["Formal", "Friendly", "Professional", "Casual"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="emailTone"
                          checked={data.emailTone === item}
                          onChange={() => updateOnboarding({ emailTone: item })}
                          className="
                        w-[18px]
                        h-[18px]
                        appearance-none
                        rounded-full
                        border-2
                        border-[#4866F6]
                        cursor-pointer
                        relative
                        checked:border-[#4866F6]
                        checked:before:content-['']
                        checked:before:absolute
                        checked:before:w-[8px]
                        checked:before:h-[8px]
                        checked:before:rounded-full
                        checked:before:bg-[#4866F6]
                        checked:before:top-1/2
                        checked:before:left-1/2
                        checked:before:-translate-x-1/2
                        checked:before:-translate-y-1/2
                                
                        "
                        />

                        <span className="text-[#7A7A7A] text-[15px]">
                          {item}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="pl-0 lg:pl-10">
              {/* PRIORITY */}
              <h3 className="text-[20px] font-semibold text-[#4A4A4A] mb-6">
                Priority Defaults
              </h3>

              {/* PRIORITY BUTTONS */}
              <div>
                <p className="text-[#7A7A7A] text-[15px] mb-3">
                  Default Task Priority
                </p>

                <div className="w-full lg:max-w-md md:max-w-sm sm:max-w-sm bg-[#F5F5F5] rounded-full p-1 flex items-center">
                  {["High", "Medium", "Low"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => updateOnboarding({ taskPriority: item })}
                      className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        data.taskPriority === item
                          ? "bg-[#4866F6] text-white"
                          : "text-[#7A7A7A]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOGGLE */}
              <div className="mt-8">
                <p className="text-[#7A7A7A] text-[15px] mb-4">
                  Auto - Mark Urgent Task
                </p>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.autoMarkUrgent}
                    onChange={(e) =>
                      updateOnboarding({ autoMarkUrgent: e.target.checked })
                    }
                    className="sr-only peer"
                  />

                  <div className="w-[52px] h-[30px] bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-all duration-300"></div>

                  <div className="absolute left-[4px] top-[4px] w-[22px] h-[22px] bg-white rounded-full transition-all duration-300 peer-checked:translate-x-[22px]"></div>
                </label>
              </div>

              {/* REMINDER */}
              <div className="mt-10">
                <p className="text-[#7A7A7A] text-[15px] mb-5">
                  Reminder Frequency
                </p>

                <div className="flex flex-wrap gap-8">
                  {["Daily", "Scheduled Day", "A Day Before"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={data.reminderFrequency.includes(item)}
                        onChange={() => toggleReminderFrequency(item)}
                        className="w-[18px] h-[18px] appearance-none border-2 border-[#4866F6] rounded-[4px] cursor-pointer checked:bg-[#4866F6] checked:border-[#4866F6] relative checked:after:content-['✓'] checked:after:text-white checked:after:text-[12px] checked:after:font-bold checked:after:absolute checked:after:top-[-3px] checked:after:left-[2px]"
                      />

                      <span className="text-[#7A7A7A] text-[15px]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
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
                className="bg-[#4866F6] hover:bg-[#3d5cf4] transition-all duration-300 text-white md:px-16 md:py-3 px-7 py-2 rounded-full text-[16px] font-medium cursor-pointer disabled:opacity-50"
              >
                {loading ? "Saving..." : "Continue"}
           </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPreferences;
