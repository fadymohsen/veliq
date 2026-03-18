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

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a14]">
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

      <div className="relative z-10 w-full max-w-lg px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">VELIQ</h2>
          <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <p className="mt-3 text-sm text-slate-400">
            {planLabel} Plan — Step 1 of 2
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          {/* Step indicator */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">1</div>
            <div className="h-px flex-1 bg-slate-200" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-400">2</div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">Contact Us</h3>
          <p className="mt-2 text-sm text-slate-500">
            Tell us about yourself and we&apos;ll help you pick the right services.
          </p>

          <div className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <input
                ref={nameRef}
                type="text"
                placeholder="Name"
                onChange={() => setErrors((p) => ({ ...p, name: undefined }))}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Phone with country selector */}
            <div>
              <div className="flex gap-2">
                {/* Country code dropdown */}
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryOpen((p) => !p)}
                    className={`flex h-full items-center gap-1.5 rounded-xl border px-3 py-3 text-sm whitespace-nowrap transition ${
                      errors.phone ? "border-red-400" : "border-slate-300"
                    } ${countryOpen ? "ring-1 ring-indigo-500 border-indigo-500" : ""}`}
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-slate-700 font-medium">{selectedCountry.code}</span>
                    <svg
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {countryOpen && (
                    <div className="absolute left-0 top-full z-20 mt-1 max-h-56 w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                      {COUNTRIES.map((country) => (
                        <button
                          key={country.name}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryOpen(false);
                            setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-slate-50 ${
                            selectedCountry.name === country.name ? "bg-indigo-50 text-indigo-700" : "text-slate-700"
                          }`}
                        >
                          <span>{country.flag}</span>
                          <span className="flex-1 text-left">{country.name}</span>
                          <span className="text-slate-400">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone input */}
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder="Phone Number"
                  onChange={() => setErrors((p) => ({ ...p, phone: undefined }))}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              <p className="mt-1 text-xs text-slate-400">
                {selectedCountry.minLen === selectedCountry.maxLen
                  ? `${selectedCountry.name}: ${selectedCountry.minLen} digits required`
                  : `${selectedCountry.name}: ${selectedCountry.minLen}–${selectedCountry.maxLen} digits required`}
              </p>
            </div>

            {/* Email */}
            <div>
              <input
                ref={emailRef}
                type="email"
                placeholder="Email Address"
                onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-full bg-[#0a0a14] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-slate-600">
        &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
      </p>
    </div>
  );
}
