import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { askAI } from "../../Pages/askAI";
import Logoimg from "../../assets/images/Logoimg.svg";
import AiImage from "../../assets/images/AiImage.png"
import Profile from "../../assets/images/Profile.png";
import EnterFrame from "../../assets/images/EnterFrame.png"

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
    const userMsg = { type: "user", text: input, time: dayjs().format("hh:mm A") };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    try {
      const res = await askAI(currentInput);
      const botMsg = { type: "bot", text: res.answer, items: res.data?.items || [], time: res.time || dayjs().format("hh:mm A") };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { type: "bot", text: "Error: Could not connect to AI", items: [], time: dayjs().format("hh:mm A") };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      
      <div className="w-[350px] max-w-[95vw] h-[550px] bg-white flex flex-col rounded-2xl overflow-hidden shadow-2xl border-2 border-[#4866F6]">

        {/* Header  */}
        <div className="relative h-[90px] bg-[#4866F6] shrink-0  overflow-hidden">
          <div className="absolute top-4 left-4 z-10">
            <img src={Logoimg} alt="Logo" className="w-[180] object-contain h-auto" />
          </div>
          {/*clip path */}
          <div
            className="absolute bottom-0 left-0 w-full h-8 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0 100%)" }}
          />
        </div>

        {/* Chat Area  */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.type === "bot" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <img src={AiImage} alt="AI" className="w-5 h-5 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-[75%]">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2.5 rounded-2xl rounded-tl-md break-words">
                      <p className="text-sm leading-6">{msg.text}</p>
                      {msg.items?.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {msg.items.map((item, idx) => <li key={idx} className="text-xs text-gray-600">- {item}</li>)}
                        </ul>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 self-start ml-[150px]">{msg.time}</p>
                  </div>
                </div>
              )}

              {msg.type === "user" && (
                <div className="flex justify-end items-end gap-3">
                  <div className="flex flex-col items-end gap-1 max-w-[75%]">
                    <div className="bg-[#4866F6] text-white px-4 py-2.5 rounded-2xl rounded-tr-md break-words">
                      <p className="text-sm leading-6">{msg.text}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 mr-1">{msg.time}</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0 overflow-hidden">
                    <img src={Profile} alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Here..."
              className="flex-1 h-10 px-3 rounded-xl text-[#3D3D3D]  border-2 border-[#4866F6]/60 bg-[#4866F6]/10 outline-none placeholder:text-gray-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-[#4866F6] flex items-center justify-center shrink-0 hover:bg-[#3D5AE8] transition"
            >
              <img src={EnterFrame} alt="" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}