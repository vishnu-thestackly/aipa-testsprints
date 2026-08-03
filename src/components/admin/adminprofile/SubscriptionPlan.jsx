// import React, { useState } from 'react';
// import Delete from '../../../assets/images/Delete.svg';
// import SubEdit from '../../../assets/images/SubEdit.svg';
// import ChechMark from '../../../assets/images/ChechMark.svg';
// import { useSubscription } from '../../../context/SubscriptionContext';

// const SubscriptionPlan = ({ setActiveItem }) => {

//   const subscription = useSubscription();

//   const {
//     plans,
//     deletePlan,
//     setSelectedPlan
//   } = subscription || {};

//   const [expandedPlans, setExpandedPlans] = useState({});

//   const toggleFeatures = (id) => {
//     setExpandedPlans((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className="h-full overflow-y-auto overflow-x-visible px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
//       <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">

//         {/* Header */}
//         <div className="w-full flex flex-col gap-4 md:gap-5 p-1 md:p-3 lg:p-5">
//           {/* Header */}
//           <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 p-0">
//             <span
//               className="w-full sm:w-auto text-[#3D3D3D] font-sfpro font-[510]
//               text-[14px] sm:text-[16px] md:text-[18px]
//               whitespace-nowrap truncate"
//             >
//               Subscription Plan Management
//             </span>

//             <button
//               onClick={() => setActiveItem("addSubscription")}
//               className="w-full sm:w-auto bg-[#4866F6] text-white rounded-[25px] px-15 py-3 text-center"
//             >
//               Add plan +
//             </button>
//           </div>


//           { /* Horizontal Line */}
//           <div className="w-full border-t border-gray-300"></div>

//           {/* Plan Cards */}
//           <div className="flex flex-col gap-6">
//             {plans.map((plan) => (
//               <div
//                 key={plan.id}
//                 className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 rounded-[15px] p-4 shadow-sm"
//               >
//                 {/* Price & Name */}
//                 <div className="w-full md:w-[20%] flex flex-col gap-2">
//                   <p className="flex items-baseline gap-1">
//                     <span className="text-2xl font-bold text-[#4F66FF]">
//                       {plan.price}
//                     </span>

//                     <span className="text-sm text-gray-500">
//                       / {plan.period}
//                     </span>
//                   </p>

//                   <h3 className="text-[22px] font-medium text-gray-800">
//                     {plan.name}
//                   </h3>

//                   <p
//                     className="w-full sm:w-auto text-[13px] sm:text-[15px] md:text-[17px]
//           leading-[100%] tracking-[0] whitespace-nowrap truncate text-[#7A7A7A]"
//                   >
//                     {plan.description}
//                   </p>

//                   <span className="inline-flex items-center justify-center h-10 w-fit px-6 mt-6 rounded-full bg-[#2DBE60] text-white text-sm font-medium">
//                     {plan.status}
//                   </span>
//                 </div>

//                 {/* Features */}

//                 <div className="w-full md:w-[50%] flex justify-center px-2 md:px-4">
//                   <div className="w-full max-w-[480px] h-fit bg-[#EEF1FF] rounded-[15px] p-4 flex flex-col gap-3">

//                     {
//                       (
//                         expandedPlans[plan.id]
//                           ? (plan.features || []).slice(5, 10)
//                           : (plan.features || []).slice(0, 5)
//                       )
//                         .map((feature, idx2) => (

//                           <div key={idx2} className="flex items-center gap-2">

//                             <img
//                               src={ChechMark}
//                               alt="check"
//                               className="w-4 h-4"
//                             />

//                             <span className="text-[13px] text-[#6D78A8]">
//                               {feature}
//                             </span>

//                           </div>

//                         ))
//                     }


//                     {
//                       plan.features?.length > 4 && (

//                         <button
//                           onClick={() => toggleFeatures(plan.id)}
//                           className="text-[#4866F6] text-sm font-medium text-left mt-2"
//                         >
//                           {
//                             expandedPlans[plan.id]
//                               ? "Less"
//                               : "More"
//                           }
//                         </button>

//                       )
//                     }

//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div
//                   className="w-full md:w-[30%] md:pl-4 lg:pl-6
//         flex flex-col sm:flex-row md:flex-col lg:flex-row
//         md:items-start lg:items-start gap-6"
//                 >
//                   {/* Edit Button */}
//                   <button
//                     onClick={() => {
//                       setSelectedPlan(plan);
//                       setActiveItem("editSubscription");
//                     }}
//                     className="flex items-center justify-center gap-2
//           w-full sm:w-26 md:w-32 lg:w-32
//           h-10 rounded-[25px] bg-[#4866F6] text-white font-medium
//           hover:bg-[#3F56EF] transition-colors"
//                   >
//                     Edit
//                     <img
//                       src={SubEdit}
//                       alt="edit"
//                       className="w-[18px] h-[18px]"
//                     />
//                   </button>

//                   {/* Delete Button */}
//                   <button
//                     onClick={() => {
//                       const confirmDelete = window.confirm(
//                         `Are you sure you want to delete "${plan.name}" subscription plan?`
//                       );

//                       if (confirmDelete) {
//                         deletePlan(plan.id);
//                       }
//                     }} 
//                     className="flex items-center justify-center
//           w-20 md:w-24 lg:w-[50px]
//           mx-auto md:mx-0 lg:mx-0
//           h-10 rounded-[10px]
//           bg-white border border-[#FF5757]
//           hover:bg-red-50 transition-colors"
//                   >
//                     <img
//                       src={Delete}
//                       alt="delete"
//                       className="w-[18px] h-[18px]"
//                     />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlan;
 

import React, { useState } from 'react';
import Delete from '../../../assets/images/Delete.svg';
import SubEdit from '../../../assets/images/SubEdit.svg';
import ChechMark from '../../../assets/images/ChechMark.svg';
import { useSubscription } from '../../../context/SubscriptionContext';
 
const SubscriptionPlan = ({ setActiveItem }) => {
 
  const subscription = useSubscription();
 
  const {
    plans,
    deletePlan,
    setSelectedPlan
  } = subscription || {};
 
  const [expandedPlans, setExpandedPlans] = useState({});
 
  const toggleFeatures = (id) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return currency;
  }
};
 
  return (
    <div className="h-full overflow-y-auto overflow-x-visible px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">
 
        {/* Header */}
        <div className="w-full flex flex-col gap-4 md:gap-5 p-1 md:p-3 lg:p-5">
          {/* Header */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 p-0">
            <span
              className="w-full sm:w-auto text-[#3D3D3D] font-sfpro font-[510]
              text-[14px] sm:text-[16px] md:text-[18px]
              whitespace-nowrap truncate">
              Subscription Plan Management
            </span>
 
            <button
              onClick={() => setActiveItem("addSubscription")}
              className="w-full sm:w-auto bg-[#4866F6] text-white rounded-[25px] px-15 py-3 text-center cursor-pointer">
              Add plan +
            </button>
          </div>
 
 
          { /* Horizontal Line */}
          <div className="w-full border-t border-gray-300"></div>
 
          {/* Plan Cards */}
          <div className="flex flex-col gap-6">
            {plans.map((plan) => {
              const activeFeatures = (plan.features || []).filter(
                (feature) => feature.active
              );
              return (
                <div key={plan.id} className="flex flex-col md:flex-row gap-5 md:gap-4 lg:gap-10 rounded-[15px] p-4 shadow-sm ">
                  {/* Price & Name */}
                  <div className="w-full md:w-[26%] lg:w-[20%] flex flex-col gap-2">
                    <p className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#4F66FF]">
                        {getCurrencySymbol(plan.currency)}{plan.price}
                      </span>
 
                      <span className="text-sm text-gray-500">
                        / {plan.period}
                      </span>
                    </p>
 
                    <h3 className="text-[22px] font-medium text-gray-800">
                      {plan.name}
                    </h3>
 
                    <p
                      className="w-full sm:w-auto text-[13px] sm:text-[15px] md:text-[17px]
                      leading-[100%] tracking-[0] whitespace-nowrap truncate text-[#7A7A7A]">
                      {plan.description}
                    </p>
 
                    <span
                      className={`inline-flex items-center justify-center
                      w-full sm:w-[110px] md:w-[120px] lg:w-[130px]
                      max-w-[130px]
                      h-10 mt-6 rounded-full
                      text-white text-sm font-medium
                      ${plan.status === "Active"
                          ? "bg-[#2DBE60]"
                          : "bg-[#FF4D4F]"
                        }`} >
                      {plan.status}
                    </span>
                  </div>
 
                  {/* Features */}
 
                  <div className="w-full md:w-[46%] lg:w-[50%] flex justify-center md:px-2 lg:px-4">
                    <div className="w-full max-w-full lg:max-w-[480px] min-h-[220px] bg-[#EEF1FF] rounded-[15px] p-4 flex flex-col ">
                      <div className="flex-1 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
 
                        {activeFeatures.length > 0 ? (
                          (expandedPlans[plan.id]
                            ? activeFeatures.slice(5, 10)
                            : activeFeatures.slice(0, 5)
                          ).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <img
                                src={ChechMark}
                                alt="check"
                                className="w-4 h-4 flex-shrink-0"/>
 
                              <span className="text-[13px] text-[#6D78A8]">
                                {feature.text}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-center h-full text-[#6D78A8] text-sm">
                            No active features available
                          </div>
                        )}
 
                      </div>
 
                      {activeFeatures.length > 5 && (
                        <button
                          type="button"
                          onClick={() => toggleFeatures(plan.id)}
                          className="mt-3 text-[#9866F6] hover:text-[#7C3AED] text-sm font-medium self-start" >
                          {expandedPlans[plan.id] ? "Less....." : "View More....."}
                        </button>
                      )}
 
                    </div>
                  </div>
 
                  {/* Actions */}
                  <div className="w-full md:w-[28%] lg:w-[30%] flex flex-row justify-between items-center md:flex-row md:justify-end md:items-start lg:flex-row gap-3 md:gap-2 lg:gap-6 ">
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setActiveItem("editSubscription");
                      }}
                      className="flex items-center justify-center gap-2 flex-1 md:flex-none h-10 md:w-[120px] lg:w-[130px] rounded-[25px] bg-[#4866F6] text-white ">
                      Edit
                      <img
                        src={SubEdit}
                        alt="edit"
                        className="w-[18px] h-[18px]"
                      />
                    </button>
 
                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Are you sure you want to delete "${plan.name}" subscription plan?`
                        );
 
                        if (confirmDelete) {
                          deletePlan(plan.id);
                        }
                      }}
                      className="flex items-center justify-center w-20 md:w-24 lg:w-[50px] h-10 rounded-[10px] border border-[#FF5757] bg-white hover:bg-red-50">
                      <img
                        src={Delete}
                        alt="delete"
                        className="w-[18px] h-[18px]"
                      />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default SubscriptionPlan;