import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

import calendarIcon from "../../../../assets/images/calendarIcon.svg"; // <-- Change this path to your project

export default function ChatDatePickerField({
  data,
  onAction,
  disabled = false,
}) {

    
  const label = data?.label || "Select Date";
  const includeDate = data?.include_date ?? true;
  const includeTime = data?.include_time ?? false;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [panelStyle, setPanelStyle] = useState({
    top: 0,
    left: 0,
    width: 260,
  });

  const containerRef = useRef(null);
  const panelRef = useRef(null);

  const displayText = value
    ? dayjs(value).format("DD MMM YYYY")
    : label;

  const updatePanelPosition = () => {
    const trigger = containerRef.current;

    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();

    setPanelStyle({
      top: rect.bottom + 8,
      left: rect.left,
      width: Math.max(rect.width, 260),
    });
  };

  useEffect(() => {
    if (!open) return;

    updatePanelPosition();

    const handlePointerDown = (event) => {
      if (
        containerRef.current?.contains(event.target) ||
        panelRef.current?.contains(event.target)
      ) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const handleReposition = () => {
      updatePanelPosition();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const handleSelect = (dateValue) => {
    setValue(dateValue);
    setOpen(false);

    if (!dateValue) return;

    const formatted = dayjs(dateValue).format("DD MMM YYYY");

    onAction?.(formatted);
  };

  const toggleOpen = () => {
    if (disabled) return;

    if (!open) {
      updatePanelPosition();
    }

    setOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative min-w-[220px] ${open ? "mb-75" : ""}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-3 text-left text-sm disabled:cursor-default disabled:opacity-60"
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            value ? "text-slate-700" : "text-[#8D97A9]"
          }`}
        >
          {displayText}
        </span>

        <img
          src={calendarIcon}
          alt="calendar"
          className="h-5 w-5 shrink-0"
        />
      </button>

      {open &&
        !disabled &&
        createPortal(
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              top: panelStyle.top,
              left: panelStyle.left,
              width: panelStyle.width,
              zIndex: 9999,
            }}
          >
            <ChatDatePickerPanel
              label={label}
              value={value}
              onSelect={handleSelect}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

function ChatDatePickerPanel({
  label,
  value,
  onSelect,
}) {
  const [viewDate, setViewDate] = useState(() =>
    dayjs(value || undefined).startOf("month")
  );

  const daysInMonth = viewDate.daysInMonth();
  const firstWeekday = viewDate.startOf("month").day();

  const selectedDate = value ? dayjs(value) : null;

  const today = dayjs().startOf("day");

  const weekdayLabels = [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ];

  const cells = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  const handleDaySelect = (day) => {
    onSelect(viewDate.date(day).format("YYYY-MM-DD"));
  };

  return (
    <div
      role="dialog"
      aria-label={`${label} calendar`}
      className="w-full h-full rounded-xl border border-[#CFCFCF] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() =>
            setViewDate((prev) =>
              prev.subtract(1, "month")
            )
          }
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] hover:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <p className="text-sm font-medium text-[#3D3D3D]">
          {viewDate.format("MMMM YYYY")}
        </p>

        <button
          type="button"
          onClick={() =>
            setViewDate((prev) =>
              prev.add(1, "month")
            )
          }
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((weekday) => (
          <span
            key={weekday}
            className="py-1 text-center text-xs font-medium text-[#8D97A9]"
          >
            {weekday}
          </span>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return (
              <span
                key={`empty-${index}`}
                aria-hidden="true"
              />
            );
          }

          const cellDate = viewDate
            .date(day)
            .startOf("day");

          const isSelected =
            selectedDate?.isSame(cellDate, "day");

          const isToday =
            today.isSame(cellDate, "day");

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDaySelect(day)}
              className={`flex h-7 w-full cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
                isSelected
                  ? "bg-[#4866F6] font-medium text-white"
                  : isToday
                  ? "bg-[#E4E8FE] text-[#4866F6] hover:bg-[#d8ddfd]"
                  : "text-[#586D93] hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}