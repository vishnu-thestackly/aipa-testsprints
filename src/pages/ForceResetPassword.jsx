import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logo.png";
import login_image from "../assets/images/login_image.png";
import password from "../assets/images/Password.png";

export default function ForceResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requirements = useMemo(
    () => [
      { label: "Minimum 8 characters", valid: newPassword.length >= 8 },
      { label: "1 Uppercase", valid: /[A-Z]/.test(newPassword) },
      { label: "1 Lowercase", valid: /[a-z]/.test(newPassword) },
      { label: "1 Number", valid: /\d/.test(newPassword) },
      { label: "1 Special Charater", valid: /[^A-Za-z0-9]/.test(newPassword) },
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

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#f5f7fa] px-5 py-8 sm:px-6 md:fixed md:inset-0 md:z-0 md:h-dvh md:min-h-0 md:justify-center md:overflow-hidden md:py-0 lg:relative lg:inset-auto lg:h-screen lg:min-h-screen">
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center bg-[#f5f7fa] md:flex-none lg:h-full lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-18 lg:overflow-hidden lg:rounded-2xl">
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6 lg:justify-start">
            <img
              src={logo}
              alt="Personal Assistant"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866f6]">
            Reset Password
          </h2>
          <p className="mb-5 text-left text-[16px] leading-6 text-[#9CA3AF]">
            Your password must be changed every 90days due to security
            compliance.
          </p>

          <div className="mb-4">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Old Password
            </label>
            <div className="flex items-center rounded-xl border-2 border-[#cfcfcf] bg-white px-3 py-2.5 sm:rounded-lg">
              <img src={password} alt="" className="mr-2 h-5 w-5" />
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                placeholder="Enter Old Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="text-gray-400"
                aria-label="Toggle old password visibility"
              >
                {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

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
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter New Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="text-gray-400"
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Confirm New Password
            </label>
            <div className="flex items-center rounded-xl border-2 border-[#cfcfcf] bg-white px-3 py-2.5 sm:rounded-lg">
              <img src={password} alt="" className="mr-2 h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter New Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-400"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

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

          <LoginButton
            className={`font-medium text-[16px] ${newPassword.length === 0 ? "mt-6" : ""}`}
          >
            Update Password
          </LoginButton>

          <p className="mt-6 text-center text-[16px] text-[#9CA3AF]">
            Back to{" "}
            <Link to="/" className="font-semibold text-[#4866f6] underline">
              Log In
            </Link>
          </p>
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
