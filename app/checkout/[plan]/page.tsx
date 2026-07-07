"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

type PlanInfo = {
  name: string;
  price: string;
  suffix: string;
  features: string[];
  category: string;
};

const PLANS: Record<string, PlanInfo> = {
  // Homepage plans
  "design-support": {
    name: "Design Support",
    price: "$1,999",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["One active request at a time", "2-day average turnaround", "Social media & Ad creatives"],
  },
  "web-and-growth": {
    name: "Web & Growth",
    price: "$4,499",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["Two active requests at a time", "Website development & updates", "Landing page optimization", "Basic SEO setup", "Presentation decks", "Stock photo sourcing"],
  },
  "agency-partner": {
    name: "Agency Partner",
    price: "$8,999",
    suffix: "/ Month",
    category: "Monthly Plan",
    features: ["Four active requests at a time", "Priority support via Slack", "Unlimited brands", "Advanced 3D & Motion graphics", "Strategy workshops", "Weekly sync calls", "Dedicated Project Manager", "Same-day turnaround on small tasks"],
  },
  // Website packages — without hosting
  "simple-website": {
    name: "Simple Website",
    price: "2,500 - 5,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup"],
  },
  "portfolio-website": {
    name: "Portfolio Website",
    price: "5,000 - 10,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design"],
  },
  "ecommerce-website": {
    name: "E-Commerce Website",
    price: "10,000 - 15,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard"],
  },
  "services-and-store": {
    name: "Services & Store",
    price: "15,000 - 20,000",
    suffix: "EGP",
    category: "Website Package",
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard"],
  },
  // Website packages — with hosting
  "simple-website-hosting": {
    name: "Simple Website (with Hosting)",
    price: "4,500 - 7,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Up to 5 pages", "Responsive design", "Contact form", "Basic SEO setup", "Domain & hosting included"],
  },
  "portfolio-website-hosting": {
    name: "Portfolio Website (with Hosting)",
    price: "10,000 - 16,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Custom portfolio layout", "Project showcase gallery", "Animated transitions", "Mobile-first design", "Domain & hosting included"],
  },
  "ecommerce-website-hosting": {
    name: "E-Commerce Website (with Hosting)",
    price: "18,000 - 25,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Product catalog & management", "Shopping cart & checkout", "Payment gateway integration", "Order management dashboard", "Domain & hosting included"],
  },
  "services-and-store-hosting": {
    name: "Services & Store (with Hosting)",
    price: "25,000 - 35,000",
    suffix: "EGP",
    category: "Website Package + Hosting",
    features: ["Service listings & booking", "Online payments & invoicing", "Integrated store", "Admin dashboard", "Domain & hosting included"],
  },
  // Support plans
  "basic-support": {
    name: "Basic Support",
    price: "500 - 2,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Simple bug fixing & quick patches", "Image & content edits on request", "Website uptime & health monitoring", "Technical guidance & consultations"],
  },
  "basic-support-seo": {
    name: "Basic Support + SEO",
    price: "2,000 - 5,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Basic Support plan", "Technical SEO audits & reporting", "On-page optimization & corrections", "Core Web Vitals & performance fixes"],
  },
  "professional-support": {
    name: "Professional Support",
    price: "5,000 - 8,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Basic Support plan", "Full implementation of requirements", "Design & build new website pages", "Priority response & fast delivery"],
  },
  "professional-seo": {
    name: "Professional + SEO",
    price: "8,000 - 12,000",
    suffix: "EGP / month",
    category: "Maintenance Plan",
    features: ["Everything in Professional Support", "SEO issue fixing & technical fixes", "Core Web Vitals & indexing issues", "On-page SEO corrections & audits"],
  },
  // SEO
  "seo-package": {
    name: "SEO Package",
    price: "35,000",
    suffix: "EGP",
    category: "SEO Service (3-Month Engagement)",
    features: ["Keyword Research & Strategy", "On-Page SEO", "Technical SEO", "Off-Page & Backlinks", "AI & Answer Optimization", "Monthly Reports & Analytics"],
  },
};

const COUNTRIES = [
  { name: "Egypt", code: "+20", flag: "\u{1F1EA}\u{1F1EC}", minLen: 11, maxLen: 11 },
  { name: "Saudi Arabia", code: "+966", flag: "\u{1F1F8}\u{1F1E6}", minLen: 9, maxLen: 9 },
  { name: "UAE", code: "+971", flag: "\u{1F1E6}\u{1F1EA}", minLen: 9, maxLen: 9 },
  { name: "Kuwait", code: "+965", flag: "\u{1F1F0}\u{1F1FC}", minLen: 8, maxLen: 8 },
  { name: "Qatar", code: "+974", flag: "\u{1F1F6}\u{1F1E6}", minLen: 8, maxLen: 8 },
  { name: "Bahrain", code: "+973", flag: "\u{1F1E7}\u{1F1ED}", minLen: 8, maxLen: 8 },
  { name: "Oman", code: "+968", flag: "\u{1F1F4}\u{1F1F2}", minLen: 8, maxLen: 8 },
  { name: "Jordan", code: "+962", flag: "\u{1F1EF}\u{1F1F4}", minLen: 9, maxLen: 9 },
  { name: "Lebanon", code: "+961", flag: "\u{1F1F1}\u{1F1E7}", minLen: 7, maxLen: 8 },
  { name: "Iraq", code: "+964", flag: "\u{1F1EE}\u{1F1F6}", minLen: 10, maxLen: 10 },
  { name: "Morocco", code: "+212", flag: "\u{1F1F2}\u{1F1E6}", minLen: 9, maxLen: 9 },
  { name: "United States", code: "+1", flag: "\u{1F1FA}\u{1F1F8}", minLen: 10, maxLen: 10 },
  { name: "United Kingdom", code: "+44", flag: "\u{1F1EC}\u{1F1E7}", minLen: 10, maxLen: 10 },
  { name: "Turkey", code: "+90", flag: "\u{1F1F9}\u{1F1F7}", minLen: 10, maxLen: 10 },
];

type Country = (typeof COUNTRIES)[number];

const INDIGO = "rgb(99,102,241)";

function averagePrice(price: string): string {
  const match = price.match(/^([^\d]*)([\d,]+)\s*-\s*([\d,]+)$/);
  if (!match) return price;
  const [, prefix, from, to] = match;
  const avg = (parseInt(from.replace(/,/g, ""), 10) + parseInt(to.replace(/,/g, ""), 10)) / 2;
  return `${prefix}${Math.round(avg).toLocaleString()}`;
}

const PAYMENT_METHODS = [
  {
    id: "instapay" as const,
    label: "InstaPay",
    sub: "Instant bank transfer",
    note: "You'll get InstaPay transfer details (handle & reference code) by email right after you submit.",
  },
  {
    id: "fawterak" as const,
    label: "Fawterak",
    sub: "Cards, wallets & Fawry",
    note: "You'll receive a secure Fawterak payment link (cards, wallets & Fawry outlets) by email right after you submit.",
  },
];

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="#fff" aria-hidden>
      <path d="M16.004 2.667C8.652 2.667 2.67 8.648 2.67 16c0 2.92.95 5.62 2.56 7.81l-1.677 4.997 5.17-1.653A13.27 13.27 0 0 0 16.004 29.33C23.356 29.33 29.337 23.35 29.337 16S23.356 2.667 16.004 2.667zm7.77 18.84c-.323.91-1.6 1.665-2.62 1.885-.697.148-1.608.267-4.673-1.003-3.92-1.624-6.444-5.607-6.64-5.866-.19-.26-1.586-2.11-1.586-4.025 0-1.915 1.005-2.857 1.36-3.247.293-.323.776-.47 1.24-.47.15 0 .285.008.407.014.357.015.536.036.77.597.293.703 1.003 2.418 1.088 2.594.086.176.143.382.024.617-.11.235-.207.345-.382.53-.176.184-.343.326-.518.524-.16.176-.34.366-.146.7.193.327.86 1.418 1.847 2.297 1.27 1.13 2.34 1.48 2.71 1.636.27.114.59.087.79-.103.252-.243.56-.645.873-1.04.222-.282.503-.317.79-.21.293.103 1.85.873 2.168 1.032.317.16.527.235.604.367.077.132.077.762-.246 1.673z" />
    </svg>
  );
}

const WHATSAPP_PHONE = "201551164671";

export default function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: planSlug } = use(params);
  const baseSlug = planSlug.replace(/-hosting$/, "");
  const hasHostingOption = Boolean(PLANS[baseSlug]) && Boolean(PLANS[`${baseSlug}-hosting`]);

  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", notes: "" });
  const [paymentMethod, setPaymentMethod] = useState<"instapay" | "fawterak" | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [withHosting, setWithHosting] = useState(planSlug.endsWith("-hosting"));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeSlug = hasHostingOption ? (withHosting ? `${baseSlug}-hosting` : baseSlug) : planSlug;
  const planInfo = PLANS[activeSlug];

  const detailsComplete =
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim().length >= selectedCountry.minLen;
  const paymentComplete = paymentMethod !== null;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!planInfo) {
    return (
      <main className="bg-black min-h-screen pt-16">
        <section className="section-padding max-w-[600px] mx-auto flex flex-col gap-6 items-center text-center">
          <h1 className="heading-1 text-white">Plan not found.</h1>
          <p className="para-18" style={{ color: "rgba(255,255,255,0.5)" }}>
            The plan you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full text-white font-semibold hover:brightness-110 transition-all"
            style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px" }}
          >
            View Pricing
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = "Name is required (min 2 characters).";
    if (!form.phone.trim() || form.phone.trim().length < selectedCountry.minLen) {
      newErrors.phone = `Enter a valid ${selectedCountry.minLen}-digit number.`;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!paymentMethod) newErrors.payment = "Choose a payment method.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim() || null,
          phone: `${selectedCountry.code} ${form.phone.trim()}`,
          email: form.email.trim(),
          notes: form.notes.trim() || null,
          plan: planInfo.name,
          planDetails: `${planInfo.category} — ${averagePrice(planInfo.price)} ${planInfo.suffix}`,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[900px] mx-auto">

        {/* Back link */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 mb-10 transition-colors hover:text-white"
          style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to Pricing
        </Link>

        {submitted ? (
          /* Success */
          <div
            className="flex flex-col gap-5 items-center justify-center rounded-[20px] p-16 text-center"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, backgroundColor: "rgba(99,102,241,0.15)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-white" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em" }}>
              You&apos;re all set!
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: "36ch", lineHeight: 1.6 }}>
              Thanks for choosing <span className="text-white font-medium">{planInfo.name}</span>. We&apos;ve received your request and will get back to you within 24 hours.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
              Check your inbox — a confirmation email is on its way.
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex rounded-full text-white font-semibold hover:brightness-110 transition-all"
              style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "12px 28px" }}
            >
              Back to Home
            </Link>
          </div>
        ) : (
          /* Checkout form */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left — Order summary */}
            <div className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <div
                className="rounded-[20px] p-7 flex flex-col gap-5"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {planInfo.category}
                  </span>
                  <h2 className="text-white mt-1" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>
                    {planInfo.name.replace(/\s*\(with Hosting\)/i, "")}
                  </h2>
                </div>

                {hasHostingOption && (
                  <div
                    className="flex items-center rounded-full p-[3px] self-start"
                    style={{ backgroundColor: "rgb(20,20,20)", border: "1px solid rgb(34,34,34)" }}
                  >
                    <button
                      type="button"
                      onClick={() => setWithHosting(false)}
                      className="rounded-full px-3.5 py-2 text-xs font-medium transition-all"
                      style={{
                        backgroundColor: !withHosting ? INDIGO : "transparent",
                        color: !withHosting ? "white" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      Without Domain & Hosting
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithHosting(true)}
                      className="rounded-full px-3.5 py-2 text-xs font-medium transition-all"
                      style={{
                        backgroundColor: withHosting ? INDIGO : "transparent",
                        color: withHosting ? "white" : "rgba(255,255,255,0.45)",
                      }}
                    >
                      With Domain & Hosting
                    </button>
                  </div>
                )}

                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                <div className="flex flex-col gap-3">
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                    What&apos;s included
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {planInfo.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="shrink-0 mt-[5px]" style={{ display: "inline-block", width: 2, height: 12, borderRadius: 2, backgroundColor: "rgb(255,210,0)" }} />
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                {/* Discount code */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-[rgb(20,20,20)] text-white rounded-[10px] px-4 py-3 text-sm outline-none border transition-colors"
                      style={{ borderColor: "rgb(40,40,40)" }}
                      onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                      onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                    />
                    <button
                      type="button"
                      disabled
                      className="rounded-[10px] px-4 text-sm font-semibold disabled:cursor-not-allowed"
                      style={{ backgroundColor: "rgb(28,28,28)", color: "rgba(255,255,255,0.35)" }}
                    >
                      Apply
                    </button>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Discount codes coming soon.</span>
                </div>

                <div className="w-full h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

                {/* Price breakdown */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Subtotal</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{averagePrice(planInfo.price)} {planInfo.suffix}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Discount</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>—</span>
                  </div>
                  <div className="w-full h-px my-1" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                  <div className="flex items-baseline justify-between">
                    <span className="text-white" style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                    <span className="text-white" style={{ fontSize: 22, fontWeight: 700 }}>
                      {averagePrice(planInfo.price)} <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>{planInfo.suffix}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div
                className="flex flex-col gap-3 rounded-[16px] p-5"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                {[
                  { icon: <LockIcon />, label: "Secure checkout, encrypted end-to-end" },
                  { icon: <ShieldIcon />, label: "Payments handled via InstaPay & Fawterak" },
                  { icon: <ClockIcon />, label: "We respond within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: 26, height: 26, backgroundColor: "rgba(99,102,241,0.12)", color: INDIGO }}>
                      {item.icon}
                    </span>
                    <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Policies */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Refund Policy", href: "/legal/refund" },
                  { label: "Terms & Conditions", href: "/legal/terms" },
                  { label: "Privacy Policy", href: "/legal/privacy" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
                    className="hover:text-white transition-colors underline underline-offset-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-[20px] p-8"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
              >
                <h3 className="text-white" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>
                  Complete your order
                </h3>

                {/* Step progress */}
                <div className="flex items-center gap-2 -mt-1 mb-1">
                  {[
                    { label: "Your Details", done: detailsComplete },
                    { label: "Payment", done: paymentComplete },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2" style={{ flex: i === 0 ? "0 0 auto" : "1 1 auto" }}>
                      {i > 0 && (
                        <div
                          className="h-px flex-1"
                          style={{ minWidth: 24, backgroundColor: detailsComplete ? INDIGO : "rgb(40,40,40)" }}
                        />
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className="flex shrink-0 items-center justify-center rounded-full text-white"
                          style={{
                            width: 20,
                            height: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            backgroundColor: step.done ? INDIGO : "rgb(28,28,28)",
                            border: step.done ? "none" : "1px solid rgb(48,48,48)",
                          }}
                        >
                          {step.done ? (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: step.done ? "white" : "rgba(255,255,255,0.4)" }}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Full Name <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: errors.name ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = errors.name ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                  />
                  {errors.name && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.name}</p>}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Company / Agency <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Your company name"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Phone Number <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setCountryOpen(!countryOpen)}
                        className="flex h-full items-center gap-2 rounded-[12px] bg-[rgb(20,20,20)] px-3 py-4 text-sm text-white border transition-colors hover:border-[rgb(60,60,60)]"
                        style={{ borderColor: "rgb(40,40,40)" }}
                      >
                        <span>{selectedCountry.flag}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{selectedCountry.code}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      {countryOpen && (
                        <div
                          className="absolute left-0 top-full z-50 mt-1 max-h-56 w-52 overflow-y-auto rounded-[12px] shadow-2xl"
                          style={{ backgroundColor: "rgb(16,16,16)", border: "1px solid rgb(40,40,40)" }}
                        >
                          {COUNTRIES.map((c) => (
                            <button
                              key={`${c.name}-${c.code}`}
                              type="button"
                              onClick={() => { setSelectedCountry(c); setCountryOpen(false); setForm((f) => ({ ...f, phone: "" })); }}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5"
                              style={{ color: selectedCountry.name === c.name ? INDIGO : "rgba(255,255,255,0.7)" }}
                            >
                              <span>{c.flag}</span>
                              <span className="flex-1 truncate">{c.name}</span>
                              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= selectedCountry.maxLen) setForm({ ...form, phone: val });
                      }}
                      placeholder={"0".repeat(selectedCountry.minLen)}
                      className="flex-1 bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                      style={{ borderColor: errors.phone ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                      onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                      onBlur={(e) => (e.target.style.borderColor = errors.phone ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                    />
                  </div>
                  {errors.phone && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Email Address <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors"
                    style={{ borderColor: errors.email ? "rgb(239,68,68)" : "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? "rgb(239,68,68)" : "rgb(40,40,40)")}
                  />
                  {errors.email && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.email}</p>}
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Additional Notes <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Tell us about your project or any specific requirements..."
                    className="bg-[rgb(20,20,20)] text-white rounded-[12px] px-5 py-4 text-sm outline-none border transition-colors resize-none"
                    style={{ borderColor: "rgb(40,40,40)" }}
                    onFocus={(e) => (e.target.style.borderColor = INDIGO)}
                    onBlur={(e) => (e.target.style.borderColor = "rgb(40,40,40)")}
                  />
                </div>

                {/* Payment method */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Payment Method <span style={{ color: INDIGO }}>*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((method) => {
                      const active = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setPaymentMethod(method.id);
                            if (method.id === "instapay") setShowReceiptModal(true);
                          }}
                          className="flex items-center gap-3 rounded-[12px] px-4 py-4 text-left transition-colors"
                          style={{
                            backgroundColor: active ? "rgba(99,102,241,0.1)" : "rgb(20,20,20)",
                            border: `1px solid ${active ? INDIGO : "rgb(40,40,40)"}`,
                          }}
                        >
                          <span className="flex flex-col flex-1">
                            <span className="text-white" style={{ fontSize: 14, fontWeight: 600 }}>{method.label}</span>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{method.sub}</span>
                          </span>
                          <span
                            className="flex shrink-0 items-center justify-center rounded-full"
                            style={{
                              width: 18,
                              height: 18,
                              border: `1.5px solid ${active ? INDIGO : "rgba(255,255,255,0.25)"}`,
                            }}
                          >
                            {active && (
                              <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: INDIGO }} />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {paymentMethod && (
                    <div
                      className="flex items-start gap-2.5 rounded-[10px] px-4 py-3"
                      style={{ backgroundColor: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}
                    >
                      <span className="shrink-0 mt-0.5" style={{ color: INDIGO }}><LockIcon /></span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                        {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.note}
                      </span>
                    </div>
                  )}
                  {errors.payment && <p style={{ fontSize: 12, color: "rgb(239,68,68)" }}>{errors.payment}</p>}
                </div>

                {errors.submit && (
                  <p
                    className="rounded-[12px] px-4 py-3 text-sm"
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(239,68,68)" }}
                  >
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-full text-white font-semibold transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "14px 0" }}
                >
                  {submitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 -mt-2" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  <LockIcon /> Your information is encrypted and never shared.
                </p>
              </form>
            </div>
          </div>
        )}

      </section>

      {/* InstaPay receipt popup */}
      {showReceiptModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setShowReceiptModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-[420px] flex-col items-center gap-4 rounded-[20px] p-8 text-center"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            <button
              type="button"
              onClick={() => setShowReceiptModal(false)}
              aria-label="Close"
              className="absolute top-4 right-4 flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ width: 28, height: 28, color: "rgba(255,255,255,0.4)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span
              className="flex items-center justify-center rounded-full"
              style={{ width: 56, height: 56, background: "linear-gradient(135deg, rgb(37,211,102), rgb(18,140,126))" }}
            >
              <WhatsAppIcon size={26} />
            </span>

            <h3 className="text-white" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Send your receipt on WhatsApp
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              After paying via InstaPay, send us a screenshot of the receipt on WhatsApp so we can confirm your order fast.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                `Hi VELIQ! I just paid via InstaPay for the "${planInfo.name}" plan. Here's my receipt:`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowReceiptModal(false)}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full text-white font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: "rgb(37,211,102)", fontSize: 14, fontWeight: 600, padding: "13px 0" }}
            >
              <WhatsAppIcon size={18} />
              Send Receipt on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setShowReceiptModal(false)}
              className="text-sm transition-colors hover:text-white"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}
            >
              I&apos;ll do it later
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
