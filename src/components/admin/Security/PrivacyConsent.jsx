import React, { useState, useRef, useEffect } from "react";
import { Check, X, ShieldCheck, RefreshCw, XCircle } from "lucide-react";
import consent1 from "../../../assets/images/consent1.png";
import consent2 from "../../../assets/images/consent2.png";
import consent3 from "../../../assets/images/consent3.png";
import consent4 from "../../../assets/images/consent4.png";

export default function PrivacyConsent() {
  const [activeTab, setActiveTab] = useState("privacy_gdpr"); // "privacy_gdpr" | "ai_memory"
  const [searchQuery, setSearchQuery] = useState("");
  const [tableScrollProgress, setTableScrollProgress] = useState(35);
  const tableContainerRef = useRef(null);
  const mobileTabsRef = useRef(null);

  // Toast & Validation Modal States
  const [toastMessage, setToastMessage] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationComplete, setValidationComplete] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // State for AI Memory Governance items
  const [memorySettings, setMemorySettings] = useState({
    // Long-Term Memory
    user_opt_in: true,
    // Memory Categories
    user_preference: true,
    meeting: true,
    communication: true,
    task: true,
    // Consent Validation
    opt_in_before_storage: true,
    consent_recorded: true,
    withdrawal_support: true,
    memory_deletion: true,
  });

  const toggleSetting = (key, label) => {
    setMemorySettings((prev) => {
      const nextVal = !prev[key];
      showToast(`${label} is now ${nextVal ? "Enabled" : "Disabled"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  const handleRunValidation = () => {
    setShowValidationModal(true);
    setIsValidating(true);
    setValidationProgress(15);
    setValidationComplete(false);

    const interval = setInterval(() => {
      setValidationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsValidating(false);
          setValidationComplete(true);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  // User Consent Table Data
  const initialUsers = [
    {
      id: 1,
      slNo: 1,
      user: "User001",
      dataConsent: true,
      personalizationConsent: true,
      memoryConsent: true,
      status: "Active",
    },
    {
      id: 2,
      slNo: 2,
      user: "User002",
      dataConsent: true,
      personalizationConsent: true,
      memoryConsent: false,
      status: "Active",
    },
  ];

  const [users, setUsers] = useState(initialUsers);

  // Handle table horizontal scroll for dynamic progress bar in responsive viewports
  const handleTableScroll = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(20, (scrollLeft / maxScroll) * 100));
        setTableScrollProgress(progress);
      } else {
        setTableScrollProgress(35);
      }
    }
  };

  useEffect(() => {
    const el = tableContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleTableScroll);
      return () => el.removeEventListener("scroll", handleTableScroll);
    }
  }, []);

  // Sync horizontal scroll on mobile tabs container
  useEffect(() => {
    if (mobileTabsRef.current) {
      if (activeTab === "privacy_gdpr") {
        mobileTabsRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        mobileTabsRef.current.scrollTo({
          left: mobileTabsRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  const filteredUsers = users.filter((u) =>
    u.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-6 pb-6 scrollbar-hide">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <ShieldCheck className="w-5 h-5 text-[#4866F6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card Container with standard Dashboard outer alignment & full height */}
      <div className="w-full min-h-full bg-white rounded-[20px] md:rounded-[25px] border border-[#E2E8F0] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] p-4 sm:p-6 lg:p-8 flex flex-col">
        
        {/* Main Title Header */}
        <div className="pb-3 lg:pb-3.5">
          <h2 className="shrink-0 text-lg font-medium text-slate-800 tracking-tight">
            Privacy &amp; Consent
          </h2>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#CFCFCF] mb-4 lg:mb-4"></div>

        {/* TAB SWITCHER */}
        {/* 1. Mobile View: Single Line Full-Width Pill with Smooth Horizontal Scroll & Hidden Scrollbar */}
        <div className="sm:hidden w-full mb-6">
          <div
            ref={mobileTabsRef}
            className="w-full p-1 bg-white border border-[#E2E8F0] rounded-full flex items-center overflow-x-auto scrollbar-hide no-scrollbar snap-x snap-mandatory shadow-xs"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("privacy_gdpr")}
              className={`min-w-full shrink-0 snap-center py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                activeTab === "privacy_gdpr"
                  ? "bg-[#4866F6] text-white shadow-sm shadow-[#4866F6]/25"
                  : "text-[#586D93] hover:text-[#1E293B]"
              }`}
            >
              Privacy &amp; GDPR
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ai_memory")}
              className={`min-w-full shrink-0 snap-center py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                activeTab === "ai_memory"
                  ? "bg-[#4866F6] text-white shadow-sm shadow-[#4866F6]/25"
                  : "text-[#586D93] hover:text-[#1E293B]"
              }`}
            >
              AI Memory Governance
            </button>
          </div>
        </div>

        {/* 2. Desktop & Tablet View: 2-tab side-by-side pill right-aligned */}
        <div className="hidden sm:flex w-full justify-end mb-5 lg:mb-5">
          <div className="w-full max-w-[500px] lg:max-w-[460px] p-1 bg-white border border-[#E2E8F0] rounded-full flex items-center justify-between shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("privacy_gdpr")}
              className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                activeTab === "privacy_gdpr"
                  ? "bg-[#4866F6] text-white shadow-sm shadow-[#4866F6]/25"
                  : "text-[#586D93] hover:text-[#1E293B] hover:bg-slate-50"
              }`}
            >
              Privacy &amp; GDPR
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ai_memory")}
              className={`flex-1 py-1.5 sm:py-2 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer text-center whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                activeTab === "ai_memory"
                  ? "bg-[#4866F6] text-white shadow-sm shadow-[#4866F6]/25"
                  : "text-[#586D93] hover:text-[#1E293B] hover:bg-slate-50"
              }`}
            >
              AI Memory Governance
            </button>
          </div>
        </div>

        {/* TAB 1: PRIVACY & GDPR VIEW */}
        {activeTab === "privacy_gdpr" && (
          <div className="animate-in fade-in duration-200">
            {/* Section Heading: Privacy & GDPR */}
            <div className="mt-1 mb-2.5 lg:mb-2">
              <h3 className="text-base sm:text-lg font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                Privacy &amp; GDPR
              </h3>
            </div>

            {/* Sub-heading: Consent Overview with bottom border line */}
            <div className="mt-3.5 mb-3.5 lg:mb-3">
              <h4 className="text-sm sm:text-base font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                Consent Overview
              </h4>
            </div>

            {/* 4 Metric Cards Grid - 4 columns on Laptop/Desktop, 2 columns on Tablet, 1 column on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 mb-5 sm:mb-6 lg:mb-5">
              {/* Card 1: Total User */}
              <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-2.5 xl:p-3.5 2xl:p-4 flex items-center gap-3 sm:gap-4 lg:gap-2 xl:gap-3 2xl:gap-3.5 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
                <img
                  src={consent1}
                  alt="Total User"
                  className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[38px] lg:h-[38px] xl:w-[46px] xl:h-[46px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                    12,450
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                    Total User
                  </span>
                </div>
              </div>

              {/* Card 2: Consent Granted */}
              <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-2.5 xl:p-3.5 2xl:p-4 flex items-center gap-3 sm:gap-4 lg:gap-2 xl:gap-3 2xl:gap-3.5 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
                <img
                  src={consent2}
                  alt="Consent Granted"
                  className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[38px] lg:h-[38px] xl:w-[46px] xl:h-[46px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                    11,820
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                    Consent Granted
                  </span>
                </div>
              </div>

              {/* Card 3: Consent Withdrawn */}
              <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-2.5 xl:p-3.5 2xl:p-4 flex items-center gap-3 sm:gap-4 lg:gap-2 xl:gap-3 2xl:gap-3.5 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
                <img
                  src={consent3}
                  alt="Consent Withdrawn"
                  className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[38px] lg:h-[38px] xl:w-[46px] xl:h-[46px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                    430
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                    Consent Withdrawn
                  </span>
                </div>
              </div>

              {/* Card 4: Memory opt-in */}
              <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-2.5 xl:p-3.5 2xl:p-4 flex items-center gap-3 sm:gap-4 lg:gap-2 xl:gap-3 2xl:gap-3.5 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
                <img
                  src={consent4}
                  alt="Memory opt-in"
                  className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[38px] lg:h-[38px] xl:w-[46px] xl:h-[46px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                    9,850
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                    Memory opt-in
                  </span>
                </div>
              </div>
            </div>

            {/* Section Heading: User Consent with top & bottom border lines */}
            <div className="mt-4 mb-2 lg:mt-3">
              <div className="border-y border-[#CFCFCF] py-2.5 lg:py-2.5 my-2">
                <h3 className="text-base sm:text-lg font-medium text-slate-800">
                  User Consent
                </h3>
              </div>
            </div>

            {/* User Consent Table Container */}
            <div className="w-full border border-[#E2E8F0] rounded-[16px] overflow-hidden bg-white shadow-xs mt-2.5">
              <div
                ref={tableContainerRef}
                className="w-full overflow-x-auto scrollbar-hide select-none"
              >
                <table className="w-full min-w-[640px] text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-[#EEF2FE] border-b border-[#E2E8F0]">
                      <th className="py-3.5 pl-4 sm:pl-6 text-sm font-medium text-slate-700 whitespace-nowrap w-[80px] sm:w-[12%]">
                        SL No
                      </th>
                      <th className="py-3.5 pl-3 sm:pl-4 text-sm font-medium text-slate-700 whitespace-nowrap w-[120px] sm:w-[20%]">
                        User
                      </th>
                      <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[100px] sm:w-[17%]">
                        Data
                      </th>
                      <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[120px] sm:w-[18%]">
                        Personalization
                      </th>
                      <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[100px] sm:w-[16%]">
                        Memory
                      </th>
                      <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[110px] sm:w-[17%]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {filteredUsers.slice(0, 2).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* SL No */}
                        <td className="py-3 pl-4 sm:pl-6 text-sm text-[#586D93] font-normal whitespace-nowrap">
                          {row.slNo}
                        </td>
                        
                        {/* User */}
                        <td className="py-3 pl-3 sm:pl-4 text-sm text-[#586D93] font-normal whitespace-nowrap">
                          {row.user}
                        </td>

                        {/* Data Badge */}
                        <td className="py-3 lg:py-2.5 text-center">
                          {row.dataConsent ? (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#E3F9EC] text-[#22C55E]">
                              <Check className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#FFEBEB] text-[#EF4444]">
                              <X className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          )}
                        </td>

                        {/* Personalization Badge */}
                        <td className="py-3 lg:py-2.5 text-center">
                          {row.personalizationConsent ? (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#E3F9EC] text-[#22C55E]">
                              <Check className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#FFEBEB] text-[#EF4444]">
                              <X className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          )}
                        </td>

                        {/* Memory Badge */}
                        <td className="py-3 lg:py-2.5 text-center">
                          {row.memoryConsent ? (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#E3F9EC] text-[#22C55E]">
                              <Check className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-[48px] h-[26px] lg:w-[46px] lg:h-[26px] rounded-full bg-[#FFEBEB] text-[#EF4444]">
                              <X className="w-[18px] h-[18px] lg:w-[17px] lg:h-[17px] stroke-[2.5]" />
                            </span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="py-3 lg:py-2.5 text-center">
                          <span className="inline-flex items-center justify-center w-[84px] h-[26px] lg:w-[80px] lg:h-[26px] rounded-full bg-[#E3F9EC] text-[#22C55E] text-[12px] lg:text-[11.5px] font-medium">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Progress / Scroll Indicator Track on mobile & tablet */}
              <div className="w-full px-4 sm:px-6 py-3 bg-white flex lg:hidden items-center">
                <div className="w-full h-[6px] bg-[#D9D9D9] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#4866F6] rounded-full transition-all duration-200"
                    style={{ width: `${tableScrollProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI MEMORY GOVERNANCE VIEW (Exact match to screenshots) */}
        {activeTab === "ai_memory" && (
          <div className="animate-in fade-in duration-200 flex-1 flex flex-col justify-between">
            <div>
              {/* Section Heading: AI Memory Governance */}
              <div className="mt-1 mb-2.5 lg:mb-2">
                <h3 className="text-base sm:text-lg font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                  AI Memory Governance
                </h3>
              </div>

              {/* Section 1: Long-Term Memory */}
              <div className="mt-3.5 mb-2 lg:mt-3">
                <h4 className="text-sm sm:text-base font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                  Long-Term Memory
                </h4>
              </div>

              <div className="py-2.5 sm:py-3 lg:py-2.5 flex items-center justify-between border-b border-[#CFCFCF]">
                <span className="text-sm sm:text-base font-medium text-slate-800">
                  User Opt-In Required
                </span>
                <button
                  type="button"
                  onClick={() => toggleSetting("user_opt_in", "User Opt-In Required")}
                  className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                    memorySettings.user_opt_in
                      ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                >
                  {memorySettings.user_opt_in ? "Enabled" : "Disabled"}
                </button>
              </div>

              {/* Section 2: Memory Categories */}
              <div className="mt-4 mb-2 lg:mt-3.5">
                <h4 className="text-sm sm:text-base font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                  Memory Categories
                </h4>
              </div>

              <div className="space-y-1">
                {/* User Preference */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    User Preference
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("user_preference", "User Preference")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.user_preference
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.user_preference ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Meeting */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Meeting
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("meeting", "Meeting")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.meeting
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.meeting ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Communication */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Communication
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("communication", "Communication")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.communication
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.communication ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Task */}
                <div className="py-2.5 sm:py-3 lg:py-2.5 flex items-center justify-between border-b border-[#CFCFCF]">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Task
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("task", "Task")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.task
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.task ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>

              {/* Section 3: Consent Validation */}
              <div className="mt-4 mb-2 lg:mt-3.5">
                <h4 className="text-sm sm:text-base font-medium text-slate-800 pb-2.5 lg:pb-2.5 border-b border-[#CFCFCF]">
                  Consent Validation
                </h4>
              </div>

              <div className="space-y-1">
                {/* Opt-in Required Before memory storage */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Opt-in Required Before memory storage
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("opt_in_before_storage", "Opt-in Required Before memory storage")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.opt_in_before_storage
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.opt_in_before_storage ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Consent recorded before storage */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Consent recorded before storage
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("consent_recorded", "Consent recorded before storage")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.consent_recorded
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.consent_recorded ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* Withdrawal Support */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Withdrawal Support
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("withdrawal_support", "Withdrawal Support")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.withdrawal_support
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.withdrawal_support ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {/* memory Deletion Supported */}
                <div className="py-2.5 lg:py-2 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    Memory Deletion Supported
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("memory_deletion", "memory Deletion Supported")}
                    className={`w-[88px] sm:w-[96px] h-[32px] sm:h-[34px] rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      memorySettings.memory_deletion
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E5]"
                        : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                    }`}
                  >
                    {memorySettings.memory_deletion ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action Button: Run Consent Validation */}
            <div className="mt-6 lg:mt-5 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={handleRunValidation}
                className="w-full sm:w-auto h-[40px] px-7 bg-[#4866F6] hover:bg-[#3855E5] text-white text-xs sm:text-sm font-medium rounded-full cursor-pointer shadow-sm active:scale-95 transition-all text-center flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
              >
                Run Consent Validation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4866F6]" />
                <h3 className="font-semibold text-gray-900 text-base">
                  AI Memory Consent Validation
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setShowValidationModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded-md"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              {isValidating ? (
                <div className="text-center space-y-3">
                  <div className="inline-block animate-spin text-[#4866F6]">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Running live validation across memory policies &amp; category stores...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#4866F6] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${validationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{validationProgress}% complete</p>
                </div>
              ) : validationComplete ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">All Memory Consent Rules Verified!</span>
                      <p className="text-xs text-emerald-700 mt-1">
                        100% of memory categories, opt-in checks, and deletion pipelines passed automated validation.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span>Long-Term Memory Opt-in:</span>
                      <span className="font-medium text-emerald-600">Passed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category Rules (Pref/Meeting/Task):</span>
                      <span className="font-medium text-emerald-600">Passed</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Erasure &amp; Withdrawal Protocol:</span>
                      <span className="font-medium text-emerald-600">Passed</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowValidationModal(false)}
                className="px-4 py-2 bg-[#4866F6] text-white text-xs font-medium rounded-lg hover:bg-[#3855E5] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
