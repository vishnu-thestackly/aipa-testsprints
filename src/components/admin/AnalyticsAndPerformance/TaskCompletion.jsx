import React, { useState } from "react";
import AuditAlert from "../../../assets/images/AuditAlert.svg";
import ApplyFilter from "../../../assets/images/ApplyFilter.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Completed from "../../../assets/images/completed.svg";
import TotalTaskAnalytics from "../../../assets/images/TotalTaskAnalytics.svg";

const TaskCompletion = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [intent, setIntent] = useState("All");
  const [integration, setIntegration] = useState("All");

  const handleApply = () => {
    console.log({
      startDate,
      endDate,
      intent,
      integration,
    });
  };

  const initialTaskData = [
    {
      id: 1,
      type: "Schedule Meeting",
      created: "5,120",
      completed: "4,780",
      failed: "340",
      rate: "93.5%",
      trend: "up",
    },
    {
      id: 2,
      type: "Create Task",
      created: "4,850",
      completed: "4,420",
      failed: "430",
      rate: "91.1%",
      trend: "up",
    },
    {
      id: 3,
      type: "Draft Email",
      created: "4,620",
      completed: "4,050",
      failed: "570",
      rate: "87.5%",
      trend: "same",
    },
    {
      id: 4,
      type: "Set Reminder",
      created: "4,150",
      completed: "3,950",
      failed: "660",
      rate: "84.5%",
      trend: "down",
    },
  ];

  const integrations = [
    {
      name: "Outlook",
      percentage: 92,
    },
    {
      name: "Jira",
      percentage: 86,
    },
    {
      name: "Exchange",
      percentage: 89,
    },
    {
      name: "Trello",
      percentage: 81,
    },
  ];

  const filteredTasks = initialTaskData.filter((task) => {
    if (intent !== "All" && task.type !== intent) {
      return false;
    }
    return true;
  });

  const TrendIcon = ({ type }) => {
    const styles = {
      up: "bg-[#DFF8EB] text-[#48C98B]",
      same: "bg-[#FFF0D9] text-[#F3A646]",
      down: "bg-[#FFE1E1] text-[#FF6464]",
    };

    const icons = {
      up: "↑",
      same: "→",
      down: "↓",
    };

    return (
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${styles[type]}`}
      >
        {icons[type]}
      </span>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto p-3 text-[#333] sm:p-4 lg:p-5">
      {/* Main Container */}
      <div className="w-full rounded-[20px] border-b border-gray-200 bg-white p-3 shadow-[0px_1px_4px_0px_#00000040] sm:p-4 md:rounded-[25px] lg:p-5">
        {/* Header */}
        <div className="pb-4 sm:pb-5 md:pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#1E293B]">
            Task Completion Analytics
          </h1>
        </div>

        {/* Filters */}
        <div className="mt-5 sm:mt-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-4">
            {/* Filter Fields */}
            <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date Range */}
              <div className="min-w-0">
                <label className="block text-[12px] sm:text-[14px] font-medium text-black mb-1.5">
                  Date Range
                </label>

                <div className="relative w-full">
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    placeholderText="Select Date"
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    className="h-8 sm:h-9 w-full cursor-pointer rounded-md border border-[#DFE3EB] bg-white px-2 pr-8
                               text-[10px] sm:text-[12px] text-[#7D8797] outline-none
                               transition focus:border-[#4D68E8] focus:ring-1 focus:ring-[#4D68E8]"
                    wrapperClassName="w-full"
                    popperClassName="z-[9999]"
                  />

                  {/* Calendar Icon */}
                  <svg
                    className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-[#7890AD]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
              </div>

              {/* Task Type */}
              <div className="min-w-0">
                <label className="block text-[12px] sm:text-[14px] font-medium text-black mb-1.5">
                  Task Type
                </label>

                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="h-8 sm:h-9 w-full rounded-md border border-[#DFE3EB] bg-white px-2 text-[10px] sm:text-[12px] text-[#7D8797] outline-none focus:border-[#4D68E8] focus:ring-1 focus:ring-[#4D68E8]"
                >
                  <option value="All">All</option>
                  <option value="Schedule Meeting">Schedule Meeting</option>
                  <option value="Create Task">Create Task</option>
                  <option value="Draft Email">Draft Email</option>
                  <option value="Set Reminder">Set Reminder</option>
                </select>
              </div>

              {/* Integration */}
              <div className="min-w-0">
                <label className="block text-[12px] sm:text-[14px] font-medium text-black mb-1.5">
                  Integration
                </label>

                <select
                  value={integration}
                  onChange={(e) => setIntegration(e.target.value)}
                  className="h-8 sm:h-9 w-full rounded-md border border-[#DFE3EB] bg-white px-2 text-[10px] sm:text-[12px] text-[#7D8797] outline-none focus:border-[#4D68E8] focus:ring-1 focus:ring-[#4D68E8]"
                >
                  <option value="All">All</option>
                  <option value="Outlook">Outlook</option>
                  <option value="Jira">Jira</option>
                  <option value="Exchange">Exchange</option>
                  <option value="Trello">Trello</option>
                </select>
              </div>
            </div>

            {/* Apply Button */}
            <div className="shrink-0">
              <button
                onClick={handleApply}
                className="h-8 sm:h-9 w-[100px] rounded-md bg-[#4866F6] px-4 text-[11px] sm:text-[12px] font-medium text-white
                           flex items-center justify-center gap-2 transition-all hover:bg-[#3855E5] active:scale-[0.98] cursor-pointer"
              >
                <img
                  src={ApplyFilter}
                  alt=""
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                />
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#CFCFCF] w-full mb-6 sm:mb-8" />

        {/* Summary Cards */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Total Tasks */}
          <div className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#EDF0F5] p-3">
            <img
              src={TotalTaskAnalytics}
              alt="Total Tasks"
              className="h-10 w-10 shrink-0"
            />
            <div>
              <div className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1E293B]">
                18,740
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#5B5B5B]">
                Total Tasks
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#EDF0F5] p-3">
            <img
              src={Completed}
              alt="Completed"
              className="h-10 w-10 shrink-0"
            />
            <div>
              <div className="text-[11px] sm:text-[12px] text-[#5B5B5B]">
                Completed
              </div>
              <div className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1E293B]">
                16,740
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#5B5B5B]">
                89.5%
              </div>
            </div>
          </div>

          {/* Failed */}
          <div className="flex min-h-[64px] items-center gap-3 rounded-xl border border-[#EDF0F5] p-3">
            <img src={AuditAlert} alt="Failed" className="h-10 w-10 shrink-0" />
            <div>
              <div className="text-[11px] sm:text-[12px] text-[#5B5B5B]">
                Failed
              </div>
              <div className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1E293B]">
                2000
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#5B5B5B]">
                10%
              </div>
            </div>
          </div>
        </div>

        {/* Complete By Task Type */}
        <section className="mb-6">
          <div className="border-b border-[#DEDEDE] pb-2">
            <h3 className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-medium text-[#1E293B]">
              Complete By Task Type
            </h3>
          </div>

          {/* Mobile horizontal scroll */}
          <div
            className="mt-4 w-full overflow-x-auto rounded-[12px] sm:rounded-[16px] border border-[#CFCFCF]
            scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarColor: "#4866F6 #e5e5e5",
              scrollbarWidth: "thin",
            }}
          >
            <table className="w-full min-w-[700px] table-fixed text-left border-collapse">
              <thead>
                <tr className="w-full bg-[#eef0ff] text-[#454f6d]">
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px] w-[80px]">
                    SL No
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px]">
                    Task Type
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px]">
                    Created
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px]">
                    Completed
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px]">
                    Failed
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px]">
                    Completion Rate
                  </th>
                  <th className="py-3 sm:py-4 px-3 sm:px-5 md:px-6 font-medium text-[10px] sm:text-[12px] md:text-[14px] w-[90px] text-center">
                    Trend
                  </th>
                </tr>
              </thead>

              <tbody className="text-[10px] sm:text-[12px] md:text-[14px]">
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#506DA0]">
                      {task.id}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#5D769F]">
                      {task.type}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#5D769F]">
                      {task.created}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#5D769F]">
                      {task.completed}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#5D769F]">
                      {task.failed}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-[#5D769F]">
                      {task.rate}
                    </td>
                    <td className="h-7 border-b border-[#E9EBEF] py-3 sm:py-4 px-3 sm:px-5 md:px-6 text-center">
                      <TrendIcon type={task.trend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Completion By Integration */}
        <section>
          <div className="border-b border-[#DEDEDE] pb-2">
            <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-medium text-[#1E293B]">
              Completion By Integration
            </h3>
          </div>

          <div className="mt-3 w-full px-2 sm:px-4 md:px-6 py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-5">
              {integrations.map((item) => (
                <div key={item.name} className="min-w-0 w-full">
                  {/* Integration Name */}
                  <div className="mb-1 text-[11px] sm:text-[12px] md:text-[13px] font-medium text-[#414141] truncate">
                    {item.name}
                  </div>

                  {/* Progress Bar */}
                  <div className="h-[7px] sm:h-[8px] w-full overflow-hidden rounded-full bg-[#E3E6EB]">
                    <div
                      className="h-full rounded-full bg-[#4866F6] transition-all duration-300"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  {/* Percentage */}
                  <div className="mt-1 text-center text-[10px] sm:text-[11px] md:text-[12px] font-medium text-[#303030]">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskCompletion;
