"use client";

import { useState } from "react";
import Link from "next/link";

const packages = [
  {
    name: "Simple Website",
    subtitle: "Up to 5 Pages",
    priceWithout: { min: 2500, max: 5000 },
    priceWith: { min: 4500, max: 7000 },
    delivery: "3 days",
    popular: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup"],
  },
  {
    name: "Portfolio Website",
    subtitle: "Showcase Your Work",
    priceWithout: { min: 5000, max: 10000 },
    priceWith: { min: 10000, max: 16000 },
    delivery: "7 days",
    popular: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design"],
  },
  {
    name: "E-Commerce Website",
    subtitle: "Sell Online",
    priceWithout: { min: 10000, max: 15000 },
    priceWith: { min: 18000, max: 25000 },
    delivery: "15–20 days",
    popular: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard"],
  },
  {
    name: "Services & Store",
    subtitle: "Display, Pay & Sell",
    priceWithout: { min: 15000, max: 20000 },
    priceWith: { min: 25000, max: 35000 },
    delivery: "20–30 days",
    popular: false,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard"],
  },
];

const supportPlans = [
  {
    name: "Basic Support",
    price: 1000,
    description: "Keep your website running smoothly with regular maintenance and technical support.",
    features: ["Bug fixes & updates", "Performance monitoring", "Monthly backups", "Technical support"],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    name: "Basic Support + SEO",
    price: 2000,
    description: "Everything in Basic Support, plus developer-level SEO to grow your organic traffic.",
    features: ["Everything in Basic Support", "Technical SEO audits", "On-page optimization", "Performance & Core Web Vitals"],
    highlighted: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function PricingPage() {
  const [withHosting, setWithHosting] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a14]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-purple-600/8 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-blue-600/8 blur-[100px]" />
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Pricing</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Simple,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Choose the package that fits your needs. All prices are in Egyptian Pounds (EGP).
          </p>

          {/* Divider */}
          <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-slate-700/60 bg-white/5 p-1 backdrop-blur-sm">
            <button
              onClick={() => setWithHosting(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                !withHosting
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Without Domain & Hosting
            </button>
            <button
              onClick={() => setWithHosting(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                withHosting
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              With Domain & Hosting
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => {
            const price = withHosting ? pkg.priceWith : pkg.priceWithout;
            return (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                  pkg.popular
                    ? "border-indigo-500/60 bg-indigo-600/10 shadow-xl shadow-indigo-500/10"
                    : "border-slate-700/50 bg-white/[0.03] hover:border-slate-600/60 hover:bg-white/[0.05]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                    pkg.popular ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {pkg.icon}
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{pkg.subtitle}</p>

                {/* Price */}
                <div className="mt-4">
                  <p className="text-2xl font-extrabold text-white">
                    {price.min.toLocaleString()}
                    <span className="text-base font-semibold text-slate-400"> – {price.max.toLocaleString()}</span>
                  </p>
                  <p className="text-xs text-slate-500">EGP</p>
                </div>

                {/* Delivery */}
                <div className="mt-3 flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-slate-400">Delivery: <span className="text-white font-medium">{pkg.delivery}</span></span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-700/50" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/register"
                  className={`mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                    pkg.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            );
          })}
        </div>

        {/* Support Plans */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Ongoing Support</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Website{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Maintenance Plans
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              Keep your site fast, secure, and growing — every month.
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:max-w-2xl sm:mx-auto">
            {supportPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ${
                  plan.highlighted
                    ? "border-indigo-500/60 bg-indigo-600/10 shadow-xl shadow-indigo-500/10"
                    : "border-slate-700/50 bg-white/[0.03] hover:border-slate-600/60 hover:bg-white/[0.05]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                    plan.highlighted ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {plan.icon}
                </div>

                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{plan.description}</p>

                <div className="mt-5">
                  <span className="text-3xl font-extrabold text-white">{plan.price.toLocaleString()}</span>
                  <span className="ml-1 text-base font-medium text-slate-400">EGP / month</span>
                </div>

                <div className="my-5 h-px bg-slate-700/50" />

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
                      : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Service */}
        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">SEO Service</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Grow Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Organic Reach
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              A dedicated developer working on your project for 3 months — with full reports and website support included.
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </div>

          <div className="mt-10 mx-auto max-w-2xl">
            <div className="relative rounded-2xl border border-indigo-500/40 bg-indigo-600/5 p-8 shadow-xl shadow-indigo-500/5">
              {/* Top badge */}
              <div className="absolute -top-3 left-8">
                <span className="rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
                  Per Website / Project
                </span>
              </div>

              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: icon + name + price */}
                <div className="flex flex-col gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">SEO Package</h3>
                    <p className="mt-1 text-sm text-slate-400">3-Month Engagement</p>
                  </div>

                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-white">35,000</span>
                      <span className="mb-1 text-base font-medium text-slate-400">EGP</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">for 3 months · per project</p>
                  </div>

                  <Link
                    href="/register"
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
                  >
                    Get Started
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px self-stretch bg-slate-700/50" />
                <div className="sm:hidden h-px bg-slate-700/50" />

                {/* Right: what's included */}
                <div className="flex flex-col gap-4 sm:max-w-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What&apos;s Included</p>

                  {[
                    {
                      label: "Keyword Research & Strategy",
                      desc: "Primary & long-tail keywords, search intent analysis, competitor keyword gap",
                    },
                    {
                      label: "On-Page SEO",
                      desc: "Titles, meta descriptions, content structure (H1–H3), internal linking & URL optimization",
                    },
                    {
                      label: "Technical SEO",
                      desc: "Site speed, Core Web Vitals, mobile-first, crawl errors, sitemap & indexing",
                    },
                    {
                      label: "Off-Page & Backlinks",
                      desc: "Quality backlink building, guest posting, digital PR & brand authority",
                    },
                    {
                      label: "AI & Answer Optimization",
                      desc: "GEO & AEO — get found in AI tools, voice search & Google featured snippets",
                    },
                    {
                      label: "Monthly Reports & Analytics",
                      desc: "GA4, Search Console, keyword rankings & full performance insights every month",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}

                  <p className="mt-1 text-xs text-slate-600 border-t border-slate-800 pt-3">
                    Tools: SEMrush · Ahrefs · Screaming Frog · GA4 · GSC · Microsoft Clarity · GTM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-center text-sm text-slate-600">
          Have a custom project in mind?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Get in touch
          </Link>{" "}
          and we&apos;ll figure it out together.
        </p>
      </div>

      {/* Footer */}
      <p className="pb-6 text-center text-xs text-slate-700">
        &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
      </p>
    </div>
  );
}
