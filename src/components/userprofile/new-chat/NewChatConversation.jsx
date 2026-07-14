// =============================================================================
// New Chat Conversation
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ActionCards from "./ActionCards";
import useChat from "./hooks/useChat";

import { sendChatMessage } from "../../../api/authApi";
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
  const aiReply = location.state?.aiReply || "";
  const { chatId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [conversationId, setConversationId] = useState(
  Number(chatId) || 0
);
  
  const {
    input,
    setInput,
    messages,
    setMessages,
    cards,
    setCards,
    editingMessageId,
    setEditingMessageId,
} = useChat(firstMessage, aiReply);

useEffect(() => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }
}, [messages]);

  const handleSend = async () => {
  const message = input.trim();

  if (!message) return;

  // Edit existing message
  if (editingMessageId) {
  setEditingMessageId(null);
}

  // Create user message
  const userMessage = {
    id: `user-${Date.now()}`,
    type: "user",
    text: message,
    time: getCurrentTime(),
  };

  // Show it immediately
  setMessages((prev) => [...prev, userMessage]);

  // Clear input
  setInput("");

  try {
    const response = await sendChatMessage({
      conversation_id: conversationId,
      message: message,
    });

    // Save conversation id (important for future messages)
    


    // Add AI reply
    const botMessage = {
  id: `bot-${Date.now()}`,
  type: "bot",
  text: response.reply,
  time: getCurrentTime(),
};

setMessages((prev) => [...prev, botMessage]);

  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-error-${Date.now()}`,
        type: "bot",
        text: "Something went wrong. Please try again.",
        time: getCurrentTime(),
      },
    ]);
  }
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
      className={`h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide transition-all duration-300 ${
        languageOpen ? "mt-[60px] md:mt-[70px] lg:mt-[80px]" : "mt-0"
      }`}
    >
      {/* Main card */}
      <div className="relative flex  h-[calc(100vh-140px)] flex-col rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 pb-6 lg:pb-8 shadow-[0px_0px_4px_0px_#00000014]">
        {/* Conversation messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-2 pb-8 pt-8 md:pt-6 sm:px-4 md:px-6 lg:px-8 scrollbar-hide">
          <ChatMessages
  messages={messages}
  onEdit={handleEditMessage}
/>


        </div>

        <ActionCards cards={cards} />

        {/* Message composer */}
        <ChatInput
            inputRef={inputRef}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            editingMessageId={editingMessageId}
            onCancelEdit={handleCancelEdit}
          />
      </div>
    </div>
  );
}

