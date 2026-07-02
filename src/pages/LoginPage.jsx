import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle, CheckCircle, X } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { IoLogoGoogle } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import logo from "../assets/images/logoimage.svg";
import login_image from "../assets/images/login_image.png";
import Password from "../assets/images/Password.png";
import Mails from "../assets/images/Mails.png";
import Group from "../assets/images/Group.jpeg";
import Groups from "../assets/images/Groups.jpeg";
import ClockCountdown from "../assets/images/ClockCountdown.svg";
import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.png";

//API
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, verifyCaptcha, googleLogin } from "../api/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [socialMsg, setSocialMsg] = useState("");
  const [appleDisabled, setAppleDisabled] = useState(true);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captcha_token, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [showLockedPopup, setShowLockedPopup] = useState(false);
  const [showUnlockedPopup, setShowUnlockedPopup] = useState(false);
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);

  const recaptchaRef = useRef();
  const navigate = useNavigate();

  const RECAPTCHA_SITE_KEY = "6LdIBOYsAAAAAN_9QolnI6KEqLk3HhPH1FBlw89b";

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSessionTimeout(true);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (isLocked && lockoutTime > 0) {
      interval = setInterval(() => {
        setLockoutTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttemptsLeft(5);
            setShowLockedPopup(false);
            setShowUnlockedPopup(true);
            setAppleDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setCaptchaError("");
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    if (value) setCaptchaError("");
  };

  const handleCloseUnlockedPopup = () => {
    setShowUnlockedPopup(false);
    setShowCaptcha(true);
  };

  // const handleAppleClick = () => {
  //   if (isLocked) return;
  //   setAppleDisabled(true);
  //   setSocialMsg("apple");
  //   setTimeout(() => setSocialMsg(""), 3000);
  // };
  const handleAppleClick = () => {
    if (isLocked || appleDisabled || attemptsLeft === 0) return;

    setSocialMsg("apple");
    setTimeout(() => setSocialMsg(""), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearErrors();

    setAppleDisabled(true);

    if (isLocked) {
      setShowLockedPopup(true);
      return;
    }

    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (showCaptcha && !captcha_token) {
      setCaptchaError("Please verify you are not a robot");
      hasError = true;
    }

    if (hasError) return;

    try {
      if (showCaptcha && captcha_token) {
        await verifyCaptcha(captcha_token);
      }

      // REQUEST BODY
      const userData = {
        email,
        password,
        captcha_token,
      };

      // LOGIN API CALL
      const response = await loginUser(userData);

      console.log("Login Success:", response);

      // STORE TOKEN
      if (!response?.access_token) {
        throw new Error("Token not received from backend");
      }

      localStorage.setItem("token", response.access_token);

      // RESET LOGIN STATES
      setAttemptsLeft(5);
      setShowCaptcha(false);
      setCaptchaValue(null);
      recaptchaRef.current?.reset();

      // DIRECT NAVIGATION
      navigate("/user-profile");
    } catch (error) {
      console.log("FULL LOGIN ERROR:", error);

      const detail = error?.detail;

      const message =
        typeof detail === "string"
          ? detail
          : detail?.message || error?.message || "";

      console.log("ACTUAL MESSAGE:", message);

      // ACCOUNT LOCKED
      if (detail?.message?.toLowerCase().includes("account locked")) {
        const lockedUntil = detail?.locked_until;

        if (lockedUntil) {
          const remainingSeconds = Math.max(
            0,
            Math.floor((new Date(lockedUntil).getTime() - Date.now()) / 1000),
          );

          setLockoutTime(remainingSeconds);
        }

        setIsLocked(true);
        setShowLockedPopup(true);

        return;
      }

      // USER NOT REGISTERED
      if (
        typeof error.detail === "string" &&
        error.detail === "User not registered"
      ) {
        setEmailError("Email not registered");
        return;
      }

      // ACCOUNT LOCKED
      if (typeof error.detail === "object" && error.detail?.locked_until) {
        const lockedUntil = new Date(error.detail.locked_until);

        const remainingSeconds = Math.floor((lockedUntil - new Date()) / 1000);

        setIsLocked(true);
        setLockoutTime(remainingSeconds);
        setShowLockedPopup(true);

        if (error.detail.requires_captcha) {
          setShowCaptcha(true);
        }

        return;
      }

      // INVALID PASSWORD / INVALID CREDENTIALS
      const newAttempts = attemptsLeft - 1;

      setAttemptsLeft(newAttempts);
      setPasswordError("Invalid Password");

      recaptchaRef.current?.reset();
      setCaptchaValue(null);

      if (newAttempts <= 0) {
        setIsLocked(true);
        setShowLockedPopup(true);
      }
    }
  };

  const SessionTimeoutPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40">
      <div className="rounded-xl p-5 md:p-6 w-full max-w-[380px] md:max-w-[450px] lg:w-[500px] lg:max-w-none lg:h-[270px] mx-4 lg:mx-0 text-center relative bg-white">
        <button
          onClick={() => setShowSessionTimeout(false)}
          className="absolute right-3 lg:right-4 top-3 lg:top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#f15055] text-white"
        >
          <X size={12} strokeWidth={3} />
        </button>
        <div className="flex justify-center mb-3 md:mb-4">
          <img
            className="w-10 h-10 md:w-12 md:h-12 mt-2"
            src={ClockCountdown}
            alt=""
          />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#4866F6]">
          Session Timeout
        </h3>
        <p className="text-[#8D97A9] text-xs md:text-sm mb-4 md:mb-5 px-2 md:px-0">
          For security reasons, your session has timed out. Please Log in again
          to access your account.
        </p>
        <button
          onClick={() => setShowSessionTimeout(false)}
          className="w-full md:w-[280px] lg:w-[300px] h-10 bg-[#4866F6] text-white rounded-3xl font-medium text-sm hover:bg-[#4338CA] transition"
        >
          Log In
        </button>
      </div>
    </div>
  );

  const LockedPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40">
      <div className="rounded-xl p-5 md:p-6 w-full max-w-[380px] md:max-w-[450px] lg:w-[500px] lg:max-w-none lg:h-[270px] mx-4 lg:mx-0 text-center relative bg-white">
        <button
          onClick={() => setShowLockedPopup(false)}
          className="absolute right-3 lg:right-4 top-3 lg:top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#f15055] text-white"
        >
          <X size={12} strokeWidth={3} />
        </button>
        <div className="flex justify-center mb-3 md:mb-4">
          <img src={Group} alt="" className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 w-full md:w-[380px] lg:w-[330px] mx-auto">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-[#ED3A3A] text-xs text-left">
            Account locked due to multiple failed login attempts. Please try
            again in {formatTime(lockoutTime)}
          </p>
        </div>
        <button
          onClick={() => setShowLockedPopup(false)}
          className="w-full md:w-[380px] lg:w-[330px] h-10 bg-[#CFCFCF] text-gray-600 rounded-3xl font-medium text-sm hover:bg-gray-300 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const UnlockedPopup = () => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="rounded-xl p-5 md:p-6 w-full max-w-[380px] md:max-w-[450px] lg:w-[500px] lg:max-w-none lg:h-[270px] mx-4 lg:mx-0 text-center relative bg-white">
        <button
          onClick={handleCloseUnlockedPopup}
          className="absolute right-3 lg:right-4 top-3 lg:top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#f15055] text-white"
        >
          <X size={12} strokeWidth={3} />
        </button>
        <div className="flex justify-center mb-3 md:mb-4">
          <img src={Groups} alt="" className="w-10 h-10 md:w-12 md:h-12 mt-2" />
        </div>
        <div className="flex items-center gap-2 bg-green-50 w-full md:w-[380px] lg:w-[330px] mx-auto border border-green-200 rounded-lg p-3 mb-5">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          <p className="text-green-600 text-xs text-left">
            "Account unlocked. Please try logging in again."
          </p>
        </div>
        <button
          onClick={handleCloseUnlockedPopup}
          className="w-full md:w-[380px] lg:w-[290px] h-10 bg-[#4F46E5] text-white rounded-3xl font-medium text-sm hover:bg-[#4338CA] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
.recaptcha-wrapper iframe + div {
        display: none!important;
      }
    `}</style>

      <div className="min-h-screen w-full bg-white lg:bg-[#F6F7FA] flex items-start lg:items-center justify-center p-0 lg:p-4">
        <div className="w-full max-w-6xl lg:w-[1000px] bg-transparent min-h-screen lg:min-h-[600px] lg:h-[600px] flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-center gap-0 lg:gap-25">
          <div className="w-full lg:w-1/2 max-w-md md:max-w-lg flex flex-col justify-start lg:justify-center px-6 md:px-8 pt-12 pb-8 lg:px-0 lg:pt-0 lg:pb-0">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 lg:mb-1">
              <img
                src={logo}
                alt="logo"
                className="h-9 md:h-10 lg:h-11 w-auto lg:w-[171px] object-contain"
              />
            </div>

            <h1 className="text-[#4866F6] text-2xl md:text-3xl lg:text-2xl font-semibold mb-1 mt-5 lg:text-left">
              Log In
            </h1>
            <p className="text-[#8D97A9] text-sm md:text-base lg:text-sm mb-6 lg:mb-5 lg:text-left">
              Enter your details below to continue
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-4 md:space-y-5 lg:space-y-4"
            >
              <div>
                <label className="text-gray-700 text-sm md:text-base lg:text-sm mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <img
                    className="w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2"
                    src={Mails}
                    alt=""
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="Enter Email Address"
                    disabled={isLocked}
                    className={`w-full h-12 md:h-14 lg:h-11 pl-10 md:pl-12 pr-3 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      emailError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                    }`}
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label className="text-gray-700 text-sm md:text-base lg:text-sm mb-1.5 block mt-5 lg:mt-0">
                  Password
                </label>
                <div className="relative">
                  <img
                    className="w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2"
                    src={Password}
                    alt=""
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    placeholder="Enter your Password"
                    disabled={isLocked}
                    className={`w-full h-12 md:h-14 lg:h-11 pl-10 md:pl-12 pr-10 md:pr-12 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      passwordError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/send-email")}
                  disabled={isLocked}
                  className="text-[#4F46E5] text-sm md:text-base lg:mt-[-8px] lg:text-sm font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Forgot Password?
                </button>
              </div>

              {showCaptcha && (
                <div className="flex justify-center scale-90 lg:mr-[170px] md:scale-100 origin-center">
                  <div className="recaptcha-wrapper">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onCaptchaChange}
                    />
                  </div>
                </div>
              )}
              {captchaError && (
                <p className="text-red-500 text-xs md:text-sm text-center mt-1">
                  {captchaError}
                </p>
              )}

              {attemptsLeft < 5 && attemptsLeft > 0 && !isLocked && (
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <p className="text-yellow-700 text-xs md:text-sm">
                    {attemptsLeft} attempt{attemptsLeft > 1 ? "s" : ""}{" "}
                    remaining before account lockout
                  </p>
                </div>
              )}

              {isLocked && (
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <p className="text-gray-600 text-xs md:text-sm">
                    Account locked. Try again in {formatTime(lockoutTime)}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLocked}
                className="w-full h-12 md:h-14 lg:h-11 bg-[#4866F6] text-white rounded-full font-medium text-sm md:text-base lg:text-sm hover:bg-[#4338CA] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Log In
              </button>
            </form>

            <div className="flex items-center gap-3 my-5 md:my-6 lg:my-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm md:text-base lg:text-sm">
                or
              </span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3 mb-3">
              <div className="hidden">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const response = await googleLogin({
                        id_token: credentialResponse.credential,
                      });

                      console.log("Google Auth Success:", response);
                      navigate("/conversation");
                    } catch (error) {
                      console.log("Google Auth Error:", error);
                    }
                  }}
                  onError={() => console.log("Google Login Failed")}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const googleBtn =
                    document.querySelector('div[role="button"]');

                  if (googleBtn) {
                    googleBtn.click();
                  }
                }}
                className="h-12 md:h-14 lg:h-10 bg-[#4866F6] text-white rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 hover:bg-[#4338CA] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                  disabled={appleDisabled || isLocked || attemptsLeft === 0}
                  onClick={handleAppleClick}
                  className={`w-full h-12 md:h-14 lg:h-10 rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 transition ${
                    appleDisabled || isLocked || attemptsLeft === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#4866F6] text-white hover:bg-[#4338CA]"
                  }`}
                >
                  Apple
                  <span className="flex items-center justify-center leading-none">
                    <img
                      src={apple}
                      alt="apple"
                      className="block w-[15.61px] h-[20px] md:w-5 md:h-5"
                    />
                  </span>
                </button>

                {socialMsg === "apple" && (
                  <div className="absolute left-1/2 -translate-x-1/2 md:left-full md:ml-3 md:translate-x-0 top-full md:top-1/2 md:-translate-y-1/2 mt-2 md:mt-0 whitespace-nowrap z-10">
                    <p className="text-[#4866F6] text-xs bg-blue-50 px-2 py-1 rounded border border-blue-200 shadow-md">
                      Available soon
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-500 mt-3 text-sm md:text-base lg:text-sm text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#4F46E5] lg:mt-[10px] font-semibold underline"
              >
                Sign Up
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

        {showSessionTimeout && <SessionTimeoutPopup />}
        {showLockedPopup && <LockedPopup />}
        {showUnlockedPopup && <UnlockedPopup />}
      </div>
    </>
  );
}
