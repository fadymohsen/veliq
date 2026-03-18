"use client";

import { useState, useRef } from "react";
import { useParams, useRouter, notFound } from "next/navigation";

const VALID_PLANS = ["register"] as const;

const COUNTRIES = [
  { name: "Egypt", code: "+20", flag: "🇪🇬", minLen: 10, maxLen: 10 },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦", minLen: 9, maxLen: 9 },
  { name: "UAE", code: "+971", flag: "🇦🇪", minLen: 9, maxLen: 9 },
  { name: "Kuwait", code: "+965", flag: "🇰🇼", minLen: 8, maxLen: 8 },
  { name: "Qatar", code: "+974", flag: "🇶🇦", minLen: 8, maxLen: 8 },
  { name: "Bahrain", code: "+973", flag: "🇧🇭", minLen: 8, maxLen: 8 },
  { name: "Oman", code: "+968", flag: "🇴🇲", minLen: 8, maxLen: 8 },
  { name: "Jordan", code: "+962", flag: "🇯🇴", minLen: 9, maxLen: 9 },
  { name: "Lebanon", code: "+961", flag: "🇱🇧", minLen: 7, maxLen: 8 },
  { name: "Iraq", code: "+964", flag: "🇮🇶", minLen: 10, maxLen: 10 },
  { name: "Morocco", code: "+212", flag: "🇲🇦", minLen: 9, maxLen: 9 },
  { name: "Tunisia", code: "+216", flag: "🇹🇳", minLen: 8, maxLen: 8 },
  { name: "Libya", code: "+218", flag: "🇱🇾", minLen: 9, maxLen: 9 },
  { name: "United States", code: "+1", flag: "🇺🇸", minLen: 10, maxLen: 10 },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", minLen: 10, maxLen: 10 },
  { name: "Germany", code: "+49", flag: "🇩🇪", minLen: 10, maxLen: 11 },
  { name: "France", code: "+33", flag: "🇫🇷", minLen: 9, maxLen: 9 },
  { name: "Turkey", code: "+90", flag: "🇹🇷", minLen: 10, maxLen: 10 },
  { name: "India", code: "+91", flag: "🇮🇳", minLen: 10, maxLen: 10 },
  { name: "Pakistan", code: "+92", flag: "🇵🇰", minLen: 10, maxLen: 10 },
  { name: "Canada", code: "+1", flag: "🇨🇦", minLen: 10, maxLen: 10 },
  { name: "Australia", code: "+61", flag: "🇦🇺", minLen: 9, maxLen: 9 },
];

type Country = (typeof COUNTRIES)[number];

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

export default function PlanContactPage() {
  const params = useParams();
  const router = useRouter();
  const plan = params.plan as string;

  if (!VALID_PLANS.includes(plan as typeof VALID_PLANS[number])) {
    notFound();
  }

  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    const name = nameRef.current?.value?.trim() ?? "";
    const phone = phoneRef.current?.value?.trim().replace(/\s/g, "") ?? "";
    const email = emailRef.current?.value?.trim() ?? "";

    if (!name || name.length < 2) errs.name = "Name is required (min 2 characters).";

    if (!phone || !/^\d+$/.test(phone)) {
      errs.phone = "Enter a valid phone number (digits only).";
    } else if (phone.length < selectedCountry.minLen || phone.length > selectedCountry.maxLen) {
      errs.phone =
        selectedCountry.minLen === selectedCountry.maxLen
          ? `Phone number for ${selectedCountry.name} must be ${selectedCountry.minLen} digits.`
          : `Phone number for ${selectedCountry.name} must be ${selectedCountry.minLen}–${selectedCountry.maxLen} digits.`;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";

    return errs;
  }

  function handleNext() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const data = {
      name: nameRef.current!.value.trim(),
      phone: `${selectedCountry.code} ${phoneRef.current!.value.trim()}`,
      email: emailRef.current!.value.trim(),
      plan,
    };
    sessionStorage.setItem("veliq-contact", JSON.stringify(data));
    router.push(`/${plan}/services`);
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a14]">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-md px-6 py-16">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">VELIQ</h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">1</div>
          <div className="h-px flex-1 bg-slate-700" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-500">2</div>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-bold text-white">Contact Us</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Tell us about yourself and we&apos;ll help you pick the right services.
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Your full name"
              onChange={() => setErrors((p) => ({ ...p, name: undefined }))}
              className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition ${
                errors.name
                  ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                  : "border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
              }`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">Phone</label>
            <div className="flex gap-2">
              {/* Country code dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCountryOpen((p) => !p)}
                  className={`flex h-full items-center gap-1.5 rounded-lg border bg-white/5 px-3 py-3 text-sm whitespace-nowrap backdrop-blur-sm transition ${
                    errors.phone ? "border-red-500/60" : "border-slate-700"
                  } ${countryOpen ? "ring-1 ring-indigo-500/40 border-indigo-500" : ""}`}
                >
                  <span>{selectedCountry.flag}</span>
                  <span className="text-white font-medium">{selectedCountry.code}</span>
                  <svg
                    className={`h-3.5 w-3.5 text-slate-500 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {countryOpen && (
                  <div className="absolute left-0 top-full z-20 mt-1 max-h-56 w-64 overflow-y-auto rounded-lg border border-slate-700 bg-[#12121f] shadow-xl">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.name}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setCountryOpen(false);
                          setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-white/5 ${
                          selectedCountry.name === country.name ? "bg-indigo-500/10 text-indigo-400" : "text-slate-300"
                        }`}
                      >
                        <span>{country.flag}</span>
                        <span className="flex-1 text-left">{country.name}</span>
                        <span className="text-slate-500">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone input */}
              <input
                ref={phoneRef}
                type="tel"
                placeholder="Phone number"
                onChange={() => setErrors((p) => ({ ...p, phone: undefined }))}
                className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition ${
                  errors.phone
                    ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
            <p className="mt-1.5 text-xs text-slate-500">
              {selectedCountry.minLen === selectedCountry.maxLen
                ? `${selectedCountry.name}: ${selectedCountry.minLen} digits required`
                : `${selectedCountry.name}: ${selectedCountry.minLen}–${selectedCountry.maxLen} digits required`}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-400">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
              className={`w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition ${
                errors.email
                  ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                  : "border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
              }`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-800" />

          {/* Next button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Next
          </button>
        </div>

        {/* Footer */}
        <p className="mt-16 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
        </p>
      </div>
    </div>
  );
}
