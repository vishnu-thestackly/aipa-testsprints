import React, { useState, useRef, useEffect } from "react";
import { Check, X, RotateCw, ShieldAlert, ShieldCheck, XCircle, Trash2, AlertTriangle } from "lucide-react";
import request1 from "../../../assets/images/request1.png";
import request2 from "../../../assets/images/request2.png";
import request3 from "../../../assets/images/request3.png";
import eyesIcon from "../../../assets/images/eyes.svg";

export default function DataDeletionRequest() {
  const [tableScrollProgress, setTableScrollProgress] = useState(35);
  const tableContainerRef = useRef(null);

  // Review / Selection Modal State
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Selection Scopes State
  const [selectedScopes, setSelectedScopes] = useState({
    profileData: true,
    conversations: true,
    tasks: true,
    aiMemories: true,
    integrationData: true,
  });

  const toggleScope = (scopeKey) => {
    setSelectedScopes((prev) => ({
      ...prev,
      [scopeKey]: !prev[scopeKey],
    }));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Mock Request Data matching screenshots
  const [requests, setRequests] = useState([
    {
      id: 1,
      slNo: 1,
      requestId: "Request001",
      requestType: "Full",
      date: "20 Sept 2026",
      status: "Pending",
      user: "User001",
      details: "Full account, chat history, memory graph, and stored user preferences deletion.",
    },
    {
      id: 2,
      slNo: 2,
      requestId: "Request002",
      requestType: "Full",
      date: "20 Sept 2026",
      status: "Pending",
      user: "User002",
      details: "Full account and all associated vector embeddings deletion.",
    },
    {
      id: 3,
      slNo: 3,
      requestId: "Request003",
      requestType: "Memory",
      date: "20 Sept 2026",
      status: "Completed",
      user: "User003",
      details: "Selective AI memory and behavioral learning store purge.",
    },
    {
      id: 4,
      slNo: 4,
      requestId: "Request004",
      requestType: "Memory",
      date: "20 Aug 2026",
      status: "Completed",
      user: "User004",
      details: "Selective AI memory and interaction context purge.",
    },
  ]);

  // Handle table horizontal scroll for dynamic progress bar
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

  const handleApproveDeletion = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Completed" } : r))
    );
    showToast(`Request ${selectedRequest?.requestId} approved and executed successfully.`);
    setSelectedRequest(null);
  };

  const handleReRun = (req) => {
    showToast(`Re-verifying deletion logs for ${req.requestId}...`);
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

      {/* Main Card Container with standard Dashboard outer alignment & full height */}
      <div className="w-full min-h-full bg-white rounded-[20px] md:rounded-[25px] border border-[#E2E8F0] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* Main Title Header */}
        <div className="pb-3 lg:pb-3.5">
          <h2 className="shrink-0 text-lg font-medium text-slate-800 tracking-tight">
            Data Deletion Requests
          </h2>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#CFCFCF] mb-4 lg:mb-4"></div>

        {/* 3 Metric Cards Grid - 3 columns on Laptop/Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-3 xl:gap-4 mb-5 sm:mb-6 lg:mb-5">
          {/* Card 1: Pending (12) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-3 xl:p-4 2xl:p-5 flex items-center gap-3 sm:gap-4 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
            <img
              src={request1}
              alt="Pending Requests"
              className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                12
              </span>
              <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                Pending
              </span>
            </div>
          </div>

          {/* Card 2: In Progress (4) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-3 xl:p-4 2xl:p-5 flex items-center gap-3 sm:gap-4 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
            <img
              src={request2}
              alt="In Progress Requests"
              className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                4
              </span>
              <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                In Progress
              </span>
            </div>
          </div>

          {/* Card 3: Completed (156) */}
          <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-3.5 sm:p-4 lg:p-3 xl:p-4 2xl:p-5 flex items-center gap-3 sm:gap-4 lg:gap-2.5 xl:gap-3.5 2xl:gap-4 hover:border-[#CBD5E1] transition-all shadow-xs min-w-0">
            <img
              src={request3}
              alt="Completed Requests"
              className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px] 2xl:w-[52px] 2xl:h-[52px] shrink-0 object-contain"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-xl font-bold text-slate-800 leading-none truncate">
                156
              </span>
              <span className="text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-normal text-slate-500 mt-1 truncate">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Data Deletion Requests Table Container */}
        <div className="w-full border border-[#E2E8F0] rounded-[16px] overflow-hidden bg-white shadow-xs">
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
                  <th className="py-3.5 pl-3 sm:pl-4 text-sm font-medium text-slate-700 whitespace-nowrap w-[130px] sm:w-[22%]">
                    Request ID
                  </th>
                  <th className="py-3.5 text-sm font-medium text-slate-700 whitespace-nowrap w-[100px] sm:w-[18%]">
                    Request
                  </th>
                  <th className="py-3.5 text-sm font-medium text-slate-700 whitespace-nowrap w-[120px] sm:w-[20%]">
                    Date
                  </th>
                  <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[110px] sm:w-[14%]">
                    Status
                  </th>
                  <th className="py-3.5 text-sm font-medium text-slate-700 text-center whitespace-nowrap w-[100px] sm:w-[14%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {requests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* SL No */}
                    <td className="py-3 pl-4 sm:pl-6 text-sm text-[#586D93] font-normal whitespace-nowrap">
                      {row.slNo}
                    </td>

                    {/* Request ID */}
                    <td className="py-3 pl-3 sm:pl-4 text-sm text-[#586D93] font-normal whitespace-nowrap">
                      {row.requestId}
                    </td>

                    {/* Request Type */}
                    <td className="py-3 text-sm text-[#586D93] font-normal whitespace-nowrap">
                      {row.requestType}
                    </td>

                    {/* Date */}
                    <td className="py-3 text-sm text-[#586D93] font-normal whitespace-nowrap">
                      {row.date}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 text-center whitespace-nowrap">
                      {row.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#F59E0B] text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#10B981] text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                          Completed
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-3 text-center whitespace-nowrap">
                      {row.status === "Pending" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(row)}
                          className="px-4 py-1.5 bg-[#4866F6] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#3855E5] transition-all cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
                        >
                          Review
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(row)}
                          className="inline-flex items-center justify-center p-1.5 hover:opacity-80 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded-full"
                          title="View Details"
                          aria-label={`View details for ${row.requestId}`}
                        >
                          <img
                            src={eyesIcon}
                            alt="View Details"
                            className="w-[19px] h-[16px] object-contain"
                          />
                        </button>
                      )}
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

      {/* Selection Request Modal matching screenshots for Laptop, Tablet, and Mobile */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] sm:rounded-[28px] max-w-[340px] sm:max-w-[500px] md:max-w-[540px] w-full p-5 sm:p-7 md:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Top-Right Red Circular Close Button with White X */}
            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#EF4444] text-white flex items-center justify-center absolute top-4 sm:top-5 right-4 sm:right-5 hover:bg-red-600 transition-all cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444]"
              title="Close"
              aria-label="Close modal"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </button>

            {/* Modal Title */}
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#4866F6] text-center tracking-tight">
              Selection Request
            </h2>

            {/* Modal Subtitle */}
            <p className="text-[13px] sm:text-[14px] text-[#8A9BB3] font-normal text-center mt-1 sm:mt-1.5 mb-4 sm:mb-5">
              The selected request data for {selectedRequest.user || "User Name"}.
            </p>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-[#E2E8F0] mb-5 sm:mb-6"></div>

            {/* Checkbox Options - Mobile Layout (Vertical Column List) */}
            <div className="flex flex-col gap-3.5 sm:hidden pl-2 mb-1">
              {[
                { id: "profileData", label: "Profile Data" },
                { id: "conversations", label: "Conversations" },
                { id: "tasks", label: "Tasks" },
                { id: "aiMemories", label: "AI Memories" },
                { id: "integrationData", label: "Integration Data" },
              ].map((item) => (
                <label
                  key={item.id}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleScope(item.id);
                    }
                  }}
                  onClick={() => toggleScope(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded p-1"
                >
                  <div
                    className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                      selectedScopes[item.id]
                        ? "bg-[#4866F6] text-white"
                        : "border border-[#CBD5E1] bg-white"
                    }`}
                  >
                    {selectedScopes[item.id] && (
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-[#586D93] group-hover:text-[#1E293B]">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Checkbox Options - Laptop & Tablet Layout (2 Rows Grid) */}
            <div className="hidden sm:flex flex-col gap-3.5 items-center">
              {/* Row 1: Profile Data, Conversations, Tasks */}
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                {[
                  { id: "profileData", label: "Profile Data" },
                  { id: "conversations", label: "Conversations" },
                  { id: "tasks", label: "Tasks" },
                ].map((item) => (
                  <label
                    key={item.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggleScope(item.id);
                      }
                    }}
                    onClick={() => toggleScope(item.id)}
                    className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded p-1"
                  >
                    <div
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                        selectedScopes[item.id]
                          ? "bg-[#4866F6] text-white"
                          : "border border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {selectedScopes[item.id] && (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="text-[13px] text-[#586D93] group-hover:text-[#1E293B]">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Row 2: AI Memories, Integration Data */}
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                {[
                  { id: "aiMemories", label: "AI Memories" },
                  { id: "integrationData", label: "Integration Data" },
                ].map((item) => (
                  <label
                    key={item.id}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggleScope(item.id);
                      }
                    }}
                    onClick={() => toggleScope(item.id)}
                    className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded p-1"
                  >
                    <div
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-colors ${
                        selectedScopes[item.id]
                          ? "bg-[#4866F6] text-white"
                          : "border border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {selectedScopes[item.id] && (
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="text-[13px] text-[#586D93] group-hover:text-[#1E293B]">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Warning Banner */}
            <div className="w-full bg-[#FFFBEB] border border-[#FCD34D] rounded-[10px] sm:rounded-[12px] p-3 sm:p-3.5 flex items-center gap-2.5 my-5 sm:my-6">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span className="text-[12px] sm:text-[13px] text-[#8A9BB3] font-normal">
                This action cannot be undone
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="flex-1 max-w-[130px] sm:max-w-[150px] h-[38px] sm:h-[42px] rounded-full border border-[#4866F6] text-[#4866F6] bg-white hover:bg-blue-50/50 font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer flex items-center justify-center shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleApproveDeletion(selectedRequest.id)}
                className="flex-1 max-w-[130px] sm:max-w-[150px] h-[38px] sm:h-[42px] rounded-full bg-[#4866F6] hover:bg-[#3855E0] active:scale-[0.98] text-white font-medium text-[13px] sm:text-[14px] transition-all cursor-pointer flex items-center justify-center shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
