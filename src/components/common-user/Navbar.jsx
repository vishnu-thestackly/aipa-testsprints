import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoDark from "../../assets/images/Logoimg.svg";
import Language from "../../assets/images/Language.svg";
import Notification from "../../assets/images/Notification.svg";
import Darkmode from "../../assets/images/Darkmode.svg";
import Moon from "../../assets/images/moon.svg";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ onLanguageClick, fixed = true }) => {
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
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowLang(false);
        setActiveBtn("");
        if (onLanguageClick) onLanguageClick(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onLanguageClick]);

  const isBtnActive = (name) => {
    if (name === "lang") return showLang || activeBtn === "lang";
    return activeBtn === name;
  };

  const iconStyle = (name) => {
    const selected = isBtnActive(name);
    if (isDark) {
      const isHighlighted = name === "mode" || selected;
      return `w-[clamp(32px,9vw,44px)] h-[clamp(32px,9vw,44px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${
        isHighlighted
          ? "bg-[#4866F6] text-white shadow-[0_0_14px_rgba(72,102,246,0.6)] border-[1.5px] border-[#4866F6]"
          : "bg-[#060C1F] border-[1.5px] border-[#4866F6] hover:bg-[#4866F6] hover:border-[#4866F6] text-[#4866F6]"
      }`;
    }

    return `w-[clamp(32px,9vw,48px)] h-[clamp(32px,9vw,48px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${
      activeBtn === name
        ? "bg-[#4866F6]"
        : "bg-[#ECE9FF] hover:bg-[#4866F6]"
    }`;
  };

  const imgStyle = (name) => {
    const selected = isBtnActive(name);
    if (isDark && name === "mode") {
      return `w-[clamp(14px,4vw,20px)] h-[clamp(14px,4vw,20px)] transition-all duration-300`;
    }
    return `w-[clamp(14px,4vw,20px)] h-[clamp(14px,4vw,20px)] transition-all duration-300 ${
      selected
        ? "filter brightness-0 invert"
        : "group-hover:filter group-hover:brightness-0 group-hover:invert"
    }`;
  };

  const handleLanguageToggle = () => {
    const updatedState = !showLang;
    setShowLang(updatedState);
    setActiveBtn(updatedState ? "lang" : "");
    if (onLanguageClick) onLanguageClick(updatedState);
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${
        fixed
          ? "fixed top-[15px] left-1/2 -translate-x-1/2 w-[96%]"
          : "relative w-full"
      } ${
        isDark
          ? "bg-[#050B1A]/95 border-[1.5px] border-[#586D93] shadow-2xl backdrop-blur-md"
          : "bg-white shadow-lg"
      } rounded-[24px] sm:rounded-[41.5px] py-[clamp(10px,1.8vw,14px)] px-[clamp(10px,2vw,20px)] overflow-visible z-[9999] transition-all duration-300`}
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
            className="h-[clamp(32px,10vw,48px)] max-w-[clamp(140px,42vw,220px)] object-contain cursor-pointer shrink-0"
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

            {/* NOTIFICATION */}
            <button
              className={iconStyle("notify")}
              onClick={() => {
                setActiveBtn(activeBtn === "notify" ? "" : "notify");
                setShowLang(false);
                if (onLanguageClick) onLanguageClick(false);
              }}
            >
              <img
                src={Notification}
                alt="notify"
                className={imgStyle("notify")}
              />
            </button>

            {/* DARKMODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                toggleTheme();
                setShowLang(false);
                if (onLanguageClick) onLanguageClick(false);
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
              className={`w-full overflow-hidden ${
                isDark
                  ? "bg-[#050B1A] border-[1.5px] border-[#586D93] shadow-2xl"
                  : "bg-white shadow-m"
              } rounded-[35px] p-[5px]`}
            >
              <div className="flex items-center justify-between w-full gap-1">
                {languages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLanguage(item)}
                    className={`flex-1 h-[36px] px-4 rounded-full text-[13px] font-medium flex items-center justify-center whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      selectedLang === item
                        ? "bg-[#4866F6] text-white shadow-sm"
                        : isDark
                        ? "bg-transparent text-[#CBD5E1] hover:text-white hover:bg-[#131D38]"
                        : "bg-transparent text-gray-700 hover:bg-[#eef1ff] hover:text-[#4866F6]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="w-full flex items-center justify-between gap-[10px]">
          <button
            onClick={() => navigate("/login")}
            className={`flex-1 h-[36px] rounded-[25px] ${
              isDark
                ? "bg-[#0A1326] border-[1.5px] border-[#586D93] text-[#E2E8F0] hover:bg-[#131D38]"
                : "bg-[#4866F6] text-white"
            } text-[14px] cursor-pointer transition-all duration-300 font-medium`}
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="flex-1 h-[36px] rounded-[25px] bg-[#4866F6] text-white text-[14px] cursor-pointer hover:bg-[#3B59E0] transition-all duration-300 font-medium shadow-md"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex w-full rounded-full items-center justify-between gap-[15px] relative">
        {/* LEFT */}
        <div className="flex items-center gap-3.5 shrink-0">
          <img
            src={isDark ? LogoDark : Logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="h-[clamp(30px,2.4vw,38px)] object-contain shrink-0 cursor-pointer"
          />

          <div
            className={`border-l-[1.5px] h-7 ${
              isDark ? "border-[#586D93]" : "border-[#CFCFCF]"
            }`}
          ></div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-[clamp(10px,1.5vw,18px)] flex-wrap">
          {/* ICONS */}
          <div className="flex items-center gap-[clamp(8px,1vw,14px)]">
            {/* LANGUAGE BUTTON */}
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

            {/* NOTIFICATION */}
            <button
              className={iconStyle("notify")}
              onClick={() => {
                setActiveBtn(activeBtn === "notify" ? "" : "notify");
                setShowLang(false);
                if (onLanguageClick) onLanguageClick(false);
              }}
            >
              <img
                src={Notification}
                alt="notify"
                className={imgStyle("notify")}
              />
            </button>

            {/* DARKMODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                toggleTheme();
                setShowLang(false);
                if (onLanguageClick) onLanguageClick(false);
              }}
            >
              <img
                src={isDark ? Moon : Darkmode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-[clamp(8px,1vw,14px)]">
            <button
              onClick={() => navigate("/login")}
              className={`px-5 h-10 min-w-[95px] rounded-full ${
                isDark
                  ? "bg-[#0A1326] border-[1.5px] border-[#586D93] text-[#E2E8F0] hover:bg-[#131D38] hover:text-white hover:border-[#4866F6]"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } text-sm transition-all duration-300 cursor-pointer font-medium`}
            >
              Log In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 h-10 min-w-[95px] rounded-full bg-[#4866F6] text-white text-sm hover:bg-[#3B59E0] transition-all duration-300 cursor-pointer font-medium shadow-md active:scale-95 border border-transparent"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* DESKTOP LANGUAGE DROPDOWN (Right-aligned pill box with 3 wide options) */}
        {showLang && (
          <div className="absolute top-[62px] sm:top-[66px] right-0 z-[9999] transition-all duration-300 animate-fadeIn">
            <div
              className={`${
                isDark
                  ? "bg-[#050B1A] border-[1.5px] border-[#586D93] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                  : "bg-white shadow-lg border border-gray-100"
              } rounded-full p-[4px] min-w-[360px] sm:min-w-[380px]`}
            >
              <div className="flex items-center justify-between w-full px-1 gap-1">
                {languages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLanguage(item)}
                    className={`flex-1 min-w-[105px] sm:min-w-[115px] h-[36px] px-5 rounded-full text-sm font-medium flex items-center justify-center whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      selectedLang === item
                        ? "bg-[#4866F6] text-white shadow-sm"
                        : isDark
                        ? "bg-transparent text-[#CBD5E1] hover:text-white hover:bg-[#131D38]"
                        : "bg-transparent text-gray-700 hover:bg-[#eef1ff] hover:text-[#4866F6]"
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
    </div>
  );
};

export default Navbar;