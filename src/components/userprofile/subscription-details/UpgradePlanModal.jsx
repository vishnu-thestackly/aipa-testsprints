import React, { useState } from "react";
import arrowIcon from "../../../assets/images/arrow.svg";

import { createCheckoutSession } from "../../../api/authApi";

export default function UpgradePlanModal({
  isOpen,
  onClose,
  subscription,
  plans
}) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlanChange = (plan) => {
  setSelectedPlan(plan);
};

 const handleDurationChange = (duration) => {
  setSelectedDuration(duration);
};

  const getRemainingDays = () => {
    if (!subscription?.billing_cycle_end) return "0 days";
    const end = new Date(subscription.billing_cycle_end);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : "0 days";
  };

  const getProratedCharges = () => {
    if (selectedPlan === "basic") return "₹99.00";
    if (selectedPlan === "premium") return "₹999.00";
    return "₹99.00";
  };

  const handleConfirmPayment = async () => {
    if (!selectedPlan) {
      alert("Please select a plan.");
      return;
    }
    if (!selectedDuration) {
      alert("Please select a duration.");
      return;
    }
    console.log("selectedPlan =", selectedPlan, "selectedDuration =", selectedDuration);

    // const payload = {
    //   plan_id: selectedPlan === "basic" ? 2 : selectedPlan === "premium" ? 3 : null,
    //   plan_type: selectedDuration,
    // };

    const selectedPlanObj = plans.find(
  (plan) => plan.name === selectedPlan
);

const payload = {
  plan_id: selectedPlanObj?.plan_id,
  plan_type: selectedDuration,
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

      <div className="w-full max-w-[92%] sm:max-w-[500px] md:max-w-[620px] bg-white rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:px-10 md:py-8 relative shadow-xl">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-[16px] h-[16px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px] cursor-pointer">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#4866F6]">
          Upgrade Plan
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#A0A7B5] text-[13px] sm:text-[15px] md:text-[18px] mt-3 sm:mt-4">
          Unlock more features and scale as your needs grow.
        </p>

        <div className="w-full max-w-[450px] mx-auto">
          {/* Select Plan */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <select
                value={selectedPlan}
                onChange={(e) => handlePlanChange(e.target.value)}
                className={`w-full h-[40px] sm:h-[44px] md:h-[46px] text-xs sm:text-sm md:text-base border border-[#D9D9D9] rounded-[8px] pl-3 pr-8 sm:px-4 appearance-none outline-none bg-white cursor-pointer ${selectedPlan ? "text-[#3D3D3D]" : "text-[#A0A7B5]"
                  }`}
              >
                <option value="">Select Plan</option>
           

{plans?.map((plan) => (
  <option key={plan.plan_id} value={plan.name}>
    {plan.name}
  </option>
))}
              </select>
              <img src={arrowIcon} alt="arrow" className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] pointer-events-none" />
            </div>
          </div>

          {/* Select Duration */}
          <div className="mt-3 sm:mt-4">
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className={`w-full h-[40px] sm:h-[44px] md:h-[46px] text-xs sm:text-sm md:text-base border border-[#D9D9D9] rounded-[8px] pl-3 pr-8 sm:px-4 appearance-none outline-none bg-white cursor-pointer ${selectedDuration ? "text-[#3D3D3D]" : "text-[#A0A7B5]"
                  }`}
              >
                <option value="">Select Duration</option>
                <option value="monthly">Monthly</option>
                <option value="annual">Yearly</option>
              </select>
              <img src={arrowIcon} alt="arrow" className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] pointer-events-none" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#E5E5E5] mt-4"></div>

          {/* Charges */}
          <div className="mt-4 space-y-3">

            <div className="flex justify-between text-[12px] sm:text-[13px] md:text-[14px]">
              <span className="text-[#3D3D3D]">
                Remaining Days :
              </span>

              <span className="text-[#A0A7B5]">
                {subscription?.remaining_days ?? 0} days
              </span>
            </div>

            <div className="flex justify-between text-[12px] sm:text-[13px] md:text-[14px]">
              <span className="text-[#3D3D3D]">
                Prorated Charges :
              </span>

              <span className="text-[#A0A7B5]">
               ₹{Number(subscription?.prorated_charges ?? 0).toFixed(2)}
              </span>
            </div>

          </div>

          {/* Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className="w-full h-[40px] sm:h-[42px] md:h-[44px] text-xs sm:text-sm md:text-base rounded-full bg-[#4866F6] text-white mt-6 sm:mt-8 font-medium cursor-pointer"
          >
            {loading ? "Redirecting..." : "Confirm & Pay"}
          </button>
        </div>
      </div>

    </div>
  );
}