// =============================================================================
// Semantic Memory — Memory Collection table
// Columns: SL No | Collection Name | Vectors | Status | Action
// =============================================================================

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ChevronsLeft, ChevronsRight } from "lucide-react";

import eyeActionIcon from "../../../../../assets/images/eye_action.svg";
import { getQdrantDashboard } from "../../../../../api/authApi";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const PAGE_SIZE = 6;

// -----------------------------------------------------------------------------
// Collection — Memory Collection list (Qdrant Collection Management)
// -----------------------------------------------------------------------------
export default function Collection({ onViewCollection }) {
  const [collections, setCollections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const tableScrollRef = useRef(null);

  // ---------------------------------------------------------------------------
  // Fetch Qdrant collections
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchQdrantDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getQdrantDashboard();

        console.log("Qdrant Dashboard Response:", response);

        if (response?.success) {
          const formattedCollections = response.data.map((item) => ({
            id: item.collection_id,
            name: item.collection_name,
            vectors: item.current_vector_count,
            status: item.status,
          }));

          setCollections(formattedCollections);
        } else {
          setCollections([]);
          setError("Failed to load memory collections.");
        }
      } catch (error) {
        console.error("Qdrant Dashboard API Error:", error);
        setError("Failed to load memory collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchQdrantDashboard();
  }, []);

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------
  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return collections;

    return collections.filter((row) =>
      row.name.toLowerCase().includes(query),
    );
  }, [collections, searchQuery]);

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filteredRows.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // ---------------------------------------------------------------------------
  // Search handler
  // ---------------------------------------------------------------------------
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-4 mb-6 rounded-[20px] p-1 md:mx-5 md:border md:border-[#E2E2E2] md:p-5 md:shadow-sm lg:mx-7">
      {/* Header: title + search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[18px] font-medium text-[#3D3D3D]">
          Memory Collection
        </h3>

        <div className="relative w-full sm:w-[260px] lg:w-[400px]">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Collection Name"
            className="w-full rounded-lg border border-[#CFCFCF] bg-white py-2.5 pl-3 pr-10 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />

          <Search
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-4 border-b border-[#CFCFCF]" />

      {/* Collection table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
        <div
          ref={tableScrollRef}
          className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <table className="w-full min-w-[700px] table-fixed text-sm">
            <thead>
              <tr className="bg-[#edf0fe] text-left text-[#3D3D3D]">
                <th className="w-[10%] whitespace-nowrap px-4 py-4 font-medium">
                  SL No
                </th>

                <th className="w-[28%] whitespace-nowrap px-4 py-4 font-medium">
                  Collection Name
                </th>

                <th className="w-[22%] whitespace-nowrap px-4 py-4 font-medium">
                  Vectors
                </th>

                <th className="w-[22%] whitespace-nowrap px-4 py-4 font-medium">
                  Status
                </th>

                <th className="w-[18%] whitespace-nowrap px-4 py-4 text-center font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-[#586D93]"
                  >
                    Loading collections...
                  </td>
                </tr>
              ) : error ? (
                /* Error */
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : pageRows.length > 0 ? (
                /* Collection rows */
                pageRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className="h-12 text-[#586D93]"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      {start + index + 1}
                    </td>

                    <td className="truncate whitespace-nowrap px-4 py-3">
                      {row.name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {row.vectors}
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex w-[95px] items-center justify-start gap-2 rounded-full bg-[#33B46926] py-1.5 pl-4 pr-3 text-sm font-normal text-[#33B469]">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-[#33B469]"
                          aria-hidden="true"
                        />

                        <span className="leading-none">
                          {row.status}
                        </span>
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => onViewCollection?.(row)}
                        className="inline-flex cursor-pointer items-center justify-center"
                        title="View Details"
                      >
                        <img
                          src={eyeActionIcon}
                          alt="View"
                          className="h-6 w-6"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty */
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-[#586D93]"
                  >
                    No collections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer + horizontal scrollbar */}
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
                <span className="min-w-8 rounded px-2 py-1">
                  1
                </span>
                <span className="px-2 py-1">Next</span>
              </nav>
            )}
          </div>

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
// getPaginationItems — page numbers with ellipsis for long page ranges
// -----------------------------------------------------------------------------
function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    );
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
    if (
      i > 0 &&
      sorted[i] - sorted[i - 1] > 1
    ) {
      items.push("ellipsis");
    }

    items.push(sorted[i]);
  }

  return items;
}

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const items = getPaginationItems(
    currentPage,
    totalPages,
  );

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const navButtonClass =
    "inline-flex items-center gap-1 rounded px-2 py-1 transition-colors";

  const navButtonEnabled =
    "text-[#4866F6] hover:text-blue-800";

  const navButtonDisabled =
    "cursor-not-allowed text-slate-300";

  return (
    <nav
      className="flex shrink-0 items-center justify-end gap-1 text-[15px] text-slate-600"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className={`${navButtonClass} ${
          isFirstPage
            ? navButtonDisabled
            : navButtonEnabled
        }`}
      >
        <ChevronsLeft
          className="h-4 w-4"
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
            ....
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={
              item === currentPage
                ? "page"
                : undefined
            }
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
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className={`${navButtonClass} ${
          isLastPage
            ? navButtonDisabled
            : navButtonEnabled
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
// Horizontal Scroll Indicator
// -----------------------------------------------------------------------------
function HorizontalScrollIndicator({
  scrollRef,
  className = "",
}) {
  const [thumb, setThumb] = useState({
    width: 75,
    left: 0,
  });

  const [hasOverflow, setHasOverflow] =
    useState(false);

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
      { passive: true },
    );

    const resizeObserver =
      new ResizeObserver(update);

    resizeObserver.observe(element);

    return () => {
      element.removeEventListener(
        "scroll",
        update,
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
          width: `${
            hasOverflow
              ? thumb.width
              : 75
          }%`,
          left: `${thumb.left}%`,
        }}
      />
    </div>
  );
}