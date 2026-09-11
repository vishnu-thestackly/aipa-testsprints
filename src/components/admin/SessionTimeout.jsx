import React from "react";
import { X } from "lucide-react";
import LoginButton from "./LoginButton";
import clockCountdown from "../../assets/images/clockCountdown.svg"
import { useTheme } from "../../context/ThemeContext";

export default function SessionTimeout({ open, onClose, onLogin }) {
  if (!open) {
    return null;
  }

  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-[1px]">
      <div
        className={`
          relative
          w-full
          max-w-[650px]
          rounded-2xl
          px-8
          pb-8
          pt-10
          shadow-[0_14px_40px_rgba(19,34,94,0.2)]
          ${
            isDark
              ? "bg-[#050B1A] border border-[#39445F]"
              : "bg-[#f7f7f9]"
          }
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#f15055] text-[12px] leading-none text-white"
          aria-label="Close session timeout modal"
        >
          <X size={12} strokeWidth={3}  />
        </button>

        <div className="mx-auto mb-4 flex w-fit items-center justify-center">
          <img
            src={clockCountdown}
            alt="Session timeout"
            className="h-[72px] w-[72px]"
          />
        </div>

        <h3 className="mb-2 text-center text-[25px] font-semibold text-[#4866F6]">
          Session Timeout
        </h3>

        <p
          className={`
            mx-auto
            mb-6
            max-w-[430px]
            text-center
            text-[16px]
            font-normal
            leading-6
            ${
              isDark
                ? "text-[#8D97A9]"
                : "text-[#8d97a9]"
            }
          `}
        >
          For security reasons, your session has timed out. Please Log in again
          to access your account.
        </p>

        <div className="mx-auto mb-3 w-full max-w-[380px]  hover:bg-[#3B59E0]">
          <LoginButton onClick={onLogin}>Log In</LoginButton>
        </div>
      </div>
    </div>
  );
}