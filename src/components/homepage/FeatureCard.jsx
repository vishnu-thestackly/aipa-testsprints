// FeatureCard.jsx

import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const FeatureCard = ({
  title,
  desc,
  image,
  path,
}) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div
      className={`
        relative
        w-full
        mt-5
        sm:mt-6
        lg:mt-7
        h-[235px]
        md:h-[240px]
        lg:h-[185px]
        xl:h-[195px]
        2xl:h-[220px]
        rounded-[24px]
        overflow-hidden
        group
        ${isDark ? "border-[1.5px] border-[#586D93] shadow-2xl bg-[#060D1F]" : ""}
        transition-all
        duration-300
      `}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* OVERLAY */}
      <div
        className={`
          absolute
          inset-0
          ${
            isDark
              ? "bg-gradient-to-t from-[#040817]/95 via-[#040817]/50 to-transparent"
              : "bg-gradient-to-t from-black/65 via-black/20 to-transparent"
          }
        `}
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          h-full
          p-4
          md:p-5
          lg:p-4
          2xl:p-5
          flex
          flex-col
          justify-end
          text-white
        "
      >
        {/* TITLE */}
        <h3
          className="
            font-semibold
            text-[16px]
            md:text-[18px]
            lg:text-[17px]
            xl:text-[19px]
            2xl:text-[22px]
            md:translate-y-[6px]
            lg:translate-y-0
            text-white
          "
        >
          {title}
        </h3>

        {/* BOTTOM */}
        <div
          className="
            mt-2
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-3
            lg:gap-2
          "
        >
          {/* DESC */}
          <p
            className={`
              w-full
              text-[14px]
              min-[360px]:text-[15px]
              min-[375px]:text-[16px]
              min-[425px]:text-[17px]
              md:text-[15px]
              lg:text-[11px]
              xl:text-[12px]
              2xl:text-[14px]
              leading-[1.7]
              max-w-full
              md:w-auto
              lg:max-w-[60%]
              xl:max-w-[64%]
              lg:whitespace-normal
              ${isDark ? "text-[#94A3B8]" : "text-white"}
            `}
          >
            {desc}
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate(path)}
            className="
              w-fit
              px-3
              md:w-[115px]
              lg:w-auto
              lg:px-2
              xl:px-3
              h-[32px]
              md:h-[40px]
              lg:h-[32px]
              xl:h-[38px]
              2xl:h-[44px]
              rounded-full
              bg-[#4866F6]
              text-white
              text-[15px]
              min-[375px]:text-[16px]
              md:text-[13px]
              lg:text-[10px]
              xl:text-[12px]
              2xl:text-[14px]
              hover:bg-[#3248ff]
              transition
              cursor-pointer
              whitespace-nowrap
              shrink-0
              font-medium
              shadow-sm
            "
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;