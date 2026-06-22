import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { askAI } from "../../pages/askAI";
import Logoimg from "../../assets/images/Logoimg.svg";
import AiImage from "../../assets/images/AiImage.png"
// import Profile from "../../assets/images/Profile.png";

export default function PersonalAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your personal assistant. How can I help you today?",
      items: [],
      time: dayjs().format("hh:mm A"),
    }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      type: "user",
      text: input,
      time: dayjs().format("hh:mm A"),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    try {
      const res = await askAI(currentInput);

      const botMsg = {
        type: "bot",
        text: res.answer,
        items: res.data?.items || [],
        time: res.time || dayjs().format("hh:mm A"),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        type: "bot",
        text: "Error: Could not connect to AI",
        items: [],
        time: dayjs().format("hh:mm A"),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col rounded-xl overflow-hidden">
      {/* Header */}
      <div className="relative h-20 sm:h-28 md:h-[180px] bg-[#4866F6]  shrink-0">
        <div className="absolute top-2 left-3 sm:top-3 sm:left-4 md:top-6 md:left-6">
          <img
            src={Logoimg}
            alt="Logo"
            className="w-30 h-8 mt-1 sm:w-20 sm:h-6  lg:h-[50px] lg:w-[200px]  sm:mt-2 md:w-32 md:h-10 md:mt-5  object-contain"
          />
        </div>

        {/* Cut Arrow Shape */}
        <div
          className="absolute bottom-0 left-0 w-full h-8 sm:h-10 md:h-16 bg-white"
          style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 space-y-2 sm:space-y-3 md:space-y-4 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs sm:text-sm">
            Start a conversation...
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === "bot" && (
              <div className="flex items-start gap-1 sm:gap-1.5 md:gap-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <img src={AiImage} alt="AI" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 rounded-full" />
                </div>
                <div className="flex flex-col gap-0.5 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]">
                  <div className="bg-gray-100 text-gray-800 px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl">
                    <p className="text- sm:text-xs md:text-sm leading-4 sm:leading-5 md:leading-6">{msg.text}</p>
                    {msg.items && msg.items.length > 0 && (
                      <ul className="mt-1 sm:mt-1.5 md:mt-2 space-y-0.5 sm:space-y-1">
                        {msg.items.map((item, idx) => (
                          <li key={idx} className="text- sm:text- md:text-xs text-gray-600">- {item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <p className="text-[10px] sm:text- md:text- text-gray-400 self-start ml-0.5">{msg.time}</p>
                </div>
              </div>
            )}

            {msg.type === "user" && (
              <div className="flex justify-end items-end gap-1 sm:gap-1.5 md:gap-2">
                <div className="flex flex-col items-end gap-0.5 max-w-[85%] sm:max-w-[80%] md:max-w-[75%]">
                  <div className="bg-[#4866F6] text-white px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-lg sm:rounded-xl">
                    <p className="text- sm:text-xs md:text-sm leading-4 sm:leading-5 md:leading-6">{msg.text}</p>
                  </div>
                  <p className="text-[10px] sm:text- md:text- text-gray-400 mr-0.5">{msg.time}</p>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-200 rounded-full shrink-0 overflow-hidden">
                  <img src={Profile} alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-2.5 md:p-4 border-t border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Here..."
            className="flex-1 h-7 sm:h-8 md:h-10 px-2.5 sm:px-3 md:px-4 text-[#3D3D3D] rounded-lg sm:rounded-xl border-2 border-[#4866F6]/60 bg-[#4866F6]/10 outline-none placeholder:text-gray-500 text-xs sm:text-sm"
          />
          <button
            onClick={handleSend}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-[#4866F6] text-white text-base sm:text-lg md:text-xl flex items-center justify-center hover:bg-[#3D5AE8] transition shrink-0"
          >
            
          </button>
        </div>
      </div>
    </div>
  );
}