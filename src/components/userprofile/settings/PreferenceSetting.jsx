import { useState, useEffect } from "react";
import { getUserPreferences, updateUserPreferences } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState("High");
  const [autoMark, setAutoMark] = useState(true);
  const [meetingTimes, setMeetingTimes] = useState(["All"]);
  const [emailTone, setEmailTone] = useState("Formal");
  const [reminderFrequency, setReminderFrequency] = useState(["Daily"]);
  const [recommendationSources, setRecommendationSources] = useState(["Past Actions"]);
  const [behaviorLearning, setBehaviorLearning] = useState(false);
  const [recommendationFrequency, setRecommendationFrequency] = useState("High");
  const [showReasoning, setShowReasoning] = useState(true);

  const handleRecommendationSourceChange = (value) => {
    setRecommendationSources((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const data = await getUserPreferences();
        setMeetingTimes(data.preferred_meeting_times ? data.preferred_meeting_times.split(",") : ["All"]);
        setEmailTone(data.email_tone || "Formal");
        setPriority(data.default_task_priority || "High");
        setAutoMark(data.auto_mark_urgent ?? false);
        setReminderFrequency(data.reminder_frequency ? data.reminder_frequency.split(",") : ["Daily"]);
      } catch (error) { console.error(error); }
    };
    fetchPreferences();
  }, []);

  const handleMeetingTimeChange = (value) => {
    setMeetingTimes((prev) => {
      let updated = [...prev];
      if (value === "All") {
        if (updated.includes("All")) {
          if (updated.length === 1) return prev;
          updated = updated.filter((item) => item !== "All");
        } else updated = ["All"];
      } else {
        updated = updated.filter((item) => item !== "All");
        if (updated.includes(value)) {
          if (updated.length === 1) return prev;
          updated = updated.filter((item) => item !== value);
        } else updated.push(value);
      }
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      const payload = { preferred_meeting_times: meetingTimes.join(","), email_tone: emailTone, default_task_priority: priority, auto_mark_urgent: autoMark, reminder_frequency: reminderFrequency.join(",") };
      await updateUserPreferences(payload);
      alert("Preferences Updated Successfully");
    } catch (error) { console.error(error); alert("Failed to Update Preferences"); }
  };

  const handleReminderChange = (value) => {
    setReminderFrequency((prev) => prev.includes(value) ? prev : [value]);
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">
          <h2 className="w-[220px] h-[21px] leading-[100%] tracking-[0%] font-[510] text-[18px] text-[#3D3D3D] whitespace-nowrap">AI Preference Settings</h2>
          <div className="border-b border-[#CFCFCF] mt-4 mb-4"></div>
          <div>
            <section className="mt-8 pb-5 border-b border-[#E5E5E5]">
              <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">Preferred Meeting Times</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:flex md:flex-wrap md:items-center md:gap-10">
                {["All", "Morning", "Afternoon", "Evening"].map((item) => (
                  <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                    <input type="checkbox" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleMeetingTimeChange(item); } }} checked={meetingTimes.includes(item)} onChange={() => handleMeetingTimeChange(item)} className="appearance-none w-4 h-4 rounded-[4px] border-2 border-[#4866F6] checked:bg-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:left-[4px] after:top-[1px] after:hidden checked:after:block cursor-pointer" /><span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">{item}</span>
                  </label>
                ))}
              </div>
            </section>
            <section className="py-5 border-b border-[#E5E5E5]">
              <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">Email Tone Preference</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:flex md:flex-wrap md:items-center md:gap-10">
                {["Formal", "Friendly", "Professional", "Casual"].map((item) => (
                  <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                    <input type="radio" name="tone" checked={emailTone === item} onChange={() => setEmailTone(item)} className="appearance-none w-4 h-4 rounded-full border-2 border-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[8px] after:h-[8px] after:rounded-full after:bg-[#4866F6] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:hidden checked:after:block cursor-pointer" /><span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">{item}</span>
                  </label>
                ))}
              </div>
            </section>
            <section className="pt-5">
              <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">Priority Defaults</h3>
              <p className="text-[14px] text-[#5C6B8A] mb-3">Default Task Priority</p>
              <div className="w-full max-w-[272px] h-[28px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-full p-[2px] flex items-center mb-6">
                {["High", "Medium", "Low"].map((item) => (
                  <button key={item} type="button" onClick={() => setPriority(item)} className={`flex-1 h-full rounded-full text-[13px] transition-all duration-200 cursor-pointer ${priority === item ? "bg-[#4C6FFF] text-white" : "text-[#5C6B8A]"}`}>{item}</button>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-[14px] text-[#5C6B8A] mb-4">Auto - Mark Urgent Task</p>
                <button type="button" onClick={() => setAutoMark(!autoMark)} className={`w-[32px] h-[18px] rounded-full relative transition-all cursor-pointer ${autoMark ? "bg-[#4C6FFF]" : "bg-gray-300"}`}><div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${autoMark ? "right-[2px]" : "left-[2px]"}`} /></button>
              </div>
              <div>
                <p className="text-[14px] text-[#5C6B8A] mb-4">Reminder Frequency</p>
                <div className="flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-10">
                  {["Daily", "Scheduled Day", "A Day Before"].map((item) => (
                    <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                      <input type="checkbox" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleReminderChange(item); } }} checked={reminderFrequency.includes(item)} onChange={() => handleReminderChange(item)} className="appearance-none w-4 h-4 rounded-[4px] border-2 border-[#4866F6] checked:bg-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:left-[4px] after:top-[1px] after:hidden checked:after:block cursor-pointer" /><span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <section className="pt-8 border-t border-[#E5E5E5] mt-8">
            <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">Personalized Recommendation Settings</h3>
            <p className="text-[14px] text-[#5C6B8A] mb-4">Recommendation Sources</p>
            <div className="flex flex-wrap gap-y-4 gap-x-8 mb-8">
              {["Past Actions", "Task History", "Meeting History", "Email Activity"].map((item) => (
                <label key={item} className="flex items-center gap-[10px] cursor-pointer">
                  <input type="checkbox" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleRecommendationSourceChange(item); } }} checked={recommendationSources.includes(item)} onChange={() => handleRecommendationSourceChange(item)} className="appearance-none w-4 h-4 rounded-[4px] border-2 border-[#4866F6] checked:bg-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:left-[4px] after:top-[1px] after:hidden checked:after:block cursor-pointer" /><span className="text-[14px] text-[#5C6B8A]">{item}</span>
                </label>
              ))}
            </div>
            <div className="mb-8">
              <label className="flex items-center gap-[10px] cursor-pointer">
                <input type="checkbox" checked={behaviorLearning} onChange={() => setBehaviorLearning(!behaviorLearning)} className="appearance-none w-4 h-4 rounded-[4px] border-2 border-[#4866F6] checked:bg-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:left-[5px] after:top-[1px] after:hidden checked:after:block cursor-pointer" /><span className="text-[14px] text-[#5C6B8A]">Behavior Learning Engine</span>
              </label>
            </div>
            <p className="text-[14px] text-[#5C6B8A] mb-3">Recommendation Frequency</p>
            <div className="w-full max-w-[272px] h-[28px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-full p-[2px] flex items-center mb-8">
              {["High", "Medium", "Low"].map((item) => (
                <button key={item} type="button" onClick={() => setRecommendationFrequency(item)} className={`flex-1 h-full rounded-full text-[13px] transition-all cursor-pointer ${recommendationFrequency === item ? "bg-[#4C6FFF] text-white" : "text-[#5C6B8A]"}`}>{item}</button>
              ))}
            </div>
            <div>
              <p className="text-[14px] text-[#5C6B8A] mb-4">Show Reasoning</p>
              <button type="button" onClick={() => setShowReasoning(!showReasoning)} className={`w-[32px] h-[18px] rounded-full relative transition-all cursor-pointer ${showReasoning ? "bg-[#4C6FFF]" : "bg-gray-300"}`}><div className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${showReasoning ? "right-[2px]" : "left-[2px]"}`} /></button>
            </div>
          </section>
          <div className="flex justify-center mt-8 sm:mt-12 gap-10">
            <button type="button" onClick={() => navigate(-1)} className="w-[102px] h-[44px] rounded-full border border-[#4C6FFF] bg-white text-[#4C6FFF] text-[14px] font-medium transition-all hover:bg-[#F5F7FF] cursor-pointer">Cancel</button>
            <button type="button" onClick={handleSave} className="w-[102px] h-[44px] rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
