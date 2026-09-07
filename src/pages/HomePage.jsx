import { useState } from "react";
import Header from "../components/common-user/Navbar";
import Hero from "../components/homepage/Hero";
import FeatureCards from "../components/homepage/FeatureCards";
import PricingPlans from "../components/homepage/PricingPlans";
import Footer from "../components/homepage/Footer";
import { useTheme } from "../context/ThemeContext";

import bgHome from "../assets/images/bghome.png";

const HomePage = () => {
  const [showLangSpace, setShowLangSpace] = useState(false);
  const { isDark } = useTheme();

  return (
    <main
      className={`
        relative
        min-h-screen
        overflow-x-hidden
        flex
        flex-col
        ${isDark ? "bg-[#030712] text-white" : ""}
        transition-colors
        duration-300
      `}
    >
      {/* BACKGROUND */}
      <div
        className="
          fixed
          inset-0
          -z-10
          overflow-hidden
        "
      >
        {isDark ? (
          <div
            className="
              absolute
              inset-0
              bg-[#030712]
            "
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% -10%, rgba(72, 102, 246, 0.22) 0%, transparent 55%),
                radial-gradient(circle at 20% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 80% 60%, rgba(72, 102, 246, 0.07) 0%, transparent 50%),
                linear-gradient(to bottom, #060B19 0%, #030712 100%)
              `,
            }}
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-no-repeat
              bg-[length:240%_auto]
              min-[375px]:bg-[length:200%_auto]
              min-[425px]:bg-[length:170%_auto]
              md:bg-[length:145%_auto]
              lg:bg-cover
              bg-top
              lg:bg-center
            "
            style={{
              backgroundImage: `linear-gradient(
                to bottom,
                rgba(0,0,0,0.18),
                rgba(0,0,0,0.08),
                rgba(0,0,0,0)
              ), url(${bgHome})`,
            }}
          />
        )}
      </div>

      {/* PAGE CONTENT */}
      <div
        className={`
          relative
          z-10
          w-full
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
          2xl:px-12
          pb-6
          transition-all
          duration-300
          ${showLangSpace ? "pt-[115px]" : "pt-[45px]"}
          sm:pt-[20px]
          lg:pt-[25px]
        `}
      >
        {/* HEADER */}
        <div
          className={`
            transition-all
            duration-300
            ${showLangSpace ? "h-[105px]" : "h-[75px]"}
            sm:h-[105px]
            lg:h-[115px]
          `}
        >
          <div className="h-[95px] sm:h-[105px] lg:h-[115px]">
            <Header
              onLanguageClick={setShowLangSpace}
              fixed={true}
            />
          </div>
        </div>

        {/* HERO */}
        <Hero />

        {/* FEATURE CARDS */}
        <FeatureCards />

        {/* PRICING PLANS */}
        <PricingPlans />

        {/* FOOTER */}
        <Footer />
      </div>
    </main>
  );
};

export default HomePage;