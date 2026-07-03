
import SparkleImg from "../../assets/images/SparkleImg.png"
import logoimage from "../../assets/images/logoimage.svg"
import VectorImg from "../../assets/images/VectorImg.png"
import Download from "../../assets/images/Download.png"
import { useNavigate } from "react-router-dom";




export default function InvoicePopup({ onClose, invoiceData }) {
  const navigate = useNavigate();
  const formatDate = (date) => {
  if (!date) return "-";
  

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const data = {
  invoiceId: invoiceData?.invoice_id,
  date: formatDate(invoiceData?.date),

  name: invoiceData?.user_name,
  email: invoiceData?.email,

  // API doesn't return address
  address: "-",

  plan: invoiceData?.plan_name,
  planDesc: invoiceData?.plan_description,

  amount: `₹${invoiceData?.amount ?? 0}`,

  billingStart: formatDate(invoiceData?.billing_cycle_start),
  billingEnd: formatDate(invoiceData?.billing_cycle_end),

  paymentId: invoiceData?.payment_id,
  paymentMethod: invoiceData?.payment_method,

  totalAmount: `₹${invoiceData?.amount ?? 0}`,
  cgst: `₹${invoiceData?.cgst ?? 0}`,
  sgst: `₹${invoiceData?.sgst ?? 0}`,
  discount: `₹${invoiceData?.discount ?? 0}`,
  grandTotal: `₹${invoiceData?.grand_total ?? 0}`,
};

  const handleDownload = () => {
    alert("Download functionality will be available soon");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">

     
      <div className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[640px]  lg:h-[674px] bg-white rounded-[20px] px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 shadow-2xl flex-col overflow-y-auto no-scrollbar">

        {/* Close Button */}
        

      
           <img src={VectorImg} 
           alt="close"
          //  onClick={onClose}
          onClick={() => {
              if (onClose) {
                  onClose();
              } else {
                  navigate("/user-profile");
              }
          }}
             className="absolute top-3 right-3 lg:top-4 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center cursor-pointer hover:opacity-80"/>
    
     

        <div className="flex flex-col flex-1 min-h-0">

          {/* Logo -  Personal Assistant */}
          <div className="flex items-center gap-2.5 mb-5 lg:mb-6  flex-shrink-0">
            <img src={logoimage} alt="Logo" className="h-10 
            " />
          </div>

          {/* Header + Download Button */}
          <div className="flex items-center justify-between mb-5 lg:mb-6 flex-shrink-0">
            <h2 className="text- lg:text-[24px] font-semibold text-[#3D3D3D] font-['SF_Pro'] tracking-wide">INVOICE</h2>
            <button
              onClick={handleDownload}
              
              className="flex items-center gap-2 bg-[#4866F6] cursor-pointer hover:bg-[#1D4ED8] text-[#FFFFFF] px-4 py-2 rounded-md text- font-medium transition"
            >
              <p>Download</p>
           <img src={Download} alt="" className="h-6 w-6 cursor-pointer" />
            </button>
           
          </div>
           <div className="flex justify-between mb-4 pb-4 border-b border-[#E5E7EB] flex-shrink-0"></div>

          {/* Address + Date/Invoice ID */}
          <div className="flex justify-between mb-4 pb-4 border-b border-[#E5E7EB] flex-shrink-0">
            <div>
              <p className="text-[16px] font-semibold text-[#3D3D3D] mb-1">Address</p>
              <p className="text-[14px] text-[#8D97A9] max-w-[200px] leading-[1.5]  ">{data.address}</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] text-[#3D3D3D] mb-1">
                <span className="font-medium">Date:</span> <span className=" text-[#8D97A9] text-[14px]">{data.date}</span>
              </p>
              <p className="text- text-[#3D3D3D]">
                <span className="font-medium">Invoice ID:</span> <span className="text-[#8D97A9] text-[14px]">{data.invoiceId}</span>
              </p>
            </div>
          </div>

          {/* Name + Email ID */}
         
            <p className="text-[16px] text-[#1F2937]">
              <span className="font-medium">Name:</span> <span className="text-[#8D97A9] text-[15px]">{data.name}</span>
            </p>
            <p className="text-[16px] text-[#3D3D3D] lg:ml-[290px] lg:mt-[-25px]">
              <span className="font-medium">Email ID:</span> <span className="text-[#8D97A9] text-[15px]">{data.email}</span>
            </p>
          </div>

          {/* Plan Card - Blue background with icon */}
          <div className="bg-[#4866F61A] border-[#4866F6] border-[1px] rounded-xl lg:mt-[5px] p-4 mb-4 flex-shrink-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={SparkleImg} alt="" />

                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#3D3D3D] mb-0.5 ">{data.plan}</p>
                  <p className="text-[14px] text-[#8D97A9]  font-medium">{data.planDesc}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] text-[#8D97A9] mb-0.5  font-medium">Amount</p>
                <p className="text- font-semibold text-[#3D3D3D]">{data.amount}</p>
              </div>
            </div>
            <div>
              <p className="text-[16PX] font-semibold text-[#3D3D3D] mb-1">Billing Cycle</p>
              <p className="text-[14px] text-[#8D97A9]  font-medium">{data.billingStart} - {data.billingEnd}</p>
            </div>
          </div>
 <div className="flex justify-between mb-4 pb-4 border-b border-[#E5E7EB] flex-shrink-0"></div>
          {/* Payment Details */}
          <div className="space-y-2 mb-4 flex-shrink-0 ">
            <div className="flex justify-between text-">
              <span className=" text-[#3D3D3D] text-[16px] font-medium">Payment ID :</span>
              <span className="text-[#8D97A9]">{data.paymentId}</span>
            </div>
            <div className="flex justify-between text-">
              <span className="text-[#3D3D3D] text-[16px] font-medium">Payment method :</span>
              <span className="text-[#8D97A9]  font-['SF_Pro']">{data.paymentMethod}</span>
            </div>
          </div>

          {/* Amount Summary - Right aligned */}
          <div className="flex-1 flex-col justify-end min-h-0">
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-end gap-16 text-">
                <span className="text-[#3D3D3D] text-[14px] font-medium">Total Plan Amount :</span>
                <span className="text-[#8D97A9] w-16 text-[14px] text-right">{data.totalAmount}</span>
              </div>
              <div className="flex justify-end gap-16 text-">
                <span className="text-[#3D3D3D] text-[14px] font-medium">CGST :</span>
                <span className="text-[#8D97A9] w-16 text-[14px] text-right">{data.cgst}</span>
                
              </div>
              <div className="flex justify-end gap-16 text-">
                <span className="text-[#3D3D3D] text-[14px] font-medium">SGST :</span>
                <span className="text-[#8D97A9] w-16  text-[14px] text-right">{data.sgst}</span>
              </div>
              <div className="flex justify-end gap-16 text-">
                <span className="text-[#3D3D3D] text-[14px] font-medium">Discount :</span>
                <span className="text-[#8D97A9] w-16 text-[14px] text-right">{data.discount}</span>
              </div>
              <div className="flex justify-end gap-16 text- pt-2 border-t border-[#E5E7EB] mt-2">
                <span className="font-semibold text-[#3D3D3D] text-[16px] font-medium">Grand Total:</span>
                <span className="font-semibold text-[#1F2937] w-16 text-right">{data.grandTotal}</span>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] pt-3 flex-shrink-0"></div>
            <p className="text-[18px] text-[#4866F6] lg:mt-[-10px] text-center  font-['SF_Pro'] font-medium flex-shrink-0">
              Thankyou for the Purchase!!
            </p>
          </div>
        </div>
      </div>
    
  );
}