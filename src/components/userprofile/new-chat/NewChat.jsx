// =============================================================================
// New Chat — assistant start screen inside the user profile layout
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.svg";
import FileUpload from "../../../assets/images/FileUpload.png";
import Audio from "../../../assets/images/Audio.png";
import EnterFrame from "../../../assets/images/EnterFrame.png";
import Sparkle from "../../../assets/images/newchat_sparkle.svg";
import NewChatMail from "../../../assets/images/newchat_mail.svg";
import NewChatTask from "../../../assets/images/newchat_task.svg";
import NewChatMeeting from "../../../assets/images/newchat_meeting.svg";
import NewChatReminder from "../../../assets/images/newchat_reminder.svg";
import { sendChatMessage } from "../../../api/authApi";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const QUICK_ACTIONS = [
  {
    type: "email",
    label: "Draft email",
    icon: NewChatMail,
    cardTitle: "Draft Email",
    cardDescription: "Draft a professional email to your contact.",
  },
  {
    type: "task",
    label: "Create Task",
    icon: NewChatTask,
    cardTitle: "Pending Task",
    cardDescription: "Prepare Wireframe Design for AIPA by Tomorrow 2:00 PM",
  },
  {
    type: "meeting",
    label: "Schedule Meeting",
    icon: NewChatMeeting,
    cardTitle: "Meeting Scheduled",
    cardDescription: "Meeting Scheduled with martin @3:00PM",
  },
  {
    type: "reminder",
    label: "Create Reminder",
    icon: NewChatReminder,
    cardTitle: "Reminder Created",
    cardDescription: "Reminder set for your selected task",
  },
];

// -----------------------------------------------------------------------------
// NewChat — static start screen with greeting, composer, and quick actions
// -----------------------------------------------------------------------------
export default function NewChat({ languageOpen }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [actionCards, setActionCards] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setActionCards((prevCards) => prevCards.slice(0, 3));
    }
  }, [isDesktop]);

  const handleQuickActionClick = (action) => {
    setActionCards((prevCards) => {
      const maxCards = isDesktop ? 3 : 4;
      const cardsWithoutDuplicate = prevCards.filter(
        (card) => card.type !== action.type,
      );

      return [action, ...cardsWithoutDuplicate].slice(0, maxCards);
    });
  };

  const handleStartConversation = async () => {
  const message = input.trim();

  if (!message) return;

  try {
    const response = await sendChatMessage({
      conversation_id: 0,
      message,
    });

    navigate(`/user/chat/${response.conversation_id}`, {
      state: {
        firstMessage: message,
        aiReply: response.reply,
      },
    });

  } catch (error) {
    console.error("Failed to start conversation:", error);
  }
};

  return (
    <div
      className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* Main card */}
      <div className="relative flex min-h-[calc(100vh-150px)] flex-col rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white md:p-6 pb-20 md:pb-20 shadow-[0px_0px_4px_0px_#00000014]">
        <div className="flex flex-1 flex-col items-center px-5 pt-[clamp(42px,8vh,90px)]">
          {/* Upgrade badge */}
          <div className="flex h-7 items-center gap-1 rounded-full bg-[#F3F3F3] px-4 max-[400px]:py-5 text-[12px] sm:text-[13px] text-black">
            <img src={Sparkle} alt="" className="h-3.5 w-3.5" />
            <span>
              <span className="font-semibold text-[#4866F6]">Upgrade</span> free
              plan to Basic or premium access
            </span>
          </div>

          {/* Assistant logo */}
          <img
            src={Logo}
            alt="Personal Assistant"
            className="mt-6 h-[58px] w-[70px] object-contain sm:h-[75px] sm:w-[105px]"
          />

          {/* Greeting text */}
          <div className="mt-5 text-center">
            <h1 className="text-[22px] font-semibold leading-tight text-[#2D2D2D] sm:text-[26px]">
              Good Morning, Santosh
            </h1>
            <p className="mt-1 text-[22px] font-semibold leading-tight text-[#2D2D2D] sm:text-[26px]">
              How can I{" "}
              <span className="text-[#4866F6]">Assist You Today?</span>
            </p>
          </div>

          {/* Message composer */}
          <div className="mt-12 w-full max-w-[780px]">
            <div className="flex items-center gap-2">
              {/* File upload button */}
              <button
                type="button"
                className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
                aria-label="Upload file"
              >
                <img src={FileUpload} alt="" className="h-6 w-6" />
              </button>

              {/* Input box */}
              <div className="flex h-13 min-w-0 flex-1 items-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] px-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleStartConversation();
                    }
                  }}
                  placeholder="Type your message here...."
                  className="min-w-0 flex-1 bg-transparent text-[12px] sm:text-[14px] text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D]"
                />
                <button
                  type="button"
                  className="flex md:hidden shrink-0 items-center justify-center cursor-pointer ml-2"
                  aria-label="Record audio"
                >
                  <img src={Audio} alt="" className="h-6.5 w-6.5" />
                </button>
              </div>

              {/* Audio button — tablet & desktop only */}
              <button
                type="button"
                className="hidden md:flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
                aria-label="Record audio"
              >
                <img src={Audio} alt="" className="h-6.5 w-6.5" />
              </button>

              {/* Send button */}
              <button
                type="button"
                onClick={handleStartConversation}
                className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-[#4866F6] cursor-pointer"
                aria-label="Send message"
              >
                <img src={EnterFrame} alt="" className="h-6 w-6" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="sm:mt-6 mt-12 grid grid-cols-2 gap-3 sm:gap-3 xl:gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleQuickActionClick(action)}
                  className="flex h-8 items-center gap-1.5 rounded-lg bg-[#edf0fe] px-2 text-left text-[14px] text-[#4866F6] cursor-pointer"
                >
                  <img
                    src={action.icon}
                    alt=""
                    className="h-3.5 w-3.5 shrink-0"
                  />
                  <span className="truncate">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Quick action cards */}
            {actionCards.length > 0 && (
              <div className="mt-8">
                <div className="hidden xl:border-t border-[#D9D9D9]"></div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {actionCards.map((action) => (
                    <div
                      key={action.type}
                      className="rounded-[10px] bg-[#F4F4F4] px-4 py-5"
                    >
                      <img src={action.icon} alt="" className="h-6 w-6" />

                      <h3 className="mt-3 text-[15px] font-semibold text-[#2D2D2D]">
                        {action.cardTitle}
                      </h3>

                      <p className="mt-1 text-[14px] leading-7 text-[#586D93]">
                        {action.cardDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
