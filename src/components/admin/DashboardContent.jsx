
import React, { useState } from 'react'
import ConversationsChart from "../charts/ConversationsChart";
import UsageHeatmap from "../charts/UsageHeatmap";
import ErrorFallbackChart from "../charts/ErrorFallbackChart";
import AIPerformanceChart from "../charts/AIPerformanceChart";

import user_count from "../../assets/images/user_count.svg";
import active_user from "../../assets/images/active_user.png";
import request from "../../assets/images/request.png";
import time from "../../assets/images/time.png";
import risk from "../../assets/images/risk.png"

const today = "w-[107px] h-[28px] rounded-[16px] flex justify-center items-center font-normal text-[14px] leading-[100%] tracking-[0.02em] cursor-pointer transition-all duration-200 hover:bg-[#E4E8FE] hover:text-[#4866F6]"

const mainCard = "w-full md:w-1/3 min-h-[100px] lg:h-[120px] flex items-center gap-4 rounded-[20px] lg:rounded-[25px] py-5 px-4 bg-transparent border border-gray-100 shadow-[0px_0px_4px_-5px_#3D3D3D26]"
const subCard = "w-[55px] h-[55px] lg:w-[70px] lg:h-[70px] flex items-center justify-center rounded-full bg-[#E4E8FE]"
const cardHead = "font-semibold text-[16px] lg:text-[20px] text-[#3D3D3D]"
const cardContent = "font-normal text-[13px] lg:text-[16px] text-[#586D93]"

export default function DashboardContent() {

  // ✅ ADDED STATE
  const [sections, setSections] = useState({
    conversations: false,
    heatmap: false,
    error: false,
    ai: false,
  });

  const [activeFilter, setActiveFilter] = useState("Today");

  // ✅ TOGGLE FUNCTION
  const toggleSection = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className='h-[95%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide'>
        <div className='w-[100%] h-[100%] flex flex-col gap-5'>

            {/* ===== YOUR EXISTING CODE (UNCHANGED) ===== */}
            <div className='w-full flex flex-col sm:flex-row gap-4'>
              <div className='w-full sm:w-1/2 min-h-[100px] lg:h-[120px] flex items-center gap-4 rounded-[20px] lg:rounded-[25px] py-5 px-4 lg:px-5 shadow-[1px_1px_3px_-5px_#3D3D3D1A] bg-white'>
                <div className='w-[70px] h-[70px] flex items-center justify-center gap-[4px] p-[17px] rounded-full bg-[#E4E8FE]'><img src={user_count} alt="userCount" /></div>
                <div>
                  <h2 className='font-semibold text-[20px] leading-[100%] tracking-[0.02em] text-[#3D3D3D]'>1250</h2>
                  <p className="font-normal text-[16px] leading-[100%] tracking-[0.02em] text-[#586D93]">Total users</p>
                </div>
              </div>

              <div className='w-full sm:w-1/2 min-h-[100px] lg:h-[120px] flex items-center gap-4 rounded-[20px] lg:rounded-[25px] py-5 px-4 lg:px-5 shadow-[1px_1px_3px_-5px_#3D3D3D1A] bg-white'>
                <div className='w-[70px] h-[70px] flex items-center justify-center gap-[4px] p-[17px] rounded-full bg-[#E4E8FE]'><img src={active_user} alt="userCount" /></div>
                <div>
                  <h2 className='font-semibold text-[20px] leading-[100%] tracking-[0.02em] text-[#3D3D3D]'>112</h2>
                  <p className="font-normal text-[16px] leading-[100%] tracking-[0.02em] text-[#586D93]">Active users</p>
                </div>
              </div>
            </div>

            <div className='w-full flex flex-col gap-5 rounded-[20px] lg:rounded-[25px] p-4 lg:p-5 shadow-[1px_1px_3px_-5px_#3D3D3D1A] bg-white'>
                <div className='w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <p className="font-medium text-[18px] leading-[100%] tracking-[0em] text-[#4866F6]">Key Performance Indicators (KPI’s)</p>

                  <div className=" w-full sm:w-[335px] h-[32px] rounded-[16px] shadow-[0px_0px_2px_0px_#00000033] bg-white flex items-center justify-evenly">

                      <div
                            onClick={() => setActiveFilter("Today")}
                            className={`${today} ${
                              activeFilter === "Today"
                                ? "bg-[#4866F6] text-white"
                                : "text-[#3D3D3D]"
                            }`}
                          >
                            Today
                          </div>
                          
                          <div
                            onClick={() => setActiveFilter("Weekly")}
                            className={`${today} ${
                              activeFilter === "Weekly"
                                ? "bg-[#4866F6] text-white"
                                : "text-[#3D3D3D]"
                            }`}
                          >
                            Weekly
                          </div>
                          
                          <div
                            onClick={() => setActiveFilter("Monthly")}
                            className={`${today} ${
                              activeFilter === "Monthly"
                                ? "bg-[#4866F6] text-white"
                                : "text-[#3D3D3D]"
                            }`}
                          >
                            Monthly
                          </div>
                  </div>
                </div>

                <div className='w-[100%] flex justify-center items-center'>
                    <div className='w-[97%] border-t border-[#CFCFCF]'></div>
                </div>

              <div className='w-full flex flex-col md:flex-row gap-4'>
                  <div className={`${mainCard}`}>
                    <div className={`${subCard}`}><img src={request} alt="userCount" /></div>
                    <div className='flex flex-col gap-1.5'>
                      <h2 className={`${cardHead}`}>25</h2>
                      <p className={`${cardContent}`}>Total Requests</p>
                    </div>   
                  </div>

                  <div className={`${mainCard}`}>
                    <div className={`${subCard}`}><img src={time} alt="userCount" /></div>
                    <div className='flex flex-col gap-1.5'>
                      <h2 className={`${cardHead}`}>2ms - 3ms</h2>
                      <p className={`${cardContent}`}>Avg response time</p>
                    </div>   
                  </div>

                  <div className={`${mainCard}`}>
                    <div className={`${subCard}`}><img src={risk} alt="userCount" /></div>
                    <div className='flex flex-col gap-1.5'>
                      <h2 className={`${cardHead}`}>12</h2>
                      <p className={`${cardContent}`}>Error Counts</p>
                    </div>   
                  </div>
               </div> 
            </div>

            {/* ===== NEW EXPANDABLE SECTIONS ===== */}

            {/* Conversations */}
            <div className='w-full bg-white rounded-[20px] lg:rounded-[25px] p-3 lg:p-4 shadow-[1px_1px_3px_-5px_#3D3D3D1A]'>
              <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection("conversations")}>
                <p className="text-[#4866F6]">Conversations</p>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4866F6] text-white">
                  {sections.conversations ? "-" : "+"}
                </div>
              </div>

              {sections.conversations && (
                <div className="mt-4">
                  <ConversationsChart />
                </div>
              )}
            </div>

            {/* Usage Activity Map */}
            <div className='w-full bg-white rounded-[25px] p-4 shadow-[1px_1px_3px_-5px_#3D3D3D1A]'>
              <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection("heatmap")}>
                <p className="text-[#4866F6]">Usage Activity Map</p>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4866F6] text-white">
                  {sections.heatmap ? "-" : "+"}
                </div>
              </div>

              {sections.heatmap && (
                <div className="mt-4">
                  <UsageHeatmap />
                </div>
              )}
            </div>

            {/* Error & Fallback Rating */}
            <div className='w-full bg-white rounded-[25px] p-4 shadow-[1px_1px_3px_-5px_#3D3D3D1A]'>
              <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection("error")}>
                <p className="text-[#4866F6]">Error & Fallback Rating</p>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4866F6] text-white">
                  {sections.error ? "-" : "+"}
                </div>
              </div>

              {sections.error && (
                <div className="mt-4">
                   <ErrorFallbackChart /> 
                </div>
              )}
            </div>

            {/* AI Performance Metrics */}
            <div className='w-full bg-white rounded-[25px] p-4 shadow-[1px_1px_3px_-5px_#3D3D3D1A]'>
              <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection("ai")}>
                <p className="text-[#4866F6]">AI Performance Metrics</p>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4866F6] text-white">
                  {sections.ai ? "-" : "+"}
                </div>
              </div>

              {sections.ai && (
                <div className="mt-4">
                  <AIPerformanceChart /> 
                </div>
              )}
            </div>

        </div>
    </div>
  )
}