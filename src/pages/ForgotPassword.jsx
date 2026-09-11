import React, { useState } from "react";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logoimage.svg";
import login_image from "../assets/images/login_image.png";
import login_image_dark from "../assets/images/login_image_dark.png";
import mail from "../assets/images/Mails.png";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authApi";
import { useTheme } from "../context/ThemeContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  // Theme
  const { isDark } = useTheme();

  const handleSendEmail = async () => {
    if (!email) {
      setEmailError("Please enter email");
      return;
    }

    try {
      // API CALL
      const response = await forgotPassword({
        email,
      });

      console.log("Forgot Password Success:", response);

      // Navigate to OTP page
      navigate("/send-email-otp", {
        state: {
          email,
          type: "forgot-password",
        },
      });
    } catch (error) {
      console.log("Forgot Password Error:", error);

      setEmailError("Email not found");
    }
  };

  return (
    <div
      className={`
        flex min-h-screen w-full flex-col items-center
        overflow-x-hidden
        px-5 py-8
        sm:px-6
        md:fixed md:inset-0 md:z-0
        md:h-dvh md:min-h-0
        md:justify-center
        md:overflow-hidden
        md:py-0
        lg:relative lg:inset-auto
        lg:h-screen lg:min-h-screen
        transition-colors duration-300
        ${isDark ? "bg-[#010718]" : "bg-[#f5f7fa]"}
      `}
    >
      <div
        className={`
          flex w-full max-w-6xl flex-1 flex-col
          items-center
          md:flex-none
          lg:h-full lg:flex-1
          lg:flex-row
          lg:items-center
          lg:justify-center
          lg:gap-18
          lg:overflow-hidden
          lg:rounded-2xl
          transition-colors duration-300
          ${isDark ? "bg-[#010718]" : "bg-[#f5f7fa]"}
        `}
      >
        {/* LEFT SECTION */}
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
              lg:justify-start
            "
          >
            <img
              src={logo}
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
            "
          >
            Forgot Password
          </h2>

          {/* DESCRIPTION */}
          <p
            className={`
              mb-5
              text-left
              text-[16px]
              font-normal
              ${isDark ? "text-[#8D97A9]" : "text-[#8D97A9]"}
            `}
          >
            Enter your Email below to continue
          </p>

          {/* EMAIL FIELD */}
          <div className="mb-6">
            <label
              className={`
                mb-2
                block
                text-left
                text-[16px]
                ${isDark ? "text-white" : "text-gray-800"}
              `}
            >
              Email Address
            </label>

            {/* INPUT CONTAINER */}
            <div
              className={`
                flex
                items-center
                rounded-xl
                border-2
                px-3
                py-2.5
                sm:rounded-lg
                transition-colors duration-300
                ${
                  isDark
                    ? "border-[#39445F] bg-[#050B1A]"
                    : "border-[#CFCFCF] bg-white"
                }
              `}
            >
              {/* MAIL ICON */}
              <img
                src={mail}
                alt=""
                className={`
                  mr-2
                  h-5
                  w-5
                  ${isDark ? "opacity-75" : ""}
                `}
              />

              {/* EMAIL INPUT */}
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError("");
                }}
                placeholder="Enter Email Address"
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
            </div>

            {/* ERROR MESSAGE */}
            {emailError && (
              <p className="mt-1 text-sm text-red-500">
                {emailError}
              </p>
            )}
          </div>

          {/* SEND EMAIL BUTTON */}
          <LoginButton
            onClick={handleSendEmail}
            className="
              font-medium
              text-[16px]
              sm:text-[16px]
               hover:bg-[#3B59E0]
            "
          >
            Send Email
          </LoginButton>
        </div>

        {/* RIGHT IMAGE */}
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
            src={isDark ? login_image_dark : login_image}
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
 