"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "min(800px, 120vw)",
            height: "min(800px, 120vw)",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-24 text-center max-w-[860px]">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Image
            src="/branding/colored-logo.png"
            alt="VELIQ"
            width={180}
            height={58}
            priority
            className="object-contain"
            style={{ height: "clamp(36px, 6vw, 52px)", width: "auto" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="text-white font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.2rem, 7vw, 5rem)" }}
        >
          Websites that rank,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--accent-indigo), var(--accent-purple), var(--accent-teal))",
            }}
          >
            convert, and grow.
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="text-[var(--text-muted)] tracking-[-0.01em] leading-[1.7]"
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            maxWidth: "48ch",
          }}
        >
          We build SEO-optimized websites and provide ongoing support
          — so your business gets found, wins trust, and scales online.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        >
          <Link href="/contact" className="btn-primary text-[15px]">
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/projects" className="btn-outline">
            View Our Work
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
        >
          {["10+ Projects Delivered", "Clients across 4 Countries", "SEO & Development"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-[var(--accent-indigo)]" />
              <span className="text-[13px] text-[var(--text-dim)] tracking-[-0.01em]">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.div
          className="rounded-full w-6 h-[38px] border-[1.5px] border-white/15"
        >
          <motion.div
            className="mx-auto mt-2 rounded-full w-[3px] h-2 bg-white/30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
