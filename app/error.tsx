"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="bg-black min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <span
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}
        >
          Something went wrong
        </span>
        <h1
          className="text-white"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Unexpected error.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
          Something didn&apos;t load correctly. You can try again or head back home.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="rounded-full text-white font-semibold transition-all hover:brightness-110"
            style={{ backgroundColor: "rgb(99,102,241)", fontSize: 14, fontWeight: 600, padding: "12px 28px" }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full font-semibold transition-colors hover:text-white"
            style={{ fontSize: 14, fontWeight: 600, padding: "12px 28px", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
