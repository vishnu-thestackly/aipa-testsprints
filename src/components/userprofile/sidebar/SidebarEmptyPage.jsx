export default function SidebarEmptyPage({ title }) {
  return (
    <section className="min-h-full bg-gray-100" aria-label={title}>
      <span className="sr-only">{title}</span>
    </section>
  );
}
