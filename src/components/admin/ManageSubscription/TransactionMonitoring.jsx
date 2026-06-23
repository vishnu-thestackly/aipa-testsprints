import React, { useState } from "react";
import { Search, Download, Eye, IndianRupee, Users, CreditCard, RefreshCw } from "lucide-react";
// import bubbleSvg from "../../assets/images/Combined Shape.svg";
import TransactionRevenueChart from "../../charts/TransactionRevenueChart";
import TransactionRevenuePlanChart from "../../charts/TransactionRevenuePlanChart";



export default function TransactionMonitoring() {
 const rows = [
  { id: 1, name: "Mahizhan N R", tx: "TR9876543210", date: "20 Mar 2026", amount: "₹999", status: "Success", plan: "Premium" },
  { id: 2, name: "Bharani Dharan K D", tx: "TR9876543211", date: "21 Mar 2026", amount: "₹99", status: "Pending", plan: "Basic" },
  { id: 3, name: "Amuthan S", tx: "TR9876543212", date: "22 Mar 2026", amount: "₹99", status: "Success", plan: "Basic" },
  { id: 4, name: "Akilan S", tx: "TR9876543213", date: "23 Mar 2026", amount: "₹999", status: "Pending", plan: "Premium" },
  { id: 5, name: "Raghu L", tx: "TR9876543214", date: "24 Mar 2026", amount: "₹999", status: "Failed", plan: "Premium" },
  { id: 6, name: "Prasanth S", tx: "TR9876543215", date: "25 Mar 2026", amount: "₹99", status: "Failed", plan: "Basic" },
  { id: 7, name: "Mahizhan N R", tx: "TR9876543210", date: "20 Mar 2026", amount: "₹999", status: "Success", plan: "Premium" },
  { id: 8, name: "Bharani Dharan K D", tx: "TR9876543211", date: "21 Mar 2026", amount: "₹99", status: "Pending", plan: "Basic" },
  { id: 9, name: "Amuthan S", tx: "TR9876543212", date: "22 Mar 2026", amount: "₹99", status: "Success", plan: "Basic" },
  { id: 10, name: "Akilan S", tx: "TR9876543213", date: "23 Mar 2026", amount: "₹999", status: "Pending", plan: "Premium" },
  { id: 11, name: "Raghu L", tx: "TR9876543214", date: "24 Mar 2026", amount: "₹999", status: "Failed", plan: "Premium" },
  { id: 12, name: "Prasanth S", tx: "TR9876543215", date: "25 Mar 2026", amount: "₹99", status: "Failed", plan: "Basic" },
  { id: 13, name: "Raghu L", tx: "TR9876543214", date: "24 Mar 2026", amount: "₹999", status: "Failed", plan: "Premium" },
  { id: 14, name: "Prasanth S", tx: "TR9876543215", date: "25 Mar 2026", amount: "₹99", status: "Failed", plan: "Basic" },
  { id: 15, name: "Raghu L", tx: "TR9876543214", date: "24 Mar 2026", amount: "₹999", status: "Failed", plan: "Premium" },
  { id: 16, name: "Prasanth S", tx: "TR9876543215", date: "25 Mar 2026", amount: "₹99", status: "Failed", plan: "Basic" },
  { id: 17, name: "Raghu L", tx: "TR9876543214", date: "24 Mar 2026", amount: "₹999", status: "Failed", plan: "Premium" },
  { id: 18, name: "Prasanth S", tx: "TR9876543215", date: "25 Mar 2026", amount: "₹99", status: "Failed", plan: "Basic" },

];


  const kpi = [
{ icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM10.5 9C11.325 9 12 9.675 12 10.5C12 11.325 11.34 12 10.5 12C9.675 12 9 11.325 9 10.5C9 9.675 9.675 9 10.5 9ZM11.295 20.295C11.07 20.52 10.785 20.625 10.5 20.625C10.215 20.625 9.93 20.52 9.705 20.295C9.27 19.86 9.27 19.14 9.705 18.705L18.705 9.705C19.14 9.27 19.86 9.27 20.295 9.705C20.73 10.14 20.73 10.86 20.295 11.295L11.295 20.295ZM19.5 21C18.66 21 17.985 20.325 17.985 19.5C17.985 18.675 18.66 18 19.485 18C20.31 18 20.985 18.675 20.985 19.5C20.985 20.325 20.325 21 19.5 21Z" fill="#4866F6"/></svg>), value: "₹12405.00", label: "Total Sales" },
{ icon: (<svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.6367 16.5C21.2267 16.5 19.9217 16.995 18.8867 17.82C17.5067 18.915 16.6367 20.61 16.6367 22.5C16.6367 23.625 16.9517 24.69 17.5067 25.59C18.5417 27.33 20.4467 28.5 22.6367 28.5C24.1517 28.5 25.5317 27.945 26.5817 27C27.0467 26.61 27.4517 26.13 27.7667 25.59C28.3217 24.69 28.6367 23.625 28.6367 22.5C28.6367 19.185 25.9517 16.5 22.6367 16.5ZM25.7417 21.855L22.5467 24.81C22.3367 25.005 22.0517 25.11 21.7817 25.11C21.4967 25.11 21.2117 25.005 20.9867 24.78L19.5017 23.295C19.0667 22.86 19.0667 22.14 19.5017 21.705C19.9367 21.27 20.6567 21.27 21.0917 21.705L21.8117 22.425L24.2117 20.205C24.6617 19.785 25.3817 19.815 25.8017 20.265C26.2217 20.715 26.1917 21.42 25.7417 21.855Z" fill="#4866F6"/><path d="M27.27 29.25C27.27 29.67 26.94 30 26.52 30H0.75C0.33 30 0 29.67 0 29.25C0 23.04 6.12 18 13.635 18C15.18 18 16.68 18.21 18.06 18.615C17.175 19.665 16.635 21.03 16.635 22.5C16.635 23.625 16.95 24.69 17.505 25.59C17.805 26.1 18.195 26.565 18.645 26.955C19.695 27.915 21.09 28.5 22.635 28.5C24.315 28.5 25.83 27.81 26.91 26.7C27.15 27.51 27.27 28.365 27.27 29.25Z" fill="#4866F6"/><path d="M13.6367 15C17.7788 15 21.1367 11.6421 21.1367 7.5C21.1367 3.35787 17.7788 0 13.6367 0C9.49459 0 6.13672 3.35787 6.13672 7.5C6.13672 11.6421 9.49459 15 13.6367 15Z" fill="#4866F6"/></svg>), value: "524", label: "Active Subscription" },
{ icon: (<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.75 0C21.8572 0 19.5 2.35725 19.5 5.25C19.5 8.14275 21.8572 10.5 24.75 10.5C27.6427 10.5 30 8.14275 30 5.25C30 2.35725 27.6427 0 24.75 0ZM26.514 6.4575C26.6662 6.60975 26.6662 6.86175 26.514 7.014C26.4352 7.09275 26.3355 7.1295 26.2357 7.1295C26.136 7.1295 26.0362 7.09275 25.9575 7.014L24.75 5.8065L23.5425 7.014C23.4637 7.09275 23.364 7.1295 23.2642 7.1295C23.1645 7.1295 23.0647 7.09275 22.986 7.014C22.8338 6.86175 22.8338 6.60975 22.986 6.4575L24.1935 5.25L22.986 4.0425C22.8338 3.89025 22.8338 3.63825 22.986 3.486C23.1383 3.33375 23.3902 3.33375 23.5425 3.486L24.75 4.6935L25.9575 3.486C26.1097 3.33375 26.3617 3.33375 26.514 3.486C26.6662 3.63825 26.6662 3.89025 26.514 4.0425L25.3065 5.25L26.514 6.4575Z" fill="#4866F6"/><path d="M0 14.565V22.065C0 25.5 2.775 28.275 6.21 28.275H23.775C27.21 28.275 30 25.485 30 22.05V14.565C30 13.56 29.19 12.75 28.185 12.75H1.815C0.81 12.75 0 13.56 0 14.565ZM9 23.25H6C5.385 23.25 4.875 22.74 4.875 22.125C4.875 21.51 5.385 21 6 21H9C9.615 21 10.125 21.51 10.125 22.125C10.125 22.74 9.615 23.25 9 23.25ZM18.75 23.25H12.75C12.135 23.25 11.625 22.74 11.625 22.125C11.625 21.51 12.135 21 12.75 21H18.75C19.365 21 19.875 21.51 19.875 22.125C19.875 22.74 19.365 23.25 18.75 23.25Z" fill="#4866F6"/><path d="M17.25 4.29059V8.68559C17.25 9.69059 16.44 10.5006 15.435 10.5006H1.815C0.795 10.5006 0 9.66059 0 8.65559C0.015 6.96059 0.69 5.41559 1.815 4.29059C2.94 3.16559 4.5 2.47559 6.21 2.47559H15.435C16.44 2.47559 17.25 3.28559 17.25 4.29059Z" fill="#4866F6"/></svg>), value: "22", label: "Failed Payments" },
{ icon: (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.285 0H8.715C3.255 0 0 3.255 0 8.715V21.27C0 26.745 3.255 30 8.715 30H21.27C26.73 30 29.985 26.745 29.985 21.285V8.715C30 3.255 26.745 0 21.285 0ZM15 24.015C10.245 24.015 6.375 20.145 6.375 15.39C6.375 13.68 6.87 12.015 7.83 10.605C8.175 10.08 8.88 9.945 9.39 10.29C9.9 10.635 10.05 11.34 9.69 11.85C9 12.9 8.625 14.13 8.625 15.39C8.625 18.9 11.49 21.765 15 21.765C18.51 21.765 21.375 18.9 21.375 15.39C21.375 11.88 18.51 9.015 15 9.015C14.715 9.015 14.445 9.045 14.16 9.075L15 9.69C15.495 10.05 15.615 10.755 15.24 11.265C15.015 11.565 14.67 11.73 14.325 11.73C14.1 11.73 13.86 11.655 13.665 11.52L10.755 9.375C10.755 9.375 10.74 9.36 10.725 9.345C10.71 9.33 10.695 9.33 10.68 9.315C10.635 9.285 10.62 9.225 10.575 9.18C10.53 9.12 10.485 9.075 10.44 9C10.41 8.94 10.395 8.865 10.365 8.805C10.35 8.73 10.32 8.67 10.32 8.595C10.32 8.52 10.32 8.46 10.335 8.385C10.335 8.31 10.335 8.25 10.365 8.175C10.365 8.1 10.41 8.04 10.44 7.965C10.47 7.92 10.47 7.86 10.515 7.8C10.53 7.8 10.545 7.785 10.56 7.77C10.575 7.755 10.575 7.74 10.59 7.725L13.095 4.86C13.5 4.395 14.22 4.335 14.685 4.755C15.15 5.16 15.195 5.88 14.79 6.345L14.37 6.825C14.58 6.81 14.79 6.78 15.015 6.78C19.77 6.78 23.64 10.65 23.64 15.405C23.64 20.16 19.755 24.015 15 24.015Z" fill="#4866F6"/></svg>), value: "₹124.00", label: "Refunds" },
{ icon: (<svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 0H9C4.5 0 1.5 2.25 1.5 7.5V12.84C1.5 13.395 2.07 13.74 2.565 13.515C4.035 12.84 5.73 12.585 7.515 12.9C11.46 13.605 14.355 17.265 14.25 21.27C14.235 21.9 14.145 22.515 13.98 23.115C13.86 23.58 14.235 24.015 14.715 24.015H24C28.5 24.015 31.5 21.765 31.5 16.515V7.5C31.5 2.25 28.5 0 24 0ZM16.5 15.75C14.43 15.75 12.75 14.07 12.75 12C12.75 9.93 14.43 8.25 16.5 8.25C18.57 8.25 20.25 9.93 20.25 12C20.25 14.07 18.57 15.75 16.5 15.75ZM27.375 15C27.375 15.615 26.865 16.125 26.25 16.125C25.635 16.125 25.125 15.615 25.125 15V9C25.125 8.385 25.635 7.875 26.25 7.875C26.865 7.875 27.375 8.385 27.375 9V15Z" fill="#4866F6"/><path d="M6 15C4.125 15 2.43 15.885 1.335 17.235C0.495 18.27 0 19.575 0 21C0 24.315 2.7 27 6 27C8.61 27 10.845 25.335 11.655 22.995C11.88 22.38 12 21.705 12 21C12 17.7 9.315 15 6 15ZM9.54 23.61C9.51 23.7 9.45 23.79 9.39 23.85L8.31 24.915C8.175 25.065 7.995 25.125 7.8 25.125C7.605 25.125 7.41 25.065 7.275 24.915C7.035 24.69 7.005 24.33 7.155 24.06H4.14C3.18 24.06 2.4 23.28 2.4 22.305V22.155C2.4 21.735 2.73 21.42 3.135 21.42C3.54 21.42 3.87 21.735 3.87 22.155V22.305C3.87 22.47 3.99 22.605 4.155 22.605H7.17C7.02 22.32 7.05 21.975 7.29 21.735C7.575 21.45 8.04 21.45 8.31 21.735L9.39 22.815C9.45 22.875 9.51 22.965 9.555 23.055C9.615 23.22 9.615 23.43 9.54 23.61ZM9.6 19.845C9.6 20.265 9.27 20.58 8.865 20.58C8.46 20.58 8.13 20.265 8.13 19.845V19.695C8.13 19.53 8.01 19.395 7.845 19.395H4.845C4.995 19.68 4.965 20.025 4.725 20.265C4.59 20.4 4.41 20.475 4.2 20.475C4.02 20.475 3.825 20.4 3.69 20.265L2.61 19.185C2.55 19.125 2.49 19.035 2.445 18.945C2.385 18.765 2.385 18.57 2.445 18.39C2.49 18.315 2.535 18.21 2.61 18.15L3.69 17.085C3.975 16.785 4.44 16.785 4.71 17.085C4.95 17.31 4.98 17.67 4.83 17.94H7.845C8.805 17.94 9.585 18.72 9.585 19.695V19.845H9.6Z" fill="#4866F6"/></svg>), value: "13", label: "Pending Transactions" },
  ];

  const revenueData = [
  { month: "Jan", subscription: 2, revenue: 3, failed: 55 },
  { month: "Feb", subscription: 20, revenue: 95, failed: 85 },
  { month: "Mar", subscription: 12, revenue: 15, failed: 88 },
  { month: "Apr", subscription: 93, revenue: 40, failed: 86 },
  { month: "May", subscription: 64, revenue: 60, failed: 70 },
  { month: "Jun", subscription: 72, revenue: 40, failed: 84 },
  { month: "Jul", subscription: 46, revenue: 82, failed: 86 },
  { month: "Aug", subscription: 72, revenue: 30, failed: 60 },
  { month: "Sep", subscription: 58, revenue: 68, failed: 58 },
  { month: "Oct", subscription: 73, revenue: 49, failed: 42 },
  { month: "Nov", subscription: 89, revenue: 79, failed: 15 },
  { month: "Dec", subscription: 92, revenue: 95, failed: 13 },
];

const [isMinimized, setIsMinimized] = useState(false);
const [isPieMinimized, setIsPieMinimized] = useState(false);
const planData = [ { name: "Basic Plan", value: 45 },
  { name: "Premium Plan", value: 55 }];
const [openModal, setOpenModal] = useState(false);
const PAGE_SIZE = 6;
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(rows.length / PAGE_SIZE);

const start = (currentPage - 1) * PAGE_SIZE;

const paginatedRows = rows.slice(
  start,
  start + PAGE_SIZE
);
const [statusOpen, setStatusOpen] = useState(false);
const [subscriptionOpen, setSubscriptionOpen] = useState(false);

const [selectedStatus, setSelectedStatus] = useState(["Success"]);
const [selectedSubscription, setSelectedSubscription] = useState(["Basic"]);

const toggleStatus = (value) => {
  setSelectedStatus((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
  );
};

const toggleSubscription = (value) => {
  setSelectedSubscription((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
  );
};
  return (
    <>
    <div className="h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 bg-white rounded-[25px] shadow-[0px_1px_4px_0px_#00000040]">

<div className="mx-4 md:mx-5 lg:mx-7 mt-6 mb-6 rounded-[20px] border border-[#E2E2E2] bg-white p-5">
  <h3 className="text-[18px] font-medium text-[#3D3D3D]">
    Transaction KPI's
  </h3>

  <div className="mt-4 border-b border-[#CFCFCF]" />

  {/* KPI Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
    {kpi.map((item, i) => (
      <div
        key={i}
        className="h-[95px] border border-[#E2E2E2] rounded-[16px] px-4 flex items-center gap-3"
      >
        <div className="w-[50px] h-[50px] lg:w-[42px] lg:h-[42px] xl:w-[50px] xl:h-[50px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">
  <div className="scale-100 lg:scale-90 xl:scale-100">
    {item.icon}
  </div>
</div>

        <div className="min-w-0">
        <h4 className="text-[16px] lg:text-[15px] xl:text-[20px] font-semibold text-[#3D3D3D] leading-none">
  {item.value}
</h4>

<p className="text-[15px] lg:text-[13px] xl:text-[15px] text-[#586D93] mt-1">
  {item.label}
</p>
        </div>
      </div>
    ))}
  </div>
</div>


<div className="mx-4 md:mx-5 lg:mx-7 mt-2">
  <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-4">
    Transactions
  </h3>

<div
  className="
    flex flex-col
md:flex-row md:flex-nowrap md:items-center    lg:grid lg:grid-cols-2
    xl:flex xl:flex-row xl:flex-nowrap
    gap-3
  "
>
{/* Search */}
<div className="relative w-full md:w-[240px] lg:w-full xl:flex-1">
            <input
      type="text"
      placeholder="Search by Name"
      className="w-full h-[34px] border border-[#D9D9D9] rounded-[10px] pl-4 pr-12 text-[14px] text-[#586D93] placeholder:text-[#8D99AE] focus:outline-none"
    />

    <Search
  size={22}
  strokeWidth={1.8}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D99AE] cursor-pointer"
/>
  </div>

  {/* Status */}
{/* Status */}
{/* Status */}
<div className="relative w-full md:w-[180px] lg:w-full xl:w-[180px]">
  <button
  onClick={() => setStatusOpen(!statusOpen)}
  className="w-full h-[34px] border border-[#D9D9D9] rounded-[10px] px-4 flex items-center justify-between bg-white text-[14px] text-[#8D99AE] cursor-pointer"
>
  <span>Status filter</span>


    <svg
      className={`transition-transform duration-200 ${
        statusOpen ? "rotate-180" : ""
      }`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#8D99AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  {statusOpen && (
    <div className="absolute top-[42px] left-0 z-50 w-full bg-white border border-[#E2E2E2] rounded-[16px] shadow-lg py-3">
      {["Success", "Pending", "Rejected"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-4 px-5 py-3 cursor-pointer"
        >
          <div
            onClick={() => toggleStatus(item)}
            className={`w-7 h-7 rounded-[8px] border-2 flex items-center justify-center ${
              selectedStatus.includes(item)
                ? "bg-[#4866F6] border-[#4866F6]"
                : "border-[#4866F6]"
            }`}
          >
            {selectedStatus.includes(item) && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <span className="text-[16px] text-[#4A5568]">{item}</span>
        </label>
      ))}
    </div>
  )}
</div>

<div className="relative w-full md:w-[240px] lg:w-full xl:w-[220px]">
  <button
    onClick={() => setSubscriptionOpen(!subscriptionOpen)}
className="w-full h-[34px] border border-[#D9D9D9] rounded-[10px] px-4 flex items-center justify-between bg-white text-[14px] text-[#8D99AE] cursor-pointer"  >
    <span>Subscription filter</span>

    <svg
      className={`transition-transform duration-200 ${
        subscriptionOpen ? "rotate-180" : ""
      }`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#8D99AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  {subscriptionOpen && (
    <div className="absolute top-[42px] left-0 z-50 w-full bg-white border border-[#E2E2E2] rounded-[16px] shadow-lg py-3">
      {["Basic", "Premium"].map((item) => (
        <label
          key={item}
          className="flex items-center gap-4 px-5 py-3 cursor-pointer"
        >
          <div
            onClick={() => toggleSubscription(item)}
            className={`w-7 h-7 rounded-[8px] border-2 flex items-center justify-center ${
              selectedSubscription.includes(item)
                ? "bg-[#4866F6] border-[#4866F6]"
                : "border-[#4866F6]"
            }`}
          >
            {selectedSubscription.includes(item) && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          <span className="text-[16px] text-[#4A5568]">{item}</span>
        </label>
      ))}
    </div>
  )}
</div>

  {/* Export */}
<button className="w-full md:w-[100px] lg:w-full xl:w-[130px] h-[34px] whitespace-nowrap bg-[#4866F6] rounded-[8px] text-white text-[14px] font-medium flex items-center justify-center gap-2 cursor-pointer">
  Export

    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.4405 8.90039C20.0405 9.21039 21.5105 11.0604 21.5105 15.1104V15.2404C21.5105 19.7104 19.7205 21.5004 15.2505 21.5004H8.74047C4.27047 21.5004 2.48047 19.7104 2.48047 15.2404V15.1104C2.48047 11.0904 3.93047 9.24039 7.47047 8.91039"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M12 15.0001V3.62012"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M15.3504 5.85L12.0004 2.5L8.65039 5.85"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  </button>

</div>
  <div className="mt-5 border-b border-[#D9D9D9]" />
</div>

<div className="mx-4 md:mx-5 lg:mx-7 mt-5 mb-8 border border-[#D9D9D9] rounded-[12px] overflow-hidden bg-white"><div className="overflow-x-auto custom-scrollbar">
<table className="w-full min-w-[1100px] table-fixed">
        <thead className="bg-[#F5F7FF] border-b-[2px] border-[#1695F9]">
       <tr>
  <th className="w-[80px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">SL No</th>

  <th className="w-[180px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">User Name</th>

  <th className="w-[180px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">Transaction ID</th>

  <th className="w-[140px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">Date</th>

  <th className="w-[120px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">Amount</th>

  <th className="w-[140px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">Status</th>

  <th className="w-[140px] h-[62px] px-5 text-left text-[14px] font-medium text-[#3D3D3D]">Subscription</th>

  <th className="w-[100px] h-[62px] px-5 text-center text-[14px] font-medium text-[#3D3D3D]">Action</th>
</tr>
      </thead>

      <tbody>
        {paginatedRows.map((r) => (
          <tr key={r.id} className="border-b border-[#E5E5E5]">
            <td className="h-[52px] px-5 text-[14px] text-[#5A6B95]">{r.id}</td>

            <td className="h-[52px] px-5 text-[14px] text-[#5A6B95]">{r.name}</td>

            <td className="h-[52px] px-5 text-[14px] text-[#5A6B95]">{r.tx}</td>

            <td className="h-[52px] px-5 text-[14px] text-[#5A6B95]">{r.date}</td>

            <td className="h-[52px] px-5 text-[14px] text-[#5A6B95]">{r.amount}</td>

            <td className="h-[52px] px-5">
              <span
  className={`inline-flex items-center justify-center gap-2 w-[120px] h-[28px] rounded-full text-[14px] font-medium ${
    r.status === "Success"
      ? "bg-[#EAF8EE] text-[#27AE60]"
      : r.status === "Pending"
      ? "bg-[#FFF4E5] text-[#F39C12]"
      : "bg-[#FFE5E5] text-[#FF3B30]"
  }`}
>
  <span
    className={`w-[8px] h-[8px] rounded-full ${
      r.status === "Success"
        ? "bg-[#27AE60]"
        : r.status === "Pending"
        ? "bg-[#F39C12]"
        : "bg-[#FF3B30]"
    }`}
  />
  {r.status}
</span>
            </td>

            <td className="h-[52px] px-5">
              <span className="inline-flex items-center justify-center min-w-[105px] h-[28px] rounded-[6px] bg-[#EEF0FF] text-[#4866F6] text-[14px] font-medium">
                {r.plan}
              </span>
            </td>

            <td className="h-[52px] px-5">
<div className="flex justify-center cursor-pointer" onClick={() => setOpenModal(true)}>
              {/* <td className="p-3"> */}
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1258_1699)"><mask id="mask0_1258_1699" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><path d="M24 0H0V24H24V0Z" fill="white"/></mask><g mask="url(#mask0_1258_1699)"><path d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z" fill="#4866F6"/><path d="M12.0004 9.14062C10.4304 9.14062 9.15039 10.4206 9.15039 12.0006C9.15039 13.5706 10.4304 14.8506 12.0004 14.8506C13.5704 14.8506 14.8604 13.5706 14.8604 12.0006C14.8604 10.4306 13.5704 9.14062 12.0004 9.14062Z" fill="#4866F6"/></g></g><defs><clipPath id="clip0_1258_1699"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
{/* </td> */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
</div>
</div>

{/* outer border */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

  <div
    className={`overflow-hidden transition-all duration-300 ${
      isMinimized ? "h-[80px]" : "h-[450px]"
    }`}
  >
    <TransactionRevenueChart
      revenueData={revenueData}
      isMinimized={isMinimized}
      setIsMinimized={setIsMinimized}
    />
  </div>

  <div
    className={`overflow-hidden transition-all duration-300 ${
      isPieMinimized ? "h-[80px]" : "h-[450px]"
    }`}
  >
    <TransactionRevenuePlanChart
      planData={planData}
      isPieMinimized={isPieMinimized}
      setIsPieMinimized={setIsPieMinimized}
    />
  </div>

</div>
  </div>
      

    

      {openModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-4">
    
<div className="w-full max-w-[820px] bg-white rounded-[28px] border-2 border-[#1695F9] p-4 sm:p-6 relative">    
    <button
  onClick={() => setOpenModal(false)}
  className="absolute top-5 right-5 w-[24px] h-[24px] rounded-full bg-[#EF4444] text-white flex items-center justify-center cursor-pointer"
>
  ×
</button>

      <h2 className="text-center text-[20px] min-[321px]:text-[22px] font-semibold text-[#4866F6]">
  Transaction Details
</h2>

      <p className="text-center text-[16px] text-[#8B97AC] mt-4">
        View complete information about your transaction.
      </p>

      <div className="border-b border-[#D9D9D9] mt-5 mb-5"></div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-[15px]">
            <div>
          <span className="font-medium text-[#3D3D3D]">Transaction ID:</span>
          <span className="ml-1 text-[#8B97AC]">TR9876543210</span>
        </div>

<div className="text-left sm:text-right">
              <span className="font-medium text-[#3D3D3D]">Date:</span>
          <span className="ml-1 text-[#8B97AC]">20 Mar 2026</span>
        </div>

        <div>
          <span className="font-medium text-[#3D3D3D]">User Name:</span>
          <span className="ml-1 text-[#8B97AC]">Mahizhan N R</span>
        </div>

<div className="text-left sm:text-right">
              <span className="font-medium text-[#3D3D3D]">Payment Method:</span>
          <span className="ml-1 text-[#8B97AC]">Debit Card</span>
        </div>
      </div>

<div className="mt-6 border border-[#4866F6] bg-[#EEF2FF] rounded-[16px] p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-[10px] sm:rounded-[12px] bg-[#4866F6] flex items-center justify-center flex-shrink-0">
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#premiumIcon)">
      <path d="M7.90007 16.0997L2.73539 14.1966C2.59298 14.144 2.4701 14.0491 2.38332 13.9245C2.29653 13.8 2.25 13.6518 2.25 13.5C2.25 13.3482 2.29653 13.2001 2.38332 13.0755C2.4701 12.951 2.59298 12.856 2.73539 12.8034L7.90007 10.9003L9.8032 5.73563C9.85577 5.59322 9.95072 5.47035 10.0753 5.38356C10.1998 5.29677 10.348 5.25024 10.4998 5.25024C10.6516 5.25024 10.7997 5.29677 10.9243 5.38356C11.0488 5.47035 11.1438 5.59322 11.1963 5.73563L13.0994 10.9003L18.2641 12.8034C18.4065 12.856 18.5294 12.951 18.6162 13.0755C18.703 13.2001 18.7495 13.3482 18.7495 13.5C18.7495 13.6518 18.703 13.8 18.6162 13.9245C18.5294 14.0491 18.4065 14.144 18.2641 14.1966L13.0994 16.0997L11.1963 21.2644C11.1438 21.4068 11.0488 21.5297 10.9243 21.6165C10.7997 21.7032 10.6516 21.7498 10.4998 21.7498C10.348 21.7498 10.1998 21.7032 10.0753 21.6165C9.95072 21.5297 9.85577 21.4068 9.8032 21.2644L7.90007 16.0997Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.5 1.5V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 6.75V9.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.25 3.75H18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.5 8.25H22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="premiumIcon">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</div>

          <div className="flex-1 min-w-0">
    <h4 className="font-semibold text-[14px] sm:text-[16px] text-[#3D3D3D]">
      Premium plan
    </h4>

    <p className="text-[#9AA4B8] text-[12px] sm:text-[14px] break-words">
      Best plan for the fresher individuals
    </p>
  </div>
        </div>

        <div className="text-left md:text-right">
  <p className="text-[16px] font-medium text-[#3D3D3D]">
    Amount
  </p>

  <p className="text-[14px] font-semibold text-[#8B97AC]">
    ₹999
  </p>
</div>
      </div>

      <div className="border-b border-[#D9D9D9] mt-5 mb-5"></div>

<div className="flex items-end justify-between">
  {/* Left */}
  <div className="flex-1">
    <p className="font-medium text-[#3D3D3D] text-[14px] mb-3 whitespace-nowrap">
  Gateway Response
</p>

    <span className="inline-flex items-center justify-center w-[105px] h-[33px] rounded-full bg-[#2FB55D] text-white text-[15px] cursor-pointer">
  Success
</span>
  </div>

  {/* Right */}
  <div className="flex-1 flex flex-col items-end">
    <p className="font-medium text-[#3D3D3D] text-[14px] mb-3">
      Invoice
    </p>

    <button className="w-[135px] h-[35px] bg-[#4866F6] rounded-[8px] flex items-center justify-center gap-2 text-white text-[14px] font-medium cursor-pointer">
  Download
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.4405 8.90039C20.0405 9.21039 21.5105 11.0604 21.5105 15.1104V15.2404C21.5105 19.7104 19.7205 21.5004 15.2505 21.5004H8.74047C4.27047 21.5004 2.48047 19.7104 2.48047 15.2404V15.1104C2.48047 11.0904 3.93047 9.24039 7.47047 8.91039" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15.0001V3.62012" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.3504 5.85L12.0004 2.5L8.65039 5.85" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>
        </div>
      </div>
    </div>
    </div>
)}

  </>
);
}


// pagination

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
    <div className="flex justify-end items-center gap-4 md:gap-8 py-6 pr-4 md:pr-10 text-[14px] text-[#3D3D3D]">
  <button
  onClick={() => onPageChange(currentPage - 1)}
  disabled={currentPage === 1}
  className="flex items-center gap-2 text-[#4866F6] disabled:text-gray-300 cursor-pointer disabled:cursor-not-allowed"
>
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
      <path
        d="M3.667 0V3.182L7 0V7L3.667 3.818V7L0 3.5L3.667 0Z"
        fill="currentColor"
      />
    </svg>
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
    ? "w-[36px] h-[36px] bg-[#4866F6] text-white flex items-center justify-center"
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
    <svg
      className="rotate-180"
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
    >
      <path
        d="M3.667 0V3.182L7 0V7L3.667 3.818V7L0 3.5L3.667 0Z"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
  );
}