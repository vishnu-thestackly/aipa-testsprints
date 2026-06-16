import { useState } from "react";

import HelpHeader from "../components/common/Navbar";
import HelpLeftSection from "../components/helppage/HelpLeftSection";
import HelpForm from "../components/helppage/HelpForm";
import HelpFooter from "../components/homepage/Footer";

import bgImage from "../assets/images/bghome.png";

const HelpPage = () => {
  const [showLang, setShowLang] = useState(false);

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        overflow-y-auto
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          -z-10
        "
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* PAGE */}
      <div
        className="
          min-h-screen

          px-3
          py-3

          sm:px-5
          sm:py-4

          lg:px-6
          lg:py-5

          flex
          
flex-col
justify-center
        "
      >
        {/* HEADER */}
        <div className="shrink-0">
          <HelpHeader
            showLang={showLang}
            setShowLang={setShowLang}
          />
        </div>

        {/* MAIN CARD */}
      
<div
  className="
    flex-1

    md:min-h-[980px]
    lg:min-h-0

    max-h-none
    lg:max-h-[820px]

    mt-4

    bg-[#F7F7F7]

    border
    border-[#DCDCDC]

    rounded-[32px]

    flex
    flex-col
    lg:flex-row

    gap-8

    p-5

    sm:p-7

    lg:px-10
    lg:py-8
  "
>
          {/* LEFT */}
          <div
            className="
              flex-1
              flex
              items-start
            "
          >
            <HelpLeftSection />
          </div>

          {/* RIGHT */}
          <div
            className="
              w-full
              lg:w-[500px]

              flex
              justify-center
              items-center
            "
          >
            <HelpForm />
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-3 shrink-0">
          <HelpFooter />
        </div>
      </div>
    </div>
  );
};

export default HelpPage;