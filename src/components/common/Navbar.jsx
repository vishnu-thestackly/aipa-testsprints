import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Language from "../../assets/images/Language.svg";
import Notification from "../../assets/images/Notification.svg";
import Darkmode from "../../assets/images/Darkmode.svg";

const Navbar = ({ onLanguageClick }) => {
  const [activeBtn, setActiveBtn] = useState("");
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
const navigate=useNavigate();
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

  const iconStyle = (name) =>
    `w-[clamp(32px,9vw,48px)] h-[clamp(32px,9vw,48px)] min-w-[32px] min-h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group shrink-0 ${activeBtn === name
      ? "bg-[#4866F6]"
      : "bg-[#ECE9FF] hover:bg-[#4866F6]"
    }`;

  const imgStyle = (name) =>
    `w-[clamp(14px,4vw,22px)] h-[clamp(14px,4vw,22px)] transition-all duration-300 ${activeBtn === name
      ? "filter brightness-0 invert"
      : "group-hover:filter group-hover:brightness-0 group-hover:invert"
    }`;

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
      className="relative w-full bg-white rounded-[24px] sm:rounded-[41.5px] shadow-lg py-[clamp(10px,2vw,15px)] px-[clamp(8px,2vw,16px)] mx-auto mt-[15px] sm:mt-[20px] overflow-visible z-[9999]"
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
        className={`flex flex-col gap-[12px] sm:hidden relative w-full transition-all duration-300 ${showLang ? "pb-[8px]" : ""
          }`}
      >

        {/* TOP */}
        <div className="w-full flex items-center justify-between gap-[8px] min-w-0">

          {/* LOGO */}
<img src={Logo} alt="Logo" onClick={()=>navigate("/")} className="h-[clamp(32px,10vw,52px)] max-w-[clamp(140px,42vw,220px)] object-contain cursor-pointer shrink-0" />
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
                setActiveBtn("notify");
                setShowLang(false);
                onLanguageClick(false);
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
                setActiveBtn("mode");
                setShowLang(false);
                onLanguageClick(false);
              }}
            >
              <img
                src={Darkmode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>
          </div>
        </div>

        {/* LANGUAGE DROPDOWN */}
        {showLang && (
          <div className="w-full mt-[10px] relative z-[99999]">

            <div className="w-full overflow-hidden bg-white rounded-[25px] shadow-m p-[6px]">

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full">

                {languages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLanguage(item)}
                    className={`flex-shrink-0 min-w-[100px] h-[36px] px-4 rounded-[35px] text-[13px] flex items-center justify-center whitespace-nowrap transition-all duration-300 ${selectedLang === item
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

        {/* BUTTONS */}
        <div className="w-full flex items-center justify-between gap-[10px]">

          <button className="flex-1 h-[36px] rounded-[25px] bg-[#4866F6] text-white text-[14px] cursor-pointer">
            Log In
          </button>

          <button className="flex-1 h-[36px] rounded-[25px] bg-[#4866F6] text-white text-[14px] cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex w-full rounded-full items-center justify-between gap-[15px]">

        {/* LEFT */}
        <div className="flex items-center gap-3 shrink-0">

          <img src={Logo} alt="Logo" onClick={()=>navigate("/")} className="h-[clamp(32px,2.5vw,40px)] object-contain shrink-0 cursor-pointer"/>

          <div className="border-l h-8 border-[#CFCFCF]"></div>
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
                <div className="absolute top-[70px] left-0 z-[9999]">

                  <div className="bg-white rounded-[35px] px-3 py-2 shadow-lg w-max max-w-[360px]">

                    <div className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar">

                      {languages.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectLanguage(item)}
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${selectedLang === item
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
              className={iconStyle("notify")}
              onClick={() => {
                setActiveBtn("notify");
                setShowLang(false);
                onLanguageClick(false);
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
                setActiveBtn("mode");
                setShowLang(false);
                onLanguageClick(false);
              }}
            >
              <img
                src={Darkmode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-[clamp(8px,1vw,15px)]">

            <button onClick={() => navigate("/login")} className="px-5 h-10 min-w-[100px] rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition-all duration-300 cursor-pointer">
              Log In
            </button>

            <button onClick={() => navigate("/signup")} className="px-5 h-10 min-w-[100px] rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition-all duration-300 cursor-pointer">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;