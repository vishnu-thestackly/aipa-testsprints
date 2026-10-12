import { useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteSecurityIcon from "../../../assets/images/delete_security.svg";

const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
    className={`w-[32px] h-[18px] rounded-full relative transition-all cursor-pointer flex-shrink-0 ${
      enabled ? "bg-[#4866F6]" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all ${
        enabled ? "right-[2px]" : "left-[2px]"
      }`}
    />
  </button>
);

const WarningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L1.5 21h21L12 2z"
      fill="#F5A623"
      stroke="#F5A623"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17.5" r="1.2" fill="white" />
  </svg>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-[10px] cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="appearance-none w-4 h-4 rounded-[4px] border-2 border-[#4866F6] checked:bg-[#4866F6] checked:border-[#4866F6] relative after:content-[''] after:absolute after:w-[4px] after:h-[8px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:left-[4px] after:top-[1px] after:hidden checked:after:block cursor-pointer"
    />
    <span className="text-[16px] text-[#5C6B8A]">{label}</span>
  </label>
);

export default function AiMemory() {
  const navigate = useNavigate();
  const [rememberPreferences, setRememberPreferences] = useState(true);
  const [memoryPreferences, setMemoryPreferences] = useState(true);
  const [communicationPreferences, setCommunicationPreferences] =
    useState(true);
  const [taskPreferences, setTaskPreferences] = useState(true);

  const [deletionCategories, setDeletionCategories] = useState({
    profile: true,
    conversations: true,
    task: true,
    aiMemory: true,
    integration: false,
  });

  const toggleCategory = (key) => {
    setDeletionCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-5 md:p-6 shadow-[0px_0px_4px_0px_#00000014]">
          <h2 className="leading-[100%] tracking-[0%] font-[510] text-[18px] text-[#3D3D3D] whitespace-nowrap">
            AI Memory
          </h2>
          <div className="border-b border-[#CFCFCF] mt-4 mb-6" />

          <div className="flex flex-col gap-5">
            {/* Remember My Preferences */}
            <div className="w-full rounded-[14px] md:rounded-[18px] border border-[#E5E5E5] bg-white p-[12px] md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-[16px] sm:text-[18px] font-[510] text-[#3D3D3D] leading-none mb-2">
                    Remember My Preferences
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#5C6B8A] leading-snug">
                    The assistant can remember permitted information to
                    personalize future interactions
                  </p>
                </div>
                <ToggleSwitch
                  enabled={rememberPreferences}
                  setEnabled={setRememberPreferences}
                />
              </div>
            </div>

            {/* Memory Categories */}
            <div className="w-full rounded-[14px] md:rounded-[18px] border border-[#E5E5E5] bg-white p-[12px] md:p-5">
              <h3 className="text-[18px] font-[510] text-[#3D3D3D] leading-none">
                Memory Categories
              </h3>
              <div className="border-b border-[#CFCFCF] mt-4 mb-5" />

              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Memory Preferences
                  </span>
                  <ToggleSwitch
                    enabled={memoryPreferences}
                    setEnabled={setMemoryPreferences}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Communication Preferences
                  </span>
                  <ToggleSwitch
                    enabled={communicationPreferences}
                    setEnabled={setCommunicationPreferences}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Task Preferences
                  </span>
                  <ToggleSwitch
                    enabled={taskPreferences}
                    setEnabled={setTaskPreferences}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
                <button
                  type="button"
                  className="h-[40px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer"
                >
                  View My Memories
                </button>
                <button
                  type="button"
                  className="h-[40px] px-5 rounded-full bg-[#4866F6] text-white text-[14px]  hover:opacity-90 transition cursor-pointer"
                >
                  Delete all Memories
                </button>
                <button
                  type="button"
                  className="h-[40px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer"
                >
                  Withdraw Memory Consent
                </button>
              </div>
            </div>

            {/* Data Deletion Categories */}
            <div className="w-full rounded-[14px] md:rounded-[18px] border border-[#E5E5E5] bg-white p-[12px] md:p-5">
              <h3 className="text-[18px] font-[510] text-[#3D3D3D] leading-none">
                Memory Categories
              </h3>
              <div className="border-b border-[#CFCFCF] mt-4 mb-5" />

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-4 sm:gap-x-8 mb-5">
                <Checkbox
                  label="Profile"
                  checked={deletionCategories.profile}
                  onChange={() => toggleCategory("profile")}
                />
                <Checkbox
                  label="Conversations"
                  checked={deletionCategories.conversations}
                  onChange={() => toggleCategory("conversations")}
                />
                <Checkbox
                  label="Task"
                  checked={deletionCategories.task}
                  onChange={() => toggleCategory("task")}
                />
                <Checkbox
                  label="AI Memory"
                  checked={deletionCategories.aiMemory}
                  onChange={() => toggleCategory("aiMemory")}
                />
                <Checkbox
                  label="Integration-related data"
                  checked={deletionCategories.integration}
                  onChange={() => toggleCategory("integration")}
                />
              </div>

              <div className="flex items-start gap-3 rounded-[12px] border border-[#F5C16C] bg-[#FFF6E8] px-4 py-3">
                <div className="flex-shrink-0 mt-0.5">
                  <WarningIcon />
                </div>
                <div>
                  <p className="text-[15px] font-[510] text-[#3D3D3D] leading-none mb-1">
                    Warning
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#5C6B8A]">
                    Data will be Permanently Deleted!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 sm:mt-12 gap-5">
            <button
              type="button"
              className="w-[102px] h-[44px] rounded-full border border-[#4C6FFF] bg-white text-[#4C6FFF] text-[14px] font-medium transition-all hover:bg-[#F5F7FF] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="min-w-[102px] h-[44px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer inline-flex items-center justify-center gap-2"
            >
              Delete
              <img src={deleteSecurityIcon} alt="" className="w-4 h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
