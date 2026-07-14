import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  FileSearch,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  RefreshCw
} from "lucide-react";

import {
  getIntentAnalysis,
  getEntityExtraction,
  getValidationConfidence,
  getFallbackError,
} from "../../api/authApi";

export default function AIMonitoring() {
  const [activeTab, setActiveTab] = useState("intent");
  const [loading, setLoading] = useState(false);

  const [intentData, setIntentData] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [validationData, setValidationData] = useState(null);
  const [fallbackData, setFallbackData] = useState(null);

  const tabs = [
    {
      id: "intent",
      label: "Intent Analysis",
    },
    {
      id: "entity",
      label: "Entity Extraction Monitor",
    },
    {
      id: "validation",
      label: "Validation & Confidence",
    },
    {
      id: "fallback",
      label: "Fallback & Error",
    },
  ];
const [selectedDate, setSelectedDate] = useState("");
const dateRef = useRef(null);
  const cardClass =
    "bg-white border border-[#E2E2E2] rounded-[18px] p-4";

  const progressBar = (value, red = false) => (
  <div>
    <div className="w-full h-[10px] bg-[#D9DCE5] rounded-full mt-2">
      <div
        className={`h-full rounded-full ${
          red ? "bg-[#FF3B30]" : "bg-[#4866F6]"
        }`}
        style={{ width: `${value}%` }}
      />
    </div>

    <div
      className="relative mt-1 h-[20px]"
    >
      <span
        className="absolute text-[12px] text-[#3D3D3D] -translate-x-1/2"
        style={{ left: `${value}%` }}
      >
        {value}%
      </span>
    </div>
  </div>
);

  

  const statCard = (Icon, value, title) => (
    <div className={cardClass}>
      <div className="flex items-center gap-3">
        <div className="w-[55px] h-[55px] rounded-full bg-[#E6EBFF] flex items-center justify-center">
          <Icon size={24} className="text-[#4866F6]" />
        </div>

        <div>
          <h3 className="text-[22px] font-semibold text-[#3D3D3D]">
            {value}
          </h3>

          <p className="text-[14px] text-[#586D93]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );

  const fetchMonitoringData = async () => {
  try {
    setLoading(true);

    let response;

    switch (activeTab) {
      case "intent":
        response = await getIntentAnalysis(selectedDate);
        setIntentData(response);
        break;

      case "entity":
        response = await getEntityExtraction(selectedDate);
        setEntityData(response);
        break;

      case "validation":
        response = await getValidationConfidence(selectedDate);
        setValidationData(response);
        break;

      case "fallback":
        response = await getFallbackError(selectedDate);
        setFallbackData(response);
        break;

      default:
        break;
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMonitoringData();
}, [activeTab, selectedDate]);



  return (
    <div className='h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide'>
      <div className='w-full flex  flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040] '>
       {/* <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]"> */}
              {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"> */}
        {/* Header */}

<div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
              <h2 className="text-[18px] font-medium text-[#3D3D3D]">
            AI Monitoring
          </h2>
        </div>
{/* </div> */}
{/* </div> */}
        {/* Tabs */}

<div className="px-4 md:px-5 lg:px-7">
  <div className="w-full border border-[#D9D9D9] rounded-full bg-white p-1.5 overflow-hidden">

    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max xl:grid xl:grid-cols-4 xl:min-w-0 gap-2">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-[44px] min-w-[200px] xl:min-w-0 px-6 xl:px-0 whitespace-nowrap rounded-full text-[14px] font-medium transition-all duration-200 xl:w-full flex-shrink-0
              ${
                activeTab === tab.id
                  ? "bg-[#4866F6] text-white"
                  : "text-[#586D93]"
              }`}
          >
            {tab.label}
          </button>
        ))}

      </div>
    </div>

  </div>
</div>

{activeTab === "intent" && (
        <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] border border-[#E2E2E2] bg-white p-5">

  {/* Header */}
  {/* Header */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between gap-4">
<h3 className="text-[18px] min-[1024px]:max-[1279px]:text-[16px] font-medium text-[#3D3D3D] whitespace-nowrap flex-shrink-0">
      {tabs.find((x) => x.id === activeTab)?.label} KPI's
  </h3>

  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 lg:gap-3">

<div className="relative w-full md:w-[150px] min-[1024px]:max-[1279px]:!w-[170px] lg:w-[215px] h-[46px] border border-[#D9D9D9] rounded-[10px] bg-white">  
       <input
          ref={dateRef}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="w-full h-full flex items-center px-4 text-[#586D93] text-[14px]">
          {selectedDate || "Select Date"}
        </div>

      <svg
        onClick={() => dateRef.current?.showPicker?.()}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1751_4096)">
          <path d="M8 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 9.08984H20.5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9951 13.6992H12.0041" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 13.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 16.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1751_4096">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>

<button onClick={fetchMonitoringData} className="w-full md:w-[110px] min-[1024px]:max-[1279px]:!w-[120px] lg:w-[140px] h-[44px] rounded-full bg-[#4866F6] text-white flex items-center justify-center gap-1 flex-shrink-0">       Refresh
      <RefreshCw size={18} 
      className={loading ? "animate-spin" : ""} />
    </button>

  </div>

</div>

<div className="mt-4 border-b border-[#CFCFCF]" />

  {/* KPI Card */}
 {/* KPI Card */}
<div className="mt-5">

  <div className="w-full max-w-[295px] md:w-[295px] h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 md:gap-4 px-3 md:px-4">

    <div className="w-[56px] h-[56px] md:w-[70px] md:h-[70px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">

      <svg
        className="w-7 h-7 md:w-9 md:h-9"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2512_4010)">
          <g clipPath="url(#clip1_2512_4010)">
            <mask
              id="mask0_2512_4010"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <path d="M36 0H0V36H36V0Z" fill="white" />
            </mask>

            <g mask="url(#mask0_2512_4010)">
              <path
                d="M31.5 11.28V20.1C31.5 20.61 31.005 20.97 30.525 20.82L24.63 18.99C23.01 18.495 21.27 18.915 20.085 20.1C18.885 21.3 18.45 23.055 18.96 24.675L20.775 30.525C20.925 31.005 20.565 31.5 20.055 31.5H11.28C6.105 31.5 3 28.41 3 23.22V11.28C3 6.09 6.105 3 11.28 3H23.22C28.395 3 31.5 6.09 31.5 11.28Z"
                fill="#4866F6"
              />
              <path
                d="M32.9405 28.2607L30.4955 29.0857C29.8205 29.3107 29.2805 29.8357 29.0555 30.5257L28.2305 32.9707C27.5255 35.0857 24.5555 35.0407 23.8955 32.9257L21.1205 24.0007C20.5805 22.2307 22.2155 20.5807 23.9705 21.1357L32.9105 23.9107C35.0105 24.5707 35.0405 27.5557 32.9405 28.2607Z"
                fill="#4866F6"
              />
            </g>
          </g>
        </g>

        <defs>
          <clipPath id="clip0_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>

          <clipPath id="clip1_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </div>

    <div className="min-w-0 flex-1">

      <h3 className="text-[22px] md:text-[25px] font-semibold text-[#3D3D3D] leading-none">
        {intentData?.total_requests_today ?? 0}
      </h3>

      <p className="text-[14px] md:text-[16px] text-[#586D93] mt-1 leading-[18px] md:leading-normal">
        Total Request Today
      </p>

    </div>

  </div>

</div>

  {/* Divider */}
  <div className="mt-4 border-b border-[#CFCFCF]" />

  {/* Feature Usage */}
  <div className="mt-5">

    <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-8">
      Features usage Data (Overall 100%)
    </h3>

    <div className="grid md:grid-cols-2 gap-x-4 gap-y-10">

      <div>
        <div className="flex justify-between mb-2">
          <span>Schedule Meeting</span>
          <span className="text-[#586D93]">Users: Users: {intentData?.features_usage?.schedule_meeting?.users ?? 0}</span>
        </div>
        {progressBar(intentData?.features_usage?.schedule_meeting?.percent ?? 0)}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>Set Reminder</span>
          <span className="text-[#586D93]">Users: {intentData?.features_usage?.set_reminder?.users ?? 0}</span>
        </div>
        {progressBar(intentData?.features_usage?.set_reminder?.percent ?? 0)}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>Draft Email</span>
          <span className="text-[#586D93]">Users: {intentData?.features_usage?.draft_email?.users ?? 0}</span>
        </div>
        {progressBar(intentData?.features_usage?.draft_email?.percent ?? 0)}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>Create Task</span>
          <span className="text-[#586D93]">Users: {intentData?.features_usage?.create_task?.users ?? 0}</span>
        </div>
        {progressBar(intentData?.features_usage?.create_task?.percent ?? 0)}
      </div>

    </div>

  </div>

  {/* Divider */}
  <div className="mt-5 border-b border-[#CFCFCF]" />

  {/* Intent Response */}
  <div className="mt-5">

    <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-8">
      Intent Responses
    </h3>

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <p className="mb-2">Failed Intent Detection</p>
        {progressBar(intentData?.intent_responses?.failed_intent_detection_percent ?? 0,
    true)}
      </div>

      <div>
        <p className="mb-2">Average Confidence</p>
        {progressBar(intentData?.intent_responses?.average_confidence_percent ?? 0)}
      </div>

    </div>

  </div>

</div>
)}
          {activeTab === "entity" && (
<div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] border border-[#E2E2E2] bg-white p-5">

<div className="flex flex-col md:flex-row md:items-center md:justify-between min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between gap-4">

  <h3 className="text-[16px] min-[375px]:text-[18px] min-[1024px]:max-[1279px]:text-[16px] font-medium text-[#3D3D3D] whitespace-nowrap flex-shrink-0">
    Entity Extraction Monitor KPI's
  </h3>

  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 lg:gap-3">

    <div className="relative w-full md:w-[150px] min-[1024px]:max-[1279px]:!w-[150px] lg:w-[215px] h-[46px] border border-[#D9D9D9] rounded-[10px] bg-white">

      <input
        ref={dateRef}
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="w-full h-full flex items-center px-4 text-[#586D93] text-[14px]">
        {selectedDate || "Select Date"}
      </div>

      <svg
        onClick={() => dateRef.current?.showPicker?.()}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1751_4096)">
          <path d="M8 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 9.08984H20.5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9951 13.6992H12.0041" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 13.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 16.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1751_4096">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>

    <button className="w-full md:w-[110px] min-[1024px]:max-[1279px]:!w-[100px] lg:w-[140px] h-[44px] rounded-full bg-[#4866F6] text-white flex items-center justify-center gap-1 flex-shrink-0">
      Refresh
      <RefreshCw size={18} />
    </button>

  </div>

</div>

  <div className="mt-4 border-b border-[#CFCFCF]" />

  {/* KPI CARD */}

  <div className="mt-5">

  <div className="w-full max-w-[295px] md:w-[295px] h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 md:gap-4 px-3 md:px-4">

    <div className="w-[56px] h-[56px] md:w-[70px] md:h-[70px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">

      <svg
        className="w-7 h-7 md:w-9 md:h-9"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2512_4010)">
          <g clipPath="url(#clip1_2512_4010)">
            <mask
              id="mask0_2512_4010"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <path d="M36 0H0V36H36V0Z" fill="white" />
            </mask>

            <g mask="url(#mask0_2512_4010)">
              <path
                d="M31.5 11.28V20.1C31.5 20.61 31.005 20.97 30.525 20.82L24.63 18.99C23.01 18.495 21.27 18.915 20.085 20.1C18.885 21.3 18.45 23.055 18.96 24.675L20.775 30.525C20.925 31.005 20.565 31.5 20.055 31.5H11.28C6.105 31.5 3 28.41 3 23.22V11.28C3 6.09 6.105 3 11.28 3H23.22C28.395 3 31.5 6.09 31.5 11.28Z"
                fill="#4866F6"
              />
              <path
                d="M32.9405 28.2607L30.4955 29.0857C29.8205 29.3107 29.2805 29.8357 29.0555 30.5257L28.2305 32.9707C27.5255 35.0857 24.5555 35.0407 23.8955 32.9257L21.1205 24.0007C20.5805 22.2307 22.2155 20.5807 23.9705 21.1357L32.9105 23.9107C35.0105 24.5707 35.0405 27.5557 32.9405 28.2607Z"
                fill="#4866F6"
              />
            </g>
          </g>
        </g>

        <defs>
          <clipPath id="clip0_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>

          <clipPath id="clip1_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </div>

    <div className="min-w-0 flex-1">

      <h3 className="text-[22px] md:text-[25px] font-semibold text-[#3D3D3D] leading-none">
        {entityData?.total_entities_extracted_today ?? 0}
      </h3>

      <p className="text-[14px] md:text-[16px] text-[#586D93] mt-1 leading-[18px] md:leading-normal">
        Total Entities Extracted Today
      </p>

    </div>

  </div>

</div>

<div className="mt-5 border-b border-[#CFCFCF]" />

  {/* ENTITY ACCURACY */}

  <div className="mt-5">

    <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-8">
      Entity Accuracy
    </h3>

    <div className="grid md:grid-cols-2 gap-x-4 gap-y-10">

      <div>
        <p className="mb-2">Name Accuracy</p>
        {progressBar(entityData?.entity_accuracy?.name_accuracy_percent ?? 0)}
      </div>

      <div>
        <p className="mb-2">Date Accuracy</p>
        {progressBar(entityData?.entity_accuracy?.date_accuracy_percent ?? 0)}
      </div>

      <div>
        <p className="mb-2">Time Accuracy</p>
        {progressBar(entityData?.entity_accuracy?.time_accuracy_percent ?? 0)}
      </div>

      <div>
        <p className="mb-2">Priority Accuracy</p>
        {progressBar(entityData?.entity_accuracy?.priority_accuracy_percent ?? 0)}
      </div>

      <div>
        <p className="mb-2">App Deduction Rate</p>
        {progressBar(
  entityData?.entity_accuracy?.app_deduction_rate_percent ?? 0
)}
      </div>

      <div>
        <p className="mb-2">Failed Extraction</p>
        {progressBar(
  entityData?.entity_accuracy?.failed_extraction_percent ?? 0,
  true
)}
      </div>

    </div>

  </div>

</div>
)}
          {/* VALIDATION */}

         {activeTab === "validation" && (
<div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] border border-[#E2E2E2] bg-white p-5">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between gap-4 min-[1024px]:gap-2">

  <h3 className="text-[16px] min-[375px]:text-[18px] min-[1024px]:max-[1279px]:text-[15px] font-medium text-[#3D3D3D] whitespace-nowrap flex-shrink-0">
    Validation & Confidence KPI's
  </h3>

  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 lg:gap-2 flex-shrink-0">

    <div className="relative w-full md:w-[150px] lg:w-[170px] xl:w-[215px] h-[46px] border border-[#D9D9D9] rounded-[10px] bg-white">

      <input
        ref={dateRef}
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="w-full h-full flex items-center px-4 text-[#586D93] text-[14px]">
        {selectedDate || "Select Date"}
      </div>

      <svg
        onClick={() => dateRef.current?.showPicker?.()}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1751_4096)">
          <path d="M8 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 9.08984H20.5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9951 13.6992H12.0041" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 13.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 16.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1751_4096">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>

    <button className="w-full md:w-[110px] min-[1024px]:max-[1279px]:!w-[110px] lg:w-[140px] h-[44px] rounded-full bg-[#4866F6] text-white flex items-center justify-center gap-1 flex-shrink-0">
      Refresh
      <RefreshCw size={18} />
    </button>

  </div>

</div>

  <div className="mt-4 border-b border-[#CFCFCF]" />

  {/* KPI CARDS */}

<div className="mt-5 grid grid-cols-1 md:grid-cols-2 min-[1024px]:grid-cols-3 lg:grid-cols-3 gap-4">  
    <div className="h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 px-4 min-[1024px]:max-[1279px]:px-3">

     <div className="w-[70px] h-[70px] min-[1024px]:max-[1279px]:w-[56px] min-[1024px]:max-[1279px]:h-[56px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">

  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2512_4010)">
      <g clipPath="url(#clip1_2512_4010)">
        <mask id="mask0_2512_4010" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
          <path d="M36 0H0V36H36V0Z" fill="white"/>
        </mask>

        <g mask="url(#mask0_2512_4010)">
          <path d="M31.5 11.28V20.1C31.5 20.61 31.005 20.97 30.525 20.82L24.63 18.99C23.01 18.495 21.27 18.915 20.085 20.1C18.885 21.3 18.45 23.055 18.96 24.675L20.775 30.525C20.925 31.005 20.565 31.5 20.055 31.5H11.28C6.105 31.5 3 28.41 3 23.22V11.28C3 6.09 6.105 3 11.28 3H23.22C28.395 3 31.5 6.09 31.5 11.28Z" fill="#4866F6"/>
          <path d="M32.9405 28.2607L30.4955 29.0857C29.8205 29.3107 29.2805 29.8357 29.0555 30.5257L28.2305 32.9707C27.5255 35.0857 24.5555 35.0407 23.8955 32.9257L21.1205 24.0007C20.5805 22.2307 22.2155 20.5807 23.9705 21.1357L32.9105 23.9107C35.0105 24.5707 35.0405 27.5557 32.9405 28.2607Z" fill="#4866F6"/>
        </g>

      </g>
    </g>

    <defs>
      <clipPath id="clip0_2512_4010">
        <rect width="36" height="36" fill="white"/>
      </clipPath>

      <clipPath id="clip1_2512_4010">
        <rect width="36" height="36" fill="white"/>
      </clipPath>
    </defs>
  </svg>

</div>

      <div>
        <h3 className="text-[25px] min-[1024px]:max-[1279px]:text-[18px] font-semibold text-[#3D3D3D] leading-none">
          {validationData?.total_valid_requests ?? 0}
        </h3>

        <p className="text-[16px] min-[1024px]:max-[1279px]:text-[12px] text-[#586D93] mt-1 leading-tight">
          Total Valid Request
        </p>
      </div>

    </div>

    <div className="h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 px-4 min-[1024px]:max-[1279px]:px-3">

     <div className="w-[70px] h-[70px] min-[1024px]:max-[1279px]:w-[56px] min-[1024px]:max-[1279px]:h-[56px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2754_4407)">
      <mask id="mask0_2754_4407" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <path d="M36 0H0V36H36V0Z" fill="white"/>
      </mask>

      <g mask="url(#mask0_2754_4407)">
        <path d="M30.75 15.285H26.415C22.86 15.285 19.965 12.39 19.965 8.835V4.5C19.965 3.675 19.29 3 18.465 3H12.105C7.485 3 3.75 6 3.75 11.355V24.645C3.75 30 7.485 33 12.105 33H23.895C28.515 33 32.25 30 32.25 24.645V16.785C32.25 15.96 31.575 15.285 30.75 15.285ZM18.42 23.67L15.42 26.67C15.315 26.775 15.18 26.865 15.045 26.91C14.91 26.97 14.775 27 14.625 27C14.475 27 14.34 26.97 14.205 26.91C14.085 26.865 13.965 26.775 13.875 26.685C13.86 26.67 13.845 26.67 13.845 26.655L10.845 23.655C10.41 23.22 10.41 22.5 10.845 22.065C11.28 21.63 12 21.63 12.435 22.065L13.5 23.16V16.875C13.5 16.26 14.01 15.75 14.625 15.75C15.24 15.75 15.75 16.26 15.75 16.875V23.16L16.83 22.08C17.265 21.645 17.985 21.645 18.42 22.08C18.855 22.515 18.855 23.235 18.42 23.67Z" fill="#4866F6"/>
        <path d="M26.1445 13.2157C27.5695 13.2307 29.5495 13.2307 31.2445 13.2307C32.0995 13.2307 32.5495 12.2257 31.9495 11.6257C29.7895 9.45072 25.9195 5.53572 23.6995 3.31572C23.0845 2.70072 22.0195 3.12072 22.0195 3.97572V9.21072C22.0195 11.4007 23.8795 13.2157 26.1445 13.2157Z" fill="#4866F6"/>
      </g>
    </g>

    <defs>
      <clipPath id="clip0_2754_4407">
        <rect width="36" height="36" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</div>

      <div>
        <h3 className="text-[25px] min-[1024px]:max-[1279px]:text-[18px] font-semibold text-[#3D3D3D] leading-none">
          {validationData?.incomplete_inputs ?? 0}
        </h3>

        <p className="text-[16px] min-[1024px]:max-[1279px]:text-[12px] text-[#586D93] mt-1 leading-tight">
          Incomplete Inputs
        </p>
      </div>

    </div>

    <div className="h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 px-4 min-[1024px]:max-[1279px]:px-3">

      <div className="w-[70px] h-[70px] min-[1024px]:max-[1279px]:w-[56px] min-[1024px]:max-[1279px]:h-[56px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2724_4537" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
      <path d="M36 0H0V36H36V0Z" fill="white"/>
    </mask>

    <g mask="url(#mask0_2724_4537)">
      <path d="M32.6398 23.88L23.0398 6.6C21.7498 4.275 19.9648 3 17.9998 3C16.0348 3 14.2497 4.275 12.9597 6.6L3.35972 23.88C2.14472 26.085 2.00972 28.2 2.98472 29.865C3.95972 31.53 5.87972 32.445 8.39972 32.445H27.5998C30.1198 32.445 32.0398 31.53 33.0148 29.865C33.9898 28.2 33.8548 26.07 32.6398 23.88ZM16.8748 13.5C16.8748 12.885 17.3848 12.375 17.9998 12.375C18.6148 12.375 19.1248 12.885 19.1248 13.5V21C19.1248 21.615 18.6148 22.125 17.9998 22.125C17.3848 22.125 16.8748 21.615 16.8748 21V13.5ZM19.0648 26.565C18.9898 26.625 18.9148 26.685 18.8398 26.745C18.7498 26.805 18.6598 26.85 18.5698 26.88C18.4798 26.925 18.3898 26.955 18.2848 26.97C18.1948 26.985 18.0898 27 17.9998 27C17.9098 27 17.8048 26.985 17.6998 26.97C17.6098 26.955 17.5198 26.925 17.4298 26.88C17.3398 26.85 17.2498 26.805 17.1598 26.745C17.0848 26.685 17.0098 26.625 16.9348 26.565C16.6648 26.28 16.4998 25.89 16.4998 25.5C16.4998 25.11 16.6648 24.72 16.9348 24.435C17.0098 24.375 17.0848 24.315 17.1598 24.255C17.2498 24.195 17.3398 24.15 17.4298 24.12C17.5198 24.075 17.6098 24.045 17.6998 24.03C17.8948 23.985 18.1048 23.985 18.2848 24.03C18.3898 24.045 18.4798 24.075 18.5698 24.12C18.6598 24.15 18.7498 24.195 18.8398 24.255C18.9148 24.315 18.9898 24.375 19.0648 24.435C19.3348 24.72 19.4998 25.11 19.4998 25.5C19.4998 25.89 19.3348 26.28 19.0648 26.565Z" fill="#4866F6"/>
    </g>
  </svg>
</div>

      <div>
        <h3 className="text-[25px] min-[1024px]:max-[1279px]:text-[18px] font-semibold text-[#3D3D3D] leading-none">
          {validationData?.validation_failures ?? 0}
        </h3>

        <p className="text-[16px] min-[1024px]:max-[1279px]:text-[12px] text-[#586D93] mt-1 leading-tight">
          Validation Failure
        </p>
      </div>

    </div>

  </div>

  <div className="mt-5 border-b border-[#CFCFCF]" />

  {/* VALIDATION CONFIDENCE */}

  <div className="mt-5">

   <h3 className="text-[17px] min-[375px]:text-[16px] md:text-[18px] font-medium text-[#3D3D3D md:whitespace-nowrap">
  Validation & Confidence (Overall 100%)
</h3>

<div className="mt-5 grid md:grid-cols-2 gap-x-4 gap-y-10">
      <div>
        <p className="mb-2">Average Intent Confidence</p>
        {progressBar(
  validationData?.average_intent_confidence_percent ?? 0
)}
      </div>

      <div>
        <p className="mb-2">Average Entity Confidence</p>
        {progressBar(
  validationData?.average_entity_confidence_percent ?? 0
)}
      </div>

      <div>
        <p className="mb-2">Low Confidence Request</p>
        {progressBar(
  validationData?.low_confidence_request_percent ?? 0,
  true
)}
      </div>

    </div>

  </div>

</div>
)}

          {/* FALLBACK */}
{activeTab === "fallback" && (

<div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] border border-[#E2E2E2] bg-white p-5">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:justify-between gap-4 min-[1024px]:gap-2">

  <h3 className="text-[18px] min-[1024px]:max-[1279px]:text-[16px] font-medium text-[#3D3D3D] whitespace-nowrap flex-shrink-0">
    Fallback & Error KPI's
  </h3>

  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 lg:gap-2 flex-shrink-0">

    <div className="relative w-full md:w-[150px] lg:w-[170px] xl:w-[215px] h-[46px] border border-[#D9D9D9] rounded-[10px] bg-white">

      <input
        ref={dateRef}
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="w-full h-full flex items-center px-4 text-[#586D93] text-[14px]">
        {selectedDate || "Select Date"}
      </div>

      <svg
        onClick={() => dateRef.current?.showPicker?.()}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1751_4096)">
          <path d="M8 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 9.08984H20.5" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#586D93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9951 13.6992H12.0041" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 13.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29395 16.6992H8.30293" stroke="#586D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_1751_4096">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>

    </div>
    <button className="w-full md:w-[110px] min-[1024px]:max-[1279px]:!w-[120px] lg:w-[140px] h-[44px] rounded-full bg-[#4866F6] text-white flex items-center justify-center gap-1 flex-shrink-0">
      Refresh
      <RefreshCw size={18} />
    </button>

  </div>

</div>

<div className="mt-4 border-b border-[#CFCFCF]" />

  

  {/* KPI CARD */}

  <div className="mt-5">

  <div className="w-full max-w-[295px] md:w-[295px] h-[122px] rounded-[25px] border border-[#E2E2E2] bg-white flex items-center gap-3 md:gap-4 px-3 md:px-4">

    <div className="w-[56px] h-[56px] md:w-[70px] md:h-[70px] rounded-full bg-[#E4E8FE] flex items-center justify-center flex-shrink-0">

      <svg
        className="w-7 h-7 md:w-9 md:h-9"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2512_4010)">
          <g clipPath="url(#clip1_2512_4010)">
            <mask
              id="mask0_2512_4010"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="36"
              height="36"
            >
              <path d="M36 0H0V36H36V0Z" fill="white" />
            </mask>

            <g mask="url(#mask0_2512_4010)">
              <path
                d="M31.5 11.28V20.1C31.5 20.61 31.005 20.97 30.525 20.82L24.63 18.99C23.01 18.495 21.27 18.915 20.085 20.1C18.885 21.3 18.45 23.055 18.96 24.675L20.775 30.525C20.925 31.005 20.565 31.5 20.055 31.5H11.28C6.105 31.5 3 28.41 3 23.22V11.28C3 6.09 6.105 3 11.28 3H23.22C28.395 3 31.5 6.09 31.5 11.28Z"
                fill="#4866F6"
              />
              <path
                d="M32.9405 28.2607L30.4955 29.0857C29.8205 29.3107 29.2805 29.8357 29.0555 30.5257L28.2305 32.9707C27.5255 35.0857 24.5555 35.0407 23.8955 32.9257L21.1205 24.0007C20.5805 22.2307 22.2155 20.5807 23.9705 21.1357L32.9105 23.9107C35.0105 24.5707 35.0405 27.5557 32.9405 28.2607Z"
                fill="#4866F6"
              />
            </g>
          </g>
        </g>

        <defs>
          <clipPath id="clip0_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>

          <clipPath id="clip1_2512_4010">
            <rect width="36" height="36" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </div>

    <div className="min-w-0 flex-1">

      <h3 className="text-[22px] md:text-[25px] font-semibold text-[#3D3D3D] leading-none">
        {fallbackData?.total_unrecognized_requests ?? 0}
      </h3>

      <p className="text-[14px] md:text-[16px] text-[#586D93] mt-1 leading-[18px] md:leading-normal">
        Total Unrecognized Requests
      </p>

    </div>

  </div>

</div>

<div className="mt-5 border-b border-[#CFCFCF]" />

  {/* FALLBACK DATA */}

  <div className="mt-5">

    <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-8">
      Fallback & Error Data (Overall 100%)
    </h3>

    <div className="grid md:grid-cols-2 gap-x-4 gap-y-10">

      <div>
        <div className="flex justify-between mb-2">
          <span>Clarification Success Rate</span>
          <span className="text-[#586D93]">{fallbackData?.fallback_error_data?.clarification_success_count ?? 0}</span>
        </div>
        {progressBar(
  fallbackData?.fallback_error_data?.clarification_success_rate_percent ?? 0
)}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>User Drop-off Rate</span>
          <span className="text-[#586D93]">{fallbackData?.fallback_error_data?.user_dropoff_count ?? 0}</span>
        </div>
        {progressBar(
  fallbackData?.fallback_error_data?.user_dropoff_rate_percent ?? 0
)}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span>Unsupported Requests</span>
          <span className="text-[#586D93]">150</span>
        </div>
        {progressBar(14)}
      </div>

    </div>

  </div>

  <div className="mt-5 border-b border-[#CFCFCF]" />

  {/* TOP UNKNOWN INPUTS */}

  <div className="mt-5">

    <h3 className="text-[18px] font-medium text-[#3D3D3D] mb-5">
      Top Unknown Inputs
    </h3>

    <div className="rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-5">

  <ul className="space-y-4 text-[#586D93] text-[16px]">
  {fallbackData?.top_unknown_inputs?.length > 0 ? (
    fallbackData.top_unknown_inputs.map((item, index) => (
      <li key={index} className="flex items-start gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="mt-1 flex-shrink-0"
        >
          <path
            d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM9.85333 5.13333L6.07333 8.91333C5.98 9.00667 5.85333 9.06 5.72 9.06C5.58667 9.06 5.46 9.00667 5.36667 8.91333L3.48 7.02667C3.28667 6.83333 3.28667 6.51333 3.48 6.32C3.67333 6.12667 3.99333 6.12667 4.18667 6.32L5.72 7.85333L9.14667 4.42667C9.34 4.23333 9.66 4.23333 9.85333 4.42667C10.0467 4.62 10.0467 4.93333 9.85333 5.13333Z"
            fill="#4866F6"
          />
        </svg>

        <span>{item}</span>
      </li>
    ))
  ) : (
    <li className="text-[#586D93]">No unknown inputs found.</li>
  )}
</ul>

</div>
  </div>

</div>

)}
        </div>
      </div>
    
  );
}