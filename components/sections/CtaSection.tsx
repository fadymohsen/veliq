"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_ALT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TYPEWRITER_WORDS = [
  "a new website?",
  "mobile app development?",
  "better SEO rankings?",
  "a stronger brand identity?",
  "data & analytics?",
  "digital marketing?",
];

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[wordIndex];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === word.length) {
      setPaused(true);
      return;
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPEWRITER_WORDS.length);
    }
  }, [displayed, deleting, wordIndex, paused]);

  return (
    <span className="text-white">
      {displayed}
      <span className="text-white/50 animate-pulse ml-[1px]">|</span>
    </span>
  );
}

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black rounded-[12px] overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center px-6 py-20 gap-12">

        <div className="flex flex-col items-center gap-5 text-center">
          <motion.p
            className="text-[var(--text-secondary)] uppercase tracking-[0.18em] text-xs font-semibold"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE_ALT }}
          >
            Ready to begin?
          </motion.p>
          <motion.h2
            className="text-white text-center font-semibold leading-[1.05] tracking-[-0.05em] max-w-[14ch]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Let&apos;s build something extraordinary.
          </motion.h2>
        </div>

        {/* Indigo pill */}
        <motion.div
          className="flex items-center justify-between gap-4 rounded-full pl-7 pr-2 py-2 w-full max-w-[600px] bg-[var(--accent-indigo)]"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div className="flex-1 overflow-hidden text-base font-medium">
            <span className="text-white/70">Need </span>
            <TypewriterText />
          </div>
          <Button
            label="Contact us"
            href="/contact"
            bgColor="rgb(0,0,0)"
            textColor="rgb(255,255,255)"
          />
        </motion.div>

        <motion.p
          className="text-[var(--text-secondary)] text-center text-sm max-w-[36ch]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE_ALT }}
        >
          No commitment. Just a conversation. We&apos;ll get back to you within 24 hours.
        </motion.p>
      </div>
    </section>
  );
}
