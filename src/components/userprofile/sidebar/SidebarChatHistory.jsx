import React, { useState } from "react";

export default function SidebarChatHistory() {
  const conversations = [
    "What's on my schedule today?",
    "Set a reminder for the client call.",
    "Draft an email to my manager.",
    "Create a task for UI audit review.",
    "Show my pending tasks.",
  ];

  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="w-full flex flex-col min-h-0 select-none">
      {/* Divider */}
      <div className="w-full border-t border-[#E5E7EB] my-4 lg:my-5" />

      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-[14px]">
        <span className="text-[14px] font-semibold text-[#586D93]">
          Chat History
        </span>
       <button className="text-[#586D93] hover:text-[#4866F6] transition-colors duration-200 focus:outline-none cursor-pointer">
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[18px] h-[18px] cursor-pointer"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
</button>
      </div>

      {/* Scrollable Conversation List */}
      <div className="flex flex-col gap-[10px] overflow-y-auto no-scrollbar max-h-[220px]">
        {conversations.map((chat, index) => {
          const isActive = activeChat === index;
          return (
            <div
              key={index}
              onClick={() => setActiveChat(index)}
              className={`w-full text-left text-[14px] leading-relaxed cursor-pointer rounded-lg px-[10px] py-[8px] transition-all duration-200 truncate ${
  isActive
    ? "bg-[#4866F6] text-white font-medium"
    : "text-[#586D93] hover:bg-[#4866F6] hover:text-white"
}`}
              title={chat}
            >
              {chat}
            </div>
          );
        })}
      </div>
    </div>
  );
}
