import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import frame4 from "../../../assets/images/frame4.png";
import frame7 from "../../../assets/images/frame7.png";

const METRIC_CARDS = [
  {
    id: 1,
    value: "1.8%",
    label: "Response Time",
    change: "0.3sec",
    image: frame7,
  },
  {
    id: 2,
    value: "93.4%",
    label: "Confidence Score",
    change: "1.6%",
    image: frame4,
  },
  {
    id: 3,
    value: "94.2%",
    label: "Memory Hit Accuracy",
    change: "2.4%",
    image: frame4,
  },
  {
    id: 4,
    value: "94.2%",
    label: "Intent Accuracy",
    change: "2.4%",
    image: frame4,
  },
];

const METRIC_TREND = [
  {
    slNo: 1,
    metric: "Response Time",
    current: "1.8 sec",
    previous: "1.5 sec",
    target: "<2",
  },
  {
    slNo: 2,
    metric: "Confidence Score",
    current: "93.4%",
    previous: "91.8%",
    target: ">90%",
  },
  {
    slNo: 3,
    metric: "Memory Hit Rate",
    current: "78.6%",
    previous: "74.2%",
    target: ">75%",
  },
  {
    slNo: 4,
    metric: "Intent Accuracy",
    current: "94.2%",
    previous: "92.1%",
    target: ">90%",
  },
];

export default function AiPerformanceMetrics() {
  const metricTrendScrollRef = useRef(null);

  return (
    <div className="h-full overflow-y-auto scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      <div className="bg-white rounded-[24px] border border-[#E9EDF5] p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="pb-6 border-b border-[#CFCFCF]">
          <h1 className="text-[22px] sm:text-[24px] font-semibold text-[#1E293B]">
            AI Performance Metrics
          </h1>
        </div>

        {/* Metric Cards — 3 across on tablet/desktop, 4th wraps to next row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-6 mb-10">
          {METRIC_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[20px] border border-[#E9EDF5] p-5 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
            >
              <img
                src={card.image}
                alt={card.label}
                className="w-[54px] h-[54px] object-contain shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="text-[22px] sm:text-[24px] font-bold text-[#1E293B] leading-tight truncate">
                  {card.value}
                </div>
                <div className="flex items-start justify-between gap-2 mt-0.5">
                  <span className="text-[14px] text-[#586D93] leading-snug">
                    {card.label}
                  </span>
                  <span className="text-[14px] text-[#586D93] shrink-0">
                    {card.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metric Trend */}
        <div>
          <div className="border-t border-[#CFCFCF] w-full" />
          <h2 className="text-[18px] font-semibold text-[#1E293B] py-4">
            Metric Trend
          </h2>
          <div className="border-t border-[#CFCFCF] w-full mb-6" />

          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#CFCFCF]">
            <div
              ref={metricTrendScrollRef}
              className="min-h-0 min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-lg:touch-auto min-[1441px]:overflow-x-visible"
            >
              <table className="w-full text-left border-collapse max-[1440px]:min-w-[640px] min-[1441px]:min-w-0">
                <thead>
                  <tr className="bg-[#EEF2FF] text-black text-[13px] font-medium border-b border-[#E2E8F0]">
                    <th className="py-4 px-6 font-medium">SL No</th>
                    <th className="py-4 px-6 font-medium">Metric</th>
                    <th className="py-4 px-6 font-medium">Current</th>
                    <th className="py-4 px-6 font-medium">Previous</th>
                    <th className="py-4 px-6 font-medium">Target</th>
                    <th className="py-4 px-6 font-medium text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[14px]">
                  {METRIC_TREND.map((row) => (
                    <tr
                      key={row.slNo}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="py-4 px-6 text-[#586D93]">{row.slNo}</td>
                      <td className="py-4 px-6 text-[#586D93]">{row.metric}</td>
                      <td className="py-4 px-6 text-[#586D93]">
                        {row.current}
                      </td>
                      <td className="py-4 px-6 text-[#586D93]">
                        {row.previous}
                      </td>
                      <td className="py-4 px-6 text-[#586D93]">{row.target}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center h-[28px] min-w-[52px] px-4 rounded-full bg-[#33B46926]">
                          <Check
                            className="w-4 h-4 text-[#33B469]"
                            strokeWidth={3}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="shrink-0 px-2 py-3 min-[1441px]:hidden">
              <div className="min-h-1">
                <HorizontalScrollIndicator
                  scrollRef={metricTrendScrollRef}
                  className="block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalScrollIndicator({ scrollRef, className = "" }) {
  const [thumb, setThumb] = useState({ width: 75, left: 0 });
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = scrollRef?.current;
    if (!element) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const overflow = scrollWidth > clientWidth + 1;
      setHasOverflow(overflow);

      if (!overflow) {
        setThumb({ width: 100, left: 0 });
        return;
      }

      const widthPercent = (clientWidth / scrollWidth) * 100;
      const maxLeft = 100 - widthPercent;
      const leftPercent =
        maxLeft <= 0 ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxLeft;

      setThumb({ width: widthPercent, left: leftPercent });
    };

    update();
    element.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollRef]);

  if (!hasOverflow) return null;

  return (
    <div
      className={`relative h-1 w-full rounded-full bg-[#E0E0E0] ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4866F6] transition-[left,width] duration-150 ease-out"
        style={{
          width: `${thumb.width}%`,
          left: `${thumb.left}%`,
        }}
      />
    </div>
  );
}
