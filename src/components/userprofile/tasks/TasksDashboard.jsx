import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Clock,
  Plus,
  RefreshCw,
  X,
  Search,
  Check,
  CheckCircle2,
  User,
  Bell,
  ArrowRight,
} from "lucide-react";

import calendarIcon from "../../../assets/images/calendarIcon.svg";
import EditWhiteIcon from "../../../assets/images/editwhite.png";
import DeleteIcon from "../../../assets/images/delete.png";
import deleteSvgIcon from "../../../assets/images/Delete.svg";
import reviewIcon from "../../../assets/images/review.png";
import upcomingIcon from "../../../assets/images/upcoming task.svg";
import pendingIcon from "../../../assets/images/pending.svg";
import completedIcon from "../../../assets/images/completed.svg";
import notifyIcon from "../../../assets/images/notify.png";
import arrowRightIcon from "../../../assets/images/ArrowRight.png";
import profileIcon from "../../../assets/images/profile1.png";

import CreateNewTask from "./CreateNewTask";
import CreateReminder from "../CreateReminder";

import {
  getTaskDashboard,
  getTaskDetails,
  deleteTask,
  completeTask,
  updateTask,
} from "../../../api/authApi";
import { useTheme } from "../../../context/ThemeContext";

// Calendar icon styled with #586D93 for dark mode
const CalendarIconSvg = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6665 1.66797V4.16797"
      stroke="#586D93"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3335 1.66797V4.16797"
      stroke="#586D93"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.9165 7.57422H17.0832"
      stroke="#586D93"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 7.08464V14.168C17.5 16.668 16.25 18.3346 13.3333 18.3346H6.66667C3.75 18.3346 2.5 16.668 2.5 14.168V7.08464C2.5 4.58464 3.75 2.91797 6.66667 2.91797H13.3333C16.25 2.91797 17.5 4.58464 17.5 7.08464Z"
      stroke="#586D93"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0791 11.418H13.0866"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0791 13.918H13.0866"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99609 11.418H10.0036"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.99609 13.918H10.0036"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.91211 11.418H6.91959"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.91211 13.918H6.91959"
      stroke="#586D93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// =========================================================
// DUMMY DATA SWITCH & DATA SOURCE
// Set USE_DUMMY_DATA = false when backend data should be used exclusively.
// =========================================================
const USE_DUMMY_DATA = false;

// Helper to check if a task is due within 24 hours
const isTaskDueWithin24Hours = (task) => {
  if (!task) return false;
  const status = (task.status || "").toLowerCase();
  const actionState = (task.actionState || "").toLowerCase();
  const buttonText = (task.buttonText || "").toLowerCase();

  // If completed in any form, never show notification icon
  if (
    status === "completed" ||
    actionState === "completed" ||
    buttonText === "completed"
  ) {
    return false;
  }

  // If explicitly specified
  if (typeof task.isDueWithin24Hours === "boolean") {
    return task.isDueWithin24Hours;
  }

  // Parse task due date and time dynamically
  try {
    let targetDate = null;
    if (task.rawDate) {
      targetDate = new Date(task.rawDate);
    } else if (task.dueDate) {
      const parts = task.dueDate.split(/[-/]/).map((p) => p.trim());
      if (parts.length === 3) {
        let year, month, day;
        if (parts[0].length === 4) {
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10) - 1;
          day = parseInt(parts[2], 10);
        } else {
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10) - 1;
          year = parseInt(parts[2], 10);
        }

        let hours = 0;
        let minutes = 0;
        if (task.dueTime) {
          const timeStr = task.dueTime.trim().toUpperCase();
          const isPM = timeStr.includes("PM");
          const isAM = timeStr.includes("AM");
          const cleanTime = timeStr.replace(/(AM|PM)/g, "").trim();
          const [h, m] = cleanTime.split(":").map((v) => parseInt(v, 10));
          hours = h || 0;
          minutes = m || 0;
          if (isPM && hours < 12) hours += 12;
          if (isAM && hours === 12) hours = 0;
        }

        targetDate = new Date(year, month, day, hours, minutes);
      }
    }

    if (targetDate && !isNaN(targetDate.getTime())) {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();
      const hoursDiff = diffMs / (1000 * 60 * 60);
      if (hoursDiff >= -24 && hoursDiff <= 24) {
        return true;
      }
    }
  } catch (e) {
    console.error("Error checking 24 hours due time:", e);
  }

  return Boolean(task.hasReminder);
};

// Helper for Status Badge styling
const getStatusBadgeProps = (status, isDark = false) => {
  const s = (status || "").toLowerCase();
  if (isDark) {
    if (s === "completed") {
      return {
        className:
          "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap border border-[#30D158]/30",
        style: { backgroundColor: "#0D281C", color: "#30D158" },
      };
    }
    if (s === "upcoming") {
      return {
        className:
          "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap border border-[#4866F6]/30",
        style: { backgroundColor: "#0D1C38", color: "#4866F6" },
      };
    }
    // pending / default
    return {
      className:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap border border-[#FF9F0A]/30",
      style: { backgroundColor: "#261B06", color: "#FF9F0A" },
    };
  }

  if (s === "completed") {
    return {
      className:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap",
      style: { backgroundColor: "#33B4691A", color: "#33B469" },
    };
  }
  if (s === "upcoming") {
    return {
      className:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap",
      style: { backgroundColor: "#4866F61A", color: "#4866F6" },
    };
  }
  // pending / default
  return {
    className:
      "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold capitalize shrink-0 whitespace-nowrap",
    style: { backgroundColor: "#F59E0B1A", color: "#F59E0B" },
  };
};

// Helper for Priority Badge styling
const getPriorityBadgeProps = (priority, isDark = false) => {
  const p = (priority || "").toLowerCase();
  if (isDark) {
    if (p === "high") {
      return {
        badgeClass:
          "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap border border-[#FF453A]/30",
        badgeStyle: { backgroundColor: "#280A10", color: "#FF453A" },
        dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
        dotStyle: { backgroundColor: "#FF453A" },
      };
    }
    if (p === "low") {
      return {
        badgeClass:
          "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap border border-[#3B82F6]/30",
        badgeStyle: { backgroundColor: "#0B1D3A", color: "#3B82F6" },
        dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
        dotStyle: { backgroundColor: "#3B82F6" },
      };
    }
    // medium / default
    return {
      badgeClass:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap border border-[#FF9F0A]/30",
      badgeStyle: { backgroundColor: "#261B06", color: "#FF9F0A" },
      dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
      dotStyle: { backgroundColor: "#FF9F0A" },
    };
  }

  if (p === "high") {
    return {
      badgeClass:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap",
      badgeStyle: { backgroundColor: "#FB000026", color: "#FB0000" },
      dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
      dotStyle: { backgroundColor: "#FB0000" },
    };
  }
  if (p === "low") {
    return {
      badgeClass:
        "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap",
      badgeStyle: { backgroundColor: "#EFF6FF", color: "#2F54EB" },
      dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
      dotStyle: { backgroundColor: "#2F54EB" },
    };
  }
  // medium / default
  return {
    badgeClass:
      "px-2 sm:px-2.5 md:px-2.5 lg:px-2.5 xl:px-3 py-0.5 md:py-0.5 lg:py-1 rounded-full text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-semibold flex items-center gap-1 md:gap-1.5 capitalize shrink-0 whitespace-nowrap",
    badgeStyle: { backgroundColor: "#F59E0B1A", color: "#F59E0B" },
    dotClass: "w-1.5 h-1.5 rounded-full shrink-0",
    dotStyle: { backgroundColor: "#F59E0B" },
  };
};

const DUMMY_STATS = {
  upcoming_count: 12,
  pending_count: 5,
  completed_count: 7,
};

const DUMMY_TASKS_BY_TAB = {
  pending: [
    {
      id: 1,
      number: "1.",
      title: "Prepare KT Session",
      fullTitle: "1.Prepare KT Session",
      description:
        "Prepare comprehensive Knowledge Transfer presentation and documentation for the incoming engineering team.",
      assigned: "Self",
      status: "pending",
      priority: "medium",
      hasReminder: true,
      isDueWithin24Hours: true,
      dueDate: "19 - 08 - 2026",
      dueTime: "12:30 AM",
      platform: "Trello",
      actionState: "InProgress",
      buttonText: "InProgress",
    },
    {
      id: 2,
      number: "2.",
      title: "Update Jira Task",
      fullTitle: "2.Update Jira Task",
      description:
        "Update sprint backlog Jira tickets with current estimation points and acceptance criteria.",
      assigned: "Self",
      status: "pending",
      priority: "high",
      hasReminder: false,
      dueDate: "28 - 10 - 2026",
      dueTime: "03:30 PM",
      platform: "Jira",
      actionState: "Not Started",
      buttonText: "Not Started",
    },
    {
      id: 3,
      number: "3.",
      title: "Submit Sprint 10 wireframe",
      fullTitle: "3.Submit Sprint 10 wireframe",
      description:
        "Submit finalised high-fidelity UI wireframes and interactive prototypes for Sprint 10 client review.",
      assigned: "Team Leader",
      status: "pending",
      priority: "medium",
      hasReminder: false,
      dueDate: "16 - 07 - 2026",
      dueTime: "01:30 PM",
      platform: "Trello",
      actionState: "InProgress",
      buttonText: "InProgress",
    },
  ],
  upcoming: [
    {
      id: 101,
      number: "1.",
      title: "Project Review Meeting",
      fullTitle: "1.Project Review Meeting",
      description: "Review Sprint 10 Deliverables before Meeting",
      assigned: "Self",
      status: "upcoming",
      priority: "high",
      hasReminder: true,
      dueDate: "15 - 07 - 2026",
      dueTime: "10:30 AM",
      platform: "Trello",
      actionState: "Not Started",
      buttonText: "Not Started",
    },
    {
      id: 102,
      number: "2.",
      title: "Submit Sprint 10 wireframe",
      fullTitle: "2.Submit Sprint 10 wireframe",
      description: "Submit Sprint 10 wireframe design deliverables.",
      assigned: "Team Leader",
      status: "upcoming",
      priority: "medium",
      hasReminder: false,
      dueDate: "16 - 07 - 2026",
      dueTime: "01:30 PM",
      platform: "Trello",
      actionState: "Not Started",
      buttonText: "Not Started",
    },
    {
      id: 103,
      number: "3.",
      title: "Project Review Meeting",
      fullTitle: "3.Project Review Meeting",
      description: "Review Sprint 10 Deliverables before Meeting",
      assigned: "Self",
      status: "upcoming",
      priority: "low",
      hasReminder: false,
      dueDate: "15 - 07 - 2026",
      dueTime: "10:30 AM",
      platform: "Slack",
      actionState: "Not Started",
      buttonText: "Not Started",
    },
  ],
  completed: [
    {
      id: 201,
      number: "1.",
      title: "Sprint 9 Wireframe Completed",
      fullTitle: "1.Sprint 9 Wireframe Completed",
      description: "Review Sprint 10 Deliverables before Meeting",
      assigned: "Self",
      status: "completed",
      priority: "high",
      hasReminder: false,
      dueDate: "15 - 07 - 2026",
      dueTime: "10:30 AM",
      platform: "Trello",
      actionState: "Completed",
      buttonText: "Completed",
    },
    {
      id: 202,
      number: "2.",
      title: "Sprint 9 Wireframe Completed",
      fullTitle: "2.Sprint 9 Wireframe Completed",
      description: "All automated test suites verified and passing in staging.",
      assigned: "TL",
      status: "completed",
      priority: "medium",
      hasReminder: false,
      dueDate: "12 - 07 - 2026",
      dueTime: "05:00 PM",
      platform: "Google Calendar",
      actionState: "Completed",
      buttonText: "Completed",
    },
    {
      id: 203,
      number: "3.",
      title: "Sprint 9 Wireframe Completed",
      fullTitle: "3.Sprint 9 Wireframe Completed",
      description: "Compiled meeting minutes and key improvement metrics.",
      assigned: "Self",
      status: "completed",
      priority: "low",
      hasReminder: false,
      dueDate: "14 - 07 - 2026",
      dueTime: "03:00 PM",
      platform: "Outlook",
      actionState: "Completed",
      buttonText: "Completed",
    },
  ],
};

export default function TasksDashboard() {
  const { isDark } = useTheme();

  // =========================================================
  // MAIN TOP TABS: "tasks" | "reminders" (Default to "tasks")
  // =========================================================
  const [mainTab, setMainTab] = useState("tasks");

  // =========================================================
  // TASKS SUB-TABS: "upcoming" | "pending" | "completed" (Default to "upcoming")
  // =========================================================
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // =========================================================
  // REMINDERS SUB-TAB: "reminders" | "ai-suggested"
  // =========================================================
  const [reminderSubTab, setReminderSubTab] = useState("reminders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReminderId, setSelectedReminderId] = useState(1);

  // =========================================================
  // TOAST FEEDBACK
  // =========================================================
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  // =========================================================
  // REMINDER DATA
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
    setRemindersList((prev) => prev.filter((reminder) => reminder.id !== id));
    setAiSuggestedList((prev) =>
      prev.filter((reminder) => reminder.id !== id)
    );
    showToast("Reminder deleted!");
  };

  const handleMarkReminderCompleted = (id) => {
    setRemindersList((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              status: "Completed",
            }
          : reminder
      )
    );

    setAiSuggestedList((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? {
              ...reminder,
              status: "Completed",
            }
          : reminder
      )
    );

    showToast("Reminder marked as completed! ✓");
  };

  const filteredReminders = remindersList.filter(
    (reminder) =>
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reminder.description &&
        reminder.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAiSuggested = aiSuggestedList.filter(
    (reminder) =>
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reminder.subtitle &&
        reminder.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // =========================================================
  // TASKS SECTION STATE
  // =========================================================
  const [showCreateNewTask, setShowCreateNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showCreateReminder, setShowCreateReminder] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [dummyTasksState, setDummyTasksState] = useState(DUMMY_TASKS_BY_TAB);
  const [tasks, setTasks] = useState(
    USE_DUMMY_DATA ? DUMMY_TASKS_BY_TAB[activeTab] || [] : []
  );

  const [taskStats, setTaskStats] = useState(
    USE_DUMMY_DATA
      ? DUMMY_STATS
      : {
          upcoming_count: 0,
          pending_count: 0,
          completed_count: 0,
        }
  );
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [taskDetailsLoading, setTaskDetailsLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const languageOpen = outletContext?.languageOpen ?? false;

  // =========================================================
  // FETCH TASKS
  // =========================================================
  const fetchTasks = async (tab = activeTab) => {
    if (USE_DUMMY_DATA) {
      setLoading(true);
      setTimeout(() => {
        setTaskStats(DUMMY_STATS);
        setTasks(dummyTasksState[tab] || []);
        setLoading(false);
      }, 150);
      return;
    }

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

      const formattedTasks = (data?.tasks || []).map((task, index) => {
        const date = task.due_date ? new Date(task.due_date) : null;

        return {
          id: task.task_id || task.id,
          number: `${index + 1}.`,
          title: task.title,
          fullTitle: `${index + 1}.${task.title}`,
          description: task.description,
          platform: task.platform || "Trello",
          assigned: task.assigned_to_name || task.assigned_to || "Self",
          status: task.status?.toLowerCase() || "pending",
          priority: task.priority?.toLowerCase() || "medium",
          hasReminder: Boolean(task.reminder_enabled),
          rawDate: task.due_date,
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
          actionState:
            task.status?.toLowerCase() === "pending"
              ? "InProgress"
              : task.status?.toLowerCase() === "completed"
              ? "Completed"
              : "Not Started",
          buttonText:
            task.status?.toLowerCase() === "pending"
              ? "InProgress"
              : task.status?.toLowerCase() === "completed"
              ? "Completed"
              : "Not Started",
        };
      });

      setTasks(formattedTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // VIEW TASK DETAILS
  // =========================================================
  const handleViewDetails = async (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);

    if (USE_DUMMY_DATA) {
      setTaskDetails(task);
      return;
    }

    try {
      setTaskDetailsLoading(true);
      setError("");
      const response = await getTaskDetails(task.id);
      setSelectedTask((prev) => ({
        ...prev,
        ...response,
        title: response?.title || prev?.title,
        description: response?.description || prev?.description,
        platform: response?.platform || prev?.platform || "Trello",
        assigned: response?.assigned_to_name || response?.assigned_to || prev?.assigned || "Self",
        status: response?.status?.toLowerCase() || prev?.status,
        priority: response?.priority?.toLowerCase() || prev?.priority,
        dueDate: prev?.dueDate,
        dueTime: prev?.dueTime,
      }));
      setTaskDetails(response || task);
    } catch (err) {
      console.error("Failed to fetch task details:", err);
      setTaskDetails(task);
    } finally {
      setTaskDetailsLoading(false);
    }
  };

  // =========================================================
  // FETCH TASKS WHEN TAB CHANGES
  // =========================================================
  useEffect(() => {
    if (mainTab === "tasks") {
      fetchTasks(activeTab);
    }
  }, [activeTab, mainTab]);

  // =========================================================
  // TOGGLE TASK ACTION (InProgress / Not Started / Completed)
  // =========================================================
  const handleToggleTaskAction = async (task) => {
    const nextStateMap = {
      "Not Started": "InProgress",
      InProgress: "Completed",
      Completed: "Not Started",
    };

    const nextState = nextStateMap[task.buttonText || task.actionState] || "InProgress";

    if (!USE_DUMMY_DATA) {
      try {
        if (nextState === "Completed") {
          await completeTask(task.id);
        } else {
          await updateTask(task.id, {
            status: nextState === "Completed" ? "completed" : "pending",
            action_state: nextState,
          });
        }
        showToast(`Task marked as ${nextState}`);
        await fetchTasks(activeTab);
      } catch (err) {
        console.error("Failed to toggle task action:", err);
        showToast(err?.detail || err?.message || "Failed to update task");
      }
    } else {
      setDummyTasksState((prev) => {
        const updatedTabList = (prev[activeTab] || []).map((t) =>
          t.id === task.id
            ? {
                ...t,
                actionState: nextState,
                buttonText: nextState,
                status: nextState === "Completed" ? "completed" : (t.status === "completed" ? "pending" : t.status),
                hasReminder: nextState === "Completed" ? false : t.hasReminder,
                isDueWithin24Hours: nextState === "Completed" ? false : t.isDueWithin24Hours,
              }
            : t
        );
        return {
          ...prev,
          [activeTab]: updatedTabList,
        };
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? {
                ...t,
                actionState: nextState,
                buttonText: nextState,
                status: nextState === "Completed" ? "completed" : (t.status === "completed" ? "pending" : t.status),
                hasReminder: nextState === "Completed" ? false : t.hasReminder,
                isDueWithin24Hours: nextState === "Completed" ? false : t.isDueWithin24Hours,
              }
            : t
        )
      );

      showToast(`Task marked as ${nextState}`);
    }
  };

  // =========================================================
  // COMPLETE TASK
  // =========================================================
  const handleCompleteTask = async (taskId) => {
    try {
      if (!USE_DUMMY_DATA) {
        await completeTask(taskId);
      }

      setShowTaskDetails(false);
      setTaskDetails(null);
      setSelectedTask(null);

      setSuccessMessage("Task completed successfully");
      setShowSuccess(false);

      setTimeout(() => {
        setShowSuccess(true);
      }, 10);

      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          setSuccessMessage("");
        }, 200);
      }, 2000);

      await fetchTasks(activeTab);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // =========================================================
  // TAB CHANGE
  // =========================================================
  const handleTabChange = (tab) => {
    setShowCreateNewTask(false);
    setEditingTask(null);
    setActiveTab(tab);
    if (USE_DUMMY_DATA) {
      setTasks(dummyTasksState[tab] || []);
      const firstTask = (dummyTasksState[tab] || [])[0];
      if (firstTask) {
        setSelectedTaskId(firstTask.id);
      }
    }
  };

  // =========================================================
  // REFRESH
  // =========================================================
  const handleRefresh = () => {
    setShowCreateNewTask(false);
    setEditingTask(null);
    fetchTasks(activeTab);
    showToast("Tasks refreshed");
  };

  // =========================================================
  // DELETE TASK
  // =========================================================
  const handleDeleteTask = async (taskId) => {
    try {
      if (!USE_DUMMY_DATA) {
        await deleteTask(taskId);
      } else {
        setDummyTasksState((prev) => ({
          ...prev,
          [activeTab]: (prev[activeTab] || []).filter((t) => t.id !== taskId),
        }));
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      setShowTaskDetails(false);
      setTaskDetails(null);
      setSelectedTask(null);

      setSuccessMessage("Task deleted successfully");
      setShowSuccess(false);

      setTimeout(() => {
        setShowSuccess(true);
      }, 10);

      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          setSuccessMessage("");
        }, 200);
      }, 3000);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";

    if (!USE_DUMMY_DATA) {
      try {
        if (nextStatus === "completed") {
          await completeTask(task.id);
        } else {
          await updateTask(task.id, { status: nextStatus });
        }
        showToast(`Task marked as ${nextStatus}`);
        await fetchTasks(activeTab);
      } catch (err) {
        console.error("Failed to update status:", err);
        showToast(err?.detail || err?.message || "Failed to update task");
      }
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? {
                ...t,
                status: nextStatus,
                buttonText:
                  nextStatus === "completed" ? "Completed" : "InProgress",
              }
            : t
        )
      );
    }

    setShowTaskDetails(false);
    setSelectedTask(null);
  };

  // Tasks to render for the active sub-tab
  const displayTasks = USE_DUMMY_DATA
    ? dummyTasksState[activeTab] || []
    : tasks;

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div
      className={`h-full overflow-y-auto px-2.5 sm:px-4 md:px-4 lg:px-4 xl:px-6 pt-2.5 sm:pt-3 md:pt-3 lg:pt-4 xl:pt-6 pb-8 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* =====================================================
          TOAST MESSAGE
      ===================================================== */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#222B45] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#52C41A]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        {showCreateReminder ? (
          <CreateReminder
            initialData={editingReminder}
            isEditing={Boolean(editingReminder)}
            onCancel={() => {
              setShowCreateReminder(false);
              setEditingReminder(null);
            }}
            onSave={(savedReminder) => {
              const wasEditing = Boolean(editingReminder);
              setShowCreateReminder(false);
              setEditingReminder(null);
              showToast(
                wasEditing
                  ? "Reminder updated successfully"
                  : "Reminder created successfully"
              );
              if (savedReminder) {
                if (wasEditing && savedReminder.id) {
                  setRemindersList((prev) =>
                    prev.map((r) =>
                      r.id === savedReminder.id ? { ...r, ...savedReminder } : r
                    )
                  );
                } else {
                  const newReminderObj = {
                    id: savedReminder.id || Date.now(),
                    number: `${remindersList.length + 1}.`,
                    title: savedReminder.title,
                    priority: savedReminder.priority || "High",
                    status: "Upcoming",
                    date: savedReminder.date || "Today",
                    time: `${savedReminder.hour || "10"} : ${
                      savedReminder.minute || "00"
                    } ${savedReminder.ampm || "AM"}`,
                    repeat: savedReminder.repeat || "Daily",
                    inApp: savedReminder.inApp,
                    emailNotification: savedReminder.emailNotification,
                  };
                  setRemindersList((prev) => [newReminderObj, ...prev]);
                }
              }
            }}
          />
        ) : showCreateNewTask ? (
          <CreateNewTask
            taskData={editingTask}
            isEditing={Boolean(editingTask)}
            onCancel={() => {
              setShowCreateNewTask(false);
              setEditingTask(null);
            }}
            onSave={(savedTask) => {
              const wasEditing = Boolean(editingTask);
              setShowCreateNewTask(false);
              setEditingTask(null);

              if (USE_DUMMY_DATA && savedTask) {
                const targetTab = (savedTask.status || "upcoming").toLowerCase();
                setDummyTasksState((prev) => {
                  const currentList = prev[targetTab] || prev[activeTab] || [];
                  let updatedList;
                  if (wasEditing && savedTask.id) {
                    updatedList = currentList.map((t) =>
                      t.id === savedTask.id ? { ...t, ...savedTask } : t
                    );
                  } else {
                    const newTaskObj = {
                      id: savedTask.id || Date.now(),
                      number: `${currentList.length + 1}.`,
                      title: savedTask.title,
                      fullTitle: `${currentList.length + 1}.${savedTask.title}`,
                      description: savedTask.description || "",
                      assigned: savedTask.assigned_to_name || savedTask.assignedTo || "Self",
                      status: savedTask.status?.toLowerCase() || activeTab || "upcoming",
                      priority: savedTask.priority?.toLowerCase() || "medium",
                      hasReminder: Boolean(savedTask.reminder_enabled),
                      dueDate: savedTask.dueDate || "",
                      dueTime: savedTask.due_time || `${savedTask.dueTimeHH || "10"}:${savedTask.dueTimeMM || "30"} ${savedTask.dueTimeAmpm || "AM"}`,
                      platform: savedTask.platform || "Trello",
                      actionState: "Not Started",
                      buttonText: "Not Started",
                    };
                    updatedList = [newTaskObj, ...currentList];
                  }
                  return {
                    ...prev,
                    [activeTab]: updatedList,
                  };
                });
              }

              setSuccessMessage(
                wasEditing
                  ? "Task updated successfully"
                  : "Task created successfully"
              );

              setShowSuccess(false);

              setTimeout(() => {
                setShowSuccess(true);
              }, 10);

              setTimeout(() => {
                setShowSuccess(false);
                setTimeout(() => {
                  setSuccessMessage("");
                }, 200);
              }, 2000);

              fetchTasks(activeTab);
            }}
          />
        ) : (
          <div className={`w-full flex-1 rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] border ${
            isDark && mainTab === "tasks" ? "border-[#1E283D] bg-[#060D1B]" : "border-[#DADADA] bg-white"
          } p-3 sm:p-4 md:p-4 lg:p-4 xl:p-6 shadow-[0px_0px_4px_0px_#00000014] flex flex-col`}>
            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className={`pb-3 md:pb-3.5 border-b ${isDark && mainTab === "tasks" ? "border-[#586D93]" : "border-[#E8E8E8]"} mb-3.5 md:mb-4`}>
              <h2 className={`font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[22px] xl:text-[24px] ${
                isDark && mainTab === "tasks" ? "text-white" : "text-[#3D3D3D]"
              }`}>
                Tasks & Reminders
              </h2>
            </div>

            {/* =====================================================
                MAIN TAB SWITCH (Right aligned extending to the end)
            ===================================================== */}
            <div className="w-full mb-3.5 md:mb-4 flex justify-center sm:justify-end">
              <div className={`w-full max-w-full sm:max-w-[540px] md:max-w-[640px] lg:max-w-[720px] xl:max-w-[820px] ${
                isDark && mainTab === "tasks" ? "bg-[#0B1426] border-[#586D93]" : "bg-white border-[#E8E8E8]"
              } border p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]`}>
                <div className="flex items-center w-full min-w-max sm:min-w-0">
                  <button
                    onClick={() => setMainTab("tasks")}
                    className={`flex-1 text-center py-2 sm:py-2.5 md:py-2.5 lg:py-3 xl:py-3 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[15px] font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[130px] sm:min-w-0 ${
                      mainTab === "tasks"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : isDark && mainTab === "tasks" ? "text-[#7E8B9F] hover:text-[#4866F6]" : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Tasks
                  </button>

                  <button
                    onClick={() => setMainTab("reminders")}
                    className={`flex-1 text-center py-2 sm:py-2.5 md:py-2.5 lg:py-3 xl:py-3 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[15px] font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[130px] sm:min-w-0 ${
                      mainTab === "reminders"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : isDark && mainTab === "tasks" ? "text-[#7E8B9F] hover:text-[#4866F6]" : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Reminders
                  </button>
                </div>
              </div>
            </div>

            {/* =====================================================
                REMINDERS VIEW
            ===================================================== */}
            {mainTab === "reminders" ? (
              <div className="w-full flex-1 flex flex-col mt-1">
                {/* Reminders Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 md:pb-3.5 border-b border-[#E8E8E8] mb-4">
                  <h3 className="font-semibold text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[21px] text-[#3D3D3D]">
                    Reminders
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[320px]">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Reminders"
                        className="w-full h-8.5 sm:h-9 md:h-9 lg:h-9.5 xl:h-10 pl-3.5 pr-9 rounded-[10px] border bg-white border-[#DADADA] text-[#3D3D3D] placeholder-[#8898AA] text-xs md:text-[13px] focus:outline-none focus:border-[#4866F6] transition-colors"
                      />
                      <Search className="w-3.5 h-3.5 text-[#8898AA] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* New Reminder */}
                    <button
                      onClick={() => {
                        setEditingReminder(null);
                        setShowCreateReminder(true);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 h-8.5 sm:h-9 md:h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-4 md:px-5 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-xs md:text-xs lg:text-xs xl:text-sm shadow-[0_4px_10px_rgba(72,102,246,0.25)] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
                    >
                      <span>New Reminder</span>
                      <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Reminders Subtabs */}
                <div className="w-full mb-4 md:mb-5">
                  <div className="w-full bg-white border-[#E8E8E8] border p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center w-full min-w-max sm:min-w-0">
                      <button
                        onClick={() => setReminderSubTab("ai-suggested")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-3 sm:px-4 md:px-5 rounded-full text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[140px] sm:min-w-0 ${
                          reminderSubTab === "ai-suggested"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        AI Suggested Reminders
                      </button>

                      <button
                        onClick={() => setReminderSubTab("reminders")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-3 sm:px-4 md:px-5 rounded-full text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          reminderSubTab === "reminders"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Reminders
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reminders Cards */}
                {reminderSubTab === "reminders" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-3.5 xl:gap-4">
                    {filteredReminders.map((reminder, index) => {
                      const isSelected = selectedReminderId === reminder.id;
                      const statusLower = (
                        reminder.status || "upcoming"
                      ).toLowerCase();
                      const priorityLower = (
                        reminder.priority || "high"
                      ).toLowerCase();

                      return (
                        <div
                          key={reminder.id}
                          onClick={() => setSelectedReminderId(reminder.id)}
                          className={`rounded-[16px] md:rounded-[18px] bg-white p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 flex flex-col justify-between transition-all cursor-pointer min-h-[230px] ${
                            isSelected
                              ? "border-2 border-[#4866F6] shadow-[0px_4px_16px_rgba(72,102,246,0.12)]"
                              : "border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] hover:border-[#4866F688]"
                          }`}
                        >
                          <div>
                            <h4 className="font-semibold text-[12.5px] sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[16px] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-2">
                              {reminder.number
                                ? `${reminder.number} `
                                : `${index + 1}. `}
                              {reminder.title}
                            </h4>

                            <div className="flex items-center gap-1.5 mb-2.5">
                              {statusLower === "upcoming" && (
                                <span className={getStatusBadgeProps("upcoming", false).className} style={getStatusBadgeProps("upcoming", false).style}>
                                  Upcoming
                                </span>
                              )}
                              {statusLower === "pending" && (
                                <span className={getStatusBadgeProps("pending", false).className} style={getStatusBadgeProps("pending", false).style}>
                                  Pending
                                </span>
                              )}
                              {statusLower === "completed" && (
                                <span className={getStatusBadgeProps("completed", false).className} style={getStatusBadgeProps("completed", false).style}>
                                  Completed
                                </span>
                              )}

                              {priorityLower === "high" && (
                                <span className={getPriorityBadgeProps("high", false).badgeClass} style={getPriorityBadgeProps("high", false).badgeStyle}>
                                  <span className={getPriorityBadgeProps("high", false).dotClass} style={getPriorityBadgeProps("high", false).dotStyle} />
                                  High
                                </span>
                              )}
                              {priorityLower === "medium" && (
                                <span className={getPriorityBadgeProps("medium", false).badgeClass} style={getPriorityBadgeProps("medium", false).badgeStyle}>
                                  <span className={getPriorityBadgeProps("medium", false).dotClass} style={getPriorityBadgeProps("medium", false).dotStyle} />
                                  Medium
                                </span>
                              )}
                              {priorityLower === "low" && (
                                <span className={getPriorityBadgeProps("low", false).badgeClass} style={getPriorityBadgeProps("low", false).badgeStyle}>
                                  <span className={getPriorityBadgeProps("low", false).dotClass} style={getPriorityBadgeProps("low", false).dotStyle} />
                                  Low
                                </span>
                              )}
                            </div>

                            <div className="border-t border-b border-[#E8E8E8] text-[#586D93] py-1.5 md:py-2 my-2 grid grid-cols-2 items-center text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-medium">
                              <div className="flex items-center gap-1.5">
                                <img
                                  src={calendarIcon}
                                  alt="Calendar"
                                  className="w-3.5 h-3.5 object-contain"
                                />
                                <span>{reminder.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#8898AA]" />
                                <span>{reminder.time}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mt-auto">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingReminder(reminder);
                                  setShowCreateReminder(true);
                                }}
                                className="flex-1 h-[32px] sm:h-[34px] md:h-[36px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6]"
                              >
                                <span>Edit</span>
                                <img
                                  src={EditWhiteIcon}
                                  alt="Edit"
                                  className="w-3 h-3 object-contain"
                                />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteReminder(reminder.id);
                                }}
                                className="w-[32px] h-[32px] sm:h-[34px] md:w-[36px] md:h-[36px] rounded-[8px] border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all shrink-0"
                              >
                                <img
                                  src={DeleteIcon}
                                  alt="Delete"
                                  className="w-3.5 h-3.5 object-contain"
                                />
                              </button>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkReminderCompleted(reminder.id);
                              }}
                              className="w-full h-[32px] sm:h-[34px] md:h-[36px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_6px_rgba(72,102,246,0.2)]"
                            >
                              Mark as Completed
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* AI Suggested Reminders */}
                {reminderSubTab === "ai-suggested" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-3.5 xl:gap-4">
                    {filteredAiSuggested.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="rounded-[16px] md:rounded-[18px] bg-white border-[#E8E8E8] p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 border shadow-[0px_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#4866F688] transition-all min-h-[230px]"
                      >
                        <div>
                          <h4 className="font-semibold text-[12.5px] sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[16px] text-[#222B45] whitespace-nowrap overflow-hidden text-ellipsis mb-1">
                            {reminder.number ? `${reminder.number} ` : ""}
                            {reminder.title}
                          </h4>
                          <p className="text-[11px] sm:text-[11.5px] md:text-xs text-[#8898AA] mb-2">
                            {reminder.subtitle || reminder.description}
                          </p>

                          {reminder.priority && (
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <span className={getPriorityBadgeProps(reminder.priority, false).badgeClass} style={getPriorityBadgeProps(reminder.priority, false).badgeStyle}>
                                <span className={getPriorityBadgeProps(reminder.priority, false).dotClass} style={getPriorityBadgeProps(reminder.priority, false).dotStyle} />
                                {reminder.priority}
                              </span>
                            </div>
                          )}

                          <div className="border-t border-b border-[#E8E8E8] text-[#586D93] py-1.5 md:py-2 my-2 grid grid-cols-2 items-center text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-medium">
                            <div className="flex items-center gap-1.5">
                              <img
                                src={calendarIcon}
                                alt="Calendar"
                                className="w-3.5 h-3.5 object-contain"
                              />
                              <span>{reminder.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#8898AA]">
                              <Clock className="w-3.5 h-3.5 text-[#8898AA]" />
                              <span>{reminder.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-auto">
                          <button
                            onClick={() =>
                              handleMarkReminderCompleted(reminder.id)
                            }
                            className="w-full h-[32px] sm:h-[34px] md:h-[36px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center justify-center shadow-[0_2px_6px_rgba(72,102,246,0.2)]"
                          >
                            Mark as Completed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* =========================================================
                 TASKS VIEW (3-column responsive layout across laptop sizes)
              ========================================================= */
              <div className={`w-full flex-1 rounded-[16px] md:rounded-[18px] lg:rounded-[20px] border ${
                isDark ? "border-[#586D93] bg-[#060D1B]" : "border-[#DADADA] bg-white"
              } p-3 sm:p-3.5 md:p-3.5 lg:p-4 xl:p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] flex flex-col mt-1`}>
                {/* Tasks Header: Title & Action Buttons */}
                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3.5 md:pb-4 border-b ${
                  isDark ? "border-[#586D93]" : "border-[#E8E8E8]"
                } mb-4 md:mb-5`}>
                  <h3 className={`font-semibold text-[18px] sm:text-[19px] lg:text-[21px] ${
                    isDark ? "text-white" : "text-[#222B45]"
                  }`}>
                    Tasks
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                    {/* Refresh */}
                    <button
                      onClick={handleRefresh}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-5 md:px-6 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_3px_10px_rgba(72,102,246,0.2)] whitespace-nowrap"
                    >
                      <span>Refresh</span>
                      <RefreshCw className="w-4 h-4 text-white" />
                    </button>

                    {/* New Task */}
                    <button
                      onClick={() => {
                        setEditingTask(null);
                        setShowCreateNewTask(true);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-5 md:px-6 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_3px_10px_rgba(72,102,246,0.2)] whitespace-nowrap"
                    >
                      <span>New Task</span>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* =====================================================
                    METRIC STAT CARDS (2 Cards Row on Tablet, 3 on Laptop/Desktop)
                ===================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-3.5 xl:gap-4 mb-3.5 md:mb-5">
                  {/* Card 1: Upcoming Tasks */}
                  <div
                    onClick={() => handleTabChange("upcoming")}
                    className={`flex items-center gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 rounded-[14px] md:rounded-[16px] border transition-all cursor-pointer w-full ${
                      isDark
                        ? activeTab === "upcoming"
                          ? "border-[#586D93] bg-[#060D1B]"
                          : "border-[#586D93] bg-[#060D1B] hover:border-[#4866F688]"
                        : activeTab === "upcoming"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    {isDark ? (
                      <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#132247] flex items-center justify-center shrink-0">
                        <svg width="22" height="22" viewBox="17 17 36 36" fill="none">
                          <path d="M41 20H29C23 20 20 23 20 29V48.5C20 49.325 20.675 50 21.5 50H41C47 50 50 47 50 41V29C50 23 47 20 41 20ZM33.665 41.99C33.29 42.365 32.6 42.71 32.09 42.785L28.97 43.22C28.85 43.235 28.73 43.25 28.625 43.25C28.1 43.25 27.62 43.07 27.275 42.725C26.855 42.305 26.675 41.69 26.78 41.03L27.215 37.91C27.29 37.4 27.635 36.695 28.01 36.335L33.665 30.68C33.755 30.95 33.875 31.22 34.01 31.52C34.145 31.79 34.28 32.06 34.43 32.315C34.55 32.525 34.685 32.735 34.805 32.885C34.955 33.11 35.105 33.305 35.21 33.41C35.27 33.5 35.33 33.56 35.345 33.59C35.675 33.965 36.02 34.325 36.35 34.595C36.44 34.685 36.5 34.73 36.515 34.745C36.71 34.895 36.89 35.06 37.07 35.165C37.265 35.315 37.475 35.45 37.685 35.57C37.94 35.72 38.21 35.87 38.495 36.005C38.78 36.14 39.05 36.245 39.32 36.335L33.665 41.99ZM41.825 33.845L40.655 35.015C40.58 35.09 40.475 35.135 40.37 35.135C40.34 35.135 40.28 35.135 40.25 35.12C37.67 34.385 35.615 32.33 34.88 29.75C34.835 29.615 34.88 29.465 34.985 29.36L36.17 28.175C38.105 26.24 39.935 26.285 41.825 28.175C42.785 29.135 43.265 30.065 43.25 31.025C43.25 31.97 42.785 32.885 41.825 33.845Z" fill="#4866F6"/>
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={upcomingIcon}
                        alt="Upcoming Tasks"
                        className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                      />
                    )}

                    <div className="flex flex-col min-w-0">
                      <span className={`text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold ${
                        isDark ? "text-white" : "text-[#222B45]"
                      } leading-tight`}>
                        {taskStats.upcoming_count}
                      </span>
                      <span className={`text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] ${
                        isDark ? "text-[#7E8B9F]" : "text-[#586D93]"
                      } font-medium whitespace-nowrap truncate`}>
                        Upcoming Tasks
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Pending Tasks */}
                  <div
                    onClick={() => handleTabChange("pending")}
                    className={`flex items-center gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 rounded-[14px] md:rounded-[16px] border transition-all cursor-pointer w-full ${
                      isDark
                        ? activeTab === "pending"
                          ? "border-[#586D93] bg-[#060D1B]"
                          : "border-[#586D93] bg-[#060D1B] hover:border-[#4866F688]"
                        : activeTab === "pending"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    {isDark ? (
                      <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#132247] flex items-center justify-center shrink-0">
                        <svg width="22" height="22" viewBox="17 17 36 36" fill="none">
                          <path d="M41.285 20H28.715C23.255 20 20 23.255 20 28.715V41.285C20 46.745 23.255 50 28.715 50H41.285C46.745 50 50 46.745 50 41.285V28.715C50 23.255 46.745 20 41.285 20ZM31.955 39.35L28.58 42.725C28.355 42.95 28.07 43.055 27.785 43.055C27.5 43.055 27.2 42.95 26.99 42.725L25.865 41.6C25.415 41.165 25.415 40.445 25.865 40.01C26.3 39.575 27.005 39.575 27.455 40.01L27.785 40.34L30.365 37.76C30.8 37.325 31.505 37.325 31.955 37.76C32.39 38.195 32.39 38.915 31.955 39.35ZM31.955 28.85L28.58 32.225C28.355 32.45 28.07 32.555 27.785 32.555C27.5 32.555 27.2 32.45 26.99 32.225L25.865 31.1C25.415 30.665 25.415 29.945 25.865 29.51C26.3 29.075 27.005 29.075 27.455 29.51L27.785 29.84L30.365 27.26C30.8 26.825 31.505 26.825 31.955 27.26C32.39 27.695 32.39 28.415 31.955 28.85ZM43.34 41.93H35.465C34.85 41.93 34.34 41.42 34.34 40.805C34.34 40.19 34.85 39.68 35.465 39.68H43.34C43.97 39.68 44.465 40.19 44.465 40.805C44.465 41.42 43.97 41.93 43.34 41.93ZM43.34 31.43H35.465C34.85 31.43 34.34 30.92 34.34 30.305C34.34 29.69 34.85 29.18 35.465 29.18H43.34C43.97 29.18 44.465 29.69 44.465 30.305C44.465 30.92 43.97 31.43 43.34 31.43Z" fill="#4866F6"/>
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={pendingIcon}
                        alt="Pending Tasks"
                        className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                      />
                    )}

                    <div className="flex flex-col min-w-0">
                      <span className={`text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold ${
                        isDark ? "text-white" : "text-[#222B45]"
                      } leading-tight`}>
                        {taskStats.pending_count}
                      </span>
                      <span className={`text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] ${
                        isDark ? "text-[#7E8B9F]" : "text-[#586D93]"
                      } font-medium whitespace-nowrap truncate`}>
                        Pending Tasks
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Completed Tasks */}
                  <div
                    onClick={() => handleTabChange("completed")}
                    className={`flex items-center gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 rounded-[14px] md:rounded-[16px] border transition-all cursor-pointer w-full ${
                      isDark
                        ? activeTab === "completed"
                          ? "border-[#586D93] bg-[#060D1B]"
                          : "border-[#586D93] bg-[#060D1B] hover:border-[#4866F688]"
                        : activeTab === "completed"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    {isDark ? (
                      <div className="w-[42px] h-[42px] sm:w-[46px] sm:h-[46px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#132247] flex items-center justify-center shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="6.5" fill="#4866F6" />
                          <path
                            d="M6.5 12.5L10 16L17.5 8.5"
                            stroke="#000000"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <img
                        src={completedIcon}
                        alt="Completed Tasks"
                        className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                      />
                    )}

                    <div className="flex flex-col min-w-0">
                      <span className={`text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold ${
                        isDark ? "text-white" : "text-[#222B45]"
                      } leading-tight`}>
                        {taskStats.completed_count}
                      </span>
                      <span className={`text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] ${
                        isDark ? "text-[#7E8B9F]" : "text-[#586D93]"
                      } font-medium whitespace-nowrap truncate`}>
                        Completed tasks
                      </span>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    SECONDARY SUBTAB FILTER BAR (With Top Line)
                ===================================================== */}
                <div className={`w-full border-t ${isDark ? "border-[#586D93]" : "border-[#E8E8E8]"} pt-3.5 md:pt-4 lg:pt-5 mb-3.5 md:mb-5`}>
                  <div className={`w-full ${
                    isDark ? "bg-[#0B1426] border-[#586D93]" : "bg-white border-[#E8E8E8]"
                  } border p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]`}>
                    <div className="flex items-center w-full min-w-max sm:min-w-0">
                      <button
                        onClick={() => handleTabChange("upcoming")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "upcoming"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : isDark ? "text-[#7E8B9F] hover:text-[#4866F6]" : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Upcoming Task
                      </button>

                      <button
                        onClick={() => handleTabChange("pending")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "pending"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : isDark ? "text-[#7E8B9F] hover:text-[#4866F6]" : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Pending Task
                      </button>

                      <button
                        onClick={() => handleTabChange("completed")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "completed"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : isDark ? "text-[#7E8B9F] hover:text-[#4866F6]" : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Completed Task
                      </button>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    SECTION HEADING (With Bottom Line)
                ===================================================== */}
                <div className={`pb-2.5 md:pb-3 border-b ${isDark ? "border-[#586D93]" : "border-[#E8E8E8]"} mb-3.5 md:mb-4`}>
                  <h4 className={`font-semibold text-[15px] sm:text-[16px] md:text-[16.5px] lg:text-[17px] ${
                    isDark ? "text-white" : "text-[#222B45]"
                  }`}>
                    {activeTab === "pending"
                      ? "Pending Tasks"
                      : activeTab === "upcoming"
                      ? "Upcoming Tasks"
                      : "Completed Tasks"}
                  </h4>
                </div>

                {/* =====================================================
                    TASK CARDS GRID (2 Cards Row on Tablet, 3 on Laptop/Desktop)
                ===================================================== */}
                {loading ? (
                  <div className="flex justify-center items-center py-16">
                    <span className="w-8 h-8 border-4 border-[#4866F6] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : displayTasks.length === 0 ? (
                  <div className={`flex flex-col items-center justify-center py-16 ${isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"}`}>
                    <p className="text-base font-medium">
                      No tasks found in this tab.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3.5 lg:gap-3.5 xl:gap-4">
                    {displayTasks.map((task, idx) => {
                      const isCardSelected = selectedTaskId
                        ? task.id === selectedTaskId
                        : idx === 0;
                      const priorityLower = (
                        task.priority || "medium"
                      ).toLowerCase();
                      const statusLower = (
                        task.status || "pending"
                      ).toLowerCase();

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTaskId(task.id)}
                          className={`rounded-[16px] md:rounded-[18px] ${
                            isDark ? "bg-[#060D1B]" : "bg-white"
                          } p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 flex flex-col justify-between transition-all cursor-pointer w-full min-w-0 ${
                            isDark
                              ? "border border-[#586D93] hover:border-[#4866F688]"
                              : isCardSelected
                              ? "border-2 border-[#4866F6] shadow-[0px_4px_16px_rgba(72,102,246,0.12)]"
                              : "border border-[#E8E8E8] shadow-xs hover:border-[#4866F688]"
                          }`}
                        >
                          <div>
                            {/* Title */}
                            <h5 className={`font-semibold text-[12.5px] sm:text-[13px] md:text-[13px] lg:text-[13.5px] xl:text-[15.5px] ${
                              isDark ? "text-white" : "text-[#222B45]"
                            } mb-1.5 md:mb-2 truncate leading-snug`}>
                              {task.fullTitle || `${idx + 1}.${task.title}`}
                            </h5>

                            {/* Assigned */}
                            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-2.5 h-[24px] md:h-[26px]">
                              {isDark ? (
                                <div className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] rounded-full border border-[#4866F6]/40 bg-[#132247] flex items-center justify-center text-[#4866F6] shrink-0">
                                  <User className="w-3 h-3 text-[#4866F6]" />
                                </div>
                              ) : (
                                <img
                                  src={profileIcon}
                                  alt="Assigned"
                                  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] object-contain shrink-0"
                                />
                              )}
                              <span className={`text-[10px] sm:text-[11px] md:text-[11px] lg:text-[11.5px] xl:text-[12.5px] ${
                                isDark ? "text-white" : "text-[#8898AA]"
                              } shrink-0`}>
                                Assigned :{" "}
                              </span>
                              <span className={`text-[10px] sm:text-[11px] md:text-[11px] lg:text-[11.5px] xl:text-[12.5px] font-semibold ${
                                isDark ? "text-[#6882B8]" : "text-[#222B45]"
                              } truncate`}>
                                {task.assigned || "Self"}
                              </span>
                            </div>

                            {/* Badges + Reminder Bell */}
                            <div className="min-h-[30px] md:min-h-[32px] lg:min-h-[36px] flex items-center justify-between gap-1 md:gap-1.5 mb-2 md:mb-2.5 flex-nowrap w-full">
                              <div className="flex items-center gap-1 md:gap-1.5 shrink-0 flex-nowrap">
                                {/* Status Badge */}
                                <span
                                  className={getStatusBadgeProps(task.status, isDark).className}
                                  style={getStatusBadgeProps(task.status, isDark).style}
                                >
                                  {task.status || "Pending"}
                                </span>

                                {/* Priority Badge */}
                                <span
                                  className={getPriorityBadgeProps(task.priority, isDark).badgeClass}
                                  style={getPriorityBadgeProps(task.priority, isDark).badgeStyle}
                                >
                                  <span
                                    className={getPriorityBadgeProps(task.priority, isDark).dotClass}
                                    style={getPriorityBadgeProps(task.priority, isDark).dotStyle}
                                  />
                                  {task.priority || "Medium"}
                                </span>
                              </div>

                              {/* Notification Symbol using notify.png: ONLY in Pending task tab & when due within 24 hours */}
                              {activeTab === "pending" &&
                                statusLower !== "completed" &&
                                task.actionState !== "Completed" &&
                                task.buttonText !== "Completed" &&
                                isTaskDueWithin24Hours(task) && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      showToast("Task is due within 24 hours");
                                    }}
                                    className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] xl:w-[38px] xl:h-[38px] flex items-center justify-center shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 ml-auto"
                                    title="Task is due within 24 hours"
                                  >
                                    <img
                                      src={notifyIcon}
                                      alt="Notification"
                                      className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] xl:w-[38px] xl:h-[38px] object-contain"
                                    />
                                  </button>
                                )}
                            </div>

                            {/* Date and Time */}
                            <div className={`border-t border-b ${
                              isDark ? "border-[#586D93] text-[#7E8B9F]" : "border-[#F0F0F0] text-[#586D93]"
                            } py-1.5 md:py-2 lg:py-2 my-1.5 md:my-2 flex items-center justify-between text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs font-medium`}>
                              <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
                                {isDark ? (
                                  <CalendarIconSvg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 shrink-0" />
                                ) : (
                                  <img
                                    src={calendarIcon}
                                    alt="Calendar"
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 object-contain shrink-0"
                                  />
                                )}
                                <span className="whitespace-nowrap">{task.dueDate || "15 - 07 - 2026"}</span>
                              </div>
                              <div className={`flex items-center gap-1 shrink-0 ${isDark ? "text-[#7E8B9F]" : "text-[#586D93]"}`}>
                                <Clock className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 ${
                                  isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"
                                } shrink-0`} />
                                <span className="whitespace-nowrap">{task.dueTime || "10:30 AM"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-1.5 md:gap-2 mt-1.5 w-full">
                            {/* View Details */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(task);
                              }}
                              className="w-full h-[34px] sm:h-[36px] md:h-[36px] lg:h-[38px] xl:h-[42px] px-3 md:px-3.5 lg:px-4 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold flex items-center justify-between shadow-sm transition-all cursor-pointer"
                            >
                              <span>View Details</span>
                              <ArrowRight className="w-4 h-4 text-white shrink-0" />
                            </button>

                            {/* Status Action Button (Only in Pending tab) */}
                            {activeTab === "pending" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleTaskAction(task);
                                }}
                                className="w-full h-[32px] sm:h-[34px] md:h-[34px] lg:h-[36px] xl:h-[40px] rounded-[10px] bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold flex items-center justify-center shadow-sm transition-all cursor-pointer"
                              >
                                {task.buttonText ||
                                  task.actionState ||
                                  "InProgress"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div
          className={`fixed bottom-[25vh] right-6 z-[10000]
            flex items-center gap-2
            px-5 py-3 rounded-xl shadow-lg
            text-sm font-medium
            transition-all duration-200 ease-out
            ${
              successMessage === "Task deleted successfully"
                ? "bg-red-50 border border-red-200 text-red-600"
                : "bg-green-50 border border-green-200 text-green-600"
            }
            ${
              showSuccess
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          <Check className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* TASK DETAILS POPUP */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3.5 sm:p-4">
          <div className={`w-full max-w-[340px] sm:max-w-[540px] md:max-w-[720px] ${
            isDark ? "bg-[#060D1B] border border-[#1E283D]" : "bg-white"
          } rounded-[24px] shadow-2xl p-4 sm:p-6 md:p-8 relative flex flex-col gap-3 sm:gap-5 animate-in fade-in zoom-in-95 duration-150`}>
            {/* Red circular close button at top-right */}
            <button
              onClick={() => setShowTaskDetails(false)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-6 h-6 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Modal Title */}
            <div className={`w-full text-center pb-2.5 sm:pb-1 border-b ${isDark ? "border-[#586D93]" : "border-[#E8E8E8]"} sm:border-0`}>
              <h3 className="text-[19px] sm:text-[22px] font-bold text-[#4866F6]">
                Task Details
              </h3>
            </div>

            {/* Inner Card with Blue Border */}
            <div className={`border ${
              isDark ? "border-[#586D93] bg-[#0B1426]" : "border-[#4866F6] bg-white sm:bg-[#4866F61A]"
            } rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-5 md:p-6 flex flex-col gap-2.5 sm:gap-3.5 shadow-[0px_0px_6px_rgba(72,102,246,0.08)]`}>
              {/* Top Row: Review Icon, Title, Description, (Desktop Badges) */}
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <img
                    src={reviewIcon}
                    alt="Task Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-[14px] sm:text-[16px] font-semibold ${
                      isDark ? "text-white" : "text-[#222B45]"
                    } leading-snug`}>
                      {selectedTask.title || selectedTask.fullTitle}
                    </h4>
                    <p className={`text-[11px] sm:text-[12px] ${
                      isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"
                    } mt-0.5 sm:mt-1 leading-normal break-words max-w-[340px] sm:max-w-[360px]`}>
                      {selectedTask.description ||
                        "Review Sprint 10 progress and completed work. Discuss feedback, pending tasks, and next steps."}
                    </p>
                  </div>
                </div>

                {/* Status & Priority Badges (Desktop Only) */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span
                    className={getStatusBadgeProps(selectedTask.status, isDark).className}
                    style={getStatusBadgeProps(selectedTask.status, isDark).style}
                  >
                    {selectedTask.status || "Upcoming"}
                  </span>
                  <span
                    className={getPriorityBadgeProps(selectedTask.priority, isDark).badgeClass}
                    style={getPriorityBadgeProps(selectedTask.priority, isDark).badgeStyle}
                  >
                    <span
                      className={getPriorityBadgeProps(selectedTask.priority, isDark).dotClass}
                      style={getPriorityBadgeProps(selectedTask.priority, isDark).dotStyle}
                    />
                    <span className="capitalize">
                      {selectedTask.priority || "High"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Platform Row */}
              <div className="text-[12px] sm:text-[13px] mt-0.5">
                <span className={`font-semibold sm:font-bold ${isDark ? "text-white" : "text-[#222B45]"}`}>Platform : </span>
                <span className={`${isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"} font-normal`}>
                  {selectedTask.platform || "Trello"}
                </span>
              </div>

              {/* Due Date & Time */}
              <div className="mt-0.5 sm:mt-1.5">
                <h5 className={`text-[12px] sm:text-[13px] font-semibold sm:font-bold ${isDark ? "text-white" : "text-[#222B45]"} mb-1 sm:mb-1.5`}>
                  Due Date & Time
                </h5>
                <div className={`flex items-center justify-start gap-6 sm:gap-8 text-[11.5px] sm:text-[13px] ${isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"}`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {isDark ? (
                      <CalendarIconSvg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    ) : (
                      <img
                        src={calendarIcon}
                        alt="Calendar"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain opacity-70"
                      />
                    )}
                    <span>{selectedTask.dueDate || "15 - 07 - 2026"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? "text-[#7E8B9F]" : "text-[#8898AA]"}`} />
                    <span>{selectedTask.dueTime || "10:30 AM"}</span>
                  </div>
                </div>
              </div>

              {/* Status & Priority Badges (Mobile Only: Stacked Full-Width Rounded Badges) */}
              <div className="flex sm:hidden flex-col gap-2 mt-0.5">
                {/* Status Badge */}
                <div
                  className="w-full text-center py-1.5 rounded-[10px] text-xs font-semibold capitalize flex items-center justify-center"
                  style={getStatusBadgeProps(selectedTask.status, isDark).style}
                >
                  {selectedTask.status || "Upcoming"}
                </div>

                {/* Priority Badge */}
                <div
                  className="w-full text-center py-1.5 rounded-[10px] text-xs font-semibold capitalize flex items-center justify-center gap-1.5"
                  style={getPriorityBadgeProps(selectedTask.priority, isDark).badgeStyle}
                >
                  <span
                    className={getPriorityBadgeProps(selectedTask.priority, isDark).dotClass}
                    style={getPriorityBadgeProps(selectedTask.priority, isDark).dotStyle}
                  />
                  <span>{selectedTask.priority || "High"}</span>
                </div>
              </div>

              {/* Edit and Delete Buttons Row */}
              <div className="flex items-center gap-2.5 sm:gap-3 mt-1 sm:mt-2 sm:justify-end">
                {selectedTask.status?.toLowerCase() !== "completed" && (
                  <button
                    onClick={() => {
                      setEditingTask(selectedTask);
                      setShowTaskDetails(false);
                      setShowCreateNewTask(true);
                    }}
                    className="flex-1 sm:flex-initial h-[38px] sm:h-[36px] px-5 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-xs sm:text-sm font-semibold sm:font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <span>Edit</span>
                    <img
                      src={EditWhiteIcon}
                      alt="Edit"
                      className="w-3.5 h-3.5 object-contain"
                    />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(selectedTask.id)}
                  className={`w-[38px] h-[38px] sm:w-[36px] sm:h-[36px] rounded-[10px] border border-[#FF4D4F] ${
                    isDark ? "bg-[#0B1426] hover:bg-red-950/40" : "bg-white hover:bg-red-50"
                  } flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs`}
                >
                  <img
                    src={deleteSvgIcon}
                    alt="Delete"
                    className="w-4 h-4 object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Bottom Action Button Outside Inner Card */}
            {selectedTask.status?.toLowerCase() !== "completed" && (
              <div className="w-full sm:w-auto sm:flex sm:justify-end pt-0.5">
                <button
                  onClick={() => handleCompleteTask(selectedTask.id)}
                  className="w-full sm:w-auto h-[42px] sm:px-8 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-sm font-semibold shadow-[0_4px_12px_rgba(72,102,246,0.3)] hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
                >
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}