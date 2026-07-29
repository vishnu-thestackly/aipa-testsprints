import React from "react";

import AiChat from "../../../assets/images/aichat.svg";
import ChatSpeaker from "../../../assets/images/chat_speaker.png";
import ChatCopy from "../../../assets/images/chat_copy.png";
import ChatSave from "../../../assets/images/chat_save.png";
import ChatShare from "../../../assets/images/chat_share.png";
import BotMessageContent from "./BotMessageContent";

export default function BotMessage({ message, onAction, }) {
  const actions = [
    ChatSpeaker,
    ChatCopy,
    ChatSave,
    ChatShare,
  ];
console.log("Bot Message:", message);


  return (
    <div className="flex items-end gap-3">
      <div className="mb-9 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9ECFF]">
        <img src={AiChat} alt="" className="h-6 w-6" />
      </div>

      <div className="w-fit max-w-[70%] min-w-0">
        <div className="max-w-full whitespace-pre-wrap wrap-anywhere rounded-[16px] rounded-bl-none rounded-tl-[30px] bg-[#F3F3F3] px-5 py-4 text-[14px] text-[#111111]">
          {message.text && (
  <p className="whitespace-pre-wrap break-words">
    {message.text}
  </p>
)}

<div className="mt-3">
  <BotMessageContent
    message={message}
    onAction={onAction}
  />
</div>
          
        </div>
        

        <div className="mt-2 flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            {actions.map((actionIcon, index) => (
              <button
                key={index}
                type="button"
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
              >
                <img src={actionIcon} alt="" className="w-3.5" />
              </button>
            ))}
          </div>

          <p className="text-[11px] text-[#8D97A9]">
            {message.time}
          </p>
        </div>
      </div>
    </div>
  );
}