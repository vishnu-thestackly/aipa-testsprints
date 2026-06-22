import React from "react";
import arrowIcon from "../../../assets/images/arrow.svg";

export default function UpgradePlanModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

      <div className="w-full max-w-[620px] bg-white rounded-[24px] px-10 py-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-[16px] h-[16px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px]"
        >
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
    className="w-full h-[46px] border border-[#D9D9D9] rounded-[8px] px-4 appearance-none text-[#A0A7B5] outline-none bg-white"
  >
    <option>Select Plan</option>
    <option>Basic Plan</option>
    <option>Premium Plan</option>
  </select>

  <img
    src={arrowIcon}
    alt="arrow"
    className="absolute right-6 top-1/2 -translate-y-1/2 w-[12px] h-[12px] pointer-events-none"
  />
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
        <button className="w-full h-[44px] rounded-full bg-[#4866F6] text-white mt-8 font-medium">
          Confirm & Pay
        </button>

      </div>

    </div>
  );
}