import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const NotificationSettings = ({ onCancel, onSave }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme?.() || { isDark: false };

  const [notifications, setNotifications] = useState({
    inApp: true,
    push: false,
    email: false,
    outlook: false,
    exchange: false,
  });

  const [meetingTiming, setMeetingTiming] = useState("");

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ notifications, meetingTiming });
    } else {
      alert("Notification settings saved successfully!");
      navigate(-1);
    }
  };

  return (
    <div
      className={`min-h-screen p-1 sm:p-2 transition-colors duration-300 ${
        isDark ? "bg-[#010718]" : "bg-[#f5f6f8]"
      }`}
    >
      {/* Main Outer Card */}
      <div
        className={`min-h-[calc(100vh-8px)] rounded-[18px] sm:rounded-[22px] border px-4 py-4 sm:px-6 shadow-sm transition-colors duration-300 ${
          isDark
            ? "border-[#1E293B] bg-[#060D1B]"
            : "border-[#e1e3e8] bg-[#FFFFFF]"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-2 border-b pb-3 ${
            isDark ? "border-[#1E293B]" : "border-[#dedfe3]"
          }`}
        >
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center cursor-pointer rounded-full bg-[#4866F6] text-white transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </button>

          <h1
            className={`text-[17px] sm:text-[18px] font-medium ${
              isDark ? "text-white" : "text-[#3D3D3D]"
            }`}
          >
            Notification Settings
          </h1>
        </div>

        {/* Inner Card */}
        <div
          className={`mt-3 min-h-[360px] rounded-[14px] border px-4 py-5 sm:px-5 sm:py-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-colors duration-300 ${
            isDark
              ? "border-[#1E293B] bg-[#0B1528]"
              : "border-[#e8e9ed] bg-[#FFFFFF]"
          }`}
        >
          {/* Notification Type */}
          <div>
            <h2
              className={`mb-5 text-[16px] sm:text-[18px] font-medium ${
                isDark ? "text-white" : "text-[#3D3D3D]"
              }`}
            >
              Notification Type
            </h2>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {/* In App */}
              <CheckboxItem
                checked={notifications.inApp}
                onChange={() => handleNotificationChange("inApp")}
                label="In App"
                isDark={isDark}
              />

              {/* Push Notifications */}
              <CheckboxItem
                checked={notifications.push}
                onChange={() => handleNotificationChange("push")}
                label="Push Notifications"
                isDark={isDark}
              />

              {/* Email Notifications */}
              <CheckboxItem
                checked={notifications.email}
                onChange={() => handleNotificationChange("email")}
                label="Email Notifications"
                isDark={isDark}
              />

              {/* Outlook Calendar */}
              <CheckboxItem
                checked={notifications.outlook}
                onChange={() => handleNotificationChange("outlook")}
                label="Outlook Calendar"
                isDark={isDark}
              />

              {/* Exchange Confirmations */}
              <CheckboxItem
                checked={notifications.exchange}
                onChange={() => handleNotificationChange("exchange")}
                label="Exchange Confirmations"
                isDark={isDark}
              />
            </div>
          </div>

          {/* Divider */}
          <div
            className={`mt-6 border-t ${
              isDark ? "border-[#1E293B]" : "border-[#dedfe3]"
            }`}
          />

          {/* Meeting Reminder */}
          <div className="mt-6">
            <h2
              className={`text-[16px] sm:text-[18px] font-medium ${
                isDark ? "text-white" : "text-[#3D3D3D]"
              }`}
            >
              Meeting Reminder
            </h2>

            <div className="mt-4">
              <label
                className={`mb-2 block text-[15px] sm:text-[16px] font-medium ${
                  isDark ? "text-[#A8B3C7]" : "text-[#3D3D3D]"
                }`}
              >
                Meeting Timings
              </label>

              {/* Custom Select Time */}
              <CustomDropdown
                value={meetingTiming}
                placeholder="Select Time"
                options={[
                  "5 minutes before",
                  "10 minutes before",
                  "15 minutes before",
                  "30 minutes before",
                  "1 hour before",
                ]}
                onChange={(value) => setMeetingTiming(value)}
                isDark={isDark}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className={`h-[39px] w-[89px] rounded-full cursor-pointer border border-[#4866F6] text-[15px] sm:text-[16px] font-medium text-[#4866F6] transition hover:bg-[#f5f7ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 ${
                isDark ? "bg-transparent hover:bg-[#4866F61A]" : "bg-[#FFFFFF]"
              }`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="h-[39px] w-[89px] rounded-full bg-[#4866F6] cursor-pointer text-[15px] sm:text-[16px] font-medium text-[#FFFFFF] shadow-sm transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   CHECKBOX COMPONENT
   ========================================================= */

const CheckboxItem = ({ checked, onChange, label, isDark = false }) => {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 group select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onChange();
          }
        }}
        className="sr-only"
      />

      <span
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange();
          }
        }}
        className={`flex h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] shrink-0 items-center justify-center rounded-[7px] sm:rounded-[8px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
          checked
            ? "border-2 border-[#4866F6] bg-[#4866F6] text-white"
            : isDark
            ? "border-2 border-[#4866F6] bg-[#060D1B]"
            : "border-2 border-[#4866F6] bg-white"
        }`}
      >
        {checked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>

      <span
        className={`text-[13.5px] sm:text-[14px] font-medium ${
          isDark ? "text-[#A8B3C7]" : "text-[#586D93]"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

/* =========================================================
   CUSTOM DROPDOWN
   ========================================================= */

const CustomDropdown = ({
  value,
  placeholder,
  options,
  onChange,
  isDark = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[390px]">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-[42px] w-full items-center justify-between rounded-[7px] border px-3 text-left text-[14px] sm:text-[16px] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6] ${
          isDark
            ? "border-[#293548] bg-[#060D1B] text-[#A8B3C7]"
            : "border-[#d8d9dd] bg-white text-[#8D97A9]"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>

        <ChevronDown
          size={17}
          className={`ml-2 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${isDark ? "text-[#A8B3C7]" : "text-[#8d99ad]"}`}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div
          className={`absolute left-0 top-[46px] z-[100] w-full overflow-hidden rounded-[7px] border shadow-[0_4px_12px_rgba(0,0,0,0.12)] ${
            isDark
              ? "border-[#293548] bg-[#0B1528]"
              : "border-[#d8d9dd] bg-white"
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex min-h-[40px] w-full items-center px-3 text-left text-[14px] sm:text-[16px] transition focus:outline-none focus-visible:bg-[#4866F6] focus-visible:text-white ${
                value === option
                  ? "bg-[#4866F6] text-white font-medium"
                  : isDark
                  ? "bg-[#0B1528] text-[#A8B3C7] hover:bg-[#1E293B]"
                  : "bg-white text-[#586D93] hover:bg-[#f5f7ff]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;
