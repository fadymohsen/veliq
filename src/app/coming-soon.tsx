"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComingSoon() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      return;
    }
    if (trimmed) {
      sessionStorage.setItem("veliq-prefill-email", trimmed);
    }
    router.push("/register");
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a14] text-white">
      {/* Concentric rings — echo of the Q in the logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[420px] w-[420px] rounded-full border border-blue-500/[0.12]" />
        <div className="absolute h-[640px] w-[640px] rounded-full border border-blue-500/[0.07]" />
        <div className="absolute h-[900px] w-[900px] rounded-full border border-blue-500/[0.04]" />
        <div className="absolute h-[1200px] w-[1200px] rounded-full border border-blue-500/[0.025]" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full bg-blue-600/12 blur-[140px]" />
        <div className="absolute right-1/4 top-1/4 h-[280px] w-[280px] rounded-full bg-sky-400/10 blur-[110px]" />
        <div className="absolute left-1/5 bottom-1/4 h-[260px] w-[260px] rounded-full bg-blue-700/15 blur-[110px]" />
      </div>

      {/* Dotted grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top status bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-slate-800/60 px-6 py-4 backdrop-blur-sm md:px-10">
        <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 md:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          System Online
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 md:text-xs">
          <span className="hidden sm:inline">Status:&nbsp;</span>Launching 2026
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500 md:text-xs">
          VELIQ Studio &middot; Est. 2026
        </p>

        <h1 className="mt-6 bg-gradient-to-r from-blue-900 via-blue-500 to-sky-400 bg-clip-text text-7xl font-extrabold leading-none tracking-[0.04em] text-transparent md:text-[10rem]">
          VELIQ
        </h1>

        <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-slate-500 md:text-xs">
          <span>Engineering</span>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <span>Marketing</span>
          <span className="h-1 w-1 rounded-full bg-slate-700" />
          <span>Growth</span>
        </div>

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl">
          Software, brand, and growth — built for teams who refuse to settle.
          <br className="hidden md:block" />
          Something new is on the way.
        </p>

        {/* Email capture */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-md"
        >
          <div
            className={`flex items-center gap-2 rounded-full border bg-white/[0.03] p-1.5 backdrop-blur-sm transition-colors ${
              error ? "border-red-500/60" : "border-slate-800 focus-within:border-blue-500/60"
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@company.com"
              aria-label="Email address"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-slate-600 outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Get Early Access
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          {error ? (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          ) : (
            <p className="mt-3 text-xs text-slate-600">
              No spam. One short note when we go live.
            </p>
          )}
        </form>
      </main>

      {/* Capability footer */}
      <footer className="relative z-10 border-t border-slate-800/60 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-slate-800/60 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            {
              tag: "01 / Engineering",
              title: "Software & mobile apps",
              desc: "Custom platforms built for scale.",
            },
            {
              tag: "02 / Marketing",
              title: "Brand & paid growth",
              desc: "Strategy, SEO, ads, content.",
            },
            {
              tag: "03 / Studio",
              title: "Design & creative",
              desc: "Identity, web, and motion.",
            },
          ].map((item) => (
            <div key={item.tag} className="flex flex-col gap-1 px-6 py-5 md:px-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                {item.tag}
              </span>
              <span className="text-sm font-semibold text-white">{item.title}</span>
              <span className="text-xs text-slate-500">{item.desc}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-slate-800/60 px-6 py-4 text-xs text-slate-600 md:px-10">
          <span>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.2em]">v0.1 &middot; Preview</span>
        </div>
      </footer>
    </div>
  );
}
