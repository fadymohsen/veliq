"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";

const VALID_PLANS = ["register"] as const;

type AgencyData = {
  status: "with" | "looking";
  selections: string[];
};

type ContactData = {
  name: string;
  phone: string;
  email: string;
  plan: string;
};

export default function SummaryPage() {
  const params = useParams();
  const router = useRouter();
  const plan = params.plan as string;

  if (!VALID_PLANS.includes(plan as typeof VALID_PLANS[number])) {
    notFound();
  }

  const [agencyData, setAgencyData] = useState<AgencyData | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const agency = sessionStorage.getItem("veliq-agency");
    const contact = sessionStorage.getItem("veliq-contact");
    const svc = sessionStorage.getItem("veliq-services");

    if (!agency || !contact || !svc) {
      router.replace(`/${plan}`);
      return;
    }

    try {
      setAgencyData(JSON.parse(agency));
      setContactData(JSON.parse(contact));
      setServices(JSON.parse(svc));
    } catch {
      router.replace(`/${plan}`);
    }
  }, [plan, router]);

  async function handleSubmit() {
    if (!consent) {
      setConsentError("You must agree to be contacted.");
      return;
    }
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
          services,
          consent: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      sessionStorage.removeItem("veliq-agency");
      sessionStorage.removeItem("veliq-contact");
      sessionStorage.removeItem("veliq-services");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!contactData || !agencyData) {
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
        <div className="mt-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">1</div>
          <div className="h-px flex-1 bg-slate-700" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">2</div>
          <div className="h-px flex-1 bg-slate-700" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-400">3</div>
          <div className="h-px flex-1 bg-slate-700" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">4</div>
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
            <h1 className="mt-8 text-3xl font-bold text-white">Review & Submit</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Please review your information before submitting.
            </p>

            <div className="mt-8 space-y-6">
              {/* Agency section */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">Agency Status</label>
                  <button
                    type="button"
                    onClick={() => router.push(`/${plan}`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 rounded-lg border border-slate-800 bg-white/[0.02] px-4 py-3">
                  <p className="text-sm text-white">
                    {agencyData.status === "with" ? "Currently with an agency" : "Looking for an agency"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {agencyData.selections.map((s) => (
                      <span key={s} className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact section */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">Contact Details</label>
                  <button
                    type="button"
                    onClick={() => router.push(`/${plan}/contact`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-white/[0.02] px-4 py-3">
                    <span className="text-xs text-slate-500">Name</span>
                    <span className="text-sm text-white">{contactData.name}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-white/[0.02] px-4 py-3">
                    <span className="text-xs text-slate-500">Phone</span>
                    <span className="text-sm text-white">{contactData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-white/[0.02] px-4 py-3">
                    <span className="text-xs text-slate-500">Email</span>
                    <span className="text-sm text-white">{contactData.email}</span>
                  </div>
                </div>
              </div>

              {/* Services section */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">Services</label>
                  <button
                    type="button"
                    onClick={() => router.push(`/${plan}/services`)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span key={s} className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-indigo-500/20">{s}</span>
                  ))}
                </div>
              </div>

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
                      setConsentError("");
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-transparent text-indigo-500 focus:ring-indigo-500/40"
                  />
                  <span className="text-xs leading-relaxed text-slate-400">
                    I agree that a VELIQ representative may contact me via email or phone regarding my inquiry.
                  </span>
                </label>
                {consentError && <p className="mt-1.5 text-xs text-red-400">{consentError}</p>}
              </div>

              {/* Server error */}
              {status === "error" && (
                <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">{serverError}</p>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/${plan}/services`)}
                  className="flex-1 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-white/5 active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
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
