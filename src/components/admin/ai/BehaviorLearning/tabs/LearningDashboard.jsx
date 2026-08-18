// =============================================================================
// Behavior Learning — Tab 1: Behavior Learning Dashboard
// Self-contained: mock data, small inline helpers, and all JSX live in this file.
// Sections:
//   - Header + "Reset Learning" action
//   - Meeting Preferences / Email Preferences (two-column card)
//   - Priority Insights (blue checkmark panel)
//   - Frequently Used Apps (icon + usage progress cards)
// =============================================================================

import { RefreshCw, Check } from "lucide-react";
import outlookIcon from "../../../../../assets/images/outlook.svg";
import jiraIcon from "../../../../../assets/images/jira.svg";
import exchangeIcon from "../../../../../assets/images/exchange.svg";
import trelloIcon from "../../../../../assets/images/trello.svg";

// -----------------------------------------------------------------------------
// MOCK DATA (swap for API response later)
// -----------------------------------------------------------------------------
const MEETING_PREFERENCES = {
  preferredTime: ["10:00AM -11:00 AM", "11:00AM -12:00 PM"],
  preferredDays: ["Monday", "Wednesday", "Thurday", "Friday"],
};

const EMAIL_PREFERENCES = [
  { label: "Tone Selection", value: "Formal" },
  { label: "Message Length", value: "Medium" },
  { label: "Signature", value: "Auto Add" },
];

const PRIORITY_INSIGHTS = [
  "Client Task",
  "Sprint Deliverables",
  "Internal Request",
  "Culpa qui official Deserunt mollitia*",
  "Deserunt mollitia an Des fuga Et erunt mollitia an Deserunt mollitia an Des fuga.consequuntur magni dolores eos qui ratione vol uptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem*",
];

const FREQUENTLY_USED_APPS = [
  { name: "Outlook", icon: outlookIcon, percent: 50 },
  { name: "Jira", icon: jiraIcon, percent: 28 },
  { name: "Exchange", icon: exchangeIcon, percent: 10 },
  { name: "Trello", icon: trelloIcon, percent: 12 },
];

// -----------------------------------------------------------------------------
// LearningDashboard — Tab 1 content
// -----------------------------------------------------------------------------
export default function LearningDashboard() {
  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] md:border md:border-[#E2E2E2] md:p-5 p-1 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Header row: title + Reset Learning */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[18px] font-medium text-[#3D3D3D]">
          Behavior Learning Dashboard
        </h3>
        <button
          type="button"
          className="cursor-pointer flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#4866F6] px-5 py-2.5 text-[14px] text-white transition-colors hover:bg-[#3d57e6]"
        >
          Reset Learning
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Preferences card: Meeting (left) + Email (right) */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-5 grid grid-cols-1 items-stretch gap-4 md:gap-2 lg:gap-6 md:grid-cols-2">
        {/* Meeting Preferences */}
        <div className="flex flex-col">
          <h4 className="text-[16px] font-medium text-[#3D3D3D]">
            Meeting Preferences
          </h4>

          <div className="mt-3 flex-1 rounded-[16px] bg-[#F7F8FA] p-5">
            <p className="text-[14px] text-[#3D3D3D] font-medium">
              Preferred time
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {MEETING_PREFERENCES.preferredTime.map((time) => (
                <Chip key={time} label={time} />
              ))}
            </div>

            <p className="mt-4 text-[14px] text-[#3D3D3D] font-medium">
              Preferred Days
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
              {MEETING_PREFERENCES.preferredDays.map((day) => (
                <Chip key={day} label={day} />
              ))}
            </div>
          </div>
        </div>

        {/* Email Preferences */}
        <div className="flex flex-col">
          <h4 className="text-[16px] font-medium text-[#3D3D3D]">
            Email Preferences
          </h4>

          <div className="mt-3 flex-1 rounded-[16px] bg-[#F7F8FA] p-5">
            <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-x-4">
              {EMAIL_PREFERENCES.map((pref) => (
                <div key={pref.label}>
                  <p className="text-[14px] font-medium text-[#3D3D3D]">
                    {pref.label}
                  </p>
                  <p className="mt-1 text-[13px] text-[#98A2B3]">
                    {pref.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Priority Insights */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-5">
        <h3 className="mb-3 text-[18px] font-medium text-[#3D3D3D]">
          Priority Insights
        </h3>
        <div className="rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-5">
          <ul className="space-y-3 text-[14px] text-[#586D93]">
            {PRIORITY_INSIGHTS.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4866F6]">
                  <Check size={11} className="text-white" strokeWidth={3} />
                </span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Frequently Used Apps */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-5">
        <h3 className="mb-3 text-[18px] font-medium text-[#3D3D3D]">
          Frequently Used Apps
        </h3>
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {FREQUENTLY_USED_APPS.map((app) => (
            <AppUsageCard
              key={app.name}
              name={app.name}
              icon={app.icon}
              percent={app.percent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Chip — filled pill used for preferred times / days
// -----------------------------------------------------------------------------
function Chip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#4866F6] px-7 py-1.5 text-[13px] text-white">
      {label}
    </span>
  );
}

// -----------------------------------------------------------------------------
// AppUsageCard — app icon, name, usage progress bar, and percentage
// Percentage label is positioned under the fill endpoint (e.g. 50% sits at 50%).
// -----------------------------------------------------------------------------
function AppUsageCard({ name, icon, percent }) {
  return (
    <div className="rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-4">
      <img src={icon} alt={name} className="h-8 w-8" />
      <p className="mt-3 text-[14px] font-medium text-[#3D3D3D]">{name}</p>

      <div className="mt-3">
        <div className="h-[10px] w-full rounded-full bg-[#D9DCE5]">
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
