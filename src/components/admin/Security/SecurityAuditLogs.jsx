import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import calendarIcon from "../../../assets/images/calender.svg";
import filterIcon from "../../../assets/images/filter.svg";

export default function SecurityAuditLogs() {
  // Filter states
  const [dateRange, setDateRange] = useState("");
  const [selectedModule, setSelectedModule] = useState("Module");
  const [selectedEvent, setSelectedEvent] = useState("Event");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedUser, setSelectedUser] = useState("User");

  const [toastMessage, setToastMessage] = useState(null);
  const [tableScrollProgress, setTableScrollProgress] = useState(35);
  const tableContainerRef = useRef(null);
  const dateInputRef = useRef(null);

  // All initial audit logs data
  const initialLogs = [
    {
      id: 1,
      slNo: 1,
      time: "10:30 AM",
      event: "Failed Login",
      user: "Mahizhan N R",
      module: "Authentication",
      status: "Failed",
    },
    {
      id: 2,
      slNo: 2,
      time: "10:45 AM",
      event: "Token Refreshed",
      user: "Bharani Dharan K D",
      module: "API Security",
      status: "Success",
    },
    {
      id: 3,
      slNo: 3,
      time: "11:00 AM",
      event: "Crendential Rotated",
      user: "Amuthan S",
      module: "Security",
      status: "Success",
    },
    {
      id: 4,
      slNo: 4,
      time: "11:03 AM",
      event: "Data Deleted",
      user: "Akilan s",
      module: "Data Protection",
      status: "Success",
    },
  ];

  const [logsList, setLogsList] = useState(initialLogs);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Handle table horizontal scroll for dynamic progress bar on mobile & tablet
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

  const handleApplyFilters = () => {
    let filtered = [...initialLogs];

    if (selectedModule !== "Module") {
      filtered = filtered.filter(
        (log) => log.module.toLowerCase() === selectedModule.toLowerCase()
      );
    }
    if (selectedEvent !== "Event") {
      filtered = filtered.filter(
        (log) => log.event.toLowerCase() === selectedEvent.toLowerCase()
      );
    }
    if (selectedStatus !== "Status") {
      filtered = filtered.filter(
        (log) => log.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
    if (selectedUser !== "User") {
      filtered = filtered.filter(
        (log) => log.user.toLowerCase() === selectedUser.toLowerCase()
      );
    }

    setLogsList(filtered);
    showToast("Audit log filters applied successfully.");
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-6 pb-6 scrollbar-hide font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-3 duration-200">
          <ShieldCheck className="w-5 h-5 text-[#4866F6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card Container */}
      <div className="w-full min-h-full bg-white rounded-[20px] md:rounded-[25px] border border-[#E2E8F0] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] p-4 sm:p-6 lg:p-8 flex flex-col">
        
        {/* Main Title Header */}
        <div className="pb-3 lg:pb-3.5">
          <h2 className="text-lg font-medium text-slate-800 tracking-tight">
            Security Audit logs
          </h2>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#CFCFCF] mb-4 sm:mb-5 lg:mb-6"></div>

        {/* FILTERS SECTION */}
        {/* Responsive Grid: 
            - Desktop (lg:): 3 columns (Row 1: Date Range, Module, Event; Row 2: Status, User, Apply)
            - Tablet (sm:): 2 columns (Row 1: Date Range, Module; Row 2: Event, Status; Row 3: User, Apply)
            - Mobile: 1 column stacked (Date Range, Module, Event, Status, User, Apply)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 mb-6 sm:mb-7">
          
          {/* 1. Date Range */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-medium text-slate-800 mb-1.5">
              Date Range
            </label>
            <div
              onClick={() => {
                if (dateInputRef.current) {
                  if (dateInputRef.current.showPicker) {
                    dateInputRef.current.showPicker();
                  } else {
                    dateInputRef.current.focus();
                  }
                }
              }}
              className="relative h-[42px] sm:h-[44px] px-3.5 rounded-[12px] border border-[#D9DCE5] bg-white flex items-center justify-between cursor-pointer hover:border-[#4866F6] transition-colors w-full"
            >
              <span
                className={`text-[13px] sm:text-[14px] ${
                  dateRange ? "text-slate-800 font-medium" : "text-[#586D93]"
                }`}
              >
                {dateRange ? dateRange : "Select Date"}
              </span>
              <input
                ref={dateInputRef}
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <img
                src={calendarIcon}
                alt="Calendar"
                className="w-4 h-4 shrink-0 pointer-events-none"
              />
            </div>
          </div>

          {/* 2. Module */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-medium text-slate-800 mb-1.5">
              Module
            </label>
            <div className="relative w-full">
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full h-[42px] sm:h-[44px] px-3.5 pr-9 rounded-[12px] border border-[#D9DCE5] bg-white text-[13px] sm:text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="Module">Module</option>
                <option value="Authentication">Authentication</option>
                <option value="API Security">API Security</option>
                <option value="Security">Security</option>
                <option value="Data Protection">Data Protection</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8D97A9] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Event */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-medium text-slate-800 mb-1.5">
              Event
            </label>
            <div className="relative w-full">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full h-[42px] sm:h-[44px] px-3.5 pr-9 rounded-[12px] border border-[#D9DCE5] bg-white text-[13px] sm:text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="Event">Event</option>
                <option value="Failed Login">Failed Login</option>
                <option value="Token Refreshed">Token Refreshed</option>
                <option value="Crendential Rotated">Crendential Rotated</option>
                <option value="Data Deleted">Data Deleted</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8D97A9] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Status */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-medium text-slate-800 mb-1.5">
              Status
            </label>
            <div className="relative w-full">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full h-[42px] sm:h-[44px] px-3.5 pr-9 rounded-[12px] border border-[#D9DCE5] bg-white text-[13px] sm:text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="Status">Status</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8D97A9] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 5. User */}
          <div>
            <label className="block text-[13px] sm:text-[14px] font-medium text-slate-800 mb-1.5">
              User
            </label>
            <div className="relative w-full">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full h-[42px] sm:h-[44px] px-3.5 pr-9 rounded-[12px] border border-[#D9DCE5] bg-white text-[13px] sm:text-[14px] text-[#586D93] appearance-none focus:outline-none focus:border-[#4866F6] transition-colors cursor-pointer"
              >
                <option value="User">User</option>
                <option value="Mahizhan N R">Mahizhan N R</option>
                <option value="Bharani Dharan K D">Bharani Dharan K D</option>
                <option value="Amuthan S">Amuthan S</option>
                <option value="Akilan s">Akilan s</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8D97A9] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 6. Apply Button */}
          <div className="flex flex-col justify-end items-stretch sm:items-start">
            <button
              type="button"
              onClick={handleApplyFilters}
              className="w-full sm:w-[120px] h-[42px] sm:h-[44px] bg-[#4866F6] hover:bg-[#3855E0] active:scale-[0.98] text-white font-medium text-[13px] sm:text-[14px] rounded-[6px] flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <img src={filterIcon} alt="Filter" className="w-4 h-4" />
              <span>Apply</span>
            </button>
          </div>

        </div>

        {/* TABLE SECTION */}
        <div className="w-full border border-[#E2E8F0] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-white shadow-xs">
          <div
            ref={tableContainerRef}
            className="w-full overflow-x-auto scrollbar-hide select-none"
          >
            <table className="w-full min-w-[580px] sm:min-w-[640px] lg:min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEF2FF] text-[#586D93] text-xs sm:text-[13px] font-medium border-b border-[#E2E8F0]/60">
                  <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap w-[10%] min-w-[70px]">
                    SL No
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap w-[18%] min-w-[110px]">
                    Time
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap w-[26%] min-w-[160px]">
                    Event
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap w-[26%] min-w-[160px]">
                    User
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap w-[20%] min-w-[120px]">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] text-xs sm:text-[13px]">
                {logsList.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      No audit logs match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  logsList.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* SL No */}
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                        {row.slNo}
                      </td>

                      {/* Time */}
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                        {row.time}
                      </td>

                      {/* Event */}
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                        {row.event}
                      </td>

                      {/* User */}
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-[#586D93] font-normal whitespace-nowrap">
                        {row.user}
                      </td>

                      {/* Result Badge */}
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap">
                        {row.status === "Failed" ? (
                          <span className="w-[88px] sm:w-[92px] h-[28px] sm:h-[30px] rounded-full text-xs font-semibold bg-[#FFEBEB] text-[#EF4444] border border-[#EF4444]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                            Failed
                          </span>
                        ) : (
                          <span className="w-[88px] sm:w-[92px] h-[28px] sm:h-[30px] rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#33B469] border border-[#33B469]/20 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-[#33B469]"></span>
                            Success
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Blue Horizontal Scroll Indicator Track (Visible on Mobile & Tablet) */}
          <div className="px-4 pb-3 pt-2 bg-white lg:hidden">
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4866F6] rounded-full transition-all duration-150"
                style={{ width: `${tableScrollProgress}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
