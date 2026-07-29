import React, { useState, useRef } from "react";
import arrowIcon from "../../../assets/images/arrow.svg";
import calendarIcon from "../../../assets/images/calender.svg";

import { downgradePlan } from "../../../api/authApi";

export default function DowngradePlanModal({
  isOpen,
  onClose,
})


 {
  const [fromDate, setFromDate] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const dateRef = useRef(null);


  const handleDowngrade = async () => {
  if (!selectedPlan) {
    alert("Please select a plan");
    return;
  }

  if (!effectiveDate) {
  alert("Please select a date");
  return;
}

  const payload = {
  plan_id: Number(selectedPlan),
  effective_date: effectiveDate,
};

  try {
    const res = await downgradePlan(payload);

    console.log(res);

    onClose();
  } catch (err) {
    console.error(err);
  }
};
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

      <div className="w-full max-w-[92%] sm:max-w-[500px] md:max-w-[620px] bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:px-10 md:py-8 relative shadow-xl">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-[16px] h-[16px] rounded-full bg-[#FF4D4F] text-white text-[10px] flex items-center justify-center cursor-pointer">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#4866F6]">
          Downgrade Plan
        </h2>

        {/* Description */}
        <p className="text-center text-[#A0A7B5] text-[13px] sm:text-[15px] md:text-[16px] mt-3 sm:mt-4">
          Switch to a simpler plan that fits your current needs.
        </p>

        {/* Plan */}
        <div className="mt-4 sm:mt-6">
  <label className="text-[#3D3D3D] text-[13px] sm:text-[14px] md:text-[15px] mb-2 block">
    Select Plan
  </label>

  <div className="relative">
    <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full h-[40px] sm:h-[44px] md:h-[46px] text-xs sm:text-sm md:text-base border border-[#D9D9D9] rounded-[8px] pl-3 pr-8 sm:px-4 appearance-none outline-none bg-white cursor-pointer">
      <option value="">Select Plan</option>
      <option value="1">Free Plan</option>
      <option value="2">Basic Plan</option>
    </select>

    <img src={arrowIcon} alt="" className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] pointer-events-none" />
  </div>
</div>
        {/* From */}
       <div className="mt-3 sm:mt-4">
  <label className="text-[#3D3D3D] text-[13px] sm:text-[14px] md:text-[15px] mb-2 block">
    From
  </label>

  <div className="relative">

    {/* Visible Input */}
    <input
      type="text"
      value={fromDate}
      placeholder="DD - MM - YYYY"
      readOnly
      className="w-full h-[40px] sm:h-[44px] md:h-[46px] text-xs sm:text-sm md:text-base border border-[#D9D9D9] rounded-[8px] pl-3 pr-8 sm:px-4 outline-none text-[#A0A7B5] bg-white"
    />

    {/* Hidden Date Picker */}
    <input
      ref={dateRef}
      type="date"
      className="absolute opacity-0 pointer-events-none"
      onChange={(e) => {
        if (!e.target.value) return;

        const date = new Date(e.target.value);

        setEffectiveDate(date.toISOString());

        const formatted =
          String(date.getDate()).padStart(2, "0") +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          date.getFullYear();

        setFromDate(formatted);
      }}
    />

    {/* Calendar Icon */}
    <img
      src={calendarIcon}
      alt="calendar"
      onClick={() => {
        if (dateRef.current?.showPicker) {
          dateRef.current.showPicker();
        } else {
          dateRef.current.click();
        }
      }}
      className="absolute right-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] cursor-pointer"
    />

  </div>
</div>

{/* Button */}
<button 
onClick={handleDowngrade} 
className="w-full h-[40px] sm:h-[42px] md:h-[44px] text-xs sm:text-sm md:text-base rounded-full bg-[#4866F6] text-white mt-5 sm:mt-6 font-medium cursor-pointer">
  Confirm Downgrade
</button>
</div></div>
  );
}