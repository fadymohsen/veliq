export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-4 w-32 rounded bg-[rgb(20,20,20)]" />
        <div className="h-14 w-2/3 rounded bg-[rgb(20,20,20)]" />
        <div className="h-5 w-1/2 rounded bg-[rgb(20,20,20)]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 rounded-[15px] bg-[rgb(14,14,14)]" />
          ))}
        </div>
      </section>
    </main>
  );
}
