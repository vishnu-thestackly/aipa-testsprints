import { useState } from "react";
import paymentsuccess from "../../assets/images/paymentsuccess.png"
import VectorImg from "../../assets/images/VectorImg.png"
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess({
  onClose,
  onGoHome,
  onViewInvoice,
}) {
    const navigate = useNavigate();
const [searchParams] = useSearchParams();

const sessionId = searchParams.get("session_id");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">

      {/* Popup - fixed  */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:w-[500px] lg:h-[500px] bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Close Icon  */}
        <img
          src={VectorImg}
          alt="close"
          onClick={() => navigate("/user/profile")}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:opacity-80 z-10"
        />

        {/* Content */}
        <div className="flex flex-col items-center">

          {/* Success Image */}
          <div className="relative w-20 h-20 sm:w-24  sm:h-24 md:w-45 md:h-45  h-[110px] w-[110px] lg:w-[169px] lg:h-[169px] mt-4 sm:mt-6 mb-5 sm:mb-6">
            <img src={paymentsuccess} alt="success" className="w-full h-full  object-contain" />
          </div>

          {/* Text */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#4866F6] text-center mb-2">
            Payment Successful
          </h2>

          <p className="text-sm sm:text-base text-[#8D97A9]  whitespace-nowrap text-center mb-6 sm:mb-8 px-2">
            Your Payment was Completed Successfully
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/user/profile")}
            className="w-full max-w-[330px] h-11   sm:h-12 bg-[#4866F6] text-white rounded-full text-base font-medium hover:bg-blue-700 transition mb-4"
          >
            Go to Home
          </button>

          {/* View Invoice Link */}
          <button
            onClick={() =>
  navigate(`/user/profile/invoice?payment_id=${paymentId}`)
}
            className="text-sm sm:text-base text-[#4866F6] lg:mt-[5px] mt-[-10px] font-medium underline hover:text-blue-700"
          >
            View Invoice &gt;&gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}





