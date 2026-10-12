import { useState } from "react";
import deleteSecurityIcon from "../../../assets/images/delete_security.svg";

const ToggleSwitch = ({ enabled, setEnabled }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
    className={`w-[32px] h-[18px] rounded-full relative transition-all cursor-pointer ${
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

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const SectionCard = ({ title, children }) => (
  <div className="w-full rounded-[14px] md:rounded-[18px] border border-[#E5E5E5] bg-white p-[12px] md:p-5">
    <h3 className="text-[18px] font-[510] text-[#3D3D3D] leading-none">
      {title}
    </h3>
    <div className="border-b border-[#CFCFCF] mt-4 mb-5" />
    {children}
  </div>
);

export default function Security() {
  const [dataProcessing, setDataProcessing] = useState(true);
  const [personalization, setPersonalization] = useState(true);
  const [aiMemory, setAiMemory] = useState(true);

  const sessions = [
    { id: 1, device: "Chrome/Window" },
    { id: 2, device: "Mobile Device" },
  ];

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-5 md:p-6 shadow-[0px_0px_4px_0px_#00000014]">
          <h2 className="leading-[100%] tracking-[0%] font-[510] text-[18px] text-[#3D3D3D] whitespace-nowrap">
            Security & Privacy
          </h2>
          <div className="border-b border-[#CFCFCF] mt-4 mb-6" />

          <div className="flex flex-col gap-5">
            {/* Account Security */}
            <SectionCard title="Account Security">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Password
                  </span>
                  <button
                    type="button"
                    className="min-w-[88px] h-[36px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Last Changed
                  </span>
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#586D93]">
                    24 Aug 2026
                  </span>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#E53935] text-white text-[14px] font-medium hover:opacity-90 transition cursor-pointer"
                  >
                    <img
                      src={deleteSecurityIcon}
                      alt=""
                      className="w-4 h-[18px]"
                    />
                    Delete My Account
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* Active Sessions */}
            <SectionCard title="Active Sessions">
              <div className="flex flex-col gap-5">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                      {session.device}
                    </span>
                    <button
                      type="button"
                      className="min-w-[88px] h-[36px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Privacy & Consent */}
            <SectionCard title="Privacy & Consent">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Data Processing
                  </span>
                  <ToggleSwitch
                    enabled={dataProcessing}
                    setEnabled={setDataProcessing}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    Personalization
                  </span>
                  <ToggleSwitch
                    enabled={personalization}
                    setEnabled={setPersonalization}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[14px] sm:text-[16px] font-medium text-[#3D3D3D]">
                    AI Memory
                  </span>
                  <ToggleSwitch enabled={aiMemory} setEnabled={setAiMemory} />
                </div>
              </div>
            </SectionCard>

            {/* Data actions (header matches design mockup) */}
            <SectionCard title="Active Sessions">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] font-medium hover:opacity-90 transition cursor-pointer"
                >
                  Download My Data
                  <DownloadIcon />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 h-[40px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] font-medium hover:opacity-90 transition cursor-pointer"
                >
                  Request data Deletion
                  <img
                    src={deleteSecurityIcon}
                    alt=""
                    className="w-4 h-[18px]"
                  />
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
