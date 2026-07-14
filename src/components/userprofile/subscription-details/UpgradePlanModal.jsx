import React, { useState } from "react";
import arrowIcon from "../../../assets/images/arrow.svg";

import { createCheckoutSession } from "../../../api/authApi";

export default function UpgradePlanModal({
  isOpen,
  onClose,
}) 
{

  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmPayment = async () => {
  if (!selectedPlan) {
    alert("Please select a plan.");
    return;
  }
  console.log("selectedPlan =", selectedPlan);

  const payload = {
  plan_id: selectedPlan === "monthly" ? 2 : selectedPlan === "annual" ? 3 : null,
  plan_type: selectedPlan,
};

  console.log("Payload:", payload);

  try {
    setLoading(true);

    const response = await createCheckoutSession(payload);

    console.log("Checkout Response:", response);

    if (response.checkout_url) {
      window.location.href = response.checkout_url;
    }
  } catch (error) {
    console.error("Checkout Error:", error.response?.data);
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

      <div className="w-full max-w-[620px] bg-white rounded-[24px] px-10 py-8 relative">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-[16px] h-[16px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px] cursor-pointer">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-[24px] font-semibold text-[#4866F6]">
          Upgrade Plan
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#A0A7B5] text-[16px] mt-4">
          Unlock more features and scale as your needs grow.
        </p>

        {/* Select Plan */}
        <div className="mt-6">
<div className="relative">
  <select
  value={selectedPlan}
  onChange={(e) => {
  alert(e.target.value);
  setSelectedPlan(e.target.value);
}}
  className="w-full h-[46px] border border-[#D9D9D9] rounded-[8px] px-4 appearance-none text-[#A0A7B5] outline-none bg-white cursor-pointer"
>
  <option value="">Select Plan</option>
  <option value="monthly">Basic Plan</option>
  <option value="annual">Premium Plan</option>
</select>

  <img src={arrowIcon} alt="arrow" className="absolute right-6 top-1/2 -translate-y-1/2 w-[12px] h-[12px] pointer-events-none" />
</div>  
            
        </div>

        {/* Divider */}
        <div className="border-t border-[#E5E5E5] mt-4"></div>

        {/* Charges */}
        <div className="mt-4 space-y-3">

          <div className="flex justify-between text-[14px]">
            <span className="text-[#3D3D3D]">
              Remaining Days :
            </span>

            <span className="text-[#A0A7B5]">
              5 days
            </span>
          </div>

          <div className="flex justify-between text-[14px]">
            <span className="text-[#3D3D3D]">
              Prorated Charges :
            </span>

            <span className="text-[#A0A7B5]">
              ₹500.00
            </span>
          </div>

        </div>

        {/* Button */}
        <button
            onClick={handleConfirmPayment}
            disabled={loading}
           className="w-full h-[44px] rounded-full bg-[#4866F6] text-white mt-8 font-medium cursor-pointer"
          >
            {loading ? "Redirecting..." : "Confirm & Pay"}
          </button>

          

      </div>

    </div>
  );
}