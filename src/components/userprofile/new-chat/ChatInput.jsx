import React, { useRef, useState, useEffect } from "react";

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

  const MAX_MESSAGE_LENGTH = 2000;
  const MAX_INPUT_HEIGHT = 160;
  const MAX_LENGTH_ERROR = `Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`;

  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // Dynamically increase textarea height
  // ---------------------------------------------------------------------------

  const adjustInputHeight = () => {
    const textarea = inputRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight <= MAX_INPUT_HEIGHT) {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = `${MAX_INPUT_HEIGHT}px`;
      textarea.style.overflowY = "auto";
    }
  };

  // ---------------------------------------------------------------------------
  // Adjust height whenever input changes
  // ---------------------------------------------------------------------------

  useEffect(() => {
    adjustInputHeight();
  }, [input]);

  // ---------------------------------------------------------------------------
  // Handle input change
  // ---------------------------------------------------------------------------

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInput(value);

    if (value.length > MAX_MESSAGE_LENGTH) {
      setError(MAX_LENGTH_ERROR);
    } else {
      setError("");
    }
  };

  // ---------------------------------------------------------------------------
  // Handle send
  // ---------------------------------------------------------------------------

  const handleSend = () => {
    if (input.length > MAX_MESSAGE_LENGTH) {
      setError(MAX_LENGTH_ERROR);
      return;
    }

    if (!input.trim()) {
      return;
    }

    setError("");
    onSend();
  };

  // ---------------------------------------------------------------------------
  // Keyboard handling
  // ---------------------------------------------------------------------------

  const handleKeyDown = (e) => {
    // Enter sends the message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      return;
    }

    // Shift + Enter creates a new line
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // Escape cancels editing
    if (e.key === "Escape" && editingMessageId) {
      onCancelEdit();
    }
  };

  const isSendDisabled =
    input.length > MAX_MESSAGE_LENGTH || !input.trim();

  return (
    <div className="shrink-0 px-1.5 sm:px-4 md:px-6 lg:px-8">

      {/* Validation Error */}
      {error && (
        <div className="mb-1 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Message Composer                                                 */}
      {/* ----------------------------------------------------------------- */}

      <div className="flex items-end gap-1.5 sm:gap-2">

        {/* --------------------------------------------------------------- */}
        {/* Upload Button                                                   */}
        {/* --------------------------------------------------------------- */}

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer sm:h-13 sm:w-13"
          aria-label="Upload file"
        >
          <img
            src={FileUpload}
            alt=""
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>

        {/* --------------------------------------------------------------- */}
        {/* Input Container                                                 */}
        {/* --------------------------------------------------------------- */}

        <div
          className={`flex min-h-10 min-w-0 flex-1 items-end rounded-lg border px-2.5 py-1.5 sm:min-h-13 sm:px-3 sm:py-2 ${
            error
              ? "border-red-500 bg-red-50"
              : "border-[#4866F6] bg-[#EEF2FF]"
          }`}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder={
              editingMessageId
                ? "Edit your message here...."
                : "Type your message here...."
            }
            className="min-h-[26px] min-w-0 flex-1 resize-none overflow-x-hidden scrollbar-hide bg-transparent text-[11px] leading-5 text-[#2D2D2D] outline-none placeholder:text-[#2D2D2D] sm:min-h-[29px] sm:text-[14px] sm:leading-6"
          />
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Mic Button                                                       */}
        {/* --------------------------------------------------------------- */}

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#4866F6] bg-[#EEF2FF] cursor-pointer sm:h-13 sm:w-13"
          aria-label="Record audio"
        >
          <img
            src={Audio}
            alt=""
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>

        {/* --------------------------------------------------------------- */}
        {/* Send Button                                                      */}
        {/* --------------------------------------------------------------- */}

        <button
          type="button"
          onClick={handleSend}
          disabled={isSendDisabled}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition sm:h-13 sm:w-13 ${
            isSendDisabled
              ? "cursor-not-allowed bg-gray-300"
              : "cursor-pointer bg-[#4866F6]"
          }`}
          aria-label="Send message"
        >
          <img
            src={EnterFrame}
            alt=""
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Character Counter                                                 */}
      {/* ----------------------------------------------------------------- */}

      <div className="mt-1 flex justify-end">
        <span
          className={`text-xs ${
            input.length > MAX_MESSAGE_LENGTH
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {input.length}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>
    </div>
  );
}