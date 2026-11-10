import React from "react";
import { useTheme } from "../../../../context/ThemeContext";

export default function PriorityButtons({
  data,
  onAction,
}) {
  const { isDark } = useTheme();
  const buttons = data?.buttons || [];

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {buttons.map((button) => (
        <button
          key={button.value}
          type="button"
          onClick={() => onAction(button.value)}
          className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            button.variant === "filled"
              ? "border-[#4866F6] bg-[#4866F6] text-white hover:bg-[#3D56D9]"
              : isDark
              ? "border-[#4866F6] bg-[#181F2D] text-[#AFC0FF] hover:bg-[#25345C]"
              : "border-[#4866F6] bg-white text-[#4866F6] hover:bg-[#EEF2FF]"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}

 