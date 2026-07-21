export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-14 w-1/3 rounded bg-[rgb(20,20,20)]" />
        <div className="h-6 w-1/2 rounded bg-[rgb(20,20,20)]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-[rgb(20,20,20)]" />
          ))}
        </div>
      </section>
    </main>
  );
}
