import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function PricingPlans() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [centerIndex, setCenterIndex] = useState(1);
  const [featurePages, setFeaturePages] = useState({});

  const plans = [
    {
      id: "free",
      price: "$0.00",
      period: "/ month",
      name: "Free plan",
      desc: "Best plan for the fresher individuals",
      features: [
        { text: "Culpa qui official", included: true },
        { text: "Deserunt mollitia an", included: true },
        { text: "Imi, id est laborum et", included: true },
        { text: "Dolorum fuga Et har", included: false },
        { text: "Um quidem rerum", included: false },
      ],
    },
    {
      id: "basic",
      price: "$99.00",
      period: "/ monthly",
      name: "Basic plan",
      desc: "Best plan for the fresher individuals",
      features: [
        { text: "Culpa qui official", included: true },
        { text: "Deserunt mollitia an", included: true },
        { text: "Imi, id est laborum et", included: true },
        { text: "Dolorum fuga Et har", included: true },
        { text: "Um quidem rerum", included: true },
        { text: "Excepteur sint occaecat", included: true },
        { text: "Sunt in culpa qui officia", included: true },
      ],
    },
    {
      id: "premium",
      price: "$999.00",
      period: "/ yearly",
      name: "Premium plan",
      desc: "Best plan for the fresher individuals",
      features: [
        { text: "Culpa qui official", included: true },
        { text: "Deserunt mollitia an", included: true },
        { text: "Imi, id est laborum et", included: true },
        { text: "Dolorum fuga Et har", included: true },
        { text: "Um quidem rerum", included: true },
      ],
    },
  ];

  const handleNextFeatures = (planId) => {
    setFeaturePages((prev) => ({
      ...prev,
      [planId]: (prev[planId] || 0) + 1,
    }));
  };

  const handlePrevFeatures = (planId) => {
    setFeaturePages((prev) => ({
      ...prev,
      [planId]: Math.max(0, (prev[planId] || 0) - 1),
    }));
  };

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % 3);
  };

  // Carousel order centered around centerIndex
  const visibleCards = [
    plans[(centerIndex - 1 + 3) % 3],
    plans[centerIndex],
    plans[(centerIndex + 1) % 3],
  ];

  return (
    <section className="mt-16 lg:mt-24">
      {/* Title & Subtitle */}
      <div className="w-full flex flex-col items-center justify-center mb-8 md:mb-10 text-center">
        {/* Title */}
        <h2
          className={`
            font-sans
            font-bold
            ${isDark ? "text-white" : "text-[#2F2F2F]"}
            text-[24px]
            sm:text-[28px]
            md:text-[34px]
            leading-[125%]
            text-center
            mx-auto
            max-w-[290px]
            sm:max-w-none
            md:whitespace-nowrap
            px-4
            transition-colors
            duration-300
          `}
        >
          Find the right plan to power your workflow.
        </h2>

        {/* Description */}
        <p
          className={`
            mt-4
            text-center
            font-normal
            ${isDark ? "text-[#FFFFFFCC]" : "text-[#586D93]"}
            mx-auto
            px-4
            max-w-[785px]
            transition-colors
            duration-300
          `}
          style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "26px",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Find a plan that fits your workflow and unlock access to premium features, faster
          <br className="hidden md:inline" />{" "}
          performance, and enhanced productivity tools. Start with what you need today and scale
          <br className="hidden md:inline" />{" "}
          confidently as your projects.
        </p>
      </div>

      {/* Plans Carousel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch px-4 xl:px-12 mt-12 max-w-[1400px] mx-auto">
        {visibleCards.map((plan, posIdx) => {
          const isCenterCard = posIdx === 1;
          const pageIndex = featurePages[plan.id] || 0;
          const startIndex = pageIndex * 5;
          const displayedFeatures = plan.features.slice(startIndex, startIndex + 5);

          return (
            <div
              key={plan.id}
              className={`rounded-[24px] p-6 sm:p-7 lg:p-8 transition-all duration-300 flex flex-col min-w-0 ${
                isDark
                  ? "bg-[#050B1A] border-[1.5px] border-[#586D93] shadow-2xl backdrop-blur-md hover:border-[#4866F6]"
                  : isCenterCard
                  ? "border-2 border-[#4866F6] shadow-xl md:scale-105 z-10 my-2 bg-white"
                  : "border border-gray-200 shadow-sm md:scale-95 opacity-90 bg-white"
              }`}
            >
              {/* Price */}
              <div className="mb-4 sm:mb-5 flex items-baseline flex-wrap gap-1.5">
                <span
                  className={`text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight ${
                    isDark ? "text-[#4866F6]" : "text-[#4866F6]"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`${
                    isDark ? "text-[#FFFFFFCC]" : "text-[#586D93]"
                  } text-sm sm:text-base font-normal ml-1`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Plan Name */}
              <h3
                className={`text-2xl sm:text-[26px] font-bold mb-1.5 ${
                  isDark ? "text-white" : "text-[#000000]"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`${
                  isDark ? "text-[#FFFFFFCC]" : "text-[#586D93]"
                } text-[14px] sm:text-[15px] font-normal mb-4 sm:mb-5`}
              >
                {plan.desc}
              </p>

              {/* Divider Line */}
              <div
                className={`w-full h-[1px] mb-5 sm:mb-6 ${
                  isDark ? "bg-[#586D93]" : "bg-gray-100"
                }`}
              />

              {/* Features List */}
              <div className="flex-1 flex flex-col mb-6 lg:mb-8">
                <ul className="space-y-3.5 sm:space-y-4">
                  {displayedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 flex-nowrap">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included
                            ? "bg-[#4866F6]"
                            : isDark
                            ? "bg-[#CBD5E1]"
                            : "bg-[#D9D9D9]"
                        }`}
                      >
                        {feature.included ? (
                          <Check
                            className={`w-3.5 h-3.5 ${
                              isDark ? "text-black" : "text-white"
                            }`}
                            strokeWidth={2.8}
                          />
                        ) : (
                          <X
                            className={`w-3 h-3 ${
                              isDark ? "text-black" : "text-white"
                            }`}
                            strokeWidth={2.8}
                          />
                        )}
                      </div>
                      <span
                        className={`text-[14px] sm:text-[15px] font-normal ${
                          isDark ? "text-white" : "text-[#586D93]"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.features.length > 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (pageIndex === 0) {
                        handleNextFeatures(plan.id);
                      } else {
                        handlePrevFeatures(plan.id);
                      }
                    }}
                    className="text-[#4866F6] text-[14px] sm:text-[15px] font-medium underline cursor-pointer mt-3.5 text-left w-fit hover:opacity-80 transition-opacity"
                  >
                    {pageIndex === 0 ? "...View More" : "View Less"}
                  </button>
                )}
              </div>

              {/* Action Button: Continue -> */}
              <button
                onClick={() => navigate("/login")}
                className="w-full max-w-[160px] sm:max-w-[180px] h-11 sm:h-12 rounded-full font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all mt-auto mx-auto bg-[#4866F6] text-white hover:bg-[#3554ED] cursor-pointer active:scale-95 shadow-md"
              >
                <span>Continue</span>
                <span className="text-[16px] font-bold">→</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-8 md:mt-10 mb-8">
        <button
          onClick={handlePrev}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95 ${
            isDark
              ? "bg-[#050B1A] border-[1.5px] border-[#586D93] text-[#586D93] hover:text-[#4866F6] hover:border-[#4866F6] hover:bg-[#0E1B38]"
              : "bg-[#4866F6] text-white hover:bg-[#3554ED]"
          }`}
          aria-label="Previous plan"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95 ${
            isDark
              ? "bg-[#050B1A] border-[1.5px] border-[#586D93] text-[#586D93] hover:text-[#4866F6] hover:border-[#4866F6] hover:bg-[#0E1B38]"
              : "bg-[#4866F6] text-white hover:bg-[#3554ED]"
          }`}
          aria-label="Next plan"
        >
          <ArrowLeft className="w-5 h-5 rotate-180" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}