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

const rawData = [
  { Accuracy: 5, Success: 70, Errors: 65 },
  { Accuracy: 10, Success: 15, Errors: 95 },
  { Accuracy: 80, Success: 45, Errors: 75 },
  { Accuracy: 95, Success: 60, Errors: 100 },
  { Accuracy: 25, Success: 50, Errors: 65 },
  { Accuracy: 45, Success: 60, Errors: 25 },
  { Accuracy: 50, Success: 70, Errors: 20 },
];

export default function AIPerformanceChart() {

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
      <div className="w-full h-[280px] sm:h-[300px] lg:h-[320px] ml-[-10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid 
              vertical={false} 
              stroke="#E5E7EB" 
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
                    fontSize: isMobile ? 8 : 12,
                    fontWeight: 400,
                    letterSpacing: "0.02em"
                  },
                  offset: 10
                }}
              />

            <YAxis
               domain={[0, 100]}
               ticks={[0, 20, 40, 60, 80, 100]}
               tickFormatter={(value) => `${value}%`}
               tickMargin={8}
               tick={{
                 fill: "#586D93",
                 fontSize: isMobile ? 8 : 10
               }}
               axisLine={{ stroke: "#CFCFCF80" }}
               tickLine={{ stroke: "#CFCFCF80" }}
               label={{
                 value: "Percentage %",
                 angle: -90,
                 position: "insideLeft",
                 dy: isMobile ? 10 : 20,
                 style: {
                   fill: "#3D3D3D",
                   fontSize: isMobile ? 8 : 12,
                   fontWeight: 400,
                   letterSpacing: "0.02em"
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

            {/* Blue Line */}
            <Line
              type="monotone"
              dataKey="Accuracy"
              stroke="#4866F6"
              strokeWidth={2}
              dot={false}
            />

            {/* Green Line */}
            <Line
              type="monotone"
              dataKey="Success"
              stroke="#22C55E"
              strokeWidth={2}
              dot={false}
            />

            {/* Red Line */}
            <Line
              type="monotone"
              dataKey="Errors"
              stroke="#EF4444"
              strokeWidth={2}
              dot={false}
            />

                                  <Legend
                        verticalAlign="bottom"
                        align="left"
                        content={({ payload }) => {
                        
                          // 👇 define required order
                          const order = ["Accuracy", "Success", "Errors"];
                        
                          // 👇 sort payload based on order
                          const sortedPayload = [...payload].sort(
                            (a, b) => order.indexOf(a.dataKey) - order.indexOf(b.dataKey)
                          );
                        
                          return (
                            <div className="flex flex-nowrap sm:flex-wrap lg:flex-nowrap justify-between sm:justify-center lg:justify-end items-center w-full mt-6 sm:mt-0 pt-2 gap-2 sm:gap-4 lg:gap-6">
                            
                              {sortedPayload.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2">
                                
                                  {/* Icon */}
                                  <div
                                    className="w-[12px] h-[12px] lg:w-[18px] lg:h-[18px] rounded-[4px] lg:rounded-[6px]"
                                    style={{ backgroundColor: entry.color }}
                                  />

                                  {/* Text */}
                                  <span className="text-[#3D3D3D] text-[8px] lg:text-[12px] whitespace-nowrap">
                                    {entry.dataKey === "Accuracy" && "Accuracy Rate"}
                                    {entry.dataKey === "Success" && "Success Rate"}
                                    {entry.dataKey === "Errors" && "Error Issues"}
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

      
    </div>
  );
}