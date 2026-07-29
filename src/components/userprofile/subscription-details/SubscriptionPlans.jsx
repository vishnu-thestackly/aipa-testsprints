import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptionDetails } from "../../../api/authApi";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState("free");
  const [centerIndex, setCenterIndex] = useState(0);
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

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await getSubscriptionDetails();
        console.log("SubscriptionPlans API Response:", response);
        const name = (response?.plan_name || "").toLowerCase();

        if (name.includes("free")) {
          setCurrentPlan("free");
          setCenterIndex(0);
        } else if (name.includes("premium")) {
          setCurrentPlan("premium");
          setCenterIndex(2);
        } else {
          setCurrentPlan("basic");
          setCenterIndex(1);
        }
      } catch (err) {
        console.error("Error fetching subscription plans:", err);
      }
    };

    fetchCurrentPlan();
  }, []);

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

  const handlePlanAction = (planId) => {
    if (planId === currentPlan) return;
    navigate("/user/profile/details");
  };

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % 3);
  };

  const isUpgraded = currentPlan !== "free";

  // Carousel order centered on centerIndex is used always
  const visibleCards = [
    plans[(centerIndex - 1 + 3) % 3],
    plans[centerIndex],
    plans[(centerIndex + 1) % 3],
  ];

  return (
    <div className="h-full overflow-y-auto px-1.5 sm:px-4 lg:px-6 pt-4 lg:pt-4 pb-10 scrollbar-hide">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] sm:p-5 md:p-6 lg:p-7 shadow-[0px_0px_4px_0px_#00000014]">
          {/* Header Navigation */}
          <div className="flex items-center gap-2 mb-9 md:mb-12 pb-4 md:pb-5 border-b border-[#D9D9D9]">
            <div
              onClick={() => navigate("/user/profile")}
              className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft
                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-['SF_Pro'] text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-3xl text-[#3D3D3D]">
              Subscription Plans
            </span>
          </div>

          {/* Title & Subtitle */}
          <div
            className="
    w-full
    flex
    flex-col
    items-center
    justify-center

    -mt-2
    md:-mt-2
    lg:-mt-3

    mb-8
    md:mb-8
    lg:mb-10
  "
          >
            <div className="w-full flex flex-col items-center">

              <h1
                className="
        font-sans
        font-bold
        text-[#3D3D3D]
        text-[18px]
        sm:text-[24px]
        md:text-[24px]
        lg:text-[28px]
        xl:text-[36px]
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
              </h1>

              {/* Description */}
              <p
                className="
    mt-4
    text-center
    font-sans
    font-normal
    text-[#586D93]

    text-[13px]
    sm:text-[14px]
    md:text-[15px]
    min-[1024px]:text-[18px]
    xl:text-[22px]

    leading-[1.6]
    px-2

    max-w-[280px]
    min-[375px]:max-w-[320px]
    min-[425px]:max-w-[360px]
    sm:max-w-[430px]
    md:max-w-[620px]
    min-[1024px]:max-w-[780px]
    xl:max-w-[880px]
  "
              >
                Find a plan that fits your workflow and unlock access to premium features,
                faster performance, and enhanced productivity tools. Start with what you
                need today and scale confidently as your projects.
              </p>

            </div>
          </div>
          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 md:gap-4 lg:gap-6 items-start px-1 sm:px-2 md:px-3">
            {visibleCards.map((plan, posIdx) => {
              const isCurrent = plan.id === currentPlan;
              const isHighlighted = posIdx === 1;
              const pageIndex = featurePages[plan.id] || 0;
              const startIndex = pageIndex * 5;
              const displayedFeatures = plan.features.slice(startIndex, startIndex + 5);

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-4 sm:p-5 lg:p-6 transition-all duration-300 flex flex-col min-w-0 bg-white lg:h-[460px] xl:h-[510px] ${isHighlighted
                    ? "border-2 border-[#4866F6] shadow-xl md:scale-105 z-10 my-2"
                    : isCurrent
                      ? "border-2 border-[#4866F6] shadow-sm md:scale-95 opacity-90"
                      : "border border-gray-200 shadow-sm md:scale-95 opacity-90"
                    }`}
                >
                  {/* Price */}
                  <div className="mb-3 sm:mb-4 flex items-baseline flex-nowrap whitespace-nowrap">
                    <span className={`shrink-0 font-bold text-[#4866F6] ${isHighlighted
                        ? "text-xl sm:text-xl md:text-2xl lg:text-[22px] xl:text-[36px]"
                        : "text-xl sm:text-xl md:text-2xl lg:text-[20px] xl:text-[32px]"
                      }`}>
                      {plan.price}
                    </span>

                    <span className={`ml-1 shrink-0 text-[#586D93] text-xs sm:text-sm ${isHighlighted ? "lg:text-xs xl:text-[20px]" : "lg:text-xs xl:text-[19px]"
                      }`}>
                      {plan.period}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className={`font-semibold text-[#000000] mb-1 whitespace-nowrap ${isHighlighted
                      ? "text-lg sm:text-lg md:text-xl lg:text-[18px] xl:text-3xl"
                      : "text-lg sm:text-lg md:text-xl lg:text-[16px] xl:text-[28px]"
                    }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-[#586D93] mb-4 lg:mb-6 border-b border-gray-100 pb-4 leading-relaxed ${isHighlighted
                      ? "text-[14px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[20px]"
                      : "text-[14px] sm:text-[10px] md:text-[11px] lg:text-[11px] xl:text-[19px]"
                    }`}>
                    {plan.desc}
                  </p>

                  {/* Features List */}
                  <div className="flex-1 flex flex-col mb-1 lg:mb-2">
                    <ul className="space-y-2.5 sm:space-y-3 h-[140px] sm:h-[150px] lg:h-[160px] xl:h-[185px]">
                      {displayedFeatures.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 md:gap-2 flex-nowrap"
                        >
                          <div
                            className={`w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center flex-shrink-0 ${feature.included ? "bg-[#4866F6]" : "bg-[#D9D9D9]"
                              }`}
                          >
                            {feature.included ? (
                              <Check
                                className="w-3 h-3 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 text-white"
                                strokeWidth={2.5}
                              />
                            ) : (
                              <X
                                className="w-3 h-3 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 text-white"
                                strokeWidth={2.5}
                              />
                            )}
                          </div>

                          <span
                            className={`whitespace-nowrap ${feature.included ? "text-[#586D93]" : "text-gray-400"} ${isHighlighted
                                ? "text-xs sm:text-xs md:text-[11px] lg:text-[11px] xl:text-[20px]"
                                : "text-xs sm:text-xs md:text-[11px] lg:text-[11px] xl:text-[19px]"
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
                        className={`text-[#4866F6] font-medium underline cursor-pointer mt-3 lg:mt-4 text-left w-fit hover:opacity-80 transition-opacity ${isHighlighted
                            ? "text-xs sm:text-xs md:text-[11px] lg:text-[11px] xl:text-[20px]"
                            : "text-xs sm:text-xs md:text-[11px] lg:text-[11px] xl:text-[19px]"
                          }`}
                      >
                        {pageIndex === 0 ? "...View More" : "View Less"}
                      </button>
                    )}
                  </div>

                  {/* Action Button: Only render for the current plan */}
                  {isCurrent && (
                    <button
                      disabled
                      className="w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px]
             h-10 lg:h-[48px]
             min-h-[40px] lg:min-h-[48px]
             rounded-full
             font-medium
             text-xs sm:text-sm lg:text-base
             flex items-center justify-center
             gap-1 md:gap-1.5
             bg-[#CFCFCF] text-[#4A4A4A]
             cursor-not-allowed
             mt-auto mx-auto"
                    >
                      <span>Current Plan</span>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows - Displayed Always */}
          <div className="flex justify-center items-center gap-3 mt-8 md:mt-10">
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
        </div>
      </div>
    </div>
  );
}
