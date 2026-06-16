import React from "react";

export default function LoginButton({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`w-full bg-[#4866f6] text-white py-2.5 rounded-full text-[16px] hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
