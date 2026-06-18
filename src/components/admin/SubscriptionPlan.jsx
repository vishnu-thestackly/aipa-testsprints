import React from 'react';
import Delete from '../../assets/images/Delete.svg';
import SubEdit from '../../assets/images/SubEdit.svg';
import ChechMark from '../../assets/images/ChechMark.svg';

const SubscriptionPlan = ({setActiveItem }) => {

  const features = [
    "Culpa qui official Deserunt mollitia an",
    "Deserunt mollitia an Des fuga Et erunt mollitia an",
    "Imi, id est laborum et Deserunt fuga Et mollitia an",
    "Dolorum fuga Et har Deserunt mollitia an",
    "Um quidem rerum fuga Et Deserunt mollitia an",
  ];

  const plans = [
    {
      price: "₹0.00",
      name: "Free plan",
      description: "Best plan for the fresher individuals",
      status: "Active",
      features,
    },
    {
      price: "₹99",
      name: "Basic Plan",
      description: "Best plan for the fresher individuals",
      status: "Active",
      features,
    },
    {
      price: "₹999",
      name: "Premium plan",
      description: "Best plan for the fresher individuals",
      status: "Active",
      features,
    },
  ];

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
              whitespace-nowrap truncate"
            >
              Subscription Plan Management
            </span>

            <button
              onClick={() => setActiveItem("addSubscription")}
              className="w-full sm:w-auto bg-[#4866F6] text-white rounded-[25px] px-15 py-3 text-center"
            >
              Add plan +
            </button>
          </div>


          { /* Horizontal Line */}
          <div className="w-full border-t border-gray-300"></div>

          {/* Plan Cards */}
      <div className="flex flex-col gap-6">
  {plans.map((plan, idx) => (
    <div
      key={idx}
      className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 rounded-[15px] p-4 shadow-sm"
    >
      {/* Price & Name */}
      <div className="w-full md:w-[30%] flex flex-col gap-2">
        <p className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#4F66FF]">
            {plan.price}
          </span>
          <span className="text-sm text-gray-500">/ month</span>
        </p>

        <h3 className="text-[22px] font-medium text-gray-800">
          {plan.name}
        </h3>

        <p
          className="w-full sm:w-auto text-[13px] sm:text-[15px] md:text-[17px]
          leading-[100%] tracking-[0] whitespace-nowrap truncate text-[#7A7A7A]"
        >
          {plan.description}
        </p>

        <span className="inline-flex items-center justify-center h-10 w-fit px-6 mt-6 rounded-full bg-[#2DBE60] text-white text-sm font-medium">
          {plan.status}
        </span>
      </div>

      {/* Features */}
      <div className="w-full md:w-[50%] flex justify-center px-2 md:px-4">
        <div className="w-full max-w-[480px] h-fit bg-[#EEF1FF] rounded-[15px] p-4 flex flex-col gap-3">
          {plan.features.map((feature, idx2) => (
            <div key={idx2} className="flex items-center gap-2">
              <img
                src={ChechMark}
                alt="check"
                className="w-4 h-4"
              />
              <span className="text-[13px] text-[#6D78A8]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div
        className="w-full md:w-[20%] md:pl-4 lg:pl-6
        flex flex-col sm:flex-row md:flex-col lg:flex-row
        md:items-start lg:items-start gap-6"
      >
        {/* Edit Button */}
        <button onClick={() => setActiveItem("editSubscription")}
          className="flex items-center justify-center gap-2
          w-full sm:w-26 md:w-32 lg:w-32
          h-10 rounded-[25px] bg-[#4866F6] text-white font-medium
          hover:bg-[#3F56EF] transition-colors"
        >
          Edit
          <img
            src={SubEdit}
            alt="edit"
            className="w-[18px] h-[18px]"
          />
        </button>

        {/* Delete Button */}
        <button
          className="flex items-center justify-center
          w-20 md:w-24 lg:w-[50px]
          mx-auto md:mx-0 lg:mx-0
          h-10 rounded-[10px]
          bg-white border border-[#FF5757]
          hover:bg-red-50 transition-colors"
        >
          <img
            src={Delete}
            alt="delete"
            className="w-[18px] h-[18px]"
          />
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
