// import React from "react";

// export default function PriorityButtons({
//   data,
//   onAction,
// }) {
//   const buttons = data?.buttons || [];

//   return (
//     <div className="mt-3 flex flex-wrap gap-2">
//       {buttons.map((button) => (
//         <button
//           key={button.value}
//           type="button"
//           onClick={() => onAction(button.value)}
//           className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-all duration-200
//             ${
//               button.variant === "filled"
//                 ? "bg-[#4866F6] border-[#4866F6] text-white"
//                 : "border-[#4866F6] text-[#4866F6] bg-white hover:bg-[#EEF2FF]"
//             }`}
//         >
//           {button.label}
//         </button>
//       ))}
//     </div>
//   );
// }

import React, { useState } from "react";

export default function PriorityButtons({
  data,
  onAction,
}) {
  const buttons = data?.buttons || [];

  const [selected, setSelected] = useState(null);

  const handleClick = (button) => {
    setSelected(button.value);

    // send selected value to backend
    onAction?.(button.value || button.action);
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {buttons.map((button) => {
        const isSelected = selected === (button.value || button.action);;

        return (
          <button
            key={button.value}
            type="button"
            onClick={() => handleClick(button)}
            className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-all duration-200
              ${
                isSelected
                  ? "bg-[#4866F6] border-[#4866F6] text-white"
                  : "border-[#4866F6] bg-white text-[#4866F6] hover:bg-[#EEF2FF]"
              }`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}