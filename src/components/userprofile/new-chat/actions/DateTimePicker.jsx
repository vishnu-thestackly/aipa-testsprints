// import React, { useState } from "react";


// export default function DateTimePicker({ payload }) {

//   const [selectedDate, setSelectedDate] = useState("");


//   if (!payload?.include_date) {
//     return null;
//   }


//   return (
//     <div className="
//       mt-3
//     ">

//       <input
//         type="date"
//         value={selectedDate}
//         onChange={(e) => setSelectedDate(e.target.value)}
//         className="
//           flex w-full cursor-pointer items-center justify-between gap-2
//           rounded-lg border border-[#CFCFCF]
//           bg-white py-2.5 pl-3 pr-3
//           text-left text-sm
//         "
//       />


//     </div>
//   );
// }



import React, { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";


export default function DateTimePicker({ payload }) {

  const { isDark } = useTheme();
  const [selectedDate, setSelectedDate] = useState("");


  if (!payload?.include_date) {
    return null;
  }


  return (
    <div className="
      mt-3
    ">

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border py-2.5 pl-3 pr-3 text-left text-sm outline-none transition-colors ${
          isDark
            ? "border-[#586D93] bg-[#181F2D] text-[F5F7FA] [color-scheme:dark]"
            : "border-[#CFCFCF] bg-white text-[#3D3D3D]"
        }`}
      />


    </div>
  );
}