import { useState, useEffect, useRef } from "react";

import Logo from "../../assets/images/logo.png";
import Language from "../../assets/images/language.svg";
import Notification from "../../assets/images/notification.svg";
import Darkmode from "../../assets/images/darkmode.svg";
import User from "../../assets/images/profile.png";

const UserNavbar = ({ onLanguageClick = () => {} }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const [showLang, setShowLang] = useState(false);

  // DEFAULT SELECT
  const [selectedLang, setSelectedLang] = useState("English");

  const wrapperRef = useRef(null);

  const languages = [
    "English",
    "Spanish",
    "German",
    "French",
    "Hindi",
    "Tamil",
  ];

  // CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowLang(false);
        setActiveBtn("");
        onLanguageClick(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onLanguageClick]);

  // LANGUAGE TOGGLE
  const handleLanguageToggle = () => {
    const updatedState = !showLang;

    setShowLang(updatedState);
    setActiveBtn(updatedState ? "lang" : "");

    onLanguageClick(updatedState);
  };

  // SELECT / UNSELECT LANGUAGE
  const handleSelectLanguage = (lang) => {
    // SAME LANGUAGE CLICK -> UNSELECT
    if (selectedLang === lang) {
      setSelectedLang("");
      setShowLang(false);
      setActiveBtn("");
      onLanguageClick(false);
      return;
    }

    // NEW LANGUAGE SELECT
    setSelectedLang(lang);

    // KEEP DROPDOWN OPEN
    setShowLang(true);
    setActiveBtn("lang");
    onLanguageClick(true);
  };

  // ICON STYLE
  const iconStyle = (name) =>
    `w-[48px] h-[48px] max-[425px]:w-[40px] max-[425px]:h-[40px] max-[375px]:w-[30px] max-[375px]:h-[30px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group ${
      activeBtn === name ? "bg-[#4866F6]" : "bg-[#ECE9FF] hover:bg-[#4866F6]"
    }`;

  // IMAGE STYLE
  const imgStyle = (name) =>
    `w-[22px] h-[22px] max-[375px]:w-[15px] max-[375px]:h-[15px] transition-all duration-300 ${
      activeBtn === name
        ? "brightness-0 invert"
        : "group-hover:brightness-0 group-hover:invert"
    }`;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full bg-white rounded-[40px] shadow-lg px-[24px] py-[14px] z-[9999]"
    >
      <style>
        {`
        .no-scrollbar::-webkit-scrollbar {display: none;}
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* NAVBAR */}
      <div className="flex flex-col gap-5">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div>
            <img src={Logo} alt="logo" className="h-[42px] object-contain" />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-5">
            {/* ICONS */}
            <div className="flex items-center gap-3 ml-4 sm:ml-0 ">
              {/* LANGUAGE */}
              <div className="relative">
                <button
                  type="button"
                  className={iconStyle("lang")}
                  onClick={handleLanguageToggle}
                >
                  <img
                    src={Language}
                    alt="language"
                    className={imgStyle("lang")}
                  />
                </button>

                {/* LANGUAGE DROPDOWN */}
                {showLang && (
                  <div className="absolute top-[70px] left-0 z-[9999]">
                    <div className="bg-white rounded-[35px] px-3 py-2 shadow-lg w-max max-w-[360px] overflow-hidden">
                      <div className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar">
                        {languages.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectLanguage(item)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                              selectedLang === item
                                ? "bg-[#4866F6] text-white"
                                : "bg-[#eef1ff] text-gray-700 hover:bg-blue-500 hover:text-white"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* NOTIFICATION */}
              <button
                type="button"
                className={iconStyle("notify")}
                onClick={() => {
                  setActiveBtn("notify");
                  setShowLang(false);
                  onLanguageClick(false);
                }}
              >
                <img
                  src={Notification}
                  alt="notification"
                  className={imgStyle("notify")}
                />
              </button>

              {/* DARKMODE */}
              <button
                type="button"
                className={iconStyle("mode")}
                onClick={() => {
                  setActiveBtn("mode");
                  setShowLang(false);
                  onLanguageClick(false);
                }}
              >
                <img
                  src={Darkmode}
                  alt="darkmode"
                  className={imgStyle("mode")}
                />
              </button>
            </div>

            {/* LOG IN / SIGN UP — tablet only */}
            <div className="hidden md:flex lg:hidden items-center gap-3">
              <button
                type="button"
                className="bg-gradient-to-r from-[#4866F6] to-[#3d5cf4] text-white px-6 py-2.5 rounded-full text-md hover:opacity-90 transition-all duration-300"
              >
                Log In
              </button>
              <button
                type="button"
                className="bg-gradient-to-r from-[#4866F6] to-[#3d5cf4] text-white px-6 py-2.5 rounded-full text-md hover:opacity-90 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>

            {/* USER — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <img
                src={User}
                alt="user"
                className="w-[48px] h-[48px] rounded-full object-cover"
              />

              <div>
                <p className="text-sm font-semibold text-[#4866F6]">
                  Santhosh Kumar
                </p>

                <p className="text-xs text-[#9A9A9A]">User</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE PROFILE ROW */}
        <div className="flex md:hidden min-[500px]:max-[767px]:hidden justify-center">
          <div className="flex items-center gap-4">
            <img
              src={User}
              alt="user"
              className="w-[72px] h-[72px] max-[425px]:w-[60px] max-[425px]:h-[60px] rounded-full object-cover"
            />

            <div>
              <p className="text-[22px] max-[425px]:text-[16px] leading-tight font-semibold text-[#4866F6]">
                Santhosh Kumar
              </p>
              <p className="text-[16px] max-[425px]:text-[14px] leading-tight text-[#335187] mt-1">
                User
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserNavbar;
