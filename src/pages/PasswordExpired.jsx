import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import SessionTimeout from "../components/admin/SessionTimeout";
import useIdleTimeout from "../hooks/useIdleTimeout";

import logo from "../assets/images/logo.png";
import login_image from "../assets/images/login_image.png";
import mail from "../assets/images/Mails.png";
import password from "../assets/images/Password.png";

export default function PasswordExpired() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);

  const handleSessionTimeout = useCallback(() => {
    setShowSessionTimeout(true);
  }, []);

  useIdleTimeout({
    timeoutMs: 60 * 1000,
    onTimeout: handleSessionTimeout,
    enabled: !showSessionTimeout,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#f5f7fa] px-5 py-8 sm:px-6 md:fixed md:inset-0 md:z-0 md:h-dvh md:min-h-0 md:justify-center md:overflow-hidden md:py-0 lg:relative lg:inset-auto lg:h-screen lg:min-h-screen">
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center bg-[#f5f7fa] md:flex-none lg:h-full lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-18 lg:overflow-hidden lg:rounded-2xl">
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6 lg:justify-start">
            <img
              src={logo}
              alt="logo"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866F6]">
            Log In
          </h2>
          <p className="mb-5 text-left text-[16px] font-normal text-[#8d97a9]">
            Enter your details below to continue
          </p>

          <div className="mb-4 sm:mb-4">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Email Address
            </label>
            <div className="flex items-center rounded-lg border-2 border-[#cfcfcf] bg-[#ffffff] px-3 py-2.5 sm:rounded-lg">
              <img src={mail} alt="" className="mr-2 h-5 w-5" />
              <input
                type="email"
                placeholder="dummyemail@gmail.com"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Password
            </label>
            <div className="flex items-center rounded-xl border-2 border-[#cfcfcf] bg-[#ffffff] px-3 py-2.5 sm:rounded-lg">
              <img src={password} alt="" className="mr-2 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="mb-6 text-right">
            <Link
              to="/send-email"
              className="text-[16px] font-medium text-[#4866f6] hover:underline"
            >
              Forgot Password ?
            </Link>
          </div>

          <div className="mb-6 flex w-full max-w-none items-start gap-3 rounded-lg border border-[#f59f0a] bg-[#fcf4e6] px-3 py-3">
            <AlertTriangle
              size={22}
              strokeWidth={1.6}
              className="shrink-0 text-[#f0a524]"
            />
            <p className="text-left text-[16px] leading-[1.45] text-[#8d97a9]">
              Password expiry enforcement : your password must be changed every
              90days due to security compliance{" "}
              <span className="font-medium text-[#ef4444]">(0 days left)</span>
            </p>
          </div>

          <Link to="/force-reset-password" className="block w-full">
            <button
              type="button"
              className="w-full rounded-full bg-[#4866f6] py-2.5 text-[16px] text-white transition hover:opacity-90"
            >
              Reset password
            </button>
          </Link>
        </div>

        <div className="hidden h-full min-h-0 flex-1 p-5 lg:flex lg:items-center lg:justify-center">
          <img
            src={login_image}
            alt="login visual"
            className="h-full max-h-[min(100%,42rem)] w-full object-contain"
          />
        </div>
      </div>

      <SessionTimeout
        open={showSessionTimeout}
        onClose={() => setShowSessionTimeout(false)}
        onLogin={() => setShowSessionTimeout(false)}
      />
    </div>
  );
}
