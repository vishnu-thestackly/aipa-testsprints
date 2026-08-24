import React, { useState } from "react";
import { ArrowLeft, CalendarDays, Search, ChevronDown } from "lucide-react";

const CreateNewTask = ({ onCancel, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTimeHH, setDueTimeHH] = useState("10");
  const [dueTimeMM, setDueTimeMM] = useState("30");
  const [dueTimeAmpm, setDueTimeAmpm] = useState("AM");
  const [assignedTo, setAssignedTo] = useState("Self");
  const [priority, setPriority] = useState("High");
  const [reminder, setReminder] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (onSave) {
      onSave({
        title,
        description,
        dueDate,
        dueTimeHH,
        dueTimeMM,
        dueTimeAmpm,
        assignedTo,
        priority,
        reminder,
      });
    }
  };

  return (
    <div className="w-full flex-1 rounded-[25px] border border-[#DADADA] bg-white p-4 md:p-8 shadow-[0px_0px_4px_0px_#00000014] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#DCDCDC] pb-3 ml-2">
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <button
              type="button"
              onClick={onCancel}
              className="w-[30px] h-[30px] rounded-full bg-[#4866F6] text-white flex items-center justify-center cursor-pointer shrink-0 hover:bg-[#3F5BE4] transition-colors border-none"
            >
              <ArrowLeft size={15} strokeWidth={2} />
            </button>

            {/* Page Title */}
            <h1 className="w-[145px] h-[21px] text-[#303030] text-[15px] font-[510] leading-[21px] tracking-[0%] whitespace-nowrap">
              Create New Task
            </h1>
          </div>
        </div>

        {/* Task Information */}
        <div className="mt-3 sm:mt-4 ml-3 flex-1 flex flex-col justify-center">
          <h2 className="text-[#303030] text-[13px] sm:text-[14px] font-[510] leading-[20px]">
            Task Information
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Title + Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* Task Title */}
                <div>
                  <label className="block text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                    Task Title
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-[32px] sm:h-[33px] rounded-[6px] border border-[#D9DDE5] bg-white px-2 sm:px-3 text-[11px] sm:text-[12px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6] transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                    Description
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[32px] sm:h-[33px] rounded-[6px] border border-[#D9DDE5] bg-white px-2 sm:px-3 text-[11px] sm:text-[12px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6] transition-colors"
                  />
                </div>
              </div>

              {/* Due Date + Due Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-4 sm:mt-5">
                {/* Due Date */}
                <div>
                  <label className="block text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                    Due Date
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="DD - MM - YYYY"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full h-[32px] sm:h-[33px] rounded-[6px] border border-[#D9DDE5] bg-white px-2 sm:px-3 pr-9 text-[11px] sm:text-[12px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6] transition-colors"
                    />
                    <CalendarDays
                      size={14}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Due Time */}
                <div>
                  <label className="block text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                    Due Time
                  </label>

                  <div className="flex items-center gap-1.5">
                    {/* Hour */}
                    <div className="relative">
                      <select
                        value={dueTimeHH}
                        onChange={(e) => setDueTimeHH(e.target.value)}
                        className="w-[64px] sm:w-[66px] h-[32px] sm:h-[33px] border border-[#D9DDE5] rounded-[6px] px-2 text-[11px] sm:text-[12px] text-[#3D3D3D] bg-white outline-none appearance-none cursor-pointer"
                      >
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((hr) => (
                          <option key={hr} value={hr}>{hr}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none" />
                    </div>

                    <span className="text-[#8D9BB0] text-[12px]">:</span>

                    {/* Minute */}
                    <div className="relative">
                      <select
                        value={dueTimeMM}
                        onChange={(e) => setDueTimeMM(e.target.value)}
                        className="w-[64px] sm:w-[66px] h-[32px] sm:h-[33px] border border-[#D9DDE5] rounded-[6px] px-2 text-[11px] sm:text-[12px] text-[#3D3D3D] bg-white outline-none appearance-none cursor-pointer"
                      >
                        {["00", "15", "30", "45"].map((min) => (
                          <option key={min} value={min}>{min}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none" />
                    </div>

                    {/* AM / PM */}
                    <div className="relative">
                      <select
                        value={dueTimeAmpm}
                        onChange={(e) => setDueTimeAmpm(e.target.value)}
                        className="w-[64px] sm:w-[66px] h-[32px] sm:h-[33px] border border-[#D9DDE5] rounded-[6px] px-2 text-[11px] sm:text-[12px] text-[#3D3D3D] bg-white outline-none appearance-none cursor-pointer"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                      <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D9BB0] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Assign To */}
              <div className="mt-4 sm:mt-5 w-full md:w-[48.8%]">
                <label className="block text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                  Assign To
                </label>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Assign to"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full h-[32px] sm:h-[33px] rounded-[6px] border border-[#D9DDE5] bg-white px-2 sm:px-3 pr-8 text-[11px] sm:text-[12px] text-[#3D3D3D] placeholder:text-[#9AA6BA] outline-none focus:border-[#4866F6]"
                  />

                  <Search
                    size={15}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8D9BB0]"
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="mt-4 sm:mt-5">
                <p className="w-[280px] h-[21px] text-[#3D3D3D] text-[16px] font-[450] leading-[18px] tracking-[0%] mb-2">
                  Priority
                </p>

                <div className="flex items-center gap-5 sm:gap-7">
                  {["High", "Medium", "Low"].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={item}
                        checked={priority === item}
                        onChange={() => setPriority(item)}
                        className="sr-only"
                      />

                      <span
                        className="w-[13px] h-[13px] rounded-full border flex items-center justify-center border-[#4866F6]"
                      >
                        {priority === item && (
                          <span className="w-[7px] h-[7px] rounded-full bg-[#4866F6]" />
                        )}
                      </span>

                      <span className="text-[#53647E] text-[10px] sm:text-[11px]">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reminder */}
              <div className="mt-4 sm:mt-5">
                <p className="text-[#3D3D3D] text-[16px] font-[480] leading-[18px] tracking-[0%] mb-2">
                  Reminder
                </p>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reminder}
                    onChange={(e) => setReminder(e.target.checked)}
                    className="sr-only"
                  />

                  <span
                    className={`w-[13px] h-[13px] rounded-[3px] flex items-center justify-center border
                      ${
                        reminder
                          ? "bg-[#4866F6] border-[#4866F6]"
                          : "bg-white border-[#C8D0DD]"
                      }
                    `}
                  >
                    {reminder && (
                      <span className="text-white text-[9px] leading-none">
                        ✓
                      </span>
                    )}
                  </span>

                  <span className="text-[#53647E] text-[10px] font-[350] leading-[15px] tracking-[0%] whitespace-nowrap">
                    Notify 30 mins before due time
                  </span>
                </label>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto pt-8 sm:pt-10 pb-2 flex items-center justify-center gap-2 w-full shrink-0">
              {/* Cancel */}
              <button
                type="button"
                onClick={onCancel}
                className="w-[104px] h-[44px] sm:h-[31px] px-4 sm:px-[15px] rounded-[17px] border border-[#4866F6] bg-white text-[#4866F6] text-[10px] sm:text-[11px] cursor-pointer hover:bg-[#F5F7FF] transition-colors"
              >
                Cancel
              </button>
              {/* Save Task */}
              <button
                type="submit"
                className="w-[104px] h-[44px] sm:h-[31px] px-4 sm:px-[15px] rounded-[17px] bg-[#4866F6] text-white text-[10px] sm:text-[11px] cursor-pointer hover:bg-[#3F5DE3] transition-colors border-none"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateNewTask;
