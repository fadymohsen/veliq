"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_ALT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TESTIMONIALS = [
  {
    quote: "VELIQ transformed our online presence. Their software expertise paired with sharp marketing strategy doubled our customer acquisition in just six months.",
    name: "Sarah Mitchell",
    role: "CEO at BrightPath",
    initials: "SM",
    accent: "var(--accent-indigo)",
  },
  {
    quote: "Working with VELIQ felt like having an in-house team. They understood our vision from day one and delivered a platform that exceeded every expectation.",
    name: "Khaled Mansour",
    role: "Founder of NovaTech",
    initials: "KM",
    accent: "var(--accent-sky)",
  },
  {
    quote: "Our mobile app went from concept to launch in record time. The quality of code and design was outstanding — our users love it.",
    name: "Lina Farouk",
    role: "Product Lead at Meridian",
    initials: "LF",
    accent: "var(--accent-teal)",
  },
  {
    quote: "Their SEO and marketing campaigns brought us from page 5 to the top 3 results. The ROI has been incredible — we've tripled our organic leads.",
    name: "James Carter",
    role: "CMO at Atlas Digital",
    initials: "JC",
    accent: "rgb(251,146,60)",
  },
  {
    quote: "VELIQ doesn't just build software — they build partnerships. Two years in and they still feel as invested in our success as day one.",
    name: "Dina Rashad",
    role: "COO at Skyline Group",
    initials: "DR",
    accent: "var(--accent-pink)",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  const go = useCallback((index: number, direction: 1 | -1) => {
    setDir(direction);
    setActive(index);
  }, []);

  const next = useCallback(() => {
    go((active + 1) % TESTIMONIALS.length, 1);
  }, [active, go]);

  const prev = useCallback(() => {
    go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1);
  }, [active, go]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const t = TESTIMONIALS[active];

  return (
    <section
      ref={ref}
      className="w-full bg-black section-padding"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16">

        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_ALT }}
        >
          <h2 className="heading-1 text-white">What clients say.</h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="flex items-center justify-center rounded-full w-11 h-11 text-white border border-[var(--border-hover)] transition-colors hover:bg-white/10"
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2.5L4 7l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="flex items-center justify-center rounded-full w-11 h-11 text-white border border-[var(--border-hover)] transition-colors hover:bg-white/10"
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 2.5L10 7l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative overflow-hidden rounded-[24px] bg-[var(--surface-card-alt)] border border-[rgb(24,24,24)] min-h-[280px]"
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 left-0 w-full h-[3px] pointer-events-none transition-all duration-500"
            style={{ background: `linear-gradient(90deg, ${t.accent} 0%, transparent 60%)` }}
          />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex flex-col md:flex-row gap-10 p-10 md:p-14 items-start"
            >
              <span
                className="select-none shrink-0 font-black leading-[0.8] -mt-1"
                style={{ fontSize: "6rem", color: t.accent, opacity: 0.25 }}
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="flex flex-col gap-8 flex-1">
                <blockquote
                  className="text-white font-medium leading-[1.6] tracking-[-0.02em] max-w-[60ch]"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                >
                  {t.quote}
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center rounded-full text-white shrink-0 w-11 h-11 text-sm font-bold"
                    style={{ backgroundColor: t.accent }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-[15px] font-bold tracking-[-0.02em]">
                      {t.name}
                    </span>
                    <span className="text-[var(--text-subtle)] text-[13px]">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center gap-2 justify-center">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                backgroundColor: i === active ? "var(--accent-indigo)" : "var(--border-hover)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
