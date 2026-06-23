import React, { useEffect, useRef } from 'react'
import { useState } from "react";
import Arrow from "../../../assets/images/Arrow.png"
import DropDown from "../../../assets/images/DropDown.svg"


const EditSubscription = () => {
    const [autoMarkUrgent, setAutoMarkUrgent] = useState(false);

    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);

    const [currency, setCurrency] = useState("Select Currency");
    const [timePeriod, setTimePeriod] = useState("Select Time Period");
    const [status, setStatus] = useState("Select Status");

    const currencyRef = useRef(null);
    const timeRef = useRef(null);
    const statusRef = useRef(null);

    const [features, setFeatures] = useState([
        { text: "", active: false },
        { text: "", active: false },
        { text: "", active: false },
        { text: "", active: false },
        { text: "", active: false },
    ]);

    // styles
    const label_Style ="font-sf-pro text-[#3D3D3D] text-[18px] font-normal leading-[100%] tracking-[0em]";
    const input_Style = "w-full py-3 px-4 border border-[#D9D9D9] text-[#8D97A9] rounded-[10px] px-4 outline-none focus:border-[#4866F6] mt-2";
    const button_Style = "w-full mt-2 py-3 px-4 border border-[#D9D9D9] rounded-[10px] flex items-center justify-between";
    const dropDown_Style = "absolute z-50 w-full mt-1 bg-white rounded-[10px] shadow-md text-[#585D93]";


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                currencyRef.current &&
                !currencyRef.current.contains(event.target)
            ) {
                setCurrencyOpen(false);
            }

            if (
                timeRef.current &&
                !timeRef.current.contains(event.target)
            ) {
                setTimeOpen(false);
            }

            if (
                statusRef.current &&
                !statusRef.current.contains(event.target)
            ) {
                setStatusOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFeatureChange = (index, value) => {
        const updated = [...features];
        updated[index].text = value;
        setFeatures(updated);
    };

    const clearFeature = (index) => {
        const updated = [...features];
        updated[index].text = "";
        setFeatures(updated);
    };

    const toggleFeatureStatus = (index) => {
        const updated = [...features];
        updated[index].active = !updated[index].active;
        setFeatures(updated);
    };

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

                        <span className="text-[#3D3D3D]">Edit Subscription Plan</span>
                    </div>

                    { /* Horizontal Line */}
                    <div className="w-full border-t border-gray-300"></div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 md:mt-5">
                        <div className="relative">
                            <label className={label_Style}>Plan Name*</label>
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

                        <div className="relative" ref={currencyRef}>
                            <label className={label_Style}>Currency Type*</label>

                            <button
                                type="button"
                                onClick={() => setCurrencyOpen(!currencyOpen)}
                                className={button_Style}
                            >
                                <span className="text-[#8D97A9]">{currency}</span>
                                <img
                                    src={DropDown}
                                    alt="dropdown"
                                    className={`w-5 h-5 transition-transform duration-300 ${currencyOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {currencyOpen && (
                                <div className={dropDown_Style}>
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

                        <div className="relative" ref={timeRef}>
                            <label className={label_Style}>Time Period*</label>

                            <button
                                type="button"
                                onClick={() => setTimeOpen(!timeOpen)}
                                className={button_Style}
                            >
                                <span className="text-[#8D97A9]">{timePeriod}</span>
                                <img
                                    src={DropDown}
                                    alt="dropdown"
                                    className={`w-5 h-5 transition-transform duration-300 ${currencyOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {timeOpen && (
                                <div className={dropDown_Style}>
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
                        <div className="relative" ref={statusRef}>
                            <label className={label_Style}>Status*</label>

                            <button
                                type="button"
                                onClick={() => setStatusOpen(!statusOpen)}
                                className={button_Style}
                            >
                                <span className="text-[#8D97A9]">{status}</span>
                                <img
                                    src={DropDown}
                                    alt="dropdown"
                                    className={`w-5 h-5 transition-transform duration-300 ${currencyOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                />
                            </button>

                            {statusOpen && (
                                <div className={dropDown_Style}>
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
                                className="w-full py-3 px-4 border text-[#8D97A9] border-[#D9D9D9] rounded-[10px] px-4 outline-none focus:border-[#4866F6] mt-2"
                            />
                        </div>


                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {features.map((feature, index) => (
                            <div key={index} className="w-full">
                                {/* Feature Input */}
                                <div className="flex flex-col gap-2">
                                    <label className={label_Style}>
                                        Feature {index + 1}
                                    </label>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={feature.text}
                                            onChange={(e) =>
                                                handleFeatureChange(index, e.target.value)
                                            }
                                            placeholder="Enter Features"
                                            className="w-full py-3 px-4 pr-12 border border-[#D9D9D9] text-[#8D97A9] rounded-[10px] outline-none focus:border-[#4866F6]"
                                        />

                                        {feature.text && (
                                            <button
                                                type="button"
                                                onClick={() => clearFeature(index)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                                            >
                                                <span className="text-white text-sm font-bold">
                                                    ×
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Toggle */}
                                <div className="flex items-center justify-between mt-5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-[#586D93]">
                                            Inactive
                                        </span>

                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={feature.active}
                                                onChange={() => toggleFeatureStatus(index)}
                                                className="sr-only peer"
                                            />

                                            <div className="w-11 h-6 bg-[#D9D9D9] rounded-full peer-checked:bg-[#4866F6] transition-colors duration-300"></div>

                                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                                        </label>

                                        <span className="text-sm text-[#586D93]">
                                            Active
                                        </span>
                                    </div>

                                    {index === features.length - 1 && (
                                        <button
                                            type="button"
                                            className="w-8 h-8 bg-[#4866F6] text-white rounded-lg hover:bg-[#3D54C9]"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
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

export default EditSubscription