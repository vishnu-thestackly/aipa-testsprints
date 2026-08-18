// =============================================================================
// Behavior Learning — Tab 2: AI Learning Engine
// Self-contained: mock data, small inline helpers, and all JSX live in this file.
// Sections:
//   - Summary KPI cards (Explicit Feedback / Implicit Signals / Learning status)
//   - Explicit Feedback metric boxes (Likes / Dislikes / Ratings / Comments)
//   - Implicit Interaction Signals (chip groups in a blue panel)
//   - Learning Insights (progress cards)
// =============================================================================

import explicitIcon from "../../../../../assets/images/explicit.svg";
import implicitIcon from "../../../../../assets/images/implicit.svg";
import learningIcon from "../../../../../assets/images/learning.svg";
import likesIcon from "../../../../../assets/images/likes.svg";
import dislikesIcon from "../../../../../assets/images/dislikes.svg";
import ratingsIcon from "../../../../../assets/images/ratings.svg";

// -----------------------------------------------------------------------------
// MOCK DATA (swap for API response later)
// -----------------------------------------------------------------------------
const SUMMARY_CARDS = [
  {
    id: "explicit",
    value: "1250",
    label: "Explicit Feedback",
    icon: explicitIcon,
  },
  {
    id: "implicit",
    value: "8560",
    label: "Implicit Signals",
    icon: implicitIcon,
  },
  {
    id: "status",
    value: "Active",
    label: "Learning status",
    icon: learningIcon,
  },
];

const EXPLICIT_FEEDBACK_METRICS = [
  { id: "likes", label: "Likes", value: "250", icon: likesIcon },
  { id: "dislikes", label: "Dislikes", value: "38", icon: dislikesIcon },
  { id: "ratings", label: "Ratings", value: "4.5/5.0", icon: ratingsIcon },
  { id: "comments", label: "Comments", value: "120", icon: explicitIcon },
];

const IMPLICIT_SIGNALS = [
  {
    label: "Frequently used actions",
    chips: ["Tasks", "Search", "New Chat", "Preferences"],
  },
  {
    label: "Preferred meeting timings",
    chips: [
      "10:00AM - 11:00 AM",
      "11:00AM - 12:00 PM",
      "04:00PM - 05:00 PM",
      "05:00PM - 06:00 PM",
    ],
  },
  {
    label: "Most used integrations",
    chips: ["Outlook", "Google Calendar", "Jira", "Trello"],
  },
  {
    label: "Task completion behavior",
    chips: ["Immediate", "Sequential"],
  },
];

const LEARNING_INSIGHTS = [
  {
    id: 1,
    title: "1. Meeting Scheduling Preference",
    description: (
      <>
        Users prefer meeting scheduling between{" "}
        <span className="text-[#4866F6]">10:00AM - 11:00 AM</span>
      </>
    ),
    percent: 92,
  },
  {
    id: 2,
    title: "2. Communication Tone Alignment",
    description: (
      <>
        Professional email tone selected in{" "}
        <span className="text-[#4866F6]">85% of generated emails</span>
      </>
    ),
    percent: 82,
  },
  {
    id: 3,
    title: "3. Ecosystem Adoption",
    description: (
      <>
        <span className="text-[#4866F6]">Outlook integration</span> used more
        frequently than Exchange
      </>
    ),
    percent: 70,
  },
];

// -----------------------------------------------------------------------------
// LearningEngine — Tab 2 content
// -----------------------------------------------------------------------------
export default function LearningEngine() {
  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Section 1: AI Learning Engine summary cards */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="text-[18px] font-medium text-[#3D3D3D]">
        AI Learning Engine
      </h3>

      <div className="mt-5 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SUMMARY_CARDS.map((card) => (
          <SummaryCard
            key={card.id}
            value={card.value}
            label={card.label}
            icon={card.icon}
            valueClassName={card.valueClassName}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2: Explicit Feedback metrics */}
      {/* ---------------------------------------------------------------- */}
      <h3 className="mt-5 text-[18px] font-medium text-[#3D3D3D]">
        Explicit Feedback
      </h3>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {EXPLICIT_FEEDBACK_METRICS.map((metric) => (
          <FeedbackMetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            Icon={metric.Icon}
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
          {IMPLICIT_SIGNALS.map((group) => (
            <div key={group.label}>
              <p className="text-[14px] font-medium text-[#3D3D3D]">
                {group.label}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.chips.map((chip) => (
                  <Chip key={chip} label={chip} />
                ))}
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
        {LEARNING_INSIGHTS.map((insight) => (
          <InsightCard
            key={insight.id}
            title={insight.title}
            description={insight.description}
            percent={insight.percent}
          />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SummaryCard — icon + large value + label (top KPI row)
// -----------------------------------------------------------------------------
function SummaryCard({
  value,
  label,
  icon,
  valueClassName = "text-[#3D3D3D]",
}) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] border border-[#E2E2E2] bg-white p-4">
      <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full bg-[#E6EBFF]">
        <img src={icon} alt="" className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h4 className={`text-[18px] font-semibold leading-none`}>{value}</h4>
        <p className="mt-1 text-[14px] text-[#586D93]">{label}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// FeedbackMetricCard — icon on top, label bottom-left, value bottom-right
// -----------------------------------------------------------------------------
function FeedbackMetricCard({ label, value, icon, Icon }) {
  return (
    <div className="flex min-h-[90px] flex-col justify-between rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] px-4 py-4">
      {icon ? (
        <img
          src={icon}
          alt=""
          className="h-[22px] w-[22px] shrink-0"
          aria-hidden="true"
        />
      ) : (
        Icon && <Icon size={22} className="shrink-0 text-[#4866F6]" />
      )}

      <div className="mt-3 flex items-end justify-between gap-2">
        <span className="text-[14px] text-[#3D3D3D]">{label}</span>
        <span className="text-[16px] font-semibold text-[#4866F6]">
          {value}
        </span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Chip — filled pill used for implicit signal values
// -----------------------------------------------------------------------------
function Chip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#4866F6] px-4 py-1.5 text-[13px] text-white">
      {label}
    </span>
  );
}

// -----------------------------------------------------------------------------
// InsightCard — learning insight with description + progress bar
// Percentage label is positioned under the fill endpoint (e.g. 92% sits at 92%).
// -----------------------------------------------------------------------------
function InsightCard({ title, description, percent }) {
  return (
    <div className="rounded-xl bg-[#F7F8FA] p-5">
      <h4 className="text-[15px] font-medium text-[#3D3D3D]">{title}</h4>
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
