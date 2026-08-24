// =============================================================================
// Semantic Memory — tab content
//   - qdrant: Memory Collection table
//   - dashboard: Semantic Memory Dashboard
// =============================================================================

import Collection from "./Collection";
import MemoryUsageTrendChart from "../../../../charts/MemoryUsageTrendChart";

import semanticVectorIcon from "../../../../../assets/images/semanticVector.svg";
import implicitIcon from "../../../../../assets/images/implicit.svg";
import learningIcon from "../../../../../assets/images/learning.svg";
import timeIcon from "../../../../../assets/images/time.png";
import totalSalesIcon from "../../../../../assets/images/totalSales.svg";
import explicitIcon from "../../../../../assets/images/explicit.svg";
import likesIcon from "../../../../../assets/images/likes.svg";
import userPreferencesIcon from "../../../../../assets/images/userPreferences.svg";
import taskHistoryIcon from "../../../../../assets/images/taskHistory.svg";
import { useEffect, useState } from "react";
import { getSemanticMemoryDashboard, getRetrievalPerformance, getMemoryTrend } from "../../../../../api/authApi";

// -----------------------------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------------------------
const SUMMARY_ICONS = {
  totalVectors: semanticVectorIcon,
  dailyInserts: implicitIcon,
  accuracyScore: learningIcon,
};

const RETRIEVAL_ICONS = {
  averageRetrievalTime: timeIcon,
  successRate: totalSalesIcon,
};

const MEMORY_TYPES = [
  { label: "Conversations", percent: 87, icon: explicitIcon },
  { label: "User preferences", percent: 87, icon: userPreferencesIcon },
  { label: "Task History", percent: 87, icon: taskHistoryIcon },
  { label: "Feedback Signals", percent: 87, icon: likesIcon },
];

// -----------------------------------------------------------------------------
export default function SemanticMemoryContent({
  activeTab = "qdrant",
  onViewCollection,
}) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [retrievalData, setRetrievalData] = useState(null);
  const [memoryTrend, setMemoryTrend] = useState([]);
  const [trendPeriod, setTrendPeriod] = useState("weekly");

  useEffect(() => {
  if (activeTab !== "dashboard") return;

  const fetchMemoryTrend = async () => {
    try {
      const response = await getMemoryTrend(trendPeriod);

      console.log("Memory Trend:", response);

      if (response?.success) {
        setMemoryTrend(response.data);
      }
    } catch (error) {
      console.error("Memory Trend API Error:", error);
    }
  };

  fetchMemoryTrend();
}, [activeTab, trendPeriod]);


 useEffect(() => {
  if (activeTab !== "dashboard") return;

  const fetchSemanticMemoryData = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, retrievalResponse] =
        await Promise.all([
          getSemanticMemoryDashboard(),
          getRetrievalPerformance(),
        ]);

      console.log(
        "Semantic Memory Dashboard:",
        dashboardResponse,
      );

      console.log(
        "Retrieval Performance:",
        retrievalResponse,
      );

      if (dashboardResponse?.success) {
        setDashboardData(dashboardResponse.data);
      }

      if (retrievalResponse?.success) {
        setRetrievalData(retrievalResponse.data);
      }
    } catch (error) {
      console.error(
        "Semantic Memory API Error:",
        error,
      );

      setError(
        "Failed to load semantic memory dashboard.",
      );
    } finally {
      setLoading(false);
    }
  };

  fetchSemanticMemoryData();
}, [activeTab]);

const retrievalStats = retrievalData
  ? [
      {
        label: "Average Retrieval time",
        value: `${retrievalData.average_retrieval_time_ms} ms`,
        icon: RETRIEVAL_ICONS.averageRetrievalTime,
      },
      {
        label: "Success Rate",
        value: `${retrievalData.success_rate}%`,
        icon: RETRIEVAL_ICONS.successRate,
      },
    ]
  : [];

  if (activeTab === "qdrant") {
    return <Collection onViewCollection={onViewCollection} />;
  }


  const summaryStats = dashboardData
  ? [
      {
        label: "Total Vectors",
        value: dashboardData.total_vectors,
        icon: SUMMARY_ICONS.totalVectors,
      },
      {
        label: "Daily Inserts",
        value: dashboardData.daily_inserts,
        icon: SUMMARY_ICONS.dailyInserts,
      },
      {
        label: "Accuracy Score",
        value: dashboardData.accuracy_score,
        icon: SUMMARY_ICONS.accuracyScore,
      },
    ]
  : [];

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 lg:border lg:border-[#E2E2E2] lg:p-5 flex flex-col gap-5 md:gap-6 lg:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Section title */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">
        Semantic Memory dashboard
      </h3>

      <div className="border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Summary KPI cards */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
  {loading ? (
    <div className="col-span-full py-8 text-center text-[#586D93]">
      Loading semantic memory dashboard...
    </div>
  ) : error ? (
    <div className="col-span-full py-8 text-center text-red-500">
      {error}
    </div>
  ) : (
    summaryStats.map(({ label, value, icon }) => (
      <div
        key={label}
        className="flex items-center gap-3 rounded-[18px] border border-[#E2E2E2] bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.12)]"
      >
        <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full bg-[#E6EBFF]">
          <img
            src={icon}
            alt=""
            className="h-6 w-6"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[18px] font-semibold leading-tight text-[#3D3D3D]">
            {value}
          </p>

          <p className="mt-0.5 text-[14px] text-[#586D93]">
            {label}
          </p>
        </div>
      </div>
    ))
  )}
</div>

      <div className="border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Memory Usage Trend */}
      {/* ---------------------------------------------------------------- */}
      <section className="rounded-[18px] border border-[#E2E2E2] bg-white p-4 sm:p-5 shadow-[0_0_2px_0px_rgba(61,61,61,0.12)]">
        <MemoryUsageTrendChart
          data={memoryTrend}
          period={trendPeriod}
          onPeriodChange={setTrendPeriod}
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Retrieval Performance */}
      {/* ---------------------------------------------------------------- */}
      <section>
  <h4 className="mb-3 text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
    Retrieval Performance
  </h4>

  <div className="mb-4 border-b border-[#CFCFCF]" />

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    {loading ? (
      <div className="col-span-full py-8 text-center text-[#586D93]">
        Loading retrieval performance...
      </div>
    ) : error ? (
      <div className="col-span-full py-8 text-center text-red-500">
        {error}
      </div>
    ) : (
      retrievalStats.map(({ label, value, icon }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-[18px] border border-[#E2E2E2] bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.12)]"
        >
          <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full bg-[#E6EBFF]">
            <img
              src={icon}
              alt=""
              className="h-6 w-6 object-contain"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[18px] font-semibold leading-tight text-[#3D3D3D]">
              {value}
            </p>

            <p className="mt-0.5 text-[14px] text-[#586D93]">
              {label}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
</section>

      {/* ---------------------------------------------------------------- */}
      {/* Top stored Memory Types */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <h4 className="mb-3 text-[16px] sm:text-[18px] font-medium text-[#3D3D3D]">
          Top stored Memory Types
        </h4>

        <div className="mb-4 border-b border-[#CFCFCF]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {MEMORY_TYPES.map(({ label, percent, icon }) => (
            <div
              key={label}
              className="flex min-h-[140px] flex-col rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] px-4 py-4"
            >
              <img
                src={icon}
                alt=""
                className="h-[22px] w-[22px] shrink-0"
                aria-hidden="true"
              />

              <p className="mt-3 text-[14px] font-medium text-[#3D3D3D] truncate">
                {label}
              </p>

              <div className="mt-3 h-[10px] w-full rounded-full bg-[#D9DCE5]">
                <div
                  className="h-full rounded-full bg-[#4866F6]"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-2 text-right text-[13px] font-medium text-[#3D3D3D]">
                {percent}%
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
