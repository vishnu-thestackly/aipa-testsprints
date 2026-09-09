import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import SessionTimeout from "../components/admin/SessionTimeout";
import useIdleTimeout from "../hooks/useIdleTimeout";
import { useTheme } from "../context/ThemeContext";

import logo from "../assets/images/logoimage.svg";
import LogoDark from "../assets/images/Logoimg.svg";
import login_image from "../assets/images/login_image.png";
import login_image_dark from "../assets/images/login_image_dark.png";
import Mails from "../assets/images/Mails.png";
import Password from "../assets/images/Password.png";
import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.png";

export default function PasswordExpiryLogin() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [socialMsg, setSocialMsg] = useState("");

  const handleSessionTimeout = useCallback(() => {
    setShowSessionTimeout(true);
  }, []);

  useIdleTimeout({
    timeoutMs: 60 * 1000,
    onTimeout: handleSessionTimeout,
    enabled: !showSessionTimeout,
  });

  const handleAppleClick = () => {
    setSocialMsg("apple");
    setTimeout(() => setSocialMsg(""), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/user/new-chat");
  };

  return (
    <>
      <style>{`
        ${isDark ? `
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px #060C1F inset !important;
            -webkit-text-fill-color: #8D97A9 !important;
            caret-color: #8D97A9 !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
        ` : ''}
      `}</style>

      <div className={`min-h-screen w-full flex items-start lg:items-center justify-center p-0 lg:p-4 transition-colors duration-200 ${
        isDark ? "bg-[#060C1F]" : "bg-white lg:bg-[#F6F7FA]"
      }`}>
        <div className="w-full max-w-6xl lg:w-[1080px] xl:w-[1160px] bg-transparent min-h-screen lg:min-h-[640px] lg:h-[640px] xl:h-[680px] flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-center gap-0 lg:gap-16 xl:gap-20">
          {/* LEFT FORM */}
          <div className="w-full lg:w-1/2 max-w-md md:max-w-lg flex flex-col justify-start lg:justify-center px-6 md:px-8 pt-12 pb-8 lg:px-0 lg:pt-0 lg:pb-0 shrink-0">
            {/* LOGO */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 lg:mb-1">
              <img
                src={isDark ? LogoDark : logo}
                alt="logo"
                onClick={() => navigate("/")}
                className="h-9 md:h-10 lg:h-11 w-auto lg:w-[171px] object-contain cursor-pointer"
              />
            </div>

            <h1 className="text-[#4866F6] text-2xl md:text-3xl lg:text-2xl font-semibold mb-1 mt-5 lg:text-left cursor-pointer">
              Log In
            </h1>
            <p className="text-[#8D97A9] text-sm md:text-base lg:text-sm mb-6 lg:mb-5 lg:text-left">
              Enter your details below to continue
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-4 md:space-y-5 lg:space-y-4"
            >
              {/* EMAIL */}
              <div>
                <label className={`${isDark ? "text-white" : "text-gray-700"} text-sm md:text-base lg:text-sm mb-1.5 block`}>
                  Email Address
                </label>
                <div className="relative">
                  <img
                    className={`w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? "brightness-0 invert opacity-70" : ""
                    }`}
                    src={Mails}
                    alt=""
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className={`w-full h-12 md:h-14 lg:h-11 pl-10 md:pl-12 pr-3 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 text-[#8D97A9] placeholder-[#8D97A9] ${
                      isDark
                        ? "bg-[#060C1F] border-[#1E3A6D] focus:border-[#4866F6] focus:ring-[#4866F6]"
                        : "border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                    }`}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className={`${isDark ? "text-white" : "text-gray-700"} text-sm md:text-base lg:text-sm mb-1.5 block mt-5 lg:mt-0`}>
                  Password
                </label>
                <div className="relative">
                  <img
                    className={`w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                      isDark ? "brightness-0 invert opacity-70" : ""
                    }`}
                    src={Password}
                    alt=""
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className={`w-full h-12 md:h-14 lg:h-11 pl-10 md:pl-12 pr-10 md:pr-12 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 text-[#8D97A9] placeholder-[#8D97A9] ${
                      isDark
                        ? "bg-[#060C1F] border-[#1E3A6D] focus:border-[#4866F6] focus:ring-[#4866F6]"
                        : "border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer ${
                      isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5 -scale-x-100" />
                    )}
                  </button>
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end">
                <Link
                  to="/send-email"
                  className={`${
                    isDark ? "text-[#4866F6]" : "text-[#4F46E5]"
                  } text-sm md:text-base lg:mt-[-8px] lg:text-sm font-medium hover:underline cursor-pointer`}
                >
                  Forgot Password ?
                </Link>
              </div>

              {/* PASSWORD EXPIRY WARNING ALERT */}
              <div className={`flex items-start md:items-center gap-3 ${
                isDark
                  ? "bg-[#261C0C] border-[#F59E0B] text-[#F59E0B]"
                  : "bg-yellow-50 border-yellow-200 text-yellow-700"
              } border rounded-lg p-3.5`}>
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 md:mt-0 ${
                  isDark ? "text-[#F59E0B]" : "text-yellow-600"
                }`} />
                <p className="text-xs md:text-sm font-normal leading-snug">
                  Password expiry enforcement : your password must be changed
                  <br className="hidden sm:inline" /> every 90days due to security compliance{" "}
                  <span className="font-medium text-[#ED3A3A]">(3 days left)</span>
                </p>
              </div>

              {/* ACTION BUTTONS (LOG IN & RESET PASSWORD) */}
              <div className="flex w-full flex-row items-stretch gap-2 sm:gap-3">
                <button
                  type="submit"
                  className="cursor-pointer min-w-0 flex-1 h-12 md:h-14 lg:h-11 rounded-full bg-[#4866F6] text-white font-medium text-sm md:text-base lg:text-sm hover:bg-[#4338CA] transition"
                >
                  Log In
                </button>
                <Link to="/force-reset-password" className="min-w-0 flex-1">
                  <button
                    type="button"
                    className="cursor-pointer w-full min-w-0 h-12 md:h-14 lg:h-11 rounded-full bg-[#4866F6] text-white font-medium text-sm md:text-base lg:text-sm hover:bg-[#4338CA] transition"
                  >
                    Reset password
                  </button>
                </Link>
              </div>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-5 md:my-6 lg:my-3">
              <div className={`flex-1 h-px ${isDark ? "bg-[#1E3A6D]" : "bg-gray-300"}`}></div>
              <span className={`${isDark ? "text-[#586D93]" : "text-gray-400"} text-sm md:text-base lg:text-sm`}>
                or
              </span>
              <div className={`flex-1 h-px ${isDark ? "bg-[#1E3A6D]" : "bg-gray-300"}`}></div>
            </div>

            {/* SOCIAL BUTTONS */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3 mb-3">
              <button
                type="button"
                className="h-12 md:h-14 lg:h-10 bg-[#4866F6] text-white rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 hover:bg-[#4338CA] transition cursor-pointer"
              >
                Google{" "}
                <span>
                  <img
                    src={google}
                    alt="google"
                    className="w-4 h-4 md:w-5 md:h-5"
                  />
                </span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleAppleClick}
                  className="w-full h-12 md:h-14 lg:h-10 rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 bg-[#4866F6] text-white hover:bg-[#4338CA] transition cursor-pointer"
                >
                  Apple
                  <span className="flex items-center justify-center leading-none">
                    <img
                      src={apple}
                      alt="apple"
                      className="block w-[15.61px] h-[20px] md:w-5 md:h-5 brightness-0 invert"
                    />
                  </span>
                </button>

                {socialMsg === "apple" && (
                  <div className="absolute left-1/2 -translate-x-1/2 md:left-full md:ml-3 md:translate-x-0 top-full md:top-1/2 md:-translate-y-1/2 mt-2 md:mt-0 whitespace-nowrap z-10">
                    <p className={`text-[#4866F6] text-xs px-2 py-1 rounded border shadow-md ${
                      isDark ? "bg-[#0B1530] border-[#1E3A6D]" : "bg-blue-50 border-blue-200"
                    }`}>
                      Available soon
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* SIGN UP FOOTER */}
            <p className={`${isDark ? "text-[#94A3B8]" : "text-gray-500"} mt-3 text-sm md:text-base lg:text-sm text-center`}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className={`${isDark ? "text-[#4866F6]" : "text-[#4F46E5]"} lg:mt-[10px] font-semibold underline`}
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* RIGHT 3D VISUAL */}
          <div className="hidden h-full min-h-0 flex-1 lg:flex lg:items-center lg:justify-center">
            <img
              src={isDark ? login_image_dark : login_image}
              alt="login visual"
              className="h-full max-h-[580px] lg:max-h-[620px] xl:max-h-[660px] w-full max-w-[480px] xl:max-w-[540px] object-contain"
            />
          </div>
        </div>

        <SessionTimeout
          open={showSessionTimeout}
          onClose={() => setShowSessionTimeout(false)}
          onLogin={() => setShowSessionTimeout(false)}
        />
      </div>
    </>
  );
}
