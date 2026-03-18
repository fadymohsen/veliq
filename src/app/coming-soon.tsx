import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a14]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Logo */}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          VELIQ
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        {/* Headline */}
        <h1 className="mt-5 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          Something{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Great
          </span>
          <br />
          Is Coming
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-400">
          We&apos;re crafting a new digital experience. Stay tuned — or reach
          out now to get started early.
        </p>

        {/* CTA */}
        <Link
          href="/register"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          Get in Touch
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-slate-600">
        &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
      </p>
    </div>
  );
}
