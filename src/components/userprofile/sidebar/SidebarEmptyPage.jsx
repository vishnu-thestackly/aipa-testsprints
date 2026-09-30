// export default function SidebarEmptyPage({ title }) {
//   return (
//     <section className="min-h-full bg-gray-100" aria-label={title}>
//       <span className="sr-only">{title}</span>
//     </section>
//   );
// }


import { useTheme } from "../../../context/ThemeContext";

export default function SidebarEmptyPage({ title }) {
   const { isDark } = useTheme();

return (
    <section className={`min-h-full ${ isDark ? "bg-[#111827]" : "bg-gray-100"}`} aria-label={title}>
      <span className="sr-only">{title}</span>
    </section>
  );
}

 