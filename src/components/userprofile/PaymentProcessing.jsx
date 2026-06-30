import paymentprocess from "../../assets/images/paymentprocess.png"
import VectorImg from "../../assets/images/VectorImg.png"

export default function PaymentProcessing({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">

      {/* Popup  */}
      <div className="relative w-full max-w-[430px] lg:h-[550px] max-h-[90vh] bg-white rounded-[20px] px-6 sm:px-8 py-8 sm:py-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-y-auto">

        {/* Close Icon  */}
        <img
          src={VectorImg}
          alt="close"
          onClick={onClose}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:opacity-80 z-10"
        />

      
        <div className="flex flex-col items-center justify-center text-center">

          {/* Image */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-[200px] lg:h-[200px] mb-6 sm:mb-8 lg:mt-[20px] lg:mb-8">
            <img src={paymentprocess} alt="processing" className="w-full h-full object-contain" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-[26px] lg:text-[26px]  lg:mt-[20px] font-semibold text-[#4866F6] mb-3">
            Payment Processing
          </h2>

          {/* Subtext */}
          <p className="text-sm sm:text-[16px] lg:text-[16px] text-[#8D97A9] max-w-[350px] leading-relaxed px-2">
            We are Confirming your Payment, please<br className="hidden sm:block"/>
            wait don't refresh this page.
          </p>
        </div>
      </div>
    </div>
  );
}