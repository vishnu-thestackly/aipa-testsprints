import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LoginButton from "../components/admin/LoginButton";
import SessionTimeout from "../components/admin/SessionTimeout";
// import useIdleTimeout from "../hooks/useIdleTimeout";

import logo from "../assets/images/logo.png";
import login_image from "../assets/images/login_image.png";
import mail from "../assets/images/Mails.png";
import password from "../assets/images/Password.png";

// api adding
import { loginUser } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);

  // const handleSessionTimeout = useCallback(() => {
  //   setShowSessionTimeout(true);
  // }, []);

// comented to check the error message for empty feilds

//   const handleLogin = async (event) => {
//   event.preventDefault();

//   setEmailError(false);
//   setPasswordError(false);

//   try {
//     const response = await loginUser({
//       email,
//       password: userPassword,
//     });

//     console.log("Login Success:", response);

//     // ✅ SAVE TOKEN (IMPORTANT) 
//     // const token = response?.token || response?.data?.token;

//     // if (token) {
//     //   localStorage.setItem("token", token);
//     // } else {
//     //   console.warn("Token not found in response");
//     // }

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
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#f5f7fa] px-5 py-8 sm:px-6 md:fixed md:inset-0 md:z-0 md:h-dvh md:min-h-0 md:justify-center md:overflow-hidden md:py-0 lg:relative lg:inset-auto lg:h-screen lg:min-h-screen">
      <div className="flex w-full max-w-6xl flex-1 flex-col items-center bg-[#f5f7fa] md:flex-none lg:h-full lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-18 lg:overflow-hidden lg:rounded-2xl">
        {/* Form column — phone: top; tablet: centered; desktop split at lg+ */}
        <div className="mx-auto flex w-full max-w-[420px] flex-col lg:max-w-none lg:flex-1 lg:px-6 lg:py-6">
          {/* Logo — centered on phone & tablet, left on desktop */}
          <div className="mb-20 mt-10 flex justify-center md:mb-20 md:mt-0 lg:mb-6 lg:justify-start">
            <img
              src={logo}
              alt="logo"
              className="w-45 max-w-full transition-transform duration-300 hover:scale-105 sm:w-52"
            />
          </div>

          {/* Title — left-aligned within form column */}
          <h2 className="mb-1 text-left text-[23px] font-semibold text-[#4866F6]">
            Log In
          </h2>
          <p className="mb-5 text-left text-[16px] font-normal text-[#8d97a9]">
            Enter your details below to continue
          </p>

          <form onSubmit={handleLogin} autoComplete="off">
            {/* Email */}
            <div className="mb-5 sm:mb-4">
              <label className="mb-1 block text-left text-[16px] text-gray-800">
                Email Address
              </label>
              <div
                className={`flex items-center rounded-lg border-2 bg-[#ffffff] px-3 py-2.5 sm:rounded-lg ${
                  emailError ? "border-[#ed3939]" : "border-[#cfcfcf]"
                }`}
              >
                <img src={mail} alt="" className="w-5 h-5 mr-2" />
                <input
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError(false);
                  }}
                  placeholder="Enter Email Address"
                  className="bg-transparent text-gray-800 outline-none w-full text-[15px] placeholder:text-gray-400"
                />
              </div>
              {emailError && (
                <p className="mt-1 text-[14px] leading-none text-[#ed3939]">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="mb-1 block text-left text-[16px] text-gray-800">
                Password
              </label>
              <div
                className={`flex items-center rounded-lg border-2 bg-[#ffffff] px-3 py-2.5 sm:rounded-lg ${
                  passwordError ? "border-[#ed3939]" : "border-[#cfcfcf]"
                }`}
              >
                <img src={password} alt="" className="w-5 h-5 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={userPassword}
                  autoComplete="new-password"
                  onChange={(event) => {
                    setUserPassword(event.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  placeholder="Enter your Password"
                  className="bg-transparent text-gray-800 outline-none w-full text-[15px] placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-[14px] leading-none text-[#ed3939]">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <Link
                to="/send-email"
                className="text-[16px] font-medium text-[#4866f6] hover:underline"
              >
                Forgot Password ?
              </Link>
            </div>

            {/* Button — full width of form column */}
            <LoginButton type="submit" className="font-medium text-[16px]">
              Log In
            </LoginButton>
          </form>
        </div>

        {/* RIGHT SIDE — hidden on mobile & tablet, shown from lg */}
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
