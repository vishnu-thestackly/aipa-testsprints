import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Flag from "../../assets/images/Flag.svg";

const HelpForm = () => {
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
    <div className="w-full max-w-[480px] bg-[#F7F7F7] border border-[#DDDDDD] rounded-[32px] px-5 py-6 sm:px-7 sm:py-8">
      <h2 className="text-[#4D5FFF] font-bold text-[2rem] mb-6">
        Let’s talk
      </h2>

      <form className="space-y-5">
        <Input label="First Name" placeholder="First Name" />

        <Input label="Last Name" placeholder="Last Name" />

        <Input
          label="Email Address"
          placeholder="Enter Email Address"
        />

        {/* Mobile Number */}
        <div>
          <label className="text-[#333] text-sm">
            Mobile number*
          </label>

          <div className="mt-2 flex gap-3">
            <div className="relative w-[105px]">
              <button
                type="button"
                onClick={() =>
                  setShowCountries(!showCountries)
                }
                className="w-full h-[50px] bg-white border border-[#D9D9D9] rounded-[8px] px-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="w-5 h-5 object-contain"
                  />

                  <span className="text-[13px] text-[#777]">
                    {selectedCountry.code}
                  </span>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-[#888] transition-transform ${
                    showCountries ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCountries && (
                <div className="absolute left-0 top-[55px] z-50 w-[170px] bg-white border border-[#E5E5E5] rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.12)] overflow-hidden">
                  {countries.map((country, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountries(false);
                      }}
                      className="w-full px-3 py-3 flex items-center gap-3 hover:bg-[#F5F7FF] transition-colors text-left"
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-5 h-5 object-contain"
                      />

                      <span className="text-[13px] text-[#555]">
                        {country.code} {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Enter mobile number"
              className="flex-1 h-[50px] border border-[#D9D9D9] rounded-[8px] px-4 outline-none text-sm placeholder:text-[#B8B8B8]"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-[#333] text-sm">
            Message here
          </label>

          <textarea
            rows="5"
            placeholder="Enter message here"
            className="w-full mt-2 rounded-[14px] border border-[#D9D9D9] px-4 py-3 outline-none resize-none text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full h-[52px] rounded-full bg-[#4D5FFF] text-white font-medium hover:bg-[#3248ff] transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, placeholder }) => {
  return (
    <div>
      <label className="text-[#333] text-sm">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[50px] mt-2 rounded-[12px] border border-[#D9D9D9] px-4 outline-none text-sm placeholder:text-[#B8B8B8]"
      />
    </div>
  );
};

export default HelpForm;