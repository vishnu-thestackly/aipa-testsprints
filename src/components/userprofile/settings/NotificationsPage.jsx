import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getNotifications } from "../../../api/authApi";
import { mockNotifications } from "../../../utils/mockNotifications";
import notificationTask from "../../../assets/images/notification-task.png";
import { useTheme } from "../../../context/ThemeContext";
import NotificationSettings from "../NotificationSettings";

const TasksIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14h6" />
    <path d="M9 18h6" />
    <path d="M9 10h6" />
  </svg>
);

const RemindersIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MeetingsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
);

const SecurityIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme?.() || { isDark: false };

  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("Reminders");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [loading, setLoading] = useState(false);

  const tabs = ["All", "Tasks", "Reminders", "Meetings", "Security"];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        if (data && Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        } else {
          setNotifications(mockNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications(mockNotifications);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const getNotificationCategory = (item) => {
    if (item.category) return item.category;
    const type = item.type?.toUpperCase();
    const message = item.message?.toLowerCase() || "";

    if (type === "TASK_REMINDER" || message.includes("reminder")) {
      return "Reminders";
    }
    if (
      message.includes("marked completed") ||
      type === "TASK" ||
      type === "TASK_COMPLETED"
    ) {
      return "Tasks";
    }
    if (type === "MEETING" || type === "MEETING_REMINDER") {
      return "Meetings";
    }
    if (type === "SECURITY" || type === "SECURITY_ALERT") {
      return "Security";
    }
    return "Tasks";
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNavigateToSettings = () => {
    setShowSettings(true);
  };

  const filteredNotifications = notifications.filter((item) => {
    const category = getNotificationCategory(item);
    const matchesTab = activeTab === "All" || category === activeTab;
    const title = item.title || item.message || "";
    const description = item.description || item.message || "";
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, item) => {
    const groupName = item.date || "Today";
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(item);
    return groups;
  }, {});

  const getIcon = (item) => {
    const iconType = item.iconType || getNotificationCategory(item).toLowerCase();
    switch (iconType) {
      case "tasks":
        return (
          <img
            src={notificationTask}
            alt="Task"
            className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] object-contain"
          />
        );
      case "reminders":
        return (
          <RemindersIcon className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        );
      case "meetings":
        return (
          <MeetingsIcon className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        );
      case "security":
        return (
          <SecurityIcon className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
        );
      default:
        return (
          <img
            src={notificationTask}
            alt="Task"
            className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] object-contain"
          />
        );
    }
  };

  if (showSettings) {
    return (
      <NotificationSettings
        onCancel={() => setShowSettings(false)}
        onSave={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-100px)] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-6 pb-10 scrollbar-hide flex flex-col transition-colors duration-300 ${
        isDark ? "bg-[#010718]" : "bg-[#f5f6f8]"
      }`}
    >
      <div className="w-full flex-1 flex flex-col gap-5">
        <div
          className={`w-full flex-1 rounded-[18px] md:rounded-[25px] border p-4 sm:p-6 shadow-[0px_0px_4px_0px_#00000014] flex flex-col transition-colors duration-300 ${
            isDark
              ? "border-[#1E293B] bg-[#060D1B]"
              : "border-[#DADADA] bg-white"
          }`}
        >
          {/* =========================================================================
              HEADER SECTION:
              1. Mobile (< md: <768px): Full-width stacked (Title, Search, Clear All, Notification Settings)
              2. Tablet (md: to < lg: 768px-1023px): 2-row (Title + Search & Clear All on row 1, Notification Settings on row 2)
              3. Laptop/Desktop (lg: 1024px+): 1-row (Title on left, Search + Clear All + Notification Settings on right)
             ========================================================================= */}

          {/* --- MOBILE HEADER (< md) --- */}
          <div className="block md:hidden pb-1">
            <h2
              className={`text-[17px] sm:text-[18px] font-semibold leading-tight ${
                isDark ? "text-white" : "text-[#3D3D3D]"
              }`}
            >
              Notifications
            </h2>

            {/* Search Input (Full width) */}
            <div className="relative w-full mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className={`h-[40px] w-full rounded-[8px] border px-3.5 pr-10 text-[14px] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6] ${
                  isDark
                    ? "border-[#293548] bg-[#0B1528] text-white placeholder:text-[#586D93]"
                    : "border-[#DADADA] bg-white text-[#3D3D3D] placeholder:text-[#8D97A9]"
                }`}
              />
              <Search
                size={18}
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? "text-[#586D93]" : "text-[#8D97A9]"
                }`}
              />
            </div>

            {/* Clear All button (Full width) */}
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full h-[40px] rounded-full bg-[#4866F6] text-white text-[14px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 mt-2.5 flex items-center justify-center shadow-sm"
            >
              Clear All
            </button>

            {/* Notification Settings button (Full width) */}
            <button
              type="button"
              onClick={handleNavigateToSettings}
              className="w-full h-[40px] rounded-full bg-[#4866F6] text-white text-[14px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 mt-2.5 flex items-center justify-center shadow-sm"
            >
              Notification Settings
            </button>
          </div>

          {/* --- TABLET HEADER (md: to < lg) --- */}
          <div className="hidden md:flex lg:hidden flex-col gap-3 pb-2">
            {/* Row 1: Notifications on left, Search + Clear All on right */}
            <div className="flex items-center justify-between gap-3 w-full">
              <h2
                className={`text-[18px] font-medium leading-[100%] ${
                  isDark ? "text-white" : "text-[#3D3D3D]"
                }`}
              >
                Notifications
              </h2>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Search input */}
                <div className="relative w-[180px] sm:w-[220px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className={`h-[38px] w-full rounded-[8px] border px-3 pr-8.5 text-[13.5px] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6] ${
                      isDark
                        ? "border-[#293548] bg-[#0B1528] text-white placeholder:text-[#586D93]"
                        : "border-[#DADADA] bg-white text-[#3D3D3D] placeholder:text-[#8D97A9]"
                    }`}
                  />
                  <Search
                    size={16}
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? "text-[#586D93]" : "text-[#8D97A9]"
                    }`}
                  />
                </div>

                {/* Clear all button */}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="h-[38px] px-5 rounded-full bg-[#4866F6] text-white text-[13.5px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 whitespace-nowrap shadow-sm"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Row 2: Notification Settings right-aligned under Clear all */}
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={handleNavigateToSettings}
                className="h-[38px] px-5 rounded-full bg-[#4866F6] text-white text-[13.5px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 whitespace-nowrap shadow-sm"
              >
                Notification Settings
              </button>
            </div>
          </div>

          {/* --- DESKTOP/LAPTOP HEADER (lg: 1024px+) --- */}
          <div className="hidden lg:flex items-center justify-between gap-3 pb-2">
            <h2
              className={`text-[18px] lg:text-[19px] font-medium leading-[100%] ${
                isDark ? "text-white" : "text-[#3D3D3D]"
              }`}
            >
              Notifications
            </h2>

            <div className="flex items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[220px] xl:min-w-[260px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className={`h-[38px] w-full rounded-[8px] border px-3.5 pr-9 text-[14px] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6] ${
                    isDark
                      ? "border-[#293548] bg-[#0B1528] text-white placeholder:text-[#586D93]"
                      : "border-[#DADADA] bg-white text-[#3D3D3D] placeholder:text-[#8D97A9]"
                  }`}
                />
                <Search
                  size={16}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                    isDark ? "text-[#586D93]" : "text-[#8D97A9]"
                  }`}
                />
              </div>

              {/* Clear All button */}
              <button
                type="button"
                onClick={handleClearAll}
                className="h-[38px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 whitespace-nowrap shadow-sm"
              >
                Clear all
              </button>

              {/* Notification Settings button */}
              <button
                type="button"
                onClick={handleNavigateToSettings}
                className="h-[38px] px-5 rounded-full bg-[#4866F6] text-white text-[14px] font-medium cursor-pointer transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2 whitespace-nowrap shadow-sm"
              >
                Notification Settings
              </button>
            </div>
          </div>

          <div
            className={`border-b my-3.5 sm:my-4 md:mb-6 ${
              isDark ? "border-[#1E293B]" : "border-[#E5E5E5]"
            }`}
          />

          {/* Filter Tabs Pill Row */}
          <div
            className={`w-full border rounded-full p-[3px] flex items-center justify-between mb-6 sm:mb-8 shadow-sm overflow-x-auto scrollbar-hide ${
              isDark
                ? "border-[#293548] bg-[#0B1528]"
                : "border-[#DADADA] bg-white"
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-none w-[33.333%] min-w-[110px] md:flex-1 md:w-auto py-2 px-3 md:px-6 rounded-full text-[13.5px] md:text-[14px] font-medium text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#4866F6] text-white shadow-sm"
                    : isDark
                    ? "text-[#8D97A9] hover:text-white"
                    : "text-[#586D93] hover:text-[#4866F6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grouped Notifications List */}
          <div className="flex-1 flex flex-col gap-5 sm:gap-6">
            {Object.keys(groupedNotifications).length > 0 ? (
              Object.entries(groupedNotifications).map(([dateGroup, items]) => (
                <div key={dateGroup} className="flex flex-col gap-3">
                  <h4
                    className={`text-[13.5px] sm:text-[14px] font-medium tracking-wide ml-1 ${
                      isDark ? "text-[#8D97A9]" : "text-[#586D93]"
                    }`}
                  >
                    {dateGroup}
                  </h4>

                  {items.map((item, idx) => (
                    <div
                      key={item.id || item.notification_id || idx}
                      className={`relative w-full border p-3.5 sm:p-4 rounded-[14px] md:rounded-[16px] shadow-sm border-l-[4px] border-l-[#4866F6] transition-all hover:shadow-md ${
                        isDark
                          ? "border-[#1E293B] bg-[#0B1528]"
                          : "border-[#E5E5E5] bg-white"
                      }`}
                    >
                      {/* Mobile Card Layout (< md) */}
                      <div className="flex flex-col md:hidden">
                        {/* Top row with icon & timestamp */}
                        <div className="flex items-center justify-between w-full">
                          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#4866F61A] text-[#4866F6] flex items-center justify-center shrink-0">
                            {getIcon(item)}
                          </div>
                          <span className="text-[12px] text-[#8898AA]">
                            {item.time || "10h ago"}
                          </span>
                        </div>

                        {/* Title & Description below */}
                        <div className="flex flex-col mt-2.5">
                          <h3
                            className={`text-[14.5px] sm:text-[15px] font-bold mb-1 leading-tight ${
                              isDark ? "text-white" : "text-[#3D3D3D]"
                            }`}
                          >
                            {item.title || item.message || "Notification"}
                          </h3>
                          <p
                            className={`text-[12.5px] leading-relaxed ${
                              isDark ? "text-[#A8B3C7]" : "text-[#8898AA]"
                            }`}
                          >
                            {item.description || item.message || ""}
                          </p>
                        </div>
                      </div>

                      {/* Tablet & Desktop Card Layout (md+) */}
                      <div className="hidden md:flex md:items-center gap-4">
                        <div className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] rounded-[12px] bg-[#4866F61A] text-[#4866F6] flex items-center justify-center shrink-0">
                          {getIcon(item)}
                        </div>

                        <div className="flex-1 flex flex-col pr-16">
                          <h3
                            className={`text-[15px] font-bold mb-1 leading-tight ${
                              isDark ? "text-white" : "text-[#3D3D3D]"
                            }`}
                          >
                            {item.title || item.message || "Notification"}
                          </h3>

                          <p
                            className={`text-[13px] leading-relaxed ${
                              isDark ? "text-[#A8B3C7]" : "text-[#586D93]"
                            }`}
                          >
                            {item.description || item.message || ""}
                          </p>
                        </div>

                        <span className="text-[13px] text-[#8898AA] shrink-0 absolute top-4 right-4">
                          {item.time || "10h ago"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="w-full flex-1 py-16 flex flex-col items-center justify-center text-center">
                <img
                  src={notificationTask}
                  alt="No notifications"
                  className="w-16 h-16 object-contain mb-3 opacity-60"
                />
                <p
                  className={`text-[15px] font-medium ${
                    isDark ? "text-[#8D97A9]" : "text-[#8898AA]"
                  }`}
                >
                  No notifications in {activeTab}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

