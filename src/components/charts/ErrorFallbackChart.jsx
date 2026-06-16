import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const CustomDot = (props) => {
  const { cx, cy, stroke } = props;

  return (
    <rect
      x={cx - 9}   // center alignment
      y={cy - 9}
      width={18}
      height={18}
      rx={6}       // rounded corners
      ry={6}
      fill={stroke}
    />
  );
};

const rawData = [
  { fallback: 100, critical: 0, recovery: 50 },
  { fallback: 15, critical: 10, recovery: 85 },
  { fallback: 55, critical: 90, recovery: 65 },
  { fallback: 80, critical: 25, recovery: 90 },
  { fallback: 25, critical: 80, recovery: 60 },
  { fallback: 65, critical: 70, recovery: 55 },
  { fallback: 95, critical: 90, recovery: 10 },
];



export default function ErrorFallbackChart() {

  const isMobile = window.innerWidth < 640;

  const days = isMobile
  ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const data = rawData.map((item, index) => ({
  day: days[index],
  ...item,
}));

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 w-full border-t border-[#CFCFCF] overflow-hidden">

      {/* Header */}
      <div className="flex justify-end items-center mb-4 w-full">
        

        <div className="flex gap-2 w-full sm:w-[223px] h-[35px] rounded-[16px] shadow-[0px_0px_2px_0px_#00000033] items-center justify-center">
          <button className="flex-1 h-[28px] rounded-[16px] text-[#3D3D3D] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] bg-white hover:bg-[#4866F6] hover:text-white cursor-pointer transition-all duration-200">
            Last 7 Days
          </button>
          <button className="flex-1 h-[28px] rounded-[16px] text-[#3D3D3D] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] bg-white hover:bg-[#4866F6] hover:text-white cursor-pointer transition-all duration-200">
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[240px] sm:h-[300px] lg:h-[340px] ml-[-10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid 
              vertical={false} 
              stroke="#CFCFCF80" 
            />

            <XAxis
                dataKey="day"
                tick={{
                  fill: "#586D93",
                  fontSize: isMobile ? 8 : 10
                }}
                axisLine={{ stroke: "#CFCFCF80" }}
                tickLine={{ stroke: "#CFCFCF80" }}
                interval={0}
                label={{
                  value: "No of days (weekly)",
                  position: "bottom",
                  style: {
                    fill: "#3D3D3D",
                    fontSize: isMobile ? 8 : 10,
                    fontWeight: 400,
                    letterSpacing: "0.02em"
                  },
                  offset: 10
                }}
              />

            <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{
                  fill: "#586D93",
                  fontSize: isMobile ? 8 : 10
                }}
                tickMargin={8}
                axisLine={{ stroke: "#CFCFCF80" }}
                tickLine={{ stroke: "#CFCFCF80" }}
                label={{
                  value: "Total Errors",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "#3D3D3D",
                    fontSize: isMobile ? 8 : 10,
                    fontWeight: 400,
                    letterSpacing: "0.02em"
                  },
                  dx: isMobile ? -2 : -5
                }}
              />

            
            <Tooltip 
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
              }}
            />

            {/* Lines */}

            <Line
              type="monotone"
              dataKey="recovery"
              stroke="#22C55E"
              strokeWidth={2}
              dot={false}
            />



            <Line
              type="monotone"
              dataKey="fallback"
              stroke="#4866F6"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="critical"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />

            

            

            <Legend
  verticalAlign="bottom"
  align="left"
  content={({ payload }) => {

    // 👇 define required order
    const order = ["fallback", "critical", "recovery"];

    // 👇 sort payload based on order
    const sortedPayload = [...payload].sort(
      (a, b) => order.indexOf(a.dataKey) - order.indexOf(b.dataKey)
    );

    return (
      <div className="flex flex-nowrap sm:flex-wrap lg:flex-nowrap justify-between sm:justify-center lg:justify-end items-center w-full pt-9 sm:pt-2 gap-2 sm:gap-4 lg:gap-6">
        {sortedPayload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">

            {/* Icon */}
            <div
              className="w-[12px] h-[12px] lg:w-[18px] lg:h-[18px] rounded-[4px] lg:rounded-[6px]"
              style={{ backgroundColor: entry.color }}
            />

            {/* Text */}
            <span className="text-[#3D3D3D] text-[8px] sm:text-[12px] whitespace-nowrap">
              {entry.dataKey === "fallback" && "Fallback Rate"}
              {entry.dataKey === "critical" && "Critical Issues"}
              {entry.dataKey === "recovery" && "Recovery Rate"}
            </span>

          </div>
        ))}

      </div>
    );
  }}
/>

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <p className="text-center text-[12px] text-[#94A3B8] mt-">
        
      </p>
    </div>
  );
}