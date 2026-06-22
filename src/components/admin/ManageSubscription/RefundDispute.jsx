// =============================================================================
// Refund & dispute — KPIs and refund/dispute request management
// =============================================================================

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------
import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from "lucide-react";
import exportIcon from "../../../assets/images/export_icon.svg";
import eyeActionIcon from "../../../assets/images/eye_action.svg";
import requestIcon from "../../../assets/images/Request_icon.svg";
import disputeIcon from "../../../assets/images/Dispute_icon.svg";
import refundIcon from "../../../assets/images/Refund_icon.svg";
import sparkleIcon from "../../../assets/images/Sparkle.svg";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const STATUS_FILTER_PLACEHOLDER = "Status filter";

const statusFilterOptions = [
  { value: "success", label: "Success" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

const COMPACT_SELECT_PADDING = "pr-8 md:pr-7 xl:pr-30";
const COMPACT_SELECT_TRIGGER_CLASS = `w-full md:w-auto cursor-pointer appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 md:py-2.5 md:text-sm lg:text-base text-left text-[#8D97A9] focus:outline-none focus:ring-0 ${COMPACT_SELECT_PADDING}`;
const COMPACT_SELECT_CHEVRON_CLASS =
  "pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400";

const PAGE_SIZE = 6;

// DATA: Refund & dispute KPI summary
const MOCK_PLACEHOLDER_REASON =
  "Imi, id est laborum et Deserunt fuga Et mollitia an";
const MOCK_MODAL_REASON = MOCK_PLACEHOLDER_REASON;

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

const MOCK_STATUSES = ["Success", "Pending", "Rejected"];

// Users with premium refund amount in mock data
const HIGH_AMOUNT_USERS = ["Mahizhan N R", "Akilan s", "Raghu"];

// DATA: Refund request records for list view
const MOCK_REFUND_REQUESTS = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const status = MOCK_STATUSES[index % MOCK_STATUSES.length];
  const name = MOCK_USER_NAMES[index % MOCK_USER_NAMES.length];

  return {
    id,
    name,
    request_id: `RID987654321${String(id).padStart(2, "0")}`,
    transaction_id: `TR98765432${String(id).padStart(2, "0")}`,
    date: "20 Mar 2026",
    payment_method: "Debit Card",
    plan_name: "Premium plan",
    plan_description: "Best plan for the fresher individuals",
    amount: HIGH_AMOUNT_USERS.includes(name) ? 999 : 99,
    reason: MOCK_MODAL_REASON,
    status,
  };
});

// DATA: Refund & dispute KPI summary
const MOCK_REFUND_KPI = {
  refund_requests: 12,
  disputes: 10,
  refund_amount: 1200.0,
};

// -----------------------------------------------------------------------------
// RefundDispute — refund & dispute home (KPIs + request list)
// -----------------------------------------------------------------------------
export default function RefundDispute({
  onViewRequest,
  currentPage,
  onPageChange,
}) {
  const [stats, setStats] = useState(null);
  const [requestsList, setRequestsList] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const selectedRequest =
    requestsList.find((request) => request.id === selectedRequestId) ?? null;

  const handleViewRequest = (requestId) => {
    setSelectedRequestId(requestId);
    onViewRequest?.(requestId);
  };

  const handleCloseRequestModal = () => {
    setSelectedRequestId(null);
  };

  useEffect(() => {
    // TODO: replace mock data with API calls
    setStats(MOCK_REFUND_KPI);
    setRequestsList(MOCK_REFUND_REQUESTS);
  }, []);

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full min-h-full flex flex-col gap-4 rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:gap-5 md:p-5 lg:gap-6 lg:p-6">
        <RefundKpiSection stats={stats} />
        <RefundManagementSection
          requests={requestsList}
          onViewRequest={handleViewRequest}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      <RefundRequestModal
        request={selectedRequest}
        onClose={handleCloseRequestModal}
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// RefundKpiSection — refund & dispute summary cards
// -----------------------------------------------------------------------------
function RefundKpiSection({ stats }) {
  return (
    <section className="shrink-0 rounded-2xl border border-slate-100 p-4 pt-2 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 lg:p-5">
      <h2 className="text-[18px] font-medium text-[#3D3D3D]">
        Refund &amp; Dispute KPI&apos;s
      </h2>
      <SectionDivider />
      <KpiGrid
        items={[
          {
            id: 1,
            value: stats?.refund_requests ?? 0,
            label: "Refund Request",
            icon: "refund",
          },
          {
            id: 2,
            value: stats?.disputes ?? 0,
            label: "Disputes",
            icon: "dispute",
          },
          {
            id: 3,
            value: `₹${(stats?.refund_amount ?? 0).toFixed(2)}`,
            label: "Refund Amount",
            icon: "amount",
          },
        ]}
      />
    </section>
  );
}

// -----------------------------------------------------------------------------
// KpiGrid — responsive grid of KPI cards
// -----------------------------------------------------------------------------
function KpiGrid({ items }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    <div className="flex w-full min-w-0 items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)]">
      <KpiIcon type={icon} />
      <div>
        <p className="text-xl font-bold text-slate-800">{value}</p>
        <p className="text-base text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiIcon — circular badge with KPI SVG icon (light blue outer ring only)
// -----------------------------------------------------------------------------
function KpiIcon({ type }) {
  const iconMap = {
    refund: requestIcon,
    dispute: disputeIcon,
    amount: refundIcon,
  };

  const iconSrc = iconMap[type] ?? requestIcon;

  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E4E8FE]"
      aria-hidden="true"
    >
      <img src={iconSrc} alt="" className="h-9 w-9" />
    </div>
  );
}

// -----------------------------------------------------------------------------
// RefundManagementSection — toolbar, table, and pagination
// -----------------------------------------------------------------------------
function RefundManagementSection({
  requests = [],
  onViewRequest,
  currentPage,
  onPageChange,
}) {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredRequests = requests.filter((request) => {
    const statusKey = (request.status ?? "").toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    if (query && !(request.name ?? "").toLowerCase().startsWith(query)) {
      return false;
    }

    if (selectedStatuses.length > 0 && !selectedStatuses.includes(statusKey)) {
      return false;
    }

    return true;
  });

  return (
    <section className="flex min-h-0 min-w-0 flex-col max-md:flex-none max-md:shrink-0 md:min-h-0 md:flex-1 md:overflow-visible">
      <h2 className="mb-3 shrink-0 text-[18px] font-medium text-[#3D3D3D]">
        Refund &amp; Dispute Management
      </h2>
      <RefundToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
      />
      <SectionDivider />
      <RefundTableBlock
        requests={filteredRequests}
        onViewRequest={onViewRequest}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}

// -----------------------------------------------------------------------------
// RefundToolbar — search, status filter, and export actions
// -----------------------------------------------------------------------------
function RefundToolbar({
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
          placeholder={STATUS_FILTER_PLACEHOLDER}
          options={statusFilterOptions}
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
// RefundTableBlock — scrollable refund table with pagination footer
// -----------------------------------------------------------------------------
function RefundTableBlock({
  requests,
  onViewRequest,
  currentPage,
  onPageChange,
}) {
  const tableScrollRef = useRef(null);

  const totalPages = Math.ceil(requests.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRequests = requests.slice(start, start + PAGE_SIZE);
  const tableSlots = Array.from({ length: PAGE_SIZE }, (_, index) => ({
    request: pageRequests[index] ?? null,
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
                Request ID
              </th>
              <th className="w-[10%] whitespace-nowrap px-4 py-4 font-medium">
                Amount
              </th>
              <th className="w-[28%] px-4 py-4 font-medium">Reason</th>
              <th className="w-[14%] px-4 py-4 font-medium">Status</th>
              <th className="w-[7%] px-4 py-4 font-medium   ">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {tableSlots.map(({ request, rowNumber }, index) =>
              request ? (
                <tr key={request.id} className="h-11 text-slate-800">
                  <td className="whitespace-nowrap px-3 py-2.5 text-[#586D93] md:px-3 lg:px-4">
                    {rowNumber}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {request.name}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {request.request_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    ₹{request.amount}
                  </td>
                  <td className="truncate px-4 py-2.5 text-[#586D93]">
                    {request.reason}
                  </td>
                  <td className="px-4 py-2.5 align-middle">
                    <div className="flex justify-start">
                      <RefundStatusBadge status={request.status} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      onClick={() => onViewRequest?.(request.id)}
                      aria-label={`View refund request for ${request.name}`}
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
// RefundStatusBadge — success, pending, or rejected status pill
// -----------------------------------------------------------------------------
function RefundStatusBadge({ status }) {
  const statusStyles = {
    Success: "bg-[#33B46926] text-[#33B469]",
    Pending: "bg-[#FDF5E6] text-[#F59E0B]",
    Rejected: "bg-[#FF000033] text-[#FF0000]",
  };
  const dotStyles = {
    Success: "bg-[#33B469]",
    Pending: "bg-[#F59E0B]",
    Rejected: "bg-[#FF0000]",
  };

  return (
    <span
      className={`inline-flex w-[95px] items-center justify-start gap-2 rounded-full py-1.5 pl-3 pr-3 text-sm font-medium ${statusStyles[status] ?? "bg-slate-100 text-slate-700"}`}
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
// CheckboxFilterField — multi-select status filter dropdown
// -----------------------------------------------------------------------------
function CheckboxFilterField({
  placeholder,
  options = [],
  ariaLabel,
  selected = [],
  onToggle,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

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
        className={COMPACT_SELECT_TRIGGER_CLASS}
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

// -----------------------------------------------------------------------------
// RefundRequestModal — full refund request detail view (eye action overlay)
// -----------------------------------------------------------------------------
function RefundRequestModal({ request, onClose }) {
  useEffect(() => {
    if (!request) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [request, onClose]);

  if (!request) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/45 px-4 py-6 md:flex md:items-center md:justify-center backdrop-blur-[1px] scrollbar-hide"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[720px] rounded-3xl bg-white px-6 pb-7 pt-10 shadow-[0_14px_40px_rgba(19,34,94,0.2)] md:px-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-request-details-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#f15055] text-[12px] leading-none text-white"
          aria-label="Close refund request details"
        >
          <X size={12} strokeWidth={3} />
        </button>

        <h2
          id="refund-request-details-title"
          className="text-center text-2xl font-semibold text-[#4866F6] md:text-2xl"
        >
          Refund Request Details
        </h2>
        <p className="mt-3 text-center text-md text-[#8D97A9] md:text-base">
          View complete information about your transaction.
        </p>

        <hr
          className="mt-5 border-0 border-t border-[#CFCFCF]"
          aria-hidden="true"
        />

        <div className="mt-5 flex flex-col gap-3 text-sm md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-y-4 md:text-sm">
          <ModalDetailField label="Request ID" value={request.request_id} />
          <ModalDetailField
            label="Transaction ID"
            value={request.transaction_id}
          />
          <ModalDetailField label="Date" value={request.date} />
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between md:text-sm">
          <ModalDetailField label="User Name" value={request.name} />
          <ModalDetailField
            label="Payment Method"
            value={request.payment_method}
          />
        </div>

        <div className="mt-5 flex flex-col items-start gap-4 rounded-xl border border-[#4866F6] bg-[#E4E8FE] p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#4866F6]">
              <img
                src={sparkleIcon}
                alt=""
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#3D3D3D]">
                {request.plan_name}
              </p>
              <p className="text-sm text-[#8D97A9]">
                {request.plan_description}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-left">
            <p className="font-semibold text-[#3D3D3D]">Amount</p>
            <p className="mt-0.5 text-sm text-[#8D97A9]">₹{request.amount}</p>
          </div>
        </div>

        <hr
          className="mt-5 border-0 border-t border-[#CFCFCF]"
          aria-hidden="true"
        />

        <p className="mt-5 text-sm md:text-sm">
          <span className="font-semibold text-[#3D3D3D]">Reason: </span>
          <span className="text-[#8D97A9]">{request.reason}</span>
        </p>

        <ModalActionButtons status={request.status} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ModalActionButtons — approve / reject / forward (style varies by request status)
// -----------------------------------------------------------------------------
function ModalActionButtons({ status }) {
  const isPending = status === "Pending";

  const approveClass = isPending
    ? "cursor-pointer rounded-full bg-[#4866F6] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#3d57e6]"
    : "cursor-pointer rounded-full bg-[#CFCFCF] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#b8b8b8]";

  const rejectClass = isPending
    ? "cursor-pointer rounded-full border border-[#FF0000] bg-white px-6 py-2.5 text-sm font-normal text-[#FF0000] transition-colors hover:bg-red-50"
    : "cursor-pointer rounded-full border border-[#CFCFCF] bg-white px-6 py-2.5 text-sm font-normal text-[#8D97A9] transition-colors hover:bg-slate-50";

  const forwardClass = isPending
    ? "cursor-pointer rounded-full bg-[#4866F6] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#3d57e6] md:shrink-0"
    : "cursor-pointer rounded-full bg-[#CFCFCF] px-6 py-2.5 text-sm font-normal text-white transition-colors hover:bg-[#b8b8b8] md:shrink-0";

  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-row items-center gap-3 md:w-auto">
        <button
          type="button"
          className={`${approveClass} w-full flex-1 md:w-auto md:flex-none`}
        >
          Approve Refund
        </button>
        <button
          type="button"
          className={`${rejectClass} w-full flex-1 md:w-auto md:flex-none`}
        >
          Reject Refund
        </button>
      </div>
      <button type="button" className={`${forwardClass} w-full md:w-auto`}>
        Forward
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ModalDetailField — label + value pair for modal info rows
// -----------------------------------------------------------------------------
function ModalDetailField({ label, value, className = "" }) {
  return (
    <p className={`whitespace-nowrap ${className}`.trim()}>
      <span className="font-semibold text-[#3D3D3D]">{label}: </span>
      <span className="text-[#8D97A9]">{value}</span>
    </p>
  );
}
