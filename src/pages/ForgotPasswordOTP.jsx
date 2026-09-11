import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logoimage.svg";
import login_image from "../assets/images/login_image.png";
import login_image_dark from "../assets/images/login_image_dark.png";
import LogoDark from "../assets/images/Logoimg.svg";

// API
import { verifyResetPassword, resendOtp } from "../api/authApi";

// Theme
import { useTheme } from "../context/ThemeContext";

export default function ForgotPasswordOTP() {
  const [otpSlots, setOtpSlots] = useState(Array(6).fill(""));
  const [remainingSeconds, setRemainingSeconds] = useState(90);
  const [otpError, setOtpError] = useState("");

  // Theme
  const { isDark } = useTheme();

  const inputRefs = useRef([]);

  // Navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from previous page
  const email = location.state?.email;

  // Prevent direct access
  useEffect(() => {
    if (!email) {
      navigate("/send-email");
    }
  }, [email, navigate]);

  // Timer
  useEffect(() => {
    if (remainingSeconds === 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  // Resend OTP
  const handleResend = async (event) => {
    event.preventDefault();

    if (remainingSeconds > 0) return;

    try {
      await resendOtp({
        email,
      });

      // Reset timer
      setRemainingSeconds(90);

      // Clear OTP boxes
      setOtpSlots(Array(6).fill(""));

      // Clear errors
      setOtpError("");

      // Focus first box
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.log("Resend OTP Error:", error);
      setOtpError("Failed to resend OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otpSlots.join("");

    if (enteredOtp.length !== 6) {
      setOtpError("Please enter valid 6 digit OTP");
      return;
    }

    try {
      await verifyResetPassword({
        email,
        otp: enteredOtp,
      });

      // Navigate to reset password page
      navigate("/reset-password", {
        state: {
          email,
          otp: enteredOtp,
        },
      });
    } catch (error) {
      console.log("Verify OTP Error:", error);
      setOtpError("Invalid OTP");
    }
  };

  // Timer
  const formattedTime = `${String(
    remainingSeconds
  ).padStart(2, "0")}s`;

  // Handle OTP typing
  const handleOtpChange = (index, value) => {
    const digitOnly = value
      .replace(/\D/g, "")
      .slice(-1);

    const updated = [...otpSlots];
    updated[index] = digitOnly;

    setOtpSlots(updated);

    if (otpError) {
      setOtpError("");
    }

    // Auto focus next input
    if (
      digitOnly &&
      index < otpSlots.length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleOtpKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otpSlots[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div
      className={`
        flex
        min-h-screen
        w-full
        flex-col
        items-center
        overflow-x-hidden
        px-5
        py-8
        sm:px-6
        md:fixed
        md:inset-0
        md:z-0
        md:h-dvh
        md:min-h-0
        md:justify-center
        md:overflow-hidden
        md:py-0
        lg:relative
        lg:inset-auto
        lg:h-screen
        lg:min-h-screen
        transition-colors
        duration-300
        ${
          isDark
            ? "bg-[#010718]"
            : "bg-[#f5f7fa]"
        }
      `}
    >
      <div
        className={`
          flex
          w-full
          max-w-6xl
          flex-1
          flex-col
          items-center
          md:flex-none
          lg:h-full
          lg:flex-1
          lg:flex-row
          lg:items-center
          lg:justify-center
          lg:gap-18
          lg:overflow-hidden
          lg:rounded-2xl
          transition-colors
          duration-300
          ${
            isDark
              ? "bg-[#010718]"
              : "bg-[#f5f7fa]"
          }
        `}
      >
        {/* LEFT SIDE */}
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[420px]
            flex-col
            lg:max-w-none
            lg:flex-1
            lg:px-6
            lg:py-6
          "
        >
          {/* LOGO */}
          <div
            className="
              mb-20
              mt-10
              flex
              justify-center
              md:mb-20
              md:mt-0
              lg:mb-6

            "
          >
            <img
              src={isDark ? LogoDark : logo}
              alt="Personal Assistant"
              className="
                w-45
                max-w-full
                transition-transform
                duration-300
                hover:scale-105
                sm:w-52
              "
            />
          </div>

          {/* TITLE */}
          <h2
            className="
              mb-1
              text-left
              text-[23px]
              font-semibold
              text-[#4866F6]
              md:text-center
            "
          >
            OTP Verification
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mb-6
              text-left
              text-[16px]
              font-normal
              leading-tight
              text-[#8D97A9]
              sm:mb-8
              md:text-center
            "
          >
            We&apos;ve sent a 6-digit OTP to your
            registered email. Please enter
            the code below to continue.
          </p>

          {/* OTP INPUTS */}
          <div
            className="
              mb-6
              flex
              w-full
              flex-wrap
              items-center
              justify-center
              gap-2
              sm:mb-8
              sm:gap-3
            "
          >
            {otpSlots.map((slot, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={slot}
                placeholder="_"
                onChange={(event) =>
                  handleOtpChange(
                    index,
                    event.target.value
                  )
                }
                onKeyDown={(event) =>
                  handleOtpKeyDown(
                    index,
                    event
                  )
                }
                className={`
                  h-[48px]
                  w-[48px]
                  shrink-0
                  rounded-lg
                  border-2
                  text-center
                  text-[18px]
                  font-medium
                  outline-none
                  focus:border-[#33B469]
                  placeholder:text-[#8D97A9]
                  sm:h-[48px]
                  sm:w-[48px]
                  sm:rounded-lg
                  sm:text-[18px]

                  ${
                    isDark
                      ? `
                        border-[#39445F]
                        bg-[#050B1A]
                        text-white
                        caret-white
                      `
                      : `
                        border-[#CFCFCF]
                        bg-white
                        text-gray-800
                        caret-gray-800
                      `
                  }
                `}
                aria-label={`OTP digit ${
                  index + 1
                }`}
              />
            ))}
          </div>

          {/* ERROR */}
          {otpError && (
            <p
              className="
                mb-4
                text-center
                text-sm
                text-red-500
              "
            >
              {otpError}
            </p>
          )}

          {/* CONTINUE BUTTON */}
          <LoginButton
            onClick={handleVerifyOtp}
            className="
              mb-6
              font-medium
              text-[16px]
              sm:mb-8
              hover:bg-[#3B59E0]
            "
          >
            Continue
          </LoginButton>

          {/* TIMER */}
          <div className="text-center">
            <p
              className="
                mb-2
                text-[16px]
                text-[#8D97A9]
              "
            >
              Remaining time:{" "}
              <span
                className="
                  font-medium
                  text-[#4866F6]
                "
              >
                {formattedTime}
              </span>
            </p>

            {/* RESEND */}
            <p
              className="
                text-[16px]
                text-[#8D97A9]
              "
            >
              Didn&apos;t got the code?{" "}
              <Link
                to="#"
                onClick={handleResend}
                aria-disabled={
                  remainingSeconds > 0
                }
                className={`
                  font-medium
                  underline
                  ${
                    remainingSeconds > 0
                      ? "pointer-events-none text-[#4866F6]"
                      : "text-[#4866F6]"
                  }
                `}
              >
                Resend
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className="
            hidden
            h-full
            min-h-0
            flex-1
            p-5
            lg:flex
            lg:items-center
            lg:justify-center
          "
        >
          <img
            src={
              isDark
                ? login_image_dark
                : login_image
            }
            alt="login visual"
            className="
              h-full
              max-h-[min(100%,42rem)]
              w-full
              object-contain
            "
          />
        </div>
      </div>
    </div>
  );
}
 