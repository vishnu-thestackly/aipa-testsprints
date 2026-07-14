import React from "react";

import Profile from "../../../assets/images/profile.png";
import ChatEdit from "../../../assets/images/chat_edit.svg";

export default function UserMessage({ message, onEdit }) {
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
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F4] transition-all duration-200 hover:bg-[#e9ecff] hover:shadow-sm"
              aria-label="Edit message"
            >
              <img
                src={ChatEdit}
                alt=""
                className="h-3.5 w-3.5"
              />
            </button>

            <p className="text-[11px] text-[#8D97A9]">
              {message.time}
            </p>
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