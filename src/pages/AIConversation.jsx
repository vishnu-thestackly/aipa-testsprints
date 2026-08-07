import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { askAI } from "../utils/askAI";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";

import Arrow from "../assets/images/Arrow.png";
import EnterFrame from "../assets/images/EnterFrame.png";
import Audio from "../assets/images/audio.png";
import FileUpload from "../assets/images/FileUpload.png";
import AiImage from "../assets/images/AiImage.png";
import Copy from "../assets/images/Copy.png";
import Edit from "../assets/images/Edit.png";
import Save from "../assets/images/Save.png";
import Share from "../assets/images/Share.png";
import SpeakerHigh from "../assets/images/SpeakerHigh.png";
import UserHead from "../assets/images/UserHead.png";
import UserBody from "../assets/images/UserBody.png";
import BackGrounImage from "../assets/images/BackGrounImage.png";

const AIConversation = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showLangSpace, setShowLangSpace] = useState(false);

  const bottomRef = useRef(null);
  const navigate=useNavigate();
  const handleNewConversation=()=>{setMessages([]);setInput("");};

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      type: "user",
      text: input,
      time: dayjs().format("hh:mm A"),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askAI(input);

      const botMsg = {
        type: "bot",
        text: res.answer,
        time: dayjs().format("hh:mm A"),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto overflow-x-hidden px-2 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [::-webkit-scrollbar]:hidden">

      {/* BACKGROUND */}
      <img
        src={BackGrounImage}
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

      <div
        className={`relative z-10 flex flex-col items-center min-h-screen transition-all duration-300 ${showLangSpace ? "pb-[120px]" : ""
          }`}
      >

        {/* NAVBAR */}
<div className="w-full px-[clamp(12px,2vw,32px)] flex justify-center mb-[2vh] z-[9999] relative">      <Navbar onLanguageClick={setShowLangSpace} />
        </div>

        {/* CHAT CARD */}
<div className={`relative w-[96%] mx-auto h-[78vh] md:h-[80vh] lg:h-[82vh] bg-white rounded-[30px] overflow-hidden flex flex-col transition-all duration-300 ${showLangSpace ? "sm:mt-[7vh]" : "sm:mt-0"}`}>
       <div className="px-4 sm:px-6 pt-5 pb-4 shrink-0">

            {/* MOBILE */}
            <div className="flex flex-col gap-4 sm:hidden">

              {/* TOP */}
              <div className="flex items-center justify-between w-full">

                {/* LEFT */}
<div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate("/")}>
                  {/* ARROW */}
<div onClick={()=>navigate(-1)} className="w-10 h-10 rounded-full bg-[#4866F6] mr-[40px] flex items-center justify-center shrink-0 cursor-pointer">                    <img
                      src={Arrow}
                      alt=""
                      className="w-4 h-4"
                    />
                  </div>

                  {/* TITLE */}
                  <p className="text-[18px] font-semibold text-[#3D3D3D] whitespace-nowrap">
                    AI Chat Window
                  </p>

                </div>

              </div>

              {/* BUTTON */}
<button onClick={handleNewConversation} className="w-full h-[36px] bg-[#4866F6] rounded-full text-white text-[14px] font-medium flex items-center justify-center cursor-pointer">      
           New Conversation +
              </button>

            </div>

            {/* DESKTOP */}
            <div className="hidden sm:flex items-center justify-between gap-3">

              {/* LEFT */}
<div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate("/")}>
<div onClick={()=>navigate(-1)} className="w-10 h-10 rounded-full bg-[#4866F6] flex items-center justify-center shrink-0 cursor-pointer">                  <img
                    src={Arrow}
                    alt=""
                    className="w-4 h-4"
                  />
                </div>

                <p className="text-[22px] font-semibold text-[#3D3D3D]">
                  AI Chat Window
                </p>

              </div>

              {/* BUTTON */}
<button onClick={handleNewConversation} className="bg-[#4866F6] text-white h-[48px] px-8 rounded-full text-[16px] font-medium flex items-center justify-center min-w-[260px] cursor-pointer">               New Conversation +
              </button>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-300 mt-5"></div>

          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

            <div className="flex flex-col gap-6">

              {messages.map((msg, i) => (
                <div key={i}>

                  {/* BOT MESSAGE */}
                  {msg.type === "bot" && (
                    <div className="flex items-start gap-3">

                      {/* BOT ICON */}
                      <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <img
                          src={AiImage}
                          alt=""
                          className="w-6 h-6"
                        />
                      </div>

                      {/* BOT CONTENT */}
                      <div className="flex flex-col gap-2 w-fit max-w-[85%] sm:max-w-[70%]">

                        {/* MESSAGE */}
                        <div className="bg-gray-200 px-4 py-3 rounded-tl-[24px] rounded-tr-[10px] rounded-br-[10px] break-words break-all whitespace-pre-wrap overflow-hidden">
                          <p className="text-[14px] text-gray-700 leading-7">
                            {msg.text}
                          </p>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center flex-wrap gap-2">

                          {[SpeakerHigh, Copy, Save, Share].map(
                            (icon, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                              >
                                <img
                                  src={icon}
                                  alt=""
                                  className="w-4 h-4"
                                />
                              </div>
                            )
                          )}

                          <p className="text-[10px] text-gray-400 ml-1">
                            {msg.time}
                          </p>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* USER MESSAGE */}
                  {msg.type === "user" && (
                    <div className="flex justify-end items-end gap-3 w-full">

                      <div className="flex flex-col items-end gap-2 w-fit max-w-[85%] sm:max-w-[70%]">

                        {/* MESSAGE */}
                        <div className="bg-[#4866F6] text-white px-4 py-3 rounded-tl-[10px] rounded-tr-[24px] rounded-bl-[10px] break-words break-all whitespace-pre-wrap overflow-hidden">
                          <p className="text-[14px] leading-7">
                            {msg.text}
                          </p>
                        </div>

                        {/* ACTION */}
                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                            <img
                              src={Edit}
                              alt=""
                              className="w-4 h-4"
                            />
                          </div>

                          <p className="text-[10px] text-gray-400">
                            {msg.time}
                          </p>

                        </div>

                      </div>

                      {/* USER ICON */}
                      <div className="relative w-11 h-11 bg-gray-200 rounded-full shrink-0">

                        <img
                          src={UserHead}
                          alt=""
                          className="absolute w-[30%] top-[6%] left-[35%]"
                        />

                        <img
                          src={UserBody}
                          alt=""
                          className="absolute w-[60%] top-[40%] left-[18%]"
                        />

                      </div>

                    </div>
                  )}

                </div>
              ))}

              <div ref={bottomRef}></div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="p-4 bg-white shrink-0">

            <div className="flex items-center gap-2">

              {/* FILE */}
              <div className="w-12 h-12 sm:w-12 sm:h-12 bg-blue-100 rounded-xl border-2 border-[#4866F6] flex items-center justify-center shrink-0 cursor-pointer">
                <img
                  src={FileUpload}
                  alt=""
                  className="w-5 h-5"
                />
              </div>

              {/* INPUT */}
              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSend()
                }
                placeholder="Type your message..."
                className="flex-1 h-12 sm:h-12 bg-blue-100 rounded-xl border-2 border-[#4866F6] px-[clamp(10px,2vw,16px)] outline-none text-[clamp(12px,1.2vw,16px)] placeholder:text-[#7B7B7B] min-w-0"
              />

              {/* AUDIO */}
              <div className="w-12 h-12 sm:w-12 sm:h-12 bg-blue-100 rounded-xl border-2 border-[#4866F6] flex items-center justify-center shrink-0 cursor-pointer">
                <img
                  src={Audio}
                  alt=""
                  className="w-5 h-5"
                />
              </div>

              {/* SEND */}
              <div
                onClick={handleSend}
                className="w-12 h-12 sm:w-12 sm:h-12 bg-[#4866F6] rounded-xl flex items-center justify-center cursor-pointer shrink-0"
              >
                <img
                  src={EnterFrame}
                  alt=""
                  className="w-5 h-5"
                />
              </div>

            </div>

          </div>

        </div>

        {/* MOBILE FOOTER */}
        {/* FOOTER */}
        <div className="w-full flex sm:hidden items-center justify-between gap-3 py-4 px-2">

          {/* LEFT */}
          <p className="font-bold text-[12px] text-[#8D97A9] text-center sm:text-left">
            © All Rights Reserved
          </p>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <p className="font-bold text-[12px] text-[#8D97A9] cursor-pointer">
              Help
            </p>

            <div className="w-[10px] border border-[#8D97A9] rotate-90"></div>

            <p className="font-bold text-[12px] text-[#8D97A9] cursor-pointer">
              FAQ
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AIConversation;