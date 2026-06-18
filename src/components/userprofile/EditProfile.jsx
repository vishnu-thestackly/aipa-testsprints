
import { ArrowLeft, Upload, Calendar, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import PersonalAssistant from "../editprofile/PersonalAssistant";
import MessageFrame from "../../assets/images/MessageFrame.jpeg";

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileAvatar,
  getCountryCodes,
  getLocations,
} from "../../api/authApi";

export default function EditProfile({ onOpenChat, setProfilePage,setProfile, }) {
  const navigate = useNavigate();
  const label_style = "block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5"
  const input_style = "w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    alternateMobile: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [countryCode, setCountryCode] = useState("IN");
  const [altCountryCode, setAltCountryCode] = useState("IN");

  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const fileInputRef = useRef(null);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleInputChange = (e) => {
  let { name, value } = e.target;

  if (name === "dob") {
    value = value.replace(/[^\d-]/g, "");
  }

  if (name === "mobile" || name === "alternateMobile") {
    value = value.replace(/\D/g, "");
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // PROFILE LOAD
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();

        setFormData({
          fullName: response.name || "",
          dob: response.date_of_birth || "",
          gender: response.gender || "",
          email: response.email || "",
          mobile: response.phone || "",
          alternateMobile: response.alternate_phone || "",
          location: response.location || "",
        });

        if (response.avatar_url) setImage(response.avatar_url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  // COUNTRIES
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const res = await getCountryCodes();
  //       setCountries(res.countries || []);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  // COUNTRIES
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const res = await getCountryCodes();

      console.log("Country Codes API:", res);

      setCountries(res.countries || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCountries();
}, []);

  // LOCATIONS
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getLocations();
        setLocations(res.results || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setAvatarFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  
  const formatDate = (dateStr) => {
    if (!dateStr) return null;

    // handles both DD-MM-YYYY and YYYY-MM-DD safely
    const parts = dateStr.includes("-") ? dateStr.split("-") : [];

    if (parts[0].length === 4) {
      // already YYYY-MM-DD
      return dateStr;
    }

    const [day, month, year] = parts;
    const date = new Date(`${year}-${month}-${day}`);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  // SUBMIT
 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit Started");
  console.log("Form Data:", formData);

  try {
    let avatarUrl = image;

    console.log("DOB:", formData.dob);

    const dobRegex =
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    if (!dobRegex.test(formData.dob)) {
      console.log("DOB Validation Failed");
      alert("Please enter DOB in DD-MM-YYYY format");
      return;
    }

    console.log("DOB Validation Passed");

      if (avatarFile) {
        const uploadRes = await uploadProfileAvatar(avatarFile);
        avatarUrl = uploadRes.avatar_url;
      }
  


      const payload = {
        name: formData.fullName,
        date_of_birth: formatDate(formData.dob),
        gender: formData.gender,
        email: formData.email,
        phone: formData.mobile,
        location: formData.location,
        country_code: countryCode,
        alternate_country_code: altCountryCode,
        avatar_url: avatarUrl,
      };

      if (formData.alternateMobile?.trim()) {
        payload.alternate_phone = formData.alternateMobile;
      }
      console.log("Payload:", payload);
console.log("Payload being sent:", payload);
      await updateUserProfile(payload);
      const updatedProfile = await getUserProfile();

console.log("Updated Profile:", updatedProfile);

setProfile(updatedProfile);
setProfilePage("dashboard");
    } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    error.message
  );
}
  };

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const selectedAltCountry = countries.find((c) => c.code === altCountryCode);

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">

          {/* HEADER */}
          <div className="flex items-center gap-2 mb-4 border-b border-gray-300 pb-4">
            <button onClick={() => setProfilePage("dashboard")} className="w-7 h-7 bg-[#4866F6] rounded-full flex items-center justify-center">
              <ArrowLeft
               
                className="w-4 h-4 text-white"
              />
            </button>
            <span className="text-lg text-[#3D3D3D]">Edit Profile</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* IMAGE UPLOAD */}
                         <div>
                <label className="block text-[18px] sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1.5 sm:mb-2">
                  Upload Image
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 sm:h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4F7CFE] transition bg-[#FAFBFC]"
                >
                  {image? (
<img
  src={
    image?.startsWith("blob:")
      ? image
      : `http://127.0.0.1:8000${image}`
  }
  alt="Preview"
  className="h-full object-contain rounded-lg"
/>
 
                  ) : (
                    <>
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                        Drop your image here or <span className="text-[#4866F6] font-medium">Browse</span>
                      </p>
                      <p className="text- sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Supports: JPG, JPEG & PNG</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
 

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* FULL NAME */}
              <div>
                <label className={label_style}>Full Name*</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className={input_style}
                />
              </div>

              {/* DOB */}
              <div>
                <label className={label_style}>DOB*</label>
                <div className="relative">
                  <input
                    name="dob"
                    type="text"
                    value={formData.dob}
                    placeholder="DD-MM-YYYY"
                    onChange={handleInputChange}
                    className={input_style}
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-400 " />
                </div>
              </div>

              {/* GENDER */}
              <div>
                <label className={label_style}>Gender*</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`${input_style} ${
    formData.gender === "" ? "text-gray-400" : "text-black"
  }`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* EMAIL */}
              <div>
                <label className={label_style}>Email*</label>
                <input
                  name="email"
                  value={formData.email}
                  placeholder ="Enter Email address"
                  onChange={handleInputChange}
                  className={input_style}
                />
              </div>

              {/* MOBILE */}
              <div>
                <label className={label_style}>Mobile*</label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className={input_style}
                    >
                      <span>{selectedCountry?.code}</span>
                      <ChevronDown />
                    </button>
                  </div>

                  <input
                    name="mobile"
                    value={formData.mobile}
                    placeholder ="Enter mobile number"
                    onChange={handleInputChange}
                    className={input_style}
                  />
                </div>
              </div>
              <div>
                <label className={label_style}>Alternate mobile number</label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className={input_style}
                    >
                      <span>{selectedCountry?.code}</span>
                      <ChevronDown />
                    </button>
                  </div>

                  <input
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    placeholder ="Enter Alternate mobile number"
                    onChange={handleInputChange}
                    className={input_style}
                  />
                </div>
              </div>

              {/* LOCATION (FIXED WIDTH ISSUE) */}
              <div className="md:col-span-2">
                <label className={label_style}>Location*</label>

                <div className="relative md:w-[570px] lg:w-[605px]">
                  <input
                    value={formData.location}
                    readOnly
                    placeholder="Search Location"
                    onFocus={() => setShowLocationDropdown(true)}
                    className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                  />

                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

                  {showLocationDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#DADADA] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {locations.map((loc, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              location: loc.state
                                ? `${loc.city}, ${loc.state}`
                                : loc.city,
                            }));
                            setShowLocationDropdown(false);
                          }}
                          className="px-4 py-3 cursor-pointer text-sm text-[#3D3D3D] hover:bg-[#F5F7FF] transition-colors"
                        >
                          {loc.state
                            ? `${loc.city}, ${loc.state}`
                            : loc.city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 justify-center">
              <button type="button" onClick={() => setProfilePage("dashboard")} className="px-6 h-11 border rounded-full">
                Cancel
              </button>

              <button type="submit"  className="px-6 h-11 bg-[#4866F6] text-white rounded-full">
                Save
              </button>
            </div>
                    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-6 md:right-6 z-40">
                <button type="button" onClick={onOpenChat}>
                  <img src={MessageFrame} alt="Chat" className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 hover:scale-110 transition shadow-lg rounded-full" />
                </button>
              </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}