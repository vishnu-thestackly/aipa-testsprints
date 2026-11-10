import React, { useState, useEffect} from 'react'
import { Pencil, ListTodo, ClipboardCheck, CheckCircle2, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell,} from "recharts";
import { getAiUsage } from "../../api/authApi";
import { useTheme } from "../../context/ThemeContext"

const AiUsageDashboard = () => {
  const { isDark } = useTheme();
  const [volumeView, setVolumeView] = useState("weekly");
  const [trendsView, setTrendsView] = useState("today");
  const [aiUsage, setAiUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MOCK DATA ---


  const intentsPieData = [
    { name: "Schedule Meeting", value: 35, color: "#4866F6" },
    { name: "Draft Email", value: 28, color: "#60a5fa" },
    { name: "Create Task", value: 22, color: "#93c5fd" },
    { name: "Set Reminder", value: 15, color: "#bfdbfe" },
  ];

  const integrationsPieData = [
    { name: "Outlook", value: 45, color: "#4866F6" },
    { name: "Exchange", value: 25, color: "#60a5fa" },
    { name: "Jira", value: 20, color: "#93c5fd" },
    { name: "Trello", value: 10, color: "#bfdbfe" },
  ];

useEffect(() => {
  const fetchAiUsage = async () => {
    try {
      setLoading(true);

      const response = await getAiUsage(trendsView);

      setAiUsage(response);
    } catch (error) {
      console.error("Error fetching AI usage:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAiUsage();
}, [trendsView]);

const weeklyBarData =
  aiUsage?.prompt_volume_weekly?.map((item) => ({
    name: item.label,
    prompts: item.count,
  })) || [];

const monthlyBarData =
  aiUsage?.prompt_volume_monthly?.map((item) => ({
    name: item.label,
    prompts: item.count,
  })) || [];

const barChartData =
  volumeView === "weekly"
    ? weeklyBarData
    : monthlyBarData;



  return ( 
    <div className={` scrollbar-hide h-full overflow-y-auto   ${ isDark ? "bg-[#010718]" : "bg-[#f5f6f8]"}`}>
   <div className={`w-full ml-0 lg:ml-[20px] mt-0 lg:mt-[10px] lg:w-[calc(100%-40px)] rounded-xl sm:rounded-2xl lg:rounded-[25px] border p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto scrollbar-hide ${ isDark ? "bg-[#060D1B] " : "bg-white border-gray-200 shadow-sm" }`} >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ">
        <h1 className={`text-lg sm:text-xl md:text-xl sm:text-2xl font-semibold  ${ isDark ? "text-[#FFFFFF]" : "text-slate-800"}`}>
          AI Usage Dashboard
        </h1>
        <span className={`text-xs sm:text-sm font-medium  ${isDark ? "text-[#586D93]" : "text-slate-400"}`}>
          (Last 30 Days)
        </span>
      </div>
      {/* ================= METRICS TOP ROW ================= */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3 sm:gap-4 lg:gap-3 sm:gap-4 sm:p-5 lg:p-6" >
        {/* Total Prompts */}
        <div
          className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-2xl border  shadow-sm ${isDark ? "bg-[#060D1B] border-[#586D93]" : " bg-white border-slate-100"} `}
        >
          <div className={`p-4 text-indigo-600  rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
            <Pencil className="w-6 h-6 fill-indigo-600 stroke-[1.5]" />

          </div>
          <div>
            <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`} >
              {aiUsage?.total_prompts ?? 0}
            </div>
            <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`} >
              Total Prompts
            </div>
          </div>
        </div>

        {/* Task Created */}
        <div
          className={`flex items-center gap-3 sm:gap-4 text-indigo-600  p-4 sm:p-5 lg:p-6 rounded-2xl border  shadow-sm ${isDark ? "bg-[#060D1B] border-[#586D93]" : " bg-white border-slate-100"} `}>
          <div className={`p-4  text-indigo-600 rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
            <ListTodo className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`}>
              {aiUsage?.total_tasks_created ?? 0}
            </div>
            <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`}>
              Task Created
            </div>
          </div>
        </div>

        {/* Task Executed */}
        <div
          className={`flex items-center gap-3 sm:gap-4 text-indigo-600  p-4 sm:p-5 lg:p-6 rounded-2xl border  shadow-sm ${isDark ? "bg-[#060D1B] border-[#586D93]" : " bg-white border-slate-100"} `}>
          <div className={`p-4  text-indigo-600 rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
            <ClipboardCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`}>
             {aiUsage?.total_tasks_executed ?? 0}
            </div>
            <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`}>
              Task Executed
            </div>
          </div>
        </div>
      </div>
      {/* ================= PROMPT VOLUME CHART ================= */}
     <div className={`p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm ${ isDark ? "bg-[#060D1B] border-[#586D93]" : "bg-white border-slate-100" }`} >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-base font-semibold ${ isDark ? "text-[#F5F7FA]" : "text-slate-800" }`} >
            Prompt Volume Chart
          </h2>
          <div className={`flex w-full sm:w-auto p-1 rounded-xl overflow-hidden border ${ isDark ? "bg-[#181F2D] " : "bg-slate-100 border-slate-200" }`} >
            {["weekly", "monthly"].map((type) => (
              <button
                key={type}
                onClick={() => setVolumeView(type)}
                className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-medium rounded-lg capitalize transition-all ${ volumeView === type ? "bg-[#4866F6] text-white shadow-sm" : isDark ? "text-[#586D93] hover:text-[#F5F7FA]" : "text-slate-500 hover:text-slate-800" }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] w-full pr-4" >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              barSize={28}
            >
              <CartesianGrid vertical={false} stroke={isDark ? "#586D93" : "#f1f5f9"} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDark ? "#586D93" : "#94a3b8", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 1000]}
                tick={{ fill: isDark ? "#586D93" : "#94a3b8", fontSize: 11 }}
                dx={-5}
              />
              <Bar dataKey="prompts" fill="#4866F6" radius={[14, 14, 14, 14]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={`text-center text-[11px] font-medium mt-4 ${ isDark ? "text-[#FFFFFF]" : "text-slate-400" }`} >
          {volumeView === "weekly" ? "No of days (Weekly)" : "Days of Month"}
        </div>
      </div>
      {/* ================= PROMPT USAGE TRENDS (DONUTS) ================= */}
      <div className={`mt-4 p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm ${ isDark ? "bg-[#060D1B] border-[#586D93]" : "bg-white border-slate-100" }`} >
        <div className="flex justify-between items-center mb-6">
         <h2 className={`text-base font-semibold ${ isDark ? "text-[#F5F7FA]" : "text-slate-800" }`} >
            Prompt Usage Trends
          </h2>
          <div className={`flex w-full sm:w-auto p-1 rounded-xl overflow-hidden border ${ isDark ? "bg-[#181F2D] " : "bg-slate-100 border-slate-200" }`} >
            {["today", "weekly", "monthly"].map((type) => (
              <button
                key={type}
                onClick={() => setTrendsView(type)}
                className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 text-[11px] sm:text-xs font-medium rounded-lg capitalize transition-all ${ trendsView === type ? "bg-[#4866F6] text-white shadow-sm" : isDark ? "text-[#8D97A9] hover:text-[#F5F7FA]" : "text-slate-500 hover:text-slate-800" }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 sm:p-5 lg:p-6" >
          {/* Top Users Intents Donut */}
          <div className={`border rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center relative ${ isDark ? "border-[#586D93]" : "border-slate-100" }`} >
            <h3 className="text-sm font-semibold text-blue-600 self-start mb-4">
              Top Users Intents
            </h3>
            <div className="w-full h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={intentsPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {intentsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color}  stroke={isDark ? "#586D93" : "#FFFFFF"} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Absolute Center Label */}
              <div className="absolute text-center pointer-events-none">
                <div className={`text-sm font-medium leading-tight ${ isDark ? "text-[#586D93]" : "text-slate-700" }`} >
                  Prompt Usage
                </div>
                <div className={`text-sm font-medium leading-tight ${ isDark ? "text-[#586D93]" : "text-slate-700" }`} >
                  Trends (100%)
                </div>
              </div>
              {/* Callout Pointer Percentages Labels */}
              <div className={`absolute top-[18%] left-[22%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                15%
              </div>
              <div className={`absolute top-[32%] right-[18%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                35%
              </div>
              <div className={`absolute bottom-[28%] left-[16%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                22%
              </div>
              <div className={`absolute bottom-[16%] right-[24%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                28%
              </div>
            </div>
            {/* Custom Grid Legend */}
            <div className={`grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full max-w-sm text-[11px] font-medium ${ isDark ? " text-[#FFFFFF] " : "text-slate-500" }`} >
              {intentsPieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-md shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Used Integrations Donut */}
         <div className={`border rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center relative ${ isDark ? "border-[#586D93]" : "border-slate-100" }`} >
            <h3 className="text-sm font-semibold text-blue-600 self-start mb-4">
              Most Used Integrations
            </h3>
            <div className="w-full h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={integrationsPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {integrationsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color}  stroke={isDark ? "#586D93" : "#FFFFFF"} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Absolute Center Label */}
              <div className="absolute text-center pointer-events-none">
                <div className={`text-sm font-medium leading-tight ${ isDark ? "text-[#586D93]" : "text-slate-700" }`} >
                  Most Used
                </div>
                <div className={`text-sm font-medium leading-tight ${ isDark ? "text-[#586D93]" : "text-slate-700" }`} >
                  Integrations (100%)
                </div>
              </div>
              {/* Callout Pointer Percentages Labels */}
              <div className={`absolute top-[18%] left-[26%] px-2 py-1 rounded-lg border shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                10%
              </div>
              <div className={`absolute top-[32%] right-[16%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                45%
              </div>
              <div className={`absolute bottom-[28%] left-[18%] px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                20%
              </div>
              <div className={`absolute bottom-[16%] right-[22%]  px-2 py-1 rounded-lg border  shadow-sm text-xs font-semibold ${isDark ? "bg-[#181F2D] border-[#4B556E33] text-[#FFFFFF] ": " bg-white  border-slate-100 text-slate-600 "} `}>
                25%
              </div>
            </div>
            {/* Custom Grid Legend */}
            <div className={`grid grid-cols-4 gap-2 mt-4 w-full text-[11px] font-medium justify-items-center ${ isDark ? "text-[#FFFFFF]" : "text-slate-500" }`} >
              {integrationsPieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-md shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ================= TASK EXECUTION SUMMARY ================= */}
      <div className="space-y-4 mt-5">
        <h2 className={`text-base font-semibold ${ isDark ? "text-[#F5F7FA]" : "text-slate-800" }`} >
          Task Execution Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3 sm:gap-4 lg:gap-3 sm:gap-4 sm:p-5 lg:p-6" >
          {/* Total Generated Tasks */}
         <div className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm ${ isDark ? "bg-[#060D1B] border-[#586D93]" : "bg-white border-slate-100" }`} >
         <div className={`p-4 text-indigo-600  rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
              <ListTodo className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`} >
                {aiUsage?.task_execution_summary?.total_generated_tasks ?? 0}
              </div>
              <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`} >
                Total Generated Tasks
              </div>
            </div>
          </div>

          {/* Successful Execution */}
          <div className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm ${ isDark ? "bg-[#060D1B] border-[#586D93]" : "bg-white border-slate-100" }`} >
             <div className={`p-4 text-indigo-600  rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
              <CheckCircle2 className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`} >
                {aiUsage?.task_execution_summary?.successful_execution ?? 0}
              </div>
               <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`} >
                Successful Execution
              </div>
            </div>
          </div>

          {/* Failed Execution */}
            <div className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 rounded-2xl border shadow-sm ${ isDark ? "bg-[#060D1B] border-[#586D93]" : "bg-white border-slate-100" }`} >
            <div className={`p-4 text-indigo-600  rounded-2xl ${isDark ? "bg-[#181F2D] " : "bg-indigo-50 "}`}>
              <XCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className={`text-xl sm:text-2xl font-bold ${ isDark ? "text-[#FFFFFF]" : "text-slate-800" }`} >
                {aiUsage?.task_execution_summary?.failed_execution ?? 0}
              </div>
               <div className={`text-sm font-medium ${ isDark ? "text-[#586D93]" : "text-slate-400" }`} >
                Failed Execution
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

  )
}

export default AiUsageDashboard   



 