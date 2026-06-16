import { useState, useEffect, useRef } from "react";

import Logo from "../assets/images/Logo.svg";
import Language from "../assets/images/Language.svg";
import Notification from "../assets/images/Notification.svg";
import Darkmode from "../assets/images/Darkmode.svg";

const Navbar = ({ onLanguageClick }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const wrapperRef = useRef(null);

  const languages = [ "English", "Spanish", "German", "French", "Hindi", "Tamil"];

  // CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
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

  const iconStyle = (name) =>
    `w-10 h-10 sm:w-[42px] sm:h-[42px] rounded-full flex items-center justify-center transition cursor-pointer group
    ${
      activeBtn === name
        ? "bg-blue-500"
        : "bg-[#eef1ff] hover:bg-blue-500"
    }`;

  const imgStyle = (name) =>
    `w-5 h-5 sm:w-6 sm:h-6 transition duration-300
    ${
      activeBtn === name
        ? "brightness-0 invert"
        : "brightness-0 saturate-100 invert-[65%] sepia-[60%] saturate-[500%] hue-rotate-[190deg] brightness-[95%] contrast-[95%] group-hover:brightness-0 group-hover:invert"
    }`;

  // LANGUAGE ICON TOGGLE
  const handleLanguageToggle = () => {
    const updatedState = !showLang;

    setShowLang(updatedState);
    setActiveBtn(updatedState ? "lang" : "");

    onLanguageClick(updatedState);
  };

  // SELECT LANGUAGE
  const handleSelectLanguage = (lang) => {
    // SAME LANGUAGE CLICK AGAIN
    if (selectedLang === lang) {
      setShowLang(false);
      setActiveBtn("");
      onLanguageClick(false);
      return;
    }

    // CHANGE LANGUAGE
    setSelectedLang(lang);

    // KEEP DROPDOWN OPEN
    setShowLang(true);

    // KEEP ICON ACTIVE
    setActiveBtn("lang");

    onLanguageClick(true);
  };

  return (
    <div className="relative w-[1340px] rounded-[41.5px] bg-white flex flex-col items-center px-3 sm:px-5 mb-2" ref={wrapperRef}>
      {/* SCROLLBAR HIDE */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* HEADER */}
      <div className="w-[1340px] rounded-[41.5px] sm:rounded-full px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 shadow-lg">

        {/* LEFT */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <img src={Logo} alt="Logo" className="h-9 sm:h-10" />

          <div className="hidden sm:block border-l h-8 text-[#CFCFCF]"></div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">

          {/* ICONS */}
          <div className="flex gap-2 sm:gap-3">

            {/* LANGUAGE */}
            <div className="relative">

              {/* LANGUAGE ICON */}
              <button className={iconStyle("lang")} onClick={handleLanguageToggle}>
                <img src={Language} alt="lang" className={imgStyle("lang")} />
              </button>

              {/* LANGUAGE DROPDOWN */}
              {showLang && (
                <div className="absolute top-14 left-0 z-50">
                  <div className="bg-white rounded-full px-2 py-1 shadow-lg w-max max-w-[360px] mt-1">

                    <div className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar">

                      {languages.map((item, index) => (
                        <button key={index} onClick={() => handleSelectLanguage(item)}
                          className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm whitespace-nowrap transition
                            ${
                              selectedLang === item
                                ? "bg-blue-500 text-white"
                                : "bg-[#eef1ff] text-gray-700 hover:bg-blue-500 hover:text-white"
                            }
                          `}
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
            <button className={iconStyle("notify")} onClick={() => { setActiveBtn("notify"); setShowLang(false);  onLanguageClick(false);}} >
              <img  src={Notification} alt="notify" className={imgStyle("notify")}/>
            </button>

            {/* DARK MODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                setActiveBtn("mode");
                setShowLang(false);
                onLanguageClick(false);
              }}
            >
              <img  src={Darkmode}  alt="mode"  className={imgStyle("mode")}   />
            </button>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <button className="px-4 sm:px-5 h-10 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
              Log In
            </button>

            <button className="px-4 sm:px-5 h-10 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;