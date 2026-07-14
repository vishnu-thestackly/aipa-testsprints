// =============================================================================
// Payment Reports — KPIs, recent transactions, revenue & payment method charts
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import { Children, useEffect, useRef, useState } from "react";

import dayjs from "dayjs";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  IndianRupee,
  Minus,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import exportIcon from "../../../assets/images/export_icon.svg";
import calendarIcon from "../../../assets/images/calender.svg";
import refundIcon from "../../../assets/images/Refund_icon.svg";
import userStatusIcon from "../../../assets/images/user_status.svg";

import {
  getPaymentReportKPIs,
  getTransactions,
  getRevenueChart,
  getPaymentMethodUsage,
} from "../../../api/authApi";
// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const PAGE_SIZE = 6;

const COMPACT_SELECT_PADDING = "pr-8 md:pr-7 xl:pr-30";
const COMPACT_SELECT_TRIGGER_CLASS = `w-full md:w-auto cursor-pointer appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 md:py-2.5 md:text-sm lg:text-base text-left text-[#8D97A9] focus:outline-none focus:ring-0 ${COMPACT_SELECT_PADDING}`;
const COMPACT_SELECT_CHEVRON_CLASS =
  "pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400";

// KPI filter row — shared field height, border, and placeholder styling (matches design)
const KPI_FILTER_INPUT_CLASS =
  "w-full rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-10 text-sm text-[#8D97A9] focus:outline-none focus:ring-0 lg:text-base";
const DATE_FILTER_TRIGGER_CLASS =
  "w-full rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-3 text-sm focus:outline-none focus:ring-0 lg:text-base";
const KPI_FILTER_ICON_CLASS =
  "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400";

const PLAN_FILTER_OPTIONS = [
  { value: "premium", label: "Premium" },
  { value: "basic", label: "Basic" },
  { value: "free", label: "Free" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const PAYMENT_METHOD_COLORS = {
  card: "#4866F6",
  upi: "#6D82F8",
  netbanking: "#92A4F8",
};

const PAYMENT_METHOD_LEGEND_ORDER = [
  "Credit / Debit Card",
  "UPI",
  "NetBanking",
];

// Callout card positions for payment method donut
const PAYMENT_METHOD_CALLOUTS = {
  UPI: {
    position:
      "max-[375px]:left-[5%] max-[375px]:top-[40%] left-[17%] top-[40%] md:left-[25%] md:top-[40%] lg:left-[22%] lg:top-[40%]",
    pointer: "right",
  },
  "Credit / Debit Card": {
    position:
      "max-[375px]:right-[15%] max-[375px]:top-[10%] right-[25%] top-[15%] md:right-[28%] md:top-[20%] lg:right-[25%] lg:top-[20%]",
    pointer: "left",
  },
  NetBanking: {
    position:
      "max-[375px]:right-[10%] max-[375px]:bottom-[30%] right-[20%] bottom-[30%] md:right-[28%] md:bottom-[29%] lg:right-[25%] lg:bottom-[29%]",
    pointer: "left",
  },
};

// Revenue chart Y-axis: even-spaced breakpoints (log-like scale per design)
const REVENUE_Y_VALUES = [0, 500, 1000, 5000, 10000, 50000, 1000000];
const REVENUE_Y_LABELS = ["0", "500", "1k", "5k", "10k", "50k", "1M"];
const REVENUE_Y_SLOTS = REVENUE_Y_VALUES.map((_, index) => index);

const toRevenueSlot = (value) => {
  if (value <= REVENUE_Y_VALUES[0]) return 0;
  for (let i = 1; i < REVENUE_Y_VALUES.length; i++) {
    if (value <= REVENUE_Y_VALUES[i]) {
      const lower = REVENUE_Y_VALUES[i - 1];
      const upper = REVENUE_Y_VALUES[i];
      return i - 1 + (value - lower) / (upper - lower);
    }
  }
  return REVENUE_Y_VALUES.length - 1;
};

// -----------------------------------------------------------------------------
// DATA: mock payment report records (TODO: replace with API data)
// -----------------------------------------------------------------------------
const MOCK_USER_NAMES = [
  "Mahizhan N R",
  "Bharani Dharan K D",
  "Amuthan S",
  "Akilan s",
  "Raghu",
  "Praveen Kumar",
  "Surya V",
  "Karthik R",
  "Vignesh M",
  "Arun Prakash",
  "Deepak S",
];

const MOCK_PAYMENT_METHODS = ["Debit Card", "UPI", "NetBanking", "Credit Card"];
const MOCK_STATUSES = ["Success", "Pending", "Failed"];

const MOCK_PAYMENT_KPI = {
  total_revenue: 124547.0,
  successful_transactions: 50,
  failed_transactions: 12,
  refund_amount: 1200,
  active_subscribers: 524,
};

const MOCK_TRANSACTIONS = Array.from({ length: 60 }, (_, index) => {
  const id = index + 1;
  const name = MOCK_USER_NAMES[index % MOCK_USER_NAMES.length];
  const status = MOCK_STATUSES[index % MOCK_STATUSES.length];

  return {
    id,
    name,
    transaction_id: `TR9876543${String(id).padStart(2, "0")}`,
    amount: [99, 999][index % 2],
    payment_method: MOCK_PAYMENT_METHODS[index % MOCK_PAYMENT_METHODS.length],
    date: "20 Mar 2026",
    status,
  };
});

const MOCK_REVENUE_BY_MONTH = [
  { month: "Jan", amount: 500000 },
  { month: "Feb", amount: 10000 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 50000 },
  { month: "May", amount: 1000 },
  { month: "Jun", amount: 500 },
  { month: "Jul", amount: 10000 },
  { month: "Aug", amount: 5000 },
  { month: "Sep", amount: 1000 },
  { month: "Oct", amount: 500 },
  { month: "Nov", amount: 10000 },
  { month: "Dec", amount: 1000000 },
];

const MOCK_PAYMENT_METHOD_USAGE = [
  { name: "UPI", value: 55 },
  { name: "NetBanking", value: 20 },
  { name: "Credit / Debit Card", value: 25 },
];

const PAYMENT_METHOD_TOTAL = 12405.0;

// -----------------------------------------------------------------------------
// PaymentReport — payment reports home (KPIs + transactions + charts)
// -----------------------------------------------------------------------------
export default function PaymentReport({ currentPage, onPageChange }) {
  console.log("Payment Report Component Rendered");
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const fetchPaymentKPIs = async (filters = {}) => {
    try {
      const response = await getPaymentReportKPIs(filters);

      console.log("Payment KPI Response:", response);

      setStats(response?.data || response);
    } catch (error) {
      console.error("Failed to fetch payment KPIs:", error);
    }
  };

  

  const fetchTransactions = async (filters = {}) => {
    try {
      const response = await getTransactions(filters);

      console.log("Transactions Response:", response);

      setTransactions(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };


  const fetchPaymentMethodUsage = async () => {
  try {
    const response = await getPaymentMethodUsage();

    console.log("Payment Method Usage:", response);

    const chartData = response.map((item) => ({
      name: item.method,
      value: item.percent,
    }));

    setPaymentMethodData(chartData);
  } catch (error) {
    console.error("Failed to fetch payment method usage:", error);
  }
};

useEffect(() => {
    setRevenueData(MOCK_REVENUE_BY_MONTH);
  }, []);

  useEffect(() => {
  const filters = {
    from_date: fromDate || undefined,
    to_date: toDate || undefined,
    plan: selectedPlans.join(",") || undefined,
    status: selectedStatuses.join(",") || undefined,
  };

  fetchPaymentKPIs(filters);
  fetchTransactions(filters);
  fetchPaymentMethodUsage();
}, [fromDate, toDate, selectedPlans, selectedStatuses]);

console.log("paymentMethodData State:", paymentMethodData);
  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full min-h-full flex flex-col gap-4 rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:gap-5 md:p-5 lg:gap-6 lg:p-6">
        <PaymentKpiSection
          stats={stats}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          selectedPlans={selectedPlans}
          setSelectedPlans={setSelectedPlans}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />
        <RecentTransactionsSection
          transactions={transactions}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <AnalyticsChartsSection
          revenueData={revenueData}
          paymentMethodData={paymentMethodData}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PaymentKpiSection — KPI summary with date/plan/status filters
// -----------------------------------------------------------------------------
function PaymentKpiSection({
  stats,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedPlans,
  setSelectedPlans,
  selectedStatuses,
  setSelectedStatuses,
}) {
  const togglePlan = (value) => {
    setSelectedPlans((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const toggleStatus = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const formattedRevenue = `₹${(stats?.total_revenue ?? 0).toLocaleString(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )}`;

  return (
    <section className="shrink-0 rounded-2xl border border-slate-100 p-4 pt-2 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 lg:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-slate-800">
          Payment Reports KPI&apos;s
        </h2>
        <ExportButton className="w-full sm:w-auto shrink-0 justify-center sm:inline-flex" />
      </div>

      <KpiFilterBar>
        <DateFilterField label="From" value={fromDate} onChange={setFromDate} />
        <DateFilterField label="To" value={toDate} onChange={setToDate} />
        <CheckboxFilterField
          placeholder="Plan"
          options={PLAN_FILTER_OPTIONS}
          ariaLabel="Plan filter"
          selected={selectedPlans}
          onToggle={togglePlan}
          variant="kpi"
        />
        <CheckboxFilterField
          placeholder="Status"
          options={STATUS_FILTER_OPTIONS}
          ariaLabel="Status filter"
          selected={selectedStatuses}
          onToggle={toggleStatus}
          variant="kpi"
        />
      </KpiFilterBar>

      <SectionDivider />

      <div>
        <KpiGrid
          items={[
            {
              id: 1,
              value: formattedRevenue,
              label: "Total Revenue",
              icon: "revenue",
            },
            {
              id: 2,
              value: stats?.successful_transactions ?? 0,
              label: "Successful Transaction",
              icon: "success",
            },
            {
              id: 3,
              value: stats?.failed_transactions ?? 0,
              label: "Failed Transaction",
              icon: "failed",
            },
            {
              id: 4,
              value: `₹${stats?.refund_amount ?? 0}`,
              label: "Refund Amount",
              icon: "refund",
            },
            {
              id: 5,
              value: stats?.active_subscribers ?? 0,
              label: "Active Subscribers",
              icon: "subscribers",
            },
          ]}
        />
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// KpiFilterBar — 1 col mobile, 2×2 tablet (From/To then Plan/Status), 4 col desktop
// -----------------------------------------------------------------------------
function KpiFilterBar({ children }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {Children.map(children, (child) => (
        <div key={child.key} className="min-w-0">
          {child}
        </div>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// DateFilterField — full-width clickable trigger with full-width calendar panel
// -----------------------------------------------------------------------------
function DateFilterField({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const displayText = value ? dayjs(value).format("DD MMM YYYY") : label;

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

  const handleSelect = (dateValue) => {
    onChange(dateValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        id={`date-${label}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`${label} date filter`}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`${DATE_FILTER_TRIGGER_CLASS} flex cursor-pointer items-center justify-between gap-2 text-left`}
      >
        <span
          className={`min-w-0 flex-1 truncate ${value ? "text-slate-700" : "text-[#8D97A9]"}`}
        >
          {displayText}
        </span>
        <img
          src={calendarIcon}
          alt=""
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
        />
      </button>

      {open && (
        <DatePickerPanel
          label={label}
          value={value}
          onSelect={handleSelect}
          onClear={() => handleSelect("")}
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// DatePickerPanel — month grid calendar dropdown (matches input width)
// -----------------------------------------------------------------------------
function DatePickerPanel({ label, value, onSelect, onClear }) {
  const [viewDate, setViewDate] = useState(() =>
    dayjs(value || undefined).startOf("month"),
  );

  const daysInMonth = viewDate.daysInMonth();
  const firstWeekday = viewDate.startOf("month").day();
  const selectedDate = value ? dayjs(value) : null;
  const today = dayjs().startOf("day");

  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);

  const goToPreviousMonth = () => {
    setViewDate((prev) => prev.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setViewDate((prev) => prev.add(1, "month"));
  };

  const handleDaySelect = (day) => {
    const nextValue = viewDate.date(day).format("YYYY-MM-DD");
    onSelect(nextValue);
  };

  return (
    <div
      role="dialog"
      aria-label={`${label} calendar`}
      className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border border-[#CFCFCF] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] transition-colors hover:bg-slate-50"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-sm font-medium text-[#3D3D3D]">
          {viewDate.format("MMMM YYYY")}
        </p>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#586D93] transition-colors hover:bg-slate-50"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((weekday) => (
          <span
            key={weekday}
            className="py-1 text-center text-xs font-medium text-[#8D97A9]"
          >
            {weekday}
          </span>
        ))}
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`empty-${index}`} aria-hidden="true" />;
          }

          const cellDate = viewDate.date(day).startOf("day");
          const isSelected = selectedDate?.isSame(cellDate, "day");
          const isToday = today.isSame(cellDate, "day");

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleDaySelect(day)}
              className={`flex h-7 w-full cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
                isSelected
                  ? "bg-[#4866F6] font-medium text-white"
                  : isToday
                    ? "bg-[#E4E8FE] text-[#4866F6] hover:bg-[#d8ddfd]"
                    : "text-[#586D93] hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {value && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer rounded-md px-2 py-0.5 text-xs text-[#8D97A9] transition-colors hover:text-[#586D93]"
          >
            Clear date
          </button>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiGrid — 1 col mobile, 2 col tablet, 3 col desktop (3+2 layout)
// -----------------------------------------------------------------------------
function KpiGrid({ items }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <KpiCard
          key={item.id}
          value={item.value}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiCard — single KPI value, label, and icon
// -----------------------------------------------------------------------------
function KpiCard({ value, label, icon }) {
  return (
    <div className="flex w-full min-w-0 items-center gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)]">
      <KpiIcon type={icon} />
      <div className="min-w-0">
        <p className="truncate text-xl font-bold text-[#3D3D3D]">{value}</p>
        <p className="text-sm text-[#586D93] md:text-base">{label}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiIcon — inner-circle badges (revenue/success/failed) or image badges (refund/subscribers)
// -----------------------------------------------------------------------------
function KpiIcon({ type }) {
  const innerCircleIconClass = "h-5 w-5 text-[#E4E8FE]";

  const imageIconMap = {
    refund: refundIcon,
    subscribers: userStatusIcon,
  };

  if (imageIconMap[type]) {
    return (
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E4E8FE]"
        aria-hidden="true"
      >
        <img src={imageIconMap[type]} alt="" className="h-9 w-9" />
      </div>
    );
  }

  const renderInnerIcon = () => {
    switch (type) {
      case "revenue":
        return (
          <IndianRupee className={innerCircleIconClass} strokeWidth={2.5} />
        );
      case "success":
        return <Check className={innerCircleIconClass} strokeWidth={3} />;
      case "failed":
        return <X className={innerCircleIconClass} strokeWidth={3} />;
      default:
        return (
          <IndianRupee className={innerCircleIconClass} strokeWidth={2.5} />
        );
    }
  };

  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E4E8FE]"
      aria-hidden="true"
    >
      <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#4866F6]">
        {renderInnerIcon()}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// RecentTransactionsSection — toolbar, table, and pagination
// -----------------------------------------------------------------------------
function RecentTransactionsSection({
  transactions = [],
  currentPage,
  onPageChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onPageChange(1);
  };

  const toggleStatus = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    onPageChange(1);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const statusKey = (transaction.status ?? "").toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    if (query && !(transaction.name ?? "").toLowerCase().startsWith(query)) {
      return false;
    }

    if (selectedStatuses.length > 0 && !selectedStatuses.includes(statusKey)) {
      return false;
    }

    return true;
  });

  return (
    <section className="flex min-h-0 min-w-0 flex-col max-md:flex-none max-md:shrink-0 md:min-h-0 md:flex-1 md:overflow-visible">
      <h2 className="mb-3 shrink-0 text-lg font-medium text-slate-800">
        Recent Transactions
      </h2>
      <TransactionsToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
      />
      <SectionDivider />
      <TransactionTableBlock
        transactions={filteredTransactions}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}

// -----------------------------------------------------------------------------
// TransactionsToolbar — search, status filter, and export actions
// -----------------------------------------------------------------------------
function TransactionsToolbar({
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onToggleStatus,
}) {
  return (
    <div className="mb-0 flex w-full shrink-0 flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by Name"
        className="w-full md:w-[250px] xl:w-[400px] md:shrink-0"
      />
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <CheckboxFilterField
          placeholder="Status filter"
          options={STATUS_FILTER_OPTIONS}
          ariaLabel="Status filter"
          selected={selectedStatuses}
          onToggle={onToggleStatus}
          className="w-full sm:w-auto"
        />
        <ExportButton className="w-full sm:w-auto shrink-0 justify-center sm:inline-flex" />
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
// TransactionTableBlock — scrollable transaction table with pagination footer
// -----------------------------------------------------------------------------
function TransactionTableBlock({ transactions, currentPage, onPageChange }) {
  const tableScrollRef = useRef(null);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = transactions.slice(start, start + PAGE_SIZE);
  const tableSlots = Array.from({ length: PAGE_SIZE }, (_, index) => ({
    transaction: pageRows[index] ?? null,
    rowNumber: start + index + 1,
  }));

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 max-md:flex-none max-md:h-auto max-md:overflow-visible md:min-h-0 md:flex-1">
      <div
        ref={tableScrollRef}
        className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-md:flex-none max-md:overflow-y-visible md:h-[220px] md:overflow-y-scroll max-lg:touch-auto min-[1441px]:overflow-x-visible min-[1441px]:overflow-y-scroll"
      >
        <table className="w-full table-fixed text-sm max-[1440px]:min-w-[1000px] min-[1441px]:min-w-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#edf0fe] text-left text-slate-700">
              <th className="w-[7%] whitespace-nowrap px-3 py-4 font-medium md:px-3 lg:px-4">
                SL No
              </th>
              <th className="w-[16%] whitespace-nowrap px-4 py-4 font-medium">
                User Name
              </th>
              <th className="w-[18%] whitespace-nowrap px-4 py-4 font-medium">
                Transaction ID
              </th>
              <th className="w-[10%] whitespace-nowrap px-4 py-4 font-medium">
                Amount
              </th>
              <th className="w-[16%] whitespace-nowrap px-4 py-4 font-medium">
                Payment Method
              </th>
              <th className="w-[14%] whitespace-nowrap px-4 py-4 font-medium">
                Date
              </th>
              <th className="w-[14%] px-4 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {tableSlots.map(({ transaction, rowNumber }, index) =>
              transaction ? (
                <tr
                  key={transaction.payment_id}
                  className="h-11 text-slate-800"
                >
                  <td className="whitespace-nowrap px-3 py-2.5 text-[#586D93] md:px-3 lg:px-4">
                    {rowNumber}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {transaction.user_name}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {transaction.transaction_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    ₹{transaction.amount}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {transaction.payment_method}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {transaction.date
                      ? dayjs(transaction.date).format("DD MMM YYYY")
                      : "-"}
                  </td>
                  <td className="px-4 py-2.5 align-middle">
                    <div className="flex justify-start">
                      <TransactionStatusBadge status={transaction.status} />
                    </div>
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
// TransactionStatusBadge — success, pending, or failed status pill
// -----------------------------------------------------------------------------
function TransactionStatusBadge({ status }) {
  const statusStyles = {
    completed: "bg-[#33B46926] text-[#33B469]",
    pending: "bg-[#FDF5E6] text-[#F59E0B]",
    failed: "bg-[#FF000033] text-[#FF0000]",
  };
  const dotStyles = {
    completed: "bg-[#33B469]",
    pending: "bg-[#F59E0B]",
    failed: "bg-[#FF0000]",
  };

  return (
    <span
      className={`inline-flex w-[110px] items-center justify-start gap-2 rounded-full py-1.5 pl-3 pr-3 text-sm font-medium ${statusStyles[status] ?? "bg-slate-100 text-slate-700"}`}
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
// AnalyticsChartsSection — side-by-side revenue bar chart and payment donut
// -----------------------------------------------------------------------------
function AnalyticsChartsSection({ revenueData, paymentMethodData }) {
  console.log("Analytics paymentMethodData:", paymentMethodData);
  return (
    <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2 xl:items-stretch lg:gap-5">
      <RevenueChartCard data={revenueData} />
      <PaymentMethodUsageCard data={paymentMethodData} />
    </section>
  );
}

// -----------------------------------------------------------------------------
// RevenueChartCard — collapsible monthly revenue bar chart
// -----------------------------------------------------------------------------
function RevenueChartCard({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`w-full rounded-2xl border border-slate-100 py-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 flex flex-col ${expanded ? "lg:h-full" : "self-start"}`}
    >
      <div className="flex shrink-0 items-center justify-between px-4 md:px-0">
        <h2 className="text-lg font-medium text-[#4866F6]">Revenue Chart</h2>
        <CollapseToggle
          expanded={expanded}
          onToggle={() => setExpanded((prev) => !prev)}
          label="revenue chart"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <RevenueChart data={data} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// RevenueChart — recharts bar chart of revenue per month
// -----------------------------------------------------------------------------
function RevenueChart({ data }) {
  const chartData = data.map((entry) => ({
    month: entry.month,
    slot: toRevenueSlot(entry.amount),
  }));

  const formatSlot = (slot) => REVENUE_Y_LABELS[slot] ?? "";

  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col border-t border-[#CFCFCF] pt-10">
      <div className="h-[260px] w-full shrink-0 sm:h-[300px]">
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
              ticks={REVENUE_Y_SLOTS}
              domain={[0, REVENUE_Y_SLOTS.length - 1]}
              tickFormatter={formatSlot}
              tick={{ fill: "#586D93", fontSize: 10 }}
              tickMargin={8}
              axisLine={{ stroke: "#CFCFCF80" }}
              tickLine={false}
              label={{
                value: "Amount (₹)",
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
            <Bar dataKey="slot" fill="#4866F6" radius={[20, 20, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="-mt-3 flex min-h-[52px] shrink-0 items-center justify-center">
        <p className="text-center text-[10px] font-normal tracking-[0.02em] text-[#3D3D3D]">
          Monthly
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PaymentMethodUsageCard — collapsible donut chart of payment method share
// -----------------------------------------------------------------------------
function PaymentMethodUsageCard({ data }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`w-full rounded-2xl border border-slate-100 py-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 flex flex-col ${expanded ? "lg:h-full" : "self-start"}`}
    >
      <div className="flex shrink-0 items-center justify-between px-4 md:px-0">
        <h2 className="text-lg font-medium text-[#4866F6]">
          Payment Method Usage
        </h2>
        <CollapseToggle
          expanded={expanded}
          onToggle={() => setExpanded((prev) => !prev)}
          label="payment method chart"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <PaymentMethodDonut data={data} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PaymentMethodDonut — recharts pie/donut with center total, callouts, and legend
// -----------------------------------------------------------------------------
function PaymentMethodDonut({ data }) {

  console.log("Donut received:", data);


  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col border-t border-[#CFCFCF] pt-4">
      <div className="relative h-[260px] w-full shrink-0 sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              stroke="none"
              strokeWidth={0}
              labelLine={false}
              label={false}
            >
              {data.map((entry) => {
                const color = PAYMENT_METHOD_COLORS[entry.name] ?? "#4866F6";

                return (
                  <Cell
                    key={entry.name}
                    fill={color}
                    stroke={color}
                    strokeWidth={1}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm">Total</span>
          <span className="text-sm font-bold text-[#3D3D3D]">
            ₹{PAYMENT_METHOD_TOTAL.toFixed(2)}
          </span>
        </div>

        {data.map((entry) => {
          const callout = PAYMENT_METHOD_CALLOUTS[entry.name];
          if (!callout) return null;

          return (
            <PaymentMethodCallout
              key={entry.name}
              value={`${entry.value}%`}
              className={callout.position}
              pointer={callout.pointer}
            />
          );
        })}
      </div>
      <div className="flex min-h-[52px] shrink-0 flex-wrap items-center justify-center gap-4 px-2">
        {PAYMENT_METHOD_LEGEND_ORDER.map((name) => (
          <div key={name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{
                backgroundColor: PAYMENT_METHOD_COLORS[name] ?? "#4866F6",
              }}
              aria-hidden="true"
            />
            <span className="text-xs text-[#586D93] md:text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PaymentMethodCallout — white percentage badge with pointer toward donut segment
// -----------------------------------------------------------------------------
function PaymentMethodCallout({ value, className = "", pointer = "right" }) {
  const pointerClasses = {
    right:
      "absolute right-2 top-7.5 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white",
    left: "absolute left-2 top-7.5 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-white",
  };

  return (
    <div
      className={`pointer-events-none absolute z-10 ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="relative rounded-md bg-white px-2.5 py-1 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
        <span className="text-xs font-medium text-[#3D3D3D]">{value}</span>
        <span className={pointerClasses[pointer] ?? pointerClasses.right} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// CollapseToggle — expand/collapse button for chart cards
// -----------------------------------------------------------------------------
function CollapseToggle({ expanded, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#4866F6] bg-[#4866f6] text-[#ffffff] transition-colors hover:opacity-90 cursor-pointer"
    >
      {expanded ? (
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      ) : (
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      )}
    </button>
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
            className={`min-w-[2rem] rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 max-[424px]:min-w-[1.5rem] max-[424px]:px-1.5 max-[424px]:py-0.5 ${
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
// CheckboxFilterField — multi-select status/plan filter dropdown
// -----------------------------------------------------------------------------
function CheckboxFilterField({
  placeholder,
  options = [],
  ariaLabel,
  selected = [],
  onToggle,
  className = "",
  variant = "default",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const isKpiVariant = variant === "kpi";
  const triggerClass = isKpiVariant
    ? `${KPI_FILTER_INPUT_CLASS} cursor-pointer appearance-none text-left`
    : COMPACT_SELECT_TRIGGER_CLASS;
  const chevronClass = isKpiVariant
    ? `${KPI_FILTER_ICON_CLASS} transition-transform ${open ? "rotate-180" : ""}`
    : `${COMPACT_SELECT_CHEVRON_CLASS} transition-transform ${open ? "rotate-180" : ""}`;

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
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="group"
        className={triggerClass}
      >
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
      <ChevronDown className={chevronClass} aria-hidden="true" />
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
// ExportButton — export action button with icon
// -----------------------------------------------------------------------------
function ExportButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full justify-center md:inline-flex md:w-auto shrink-0 items-center cursor-pointer gap-2 rounded-lg bg-[#4866F6] px-7 py-2 text-base text-white transition-colors hover:bg-[#4851f6] md:gap-1.5 md:px-4 md:py-2.5 md:pr-4 md:text-sm lg:px-5 lg:py-2.5 lg:text-base ${className}`.trim()}
    >
      Export
      <img
        src={exportIcon}
        alt=""
        className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
        aria-hidden="true"
      />
    </button>
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
