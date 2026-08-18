// =============================================================================
// Semantic Memory — parent shell
// Header + compact right-aligned pill tabs:
//   1) Qdrant Collection Management
//   2) Semantic Memory Dashboard
// Collection Details is a drill-down from the Qdrant tab (Eye action).
// =============================================================================

import { useState } from "react";

import SemanticMemoryContent from "./tabs/Semantic";
import CollectionDetails from "./tabs/CollectionDetails";

export default function SemanticMemory() {
  // Active tab: "qdrant" | "dashboard"
  const [activeTab, setActiveTab] = useState("qdrant");
  // Selected collection for details drill-down (null = list / dashboard view)
  const [selectedCollection, setSelectedCollection] = useState(null);

  const tabs = [
    { id: "qdrant", label: "Qdrant Collection Management" },
    { id: "dashboard", label: "Semantic Memory Dashboard" },
  ];

  const handleViewCollection = (collection) => {
    setSelectedCollection(collection);
  };

  const handleBackFromDetails = () => {
    setSelectedCollection(null);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedCollection(null);
  };

  // Collection details takes over the content area
  if (selectedCollection) {
    return (
      <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
        <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">
          <CollectionDetails
            collection={selectedCollection}
            onBack={handleBackFromDetails}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full flex flex-col gap-4 md:gap-5 bg-white rounded-[20px] md:rounded-[25px] border-b border-gray-200 shadow-[0px_1px_4px_0px_#00000040]">
        {/* Header */}
        <div className="mx-4 md:mx-5 lg:mx-7 py-4 md:py-5 border-b border-[#CFCFCF]">
          <h2 className="text-[18px] font-medium text-[#3D3D3D]">
            Semantic memory
          </h2>
        </div>

        {/* Pill tab switcher — mobile: BehaviorLearning scroll; desktop: compact right-aligned */}
        <div className="px-4 md:px-5 lg:px-7 ">
          {/* Mobile / tablet */}
          <div className="w-full border border-[#D9D9D9] rounded-full bg-white  p-1 overflow-hidden lg:hidden">
            <div className="overflow-x-auto scrollbar-hide ">
              <div className="flex min-w-max gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`h-[44px] min-w-[285px] px-6 whitespace-nowrap rounded-full text-[14px] font-medium transition-all duration-200 flex-shrink-0 cursor-pointer
                      ${
                        activeTab === tab.id
                          ? "bg-[#4866F6] text-white"
                          : "text-[#586D93]"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex justify-end">
            <div className="w-[680px] h-[48px] flex items-center rounded-full border border-[#D9D9D9] bg-white p-1 gap-[5px]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 h-full rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer
                    ${
                      activeTab === tab.id
                        ? "bg-[#4866F6] text-white shadow-md"
                        : "text-[#586D93] hover:text-[#3D3D3D]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <SemanticMemoryContent
          activeTab={activeTab}
          onViewCollection={handleViewCollection}
        />
      </div>
    </div>
  );
}
