export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-8 animate-pulse">
        <div className="h-4 w-28 rounded bg-[rgb(20,20,20)]" />
        <div className="h-14 w-2/3 rounded bg-[rgb(20,20,20)]" />
        <div className="h-5 w-1/3 rounded bg-[rgb(20,20,20)]" />
        <div className="w-full aspect-video rounded-[15px] bg-[rgb(14,14,14)] mt-4" />
        <div className="flex flex-col gap-3 mt-4">
          <div className="h-4 w-full rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-full rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-4/5 rounded bg-[rgb(20,20,20)]" />
        </div>
      </section>
    </main>
  );
}
