import React, { useState } from "react";
import { cancelSubscription } from "../../../api/authApi";
import CancelConfirmationModal from "./CancelConfirmationModal";

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelNow, setCancelNow] = useState(true);

  if (!isOpen) return null;

  const openConfirmation = (type) => {
    setCancelNow(type);
    setConfirmOpen(true);
  };

  const handleCancel = async () => {
    try {
      setLoading(true);

      const response = await cancelSubscription({
        reason,
        cancel_now: cancelNow,
      });

      console.log(response);

      alert(response.message || "Subscription cancelled successfully");

      setConfirmOpen(false);
      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Cancel Subscription Error:", error);

      if (error.response) {
        alert(
          error.response.data.detail ||
          JSON.stringify(error.response.data)
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

        <div className="w-full max-w-[92%] sm:max-w-[500px] md:max-w-[620px] bg-white rounded-[20px] p-5 sm:p-8 relative shadow-xl">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-[18px] h-[18px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px] cursor-pointer"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-center text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#4866F6]">
            Cancel Subscription
          </h2>

          {/* Description */}
          <p className="text-center text-[#8D8D8D] text-[11px] sm:text-[15px] md:text-[16px] whitespace-nowrap mt-4">
            Your plan will remain active until 30 May 2026
          </p>

<div className="w-full md:max-w-[380px] lg:max-w-[400px] mx-auto">

          {/* Reason */}
          <div className="mt-5 sm:mt-6">
            <label className="block text-[#3D3D3D] text-[14px] sm:text-[15px] mb-2 font-medium">
              Reason (optional)
            </label>

            <textarea
              placeholder="Enter Reason here"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-[90px] border border-[#D9D9D9] rounded-[10px] p-3 resize-none outline-none text-[14px]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-1.5 sm:gap-3 mt-6 sm:mt-8 w-full">

            <button
              onClick={() => openConfirmation(true)}
              disabled={loading}
              className="flex-1 max-w-[120px] sm:max-w-[140px] h-[40px] sm:h-[42px] rounded-full bg-[#4866F6] text-white text-[11px] sm:text-[13px] font-semibold disabled:opacity-50 flex items-center justify-center whitespace-nowrap cursor-pointer hover:bg-[#3554ED] transition-all"
            >
              Cancel Now
            </button>

            <button
              onClick={() => openConfirmation(false)}
              disabled={loading}
              className="flex-1 max-w-[145px] sm:max-w-[170px] h-[40px] sm:h-[42px] rounded-full bg-[#4866F6] text-white text-[11px] sm:text-[13px] font-semibold disabled:opacity-50 flex items-center justify-center whitespace-nowrap cursor-pointer hover:bg-[#3554ED] transition-all"
            >
              Cancel End of Cycle
            </button>

          </div>
</div>
        </div>
      </div>

      <CancelConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleCancel}
        loading={loading}
      />
    </>
  );
}
// import React, { useState } from "react";
// import { cancelSubscription } from "../../../api/authApi";

// export default function CancelSubscriptionModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }) {
//   if (!isOpen) return null;
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);


//   const handleCancel = async (cancelNow) => {
//   try {
//     setLoading(true);

//     const response = await cancelSubscription({
//       reason,
//       cancel_now: cancelNow,
//     });

//     console.log(response);

//     alert(response.message || "Subscription cancelled successfully");

//     onClose();

//     if (onSuccess) {
//       onSuccess();
//     }
//   } catch (error) {
//   console.error("Cancel Subscription Error:", error);

//   if (error.response) {
//     console.log("Status:", error.response.status);
//     console.log("Data:", error.response.data);
//     alert(error.response.data.detail || JSON.stringify(error.response.data));
//   } else {
//     alert(error.message);
//   }
// }finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center px-4">

//       <div className="w-full max-w-[620px] bg-white rounded-[20px] p-8 relative shadow-xl">

//         {/* Close */}
//         <button onClick={onClose} className="absolute top-5 right-5 w-[18px] h-[18px] rounded-full bg-[#FF4D4F] text-white flex items-center justify-center text-[10px] cursor-pointer">
//           ✕
//         </button>

//         {/* Title */}
//         <h2 className="text-center text-[24px] font-semibold text-[#4866F6]">
//           Cancel Subscription
//         </h2>

//         {/* Description */}
//         <p className="text-center text-[#8D8D8D] text-[16px] mt-4">
//           Your plan will remain active until 30 May 2026
//         </p>

//         {/* Reason */}
//         <div className="mt-6">
//           <label className="block text-[#3D3D3D] text-[15px] mb-2">
//             Reason (optional)
//           </label>

//           <textarea
//             placeholder="Enter Reason here"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="w-full h-[90px] border border-[#D9D9D9] rounded-[10px] p-3 resize-none outline-none"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center items-center gap-2 mt-8">
//            <button onClick={() => handleCancel(true)} disabled={loading} className="flex-1 max-w-[140px] h-[42px] rounded-full bg-[#4866F6] text-white text-[13px] cursor-pointer disabled:opacity-50">
//             {loading ? "Please wait..." : "Cancel Now"}
//           </button>

//             <button onClick={() => handleCancel(false)} disabled={loading} className="flex-1 max-w-[170px] h-[42px] rounded-full bg-[#4866F6] text-white text-[13px] cursor-pointer disabled:opacity-50">
//             {loading ? "Please wait..." : "Cancel End of Cycle"}
//           </button>
// </div>

//       </div>

//     </div>
//   );
// }