import { useState } from "react";

export default function Preferences() {
  const [priority, setPriority] = useState("High");
  const [autoMark, setAutoMark] = useState(true);

  return (
    <div className="w-full h-full overflow-y-auto scrollbar-hide scroll-smooth p-[12px] md:p-6 bg-[#F8F8F8]">
      {/* Main Container */}
      <div className=" w-full md:max-w-[690px] lg:max-w-[1028px] min-h-screen bg-white border border-[#E5E5E5] rounded-[15px] lg:rounded-[25px] shadow-sm px-4 md:px-4 lg:px-[30px] py-5 lg:py-[24px] mx-auto">
        {/* <div className="w-full sm:w-[1028px] min-h-screen sm:h-[864px] bg-white border border-[#E5E5E5] rounded-[15px] sm:rounded-[25px] shadow-sm px-4 sm:px-[30px] py-5 sm:py-[24px]"> */}
        {/* Title */}
        <h2 className="w-[194px] h-[21px] leading-[100%] tracking-[0%] font-[510] text-[18px] text-[#3D3D3D]">
          AI Preference Settings
        </h2>

        {/* Divider */}
        <div className="border-b border-[#CFCFCF] mt-4 mb-4"></div>

        {/* Inner Card */}
        <div className="w-full sm:w-[968px] sm:h-[564px] bg-white border border-[#E5E5E5] rounded-[15px] shadow-[0px_0px_4px_rgba(61,61,61,0.15)] px-3 sm:px-[14px] py-4 sm:py-[16px]">
          {/* Preferred Meeting Times */}
          {/* Preferred Meeting Times */}
          <section className="pb-5 border-b border-[#E5E5E5]">
            <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">
              Preferred Meeting Times
            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:flex md:flex-wrap md:items-center md:gap-10">
              {["All", "Morning", "Afternoon", "Evening"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-[10px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={item === "All"}
                    className="w-[16px] h-[16px] accent-[#4C6FFF]"
                  />

                  <span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Email Tone Preference */}
          <section className="py-5 border-b border-[#E5E5E5]">
            <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">
              Email Tone Preference
            </h3>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 md:flex md:flex-wrap md:items-center md:gap-10">
              {["Formal", "Friendly", "Professional", "Casual"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-[10px] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="tone"
                    defaultChecked={item === "Formal"}
                    className="w-[16px] h-[16px] accent-[#4C6FFF]"
                  />

                  <span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Priority Defaults */}
          <section className="pt-5">
            <h3 className="text-[18px] leading-none font-[510] text-[#3D3D3D] mb-6">
              Priority Defaults
            </h3>

            {/* Default Task Priority */}
            <p className="text-[14px] text-[#5C6B8A] mb-3">
              Default Task Priority
            </p>

            {/* Segmented Control */}
            <div className="w-full max-w-[272px] h-[28px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-full p-[2px] flex items-center mb-6">
              {["High", "Medium", "Low"].map((item) => (
                <button
                  key={item}
                  onClick={() => setPriority(item)}
                  className={`flex-1 h-full rounded-full text-[13px] transition-all duration-200
                    ${
                      priority === item
                        ? "bg-[#4C6FFF] text-white"
                        : "text-[#5C6B8A]"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Toggle */}
            <div className="mb-6">
              <p className="text-[14px] text-[#5C6B8A] mb-4">
                Auto - Mark Urgent Task
              </p>

              <button
                onClick={() => setAutoMark(!autoMark)}
                className={`w-[32px] h-[18px] rounded-full relative transition-all
                ${autoMark ? "bg-[#4C6FFF]" : "bg-gray-300"}`}
              >
                <div
                  className={`w-[14px] h-[14px] bg-white rounded-full absolute top-[2px] transition-all
                  ${autoMark ? "right-[2px]" : "left-[2px]"}`}
                />
              </button>
            </div>

            {/* Reminder Frequency */}
            <div>
              <p className="text-[14px] text-[#5C6B8A] mb-4">
                Reminder Frequency
              </p>

              <div className="flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-10">
                {["Daily", "Scheduled Day", "A Day Before"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-[10px] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={item === "Daily"}
                      className="w-[16px] h-[16px] accent-[#4C6FFF]"
                    />

                    <span className="text-[13px] sm:text-[14px] text-[#5C6B8A]">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8 sm:mt-12 gap-10 ">
          <button className=" w-[102px] h-[44px] rounded-full border border-[#4C6FFF] bg-white text-[#4C6FFF] text-[14px] font-medium transition-all hover:bg-[#F5F7FF]">
            Cancel
          </button>
          <button className="w-[102px] h-[44px] rounded-full bg-[#4866F6] text-white text-[14px] hover:opacity-90 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
