"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";

const VALID_PLANS = ["register"] as const;

const SERVICES = [
  "Website Development",
  "Social Media Marketing",
  "Mobile Application Development",
  "Website Support",
  "SEO",
  "Media Buying",
  "Email Marketing",
  "SMS Marketing",
  "Marketing Research & Strategy",
  "Branding",
  "Interior Design",
] as const;

type ContactData = {
  name: string;
  phone: string;
  email: string;
  plan: string;
};

type FormErrors = {
  services?: string;
  consent?: string;
};

export default function ServicesPage() {
  const params = useParams();
  const router = useRouter();
  const plan = params.plan as string;

  if (!VALID_PLANS.includes(plan as typeof VALID_PLANS[number])) {
    notFound();
  }

  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("veliq-contact");
    if (!stored) {
      router.replace(`/${plan}`);
      return;
    }
    try {
      const data = JSON.parse(stored) as ContactData;
      if (data.plan !== plan) {
        router.replace(`/${plan}`);
        return;
      }
      setContactData(data);
    } catch {
      router.replace(`/${plan}`);
    }
  }, [plan, router]);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
    setErrors((prev) => ({ ...prev, services: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: FormErrors = {};
    if (selectedServices.length === 0) errs.services = "Select at least one service.";
    if (!consent) errs.consent = "You must agree to be contacted.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (!contactData) return;

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          services: selectedServices,
          consent: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      sessionStorage.removeItem("veliq-contact");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!contactData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a14]">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
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
          <Link href="/" className="text-2xl font-bold tracking-tight text-white md:text-3xl hover:text-slate-200 transition">VELIQ</Link>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">1</div>
          <div className="h-px flex-1 bg-slate-700" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">2</div>
        </div>

        {status === "success" ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
              <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white">Thank You!</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              We&apos;ve received your request. A member of our team will contact you shortly.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1 className="mt-8 text-3xl font-bold text-white">Select Services</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Choose the services you&apos;re interested in and we&apos;ll get back to you within 24 hours.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Services */}
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">Services</label>
                <div className="space-y-1">
                  {SERVICES.map((service) => (
                    <label
                      key={service}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                        selectedServices.includes(service)
                          ? "border-indigo-500/40 bg-indigo-500/10 text-white"
                          : "border-slate-800 bg-white/[0.02] text-slate-300 hover:border-slate-700 hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-indigo-500/40"
                      />
                      {service}
                    </label>
                  ))}
                </div>
                {errors.services && <p className="mt-2 text-xs text-red-400">{errors.services}</p>}
              </div>

              {/* Selected tags */}
              {selectedServices.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/20"
                    >
                      {service}
                      <button
                        type="button"
                        onClick={() => toggleService(service)}
                        className="hover:text-indigo-300"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-slate-800" />

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors((p) => ({ ...p, consent: undefined }));
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-indigo-500/40"
                  />
                  <span className="text-xs leading-relaxed text-slate-400">
                    I agree that a VELIQ representative may contact me via email or phone regarding my inquiry.
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 text-xs text-red-400">{errors.consent}</p>}
              </div>

              {/* Server error */}
              {status === "error" && (
                <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{serverError}</p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/${plan}`)}
                  className="flex-1 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-white/5 active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </>
        )}

        {/* Footer */}
        <p className="mt-16 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} VELIQ. All rights reserved.
        </p>
      </div>
    </div>
  );
}
