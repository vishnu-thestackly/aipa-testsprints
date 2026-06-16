


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle2, XCircle, Mail, Lock ,Check, X } from "lucide-react";
import { IoLogoGoogle } from "react-icons/io";
import { FaApple } from "react-icons/fa";


import logo from "../assets/images/logo.png"
import login_image from "../assets/images/login_image.png"
import Password from "../assets/images/Password.png"
import Mails from "../assets/images/Mails.png"

import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.png";
// Api 
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../api/authApi";
import { signupUser } from "../api/authApi";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [socialMsg, setSocialMsg] = useState("");
  const isAppleDisabled = true;
  const navigate = useNavigate();

  const validations = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[@$!%*?&]/.test(password),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // endpoint added

// const handleSignUp = async (e) => {
//   e.preventDefault();

//   setPasswordTouched(true);

//   if (!isEmailValid || !isPasswordValid) {
//     return;
//   }

//   try {
//      // API CALL
//     const response = await signupUser({
//       email,
//       password,
//     });

//     console.log("Verify Email Success:", response);

//     // Redirect to OTP page
//     navigate("/signup-otp", {
//       state: {
//         email,
//         type: "signup",
//       },
//     });

//   } catch (error) {

//     console.log("Signup Error:", error);
//  // Backend error message
//     alert(
//       error?.response?.data?.message ||
//       "Email already exists"
//     );
//   }
// };


const handleSignUp = async (e) => {
  e.preventDefault();

  setPasswordTouched(true);

  let hasError = false;

  // EMAIL VALIDATION
if (!email.trim()) {
  setEmailError("Email is required");
  hasError = true;
} 
else if (!isEmailValid(email)) {
  setEmailError("Invalid email format");
  hasError = true;
} 
else {
  setEmailError(""); // IMPORTANT RESET
}

  // ❗ PASSWORD VALIDATION
  if (!isPasswordValid) {
    hasError = true;
  }

  // STOP IF ANY ERROR
  if (hasError) return;

  try {
    const response = await signupUser({
      email,
      password,
    });

    setEmailError(""); 

    navigate("/signup-otp", {
      state: {
        email,
        type: "signup",
      },
    });

  } catch (error) {
  console.log("Signup Error:", error);

  const message =
    error?.response?.data?.message;

  if (message?.toLowerCase().includes("exists")) {
    setEmailError("Email already exists");
  } else {
    setEmailError("Something went wrong. Please try again.");
  }
}
};

  const handleAppleClick = () => {
    setSocialMsg("apple");
    setTimeout(() => setSocialMsg(""), 3000);
  };

  const ValidationItem = ({ isValid, text }) => (
    <div className="flex items-center gap-2">
      {isValid? (
        <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
        </div>
      ) : (
        <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" strokeWidth={3} />
        </div>
      )}
      <span className={`text-xs md:text-sm ${isValid? 'text-green-600' : 'text-red-500'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-white lg:bg-[#F6F7FA] flex items-start lg:items-center justify-center p-0 lg:p-4">
      <div className="w-full max-w-6xl lg:w-[1000px] bg-transparent min-h-screen lg:min-h-[600px] lg:h-[600px] flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-center gap-0 lg:gap-25">
        
        <div className="w-full lg:w-1/2 max-w-md md:max-w-lg flex flex-col justify-start lg:justify-center px-6 md:px-8 pt-12 pb-8 lg:px-0 lg:pt-0 lg:pb-0">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6 lg:mb-4 lg:mt-0">
            <img src={logo} alt="logo" className="h-9 md:h-10 lg:h-10  w-auto object-contain" />
          </div>

          <h1 className="text-[#4866F6] text-2xl md:text-3xl mt-[30px] lg:text-2xl font-semibold mb-1  mt-[10px]  lg:mt-[10px] lg:text-left">Sign Up</h1>
          <p className="text-[#8D97A9] text-sm md:text-base lg:text-sm mb-5  lg:text-left">Enter your details below to continue</p>

          <form onSubmit={handleSignUp} className="space-y-4 md:space-y-5 lg:space-y-4">
            <div>
              <label className="text-gray-700 text-sm md:text-base lg:text-sm mb-1.5 block">Email Address</label>
              <div className="relative">
                <img className="w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2" src={Mails} alt="" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(""); // clear while typing
                    }}
                    
                    onBlur={() => {
                      if (!email.trim()) {
                        setEmailError("Email is required");
                      } else if (!isEmailValid(email)) {
                        setEmailError("Invalid email format");
                      }
                    }}
                  placeholder="Enter Email Address"
                  className={`w-full h-11 md:h-14 lg:h-11 pl-10 md:pl-12 pr-3 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 ${
                    emailError 
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500' 
                      : email && isEmailValid(email)
                ? 'border-green-400 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]'
                  }`}
                />
              </div>
              {emailError && <p className="text-red-500 text-xs md:text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <label className="text-gray-700 text-sm md:text-base lg:text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <img className="w-4 h-4 md:w-5 md:h-5 absolute left-3.5 top-1/2 -translate-y-1/2" src={Password} alt="" />
                <input
                  type={showPassword? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!passwordTouched) setPasswordTouched(true);
                  }}
                  placeholder="Enter your password"
                  className={`w-full h-11 md:h-14 lg:h-11 pl-10 md:pl-12 pr-10 md:pr-12 border rounded-lg text-sm md:text-base lg:text-sm outline-none focus:ring-1 ${
                    passwordTouched &&!isPasswordValid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                      : passwordTouched && isPasswordValid
                ? 'border-green-400 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-[#4F46E5] focus:ring-[#4F46E5]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
            </div>
            
            {passwordTouched && (
              <div className="mt-2 space-y-1 md:space-y-1.5">
                <p className={`text-xs md:text-sm mb-1.5 ${isPasswordValid? 'text-green-600' : 'text-red-500'}`}>
                  {isPasswordValid? 'Your password is strong' : 'Make your password strong'}
                </p>
                <ValidationItem isValid={validations.minLength} text="Minimum 8 characters" />
                <ValidationItem isValid={validations.uppercase} text="1 Uppercase" />
                <ValidationItem isValid={validations.lowercase} text="1 Lowercase" />
                <ValidationItem isValid={validations.number} text="1 Number" />
                <ValidationItem isValid={validations.specialChar} text="1 Special Character" />
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 md:h-14 lg:h-11 bg-[#4866F6] text-white rounded-full font-medium text-sm md:text-base lg:text-sm hover:bg-[#4338CA] transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center gap-3 my-3 md:my-4 lg:my-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm md:text-base lg:text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-3 mb-3">
            
          {/* // Added google styling api */}
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
                const googleBtn = document.querySelector(
                  'div[role="button"]'
                );
              
                if (googleBtn) {
                  googleBtn.click();
                }
              }}
           
              className="h-10 md:h-14 lg:h-10 bg-[#4866F6] text-white rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 hover:bg-[#4338CA] transition"
            >
              Google <span><img src={google} alt="google" className="w-4 h-4 md:w-5 md:h-5"/></span>
            </button>
            
            <div className="relative">
              <button 
                type="button"
                disabled={isAppleDisabled}
                onClick={handleAppleClick}
                className={`w-full h-10 md:h-14 lg:h-10 rounded-full font-medium text-sm md:text-base lg:text-sm flex items-center justify-center gap-2 transition
    ${isAppleDisabled 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70" 
      : "bg-[#4866F6] text-white hover:bg-gray-400"
    }
  `}
              >
                Apple <span className="flex items-center justify-center leading-none">
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
            Already have an account?{" "}
            <Link to="/login" className="text-[#4F46E5] font-semibold underline">
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