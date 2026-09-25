import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weeklyBarData = [
  { name: "Sunday", shortName: "Sun", calls: 820 },
  { name: "Monday", shortName: "Mon", calls: 690 },
  { name: "Tuesday", shortName: "Tue", calls: 910 },
  { name: "Wednesday", shortName: "Wed", calls: 640 },
  { name: "Thursday", shortName: "Thu", calls: 760 },
  { name: "Friday", shortName: "Fri", calls: 580 },
  { name: "Saturday", shortName: "Sat", calls: 870 },
];

const monthlyBarData = [
  { name: "Week 1", shortName: "W1", calls: 720 },
  { name: "Week 2", shortName: "W2", calls: 860 },
  { name: "Week 3", shortName: "W3", calls: 640 },
  { name: "Week 4", shortName: "W4", calls: 910 },
];

export default function ApiCallVolumeTrendChart() {
  const [volumeView, setVolumeView] = useState("weekly");
  const [chartWidth, setChartWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = chartWidth < 640;
  const isTablet = chartWidth >= 640 && chartWidth < 1024;

  const baseChartData =
    volumeView === "weekly" ? weeklyBarData : monthlyBarData;

  const barChartData = baseChartData.map((item) => ({
    ...item,
    label: isMobile || isTablet ? item.shortName : item.name,
  }));

  const chartBarSize = isMobile ? 18 : isTablet ? 26 : 36;
  const chartTickSize = isMobile ? 10 : 12;
  const chartMargin = isMobile
    ? { top: 8, right: 4, left: 16, bottom: 4 }
    : isTablet
      ? { top: 10, right: 8, left: 18, bottom: 5 }
      : { top: 10, right: 10, left: 28, bottom: 5 };

  return (
    <div className="rounded-[20px] border border-[#E2E2E2] bg-white p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
          API Call Volume Trend
        </h2>
        <div className="flex w-full sm:w-auto p-1 bg-[#F4F5F8] rounded-3xl border border-[#E2E2E2]">
          {["weekly", "monthly"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setVolumeView(type)}
              className={`flex-1 sm:flex-none px-4 sm:px-8 py-2 text-[12px] font-medium rounded-3xl capitalize border-none cursor-pointer transition-all ${
                volumeView === type
                  ? "bg-[#4866F6] text-white shadow-sm"
                  : "bg-transparent text-[#586D93] hover:text-[#3D3D3D]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-[#CFCFCF] mb-8" />

      <div className="h-[200px] sm:h-[260px] md:h-[300px] lg:h-[320px] w-full min-w-0 overflow-x-auto">
        <div className="min-w-[280px] h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={chartMargin}
              barSize={chartBarSize}
              barCategoryGap={isMobile ? "18%" : isTablet ? "22%" : "28%"}
            >
              <CartesianGrid vertical={false} stroke="#EEF0F5" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={{ fill: "#91A0B8", fontSize: chartTickSize }}
                dy={isMobile ? 6 : 10}
                height={isMobile ? 28 : 36}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 1000]}
                ticks={[0, 250, 500, 750, 1000]}
                width={isMobile ? 36 : isTablet ? 44 : 52}
                tick={{ fill: "#91A0B8", fontSize: chartTickSize }}
                tickMargin={isMobile ? 4 : 8}
                label={{
                  value: "API Calls",
                  angle: -90,
                  position: "insideLeft",
                  offset: isMobile ? -8 : isTablet ? -8 : -8,
                  dx: isMobile ? -4 : isTablet ? -6 : -10,
                  style: {
                    fill: "#91A0B8",
                    fontSize: isMobile ? 10 : isTablet ? 11 : 12,
                    textAnchor: "middle",
                  },
                }}
              />
              <Bar
                dataKey="calls"
                fill="#4866F6"
                radius={isMobile ? [10, 10, 0, 0] : [20, 20, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="text-center text-[11px] sm:text-[12px] font-medium text-[#91A0B8] mt-2 sm:mt-3">
        {volumeView === "weekly"
          ? "No of days (weekly)"
          : "No of weeks (monthly)"}
      </div>
    </div>
  );
}
