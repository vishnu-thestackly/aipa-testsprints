import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMemoryTrend } from "../../api/authApi";
import { useTheme } from "../../context/ThemeContext";

const isMobile =
  typeof window !== "undefined" && window.innerWidth < 640;

export default function MemoryUsageTrendChart() {
  const { isDark } = useTheme();
  const [range, setRange] = useState("weekly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMemoryTrend = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMemoryTrend(range);

        console.log("Memory Trend:", response);

        if (response?.success) {
          setData(response.data || []);
        } else {
          setData([]);
          setError("Failed to load memory usage trend.");
        }
      } catch (error) {
        console.error("Memory Trend API Error:", error);
        setData([]);
        setError("Failed to load memory usage trend.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemoryTrend();
  }, [range]);

  const chartData = data.map((item) => ({
    day: item.label,
    value: item.value,
  }));

  return (
    <div className={`w-full overflow-x-hidden ${isDark ? "bg-transparent" : "bg-white"}`}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 w-full">
        <h4
          className={`text-[16px] sm:text-[18px] font-medium ${
            isDark ? "text-white" : "text-[#3D3D3D]"
          }`}
        >
          Memory Usage Trend
        </h4>

        <div
          className={`flex gap-2 w-full sm:w-[223px] h-[35px] rounded-[16px] border items-center justify-center px-1 ${
            isDark
              ? "border-[#586D93] bg-[#0A1325]"
              : "border-[#E2E2E2] bg-white"
          }`}
        >
          <button
            type="button"
            onClick={() => setRange("weekly")}
            className={`flex-1 h-[28px] rounded-[16px] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] cursor-pointer transition-all duration-200 ${
              range === "weekly"
                ? "bg-[#4866F6] text-white"
                : isDark
                ? "text-[#8D97A9] hover:text-white"
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
                : isDark
                ? "text-[#8D97A9] hover:text-white"
                : "bg-white text-[#3D3D3D] hover:bg-[#4866F6] hover:text-white"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div
        className={`mb-4 border-b ${
          isDark ? "border-[#586D93]" : "border-[#CFCFCF]"
        }`}
      />

      {/* Chart */}
      <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-[#586D93] text-sm">
            Loading memory usage trend...
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500 text-sm">
            {error}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              barSize={isMobile ? 18 : 28}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke={isDark ? "#586D93" : "#E5E7EB"}
              />

              <XAxis
                dataKey="day"
                tick={{
                  fill: isDark ? "#8D97A9" : "#586D93",
                  fontSize: 10,
                }}
                axisLine={{
                  stroke: isDark ? "#586D93" : "#CFCFCF80",
                }}
                tickLine={{
                  stroke: isDark ? "#586D93" : "#CFCFCF80",
                }}
                interval={0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 50 : 30}
              />

              <YAxis
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
                tick={{
                  fill: isDark ? "#8D97A9" : "#586D93",
                  fontSize: 10,
                }}
                tickMargin={10}
                axisLine={{
                  stroke: isDark ? "#586D93" : "#CFCFCF80",
                }}
                tickLine={{
                  stroke: isDark ? "#586D93" : "#CFCFCF80",
                }}
                label={{
                  value: "Memory",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  dy: 5,
                  style: {
                    fill: isDark ? "#8D97A9" : "#3D3D3D",
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    lineHeight: "25px",
                    fontFamily: "SF Pro, sans-serif",
                  },
                }}
              />

              <Tooltip
                cursor={{ fill: isDark ? "rgba(88, 109, 147, 0.12)" : "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  backgroundColor: isDark ? "#0A1325" : "#ffffff",
                  borderColor: isDark ? "#586D93" : "#e5e7eb",
                  borderRadius: "8px",
                  color: isDark ? "#ffffff" : "#000000",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
                itemStyle={{
                  color: isDark ? "#ffffff" : "#000000",
                }}
                labelStyle={{
                  color: isDark ? "#8D97A9" : "#64748b",
                }}
              />

              <Bar
                dataKey="value"
                fill="#4866F6"
                radius={[20, 20, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      <p
        className={`text-center font-normal text-[9px] sm:text-[10px] leading-[25px] tracking-[0.02em] md:mt-2 ${
          isDark ? "text-[#8D97A9]" : "text-[#3D3D3D]"
        }`}
      >
        {range === "weekly"
          ? "No of days (weekly)"
          : "No of weeks (monthly)"}
      </p>
    </div>
  );
}