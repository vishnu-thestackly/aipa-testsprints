import { useEffect, useState } from "react";

import explicitIcon from "../../../../../assets/images/explicit.svg";
import implicitIcon from "../../../../../assets/images/implicit.svg";
import learningIcon from "../../../../../assets/images/learning.svg";
import likesIcon from "../../../../../assets/images/likes.svg";
import dislikesIcon from "../../../../../assets/images/dislikes.svg";
import ratingsIcon from "../../../../../assets/images/ratings.svg";

import { getAiLearningEngine } from "../../../../../api/authApi";

const SUMMARY_ICONS = {
  explicit: explicitIcon,
  implicit: implicitIcon,
  status: learningIcon,
};

const FEEDBACK_ICONS = {
  likes: likesIcon,
  dislikes: dislikesIcon,
  ratings: ratingsIcon,
  comments: explicitIcon,
};

const INTEGRATION_LABELS = {
  google_calendar: "Google Calendar",
  outlook: "Outlook",
  exchange: "Exchange",
  jira: "Jira",
  trello: "Trello",
};

export default function LearningEngine() {
  const [learningData, setLearningData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLearningEngine = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAiLearningEngine();

        console.log("AI Learning Engine:", response);

        // This endpoint returns the data directly,
        // not inside { success, data }.
        if (response) {
          setLearningData(response);
        } else {
          setError("Failed to load AI learning engine.");
        }
      } catch (error) {
        console.error(
          "AI Learning Engine API Error:",
          error
        );

        setError("Failed to load AI learning engine.");
      } finally {
        setLoading(false);
      }
    };

    fetchLearningEngine();
  }, []);

  if (loading) {
    return (
      <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
        <div className="py-12 text-center text-[#586D93]">
          Loading AI learning engine...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
        <div className="py-12 text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  const summaryCards = [
    {
      id: "explicit",
      value: learningData?.explicit_feedback_count ?? 0,
      label: "Explicit Feedback",
      icon: SUMMARY_ICONS.explicit,
    },
    {
      id: "implicit",
      value: learningData?.implicit_signals_count ?? 0,
      label: "Implicit Signals",
      icon: SUMMARY_ICONS.implicit,
    },
    {
      id: "status",
      value: learningData?.learning_status || "N/A",
      label: "Learning status",
      icon: SUMMARY_ICONS.status,
    },
  ];

  const feedbackMetrics = [
    {
      id: "likes",
      label: "Likes",
      value: learningData?.likes ?? 0,
      icon: FEEDBACK_ICONS.likes,
    },
    {
      id: "dislikes",
      label: "Dislikes",
      value: learningData?.dislikes ?? 0,
      icon: FEEDBACK_ICONS.dislikes,
    },
    {
      id: "ratings",
      label: "Ratings",
      value: `${learningData?.avg_rating ?? 0}/5.0`,
      icon: FEEDBACK_ICONS.ratings,
    },
    {
      id: "comments",
      label: "Comments",
      value: learningData?.comments_count ?? 0,
      icon: FEEDBACK_ICONS.comments,
    },
  ];

  const implicitSignals = [
    {
      label: "Frequently used actions",
      chips: learningData?.frequently_used_actions || [],
    },
    {
      label: "Preferred meeting timings",
      chips: learningData?.preferred_meeting_timings || [],
    },
    {
      label: "Most used integrations",
      chips: (learningData?.most_used_integrations || []).map(
        (integration) =>
          INTEGRATION_LABELS[integration] || integration
      ),
    },
    {
      label: "Task completion behavior",
      chips: learningData?.task_completion_behavior || [],
    },
  ];

  const insights = learningData?.insights || [];

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Section 1: AI Learning Engine */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">
        AI Learning Engine
      </h3>

      <div className="mt-5 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            value={card.value}
            label={card.label}
            icon={card.icon}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2: Explicit Feedback */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Explicit Feedback
      </h3>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {feedbackMetrics.map((metric) => (
          <FeedbackMetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section 3: Implicit Interaction Signals */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Implicit Interaction Signals
      </h3>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-5">
        <div className="flex flex-col gap-5">
          {implicitSignals.map((group) => (
            <div key={group.label}>
              <p className="text-[14px] font-medium text-[#3D3D3D]">
                {group.label}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {group.chips.length > 0 ? (
                  group.chips.map((chip) => (
                    <Chip key={chip} label={chip} />
                  ))
                ) : (
                  <span className="text-[13px] text-[#98A2B3]">
                    No data available
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section 4: Learning Insights */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Learning Insights
      </h3>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <InsightCard
              key={`${insight.title}-${index}`}
              title={`${index + 1}. ${insight.title}`}
              description={insight.description}
              percent={insight.percentage ?? 0}
            />
          ))
        ) : (
          <div className="lg:col-span-2 rounded-xl bg-[#F7F8FA] p-5">
            <p className="text-[14px] text-[#98A2B3]">
              No learning insights available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SummaryCard
// -----------------------------------------------------------------------------

function SummaryCard({ value, label, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-[#E2E2E2] bg-white p-4">
      <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full bg-[#E6EBFF]">
        <img
          src={icon}
          alt=""
          className="h-6 w-6"
          aria-hidden="true"
        />
      </div>

      <div>
        <h4 className="text-[18px] font-semibold leading-none text-[#3D3D3D]">
          {value}
        </h4>

        <p className="mt-1 text-[14px] text-[#586D93]">
          {label}
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// FeedbackMetricCard
// -----------------------------------------------------------------------------

function FeedbackMetricCard({ label, value, icon }) {
  return (
    <div className="flex min-h-[90px] flex-col justify-between rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] px-4 py-4">
      <img
        src={icon}
        alt=""
        className="h-[22px] w-[22px] shrink-0"
        aria-hidden="true"
      />

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-[14px] text-[#3D3D3D]">
          {label}
        </span>

        <span className="text-[16px] font-semibold text-[#4866F6]">
          {value}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Chip
// -----------------------------------------------------------------------------

function Chip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#4866F6] px-4 py-1.5 text-[13px] text-white">
      {label}
    </span>
  );
}

// -----------------------------------------------------------------------------
// InsightCard
// -----------------------------------------------------------------------------

function InsightCard({ title, description, percent }) {
  return (
    <div className="rounded-xl bg-[#F7F8FA] p-5">
      <h4 className="text-[15px] font-medium text-[#3D3D3D]">
        {title}
      </h4>

      <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#586D93]">
        {description}
      </p>

      <div className="mt-4">
        <div className="h-[9px] w-full rounded-full bg-[#D9DCE5]">
          <div
            className="h-full rounded-full bg-[#4866F6]"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="relative mt-1 h-[18px]">
          <span
            className="absolute -translate-x-1/2 text-[12px] text-[#586D93]"
            style={{ left: `${percent}%` }}
          >
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
}