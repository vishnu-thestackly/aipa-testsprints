// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// const data = [
//   { name: "Sunday", value: 95 },
//   { name: "Monday", value: 65 },
//   { name: "Tuesday", value: 30 },
//   { name: "Wednesday", value: 75 },
//   { name: "Thursday", value: 85 },
//   { name: "Friday", value: 55 },
//   { name: "Saturday", value: 70 },
// ];

// export default function Graph() {
//   return (
//     <div className="w-full h-[300px] bg-white rounded-xl p-4 shadow-sm">
//       <h2 className="text-lg font-semibold mb-4">Conversations</h2>

//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
          
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />

//           <Bar 
//             dataKey="value" 
//             radius={[10, 10, 0, 0]}   // rounded top like your image
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const isMobile = window.innerWidth < 640;

const data = [
  { 
    day: isMobile ? "Sun" : "Sunday",
    value: 95 
  },
  { 
    day: isMobile ? "Mon" : "Monday",
    value: 65 
  },
  { 
    day: isMobile ? "Tue" : "Tuesday",
    value: 30 
  },
  { 
    day: isMobile ? "Wed" : "Wednesday",
    value: 75 
  },
  { 
    day: isMobile ? "Thu" : "Thursday",
    value: 85 
  },
  { 
    day: isMobile ? "Fri" : "Friday",
    value: 55 
  },
  { 
    day: isMobile ? "Sat" : "Saturday",
    value: 70 
  },
];



export default function Charts() {
  return (
    <div className="bg-white w-full border-t border-[#CFCFCF] p-3 sm:p-4 lg:p-6 overflow-x-hidden">

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
      <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
                  data={data}
                    barSize={isMobile ? 18 : 28}
                    >
            
            <CartesianGrid 
              vertical={false} 
              stroke="#E5E7EB" 
            />

            <XAxis 
              dataKey="day" 
              tick={{ fill: "#586D93", fontSize: 10 }} 
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={{ stroke: "#CFCFCF80" }}
              interval={0}
               textAnchor={window.innerWidth < 640 ? "end" : "middle"}
               height={window.innerWidth < 640 ? 50 : 30}
              
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(value) => `${value}%`} 
              tick={{ fill: "#586D93", fontSize: 10 }}
              tickMargin={10}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={{ stroke: "#CFCFCF80" }}
              label={{
                      value: "Percentage %",
                      angle: -90, // rotate vertical (Figma: 90deg)
                      position: "insideLeft",
                      offset: -0,
                      dy: 5,
                      style: {
                        fill: "#3D3D3D",
                        fontSize: 12,
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: "25px",
                        fontFamily: "SF Pro"
                      }
                    }}
            />

            <Tooltip 
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
              }}
            />

            <Bar 
              dataKey="value" 
              fill="#4866F6"
              radius={[20, 20, 0, 0]}  // rounded top bars
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <p className="text-center font-normal text-[9px] sm:text-[10px] leading-[25px] tracking-[0.02em] text-[#3D3D3D] mt-2">
        No of days (weekly)
      </p>
    </div>
  );
}