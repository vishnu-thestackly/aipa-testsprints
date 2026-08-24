import { useEffect, useRef, useState } from "react";
import {
  Search,
  Star,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import likesIcon from "../../../../../assets/images/likes.svg";
import dislikesDarkIcon from "../../../../../assets/images/dislikesDark.svg";

import { getExplicitFeedback } from "../../../../../api/authApi";

const PAGE_SIZE = 10;

// -----------------------------------------------------------------------------
// ExplicitFeedback — Tab 3 content
// -----------------------------------------------------------------------------
export default function ExplicitFeedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [feedbackRows, setFeedbackRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tableScrollRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Fetch explicit feedback
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchExplicitFeedback = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getExplicitFeedback(
          currentPage,
          PAGE_SIZE
        );

        console.log("Explicit Feedback:", response);

        setFeedbackRows(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error(
          "Explicit Feedback API Error:",
          error
        );

        setFeedbackRows([]);
        setError("Failed to load explicit feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchExplicitFeedback();
  }, [currentPage]);

  // ---------------------------------------------------------------------------
  // Search
  // -----------------------------------------------------------------------------
  const filteredRows = feedbackRows.filter((row) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (row.user_name || "")
      .toLowerCase()
      .startsWith(query);
  });

  // ---------------------------------------------------------------------------
  // API pagination
  // -----------------------------------------------------------------------------
  const hasNextPage = feedbackRows.length === PAGE_SIZE;
  const hasPreviousPage = currentPage > 1;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((page) => page + 1);
    }
  };

  return (
    <div className="mx-4 md:mx-5 lg:mx-7 mb-6 rounded-[20px] p-1 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
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

                <th className="w-[32%] px-4 py-4 font-medium">
                  Feedback
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-[#586D93]"
                  >
                    Loading feedback...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredRows.length > 0 ? (
                filteredRows.map((row, index) => (
                  <tr
                    key={`${row.user_name}-${row.date}-${index}`}
                    className="h-12 text-[#586D93]"
                  >
                    {/* SL No */}
                    <td className="whitespace-nowrap px-4 py-3">
                      {(currentPage - 1) * PAGE_SIZE + index + 1}
                    </td>

                    {/* User Name */}
                    <td className="truncate whitespace-nowrap px-4 py-3">
                      {row.user_name || "N/A"}
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatDate(row.date)}
                    </td>

                    {/* Likes / Dislikes */}
                    <td className="px-4 py-3 text-center">
                      {row.is_helpful ? (
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

                    {/* Rating */}
                    <td className="px-4 py-3 text-center">
                      <StarRating rating={row.rating} />
                    </td>

                    {/* Feedback */}
                    <td className="truncate px-4 py-3">
                      {row.feedback || "No feedback"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-[#586D93]"
                  >
                    {searchQuery
                      ? "No feedback found."
                      : "No feedback available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Pagination */}
        {/* ---------------------------------------------------------------- */}
        <div className="border-t border-slate-200 px-4 py-3">
          <div className="flex min-h-9 items-center justify-center sm:justify-end">
            <Pagination
              currentPage={currentPage}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
            />
          </div>

          {/* Horizontal scrollbar */}
          <div className="mt-3 min-h-1 lg:hidden">
            <HorizontalScrollIndicator
              scrollRef={tableScrollRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Format API date
// -----------------------------------------------------------------------------

function formatDate(date) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// -----------------------------------------------------------------------------
// StarRating
// -----------------------------------------------------------------------------

function StarRating({ rating }) {
  const safeRating = Math.max(
    0,
    Math.min(5, Number(rating) || 0)
  );

  return (
    <div
      className="inline-flex items-center justify-center gap-0.5"
      aria-label={`${safeRating} of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < safeRating;

        return (
          <Star
            key={index}
            size={18}
            className="text-[#F5A623]"
            fill={filled ? "#F5A623" : "none"}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------

function Pagination({
  currentPage,
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext,
}) {
  const navButtonClass =
    "inline-flex items-center gap-1 rounded px-2 py-1 transition-colors";

  return (
    <nav
      className="flex shrink-0 items-center justify-end gap-1 text-[15px] text-slate-600"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={!hasPreviousPage}
        onClick={onPrevious}
        className={`${navButtonClass} ${
          !hasPreviousPage
            ? "cursor-not-allowed text-slate-300"
            : "text-[#4866F6] hover:text-blue-800"
        }`}
      >
        <ChevronsLeft
          className="h-4 w-4"
          aria-hidden="true"
        />
        Previous
      </button>

      <button
        type="button"
        className="min-w-[2rem] rounded bg-[#4866F6] px-2 py-1 font-medium text-white"
      >
        {currentPage}
      </button>

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={onNext}
        className={`${navButtonClass} ${
          !hasNextPage
            ? "cursor-not-allowed text-slate-300"
            : "text-[#4866F6] hover:text-blue-800"
        }`}
      >
        Next
        <ChevronsRight
          className="h-4 w-4"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// HorizontalScrollIndicator
// -----------------------------------------------------------------------------

function HorizontalScrollIndicator({
  scrollRef,
  className = "",
}) {
  const [thumb, setThumb] = useState({
    width: 75,
    left: 0,
  });

  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = scrollRef?.current;

    if (!element) return;

    const update = () => {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = element;

      const overflow =
        scrollWidth > clientWidth + 1;

      setHasOverflow(overflow);

      if (!overflow) {
        setThumb({
          width: 100,
          left: 0,
        });
        return;
      }

      const widthPercent =
        (clientWidth / scrollWidth) * 100;

      const maxLeft = 100 - widthPercent;

      const leftPercent =
        maxLeft <= 0
          ? 0
          : (scrollLeft /
              (scrollWidth - clientWidth)) *
            maxLeft;

      setThumb({
        width: widthPercent,
        left: leftPercent,
      });
    };

    update();

    element.addEventListener(
      "scroll",
      update,
      { passive: true }
    );

    const resizeObserver =
      new ResizeObserver(update);

    resizeObserver.observe(element);

    return () => {
      element.removeEventListener(
        "scroll",
        update
      );

      resizeObserver.disconnect();
    };
  }, [scrollRef]);

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