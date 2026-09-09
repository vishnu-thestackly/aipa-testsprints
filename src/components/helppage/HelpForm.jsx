
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Flag from "../../assets/images/Flag.svg";
import { useTheme } from "../../context/ThemeContext";

const HelpForm = () => {
  const { isDark } = useTheme();

  const [showCountries, setShowCountries] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+91",
    name: "India",
    flag: Flag,
  });

  const countries = [
    { code: "+91", name: "India", flag: Flag },
    { code: "+61", name: "Australia", flag: Flag },
    { code: "+60", name: "Malaysia", flag: Flag },
    { code: "+44", name: "England", flag: Flag },
    { code: "+49", name: "Germany", flag: Flag },
    { code: "+39", name: "Italy", flag: Flag },
  ];

  return (
    <div
      className={`
        w-full
        max-w-[480px]
        border
        rounded-[32px]
        px-5
        py-6
        sm:px-7
        sm:py-8
        transition-colors
        duration-300

        ${
          isDark
            ? "bg-[#181F2D] border-[#34445F]"
            : "bg-[#F7F7F7] border-[#DDDDDD]"
        }
      `}
    >
      {/* TITLE */}
      <h2 className="text-[#4D5FFF] font-bold text-[2rem] mb-6">
        Let’s talk
      </h2>

      <form className="space-y-5">

        {/* FIRST NAME */}
        <Input
          label="First Name"
          placeholder="First Name"
          isDark={isDark}
        />

        {/* LAST NAME */}
        <Input
          label="Last Name"
          placeholder="Last Name"
          isDark={isDark}
        />

        {/* EMAIL */}
        <Input
          label="Email Address"
          placeholder="Enter Email Address"
          isDark={isDark}
        />

        {/* MOBILE NUMBER */}
        <div>
          <label
            className={`text-sm ${
              isDark ? "text-white" : "text-[#333]"
            }`}
          >
            Mobile number*
          </label>

          <div className="mt-2 flex gap-3">

            {/* COUNTRY SELECT */}
            <div className="relative w-[105px]">

              <button
                type="button"
                onClick={() => setShowCountries(!showCountries)}
                className={`
                  w-full
                  h-[50px]
                  border
                  rounded-[8px]
                  px-2
                  flex
                  items-center
                  justify-between
                  cursor-pointer
                  transition-colors
                  duration-300

                  ${
                    isDark
                      ? "bg-[#181F2D] border-[#34445F]"
                      : "bg-white border-[#D9D9D9]"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="w-5 h-5 object-contain"
                  />

                  <span
                    className={`text-[13px] ${
                      isDark ? "text-[#CBD5E1]" : "text-[#777]"
                    }`}
                  >
                    {selectedCountry.code}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  className={`
                    transition-transform
                    ${
                      isDark ? "text-[#94A3B8]" : "text-[#888]"
                    }
                    ${showCountries ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* COUNTRY DROPDOWN */}
              {showCountries && (
                <div
                  className={`
                    absolute
                    left-0
                    top-[55px]
                    z-50
                    w-[170px]
                    border
                    rounded-[10px]
                    shadow-[0px_4px_20px_rgba(0,0,0,0.25)]
                    overflow-hidden

                    ${
                      isDark
                        ? "bg-[#181F2D] border-[#34445F]"
                        : "bg-white border-[#E5E5E5]"
                    }
                  `}
                >
                  {countries.map((country, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountries(false);
                      }}
                      className={`
                        w-full
                        px-3
                        py-3
                        flex
                        items-center
                        gap-3
                        transition-colors
                        text-left

                        ${
                          isDark
                            ? "hover:bg-[#243149]"
                            : "hover:bg-[#F5F7FF]"
                        }
                      `}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-5 h-5 object-contain"
                      />

                      <span
                        className={`text-[13px] ${
                          isDark
                            ? "text-[#CBD5E1]"
                            : "text-[#555]"
                        }`}
                      >
                        {country.code} {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE INPUT */}
            <input
              type="text"
              placeholder="Enter mobile number"
              className={`
                flex-1
                h-[50px]
                border
                rounded-[8px]
                px-4
                outline-none
                text-sm
                transition-colors
                duration-300

                ${
                  isDark
                    ? "bg-[#181F2D] text-white border-[#34445F] placeholder:text-[#8D97A9]"
                    : "bg-[#F7F7F7] text-[#333] border-[#D9D9D9] placeholder:text-[#B8B8B8]"
                }
              `}
            />
          </div>
        </div>

        {/* MESSAGE */}
        <div>
          <label
            className={`text-sm ${
              isDark ? "text-white" : "text-[#333]"
            }`}
          >
            Message here
          </label>

          <textarea
            rows="5"
            placeholder="Enter message here"
            className={`
              w-full
              mt-2
              rounded-[14px]
              border
              px-4
              py-3
              outline-none
              resize-none
              text-sm
              transition-colors
              duration-300

              ${
                isDark
                  ? "bg-[#181F2D] text-white border-[#34445F] placeholder:text-[#8D97A9]"
                  : "bg-[#F7F7F7] text-[#333] border-[#D9D9D9] placeholder:text-[#B8B8B8]"
              }
            `}
          />
        </div>

        {/* SEND BUTTON */}
        <button
          type="submit"
          className="
            w-full
            h-[52px]
            rounded-full
            bg-[#4D5FFF]
            text-white
            font-medium
            hover:bg-[#3248ff]
            transition
            cursor-pointer
          "
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

/* INPUT COMPONENT */

const Input = ({ label, placeholder, isDark }) => {
  return (
    <div>
      <label
        className={`text-sm ${
          isDark ? "text-white" : "text-[#333]"
        }`}
      >
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full
          h-[50px]
          mt-2
          rounded-[12px]
          border
          px-4
          outline-none
          text-sm
          transition-colors
          duration-300

          ${
            isDark
              ? "bg-[#181F2D] text-white border-[#34445F] placeholder:text-[#8D97A9]"
              : "bg-[#F7F7F7] text-[#333] border-[#D9D9D9] placeholder:text-[#B8B8B8]"
          }
        `}
      />
    </div>
  );
};

export default HelpForm;

 