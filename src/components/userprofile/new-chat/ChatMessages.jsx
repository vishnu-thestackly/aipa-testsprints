import React from "react";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

export default function ChatMessages({
  messages,
  onEdit,
  onAction,
}) {
  return (
    <div className="flex flex-col gap-8 lg:gap-3">
      {messages.map((message) =>
        message.type === "bot" ? (
          <BotMessage
            key={message.id}
            message={message}
            onAction={onAction}
          />
        ) : (
          <UserMessage
            key={message.id}
            message={message}
            onEdit={onEdit}
          />
        )
      )}
    </div>
  );
}