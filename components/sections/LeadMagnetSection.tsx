"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const AUDIT_ITEMS = [
  "Your top 20 commercial-intent keywords — and where you actually rank",
  "Technical SEO health score — indexing issues, speed, mobile-usability",
  "Your content gap map — pages that should exist and don't",
  "Competitor comparison — domain authority vs your 3 closest competitors",
];

export default function LeadMagnetSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto">
        <motion.div
          className="rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(45,212,191,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
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
                <p className="text-[var(--text-body)] text-[15px] leading-[1.7] max-w-[48ch]">
                  Before you hire anyone, see exactly where you stand. We&apos;ll analyze your site and deliver
                  a custom report within 48 hours — completely free.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/contact?plan=seo-audit"
                  className="btn-primary text-[15px]"
                >
                  Get Your Free Audit
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="btn-outline text-sm"
                >
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
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
                >
                  <span className="shrink-0 mt-1 flex items-center justify-center rounded-full w-5 h-5 bg-[var(--accent-indigo)]/20 text-[var(--accent-indigo)] text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-secondary)] text-sm leading-[1.55]">{item}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
