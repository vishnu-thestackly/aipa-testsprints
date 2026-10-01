import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoDark from "../../assets/images/Logoimg.svg";
import Language from "../../assets/images/Language.svg";
import Darkmode from "../../assets/images/Darkmode.svg";
import Moon from "../../assets/images/moon.svg";
import { useTheme } from "../../context/ThemeContext";

const ProfileNavbar = ({ onLanguageClick }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate(); 
  const wrapperRef = useRef(null);

  const languages = [
    "English",
    "Spanish",    
    "German",
    "French",
    "Hindi",
    "Tamil",
  ];

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

  const iconStyle = (name) => {
    if (isDark) {
      if (name === "mode") {
        return "w-[clamp(32px,9vw,48px)] h-[clamp(32px,9vw,48px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-[#4866F6] text-white shadow-[0_0_14px_rgba(72,102,246,0.6)] shrink-0";
      }
      return `w-[clamp(32px,9vw,48px)] h-[clamp(32px,9vw,48px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${
        activeBtn === name
          ? "bg-[#4866F6] border border-[#4866F6] text-white"
          : "bg-[#060C1F] border border-[#4866F6] hover:bg-[#4866F6] text-[#4866F6]"
      }`;
    }

    return `w-[clamp(32px,9vw,48px)] h-[clamp(32px,9vw,48px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${
      activeBtn === name
        ? "bg-[#4866F6]"
        : "bg-[#ECE9FF] hover:bg-[#4866F6]"
    }`;
  };

  const imgStyle = (name) => {
    if (name === "mode") {
      return `w-[clamp(14px,4vw,22px)] h-[clamp(14px,4vw,22px)] transition-all duration-300 ${
        isDark ? "filter brightness-0 invert" : ""
      }`;
    }

    return `w-[clamp(14px,4vw,22px)] h-[clamp(14px,4vw,22px)] transition-all duration-300 ${
      activeBtn === name
        ? "filter brightness-0 invert"
        : "group-hover:filter group-hover:brightness-0 group-hover:invert"
    }`;
  };

  const handleLanguageToggle = () => {
    const updatedState = !showLang;

    setShowLang(updatedState);
    setActiveBtn(updatedState ? "lang" : "");

    onLanguageClick(updatedState);
  };

  const handleSelectLanguage = (lang) => {
    if (selectedLang === lang) {
      setShowLang(false);
      setActiveBtn("");
      onLanguageClick(false);
      return;
    }

    setSelectedLang(lang);
    setShowLang(true);
    setActiveBtn("lang");

    onLanguageClick(true);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full rounded-[24px] sm:rounded-[41.5px] py-[clamp(10px,2vw,15px)] px-[clamp(8px,2vw,16px)] mx-auto mt-[15px] sm:mt-[20px] overflow-visible z-[9999] transition-all duration-300 ${
        isDark
          ? "bg-[#060C1F] border border-[#586D93] shadow-xl"
          : "bg-white shadow-lg"
      }`}
    >
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

      {/* MOBILE */}
      <div
        className={`flex flex-col gap-[12px] sm:hidden relative w-full transition-all duration-300 ${
          showLang ? "pb-[8px]" : ""
        }`}
      >
        {/* TOP */}
        <div className="w-full flex items-center justify-between gap-[8px] min-w-0">
          {/* LOGO */}
          <img
            src={isDark ? LogoDark : Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="h-[clamp(32px,10vw,52px)] max-w-[clamp(140px,42vw,220px)] object-contain cursor-pointer shrink-0"
          />

          {/* ICONS */}
          <div className="flex items-center gap-[clamp(4px,2vw,10px)] shrink-0">
            {/* LANGUAGE */}
            <div className="relative">
              <button
                className={iconStyle("lang")}
                onClick={handleLanguageToggle}
              >
                <img
                  src={Language}
                  alt="lang"
                  className={imgStyle("lang")}
                />
              </button>
            </div>

            {/* DARKMODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                toggleTheme();
                setShowLang(false);
                onLanguageClick(false);
              }}
            >
              <img
                src={isDark ? Moon : Darkmode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>
          </div>
        </div>

        {/* LANGUAGE DROPDOWN */}
        {showLang && (
          <div className="w-full mt-[10px] relative z-[99999]">
            <div
              className={`w-full overflow-hidden rounded-[25px] p-[6px] ${
                isDark
                  ? "bg-[#060C1F] border border-[#586D93] shadow-xl"
                  : "bg-white shadow-m"
              }`}
            >
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full">
                {languages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLanguage(item)}
                    className={`flex-shrink-0 min-w-[90px] h-[36px] px-4 rounded-[35px] text-[13px] flex items-center justify-center whitespace-nowrap transition-all duration-300 ${
                      selectedLang === item
                        ? "bg-[#4866F6] text-white"
                        : isDark
                        ? "bg-transparent text-[#CBD5E1] hover:bg-[#131E3D] hover:text-white"
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

      {/* DESKTOP */}
      <div className="hidden sm:flex w-full rounded-full items-center justify-between gap-[15px]">
        {/* LEFT */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src={isDark ? LogoDark : Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="h-[clamp(32px,2.5vw,40px)] object-contain shrink-0 cursor-pointer"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-[clamp(10px,1.5vw,20px)] flex-wrap">
          {/* ICONS */}
          <div className="flex items-center gap-[clamp(8px,1vw,15px)]">
            {/* LANGUAGE */}
            <div className="relative">
              <button
                className={iconStyle("lang")}
                onClick={handleLanguageToggle}
              >
                <img
                  src={Language}
                  alt="lang"
                  className={imgStyle("lang")}
                />
              </button>

              {showLang && (
                <div className="absolute top-[70px] right-0 z-[9999]">
                  <div
                    className={`rounded-[35px] px-3 py-2 shadow-lg w-max max-w-[360px] ${
                      isDark
                        ? "bg-[#060C1F] border border-[#586D93]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar">
                      {languages.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectLanguage(item)}
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                            selectedLang === item
                              ? "bg-[#4866F6] text-white"
                              : isDark
                              ? "bg-transparent text-[#CBD5E1] hover:bg-[#131E3D] hover:text-white"
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

            {/* DARKMODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                toggleTheme();
                setShowLang(false);
                onLanguageClick(false);
              }}
            >
              <img
                src={isDark ? Moon : Darkmode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;