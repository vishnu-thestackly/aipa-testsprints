import React from "react";

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

      <div className="w-full max-w-[620px] bg-white rounded-[20px] p-8 relative shadow-xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-[18px] h-[18px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px]"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-[24px] font-semibold text-[#4866F6]">
          Cancel Subscription
        </h2>

        {/* Description */}
        <p className="text-center text-[#8D8D8D] text-[16px] mt-4">
          Your plan will remain active until 30 May 2026
        </p>

        {/* Reason */}
        <div className="mt-6">
          <label className="block text-[#3D3D3D] text-[15px] mb-2">
            Reason (optional)
          </label>

          <textarea
            placeholder="Enter Reason here"
            className="w-full h-[90px] border border-[#D9D9D9] rounded-[10px] p-3 resize-none outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-2 mt-8">
  <button className="flex-1 max-w-[140px] h-[42px] rounded-full bg-[#4866F6] text-white text-[13px]">
    Cancel Now
  </button>

  <button className="flex-1 max-w-[170px] h-[42px] rounded-full bg-[#4866F6] text-white text-[13px]">
    Cancel End of Cycle
  </button>
</div>

      </div>

    </div>
  );
}