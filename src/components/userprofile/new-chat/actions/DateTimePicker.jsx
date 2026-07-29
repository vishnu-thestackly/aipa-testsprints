import React, { useState } from "react";


export default function DateTimePicker({ payload }) {

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
        className="
          flex w-full cursor-pointer items-center justify-between gap-2
          rounded-lg border border-[#CFCFCF]
          bg-white py-2.5 pl-3 pr-3
          text-left text-sm
        "
      />


    </div>
  );
}