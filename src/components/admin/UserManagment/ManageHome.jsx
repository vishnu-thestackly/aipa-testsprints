// // =============================================================================
// // FILE: ManageHome.jsx
// // Manage users home — subscriptions KPIs and users management
// // =============================================================================

// // -----------------------------------------------------------------------------
// // IMPORTS
// // -----------------------------------------------------------------------------
// import { useEffect, useRef, useState } from "react";

// import { getUserStats, getUsers, exportUsers } from "../../../api/authApi";

// import {
//   ChevronDown,
//   ChevronsLeft,
//   ChevronsRight,
//   IndianRupee,
//   Search,
// } from "lucide-react";
// import exportIcon from "../../../assets/images/export_icon.svg";
// import eyeActionIcon from "../../../assets/images/eye_action.svg";


// // -----------------------------------------------------------------------------
// // CONSTANTS
// // -----------------------------------------------------------------------------
// const monthOptions = [
//   { value: "all", label: "Months" },
//   { value: "jan", label: "January" },
//   { value: "feb", label: "February" },
//   { value: "mar", label: "March" },
// ];

// const yearOptions = [
//   { value: "all", label: "Years" },
//   { value: "2024", label: "2024" },
//   { value: "2025", label: "2025" },
//   { value: "2026", label: "2026" },
// ];

// const statusOptions = [
//   { value: "all", label: "Status Filter" },
//   { value: "active", label: "Active" },
//   { value: "idle", label: "Idle" },
//   { value: "inactive", label: "Inactive" },
// ];

// const subscriptionOptions = [
//   { value: "all", label: "Subscription Filter" },
//   { value: "free", label: "Free" },
//   { value: "basic", label: "Basic" },
//   { value: "premium", label: "Premium" },
// ];


// const PAGE_SIZE = 6;

// // -----------------------------------------------------------------------------
// // ManageHome — manage users home (list + KPIs)
// // -----------------------------------------------------------------------------


// export default function ManageHome({ onViewUser }) {

//   const [stats, setStats] = useState(null);
//   const [usersList, setUsersList] = useState([]);

// useEffect(() => {
//   const loadData = async () => {
//     try {
//       const statsResponse = await getUserStats();
//       const usersResponse = await getUsers();

//       setStats(statsResponse);
//       setUsersList(usersResponse);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   loadData();
// }, []);

// // Export btn function with api call

// const handleExportUsers = async () => {
//   try {
//     const fileBlob = await exportUsers();

//     const url = window.URL.createObjectURL(fileBlob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "users.csv";

//     document.body.appendChild(link);
//     link.click();

//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Export failed:", error);
//   }
// };
  
//   return (
//     <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
//       <div className="w-full min-h-full flex flex-col gap-4 rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:gap-5 md:p-5 lg:gap-6 lg:p-6">
//         <SubscriptionsSection stats={stats} onExport={handleExportUsers}/>
//         <UsersSection users={usersList} onViewUser={onViewUser} onExport={handleExportUsers} />
//       </div>
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // SubscriptionsSection — KPI filters and summary cards
// // -----------------------------------------------------------------------------
// function SubscriptionsSection({ stats, onExport }) {
//   return (
//     <section className="shrink-0 rounded-2xl border border-slate-100 p-4 pt-2 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 lg:p-5">
//       <div className="mb-0 flex w-full flex-col gap-3 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-3 lg:gap-1">
//         <h2 className="shrink-0 text-lg font-semibold text-slate-800  min-[1024px]:max-[1073px]:w-min">
//           Subscriptions KPI&apos;s
//         </h2>
//         <div className="flex flex-col mt-1 md:mt-0 md:flex-row md:flex-nowrap md:items-center gap-3 md:ml-auto md:gap-2 lg:gap-2">
//           <SelectField
//             label="Months"
//             options={monthOptions}
//             className="w-full md:w-auto"
//           />
//           <SelectField
//             label="Years"
//             options={yearOptions}
//             className="w-full md:w-auto"
//           />
//           <ExportButton className="w-full md:w-auto" onClick={onExport} />
//         </div>
//       </div>
//       <SectionDivider />
//       <KpiGrid items={[
//     {
//       id: 1,
//       value: `${stats?.free_percent || 0}%`,
//       label: "Free Users",
//     },
//     {
//       id: 2,
//       value: `${stats?.basic_percent || 0}%`,
//       label: "Basic Plan Users",
//     },
//     {
//       id: 3,
//       value: `${stats?.premium_percent || 0}%`,
//       label: "Premium Plan Users",
//     },
//   ]} />
//     </section>
//   );
// }

// // -----------------------------------------------------------------------------
// // KpiGrid — responsive grid of KPI cards
// // -----------------------------------------------------------------------------
// function KpiGrid({ items }) {
//   return (
//     <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
//       {items.map((item) => (
//         <KpiCard key={item.id} value={item.value} label={item.label} />
//       ))}
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // KpiCard — single KPI value and label
// // -----------------------------------------------------------------------------
// function KpiCard({ value, label }) {
//   return (
//     <div className="flex w-full min-w-0 items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)]">
//       <KpiRupeeIcon />
//       <div>
//         <p className="text-xl font-bold text-slate-800">{value}</p>
//         <p className="text-base text-slate-500">{label}</p>
//       </div>
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // KpiRupeeIcon — rupee icon badge for KPI cards
// // -----------------------------------------------------------------------------
// function KpiRupeeIcon() {
//   return (
//     <div
//       className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E4E8FE]"
//       aria-hidden="true"
//     >
//       <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#4866F6]">
//         <IndianRupee className="h-5 w-5 text-[#E4E8FE]" strokeWidth={2.5} />
//       </div>
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // UsersSection — manage users toolbar, table, and pagination
// // -----------------------------------------------------------------------------
// function UsersSection({ users, onViewUser, onExport }) {
//   return (
//     <section className="flex min-h-0 min-w-0 flex-col max-md:flex-none max-md:shrink-0 md:min-h-0 md:flex-1 md:overflow-visible">
//       <h2 className="mb-3 shrink-0 text-lg font-semibold text-slate-800">
//         Manage Users &amp; Roles
//       </h2>
//       <UsersToolbar onExport={onExport}/>
//       <SectionDivider />
//       <UsersTableBlock users={users} onViewUser={onViewUser} />
//     </section>
//   );
// }

// // -----------------------------------------------------------------------------
// // UsersToolbar — search, filters, and export actions
// // -----------------------------------------------------------------------------
// function UsersToolbar({ onExport }) {
//   return (
//     <div className="mb-0 flex w-full shrink-0 flex-col gap-2 md:flex-row md:flex-nowrap md:items-center md:gap-2 lg:flex lg:flex-wrap lg:items-center lg:gap-2">
//       <SearchInput className="min-w-0 w-full md:min-w-[140px] md:flex-1 lg:order-1 lg:flex-1" />
//       <div className="flex flex-col md:shrink-0 md:flex-nowrap md:flex-row md:items-center gap-3 md:gap-2 lg:order-2 lg:flex lg:flex-wrap lg:gap-2">
//         <SelectField
//           compact
//           label="Status Filter"
//           options={statusOptions}
//           className="w-full md:w-auto"
//         />
//         <SelectField
//           compact
//           label="Subscription Filter"
//           options={subscriptionOptions}
//           className="w-full md:w-auto"
//         />
//       </div>
//       <ExportButton onClick={onExport} className="w-full md:w-auto shrink-0 justify-center md:inline-flex lg:order-3" />
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // SearchInput — search field with icon
// // -----------------------------------------------------------------------------
// function SearchInput({
//   value,
//   onChange,
//   placeholder = "Search by Name/ Email",
//   className = "",
// }) {
//   return (
//     <div className={`relative min-w-[200px] flex-1 ${className}`.trim()}>
//       <input
//         type="search"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full rounded-lg border border-[#CFCFCF] bg-white py-1.5 lg:py-2.5 pl-3 pr-10 lg:text-base md:text-xs md:py-2.5 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//       />
//       <Search
//         className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
//         aria-hidden="true"
//       />
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // UsersTableBlock — scrollable users table with pagination footer
// // -----------------------------------------------------------------------------
// function UsersTableBlock({
//   users = [],
//   onViewUser,
// }) {
//   const tableScrollRef = useRef(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(users.length / PAGE_SIZE) || 1;
//   const start = (currentPage - 1) * PAGE_SIZE;
//   const pageUsers = users.slice(start, start + PAGE_SIZE);

//   return (
//     <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 max-md:flex-none max-md:h-auto max-md:overflow-visible md:min-h-0 md:flex-1">
//       <div
//         ref={tableScrollRef}
//         className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-md:flex-none max-md:overflow-y-visible md:h-[220px] md:overflow-y-auto max-lg:touch-pan-x lg:overflow-x-visible lg:overflow-y-auto"
//       >
//         <table className="w-full text-sm max-lg:min-w-[720px] lg:min-w-0">
//           <thead className="sticky top-0 z-10">
//             <tr className="bg-blue-50 text-left text-slate-700">
//               <th className="whitespace-nowrap px-3 py-4 font-semibold md:min-w-[4.5rem] md:px-3 lg:px-4">
//                 SL No
//               </th>
//               <th className="whitespace-nowrap px-4 py-4 font-semibold md:min-w-[11rem]">
//                 User Name
//               </th>
//               <th className="whitespace-nowrap px-4 py-4 font-semibold">
//                 Email ID
//               </th>
//               <th className="px-4 py-4 font-semibold">Status</th>
//               <th className="px-4 py-4 font-semibold">Subscription</th>
//               <th className="px-4 py-4 font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-200 bg-white">
//             {pageUsers.map((user, index) => (
//               <tr key={user.id} className="text-slate-800">
//                 <td className="whitespace-nowrap px-3 py-2.5 text-[#586D93] md:px-3 lg:px-4">
//                   {start + index + 1}
//                 </td>
//                 <td className="whitespace-nowrap px-4 py-2.5 font-medium text-[#586D93]">
//                   {user.name}
//                 </td>
//                 <td className="whitespace-nowrap px-4 py-2.5 text-[#586D93]">
//                   {user.email}
//                 </td>
//                 <td className="px-4 py-2.5 align-middle">
//                   <div className="flex justify-start">
//                     <StatusBadge status={user.status} />
//                   </div>
//                 </td>
//                 <td className="px-4 py-2.5">
//                   <SubscriptionBadge subscription={user.plan_name} />
//                 </td>
//                 <td className="px-4 py-2.5">
//                   <button
//                     type="button"
//                     onClick={() =>   onViewUser?.(user.id)}
//                     aria-label={`View ${user.name}`}
//                     className="inline-flex h-6 w-6 items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
//                   >
//                     <img
//                       src={eyeActionIcon}
//                       alt="Eye_Icon"
//                       className="h-6 w-6"
//                       aria-hidden="true"
//                     />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="shrink-0 border-t border-slate-200 px-4 py-3">
//         {totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <HorizontalScrollIndicator
//           scrollRef={tableScrollRef}
//           className="mt-3 block lg:hidden"
//         />
//       </div>
//     </div>
//   );
// }



// // getPaginationItems — page numbers with ellipsis for long page ranges
// // -----------------------------------------------------------------------------
// function getPaginationItems(currentPage, totalPages) {
//   if (totalPages <= 4) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   const pages = new Set();

//   if (currentPage <= 2) {
//     pages.add(1);
//     pages.add(2);
//     pages.add(3);
//     pages.add(totalPages);
//   } else if (currentPage >= totalPages - 2) {
//     pages.add(1);
//     pages.add(totalPages - 2);
//     pages.add(totalPages - 1);
//     pages.add(totalPages);
//   } else {
//     pages.add(currentPage - 1);
//     pages.add(currentPage);
//     pages.add(currentPage + 1);
//     pages.add(totalPages);
//   }

//   const sorted = [...pages].sort((a, b) => a - b);
//   const items = [];

//   for (let i = 0; i < sorted.length; i++) {
//     if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
//       items.push("ellipsis");
//     }
//     items.push(sorted[i]);
//   }
//    return items;
// }


// // Pagination — page numbers and previous/next controls
// // -----------------------------------------------------------------------------
// function Pagination({ currentPage, totalPages, onPageChange }) {
//   const items = getPaginationItems(currentPage, totalPages);
//   const isFirstPage = currentPage <= 1;
//   const isLastPage = currentPage >= totalPages;

//   const navButtonClass =
//     "inline-flex items-center gap-1 rounded px-2 py-1 transition-colors max-[424px]:gap-0.5 max-[424px]:px-1.5 max-[424px]:py-0.5";
//   const navButtonEnabled = "text-[#4866F6] hover:text-blue-800";
//   const navButtonDisabled = "cursor-not-allowed text-slate-300";

//   return (
//     <nav
//       className="flex shrink-0 items-center justify-center sm:flex sm:items-center sm:justify-end gap-1 text-[15px] text-slate-600 max-[424px]:gap-0.5 max-[424px]:text-sm"
//       aria-label="Pagination"
//     >
//       <button
//         type="button"
//         disabled={isFirstPage}
//         onClick={() => onPageChange(currentPage - 1)}
//         className={`${navButtonClass} ${isFirstPage ? navButtonDisabled : navButtonEnabled}`}
//       >
//         <ChevronsLeft
//           className="h-4 w-4 max-[424px]:h-3 max-[424px]:w-3"
//           aria-hidden="true"
//         />
//         Previous
//       </button>
//       {items.map((item, index) =>
//         item === "ellipsis" ? (
//           <span
//             key={`ellipsis-${index}`}
//             className="select-none px-1 text-slate-600"
//             aria-hidden="true"
//           >
//             ...
//           </span>
//         ) : (
//           <button
//             key={item}
//             type="button"
//             onClick={() => onPageChange(item)}
//             aria-current={item === currentPage ? "page" : undefined}
//             className={`min-w-[2rem] rounded px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 max-[424px]:min-w-[1.5rem] max-[424px]:px-1.5 max-[424px]:py-0.5 ${
//               item === currentPage
//                 ? "bg-blue-600 font-medium text-white"
//                 : "hover:text-blue-600"
//             }`}
//           >
//             {item}
//           </button>
//         ),
//       )}
//       <button
//         type="button"
//         disabled={isLastPage}
//         onClick={() => onPageChange(currentPage + 1)}
//         className={`${navButtonClass} ${isLastPage ? navButtonDisabled : navButtonEnabled}`}
//       >
//         Next
//         <ChevronsRight
//           className="h-4 w-4 max-[424px]:h-3 max-[424px]:w-3"
//           aria-hidden="true"
//         />
//       </button>
//     </nav>
//   );
// }
// // -----------------------------------------------------------------------------
// // HorizontalScrollIndicator — custom scrollbar for wide table on mobile
// // -----------------------------------------------------------------------------
// function HorizontalScrollIndicator({ scrollRef, className = "" }) {
//   const [thumb, setThumb] = useState({ width: 75, left: 0 });
//   const [hasOverflow, setHasOverflow] = useState(false);

//   useEffect(() => {
//     const element = scrollRef?.current;
//     if (!element) return;

//     const update = () => {
//       const { scrollLeft, scrollWidth, clientWidth } = element;
//       const overflow = scrollWidth > clientWidth + 1;
//       setHasOverflow(overflow);

//       if (!overflow) {
//         setThumb({ width: 100, left: 0 });
//         return;
//       }

//       const widthPercent = (clientWidth / scrollWidth) * 100;
//       const maxLeft = 100 - widthPercent;
//       const leftPercent =
//         maxLeft <= 0 ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxLeft;

//       setThumb({ width: widthPercent, left: leftPercent });
//     };

//     update();
//     element.addEventListener("scroll", update, { passive: true });
//     const resizeObserver = new ResizeObserver(update);
//     resizeObserver.observe(element);

//     return () => {
//       element.removeEventListener("scroll", update);
//       resizeObserver.disconnect();
//     };
//   }, [scrollRef]);

//   if (!hasOverflow) return null;

//   return (
//     <div
//       className={`relative h-1 w-full rounded-full bg-[#E0E0E0] ${className}`.trim()}
//       aria-hidden="true"
//     >
//       <div
//         className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#4866F6] transition-[left,width] duration-150 ease-out"
//         style={{
//           width: `${thumb.width}%`,
//           left: `${thumb.left}%`,
//         }}
//       />
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // StatusBadge — active, idle, or inactive status pill
// // -----------------------------------------------------------------------------
// function StatusBadge({ status }) {
//   const statusStyles = {
//     Active: "bg-[#33B46926] text-[#33B469]",
//     Idle: "bg-[#FDF5E6] text-[#F59E0B]",
//     Inactive: "bg-[#FF000033] text-[#FF0000]",
//   };
//   const dotStyles = {
//     Active: "bg-[#33B469]",
//     Idle: "bg-[#F59E0B]",
//     Inactive: "bg-[#FF0000]",
//   };

//   return (
//     <span
//       className={`inline-flex w-[90px] items-center justify-start gap-2 rounded-full py-1.5 pl-3 pr-3 text-sm font-medium ${statusStyles[status] ?? "bg-slate-100 text-slate-700"}`}
//     >
//       <span
//         className={`h-2 w-2 shrink-0 rounded-full ${dotStyles[status] ?? "bg-slate-500"}`}
//         aria-hidden="true"
//       />
//       <span className="leading-none">{status}</span>
//     </span>
//   );
// }

// // -----------------------------------------------------------------------------
// // SubscriptionBadge — subscription tier pill
// // -----------------------------------------------------------------------------
// function SubscriptionBadge({ subscription }) {
//   return (
//     <span className="inline-flex w-[93px] items-center justify-center rounded-lg bg-[#4866F61A] px-3 py-1 text-sm font-medium text-[#4866F6]">
//       {subscription}
//     </span>
//   );
// }

// // -----------------------------------------------------------------------------
// // SelectField — labeled dropdown with chevron
// // -----------------------------------------------------------------------------
// function SelectField({
//   label,
//   options = [],
//   value,
//   onChange,
//   className = "",
//   compact = false,
// }) {
//   const selectPadding = compact
//     ? "pr-8 md:pr-7 xl:pr-35"
//     : "pr-10 md:pr-15 xl:pr-35";
//   const chevronPosition = compact ? "right-2" : "right-2.5";

//   return (
//     <div className={`relative ${className}`}>
//       <select
//         value={value}
//         onChange={onChange}
//         aria-label={label}
//         className={`w-full md:w-auto appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 md:py-2.5 md:text-xs lg:text-base text-[#8D97A9] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${selectPadding}`}
//       >
//         {options.map((option) => (
//           <option key={option.value ?? option} value={option.value ?? option}>
//             {option.label ?? option}
//           </option>
//         ))}
//       </select>
//       <ChevronDown
//         className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${chevronPosition}`}
//         aria-hidden="true"
//       />
//     </div>
//   );
// }

// // -----------------------------------------------------------------------------
// // ExportButton — export action button with icon
// // -----------------------------------------------------------------------------
// function ExportButton({ onClick, className = "" }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex w-full justify-center md:inline-flex md:w-auto shrink-0 items-center cursor-pointer gap-2 rounded-lg bg-[#4866F6] px-7 py-2 text-base text-white transition-colors hover:bg-[#4851f6] md:gap-1.5 md:px-3 md:py-2.5 md:pr-4 md:text-xs lg:px-5 lg:py-2.5 lg:text-base ${className}`.trim()}
//     >
//       Export
//       <img
//         src={exportIcon}
//         alt=""
//         className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
//         aria-hidden="true"
//       />
//     </button>
//   );
// }

// // -----------------------------------------------------------------------------
// // SectionDivider — horizontal rule between sections
// // -----------------------------------------------------------------------------
// function SectionDivider() {
//   return (
//     <hr
//       className="my-4 mt-3 border-0 border-t border-[#CFCFCF]"
//       aria-hidden="true"
//     />
//   );
// }





// Added 



// =============================================================================
// FILE: ManageHome.jsx
// Manage users home — subscriptions KPIs and users management
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
  IndianRupee,
  Search,
} from "lucide-react";
import exportIcon from "../../../assets/images/export_icon.svg";
import eyeActionIcon from "../../../assets/images/eye_action.svg";
import { getUserStats, getUsers, exportUsers } from "../../../api/authApi";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const MONTH_PLACEHOLDER = "Months";

const monthList = [
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" },
];

const YEAR_PLACEHOLDER = "Years";

const yearList = [
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
  { value: "2031", label: "2031" },
  { value: "2032", label: "2032" },
  { value: "2033", label: "2033" },
  { value: "2034", label: "2034" },
  { value: "2035", label: "2035" },
  { value: "2036", label: "2036" },
];

const STATUS_FILTER_PLACEHOLDER = "Status Filter";

const statusFilterOptions = [
  { value: "active", label: "Active" },
  { value: "idle", label: "Idle" },
  { value: "inactive", label: "Inactive" },
];

const SUBSCRIPTION_FILTER_PLACEHOLDER = "Subscription Filter";

const subscriptionFilterOptions = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
];

const COMPACT_SELECT_PADDING = "pr-8 md:pr-7 xl:pr-25";
const COMPACT_SELECT_TRIGGER_CLASS = `w-full md:w-auto cursor-pointer appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 md:py-2.5 md:text-sm lg:text-base text-left text-[#8D97A9] focus:outline-none focus:ring-0 ${COMPACT_SELECT_PADDING}`;
const COMPACT_SELECT_CHEVRON_CLASS =
  "pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-slate-400";

const PAGE_SIZE = 6;

// -----------------------------------------------------------------------------
// ManageHome — manage users home (list + KPIs)
// -----------------------------------------------------------------------------
export default function ManageHome({ onViewUser, currentPage, onPageChange }) {
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsResponse = await getUserStats();
        const usersResponse = await getUsers();

        setStats(statsResponse);
        setUsersList(usersResponse);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  // Export btn function with api call

  const handleExportUsers = async () => {
    try {
      const fileBlob = await exportUsers();

      const url = window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "users.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-3 sm:px-5 lg:px-7 pt-4 lg:pt-7 pb-5 scrollbar-hide">
      <div className="w-full min-h-full flex flex-col gap-4 rounded-[20px] md:rounded-[25px] border-b border-gray-200 bg-white p-4 shadow-[0px_1px_4px_0px_#00000040] md:gap-5 md:p-5 lg:gap-6 lg:p-6">
        <SubscriptionsSection stats={stats} onExport={handleExportUsers} />
        <UsersSection
          users={usersList}
          onViewUser={onViewUser}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onExport={handleExportUsers}
        />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SubscriptionsSection — KPI filters and summary cards
// -----------------------------------------------------------------------------
function SubscriptionsSection({ stats, onExport }) {
  return (
    <section className="shrink-0 rounded-2xl border border-slate-100 p-4 pt-2 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)] md:p-5 lg:p-5">
      <div className="mb-0 flex w-full flex-col gap-3 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-3 lg:gap-1">
        <h2 className="shrink-0 text-lg font-semibold text-slate-800  min-[1024px]:max-[1073px]:w-min">
          Subscriptions KPI&apos;s
        </h2>
        <div className="flex flex-col mt-1 md:mt-0 md:flex-row md:flex-nowrap md:items-center gap-3 md:ml-auto md:gap-2 lg:gap-2">
          <FilterSelectField
            placeholder={MONTH_PLACEHOLDER}
            options={monthList}
            ariaLabel="Months"
            className="w-full md:w-auto"
          />
          <FilterSelectField
            placeholder={YEAR_PLACEHOLDER}
            options={yearList}
            ariaLabel="Years"
            className="w-full md:w-auto"
          />
          <ExportButton className="w-full md:w-auto" onClick={onExport} />
        </div>
      </div>
      <SectionDivider />
      <KpiGrid
        items={[
          {
            id: 1,
            value: `${stats?.free_percent ?? 0}%`,
            label: "Free Users",
          },
          {
            id: 2,
            value: `${stats?.basic_percent ?? 0}%`,
            label: "Basic Plan Users",
          },
          {
            id: 3,
            value: `${stats?.premium_percent ?? 0}%`,
            label: "Premium Plan Users",
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
        <KpiCard key={item.id} value={item.value} label={item.label} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiCard — single KPI value and label
// -----------------------------------------------------------------------------
function KpiCard({ value, label }) {
  return (
    <div className="flex w-full min-w-0 items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_0_2px_0px_rgba(61,61,61,0.15)]">
      <KpiRupeeIcon />
      <div>
        <p className="text-xl font-bold text-slate-800">{value}</p>
        <p className="text-base text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// KpiRupeeIcon — rupee icon badge for KPI cards
// -----------------------------------------------------------------------------
function KpiRupeeIcon() {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E4E8FE]"
      aria-hidden="true"
    >
      <div className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-[#4866F6]">
        <IndianRupee className="h-5 w-5 text-[#E4E8FE]" strokeWidth={2.5} />
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// UsersSection — manage users toolbar, table, and pagination
// -----------------------------------------------------------------------------
function UsersSection({
  users = [],
  onViewUser,
  currentPage,
  onPageChange,
  onExport,
}) {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
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

  const toggleSubscription = (value) => {
    setSelectedSubscriptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
    onPageChange(1);
  };

  const filteredUsers = users.filter((user) => {
    const statusKey = (user.status ?? "").toLowerCase();
    const subscriptionKey = (user.plan_name ?? "").toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      const matchesName = (user.name ?? "").toLowerCase().includes(query);
      const matchesEmail = (user.email ?? "").toLowerCase().includes(query);
      if (!matchesName && !matchesEmail) {
        return false;
      }
    }

    if (selectedStatuses.length > 0 && !selectedStatuses.includes(statusKey)) {
      return false;
    }

    if (
      selectedSubscriptions.length > 0 &&
      !selectedSubscriptions.includes(subscriptionKey)
    ) {
      return false;
    }

    return true;
  });

  return (
    <section className="flex min-h-0 min-w-0 flex-col max-md:flex-none max-md:shrink-0 md:min-h-0 md:flex-1 md:overflow-visible">
      <h2 className="mb-3 shrink-0 text-lg font-semibold text-slate-800">
        Manage Users &amp; Roles
      </h2>
      <UsersToolbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedStatuses={selectedStatuses}
        onToggleStatus={toggleStatus}
        selectedSubscriptions={selectedSubscriptions}
        onToggleSubscription={toggleSubscription}
        onExport={onExport}
      />
      <SectionDivider />
      <UsersTableBlock
        users={filteredUsers}
        onViewUser={onViewUser}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}

// -----------------------------------------------------------------------------
// UsersToolbar — search, filters, and export actions
// -----------------------------------------------------------------------------
function UsersToolbar({
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onToggleStatus,
  selectedSubscriptions,
  onToggleSubscription,
  onExport,
}) {
  return (
    <div className="mb-0 flex w-full shrink-0 flex-col gap-2 md:flex-row md:flex-nowrap md:items-center md:gap-2 lg:flex lg:flex-wrap lg:items-center lg:gap-2">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        className="min-w-0 w-full md:min-w-[140px] md:flex-1 lg:order-1 lg:flex-1"
      />
      <div className="flex flex-col md:shrink-0 md:flex-nowrap md:flex-row md:items-center gap-3 md:gap-2 lg:order-2 lg:flex lg:flex-wrap lg:gap-2">
        <CheckboxFilterField
          placeholder={STATUS_FILTER_PLACEHOLDER}
          options={statusFilterOptions}
          ariaLabel="Status Filter"
          selected={selectedStatuses}
          onToggle={onToggleStatus}
          className="w-full md:w-auto"
        />
        <CheckboxFilterField
          placeholder={SUBSCRIPTION_FILTER_PLACEHOLDER}
          options={subscriptionFilterOptions}
          ariaLabel="Subscription Filter"
          selected={selectedSubscriptions}
          onToggle={onToggleSubscription}
          className="w-full md:w-auto"
        />
      </div>
      <ExportButton
        onClick={onExport}
        className="w-full md:w-auto shrink-0 justify-center md:inline-flex lg:order-3"
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// SearchInput — search field with icon
// -----------------------------------------------------------------------------
function SearchInput({
  value,
  onChange,
  placeholder = "Search by Name/ Email",
  className = "",
}) {
  return (
    <div className={`relative min-w-[200px] flex-1 ${className}`.trim()}>
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
// UsersTableBlock — scrollable users table with pagination footer
// -----------------------------------------------------------------------------
function UsersTableBlock({ users, onViewUser, currentPage, onPageChange }) {
  const tableScrollRef = useRef(null);

  const totalPages = Math.ceil(users.length / PAGE_SIZE) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageUsers = users.slice(start, start + PAGE_SIZE);
  const tableSlots = Array.from({ length: PAGE_SIZE }, (_, index) => ({
    user: pageUsers[index] ?? null,
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
        className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-md:flex-none max-md:overflow-y-visible md:h-[220px] md:overflow-y-scroll max-lg:touch-auto lg:overflow-x-visible lg:overflow-y-scroll"
      >
        <table className="w-full table-fixed text-sm max-lg:min-w-[720px] lg:min-w-0">
          <thead className="sticky top-0 z-10">
            <tr className="bg-blue-50 text-left text-slate-700">
              <th className="w-[8%] whitespace-nowrap px-3 py-4 font-semibold md:px-3 lg:px-4">
                SL No
              </th>
              <th className="w-[22%] whitespace-nowrap px-4 py-4 font-semibold">
                User Name
              </th>
              <th className="w-[24%] whitespace-nowrap px-4 py-4 font-semibold">
                Email ID
              </th>
              <th className="w-[18%] px-4 py-4 font-semibold">Status</th>
              <th className="w-[18%] px-4 py-4 font-semibold">Subscription</th>
              <th className="w-[10%] px-4 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {tableSlots.map(({ user, rowNumber }, index) =>
              user ? (
                <tr key={user.id} className="h-11 text-slate-800">
                  <td className="whitespace-nowrap px-3 py-2.5 text-[#586D93] md:px-3 lg:px-4">
                    {rowNumber}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 font-medium text-[#586D93]">
                    {user.name}
                  </td>
                  <td className="truncate whitespace-nowrap px-4 py-2.5 text-[#586D93]">
                    {user.email}
                  </td>
                  <td className="px-4 py-2.5 align-middle">
                    <div className="flex justify-start">
                      <StatusBadge status={user.status?.charAt(0).toUpperCase() + user.status?.slice(1)} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <SubscriptionBadge subscription={user.plan_name} />
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      type="button"
                      // onClick={() => onViewUser(user_id)}
                      onClick={() => {
  console.log("User ID:", user.user_id);
  onViewUser(user.user_id);
}}
                      
                      aria-label={`View ${user.name}`}
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
        <div className="mt-3 min-h-1 lg:hidden">
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
// StatusBadge — active, idle, or inactive status pill
// -----------------------------------------------------------------------------
function StatusBadge({ status }) {
  const statusStyles = {
    Active: "bg-[#33B46926] text-[#33B469]",
    Idle: "bg-[#FDF5E6] text-[#F59E0B]",
    Inactive: "bg-[#FF000033] text-[#FF0000]",
  };
  const dotStyles = {
    Active: "bg-[#33B469]",
    Idle: "bg-[#F59E0B]",
    Inactive: "bg-[#FF0000]",
  };

  return (
    <span
      className={`inline-flex w-[90px] items-center justify-start gap-2 rounded-full py-1.5 pl-3 pr-3 text-sm font-medium ${statusStyles[status] ?? "bg-slate-100 text-slate-700"}`}
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
// SubscriptionBadge — subscription tier pill
// -----------------------------------------------------------------------------
function SubscriptionBadge({ subscription }) {
  return (
    <span className="inline-flex w-[93px] items-center justify-center rounded-lg bg-[#4866F61A] px-3 py-1 text-sm font-medium text-[#4866F6]">
      {subscription}
    </span>
  );
}

// -----------------------------------------------------------------------------
// FilterSelectField — custom dropdown (months/years; same trigger as SelectField)
// -----------------------------------------------------------------------------
function FilterSelectField({
  placeholder,
  options = [],
  ariaLabel,
  className = "",
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const containerRef = useRef(null);

  const selectedValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((o) => o.value === selectedValue);
  const displayLabel = selectedOption?.label ?? placeholder;

  const handleSelect = (optionValue) => {
    if (value === undefined) setInternalValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
  };

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
        aria-haspopup="listbox"
        className="w-full md:w-[120px] xl:w-[200px] cursor-pointer appearance-none rounded-lg border border-[#CFCFCF] bg-white py-1.5 pl-3 pr-10 md:py-2.5 md:pr-15 md:text-sm lg:pr-14 xl:pr-35 lg:text-base text-left text-[#8D97A9] focus:outline-none focus:ring-0"
      >
        <span className="truncate whitespace-nowrap">{displayLabel}</span>
      </button>
      <ChevronDown
        className={`pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-50 mt-2 w-full min-w-full rounded-xl bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          <div className="max-h-[220px] md:max-h-[200px] lg:max-h-[220px] overflow-y-auto scrollbar-hide">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-4 py-2.5 text-left text-base md:text-sm lg:text-base text-[#333333] hover:bg-slate-50 ${
                  selectedValue === option.value
                    ? "bg-slate-50 font-medium"
                    : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// CheckboxFilterField — multi-select filter (compact trigger = SelectField)
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
