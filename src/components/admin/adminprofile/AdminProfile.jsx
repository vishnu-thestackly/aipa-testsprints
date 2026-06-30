import React, { useEffect, useState } from "react";
import AdminBG from "../../../assets/images/AdminBG.svg";
import AdminEdit from "../../../assets/images/AdminEdit.svg";
import AdminEmail from "../../../assets/images/AdminEmail.svg";
import AdminNumber from "../../../assets/images/AdminNumber.svg";
import AdminPassword from "../../../assets/images/AdminPassword.svg";
import AdminUser from "../../../assets/images/AdminUser.svg";
import Profile from "../../../assets/images/profile.png";
import Arrow from "../../../assets/images/Arrow.png";
import Password_Visible from '../../../assets/images/Password_Visible.svg';
import UploadImage from '../../../assets/images/UploadImage.svg';
import India_Flag from "../../../assets/images/India_Flag.svg";
import Italy_Flag from '../../../assets/images/Italy_Flag.svg';
import Mobile from '../../../assets/images/mobile.svg';


import {
    getUserProfile,
  updateUserProfile,
  uploadAvatar,
  changeAdminPassword,
  getCountryCodes,
} from "../../../api/authApi";

const AdminProfile = () => {
    const [activeView, setActiveView] = useState("profile");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(false);
    const [mobileError, setMobileError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectCountries, setSelectCountries] = useState([]);

   const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    image: null,
    avatarUrl: "",
});

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const fetchCountryCodes = async () => {
        try {
            const response = await getCountryCodes();

            console.log(response);

            setSelectCountries(response.countries || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 10);

            setProfileData((prev) => ({
                ...prev,
                phone: numericValue,
            }));

            if (numericValue.length > 0 && numericValue.length !== 10) {
                setMobileError("Mobile number must be 10 digits");
            } else {
                setMobileError("");
            }

            return;
        }

        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


       
    const handleProfileChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

                setProfileData((prev) => ({
                    ...prev,
                    image: file,
                    avatarUrl: URL.createObjectURL(file),
                }));
    };


        const fetchProfile = async () => {
              try {
                setLoading(true);
            
                const response = await getUserProfile();
            
                console.log(response);
            
                setProfileData({
                  name: response.name || "",
                  email: response.email || "",
                  phone: response.phone || "",
                  countryCode: response.country_code || "+91",
                  avatarUrl: response.avatar_url || "",
                  image: null,
                });
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            };


   const handleSaveProfile = async () => {
              try {
                setLoading(true);
            
                // Upload avatar first
                if (profileData.image) {
                  await uploadAvatar(profileData.image);
                }
            
                // Update profile
                const payload = {
                  name: profileData.name,
                  email: profileData.email,
                  country_code: profileData.countryCode,
                  phone: profileData.phone,
                };
            
                const response = await updateUserProfile(payload);

                    if (profileData.image) {
                      await uploadAvatar(profileData.image);
                    }

                    await fetchProfile();

                    alert(response.message || "Profile updated successfully");

                    setActiveView("profile");
              } catch (error) {
                console.error(error);
            
                alert(
                  error?.response?.data?.detail ||
                  error?.message ||
                  "Profile update failed"
                );
              } finally {
                setLoading(false);
              }
            };


    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

        const handleSavePassword = async () => {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
        
            try {
                setLoading(true);
            
                const response = await changeAdminPassword({
                    old_password: passwordData.oldPassword,
                    new_password: passwordData.newPassword,
                    confirm_password: passwordData.confirmPassword,
                });
            
                alert(response.message || "Password updated successfully");
            
                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            
                setActiveView("profile");
            } catch (error) {
                alert(
                    error?.detail ||
                    error?.message ||
                    "Password change failed"
                );
            } finally {
                setLoading(false);
            }
        };
    

        useEffect(() => {
  fetchProfile();
  fetchCountryCodes();
}, []);


    return (
        <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
            <div className="w-full bg-white rounded-[20px] shadow-[0px_1px_4px_0px_#00000040]">

                {/* PROFILE PAGE */}
                {activeView === "profile" && (
                    <div className="p-4 sm:p-5 md:p-7">
                        <h2 className="text-[18px] text-[#3D3D3D]">
                            Profile Management
                        </h2>

                        <div className="w-full border-t border-[#CFCFCF] mt-4 mb-5"></div>

                        <div className="relative rounded-[15px] shadow-[0px_1px_4px_0px_#00000040] overflow-visible">
                            {/* Banner */}
                            <img
                                src={AdminBG}
                                alt=""
                                className="w-full h-[120px] sm:h-[150px] object-cover rounded-tl-[15px] rounded-tr-[15px]"
                            />

                            {/* Action Buttons */}
                            <div className="absolute top-[30px] right-3 md:top-[82px] md:right-4 lg:top-[95px] lg:right-4 flex flex-col md:flex-row items-end md:items-center gap-2 sm:gap-3 z-50">
                                {/* Change Password */}
                                <button
                                    onClick={() => setActiveView("password")}
                                    className="order-2 md:order-1 flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full text-[#4866F6] text-[11px] sm:text-sm shadow-md w-fit pointer-events-auto"
                                >
                                    <span>Change Password</span>
                                    <img
                                        src={AdminPassword}
                                        alt="Password"
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </button>

                                {/* Edit */}
                                <button
                                    onClick={() => setActiveView("edit")}
                                    className="order-1 md:order-2 flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full text-[#4866F6] text-[11px] sm:text-sm shadow-md w-fit pointer-events-auto"
                                >
                                    <span>Edit</span>
                                    <img
                                        src={AdminEdit}
                                        alt="Edit"
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </button>
                            </div>

                            {/* Profile Image */}
                            <div className="absolute left-4 sm:left-8 md:left-12 top-[80px] sm:top-[105px] z-10">
                                <img
                                    src={
                                      profileData.avatarUrl
                                        ? profileData.avatarUrl.startsWith("blob:")
                                          ? profileData.avatarUrl
                                          : `http://127.0.0.1:8000${profileData.avatarUrl}`
                                        : Profile
                                    }
                                    alt=""
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white object-cover"
                                />
                            </div>

                            {/* Profile Details */}

                            <div className="pt-12 sm:pt-14 px-4 sm:px-8 md:px-12 pb-4">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

                                    {/* Full Name */}
                                    <div className="flex items-center gap-5 ">
                                        <div className="w-10 h-10 bg-[#4866F6] rounded-full flex justify-center items-center flex-shrink-0">
                                            <img src={AdminUser} alt="" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#3D3D3D]">
                                                Full Name
                                            </p>

                                            <p className="text-xs sm:text-sm lg:text-base text-[#6B7280] break-words">
                                                {profileData.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center gap-5 ">
                                        <div className="w-10 h-10 bg-[#4866F6] rounded-full flex justify-center items-center flex-shrink-0">
                                            <img src={AdminEmail} alt="" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#3D3D3D]">
                                                Email Address
                                            </p>
                                            <p className="text-xs sm:text-sm lg:text-base text-[#6B7280] break-all">
                                                {profileData.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="flex items-center gap-5 ">
                                        <div className="w-10 h-10 bg-[#4866F6] rounded-full flex justify-center items-center flex-shrink-0">
                                            <img src={AdminNumber} alt="" />
                                        </div>

                                        <div>
                                            <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#3D3D3D]">
                                                Mobile Number
                                            </p>
                                            <p className="text-xs sm:text-sm lg:text-base text-[#6B7280]">
                                                {profileData.countryCode} {profileData.phone}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* EDIT PROFILE PAGE */}
                {activeView === "edit" && (
                    <div className="p-4 sm:p-5 md:p-7">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <button
                                onClick={() => setActiveView("profile")}
                                className="w-8 h-8 rounded-full bg-[#4866F6] flex items-center justify-center flex-shrink-0"
                            >
                                <img src={Arrow} alt="" />
                            </button>

                            <span className="text-base sm:text-lg font-medium">
                                Edit Profile
                            </span>
                        </div>

                        <div className="border-t pt-5">
                            {/* Upload Section */}
                            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                                <div className="w-full max-w-[1320px]">
                                    <label className="block mb-2 text-sm sm:text-base font-medium">
                                        Upload Image
                                    </label>

                                    <input
                                        type="file"
                                        id="profileUpload"
                                        accept=".jpg,.jpeg,.png"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />

                                    <label
                                        htmlFor="profileUpload"
                                        className="w-full border-2 border-dashed border-[#586D93] rounded-[18px] bg-[#586D930D] py-6 sm:py-8 md:py-10 px-4 flex flex-col items-center justify-center cursor-pointer hover:border-[#586D93] transition"
                                    >
                                        {profileData.avatarUrl ? (
                                            <img
                                                src={
                                                  profileData.avatarUrl
                                                    ? profileData.avatarUrl.startsWith("blob:")
                                                      ? profileData.avatarUrl
                                                      : `http://127.0.0.1:8000${profileData.avatarUrl}`
                                                    : Profile
                                                }
                                                alt="preview"
                                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4"
                                            />
                                        ) : (
                                            <img
                                                src={Profile}
                                                alt="upload"
                                                className="w-10 h-10 mb-4"
                                            />
                                        )}

                                        <p className="text-[#A0A0A0] text-center text-sm sm:text-base">
                                            Drop your image here or{" "}
                                            <span className="text-[#4866F6] font-semibold">
                                                Browse
                                            </span>
                                        </p>

                                        <p className="text-[#B5B5B5] text-xs mt-2 text-center">
                                            Supports: JPG, JPEG & PNG
                                        </p>
                                    </label>
                                </div>
                            </div>

                            {/* Form Fields */}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-0 sm:px-4 md:px-10 lg:px-14">

                                {/* Full Name */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm sm:text-base lg:text-lg font-semibold">
                                        Full Name*
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleProfileChange}
                                        placeholder="Full Name"
                                        className="w-full border text-xs sm:text-sm lg:text-base rounded-lg p-3 outline-none focus:border-[#4866F6] text-[#8D97A9]"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm sm:text-base lg:text-lg font-semibold">
                                        Email Address*
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleProfileChange}
                                        placeholder="Email"
                                        className="w-full border text-xs sm:text-sm lg:text-base rounded-lg p-3 text-[#8D97A9] outline-none focus:border-[#4866F6] "
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm sm:text-base lg:text-lg font-semibold">
                                        Mobile Number*
                                    </label>

                                    <div className="flex w-full gap-2 sm:gap-3">
                                        {/* Country Code Dropdown */}
                                        <div className="relative w-[90px] sm:w-[110px] md:w-[120px] flex-shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCountry((prev) => !prev)}
                                                className="w-full h-[50px] border border-[#8D97A9] rounded-lg flex items-center justify-between px-3 bg-white text-xs sm:text-sm lg:text-base focus:border-[#4866F6]"
                                            >
                                                <div className="flex items-center gap-1">
                                                    <img
                                                        src={
                                                          selectCountries?.find(
                                                            (country) =>
                                                              country.dial_code === profileData.countryCode
                                                          )?.flag || India_Flag
                                                        }
                                                        alt=""
                                                        className="w-5 h-4 object-cover "
                                                    />

                                                    <span className="text-s lg:text-m">
                                                        {profileData.countryCode}
                                                    </span>
                                                </div>

                                                <img
                                                    src={Mobile}
                                                    alt=""
                                                    className={`w-4 h-4 transition-transform ${selectedCountry ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {selectedCountry && (
                                                <div className="absolute left-0 top-[55px] w-full bg-white border border-[#8D97A9] rounded-lg shadow-lg z-50 max-h-[100px] overflow-y-auto dropdown-scroll">
                                                    {selectCountries.map((country) => (
                                                        <div
                                                            key={country.code}
                                                            onClick={() => {
                                                                setProfileData((prev) => ({
                                                                    ...prev,
                                                                    countryCode: country.dial_code,
                                                                }));
                                                            
                                                                setSelectedCountry(false);
                                                            }}
                                                            className="flex items-center gap-2 px-3 py-3 cursor-pointer hover:bg-gray-200"
                                                        >
                                                            <img
                                                                src={country.flag}
                                                                alt={country.name}
                                                                className="w-5 h-4 object-cover"
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
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            placeholder="Enter mobile number"
                                            className={`text-xs sm:text-sm lg:text-base flex-1 border min-w-0 text-[#8D97A9] rounded-lg p-3 outline-none ${mobileError
                                                ? "border-red-500"
                                                : "focus:border-[#4866F6]"
                                                }`}
                                        />
                                    </div>

                                    {mobileError && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {mobileError}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                                <button
                                    onClick={async () => {
                                        await fetchProfile();
                                        setActiveView("profile");
                                    }}
                                    className="border border-[#4866F6] text-[#4866F6] 
                                    px-4 sm:px-6 lg:px-8
                                    py-2 sm:py-2.5 lg:py-3
                                    text-xs sm:text-sm lg:text-base
                                    rounded-full
                                    min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSaveProfile}
                                    disabled={loading}
                                    className="bg-[#4866F6] text-white
                                    px-4 sm:px-6 lg:px-8
                                    py-2 sm:py-2.5 lg:py-3
                                    text-xs sm:text-sm lg:text-base
                                    rounded-full
                                    min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]"
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* CHANGE PASSWORD PAGE */}
                {activeView === "password" && (
                    <div className="p-4 sm:p-5 md:p-7">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <button
                                onClick={() => setActiveView("profile")}
                                className="w-8 h-8 rounded-full bg-[#4866F6] flex items-center justify-center flex-shrink-0"
                            >
                                <img src={Arrow} alt="" />
                            </button> 
                            <span className="text-sm sm:text-base lg:text-lg font-semibold">
                                Change Password
                            </span>
                        </div>

                        <div className="border-t pt-6"> 
                            <div className="w-full max-w-[1200px]">

                                {/* Old Password */}
                                <div className="relative w-full md:w-[48%] mb-6">
                                    <label className="block mb-2 text-sm sm:text-base lg:text-lg font-semibold text-[#4A4A4A]">
                                        Old Password
                                    </label>

                                    <div className="relative w-full">
                                        <img
                                            src={AdminPassword}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none filter grayscale opacity-70"
                                        />

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="oldPassword"
                                            value={passwordData.oldPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Old Password"
                                            className="w-full border rounded-lg py-3 pl-10 pr-10 outline-none focus:border-[#4866F6] text-xs sm:text-sm lg:text-base"
                                        />

                                        <img
                                            src={Password_Visible}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* New Password & Confirm Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* New Password */}
                                    <div className="relative w-full">
                                        <label className="block mb-2 text-sm sm:text-base lg:text-lg font-semibold text-[#4A4A4A]">
                                            New Password
                                        </label>

                                        <div className="relative w-full">
                                            <img
                                                src={AdminPassword}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none filter grayscale opacity-70"
                                            />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="New Password"
                                                className="w-full border rounded-lg py-3 pl-10 pr-10 outline-none focus:border-[#4866F6] text-xs sm:text-sm lg:text-base"
                                            />

                                            <img
                                                src={Password_Visible}
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="relative w-full">
                                        <label className="block mb-2 text-sm sm:text-base lg:text-lg font-semibold text-[#4A4A4A]">
                                            Confirm New Password
                                        </label>

                                        {/* Input wrapper */}
                                        <div className="relative w-full">
                                            {/* Left icon */}
                                            <img
                                                src={AdminPassword}
                                                alt=""
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none filter grayscale opacity-70"
                                            />

                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Confirm New Password"
                                                className="w-full border rounded-lg py-3 pl-10 pr-10 outline-none focus:border-[#4866F6] text-xs sm:text-sm lg:text-base"
                                            />

                                            {/* Right toggle icon */}
                                            <img
                                                src={Password_Visible}
                                                alt="toggle password"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                                    <button
                                        onClick={() => setActiveView("profile")}
                                        className="border border-[#4866F6] text-[#4866F6] 
                    px-4 sm:px-6 lg:px-8
                    py-2 sm:py-2.5 lg:py-3
                    text-xs sm:text-sm lg:text-base
                    rounded-full
                    min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSavePassword}
                                        disabled={loading}
                                        className="bg-[#4866F6] text-white
                                             px-4 sm:px-6 lg:px-8
                                             py-2 sm:py-2.5 lg:py-3
                                             text-xs sm:text-sm lg:text-base
                                             rounded-full
                                             min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]"
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminProfile;