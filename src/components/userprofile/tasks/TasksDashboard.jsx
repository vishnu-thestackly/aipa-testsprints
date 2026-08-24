import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Clock, Plus, RefreshCw, X, Edit2, Trash2, ArrowRight, Check, ChevronLeft } from "lucide-react";

import upcomingIcon from "../../../assets/images/upcoming.png";
import pendingIcon from "../../../assets/images/pending.png";
import completedIcon from "../../../assets/images/completed.png";
import calendarIcon from "../../../assets/images/calender.svg";
import profileIcon from "../../../assets/images/profile.svg";
import PendingIcon from "../../../assets/images/taskdetails.png";
import EditWhiteIcon from "../../../assets/images/editwhite.png";
import DeleteIcon from "../../../assets/images/delete.png";
import CreateNewTask from "./CreateNewTask";

const initialTasks = [
  { id: 1, title: "Project Review Meeting", assigned: "Self", status: "upcoming", priority: "high", dueDate: "15 - 07 - 2026", dueTime: "10:30 AM", description: "Review Sprint 10 Deliverables before Meeting", buttonText: "View Details" },
  { id: 2, title: "Submit Sprint 10 wireframe", assigned: "Team Leader", status: "upcoming", priority: "medium", dueDate: "16 - 07 - 2026", dueTime: "01:30 PM", description: "Prepare and submit the interactive wireframes for Sprint 10", buttonText: "View Details" },
  { id: 3, title: "Project Review Meeting", assigned: "Self", status: "upcoming", priority: "low", dueDate: "15 - 07 - 2026", dueTime: "10:30 AM", description: "Review Sprint 10 Deliverables before Meeting", buttonText: "View Details" },
  ...Array.from({ length: 9 }, (_, i) => ({ id: 10 + i, title: `Upcoming Task Blueprint ${i + 4}`, assigned: i % 2 === 0 ? "Self" : "TL", status: "upcoming", priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low", dueDate: "18 - 07 - 2026", dueTime: "11:00 AM", description: "System testing and deployment preparations", buttonText: "View Details" })),
  { id: 4, title: "Prepare KT Session", assigned: "Self", status: "pending", priority: "medium", dueDate: "19 - 08 - 2026", dueTime: "12:30 AM", description: "Prepare knowledge transfer slides for team onboarding", buttonText: "InProgress" },
  { id: 5, title: "Update Jira Task", assigned: "Self", status: "pending", priority: "high", dueDate: "28 - 10 - 2026", dueTime: "03:30 PM", description: "Log hours and update status of all resolved issues in Jira", buttonText: "Not Started" },
  { id: 6, title: "Submit Sprint 10 wireframe", assigned: "Team Leader", status: "upcoming", priority: "medium", dueDate: "16 - 07 - 2026", dueTime: "01:30 PM", description: "Prepare and submit the interactive wireframes for Sprint 10", buttonText: "View Details", isCrossListed: true },
  ...Array.from({ length: 2 }, (_, i) => ({ id: 30 + i, title: `Pending Client Review ${i + 3}`, assigned: "Self", status: "pending", priority: "low", dueDate: "22 - 08 - 2026", dueTime: "04:00 PM", description: "Awaiting feedback on layout draft", buttonText: "Not Started" })),
  { id: 7, title: "Sprint 9 Wireframe Completed", assigned: "Self", status: "completed", priority: "high", dueDate: "10 - 07 - 2026", dueTime: "01:30 AM", description: "Design and handoff Sprint 9 wireframes to developers", buttonText: "View Details" },
  { id: 8, title: "Sprint 5 Task Completed", assigned: "TL", status: "completed", priority: "medium", dueDate: "10 - 07 - 2026", dueTime: "01:30 AM", description: "Sprint 5 tasks completed and verified", buttonText: "View Details" },
  { id: 9, title: "Sprint 9 Wireframe Completed", assigned: "Self", status: "completed", priority: "low", dueDate: "10 - 07 - 2026", dueTime: "01:30 AM", description: "Sprint 9 layout changes finalized", buttonText: "View Details" },
  ...Array.from({ length: 4 }, (_, i) => ({ id: 40 + i, title: `Completed Task Archive ${i + 4}`, assigned: "Self", status: "completed", priority: i % 2 === 0 ? "medium" : "low", dueDate: "05 - 07 - 2026", dueTime: "02:00 PM", description: "Documentation finalized and uploaded", buttonText: "View Details" }))
];

export default function TasksDashboard() {
  const { languageOpen } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("aipa_user_tasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", dueDate: "", dueTimeHH: "10", dueTimeMM: "30", dueTimeAmpm: "AM", assignedTo: "Self", priority: "medium", reminder: true });
  const [showCreateNewTask, setShowCreateNewTask] = useState(false);


  useEffect(() => { localStorage.setItem("aipa_user_tasks", JSON.stringify(tasks)); }, [tasks]);

  const handleTabChange = (tab) => {
    setShowCreateNewTask(false);
    setActiveTab(tab);
  };

  const getFilteredTasks = () => {
    if (activeTab === "upcoming") return tasks.filter((t) => t.status === "upcoming" && !t.isCrossListed);
    if (activeTab === "completed") return tasks.filter((t) => t.status === "completed");
    return tasks.filter((t) => t.status === "pending" || t.isCrossListed);
  };

  const upcomingCount = tasks.filter((t) => t.status === "upcoming" && !t.isCrossListed).length;
  const pendingCount = tasks.filter((t) => t.status === "pending" || t.isCrossListed).length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    const formattedTime = `${formData.dueTimeHH}:${formData.dueTimeMM} ${formData.dueTimeAmpm}`;
    const formattedDate = formData.dueDate ? formData.dueDate.split("-").reverse().join(" - ") : "05 - 08 - 2026";
    if (isEditing && selectedTask) {
      setTasks((prev) => prev.map((t) => t.id === selectedTask.id ? { ...t, title: formData.title, description: formData.description, dueDate: formattedDate, dueTime: formattedTime, assigned: formData.assignedTo, priority: formData.priority } : t));
      setIsEditing(false);
      setSelectedTask(null);
    } else {
      const newTask = { id: Date.now(), title: formData.title, description: formData.description, assigned: formData.assignedTo, status: activeTab === "completed" ? "completed" : activeTab === "upcoming" ? "upcoming" : "pending", priority: formData.priority, dueDate: formattedDate, dueTime: formattedTime, buttonText: activeTab === "completed" ? "View Details" : activeTab === "upcoming" ? "View Details" : "Not Started" };
      setTasks((prev) => [newTask, ...prev]);
    }
    setFormData({ title: "", description: "", dueDate: "", dueTimeHH: "10", dueTimeMM: "30", dueTimeAmpm: "AM", assignedTo: "Self", priority: "medium", reminder: true });
    setShowCreateModal(false);
  };

  const handleOpenEdit = () => {
    if (!selectedTask) return;
    const [day, month, year] = selectedTask.dueDate.split(" - ");
    const parsedDate = year && month && day ? `${year}-${month}-${day}` : "";
    setFormData({ title: selectedTask.title, description: selectedTask.description, dueDate: parsedDate, dueTimeHH: selectedTask.dueTime.substring(0, 2) || "10", dueTimeMM: selectedTask.dueTime.substring(3, 5) || "30", dueTimeAmpm: selectedTask.dueTime.slice(-2) || "AM", assignedTo: selectedTask.assigned, priority: selectedTask.priority, reminder: true });
    setIsEditing(true);
    setShowCreateModal(true);
  };

  const handleCreateTaskSave = (taskData) => {
    const formattedTime = `${taskData.dueTimeHH}:${taskData.dueTimeMM} ${taskData.dueTimeAmpm}`;
    let formattedDate = "05 - 08 - 2026";
    if (taskData.dueDate) {
      if (taskData.dueDate.includes("-")) {
        const parts = taskData.dueDate.split("-").map(p => p.trim());
        if (parts[0].length === 4) {
          // YYYY-MM-DD format
          formattedDate = `${parts[2]} - ${parts[1]} - ${parts[0]}`;
        } else {
          // DD-MM-YYYY format
          formattedDate = `${parts[0]} - ${parts[1]} - ${parts[2]}`;
        }
      } else {
        formattedDate = taskData.dueDate;
      }
    }
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      assigned: taskData.assignedTo || "Self",
      status: activeTab === "completed" ? "completed" : activeTab === "upcoming" ? "upcoming" : "pending",
      priority: taskData.priority.toLowerCase(),
      dueDate: formattedDate,
      dueTime: formattedTime,
      buttonText: activeTab === "completed" ? "View Details" : activeTab === "upcoming" ? "View Details" : "Not Started"
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowCreateNewTask(false);
  };

  const handleDeleteTask = (id) => { setTasks((prev) => prev.filter((t) => t.id !== id)); setSelectedTask(null); };
  const toggleTaskStatus = (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, status: nextStatus, buttonText: nextStatus === "completed" ? "View Details" : "Not Started", isCrossListed: false } : t));
    setSelectedTask(null);
  };
  const handleTogglePendingButton = (taskId) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, buttonText: t.buttonText === "Not Started" ? "InProgress" : "Not Started" } : t));
  };
  const handleRefresh = () => {
    setShowCreateNewTask(false);
    localStorage.removeItem("aipa_user_tasks");
    setTasks(initialTasks);
  };

  return (
    <div className={`h-full overflow-y-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-12 scrollbar-hide transition-all duration-300 ${languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"}`}>
      <div className="w-full flex flex-col min-h-[calc(100vh-90px)]">
        {showCreateNewTask ? (
          <CreateNewTask onCancel={() => setShowCreateNewTask(false)} onSave={handleCreateTaskSave} />
        ) : (
          /* Outer White Card Container wrapping everything */
          <div className="w-full flex-1 rounded-[25px] border border-[#DADADA] bg-white p-4 md:p-8 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
            {/* Main Title: Tasks & Reminders */}
            <div className="pb-4 border-b border-[#E8E8E8] mb-5">
              <h2 className="font-semibold text-[20px] md:text-[24px] text-[#3D3D3D]">Tasks & Reminders</h2>
            </div>

            {/* Right-Aligned Switcher: Tasks | Reminders below the line */}
            <div className="flex justify-end mb-6">
              <div className="bg-white border border-[#E8E8E8] p-1 rounded-full flex w-full sm:w-[600px] shrink-0 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
                <button className="flex-1 text-center py-2 rounded-full text-sm font-semibold bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)] transition-all cursor-pointer">Tasks</button>
                <button className="flex-1 text-center py-2 rounded-full text-sm font-medium text-[#586D93] hover:text-[#4866F6] transition-all cursor-pointer">Reminders</button>
              </div>
            </div>
            <div className="w-full flex-1 rounded-[20px] md:rounded-[25px] border border-[#DADADA] bg-white p-4 md:p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] flex flex-col mt-2">
              {/* Sub Header: Tasks Title + Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E8E8E8] mb-5">
                <h3 className="font-semibold text-[20px] text-[#3D3D3D]">Tasks</h3>
                <div className="flex items-center gap-3">
                  <button onClick={handleRefresh} className="flex items-center justify-center gap-2 h-10 px-8 min-w-[150px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_4px_10px_rgba(72,102,246,0.15)]"><span>Refresh</span><RefreshCw className="w-4 h-4 text-white" /></button>
                  <button onClick={() => setShowCreateNewTask(true)} className="flex items-center justify-center gap-2 h-10 px-8 min-w-[165px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white transition-all cursor-pointer font-semibold text-sm shadow-[0_4px_10px_rgba(72,102,246,0.25)] whitespace-nowrap"><span>New Task</span><Plus className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div onClick={() => handleTabChange("upcoming")} className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer ${activeTab === "upcoming" ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]" : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"}`}>
                  <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]"><img src={upcomingIcon} alt="upcoming" className="w-[32px] h-[32px]" /></div>
                  <div className="flex flex-col"><span className="text-[24px] font-bold text-[#3D3D3D]">{upcomingCount}</span><span className="text-sm text-[#586D93] font-medium">Upcoming Tasks</span></div>
                </div>
                <div onClick={() => handleTabChange("pending")} className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer ${activeTab === "pending" ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]" : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"}`}>
                  <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]"><img src={pendingIcon} alt="pending" className="w-[32px] h-[32px]" /></div>
                  <div className="flex flex-col"><span className="text-[24px] font-bold text-[#3D3D3D]">{pendingCount}</span><span className="text-sm text-[#586D93] font-medium">Pending Tasks</span></div>
                </div>
                <div onClick={() => handleTabChange("completed")} className={`flex items-center gap-4 p-4 rounded-[18px] border transition-all cursor-pointer md:col-span-1 lg:col-span-1 ${activeTab === "completed" ? "border-[#4866F6] bg-[#4866F604] shadow-[0px_4px_12px_rgba(72,102,246,0.08)]" : "border-[#E3E3E3] bg-white hover:border-[#4866F6aa]"}`}>
                  <div className="w-[60px] h-[60px] rounded-full flex-shrink-0 flex items-center justify-center bg-[#E4E8FE]"><img src={completedIcon} alt="completed" className="w-[32px] h-[32px]" /></div>
                  <div className="flex flex-col"><span className="text-[24px] font-bold text-[#3D3D3D]">{completedCount}</span><span className="text-sm text-[#586D93] font-medium">Completed tasks</span></div>
                </div>
              </div>
              <div className="w-full mb-6 border-t border-[#E8E8E8] pt-4">
                <div className="w-full bg-[#FAFBFD] border border-[#E8E8E8] p-1.5 rounded-full flex gap-1 overflow-x-auto md:overflow-visible no-scrollbar">
                  <button onClick={() => handleTabChange("upcoming")} className={`shrink-0 min-w-[280px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "upcoming" ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]" : "text-[#586D93] hover:text-[#4866F6]"}`}>Upcoming Task</button>
                  <button onClick={() => handleTabChange("pending")} className={`shrink-0 min-w-[140px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "pending" ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]" : "text-[#586D93] hover:text-[#4866F6]"}`}>Pending Task</button>
                  <button onClick={() => handleTabChange("completed")} className={`shrink-0 min-w-[140px] md:min-w-0 md:flex-1 text-center py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "completed" ? "bg-[#4866F6] text-white shadow-[0_2px_8px_rgba(72,102,246,0.3)]" : "text-[#586D93] hover:text-[#4866F6]"}`}>Completed Task</button>
                </div>
              </div>

              <div className="mb-4 border-b border-[#E8E8E8] pb-3">
                <h3 className="font-semibold text-lg text-[#3D3D3D]">{activeTab === "upcoming" ? "Upcoming Tasks" : activeTab === "completed" ? "Completed Tasks" : "Pending Tasks"}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {getFilteredTasks().map((task, idx) => (
                  <div key={task.id} className="rounded-[24px] border border-[#E3E3E3] bg-white p-5 flex flex-col justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0px_4px_18px_rgba(0,0,0,0.06)] transition-all min-h-[250px]">
                    <div>
                      <h4 className="font-semibold text-[17px] text-[#3D3D3D] line-clamp-1 mb-3">{idx + 1}.{task.title}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#4866F61A] flex items-center justify-center flex-shrink-0"><img src={profileIcon} alt="Profile" className="w-3.5 h-3.5" /></div>
                        <span className="text-xs text-[#3D3D3D] font-medium">Assigned : <span className="text-[#586D93]">{task.assigned}</span></span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        {task.status === "upcoming" && <span className="bg-[#4866F626] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold">Upcoming</span>}
                        {task.status === "pending" && <span className="bg-[#F59E0B26] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold">Pending</span>}
                        {task.status === "completed" && <span className="bg-[#33B4691A] text-[#33B469] px-3 py-1 rounded-[10px] text-xs font-semibold">Completed</span>}
                        {task.priority === "high" && <span className="bg-[#FB000026] text-[#FB0000] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FB0000]" />High</span>}
                        {task.priority === "medium" && <span className="bg-[#F59E0B26] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F59E0B]" />Medium</span>}
                        {task.priority === "low" && <span className="bg-[#4866F626] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4866F6]" />Low</span>}
                      </div>
                    </div>
                    <div className="w-full border-t border-[#E8E8E8] my-1"></div>
                    <div className="flex items-center gap-6 py-2.5 text-[#586D93]">
                      <div className="flex items-center gap-2 text-xs font-medium"><img src={calendarIcon} alt="Calendar" className="w-4 h-4" /><span>{task.dueDate}</span></div>
                      <div className="flex items-center gap-2 text-xs font-medium"><Clock className="w-4 h-4 text-[#586D93]" /><span>{task.dueTime}</span></div>
                    </div>
                    <div className="w-full border-t border-[#E8E8E8] my-1"></div>
                    <div className="pt-2">
                      {activeTab === "pending" && (task.buttonText === "InProgress" || task.buttonText === "Not Started") ? (
                        <button onClick={() => handleTogglePendingButton(task.id)} className="w-full py-2.5 bg-[#4866F6] hover:bg-[#3554ED] text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-[0px_4px_10px_rgba(72,102,246,0.15)]"><span>{task.buttonText}</span></button>
                      ) : (
                        <button onClick={() => setSelectedTask(task)} className="w-full py-2.5 bg-[#4866F6] hover:bg-[#3554ED] text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-[0px_4px_10px_rgba(72,102,246,0.15)]"><span>View Details</span><ArrowRight className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                ))}
                {getFilteredTasks().length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-[#E3E3E3]"><span className="text-[#586D93] text-sm">No tasks in this section yet.</span></div>
                )}
              </div>
              {/* End of Inner Content Card */}
            </div>
          </div>
        )}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[620px] bg-white rounded-[25px] border border-[#DADADA] px-4 sm:px-8 py-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="relative border-b border-[#E8E8E8] pb-4 mb-5 flex items-center justify-center w-full">
              <h3 className="font-bold text-[22px] text-[#4866F6] text-center w-full">Task Details</h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="absolute right-0 top-0.5 w-6 h-6 rounded-full bg-[#F0343D] hover:bg-[#D92D36] flex items-center justify-center text-white transition-all cursor-pointer border-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-[20px] border border-[#4866F6] bg-[#EEF2FF] p-5 mb-6 flex flex-col gap-5 sm:gap-6">
              {/* Top Section: Title and Description */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 bg-[#4866F6] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <img src={PendingIcon} alt="Pending" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-[16px] text-[#3D3D3D] leading-snug">{selectedTask.title}</h4>
                    <p className="text-[12px] text-[#586D93] leading-normal mt-1">{selectedTask.description || "No description provided."}</p>
                  </div>
                </div>
                {/* Web Badges (hidden on mobile < sm) */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  {selectedTask.status === "upcoming" && (
                    <span className="bg-[#4866F61D] text-[#4866F6] px-3 py-1 rounded-[10px] text-xs font-semibold">Upcoming</span>
                  )}
                  {selectedTask.status === "pending" && (
                    <span className="bg-[#F59E0B20] text-[#F59E0B] px-3 py-1 rounded-[10px] text-xs font-semibold">Pending</span>
                  )}
                  {selectedTask.status === "completed" && (
                    <span className="bg-[#33B4691C] text-[#33B469] px-3 py-1 rounded-[10px] text-xs font-semibold">Completed</span>
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

              {/* Bottom Section: Due Date/Time, Mobile Badges and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-4">
                {/* Due Date & Time */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[14px] text-[#3D3D3D] font-bold">Due Date & Time</span>
                  <div className="flex items-center gap-5 text-[13px] text-[#586D93] font-medium">
                    <div className="flex items-center gap-1.5">
                      <img src={calendarIcon} alt="Calendar" className="w-4.5 h-4.5" />
                      <span>{selectedTask.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4.5 h-4.5 text-[#586D93]" />
                      <span>{selectedTask.dueTime}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Badges (visible on mobile < sm) */}
                <div className="flex sm:hidden flex-col gap-2.5 w-full">
                  {selectedTask.status === "upcoming" && (
                    <span className="w-full text-center bg-[#4866F61D] text-[#4866F6] py-2 rounded-[10px] text-xs font-semibold">Upcoming</span>
                  )}
                  {selectedTask.status === "pending" && (
                    <span className="w-full text-center bg-[#F59E0B20] text-[#F59E0B] py-2 rounded-[10px] text-xs font-semibold">Pending</span>
                  )}
                  {selectedTask.status === "completed" && (
                    <span className="w-full text-center bg-[#33B4691C] text-[#33B469] py-2 rounded-[10px] text-xs font-semibold">Completed</span>
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

                {/* Actions: Edit/Delete buttons */}
                <div className="flex w-full sm:w-auto">
                  {selectedTask.status !== "completed" ? (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handleOpenEdit}
                        className="flex-1 sm:flex-initial h-11 sm:h-10 bg-[#4866F6] hover:bg-[#3554ED] text-white px-4 rounded-xl flex items-center justify-center gap-1.5 text-sm font-semibold cursor-pointer border-none shadow-[0_3px_8px_rgba(72,102,246,0.15)] transition-all"
                      >
                        <span>Edit</span>
                        <img src={EditWhiteIcon} alt="Edit" className="w-3.5 h-3.5 object-contain" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(selectedTask.id)}
                        className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                      >
                        <img src={DeleteIcon} alt="Delete" className="w-4 h-4 object-contain" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDeleteTask(selectedTask.id)}
                      className="w-full sm:w-10 sm:h-10 h-11 rounded-xl border border-[#FB0000] bg-white hover:bg-[#FB00000D] flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
                    >
                      <img src={DeleteIcon} alt="Delete" className="w-4 h-4 object-contain" />
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

      {showCreateModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-[420px] bg-white rounded-[25px] border border-[#DADADA] p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#586D93] cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
              <h3 className="font-bold text-[18px] text-[#3D3D3D]">{isEditing ? "Edit Task" : "Create New Task"}</h3>
            </div>
            <form onSubmit={handleSaveTask} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Task Title</label>
                <input type="text" placeholder="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full h-11 px-4 rounded-xl border border-[#E3E3E3] text-[#3D3D3D] placeholder-gray-400 text-sm focus:border-[#4866F6] focus:outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Description</label>
                <textarea placeholder="Enter Description" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-4 rounded-xl border border-[#E3E3E3] text-[#3D3D3D] placeholder-gray-400 text-sm focus:border-[#4866F6] focus:outline-none transition-all resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Due Date</label>
                <input type="date" required value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full h-11 px-4 rounded-xl border border-[#E3E3E3] text-[#3D3D3D] text-sm focus:border-[#4866F6] focus:outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Due Time</label>
                <div className="flex gap-2">
                  <select value={formData.dueTimeHH} onChange={(e) => setFormData({ ...formData, dueTimeHH: e.target.value })} className="flex-1 h-11 px-3 rounded-xl border border-[#E3E3E3] text-sm text-[#3D3D3D] bg-white focus:border-[#4866F6] focus:outline-none transition-all">
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((hr) => (<option key={hr} value={hr}>{hr}</option>))}
                  </select>
                  <span className="self-center font-bold text-gray-400">:</span>
                  <select value={formData.dueTimeMM} onChange={(e) => setFormData({ ...formData, dueTimeMM: e.target.value })} className="flex-1 h-11 px-3 rounded-xl border border-[#E3E3E3] text-sm text-[#3D3D3D] bg-white focus:border-[#4866F6] focus:outline-none transition-all">
                    {["00", "15", "30", "45"].map((min) => (<option key={min} value={min}>{min}</option>))}
                  </select>
                  <select value={formData.dueTimeAmpm} onChange={(e) => setFormData({ ...formData, dueTimeAmpm: e.target.value })} className="w-20 h-11 px-3 rounded-xl border border-[#E3E3E3] text-sm text-[#3D3D3D] bg-white focus:border-[#4866F6] focus:outline-none transition-all">
                    <option value="AM">AM</option><option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Assign To</label>
                <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} className="w-full h-11 px-4 rounded-xl border border-[#E3E3E3] text-sm text-[#3D3D3D] bg-white focus:border-[#4866F6] focus:outline-none transition-all">
                  <option value="Self">Self</option><option value="Team Leader">Team Leader</option><option value="TL">TL</option><option value="Manager">Manager</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#586D93]">Priority</label>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2 text-sm text-[#3D3D3D] cursor-pointer">
                    <input type="radio" name="priority" value="high" checked={formData.priority === "high"} onChange={() => setFormData({ ...formData, priority: "high" })} className="w-4 h-4 text-[#FB0000] border-gray-300 focus:ring-[#4866F6]" /><span>High</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#3D3D3D] cursor-pointer">
                    <input type="radio" name="priority" value="medium" checked={formData.priority === "medium"} onChange={() => setFormData({ ...formData, priority: "medium" })} className="w-4 h-4 text-[#4866F6] border-gray-300 focus:ring-[#4866F6]" /><span>Medium</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#3D3D3D] cursor-pointer">
                    <input type="radio" name="priority" value="low" checked={formData.priority === "low"} onChange={() => setFormData({ ...formData, priority: "low" })} className="w-4 h-4 text-[#4866F6] border-gray-300 focus:ring-[#4866F6]" /><span>Low</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2.5 mt-2">
                <input type="checkbox" id="reminder" checked={formData.reminder} onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })} className="w-4 h-4 text-[#4866F6] border-gray-300 rounded focus:ring-[#4866F6]" />
                <label htmlFor="reminder" className="text-xs font-semibold text-[#586D93] cursor-pointer">Notify 30 mins before due time</label>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 h-11 rounded-xl border border-[#E3E3E3] text-[#586D93] hover:bg-gray-50 text-sm font-semibold transition-all cursor-pointer">Cancel</button>
                <button type="submit" className="flex-1 h-11 rounded-xl bg-[#4866F6] hover:bg-[#3554ED] text-white text-sm font-semibold transition-all cursor-pointer shadow-[0_4px_10px_rgba(72,102,246,0.25)]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
