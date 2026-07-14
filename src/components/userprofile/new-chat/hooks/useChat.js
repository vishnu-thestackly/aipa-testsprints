import { useState } from "react";

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function useChat(firstMessage = "", aiReply = "") {
  const [input, setInput] = useState("");

  const [editingMessageId, setEditingMessageId] = useState(null);

  const [cards, setCards] = useState([]);

  const [messages, setMessages] = useState(() => {
    const initialMessages = [];

    if (firstMessage) {
      initialMessages.push({
        id: "user-first",
        type: "user",
        text: firstMessage,
        time: getCurrentTime(),
      });
    }

    if (aiReply) {
      initialMessages.push({
        id: "bot-first",
        type: "bot",
        text: aiReply,
        time: getCurrentTime(),
      });
    }

    return initialMessages;
  });

  return {
    input,
    setInput,

    messages,
    setMessages,

    cards,
    setCards,

    editingMessageId,
    setEditingMessageId,
  };
}