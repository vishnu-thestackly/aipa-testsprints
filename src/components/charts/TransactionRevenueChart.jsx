import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function TransactionRevenueChart({
  revenueData,
  isMinimized,
  setIsMinimized,
}) {
  return (
    <div className="border border-[#D9D9D9] rounded-[28px] bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-medium text-[#4866F6]">
          Revenue Chart
        </h3>

        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-[28px] h-[28px] rounded-full bg-[#4866F6] text-white flex items-center justify-center text-[18px]"
        >
          {isMinimized ? "+" : "−"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isMinimized ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        }`}
      >
        <div className="h-[1px] bg-[#D9D9D9] mt-6 mb-4" />

        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: 5, bottom: 20 }}
            >
              <CartesianGrid stroke="#E5E5E5" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fill: "#6D83AA", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                width={55}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#6D83AA", fontSize: 14 }}
                axisLine={{ stroke: "#D9D9D9", strokeWidth: 1 }}
                tickLine={false}
                label={{
                  value: "Percentage %",
                  angle: -90,
                  position: "insideLeft",
                  dy: 40,
                  style: { fill: "#4B5563", fontSize: 16 },
                }}
              />

              <Line
                type="monotone"
                dataKey="subscription"
                stroke="#4D6BFA"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#33B267"
                strokeWidth={3}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="failed"
                stroke="#F16464"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-[8px] sm:text-[14px] text-[#4B5563] mt-1">
          Monthly
        </p>

        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap justify-center gap-y-3 gap-x-3 sm:gap-x-5 mt-4 px-4 sm:px-0">
          <div className="flex items-center gap-2">
            <span className="w-[12px] h-[12px] rounded-[4px] bg-[#4D6BFA]" />
            <span className="text-[8px] sm:text-[14px] text-[#4D6BFA] whitespace-nowrap">
              Subscription Growth
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-[12px] h-[12px] rounded-[4px] bg-[#33B267]" />
            <span className="text-[8px] sm:text-[14px] text-[#33B267] whitespace-nowrap">
              Monthly Revenue
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-[12px] h-[12px] rounded-[4px] bg-[#F16464]" />
            <span className="text-[8px] sm:text-[14px] text-[#F16464] whitespace-nowrap">
              Failed Payments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}