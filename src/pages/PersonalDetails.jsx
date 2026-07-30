import React, { useState, useEffect, useRef } from "react";
import ProfileNavbar from "../components/common/ProfileNavbar";
import OnboardingStepper from "../components/preference/OnboardingStepper";
import { ChevronDown } from "lucide-react";

import BackGroundImage from "../assets/images/bghome.png";
import Downarrow from "../assets/images/Downarrow.png";
import Flag from "../assets/images/Flag.svg";
import UploadImage from "../assets/images/UploadImage.svg";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";
import { savePersonalDetails, uploadAvatar,skipOnboarding,  getCountryCodes, } from "../api/authApi";

const PersonalDetails = () => {
  const countryDropdownRef = useRef(null);
  const [showLanguage, setShowLanguage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skipLoading, setSkipLoading] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [imageError, setImageError] = useState("");
  const [profilePreview, setProfilePreview] = useState("");
  const [countries, setCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const { data, updateOnboarding } = useOnboarding();
  

  const navigate = useNavigate();
  
  // STEP DATA
  const steps = [
    "Personal Details",
    "AI Preferences",
    "Connect Integrations",
    "Notification Setup",
    "Completion",
  ];


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      countryDropdownRef.current &&
      !countryDropdownRef.current.contains(event.target)
    ) {
      setShowCountryDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  if (data.avatarPreview) {
    setProfilePreview(data.avatarPreview);
  }
}, [data.avatarPreview]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      updateOnboarding({ fullName: value });
      if (value.trim()) setFullNameError("");
      return;
    }

    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      updateOnboarding({ mobile: digitsOnly });

      if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
        setMobileError("Mobile number must be 10 digits");
      } else {
        setMobileError("");
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    console.log("avatarFile:", data.avatarFile);
console.log("avatarFileName:", data.avatarFileName);

    if (!validTypes.includes(file.type)) {
      setImageError("Please upload JPG, JPEG or PNG image.");
      return;
    }

    setImageError("");
    updateOnboarding({ avatarFileName: file.name , avatarFile: file});

    const reader = new FileReader();

reader.onloadend = () => {
  setProfilePreview(reader.result);

  updateOnboarding({
    avatarFileName: file.name,
    avatarFile: file,
    avatarPreview: reader.result,
  });
};

reader.readAsDataURL(file);
  };

  const handleContinue = async () => {
    let hasError = false;

    if (!data.fullName.trim()) {
      setFullNameError("Full Name is required");
      hasError = true;
    } else {
      setFullNameError("");
    }

    if (data.mobile.length !== 10) {
      setMobileError("Mobile number must be 10 digits");
      hasError = true;
    } else {
      setMobileError("");
    }

    if (hasError) return;

try {
  setLoading(true);

  // Upload avatar first
  if (data.avatarFile instanceof File) {
  const avatarResponse = await uploadAvatar(data.avatarFile);

  updateOnboarding({
    avatarUrl: avatarResponse.avatar_url,
  });
}

  const payload = {
  name: data.fullName,
  country_code: data.countryCode,
  phone: data.mobile,
};

  const response = await savePersonalDetails(payload);

  console.log("Personal Details Saved:", response);

  setCurrentStep(2);
  navigate("/aipreferences");
}catch (error) {
  console.error("Personal Details Error:", error);
  alert(error.response?.data?.message || "Failed to save personal details.");
}finally {
  setLoading(false);
}
  };

  const fullNameInputClass = `w-full h-[54px] rounded-[10px] px-4 outline-none transition-colors ${
    fullNameError
      ? "border border-red-500 focus:border-red-500"
      : "border border-[#D9D9D9] focus:border-[#4866F6]"
  }`;

  const mobileInputClass = `w-full h-[54px] rounded-[10px] pl-20 pr-4 outline-none transition-colors ${
    mobileError
      ? "border border-red-500 focus:border-red-500"
      : "border border-[#D9D9D9] focus:border-[#4866F6]"
  }`;

  const uploadBoxClass = `w-full border-2 border-dashed rounded-[18px] py-[20px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
    imageError
      ? "border-red-500 hover:border-red-500"
      : "border-[#C8D3FF] hover:border-[#4D6BFE]"
  }`;

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await getCountryCodes();

      setCountries(response.countries);

      const india = response.countries.find(
        (country) => country.code === "IN"
      );

      if (india) {
          updateOnboarding({
            countryCode: india.dial_code,
          });
        }
    } catch (error) {
      console.error("Country API Error:", error);
    }
  };

  fetchCountries();
}, []);

const selectedCountry = countries.find(
  (c) => c.dial_code === data.countryCode
);

  return (
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden p-[20px] scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* BACKGROUND IMAGE */}
      <img
        src={BackGroundImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* MAIN WRAPPER */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <div className="w-full mb-[20px]">
          <ProfileNavbar onLanguageClick={setShowLanguage} />
        </div>

        {/* CARD SECTION */}
        <div
          className={`w-full bg-white rounded-[40px] min-h-[85vh] border border-[#E7E7E7] shadow-sm px-[clamp(20px,4vw,60px)] py-[clamp(25px,4vw,45px)] transition-all duration-300`}
        >
          {/* HEADER */}
          <div className="relative flex flex-col items-center justify-center mt-15 md:mt-[40px] lg:mt-0">
            <p className="text-[#4866F6] text-[clamp(18px,2vw,30px)] font-sfpro ">
              Welcome to your
            </p>

            <h1 className="text-[#4866F6] text-[clamp(32px,4vw,60px)] font-bold font-sfpro text-center leading-tight">
              AI Personal Assistant
            </h1>

            
          </div>

          <OnboardingStepper currentStep={currentStep} steps={steps} />

          {/* IMAGE UPLOAD */}

          <div className="w-full flex justify-center mt-[70px]">
            <div className="w-full max-w-[860px]">
              {/* HIDDEN INPUT */}
              <input
                type="file"
                id="profileUpload"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* UPLOAD BOX */}
              <label htmlFor="profileUpload" className={uploadBoxClass} 
              tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    document.getElementById("profileUpload").click();
                  }
                }}>
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                ) : (
                  <img
                    src={UploadImage}
                    alt="upload"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-4"
                  />
                )}

                <p className="text-[#A0A0A0] text-[15px]">
                  Drop your image here or{" "}
                  <span className="text-[#4866F6] font-semibold">Browse</span>
                </p>

                <p className="text-[#B5B5B5] text-[12px] mt-2">
                  Supports: JPG, JPEG & PNG
                </p>
              </label>

              {imageError && (
                <p className="mt-2 text-sm text-red-500">{imageError}</p>
              )}
            </div>
          </div>

          {/* FORM */}
          <div className="w-full flex flex-col md:flex-row lg:flex-row justify-center gap-6 mt-[45px]">
            {/* FULL NAME */}
            <div className="w-full max-w-[420px]">
              <label className="block mb-2 text-[15px] font-medium text-[#4A4A4A]">
                Full Name*
              </label>

              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className={fullNameInputClass}
              />

              {fullNameError && (
                <p className="mt-1 text-sm text-red-500">{fullNameError}</p>
              )}
            </div>

            {/* MOBILE */}
            <div className="w-full max-w-[420px]">
              <label className="block mb-2 text-[15px] font-medium text-[#4A4A4A]">
                Mobile Number*
              </label>

              <div className="flex gap-2 sm:gap-3">
                {/* Country Code */}
                <div ref={countryDropdownRef} className="relative w-[110px] sm:w-[130px] md:w-[160px] flex-shrink-0">
  <button
    type="button"
    onClick={() => setShowCountryDropdown((prev) => !prev)}
    className="w-full h-[54px] border border-[#D9D9D9] rounded-[8px] flex items-center justify-between px-2 sm:px-3 bg-white"
  >
    <div className="flex items-center gap-2 overflow-hidden">
      {selectedCountry?.flag && (
        <img
          src={selectedCountry.flag}
          alt=""
          className="w-5 h-4 object-cover flex-shrink-0"
        />
      )}

      <span className="text-sm text-[#8D97A9] truncate">
        {data.countryCode}
      </span>
    </div>

    <ChevronDown
  size={25}
  className={`text-[#8D97A9] transition-transform duration-200 ${
    showCountryDropdown ? "rotate-180" : ""
  }`}
/>
  </button>

  {showCountryDropdown && (
    <div className="absolute left-0 top-[60px] w-full text-[#8D97A9] bg-white border border-[#D9D9D9] rounded-lg shadow-xl z-[9999] max-h-[150px] overflow-y-auto scrollbar-none scrollbar-hide">
      {countries.map((country) => (
        <div
          key={country.code}
          onClick={() => {
            updateOnboarding({
              countryCode: country.dial_code,
            });

            setShowCountryDropdown(false);
          }}
          className="flex items-center gap-2 px-3 py-3 cursor-pointer  hover:bg-gray-100"
        >
          <img
            src={country.flag}
            alt={country.name}
            className="w-5 h-4 object-cover flex-shrink-0"
          />

          <span className="text-sm">
            {country.dial_code}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

                {/* Mobile Input */}
                <input
                  type="tel"
                  name="mobile"
                  value={data.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="Enter mobile number"
                  className={`flex-1 min-w-0 h-[54px] rounded-[8px] px-3 sm:px-4 outline-none transition-colors ${mobileError
                    ? "border border-red-500"
                    : "border border-[#D9D9D9] focus:border-[#4866F6]"
                    }`}
                />
              </div>

              {mobileError && (
                <p className="mt-1 text-sm text-red-500">{mobileError}</p>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <div className="w-full flex justify-center mt-[40px] md:mt-[65px] gap-4 md:gap-10">
            <button
                  type="button"
                  onClick={handleContinue}
                  disabled={loading}
                  className="bg-[#4866F6] hover:bg-[#3d5cf4] transition-all duration-300 text-white md:px-16 md:py-3 px-7 py-2 rounded-full text-[16px] font-medium cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Saving..." : "save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
