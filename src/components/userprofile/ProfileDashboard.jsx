import React, { useState, useEffect } from "react";
import profileImg from "../../assets/images/profile.png";
import blueBg from "../../assets/images/blue-image.png";
import editIcon from "../../assets/images/edit.svg";
import nameIcon from "../../assets/images/name.svg";
import dobIcon from "../../assets/images/dob.svg";
import genderIcon from "../../assets/images/gender.svg";
import emailIcon from "../../assets/images/email.svg";
import mobileIcon from "../../assets/images/mobile.svg";
import locationIcon from "../../assets/images/location.svg";
import vectorIcon from "../../assets/images/Vector.svg";
import sparkleIcon from "../../assets/images/Sparkle.svg";
import { useNavigate } from "react-router-dom";
import { getUserProfile,  verifyPayment, } from "../../api/authApi";


import PaymentSuccess from "./PaymentSuccess";
import PaymentUnsuccessful from "./PaymentUnsuccessful";
import { useLocation } from "react-router-dom";
import { getInvoice } from "../../api/authApi";
import InvoicePopup from "./InvoicePopup";



export default function ProfileDashboard({ languageOpen,
  setProfilePage,
  profile,
  setProfile,})  {
    const navigate = useNavigate();
    
    const [sections, setSections] = useState({
  profile: true,
  plan: true,
});


const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
const [showPaymentUnsuccessful, setShowPaymentUnsuccessful] = useState(false);
const [showInvoice, setShowInvoice] = useState(false);
const [invoiceData, setInvoiceData] = useState(null);
const [paymentId, setPaymentId] = useState(null);


const location = useLocation();

const handleViewInvoice = async () => {
  try {
    const response = await getInvoice(paymentId);

    setInvoiceData(response);
    setShowPaymentSuccess(false);
    setShowInvoice(true);
  } catch (err) {
    console.error(err);
  }
};


useEffect(() => {
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  if (!sessionId) return;

  const verify = async () => {
  try {
    const response = await verifyPayment(sessionId);

    console.log("Verify Response:", response);

    if (response.verified) {
  setPaymentId(response.payment_id);

  // Remove session_id from URL
  window.history.replaceState({}, "", "/user-profile");

  // Show Success Popup
  setShowPaymentSuccess(true);
}
  } catch (err) {
    console.error(err);
  }
};

  verify();
}, [location]);

  

useEffect(() => {
  const params = new URLSearchParams(location.search);

  const cancelled = params.get("canceled");

  if (cancelled === "true") {
    setShowPaymentUnsuccessful(true);

    window.history.replaceState({}, "", location.pathname);
  }
}, [location]);




useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await getUserProfile();
      setProfile(response);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);
// if (!profile) {
//     return <div className=" h-full flex justify-center items-center">Loading...</div>;
//   }

return (

<div
  className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide transition-all duration-300 ${
    languageOpen
      ? "mt-[60px] md:mt-[70px] lg:mt-[80px]"
      : "mt-0"
  }`}
>
  <div className="w-full flex flex-col gap-5">
         <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">
{/* Header */}

<div>

<h2 className="font-medium text-[22px] md:text-[28px] text-[#3D3D3D]">    Profile Management</h2>

<div className="w-full border-t border-[#D9D9D9] mt-3"></div>

</div>


{/* Profile Card */}

<div className="mt-5 rounded-[20px] border border-[#E3E3E3] overflow-hidden">

{/* Banner */}

<div className="relative h-[120px]" style={{backgroundImage:`url(${blueBg})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>
<button
onClick={() => {
  setProfilePage("edit");
}}
  className="absolute right-[15px] top-[68%] translate-y-[-50%] w-[100px] h-[42px] rounded-full bg-white flex items-center justify-center gap-2 text-[#4866F6] cursor-pointer"
>
  <span>Edit</span>
  <img
    src={editIcon}
    alt="edit"
    className="w-[16px] h-[16px]"
  />
</button>

</div>


{/* Profile Image */}

<div className="relative px-10">

<img
  src={
  profile?.avatar_url
    ? `http://127.0.0.1:8000${profile.avatar_url}`
    : profileImg
}
  alt="Profile"
  className="w-[80px] h-[80px] rounded-full border-[5px] border-white mt-[-40px]"
/>

</div>


{/* Details */}

<div className="px-6 md:px-8 lg:px-4 xl:px-10 pt-4 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-8 md:gap-y-7 lg:gap-y-8 gap-x-4 xl:gap-x-8">     <div className="flex gap-3 min-w-0 md:order-1 lg:order-none">

<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={nameIcon} alt="name" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>
<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Full Name</h3>

<p className="text-[#586D93] text-[15px] xl:text-[16px] break-words">
  {profile?.name || "-"}
</p>

</div>

</div>


<div className="flex gap-3 min-w-0 md:order-2 lg:order-none">

<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={dobIcon} alt="date of birth" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>
<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Date of Birth</h3>

<p className="text-[#586D93] text-[15px] xl:text-[16px] break-words">{profile?.date_of_birth || "-"}</p>

</div>

</div>


<div className="flex gap-3 min-w-0 md:order-3 lg:order-none">

<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={genderIcon} alt="gender" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>

<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Gender</h3>

<p className="text-[#586D93] text-[15px] xl:text-[16px] break-words">{profile?.gender || "-"}</p>

</div>

</div>


<div className="flex gap-3 min-w-[220px] xl:min-w-0 md:order-4 lg:order-none">
<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={emailIcon} alt="email" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>

<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Email Address</h3>

<p className="text-[#586D93] text-[15px] md:text-[13px] whitespace-nowrap">
{profile?.email || "-"}
</p>

</div>

</div>


<div className="flex gap-3 min-w-[220px] xl:min-w-0 md:order-5 lg:order-none">
<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={mobileIcon} alt="mobile" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>

<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Mobile Number</h3>

<p className="text-[#586D93] text-[15px] xl:text-[16px] break-words">{profile?.phone || "-"}</p>

</div>

</div>


<div className="flex gap-2 min-w-0 md:order-6 lg:order-none">
    
    <div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={mobileIcon} alt="mobile" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>

<div>


<h3 className="font-semibold text-[18px] md:text-[20px]  lg:text-[17px] xl:text-[22px] text-[#3D3D3D] whitespace-nowrap">
Alternate Number
</h3><p className="text-[#586D93] text-[15px] xl:text-[16px] break-words">{profile?.alternate_phone || "-"}</p>

</div>

</div>


<div className="flex gap-3 min-w-0 md:order-7 lg:order-none">

<div className="w-[46px] h-[46px] rounded-full bg-[#4866F6] flex items-center justify-center">
<img src={locationIcon} alt="location" className="w-[20px] h-[20px] md:w-[20px] md:h-[20px] min-[320px]:w-[24px] min-[320px]:h-[24px]" />
</div>

<div>

<h3 className="font-semibold text-[22px] lg:text-[18px] xl:text-[22px] text-[#3D3D3D]">Location</h3>

<p className="text-[#586D93] text-[15px] xl:text-[16px] whitespace-nowrap">
{profile?.location || "-"}
</p>
</div>

</div>

</div>

</div>


{/* My Plan */}

<div className="mt-5 rounded-[20px] border border-[#E3E3E3] p-4 md:p-5">

<h2 className="font-medium text-[25px] text-[#3D3D3D]">

My Plan

</h2>

<div className="w-full border-t border-[#D9D9D9] my-4"></div>

<div className="w-full rounded-[20px] border border-[#E8E8E8] px-5 md:px-8 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-start gap-14">

{/* Left */}

<div className="flex flex-col">

<p className="text-[#4866F6] font-bold text-[22px] leading-none">
$0.00
<span className="text-[14px] font-normal text-[#586D93]">
 / month
</span>
</p>

<h3 className="mt-2 text-[26px] font-semibold text-[#3D3D3D]">
Free plan
</h3>

<p className="mt-2 text-[15px] text-[#586D93] leading-[24px]">
Best plan for the fresher individuals
</p>

<button
  onClick={() => setProfilePage("subscription")}
  className="mt-4 w-[200px] h-[42px] rounded-full bg-[#4866F6] text-white font-medium flex items-center justify-center gap-2"
>
  Upgrade Plan
  <img src={sparkleIcon} alt="" className="w-[16px] h-[16px]" />
</button>

</div>

{/* Right */}

<div className="w-[220px] rounded-[14px] bg-[#F1F3FF] px-4 py-3">

<div className="flex flex-col gap-[10px] text-[#586D93] text-[14px]">

<div className="flex items-center gap-3">
<img src={vectorIcon} alt="" className="w-[14px] h-[14px]" />
<p>Culpa qui official</p>
</div>

<div className="flex items-center gap-3">
<img src={vectorIcon} alt="" className="w-[14px] h-[14px]" />
<p>Deserunt mollitia an</p>
</div>

<div className="flex items-center gap-3">
<img src={vectorIcon} alt="" className="w-[14px] h-[14px]" />
<p>Imi, id est laborum et</p>
</div>

<div className="flex items-center gap-3">
<img src={vectorIcon} alt="" className="w-[14px] h-[14px]" />
<p>Dolorum fuga Et har</p>
</div>

<div className="flex items-center gap-3">
<img src={vectorIcon} alt="" className="w-[14px] h-[14px]" />
<p>Um quidem rerum</p>
</div>

</div>

</div>

</div>

</div>

</div>

</div>

{showPaymentSuccess && (
  <PaymentSuccess
  onClose={() => {
    setShowPaymentSuccess(false);
  }}
  onGoHome={() => {
    setShowPaymentSuccess(false);
  }}
  onViewInvoice={handleViewInvoice}
  
/>
)}

{showInvoice && (
  <InvoicePopup
    invoiceData={invoiceData}
    onClose={() => setShowInvoice(false)}
  />
)}

{showPaymentUnsuccessful && (
  <PaymentUnsuccessful
    onClose={() => setShowPaymentUnsuccessful(false)}
    onRetry={() => {
      setShowPaymentUnsuccessful(false);
      setProfilePage("subscription");
    }}
    onChangeMethod={() => {
      setShowPaymentUnsuccessful(false);
      // Navigate to payment method page if you have one
    }}
  />
)}
</div>
)

}