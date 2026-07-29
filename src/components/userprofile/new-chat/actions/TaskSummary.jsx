import React from "react";

export default function TaskSummary({
  data,
  actions = [],
  onAction,
}) {
  if (!data) return null;

  const rows = [
    { label: "Action", value: data.action },
    { label: "Date", value: data.date },
    { label: "Participants", value: data.participants },
    { label: "Apps", value: data.apps },
    { label: "Location", value: data.location || "-" },
    { label: "Priority", value: data.priority || "-" },
    { label: "Scheduled At", value: data.scheduled_at },
    { label: "Status", value: data.status },
  ];

  return (
    <div className="mt-3">
      {/* Title */}
      <h3 className="mb-3 text-base font-semibold text-[#111111]">
        {data.title}
      </h3>

      {/* Summary Card */}
      <div className="rounded-xl border border-[#D9D9D9] bg-white p-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-[#F1F1F1] py-2 last:border-b-0"
          >
            <span className="text-sm font-medium text-[#8D97A9]">
              {row.label}
            </span>

            <span className="text-right text-sm font-medium text-[#111111]">
              {row.value || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      {actions.length > 0 && (
        <div className="mt-4 flex gap-3">
          {actions.map((button) => (
            <button
              key={button.id}
              type="button"
              onClick={() => onAction(button.value)}
              className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all duration-200 ${
                button.kind === "confirm"
                  ? "border-[#4866F6] bg-[#4866F6] text-white"
                  : "border-[#4866F6] bg-white text-[#4866F6] hover:bg-[#EEF2FF]"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}