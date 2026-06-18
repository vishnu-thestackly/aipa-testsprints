import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/Logo.svg";
import Lang from "../../assets/images/Language.svg";
import Notification from "../../assets/images/Notification.svg";
import Mode from "../../assets/images/Darkmode.svg";

const HelpHeader = () => {

  const [activeBtn, setActiveBtn] =
    useState("");

  const [showLang, setShowLang] =
    useState(false);

  const [selectedLang, setSelectedLang] =
    useState("English");

  const wrapperRef = useRef(null);

  const navigate = useNavigate();

  const languages = [
    "English",
    "Spanish",
    "German",
    "French",
    "Hindi",
    "Tamil",
  ];

  // OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowLang(false);
        setActiveBtn("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  // ICON BUTTON STYLE
  const iconStyle = (name) =>
    `
    w-[2.5vw]
    h-[2.5vw]

    min-w-[38px]
    min-h-[38px]

    rounded-full

    flex
    items-center
    justify-center

    transition-all
    duration-300

    cursor-pointer
    group

    ${
      activeBtn === name
        ? "bg-[#4D5FFF]"
        : "bg-[#ECE9FF] hover:bg-[#4D5FFF]"
    }
  `;

  // ICON IMAGE STYLE
  const imgStyle = (name) =>
    `
    w-[1.1vw]
    min-w-[18px]

    transition

    ${
      activeBtn === name
        ? "brightness-0 invert"
        : "group-hover:brightness-0 group-hover:invert"
    }
  `;

  return (
    <div
      className="w-full relative"
      ref={wrapperRef}
    >

      {/* HEADER */}
      <header
        className="
          w-full
          min-h-[72px]

          bg-[#F5F5F5]

          rounded-full

          px-[2%]

          flex
          items-center
          justify-between
          gap-4

          shadow-md
        "
      >

        {/* LEFT */}
        <div className="hidden md:flex items-center gap-3">

          {/* LOGO */}
          <img
            src={logo}
            alt="Logo"

            onClick={() => navigate("/")}

            className="
              w-[12vw]
              min-w-[120px]
              max-w-[220px]

              object-contain
              cursor-pointer
            "
          />

          <div className="w-[1px] h-[4vh] bg-[#D9D9D9]" />

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-[1vw]">

          {/* ICONS */}
          <div className="flex items-center gap-[0.8vw]">

            {/* LANGUAGE */}
            <button
              className={iconStyle("lang")}
              onClick={() => {
                if (showLang) {
                  setShowLang(false);
                  setActiveBtn("");
                } else {
                  setShowLang(true);
                  setActiveBtn("lang");
                }
              }}
            >
              <img
                src={Lang}
                alt="lang"
                className={imgStyle("lang")}
              />
            </button>

            {/* NOTIFICATION */}
            <button
              className={iconStyle("notify")}
              onClick={() => {
                setActiveBtn("notify");
                setShowLang(false);
              }}
            >
              <img
                src={Notification}
                alt="notify"
                className={imgStyle("notify")}
              />
            </button>

            {/* MODE */}
            <button
              className={iconStyle("mode")}
              onClick={() => {
                setActiveBtn("mode");
                setShowLang(false);
              }}
            >
              <img
                src={Mode}
                alt="mode"
                className={imgStyle("mode")}
              />
            </button>

          </div>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-[0.8vw]">

            {/* LOGIN */}
            <button
              onClick={() => navigate("/login")}
              className="
                px-[2vw]
                py-[0.8vh]

                min-h-[42px]

                rounded-full

                bg-[#4D5FFF]

                text-white

                text-[0.9rem]

                hover:bg-[#3248ff]

                transition
              "
            >
              Log In
            </button>

            {/* SIGN UP */}
            <button
              onClick={() => navigate("/signup")}
              className="
                px-[2vw]
                py-[0.8vh]

                min-h-[42px]

                rounded-full

                bg-[#4D5FFF]

                text-white

                text-[0.9rem]

                hover:bg-[#3248ff]

                transition
              "
            >
              Sign Up
            </button>

          </div>

        </div>
      </header>

      {/* LANGUAGE DROPDOWN */}
      <div
        className={`
          absolute
          top-[82px]
          right-0
          z-50

          transition-all
          duration-300
          ease-in-out

          ${
            showLang
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      >

        {/* POSITION CONTROL */}
        <div className="mr-[35px]">

          {/* DROPDOWN CONTAINER */}
          <div
            className="
              w-[360px]

              bg-[#F5F5F5]

              border
              border-[#E5E5E5]

              rounded-full

              px-[8px]
              py-[3px]

              overflow-x-auto
              overflow-y-hidden

              whitespace-nowrap

              scroll-smooth

              touch-pan-x

              [scrollbar-width:none]
              [-ms-overflow-style:none]

              cursor-grab
              active:cursor-grabbing

              select-none

              shadow-md
            "
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >

            {/* SCROLL CONTENT */}
            <div
              className="
                flex
                items-center

                gap-[8px]

                min-w-max
              "
            >

              {languages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedLang(item);
                    setShowLang(false);
                    setActiveBtn("");
                  }}
                  className={`
                    flex-shrink-0

                    min-w-[115px]

                    h-[36px]

                    px-[14px]

                    rounded-full

                    whitespace-nowrap

                    text-[0.82rem]

                    flex
                    items-center
                    justify-center

                    transition-all
                    duration-300

                    ${
                      selectedLang === item
                        ? "bg-[#4D5FFF] text-white shadow-sm"
                        : "bg-transparent text-[#4D5FFF] hover:bg-[#EEF1FF]"
                    }
                  `}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default HelpHeader;


