import React, { useState, useRef } from "react";
import { ArrowLeft, CalendarDays, Search, ChevronDown } from "lucide-react";
import { createTask, updateTask } from "../../../api/authApi";

const CreateNewTask = ({ onCancel, onSave, taskData = null, isEditing = false }) => {
  // Helper to parse existing time string (e.g. "10:30 AM", "14:30")
  const parseTime = (timeStr) => {
    if (!timeStr) return { hh: "10", mm: "30", ampm: "AM" };
    let clean = timeStr.trim();
    let modifier = "";
    if (clean.toUpperCase().endsWith("AM") || clean.toUpperCase().endsWith("PM")) {
      modifier = clean.slice(-2).toUpperCase();
      clean = clean.slice(0, -2).trim();
    }
    let [hours, minutes] = clean.split(":");
    let hh = Number(hours) || 10;
    let mm = minutes || "30";
    let ampm = modifier || "AM";
    if (!modifier) {
      if (hh >= 12) {
        ampm = "PM";
        if (hh > 12) hh -= 12;
      } else if (hh === 0) {
        hh = 12;
        ampm = "AM";
      }
    }
    return {
      hh: String(hh).padStart(2, "0"),
      mm: String(mm).padStart(2, "0"),
      ampm,
    };
  };

  // Helper to format date string to DD - MM - YYYY
  const parseDate = (dateStr) => {
    if (!dateStr) return "";
    if (dateStr.includes(" - ")) return dateStr;
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-").map((p) => p.trim());
      if (parts[0].length === 4) {
        // YYYY-MM-DD -> DD - MM - YYYY
        return `${parts[2]} - ${parts[1]} - ${parts[0]}`;
      }
      if (parts[2].length === 4) {
        // DD-MM-YYYY -> DD - MM - YYYY
        return `${parts[0]} - ${parts[1]} - ${parts[2]}`;
      }
    }
    return dateStr;
  };

  const parsedTime = parseTime(taskData?.dueTime || taskData?.due_time);

  const [title, setTitle] = useState(taskData?.title || "");
  const [dueDate, setDueDate] = useState(parseDate(taskData?.dueDate || taskData?.due_date) || "");
  const [dueTimeHH, setDueTimeHH] = useState(taskData ? parsedTime.hh : "HH");
  const [dueTimeMM, setDueTimeMM] = useState(taskData ? parsedTime.mm : "MM");
  const [dueTimeAmpm, setDueTimeAmpm] = useState(taskData ? parsedTime.ampm : "AM");
  const [description, setDescription] = useState(taskData?.description || "");
  const [assignedTo, setAssignedTo] = useState(
    taskData?.assignedTo || taskData?.assigned_to_name || taskData?.assigned || ""
  );
  const [priority, setPriority] = useState(
    taskData?.priority
      ? taskData.priority.charAt(0).toUpperCase() + taskData.priority.slice(1).toLowerCase()
      : "High"
  );
  const [reminder, setReminder] = useState(
    taskData?.reminder ?? taskData?.reminder_enabled ?? true
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const hiddenDateInputRef = useRef(null);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (val.length > 100) {
      setTitleError("Task title cannot exceed 100 characters");
    } else {
      setTitleError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    if (val.length > 200) {
      setDescriptionError("Description cannot exceed 200 characters");
    } else {
      setDescriptionError("");
    }
  };

  const handleNativeDatePick = (e) => {
    const raw = e.target.value; // YYYY-MM-DD
    if (raw) {
      const [y, m, d] = raw.split("-");
      setDueDate(`${d} - ${m} - ${y}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError("Task title is required.");
      return;
    }

    if (title.length > 100) {
      setTitleError("Task title cannot exceed 100 characters");
      return;
    }

    if (description.length > 200) {
      setDescriptionError("Description cannot exceed 200 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let formattedDueDate = "";
      if (dueDate) {
        const clean = dueDate.replace(/\s+/g, "").replace(/\//g, "-");
        const parts = clean.split("-");
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            // YYYY-MM-DD
            formattedDueDate = `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
          } else {
            // DD-MM-YYYY
            formattedDueDate = `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
          }
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(dueDate.trim())) {
          formattedDueDate = dueDate.trim();
        }
      }

      if (!formattedDueDate) {
        setError("Please enter a valid due date (DD - MM - YYYY).");
        setLoading(false);
        return;
      }

      // Convert 12-hour time to 24-hour time
      const hhNum = dueTimeHH === "HH" ? 10 : Number(dueTimeHH);
      const mmStr = dueTimeMM === "MM" ? "30" : dueTimeMM;
      let hour = hhNum;

      if (dueTimeAmpm === "PM" && hour !== 12) {
        hour += 12;
      }
      if (dueTimeAmpm === "AM" && hour === 12) {
        hour = 0;
      }

      const formattedDueTime = `${String(hour).padStart(2, "0")}:${mmStr}`;

      // Payload expected by backend
      const payload = {
        title: title.trim(),
        description: description.trim(),
        assigned_to_name: assignedTo.trim() || "Self",
        priority: priority.toUpperCase(),
        due_date: formattedDueDate,
        due_time: formattedDueTime,
        reminder_enabled: reminder,
        reminder_minutes_before: reminder ? 30 : 0,
      };

      console.log(isEditing ? "Update Task Payload:" : "Create Task Payload:", payload);

      let response;
      if (isEditing && taskData?.id) {
        response = await updateTask(taskData.id, payload);
        console.log("Task updated successfully:", response);
      } else {
        response = await createTask(payload);
        console.log("Task created successfully:", response);
      }

      if (onSave) {
        onSave({
          ...payload,
          ...response,
          id: taskData?.id,
          task_id: taskData?.id,
          dueTimeHH: dueTimeHH === "HH" ? "10" : dueTimeHH,
          dueTimeMM: dueTimeMM === "MM" ? "30" : dueTimeMM,
          dueTimeAmpm,
          assignedTo: assignedTo.trim() || "Self",
          dueDate: formattedDueDate,
        });
      }
    } catch (err) {
      console.error(isEditing ? "Update task failed:" : "Create task failed:", err);
      setError(
        err?.detail ||
        err?.message ||
        (typeof err === "string" ? err : isEditing ? "Failed to update task" : "Failed to create task")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 rounded-[24px] border border-[#E5E7EB] bg-white p-5 sm:p-8 shadow-[0px_1px_4px_rgba(0,0,0,0.05)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3.5 border-b border-[#E5E7EB]">
        {/* Back Button */}
        <button
          type="button"
          onClick={onCancel}
          className="w-8 h-8 rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 border-none shadow-sm"
          title="Back to Tasks"
        >
          <ArrowLeft size={16} strokeWidth={2.2} />
        </button>

        {/* Page Title */}
        <h1 className="text-[#303030] text-[18px] sm:text-[19px] font-medium tracking-tight">
          {isEditing ? "Edit Task" : "Create New Task"}
        </h1>
      </div>

      {/* Task Information Section */}
      <div className="mt-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-[#303030] text-[15px] font-semibold mb-5">
            Task Information
          </h2>

          {/* Error Alert */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs sm:text-sm flex items-center justify-between animate-in fade-in">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600 ml-2 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Form */}
          <form id="create-task-form" onSubmit={handleSubmit}>
            {/* Input Grid (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Left Column: Task Title & Description */}
              <div className="flex flex-col gap-5">
                {/* Task Title */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[#3D3D3D] text-[14px] font-medium">
                      Task Title
                    </label>
                    <span
                      className={`text-[11px] ${
                        title.length > 100 ? "text-red-500 font-semibold" : "text-[#9AA6BA]"
                      }`}
                    >
                      {title.length}/100
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                    className={`w-full h-[42px] px-3.5 rounded-lg border ${
                      titleError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-[#D9DDE5] focus:border-[#4866F6] focus:ring-1 focus:ring-[#4866F6]"
                    } bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none transition-all`}
                  />
                  {titleError && (
                    <p className="text-red-500 text-xs mt-1 animate-in fade-in">
                      {titleError}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[#3D3D3D] text-[14px] font-medium">
                      Description
                    </label>
                    <span
                      className={`text-[11px] ${
                        description.length > 200
                          ? "text-red-500 font-semibold"
                          : "text-[#9AA6BA]"
                      }`}
                    >
                      {description.length}/200
                    </span>
                  </div>
                  <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className={`w-full h-[128px] sm:h-[130px] p-3.5 rounded-lg border ${
                      descriptionError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-[#D9DDE5] focus:border-[#4866F6] focus:ring-1 focus:ring-[#4866F6]"
                    } bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none transition-all resize-none overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
                  />
                  {descriptionError && (
                    <p className="text-red-500 text-xs mt-1 animate-in fade-in">
                      {descriptionError}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Due Date, Due Time & Assign To */}
              <div className="flex flex-col gap-5">
                {/* Due Date */}
                <div>
                  <label className="block text-[#3D3D3D] text-[14px] font-medium mb-1.5">
                    Due Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="DD - MM - YYYY"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full h-[42px] px-3.5 pr-10 rounded-lg border border-[#D9DDE5] bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6] focus:ring-1 focus:ring-[#4866F6] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => hiddenDateInputRef.current?.showPicker?.()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D9BB0] hover:text-[#4866F6] cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
                      title="Select Date"
                    >
                      <CalendarDays size={17} />
                    </button>
                    <input
                      type="date"
                      ref={hiddenDateInputRef}
                      onChange={handleNativeDatePick}
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>
                </div>

                {/* Due Time */}
                <div>
                  <label className="block text-[#3D3D3D] text-[14px] font-medium mb-1.5">
                    Due Time
                  </label>
                  <div className="flex items-center gap-2">
                    {/* HH */}
                    <div className="relative flex-1">
                      <select
                        value={dueTimeHH}
                        onChange={(e) => setDueTimeHH(e.target.value)}
                        className="w-full h-[42px] px-3 pr-7 rounded-lg border border-[#D9DDE5] bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] outline-none focus:border-[#4866F6] appearance-none cursor-pointer"
                      >
                        <option value="HH">HH</option>
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((hr) => (
                          <option key={hr} value={hr}>
                            {hr}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none"
                      />
                    </div>

                    <span className="text-[#8D9BB0] text-sm select-none">:</span>

                    {/* MM */}
                    <div className="relative flex-1">
                      <select
                        value={dueTimeMM}
                        onChange={(e) => setDueTimeMM(e.target.value)}
                        className="w-full h-[42px] px-3 pr-7 rounded-lg border border-[#D9DDE5] bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] outline-none focus:border-[#4866F6] appearance-none cursor-pointer"
                      >
                        <option value="MM">MM</option>
                        {["00", "15", "30", "45"].map((min) => (
                          <option key={min} value={min}>
                            {min}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none"
                      />
                    </div>

                    {/* AM/PM */}
                    <div className="relative flex-1">
                      <select
                        value={dueTimeAmpm}
                        onChange={(e) => setDueTimeAmpm(e.target.value)}
                        className="w-full h-[42px] px-3 pr-7 rounded-lg border border-[#D9DDE5] bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] outline-none focus:border-[#4866F6] appearance-none cursor-pointer"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Assign To */}
                <div>
                  <label className="block text-[#3D3D3D] text-[14px] font-medium mb-1.5">
                    Assign To
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Assign to"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full h-[42px] px-3.5 pr-10 rounded-lg border border-[#D9DDE5] bg-white text-[13px] sm:text-[14px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6] focus:ring-1 focus:ring-[#4866F6] transition-all"
                    />
                    <Search
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Section */}
            <div className="mt-5">
              <label className="block text-[#3D3D3D] text-[14px] font-medium mb-2.5">
                Priority
              </label>
              <div className="flex items-center gap-8">
                {["High", "Medium", "Low"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer select-none group"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={item}
                      checked={priority.toLowerCase() === item.toLowerCase()}
                      onChange={() => setPriority(item)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        priority.toLowerCase() === item.toLowerCase()
                          ? "border-[#4866F6]"
                          : "border-[#4866F6] opacity-80 group-hover:opacity-100"
                      }`}
                    >
                      {priority.toLowerCase() === item.toLowerCase() && (
                        <span className="w-2 h-2 rounded-full bg-[#4866F6]" />
                      )}
                    </span>
                    <span className="text-[13px] sm:text-[14px] text-[#53647E]">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reminder Section */}
            <div className="mt-5">
              <label className="block text-[#3D3D3D] text-[14px] font-medium mb-2.5">
                Reminder
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={reminder}
                  onChange={(e) => setReminder(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${
                    reminder
                      ? "bg-[#4866F6] border-[#4866F6]"
                      : "bg-white border-[#C8D0DD] group-hover:border-[#4866F6]"
                  }`}
                >
                  {reminder && (
                    <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 12 10">
                      <path d="M4.2 9.5L0.5 5.8l1.4-1.4 2.3 2.3L10.1 0.8l1.4 1.4z" />
                    </svg>
                  )}
                </span>
                <span className="text-[13px] sm:text-[14px] text-[#53647E]">
                  Notify 30 mins before due time
                </span>
              </label>
            </div>
          </form>
        </div>

        {/* Bottom Buttons - Centered */}
        <div className="mt-10 mb-2 flex items-center justify-center gap-4 w-full">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-[110px] h-[38px] rounded-full border border-[#4866F6] bg-white text-[#4866F6] font-medium text-[13px] sm:text-[14px] cursor-pointer hover:bg-[#F5F7FF] transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-task-form"
            disabled={loading}
            className="w-[110px] h-[38px] rounded-full bg-[#4866F6] hover:bg-[#3554ED] text-white font-medium text-[13px] sm:text-[14px] cursor-pointer transition-all shadow-[0_2px_8px_rgba(72,102,246,0.25)] border-none disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Saving...</span>
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;
