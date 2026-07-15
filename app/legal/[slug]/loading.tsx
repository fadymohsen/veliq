export default function Loading() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[760px] mx-auto flex flex-col gap-6 animate-pulse">
        <div className="h-12 w-2/3 rounded bg-[rgb(20,20,20)]" />
        <div className="h-4 w-40 rounded bg-[rgb(20,20,20)]" />
        <div className="h-px w-full bg-[rgb(20,20,20)] my-2" />
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-full rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-3/4 rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-full rounded bg-[rgb(20,20,20)]" />
          <div className="h-4 w-5/6 rounded bg-[rgb(20,20,20)]" />
        </div>
      </section>
    </main>
  );
}
