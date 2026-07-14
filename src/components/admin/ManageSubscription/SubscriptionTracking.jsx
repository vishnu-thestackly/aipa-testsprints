// =============================================================================
// Subscription tracking — user subscription table and monthly renewal chart
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import eyeActionIcon from "../../../assets/images/eye_action.svg";
import sparkleIcon from "../../../assets/images/Sparkle.svg";
import creditCardIcon from "../../../assets/images/card.svg";

import { getSubscriptionTracking } from "../../../api/authApi";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const PAGE_SIZE = 6;

// Single-select dropdown styling (mirrors the compact selects used in Refund)
const COMPACT_SELECT_PADDING = "pr-8 md:pr-7 xl:pr-20";
const COMPACT_SELECT_TRIGGER_BASE =
  "w-full md:w-auto cursor-pointer appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 md:py-2.5 md:text-sm lg:text-base text-left text-[#8D97A9] focus:outline-none focus:ring-0";
const COMPACT_SELECT_CHEVRON_CLASS =
  "pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400";

// Filter dropdown option sets
const PLAN_FILTER_OPTIONS = [
  { value: "premium", label: "Premium" },
  { value: "basic", label: "Basic" },
  { value: "free", label: "Free" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Renewal chart Y-axis: real user breakpoints rendered at EVEN spacing so the
// 0/100/500/1K/5K/10K gridlines are equidistant (a log-like scale, as designed).
const RENEWAL_Y_VALUES = [0, 100, 500, 1000, 5000, 10000];
const RENEWAL_Y_LABELS = ["0", "100", "500", "1K", "5K", "10K"];
// Even tick slots (one per breakpoint) used as the actual numeric Y domain.
const RENEWAL_Y_SLOTS = RENEWAL_Y_VALUES.map((_, index) => index);

// Map a real user count onto its evenly-spaced slot position via piecewise
// interpolation between the breakpoints above.
const toRenewalSlot = (value) => {
  if (value <= RENEWAL_Y_VALUES[0]) return 0;
  for (let i = 1; i < RENEWAL_Y_VALUES.length; i++) {
    if (value <= RENEWAL_Y_VALUES[i]) {
      const lower = RENEWAL_Y_VALUES[i - 1];
      const upper = RENEWAL_Y_VALUES[i];
      return i - 1 + (value - lower) / (upper - lower);
    }
  }
  return RENEWAL_Y_VALUES.length - 1;
};

// -----------------------------------------------------------------------------
// DATA: mock subscription rows (TODO: replace with API data)
// -----------------------------------------------------------------------------
const MOCK_USER_NAMES = [
  "Mahizhan N R",
  "Bharani Dharan K D",
  "Amuthan S",
  "Akilan s",
  "Raghu L",
  "Prasanth s",
  "Surya V",
  "Karthik R",
  "Vignesh M",
  "Arun Prakash",
  "Deepak S",
];

const MOCK_PLANS = ["Premium", "Basic", "Free"];
const MOCK_STATUSES = ["Active", "Inactive"];

// Amount charged per plan (used in the detail view and billing history)
const PLAN_AMOUNT = { Premium: 999, Basic: 499, Free: 0 };

// Plan tagline shown in the detail-view banner
const PLAN_DESCRIPTION = {
  Premium: "Best plan for the fresher individuals",
  Basic: "Essential features for growing teams",
  Free: "Get started at no cost",
};

// Build a unique e-mail handle from a user name (e.g. "Mahizhan N R" -> "mahizhan")
const toEmailHandle = (name) =>
  (name ?? "").trim().toLowerCase().split(/\s+/)[0] || "user";

// DATA: subscription records for the table (each row also carries detail fields)
const MOCK_SUBSCRIPTIONS = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const name = MOCK_USER_NAMES[index % MOCK_USER_NAMES.length];
  const plan = MOCK_PLANS[index % MOCK_PLANS.length];
  // First three rows are Active, the rest alternate to match the design feel
  const status = index < 3 ? "Active" : MOCK_STATUSES[index % 2];

  return {
    id,
    name,
    plan,
    renewal_date: `${20 + (index % 9)} Mar 2026`,
    usage: `${90 + ((index * 5) % 80)} prompts`,
    status,
    // Detail-view fields (TODO: replace with API data)
    email: `${toEmailHandle(name)}@gmail.com`,
    start_date: "20 Feb 2026",
    amount: PLAN_AMOUNT[plan] ?? 0,
    plan_description: PLAN_DESCRIPTION[plan] ?? "",
    payment_card_label: "Rupay card ending in",
    payment_card_number: "**** **** **** 2345",
    payment_expiry: "Expires in 12/30",
    last_payment_date: "12 June 2026",
    ai_tasks_used: 840,
    ai_tasks_total: 1000,
    integrations_used: 4,
    integrations_total: 6,
  };
});

// DATA: billing history rows for the detail view (TODO: replace with API data)
const BILLING_MONTHS = [
  "22 May 2026",
  "22 April 2026",
  "22 March 2026",
  "22 February 2026",
  "22 January 2026",
  "22 December 2025",
  "22 November 2025",
  "22 October 2025",
  "22 September 2025",
  "22 August 2025",
];

const buildBillingHistory = (subscription) =>
  BILLING_MONTHS.map((date, index) => ({
    id: index + 1,
    date,
    plan: subscription?.plan ?? "Premium",
    amount: subscription?.amount ?? 0,
    status: "Paid",
  }));

// DATA: monthly subscription renewal counts for the chart
const MOCK_RENEWAL_BY_MONTH = [
  { month: "Jan", users: 10000 },
  { month: "Feb", users: 1000 },
  { month: "Mar", users: 1000 },
  { month: "Apr", users: 500 },
  { month: "May", users: 1000 },
  { month: "Jun", users: 1000 },
  { month: "Jul", users: 1000 },
  { month: "Aug", users: 5000 },
  { month: "Sep", users: 1000 },
  { month: "Oct", users: 500 },
  { month: "Nov", users: 1000 },
  { month: "Dec", users: 1000 },
];

// -----------------------------------------------------------------------------
// SubscriptionTracking — page shell (table card + renewal chart card)
// -----------------------------------------------------------------------------
export default function SubscriptionTracking({ currentPage, onPageChange }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [renewalData, setRenewalData] = useState([]);
  // Row whose eye action was clicked; when set, the detail view replaces the list
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await getSubscriptionTracking({
        page: currentPage,
      });

      console.log("Subscription Tracking Response:", response);

      setSubscriptions(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Subscription Tracking Error:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
    setRenewalData(MOCK_RENEWAL_BY_MONTH);
  }, [currentPage]);

  // Detail view (eye action target) — mirrors the list/detail switch in Dashboard
  if (selectedSubscription) {
    return (
      <SubscriptionDetailPage
        subscription={selectedSubscription}
        onBack={() => setSelectedSubscription(null)}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      {/* Single card wrapping both the tracking table and the renewal chart */}
      <div className="w-full rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:p-5 lg:p-6">
        <SubscriptionTrackingCard
          subscriptions={subscriptions}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onViewSubscription={setSelectedSubscription}
        />
        <SubscriptionRenewalCard data={renewalData} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionTrackingCard — heading, toolbar, table, and pagination
// -----------------------------------------------------------------------------
function SubscriptionTrackingCard({
  subscriptions,
  currentPage,
  onPageChange,
  onViewSubscription,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onPageChange(1);
  };

  const togglePlan = (value) => {
    setSelectedPlans((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    onPageChange(1);
  };

  const toggleStatus = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    onPageChange(1);
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const query = searchQuery.trim().toLowerCase();
    const planKey = (subscription.plan ?? "").toLowerCase();
    const statusKey = (subscription.status ?? "").toLowerCase();

    if (query && !(subscription.name ?? "").toLowerCase().startsWith(query)) {
      return false;
    }

    if (selectedPlans.length > 0 && !selectedPlans.includes(planKey)) {
      return false;
    }

    if (selectedStatuses.length > 0 && !selectedStatuses.includes(statusKey)) {
      return false;
    }

    return true;
  });

  return (
    <section className="w-full">
      <h2 className="text-lg font-medium text-slate-800">
        User Subscription Tracking
      </h2>

      <SubscriptionToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedPlans={selectedPlans}
        onTogglePlan={togglePlan}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
      />

      <SectionDivider />

      <SubscriptionTableBlock
        subscriptions={filteredSubscriptions}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onViewSubscription={onViewSubscription}
      />
    </section>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionToolbar — search field plus plan and status checkbox filters
// -----------------------------------------------------------------------------
function SubscriptionToolbar({
  searchQuery,
  onSearchChange,
  selectedPlans,
  onTogglePlan,
  selectedStatuses,
  onToggleStatus,
}) {
  return (
    <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by Name"
        className="w-full md:w-[250px] lg:w-[220px] xl:w-[400px] md:shrink-0"
      />
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <CheckboxFilterField
          placeholder="Subscription filter"
          options={PLAN_FILTER_OPTIONS}
          ariaLabel="Subscription filter"
          selected={selectedPlans}
          onToggle={onTogglePlan}
          className="w-full sm:w-auto"
        />
        <CheckboxFilterField
          placeholder="Status"
          options={STATUS_FILTER_OPTIONS}
          ariaLabel="Status filter"
          selected={selectedStatuses}
          onToggle={onToggleStatus}
          className="w-full sm:w-auto"
          paddingClass="pr-16 md:pr-16 lg:pr-16 xl:pr-38"
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SearchInput — search field with magnifying glass icon
// -----------------------------------------------------------------------------
function SearchInput({
  value,
  onChange,
  placeholder = "Search by Name",
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`.trim()}>
      <input
        type="search"
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#CFCFCF] bg-white py-1.5 lg:py-2.5 pl-3 pr-10 lg:text-base md:text-sm md:py-2.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0 "
      />
      <Search
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// CheckboxFilterField — multi-select dropdown with checkbox options
// -----------------------------------------------------------------------------
function CheckboxFilterField({
  placeholder,
  options = [],
  ariaLabel,
  selected = [],
  onToggle,
  className = "",
  paddingClass = COMPACT_SELECT_PADDING,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close the menu on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (containerRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="group"
        className={`${COMPACT_SELECT_TRIGGER_BASE} ${paddingClass}`}
      >
        {/* Invisible sizing layer keeps the trigger width fixed to the placeholder */}
        <span className="inline-grid [grid-template-areas:'label']">
          <span
            className="invisible col-start-1 row-start-1 whitespace-nowrap"
            aria-hidden="true"
          >
            {placeholder}
          </span>
          <span className="col-start-1 row-start-1 truncate whitespace-nowrap">
            {placeholder}
          </span>
        </span>
      </button>
      <ChevronDown
        className={`${COMPACT_SELECT_CHEVRON_CLASS} transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
      {open && (
        <div
          role="group"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-50 mt-2 w-full min-w-full rounded-xl bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          {options.map((option) => {
            const checked = selected.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => onToggle(option.value)}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    checked
                      ? "border-[#4866F6] bg-[#4866F6]"
                      : "border-[#4866F6] bg-white"
                  }`}
                  aria-hidden="true"
                >
                  {checked && (
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  )}
                </span>
                <span className="text-base text-[#586D93] md:text-sm lg:text-base">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionTableBlock — scrollable subscription table with pagination footer
// -----------------------------------------------------------------------------
function SubscriptionTableBlock({
  subscriptions,
  currentPage,
  onPageChange,
  onViewSubscription,
}) {
  const tableScrollRef = useRef(null);

  const totalPages = Math.ceil(subscriptions.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = subscriptions.slice(start, start + PAGE_SIZE);
  const tableSlots = Array.from({ length: PAGE_SIZE }, (_, index) => ({
    row: pageRows[index] ?? null,
    rowNumber: start + index + 1,
  }));

  // Clamp the current page if filtering shrinks the result set
  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200">
      <div
        ref={tableScrollRef}
        className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1441px]:overflow-x-visible"
      >
        <table className="w-full table-fixed text-sm max-[1440px]:min-w-[1000px] min-[1441px]:min-w-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#edf0fe] text-left text-slate-700">
              <th className="w-[7%] whitespace-nowrap px-3 py-4 font-medium md:px-3 lg:px-4">
                SL No
              </th>
              <th className="w-[20%] whitespace-nowrap px-4 py-4 font-medium">
                User Name
              </th>
              <th className="w-[15%] whitespace-nowrap px-4 py-4 font-medium">
                Current Plan
              </th>
              <th className="w-[15%] whitespace-nowrap px-4 py-4 font-medium">
                Renewal Date
              </th>
              <th className="w-[15%] whitespace-nowrap px-4 py-4 font-medium">
                Usage
              </th>
              <th className="w-[16%] px-4 py-4 font-medium">Status</th>
              <th className="w-[7%] px-4 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {tableSlots.map(({ row, rowNumber }, index) =>
              row ? (
                <tr key={row.id} className="h-11 text-slate-800">
                  <td className="whitespace-nowrap px-5 py-2.5 text-[#586D93] md:px-5 lg:px-4">
                    {rowNumber}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {row.user_name}
                  </td>
                  <td className="px-4 py-2.5">
                    <PlanBadge plan={row.current_plan} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {row.renewal_date?.split("T")[0]}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {row.usage_prompts}
                  </td>
                  <td className="px-4 py-2.5 align-middle">
                    <div className="flex justify-start">
                      <SubscriptionStatusBadge status={row.status} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => onViewSubscription?.(row)}
                      aria-label={`View subscription for ${row.name}`}
                      className="inline-flex h-6 w-6 items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
                    >
                      <img
                        src={eyeActionIcon}
                        alt=""
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={`empty-row-${start}-${index}`}
                  className="h-11"
                  aria-hidden="true"
                >
                  <td className="px-3 py-2.5 md:px-3 lg:px-4">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                  <td className="px-4 py-2.5">&nbsp;</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      <div className="shrink-0 border-t border-slate-200 px-4 py-3">
        <div className="flex min-h-9 items-center justify-center sm:justify-end">
          {totalPages > 1 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          ) : (
            <nav
              aria-hidden="true"
              className="invisible flex items-center gap-1 text-[15px]"
            >
              <span className="px-2 py-1">Previous</span>
              <span className="min-w-8 rounded px-2 py-1">1</span>
              <span className="px-2 py-1">Next</span>
            </nav>
          )}
        </div>
        <div className="mt-3 min-h-1 min-[1441px]:hidden">
          <HorizontalScrollIndicator
            scrollRef={tableScrollRef}
            className="block"
          />
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PlanBadge — lavender pill showing the subscription plan name
// -----------------------------------------------------------------------------
function PlanBadge({ plan }) {
  return (
    <span className="inline-flex min-w-[90px] items-center justify-center rounded-md bg-[#edf0fe] px-4 py-1 text-sm font-medium text-[#4866F6]">
      {plan}
    </span>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionStatusBadge — active (green) or inactive (red) status pill
// -----------------------------------------------------------------------------
function SubscriptionStatusBadge({ status, solid = false }) {
  const statusStyles = {
    active: solid ? "bg-[#33B469] text-white" : "bg-[#33B46926] text-[#33B469]",
    Inactive: "bg-[#FF000033] text-[#FF0000]",
  };
  const dotStyles = {
    active: solid ? "bg-white" : "bg-[#33B469]",
    Inactive: "bg-[#FF0000]",
  };

  return (
    <span
      className={`inline-flex items-center justify-start gap-2 rounded-full py-1.5 pl-3 pr-3 text-sm font-normal ${solid ? "w-[85px]" : "w-[95px]"} ${statusStyles[status] ?? "bg-slate-100 text-slate-700"}`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${dotStyles[status] ?? "bg-slate-500"}`}
        aria-hidden="true"
      />
      <span className="leading-none">{status}</span>
    </span>
  );
}

// -----------------------------------------------------------------------------
// getPaginationItems — page numbers with ellipsis for long page ranges
// -----------------------------------------------------------------------------
function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set();

  if (currentPage <= 2) {
    pages.add(1);
    pages.add(2);
    pages.add(3);
    pages.add(totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.add(1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 1);
    pages.add(totalPages);
  } else {
    pages.add(currentPage - 1);
    pages.add(currentPage);
    pages.add(currentPage + 1);
    pages.add(totalPages);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push("ellipsis");
    }
    items.push(sorted[i]);
  }

  return items;
}

// -----------------------------------------------------------------------------
// Pagination — page numbers and previous/next controls
// -----------------------------------------------------------------------------
function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = getPaginationItems(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const navButtonClass =
    "inline-flex items-center gap-1 rounded px-2 py-1 transition-colors max-[424px]:gap-0.5 max-[424px]:px-1.5 max-[424px]:py-0.5";
  const navButtonEnabled = "text-[#4866F6] hover:text-blue-800";
  const navButtonDisabled = "cursor-not-allowed text-slate-300";

  return (
    <nav
      className="flex shrink-0 items-center justify-center sm:flex sm:items-center sm:justify-end gap-1 text-[15px] text-slate-600 max-[424px]:gap-0.5 max-[424px]:text-sm"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${navButtonClass} ${isFirstPage ? navButtonDisabled : navButtonEnabled}`}
      >
        <ChevronsLeft
          className="h-4 w-4 max-[424px]:h-3 max-[424px]:w-3"
          aria-hidden="true"
        />
        Previous
      </button>
      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="select-none px-1 text-slate-600"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`min-w-8 rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 max-[424px]:min-w-6 max-[424px]:px-1.5 max-[424px]:py-0.5 ${
              item === currentPage
                ? "bg-blue-600 font-medium text-white"
                : "hover:text-blue-600"
            }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${navButtonClass} ${isLastPage ? navButtonDisabled : navButtonEnabled}`}
      >
        Next
        <ChevronsRight
          className="h-4 w-4 max-[424px]:h-3 max-[424px]:w-3"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// HorizontalScrollIndicator — custom scrollbar for wide table on mobile
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// SubscriptionRenewalCard — collapsible monthly renewal bar chart
// -----------------------------------------------------------------------------
function SubscriptionRenewalCard({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="mt-5 w-full rounded-2xl border border-slate-100 py-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-medium text-[#4866F6]">
          Subscription Renewal (Monthly)
        </h2>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={
            expanded ? "Collapse renewal chart" : "Expand renewal chart"
          }
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4866F6] bg-[#4866f6] text-[#ffffff] transition-colors hover:opacity-90 cursor-pointer"
        >
          {expanded ? (
            <Minus className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          )}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <SubscriptionRenewalChart data={data} />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionRenewalChart — recharts bar chart of renewals per month
// -----------------------------------------------------------------------------
function SubscriptionRenewalChart({ data }) {
  // Plot each month at its evenly-spaced slot, keeping the real count for tooltips
  const chartData = data.map((entry) => ({
    month: entry.month,
    slot: toRenewalSlot(entry.users),
    users: entry.users,
  }));

  // Render Y-axis tick slots back as their human-readable breakpoint labels
  const formatSlot = (slot) => RENEWAL_Y_LABELS[slot] ?? "";

  return (
    <div className="mt-4 w-full border-t border-[#CFCFCF] pt-4">
      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barSize={10}
            margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid vertical={false} stroke="#E5E7EB" />

            <XAxis
              dataKey="month"
              tick={{ fill: "#586D93", fontSize: 10 }}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={false}
              interval={0}
            />

            <YAxis
              ticks={RENEWAL_Y_SLOTS}
              domain={[0, RENEWAL_Y_SLOTS.length - 1]}
              tickFormatter={formatSlot}
              tick={{ fill: "#586D93", fontSize: 10 }}
              tickMargin={8}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={false}
              label={{
                value: "No of Users",
                angle: -90,
                position: "insideLeft",
                dy: 30,
                style: {
                  fill: "#3D3D3D",
                  fontSize: 10,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                },
              }}
            />

            <Tooltip
              cursor={{ fill: "#4866F60D" }}
              formatter={(value, name, item) => [
                item?.payload?.users ?? value,
                "No of Users",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}
            />

            <Bar dataKey="slot" fill="#4866F6" radius={[20, 20, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-center text-[10px] font-normal tracking-[0.02em] text-[#3D3D3D]">
        Monthly
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SectionDivider — horizontal rule between sections
// -----------------------------------------------------------------------------
function SectionDivider() {
  return (
    <hr
      className="my-4 mt-3 border-0 border-t border-[#CFCFCF]"
      aria-hidden="true"
    />
  );
}

// =============================================================================
// DETAIL VIEW — opened from the table eye action
// =============================================================================

// -----------------------------------------------------------------------------
// SubscriptionDetailPage — full subscription detail (banner, payment, usage, bills)
// -----------------------------------------------------------------------------
function SubscriptionDetailPage({ subscription, onBack }) {
  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      {/* Single card wrapping every detail section */}
      <div className="w-full rounded-[20px] md:rounded-[25px] bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to subscription list"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4866F6] text-white transition-colors hover:bg-[#3d57e6] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-medium text-slate-800">
            User Subscription Details
          </h2>
        </div>

        <SectionDivider />

        <PlanBanner subscription={subscription} />
        <PaymentMethodCard subscription={subscription} />
        <UsageMetricsCard subscription={subscription} />
        <BillingHistoryCard subscription={subscription} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PlanBanner — highlighted plan summary with user info row (lavender box)
// -----------------------------------------------------------------------------
function PlanBanner({ subscription }) {
  return (
    <div className="rounded-xl border border-[#4866F6] bg-[#E4E8FE] p-4 md:p-5">
      {/* Plan name + description with sparkle badge */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#4866F6]">
          <img
            src={sparkleIcon}
            alt=""
            className="h-6 w-6"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-[#3D3D3D]">{subscription.plan} plan</p>
          <p className="text-sm text-[#8D97A9]">
            {subscription.plan_description}
          </p>
        </div>
      </div>

      <hr className="my-4 border-0 border-t border-none" aria-hidden="true" />

      {/* User info row.
          Tablet (md): 3-col grid -> User Name / Email ID on row 1,
          Start Date / Renewal Date / Status on row 2 (matching the design).
          Desktop (lg+) reverts to the single flex row; the md grid-placement
          classes are inert under flex, so desktop is unaffected. */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between md:grid md:grid-cols-3 md:gap-x-13 md:gap-y-5 lg:flex">
        <DetailField
          label="User Name"
          value={subscription.name}
          className="md:col-start-1 md:row-start-1"
        />
        <DetailField
          label="Email ID"
          value={subscription.email}
          className="md:col-start-2 md:row-start-1"
        />
        {/* Mobile (<sm): Start Date & Renewal Date side by side.
            sm+ uses `contents` so these fields flow directly into the parent,
            keeping the tablet grid and desktop row layouts unchanged. */}
        <div className="flex justify-between gap-11 md:gap-4 sm:contents">
          <DetailField
            label="Start Date"
            value={subscription.start_date}
            className="md:col-start-1 md:row-start-2"
          />
          <DetailField
            label="Renewal Date"
            value={subscription.renewal_date}
            className="md:col-start-2 md:row-start-2"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:col-start-3 md:row-start-2 md:justify-self-end">
          <p className="text-md font-medium text-[#3D3D3D]">Status</p>
          <SubscriptionStatusBadge status={subscription.status} solid />
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// DetailField — stacked label/value pair used across the detail cards
// -----------------------------------------------------------------------------
function DetailField({ label, value, className = "" }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className}`.trim()}>
      <p className="text-md font-medium text-[#3D3D3D]">{label}</p>
      <p className="truncate text-sm text-[#8D97A9]">{value}</p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PaymentMethodCard — saved payment method and last payment date
// -----------------------------------------------------------------------------
function PaymentMethodCard({ subscription }) {
  return (
    <section className="mt-5 w-full rounded-2xl border border-slate-100 p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 max-md:rounded-none max-md:border-0 max-md:p-0 max-md:shadow-none">
      <h2 className="text-lg font-medium text-slate-800">Payment Method</h2>

      <SectionDivider />

      <div className="flex flex-col gap-4 rounded-xl border border-[#4866F6] bg-[#E4E8FE] p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#4866F6]">
            <img
              src={creditCardIcon}
              alt=""
              className="h-6 w-6"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-md md:text-sm lg:text-base text-[#3D3D3D]">
              {subscription.payment_card_label}{" "}
              {/* Mobile: card number drops to its own line; md+ keeps it inline */}
              <span className="block md:inline">
                {subscription.payment_card_number}
              </span>
            </p>
            <p className="text-sm md:text-xs lg:text-sm text-[#8D97A9]">
              {subscription.payment_expiry}
            </p>
          </div>
        </div>
        <div className="shrink-0 md:text-right">
          <p className="font-semibold md:text-sm lg:text-base text-[#3D3D3D]">
            Last Payment Date
          </p>
          <p className="mt-0.5 text-sm md:text-xs lg:text-sm text-[#8D97A9]">
            {subscription.last_payment_date}
          </p>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// UsageMetricsCard — AI task and integration consumption progress bars
// -----------------------------------------------------------------------------
function UsageMetricsCard({ subscription }) {
  return (
    <section className="mt-5 w-full rounded-2xl border border-slate-100 p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 max-md:rounded-none max-md:border-0 max-md:p-0 max-md:shadow-none">
      <h2 className="text-lg font-medium text-slate-800">Usage Metrics</h2>

      <SectionDivider />

      <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-40">
        <UsageBar
          label="AI Tasks Used"
          used={subscription.ai_tasks_used}
          total={subscription.ai_tasks_total}
        />
        <UsageBar
          label="Integrations Used"
          used={subscription.integrations_used}
          total={subscription.integrations_total}
        />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// UsageBar — labeled progress bar showing used vs. total
// -----------------------------------------------------------------------------
function UsageBar({ label, used = 0, total = 0 }) {
  const safeUsed = Number(used) || 0;
  const safeTotal = Number(total) || 1;

  const percent = Math.min(
    100,
    Math.round((safeUsed / safeTotal) * 100)
  );

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between text-md font-medium">
        <span className="text-[#3D3D3D]">{label}</span>

        <span className="text-[#3D3D3D]">
          {safeUsed.toLocaleString()} / {safeTotal.toLocaleString()}
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
        <div
          className="h-full rounded-full bg-[#4866F6]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// BillingHistoryCard — past invoices table with pagination
// -----------------------------------------------------------------------------
function BillingHistoryCard({ subscription }) {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const tableScrollRef = useRef(null);

  useEffect(() => {
    // TODO: replace mock data with API calls
    setHistory(buildBillingHistory(subscription));
    setPage(1);
  }, [subscription]);

  const totalPages = Math.ceil(history.length / PAGE_SIZE) || 1;
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = history.slice(start, start + PAGE_SIZE);
  const tableSlots = Array.from({ length: PAGE_SIZE }, (_, index) => ({
    row: pageRows[index] ?? null,
    rowNumber: start + index + 1,
  }));

  return (
    <section className="mt-8 w-full rounded-2xl border border-slate-100 p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 max-md:rounded-none max-md:border-0 max-md:p-0 max-md:shadow-none">
      <h2 className="text-lg font-medium text-slate-800">Billing History</h2>

      <SectionDivider />

      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200">
        <div
          ref={tableScrollRef}
          className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[1441px]:overflow-x-visible"
        >
          <table className="w-full table-fixed text-sm max-[1440px]:min-w-[800px] min-[1441px]:min-w-0">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#edf0fe] text-left text-slate-700">
                <th className="w-[15%] whitespace-nowrap px-3 py-4 font-medium md:px-3 lg:px-7">
                  SL No
                </th>
                <th className="w-[27%] whitespace-nowrap px-4 py-4 font-medium">
                  Date
                </th>
                <th className="w-[26%] whitespace-nowrap px-4 py-4 font-medium">
                  Subscription Plan
                </th>
                <th className="w-[17%] whitespace-nowrap px-4 py-4 font-medium">
                  Amount
                </th>
                <th className="w-[15%] px-4 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {tableSlots.map(({ row, rowNumber }, index) =>
                row ? (
                  <tr key={row.id} className="h-11 text-slate-800">
                    <td className="whitespace-nowrap px-6 py-2.5 text-[#586D93] md:px-6 lg:px-10">
                      {rowNumber}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                      {row.date}
                    </td>
                    <td className="px-4 py-2.5">
                      <PlanBadge plan={row.plan} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                      ₹{row.amount}
                    </td>
                    <td className="px-4 py-2.5 align-middle">
                      <div className="flex justify-start">
                        <PaidStatusBadge status={row.status} />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={`empty-billing-${start}-${index}`}
                    className="h-11"
                    aria-hidden="true"
                  >
                    <td className="px-3 py-2.5 md:px-3 lg:px-4">&nbsp;</td>
                    <td className="px-4 py-2.5">&nbsp;</td>
                    <td className="px-4 py-2.5">&nbsp;</td>
                    <td className="px-4 py-2.5">&nbsp;</td>
                    <td className="px-4 py-2.5">&nbsp;</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        <div className="shrink-0 border-t border-slate-200 px-4 py-3">
          <div className="flex min-h-9 items-center justify-center sm:justify-end">
            {totalPages > 1 ? (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            ) : (
              <nav
                aria-hidden="true"
                className="invisible flex items-center gap-1 text-[15px]"
              >
                <span className="px-2 py-1">Previous</span>
                <span className="min-w-8 rounded px-2 py-1">1</span>
                <span className="px-2 py-1">Next</span>
              </nav>
            )}
          </div>
          <div className="mt-3 min-h-1 min-[1441px]:hidden">
            <HorizontalScrollIndicator
              scrollRef={tableScrollRef}
              className="block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// PaidStatusBadge — green "Paid" pill for the billing history table
// -----------------------------------------------------------------------------
function PaidStatusBadge({ status }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-[#33B46926] px-6 py-1 text-sm font-medium text-[#33B469]">
      {status}
    </span>
  );
}
