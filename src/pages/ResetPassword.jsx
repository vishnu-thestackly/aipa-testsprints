import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logoimage.svg";
import login_image from "../assets/images/login_image.png";
import password from "../assets/images/Password.png";

// API
import { resetPassword } from "../api/authApi";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // Navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from OTP page
  const email = location.state?.email;
  const otp = location.state?.otp;

  // Password rules
  const requirements = useMemo(
    () => [
      { label: "Minimum 8 characters", valid: newPassword.length >= 8 },
      { label: "1 Uppercase", valid: /[A-Z]/.test(newPassword) },
      { label: "1 Lowercase", valid: /[a-z]/.test(newPassword) },
      { label: "1 Number", valid: /\d/.test(newPassword) },
      { label: "1 Special Character", valid: /[^A-Za-z0-9]/.test(newPassword) },
    ],
    [newPassword],
  );

  const allRequirementsMet = requirements.every((r) => r.valid);
  const showStrengthBlock = newPassword.length > 0;

  const newPasswordBorderClass = (() => {
    if (!showStrengthBlock) return "border-[#cfcfcf]";
    if (allRequirementsMet) return "border-[#22c55e]";
    return "border-red-500";
  })();

  // Reset Password Function
  const handleResetPassword = async () => {
    // Empty validation
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill all fields");

      return;
    }

    // Match validation
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");

      return;
    }

    // Strength validation
    if (!allRequirementsMet) {
      setPasswordError("Password is not strong enough");

      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp,
        new_password: newPassword,
      });

      alert("Password reset successful");

      // Redirect login page
      navigate("/login");
    } catch (error) {
      console.log(error);

      setPasswordError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#f5f7fa] px-5 py-8 sm:px-6 md:fixed md:inset-0 md:z-0 md:h-dvh md:min-h-0 md:justify-center md:overflow-hidden md:py-0 lg:relative lg:inset-auto lg:h-screen lg:min-h-screen">
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center bg-[#f5f7fa] md:flex-none lg:h-full lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-18 lg:overflow-hidden lg:rounded-2xl">
        {/* LEFT SIDE */}
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">
          {/* Logo */}
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6 lg:justify-start">
            <img
              src={logo}
              alt="Personal Assistant"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          {/* Title */}
          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866f6]">
            Reset Password
          </h2>
          <p className="mb-5 text-left text-[16px] text-[#9CA3AF]">
            Enter your new password below to continue
          </p>

          {/* New Password */}
          <div className="mb-4">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              New Password
            </label>
            <div
              className={`flex items-center rounded-xl border-2 bg-white px-3 py-2.5 sm:rounded-lg ${newPasswordBorderClass}`}
            >
              <img src={password} alt="" className="mr-2 h-5 w-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError("");
                  }
                }}
                placeholder="New Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="text-gray-400 cursor-pointer"
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Confirm New Password
            </label>
            <div className="flex items-center rounded-xl border-2 border-[#cfcfcf] bg-white px-3 py-2.5 sm:rounded-lg">
              <img src={password} alt="" className="mr-2 h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError("");
                  }
                }}
                placeholder="Confirm New Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-400 cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength */}
            {showStrengthBlock && (
              <div className="mt-1 mb-2 w-full max-w-[420px]">
                <p
                  className={`mb-3 text-left text-[14px] font-medium ${
                    allRequirementsMet ? "text-[#33b569]" : "text-[#ED3A3A]"
                  }`}
                >
                  {allRequirementsMet
                    ? "Strong password"
                    : "Make your password strong"}
                </p>
                <div className="space-y-1.5">
                  {requirements.map((requirement) => (
                    <p
                      key={requirement.label}
                      className={`flex items-center gap-2 text-left text-[14px] font-medium ${
                        requirement.valid ? "text-[#33b569]" : "text-[#ED3A3A]"
                      }`}
                    >
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          requirement.valid ? "bg-[#33b569]" : "bg-[#ED3A3A]"
                        }`}
                      >
                        {requirement.valid ? (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        ) : (
                          <X size={10} className="text-white" strokeWidth={3} />
                        )}
                      </span>
                      {requirement.label}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {passwordError && (
            <p className="mb-4 text-sm text-red-500">{passwordError}</p>
          )}

          {/* Save Button */}
          <LoginButton
            onClick={handleResetPassword}
            disabled={loading}
            className={`font-medium text-[16px] ${newPassword.length === 0 ? "mt-6" : ""}`}
          >
            {loading ? "Saving..." : "Save"}
          </LoginButton>
        </div>

        {/* RIGHT SIDE */}
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
