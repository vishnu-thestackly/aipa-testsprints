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

import {
  getTaskDashboard,
  getTaskDetails,
  deleteTask,
  completeTask,
  updateTask,
} from "../../../api/authApi";

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
const getStatusBadgeProps = (status) => {
  const s = (status || "").toLowerCase();
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
const getPriorityBadgeProps = (priority) => {
  const p = (priority || "").toLowerCase();
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
      setError(
        typeof err === "string" ? err : err?.message || "Failed to fetch tasks"
      );
      setTasks([]);
      setTaskStats({
        upcoming_count: 0,
        pending_count: 0,
        completed_count: 0,
      });
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
        {showCreateNewTask ? (
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
          <div className="w-full flex-1 rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] border border-[#DADADA] bg-white p-3 sm:p-4 md:p-4 lg:p-4 xl:p-6 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="pb-3 md:pb-3.5 border-b border-[#E8E8E8] mb-3.5 md:mb-4">
              <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[22px] xl:text-[24px] text-[#3D3D3D]">
                Tasks & Reminders
              </h2>
            </div>

            {/* =====================================================
                MAIN TAB SWITCH (Right aligned extending to the end)
            ===================================================== */}
            <div className="w-full mb-3.5 md:mb-4 flex justify-center sm:justify-end">
              <div className="w-full max-w-full sm:max-w-[540px] md:max-w-[640px] lg:max-w-[720px] xl:max-w-[820px] bg-white border border-[#E8E8E8] p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center w-full min-w-max sm:min-w-0">
                  <button
                    onClick={() => setMainTab("tasks")}
                    className={`flex-1 text-center py-2 sm:py-2.5 md:py-2.5 lg:py-3 xl:py-3 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[15px] font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[130px] sm:min-w-0 ${
                      mainTab === "tasks"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Tasks
                  </button>

                  <button
                    onClick={() => setMainTab("reminders")}
                    className={`flex-1 text-center py-2 sm:py-2.5 md:py-2.5 lg:py-3 xl:py-3 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full text-xs sm:text-[13px] md:text-[13.5px] lg:text-[14px] xl:text-[15px] font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[130px] sm:min-w-0 ${
                      mainTab === "reminders"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : "text-[#586D93] hover:text-[#4866F6]"
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
                        className="w-full h-8.5 sm:h-9 md:h-9 lg:h-9.5 xl:h-10 pl-3.5 pr-9 rounded-[10px] border border-[#DADADA] text-xs md:text-[13px] text-[#3D3D3D] placeholder-[#8898AA] focus:outline-none focus:border-[#4866F6] transition-colors"
                      />
                      <Search className="w-3.5 h-3.5 text-[#8898AA] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Add Reminder */}
                    <button
                      onClick={() => {
                        showToast("Add reminder form coming soon");
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 h-8.5 sm:h-9 md:h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-4 md:px-5 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-xs md:text-xs lg:text-xs xl:text-sm shadow-[0_4px_10px_rgba(72,102,246,0.25)] whitespace-nowrap"
                    >
                      <span>Add Reminder</span>
                      <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Reminders Subtabs */}
                <div className="w-full mb-4 md:mb-5">
                  <div className="w-full bg-white border border-[#E8E8E8] p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
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
                                <span className="bg-[#4866F61D] text-[#4866F6] px-2 sm:px-2.5 py-0.5 rounded-[6px] text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold">
                                  Upcoming
                                </span>
                              )}
                              {statusLower === "pending" && (
                                <span className="bg-[#F59E0B20] text-[#F59E0B] px-2 sm:px-2.5 py-0.5 rounded-[6px] text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold">
                                  Pending
                                </span>
                              )}
                              {statusLower === "completed" && (
                                <span className="bg-[#33B4691C] text-[#33B469] px-2 sm:px-2.5 py-0.5 rounded-[6px] text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold">
                                  Completed
                                </span>
                              )}

                              {priorityLower === "high" && (
                                <span className="bg-[#FB000018] text-[#FB0000] px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                                  High
                                </span>
                              )}
                              {priorityLower === "medium" && (
                                <span className="bg-[#F59E0B18] text-[#F59E0B] px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                  Medium
                                </span>
                              )}
                              {priorityLower === "low" && (
                                <span className="bg-[#4866F61A] text-[#4866F6] px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#4866F6]" />
                                  Low
                                </span>
                              )}
                            </div>

                            <div className="border-t border-b border-[#E8E8E8] py-1.5 md:py-2 my-2 grid grid-cols-2 items-center text-[#586D93] text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-medium">
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
                                  showToast("Edit reminder");
                                }}
                                className="flex-1 h-[32px] sm:h-[34px] md:h-[36px] px-3 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
                        className="rounded-[16px] md:rounded-[18px] bg-white p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 border border-[#E8E8E8] shadow-[0px_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:border-[#4866F688] transition-all min-h-[230px]"
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
                              <span className="bg-[#FB000018] text-[#FB0000] px-2 sm:px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                                {reminder.priority}
                              </span>
                            </div>
                          )}

                          <div className="border-t border-b border-[#E8E8E8] py-1.5 md:py-2 my-2 grid grid-cols-2 items-center text-[#586D93] text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-xs font-medium">
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
              <div className="w-full flex-1 rounded-[16px] md:rounded-[18px] lg:rounded-[20px] border border-[#DADADA] bg-white p-3 sm:p-3.5 md:p-3.5 lg:p-4 xl:p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] flex flex-col mt-1">
                {/* Tasks Header: Title & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-3.5 md:pb-4 border-b border-[#E8E8E8] mb-4 md:mb-5">
                  <h3 className="font-semibold text-[18px] sm:text-[19px] lg:text-[21px] text-[#222B45]">
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
                      activeTab === "upcoming"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    <img
                      src={upcomingIcon}
                      alt="Upcoming Tasks"
                      className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                    />

                    <div className="flex flex-col min-w-0">
                      <span className="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold text-[#222B45] leading-tight">
                        {taskStats.upcoming_count}
                      </span>
                      <span className="text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] text-[#586D93] font-medium whitespace-nowrap truncate">
                        Upcoming Tasks
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Pending Tasks */}
                  <div
                    onClick={() => handleTabChange("pending")}
                    className={`flex items-center gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 rounded-[14px] md:rounded-[16px] border transition-all cursor-pointer w-full ${
                      activeTab === "pending"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    <img
                      src={pendingIcon}
                      alt="Pending Tasks"
                      className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                    />

                    <div className="flex flex-col min-w-0">
                      <span className="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold text-[#222B45] leading-tight">
                        {taskStats.pending_count}
                      </span>
                      <span className="text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] text-[#586D93] font-medium whitespace-nowrap truncate">
                        Pending Tasks
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Completed Tasks */}
                  <div
                    onClick={() => handleTabChange("completed")}
                    className={`flex items-center gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4 p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 rounded-[14px] md:rounded-[16px] border transition-all cursor-pointer w-full ${
                      activeTab === "completed"
                        ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_14px_rgba(72,102,246,0.08)]"
                        : "border-[#E8E8E8] bg-white hover:border-[#4866F688]"
                    }`}
                  >
                    <img
                      src={completedIcon}
                      alt="Completed Tasks"
                      className="w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] md:w-[42px] md:h-[42px] lg:w-[44px] lg:h-[44px] xl:w-[52px] xl:h-[52px] object-contain shrink-0"
                    />

                    <div className="flex flex-col min-w-0">
                      <span className="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px] xl:text-[26px] font-bold text-[#222B45] leading-tight">
                        {taskStats.completed_count}
                      </span>
                      <span className="text-[10.5px] sm:text-[11.5px] md:text-xs lg:text-[12px] xl:text-[13.5px] text-[#586D93] font-medium whitespace-nowrap truncate">
                        Completed tasks
                      </span>
                    </div>
                  </div>
                </div>

                {/* =====================================================
                    SECONDARY SUBTAB FILTER BAR (With Top Line)
                ===================================================== */}
                <div className="w-full border-t border-[#E8E8E8] pt-3.5 md:pt-4 lg:pt-5 mb-3.5 md:mb-5">
                  <div className="w-full bg-white border border-[#E8E8E8] p-1 rounded-full overflow-x-auto scrollbar-hide shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center w-full min-w-max sm:min-w-0">
                      <button
                        onClick={() => handleTabChange("upcoming")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "upcoming"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Upcoming Task
                      </button>

                      <button
                        onClick={() => handleTabChange("pending")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "pending"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : "text-[#586D93] hover:text-[#4866F6]"
                        }`}
                      >
                        Pending Task
                      </button>

                      <button
                        onClick={() => handleTabChange("completed")}
                        className={`flex-1 text-center py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-2.5 px-2.5 sm:px-3 md:px-3 lg:px-4 rounded-full text-[11px] sm:text-xs md:text-xs lg:text-[12.5px] xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-w-[100px] sm:min-w-0 ${
                          activeTab === "completed"
                            ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                            : "text-[#586D93] hover:text-[#4866F6]"
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
                <div className="pb-2.5 md:pb-3 border-b border-[#E8E8E8] mb-3.5 md:mb-4">
                  <h4 className="font-semibold text-[15px] sm:text-[16px] md:text-[16.5px] lg:text-[17px] text-[#222B45]">
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
                  <div className="flex flex-col items-center justify-center py-16 text-[#8898AA]">
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
                          className={`rounded-[16px] md:rounded-[18px] bg-white p-2.5 sm:p-3 md:p-3 lg:p-3.5 xl:p-4.5 flex flex-col justify-between transition-all cursor-pointer w-full min-w-0 ${
                            isCardSelected
                              ? "border-2 border-[#4866F6] shadow-[0px_4px_16px_rgba(72,102,246,0.12)]"
                              : "border border-[#E8E8E8] shadow-xs hover:border-[#4866F688]"
                          }`}
                        >
                          <div>
                            {/* Title */}
                            <h5 className="font-semibold text-[12.5px] sm:text-[13px] md:text-[13px] lg:text-[13.5px] xl:text-[15.5px] text-[#222B45] mb-1.5 md:mb-2 truncate leading-snug">
                              {task.fullTitle || `${idx + 1}.${task.title}`}
                            </h5>

                            {/* Assigned */}
                            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-2.5 h-[24px] md:h-[26px]">
                              <img
                                src={profileIcon}
                                alt="Assigned"
                                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px] object-contain shrink-0"
                              />
                              <span className="text-[10px] sm:text-[11px] md:text-[11px] lg:text-[11.5px] xl:text-[12.5px] text-[#8898AA] shrink-0">
                                Assigned :{" "}
                              </span>
                              <span className="text-[10px] sm:text-[11px] md:text-[11px] lg:text-[11.5px] xl:text-[12.5px] font-semibold text-[#222B45] truncate">
                                {task.assigned || "Self"}
                              </span>
                            </div>

                            {/* Badges + Reminder Bell */}
                            <div className="min-h-[30px] md:min-h-[32px] lg:min-h-[36px] flex items-center justify-between gap-1 md:gap-1.5 mb-2 md:mb-2.5 flex-nowrap w-full">
                              <div className="flex items-center gap-1 md:gap-1.5 shrink-0 flex-nowrap">
                                {/* Status Badge */}
                                <span
                                  className={getStatusBadgeProps(task.status).className}
                                  style={getStatusBadgeProps(task.status).style}
                                >
                                  {task.status || "Pending"}
                                </span>

                                {/* Priority Badge */}
                                <span
                                  className={getPriorityBadgeProps(task.priority).badgeClass}
                                  style={getPriorityBadgeProps(task.priority).badgeStyle}
                                >
                                  <span
                                    className={getPriorityBadgeProps(task.priority).dotClass}
                                    style={getPriorityBadgeProps(task.priority).dotStyle}
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
                            <div className="border-t border-b border-[#F0F0F0] py-1.5 md:py-2 lg:py-2 my-1.5 md:my-2 flex items-center justify-between text-[9.5px] sm:text-[10px] md:text-[10px] lg:text-[10.5px] xl:text-xs text-[#586D93] font-medium">
                              <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
                                <img
                                  src={calendarIcon}
                                  alt="Calendar"
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 object-contain shrink-0"
                                />
                                <span className="whitespace-nowrap">{task.dueDate || "19 - 08 - 2026"}</span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0 text-[#586D93]">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 lg:w-3.5 lg:h-3.5 text-[#8898AA] shrink-0" />
                                <span className="whitespace-nowrap">{task.dueTime || "12:30 AM"}</span>
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
                              <img
                                src={arrowRightIcon}
                                alt="Arrow"
                                className="w-[13px] h-[13px] md:w-[14px] md:h-[14px] lg:w-[15px] lg:h-[15px] xl:w-[16px] xl:h-[16px] object-contain brightness-0 invert shrink-0"
                              />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3.5 sm:p-4">
          <div className="w-full max-w-[340px] sm:max-w-[540px] md:max-w-[720px] bg-white rounded-[24px] shadow-2xl p-4 sm:p-6 md:p-8 relative flex flex-col gap-3 sm:gap-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Red circular close button at top-right */}
            <button
              onClick={() => setShowTaskDetails(false)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-6 h-6 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Modal Title */}
            <div className="w-full text-center pb-2.5 sm:pb-1 border-b border-[#E8E8E8] sm:border-0">
              <h3 className="text-[19px] sm:text-[22px] font-bold text-[#4866F6]">
                Task Details
              </h3>
            </div>

            {/* Inner Card with Blue Border */}
            <div className="border border-[#4866F6] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-5 md:p-6 bg-white sm:bg-[#4866F61A] flex flex-col gap-2.5 sm:gap-3.5 shadow-[0px_0px_6px_rgba(72,102,246,0.08)]">
              {/* Top Row: Review Icon, Title, Description, (Desktop Badges) */}
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                  <img
                    src={reviewIcon}
                    alt="Task Icon"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] sm:text-[16px] font-semibold text-[#222B45] leading-snug">
                      {selectedTask.title || selectedTask.fullTitle}
                    </h4>
                    <p className="text-[11px] sm:text-[12px] text-[#8898AA] mt-0.5 sm:mt-1 leading-normal break-words">
                      {selectedTask.description ||
                        "Review Sprint 10 progress and completed work. Discuss feedback, pending tasks, and next steps."}
                    </p>
                  </div>
                </div>

                {/* Status & Priority Badges (Desktop Only) */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span
                    className={getStatusBadgeProps(selectedTask.status).className}
                    style={getStatusBadgeProps(selectedTask.status).style}
                  >
                    {selectedTask.status || "Upcoming"}
                  </span>
                  <span
                    className={getPriorityBadgeProps(selectedTask.priority).badgeClass}
                    style={getPriorityBadgeProps(selectedTask.priority).badgeStyle}
                  >
                    <span
                      className={getPriorityBadgeProps(selectedTask.priority).dotClass}
                      style={getPriorityBadgeProps(selectedTask.priority).dotStyle}
                    />
                    <span className="capitalize">
                      {selectedTask.priority || "High"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Platform Row */}
              <div className="text-[12px] sm:text-[13px] mt-0.5">
                <span className="font-semibold sm:font-bold text-[#222B45]">Platform : </span>
                <span className="text-[#8898AA] font-normal">
                  {selectedTask.platform || "Trello"}
                </span>
              </div>

              {/* Due Date & Time */}
              <div className="mt-0.5 sm:mt-1.5">
                <h5 className="text-[12px] sm:text-[13px] font-semibold sm:font-bold text-[#222B45] mb-1 sm:mb-1.5">
                  Due Date & Time
                </h5>
                <div className="flex items-center justify-start gap-6 sm:gap-8 text-[11.5px] sm:text-[13px] text-[#8898AA]">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <img
                      src={calendarIcon}
                      alt="Calendar"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain opacity-70"
                    />
                    <span>{selectedTask.dueDate || "15 - 07 - 2026"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8898AA]" />
                    <span>{selectedTask.dueTime || "10:30 AM"}</span>
                  </div>
                </div>
              </div>

              {/* Status & Priority Badges (Mobile Only: Stacked Full-Width Rounded Badges) */}
              <div className="flex sm:hidden flex-col gap-2 mt-0.5">
                {/* Status Badge */}
                <div
                  className="w-full text-center py-1.5 rounded-[10px] text-xs font-semibold capitalize flex items-center justify-center"
                  style={getStatusBadgeProps(selectedTask.status).style}
                >
                  {selectedTask.status || "Upcoming"}
                </div>

                {/* Priority Badge */}
                <div
                  className="w-full text-center py-1.5 rounded-[10px] text-xs font-semibold capitalize flex items-center justify-center gap-1.5"
                  style={getPriorityBadgeProps(selectedTask.priority).badgeStyle}
                >
                  <span
                    className={getPriorityBadgeProps(selectedTask.priority).dotClass}
                    style={getPriorityBadgeProps(selectedTask.priority).dotStyle}
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
                  className="w-[38px] h-[38px] sm:w-[36px] sm:h-[36px] rounded-[10px] border border-[#FF4D4F] bg-white hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
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