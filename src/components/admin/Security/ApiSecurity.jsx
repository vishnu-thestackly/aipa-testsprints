import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Lock,
  Key,
  KeyRound,
  FileCheck,
  Globe,
  Sliders,
  Server,
  Zap,
  Check,
  X,
  Copy,
  RefreshCw,
  User,
  Clock,
  XCircle,
} from "lucide-react";

import oauthActiveTokensImg from "../../../assets/images/oauth_active_tokens.png";
import oauthExpiringTokensImg from "../../../assets/images/oauth_expiring_tokens.png";
import oauthRevokedTokensImg from "../../../assets/images/oauth_revoked_tokens.png";

export default function ApiSecurity() {
  // Tab State: "api_protection" | "oauth2_security" | "credentials"
  const [activeTab, setActiveTab] = useState("credentials");

  // Horizontal scroll progress for mobile table views
  const [tableScrollProgress, setTableScrollProgress] = useState(45);
  const [oauthScrollProgress, setOauthScrollProgress] = useState(45);
  const tableContainerRef = useRef(null);
  const oauthTableContainerRef = useRef(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Validation Simulation Modal State
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationComplete, setValidationComplete] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // API Endpoints Data (Matching exact screenshot table)
  const [apiEndpoints, setApiEndpoints] = useState([
    {
      id: 1,
      slNo: 1,
      api: "/chat",
      limit: "100/min",
      usage: "62/min",
      status: "Secure",
    },
    {
      id: 2,
      slNo: 2,
      api: "/tasks",
      limit: "60/min",
      usage: "45/min",
      status: "Secure",
    },
    {
      id: 3,
      slNo: 3,
      api: "/calendar",
      limit: "50/min",
      usage: "43/min",
      status: "Secure",
    },
  ]);

  // Rate Limiting & Protection Toggles (Matching exact screenshot switches)
  const [settings, setSettings] = useState({
    rateLimiting: true,
    throttling: true,
    autoBlocking: true,
  });

  // Input Sanitization Buttons (Matching exact screenshot buttons)
  const [sanitization, setSanitization] = useState({
    inputValidation: true,
    maliciousPayload: true,
    sqlInjection: true,
    xssProtection: true,
  });

  // OAuth2 Token Integrations Data (Matching exact screenshot for OAuth Token Security)
  const [oauthTokens, setOauthTokens] = useState([
    {
      id: 1,
      slNo: 1,
      integration: "Outlook",
      issuedOn: "20 Aug 2026",
      expiresOn: "20 Sept 2026",
      status: "Active",
      action: "Manage",
    },
    {
      id: 2,
      slNo: 2,
      integration: "Exchange",
      issuedOn: "20 Aug 2026",
      expiresOn: "20 Sept 2026",
      status: "Active",
      action: "Manage",
    },
    {
      id: 3,
      slNo: 3,
      integration: "Jira",
      issuedOn: "20 Aug 2026",
      expiresOn: "20 Sept 2026",
      status: "Active",
      action: "Manage",
    },
    {
      id: 4,
      slNo: 4,
      integration: "Trello",
      issuedOn: "20 July 2026",
      expiresOn: "20 Aug 2026",
      status: "Expiring",
      action: "Refresh",
    },
  ]);

  // OAuth2 Token Details Settings State
  const [tokenDetails, setTokenDetails] = useState({
    tokenStatus: "Active",
    tokenStorage: "Encrypted",
    refreshRotation: true,
    scope: "Authorized Scopes",
  });

  // Tab 3: Integration Credentials State (Matching exact screenshots)
  const [credentialsList, setCredentialsList] = useState([
    {
      id: 1,
      slNo: 1,
      integration: "Outlook",
      type: "OAuth",
      storage: "Vault",
      status: "Secure",
      action: "Manage",
    },
    {
      id: 2,
      slNo: 2,
      integration: "Exchange",
      type: "OAuth",
      storage: "Vault",
      status: "Secure",
      action: "Manage",
    },
    {
      id: 3,
      slNo: 3,
      integration: "Jira",
      type: "OAuth",
      storage: "Vault",
      status: "Secure",
      action: "Manage",
    },
    {
      id: 4,
      slNo: 4,
      integration: "Trello",
      type: "Token",
      storage: "Vault",
      status: "Warning",
      action: "Rotate",
    },
  ]);

  // Tab 3: Credential Security Settings State
  const [credentialSecurity, setCredentialSecurity] = useState({
    encryption: true,
    secureVault: true,
    accessControl: true,
    credentialRotation: true,
  });

  const [credScrollProgress, setCredScrollProgress] = useState(45);
  const credTableContainerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle handler for switches
  const toggleSetting = (key, label) => {
    setSettings((prev) => {
      const nextVal = !prev[key];
      showToast(`${label} is now ${nextVal ? "Enabled" : "Disabled"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  // Toggle handler for Sanitization buttons
  const toggleSanitization = (key, label) => {
    setSanitization((prev) => {
      const nextVal = !prev[key];
      showToast(`${label} is now ${nextVal ? "Enabled" : "Disabled"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  // Toggle handler for Credential Security buttons
  const toggleCredentialSecurity = (key, label) => {
    setCredentialSecurity((prev) => {
      const nextVal = !prev[key];
      showToast(`${label} is now ${nextVal ? "Enabled" : "Disabled"}`);
      return { ...prev, [key]: nextVal };
    });
  };

  // Toggle handler for OAuth Refresh Rotation
  const toggleRefreshRotation = () => {
    setTokenDetails((prev) => {
      const nextVal = !prev.refreshRotation;
      showToast(`Refresh Rotation is now ${nextVal ? "Enabled" : "Disabled"}`);
      return { ...prev, refreshRotation: nextVal };
    });
  };

  // Action handlers for OAuth Token Actions
  const handleTokenAction = (item) => {
    if (item.action === "Refresh") {
      setOauthTokens((prev) =>
        prev.map((t) =>
          t.id === item.id ? { ...t, status: "Active", action: "Manage" } : t
        )
      );
      showToast(`Token for ${item.integration} refreshed successfully.`);
    } else {
      showToast(`Managing token settings for ${item.integration}...`);
    }
  };

  // Action handlers for Integration Credentials Actions
  const handleCredentialAction = (item) => {
    if (item.action === "Rotate") {
      setCredentialsList((prev) =>
        prev.map((c) =>
          c.id === item.id ? { ...c, status: "Secure", action: "Manage" } : c
        )
      );
      showToast(`Credential for ${item.integration} rotated successfully.`);
    } else {
      showToast(`Managing credential settings for ${item.integration}...`);
    }
  };

  const handleRefreshToken = () => {
    showToast("All active OAuth tokens refreshed successfully.");
  };

  const handleRevokeToken = () => {
    showToast("OAuth token revocation sequence initiated.");
  };

  const handleRotateCredential = () => {
    showToast("All integration credentials rotated successfully.");
  };

  const handleRevokeAccess = () => {
    showToast("Credential access revocation sequence initiated.");
  };

  // Scroll handler for API Protection table
  const handleTableScroll = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(25, (scrollLeft / maxScroll) * 100));
        setTableScrollProgress(progress);
      } else {
        setTableScrollProgress(45);
      }
    }
  };

  // Scroll handler for OAuth Tokens table
  const handleOauthTableScroll = () => {
    if (oauthTableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = oauthTableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(25, (scrollLeft / maxScroll) * 100));
        setOauthScrollProgress(progress);
      } else {
        setOauthScrollProgress(45);
      }
    }
  };

  // Scroll handler for Credentials table
  const handleCredTableScroll = () => {
    if (credTableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = credTableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = Math.min(100, Math.max(25, (scrollLeft / maxScroll) * 100));
        setCredScrollProgress(progress);
      } else {
        setCredScrollProgress(45);
      }
    }
  };

  useEffect(() => {
    const el = tableContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleTableScroll);
      return () => el.removeEventListener("scroll", handleTableScroll);
    }
  }, [activeTab]);

  useEffect(() => {
    const el = oauthTableContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleOauthTableScroll);
      return () => el.removeEventListener("scroll", handleOauthTableScroll);
    }
  }, [activeTab]);

  useEffect(() => {
    const el = credTableContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleCredTableScroll);
      return () => el.removeEventListener("scroll", handleCredTableScroll);
    }
  }, [activeTab]);

  // Run Security Validation Simulation
  const handleRunValidation = () => {
    setShowValidationModal(true);
    setIsValidating(true);
    setValidationProgress(10);
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
    }, 320);
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-6 pb-6 scrollbar-hide font-sans bg-gray-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <ShieldCheck className="w-5 h-5 text-[#3B66F5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main White Card with full outer alignment */}
      <div className="w-full min-h-full bg-white rounded-[20px] md:rounded-[25px] border border-[#E2E8F0] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <div>
          {/* Main Title Header */}
          <div className="pb-3 lg:pb-3.5">
            <h2 className="shrink-0 text-lg sm:text-[19px] font-semibold text-slate-800 tracking-tight">
              API Security
            </h2>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-[#E2E8F0] mb-4 sm:mb-5" />

          {/* Pill Segmented Navigation Bar (Scrollable on mobile with min-width, full-width grid on desktop) */}
          <div className="w-full border border-[#E2E8F0] rounded-full p-1 sm:p-1.5 flex md:grid md:grid-cols-3 items-center bg-white mb-5 sm:mb-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("api_protection")}
              className={`min-w-[145px] md:min-w-0 md:w-full py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
                activeTab === "api_protection"
                  ? "bg-[#3B66F5] text-white shadow-sm"
                  : "text-[#586D93] hover:text-slate-900"
              }`}
            >
              API Protection
            </button>
            <button
              onClick={() => setActiveTab("oauth2_security")}
              className={`min-w-[145px] md:min-w-0 md:w-full py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
                activeTab === "oauth2_security"
                  ? "bg-[#3B66F5] text-white shadow-sm"
                  : "text-[#586D93] hover:text-slate-900"
              }`}
            >
              Oauth2 Security
            </button>
            <button
              onClick={() => setActiveTab("credentials")}
              className={`min-w-[145px] md:min-w-0 md:w-full py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-[15px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
                activeTab === "credentials"
                  ? "bg-[#3B66F5] text-white shadow-sm"
                  : "text-[#586D93] hover:text-slate-900"
              }`}
            >
              Credentials
            </button>
          </div>

          {/* TAB 1: API PROTECTION */}
          {activeTab === "api_protection" && (
            <div>
              {/* Subheading */}
              <div className="pb-2.5 sm:pb-3">
                <h3 className="text-base sm:text-[17px] font-semibold text-slate-800">
                  API Protection
                </h3>
              </div>

              {/* Sub-divider */}
              <div className="w-full h-[1px] bg-[#E2E8F0] mb-4 sm:mb-5" />

              {/* API Protection Table with scrollbar situated WITHIN the table box */}
              <div className="border border-[#E2E8F0] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-white mb-4 sm:mb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
                <div
                  ref={tableContainerRef}
                  onScroll={handleTableScroll}
                  className="overflow-x-auto scrollbar-hide"
                >
                  <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px] lg:min-w-full">
                    <thead>
                      <tr className="bg-[#EEF2FF] text-[#586D93] text-xs lg:text-[13px] font-medium">
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap min-w-[75px] w-[14%]">SL No</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[26%]">API</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%]">Limit</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%]">Usage</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] text-xs lg:text-[13px]">
                      {apiEndpoints.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {row.slNo}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {row.api}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {row.limit}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {row.usage}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                            <span className="w-[92px] h-[30px] rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#33B469] border border-[#33B469]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                              <span className="w-2 h-2 rounded-full bg-[#33B469]"></span>
                              Secure
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Blue Scrolling Indicator WITHIN the Table Container (Mobile & Tablet View) */}
                <div className="px-4 pb-3 pt-2 bg-white lg:hidden">
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B66F5] rounded-full transition-all duration-150"
                      style={{ width: `${tableScrollProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rate Limiting, Throttling & Auto Blocking Toggles */}
              <div className="space-y-4 sm:space-y-5 my-4 sm:my-6">
                {/* Rate Limiting */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800">
                    Rate Limiting
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("rateLimiting", "Rate Limiting")}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      settings.rateLimiting ? "bg-[#3B66F5]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        settings.rateLimiting ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Throttling */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800">
                    Throttling
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("throttling", "Throttling")}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      settings.throttling ? "bg-[#3B66F5]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        settings.throttling ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Auto Blocking */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800">
                    Auto Blocking
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSetting("autoBlocking", "Auto Blocking")}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      settings.autoBlocking ? "bg-[#3B66F5]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        settings.autoBlocking ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Input Sanitization Section */}
              <div className="pt-2 sm:pt-4">
                <h4 className="text-sm sm:text-[15px] font-medium text-slate-800 pb-2">
                  Input Sanitization
                </h4>
                <div className="w-full h-[1px] bg-[#E2E8F0] mb-3 sm:mb-4" />

                <div className="space-y-3 sm:space-y-4">
                  {/* Input Validation */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Input Validation
                    </span>
                    <button
                      onClick={() => toggleSanitization("inputValidation", "Input Validation")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        sanitization.inputValidation
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {sanitization.inputValidation ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Malicious Payload Detection */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-[1.3]">
                      Malicious Payload
                      <br className="sm:hidden" />
                      <span className="hidden sm:inline"> </span>Detection
                    </span>
                    <button
                      onClick={() =>
                        toggleSanitization("maliciousPayload", "Malicious Payload Detection")
                      }
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        sanitization.maliciousPayload
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {sanitization.maliciousPayload ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* SQL Injection Protection */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-[1.3]">
                      SQL Injection
                      <br className="sm:hidden" />
                      <span className="hidden sm:inline"> </span>Protection
                    </span>
                    <button
                      onClick={() =>
                        toggleSanitization("sqlInjection", "SQL Injection Protection")
                      }
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        sanitization.sqlInjection
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {sanitization.sqlInjection ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* XSS Protection */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      XSS Protection
                    </span>
                    <button
                      onClick={() => toggleSanitization("xssProtection", "XSS Protection")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        sanitization.xssProtection
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {sanitization.xssProtection ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OAUTH2 SECURITY (Matching Exact Screenshots) */}
          {activeTab === "oauth2_security" && (
            <div>
              {/* Subheading */}
              <div className="pb-2.5 sm:pb-3">
                <h3 className="text-base sm:text-[17px] font-semibold text-slate-800">
                  OAuth Token Security
                </h3>
              </div>

              {/* Sub-divider */}
              <div className="w-full h-[1px] bg-[#E2E8F0] mb-4 sm:mb-5" />

              {/* 3 Metric Summary Cards Grid (Laptop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-5 sm:mb-6">
                {/* Card 1: 124 Active Tokens */}
                <div className="bg-white border border-[#E2E8F0] rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={oauthActiveTokensImg}
                      alt="Active Tokens"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                      124
                    </h4>
                    <p className="text-xs sm:text-sm text-[#586D93] mt-0.5">
                      Active Tokens
                    </p>
                  </div>
                </div>

                {/* Card 2: 6 Expiring */}
                <div className="bg-white border border-[#E2E8F0] rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={oauthExpiringTokensImg}
                      alt="Expiring"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                      6
                    </h4>
                    <p className="text-xs sm:text-sm text-[#586D93] mt-0.5">
                      Expiring
                    </p>
                  </div>
                </div>

                {/* Card 3: 15 Revoked */}
                <div className="bg-white border border-[#E2E8F0] rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04)]">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={oauthRevokedTokensImg}
                      alt="Revoked"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
                      15
                    </h4>
                    <p className="text-xs sm:text-sm text-[#586D93] mt-0.5">
                      Revoked
                    </p>
                  </div>
                </div>
              </div>

              {/* OAuth Tokens Table */}
              <div className="border border-[#E2E8F0] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-white mb-4 sm:mb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
                <div
                  ref={oauthTableContainerRef}
                  onScroll={handleOauthTableScroll}
                  className="overflow-x-auto scrollbar-hide"
                >
                  <table className="w-full text-left border-collapse min-w-[580px] sm:min-w-[640px] lg:min-w-full">
                    <thead>
                      <tr className="bg-[#EEF2FF] text-[#586D93] text-xs lg:text-[13px] font-medium">
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap min-w-[75px] w-[10%]">SL No</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[24%]">Integration</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[22%]">Issued On</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[22%]">Expires On</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[12%]">Status</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[10%]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] text-xs lg:text-[13px]">
                      {oauthTokens.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.slNo}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.integration}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.issuedOn}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.expiresOn}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                            {item.status === "Active" ? (
                              <span className="w-[92px] h-[30px] rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#33B469] border border-[#33B469]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#33B469]"></span>
                                Active
                              </span>
                            ) : (
                              <span className="w-[92px] h-[30px] rounded-full text-xs font-semibold bg-[#FFF8EC] text-[#F59E0B] border border-[#F59E0B]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                                Expiring
                              </span>
                            )}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                            <button
                              onClick={() => handleTokenAction(item)}
                              className="w-[78px] sm:w-[84px] h-[30px] sm:h-[32px] bg-[#3B66F5] hover:bg-blue-600 active:scale-95 text-white font-medium text-xs lg:text-[13px] rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center"
                            >
                              {item.action}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Blue Scrolling Indicator WITHIN the Table Container (Mobile & Tablet View) */}
                <div className="px-4 pb-3 pt-2 bg-white lg:hidden">
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B66F5] rounded-full transition-all duration-150"
                      style={{ width: `${oauthScrollProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Token Details Section */}
              <div className="pt-2 sm:pt-4">
                <h4 className="text-base sm:text-[17px] font-semibold text-slate-800 pb-2">
                  Token Details
                </h4>
                <div className="w-full h-[1px] bg-[#E2E8F0] mb-3 sm:mb-4" />

                <div className="space-y-3 sm:space-y-4">
                  {/* Token Status */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Token Status
                    </span>
                    <span className="w-[92px] h-[32px] rounded-full text-xs sm:text-sm font-semibold bg-[#EAF7EF] text-[#33B469] border border-[#33B469]/20 inline-flex items-center justify-center">
                      Active
                    </span>
                  </div>

                  {/* Token Storage */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Token Storage
                    </span>
                    <span className="text-[14px] sm:text-[15px] font-semibold text-slate-800">
                      Encrypted
                    </span>
                  </div>

                  {/* Refresh Rotation */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Refresh Rotation
                    </span>
                    <button
                      onClick={toggleRefreshRotation}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        tokenDetails.refreshRotation
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {tokenDetails.refreshRotation ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Scope */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Scope
                    </span>
                    <span className="text-[14px] sm:text-[15px] font-semibold text-slate-800">
                      Authorized Scopes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CREDENTIALS (Matching Exact Screenshots) */}
          {activeTab === "credentials" && (
            <div>
              {/* Subheading */}
              <div className="pb-2.5 sm:pb-3">
                <h3 className="text-base sm:text-[17px] font-semibold text-slate-800">
                  Integration Credentials
                </h3>
              </div>

              {/* Sub-divider */}
              <div className="w-full h-[1px] bg-[#E2E8F0] mb-4 sm:mb-5" />

              {/* Integration Credentials Table */}
              <div className="border border-[#E2E8F0] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-white mb-4 sm:mb-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
                <div
                  ref={credTableContainerRef}
                  onScroll={handleCredTableScroll}
                  className="overflow-x-auto scrollbar-hide"
                >
                  <table className="w-full text-left border-collapse min-w-[580px] sm:min-w-[640px] lg:min-w-full">
                    <thead>
                      <tr className="bg-[#EEF2FF] text-[#586D93] text-xs lg:text-[13px] font-medium">
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap min-w-[75px] w-[10%]">SL No</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[24%]">Integration</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%]">Type</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%]">Storage</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[14%]">Status</th>
                        <th className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap w-[12%]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] text-xs lg:text-[13px]">
                      {credentialsList.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.slNo}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.integration}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.type}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                            {item.storage}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                            {item.status === "Secure" ? (
                              <span className="w-[92px] h-[30px] rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#33B469] border border-[#33B469]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#33B469]"></span>
                                Secure
                              </span>
                            ) : (
                              <span className="w-[92px] h-[30px] rounded-full text-xs font-semibold bg-[#FFF8EC] text-[#F59E0B] border border-[#F59E0B]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
                                Warning
                              </span>
                            )}
                          </td>
                          <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                            <button
                              onClick={() => handleCredentialAction(item)}
                              className="w-[78px] sm:w-[84px] h-[30px] sm:h-[32px] bg-[#3B66F5] hover:bg-blue-600 active:scale-95 text-white font-medium text-xs lg:text-[13px] rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center"
                            >
                              {item.action}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Blue Scrolling Indicator WITHIN the Table Container (Mobile & Tablet View) */}
                <div className="px-4 pb-3 pt-2 bg-white lg:hidden">
                  <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B66F5] rounded-full transition-all duration-150"
                      style={{ width: `${credScrollProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Credential Security Section */}
              <div className="pt-2 sm:pt-4">
                <h4 className="text-base sm:text-[17px] font-semibold text-slate-800 pb-2">
                  Credential Security
                </h4>
                <div className="w-full h-[1px] bg-[#E2E8F0] mb-3 sm:mb-4" />

                <div className="space-y-3 sm:space-y-4">
                  {/* Encryption */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Encryption
                    </span>
                    <button
                      onClick={() => toggleCredentialSecurity("encryption", "Encryption")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        credentialSecurity.encryption
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {credentialSecurity.encryption ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Secure Vault Storage */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Secure Vault Storage
                    </span>
                    <button
                      onClick={() => toggleCredentialSecurity("secureVault", "Secure Vault Storage")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        credentialSecurity.secureVault
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {credentialSecurity.secureVault ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Access Control */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Access Control
                    </span>
                    <button
                      onClick={() => toggleCredentialSecurity("accessControl", "Access Control")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        credentialSecurity.accessControl
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {credentialSecurity.accessControl ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Credential Rotation */}
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight">
                      Credential Rotation
                    </span>
                    <button
                      onClick={() => toggleCredentialSecurity("credentialRotation", "Credential Rotation")}
                      className={`w-[84px] sm:w-[96px] h-[36px] sm:h-[38px] rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center justify-center ${
                        credentialSecurity.credentialRotation
                          ? "bg-[#3B66F5] text-white hover:bg-blue-600 active:scale-95"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {credentialSecurity.credentialRotation ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Credential */}
                  <div className="pt-2 sm:pt-3">
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800 leading-tight block">
                      Credential
                    </span>
                    <p className="text-black text-[10px] min-[360px]:text-[11px] min-[420px]:text-xs sm:text-sm tracking-tight sm:tracking-[0.05em] font-mono select-none whitespace-nowrap overflow-hidden text-ellipsis mt-3.5 sm:mt-4">
                      ********************************************
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Buttons: Dynamically adjusted per active tab */}
        {activeTab === "oauth2_security" ? (
          <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2 sm:gap-3 mt-6 sm:mt-8 pb-1 w-full">
            <button
              onClick={handleRefreshToken}
              className="bg-[#3B66F5] hover:bg-blue-600 active:scale-98 text-white font-medium text-[11px] min-[360px]:text-xs sm:text-sm md:text-base px-2 min-[360px]:px-3 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              <span>Refresh Token</span>
            </button>
            <button
              onClick={handleRevokeToken}
              className="bg-[#3B66F5] hover:bg-blue-600 active:scale-98 text-white font-medium text-[11px] min-[360px]:text-xs sm:text-sm md:text-base px-2 min-[360px]:px-3 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              <span>Revoke Token</span>
            </button>
          </div>
        ) : activeTab === "credentials" ? (
          <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2 sm:gap-3 mt-6 sm:mt-8 pb-1 w-full">
            <button
              onClick={handleRotateCredential}
              className="bg-[#3B66F5] hover:bg-blue-600 active:scale-98 text-white font-medium text-[11px] min-[360px]:text-xs sm:text-sm md:text-base px-2 min-[360px]:px-3 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              <span>Rotate Credential</span>
            </button>
            <button
              onClick={handleRevokeAccess}
              className="bg-[#3B66F5] hover:bg-blue-600 active:scale-98 text-white font-medium text-[11px] min-[360px]:text-xs sm:text-sm md:text-base px-2 min-[360px]:px-3 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              <span>Revoke Access</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-center sm:justify-end mt-6 sm:mt-8 pb-1">
            <button
              onClick={handleRunValidation}
              className="w-full sm:w-auto bg-[#3B66F5] hover:bg-blue-600 active:scale-98 text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full sm:rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Run Security Validation</span>
            </button>
          </div>
        )}
      </div>

      {/* Validation Simulation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B66F5]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-base">
                    API Security Diagnostic
                  </h3>
                  <p className="text-xs text-[#586D93]">
                    Live endpoint & payload audit
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowValidationModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-medium text-[#586D93] mb-1.5">
                  <span>{isValidating ? "Scanning API Endpoints..." : "Validation Complete"}</span>
                  <span>{validationProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3B66F5] rounded-full transition-all duration-300"
                    style={{ width: `${validationProgress}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-50">
                  <span className="text-[#586D93] font-medium">
                    Rate Limiting & Token Quotas
                  </span>
                  {validationProgress >= 30 ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending...</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-50">
                  <span className="text-[#586D93] font-medium">
                    SQLi & XSS Sanitization Filter
                  </span>
                  {validationProgress >= 60 ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending...</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-50">
                  <span className="text-[#586D93] font-medium">
                    OAuth2 Bearer Token Signing
                  </span>
                  {validationProgress >= 90 ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending...</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-50">
                  <span className="text-[#586D93] font-medium">
                    Auto-Blocking & Payload Rules
                  </span>
                  {validationProgress >= 100 ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending...</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowValidationModal(false)}
                className="w-full bg-[#3B66F5] hover:bg-blue-600 text-white font-medium text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {validationComplete ? "Close Report" : "Dismiss"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
