import React, { useRef } from "react";

import FileUpload from "../../../assets/images/FileUpload.png";
import Audio from "../../../assets/images/Audio.png";
import EnterFrame from "../../../assets/images/EnterFrame.png";

export default function ChatInput({
  input,
  setInput,
  onSend,
  editingMessageId,
  onCancelEdit,
}) {
  const inputRef = useRef(null);

  return (
    <div className="shrink-0 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="flex items-center gap-2">

        {/* Upload */}
        <button
          type="button"
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
        >
          <img src={FileUpload} alt="" className="h-6 w-6" />
        </button>

        {/* Input */}
        <div className="flex h-13 min-w-0 flex-1 items-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] px-3">

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend();

              if (e.key === "Escape" && editingMessageId) {
                onCancelEdit();
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
            className="flex md:hidden shrink-0 items-center justify-center ml-2 cursor-pointer"
          >
            <img src={Audio} alt="" className="h-6.5 w-6.5" />
          </button>

        </div>

        {/* Desktop Audio */}
        <button
          type="button"
          className="hidden md:flex h-13 w-13 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer"
        >
          <img src={Audio} alt="" className="h-6.5 w-6.5" />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={onSend}
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-[#4866F6] cursor-pointer"
        >
          <img src={EnterFrame} alt="" className="h-5 w-5" />
        </button>

      </div>
    </div>
  );
}