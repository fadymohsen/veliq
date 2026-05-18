import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#0d1232] to-[#0a1a2e]">
      {/* Brand-tinted glows for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[560px] w-[560px] rounded-full bg-violet-700/25 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center sm:py-0">
        {/* Logo */}
        <svg
          viewBox="0 0 620 200"
          fill="none"
          role="img"
          aria-label="VELIQ"
          className="h-20 w-auto sm:h-24 md:h-32 lg:h-40"
        >
          <defs>
            <linearGradient id="veliq-grad" x1="0" y1="0" x2="620" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#6D28D9" />
              <stop offset="0.35" stopColor="#4338CA" />
              <stop offset="0.7" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#7DD3FC" />
            </linearGradient>
          </defs>
          {/* V */}
          <path
            d="M 20 30 L 80 170 L 140 30"
            stroke="url(#veliq-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* E — three bars */}
          <path d="M 170 30 H 270" stroke="url(#veliq-grad)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 170 100 H 270" stroke="url(#veliq-grad)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 170 170 H 270" stroke="url(#veliq-grad)" strokeWidth="14" strokeLinecap="round" />
          {/* L */}
          <path
            d="M 300 30 V 170 H 400"
            stroke="url(#veliq-grad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* I */}
          <path d="M 430 30 V 170" stroke="url(#veliq-grad)" strokeWidth="14" strokeLinecap="round" />
          {/* Q — circle + descender */}
          <circle cx="530" cy="100" r="70" stroke="url(#veliq-grad)" strokeWidth="14" />
          <path
            d="M 560 158 V 190"
            stroke="url(#veliq-grad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>

        {/* Headline */}
        <h1 className="mt-8 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:mt-10 sm:text-5xl md:text-6xl lg:text-7xl">
          Software &amp; Marketing
          <br />
          Built to Scale
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base text-slate-400 sm:mt-6 sm:text-lg">
          Precision at the speed of ambition.
        </p>

        {/* CTA */}
        <Link
          href="/register/contact"
          className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-violet-700 via-indigo-500 to-sky-400 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:shadow-indigo-500/50 hover:brightness-110 active:scale-[0.97] sm:mt-10"
        >
          Get in Touch
        </Link>

        {/* Social links */}
        <div className="mt-8 flex items-center gap-5 sm:mt-12">
        <a
          href="https://www.linkedin.com/company/veliq-co"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-slate-500 transition hover:text-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://www.facebook.com/veliq.co"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-slate-500 transition hover:text-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/veliq.co"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-slate-500 transition hover:text-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@veliq.co"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-slate-500 transition hover:text-white"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
        </p>
      </div>
    </div>
  );
}
