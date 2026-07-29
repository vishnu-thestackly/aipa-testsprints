import { ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PricingPlans() {
  const navigate = useNavigate();
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
        { text: "Excepteur sint occaecat", included: false },
        { text: "Sunt in culpa qui officia", included: false },
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
        { text: "Excepteur sint occaecat", included: true },
        { text: "Sunt in culpa qui officia", included: true },
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
          className="
            font-sans
            font-bold
            text-[#2F2F2F]
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
          "
        >
          Find the right plan to power your workflow.
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            text-center
            font-sans
            font-normal
            text-[#586D93]
            text-[12px]
            sm:text-[14px]
            md:text-[15px]
            lg:text-[16px]
            xl:text-[18px]
            leading-[1.65]
            mx-auto
            px-4
            max-w-[290px]
            sm:max-w-[430px]
            md:max-w-[700px]
            lg:max-w-[760px]
            xl:max-w-[820px]
          "
        >
          Find a plan that fits your workflow and unlock access to premium features,
          faster performance, and enhanced productivity tools. Start with what you
          need today and scale confidently as your projects.
        </p>
      </div>

      {/* Plans Carousel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start px-4 xl:px-12 mt-12 max-w-[1400px] mx-auto">
        {visibleCards.map((plan, posIdx) => {
          const isCenterCard = posIdx === 1;
          const pageIndex = featurePages[plan.id] || 0;
          const startIndex = pageIndex * 5;
          const displayedFeatures = plan.features.slice(startIndex, startIndex + 5);

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 flex flex-col min-w-0 bg-white lg:h-[460px] xl:h-[510px] ${isCenterCard
                  ? "border-2 border-[#4866F6] shadow-xl md:scale-105 z-10 my-2"
                  : "border border-gray-200 shadow-sm md:scale-95 opacity-90"
                }`}
            >
              {/* Price */}
              <div className="mb-3 sm:mb-4 flex items-baseline flex-wrap">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#4866F6]">
                  {plan.price}
                </span>
                <span className="text-[#586D93] text-xs sm:text-sm ml-1">
                  {plan.period}
                </span>
              </div>

              {/* Plan Name */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#000000] mb-1">
                {plan.name}
              </h3>
              <p className="text-[#586D93] text-[9px] sm:text-[10px] md:text-[11px] lg:text-sm whitespace-nowrap mb-4 lg:mb-6 border-b border-gray-100 pb-4">
                {plan.desc}
              </p>

              {/* Features List */}
              <div className="flex-1 flex flex-col mb-6 lg:mb-8">
                <ul className="space-y-2.5 sm:space-y-3 h-[140px] sm:h-[150px] lg:h-[160px] xl:h-[185px]">
                  {displayedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 flex-nowrap">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feature.included ? "bg-[#4866F6]" : "bg-[#D9D9D9]"
                          }`}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                        ) : (
                          <X className="w-3 h-3 text-white" strokeWidth={2.5} />
                        )}
                      </div>
                      <span
                        className={`text-xs sm:text-sm ${feature.included ? "text-[#586D93]" : "text-gray-400"
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
                    className="text-[#4866F6] text-xs sm:text-sm font-medium underline cursor-pointer mt-3 text-left w-fit hover:opacity-80 transition-opacity"
                  >
                    {pageIndex === 0 ? "...View More" : "View Less"}
                  </button>
                )}
              </div>

              {/* Action Button: Continue -> */}
              <button
                onClick={() => navigate("/login")}
                className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] h-10 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all mt-auto mx-auto bg-[#4866F6] text-white hover:bg-[#3554ED] cursor-pointer active:scale-95"
              >
                <span>Continue</span>
                <span className="text-[14px] font-bold">→</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-3 mt-8 md:mt-10 mb-8">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-[#4866F6] text-white flex items-center justify-center cursor-pointer hover:bg-[#3554ED] transition-all shadow-md active:scale-95"
          aria-label="Previous plan"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-[#4866F6] text-white flex items-center justify-center cursor-pointer hover:bg-[#3554ED] transition-all shadow-md active:scale-95"
          aria-label="Next plan"
        >
          <ArrowLeft className="w-5 h-5 rotate-180" strokeWidth={2.5} />
        </button>
      </div>
    </section>
  );
}