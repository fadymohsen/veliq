"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EQ_FONT = "clamp(2.2rem, 4.8vw, 68px)";
const EQ_WEIGHT = 600;
const EQ_TRACKING = "-0.05em";

const CLIENT_LOGOS = [
  { name: "Coach Roshdy",   src: "/clients/coach-mohamed-roshdy.svg" },
  { name: "Initio",         src: "/clients/initio.svg" },
  { name: "Fanous Clinic",  src: "/clients/fanous-clinic.png" },
  { name: "Yamin Estate",   src: "/clients/yamin-estate.png" },
  { name: "RedBone Gym",    src: "/clients/redbone-gym.png" },
  { name: "Saudi Hayat",    src: "/clients/saudi-hayat.png" },
  { name: "Alfa Transport", src: "/logos/alfa-transport.png" },
  { name: "Coach Batool",   src: "/logos/coach-batool.png" },
  { name: "Enjaz Care",     src: "/logos/enjazcare.png" },
  { name: "Crewhub Studio", src: "/logos/crewhub-studio.png" },
];

const SERVICES = ["Web Design", "Mobile", "SEO", "Branding", "Marketing", "Data"];
const COUNTRIES = ["Egypt", "Saudi Arabia", "UAE", "United States"];

function Operator({ text, delay, inView }: { text: string; delay: number; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.15, rotate: -45 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 320, damping: 14, delay }}
      className="inline-block text-white/60"
      style={{ fontSize: EQ_FONT, fontWeight: EQ_WEIGHT, letterSpacing: EQ_TRACKING, lineHeight: 1.1 }}
    >
      {text}
    </motion.span>
  );
}

function Word({ text, wordDelay, inView, color = "white", glowColor }: {
  text: string; wordDelay: number; inView: boolean; color?: string; glowColor?: string;
}) {
  return (
    <span className="relative inline-flex">
      {glowColor && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: wordDelay + 0.3 }}
          className="absolute pointer-events-none rounded-full z-0"
          style={{ inset: "-40px -20px", background: glowColor, filter: "blur(50px)" }}
        />
      )}
      <span className="inline-flex overflow-hidden relative z-[1]" style={{ lineHeight: 1.15 }}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.6, delay: wordDelay + i * 0.022, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
            style={{ fontSize: EQ_FONT, fontWeight: EQ_WEIGHT, letterSpacing: EQ_TRACKING, lineHeight: 1.15, color }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-10">

        {/* Equation */}
        <div className="flex flex-col items-center text-center" style={{ gap: "clamp(2px,0.4vw,6px)" }}>
          <div className="flex flex-col items-center md:flex-row md:items-baseline justify-center md:flex-wrap" style={{ gap: "clamp(6px,0.9vw,14px)" }}>
            <Word text="Speed" color="var(--accent-indigo)" glowColor="rgba(99,102,241,0.4)" wordDelay={0} inView={inView} />
            <Operator text="×" delay={0.15} inView={inView} />
            <Word text="Accuracy" color="var(--accent-purple)" glowColor="rgba(168,85,247,0.4)" wordDelay={0.27} inView={inView} />
            <Operator text="×" delay={0.45} inView={inView} />
            <Word text="Professionalism" color="var(--accent-pink)" glowColor="rgba(236,72,153,0.4)" wordDelay={0.57} inView={inView} />
          </div>
          <div>
            <Operator text="=" delay={0.88} inView={inView} />
          </div>
          <div className="flex items-baseline justify-center" style={{ gap: "clamp(6px,0.9vw,14px)" }}>
            <Word text="Aligned" color="var(--accent-teal)" glowColor="rgba(45,212,191,0.4)" wordDelay={1.0} inView={inView} />
            <Word text="Growth." color="var(--accent-teal)" glowColor="rgba(45,212,191,0.4)" wordDelay={1.15} inView={inView} />
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Manifesto */}
          <motion.div
            className="lg:col-span-7 card-lg flex flex-col justify-between gap-10"
            style={{ padding: "clamp(24px,3vw,44px)", minHeight: "240px" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label">Who We Are</span>
            <p className="text-[var(--text-body-alt)] leading-[1.85]" style={{ fontSize: "clamp(0.95rem, 1.35vw, 17px)" }}>
              Every client gets a dedicated team that owns their digital presence,
              thinks with them, and moves with the precision their business deserves.
              We are not just an agency — we are your growth architecture firm.
            </p>
            <div className="flex flex-col gap-3">
              <div className="divider" style={{ backgroundColor: "rgb(24,24,24)" }} />
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-[11px] font-bold text-[var(--text-label)] tracking-[0.06em]">Est. 2023</span>
                <span className="inline-block w-6 h-px bg-[var(--border-hover)]" />
                {SERVICES.map((s) => (
                  <span key={s} className="text-[11px] font-semibold text-[var(--text-label)] tracking-[-0.01em]">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — 2 rows */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-3">
            <motion.div
              className="card-lg flex flex-col justify-between"
              style={{ padding: "clamp(20px,2.5vw,36px)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">Happy Clients</span>
              <div className="flex items-end gap-4">
                <span className="stat-value" style={{ fontSize: "clamp(3rem,5vw,64px)" }}>15+</span>
                <div className="flex gap-[3px] mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-indigo)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card-lg flex flex-col justify-between"
              style={{ padding: "clamp(20px,2.5vw,36px)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">Countries Served</span>
              <div className="flex items-end justify-between">
                <span className="stat-value" style={{ fontSize: "clamp(3rem,5vw,64px)" }}>4</span>
                <div className="flex flex-col items-end gap-[5px]">
                  {COUNTRIES.map((c) => (
                    <span key={c} className="text-xs font-medium text-[var(--text-label)]">{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Logos */}
        <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-2">
          {CLIENT_LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="flex items-center justify-center rounded-[18px] h-[104px] md:h-[76px] bg-[var(--surface-card)] border border-[var(--border-subtle)] p-2"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.55 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={logo.src} alt={logo.name} width={120} height={44} className="object-contain w-auto h-full max-h-[70px] md:max-h-[62px]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
