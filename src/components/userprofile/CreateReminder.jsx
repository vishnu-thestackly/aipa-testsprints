import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import { ArrowLeft, ChevronDown } from "lucide-react";

const CreateReminder = ({ initialData, isEditing = false, onCancel, onSave }) => {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [priority, setPriority] = useState(initialData?.priority || "High");
  const [inApp, setInApp] = useState(initialData?.inApp ?? true);
  const [emailNotification, setEmailNotification] = useState(
    initialData?.emailNotification ?? false
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    date: initialData?.date || "",
    hour: initialData?.hour || "",
    minute: initialData?.minute || "",
    ampm: initialData?.ampm || "AM",
    repeat: initialData?.repeat || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDatePick = (e) => {
    const rawVal = e.target.value; // YYYY-MM-DD
    if (rawVal) {
      const parts = rawVal.split("-");
      if (parts.length === 3) {
        setFormData((prev) => ({
          ...prev,
          date: `${parts[2]} - ${parts[1]} - ${parts[0]}`,
        }));
      } else {
        setFormData((prev) => ({ ...prev, date: rawVal }));
      }
    }
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert("Please enter a title for the reminder.");
      return;
    }
    const payload = {
      ...(initialData?.id ? { id: initialData.id } : {}),
      ...formData,
      priority,
      inApp,
      emailNotification,
    };

    if (onSave) {
      onSave(payload);
    } else {
      alert(isEditing ? "Reminder updated successfully!" : "Reminder created successfully!");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen p-1.5 sm:p-3 md:p-4 bg-[#f5f6f8]">
      {/* Main Outer Card */}
      <div className="min-h-[calc(100vh-16px)] rounded-[18px] sm:rounded-[22px] md:rounded-[24px] border border-[#e1e3e8] bg-[#FFFFFF] px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-[#dedfe3] pb-3.5">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center cursor-pointer rounded-full bg-[#4866F6] text-white transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={20} strokeWidth={2.2} />
          </button>

          <h1 className="text-[16px] sm:text-[17px] md:text-[18px] font-medium text-[#3D3D3D]">
            {isEditing ? "Edit Reminder" : "Create Reminder"}
          </h1>
        </div>

        {/* Form Card (Responsive: 1 col on mobile/tablet, 2 col on wide xl desktop) */}
        <div className="mt-3.5 rounded-[14px] sm:rounded-[16px] md:rounded-[18px] border border-[#e8e9ed] bg-[#FFFFFF] px-3.5 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
          {/* Form Fields Container (1 col on mobile & tab <1024px, 2 col on laptop 1024px+ lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-x-4 lg:gap-y-6">
            {/* Title */}
            <div className="min-w-0">
              <label
                htmlFor="reminder-title-input"
                className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]"
              >
                Title
              </label>

              <input
                id="reminder-title-input"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter Title here"
                className="h-[40px] sm:h-[42px] w-full rounded-[8px] border border-[#d8d9dd] bg-white px-3.5 text-[14px] sm:text-[15px] text-[#3D3D3D] placeholder:text-[#a5afc2] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6]"
              />
            </div>

            {/* Date */}
            <div className="min-w-0">
              <label
                htmlFor="reminder-date-input"
                className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]"
              >
                Date
              </label>

              <div className="relative">
                <input
                  id="reminder-date-input"
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  placeholder="DD - MM - YYYY"
                  className="h-[40px] sm:h-[42px] w-full rounded-[8px] border border-[#d8d9dd] bg-white px-3.5 pr-10 text-[14px] sm:text-[15px] text-[#3D3D3D] placeholder:text-[#a5afc2] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6]"
                />

                <input
                  type="date"
                  ref={dateInputRef}
                  onChange={handleDatePick}
                  className="sr-only"
                  aria-hidden="true"
                  tabIndex={-1}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (dateInputRef.current) {
                      if (typeof dateInputRef.current.showPicker === "function") {
                        dateInputRef.current.showPicker();
                      } else {
                        dateInputRef.current.focus();
                      }
                    }
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] rounded"
                  aria-label="Open calendar picker"
                >
                  <img
                    src={calendarIcon}
                    alt=""
                    className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]"
                  />
                </button>
              </div>
            </div>

            {/* Time */}
            <div className="min-w-0">
              <label className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
                Time
              </label>

              <div className="flex w-full items-center gap-1.5 sm:gap-2">
                {/* HH */}
                <CustomDropdown
                  value={formData.hour}
                  placeholder="HH"
                  options={Array.from({ length: 12 }, (_, i) =>
                    String(i + 1).padStart(2, "0")
                  )}
                  onChange={(value) => handleChange("hour", value)}
                  widthClass="w-[72px] sm:w-[86px] md:w-[92px]"
                />

                {/* Colon */}
                <span className="shrink-0 text-[14px] font-semibold text-[#8994a7]">
                  :
                </span>

                {/* MM */}
                <CustomDropdown
                  value={formData.minute}
                  placeholder="MM"
                  options={Array.from({ length: 60 }, (_, i) =>
                    String(i).padStart(2, "0")
                  )}
                  onChange={(value) => handleChange("minute", value)}
                  widthClass="w-[72px] sm:w-[86px] md:w-[92px]"
                />

                {/* AM / PM */}
                <CustomDropdown
                  value={formData.ampm}
                  placeholder="AM"
                  options={["AM", "PM"]}
                  onChange={(value) => handleChange("ampm", value)}
                  widthClass="w-[75px] sm:w-[88px] md:w-[96px]"
                />
              </div>
            </div>

            {/* Repeat */}
            <div className="min-w-0">
              <label className="mb-1.5 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
                Repeat
              </label>

              <CustomDropdown
                value={formData.repeat}
                placeholder="Select Time"
                options={["Once", "Daily", "Weekly", "Monthly", "Yearly"]}
                onChange={(value) => handleChange("repeat", value)}
                widthClass="w-full"
              />
            </div>
          </div>

          {/* Priority */}
          <div className="mt-5 sm:mt-6 md:mt-7">
            <label className="mb-2 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
              Priority
            </label>

            <div className="flex h-[34px] sm:h-[36px] w-full max-w-[340px] items-center rounded-full border border-[#ededf0] bg-white p-[3px]">
              {["High", "Medium", "Low"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPriority(item)}
                  className={`h-full flex-1 rounded-full text-[13px] sm:text-[14px] cursor-pointer transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                    priority === item
                      ? "bg-[#4866F6] text-white shadow-sm font-medium"
                      : "bg-transparent text-[#586D93] hover:text-[#4866F6]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Type (Horizontal row on small mobile and tablet) */}
          <div className="mt-5 sm:mt-6 md:mt-7">
            <label className="mb-3 block text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
              Notification Type
            </label>

            <div className="flex flex-row items-center gap-6 sm:gap-8">
              {/* In App Checkbox */}
              <label className="flex cursor-pointer items-center gap-2.5 group select-none">
                <input
                  type="checkbox"
                  checked={inApp}
                  onChange={(e) => setInApp(e.target.checked)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setInApp(!inApp);
                    }
                  }}
                  className="sr-only"
                />

                <span
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setInApp(!inApp);
                    }
                  }}
                  className={`flex h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] shrink-0 items-center justify-center rounded-[7px] sm:rounded-[8px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                    inApp
                      ? "border-2 border-[#4866F6] bg-[#4866F6] text-white"
                      : "border-2 border-[#4866F6] bg-white"
                  }`}
                >
                  {inApp && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>

                <span className="text-[13.5px] sm:text-[14px] font-medium text-[#586D93]">
                  In App
                </span>
              </label>

              {/* Email Notifications Checkbox */}
              <label className="flex cursor-pointer items-center gap-2.5 group select-none">
                <input
                  type="checkbox"
                  checked={emailNotification}
                  onChange={(e) => setEmailNotification(e.target.checked)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setEmailNotification(!emailNotification);
                    }
                  }}
                  className="sr-only"
                />

                <span
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setEmailNotification(!emailNotification);
                    }
                  }}
                  className={`flex h-[22px] w-[22px] sm:h-[24px] sm:w-[24px] shrink-0 items-center justify-center rounded-[7px] sm:rounded-[8px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] ${
                    emailNotification
                      ? "border-2 border-[#4866F6] bg-[#4866F6] text-white"
                      : "border-2 border-[#4866F6] bg-white"
                  }`}
                >
                  {emailNotification && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>

                <span className="text-[13.5px] sm:text-[14px] font-medium text-[#586D93]">
                  Email Notifications
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons (Cancel & Save) */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={handleBack}
              className="h-[38px] sm:h-[40px] w-[95px] sm:w-[105px] rounded-full border border-[#4866F6] cursor-pointer text-[14px] sm:text-[15px] font-medium text-[#4866F6] bg-[#FFFFFF] transition hover:bg-[#f5f7ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="h-[38px] sm:h-[40px] w-[95px] sm:w-[105px] rounded-full bg-[#4866F6] cursor-pointer text-[14px] sm:text-[15px] font-medium text-[#FFFFFF] shadow-sm transition hover:bg-[#3d5be0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4866F6] focus-visible:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   CUSTOM DROPDOWN
   ========================================================= */

const CustomDropdown = ({
  value,
  placeholder,
  options,
  onChange,
  widthClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative shrink-0 ${widthClass}`}>
      {/* Selected value button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[40px] sm:h-[42px] w-full items-center justify-between rounded-[8px] border border-[#d8d9dd] bg-white px-2.5 sm:px-3 text-[14px] sm:text-[15px] text-[#8d99ad] outline-none transition focus:border-[#4866F6] focus-visible:ring-1 focus-visible:ring-[#4866F6]"
      >
        <span className="truncate">{value || placeholder}</span>

        <ChevronDown
          size={17}
          className={`ml-1 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-[#8d99ad]`}
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div
          className={`absolute left-0 top-[45px] z-[100] w-full min-w-full overflow-hidden rounded-[8px] border border-[#d8d9dd] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] ${
            options.length > 6 ? "max-h-[190px] overflow-y-auto" : ""
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex min-h-[36px] w-full items-center px-3 text-left text-[13.5px] sm:text-[15px] transition focus:outline-none focus-visible:bg-[#4866F6] focus-visible:text-white ${
                value === option
                  ? "bg-[#4866F6] text-white font-medium"
                  : "bg-white text-[#586D93] hover:bg-[#f3f5ff]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateReminder;
