import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logoimage.svg";
import LogoDark from "../assets/images/Logoimg.svg";
import login_image from "../assets/images/login_image.png";
import login_image_dark from "../assets/images/login_image_dark.png";
import password from "../assets/images/Password.png";
import { useTheme } from "../context/ThemeContext";

export default function ForceResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDark } = useTheme();

  const requirements = useMemo(
    () => [
      { label: "Minimum 8 characters", valid: newPassword.length >= 8 },
      { label: "1 Uppercase", valid: /[A-Z]/.test(newPassword) },
      { label: "1 Lowercase", valid: /[a-z]/.test(newPassword) },
      { label: "1 Number", valid: /\d/.test(newPassword) },
      {
        label: "1 Special Charater",
        valid: /[^A-Za-z0-9]/.test(newPassword),
      },
    ],
    [newPassword],
  );

  const allRequirementsMet = requirements.every((r) => r.valid);
  const showStrengthBlock = newPassword.length > 0;

  const newPasswordBorderClass = (() => {
    if (!showStrengthBlock) {
      return isDark ? "border-[#39445F]" : "border-[#cfcfcf]";
    }

    if (allRequirementsMet) return "border-[#22c55e]";

    return "border-red-500";
  })();

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
        md:min-h-0
        md:justify-center
        overflow-y-auto
        md:py-0
        lg:relative
        lg:inset-auto
        lg:min-h-screen
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
          lg:rounded-2xl
          ${
            isDark
              ? "bg-[#010718]"
              : "bg-[#f5f7fa]"
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">

          {/* Logo */}
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6 lg:justify-start">
            <img
              src={isDark ? LogoDark : logo}
              alt="Personal Assistant"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          {/* Title */}
          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866f6]">
            Reset Password
          </h2>

          {/* Description */}
          <p className="mb-5 text-left text-[16px] leading-6 text-[#9CA3AF]">
            Your password must be changed every 90days due to security
            compliance.
          </p>

          {/* Old Password */}
          <div className="mb-4">
            <label
              className={`
                mb-2
                block
                text-left
                text-[16px]
                ${
                  isDark
                    ? "text-white"
                    : "text-gray-800"
                }
              `}
            >
              Old Password
            </label>

            <div
              className={`
                flex
                items-center
                rounded-xl
                border-2
                px-3
                py-2.5
                sm:rounded-lg
                ${
                  isDark
                    ? "border-[#39445F] bg-[#050B1A]"
                    : "border-[#cfcfcf] bg-white"
                }
              `}
            >
              <img
                src={password}
                alt=""
                className="mr-2 h-5 w-5"
              />

              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(event) =>
                  setOldPassword(event.target.value)
                }
                placeholder="Enter Old Password"
                className={`
                  w-full
                  bg-transparent
                  text-[15px]
                  outline-none
                  ${
                    isDark
                      ? "text-white placeholder:text-[#8D97A9]"
                      : "text-gray-800 placeholder:text-gray-400"
                  }
                `}
              />

              <button
                type="button"
                onClick={() =>
                  setShowOldPassword((prev) => !prev)
                }
                className={`
                  cursor-pointer
                  ${
                    isDark
                      ? "text-[#8D97A9]"
                      : "text-gray-400"
                  }
                `}
                aria-label="Toggle old password visibility"
              >
                {showOldPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label
              className={`
                mb-2
                block
                text-left
                text-[16px]
                ${
                  isDark
                    ? "text-white"
                    : "text-gray-800"
                }
              `}
            >
              New Password
            </label>

            <div
              className={`
                flex
                items-center
                rounded-xl
                border-2
                px-3
                py-2.5
                sm:rounded-lg
                ${
                  isDark
                    ? "bg-[#050B1A]"
                    : "bg-white"
                }
                ${newPasswordBorderClass}
              `}
            >
              <img
                src={password}
                alt=""
                className="mr-2 h-5 w-5"
              />

              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="Enter New Password"
                className={`
                  w-full
                  bg-transparent
                  text-[15px]
                  outline-none
                  ${
                    isDark
                      ? "text-white placeholder:text-[#8D97A9]"
                      : "text-gray-800 placeholder:text-gray-400"
                  }
                `}
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword((prev) => !prev)
                }
                className={`
                  cursor-pointer
                  ${
                    isDark
                      ? "text-[#8D97A9]"
                      : "text-gray-400"
                  }
                `}
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-3">
            <label
              className={`
                mb-2
                block
                text-left
                text-[16px]
                ${
                  isDark
                    ? "text-white"
                    : "text-gray-800"
                }
              `}
            >
              Confirm New Password
            </label>

            <div
              className={`
                flex
                items-center
                rounded-xl
                border-2
                px-3
                py-2.5
                sm:rounded-lg
                ${
                  isDark
                    ? "border-[#39445F] bg-[#050B1A]"
                    : "border-[#cfcfcf] bg-white"
                }
              `}
            >
              <img
                src={password}
                alt=""
                className="mr-2 h-5 w-5"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter New Password"
                className={`
                  w-full
                  bg-transparent
                  text-[15px]
                  outline-none
                  ${
                    isDark
                      ? "text-white placeholder:text-[#8D97A9]"
                      : "text-gray-800 placeholder:text-gray-400"
                  }
                `}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className={`
                  cursor-pointer
                  ${
                    isDark
                      ? "text-[#8D97A9]"
                      : "text-gray-400"
                  }
                `}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>

            {/* Password Strength */}
            {showStrengthBlock && (
              <div className="mt-1 mb-2 w-full max-w-[420px]">
                <p
                  className={`
                    mb-3
                    text-left
                    text-[14px]
                    font-medium
                    ${
                      allRequirementsMet
                        ? "text-[#33b569]"
                        : "text-[#ED3A3A]"
                    }
                  `}
                >
                  {allRequirementsMet
                    ? "Strong password"
                    : "Make your password strong"}
                </p>

                <div className="space-y-1.5">
                  {requirements.map((requirement) => (
                    <p
                      key={requirement.label}
                      className={`
                        flex
                        items-center
                        gap-2
                        text-left
                        text-[14px]
                        font-medium
                        ${
                          requirement.valid
                            ? "text-[#33b569]"
                            : "text-[#ED3A3A]"
                        }
                      `}
                    >
                      <span
                        className={`
                          inline-flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          ${
                            requirement.valid
                              ? "bg-[#33b569]"
                              : "bg-[#ED3A3A]"
                          }
                        `}
                      >
                        {requirement.valid ? (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        ) : (
                          <X
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </span>

                      {requirement.label}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Update Password */}
          <LoginButton
            className={`
              font-medium
              text-[16px]
               hover:bg-[#3B59E0]
              ${newPassword.length === 0 ? "mt-6" : ""}
            `}
          >
            Update Password
          </LoginButton>

          {/* Back to Login */}
          <p className="mt-6 text-center text-[16px] text-[#9CA3AF]">
            Back to{" "}
            <Link
              to="/"
              className="font-semibold text-[#4866f6] underline"
            >
              Log In
            </Link>
          </p>
        </div>

        {/* Right Image */}
        <div className="hidden h-full min-h-0 flex-1 p-5 lg:flex lg:items-center lg:justify-center">
          <img
            src={isDark ? login_image_dark : login_image}
            alt="login visual"
            className="h-full max-h-[min(100%,42rem)] w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}