import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import bubbleSvg from "../../assets/images/Combined Shape.svg";

function PercentageBubble({ value, className, reverse = false }) {
  return (
    <div className={className}>
      <div className="relative w-[107px] h-[84px]">
        <img
          src={bubbleSvg}
          alt=""
          className={`absolute inset-0 w-full h-full ${
            reverse ? "scale-x-[-1]" : ""
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center pb-3">
          <span className="text-[20px] sm:text-[28px] font-medium text-[#4B4B4B]">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TransactionRevenuePlanChart({
  planData,
  isPieMinimized,
  setIsPieMinimized,
}) {
  return (
    <div className="border border-[#D9D9D9] rounded-[28px] bg-white p-6">
      <div className="flex items-center justify-between">
       <h3 className="text-[14px] min-[375px]:text-[16px] md:text-[20px] lg:text-[24px] font-medium text-[#4866F6] whitespace-nowrap overflow-hidden text-ellipsis">
  Revenue Chart (Based on Plans)
</h3>

       <button
  onClick={() => setIsPieMinimized(!isPieMinimized)}
  className="w-[28px] h-[28px] rounded-full bg-[#4866F6] text-white flex items-center justify-center text-[18px] cursor-pointer"
>
  {isPieMinimized ? "+" : "−"}
</button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isPieMinimized ? "max-h-0 opacity-0" : "max-h-[600px] opacity-100"
        }`}
      >
        <div className="h-[1px] bg-[#D9D9D9] mt-6 mb-4" />

<div className="relative w-full h-[280px] flex justify-center items-center">
    <div className="relative w-[320px] h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={planData}
                dataKey="value"
                innerRadius="60%"
                outerRadius="80%"
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill="#4866F6" />
                <Cell fill="#6C82F8" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[18px] text-[#4B4B4B]">Total</span>
            <span className="text-[18px] font-semibold text-[#4B4B4B]">
              ₹12405.00
            </span>
          </div>

          <PercentageBubble
  value="55%"
  className="
    absolute
    left-[-30px]
    top-1/2
    -translate-y-1/2
    z-10
  "
/>

<PercentageBubble
  value="45%"
  reverse
  className="
    absolute
    right-[-15px]
    top-[50px]
    z-10
  "
/></div>
</div>

        <div className="flex justify-center gap-10 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-[18px] h-[18px] rounded-[6px] bg-[#4866F6]" />
            <span className="text-[14px] min-[320px]:text-[13px] text-[#4B4B4B]">
              Premium Plan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-[18px] h-[18px] rounded-[6px] bg-[#6C82F8]" />
            <span className="text-[14px] min-[320px]:text-[13px] text-[#4B4B4B]">
              Basic Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}