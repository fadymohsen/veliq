export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-14 w-1/3 rounded bg-[rgb(20,20,20)]" />
        <div className="h-6 w-1/2 rounded bg-[rgb(20,20,20)]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-full rounded-xl bg-[rgb(20,20,20)]" />
            <div className="h-12 w-full rounded-xl bg-[rgb(20,20,20)]" />
            <div className="h-32 w-full rounded-xl bg-[rgb(20,20,20)]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-20 w-full rounded-xl bg-[rgb(20,20,20)]" />
            <div className="h-20 w-full rounded-xl bg-[rgb(20,20,20)]" />
          </div>
        </div>
      </section>
    </main>
  );
}
