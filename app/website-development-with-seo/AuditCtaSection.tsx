"use client";

import { useEffect, useState } from "react";
import { COUNTRY_CODES, validatePhone, findCountryByCode } from "@/lib/country-codes";

const INDIGO = "rgb(99,102,241)";

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
              style={{ width: 56, height: 56, backgroundColor: INDIGO, fontSize: 24 }}
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
                  onFocus={(e) => (e.target.style.borderColor = INDIGO)}
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
                  onFocus={(e) => (e.target.style.borderColor = INDIGO)}
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
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
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
                    onFocus={(e) => (e.target.style.borderColor = phoneError ? "rgb(239,68,68)" : INDIGO)}
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
                  onFocus={(e) => (e.target.style.borderColor = INDIGO)}
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
                style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "13px 0" }}
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

export default function AuditCtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="section-padding max-w-[700px] mx-auto flex flex-col items-center text-center gap-6">
      <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
        Ready to build a website that ranks?
      </h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: "42ch", lineHeight: 1.6 }}>
        No commitment. Tell us about your project and we will show you exactly how we would approach your website development with SEO from day one.
      </p>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-full text-white hover:brightness-110 transition-all"
        style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "14px 32px" }}
      >
        Get a Free Consultation
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </button>

      {modalOpen && <AuditModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
