// =============================================================================
// Semantic Memory — Collection Details
// =============================================================================

import { ArrowLeft } from "lucide-react";
import collectionDetailsIcon from "../../../../../assets/images/collectionDetails.svg";

export default function CollectionDetails({ collection, onBack }) {
  const details = [
    {
      title: "Collection Type",
      value: collection?.collection_type ?? "-",
    },
    {
      title: "Connection",
      value: collection?.connection ?? "-",
    },
    {
      title: "Embedding Model",
      value: collection?.embedding_model ?? "-",
    },
    {
      title: "Vector Dimension",
      value: collection?.vector_dimension ?? "-",
    },
    {
      title: "Current Vector Count",
      value: collection?.current_vector_count ?? "-",
    },
    {
      title: "Storage Used",
      value: collection?.storage_used ?? "-",
    },
    {
      title: "Retention Policy",
      value: collection?.retention_policy ?? "-",
    },
    {
      title: "Last Indexed",
      value: collection?.last_indexed ?? "-",
    },
    {
      title: "Created On",
      value: collection?.created_at ?? "-",
    },
    {
      title: "Last Updated",
      value: collection?.updated_at ?? "-",
    },
  ];

  const name = collection?.collection_name ?? "-";
  const status = collection?.status ?? "-";
  const description = collection?.description ?? "-";

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
            
            {/* Collection Name */}
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

            {/* Status */}
            <div className="flex flex-col gap-1.5 items-start sm:self-start">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#3D3D3D]">
                Status
              </p>

              <span className="inline-flex w-[85px] items-center justify-start gap-2 rounded-full bg-[#33B469] py-1.5 pl-3 pr-3 text-sm font-normal text-white">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-white"
                  aria-hidden="true"
                />

                <span className="leading-none">
                  {status}
                </span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 sm:mt-8">
            <h4 className="text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
              Description
            </h4>

            <p className="mt-2 text-[13px] sm:text-[14px] md:text-[15px] leading-6 text-[#8D97A9]">
              {description}
            </p>
          </div>

          {/* Details */}
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