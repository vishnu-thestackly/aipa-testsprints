import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sparkleIcon from "../../../assets/images/Sparkle.svg";
import cardIcon from "../../../assets/images/card.svg";
import eyeIcon from "../../../assets/images/eyes.svg";
import downloadIcon from "../../../assets/images/download.svg";
import rightArrow from "../../../assets/images/rightarrow.svg";
import nodataIcon from "../../../assets/images/nodata.png";
import CancelSubscriptionModal from "./CancelSubscriptionModal";
import UpgradePlanModal from "./UpgradePlanModal";
import DowngradePlanModal from "./DowngradePlanModal";

import { getSubscriptionDetails, getInvoice } from "../../../api/authApi";
import InvoicePopup from "../InvoicePopup";

const formatDisplayDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default function SubscriptionDetails({
  setProfilePage,
}) {
  const navigate = useNavigate()
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

  const handleDownloadInvoice = async (paymentId) => {
    try {
      const response = await getInvoice(paymentId);

      // generate pdf using response
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubscription = async () => {
    // Check localStorage first for simulated subscription data
    const saved = localStorage.getItem("mock_subscription_data");
    if (saved) {
      setSubscription(JSON.parse(saved));
      return;
    }

    try {
      const response = await getSubscriptionDetails();

      console.log("Subscription Response:", response);
      console.log("Billing History:", response.billing_history);

      if (response) {
        setSubscription(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpgradeSuccess = (plan, duration) => {
    const today = new Date();
    const endDate = new Date();
    let amount = "99.00";
    let planName = "Basic Plan";
    let planDesc = "Best plan for the fresher individuals";

    if (plan === "premium") {
      endDate.setFullYear(today.getFullYear() + 1);
      amount = "999.00";
      planName = "Premium Plan";
      planDesc = "Best plan for scaling your workflow and projects.";
    } else {
      endDate.setMonth(today.getMonth() + 1);
    }

    const todayText = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);

    const updatedSub = {
      plan_name: planName,
      plan_description: planDesc,
      billing_cycle_start: today.toISOString(),
      billing_cycle_end: endDate.toISOString(),
      next_billing_date: endDate.toISOString(),
      status: "Active",
      payment_method_brand: "Visa",
      payment_method_last4: plan === "premium" ? "8888" : "4242",
      payment_method_expires: plan === "premium" ? "12/30" : "12/29",
      last_payment_date: todayText,
      billing_history: [
        {
          invoice_no: `INV-2026-${plan === "premium" ? "999" : "099"}`,
          date: today.toISOString(),
          amount: amount,
          payment_id: `pay_${plan}_${Math.random().toString(36).substr(2, 9)}`,
        }
      ]
    };

    setSubscription(updatedSub);
    localStorage.setItem("mock_subscription_data", JSON.stringify(updatedSub));
  };

  const handleCancelSuccess = () => {
    localStorage.removeItem("mock_subscription_data");
    setSubscription(null); // resets back to free/null plan
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

  const hasPaymentMethod = Boolean(
    subscription?.payment_method_last4 ||
    subscription?.payment_method_brand ||
    subscription?.has_payment_method ||
    subscription?.payment_method
  );

  const hasBillingHistory = Boolean(
    subscription?.billing_history && subscription.billing_history.length > 0
  );

  const isFreePlan = !subscription?.plan_name || (subscription?.plan_name || "").toLowerCase().includes("free");

  return (
    <div className="px-2 sm:px-4 lg:px-7 pt-3 md:pt-5 pb-10">
      <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-3 sm:p-5 md:p-7 shadow-[0px_0px_4px_0px_#00000014]">

        {/* Header */}
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-[#4866F6] rounded-full flex items-center justify-center">
              <ArrowLeft
                onClick={() => navigate("/user/profile/plans")}
                className="w-3 h-3 md:w-4 md:h-4 text-white cursor-pointer"
                strokeWidth={2.5}
              />
            </div>

            <h2 className="text-[13px] sm:text-[15px] lg:text-[24px] font-medium text-[#3D3D3D]">
              Subscription Details
            </h2>
          </div>

          {/* Divider line */}
          <div className="w-full border-t border-[#D9D9D9] mt-3 md:mt-4"></div>
        </div>

        {/* Subscription Card */}
        <div className="mt-3 md:mt-6 rounded-[8px] md:rounded-[14px] border border-[#4866F6] bg-[#F5F7FF] p-3 md:p-5">

          {isFreePlan ? (
            <>
              {/* Top Row: Plan info on Left, Status on Right */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-[34px] h-[34px] md:w-[52px] md:h-[52px] rounded-[8px] md:rounded-[12px] bg-[#4866F6] flex items-center justify-center flex-shrink-0">
                    <img
                      src={sparkleIcon}
                      alt="sparkle"
                      className="w-[17px] h-[17px] md:w-[24px] md:h-[24px]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[12px] md:text-[20px] font-semibold text-[#3D3D3D]">
                      {subscription?.plan_name || "Free plan"}
                    </h3>

                    <p className="text-[#8D8D8D] text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                      {subscription?.plan_description || "Best plan for the fresher individuals"}
                    </p>
                  </div>
                </div>

                {/* Status on Right */}
                <div className="flex flex-col items-end">
                  <p className="text-[#3D3D3D] font-medium text-[11px] md:text-[16px] mb-1">
                    Status
                  </p>

                  <div className="flex items-center gap-1.5 md:gap-2 bg-[#36B66A] px-2.5 md:px-4 h-[18px] md:h-[28px] rounded-full w-fit">
                    <span className="w-[6px] h-[6px] md:w-[10px] md:h-[10px] bg-white rounded-full"></span>

                    <span className="text-white text-[9px] md:text-[14px] font-medium">
                      {subscription?.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Buttons */}
              <div className="flex justify-between items-center mt-5 md:mt-8 gap-3">
                <button
                  onClick={() => {
                    setSelectedPlanAction("upgrade");
                    setShowUpgradeModal(true);
                  }}
                  className="h-[30px] md:h-[42px] px-6 md:px-8 rounded-full border border-[#4866F6] bg-[#4866F6] text-white text-[10px] md:text-[14px] cursor-pointer transition-all duration-200 hover:bg-white hover:text-[#4866F6] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Upgrade
                </button>

                <button
                  onClick={() => setShowCancelModal(true)}
                  className="border border-[#FF4D4F] text-[#FF4D4F] h-[30px] md:h-[42px] rounded-full text-[10px] md:text-[14px] px-6 md:px-8 cursor-pointer transition-all duration-200 hover:bg-[#FF4D4F] hover:text-white hover:shadow-md active:scale-[0.98]"
                >
                  Cancel Subscription
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Upgraded View */}
              <div className="flex justify-between flex-wrap gap-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-[34px] h-[34px] md:w-[52px] md:h-[52px] rounded-[8px] md:rounded-[12px] bg-[#4866F6] flex items-center justify-center flex-shrink-0">
                    <img
                      src={sparkleIcon}
                      alt="sparkle"
                      className="w-[17px] h-[17px] md:w-[24px] md:h-[24px]"
                    />
                  </div>

                  <div>
                    <h3 className="text-[12px] md:text-[20px] font-semibold text-[#3D3D3D]">
                      {subscription?.plan_name || "Free plan"}
                    </h3>

                    <p className="text-[#8D8D8D] text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                      {subscription?.plan_description || "Best plan for the fresher individuals"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid: Billing Cycle, Next Date, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 mt-4 md:mt-8">
                <div>
                  <p className="text-[#3D3D3D] font-medium text-[11px] md:text-[16px]">
                    Billing Cycle
                  </p>

                  <p className="text-[#8D8D8D] text-[9px] md:text-sm mt-1 md:mt-3 whitespace-nowrap">
                    {formatDisplayDate(subscription?.billing_cycle_start)} -{" "}
                    {formatDisplayDate(subscription?.billing_cycle_end)}
                  </p>
                </div>

                <div className="md:ml-8 lg:ml-10">
                  <p className="text-[#3D3D3D] font-medium text-[11px] md:text-[16px] whitespace-nowrap">
                    Next Billing Date
                  </p>

                  <p className="text-[#8D8D8D] text-[9px] md:text-sm mt-1 md:mt-3 whitespace-nowrap">
                    {formatDisplayDate(subscription?.next_billing_date)}
                  </p>
                </div>

                <div className="flex flex-col md:items-end">
                  <p className="text-[#3D3D3D] font-medium text-[11px] md:text-[16px] mb-1 md:mb-3 md:mr-10">
                    Status
                  </p>

                  <div className="flex items-center gap-1.5 md:gap-2 bg-[#36B66A] px-2.5 md:px-4 h-[18px] md:h-[28px] rounded-full w-fit">
                    <span className="w-[6px] h-[6px] md:w-[10px] md:h-[10px] bg-white rounded-full"></span>

                    <span className="text-white text-[9px] md:text-[14px] font-medium">
                      {subscription?.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-5 md:mt-8 gap-3 md:gap-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full md:w-[220px] lg:w-[240px]">
                  <button
                    onClick={() => {
                      setSelectedPlanAction("upgrade");
                      setShowUpgradeModal(true);
                    }}
                    className="h-[30px] md:h-[42px] w-full md:w-auto md:px-8 rounded-full border border-[#4866F6] bg-[#4866F6] text-white text-[10px] md:text-[14px] cursor-pointer transition-all duration-200 hover:bg-white hover:text-[#4866F6] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Upgrade
                  </button>
                </div>

                <button
                  onClick={() => setShowCancelModal(true)}
                  className="border border-[#FF4D4F] text-[#FF4D4F] h-[30px] md:h-[42px] rounded-full text-[10px] md:text-[14px] w-full md:w-auto md:px-8 cursor-pointer transition-all duration-200 hover:bg-[#FF4D4F] hover:text-white hover:shadow-md active:scale-[0.98]"
                >
                  Cancel Subscription
                </button>
              </div>
            </>
          )}
        </div>

        {/* Payment Method */}
        <div className="mt-3 md:mt-5 rounded-[12px] md:rounded-[20px] border border-[#E5E5E5] p-3 md:p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <h3 className="text-[12px] md:text-[18px] font-medium text-[#3D3D3D]">
              Payment Method
            </h3>

            {hasPaymentMethod && (
              <button className="hidden md:flex h-[40px] w-auto px-5 rounded-full bg-[#4866F6] text-white text-[15px] lg:text-[17px] items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-200 hover:bg-[#3554ED] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">    Update Payment Method
                <span>→</span>
              </button>
            )}
          </div>

          <div className="border-t border-[#D9D9D9] mt-2 md:mt-4"></div>

          {/* Card or Empty State */}
          {hasPaymentMethod ? (
            <div className="mt-3 md:mt-5 border border-[#4866F6] rounded-[8px] md:rounded-[14px] bg-[#F5F7FF] p-3 md:px-4 md:py-3 lg:px-5 lg:py-4 flex flex-col md:grid md:grid-cols-[1fr_auto] md:items-center gap-3 md:gap-4">

              {/* Left Section */}
              <div className="flex items-start gap-3">

                <div className="flex-shrink-0 w-[34px] h-[34px] md:w-[42px] md:h-[42px] lg:w-[54px] lg:h-[54px] rounded-[8px] md:rounded-[10px] lg:rounded-[12px] bg-[#4866F6] flex items-center justify-center">
                  <img
                    src={cardIcon}
                    alt="card"
                    className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] lg:w-[24px] lg:h-[24px]"
                  />
                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-[#3D3D3D] text-[12px] md:text-[15px] lg:text-[16px] font-medium leading-[18px] break-words">
                    {subscription?.payment_method_brand || "Rupay"} card ending in
                    <br className="md:hidden" />
                    **** **** **** {subscription?.payment_method_last4 || "—"}
                  </p>

                  <p className="mt-1 text-[#A0A7B5] text-[10px] md:text-[13px] lg:text-[14px] leading-[14px]">
                    Expires in {subscription?.payment_method_expires}
                  </p>

                  <div className="mt-3 md:hidden">
                    <p className="text-[#3D3D3D] text-[11px] font-medium">
                      Last Payment Date
                    </p>

                    <p className="mt-1 text-[#A0A7B5] text-[10px]">
                      {subscription?.last_payment_date || "12 June 2026"}
                    </p>
                  </div>

                </div>

              </div>

              {/* Desktop Right Section */}
              <div className="hidden md:block text-right">
                <p className="text-[#3D3D3D] text-[15px] font-medium">
                  Last Payment Date
                </p>

                <p className="mt-1 text-[#A0A7B5] text-[13px]">
                  {subscription?.last_payment_date || "12 June 2026"}
                </p>
              </div>

            </div>
          ) : (
            <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center">
              <img
                src={nodataIcon}
                alt="No Data"
                className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] object-contain"
              />
              <p className="mt-3 md:mt-4 text-[#8D8D8D] text-[13px] md:text-[16px] font-medium">
                No Payment method found!
              </p>
            </div>
          )}

        </div>

        {/* Billing History */}
        <div className="mt-3 md:mt-5 rounded-[12px] md:rounded-[20px] border border-[#E5E5E5] p-3 md:p-6">

          {/* Header */}
          <h3 className="text-[12px] md:text-[18px] font-medium text-[#3D3D3D]">
            Billing History
          </h3>

          <div className="border-t border-[#D9D9D9] mt-2 md:mt-4"></div>

          {/* Table Container or Empty State */}
          {hasBillingHistory ? (
            <div className="mt-3 md:mt-5 overflow-x-auto border border-[#D9D9D9] rounded-[8px] md:rounded-[16px]">
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
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>

                      <td className="w-[28%] pl-22 md:pl-8 lg:pl-12 px-8 text-left text-[#586D93] text-[15px]">
                        {item.invoice_no}
                      </td>

                      <td className="w-[28%] pl-22 md:pl-8 lg:pl-12 px-8 text-left text-[#586D93] text-[15px]">
                        {formatDisplayDate(item.date)}
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
                            className="rounded-full p-1 transition-all duration-200 hover:bg-[#E9EDFF] hover:scale-110 active:scale-95"
                          >
                            <img src={eyeIcon} alt="view" className="w-[18px] h-[18px]" />
                          </button>

                          <button className="rounded-full p-1 transition-all duration-200 hover:bg-[#E9EDFF] hover:scale-110 active:scale-95" onClick={() => handleDownloadInvoice(item.payment_id)}>
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
          ) : (
            <div className="py-8 md:py-12 flex flex-col items-center justify-center text-center">
              <img
                src={nodataIcon}
                alt="No Data"
                className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] object-contain"
              />
              <p className="mt-3 md:mt-4 text-[#8D8D8D] text-[13px] md:text-[16px] font-medium">
                No Billing History found!
              </p>
            </div>
          )}
        </div>

      </div>

      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onSuccess={handleCancelSuccess}
      />

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        subscription={subscription}
        onSuccess={handleUpgradeSuccess}
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
        className="flex items-center gap-2 rounded-md px-2 py-1 text-[#4866F6] transition-colors hover:bg-[#E9EDFF] disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
            className={`cursor-pointer transition-all duration-200 hover:bg-[#E9EDFF] hover:text-[#4866F6] ${currentPage === item
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
        className="flex items-center gap-2 rounded-md px-2 py-1 text-[#4866F6] transition-colors hover:bg-[#E9EDFF] disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        Next
        <img src={rightArrow} alt="" className="w-[10px] rotate-180" />
      </button>
    </div>
  );
}
