// =============================================================================
// Behavior Learning — Tab 3: Explicit Feedback
// Self-contained: mock data, search, table, star rating, likes/dislikes icons,
// and pagination all live in this file.
// Columns: SL No | User Name | Date | Likes/Dislikes | Ratings | Feedback
// =============================================================================

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Star, ChevronsLeft, ChevronsRight } from "lucide-react";

import likesIcon from "../../../../../assets/images/likes.svg";
import dislikesDarkIcon from "../../../../../assets/images/dislikesDark.svg";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const PAGE_SIZE = 6;

const MOCK_FEEDBACK_TEXT =
  "Imi, id est laborum et Deserunt fuga Et mollitia an";

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
];

// Pattern of likes/dislikes + star ratings matching the design reference
const ROW_PATTERN = [
  { liked: true, rating: 5 },
  { liked: false, rating: 3 },
  { liked: true, rating: 1 },
  { liked: true, rating: 4 },
  { liked: false, rating: 2 },
  { liked: true, rating: 5 },
];

// -----------------------------------------------------------------------------
// MOCK DATA — 60 rows (10 pages × 6) pagination
// -----------------------------------------------------------------------------
const MOCK_FEEDBACK_LIST = Array.from({ length: 60 }, (_, index) => {
  const pattern = ROW_PATTERN[index % ROW_PATTERN.length];

  return {
    id: index + 1,
    userName: MOCK_USER_NAMES[index % MOCK_USER_NAMES.length],
    date: "20 Mar 2026",
    liked: pattern.liked,
    rating: pattern.rating,
    feedback: MOCK_FEEDBACK_TEXT,
  };
});

// -----------------------------------------------------------------------------
// ExplicitFeedback — Tab 3 content
// -----------------------------------------------------------------------------
export default function ExplicitFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tableScrollRef = useRef(null);

  // Filter by user name (starts-with, case-insensitive)
  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_FEEDBACK_LIST;

    return MOCK_FEEDBACK_LIST.filter((row) =>
      row.userName.toLowerCase().startsWith(query),
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredRows.slice(start, start + PAGE_SIZE);

  // Keep page in range when search shrinks the result set
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Header: title + search */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[18px] font-medium text-[#3D3D3D]">
          Explicit Feedback
        </h3>

        <div className="relative w-full sm:w-[260px] lg:w-[400px]">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-10 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
          <Search
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* ---------------------------------------------------------------- */}
      {/* Feedback table */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <div
          ref={tableScrollRef}
          className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <table className="w-full min-w-[900px] table-fixed text-sm">
            <thead>
              <tr className="bg-[#edf0fe] text-left text-[#3D3D3D]">
                <th className="w-[8%] whitespace-nowrap px-4 py-4 font-medium">
                  SL No
                </th>
                <th className="w-[16%] whitespace-nowrap px-4 py-4 font-medium">
                  User Name
                </th>
                <th className="w-[14%] whitespace-nowrap px-4 py-4 font-medium">
                  Date
                </th>
                <th className="w-[14%] whitespace-nowrap px-4 py-4 text-center font-medium">
                  Likes /Dislikes
                </th>
                <th className="w-[16%] whitespace-nowrap px-4 py-4 text-center font-medium">
                  Ratings
                </th>
                <th className="w-[32%] px-4 py-4 font-medium">Feedback</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {pageRows.length > 0 ? (
                pageRows.map((row, index) => (
                  <tr key={row.id} className="h-12 text-[#586D93]">
                    <td className="whitespace-nowrap px-4 py-3">
                      {start + index + 1}
                    </td>
                    <td className="truncate whitespace-nowrap px-4 py-3">
                      {row.userName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3 text-center">
                      {row.liked ? (
                        <img
                          src={likesIcon}
                          alt="Liked"
                          className="mx-auto h-[18px] w-[18px]"
                        />
                      ) : (
                        <img
                          src={dislikesDarkIcon}
                          alt="Disliked"
                          className="mx-auto h-[18px] w-[18px]"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StarRating rating={row.rating} />
                    </td>
                    <td className="truncate px-4 py-3">{row.feedback}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-[#586D93]"
                  >
                    No feedback found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer + horizontal slidebar */}
        <div className="border-t border-slate-200 px-4 py-3">
          <div className="flex min-h-9 items-center justify-center sm:justify-end">
            {totalPages > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
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

          {/* Custom horizontal slidebar — tablets & mobile only */}
          <div className="mt-3 min-h-1 lg:hidden">
            <HorizontalScrollIndicator scrollRef={tableScrollRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// StarRating — 5-star display (filled yellow / outlined yellow)
// -----------------------------------------------------------------------------
function StarRating({ rating }) {
  return (
    <div
      className="inline-flex items-center justify-center gap-0.5"
      aria-label={`${rating} of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            size={18}
            className={filled ? "text-[#F5A623]" : "text-[#F5A623]"}
            fill={filled ? "#F5A623" : "none"}
            strokeWidth={1.5}
          />
        );
      })}
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
// Pagination — Previous / page numbers / Next (matches admin table style)
// -----------------------------------------------------------------------------
function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = getPaginationItems(currentPage, totalPages);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const navButtonClass =
    "inline-flex items-center gap-1 rounded px-2 py-1 transition-colors";
  const navButtonEnabled = "text-[#4866F6] hover:text-blue-800";
  const navButtonDisabled = "cursor-not-allowed text-slate-300";

  return (
    <nav
      className="flex shrink-0 items-center justify-end gap-1 text-[15px] text-slate-600"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${navButtonClass} ${isFirstPage ? navButtonDisabled : navButtonEnabled}`}
      >
        <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="select-none px-1 text-slate-600"
            aria-hidden="true"
          >
            ....
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`min-w-[2rem] rounded px-2 py-1 transition-colors focus:outline-none ${
              item === currentPage
                ? "bg-[#4866F6] font-medium text-white"
                : "hover:text-[#4866F6]"
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
        <ChevronsRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// HorizontalScrollIndicator — custom slidebar for wide table (below pagination)
// Grey track + blue thumb that tracks horizontal scroll position.
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

  // Always show the slidebar to match the design; full-width thumb when no overflow
  return (
    <div
      className={`relative h-1 w-full rounded-full bg-[#E0E0E0] ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4866F6] transition-[left,width] duration-150 ease-out"
        style={{
          width: `${hasOverflow ? thumb.width : 75}%`,
          left: `${thumb.left}%`,
        }}
      />
    </div>
  );
}
