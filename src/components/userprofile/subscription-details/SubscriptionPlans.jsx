import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SubscriptionPlans({
  setProfilePage
}) {
const [currentPlan, setCurrentPlan] = useState("");
const navigate = useNavigate();
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

  // const handlePlanAction = (planId) => {
  //   if (planId === currentPlan) return;
  //   setCurrentPlan(planId);
  //   console.log("Upgraded to:", planId);
  // };
  

  // for adding  subscription details page


 const handlePlanAction = (planId) => {
  if (planId === "free") {
    navigate("/user/profile/details");
    return;
  }

  navigate("/user/profile/details");
};


  return (
<div
  className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-4 pb-10 scrollbar-hide"
>        
   
<div className="w-full flex flex-col gap-5">

<div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[16px] md:p-7 shadow-[0px_0px_4px_0px_#00000014]">
         
          {/* changed here */}
          
            <div className="flex items-center gap-2 mb-9 md:mb-12 pb-4 md:pb-5 border-b border-[#D9D9D9]">
  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center">
    <ArrowLeft
      onClick={() => navigate("/user/profile")}
      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
      strokeWidth={2.5}
    />
  </div>

  <span className="font-['SF_Pro'] text-sm sm:text-base md:text-lg lg:text-xl text-[#3D3D3D]">
    Subscription Plans
  </span>
</div>
{/* -------------------------- */}

            {/* Header */}
           <div className="flex flex-col items-center text-center -mt-2 md:-mt-4 lg:-mt-6 mb-8 md:mb-10">
  
  <h1
  className="
    font-sans
    font-bold
    text-[#3D3D3D]

    text-[18px]
    sm:text-[24px]

    md:text-[24px]
    md:max-w-[560px]

    lg:text-[24px]
    lg:max-w-[560px]

    min-[1150px]:text-[32px]
    min-[1150px]:max-w-[760px]

    xl:text-[38px]
    xl:max-w-[920px]

    leading-[130%]
    text-center
    mx-auto
  "
>
  Find the right plan to power your workflow.
</h1>
  <p
  className="
    mt-4
    mx-auto
    text-center
    font-sans
    text-[#586D93]
    text-[13px]
    sm:text-[14px]
    md:text-[15px]
    lg:text-[16px]
    xl:text-[22px]
    lg:text-[16px]
    font-normal
    leading-[1.7]
    max-w-[320px]
    sm:max-w-[500px]
    md:max-w-[620px]
    lg:max-w-[700px]
    xl:max-w-[920px]
    px-2
  "
>
  Find a plan that fits your workflow and unlock access to premium features,
  faster performance, and enhanced productivity tools. Start with what you
  need today and scale confidently as your projects.
</p>
</div>

            {/* Plans Grid - */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-2 lg:gap-3 items-start">         {plans.map((plan) => {
                const isCurrent = currentPlan === plan.id;
                return (
                  <div
                    key={plan.id}
className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-2 lg:p-3 xl:p-5 transition-all flex flex-col min-w-0 border-2 ${                      isCurrent
                        ? "border-[#4866F6]"
                        : "border-gray-200"
                    }`}
                  >
                    {/* Price */}
                    <div className="mb-3 sm:mb-4 flex items-baseline flex-wrap">
                      <span
  className="
    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-[28px]
    min-[1150px]:text-[34px]
    xl:text-4xl
    font-bold
    text-[#4866F6]
  "
>
  {plan.price}
</span>
                      <span className="text-[#586D93] text-xs sm:text-sm ml-1">{plan.period}</span>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-3xl font-['SF_Pro'] text-[#000000] mb-1 sm:mb-1.5">
                      {plan.name}
                    </h3>
                    <p className="text-[#586D93] text-xs sm:text-sm mb-3 sm:mb-4 lg:mb-6 border-b border-gray-100 pb-3 sm:pb-4 lg:pb-6">
                      {plan.desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3 mb-4 sm:mb-6 md:mb-8 font-['SF_Pro'] flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 md:gap-2.5">
                          <div
  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
    feature.included ? "bg-[#4866F6]" : "bg-[#D9D9D9]"
  }`}
>
  {feature.included ? (
    <Check
      className="w-3 h-3 text-white"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ) : (
    <X
      className="w-3 h-3 text-white"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )}
</div>
                          <span
                            className={`text-xs sm:text-sm leading-tight ${
                              feature.included? "text-[#586D93]" : "text-gray-400"
                            }`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={() => handlePlanAction(plan.id)}
                      disabled={isCurrent}
                      className={`w-[180px] sm:w-[120px] md:w-[140px] lg:w-[140px] w-[180px] xl:w-[200px]   h-8 sm:h-9 md:h-10 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-1 md:gap-1.5 transition mt-auto mx-auto lg:mx-0 ${
                        isCurrent
              ? "bg-[#CFCFCF] text-[#3D] cursor-not-allowed"
                          : "bg-[#4866F6] text-white hover:bg-[#3D6AE8]"
                      }`}
                    >
                      {isCurrent? "Current Plan" : "Upgrade Plan"}
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor"/>
                    </button>
                  </div>
                );
              })}
            </div>
          </div></div> 
        </div>
     
  );
}

// import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// export default function SubscriptionPlans({
//   setProfilePage
// }) {
// const [currentPlan, setCurrentPlan] = useState("");
//   const plans = [
//     {
//       id: "free",
//       price: "$0.00",
//       period: "/ month",
//       name: "Free plan",
//       desc: "Best plan for the fresher individuals",
//       features: [
//         { text: "Culpa qui official", included: true },
//         { text: "Deserunt mollitia an", included: true },
//         { text: "Imi, id est laborum et", included: true },
//         { text: "Dolorum fuga Et har", included: false },
//         { text: "Um quidem rerum", included: false },
//       ],
//     },
//     {
//       id: "basic",
//       price: "$99.00",
//       period: "/ monthly",
//       name: "Basic plan",
//       desc: "Best plan for the fresher individuals",
//       features: [
//         { text: "Culpa qui official", included: true },
//         { text: "Deserunt mollitia an", included: true },
//         { text: "Imi, id est laborum et", included: true },
//         { text: "Dolorum fuga Et har", included: true },
//         { text: "Um quidem rerum", included: true },
//       ],
//     },
//     {
//       id: "premium",
//       price: "$999.00",
//       period: "/ yearly",
//       name: "Premium plan",
//       desc: "Best plan for the fresher individuals",
//       features: [
//         { text: "Culpa qui official", included: true },
//         { text: "Deserunt mollitia an", included: true },
//         { text: "Imi, id est laborum et", included: true },
//         { text: "Dolorum fuga Et har", included: true },
//         { text: "Um quidem rerum", included: true },
//       ],
//     },
//   ];

//   // const handlePlanAction = (planId) => {
//   //   if (planId === currentPlan) return;
//   //   setCurrentPlan(planId);
//   //   console.log("Upgraded to:", planId);
//   // };
  

//   // for adding  subscription details page


//  const handlePlanAction = (planId) => {
//   if (planId === "free") {
//     setProfilePage("subscriptionDetails");
//     return;
//   }

//   setProfilePage("subscriptionDetails");
// };


//   return (
// <div
//   className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-10 scrollbar-hide"
// >        
   
// <div className="w-full flex flex-col gap-5">

// <div className="w-full rounded-[18px] md:rounded-[25px] border border-[#DADADA] bg-white p-[12px] md:p-6 shadow-[0px_0px_4px_0px_#00000014]">         
//             <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
//               <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#4866F6] rounded-full flex items-center justify-center lg:mt-[-20px]">
//                 <ArrowLeft onClick={() => setProfilePage("dashboard")}className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
//               </div>
//               <span className="font-['SF_Pro'] text-sm sm:text-base md:text-lg lg:text-xl lg:mt-[-20px] text-[#3D]">Subscription Plans</span>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
//               <h1 className="font-['SF_Pro'] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-[#3D] mb-2 sm:mb-3 lg:mb-4">
//                 Find the right plan to power your workflow.
//               </h1>
//               <p className="text-[#586D93] text-xs sm:text-sm md:text-base lg:text-lg font-['SF_Pro'] max-w-3xl mx-auto leading-relaxed px-2">
//                 Find a plan that fits your workflow and unlock access to premium features, faster
//                 performance, and enhanced productivity tools. Start with what you need today and scale
//                 confidently as your projects.
//               </p>
//             </div>

//             {/* Plans Grid - */}
// <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-2 lg:gap-3 items-start">         {plans.map((plan) => {
//                 const isCurrent = currentPlan === plan.id;
//                 return (
//                   <div
//                     key={plan.id}
// className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-2 lg:p-3 xl:p-5 transition-all flex flex-col min-w-0 border-2 ${                      isCurrent
//                         ? "border-[#4866F6]"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     {/* Price */}
//                     <div className="mb-3 sm:mb-4 flex items-baseline flex-wrap">
//                       <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#4866F6]">
//                         {plan.price}
//                       </span>
//                       <span className="text-[#586D93] text-xs sm:text-sm ml-1">{plan.period}</span>
//                     </div>

//                     {/* Plan Name */}
//                     <h3 className="text-lg sm:text-xl md:text-xl lg:text-3xl font-['SF_Pro'] text-[#000000] mb-1 sm:mb-1.5">
//                       {plan.name}
//                     </h3>
//                     <p className="text-[#586D93] text-xs sm:text-sm mb-3 sm:mb-4 lg:mb-6 border-b border-gray-100 pb-3 sm:pb-4 lg:pb-6">
//                       {plan.desc}
//                     </p>

//                     {/* Features */}
//                     <ul className="space-y-2 sm:space-y-2.5 lg:space-y-3 mb-4 sm:mb-6 md:mb-8 font-['SF_Pro'] flex-1">
//                       {plan.features.map((feature, idx) => (
//                         <li key={idx} className="flex items-center gap-2 md:gap-2.5">
//                           <div
//                             className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
//                               feature.included? "bg-[#4866F6]" : "bg-[#CFCFCF]"
//                             }`}
//                           >
//                             {feature.included? (
//                               <Check
//                                 className="w-3 h-3 sm:w-4 sm:h-4 text-white"
//                                 strokeWidth={3}
//                               />
//                             ) : (
//                               <X
//                                 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
//                                 strokeWidth={3}
//                               />
//                             )}
//                           </div>
//                           <span
//                             className={`text-xs sm:text-sm leading-tight ${
//                               feature.included? "text-[#586D93]" : "text-gray-400"
//                             }`}
//                           >
//                             {feature.text}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>

//                     {/* Button */}
//                     <button
//                       onClick={() => handlePlanAction(plan.id)}
//                       disabled={isCurrent}
//                       className={`w-[180px] sm:w-[120px] md:w-[140px] lg:w-[140px] w-[180px] xl:w-[200px]   h-8 sm:h-9 md:h-10 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-1 md:gap-1.5 transition mt-auto mx-auto lg:mx-0 ${
//                         isCurrent
//               ? "bg-[#CFCFCF] text-[#3D] cursor-not-allowed"
//                           : "bg-[#4866F6] text-white hover:bg-[#3D6AE8]"
//                       }`}
//                     >
//                       {isCurrent? "Current Plan" : "Upgrade Plan"}
//                     <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor"/>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div></div> 
//         </div>
     
//   );
// }
