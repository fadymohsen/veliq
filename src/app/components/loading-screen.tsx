"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    // Phase 1: Loading animation plays
    const revealTimer = setTimeout(() => setPhase("reveal"), 2200);
    // Phase 2: Slide up and fade out
    const doneTimer = setTimeout(() => setPhase("done"), 2800);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a14] transition-all duration-600 ${
        phase === "reveal" ? "opacity-0 -translate-y-full" : "opacity-100"
      }`}
    >
      {/* Glowing orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px] loading-orb-pulse" />
        <div className="absolute left-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-purple-600/15 blur-[100px] loading-orb-float" />
        <div className="absolute right-1/4 bottom-1/3 h-[200px] w-[200px] rounded-full bg-blue-600/10 blur-[100px] loading-orb-float-reverse" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo + Animation */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo mark — abstract V shape built from geometric lines */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="loading-ring absolute -inset-6 rounded-full border border-white/[0.08]" />
          <div className="loading-ring-spin absolute -inset-6 rounded-full border-t border-indigo-500/40" />

          {/* Inner glow */}
          <div className="absolute -inset-3 rounded-full bg-indigo-500/10 blur-xl loading-inner-glow" />

          {/* The V mark */}
          <svg
            className="relative h-20 w-20 loading-logo-draw"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background hexagon shape */}
            <path
              className="loading-hex"
              d="M40 4L72 22V58L40 76L8 58V22L40 4Z"
              stroke="url(#hex-gradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset="220"
            />
            {/* Inner V letterform */}
            <path
              className="loading-v-stroke"
              d="M24 26L40 56L56 26"
              stroke="url(#v-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="80"
              strokeDashoffset="80"
            />
            {/* Accent dot at the bottom of V */}
            <circle
              className="loading-dot"
              cx="40"
              cy="56"
              r="2.5"
              fill="url(#dot-gradient)"
              opacity="0"
            />
            {/* Small accent lines */}
            <line
              className="loading-accent-1"
              x1="40"
              y1="14"
              x2="40"
              y2="20"
              stroke="url(#v-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0"
            />
            <line
              className="loading-accent-2"
              x1="40"
              y1="62"
              x2="40"
              y2="68"
              stroke="url(#v-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0"
            />
            <defs>
              <linearGradient id="hex-gradient" x1="8" y1="4" x2="72" y2="76">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="v-gradient" x1="24" y1="26" x2="56" y2="56">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <radialGradient id="dot-gradient">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#818cf8" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* VELIQ text */}
        <div className="overflow-hidden">
          <h1 className="loading-text text-3xl font-bold tracking-[0.3em] text-white">
            VELIQ
          </h1>
        </div>

        {/* Tagline */}
        <p className="loading-tagline mt-3 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
          Digital Excellence
        </p>

        {/* Loading bar */}
        <div className="mt-10 h-[1px] w-48 overflow-hidden rounded-full bg-white/5">
          <div className="loading-bar h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
        </div>
      </div>
    </div>
  );
}
