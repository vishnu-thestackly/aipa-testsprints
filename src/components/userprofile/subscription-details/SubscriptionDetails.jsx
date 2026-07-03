import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
import sparkleIcon from "../../../assets/images/Sparkle.svg";
import cardIcon from "../../../assets/images/card.svg";
import eyeIcon from "../../../assets/images/eyes.svg";
import downloadIcon from "../../../assets/images/download.svg";
import rightArrow from "../../../assets/images/rightarrow.svg";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import UpgradePlanModal from "./UpgradePlanModal";
import DowngradePlanModal from "./DowngradePlanModal";



import { getSubscriptionDetails, getInvoice } from "../../../api/authApi";
import InvoicePopup from "../InvoicePopup";
import { verifyPayment } from "../../../api/authApi";

export default function SubscriptionDetails({
  setProfilePage,
}) {
      
const [showCancelModal, setShowCancelModal] = useState(false);
const [showUpgradeModal, setShowUpgradeModal] = useState(false);
const [showDowngradeModal, setShowDowngradeModal] = useState(false);
const [selectedPlanAction, setSelectedPlanAction] = useState("");
const [showInvoice, setShowInvoice] = useState(false);
const [invoiceData, setInvoiceData] = useState(null);

const [subscription, setSubscription] = useState(null);

useEffect(() => {
  fetchSubscription();
}, []);


const handleViewInvoice = async (paymentId) => {
  try {
    const response = await getInvoice(paymentId);

    console.log(response);

    setInvoiceData(response);
    setShowInvoice(true);
  } catch (err) {
    console.log(err);
  }
};

const fetchSubscription = async () => {
  try {
    const response = await getSubscriptionDetails();

    console.log("Subscription Response:", response);
    console.log("Billing History:", response.billing_history);

    setSubscription(response);
  } catch (error) {
    console.error(error);
  }
};

const PAGE_SIZE = 6;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(
  (subscription?.billing_history?.length || 0) / PAGE_SIZE
);

const paginatedHistory =
  subscription?.billing_history?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  ) || [];

  return (
    <div className="px-3 sm:px-5 lg:px-7 pt-5 pb-10">
      <div className="w-full rounded-[25px] border border-[#DADADA] bg-white p-5 md:p-7 shadow-[0px_0px_4px_0px_#00000014]">

        {/* Header */}
        {/* Header */}
<div>
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center">
      <ArrowLeft
        onClick={() => setProfilePage("dashboard")}
        className="w-3 h-3 sm:w-4 sm:h-4 text-white cursor-pointer"
        strokeWidth={2.5}
      />
    </div>

    <h2 className="text-[16px] lg:text-[24px] font-medium text-[#3D3D3D]">
      Subscription Details
    </h2>
  </div>

  {/* Divider line */}
  <div className="w-full border-t border-[#D9D9D9] mt-4"></div>
</div>

        {/* Subscription Card */}
        <div className="mt-6 rounded-[14px] border border-[#4866F6] bg-[#F5F7FF] p-5">

          <div className="flex justify-between flex-wrap gap-4">

            <div className="flex items-start gap-3">
  <div className="w-[52px] h-[52px] rounded-[12px] bg-[#4866F6] flex items-center justify-center flex-shrink-0">
    <img
      src={sparkleIcon}
      alt="sparkle"
      className="w-[24px] h-[24px]"
    />
  </div>

  <div>
    <h3 className="text-[20px] font-semibold text-[#3D3D3D]">
  {subscription?.plan_name}
</h3>

<p className="text-[#8D8D8D] text-sm">
  {subscription?.plan_description}
</p>
  </div>
</div>

          </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 md:mt-8">  {/* Billing Cycle */}
  <div>
    <p className="text-[#3D3D3D] font-medium text-[16px]">
      Billing Cycle
    </p>

    <p className="text-[#8D8D8D] text-sm mt-3 whitespace-nowrap">
  {new Date(subscription?.billing_cycle_start).toLocaleDateString()} -{" "}
  {new Date(subscription?.billing_cycle_end).toLocaleDateString()}  
</p>
  </div>

  {/* Next Billing Date */}<div className="md:ml-8 lg:ml-10">
  <p className="text-[#3D3D3D] font-medium text-[16px] whitespace-nowrap">
    Next Billing Date
  </p>

  <p className="text-[#8D8D8D] text-sm mt-3 whitespace-nowrap">
    {new Date(subscription?.next_billing_date).toLocaleDateString()}
  </p>
</div>

  {/* Status */}
<div className="flex flex-col md:items-end">
<p className="text-[#3D3D3D] font-medium text-[16px] mb-3 md:mr-10">
        {subscription?.status}
    </p>

    <div className="flex items-center gap-2 bg-[#36B66A] px-4 h-[28px] rounded-full w-fit">
      <span className="w-[10px] h-[10px] bg-white rounded-full"></span>

      <span className="text-white text-[14px] font-medium">
        Active
      </span>
    </div>
  </div>

</div>
<div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-4">
<div className="grid grid-cols-2 gap-3 w-full md:flex md:w-[220px] lg:w-[240px]">  
   <button onClick={() => { setSelectedPlanAction("upgrade"); setShowUpgradeModal(true); }} className={`h-[42px] rounded-full text-[14px] w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${selectedPlanAction === "upgrade" ? "bg-[#4866F6] text-white hover:bg-[#3554ED] active:bg-[#2746DD]" : "bg-white border border-[#4866F6] text-[#4866F6] hover:bg-[#4866F6] hover:text-white"}`}>
  Upgrade
</button>

<button onClick={() => { setSelectedPlanAction("downgrade"); setShowDowngradeModal(true); }} className={`h-[42px] rounded-full text-[14px] w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${selectedPlanAction === "downgrade" ? "bg-[#4866F6] text-white hover:bg-[#3554ED] active:bg-[#2746DD]" : "bg-white border border-[#4866F6] text-[#4866F6] hover:bg-[#4866F6] hover:text-white"}`}>
  Downgrade
</button>
</div>
  <button onClick={() => setShowCancelModal(true)} className="border border-[#FF4D4F] text-[#FF4D4F] h-[42px] rounded-full w-full md:w-auto md:px-8 cursor-pointer">
  Cancel Subscription
</button>

</div>
</div>

        {/* Payment Method */}
        <div className="mt-5 rounded-[20px] border border-[#E5E5E5] p-6">

  {/* Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
  <h3 className="text-[18px] font-medium text-[#3D3D3D]">
    Payment Method
  </h3>

<button className="hidden md:flex h-[40px] w-auto px-5 rounded-full bg-[#4866F6] text-white text-[15px] lg:text-[17px] items-center justify-center gap-2 whitespace-nowrap cursor-pointer">    Update Payment Method
    <span>→</span>
  </button>
</div>

  <div className="border-t border-[#D9D9D9] mt-4"></div>

  {/* Card */}
<div className="mt-5 border border-[#4866F6] rounded-[14px] bg-[#F5F7FF] p-4 mx-[-4px] min-[375px]:mx-0 md:px-4 md:py-4 lg:px-5 lg:py-5 flex flex-col md:flex-row md:items-center gap-4"> 
   <div className="flex items-start gap-3 md:flex-[1.5]"> 
<div className="flex-shrink-0 w-[42px] h-[42px] md:w-[42px] md:h-[42px] lg:w-[54px] lg:h-[54px] rounded-[10px] lg:rounded-[12px] bg-[#4866F6] flex items-center justify-center">
  <img
    src={cardIcon}
    alt="card"
    className="w-[18px] h-[18px] md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]"
  />
</div>

      <div>
      <p className="text-[#3D3D3D] text-[14px] -ml-1 md:text-[13px] lg:text-[16px] font-medium leading-[20px] whitespace-nowrap">
  Rupay card ending in
  <span className="block md:inline whitespace-nowrap">
    {subscription?.payment_method_brand} card ending in **** **** **** {subscription?.payment_method_last4}
  </span>
</p>

        <p className="text-[#A0A7B5] text-[12px] md:text-[13px] lg:text-[14px] mt-1">
  Expires in {subscription?.payment_method_expires}
</p>
      </div>

    </div>

    {/* Right Side */}
<div className="ml-12 md:ml-auto lg:ml-0 text-left md:text-right lg:text-left md:min-w-[140px] lg:min-w-[170px]">
           <p className="text-[#3D3D3D] text-[14px] md:text-[14px] lg:text-[16px] font-medium">
  Last Payment Date
</p>

  <p className="text-[#A0A7B5] text-[12px] md:text-[13px] lg:text-[14px] mt-1 lg:mt-2">
  {new Date(subscription?.last_payment_date).toLocaleDateString()}
</p>
</div>

  </div>

</div>

        {/* Billing History */}
        <div className="mt-5 rounded-[20px] border border-[#E5E5E5] p-6">

  {/* Header */}
  <h3 className="text-[18px] font-medium text-[#3D3D3D]">
    Billing History
  </h3>

  <div className="border-t border-[#D9D9D9] mt-4"></div>

  {/* Table Container */}
{/* Table Container */}
<div className="mt-5 overflow-x-auto border border-[#D9D9D9] rounded-[16px]">
  <table className="w-full min-w-[850px]">

    <thead>
      <tr className="bg-[#F5F7FF] h-[60px] md:h-[52px] lg:h-[56px]">

        <th className="w-[12%] px-8 text-center text-[15px] font-medium text-[#3D3D3D] whitespace-nowrap">
          SL No
        </th>

        <th className="w-[28%] pl-22 md:pl-8 lg:pl-12 pr-8 text-left text-[15px] font-medium text-[#3D3D3D]">
          Invoice No
        </th>

        <th className="w-[28%] pl-22 md:pl-8 lg:pl-12 px-8 text-left text-[15px] font-medium text-[#3D3D3D]">
          Date
        </th>

        <th className="w-[12%] px-8 text-center text-[15px] font-medium text-[#3D3D3D]">
          Amount
        </th>

        <th className="w-[20%] px-8 text-center text-[15px] font-medium text-[#3D3D3D]">
          Action
        </th>

      </tr>
    </thead>

    <tbody>
      {paginatedHistory.map((item, index) => (
        <tr
          key={index + 1}
          className="h-[50px] md:h-[46px] lg:h-[50px] border-t border-[#ECECEC]"
        >
          <td className="w-[12%] px-8 text-center text-[#586D93] text-[15px]">
            {index + 1}
          </td>

          <td className="w-[28%] pl-22 md:pl-8 lg:pl-12 px-8 text-left text-[#586D93] text-[15px]">
            {item.invoice_no}
          </td>

          <td className="w-[28%] pl-22 md:pl-8 lg:pl-12 px-8 text-left text-[#586D93] text-[15px]">
            {new Date(item.date).toLocaleDateString()}
          </td>

          <td className="w-[12%] px-8 text-center text-[#586D93] text-[15px]">
            ₹{item.amount}
          </td>

          <td className="w-[20%] px-8">
            <div className="flex justify-center items-center gap-6 md:gap-4 lg:gap-5">

              <button
  onClick={() => {
    console.log(item);
    handleViewInvoice(item.payment_id);
  }}
>
  <img src={eyeIcon} alt="view" className="w-[18px] h-[18px]" />
</button>

              <button>
                <img
                  src={downloadIcon}
                  alt="download"
                  className="w-[18px] h-[18px]"
                />
              </button>

            </div>
          </td>
        </tr>
      ))}
    </tbody>

  </table>

  {/* Pagination */}
  <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
  
</div>

</div>
</div>

<CancelSubscriptionModal
  isOpen={showCancelModal}
  onClose={() => setShowCancelModal(false)}
  onSuccess={() => {
    fetchSubscription();
  }}
/>

<UpgradePlanModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
/>

<DowngradePlanModal
  isOpen={showDowngradeModal}
  onClose={() => setShowDowngradeModal(false)}
/>

{showInvoice && (
  <InvoicePopup
    onClose={() => setShowInvoice(false)}
    invoiceData={invoiceData}
  />
)}

    </div>
  );
}
function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set();

  if (currentPage <= 2) {
    pages.add(1);
    pages.add(2);
    pages.add(3);
    pages.add(totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.add(1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 1);
    pages.add(totalPages);
  } else {
    pages.add(currentPage - 1);
    pages.add(currentPage);
    pages.add(currentPage + 1);
    pages.add(totalPages);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push("ellipsis");
    }
    items.push(sorted[i]);
  }

  return items;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex justify-end items-center gap-4 md:gap-8 py-6 pr-4 md:pr-10 text-[14px] text-[#3D3D3D] border-t border-[#ECECEC]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-[#4866F6] disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed"
      >
        <img src={rightArrow} alt="" className="w-[10px]" />
        Previous
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span key={index} className="text-[#9CA3AF]">
            ....
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`cursor-pointer ${
              currentPage === item
                ? "w-[36px] h-[36px] bg-[#4866F6] text-white rounded-[4px] flex items-center justify-center"
                : "text-[#3D3D3D]"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-[#4866F6] disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed"
      >
        Next
        <img src={rightArrow} alt="" className="w-[10px] rotate-180" />
      </button>
    </div>
  );
}