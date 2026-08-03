import { ArrowLeft, Upload, ChevronDown, Search } from "lucide-react";

import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import PersonalAssistant from "../editprofile/PersonalAssistant";

import messageimg from "../../assets/images/messageimg.png"

import Calendar from "../../assets/images/Calendar.png"
import India_Flag from "../../assets/images/India_Flag.svg";

import PersonalAssistant from "../editprofile/PersonalAssistant"


import {

  getUserProfile,

  updateUserProfile,

  uploadProfileAvatar,

  getCountryCodes,

  getLocations,

} from "../../api/authApi";




export default function EditProfile({ onOpenChat }) {

  const countryDropdownRef = useRef(null);

  const altCountryDropdownRef = useRef(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();

  const dateInputRef = useRef(null);

  const label_style = "block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5"

  const input_style = "w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9  sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"

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

  const [countryCode, setCountryCode] = useState("+91");

  const [altCountryCode, setAltCountryCode] = useState("+91");


  const [countries, setCountries] = useState([]);

  const [locations, setLocations] = useState([]);

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const base_input_style = "w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:ring-1 placeholder:text-gray-400"

  const getInputClass = (field) => {

    return `${base_input_style} ${errors[field] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#4F7CFE] focus:ring-[#4F7CFE]'}`;

  }



  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "dob") {
      // allow only numbers and -
      value = value.replace(/[^\d-]/g, "");

      // auto insert -
      if (value.length === 2 && !value.includes("-"))
        value += "-";

      if (value.length === 5 && value.split("-").length === 2)
        value += "-";

      value = value.substring(0, 10);
    }

    if (name === "mobile" || name === "alternateMobile") {
      value = value.replace(/\D/g, "");
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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

        const fetchedCountryCode = response.country_code || "+91";
        setCountryCode(fetchedCountryCode.startsWith("+") ? fetchedCountryCode : `+${fetchedCountryCode}`);

        const fetchedAltCountryCode = response.alternate_country_code || "+91";
        setAltCountryCode(fetchedAltCountryCode.startsWith("+") ? fetchedAltCountryCode : `+${fetchedAltCountryCode}`);

        if (response.avatar_url) setImage(response.avatar_url);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProfile();

  }, []);


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
    e.stopPropagation();

    console.log("DataTransfer:", e.dataTransfer);
    console.log("Files:", e.dataTransfer.files);

    const file = e.dataTransfer.files[0];

    console.log("Dropped file:", file);

    if (!file) {
      alert("No file found.");
      return;
    }

    console.log("File type:", file.type);

    if (!file.type.startsWith("image/")) {
      alert("Validation Failed: " + file.type);
      return;
    }

    setAvatarFile(file);
    setImage(URL.createObjectURL(file));
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

    const newErrors = {};

    if (!formData.fullName.trim()) {

      newErrors.fullName = "Full Name is required";

    }

    if (!formData.mobile.trim()) {

      newErrors.mobile = "Mobile Number is required";

    } else if (formData.mobile.length < 10) {

      newErrors.mobile = "Enter valid 10 digit mobile number";

    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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

      // Validate alternate mobile number
      if (
        formData.alternateMobile?.trim() &&
        formData.mobile.trim() === formData.alternateMobile.trim() &&
        countryCode === altCountryCode
      ) {
        alert("Alternate mobile number must be different from the mobile number.");
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

      navigate("/user/profile");


    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        JSON.stringify(error.response?.data) ||

        error.message

      );

    }

  };

  const selectedCountry = countries.find(
    (c) => c.dial_code === countryCode || 
           c.dial_code?.replace("+", "") === countryCode?.replace("+", "")
  );

  const selectedAltCountry = countries.find(
    (c) => c.dial_code === altCountryCode || 
           c.dial_code?.replace("+", "") === altCountryCode?.replace("+", "")
  );

  //country dropdown 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }

      if (
        altCountryDropdownRef.current &&
        !altCountryDropdownRef.current.contains(event.target)
      ) {
        setShowAltCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="h-full overflow-y-auto overflow-hidden px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10  scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] lg:h-[780px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">

          {/* HEADER */}
          <div className="flex items-center gap-2 mb-4 border-b border-gray-300 pb-4">
            <button onClick={() => navigate(-1)} className="w-7 h-7 bg-[#4866F6] rounded-full flex items-center justify-center cursor-pointer">
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

                onDragEnter={(e) => e.preventDefault()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}


                onClick={() => fileInputRef.current?.click()}

                className="w-full h-24 sm:h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4F7CFE] transition bg-[#FAFBFC]"
              >

                {image ? (
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

                  className={getInputClass('fullName')}

                />

                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}


              </div>

              {/* DOB */}
              <div>
                <label className={label_style}>DOB</label>
                <div className="relative">
                  <input
                    ref={dateInputRef}
                    name="dob"
                    type="date"
                    value={formData.dob ? formData.dob.split("-").reverse().join("-") : ""}
                    onChange={(e) => {
                      const val = e.target.value; // YYYY-MM-DD
                      if (val) {
                        const [year, month, day] = val.split("-");
                        setFormData((prev) => ({
                          ...prev,
                          dob: `${day}-${month}-${year}` // DD-MM-YYYY
                        }));
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <input
                    type="text"
                    value={formData.dob}
                    placeholder="DD-MM-YYYY"
                    readOnly
                    className={input_style}
                  />
                  <img
                    src={Calendar}
                    alt="calendar"
                    onClick={() => dateInputRef.current?.showPicker()}
                    className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer z-20"
                  />
                </div>
              </div>

              {/* GENDER */}
              <div>
                <label className={label_style}>Gender</label>
                <select

                  name="gender"

                  value={formData.gender}

                  onChange={handleInputChange}

                  className={`${input_style} ${formData.gender === "" ? "text-gray-400" : "text-black"

                    }`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* EMAIL */}
              <div>
                <label className={label_style}>Email Address</label>
                <input

                  name="email"

                  value={formData.email}

                  placeholder="Enter Email address"

                  onChange={handleInputChange}

                  className={`${input_style} bg-[#FFFFFF] cursor-not-allowed`}

                  disabled

                />
              </div>

              {/* MOBILE */}
              <div>
                <label className={label_style}>Mobile number*</label>

                <div className="flex gap-2 items-start">
                  <div
                    ref={countryDropdownRef}
                    className="relative">
                    <button

                      type="button"

                      onClick={() => setShowCountryDropdown((prev) => !prev)}

                      className="w-[120px] h-11 px-3 border border-gray-200 rounded-lg flex items-center justify-between bg-white cursor-pointer"
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        <img

                          src={selectedCountry?.flag || India_Flag}

                          alt=""

                          className="w-5 h-3.5 object-cover rounded-sm cursor-pointer"

                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-500 cursor-pointer">

                          {countryCode}
                        </span>
                      </div>
                      <ChevronDown

                        size={16}

                        className={`text-[#8D97A9] flex-shrink-0 transition-transform cursor-pointer ${showCountryDropdown ? "rotate-180" : ""

                          }`}

                      />
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto scrollbar-hide">

                        {countries.map((country) => (
                          <div

                            key={country.code}

                            onClick={() => {

                              setCountryCode(country.dial_code);

                              setShowCountryDropdown(false);

                            }}

                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img

                              src={country.flag}

                              alt=""

                              className="w-5 h-4 object-cover"

                            />
                            <span>{country.dial_code}</span>
                          </div>

                        ))}
                      </div>

                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      name="mobile"

                      value={formData.mobile}

                      onChange={handleInputChange}

                      placeholder="Enter mobile number"

                      className={getInputClass('mobile')}

                    />

                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}

                  </div>
                </div>
              </div>
              <div>
                <label className={label_style}>Alternate mobile number</label>
                <div className="flex gap-2">
                  <div
                    ref={altCountryDropdownRef}
                    className="relative">

                    <button

                      type="button"

                      onClick={() => setShowAltCountryDropdown((prev) => !prev)}

                      className="w-[120px] h-11 px-3 border border-gray-200 rounded-lg flex items-center justify-between bg-white cursor-pointer"
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        <img

                          src={selectedAltCountry?.flag || India_Flag}

                          alt=""

                          className="w-5 h-3.5 object-cover rounded-sm cursor-pointer"

                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-500 cursor-pointer">

                          {altCountryCode}
                        </span>
                      </div>
                      <ChevronDown

                        size={16}

                        className={`text-[#8D97A9] flex-shrink-0 transition-transform cursor-pointer ${showAltCountryDropdown ? "rotate-180" : ""

                          }`}

                      />
                    </button>

                    {showAltCountryDropdown && (
                      <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto scrollbar-hide">

                        {countries.map((country) => (
                          <div

                            key={country.code}

                            onClick={() => {

                              setAltCountryCode(country.dial_code);

                              setShowAltCountryDropdown(false);

                            }}

                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img

                              src={country.flag}

                              alt=""

                              className="w-5 h-4 object-cover"

                            />
                            <span>{country.dial_code}</span>
                          </div>

                        ))}
                      </div>

                    )}
                  </div>

                  <input

                    name="alternateMobile"

                    value={formData.alternateMobile}

                    placeholder="Enter Alternate mobile number"

                    onChange={handleInputChange}

                    className={input_style}

                  />
                </div>
              </div>

              {/* LOCATION (FIXED WIDTH ISSUE) */}
              <div className="md:col-span-2">
                <label className={label_style}>Location</label>
                <div className="relative md:w-[330px] lg:w-[777px]">
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
            <div className="flex gap-3 justify-center ">
              <button type="button" onClick={() => navigate(-1)} className="px-6 h-11 lg:mt-[20px] text-[#4866F6] border border-[#4866F6] rounded-full cursor-pointer">

                Cancel
              </button>
              <button type="submit" className="px-6 h-11 bg-[#4866F6] text-white rounded-full lg:mt-[20px] cursor-pointer">

                Save
              </button>
            </div>
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
              <button type="button" onClick={() => setShowChat(true)} className="lg:w-15 lg:h-15 h-10 w-10 rounded-full bg-[#4866F6] flex items-center justify-center shrink-0 hover:bg-[#3D5AE8] transition">
                <img src={messageimg} alt="Chat" className="lg:w-8 lg:h-8 w-5 h-5 cursor-pointer " />
              </button>
            </div>

            {showChat && (
              <PersonalAssistant

                onClose={() => setShowChat(false)}

              />

            )}
          </form>
        </div>
      </div>
    </div>

  );
}



// import { ArrowLeft, Upload,  ChevronDown, Search } from "lucide-react";

// import { useState, useRef, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// // import PersonalAssistant from "../editprofile/PersonalAssistant";

// import messageimg from "../../assets/images/messageimg.png"

// import Calendar from "../../assets/images/Calendar.png"

// import PersonalAssistant from "../editprofile/PersonalAssistant"


// import {

//   getUserProfile,

//   updateUserProfile,

//   uploadProfileAvatar,

//   getCountryCodes,

//   getLocations,

// } from "../../api/authApi";




// export default function EditProfile({ onOpenChat }) {


//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const [showChat, setShowChat] = useState(false);

//   const navigate = useNavigate();

//   const dateInputRef = useRef(null);

//   const label_style = "block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5"

//   const input_style = "w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9  sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"

//   const [formData, setFormData] = useState({

//     fullName: "",

//     dob: "",

//     gender: "",

//     email: "",

//     mobile: "",

//     alternateMobile: "",

//     location: "",

//   });

//   const [image, setImage] = useState(null);

//   const [avatarFile, setAvatarFile] = useState(null);

//   const [countryCode, setCountryCode] = useState("+91");

//   const [altCountryCode, setAltCountryCode] = useState("+91");


//   const [countries, setCountries] = useState([]);

//   const [locations, setLocations] = useState([]);

//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);

//   const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);

//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);

//   const fileInputRef = useRef(null);

//   const [errors, setErrors] = useState({});

//   const base_input_style = "w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:ring-1 placeholder:text-gray-400"

//   const getInputClass = (field) => {

//   return `${base_input_style} ${errors[field]? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#4F7CFE] focus:ring-[#4F7CFE]'}`;

//   }



//   const handleInputChange = (e) => {
//   let { name, value } = e.target;

//   if (name === "dob") {
//     // allow only numbers and -
//     value = value.replace(/[^\d-]/g, "");

//     // auto insert -
//     if (value.length === 2 && !value.includes("-"))
//       value += "-";

//     if (value.length === 5 && value.split("-").length === 2)
//       value += "-";

//     value = value.substring(0, 10);
//   }

//   if (name === "mobile" || name === "alternateMobile") {
//     value = value.replace(/\D/g, "");
//   }

//    if (errors[name]) {
//     setErrors(prev => ({...prev, [name]: "" }));
//   }

//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));

// };

//   // PROFILE LOAD

//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const response = await getUserProfile();

//         setFormData({

//           fullName: response.name || "",

//           dob: response.date_of_birth || "",

//           gender: response.gender || "",

//           email: response.email || "",

//           mobile: response.phone || "",

//           alternateMobile: response.alternate_phone || "",

//           location: response.location || "",

//         });

//         setCountryCode(response.country_code || "+91");

//         setAltCountryCode(response.alternate_country_code || "+91");

//         if (response.avatar_url) setImage(response.avatar_url);

//       } catch (error) {

//         console.error(error);

//       }

//     };

//     fetchProfile();

//   }, []);


//   // COUNTRIES

// useEffect(() => {

//   const fetchCountries = async () => {

//     try {

//       const res = await getCountryCodes();

//       console.log("Country Codes API:", res);

//       setCountries(res.countries || []);

//     } catch (err) {

//       console.error(err);

//     }

//   };

//   fetchCountries();

// }, []);

//   // LOCATIONS

//   useEffect(() => {

//     const fetchLocations = async () => {

//       try {

//         const res = await getLocations();

//         setLocations(res.results || []);

//       } catch (err) {

//         console.error(err);

//       }

//     };

//     fetchLocations();

//   }, []);

//   // IMAGE UPLOAD

//   const handleImageUpload = (e) => {

//     const file = e.target.files[0];

//     if (file) {

//       setAvatarFile(file);

//       setImage(URL.createObjectURL(file));

//     }

//   };

//   const handleDrop = (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   console.log("DataTransfer:", e.dataTransfer);
//   console.log("Files:", e.dataTransfer.files);

//   const file = e.dataTransfer.files[0];

//   console.log("Dropped file:", file);

//   if (!file) {
//     alert("No file found.");
//     return;
//   }

//   console.log("File type:", file.type);

//   if (!file.type.startsWith("image/")) {
//     alert("Validation Failed: " + file.type);
//     return;
//   }

//   setAvatarFile(file);
//   setImage(URL.createObjectURL(file));
// };


//   const formatDate = (dateStr) => {

//     if (!dateStr) return null;

//     // handles both DD-MM-YYYY and YYYY-MM-DD safely

//     const parts = dateStr.includes("-") ? dateStr.split("-") : [];

//     if (parts[0].length === 4) {

//       // already YYYY-MM-DD

//       return dateStr;

//     }

//     const [day, month, year] = parts;

//     const date = new Date(`${year}-${month}-${day}`);

//     const yyyy = date.getFullYear();

//     const mm = String(date.getMonth() + 1).padStart(2, "0");

//     const dd = String(date.getDate()).padStart(2, "0");

//     return `${yyyy}-${mm}-${dd}`;

//   };

//   // SUBMIT

// const handleSubmit = async (e) => {

//   e.preventDefault();

// const newErrors = {};

//   if (!formData.fullName.trim()) {

//     newErrors.fullName = "Full Name is required";

//   }

//   if (!formData.mobile.trim()) {

//     newErrors.mobile = "Mobile Number is required";

//   } else if (formData.mobile.length < 10) {

//     newErrors.mobile = "Enter valid 10 digit mobile number";

//   }

//   setErrors(newErrors);

//   if (Object.keys(newErrors).length > 0) {
//     return;
//   }

//   console.log("Submit Started");

//   console.log("Form Data:", formData);

//   try {

//     let avatarUrl = image;

//     console.log("DOB:", formData.dob);

//     const dobRegex =

//       /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

//     if (!dobRegex.test(formData.dob)) {

//       console.log("DOB Validation Failed");

//       alert("Please enter DOB in DD-MM-YYYY format");

//       return;

//     }

//     // Validate alternate mobile number
//     if (
//       formData.alternateMobile?.trim() &&
//       formData.mobile.trim() === formData.alternateMobile.trim() &&
//       countryCode === altCountryCode
//     ) {
//       alert("Alternate mobile number must be different from the mobile number.");
//       return;
//     }

//     console.log("DOB Validation Passed");

//       if (avatarFile) {

//         const uploadRes = await uploadProfileAvatar(avatarFile);

//         avatarUrl = uploadRes.avatar_url;

//       }


//       const payload = {

//         name: formData.fullName,

//         date_of_birth: formatDate(formData.dob),

//         gender: formData.gender,

//         email: formData.email,

//         phone: formData.mobile,

//         location: formData.location,

//         country_code: countryCode,

//         alternate_country_code: altCountryCode,

//         avatar_url: avatarUrl,

//       };

//       if (formData.alternateMobile?.trim()) {

//         payload.alternate_phone = formData.alternateMobile;

//       }

//       console.log("Payload:", payload);

// console.log("Payload being sent:", payload);

//       await updateUserProfile(payload);

//       const updatedProfile = await getUserProfile();

// console.log("Updated Profile:", updatedProfile);

// navigate("/user/profile");


//     } catch (error) {

//   console.error(error);

//   alert(

//     error.response?.data?.message ||

//     JSON.stringify(error.response?.data) ||

//     error.message

//   );

// }

//   };

//   const selectedCountry = countries.find(

//   (c) => c.dial_code === countryCode

// );

// const selectedAltCountry = countries.find(

//   (c) => c.dial_code === altCountryCode

// );

//   return (
// <div className="h-full overflow-y-auto overflow-hidden px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10  scrollbar-hide">
// <div className="w-full flex flex-col gap-5">
// <div className="w-full rounded-[18px] md:rounded-[25px] lg:h-[780px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">

//           {/* HEADER */}
// <div className="flex items-center gap-2 mb-4 border-b border-gray-300 pb-4">
// <button onClick={() => navigate(-1)} className="w-7 h-7 bg-[#4866F6] rounded-full flex items-center justify-center">
// <ArrowLeft

//                 className="w-4 h-4 text-white"

//               />
// </button>
// <span className="text-lg text-[#3D3D3D]">Edit Profile</span>
// </div>
// <form onSubmit={handleSubmit} className="space-y-6">

//             {/* IMAGE UPLOAD */}
// <div>
// <label className="block text-[18px] sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1.5 sm:mb-2">

//                   Upload Image
// </label>
// <div

//                   onDragEnter={(e) => e.preventDefault()}
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onDrop={handleDrop}


//                   onClick={() => fileInputRef.current?.click()}

//                   className="w-full h-24 sm:h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4F7CFE] transition bg-[#FAFBFC]"
// >

//                   {image? (
// <img

//   src={

//     image?.startsWith("blob:")

//       ? image

//       : `http://127.0.0.1:8000${image}`

//   }

//   alt="Preview"

//   className="h-full object-contain rounded-lg"

// />

//                   ) : (
// <>
// <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
// <p className="text-xs sm:text-sm text-gray-500 text-center px-2">

//                         Drop your image here or <span className="text-[#4866F6] font-medium">Browse</span>
// </p>
// <p className="text- sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Supports: JPG, JPEG & PNG</p>
// </>

//                   )}
// <input

//                     ref={fileInputRef}

//                     type="file"

//                     accept="image/*"

//                     onChange={handleImageUpload}

//                     className="hidden"

//                   />
// </div>
// </div>


//             {/* GRID */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//               {/* FULL NAME */}
// <div>
// <label className={label_style}>Full Name*</label>

// <input

//                      name="fullName"

//                      value={formData.fullName}

//                      onChange={handleInputChange}

//                      placeholder="Enter Full Name"

//                      className={getInputClass('fullName')}

//                      />

//   {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}


// </div>

//               {/* DOB */}
// <div>
// <label className={label_style}>DOB</label>
// <div className="relative">
//     <input
//       ref={dateInputRef}
//       name="dob"
//       type="date"
//       value={formData.dob ? formData.dob.split("-").reverse().join("-") : ""}
//       onChange={(e) => {
//         const val = e.target.value; // YYYY-MM-DD
//         if (val) {
//           const [year, month, day] = val.split("-");
//           setFormData((prev) => ({
//             ...prev,
//             dob: `${day}-${month}-${year}` // DD-MM-YYYY
//           }));
//         }
//       }}
//       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//     />
//     <input
//       type="text"
//       value={formData.dob}
//       placeholder="DD-MM-YYYY"
//       readOnly
//       className={input_style}
//     />
//     <img
//       src={Calendar}
//       alt="calendar"
//       onClick={() => dateInputRef.current?.showPicker()}
//       className="w-4 h-4 absolute right-3 top-3 text-gray-400 cursor-pointer z-20"
//     />
//   </div>
//                 </div>

//               {/* GENDER */}
// <div>
// <label className={label_style}>Gender</label>
// <select

//                   name="gender"

//                   value={formData.gender}

//                   onChange={handleInputChange}

//                   className={`${input_style} ${

//     formData.gender === "" ? "text-gray-400" : "text-black"

//   }`}
// >
// <option value="" disabled>Select Gender</option>
// <option value="Male">Male</option>
// <option value="Female">Female</option>
// <option value="others">Others</option>
// </select>
// </div>

//               {/* EMAIL */}
// <div>
// <label className={label_style}>Email Address</label>
// <input

//                   name="email"

//                   value={formData.email}

//                   placeholder ="Enter Email address"

//                   onChange={handleInputChange}

//                   className={`${input_style} bg-[#FFFFFF] cursor-not-allowed`}

//                   disabled

//                 />
// </div>

//               {/* MOBILE */}
// <div>
// <label className={label_style}>Mobile number*</label>

// <div className="flex gap-2 items-start">
// <div className="relative">
// <button

//   type="button"

//   onClick={() => setShowCountryDropdown((prev) => !prev)}

//   className="w-[120px] h-11 px-1 border border-gray-200 rounded-lg flex items-center justify-between bg-white"
// >
// <div className="flex items-center gap-1">

//     {selectedCountry?.flag && (
// <img

//         src={selectedCountry.flag}

//         alt=""

//         className="w-4 h-3 object-cover rounded-sm"

//       />

//     )}
// <span className="text-xs font-medium">

//       {countryCode}
// </span>
// </div>
// <ChevronDown

//     size={14}

//     className={`flex-shrink-0 transition-transform ${

//       showCountryDropdown ? "rotate-180" : ""

//     }`}

//   />
// </button>

// {showCountryDropdown && (
// <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto scrollbar-hide">

//     {countries.map((country) => (
// <div

//         key={country.code}

//         onClick={() => {

//           setCountryCode(country.dial_code);

//           setShowCountryDropdown(false);

//         }}

//         className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
// >
// <img

//           src={country.flag}

//           alt=""

//           className="w-5 h-4 object-cover"

//         />
// <span>{country.dial_code}</span>
// </div>

//     ))}
// </div>

// )}
// </div>
// <div className="flex-1">
//    <input
//                    name="mobile"

//                    value={formData.mobile}

//                    onChange={handleInputChange}

//                    placeholder="Enter mobile number"

//                    className={getInputClass('mobile')}

//                    />

//       {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}

//       </div>
// </div>
// </div>
// <div>
// <label className={label_style}>Alternate mobile number</label>
// <div className="flex gap-2">
// <div className="relative">
// <div className="relative">
// <button

//   type="button"

//   onClick={() => setShowAltCountryDropdown((prev) => !prev)}

//   className="w-[120px] h-11 px-1 border border-gray-200 rounded-lg flex items-center justify-between bg-white"
// >
// <div className="flex items-center gap-1">

//     {selectedAltCountry?.flag && (
// <img

//         src={selectedAltCountry.flag}

//         alt=""

//         className="w-4 h-3 object-cover rounded-sm"

//       />

//     )}
// <span className="text-xs font-medium">

//       {altCountryCode}
// </span>
// </div>
// <ChevronDown

//     size={14}

//     className={`flex-shrink-0 transition-transform ${

//       showAltCountryDropdown ? "rotate-180" : ""

//     }`}

//   />
// </button>

//   {showAltCountryDropdown && (
// <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-lg z-50 max-h-52 overflow-y-auto scrollbar-hide">

//       {countries.map((country) => (
// <div

//           key={country.code}

//           onClick={() => {

//             setAltCountryCode(country.dial_code);

//             setShowAltCountryDropdown(false);

//           }}

//           className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
// >
// <img

//             src={country.flag}

//             alt=""

//             className="w-5 h-4 object-cover"

//           />
// <span>{country.dial_code}</span>
// </div>

//       ))}
// </div>

//   )}
// </div>
// </div>
// <input

//                     name="alternateMobile"

//                     value={formData.alternateMobile}

//                     placeholder ="Enter Alternate mobile number"

//                     onChange={handleInputChange}

//                     className={input_style}

//                   />
// </div>
// </div>

//               {/* LOCATION (FIXED WIDTH ISSUE) */}
// <div className="md:col-span-2">
// <label className={label_style}>Location</label>
// <div className="relative md:w-[330px] lg:w-[777px]">
// <input

//                     value={formData.location}

//                     readOnly

//                     placeholder="Search Location"

//                     onFocus={() => setShowLocationDropdown(true)}

//                      className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"

//                   />
// <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />

//                   {showLocationDropdown && (
// <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#DADADA] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">

//                       {locations.map((loc, i) => (
// <div

//                           key={i}

//                           onClick={() => {

//                             setFormData((prev) => ({

//                               ...prev,

//                               location: loc.state

//                                 ? `${loc.city}, ${loc.state}`

//                                 : loc.city,

//                             }));

//                             setShowLocationDropdown(false);

//                           }}

//                           className="px-4 py-3 cursor-pointer text-sm text-[#3D3D3D] hover:bg-[#F5F7FF] transition-colors"
// >

//                           {loc.state

//                             ? `${loc.city}, ${loc.state}`

//                             : loc.city}
// </div>

//                       ))}
// </div>

//                   )}
// </div>
// </div>
// </div>

//             {/* BUTTONS */}
// <div className="flex gap-3 justify-center ">
// <button type="button" onClick={() => navigate(-1)} className="px-6 h-11 lg:mt-[20px] text-[#4866F6] border border-[#4866F6] rounded-full">

//                 Cancel
// </button>
// <button type="submit"  className="px-6 h-11 bg-[#4866F6] text-white rounded-full lg:mt-[20px]">

//                 Save
// </button>
// </div>
// <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
// <button type="button"  onClick={() => setShowChat(true)} className="lg:w-15 lg:h-15 h-10 w-10 rounded-full bg-[#4866F6] flex items-center justify-center shrink-0 hover:bg-[#3D5AE8] transition">
// <img src={messageimg} alt="Chat" className="lg:w-8 lg:h-8 w-5 h-5 cursor-pointer " />
// </button>
// </div>

// {showChat && (
// <PersonalAssistant

//     onClose={() => setShowChat(false)}

//   />

// )}
// </form>
// </div>
// </div>
// </div>

//   );
// }