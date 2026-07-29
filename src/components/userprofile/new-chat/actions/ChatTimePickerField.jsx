import React, { useEffect, useState } from "react";

export default function ChatTimePickerField({
  onAction,
  disabled = false,
}) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("");
  const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

 const handleHourChange = (e) => {
  const value = e.target.value;
  setHour(value);

  if (value && minute && period) {
    onAction?.(`${value}:${minute} ${period}`);
  }
};

const handleMinuteChange = (e) => {
  const value = e.target.value;
  setMinute(value);

  if (hour && value && period) {
    onAction?.(`${hour}:${value} ${period}`);
  }
};

const handlePeriodChange = (e) => {
  const value = e.target.value;
  setPeriod(value);

  if (hour && minute && value) {
    onAction?.(`${hour}:${minute} ${value}`);
  }
};

  return (
    <div className="flex items-center gap-2">
      {/* Hours */}
      <select
        value={hour}
        disabled={disabled}
        onChange={handleHourChange}
        className="h-10 w-16 rounded-lg border border-[#CFCFCF] bg-white px-2 text-sm text-[#3D3D3D] outline-none cursor-pointer disabled:cursor-default disabled:bg-gray-100"
      >
        <option value="">HH</option>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      {/* Minutes */}
      <select
        value={minute}
        disabled={disabled}
        onChange={handleMinuteChange}
        className="h-10 w-16 rounded-lg border border-[#CFCFCF] bg-white px-2 text-sm text-[#3D3D3D] outline-none cursor-pointer disabled:cursor-default disabled:bg-gray-100"
      >
        <option value="">MM</option>
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* AM / PM */}
      <select
        value={period}
        disabled={disabled}
        onChange={handlePeriodChange}
        className="h-10 w-20 rounded-lg border border-[#CFCFCF] bg-white px-2 text-sm text-[#3D3D3D] outline-none cursor-pointer disabled:cursor-default disabled:bg-gray-100"
      >
        <option value="">AM</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}