// =============================================================================
// Semantic Memory — Collection Details (drill-down from Memory Collection Eye)
// =============================================================================

import { ArrowLeft } from "lucide-react";
import collectionDetailsIcon from "../../../../../assets/images/collectionDetails.svg";

export default function CollectionDetails({ collection, onBack }) {
  const name = collection?.name || "User Memory";
  const status = collection?.status || "Active";

  const details = [
    { title: "Collection Type", value: name },
    { title: "Connection", value: "Qdrant" },
    { title: "Embedding Model", value: "Text-Embedding" },
    { title: "Vector Dimension", value: "1583" },
    {
      title: "Current Vector Count",
      value: collection?.vectors || "12,345",
    },
    { title: "Storage Used", value: "2.2GB" },
    { title: "Retention Policy", value: "12 Months" },
    { title: "Last Indexed", value: "08 July 2026 10:30 AM" },
    { title: "Created On", value: "01 July 2026" },
    { title: "Last updated", value: "08 July 2026" },
  ];

  return (
    <>
      <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-full bg-[#4866F6] flex items-center justify-center cursor-pointer hover:bg-[#3652F4] transition-all"
          >
            <ArrowLeft
              className="w-[14px] h-[14px] text-white"
              strokeWidth={2.5}
            />
          </button>

          <h2 className="text-[16px] sm:text-[17px] md:text-[18px] font-medium text-[#3D3D3D] whitespace-nowrap">
            Collection Details
          </h2>
        </div>
      </div>

      <div className="px-4 md:px-5 lg:px-7 pb-6">
        <div className="w-full mt-2 rounded-[10px] border border-[#4866F6] bg-[#F5F7FF] p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 w-full">
            <div className="flex items-center gap-[10px] w-full sm:w-auto">
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[8px] bg-[#4866F6] flex items-center justify-center flex-shrink-0">
                <img
                  src={collectionDetailsIcon}
                  alt="Collection"
                  className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px] object-contain"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
                  Collection Name
                </h3>
                <p className="mt-1 text-[13px] sm:text-[14px] text-[#8D97A9]">
                  {name}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 items-start sm:self-start">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
                Status
              </p>
              <span className="inline-flex w-[85px] items-center justify-start gap-2 rounded-full bg-[#33B469] py-1.5 pl-3 pr-3 text-sm font-normal text-white">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-white"
                  aria-hidden="true"
                />
                <span className="leading-none">{status}</span>
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
              Description
            </h4>
            <p className="mt-2 text-[13px] sm:text-[14px] md:text-[15px] leading-6 text-[#8D97A9]">
              Stores semantic memory for user conversations, preferences and
              behavior
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8">
            {details.map((item) => (
              <div key={item.title} className="flex flex-col">
                <p className="text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
                  {item.title}
                </p>
                <p className="mt-1 text-[13px] sm:text-[14px] leading-6 text-[#8D97A9] break-words">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
