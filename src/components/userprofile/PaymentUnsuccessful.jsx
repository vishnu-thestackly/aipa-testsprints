import VectorImg from "../../assets/images/VectorImg.png"
import paymentunsuccess from "../../assets/images/paymentunsuccess.png"

export default function PaymentUnsuccessful({ onClose, onRetry, onChangeMethod }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
     
      <div className="relative  w-[500px] lg:w-[450px] md:w-[500px] lg:h-[530px] h-[500px] bg-white rounded-[24px] px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

        {/* Red Close Icon - Top Right */}
        <img src={VectorImg} 
        alt="close"
        onClick={onclose}  
        className="absolute top-3 right-3 lg:top-4 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center cursor-pointer hover:opacity-80"/>

        {/* Content - Center */}
        <div className="flex flex-col items-center justify-center h-full mt-[-130px] md:mt-[-120px] lg:mt-[-120px]">

          <img src={paymentunsuccess} alt="" />

             </div>

          {/* Heading */}
          <h2 className="text-[25px] font-semibold text-[#4866F6] lg:mt-[-110px] mt-[-110px] md:mt-[-100px] mb-3 text-center ">
            Payment Unsuccessful
          </h2>

          {/* Subtext  */}
          <p className="text-[16px] text-[#8D97A9] leading-[1.5] md:ml-[25px] max-w-[380px] text-center font-regular mb-8 max-w-[280px] leading-[24px]">
            Your Payment Could not be completed due to 
            bank server down
          </p>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="w-full max-w-[340px] h-[44px]  mt-[-30px] md:ml-[40px] lg:ml-[20px] bg-[#4866F6] hover:bg-[#2563EB] text-[#FFFFFF] rounded-full text-[18px] font-medium transition mb-4"
          >
            Retry Payment
          </button>

          {/* Change Payment Method Link */}
          <button
            onClick={onChangeMethod} 
            className="text-[16px] text-[#4866F6] underline  ml-[30px] font-Regular md:ml-[110px]  lg:ml-[90px] hover:text-[#2563EB] transition"
          >
            Change Payment Method
          </button>
        </div>
      </div>
    
  );
}