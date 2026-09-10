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
} from "lucide-react";

import upcomingIcon from "../../../assets/images/upcoming.png";
import pendingIcon from "../../../assets/images/pending.png";
import completedIcon from "../../../assets/images/completed.png";
import calendarIcon from "../../../assets/images/calender.svg";
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
  // STATE
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

  // If languageOpen is coming from your parent/layout context,
  // this will safely get it without causing an error.
  const outletContext = useOutletContext();

  const languageOpen = outletContext?.languageOpen ?? false;

  // =========================================================
  // FETCH TASKS
  // =========================================================

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
    } catch (error) {
      console.error("Failed to fetch tasks:", error);

      setError(
        typeof error === "string"
          ? error
          : error?.message || "Failed to fetch tasks"
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

      console.log("Task Details:", response);

      // Keep the original card task for existing edit/delete actions
      setSelectedTask(task);

      // Store the API response for displaying details
      setTaskDetails(response);

      // Open popup only after API response is received
      setShowTaskDetails(true);
    } catch (error) {
      console.error("Failed to fetch task details:", error);
    } finally {
      setTaskDetailsLoading(false);
    }
  };

  // =========================================================
  // INITIAL FETCH / TAB CHANGE
  // =========================================================

  useEffect(() => {
    fetchTasks(activeTab);
  }, [activeTab]);

  // =========================================================
  // TAB CHANGE
  // =========================================================

  const handleTabChange = (tab) => {
    setShowCreateNewTask(false);
    setActiveTab(tab);
  };

  const getFilteredTasks = () => {
    return tasks;
  };

  const upcomingCount = taskStats.upcoming_count;
  const pendingCount = taskStats.pending_count;
  const completedCount = taskStats.completed_count;

  // =========================================================
  // SAVE TASK FROM EDIT MODAL
  // =========================================================

  const handleSaveTask = async () => {
  try {
    if (!selectedTask?.id) return;

    const dueDate = formData.dueDate
      ? new Date(formData.dueDate)
      : null;

    const formattedDueDate = dueDate
      ? `${dueDate.getFullYear()}-${String(
          dueDate.getMonth() + 1
        ).padStart(2, "0")}-${String(
          dueDate.getDate()
        ).padStart(2, "0")}`
      : "";

    let hour = Number(formData.dueTimeHH);

    if (formData.dueTimeAmpm === "PM" && hour !== 12) {
      hour += 12;
    }

    if (formData.dueTimeAmpm === "AM" && hour === 12) {
      hour = 0;
    }

    const formattedDueTime = `${String(hour).padStart(
      2,
      "0"
    )}:${String(formData.dueTimeMM).padStart(2, "0")}`;

    const payload = {
  title: formData.title,
  description: formData.description,
  due_date: formattedDueDate,
  due_time: formattedDueTime,
  priority: formData.priority.toUpperCase(),
  reminder_enabled: formData.reminder,
  reminder_minutes_before: formData.reminder ? 30 : 0,
};

    const response = await updateTask(
      selectedTask.id,
      payload
    );

    console.log("Task updated:", response);

    // Update the task shown in the details popup
    setTaskDetails(response);

    // Close edit modal
    setShowCreateModal(false);
    setIsEditing(false);

    // Close details popup if you want it to refresh/reopen
    setShowTaskDetails(false);
    setSelectedTask(null);

    // Fetch latest task data
    await fetchTasks(activeTab);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

  // =========================================================
  // OPEN EDIT
  // =========================================================

  const handleOpenEdit = () => {
    if (!selectedTask) return;

    setEditingTask({
      id: selectedTask.id,
      title: taskDetails?.title || selectedTask.title,
      description: taskDetails?.description || selectedTask.description || "",
      dueDate: taskDetails?.due_date || selectedTask.dueDate || "",
      dueTime: taskDetails?.due_time || selectedTask.dueTime || "",
      assignedTo: taskDetails?.assigned_to_name || selectedTask.assigned || "Self",
      priority: taskDetails?.priority || selectedTask.priority || "High",
      reminder: taskDetails?.reminder_enabled ?? true,
    });

    setShowTaskDetails(false);
    setSelectedTask(null);
    setShowCreateNewTask(true);
  };

  // =========================================================
  // CREATE NEW TASK
  // =========================================================

  const handleCreateTaskSave = async (taskData) => {
    const formattedTime = taskData?.dueTimeHH
      ? `${taskData.dueTimeHH}:${taskData.dueTimeMM} ${taskData.dueTimeAmpm}`
      : taskData?.due_time || "10:30 AM";

    let formattedDate = "05 - 08 - 2026";

    if (taskData?.dueDate || taskData?.due_date) {
      const rawDate = taskData.dueDate || taskData.due_date;
      if (rawDate.includes("-")) {
        const parts = rawDate
          .split("-")
          .map((p) => p.trim());

        if (parts[0].length === 4) {
          // YYYY-MM-DD -> DD - MM - YYYY
          formattedDate = `${parts[2]} - ${parts[1]} - ${parts[0]}`;
        } else {
          // DD-MM-YYYY -> DD - MM - YYYY
          formattedDate = `${parts[0]} - ${parts[1]} - ${parts[2]}`;
        }
      } else {
        formattedDate = rawDate;
      }
    }

    const newTask = {
      id: taskData?.task_id || taskData?.id || Date.now(),
      title: taskData?.title || "",
      description: taskData?.description || "",
      assigned: taskData?.assignedTo || taskData?.assigned_to_name || "Self",
      status:
        activeTab === "completed"
          ? "completed"
          : activeTab === "upcoming"
          ? "upcoming"
          : "pending",
      priority: (taskData?.priority || "medium").toLowerCase(),
      dueDate: formattedDate,
      dueTime: formattedTime,
      buttonText:
        activeTab === "completed"
          ? "View Details"
          : activeTab === "upcoming"
          ? "View Details"
          : "Not Started",
    };

    setTasks((prev) => [newTask, ...prev]);
    setShowCreateNewTask(false);

    try {
      await fetchTasks(activeTab);
    } catch {
      // fallback retained
    }
  };

  // =========================================================
  // DELETE TASK
  // =========================================================

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSelectedTask(null);
  };

  // =========================================================
  // TOGGLE TASK STATUS
  // =========================================================

  const toggleTaskStatus = (task) => {
    const nextStatus =
      task.status === "completed" ? "pending" : "completed";

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? {
              ...t,
              status: nextStatus,
              buttonText:
                nextStatus === "completed"
                  ? "View Details"
                  : "Not Started",
              isCrossListed: false,
            }
          : t
      )
    );

    setSelectedTask(null);
  };

  // =========================================================
  // PENDING BUTTON
  // =========================================================

  const handleTogglePendingButton = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              buttonText:
                t.buttonText === "Not Started"
                  ? "InProgress"
                  : "Not Started",
            }
          : t
      )
    );
  };

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = () => {
    setShowCreateNewTask(false);
    fetchTasks(activeTab);
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div
      className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-4 xl:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${
        languageOpen
          ? "mt-[60px] md:mt-[70px] lg:mt-[80px]"
          : "mt-0"
      }`}
    >
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        {showCreateNewTask ? (
          <CreateNewTask
            taskData={editingTask}
            isEditing={Boolean(editingTask)}
            onCancel={() => {
              setShowCreateNewTask(false);
              setEditingTask(null);
            }}
            onSave={(taskData) => {
              handleCreateTaskSave(taskData);
              setEditingTask(null);
            }}
          />
        ) : (
          <div className="w-full flex-1 rounded-[25px] border border-[#DADADA] bg-white p-4 md:p-6 lg:p-4 xl:p-8 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
            <div className="pb-4 border-b border-[#E8E8E8] mb-5">
              <h2 className="font-semibold text-[20px] md:text-[24px] text-[#3D3D3D]">
                Tasks & Reminders
              </h2>
            </div>

            <div className="flex justify-end mb-6">
              <div className="bg-white border border-[#E8E8E8] p-1 rounded-full flex w-full lg:w-[600px] shrink-0 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                <button className="flex-1 text-center py-2 rounded-full text-sm font-semibold bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)] transition-all cursor-pointer">
                  Tasks
                </button>

                <button className="flex-1 text-center py-2 rounded-full text-sm font-medium text-[#586D93] hover:text-[#4866F6] transition-all cursor-pointer">
                  Reminders
                </button>
              </div>
            </div>

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

              {/* TABS */}

              <div className="w-full mb-6 border-t border-[#E8E8E8] pt-4">
                <div className="w-full bg-[#FAFBFD] border border-[#E8E8E8] p-1.5 rounded-full flex gap-1 overflow-x-auto md:overflow-visible no-scrollbar">
                  <button
                    onClick={() => handleTabChange("upcoming")}
                    className={`shrink-0 min-w-[240px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === "upcoming"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Upcoming Task
                  </button>

                  <button
                    onClick={() => handleTabChange("pending")}
                    className={`shrink-0 min-w-[240px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === "pending"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Pending Task
                  </button>

                  <button
                    onClick={() => handleTabChange("completed")}
                    className={`shrink-0 min-w-[240px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === "completed"
                        ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]"
                        : "text-[#586D93] hover:text-[#4866F6]"
                    }`}
                  >
                    Completed Task
                  </button>
                </div>
              </div>

              <div className="mb-4 border-b border-[#E8E8E8] pb-3">
                <h3 className="font-semibold text-lg text-[#3D3D3D]">
                  {activeTab === "upcoming"
                    ? "Upcoming Tasks"
                    : activeTab === "completed"
                    ? "Completed Tasks"
                    : "Pending Tasks"}
                </h3>
              </div>

              {/* LOADING / ERROR */}

              {loading && (
                <div className="w-full py-8 flex items-center justify-center text-sm text-[#586D93]">
                  Loading tasks...
                </div>
              )}

              {error && !loading && (
                <div className="w-full mb-4 py-3 px-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* TASK CARDS */}

              {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 lg:gap-3 xl:gap-5">
                  {getFilteredTasks().map((task, idx) => (
                    <div
                      key={task.id}
                      className="rounded-[24px] border border-[#E3E3E3] bg-white p-4 lg:p-3.5 xl:p-5 flex flex-col justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0px_4px_18px_rgba(0,0,0,0.06)] transition-all min-h-[250px]"
                    >
                      <div>
                        <h4 className="font-semibold text-[17px] text-[#3D3D3D] line-clamp-1 mb-3">
                          {idx + 1}.{task.title}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-[#4866F61A] flex items-center justify-center flex-shrink-0">
                            <img
                              src={profileIcon}
                              alt="Profile"
                              className="w-3.5 h-3.5"
                            />
                          </div>

                          <span className="text-xs text-[#3D3D3D] font-medium">
                            Assigned :{" "}
                            <span className="text-[#586D93]">
                              {task.assigned}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          {task.status === "upcoming" && (
                            <span className="bg-[#4866F626] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold">
                              Upcoming
                            </span>
                          )}

                          {task.status === "pending" && (
                            <span className="bg-[#F59E0B26] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold">
                              Pending
                            </span>
                          )}

                          {task.status === "completed" && (
                            <span className="bg-[#33B4691A] text-[#33B469] px-3 py-1 rounded-[10px] text-xs font-semibold">
                              Completed
                            </span>
                          )}

                          {task.priority === "high" && (
                            <span className="bg-[#FB000026] text-[#FB0000] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#FB0000]" />
                              High
                            </span>
                          )}

                          {task.priority === "medium" && (
                            <span className="bg-[#F59E0B26] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                              Medium
                            </span>
                          )}

                          {task.priority === "low" && (
                            <span className="bg-[#4866F626] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#4866F6]" />
                              Low
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full border-t border-[#E8E8E8] my-1" />

                      <div className="flex items-center gap-3 lg:gap-1.5 xl:gap-6 py-2.5 text-[#586D93]">
                        <div className="flex items-center gap-1 sm:gap-2 text-[11px] xl:text-xs font-medium whitespace-nowrap shrink-0">
                          <img
                            src={calendarIcon}
                            alt="Calendar"
                            className="w-3.5 h-3.5"
                          />
                          <span>{task.dueDate}</span>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 text-[11px] xl:text-xs font-medium whitespace-nowrap shrink-0">
                          <Clock className="w-3.5 h-3.5 text-[#586D93]" />
                          <span>{task.dueTime}</span>
                        </div>
                      </div>

                      <div className="w-full border-t border-[#E8E8E8] my-1" />

                      <div className="pt-2">
                        {activeTab === "pending" &&
                        (task.buttonText === "InProgress" ||
                          task.buttonText === "Not Started") ? (
                          <button
                            onClick={() =>
                              handleTogglePendingButton(task.id)
                            }
                            className="w-full py-2.5 bg-[#4866F6] hover:bg-[#3554ED] text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-[0px_4px_10px_rgba(72,102,246,0.15)]"
                          >
                            <span>{task.buttonText}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleViewDetails(task)}
                            className="w-full py-2.5 bg-[#4866F6] hover:bg-[#3554ED] text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-[0px_4px_10px_rgba(72,102,246,0.15)]"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {getFilteredTasks().length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-[#E3E3E3]">
                      <span className="text-[#586D93] text-sm">
                        No tasks in this section yet.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          TASK DETAILS MODAL
      ===================================================== */}

      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[620px] bg-white rounded-[25px] border border-[#DADADA] px-4 sm:px-8 py-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="relative border-b border-[#E8E8E8] pb-4 mb-5 flex items-center justify-center w-full">
              <h3 className="font-bold text-[22px] text-[#4866F6] text-center w-full">
                Task Details
              </h3>

              <button
                onClick={() => {
                  setShowTaskDetails(false);
                  setSelectedTask(null);
                }}
                className="absolute right-0 top-0.5 w-6 h-6 rounded-full bg-[#F0343D] hover:bg-[#D92D36] flex items-center justify-center text-white transition-all cursor-pointer border-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-[20px] border border-[#4866F6] bg-[#EEF2FF] p-5 mb-6 flex flex-col gap-5 sm:gap-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 bg-[#4866F6] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <img
                      src={PendingIcon}
                      alt="Pending"
                      className="w-6 h-6 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[16px] text-[#3D3D3D] leading-snug">
                      {selectedTask.title}
                    </h4>

                    <p className="text-[12px] text-[#586D93] leading-normal mt-1">
                      {selectedTask.description ||
                        "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  {selectedTask.status === "upcoming" && (
                    <span className="bg-[#4866F61D] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold">
                      Upcoming
                    </span>
                  )}

                  {selectedTask.status === "pending" && (
                    <span className="bg-[#F59E0B20] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold">
                      Pending
                    </span>
                  )}

                  {selectedTask.status === "completed" && (
                    <span className="bg-[#33B4691C] text-[#33B469] px-3 py-1 rounded-[10px] text-xs font-semibold">
                      Completed
                    </span>
                  )}

                  {selectedTask.priority === "high" && (
                    <span className="bg-[#FB000018] text-[#FB0000] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                      High
                    </span>
                  )}

                  {selectedTask.priority === "medium" && (
                    <span className="bg-[#F59E0B18] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      Medium
                    </span>
                  )}

                  {selectedTask.priority === "low" && (
                    <span className="bg-[#4866F61A] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4866F6]" />
                      Low
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[14px] text-[#3D3D3D] font-bold">
                    Due Date & Time
                  </span>

                  <div className="flex items-center gap-5 text-[13px] text-[#586D93] font-medium">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={calendarIcon}
                        alt="Calendar"
                        className="w-4.5 h-4.5"
                      />
                      <span>{selectedTask.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4.5 h-4.5 text-[#586D93]" />
                      <span>{selectedTask.dueTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:hidden flex-col gap-2.5 w-full">
                  {selectedTask.status === "upcoming" && (
                    <span className="w-full text-center bg-[#4866F61D] text-[#4866F6] py-2 rounded-[10px] text-xs font-semibold">
                      Upcoming
                    </span>
                  )}

                  {selectedTask.status === "pending" && (
                    <span className="w-full text-center bg-[#F59E0B20] text-[#F59E0B] py-2 rounded-[10px] text-xs font-semibold">
                      Pending
                    </span>
                  )}

                  {selectedTask.status === "completed" && (
                    <span className="w-full text-center bg-[#33B4691C] text-[#33B469] py-2 rounded-[10px] text-xs font-semibold">
                      Completed
                    </span>
                  )}

                  {selectedTask.priority === "high" && (
                    <span className="w-full text-center bg-[#FB000018] text-[#FB0000] py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FB0000]" />
                      High
                    </span>
                  )}

                  {selectedTask.priority === "medium" && (
                    <span className="w-full text-center bg-[#F59E0B18] text-[#F59E0B] py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                      Medium
                    </span>
                  )}

                  {selectedTask.priority === "low" && (
                    <span className="w-full text-center bg-[#4866F61A] text-[#4866F6] py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4866F6]" />
                      Low
                    </span>
                  )}
                </div>

                <div className="flex w-full sm:w-auto">
                  {selectedTask.status !== "completed" ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleOpenEdit}
                        className="flex-1 sm:flex-initial h-11 sm:h-10 bg-[#4866F6] hover:bg-[#3554ED] text-white px-4 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold cursor-pointer border-none shadow-[0_3px_8px_rgba(72,102,246,0.15)] transition-all"
                      >
                        <span>Edit</span>

                        <img
                          src={EditWhiteIcon}
                          alt="Edit"
                          className="w-3.5 h-3.5 object-contain"
                        />
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteTask(selectedTask.id)
                        }
                        className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                      >
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          className="w-4 h-4 object-contain"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        handleDeleteTask(selectedTask.id)
                      }
                      className="w-full sm:w-10 sm:h-10 h-11 rounded-xl border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                    >
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="w-4 h-4 object-contain"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {selectedTask.status !== "completed" && (
              <div className="w-full sm:flex sm:justify-end">
                <button
                  onClick={() => toggleTaskStatus(selectedTask)}
                  className="w-full sm:w-auto px-8 py-2.5 bg-[#4866F6] hover:bg-[#3554ED] text-white rounded-full text-sm font-semibold transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(72,102,246,0.25)] flex items-center justify-center whitespace-nowrap"
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