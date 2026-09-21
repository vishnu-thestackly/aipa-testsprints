import React, { useEffect, useState } from "react";
import { getNotifications } from "../../../api/authApi";
import notificationTask from "../../../assets/images/notification-task.png";

const TasksIcon = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14h6" /><path d="M9 18h6" /><path d="M9 10h6" /></svg>;
const RemindersIcon = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const MeetingsIcon = ({ className }) => <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>;
const SecurityIcon = ({ className }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabs = ["All", "Tasks", "Reminders", "Meetings", "Security"];

  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, []);

  const getNotificationCategory = (notification) => {
  const type = notification.type?.toUpperCase();
  const message = notification.message?.toLowerCase() || "";

  if (type === "TASK_REMINDER") {
    return "Reminders";
  }

  if (
    message.includes("marked completed") ||
    type === "TASK" ||
    type === "TASK_COMPLETED"
  ) {
    return "Tasks";
  }

  if (
    type === "MEETING" ||
    type === "MEETING_REMINDER"
  ) {
    return "Meetings";
  }

  if (
    type === "SECURITY" ||
    type === "SECURITY_ALERT"
  ) {
    return "Security";
  }

  // Default backend notifications to Tasks
  return "Tasks";
};

const filteredNotifications = notifications.filter(
  (notification) =>
    activeTab === "All" ||
    getNotificationCategory(notification) === activeTab
);

  const formatNotificationDate = (scheduledTime) => {
  if (!scheduledTime) return "Older";

  const date = new Date(scheduledTime);

  if (isNaN(date.getTime())) return "Older";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatNotificationTime = (scheduledTime) => {
  if (!scheduledTime) return "";

  const date = new Date(scheduledTime);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const groupedNotifications = filteredNotifications.reduce(
  (groups, item) => {
    const groupName = formatNotificationDate(item.scheduled_time);

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(item);

    return groups;
  },
  {}
);

  const getIcon = (notification) => {
  const category = getNotificationCategory(notification);

  switch (category) {
    case "Tasks":
      return (
        <img
          src={notificationTask}
          alt="Task"
          className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] object-contain"
        />
      );

    case "Reminders":
      return (
        <RemindersIcon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
      );

    case "Meetings":
      return (
        <MeetingsIcon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
      );

    case "Security":
      return (
        <SecurityIcon className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
      );

    default:
      return (
        <img
          src={notificationTask}
          alt="Task"
          className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] object-contain"
        />
      );
  }
};

  return (
    <div className="min-h-[calc(100vh-100px)] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide flex flex-col">
      <div className="w-full flex-1 flex flex-col gap-5">
        <div className="w-full flex-1 rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
          <h2 className="w-[220px] h-[21px] leading-[100%] tracking-[0%] font-[510] text-[18px] text-[#3D3D3D] whitespace-nowrap">Notifications</h2>
          <div className="border-b border-[#CFCFCF] mt-4 mb-6"></div>

          <div className="w-full border border-[#DADADA] rounded-full p-[4px] bg-[#FFFFFF] flex items-center justify-between mb-8 shadow-sm overflow-x-auto md:overflow-visible scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-none w-[33.333%] md:flex-1 md:w-auto py-2 px-2 md:px-6 rounded-full text-[13px] md:text-[14px] font-medium text-center transition-all duration-300 cursor-pointer ${activeTab === tab ? "bg-[#4866F6] text-white" : "text-[#586D93] hover:text-[#4866F6]"}`}>{tab}</button>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {Object.keys(groupedNotifications).length > 0 ? (
              Object.entries(groupedNotifications).map(([dateGroup, items]) => (
                <div key={dateGroup} className="flex flex-col gap-3">
                  <h4 className="text-[14px] font-semibold text-[#586D93] tracking-wide ml-1">{dateGroup}</h4>
                  {items.map((item) => (
                    <div key={item.notification_id} className="relative w-full bg-white border border-[#E5E5E5] p-4 flex flex-col md:flex-row md:items-center gap-4 shadow-[0px_0px_4px_rgba(61,61,61,0.08)] border-l-[4px] border-l-[#4866F6] transition-all hover:shadow-[0px_2px_8px_rgba(61,61,61,0.12)] rounded-[16px] overflow-hidden">
                      <div className="flex items-center justify-between w-full md:w-auto md:block">
                        <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] rounded-[10px] md:rounded-[12px] bg-[#4866F626] text-[#4866F6] flex items-center justify-center flex-shrink-0">{getIcon(item)}</div>
                        <span className="text-[13px] text-[#8898AA] md:hidden">{formatNotificationTime(item.scheduled_time)}</span>
                      </div>
                      <div className="flex-1 flex flex-col pr-12 md:pr-16">
                        <h3 className="text-[15px] font-bold text-[#3D3D3D] mb-1 leading-tight">{getNotificationCategory(item)}</h3>
                        <p className="text-[13px] text-[#586D93] leading-relaxed">{item.message}</p>
                      </div>
                      <span className="text-[13px] text-[#8898AA] flex-shrink-0 absolute top-4 right-4 hidden md:block">{item.time}</span>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="w-full flex-1 py-16 flex flex-col items-center justify-center text-center">
                <img src={notificationTask} alt="No notifications" className="w-16 h-16 object-contain mb-3" />
                <p className="text-[15px] text-[#8898AA] font-medium">No notifications in {activeTab}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
