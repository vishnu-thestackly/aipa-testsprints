import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  Clock,
  Plus,
  RefreshCw,
  X,
  Edit2,
  Trash2,
  ArrowRight,
  Check,
  ChevronLeft,
  Calendar,
  Search,
  Mail,
  CheckCircle2,
} from "lucide-react";

import upcomingIcon from "../../../assets/images/upcoming.png";
import pendingIcon from "../../../assets/images/pending.png";
import completedIcon from "../../../assets/images/completed.png";
import calendarIcon from "../../../assets/images/calendarIcon.svg";
import profileIcon from "../../../assets/images/profile.svg";
import PendingIcon from "../../../assets/images/taskdetails.png";
import EditWhiteIcon from "../../../assets/images/editwhite.png";
import DeleteIcon from "../../../assets/images/delete.png";
import CreateNewTask from "./CreateNewTask";

import {
  getTaskDashboard,
  getTaskDetails,
  updateTask,
} from "../../../api/authApi";

export default function TasksDashboard() {
  // =========================================================
  // MAIN TOP TABS: "tasks" | "reminders"
  // =========================================================
  const [mainTab, setMainTab] = useState("reminders");

  // =========================================================
  // REMINDERS SUB-TAB: "reminders" | "ai-suggested"
  // =========================================================
  const [reminderSubTab, setReminderSubTab] = useState("reminders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReminderId, setSelectedReminderId] = useState(1);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // =========================================================
  // REMINDER DATA (Screen 1 & Screen 2 mockups)
  // =========================================================
  const [remindersList, setRemindersList] = useState([
    {
      id: 1,
      number: "1.",
      title: "Sprint Planning Meeting",
      description: "Sprint planning and backlog grooming",
      status: "Upcoming",
      priority: "High",
      date: "15 - 07 - 2026",
      rawDate: "2026-07-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      number: "2.",
      title: "Sprint Planning Meeting",
      description: "Sprint planning and backlog grooming",
      status: "Upcoming",
      priority: "High",
      date: "15 - 07 - 2026",
      rawDate: "2026-07-15",
      time: "10:30 AM",
    },
    {
      id: 3,
      number: "3.",
      title: "Sprint Planning Meeting",
      description: "Sprint planning and backlog grooming",
      status: "Upcoming",
      priority: "High",
      date: "15 - 07 - 2026",
      rawDate: "2026-07-15",
      time: "10:30 AM",
    },
  ]);

  const [aiSuggestedList, setAiSuggestedList] = useState([
    {
      id: "ai-1",
      number: "1.",
      title: "Submit Sprint Report",
      subtitle: "Deadline is approching",
      description: "Deadline is approching",
      priority: "High",
      status: "Upcoming",
      date: "15 - 07 - 2026",
      rawDate: "2026-07-15",
      time: "10:30 AM",
    },
    {
      id: "ai-2",
      number: "2.",
      title: "Follow up With the client",
      subtitle: "Suggesting after yesterday meeting",
      description: "Suggesting after yesterday meeting",
      date: "-- / -- / ----",
      time: "-- : -- --",
      recipient: "client@example.com",
    },
    {
      id: "ai-3",
      number: "3.",
      title: "Weekly team meeting",
      subtitle: "Meeting with team",
      description: "Meeting with team",
      date: "15 - 07 - 2026",
      rawDate: "2026-07-15",
      time: "-- : -- --",
    },
  ]);

  // =========================================================
  // REMINDER ACTIONS
  // =========================================================
  const handleDeleteReminder = (id) => {
    setRemindersList((prev) => prev.filter((r) => r.id !== id));
    setAiSuggestedList((prev) => prev.filter((r) => r.id !== id));
    showToast("Reminder deleted!");
  };

  const handleMarkReminderCompleted = (id) => {
    setRemindersList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Completed" } : r
      )
    );
    setAiSuggestedList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Completed" } : r
      )
    );
    showToast("Reminder marked as completed! ✓");
  };

  // Filter reminders by search query
  const filteredReminders = remindersList.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAiSuggested = aiSuggestedList.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.subtitle && r.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // =========================================================
  // TASKS SECTION STATE & LOGIC
  // =========================================================
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showCreateNewTask, setShowCreateNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    upcoming_count: 0,
    pending_count: 0,
    completed_count: 0,
  });
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [taskDetailsLoading, setTaskDetailsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const outletContext = useOutletContext();
  const languageOpen = outletContext?.languageOpen ?? false;

  const fetchTasks = async (tab = activeTab) => {
    try {
      setLoading(true);
      setError("");
      const data = await getTaskDashboard(tab);
      setTaskStats(
        data?.stats || {
          upcoming_count: 0,
          pending_count: 0,
          completed_count: 0,
        }
      );
      const formattedTasks = (data?.tasks || []).map((task) => {
        const date = task.due_date ? new Date(task.due_date) : null;
        return {
          id: task.task_id,
          title: task.title,
          description: task.description,
          assigned: task.assigned_to_name || "Self",
          status: task.status?.toLowerCase() || "pending",
          priority: task.priority?.toLowerCase() || "medium",
          dueDate: date
            ? `${String(date.getDate()).padStart(2, "0")} - ${String(
                date.getMonth() + 1
              ).padStart(2, "0")} - ${date.getFullYear()}`
            : "",
          dueTime: date
            ? date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
          buttonText:
            task.status?.toLowerCase() === "pending"
              ? "Not Started"
              : "View Details",
        };
      });
      setTasks(formattedTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError(
        typeof err === "string" ? err : err?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (task) => {
    try {
      setTaskDetailsLoading(true);
      setError("");
      const response = await getTaskDetails(task.id);
      setSelectedTask(task);
      setTaskDetails(response);
      setShowTaskDetails(true);
    } catch (err) {
      console.error("Failed to fetch task details:", err);
    } finally {
      setTaskDetailsLoading(false);
    }
  };

  useEffect(() => {
    if (mainTab === "tasks") {
      fetchTasks(activeTab);
    }
  }, [activeTab, mainTab]);

  const handleTabChange = (tab) => {
    setShowCreateNewTask(false);
    setActiveTab(tab);
  };

  const upcomingCount = taskStats.upcoming_count;
  const pendingCount = taskStats.pending_count;
  const completedCount = taskStats.completed_count;

  const handleRefresh = () => {
    setShowCreateNewTask(false);
    fetchTasks(activeTab);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  const toggleTaskStatus = (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              status: nextStatus,
              buttonText:
                nextStatus === "completed" ? "View Details" : "Not Started",
            }
          : t
      )
    );
    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  return (
    <div
      className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-4 xl:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#222B45] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#52C41A]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        {showCreateNewTask ? (
          <CreateNewTask
            taskData={editingTask}
            isEditing={Boolean(editingTask)}
            onCancel={() => {
              setShowCreateNewTask(false);
              setEditingTask(null);
            }}
            onSave={() => {
              setShowCreateNewTask(false);
              setEditingTask(null);
              fetchTasks(activeTab);
            }}
          />
        ) : (
          <div className="w-full flex-1 rounded-[25px] border border-[#DADADA] bg-white p-3.5 sm:p-4 md:p-6 lg:p-4 xl:p-8 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
            {/* Header Title */}
            <div className="pb-4 border-b border-[#E8E8E8] mb-5">
              <h2 className="font-semibold text-[20px] md:text-[24px] text-[#3D3D3D]">
                Tasks & Reminders
              </h2>
            </div>

            {/* TOP MAIN TAB SWITCH: Tasks vs Reminders */}
            <div className="w-full mb-6 overflow-x-auto scrollbar-hide">
              <div className="bg-white border border-[#E8E8E8] p-1 rounded-full flex w-full min-w-max sm:min-w-0 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                <button
                  onClick={() => setMainTab("tasks")}
                  className={`flex-1 text-center py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mainTab === "tasks"
                      ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                      : "text-[#586D93] hover:text-[#4866F6]"
                  }`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setMainTab("reminders")}
                  className={`flex-1 text-center py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    mainTab === "reminders"
                      ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                      : "text-[#586D93] hover:text-[#4866F6]"
                  }`}
                >
                  Reminders
                </button>
              </div>
            </div>

            {/* ========================================================= */}
            {/* REMINDERS VIEW (MOCKUPS 1 & 2)                             */}
            {/* ========================================================= */}
            {mainTab === "reminders" ? (
              <div className="w-full flex-1 flex flex-col mt-2">
                {/* Reminders Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E8] mb-6">
                  <h3 className="font-semibold text-[20px] text-[#3D3D3D]">
                    Reminders
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {/* Search Input Bar */}
                    <div className="relative w-full sm:w-[280px] lg:w-[320px]">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Reminders"
                        className="w-full h-10 pl-4 pr-10 rounded-[10px] border border-[#DADADA] text-sm text-[#3D3D3D] placeholder-[#8898AA] focus:outline-none focus:border-[#4866F6] transition-colors"
                      />
                      <Search className="w-4 h-4 text-[#8898AA] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Add Reminder Button */}
                    <button
                      onClick={() => {}}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 h-10 px-6 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_4px_10px_rgba(72,102,246,0.25)] whitespace-nowrap"
                    >
                      <span>Add Reminder</span>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-tab Segmented Control: AI Suggested Reminders vs Reminders */}
                <div className="w-full mb-6 overflow-x-auto scrollbar-hide">
                  <div className="bg-white border border-[#E8E8E8] p-1 rounded-full inline-flex sm:flex w-auto sm:w-full min-w-max sm:min-w-0 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                    <button
                      onClick={() => setReminderSubTab("ai-suggested")}
                      className={`text-center py-2.5 px-6 sm:px-4 sm:flex-1 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[210px] sm:min-w-0 ${
                        reminderSubTab === "ai-suggested"
                          ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                          : "text-[#586D93] hover:text-[#4866F6]"
                      }`}
                    >
                      AI Suggested Reminders
                    </button>
                    <button
                      onClick={() => setReminderSubTab("reminders")}
                      className={`text-center py-2.5 px-6 sm:px-4 sm:flex-1 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[140px] sm:min-w-0 ${
                        reminderSubTab === "reminders"
                          ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                          : "text-[#586D93] hover:text-[#4866F6]"
                      }`}
                    >
                      Reminders
                    </button>
                  </div>
                </div>

                {/* ===================================================== */}
                {/* SUB-TAB 1: REMINDERS (IMAGE 1)                        */}
                {/* ===================================================== */}
                {reminderSubTab === "reminders" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {filteredReminders.map((reminder, index) => {
                      const isSelected = selectedReminderId === reminder.id;
                      const statusLower = (reminder.status || "upcoming").toLowerCase();
                      const priorityLower = (reminder.priority || "high").toLowerCase();

                      return (
                        <div
                          key={reminder.id}
                          onClick={() => setSelectedReminderId(reminder.id)}
                          className={`rounded-[20px] bg-white p-3.5 sm:p-4 md:p-5 flex flex-col justify-between transition-all cursor-pointer min-h-[260px] ${
                            isSelected
                              ? "border-2 border-[#4866F6] shadow-[0px_4px_16px_rgba(72,102,246,0.12)]"
                              : "border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] hover:border-[#4866F688]"
                          }`}
                        >
                          <div>
                            {/* Card Title - Fluid responsive single line across all mobile sizes */}
                            <h4 className="font-semibold text-[clamp(14.5px,4.2vw,17.5px)] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                              {reminder.number ? `${reminder.number} ` : `${index + 1}. `}
                              {reminder.title}
                            </h4>

                            {/* Badges with Task Page Color Options */}
                            <div className="flex items-center gap-2.5 mb-4">
                              {statusLower === "upcoming" && (
                                <span className="bg-[#4866F61D] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold">
                                  Upcoming
                                </span>
                              )}
                              {statusLower === "pending" && (
                                <span className="bg-[#F59E0B20] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold">
                                  Pending
                                </span>
                              )}
                              {statusLower === "completed" && (
                                <span className="bg-[#33B4691C] text-[#33B469] px-3 py-1 rounded-[10px] text-xs font-semibold">
                                  Completed
                                </span>
                              )}

                              {priorityLower === "high" && (
                                <span className="bg-[#FB000018] text-[#FB0000] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                                  High
                                </span>
                              )}
                              {priorityLower === "medium" && (
                                <span className="bg-[#F59E0B18] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                  Medium
                                </span>
                              )}
                              {priorityLower === "low" && (
                                <span className="bg-[#4866F61A] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4866F6]" />
                                  Low
                                </span>
                              )}
                            </div>

                            {/* Date & Time Row with Top and Bottom divider borders */}
                            <div className="border-t border-b border-[#E8E8E8] py-2.5 my-4 grid grid-cols-2 items-center text-[#586D93] text-xs lg:text-[13.5px] font-medium">
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={calendarIcon}
                                  alt="Calendar"
                                  className="w-4 h-4 object-contain"
                                />
                                <span>{reminder.date || "15 - 07 - 2026"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[#8898AA]" />
                                <span>{reminder.time || "10:30 AM"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex flex-col gap-3 mt-auto">
                            <div className="flex items-center gap-2">
                              {/* Snooze */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                              >
                                Snooze
                              </button>

                              {/* Edit with EditWhiteIcon */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <span>Edit</span>
                                <img
                                  src={EditWhiteIcon}
                                  alt="Edit"
                                  className="w-3.5 h-3.5 object-contain"
                                />
                              </button>

                              {/* Delete button with rectangular rounded border and DeleteIcon */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteReminder(reminder.id);
                                }}
                                className="w-[40px] h-[40px] rounded-[8px] border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                              >
                                <img
                                  src={DeleteIcon}
                                  alt="Delete"
                                  className="w-4 h-4 object-contain"
                                />
                              </button>
                            </div>

                            {/* Mark as Completed */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkReminderCompleted(reminder.id);
                              }}
                              className="w-full h-[40px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_6px_rgba(72,102,246,0.2)]"
                            >
                              Mark as Completed
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ===================================================== */}
                {/* SUB-TAB 2: AI SUGGESTED REMINDERS (IMAGE 2)           */}
                {/* ===================================================== */}
                {reminderSubTab === "ai-suggested" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {/* Card 1: Submit Sprint Report */}
                    {filteredAiSuggested.find((r) => r.id === "ai-1") && (
                      <div className="rounded-[20px] bg-white p-3.5 sm:p-4 md:p-5 border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#4866F688] transition-all min-h-[260px]">
                        <div>
                          <h4 className="font-semibold text-[clamp(14.5px,4.2vw,17.5px)] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                            1. Submit Sprint Report
                          </h4>
                          <p className="text-[13.5px] lg:text-[14.5px] text-[#8898AA] mb-3">
                            Deadline is approching
                          </p>

                          {/* Badge with Task Page style */}
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-[#FB000018] text-[#FB0000] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                              High
                            </span>
                          </div>

                          {/* Date & Time with Top and Bottom divider borders */}
                          <div className="border-t border-b border-[#E8E8E8] py-2.5 my-4 grid grid-cols-2 items-center text-[#586D93] text-xs lg:text-[13.5px] font-medium">
                            <div className="flex items-center gap-1.5">
                              <img
                                src={calendarIcon}
                                alt="Calendar"
                                className="w-4 h-4 object-contain"
                              />
                              <span>15 - 07 - 2026</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-[#8898AA]" />
                              <span>10:30 AM</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {}}
                              className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                            >
                              Snooze
                            </button>
                            <button
                              onClick={() => {}}
                              className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                            >
                              View
                            </button>
                          </div>
                          <button
                            onClick={() => handleMarkReminderCompleted("ai-1")}
                            className="w-full h-[40px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_6px_rgba(72,102,246,0.2)]"
                          >
                            Mark as Completed
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Card 2: Follow up With the client */}
                    {filteredAiSuggested.find((r) => r.id === "ai-2") && (
                      <div className="rounded-[20px] bg-white p-3.5 sm:p-4 md:p-5 border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#4866F688] transition-all min-h-[260px]">
                        <div>
                          <h4 className="font-semibold text-[clamp(14.5px,4.2vw,17.5px)] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                            2. Follow up With the client
                          </h4>
                          <p className="text-[13.5px] lg:text-[14.5px] text-[#8898AA] mb-4">
                            Suggesting after yesterday meeting
                          </p>

                          {/* Date & Time with Top and Bottom divider borders */}
                          <div className="border-t border-b border-[#E8E8E8] py-2.5 my-4 grid grid-cols-2 items-center text-[#8898AA] text-xs lg:text-[13.5px] font-medium">
                            <div className="flex items-center gap-1.5">
                              <img
                                src={calendarIcon}
                                alt="Calendar"
                                className="w-4 h-4 object-contain"
                              />
                              <span>-- / -- / ----</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-[#8898AA]" />
                              <span>-- : -- --</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                          <button
                            onClick={() => {}}
                            className="w-full h-[40px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_6px_rgba(72,102,246,0.2)] gap-1.5"
                          >
                            <span>Send Email</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Card 3: Weekly team meeting */}
                    {filteredAiSuggested.find((r) => r.id === "ai-3") && (
                      <div className="rounded-[20px] bg-white p-3.5 sm:p-4 md:p-5 border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#4866F688] transition-all min-h-[260px]">
                        <div>
                          <h4 className="font-semibold text-[clamp(14.5px,4.2vw,17.5px)] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                            3. Weekly team meeting
                          </h4>
                          <p className="text-[13.5px] lg:text-[14.5px] text-[#8898AA] mb-4">
                            Meeting with team
                          </p>

                          {/* Date & Time with Top and Bottom divider borders */}
                          <div className="border-t border-b border-[#E8E8E8] py-2.5 my-4 grid grid-cols-2 items-center text-[#586D93] text-xs lg:text-[13.5px] font-medium">
                            <div className="flex items-center gap-1.5">
                              <img
                                src={calendarIcon}
                                alt="Calendar"
                                className="w-4 h-4 object-contain"
                              />
                              <span>15 - 07 - 2026</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#8898AA]">
                              <Clock className="w-4 h-4 text-[#8898AA]" />
                              <span>-- : -- --</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 mt-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {}}
                              className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                            >
                              Open
                            </button>
                            <button
                              onClick={() => {}}
                              className="flex-1 h-[40px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* ========================================================= */
              /* TASKS VIEW (STANDARD TASKS DASHBOARD)                     */
              /* ========================================================= */
              <div className="w-full flex-1 lg:rounded-[25px] lg:border lg:border-[#DADADA] lg:bg-white p-0 lg:p-4 xl:p-6 lg:shadow-[0px_2px_8px_rgba(0,0,0,0.02)] flex flex-col mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E8E8] mb-5">
                  <h3 className="font-semibold text-[20px] text-[#3D3D3D]">
                    Tasks
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleRefresh}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-8 sm:min-w-[150px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_4px_10px_rgba(72,102,246,0.15)]"
                    >
                      <span>Refresh</span>
                      <RefreshCw className="w-4 h-4 text-white" />
                    </button>

                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setShowCreateNewTask(true);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-8 sm:min-w-[165px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_4px_10px_rgba(72,102,246,0.25)] whitespace-nowrap"
                    >
                      <span>New Task</span>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div
                    onClick={() => handleTabChange("upcoming")}
                    className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer ${
                      activeTab === "upcoming"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]"
                        : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"
                    }`}
                  >
                    <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]">
                      <img
                        src={upcomingIcon}
                        alt="upcoming"
                        className="w-[32px] h-[32px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[24px] font-bold text-[#3D3D3D]">
                        {upcomingCount}
                      </span>
                      <span className="text-sm text-[#586D93] font-medium">
                        Upcoming Tasks
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleTabChange("pending")}
                    className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer ${
                      activeTab === "pending"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]"
                        : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"
                    }`}
                  >
                    <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]">
                      <img
                        src={pendingIcon}
                        alt="pending"
                        className="w-[32px] h-[32px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[24px] font-bold text-[#3D3D3D]">
                        {pendingCount}
                      </span>
                      <span className="text-sm text-[#586D93] font-medium">
                        Pending Tasks
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => handleTabChange("completed")}
                    className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer md:col-span-1 lg:col-span-1 ${
                      activeTab === "completed"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]"
                        : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"
                    }`}
                  >
                    <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]">
                      <img
                        src={completedIcon}
                        alt="completed"
                        className="w-[32px] h-[32px]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[24px] font-bold text-[#3D3D3D]">
                        {completedCount}
                      </span>
                      <span className="text-sm text-[#586D93] font-medium">
                        Completed tasks
                      </span>
                    </div>
                  </div>
                </div>

                {/* TASKS LIST */}
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <span className="w-8 h-8 border-4 border-[#4866F6] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[#8898AA]">
                    <p className="text-base font-medium">No tasks found in this tab.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 rounded-[18px] border border-[#E8E8E8] bg-white flex flex-col justify-between shadow-xs hover:border-[#4866F688] transition-all"
                      >
                        <div>
                          <h4 className="font-semibold text-[16px] text-[#222B45] mb-2">
                            {task.title}
                          </h4>
                          <p className="text-xs text-[#586D93] line-clamp-2 mb-3">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                task.status === "completed"
                                  ? "bg-[#52C41A18] text-[#52C41A]"
                                  : "bg-[#EFF3FE] text-[#4866F6]"
                              }`}
                            >
                              {task.status}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF1F0] text-[#FF4D4F]">
                              {task.priority}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[#E8E8E8] mt-auto">
                          <span className="text-xs text-[#8898AA]">
                            {task.dueDate}
                          </span>
                          <button
                            onClick={() => handleViewDetails(task)}
                            className="px-3.5 py-1.5 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs font-medium cursor-pointer transition-all"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* POPUPS & MODALS                                           */}
      {/* ========================================================= */}

      {/* TASK DETAILS POPUP */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white rounded-[24px] shadow-2xl border border-[#DADADA] overflow-hidden p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#E8E8E8] pb-3">
              <h3 className="text-lg font-bold text-[#3D3D3D]">Task Details</h3>
              <button
                onClick={() => setShowTaskDetails(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#8898AA] hover:text-[#3D3D3D] hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#222B45]">
                {selectedTask.title}
              </h4>
              <p className="text-xs text-[#586D93] mt-1">
                {selectedTask.description || "No description provided"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF3FE] text-[#4866F6]">
                {selectedTask.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF1F0] text-[#FF4D4F]">
                {selectedTask.priority}
              </span>
            </div>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E8E8]">
              <button
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="px-4 py-2 rounded-full border border-[#FF4D4F] text-[#FF4D4F] text-xs font-semibold hover:bg-[#FFF5F5]"
              >
                Delete
              </button>
              <button
                onClick={() => toggleTaskStatus(selectedTask)}
                className="px-5 py-2 rounded-full bg-[#4866F6] text-white text-xs font-semibold hover:bg-[#3554ED]"
              >
                {selectedTask.status === "completed"
                  ? "Mark Pending"
                  : "Mark Completed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}