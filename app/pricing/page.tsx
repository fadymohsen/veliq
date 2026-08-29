"use client";

import { useState, useRef } from "react";
import Footer from "@/components/sections/Footer";

const SERVICES = [
  "Website Development",
  "Website Support / Maintenance",
  "SEO",
  "Web Application",
  "Mobile Application",
];

const INDIGO = "rgb(99,102,241)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgb(10,10,10)",
  border: "1px solid rgb(30,30,30)",
  borderRadius: 12,
  padding: "14px 18px",
  fontSize: 15,
  color: "white",
  outline: "none",
  transition: "border-color 0.15s",
};

export default function PricingPage() {
  const formLoadedAt = useRef(Date.now());

  const [fields, setFields] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [contactVia, setContactVia] = useState<string[]>([]);
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleService(s: string) {
    setServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function toggleContactVia(v: string) {
    setContactVia((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.phone) {
      setErrorMsg("Please fill in Name, Email, and Phone.");
      return;
    }
    if (services.length === 0) {
      setErrorMsg("Please select at least one service.");
      return;
    }
    if (contactVia.length === 0) {
      setErrorMsg("Please choose how we should contact you.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          services,
          contactVia,
          formLoadedAt: formLoadedAt.current,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error("Server error");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly at admin@veliq.co");
    }
  }

  const focusBorder = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === name ? "rgba(99,102,241,0.6)" : "rgb(30,30,30)",
  });

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[640px] mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center pt-4">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-1"
            style={{ backgroundColor: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: INDIGO, textTransform: "uppercase" }}>
              Get a Quote
            </span>
          </div>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            Let&apos;s talk about your project.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 460 }}>
            Tell us what you&apos;re building and how to reach you — we&apos;ll get back to you within one business day.
          </p>
        </div>

        {/* Form */}
        {status === "success" ? (
          <div
            className="flex flex-col items-center gap-5 rounded-[20px] p-10 text-center"
            style={{ backgroundColor: "rgb(10,10,10)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, backgroundColor: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>
                We&apos;ve got your details.
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                Expect to hear from us within one business day via your preferred contact method.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-[20px] p-8"
            style={{ backgroundColor: "rgb(10,10,10)", border: "1px solid rgb(22,22,22)" }}
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                Name <span style={{ color: INDIGO }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={fields.name}
                onChange={(e) => setFields((p) => ({ ...p, name: e.target.value }))}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                style={focusBorder("name")}
              />
            </div>

            {/* Business Name */}
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                Business Name
              </label>
              <input
                type="text"
                placeholder="Your company or brand name"
                value={fields.businessName}
                onChange={(e) => setFields((p) => ({ ...p, businessName: e.target.value }))}
                onFocus={() => setFocused("businessName")}
                onBlur={() => setFocused(null)}
                style={focusBorder("businessName")}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                Phone Number (WhatsApp) <span style={{ color: INDIGO }}>*</span>
              </label>
              <input
                type="tel"
                placeholder="+20 100 000 0000"
                value={fields.phone}
                onChange={(e) => setFields((p) => ({ ...p, phone: e.target.value }))}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
                style={focusBorder("phone")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                Email Address <span style={{ color: INDIGO }}>*</span>
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={fields.email}
                onChange={(e) => setFields((p) => ({ ...p, email: e.target.value }))}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={focusBorder("email")}
              />
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                Services <span style={{ color: INDIGO }}>*</span>
              </label>
              <div className="flex flex-col gap-2">
                {SERVICES.map((s) => {
                  const checked = services.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                      style={{
                        backgroundColor: checked ? "rgba(99,102,241,0.08)" : "rgb(14,14,14)",
                        border: checked ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgb(28,28,28)",
                      }}
                    >
                      <span
                        className="shrink-0 flex items-center justify-center rounded"
                        style={{
                          width: 18,
                          height: 18,
                          backgroundColor: checked ? INDIGO : "transparent",
                          border: checked ? "none" : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.15s",
                        }}
                      >
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: checked ? "white" : "rgba(255,255,255,0.55)" }}>
                        {s}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact preference */}
            <div className="flex flex-col gap-3">
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em" }}>
                How should we contact you? <span style={{ color: INDIGO }}>*</span>
              </label>
              <div className="flex gap-3">
                {["Email", "WhatsApp / Phone"].map((v) => {
                  const checked = contactVia.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggleContactVia(v)}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-3 flex-1 transition-all"
                      style={{
                        backgroundColor: checked ? "rgba(99,102,241,0.08)" : "rgb(14,14,14)",
                        border: checked ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgb(28,28,28)",
                      }}
                    >
                      <span
                        className="shrink-0 flex items-center justify-center rounded"
                        style={{
                          width: 18,
                          height: 18,
                          backgroundColor: checked ? INDIGO : "transparent",
                          border: checked ? "none" : "1px solid rgba(255,255,255,0.2)",
                          transition: "all 0.15s",
                        }}
                      >
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: checked ? "white" : "rgba(255,255,255,0.55)" }}>
                        {v}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error */}
            {errorMsg && (
              <p style={{ fontSize: 13, color: "rgb(248,113,113)" }}>{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all hover:brightness-110 disabled:opacity-50"
              style={{ backgroundColor: INDIGO, fontSize: 15, fontWeight: 600, padding: "15px 0", marginTop: 4 }}
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Request
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

      </section>
      <Footer />
    </main>
  );
}
