"use client";

import { useState, useRef, useEffect } from "react";

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

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  services?: string;
  consent?: string;
};

export default function ComingSoon() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Reset form when popup closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedServices([]);
      setConsent(false);
      setErrors({});
      setStatus("idle");
      setServerError("");
      setFormName("");
      setFormPhone("");
      setFormEmail("");
    }
  }, [open]);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
    setErrors((prev) => ({ ...prev, services: undefined }));
  }

  function validateStep1(): FormErrors {
    const errs: FormErrors = {};
    const name = nameRef.current?.value?.trim() ?? "";
    const phone = phoneRef.current?.value?.trim() ?? "";
    const email = emailRef.current?.value?.trim() ?? "";

    if (!name || name.length < 2) errs.name = "Name is required (min 2 characters).";
    if (!phone || !/^\+?[\d\s\-()]{7,20}$/.test(phone)) errs.phone = "Enter a valid phone number.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address.";

    return errs;
  }

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (selectedServices.length === 0) errs.services = "Select at least one service.";
    if (!consent) errs.consent = "You must agree to be contacted.";
    return errs;
  }

  function handleNext() {
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setFormName(nameRef.current!.value.trim());
      setFormPhone(phoneRef.current!.value.trim());
      setFormEmail(emailRef.current!.value.trim());
      setStep(2);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          services: selectedServices,
          consent: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a14]">
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
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        {/* Logo */}
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          VELIQ
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        {/* Headline */}
        <h1 className="mt-5 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          Something{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Great
          </span>
          <br />
          Is Coming
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-400">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto py-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl animate-in my-auto">
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

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Thank You!</h3>
                <p className="mt-2 text-sm text-slate-500">
                  We&apos;ve received your request. A member of our team will contact you shortly.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 rounded-full bg-[#0a0a14] px-8 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    step === 1 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
                  }`}>1</div>
                  <div className="h-px flex-1 bg-slate-200" />
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                    step === 2 ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"
                  }`}>2</div>
                </div>

                <div className="min-h-[370px] flex flex-col">
                {step === 1 ? (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900">Contact Us</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Tell us about yourself and we&apos;ll help you pick the right services.
                    </p>

                    <div className="mt-6 flex flex-1 flex-col space-y-4">
                      {/* Name */}
                      <div>
                        <input
                          ref={nameRef}
                          type="text"
                          placeholder="Name"
                          defaultValue={formName}
                          onChange={() => setErrors((p) => ({ ...p, name: undefined }))}
                          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                            errors.name ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          }`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <input
                          ref={phoneRef}
                          type="tel"
                          placeholder="Phone Number"
                          defaultValue={formPhone}
                          onChange={() => setErrors((p) => ({ ...p, phone: undefined }))}
                          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                            errors.phone ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          }`}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <input
                          ref={emailRef}
                          type="email"
                          placeholder="Email Address"
                          defaultValue={formEmail}
                          onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
                          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                            errors.email ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          }`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>

                      {/* Next button */}
                      <div className="flex-1" />
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full rounded-full bg-[#0a0a14] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900">Select Services</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Choose the services you&apos;re interested in and we&apos;ll get back to you within 24 hours.
                    </p>

                    <form className="mt-6 flex flex-1 flex-col space-y-4" onSubmit={handleSubmit} noValidate>
                      {/* Services as checkboxes list */}
                      <div className="space-y-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 p-2">
                        {SERVICES.map((service) => (
                          <label
                            key={service}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                          >
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service)}
                              onChange={() => toggleService(service)}
                              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            {service}
                          </label>
                        ))}
                      </div>
                      {errors.services && <p className="mt-1 text-xs text-red-500">{errors.services}</p>}

                      {/* Selected services tags */}
                      {selectedServices.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedServices.map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                            >
                              {service}
                              <button
                                type="button"
                                onClick={() => toggleService(service)}
                                className="ml-0.5 hover:text-indigo-900"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Consent checkbox */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => {
                              setConsent(e.target.checked);
                              setErrors((p) => ({ ...p, consent: undefined }));
                            }}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-xs leading-relaxed text-slate-500">
                            I agree that a VELIQ representative may contact me via email or phone regarding my inquiry.
                          </span>
                        </label>
                        {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}
                      </div>

                      {/* Server error */}
                      {status === "error" && (
                        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{serverError}</p>
                      )}

                      {/* Back & Submit buttons */}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => { setStep(1); setErrors({}); }}
                          className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="flex-1 rounded-full bg-[#0a0a14] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "sending" ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
                </div>
              </>
            )}
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
