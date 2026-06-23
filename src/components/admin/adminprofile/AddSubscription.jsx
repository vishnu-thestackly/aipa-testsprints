import React from 'react'
import { useState } from "react";
import Arrow from "../../../assets/images/Arrow.png"
import DropDown from "../../../assets/images/DropDown.svg"

const AddSubscription = ({ setActiveItem }) => {
  const [autoMarkUrgent, setAutoMarkUrgent] = useState(false);

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [currency, setCurrency] = useState("Select Currency");
  const [timePeriod, setTimePeriod] = useState("Select Time Period");
  const [status, setStatus] = useState("Select Status");
  

  // styling
  const input_Style = "w-full py-3 px-4 border text-[#8D97A9] border-[#D9D9D9] rounded-[10px] px-4 outline-none focus:border-[#4866F6] mt-2";
  const label_Style = "text-[#3D3D3D] text-[18px] font-normal";

  return (
    <div className='h-full overflow-y-auto overflow-x-visible px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide'>
      <div className='w-full flex  flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040] '>

        {/* subscription plan */}
        <div className='w-full flex flex-col gap-4 md:gap-5 p-4 md:p-5 lg:p-7 '>

          {/* Arrow & Name */}
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-800">
            <div className="bg-[#4866F6] w-8 h-8 rounded-full flex items-center justify-center">
              <img onClick={() => setActiveItem("plan")} src={Arrow} alt="Arrow" className="w-4 h-3" />
            </div>

            <span className="text-[#3D3D3D]">Add Subscription Plan</span>
          </div>

          { /* Horizontal Line */}
          <div className="w-full border-t border-gray-300"></div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:mt-5">
            <div className="relative">
             <label className={label_Style}> Plan Name*</label>
              <input
                type="text"
                placeholder="Enter Plan Name"
                className={input_Style}
              />
            </div>

            <div className="relative">
              <label className={label_Style}>Plan Description*</label>
              <input
                type="text"
                placeholder="Enter Description"
                className={input_Style}
              />
            </div>

            <div className="relative">
              <label className={label_Style}>Enter Amount*</label>
              <input
                type="text"
                placeholder="Enter Amount"
                className={input_Style}
              />
            </div>

            <div className="relative">
              <label className={label_Style}>Currency Type*</label>

              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="w-full mt-2 py-3 px-4 border text-[#8D97A9] border-[#D9D9D9] rounded-[10px] flex items-center justify-between"
              >
                <span>{currency}</span>
                <img src={DropDown} alt="dropdown" className="w-4 h-4" />
              </button>

              {currencyOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-[10px] shadow-md">
                  {["Rupee (₹)", "Dollar ($)", "Euro (€)"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setCurrency(item);
                        setCurrencyOpen(false);
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className={label_Style}>Time Period*</label>

              <button
                type="button"
                onClick={() => setTimeOpen(!timeOpen)}
                className="w-full mt-2 py-3 px-4 border text-[#8D97A9] border-[#D9D9D9] rounded-[10px] flex items-center justify-between"
              >
                <span>{timePeriod}</span>
                <img src={DropDown} alt="dropdown" className="w-4 h-4" />
              </button>

              {timeOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-[10px] shadow-md">
                  {["Monthly", "Yearly"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setTimePeriod(item);
                        setTimeOpen(false);
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <label className={label_Style}>Status*</label>

              <button
                type="button"
                onClick={() => setStatusOpen(!statusOpen)}
                className="w-full mt-2 py-3 px-4 border text-[#8D97A9] border-[#D9D9D9] rounded-[10px] flex items-center justify-between"
              >
                <span>{status}</span>
                <img src={DropDown} alt="dropdown" className="w-4 h-4" />
              </button>

              {statusOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-[10px] shadow-md">
                  {["Active", "Inactive"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setStatus(item);
                        setStatusOpen(false);
                      }}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>



            <div className="relative">
              <label className={label_Style}>Discount%</label>
              <input
                type="text"
                placeholder="Enter Discount"
                className={input_Style}
              />
            </div>


          </div>

          <div className="relative w-full md:max-w-[calc(50%-10px)]">
            <div className="flex flex-col gap-2">
              <label className={label_Style}>Features*</label>
              <input
                type="text"
                placeholder="Enter Features"
                className={input_Style}
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="mt-8 flex items-center gap-4">
                <p className="text-[#586D93] text-[15px]">Inactive</p>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoMarkUrgent}
                    onChange={(e) => setAutoMarkUrgent(e.target.checked)}
                    className="sr-only peer"
                  />

                  {/* Background */}
                  <div className="w-11 h-6 bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-colors duration-300"></div>

                  {/* Toggle Knob */}
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                </label>

                <p className="text-[#586D93] text-[15px]">Active</p>
              </div>

              <div>
                <button className="mt-8 bg-[#4866F6] text-white w-8 h-8 rounded-[8px] hover:bg-[#3D54C9] transition-colors duration-300">
                  +
                </button>
              </div>
            </div>

          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button className=" w-1/2 sm:w-40 border border-[#4866F6] bg-white text-[#4866F6] py-3 rounded-[25px] transition-colors duration-300" >
              Cancel
            </button>

            <button className=" w-1/2 sm:w-40 bg-[#4866F6] text-white py-3 rounded-[25px] transition-colors duration-300 hover:bg-[#3D54C9] " >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>

  )
}

export default AddSubscription;