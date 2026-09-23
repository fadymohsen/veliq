"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SERVICES = [
  "Website Development",
  "Website Support",
  "SEO",
  "Mobile Application",
  "Not sure yet",
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [formLoadedAt, setFormLoadedAt] = useState(0);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setError("");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setWebsite("");
    }, 300);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      setForm((f) => ({ ...f, service: detail?.service ?? "" }));
      setFormLoadedAt(Date.now());
      setOpen(true);
    };
    window.addEventListener("veliq:open-popup", handler);
    return () => window.removeEventListener("veliq:open-popup", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  // Focus first input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, formLoadedAt }),
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

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-white text-[14px] outline-none transition-all duration-200 placeholder:text-white/30";
  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
  const inputFocusClass = "focus:border-[rgba(99,102,241,0.6)] focus:bg-[rgba(99,102,241,0.04)] focus:ring-1 focus:ring-[rgba(99,102,241,0.15)]";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6 pointer-events-none"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div
              className="relative pointer-events-auto w-full max-w-[520px] rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: "rgb(12,12,14)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 0 80px rgba(99,102,241,0.08), 0 24px 48px rgba(0,0,0,0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent gradient bar */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, rgb(168,85,247), rgb(99,102,241), rgb(34,211,238))" }}
              />

              {/* Close button */}
              <button
                onClick={close}
                className="absolute top-5 right-5 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 pt-7">
                {sent ? (
                  /* Success state */
                  <div className="flex flex-col items-center gap-5 py-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.15))",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(129,140,248)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white font-semibold" style={{ fontSize: "20px", letterSpacing: "-0.03em" }}>
                        Message sent!
                      </h3>
                      <p className="text-white/40" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={close}
                      className="mt-2 rounded-full text-white font-medium px-8 py-2.5 text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, rgb(168,85,247), rgb(99,102,241))",
                        boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                      }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex flex-col gap-2 mb-7">
                      <h2 className="text-white font-semibold" style={{ fontSize: "24px", letterSpacing: "-0.04em" }}>
                        Let&apos;s talk.
                      </h2>
                      <p className="text-white/35" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                        Tell us what you need — we&apos;ll reply within 24 hours.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
                      {/* Honeypot */}
                      <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        style={{ display: "none" }}
                        tabIndex={-1}
                        aria-hidden
                        autoComplete="off"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <input
                          ref={firstInputRef}
                          type="text"
                          placeholder="Your name *"
                          required
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className={`${inputBase} ${inputFocusClass}`}
                          style={inputStyle}
                        />
                        <input
                          type="email"
                          placeholder="Email address *"
                          required
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={`${inputBase} ${inputFocusClass}`}
                          style={inputStyle}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <input
                          type="tel"
                          placeholder="Phone (optional)"
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          className={`${inputBase} ${inputFocusClass}`}
                          style={inputStyle}
                        />
                        <select
                          value={form.service}
                          onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                          className={`${inputBase} ${inputFocusClass}`}
                          style={{ ...inputStyle, color: form.service ? "white" : "rgba(255,255,255,0.3)" }}
                        >
                          <option value="" disabled>Service interested in</option>
                          {SERVICES.map((s) => (
                            <option key={s} value={s} style={{ color: "white", backgroundColor: "rgb(18,18,18)" }}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <textarea
                        placeholder="Tell us about your project *"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className={`${inputBase} ${inputFocusClass} resize-none`}
                        style={inputStyle}
                      />

                      {error && (
                        <p className="text-red-400 text-[13px]">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full rounded-xl text-white font-semibold py-3.5 text-[14px] transition-all duration-200 hover:shadow-lg disabled:opacity-60 mt-1 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg, rgb(168,85,247), rgb(99,102,241))",
                          boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
                        }}
                      >
                        {sending ? "Sending…" : "Send message"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
