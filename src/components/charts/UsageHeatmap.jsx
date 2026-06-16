
const hours = ["24hrs", "20hrs", "16hrs", "12hrs", "8hrs", "4hrs", "0hrs"];


// values: 0 (low) → 3 (high)
const data = [
  [4, 2, 3, 3, 4, 3, 3],
  [2, 4, 1, 4, 2, 2, 4],
  [3, 3, 4, 3, 1, 4, 3],
  [1, 4, 3, 3, 1, 3, 4],
  [4, 3, 1, 1, 4, 1, 3],
  [1, 4, 4, 3, 1, 4, 3],
];



const getColor = (val) => {
  if (val <= 1) return "bg-[#4866F666]";
  if (val <= 3) return "bg-[#4866F6BF]";
  return "bg-[#4866F6]";
};

export default function UsageHeatmap() {

  const isMobile = window.innerWidth < 640;

  const days = isMobile
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (
    <div className="bg-white w-full border-t border-[#CFCFCF] p-3 sm:p-4 lg:p-6 overflow-hidden">

      {/* Header */}
      <div className="flex justify-end items-center mb-4 w-full">
        

        <div className="flex gap-2 w-full sm:w-[223px] h-[35px] rounded-[16px] shadow-[0px_0px_2px_0px_#00000033] items-center justify-center">
          <button className="flex-1 h-[28px] rounded-[16px] text-[#3D3D3D] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] bg-white hover:bg-[#4866F6] hover:text-white cursor-pointer">
            Last 7 Days
          </button>
          <button className="flex-1 h-[28px] rounded-[16px] text-[#3D3D3D] text-[11px] sm:text-[13px] lg:text-[14px] font-normal tracking-[0.02em] bg-white hover:bg-[#4866F6] hover:text-white cursor-pointer">
            Monthly
          </button>
        </div>
      </div>

      {/* Heatmap */}
      
      <div className="flex w-full">
        <div className="flex items-center justify-center ml-[-42px] sm:ml-0 mr-1 sm:mr-2 h-[144px] sm:h-[204px]">
  <span className="rotate-[-90deg] text-[#3D3D3D] text-[10px] font-normal tracking-[0.02em] leading-[25px] whitespace-nowrap">
    Hours (24 hrs)
  </span>
</div>
        {/* Y Axis */}
        <div className="flex flex-col justify-between h-[144px] sm:h-[204px] ml-[-12px] sm:ml-0 mr-2 text-[9px] sm:text-[12px] text-[#586D93]">
          {hours.map((h, i) => (
            <span key={i}>{h}</span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 flex-1">
          {data.map((row, i) =>
            row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-full h-[24px] sm:h-[34px] ${getColor(val)}`}
              />
            ))
          )}
        </div>
      </div>

      {/* X Axis */}
      <div className="ml-[38px] sm:ml-[48px] grid grid-cols-7 mt-2 text-[9px] sm:text-[12px] text-[#586D93] text-center">
        {days.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <p className="text-center mt-2 text-[#3D3D3D] text-[10px] sm:text-[12px] tracking-[0.02em]">
        No of days (weekly)
      </p>

      
      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 text-center">
        <p></p>

        {/* ✅ UPDATED LEGEND (3 colors only) */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4 text-[10px] sm:text-[12px] text-[#3D3D3D]">
          <div className="flex items-center gap-1">
            <span className="w-[18px] h-[18px] rounded-[6px] bg-[#4866F666]"></span>
            Low
          </div>
          <div className="flex items-center gap-1">
            <span className="w-[18px] h-[18px] rounded-[6px] bg-[#4866F6BF]"></span>
            Medium
          </div>
          <div className="flex items-center gap-1">
            <span className="w-[18px] h-[18px] rounded-[6px] bg-[#4866F6]"></span>
            High
          </div>
        </div>
      </div>
    </div>
  );
}


