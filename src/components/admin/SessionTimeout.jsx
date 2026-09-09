import React from "react";
import { X } from "lucide-react";
import LoginButton from "./LoginButton";
import clockCountdown from "../../assets/images/ClockCountdown.svg";
import { useTheme } from "../../context/ThemeContext";

export default function SessionTimeout({ open, onClose, onLogin }) {
  const { isDark } = useTheme();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]">
      <div className={`relative w-full max-w-[500px] md:max-w-[540px] rounded-[24px] ${
        isDark
          ? "bg-[#0B1530] border border-[#1E3A6D] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white"
          : "bg-[#f7f7f9] shadow-[0_14px_40px_rgba(19,34,94,0.2)]"
      } px-6 md:px-8 pb-8 pt-8 transition-colors duration-200`}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#f15055] text-black cursor-pointer hover:opacity-90 transition"
          aria-label="Close session timeout modal"
        >
          <X size={13} strokeWidth={3} className="text-black" />
        </button>

        <div className="mx-auto mb-4 flex w-fit items-center justify-center">
          <img
            src={clockCountdown}
            alt="Session timeout"
            className="h-[72px] w-[72px]"
          />
        </div>

        <h3 className="mb-2 text-center text-[24px] font-semibold text-[#4866F6]">
          Session Timeout
        </h3>

        <p className={`mx-auto mb-6 max-w-[430px] text-center text-[15px] font-normal leading-relaxed ${
          isDark ? "text-[#8D97A9]" : "text-[#8d97a9]"
        }`}>
          For security reasons, your session has timed out. Please Log in again
          to access your account.
        </p>

        <div className="mx-auto w-full max-w-[320px]">
          <LoginButton onClick={onLogin}>Log In</LoginButton>
        </div>
      </div>
    </div>
  );
}
