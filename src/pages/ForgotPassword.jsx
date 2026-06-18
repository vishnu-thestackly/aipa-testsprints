import React, { useState } from "react";
import LoginButton from "../components/admin/LoginButton";

import logo from "../assets/images/logo.png";
import login_image from "../assets/images/login_image.png";
import mail from "../assets/images/Mails.png";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

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

      // Navigate OTP page
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

          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866F6]">
            Forgot Password
          </h2>
          <p className="mb-5 text-left text-[16px] font-normal text-[#8d97a9]">
            Enter your Email below to continue
          </p>

          <div className="mb-6">
            <label className="mb-2 block text-left text-[16px] text-gray-800">
              Email Address
            </label>
            <div className="flex items-center rounded-xl border-2 border-[#cfcfcf] bg-[#ffffff] px-3 py-2.5 sm:rounded-lg">
              <img src={mail} alt="" className="mr-2 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="dummyemail@gmail.com"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400"
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <LoginButton
            onClick={handleSendEmail}
            className="font-medium text-[16px] sm:text-[16px]"
          >
            Send Email
          </LoginButton>
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
