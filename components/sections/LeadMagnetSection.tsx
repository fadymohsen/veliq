"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { COUNTRY_CODES, validatePhone, findCountryByCode } from "@/lib/country-codes";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FEATURES = [
  {
    title: "SEO Architecture from Day One",
    desc: "Clean URL structures, semantic HTML, proper heading hierarchy, and crawlable site architecture — built into the foundation.",
  },
  {
    title: "Core Web Vitals by Default",
    desc: "Sub-2-second load times, zero layout shift, and instant interactivity. Google rewards fast sites with higher rankings.",
  },
  {
    title: "Structured Data Built In",
    desc: "JSON-LD schema markup for your business, services, FAQs, and articles — enabling rich results from launch day.",
  },
  {
    title: "Mobile-First Development",
    desc: "70%+ of traffic is mobile. Every layout is designed and tested on phones first, ensuring fast loads where it matters most.",
  },
  {
    title: "Conversion-Led Design",
    desc: "Strategic CTA placement, clear user journeys, and copy that converts — not just a pretty design that loses leads.",
  },
  {
    title: "Ongoing Support & SEO Growth",
    desc: "After launch, we monitor performance, track rankings, and continuously optimize. Your site improves every month.",
  },
];

const AUDIT_ITEMS = [
  "Your top 20 commercial-intent keywords — and where you actually rank",
  "Technical SEO health score — indexing issues, speed, mobile-usability",
  "Your content gap map — pages that should exist and don't",
  "Competitor comparison — domain authority vs your 3 closest competitors",
];

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function AuditModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", countryCode: "EG", whatsapp: "", website: "", hp: "" });
  const [formLoadedAt] = useState(() => Date.now());
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhoneError("");

    const country = findCountryByCode(form.countryCode);
    if (country && !validatePhone(form.whatsapp, country)) {
      setPhoneError(`Enter ${country.minDigits === country.maxDigits ? country.minDigits : `${country.minDigits}-${country.maxDigits}`} digits for ${country.name}`);
      return;
    }

    setSending(true);
    setError("");
    try {
      const dialCode = country?.dial || "+20";
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, whatsapp: `${dialCode} ${form.whatsapp}`, formLoadedAt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = { borderColor: "rgb(40,40,40)" };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a free SEO audit"
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[440px] flex-col gap-5 rounded-[20px] p-8"
        style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
          style={{ width: 28, height: 28, color: "rgba(255,255,255,0.4)" }}
        >
          <CloseIcon />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div
              className="flex items-center justify-center rounded-full text-black"
              style={{ width: 56, height: 56, backgroundColor: "rgb(99,102,241)", fontSize: 24 }}
            >
              ✓
            </div>
            <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Request received!
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              We&apos;ll send your custom SEO audit to {form.email} within 48 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Get your free SEO audit
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                Tell us where to send your custom report.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="hp_check_field"
                  value={form.hp}
                  onChange={(e) => setForm({ ...form, hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="para-14" style={{ color: "rgb(201,201,201)" }}>Full name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-4 py-3 text-sm outline-none border transition-colors"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="para-14" style={{ color: "rgb(201,201,201)" }}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-4 py-3 text-sm outline-none border transition-colors"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="para-14" style={{ color: "rgb(201,201,201)" }}>WhatsApp number</label>
                <div className="flex gap-2">
                  <select
                    value={form.countryCode}
                    onChange={(e) => { setForm({ ...form, countryCode: e.target.value }); setPhoneError(""); }}
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-2 py-3 text-sm outline-none border transition-colors shrink-0"
                    style={{ ...inputStyle, width: 120 }}
                    onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.dial}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    placeholder="1551164671"
                    value={form.whatsapp}
                    onChange={(e) => { setForm({ ...form, whatsapp: e.target.value.replace(/[^\d]/g, "") }); setPhoneError(""); }}
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-4 py-3 text-sm outline-none border transition-colors flex-1 min-w-0"
                    style={phoneError ? { borderColor: "rgb(239,68,68)" } : inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = phoneError ? "rgb(239,68,68)" : "rgb(99,102,241)")}
                    onBlur={(e) => (e.target.style.borderColor = phoneError ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                  />
                </div>
                {phoneError && (
                  <p className="text-xs" style={{ color: "rgb(239,68,68)", marginTop: 2 }}>{phoneError}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="para-14" style={{ color: "rgb(201,201,201)" }}>Website link</label>
                <input
                  type="text"
                  required
                  placeholder="https://yoursite.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-4 py-3 text-sm outline-none border transition-colors"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgb(99,102,241)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                />
              </div>

              {error && (
                <p className="text-sm rounded-[12px] px-4 py-3" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(239,68,68)" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full text-white font-semibold transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: 14, fontWeight: 600, padding: "13px 0" }}
              >
                {sending ? "Sending..." : "Get My Free Audit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function LeadMagnetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-14">

        {/* Header */}
        <motion.div
          className="flex flex-col gap-5 max-w-[680px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="section-label text-[var(--accent-indigo)]">Website Development + SEO</span>
          <h2
            className="text-white font-semibold tracking-[-0.04em] leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
          >
            Websites built to rank from day one.
          </h2>
          <p className="text-[var(--text-body)] text-base md:text-[15px] leading-[1.7]">
            Most websites are built first and optimized later. We do both at the same time.
            Every site we develop is engineered for search engines from the first line of code — so
            you launch with speed, structure, and rankings from day one.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              className="card p-7 flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              <h3 className="text-white text-[15px] font-bold tracking-[-0.02em]">{feature.title}</h3>
              <p className="text-[15px] md:text-sm text-[var(--text-body)] leading-[1.65]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <Link href="/website-development-with-seo" className="btn-primary text-[15px]">
            Know More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-outline text-sm"
          >
            Get Free Audit
          </button>
        </motion.div>

        {/* Audit card */}
        <motion.div
          className="rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(45,212,191,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <div className="flex flex-col lg:flex-row gap-10 p-8 lg:p-12">

            {/* Left */}
            <div className="flex flex-col gap-6 lg:w-[55%]">
              <div className="flex flex-col gap-3">
                <span className="section-label text-[var(--accent-indigo)]">Free — No Commitment</span>
                <h2
                  className="text-white font-semibold tracking-[-0.04em] leading-[1.1]"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}
                >
                  Get a free 48-hour SEO visibility audit.
                </h2>
                <p className="text-[var(--text-body)] text-base md:text-[15px] leading-[1.7] max-w-[48ch]">
                  Before you hire anyone, see exactly where you stand. We&apos;ll analyze your site and deliver
                  a custom report within 48 hours — completely free.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn-primary text-[15px]"
                >
                  Get Your Free Audit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <Link href="/pricing" className="btn-outline text-sm">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Right — what's included */}
            <div className="flex flex-col gap-4 lg:w-[45%]">
              <span className="text-[var(--text-faint)] text-[11px] font-bold tracking-[0.1em] uppercase">
                What you&apos;ll receive
              </span>
              {AUDIT_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
                >
                  <span className="shrink-0 mt-1 flex items-center justify-center rounded-full w-5 h-5 bg-[var(--accent-indigo)]/20 text-[var(--accent-indigo)] text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-secondary)] text-[15px] md:text-sm leading-[1.55]">{item}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      {modalOpen && <AuditModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
