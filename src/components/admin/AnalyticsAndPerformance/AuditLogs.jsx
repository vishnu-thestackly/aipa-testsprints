import React, { useState } from "react";
import { Search, Download, Calendar, Filter } from "lucide-react";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const logs = [
    {
      id: "LOG-001",
      user: "Santhosh Kumar",
      action: "Updated Intent Model parameters",
      category: "Analytics & Performance",
      ip: "192.168.1.10",
      timestamp: "2026-09-15 11:42:15",
      status: "Success",
    },
    {
      id: "LOG-002",
      user: "Admin User",
      action: "Exported Performance Insights report",
      category: "Reports",
      ip: "192.168.1.14",
      timestamp: "2026-09-15 10:15:30",
      status: "Success",
    },
    {
      id: "LOG-003",
      user: "Santhosh Kumar",
      action: "Modified API Integration Settings",
      category: "Integrations",
      ip: "192.168.1.10",
      timestamp: "2026-09-15 09:20:00",
      status: "Success",
    },
    {
      id: "LOG-004",
      user: "System",
      action: "Automated Intent Accuracy benchmark test",
      category: "System",
      ip: "127.0.0.1",
      timestamp: "2026-09-15 08:00:12",
      status: "Success",
    },
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F4F9]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            Audit Logs
          </h1>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 my-6">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#586D93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[42px] pl-10 pr-4 rounded-xl border border-[#D9DCE5] text-sm text-[#586D93] focus:outline-none focus:border-[#4866F6]"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-[42px] px-3.5 rounded-xl border border-[#D9DCE5] text-sm text-[#586D93] focus:outline-none focus:border-[#4866F6]"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="w-full overflow-x-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-[16px] border border-[#E9EDF5]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EEF2FF] text-[#586D93] text-[13px] font-medium">
                <th className="py-4 px-6 font-medium">Log ID</th>
                <th className="py-4 px-6 font-medium">User</th>
                <th className="py-4 px-6 font-medium">Action</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium">Timestamp</th>
                <th className="py-4 px-6 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F4F9] text-[14px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 font-mono text-xs text-[#586D93]">{log.id}</td>
                  <td className="py-4 px-6 font-medium text-[#1E293B]">{log.user}</td>
                  <td className="py-4 px-6 text-[#586D93]">{log.action}</td>
                  <td className="py-4 px-6 text-[#4866F6] font-medium">{log.category}</td>
                  <td className="py-4 px-6 text-[#586D93] text-xs">{log.timestamp}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7] text-[#16A34A]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
