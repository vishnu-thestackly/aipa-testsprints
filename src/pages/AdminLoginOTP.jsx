import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logoimage.svg";
import login_image from "../assets/images/login_image.png";

// API
import { useLocation, useNavigate } from "react-router-dom";
import { verifyAdminLoginOTP, resendOtp } from "../api/authApi";

export default function AdminLoginOTP() {
  const [otpSlots, setOtpSlots] = useState(Array(6).fill(""));
  const [remainingSeconds, setRemainingSeconds] = useState(90);
  const [otpError, setOtpError] = useState("");

  const inputRefs = useRef([]);

  // Navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from login page
  const email = location.state?.email;
  const type = location.state?.type;

  // this code prevent direct otp page when refresh the epage
  useEffect(() => {
    if (!email) {
      navigate("/admin", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  // resend api endpoint function
  const handleResend = async (event) => {
    event.preventDefault();

    // Don't allow resend before timer ends
    if (remainingSeconds > 0) return;

    try {
      // API CALL
      const response = await resendOtp({
        email,
      });

      console.log("OTP Resent:", response);

      // Reset timer
      setRemainingSeconds(90);

      // Clear old OTP boxes
      setOtpSlots(Array(6).fill(""));

      // Clear old errors
      setOtpError("");

      // Focus first input
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.log("Resend OTP Error:", error);

      setOtpError("Failed to resend OTP");
    }
  };

  const formattedTime = `${String(remainingSeconds).padStart(2, "0")}s`;

  const handleOtpChange = (index, value) => {
    const digitOnly = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpSlots];
    updated[index] = digitOnly;
    setOtpSlots(updated);

    if (digitOnly && index < otpSlots.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpSlots[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (event.key === "Enter" && otpSlots.join("").length === 6) {
      handleVerifyOtp();
    }
  };

  // VERIFY OTP API
  const handleVerifyOtp = async () => {
    const enteredOtp = otpSlots.join("");

    // Validation
    if (enteredOtp.length !== 6) {
      setOtpError("Please enter valid 6 digit OTP");

      return;
    }

    try {
      // API CALL
      const response = await verifyAdminLoginOTP({
        email,
        otp: enteredOtp,
      });
      console.log("OTP Verified:", response);
      // Added token storage in localstorage

      localStorage.setItem(
        "token",

        response?.access_token || response?.data?.access_token,
      );

      localStorage.setItem(
        "refreshToken",
        response?.refresh_token || response?.data?.refresh_token,
      );

      // Navigate after success
      // Navigate based on flow type
      if (type === "signup") {
        navigate("/login");
      } else if (type === "admin-login") {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log("OTP Verification Error:", error);

      setOtpError("Invalid OTP");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#f5f7fa] px-5 py-8 sm:px-6 md:fixed md:inset-0 md:z-0 md:h-dvh md:min-h-0 md:justify-center md:overflow-hidden md:py-0 lg:relative lg:inset-auto lg:h-screen lg:min-h-screen">
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center bg-[#f5f7fa] md:flex-none lg:h-full lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-18 lg:overflow-hidden lg:rounded-2xl">
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6">
            <img
              src={logo}
              alt="Personal Assistant"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          <h2 className="mb-1 text-left md:text-center text-[23px] font-semibold text-[#4866F6]">
            OTP Verification
          </h2>
          <p className="mb-6 text-left md:text-center text-[16px] font-normal leading-tight text-[#8d97a9] sm:mb-8">
            We sent a verification code to your {email}
          </p>

          <div className="mb-6 flex w-full flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-3">
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
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleOtpKeyDown(index, event)}
                className="h-[48px] w-[48px] shrink-0 rounded-lg border-2 border-[#cfcfcf] bg-white text-center text-[18px] font-medium text-[#8D97A9] outline-none focus:border-[#33b469] placeholder:text-[#8D97A9] caret-transparent sm:h-[48px] sm:w-[48px] sm:rounded-lg sm:text-[18px]"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {/* OTP ERROR */}
          {otpError && (
            <p className="mb-4 text-center text-sm text-red-500">{otpError}</p>
          )}

          {/* VERIFY BUTTON */}
          <LoginButton
            onClick={handleVerifyOtp}
            className="mb-6 font-medium sm:mb-8"
          >
            Verify
          </LoginButton>

          <div className="text-center">
            <p className="mb-2 text-[16px] text-[#8d97a9]">
              Remaining time:{" "}
              <span className="font-medium text-[#4866f6]">
                {formattedTime}
              </span>
            </p>
            <p className="text-[16px] text-[#8d97a9]">
              Didn&apos;t got the code?{" "}
              <Link
                to="#"
                onClick={handleResend}
                aria-disabled={remainingSeconds > 0}
                className={`font-medium underline ${
                  remainingSeconds > 0
                    ? "pointer-events-none text-[#8d97a9]"
                    : "text-[#4866f6]"
                }`}
              >
                Resend
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden h-full min-h-0 flex-1 p-5 lg:flex lg:items-center lg:justify-center">
          <img
            src={login_image}
            alt="login visual"
            className="h-full max-h-[min(100%,42rem)] w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
