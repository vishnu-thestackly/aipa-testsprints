import React, { useEffect, useRef, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import exportIcon from "../../../assets/images/export_icon.svg";
import activeUserIcon from "../../../assets/images/active_user.png";
import auditLogsIcon from "../../../assets/images/audit_logs.svg";
import systemNotificationIcon from "../../../assets/images/system_notification.svg";
import frame01 from "../../../assets/images/frame01.png";
import frame03 from "../../../assets/images/frame03.png";

const SUMMARY_CARDS = [
  {
    id: "live",
    value: "1,234",
    label: "Live Events",
    image: frame01,
  },
  {
    id: "users",
    value: "1,125",
    label: "Active User",
    image: activeUserIcon,
    withCircleBg: true,
  },
  {
    id: "alerts",
    value: "5",
    label: "System Alerts",
    image: frame03,
  },
  {
    id: "logs",
    value: "1789",
    label: "Audit Logs Today",
    image: auditLogsIcon,
    withCircleBg: true,
  },
];

const LIVE_ACTIVITY = [
  {
    id: 1,
    time: "10:00 AM",
    module: "Outlook",
    event: "Meeting Created",
    status: "Success",
  },
  {
    id: 2,
    time: "10:01 AM",
    module: "Exchange",
    event: "Email Sent",
    status: "Success",
  },
  {
    id: 3,
    time: "10:02 AM",
    module: "Jira",
    event: "Ticket Updated",
    status: "Success",
  },
  {
    id: 4,
    time: "10:03 AM",
    module: "Trello",
    event: "Card Sync failed",
    status: "Success",
  },
  {
    id: 5,
    time: "10:04 AM",
    module: "Authentication",
    event: "User Login",
    status: "Success",
  },
];

const SYSTEM_NOTIFICATIONS = [
  "Integration Warning",
  "API Failure Alert",
  "High API Usage",
  "Database Sync Complete",
];

const AUDIT_SUMMARY = [
  "Total Logs",
  "Successful Actions",
  "Failed Actions",
  "Security Event",
];

const AUDIT_HISTORY = [
  {
    id: 1,
    time: "10:37 AM",
    user: "User A",
    module: "Task",
    action: "Create Task",
    result: "Success",
    ip: "192.168.1.10",
  },
  {
    id: 2,
    time: "10:38 AM",
    user: "User B",
    module: "Settings",
    action: "Updated Profile",
    result: "Success",
    ip: "192.168.1.11",
  },
  {
    id: 3,
    time: "10:38 AM",
    user: "Admin",
    module: "Integration Settings",
    action: "Updated Jira Settings",
    result: "Success",
    ip: "192.168.1.5",
  },
];

const SuccessBadge = ({ label = "Success" }) => (
  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[12px] font-semibold bg-[#33B46926] text-[#33B469]">
    {label}
  </span>
);

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const liveActivityScrollRef = useRef(null);
  const auditHistoryScrollRef = useRef(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredHistory = AUDIT_HISTORY.filter((row) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      row.user.toLowerCase().includes(q) ||
      row.module.toLowerCase().includes(q) ||
      row.action.toLowerCase().includes(q) ||
      row.ip.toLowerCase().includes(q)
    );
  });

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Header — stacked on mobile, title + actions in one row from tablet (md+) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#CFCFCF]">
          <h1 className="text-[20px] sm:text-[20px] font-medium text-[#1E293B] shrink min-w-0">
            Real-Time Data Updates & Audit logs
          </h1>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto md:shrink-0">
            <button
              type="button"
              onClick={handleRefresh}
              className="w-full md:w-auto h-[40px] px-5 rounded-full bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span>Auto-Refresh</span>
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <button
              type="button"
              className="w-full md:w-auto h-[40px] px-5 rounded-full bg-[#4866F6] hover:bg-[#3855E5] text-white text-[14px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span>Export</span>
              <img src={exportIcon} alt="Export" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mt-6 mb-8">
          {SUMMARY_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-[#E2E2E2] rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-4">
                {card.withCircleBg ? (
                  <div className="w-[54px] h-[54px] rounded-full bg-[#E6EBFF] flex items-center justify-center shrink-0">
                    <img
                      src={card.image}
                      alt={card.label}
                      className="w-[25px] h-[25px] object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={card.image}
                    alt={card.label}
                    className="w-[54px] h-[54px] object-contain shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[20px] sm:text-[22px] font-bold text-[#1E293B] leading-tight truncate">
                    {card.value}
                  </div>
                  <div className="text-[15px] text-[#586D93] mt-0.5">
                    {card.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live System Activity Feed */}
        <div className="mb-8">
          <div className="mb-3 border-b border-[#CFCFCF]" />
          <h2 className="text-[18px] font-medium text-[#3D3D3D] mb-4">
            Live System Activity Feed
          </h2>
          <div className="mb-4 border-b border-[#CFCFCF]" />

          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#E9EDF5]">
            <div
              ref={liveActivityScrollRef}
              className="min-h-0 min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-lg:touch-auto min-[1441px]:overflow-x-visible"
            >
              <table className="w-full text-left border-collapse max-[1440px]:min-w-[640px] min-[1441px]:min-w-0">
                <thead>
                  <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                    <th className="py-4 px-6 font-medium">SL No</th>
                    <th className="py-4 px-6 font-medium">Time</th>
                    <th className="py-4 px-6 font-medium">Module</th>
                    <th className="py-4 px-6 font-medium">Event</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                  {LIVE_ACTIVITY.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="py-4 px-6 text-[#586D93]">{row.id}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.time}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.module}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.event}</td>
                      <td className="py-4 px-6">
                        <SuccessBadge label={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 px-2 py-2 min-[1441px]:hidden">
              <div className="min-h-1">
                <HorizontalScrollIndicator
                  scrollRef={liveActivityScrollRef}
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 border-b border-[#CFCFCF]" />

        {/* System Notifications + Audit Log Summary — side by side from tablet (md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="min-w-0">
            <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-3">
              System Notifications
            </h3>
            <div className="rounded-[16px] border border-[#E9EDF5] bg-[#F8FAFC] p-5">
              <div className="flex flex-col gap-4">
                {SYSTEM_NOTIFICATIONS.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E6EBFF] flex items-center justify-center shrink-0">
                      <img
                        src={systemNotificationIcon}
                        alt=""
                        className="w-3.5 h-3.5 object-contain"
                      />
                    </div>
                    <span className="text-[14px] sm:text-[16px] text-[#3D3D3D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-3">
              Audit Log Summary
            </h3>
            <div className="rounded-[16px] border border-[#E9EDF5] bg-[#F8FAFC] p-5">
              <div className="flex flex-col gap-4">
                {AUDIT_SUMMARY.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <img
                      src={frame01}
                      alt=""
                      className="w-9 h-9 object-contain shrink-0"
                    />
                    <span className="text-[14px] sm:text-[16px] text-[#3D3D3D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log History */}
        <div>
          <div className="mb-3 border-b border-[#CFCFCF]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-[18px] font-medium text-[#3D3D3D]">
              Audit Log History
            </h2>

            <div className="relative w-full sm:w-[340px]">
              <Search className="w-4 h-4 text-[#586D93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[40px] pl-10 pr-4 rounded-lg border border-[#D9DCE5] text-[14px] text-[#586D93] focus:outline-none focus:border-[#4866F6]"
              />
            </div>
          </div>
          <div className="mb-4 border-b border-[#CFCFCF]" />

          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#E9EDF5]">
            <div
              ref={auditHistoryScrollRef}
              className="min-h-0 min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-lg:touch-auto min-[1441px]:overflow-x-visible"
            >
              <table className="w-full text-left border-collapse max-[1440px]:min-w-[800px] min-[1441px]:min-w-0">
                <thead>
                  <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                    <th className="py-4 px-6 font-medium">SL No</th>
                    <th className="py-4 px-6 font-medium">Time</th>
                    <th className="py-4 px-6 font-medium">User</th>
                    <th className="py-4 px-6 font-medium">Module</th>
                    <th className="py-4 px-6 font-medium">Action</th>
                    <th className="py-4 px-6 font-medium">Result</th>
                    <th className="py-4 px-6 font-medium">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                  {filteredHistory.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="py-4 px-6 text-[#586D93]">{row.id}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.time}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.user}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.module}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.action}</td>
                      <td className="py-4 px-6">
                        <SuccessBadge label={row.result} />
                      </td>
                      <td className="py-4 px-6 text-[#586D93]">{row.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 px-2 py-2 min-[1441px]:hidden">
              <div className="min-h-1">
                <HorizontalScrollIndicator
                  scrollRef={auditHistoryScrollRef}
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalScrollIndicator({ scrollRef, className = "" }) {
  const [thumb, setThumb] = useState({ width: 75, left: 0 });
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = scrollRef?.current;
    if (!element) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const overflow = scrollWidth > clientWidth + 1;
      setHasOverflow(overflow);

      if (!overflow) {
        setThumb({ width: 100, left: 0 });
        return;
      }

      const widthPercent = (clientWidth / scrollWidth) * 100;
      const maxLeft = 100 - widthPercent;
      const leftPercent =
        maxLeft <= 0 ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxLeft;

      setThumb({ width: widthPercent, left: leftPercent });
    };

    update();
    element.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollRef]);

  if (!hasOverflow) return null;

  return (
    <div
      className={`relative h-1 w-full rounded-full bg-[#E0E0E0] ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4866F6] transition-[left,width] duration-150 ease-out"
        style={{
          width: `${thumb.width}%`,
          left: `${thumb.left}%`,
        }}
      />
    </div>
  );
}
