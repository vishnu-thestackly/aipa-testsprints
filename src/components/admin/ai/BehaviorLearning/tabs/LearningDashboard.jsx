


import { useEffect, useState } from "react";
import { RefreshCw, Check } from "lucide-react";

import outlookIcon from "../../../../../assets/images/outlook.svg";
import jiraIcon from "../../../../../assets/images/jira.svg";
import exchangeIcon from "../../../../../assets/images/exchange.svg";
import trelloIcon from "../../../../../assets/images/trello.svg";

import { getBehaviorLearningDashboard } from "../../../../../api/authApi";

const APP_ICONS = {
  Outlook: outlookIcon,
  Jira: jiraIcon,
  Exchange: exchangeIcon,
  Trello: trelloIcon,
};

export default function LearningDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBehaviorLearningDashboard();

        console.log("Behavior Learning Dashboard:", response);

        if (response?.success) {
          setDashboardData(response.data);
        } else {
          setError("Failed to load behavior learning dashboard.");
        }
      } catch (error) {
        console.error(
          "Behavior Learning Dashboard API Error:",
          error
        );

        setError("Failed to load behavior learning dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] md:border md:border-[#E2E2E2] md:p-5 p-1 md:shadow-sm">
        <div className="py-12 text-center text-[#586D93]">
          Loading behavior learning dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] md:border md:border-[#E2E2E2] md:p-5 p-1 md:shadow-sm">
        <div className="py-12 text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  const meetingPreferences =
    dashboardData?.meeting_preferences || {};

  const emailPreferences =
    dashboardData?.email_preferences || {};

  const priorityInsights =
    dashboardData?.priority_insights || [];

  const frequentlyUsedApps =
    dashboardData?.frequently_used_apps || [];

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] md:border md:border-[#E2E2E2] md:p-5 p-1 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[18px] font-medium text-[#3D3D3D]">
          Behavior Learning Dashboard
        </h3>

        
      </div>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Preferences */}
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
              {meetingPreferences.preferred_times?.length > 0 ? (
                meetingPreferences.preferred_times.map((time) => (
                  <Chip key={time} label={time} />
                ))
              ) : (
                <EmptyValue />
              )}
            </div>

            <p className="mt-4 text-[14px] text-[#3D3D3D] font-medium">
              Preferred Days
            </p>

            <div className="mt-2 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
              {meetingPreferences.preferred_days?.length > 0 ? (
                meetingPreferences.preferred_days.map((day) => (
                  <Chip key={day} label={day} />
                ))
              ) : (
                <EmptyValue />
              )}
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
              <PreferenceItem
                label="Tone Selection"
                value={emailPreferences.tone}
              />

              <PreferenceItem
                label="Message Length"
                value={emailPreferences.message_length}
              />

              <PreferenceItem
                label="Signature"
                value={emailPreferences.signature}
              />
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
          {priorityInsights.length > 0 ? (
            <ul className="space-y-3 text-[14px] text-[#586D93]">
              {priorityInsights.map((insight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4866F6]">
                    <Check
                      size={11}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </span>

                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptySection message="No priority insights available." />
          )}
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

        {frequentlyUsedApps.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
            {frequentlyUsedApps.map((app, index) => (
              <AppUsageCard
                key={app.name || index}
                name={app.name}
                icon={APP_ICONS[app.name]}
                percent={app.percent ?? app.usage_percentage ?? 0}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-5">
            <EmptySection message="No frequently used apps available." />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preference Item */
/* -------------------------------------------------------------------------- */

function PreferenceItem({ label, value }) {
  return (
    <div>
      <p className="text-[14px] font-medium text-[#3D3D3D]">
        {label}
      </p>

      <p className="mt-1 text-[13px] text-[#98A2B3]">
        {value || "Not available"}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Chip */
/* -------------------------------------------------------------------------- */

function Chip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#4866F6] px-7 py-1.5 text-[13px] text-white">
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty value */
/* -------------------------------------------------------------------------- */

function EmptyValue() {
  return (
    <span className="text-[13px] text-[#98A2B3]">
      No preference available
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty section */
/* -------------------------------------------------------------------------- */

function EmptySection({ message }) {
  return (
    <p className="text-[14px] text-[#98A2B3]">
      {message}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* App Usage Card */
/* -------------------------------------------------------------------------- */

function AppUsageCard({ name, icon, percent }) {
  return (
    <div className="rounded-[12px] border border-[#4866F6] bg-[#F3F5FF] p-4">
      {icon ? (
        <img
          src={icon}
          alt={name}
          className="h-8 w-8"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-[#E6EBFF]" />
      )}

      <p className="mt-3 text-[14px] font-medium text-[#3D3D3D]">
        {name}
      </p>

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
