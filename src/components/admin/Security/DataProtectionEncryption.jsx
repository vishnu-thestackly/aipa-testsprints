import React, { useState } from "react";
import { Check, ShieldCheck, X } from "lucide-react";

export default function DataProtectionEncryption({ onNavigateAudit }) {
  // State for Rest Encryption
  const [restItems, setRestItems] = useState([
    { id: "user_data", name: "User Data", cipher: "AES-256", enabled: true },
    { id: "task_data", name: "Task Data", cipher: "AES-256", enabled: true },
    { id: "conversation", name: "Conversation", cipher: "AES-256", enabled: true },
    { id: "ai_memory", name: "AI Memory", cipher: "AES-256", enabled: true },
    { id: "backups", name: "Backups", cipher: "AES-256", enabled: true },
  ]);

  // State for Transit Encryption
  const [transitItems, setTransitItems] = useState([
    { id: "web_backend", name: "Web -->Backend", protocol: "TLS 1.3", cipherMobile: "AES-256", secure: true },
    { id: "mobile_backend", name: "Mobile -->Backend", protocol: "TLS 1.3", cipherMobile: "AES-256", secure: true },
    { id: "api_connections", name: "API Connections", protocol: "TLS 1.3", cipherMobile: "AES-256", secure: true },
    { id: "integrations", name: "Integrations", protocol: "TLS 1.3", cipherMobile: "AES-256", secure: true },
  ]);

  // State for Vector DB Memory Security
  const [vectorItems, setVectorItems] = useState([
    { id: "memory_encryption", name: "Memory Encryption", cipherMobile: "AES-256", enabled: true },
    { id: "db_connection_tls", name: "DB Connection TLS", cipherMobile: "AES-256", enabled: true },
    { id: "access_control", name: "Access Control", cipherMobile: "AES-256", enabled: true },
    { id: "backup_encryption", name: "Backup Encryption", cipherMobile: "AES-256", enabled: true },
  ]);

  // Validation modal state
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationComplete, setValidationComplete] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleRestItem = (id) => {
    setRestItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled;
          showToast(`${item.name} is now ${nextState ? "Enabled" : "Disabled"}`);
          return { ...item, enabled: nextState };
        }
        return item;
      })
    );
  };

  const toggleVectorItem = (id) => {
    setVectorItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.enabled;
          showToast(`${item.name} is now ${nextState ? "Enabled" : "Disabled"}`);
          return { ...item, enabled: nextState };
        }
        return item;
      })
    );
  };

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
    }, 350);
  };

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
          <h2 className="text-lg font-medium text-slate-800 tracking-tight">
            Data Protection &amp; Encryption
          </h2>
        </div>

        {/* Divider Line below Title */}
        <div className="w-full h-[1px] bg-[#CFCFCF] mb-4 lg:mb-4"></div>

        {/* SECTION 1: Encryption of Rest */}
        <div className="mt-1">
          <div className="pb-3 border-b border-[#CFCFCF] mb-2 lg:mb-2.5">
            <h3 className="text-base sm:text-lg font-medium text-slate-800">
              Encryption of Rest
            </h3>
          </div>

          <div className="divide-y divide-transparent mt-1.5 sm:mt-2.5 lg:mt-1.5">
            {restItems.map((item) => (
              <div
                key={item.id}
                className="py-2.5 sm:py-3 lg:py-2.5 flex md:grid md:grid-cols-3 items-center justify-between transition-colors hover:bg-[#F8FAFC]/70 rounded-lg px-1 sm:px-2"
              >
                {/* Desktop & Tablet: 3 columns. Mobile: 2 columns with subtitle */}
                <div className="flex-1 md:flex-initial min-w-0 pr-3">
                  <p className="text-sm sm:text-base font-medium text-slate-800">
                    {item.name}
                  </p>
                  {/* Mobile-only cipher display in #586D93 */}
                  <p className="md:hidden text-sm text-[#586D93] font-normal mt-0.5">
                    {item.cipher}
                  </p>
                </div>

                {/* Center Column: Exactly Centered Cipher in #586D93 */}
                <div className="hidden md:flex justify-center items-center text-center">
                  <span className="text-sm font-medium text-[#586D93]">
                    {item.cipher}
                  </span>
                </div>

                {/* Right Action Button */}
                <div className="flex-shrink-0 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleRestItem(item.id)}
                    className={`min-w-[84px] sm:min-w-[92px] h-[32px] sm:h-[34px] px-3.5 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      item.enabled
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E0] active:scale-95"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {item.enabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Encryption in Transit with Top & Bottom Border Lines */}
        <div className="mt-4 sm:mt-5 lg:mt-4">
          <div className="border-y border-[#CFCFCF] py-3 lg:py-2.5 mb-2 lg:mb-2.5">
            <h3 className="text-base sm:text-lg font-medium text-slate-800">
              Encryption in Transit
            </h3>
          </div>

          <div className="divide-y divide-transparent mt-1.5 sm:mt-2.5 lg:mt-1.5">
            {transitItems.map((item) => (
              <div
                key={item.id}
                className="py-2.5 sm:py-3 lg:py-2.5 flex md:grid md:grid-cols-3 items-center justify-between transition-colors hover:bg-[#F8FAFC]/70 rounded-lg px-1 sm:px-2"
              >
                {/* Desktop & Tablet: Left column. Mobile: Title + Subtitle */}
                <div className="flex-1 md:flex-initial min-w-0 pr-3">
                  <p
                    className="text-sm sm:text-base font-medium text-slate-800 [font-variant-ligatures:none] [font-feature-settings:'calt'_0,'liga'_0]"
                    style={{ fontVariantLigatures: "none", fontFeatureSettings: '"calt" 0, "liga" 0' }}
                  >
                    {item.name.includes("-->") ? (
                      <>
                        {item.name.split("-->")[0]}{" "}
                        <span
                          style={{
                            fontVariantLigatures: "none",
                            fontFeatureSettings: '"calt" 0, "liga" 0',
                            letterSpacing: "-0.05em",
                          }}
                        >
                          --&gt;
                        </span>
                        {item.name.split("-->")[1]}
                      </>
                    ) : (
                      item.name
                    )}
                  </p>
                  {/* Mobile-only cipher display in #586D93 */}
                  <p className="md:hidden text-sm text-[#586D93] font-normal mt-0.5">
                    {item.cipherMobile}
                  </p>
                </div>

                {/* Center Column: Exactly Centered Protocol (TLS 1.3 in #586D93) */}
                <div className="hidden md:flex justify-center items-center text-center">
                  <span className="text-sm font-medium text-[#586D93]">
                    {item.protocol}
                  </span>
                </div>

                {/* Right Status Badge */}
                <div className="flex-shrink-0 flex justify-end">
                  <span className="min-w-[84px] sm:min-w-[92px] h-[32px] sm:h-[34px] px-3.5 sm:px-4 rounded-lg font-medium text-xs sm:text-sm bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center select-none shadow-sm">
                    Secure
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Vector DB Memory Security with Top & Bottom Border Lines */}
        <div className="mt-4 sm:mt-5 lg:mt-4">
          <div className="border-y border-[#CFCFCF] py-3 lg:py-2.5 mb-2 lg:mb-2.5">
            <h3 className="text-base sm:text-lg font-medium text-slate-800">
              Vector DB Memory Security
            </h3>
          </div>

          <div className="divide-y divide-transparent mt-1.5 sm:mt-2.5 lg:mt-1.5">
            {vectorItems.map((item) => (
              <div
                key={item.id}
                className="py-2.5 sm:py-3 lg:py-2.5 flex md:grid md:grid-cols-3 items-center justify-between transition-colors hover:bg-[#F8FAFC]/70 rounded-lg px-1 sm:px-2"
              >
                {/* Desktop & Tablet: Left column. Mobile: Title + Subtitle */}
                <div className="flex-1 md:flex-initial min-w-0 pr-3">
                  <p className="text-sm sm:text-base font-medium text-slate-800">
                    {item.name}
                  </p>
                  {/* Mobile-only cipher display in #586D93 */}
                  <p className="md:hidden text-sm text-[#586D93] font-normal mt-0.5">
                    {item.cipherMobile}
                  </p>
                </div>

                {/* Desktop & Tablet Center Space */}
                <div className="hidden md:flex justify-center items-center text-center">
                  <span className="text-sm font-medium text-[#586D93]">
                  </span>
                </div>

                {/* Right Action Button */}
                <div className="flex-shrink-0 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleVectorItem(item.id)}
                    className={`min-w-[84px] sm:min-w-[92px] h-[32px] sm:h-[34px] px-3.5 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                      item.enabled
                        ? "bg-[#4866F6] text-white hover:bg-[#3855E0] active:scale-95"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {item.enabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        {/* Mobile View: Stacked Full-Width Buttons */}
        <div className="md:hidden mt-7 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRunValidation}
            className="w-full h-[44px] rounded-full bg-[#4866F6] hover:bg-[#3855E0] active:scale-[0.98] text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
          >
            Run Security Validation
          </button>
          <button
            type="button"
            onClick={() => onNavigateAudit?.()}
            className="w-full h-[44px] rounded-full bg-[#4866F6] hover:bg-[#3855E0] active:scale-[0.98] text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
          >
            View Audit Log
          </button>
        </div>

        {/* Desktop & Tablet View: Aligned to Bottom Right */}
        <div className="hidden md:flex justify-end items-center gap-3.5 mt-8 lg:mt-6 pt-2">
          <button
            type="button"
            onClick={handleRunValidation}
            className="h-[40px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3855E0] active:scale-95 text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
          >
            Run Security Validation
          </button>
          <button
            type="button"
            onClick={() => onNavigateAudit?.()}
            className="h-[40px] px-6 rounded-full bg-[#4866F6] hover:bg-[#3855E0] active:scale-95 text-white font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
          >
            View Audit Log
          </button>
        </div>

      </div>

      {/* Security Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#E9EDF5] relative">
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setShowValidationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#4866F626] text-[#4866F6] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[17px] font-semibold text-[#3D3D3D]">
                  Security System Validation
                </h3>
                <p className="text-xs text-[#586D93]">
                  Validating cryptographic layers and protocols
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="my-5">
              <div className="flex justify-between text-xs font-semibold text-[#3D3D3D] mb-2">
                <span>{isValidating ? "Validating security checksums..." : "Validation Complete"}</span>
                <span className="text-[#4866F6]">{validationProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4866F6] transition-all duration-300 rounded-full"
                  style={{ width: `${validationProgress}%` }}
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E9EDF5] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#3D3D3D]">AES-256 Rest Encryption Key Store</span>
                <span className="text-[#16A34A] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 100% Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3D3D3D]">TLS 1.3 Cipher Suite Handshake</span>
                <span className="text-[#16A34A] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Passed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3D3D3D]">Vector DB Isolation &amp; Bounds</span>
                <span className="text-[#16A34A] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Secure
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#3D3D3D]">Access Control &amp; Zero-Trust</span>
                <span className="text-[#16A34A] font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowValidationModal(false)}
                className="px-6 py-2 rounded-full bg-[#4866F6] text-white font-medium text-xs hover:bg-[#3855E0] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
