// =============================================================================
// New Chat Conversation
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AiChat from "../../../assets/images/aichat.svg";
import Profile from "../../../assets/images/profile.png";
import FileUpload from "../../../assets/images/FileUpload.png";
import Audio from "../../../assets/images/Audio.png";
import EnterFrame from "../../../assets/images/EnterFrame.png";
import ChatSpeaker from "../../../assets/images/chat_speaker.png";
import ChatCopy from "../../../assets/images/chat_copy.png";
import ChatSave from "../../../assets/images/chat_save.png";
import ChatShare from "../../../assets/images/chat_share.png";
import ChatEdit from "../../../assets/images/chat_edit.svg";

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------
const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

// -----------------------------------------------------------------------------
// NewChatConversation — conversation page wrapper
// -----------------------------------------------------------------------------
export default function NewChatConversation({ languageOpen }) {
  const location = useLocation();
  const firstMessage = location.state?.firstMessage || "";
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [messages, setMessages] = useState(() => [
    ...(firstMessage
      ? [
          {
            id: "first-user-message",
            type: "user",
            text: firstMessage,
            time: getCurrentTime(),
          },
        ]
      : []),
    {
      id: "bot-starter",
      type: "bot",
      text: "What would you like to do today?",
      time: getCurrentTime(),
    },
  ]);

  const handleSend = () => {
    const message = input.trim();

    if (!message) return;

    if (editingMessageId) {
      setMessages((prevMessages) =>
        prevMessages.map((prevMessage) =>
          prevMessage.id === editingMessageId
            ? {
                ...prevMessage,
                text: message,
                time: getCurrentTime(),
              }
            : prevMessage,
        ),
      );
      setEditingMessageId(null);
      setInput("");
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: `user-${Date.now()}`,
        type: "user",
        text: message,
        time: getCurrentTime(),
      },
    ]);
    setInput("");
  };

  const handleEditMessage = (message) => {
    setEditingMessageId(message.id);
    setInput(message.text);
    inputRef.current?.focus();
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setInput("");
  };

  return (
    <div
      className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* Main card */}
      <div className="relative flex min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-90px)] xl:min-h-[calc(100vh-150px)] flex-col rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 pb-6 lg:pb-8 shadow-[0px_0px_4px_0px_#00000014]">
        {/* Conversation messages */}
        <div className="flex-1 overflow-y-auto px-2 pb-8 pt-8 md:pt-6 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:gap-3">
            {messages.map((message) =>
              message.type === "bot" ? (
                <BotMessage key={message.id} message={message} />
              ) : (
                <UserMessage
                  key={message.id}
                  message={message}
                  onEdit={handleEditMessage}
                />
              ),
            )}
          </div>
        </div>

        {/* Message composer */}
        <div className="mt-auto px-2 sm:px-4 md:px-6 lg:px-8">
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
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                  if (event.key === "Escape" && editingMessageId) {
                    handleCancelEdit();
                  }
                }}
                placeholder={
                  editingMessageId
                    ? "Edit your message here...."
                    : "Type your message here...."
                }
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
              onClick={handleSend}
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-[#4866F6] cursor-pointer"
              aria-label={editingMessageId ? "Update message" : "Send message"}
            >
              <img src={EnterFrame} alt="" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BotMessage — left aligned assistant message with action buttons
// -----------------------------------------------------------------------------
function BotMessage({ message }) {
  const actions = [ChatSpeaker, ChatCopy, ChatSave, ChatShare];

  return (
    <div className="flex items-end gap-3">
      <div className="mb-9 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9ECFF]">
        <img src={AiChat} alt="" className="h-6 w-6" />
      </div>

      <div className="w-fit max-w-[70%] min-w-0">
        <div className="max-w-full whitespace-pre-wrap wrap-anywhere rounded-[16px] rounded-bl-none rounded-tl-[30px] bg-[#F3F3F3] px-5 py-4 text-[14px] text-[#111111]">
          {message.text}
        </div>

        <div className="mt-2 flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            {actions.map((actionIcon, index) => (
              <button
                key={index}
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
                aria-label="Message action"
              >
                <img src={actionIcon} alt="" className="w-3.5" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#8D97A9]">{message.time}</p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UserMessage — right aligned user message with edit action
// -----------------------------------------------------------------------------
function UserMessage({ message, onEdit }) {
  return (
    <div className="flex justify-end">
      <div className="flex w-full min-w-0 items-end justify-end gap-3">
        <div className="flex w-fit max-w-[70%] md:max-w-[80%] lg:max-w-[70%] min-w-0 flex-col items-end">
          <div className="max-w-full min-w-[80px] whitespace-pre-wrap wrap-anywhere rounded-[16px] rounded-br-none rounded-tr-[30px] bg-[#4866F6] px-5 py-4 text-[14px] text-white">
            {message.text}
          </div>

          <div className="mt-2 flex w-full items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => onEdit(message)}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
              aria-label="Edit message"
            >
              <img src={ChatEdit} alt="" className="h-3.5 w-3.5" />
            </button>
            <p className="text-[11px] text-[#8D97A9]">{message.time}</p>
          </div>
        </div>

        <img
          src={Profile}
          alt=""
          className="mb-9 h-10 w-10 shrink-0 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
