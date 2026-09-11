
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import LoginButton from "../components/admin/LoginButton";
import SessionTimeout from "../components/admin/SessionTimeout";
// import useIdleTimeout from "../hooks/useIdleTimeout");

import logo from "../assets/images/logoimage.svg";
import LogoDark from "../assets/images/Logoimg.svg";
import login_image from "../assets/images/login_image.png";
import login_image_dark from "../assets/images/login_image_dark.png";
import mail from "../assets/images/Mails.png";
import password from "../assets/images/Password.png";

// API
import { loginUser } from "../api/authApi";

// Theme
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Theme
  const { isDark } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // const handleSessionTimeout = useCallback(() => {
  //   setShowSessionTimeout(true);
  // }, []);

  // commented to check the error message for empty fields

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   setEmailError(false);
  //   setPasswordError(false);

  //   try {
  //     const response = await loginUser({
  //       email,
  //       password: userPassword,
  //     });

  //     console.log("Login Success:", response);

  //     navigate("/otp-verification", {
  //       state: {
  //         email,
  //         type: "admin-login",
  //       },
  //     });
  //   } catch (error) {
  //     console.log("Login Error:", error);

  //     setEmailError(true);
  //     setPasswordError(true);
  //   }
  // };

  // useIdleTimeout({
  //   timeoutMs: 15 * 60 * 1000,
  //   onTimeout: handleSessionTimeout,
  //   enabled: !showSessionTimeout,
  // });

  const handleLogin = async (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    // Empty field validation
    if (!email.trim()) {
      setEmailError("Enter Email Address");
    }

    if (!userPassword.trim()) {
      setPasswordError("Enter Password");
    }

    if (!email.trim() || !userPassword.trim()) {
      return;
    }

    try {
      await loginUser({
        email,
        password: userPassword,
      });

      navigate("/otp-verification", {
        state: {
          email,
          type: "admin-login",
        },
      });
    } catch {
      // Invalid credentials
      setEmailError("Invalid Email");
      setPasswordError("Invalid Password");
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
            "
          >
            Log In
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
            Enter your details below to continue
          </p>

          <form onSubmit={handleLogin} autoComplete="off">
            {/* EMAIL */}
            <div className="mb-5 sm:mb-4">
              <label
                className={`
                  mb-1
                  block
                  text-left
                  text-[16px]
                  ${isDark ? "text-white" : "text-gray-800"}
                `}
              >
                Email Address
              </label>

              {/* EMAIL INPUT CONTAINER */}
              <div
                className={`
                  flex
                  items-center
                  rounded-lg
                  border-2
                  px-3
                  py-2.5
                  sm:rounded-lg
                  transition-colors duration-300
                  ${
                    emailError
                      ? "border-[#ed3939]"
                      : isDark
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
                  autoComplete="off"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (emailError) {
                      setEmailError("");
                    }
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

              {/* EMAIL ERROR */}
              {emailError && (
                <p className="mt-1 text-[14px] leading-none text-[#ed3939]">
                  {emailError}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label
                className={`
                  mb-1
                  block
                  text-left
                  text-[16px]
                  ${isDark ? "text-white" : "text-gray-800"}
                `}
              >
                Password
              </label>

              {/* PASSWORD INPUT CONTAINER */}
              <div
                className={`
                  flex
                  items-center
                  rounded-lg
                  border-2
                  px-3
                  py-2.5
                  sm:rounded-lg
                  transition-colors duration-300
                  ${
                    passwordError
                      ? "border-[#ed3939]"
                      : isDark
                      ? "border-[#39445F] bg-[#050B1A]"
                      : "border-[#CFCFCF] bg-white"
                  }
                `}
              >
                {/* PASSWORD ICON */}
                <img
                  src={password}
                  alt=""
                  className={`
                    mr-2
                    h-5
                    w-5
                    ${isDark ? "opacity-75" : ""}
                  `}
                />

                {/* PASSWORD INPUT */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={userPassword}
                  autoComplete="new-password"
                  onChange={(event) => {
                    setUserPassword(event.target.value);

                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  placeholder="Enter your Password"
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

                {/* SHOW / HIDE PASSWORD */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`
                    cursor-pointer
                    ${isDark ? "text-[#8D97A9]" : "text-gray-400"}
                  `}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>

              {/* PASSWORD ERROR */}
              {passwordError && (
                <p className="mt-1 text-[14px] leading-none text-[#ed3939]">
                  {passwordError}
                </p>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="mb-6 text-right">
              <Link
                to="/send-email"
                className="
                  text-[16px]
                  font-medium
                  text-[#4866f6]
                  hover:underline
                "
              >
                Forgot Password ?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <LoginButton
              type="submit"
              className="
                font-medium
                text-[16px]
                sm:text-[16px]
                 hover:bg-[#3B59E0]
              "
            >
              Log In
            </LoginButton>
          </form>
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

      {/* SESSION TIMEOUT */}
      <SessionTimeout
        open={showSessionTimeout}
        onClose={() => setShowSessionTimeout(false)}
        onLogin={() => setShowSessionTimeout(false)}
      />
    </div>
  );
}


 