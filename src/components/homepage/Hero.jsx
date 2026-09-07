// Hero.jsx

import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <section
      className="
        w-full
        flex
        flex-col
        items-center
        text-center
        text-white
        pt-[70px]
        sm:pt-[90px]
        lg:pt-[105px]
      "
    >
      <div
        className="
          w-full
          max-w-[1400px]
          mx-auto
          flex
          flex-col
          items-center
        "
      >
        {/* SUBTITLE */}
        <p
          className={`
            ${isDark ? "text-[#CBD5E1]" : "text-white/95"}
            font-[600]
            text-[24px]
            sm:text-[30px]
            lg:text-[32px]
            leading-normal
            transition-colors
            duration-300
          `}
        >
          Welcome to your
        </p>

        {/* TITLE */}
        <h1
          className="
            mt-[10px]
            font-[700]
            text-[clamp(2rem,7.8vw,3.6rem)]
            sm:text-[70px]
            lg:text-[92px]
            leading-[1]
            tracking-[-0.04em]
            text-center
            whitespace-nowrap
            text-white
          "
        >
          AI Personal Assistant
        </h1>

        {/* DESCRIPTION */}
        <p
          className={`
            mt-[28px]
            w-full
            max-w-[1120px]
            mx-auto
            text-center
            ${isDark ? "text-[#94A3B8]" : "text-white/80"}
            font-[350]
            text-[18px]
            sm:text-[20px]
            lg:text-[24px]
            leading-[42px]
            tracking-[0.025em]
            transition-colors
            duration-300
          `}
        >
          AI Personal Assistant is a platform to create,
          manage, and optimize daily activities using the power
          of AI. Use it to generate content and efficiently
          handle meetings, tasks, and reminders.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/conversation")}
          className={`mt-[38px] w-[82%] sm:w-full max-w-[280px] sm:max-w-[375px] h-[56px] sm:h-[64px] rounded-full text-[16px] sm:text-[20px] font-[600] cursor-pointer transition-all duration-300 ${
            isDark
              ? "bg-[#4866F6] text-white border-0 hover:bg-[#3B59E0] shadow-[0_8px_25px_rgba(72,102,246,0.35)] active:scale-95"
              : "border-[2px] border-[#4866F6] bg-white text-[#4866F6] shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:bg-[#4866F6] hover:text-white"
          }`}
        >
          Start New Conversation
        </button>
      </div>
    </section>
  );
};

export default Hero;