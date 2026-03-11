"use client";

import { useState } from "react";

export default function ComingSoon() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#0a0a14]">
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
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center -mt-12">
        {/* Logo */}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          VELIQ
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        {/* Headline */}
        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          Something{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Great
          </span>
          <br />
          Is Coming
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-400 md:text-lg">
          We&apos;re crafting a new digital experience. Stay tuned — or reach
          out now to get started early.
        </p>

        {/* CTA */}
        <button
          onClick={() => setOpen(true)}
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
        </button>
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-slate-600">
        &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
      </p>

      {/* ── Contact Popup ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl animate-in">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-slate-900">Contact Us</h3>
            <p className="mt-2 text-sm text-slate-500">
              Tell us about your project and we&apos;ll get back to you within
              24 hours.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#0a0a14] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Popup animation */}
      <style>{`
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-in {
          animation: animate-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
