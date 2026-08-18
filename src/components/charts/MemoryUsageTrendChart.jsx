import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

const WEEKLY_DATA = [
  { day: isMobile ? "Sun" : "Sunday", value: 950 },
  { day: isMobile ? "Mon" : "Monday", value: 650 },
  { day: isMobile ? "Tue" : "Tuesday", value: 300 },
  { day: isMobile ? "Wed" : "Wednesday", value: 750 },
  { day: isMobile ? "Thu" : "Thursday", value: 850 },
  { day: isMobile ? "Fri" : "Friday", value: 550 },
  { day: isMobile ? "Sat" : "Saturday", value: 700 },
];

const MONTHLY_DATA = [
  { day: "Wk 1", value: 720 },
  { day: "Wk 2", value: 880 },
  { day: "Wk 3", value: 540 },
  { day: "Wk 4", value: 910 },
];

export default function MemoryUsageTrendChart() {
  const [range, setRange] = useState("weekly");

  const data = useMemo(
    () => (range === "weekly" ? WEEKLY_DATA : MONTHLY_DATA),
    [range],
  );

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Header: title + range toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 w-full">
        <h4 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
          Memory Usage Trend
        </h4>

        <div className="flex gap-2 w-full sm:w-[223px] h-[35px] rounded-[16px] border border-[#E2E2E2] items-center justify-center px-1">
          <button
            type="button"
            onClick={() => setRange("weekly")}
            className={`flex-1 h-[28px] rounded-[16px] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] cursor-pointer transition-all duration-200 ${
              range === "weekly"
                ? "bg-[#4866F6] text-white"
                : "bg-white text-[#3D3D3D] hover:bg-[#4866F6] hover:text-white"
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setRange("monthly")}
            className={`flex-1 h-[28px] rounded-[16px] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] cursor-pointer transition-all duration-200 ${
              range === "monthly"
                ? "bg-[#4866F6] text-white"
                : "bg-white text-[#3D3D3D] hover:bg-[#4866F6] hover:text-white"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="mb-4 border-b border-[#CFCFCF]" />

      {/* Chart */}
      <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={isMobile ? 18 : 28}>
            <CartesianGrid vertical={false} stroke="#E5E7EB" />

            <XAxis
              dataKey="day"
              tick={{ fill: "#586D93", fontSize: 10 }}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={{ stroke: "#CFCFCF80" }}
              interval={0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 50 : 30}
            />

            <YAxis
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
              tick={{ fill: "#586D93", fontSize: 10 }}
              tickMargin={10}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={{ stroke: "#CFCFCF80" }}
              label={{
                value: "Memory",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                dy: 5,
                style: {
                  fill: "#3D3D3D",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: "25px",
                  fontFamily: "SF Pro",
                },
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}
            />

            <Bar dataKey="value" fill="#4866F6" radius={[20, 20, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <p className="text-center font-normal text-[9px] sm:text-[10px] leading-[25px] tracking-[0.02em] text-[#3D3D3D] md:mt-2">
        {range === "weekly" ? "No of days (weekly)" : "No of weeks (monthly)"}
      </p>
    </div>
  );
}
