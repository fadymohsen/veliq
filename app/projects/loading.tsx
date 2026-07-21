export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-14 w-1/4 rounded bg-[rgb(20,20,20)]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-[rgb(20,20,20)]" />
          ))}
        </div>
      </section>
    </main>
  );
}
