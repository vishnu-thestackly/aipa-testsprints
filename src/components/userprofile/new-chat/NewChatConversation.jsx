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

import { sendChatMessage, getConversationMessages,executeTask, } from "../../../api/authApi";
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
  if (!chatId) return;

  const fetchConversation = async () => {
    try {
      const response = await getConversationMessages(chatId);

      setConversationId(response.conversation_id);

      const formattedMessages = response.messages.map((msg) => ({
        id: msg.message_id,
        type: msg.sender === "assistant" ? "bot" : "user",
        text: msg.message_text,
        time: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  fetchConversation();
}, [chatId]);

useEffect(() => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }
}, [messages]);


const sendMessageToBackend = async (message) => {
  // Create user message
  const userMessage = {
    id: `user-${Date.now()}`,
    type: "user",
    text: message,
    time: getCurrentTime(),
  };

  // Show immediately
  setMessages((prev) => [...prev, userMessage]);

  try {
    const response = await sendChatMessage({
      conversation_id: conversationId,
      message,
    });

    if (response.conversation_id) {
      setConversationId(response.conversation_id);
    }

    const botMessage = {
  id: `bot-${Date.now()}`,
  type: "bot",
  text: response.reply,
  time: getCurrentTime(),

  // New backend fields
  needs_date_trigger: response.needs_date_trigger,
  needs_time_trigger: response.needs_time_trigger,
  needs_priority_trigger: response.needs_priority_trigger,

  quick_actions: response.quick_actions,
  task_summary: {
  ...response.task_summary,
  task_id: response.task_id,
},
  editable_fields: response.editable_fields,
  suggested_actions: response.suggested_actions,

  requires_clarification: response.requires_clarification,
  intent: response.intent,
  task_id: response.task_id,
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

//   const handleSend = async () => {
//   const message = input.trim();

//   if (!message) return;

//   // Edit existing message
//   if (editingMessageId) {
//   setEditingMessageId(null);
// }


const handleSend = async () => {
  const message = input.trim();

  if (!message) return;

  if (editingMessageId) {
    setEditingMessageId(null);
  }

  setInput("");

  await sendMessageToBackend(message);
};

const handleUiAction = async (value, taskId, platform) => {
  if (value === "proceed") {
    // Step 1: Show user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: value,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      // Step 2: Execute task
      const response = await executeTask(taskId, platform);

      // Step 3: Show execute API response
      const botMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: response.reply || response.message,
        time: getCurrentTime(),

        task_summary: response.task_summary,
        suggested_actions: response.suggested_actions || [],
        quick_actions: response.quick_actions || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    }

    return;
  }

  // Other actions (edit, retry, etc.)
  await sendMessageToBackend(value);
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
  onAction={handleUiAction}
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

