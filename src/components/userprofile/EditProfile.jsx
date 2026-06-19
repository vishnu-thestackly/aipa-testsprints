// import { ArrowLeft, Upload, Calendar, ChevronDown, Search } from "lucide-react";
// import { useState, useRef } from "react";
// import { useEffect } from "react";
// import MessageFrame from "../../assets/images/MessageFrame.jpeg"
// import { Link, useNavigate } from "react-router-dom";

// import {
//   getUserProfile,
//   updateUserProfile,
//   uploadProfileAvatar,getCountryCodes,getLocations,
// } from "../../api/authApi";
// export default function EditProfile({onOpenChat}) {
//    const navigate = useNavigate();
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
//   const [countryCode, setCountryCode] = useState("IN");
//   const [altCountryCode, setAltCountryCode] = useState("IN");
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);
//   const [locations, setLocations] = useState([]);
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
//   const fileInputRef = useRef(null);


//   const [countries, setCountries] = useState([]);
  

  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({...prev, [name]: value }));
//   };


//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const response = await getUserProfile();

//       setFormData({
//         fullName: response.name || "",
//         dob: response.dob || "",
//         gender: response.gender || "",
//         email: response.email || "",
//         mobile: response.phone || "",
//         alternateMobile: response.alternate_phone || "",
//         location: response.location || "",
//       });

//       if (response.avatar_url) {
//         setImage(response.avatar_url);
//       }
//     } catch (error) {
//       console.error("Profile Load Error:", error);
//     }
//   };

//   fetchProfile();
// }, []);

// useEffect(() => {
//   const fetchCountries = async () => {
//     try {
//       const response = await getCountryCodes();

//       console.log("Countries:", response);

//       setCountries(response.countries);

//       // Default India
//       const india = response.countries.find(
//         (country) => country.code === "IN"
//       );

//       if (india) {
//   setCountryCode(india.code);
// }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   fetchCountries();
// }, []);


// useEffect(() => {
//   const fetchLocations = async () => {
//     try {
//       const response = await getLocations();

//       setLocations(response.results || []);
//     } catch (error) {
//       console.error("Location API Error:", error);
//     }
//   };

//   fetchLocations();
// }, []);


//   const handleImageUpload = (e) => {
//   const file = e.target.files[0];

//   if (file) {
//     setAvatarFile(file);
//     setImage(URL.createObjectURL(file));
//   }
// };

//   const handleDrop = (e) => {
//   e.preventDefault();

//   const file = e.dataTransfer.files[0];

//   if (file && file.type.startsWith("image/")) {
//     setAvatarFile(file);
//     setImage(URL.createObjectURL(file));
//   }
// };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     let avatarUrl = image;

//     if (avatarFile) {
//       const uploadResponse = await uploadProfileAvatar(avatarFile);
//       avatarUrl = uploadResponse.avatar_url;
//     }

//     const payload = {
//       name: formData.fullName,
//       dob: formData.dob,
//       gender: formData.gender,
//       email: formData.email,
//       phone: formData.mobile,
//       alternate_phone: formData.alternateMobile,
//       location: formData.location,
//       country_code: countryCode,
//       alternate_country_code: altCountryCode,
//       avatar_url: avatarUrl,
//     };

//     const response = await updateUserProfile(payload);

//     console.log("Profile Updated:", response);

//     navigate("/user-profile");
//   } catch (error) {
//     console.error("Profile Update Error:", error);
//   }
// };

//   const selectedCountry = countries.find(
//     (c) => c.code === countryCode
//   );

//   const selectedAltCountry = countries.find(
//     (c) => c.code === altCountryCode
//   );


//   return (
    
//     <div className="min-h-screen w-full bg-[#F8F9FC] overflow-hidden">
//       <Navbar/>
//       <div className="flex">
//        <Sidebar/>

//         {/* Main Content */}
//         <div className="flex-1 p-3 sm:p-4 md:p-6">
//           <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border lg:h-[800px] border-gray-100 max-w-[1300px] mx-auto">

//             {/* Header */}
//             <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 md:pb-6 border-b border-gray-100">
//               <button className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center hover:bg-[#3D6AE8] transition">
//                 <ArrowLeft onClick={() => navigate("/user-profile")} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
//               </button>
//               <span className="font-['SF_Pro'] text-base sm:text-lg text-[#3D3D3D]">Edit Profile</span>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
//               {/* Upload Image */}
//               <div>
//                 <label className="block text-[18px] sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1.5 sm:mb-2">
//                   Upload Image
//                 </label>
//                 <div
//                   onDrop={handleDrop}
//                   onDragOver={(e) => e.preventDefault()}
//                   onClick={() => fileInputRef.current?.click()}
//                   className="w-full h-24 sm:h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4F7CFE] transition bg-[#FAFBFC]"
//                 >
//                   {image? (
//                     <img src={image} alt="Preview" className="h-full object-contain rounded-lg" />
//                   ) : (
//                     <>
//                       <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
//                       <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
//                         Drop your image here or <span className="text-[#4866F6] font-medium">Browse</span>
//                       </p>
//                       <p className="text- sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Supports: JPG, JPEG & PNG</p>
//                     </>
//                   )}
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </div>
//               </div>

//               {/* Form Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     Full Name<span >*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     placeholder="Enter Full Name"
//                     className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//                   />
//                 </div>

//                 {/* DOB */}
//                 <div>
//                   <label className="block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     DOB<span >*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       name="dob"
//                       value={formData.dob}
//                       onChange={handleInputChange}
//                       placeholder="DD - MM - YYYY"
//                       className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 text-xs sm:text-sm font-['SF_Pro'] rounded-lg focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//                     />
//                     <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm sm:text-base  font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     Gender<span >*</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 text-gray-400 text-xs sm:text-sm font-['SF_Pro'] rounded-lg focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] appearance-none bg-white"
//                     >
//                       <option value="">Select gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                     <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     Email Address<span>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter email address"
//                     className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//                   />
//                 </div>

//                 {/* Mobile number */}
//                 <div>
//                   <label className="block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     Mobile number<span>*</span>
//                   </label>
//                   <div className="flex gap-1.5 sm:gap-2">
//                     <div className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setShowCountryDropdown(!showCountryDropdown)}
//                         className="h-9 sm:h-10 md:h-11 px-2 sm:px-3 pr-7 sm:pr-8 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] bg-white flex items-center gap-1.5 sm:gap-2 min-w- sm:min-w-"
//                       >
//                         <img src={selectedCountry?.flag} alt="flag" className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
//                         <span>{selectedCountry?.code}</span>
//                         <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
//                       </button>
//                       {showCountryDropdown && (
//                         <div className="absolute z-10 mt-1 w-full min-w-[100px] bg-white border border-gray-200 rounded-lg shadow-lg">
//                           {countries.map((country) => (
//                             <button
//                               key={country.code}
//                               type="button"
//                               onClick={() => {
//                                 setCountryCode(country.code);
//                                 setShowCountryDropdown(false);
//                               }}
//                               className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 sm:gap-2"
//                             >
//                               <img src={country.flag} alt={country.name} className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
//                               <span>{country.code}</span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       placeholder="Enter mobile number"
//                       className="flex-1 h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Alternate Mobile */}
//                 <div>
//                   <label className="block text-sm sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//                     Alternate mobile number
//                   </label>
//                   <div className="flex gap-1.5 sm:gap-2">
//                     <div className="relative">
//                       <button
//                         type="button"
//                         onClick={() => setShowAltCountryDropdown(!showAltCountryDropdown)}
//                         className="h-9 sm:h-10 md:h-11 px-2 sm:px-3 pr-7 sm:pr-8 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] bg-white flex items-center gap-1.5 sm:gap-2 min-w- sm:min-w-"
//                       >
//                         <img src={selectedAltCountry?.flag} alt="flag" className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
//                         <span>{selectedAltCountry?.code}</span>
//                         <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
//                       </button>
//                       {showAltCountryDropdown && (
//                         <div className="absolute z-10 mt-1 w-full min-w-[100px] bg-white border border-gray-200 rounded-lg shadow-lg">
//                           {countries.map((country) => (
//                             <button
//                               key={country.code}
//                               type="button"
//                               onClick={() => {
//                                 setAltCountryCode(country.code);
//                                 setShowAltCountryDropdown(false);
//                               }}
//                               className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 sm:gap-2"
//                             >
//                               <img src={country.flag} alt={country.name} className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
//                               <span>{country.code}</span>
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <input
//                       type="tel"
//                       name="alternateMobile"
//                       value={formData.alternateMobile}
//                       onChange={handleInputChange}
//                       placeholder="Enter alternate mobile"
//                       className="flex-1 h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//                     />
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="md:col-span-2">
//   <label className="block text-[16px] sm:text-base font-['SF_Pro'] text-[#3D3D3D] mb-1 sm:mb-1.5">
//     Location<span>*</span>
//   </label>

//   <div className="relative md:w-[570px] lg:w-[590px]">
//     <input
//       type="text"
//       value={formData.location}
//       placeholder="Search Location"
//       onFocus={() => setShowLocationDropdown(true)}
//       readOnly
//       className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-['SF_Pro'] focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
//     />

//     <Search
//       className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
//     />

//     {showLocationDropdown && (
//       <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
//         {locations.map((location, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               setFormData((prev) => ({
//                 ...prev,
//                 location: location.state
//                   ? `${location.city}, ${location.state}`
//                   : location.city,
//               }));

//               setShowLocationDropdown(false);
//             }}
//             className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-sm"
//           >
//             {location.state
//               ? `${location.city}, ${location.state}`
//               : location.city}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 pt-3 sm:pt-4">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/user-profile")}
//                   className="w-full sm:w-auto px-6 sm:px-8 h-9 sm:h-10 md:h-11 rounded-full border border-[#4866F6] text-[#4866F6] text-xs sm:text-sm font-medium hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto px-6 sm:px-8 h-9 sm:h-10 md:h-11 rounded-full bg-[#4866F6] text-white text-xs sm:text-sm font-medium hover:bg-[#3D6AE8] transition"
//                 >
//                   Save
//                 </button>
//               </div>

//               {/* Chat Button  */}
//               <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-6 md:right-6 z-40">
//                 <button type="button" onClick={onOpenChat}>
//                   <img src={MessageFrame} alt="Chat" className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 hover:scale-110 transition shadow-lg rounded-full" />
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
    
//   );
// }


import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import indiaFlag from "../../assets/images/flag.jpeg"
import MessageFrame from "../../assets/images/MessageFrame.jpeg"
import ArrowLeft from "../../assets/images/ArrowLeft.png"
import Calender from "../../assets/images/Calendar.png"
import Upload from "../../assets/images/Upload.png"
import Search from "../../assets/images/Search.png"
import chevronDown from "../../assets/images/chevronDown.png"

import {
  getUserProfile,
  updateUserProfile,
  uploadProfileAvatar,
  getCountryCodes,
  getLocations,
} from "../../api/authApi";

export default function EditProfile({onOpenChat}) {
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
  const [avatarFile, setAvatarFile] = useState(null)
  const [countryCode, setCountryCode] = useState("+91");
  const [altCountryCode, setAltCountryCode] = useState("+91");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showAltCountryDropdown, setShowAltCountryDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const [countries, setCountries] = useState([
    { code: "+91", flag: indiaFlag, name: "India" },
    { code: "+1", flag: "https://flagcdn.com/w20/us.png", name: "USA" },
    { code: "+44", flag: "https://flagcdn.com/w20/gb.png", name: "UK" },
  ]);

const [locations,setLocations]= useState([])
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
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
const [profilePage, setProfilePage]=useState ("");
    } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    error.message
  );
}
  };



  const selectedCountry = countries.find(c => c.code === countryCode);
  const selectedAltCountry = countries.find(c => c.code === altCountryCode);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FC] overflow-hidden">
      <Navbar/>
      <div className="flex">
       <Sidebar/>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border lg:h-[800px] border-gray-100 max-w-[1300px] mx-auto">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 md:pb-6 border-b border-gray-100">
              <button className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center hover:bg-[#3D6AE8] transition">
                <img src={ArrowLeft} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </button>
              <span className="font-medium text-base sm:text-lg text-[#3D3D3D]">Edit Profile</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Upload Image */}
              <div>
                <label className="block text-[18px] sm:text-base font-regular text-[#3D3D3D] mb-1.5 sm:mb-2">
                  Upload Image
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 sm:h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#4F7CFE] transition bg-[#FAFBFC]"
                >
                {image? (
                    <img src={image} alt="Preview" className="h-full object-contain rounded-lg" />
                  ) : (
               
                    <>
                      <img src={Upload} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mb-1 sm:mb-2" />
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

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-5 sm:gap-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm sm:text-base font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Full Name<span >*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                    className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm sm:text-base font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    DOB<span >*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      placeholder="DD - MM - YYYY"
                      className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 text-xs sm:text-sm font-regular rounded-lg focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                    />
                    < img src={Calender} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm sm:text-base  font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Gender<span >*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 pr-9 sm:pr-10 border border-gray-200 text-gray-400 text-xs sm:text-sm font-regular rounded-lg focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] appearance-none bg-white"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <img src={chevronDown} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm sm:text-base font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Email Address<span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                  />
                </div>

                {/* Mobile number */}
                <div>
                  <label className="block text-sm sm:text-base  font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Mobile number<span>*</span>
                  </label>
                  <div className="flex gap-1.5 sm:gap-2  ">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="h-9 sm:h-10 md:h-11 px-2 sm:px-3 pr-7  sm:pr-8 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] bg-white flex items-center gap-1.5 sm:gap-2 min-w- sm:min-w-"
                      >
                        <img src={selectedCountry?.flag} alt="flag" className="w-4 h-3  sm:w-5 sm:h-3.5 object-cover rounded-sm" />
                        <span>{selectedCountry?.code}</span>
                        <img src={chevronDown} className="w-3.5 h-3.5  sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                      </button>
                      {showCountryDropdown && (
                        <div className="absolute z-10 mt-1 w-full min-w-[100px] md:ml-[10px] bg-white border border-gray-200 rounded-lg shadow-lg">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(country.code);
                                setShowCountryDropdown(false);
                              }}
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 sm:gap-2"
                            >
                              <img src={country.flag} alt={country.name} className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
                              <span>{country.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      className="flex-1 h-9 sm:h-10 md:h-11 px-3 sm:px-4  md:w-[170px] border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Alternate Mobile */}
                <div>
                  <label className="block text-sm sm:text-base font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Alternate mobile number
                  </label>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowAltCountryDropdown(!showAltCountryDropdown)}
                        className="h-9 sm:h-10 md:h-11 px-2 sm:px-3 pr-7 sm:pr-8 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] bg-white flex items-center gap-1.5 sm:gap-2 min-w- sm:min-w-"
                      >
                        <img src={selectedAltCountry?.flag} alt="flag" className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
                        <span>{selectedAltCountry?.code}</span>
                        <img src={chevronDown} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                      </button>
                      {showAltCountryDropdown && (
                        <div className="absolute z-10 mt-1 w-full min-w-[100px] bg-white border border-gray-200 rounded-lg shadow-lg">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setAltCountryCode(country.code);
                                setShowAltCountryDropdown(false);
                              }}
                              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1.5 sm:gap-2"
                            >
                              <img src={country.flag} alt={country.name} className="w-4 h-3 sm:w-5 sm:h-3.5 object-cover rounded-sm" />
                              <span>{country.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                      placeholder="Enter alternate mobile"
                      className="flex-1 h-9 sm:h-10 md:h-11 px-3 sm:px-4 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <label className="block text-[16px] sm:text-base font-regular text-[#3D3D3D] mb-1 sm:mb-1.5">
                    Location<span >*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Search Location"
                      className="w-full md:w-[260px] lg:w-[590px]  h-9 sm:h-10 md:h-11 px-3  sm:px-4 pr-9 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm font-regular focus:outline-none focus:border-[#4F7CFE] focus:ring-1 focus:ring-[#4F7CFE] placeholder:text-gray-400"
                    />
                    <img src={Search} className="w-3.5 h-3.5 sm:w-4 md:mr-[280px] sm:h-4 text-gray-400 absolute lg:mr-[610px] right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 sm:px-8 h-9 sm:h-10 md:h-11 rounded-full border border-[#4866F6] text-[#4866F6] text-xs sm:text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 h-9 sm:h-10 md:h-11 rounded-full bg-[#4866F6] text-white text-xs sm:text-sm font-medium hover:bg-[#3D6AE8] transition"
                >
                  Save
                </button>
              </div>

              {/* Chat Button  */}
              <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-6 md:right-6 z-40">
                <button type="button" onClick={onOpenChat}>
                  <img src={MessageFrame} alt="Chat" className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 hover:scale-110 transition shadow-lg rounded-full" />
                </button>
              </div>
            </form>
              </div>
        </div>
      </div>
    </div>
  );
}













