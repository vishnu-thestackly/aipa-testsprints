// // HomePage.jsx

// import Header from "../components/common/Navbar";
// import Hero from "../components/homepage/Hero";
// import FeatureCards from "../components/homepage/FeatureCards";
// import Footer from "../components/homepage/Footer";

// import bgHome from "../assets/images/bghome.png";

// const HomePage = () => {
//   return (
//     <main
//       className="
//         relative
//         min-h-screen
//         overflow-x-hidden
//         flex
//         flex-col
//       "
//     >
//       {/* BACKGROUND */}
//       <div
//         className="
//           absolute
//           inset-0

//           w-full
//           h-full

//           min-h-screen

//           -z-10

//           bg-no-repeat

//           bg-[length:210%_100%]
//           min-[375px]:bg-[length:185%_100%]
//           min-[425px]:bg-[length:165%_100%]

//           md:bg-[length:135%_100%]

//           lg:bg-cover

//           bg-top
//           lg:bg-center
//         "
//         style={{
//           backgroundImage: `url(${bgHome})`,
//         }}
//       />

//       {/* PAGE CONTENT */}
//       <div
//         className="
//           relative
//           z-10

//           w-full
//           max-w-[1800px]

//           mx-auto

//           px-4
//           sm:px-5
//           lg:px-6

//           pb-6
//         "
//       >
//         {/* HEADER */}
//         <div className="mt-4 sm:mt-5 lg:mt-6">
//           <Header />
//         </div>

//         {/* HERO */}
//         <Hero />

//         {/* FEATURE CARDS */}
//         <FeatureCards />

//         {/* FOOTER */}
//         <Footer />
//       </div>
//     </main>
//   );
// };

// export default HomePage;

// HomePage.jsx
import { useState } from "react";
import Header from "../components/common-user/Navbar";
import Hero from "../components/homepage/Hero";
import FeatureCards from "../components/homepage/FeatureCards";
import PricingPlans from "../components/homepage/PricingPlans";
import Footer from "../components/homepage/Footer";

import bgHome from "../assets/images/bghome.png";
const HomePage = () => {
  const [showLangSpace, setShowLangSpace] = useState(false);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-x-hidden
        flex
        flex-col
      "
    >
      {/* BACKGROUND */}

{/* BACKGROUND */}
<div
  className="
    fixed
    inset-0
    -z-10
    overflow-hidden
  "
>
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
    <Header onLanguageClick={setShowLangSpace}
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