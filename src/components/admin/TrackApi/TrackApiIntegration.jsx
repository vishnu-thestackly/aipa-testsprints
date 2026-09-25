import React, { useRef, useState } from "react";
import { RefreshCw } from "lucide-react";

import apiStatus from "../../../assets/images/api_status.svg";
import timeIcon from "../../../assets/images/time.png";
import userStatus from "../../../assets/images/user_status.svg";
import errorStatus from "../../../assets/images/error_status.svg";
import eyeAction from "../../../assets/images/eye_action.svg";
import calendarIcon from "../../../assets/images/calender.svg";
import ApiCallVolumeTrendChart from "../../charts/ApiCallVolumeTrendChart";
import OutlookIntegrationDetails from "./OutlookIntegrationDetails";
import JiraIntegrationDetails from "./JiraIntegrationDetails";
import TrelloIntegrationDetails from "./TrelloIntegrationDetails";

const healthRows = [
  {
    integration: "Outlook",
    latency: "180ms",
    successRate: "99.8%",
    lastSync: "2mins ago",
    status: "Healthy",
  },
  {
    integration: "Exchange",
    latency: "210ms",
    successRate: "99.5%",
    lastSync: "1mins ago",
    status: "Healthy",
  },
  {
    integration: "Jira",
    latency: "600ms",
    successRate: "90%",
    lastSync: "8mins ago",
    status: "Warning",
  },
  {
    integration: "Trello",
    latency: "----",
    successRate: "----",
    lastSync: "35mins ago",
    status: "Offline",
  },
];

const performanceItems = [
  {
    label: "Fastest API",
    name: "Outlook",
    badge: "165ms",
    badgeClass: "bg-[#EAF7EF] text-[#34A853]",
  },
  {
    label: "Slowest API",
    name: "Jira",
    badge: "520ms",
    badgeClass: "bg-[#FFE5E5] text-[#F0343D]",
  },
  {
    label: "Highest Traffic",
    name: "Outlook",
    badge: "44,560 Calls",
    badgeClass: "bg-[#E4E8FE] text-[#4866F6]",
  },
  {
    label: "Peak Usage Times",
    name: "10:00 AM to 11:00 AM",
    badge: null,
  },
];

const errorItems = [
  { label: "Authentication Error", value: "125" },
  { label: "Timeout Error", value: "86" },
  { label: "Service Unavailable", value: "18" },
];

const activityRows = [
  {
    integration: "Outlook",
    time: "10:37 AM",
    endpoint: "Create Meeting",
    status: "Success",
    responseTime: "165ms",
    result: "Completed",
  },
  {
    integration: "Exchange",
    time: "10:38 AM",
    endpoint: "Create Task",
    status: "Success",
    responseTime: "250ms",
    result: "Completed",
  },
  {
    integration: "Jira",
    time: "10:40 AM",
    endpoint: "Send Email",
    status: "Success",
    responseTime: "195ms",
    result: "Completed",
  },
  {
    integration: "Trello",
    time: "10:50 AM",
    endpoint: "Update Card",
    status: "Failed",
    responseTime: "Timeout",
    result: "Retry",
  },
];

const statusStyles = {
  Healthy: "bg-[#EAF7EF] text-[#34A853]",
  Warning: "bg-[#FFE5E5] text-[#F0343D]",
  Offline: "bg-[#DAE0FD] text-[#4866F6]",
  Success: "bg-[#EAF7EF] text-[#34A853]",
  Failed: "bg-[#FFE5E5] text-[#F0343D]",
  Completed: "bg-[#EAF7EF] text-[#34A853]",
  Retry: "bg-[#FFE5E5] text-[#F0343D]",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] sm:text-[13px] font-medium ${
      statusStyles[status] || "bg-[#E8ECF4] text-[#586D93]"
    }`}
  >
    {(status === "Healthy" || status === "Warning" || status === "Offline") && (
      <span
        className={`h-2 w-2 rounded-full ${
          status === "Healthy"
            ? "bg-[#34A853]"
            : status === "Warning"
              ? "bg-[#F0343D]"
              : "bg-[#4866F6]"
        }`}
      />
    )}
    {status}
  </span>
);

const MetricCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-[20px] border border-[#E2E2E2] shadow-[0px_1px_4px_rgba(0,0,0,0.04)]">
    <div className="w-[55px] h-[55px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
      <img
        src={icon}
        alt={label}
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
      />
    </div>
    <div>
      <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#3D3D3D] leading-tight">
        {value}
      </h3>
      <p className="text-[13px] sm:text-[14px] text-[#586D93] mt-1">{label}</p>
    </div>
  </div>
);

export default function TrackApiIntegration() {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const dateRef = useRef(null);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleViewIntegration = (integration) => {
    if (
      integration === "Outlook" ||
      integration === "Jira" ||
      integration === "Trello"
    ) {
      setSelectedIntegration(integration);
    }
  };

  if (selectedIntegration === "Outlook") {
    return (
      <OutlookIntegrationDetails onBack={() => setSelectedIntegration(null)} />
    );
  }

  if (selectedIntegration === "Jira") {
    return (
      <JiraIntegrationDetails onBack={() => setSelectedIntegration(null)} />
    );
  }

  if (selectedIntegration === "Trello") {
    return (
      <TrelloIntegrationDetails onBack={() => setSelectedIntegration(null)} />
    );
  }

  return (
    <div className="h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border border-gray-200 shadow-[0px_1px_4px_0px_#00000040] p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-[#CFCFCF]">
          <h1 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Track API integration
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div
              onClick={() => dateRef.current?.showPicker?.()}
              className="relative w-full sm:w-[180px] lg:w-[215px] h-[44px] border border-[#D9D9D9] rounded-[10px] bg-white cursor-pointer"
            >
              <input
                ref={dateRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full flex items-center px-4 text-[#586D93] text-[14px]">
                {selectedDate || "Select Date"}
              </div>
              <img
                src={calendarIcon}
                alt="Select date"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px] cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="w-full sm:w-[120px] lg:w-[140px] h-[44px] rounded-full bg-[#4866F6] hover:bg-[#3F5DE3] text-white flex items-center justify-center gap-2 text-[14px] font-medium border-none cursor-pointer transition-colors"
            >
              Refresh
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard icon={apiStatus} value="23,456" label="Total API Calls" />
          <MetricCard icon={timeIcon} value="24ms" label="Avg Latency" />
          <MetricCard icon={userStatus} value="99%" label="Success Rate" />
          <MetricCard icon={errorStatus} value="1789" label="Failed Request" />
        </div>

        <div className="border-b border-[#CFCFCF]"></div>

        <ApiCallVolumeTrendChart />

        {/* Integration Health Status */}
        <div className="p-0">
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Integration Health Status
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />

          <div className="mt-4 overflow-x-auto blue-scrollbar rounded-[12px] border border-[#E2E2E2]">
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="h-[52px] bg-[#EEF0FF]">
                  {[
                    "SL No",
                    "Integration",
                    "Average Latency",
                    "Success Rate",
                    "Last Sync",
                    "Status",
                    "Action",
                  ].map((col) => (
                    <th
                      key={col}
                      className="text-center text-[13px] sm:text-[14px] font-medium text-[#3D3D3D] px-3"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {healthRows.map((row, index) => (
                  <tr
                    key={row.integration}
                    className="h-[52px] border-t border-[#E2E2E2]"
                  >
                    <td className="text-center text-[13px] text-[#586D93]">
                      {index + 1}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93] font-medium">
                      {row.integration}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.latency}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.successRate}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.lastSync}
                    </td>
                    <td className="text-center">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => handleViewIntegration(row.integration)}
                        className="w-9 h-9 inline-flex items-center justify-center cursor-pointer border-none bg-transparent"
                      >
                        <img src={eyeAction} alt="View" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-b border-[#CFCFCF]" />

        {/* API Performances + Error Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          <div className="flex flex-col h-full">
            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
              API Performances
            </h2>
            <div className="mt-3 flex-1 rounded-[16px] bg-[#F5F6FA] p-4 sm:p-5 space-y-5 sm:space-y-4">
              {performanceItems.map((item) => (
                <div key={item.label}>
                  {/* Mobile layout */}
                  <div className="sm:hidden flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                      <img
                        src={apiStatus}
                        alt=""
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[14px] font-medium text-[#3D3D3D]">
                          {item.label}
                        </p>
                        <p className="text-[13px] font-medium text-[#586D93] text-right max-w-[45%]">
                          {item.name}
                        </p>
                      </div>
                      {item.badge ? (
                        <span
                          className={`mt-2 inline-flex rounded-full px-4 py-1 text-[12px] font-medium ${item.badgeClass}`}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Desktop / tablet layout */}
                  <div className="hidden sm:flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                      <img
                        src={apiStatus}
                        alt=""
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <p className="w-[120px] sm:w-[140px] shrink-0 text-[13px] sm:text-[14px] font-medium text-[#3D3D3D]">
                      {item.label}
                    </p>
                    <p className="flex-1 min-w-0 text-[13px] sm:text-[14px] font-medium text-[#586D93] truncate">
                      {item.name}
                    </p>
                    {item.badge ? (
                      <span
                        className={`shrink-0 rounded-full px-4 py-1 text-[12px] font-medium ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
              Error Summary
            </h2>
            <div className="mt-3 flex-1 rounded-[16px] bg-[#F5F6FA] p-4 sm:p-5 space-y-5 sm:space-y-4">
              {errorItems.map((item) => (
                <div key={item.label}>
                  {/* Mobile layout */}
                  <div className="sm:hidden flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                      <img
                        src={apiStatus}
                        alt=""
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#3D3D3D]">
                        {item.label}
                      </p>
                      <span className="mt-2 inline-flex rounded-full px-4 py-1 text-[12px] font-medium bg-[#FFE5E5] text-[#F0343D]">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  {/* Desktop / tablet layout */}
                  <div className="hidden sm:flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E8FE] flex items-center justify-center shrink-0">
                        <img
                          src={apiStatus}
                          alt=""
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                      <p className="text-[13px] sm:text-[14px] font-medium text-[#3D3D3D]">
                        {item.label}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full px-4 py-1 text-[12px] font-medium bg-[#FFE5E5] text-[#F0343D]">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent API Activity */}
        <div className="mb-5">
          <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
            Recent API Activity
          </h2>
          <div className="mt-3 border-b border-[#CFCFCF]" />

          <div className="mt-4 overflow-x-auto blue-scrollbar rounded-[12px] border border-[#E2E2E2]">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="h-[52px] bg-[#EEF0FF]">
                  {[
                    "SL No",
                    "Integration",
                    "Time",
                    "End Point",
                    "Status",
                    "Response Time",
                    "Status",
                  ].map((col, i) => (
                    <th
                      key={`${col}-${i}`}
                      className="text-center text-[13px] sm:text-[14px] font-medium text-[#3D3D3D] px-3"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activityRows.map((row, index) => (
                  <tr
                    key={`${row.integration}-${row.time}`}
                    className="h-[52px] border-t border-[#E2E2E2]"
                  >
                    <td className="text-center text-[13px] text-[#586D93]">
                      {index + 1}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93] font-medium">
                      {row.integration}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.time}
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.endpoint}
                    </td>
                    <td className="text-center">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="text-center text-[13px] text-[#586D93]">
                      {row.responseTime}
                    </td>
                    <td className="text-center">
                      <StatusBadge status={row.result} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
