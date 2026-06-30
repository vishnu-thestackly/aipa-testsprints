import React, { useRef } from "react";
import { useState } from "react";
import {
  Paperclip,
  Send,
  Mail,
  CheckSquare,
  Clock,
  FileText,
  MessageCircle,
  Briefcase,
  Users,
  ClipboardList,
  Bell,
  User,
} from "lucide-react";
import UpgradeIcon from "../../assets/images/UpgradeIcon.png";
import Logo from "../../assets/images/logo.png";
import audio from "../../assets/images/Audio.png";
import Sender from "../../assets/images/Sender.png";
import converstation from "../../assets/images/converstation.png";
import Clipgroup from "../../assets/images/Clipgroup.png";
// import { useNavigate } from "react-router-dom";

const actionCards = {
  draft: [
    {
      title: "Professional Email",
      description: "Write a formal email to a client or manager.",
      icon: Mail,
    },
    {
      title: "Follow-up Email",
      description: "Send a follow-up regarding previous discussions.",
      icon: Mail,
    },
    {
      title: "Leave Request",
      description: "Draft a leave request email professionally.",
      icon: Mail,
    },
  ],

  task: [
    {
      title: "Create New Task",
      description: "Add a new task with priority and deadline.",
      icon: CheckSquare,
    },
    {
      title: "Assign Task",
      description: "Assign a task to a team member.",
      icon: CheckSquare,
    },
    {
      title: "Track Progress",
      description: "Monitor the status of ongoing tasks.",
      icon: CheckSquare,
    },
  ],

  meeting: [
    {
      title: "Team Meeting",
      description: "Schedule a meeting with your team.",
      icon: Clock,
    },
    {
      title: "Client Meeting",
      description: "Arrange a meeting with a client.",
      icon: Clock,
    },
    {
      title: "Project Review",
      description: "Set up a project review discussion.",
      icon: Clock,
    },
  ],

  reminder: [
    {
      title: "Personal Reminder",
      description: "Create a reminder for personal activities.",
      icon: FileText,
    },
    {
      title: "Work Reminder",
      description: "Set reminders for important work tasks.",
      icon: FileText,
    },
    {
      title: "Meeting Reminder",
      description: "Receive alerts before meetings start.",
      icon: FileText,
    },
  ],
};

export default function Conversation({ setCurrentPage }) {
  const [selectedAction, setSelectedAction] = useState("");
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const handleSend = () => {
    if (message.trim() !== "") {
      setCurrentPage("messenger");
    }
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide">
      {/* Main Container */}

      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] lg:rounded-[25px] border border-[#DADADA] bg-white p-3 sm:p-4 md:p-5 lg:p-6 shadow-[0px_0px_4px_0px_#00000014]">
          {/* Upgrade Banner */}
          <div className="flex justify-center mt-2 pt-6 md:pt-8 lg:pt-[50px]">
            <div className="px-3 sm:px-4 py-2 bg-[#F4F4F4] rounded-full text-[10px] sm:text-xs md:text-sm text-[#666] flex items-center gap-2 text-center">
              <img src={UpgradeIcon} alt="Upgrade" className="w-4 h-4" />

              <span className="text-[#4866F6] font-medium">Upgrade</span>

              <span>free plan to Basic or premium access</span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex flex-col items-center text-center pt-[20px]">
            {/* Logo */}
            <div className="mb-6">
              <img
                src={Logo}
                alt="Logo"
                className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] object-contain mx-auto"
              />
            </div>

            {/* Heading */}
            <h1 className="text-[16px] md:text-[22px] lg:text-[24px] font-semibold text-[#3A3A3A]">
              Good Morning, Santosh
            </h1>

            <h2 className="text-[16px] md:text-[22px] lg:text-[24px] font-semibold mt-1">
              How can I{" "}
              <span className="text-[#4866F6]">Assist You Today?</span>
            </h2>

            {/* Message Input */}
            <div className="w-full max-w-full md:max-w-[620px] lg:max-w-[820px] mt-8 lg:mt-12 flex items-center gap-2">
              {/* Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    console.log("Selected file:", file);
                    // You can upload the file here
                  }
                }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] lg:w-[58px] lg:h-[58px] cursor-pointer border border-[#4866F6] bg-[#F8FAFF] rounded-[12px] sm:rounded-[16px] lg:rounded-[18px] flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={Clipgroup}
                  alt="Clipgroup"
                  className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] lg:w-[30px] lg:h-[30px]"
                />
              </button>

              {/* Input Box */}
              <div className="flex-1 min-w-0 h-[42px] sm:h-[52px] lg:h-[58px] border border-[#4866F6] bg-[#F8FAFF] rounded-[12px] sm:rounded-[16px] lg:rounded-[18px] px-2 sm:px-4 lg:px-5 flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Type your message here..."
                  className="flex-1 min-w-0 bg-transparent outline-none text-[11px] sm:text-[14px] lg:text-[15px] text-[#444] placeholder:text-[#888]"
                />
                <button className="flex items-center justify-center flex-shrink-0">
                  <img
                    src={audio}
                    alt="audio"
                    className="w-[16px] h-[16px] sm:w-[26px] sm:h-[26px] lg:w-[32px] lg:h-[32px]"
                  />
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] lg:w-[58px] lg:h-[58px] bg-[#4866F6] cursor-pointer rounded-[12px] sm:rounded-[16px] lg:rounded-[18px] flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={Sender}
                  alt="Sender"
                  className="w-[18px] h-[18px] sm:w-[28px] sm:h-[28px] lg:w-[32px] lg:h-[32px]"
                />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-3 mt-6 w-full max-w-[590px] mx-auto">
            <button
              onClick={() => setSelectedAction("draft")}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#EEF2FF] cursor-pointer text-[#4866F6] rounded-lg text-[11px] sm:text-sm hover:bg-[#4866F6] hover:text-white transition-all duration-300"
            >
              <Mail size={16} />
              Draft Email
            </button>

            <button
              onClick={() => setSelectedAction("task")}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#EEF2FF] cursor-pointer text-[#4866F6] rounded-lg text-[11px] sm:text-sm hover:bg-[#4866F6] hover:text-white transition-all duration-300"
            >
              <CheckSquare size={16} />
              Create Task
            </button>

            <button
              onClick={() => setSelectedAction("meeting")}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#EEF2FF] cursor-pointer text-[#4866F6] rounded-lg text-[11px] sm:text-sm hover:bg-[#4866F6] hover:text-white transition-all duration-300"
            >
              <Clock size={16} />
              Schedule Meeting
            </button>

            <button
              onClick={() => setSelectedAction("reminder")}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#EEF2FF] cursor-pointer text-[#4866F6] rounded-lg text-[11px] sm:text-sm hover:bg-[#4866F6] hover:text-white transition-all duration-300"
            >
              <FileText size={16} />
              Create Reminder
            </button>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-[#E5E7EB] mt-8"></div>

          {/* Selected Action Message */}
          {selectedAction && (
            <div className="mt-6 max-w-[1000px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actionCards[selectedAction].map((card, index) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={index}
                      className="bg-[#F7F7F7] rounded-xl p-4 min-h-[120px] border border-[#E5E7EB] hover:border-[#4866F6] hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Icon size={20} className="text-[#4866F6] mb-3" />

                      <h3 className="font-semibold text-[#444]">
                        {card.title}
                      </h3>

                      <p className="text-sm text-[#8A8A8A] mt-2">
                        {card.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Floating Chat Button */}
          <div className="relative col-span-1 md:col-span-2 lg:col-span-3 h-20">
            <button className="absolute right-2 bottom-2 lg:right-6 lg:bottom-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#4866F6] flex items-center justify-center shadow-lg">
              <img
                src={converstation}
                alt="conversation"
                className="w-12 h-12 lg:w-[60px] lg:h-[60px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
