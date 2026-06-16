import { useEffect, useState } from "react";
import { getSystemHealth, getSystemServices  } from "../../api/authApi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import export_icon from '../../assets/images/export_icon.svg';
import refresh from '../../assets/images/refresh.svg';
import error_status from '../../assets/images/error_status.svg';
import api_status from '../../assets/images/api_status.svg';
import server_status from '../../assets/images/server_status.svg';
import user_status from '../../assets/images/user_status.svg';
import Mail from '../../assets/images/Mail_status.svg';
import Check_status from '../../assets/images/Check_status.svg';
import Database from '../../assets/images/Database.svg';
import api_plug from '../../assets/images/api_plug.svg';
import warning_status from '../../assets/images/warning_status.svg';
import danger_status from '../../assets/images/danger_status.svg';
import success_status from '../../assets/images/success_status.svg';

export default function Configurations() {
     
     const card_style = "h-[100px] md:h-[120px] rounded-[25px] bg-white flex items-center gap-3 md:gap-[15px] px-4 md:px-[15px] border border-[#E2E2E2]";
     const icon_bg ="w-[55px] h-[55px] md:w-[70px] md:h-[70px] rounded-full bg-[#E4E8FE] flex items-center justify-center";
     const head_text = "text-[18px] md:text-[20px] font-semibold leading-none tracking-[0.02em] text-[#3D3D3D]"
     const sub_head_text ="text-[14px] md:text-[16px] font-normal leading-none tracking-[0.02em] text-[#586D93] mt-1"



       const [health, setHealth] = useState(null);
       const [loading, setLoading] = useState(true);
       const [services, setServices] = useState([]);
       const [refreshing, setRefreshing] = useState(false);
       const serviceIcons = {
  Database,
  Authentication: Check_status,
  "Email Service": Mail,
  "Integration API": api_plug,
};
       const isOnline = health?.server_status.toLowerCase() === "online";


       // Refresh btn api call func
       const handleRefresh = async () => {
  try {
    setRefreshing(true);

    const [healthResponse, servicesResponse] = await Promise.all([
      getSystemHealth(),
      getSystemServices(),
    ]);

    setHealth(healthResponse);
    setServices(servicesResponse);

    console.log("Health:", healthResponse);
    console.log("Services:", servicesResponse);
  } catch (error) {
    console.error("Failed to refresh data:", error);
  } finally {
    setRefreshing(false);
  }
};



         useEffect(() => {
              const loadData = async () => {
                try {
                  const [healthResponse, servicesResponse] = await Promise.all([
                    getSystemHealth(),
                    getSystemServices(),
                  ]);
                
                  setHealth(healthResponse);
                  setServices(servicesResponse);
                
                  console.log("Health:", healthResponse);
                  console.log("Services:", servicesResponse);
                } catch (error) {
                  console.error("Failed to load data:", error);
                } finally {
                  setLoading(false);
                }
              };
            
              loadData();
            }, []);

           if (loading) {
              return (
                <div className="flex items-center justify-center h-full">
                  Loading system health...
                </div>
              );
            }


            const handleExport = () => {
  try {
    // System Health Sheet
    const healthData = [
      {

        "Server Status":
  health?.server_status || "Unknown",

"API Response":
  `${health?.api_response_percent || 0}%`,
  "Active Users": health?.active_users || 0,

"Error Rate":
  `${health?.error_rate_percent || 0}%`,
    //     "Server Status": health?.server_status === "online"
    // ? "Online"
    // : "Offline",
    //     "API Response": health?.api_response || "0%",
    //     "Active Users": health?.active_users || 0,
    //     "Error Rate": health?.error_rate || "0%",
      },
    ];

    // Service Status Sheet
    const serviceData = services.map((service) => ({
      "Service Name": service.service_name,
      Status: service.status,
      Load: `${service.load_percent}%`,
      Uptime: `${service.uptime_percent}%`,
    }));

    // Create Workbook
    const workbook = XLSX.utils.book_new();

    // Health Sheet
    const healthSheet = XLSX.utils.json_to_sheet(healthData);
    XLSX.utils.book_append_sheet(
      workbook,
      healthSheet,
      "System Health"
    );

    // Service Sheet
    const serviceSheet = XLSX.utils.json_to_sheet(serviceData);
    XLSX.utils.book_append_sheet(
      workbook,
      serviceSheet,
      "Service Status"
    );

    // Generate file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      file,
      `Configuration_Report_${new Date()
        .toISOString()
        .split("T")[0]}.xlsx`
    );
  } catch (error) {
    console.error("Export failed:", error);
  }
};

   // refresh timmings

   const getTimeAgo = (dateString) => {
  if (!dateString) return "-";

  const now = new Date();
  const updated = new Date(dateString);

  const diffMinutes = Math.floor(
    (now - updated) / (1000 * 60)
  );

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes === 1) return "1 min ago";

  return `${diffMinutes} mins ago`;
};

  return (
    <div className='h-[100%] overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide'>
      <div className='w-full flex  flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040] '>
          <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Left Section */}
                <h2 className="text-[16px] md:text-[18px] font-medium text-[#3D3D3D] leading-none">
                  System Health overview
                </h2>

                {/* Right Section */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <span className="text-[12px] md:text-[14px] font-normal leading-none tracking-[0.02em] text-[#586D93]">
                    Last Updated {getTimeAgo(health?.last_updated)}
                  </span>

                  <button onClick={handleRefresh} className=" w-full sm:w-[142px] h-[40px] md:h-[44px] rounded-[25px] bg-[#4866F6] px-[25px] py-[14.5px] flex items-center justify-center gap-[10px] text-[14px] md:text-[16px] text-white cursor-pointer">
                    {refreshing ? "Refreshing..." : "Refresh"} <span> <img src={refresh} alt="Refresh" className='w-6 h-6' /> </span>
                  </button>

                  <button onClick={handleExport} className="w-full sm:w-[134px] h-[40px] md:h-[44px] rounded-[5px] bg-[#4866F6] px-[25px] py-[14.5px] flex items-center justify-center gap-[10px] text-[14px] md:text-[16px] text-white cursor-pointer">
                    Export <span> <img src={export_icon} alt="Export_Icon" /> </span>
                  </button>
                </div>

              </div>
            </div>

            {/* Stats Cards */}
            <div className="px-4 md:px-5 lg:px-7">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                {/* Server Status */}
                <div className={card_style}>
                  <div className={icon_bg}>
                    <img src={server_status} alt="Server" className="w-7 h-7 md:w-[36px] md:h-[36px]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-[#34C759]" : "bg-red-500"}`}></span>
                      <span className={head_text}>
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>

                    <p className={sub_head_text}>
                      Server Status
                    </p>
                  </div>
                </div>

                {/* API Response */}
                <div className={card_style}>
                  <div className={icon_bg}>
                    <img src={api_status} alt="API" className="w-7 h-7 md:w-[36px] md:h-[36px]" />
                  </div>

                  <div>
                    <h3 className={head_text}>
                      {health?.api_response_percent || "0"}%
                    </h3>

                    <p className={sub_head_text}>
                      API Response
                    </p>
                  </div>
                </div>

                {/* Active Users */}
                <div className={card_style}>
                  <div className={icon_bg}>
                    <img src={user_status} alt="Users" className="w-7 h-7 md:w-[36px] md:h-[36px]" />
                  </div>

                  <div>
                    <h3 className={head_text}>
                      {health?.active_users || 0}
                    </h3>

                    <p className={sub_head_text}>
                      Active users
                    </p>
                  </div>
                </div>

                {/* Error Rate */}
                <div className={card_style}>
                  <div className={icon_bg}>
                    <img src={error_status} alt="Error" className="w-7 h-7 md:w-[36px] md:h-[36px]" />
                  </div>

                  <div>
                    <h3 className={head_text}>
                      {health?.error_rate || "0%"}
                    </h3>

                    <p className={sub_head_text}>
                      Error Rate
                    </p>
                  </div>
                </div>

              </div>
            </div>
            {/* Service Status */}
                <div className="mx-4 md:mx-5 lg:mx-7 rounded-[20px] md:rounded-[25px] border border-[#E2E2E2] bg-white p-5">
                  {/* Title */}
                  <h2 className="text-[18px] font-medium text-[#3D3D3D]">
                    Service Status
                  </h2>

                  <div className="mt-4 border-b border-[#CFCFCF]" />

                  {/* Table */}
                  <div className="mt-5 overflow-x-auto md:overflow-visible rounded-[15px] border border-[#D9D9D9] blue-scrollbar">
                  <table className="w-full min-w-[700px] md:min-w-0">
                    <thead>
                      <tr className="h-[58px] bg-[#EEF0FF]">
                        <th className="text-center text-[16px] font-normal text-[#3D3D3D]">
                          SL No
                        </th>

                        <th className="text-left pl-4 md:pl-6 lg:pl-10 text-[16px] font-normal text-[#3D3D3D]">
                          Service Name
                        </th>

                        <th className="text-center text-[16px] font-normal text-[#3D3D3D]">
                          Status
                        </th>

                        <th className="text-center text-[16px] font-normal text-[#3D3D3D]">
                          Load
                        </th>

                        <th className="text-center text-[16px] font-normal text-[#3D3D3D]">
                          Uptime
                        </th>
                      </tr>
                    </thead>

                    <tbody>
  {services?.map((service, index) => (
    <tr
      key={index}
      className="h-[48px] border-t border-[#E2E2E2]"
    >
      <td className="text-center text-[#586D93]">
        {index + 1}
      </td>

      <td className="pl-4 md:pl-6 lg:pl-10">
        <div className="flex items-center gap-2 text-[#586D93]">
          <img
            src={serviceIcons[service.service_name] || Database}
            alt={service.service_name}
            className="w-5 h-5"
          />
          <span>{service.service_name}</span>
        </div>
      </td>

      <td className="text-center">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1 ${
            service.status === "Healthy"
              ? "bg-[#EAF7EF] text-[#34A853]"
              : service.status === "Warning"
              ? "bg-[#FFF4E5] text-[#F59E0B]"
              : "bg-[#FFE5E5] text-[#FB0000]"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              service.status === "Healthy"
                ? "bg-[#34A853]"
                : service.status === "Warning"
                ? "bg-[#F59E0B]"
                : "bg-[#FB0000]"
            }`}
          />
          {service.status}
        </span>
      </td>

      <td className="text-center text-[#586D93]">
        {service.load_percent}%
      </td>

      <td className="text-center text-[#586D93]">
        {service.uptime_percent}%
      </td>
    </tr>
  ))}
</tbody>
                  </table>
                </div>
                </div>

{/* Recent Alerts */}
<div className="mx-4 md:mx-5 lg:mx-7 mb-4 md:mb-5 lg:mb-7 rounded-[20px] md:rounded-[25px] border border-[#E2E2E2] bg-white p-5">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <h2 className="text-[18px] font-medium text-[#3D3D3D]">
      Recent Alerts
    </h2>

    <button className="w-full sm:w-auto h-[40px] px-6 rounded-[20px] bg-[#4866F6] text-white text-[14px] md:text-[16px] cursor-pointer">
      Clear All
    </button>
  </div>

  <div className="mt-4 border-b border-[#CFCFCF]" />

  {/* Alert Cards */}
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* Alert 1 */}
    <div className="relative h-[88px] rounded-[8px] border border-[#F59E0B] bg-[#FDF5E6] p-4">
  <button className="w-4 h-4 absolute top-2 right-2 cursor-pointer flex items-center justify-center rounded-full bg-[#FF4D4F] text-[10px] text-white ">
    X
  </button>

  <div className="flex flex-col justify-between h-full">
    <img
      src={warning_status}
      alt="Warning"
      className="w-5 h-5"
    />

    <p className="text-[14px] text-[#F59E0B]">
      Email Queue delayed detected
    </p>
  </div>
</div>

    {/* Alert 2 */}
    <div className="relative h-[88px] rounded-[8px] border border-[#FB0000] bg-[#FF00001A] p-4">
  <button className="w-4 h-4 absolute top-2 right-2 cursor-pointer flex items-center justify-center rounded-full bg-[#FB0000] text-[10px] text-white ">
    X
  </button>

  <div className="flex flex-col justify-between h-full">
    <img
      src={danger_status}
      alt="Warning"
      className="w-5 h-5"
    />

    <p className="text-[14px] text-[#FB0000]">
      High CPU usage
    </p>
  </div>
</div>

    {/* Alert 3 */}
    <div className="relative h-[88px] rounded-[8px] border border-[#33B469] bg-[#33B4691A] p-4">
  <button className="w-4 h-4 absolute top-2 right-2 cursor-pointer flex items-center justify-center rounded-full bg-[#FB0000] text-[10px] text-white ">
    X
  </button>

  <div className="flex flex-col justify-between h-full">
    <img
      src={success_status}
      alt="Warning"
      className="w-5 h-5"
    />

    <p className="text-[14px] text-[#33B469]">
      Back up Completed
    </p>
  </div>
</div>

  </div>
</div>


          </div>
            
    </div>
  )
}
