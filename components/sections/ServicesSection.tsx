"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/* Icons */
function IconWebDev() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M20 14L8 28L20 42" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 14L48 28L36 42" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33 10L23 46" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconSEO() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="3.5"/>
      <path d="M34 34L47 47" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M19 22C20 18 22 17 25 17" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
function IconMobileApp() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="15" y="4" width="26" height="48" rx="5" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M24 44h8" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M22 20l4 4 8-8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconSocial() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="42" cy="12" r="6" stroke="white" strokeWidth="3.5"/>
      <circle cx="14" cy="28" r="6" stroke="white" strokeWidth="3.5"/>
      <circle cx="42" cy="44" r="6" stroke="white" strokeWidth="3.5"/>
      <path d="M19.5 24.5L36.5 15.5M19.5 31.5L36.5 40.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
function IconStrategy() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="26" cy="30" r="20" stroke="white" strokeWidth="3.5"/>
      <circle cx="26" cy="30" r="11" stroke="white" strokeWidth="3"/>
      <circle cx="26" cy="30" r="2.5" fill="white"/>
      <path d="M46 10L34 22" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M46 10h-9M46 10v9" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconMediaBuying() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M6 22v12a2 2 0 002 2h5l10 9V11L13 20H8a2 2 0 00-2 2z" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M32 20a8 8 0 010 16M37 13a15.5 15.5 0 010 30" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  );
}

/* Data */
const SERVICES = [
  { id: "01", title: "Web Dev",       slug: "website-development",  Icon: IconWebDev,      summary: "Fast, beautiful websites built to convert and scale from day one." },
  { id: "02", title: "Mobile Apps",   slug: "mobile-applications",  Icon: IconMobileApp,   summary: "iOS & Android apps delivered sprint by sprint, on your device, not a simulator." },
  { id: "03", title: "SEO",           slug: "seo",                  Icon: IconSEO,         summary: "Rank higher and drive qualified traffic with technical SEO & content." },
  { id: "04", title: "Social Media",  slug: "social-media",         Icon: IconSocial,      summary: "Platform-native content and community management built to actually get watched." },
  { id: "05", title: "Marketing Strategy", slug: "marketing-strategy", Icon: IconStrategy, summary: "The positioning and channel plan every other service executes against." },
  { id: "06", title: "Media Buying",  slug: "media-buying",         Icon: IconMediaBuying, summary: "Paid media across Meta, Google & TikTok, tracked to leads and sales, not clicks." },
] as const;

/* Fan geometry — generated for N cards, arched + rotated outward from center */
const N = SERVICES.length;
const CENTER = (N - 1) / 2;
const OFFSETS = SERVICES.map((_, i) => i - CENTER);
const D_X   = OFFSETS.map((o) => o * 130);
const D_Y   = OFFSETS.map((o) => Math.round(o * o * 10));
const D_ROT = OFFSETS.map((o) => o * 8);
const STACK_R = OFFSETS.map((o) => o * 3);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [vp, setVp] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vp.w <= 767;

  let CW: number, CH: number, FAN_X: number[], FAN_Y: number[], FAN_ROT: number[];
  if (isMobile) {
    const GAP = 10;
    const usableH = vp.h * 0.82;
    CH = Math.max(64, Math.min(140, (usableH - (N - 1) * GAP) / N));
    CW = Math.min(CH * 0.82, vp.w * 0.74);
    const S = CH + GAP;
    FAN_Y = OFFSETS.map((o) => Math.round(o * S));
    const sway = Math.max(0, Math.min(10, (vp.w * 0.8 - CW) / 2));
    FAN_X = OFFSETS.map((o) => Math.round(o * sway * 0.5));
    FAN_ROT = OFFSETS.map((o) => o * 2.5);
  } else {
    CW = 150; CH = 200;
    FAN_X = D_X; FAN_Y = D_Y; FAN_ROT = D_ROT;
  }

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 90, damping: 24, restDelta: 0.001 });

  const x0 = useTransform(progress, [0.04, 0.48], [0, FAN_X[0]]);
  const x1 = useTransform(progress, [0.08, 0.52], [0, FAN_X[1]]);
  const x2 = useTransform(progress, [0.12, 0.56], [0, FAN_X[2]]);
  const x3 = useTransform(progress, [0.16, 0.60], [0, FAN_X[3]]);
  const x4 = useTransform(progress, [0.20, 0.64], [0, FAN_X[4]]);
  const x5 = useTransform(progress, [0.24, 0.68], [0, FAN_X[5]]);
  const x6 = useTransform(progress, [0.28, 0.72], [0, FAN_X[6]]);
  const x7 = useTransform(progress, [0.32, 0.76], [0, FAN_X[7]]);

  const y0 = useTransform(progress, [0.04, 0.48], [0, FAN_Y[0]]);
  const y1 = useTransform(progress, [0.08, 0.52], [0, FAN_Y[1]]);
  const y2 = useTransform(progress, [0.12, 0.56], [0, FAN_Y[2]]);
  const y3 = useTransform(progress, [0.16, 0.60], [0, FAN_Y[3]]);
  const y4 = useTransform(progress, [0.20, 0.64], [0, FAN_Y[4]]);
  const y5 = useTransform(progress, [0.24, 0.68], [0, FAN_Y[5]]);
  const y6 = useTransform(progress, [0.28, 0.72], [0, FAN_Y[6]]);
  const y7 = useTransform(progress, [0.32, 0.76], [0, FAN_Y[7]]);

  const r0 = useTransform(progress, [0.04, 0.48], [STACK_R[0], FAN_ROT[0]]);
  const r1 = useTransform(progress, [0.08, 0.52], [STACK_R[1], FAN_ROT[1]]);
  const r2 = useTransform(progress, [0.12, 0.56], [STACK_R[2], FAN_ROT[2]]);
  const r3 = useTransform(progress, [0.16, 0.60], [STACK_R[3], FAN_ROT[3]]);
  const r4 = useTransform(progress, [0.20, 0.64], [STACK_R[4], FAN_ROT[4]]);
  const r5 = useTransform(progress, [0.24, 0.68], [STACK_R[5], FAN_ROT[5]]);
  const r6 = useTransform(progress, [0.28, 0.72], [STACK_R[6], FAN_ROT[6]]);
  const r7 = useTransform(progress, [0.32, 0.76], [STACK_R[7], FAN_ROT[7]]);

  const textOpacity = useTransform(progress, [0, 0.3, 0.6], [0.5, 0.7, 1]);

  const slots = [
    { x: x0, y: y0, r: r0 },
    { x: x1, y: y1, r: r1 },
    { x: x2, y: y2, r: r2 },
    { x: x3, y: y3, r: r3 },
    { x: x4, y: y4, r: r4 },
    { x: x5, y: y5, r: r5 },
    { x: x6, y: y6, r: r6 },
    { x: x7, y: y7, r: r7 },
  ];

  return (
    /* Reduced scroll travel so the section doesn't feel endless */
    <section ref={sectionRef} className="relative w-full" style={{ height: "180vh" }}>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full" style={{ overflow: "visible" }}>

        {/* Indigo background */}
        <div
          className="absolute overflow-hidden flex items-center justify-center bg-[var(--accent-indigo)] rounded-[26px]"
          style={{ inset: "8px" }}
        >
          <motion.h2
            className="text-white text-center select-none pointer-events-none font-semibold tracking-[-0.06em] leading-[1.1]"
            style={{ opacity: textOpacity, fontSize: "clamp(3.5rem, 10vw, 130px)" }}
          >
            Services.
          </motion.h2>

          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white/40 text-[10px] font-semibold tracking-[0.15em] uppercase">
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* Card layer */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ overflow: "visible" }}
        >
          <div className="relative" style={{ width: `${CW}px`, height: `${CH}px` }}>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                className="absolute"
                style={{
                  width: `${CW}px`,
                  height: `${CH}px`,
                  transformOrigin: "center bottom",
                  zIndex: 10 - i,
                  x: slots[i].x,
                  y: slots[i].y,
                  rotate: slots[i].r,
                }}
              >
                <Link
                  href={`/services/${svc.slug}`}
                  className="service-card block w-full h-full cursor-pointer"
                  style={{ perspective: "800px" }}
                >
                  <div className="service-card-inner">
                    {/* Front */}
                    <div
                      className="service-card-face flex flex-col items-center justify-center p-4"
                      style={{
                        background: i % 5 === 0
                          ? 'linear-gradient(90deg, rgba(99,102,241,0.4) 0%, rgba(45,212,191,0.4) 100%)'
                          : i % 5 === 1
                          ? 'linear-gradient(90deg, rgba(168,85,247,0.4) 0%, rgba(99,102,241,0.4) 100%)'
                          : i % 5 === 2
                          ? 'linear-gradient(90deg, rgba(45,212,191,0.4) 0%, rgba(56,189,248,0.4) 100%)'
                          : i % 5 === 3
                          ? 'linear-gradient(90deg, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.4) 100%)'
                          : 'linear-gradient(90deg, rgba(56,189,248,0.4) 0%, rgba(45,212,191,0.4) 100%)',
                      }}
                    >
                      <span className="absolute top-3 right-3.5 text-white text-[13px] font-medium opacity-80">
                        {svc.id}
                      </span>
                      <svc.Icon />
                      <span className="absolute bottom-4 text-white text-lg font-bold tracking-[-0.02em]">
                        {svc.title}
                      </span>
                    </div>

                    {/* Back */}
                    <div
                      className="service-card-face service-card-back flex flex-col justify-between p-4"
                      style={{
                        background: i % 5 === 0
                          ? 'linear-gradient(90deg, rgba(99,102,241,0.4) 0%, rgba(45,212,191,0.4) 100%)'
                          : i % 5 === 1
                          ? 'linear-gradient(90deg, rgba(168,85,247,0.4) 0%, rgba(99,102,241,0.4) 100%)'
                          : i % 5 === 2
                          ? 'linear-gradient(90deg, rgba(45,212,191,0.4) 0%, rgba(56,189,248,0.4) 100%)'
                          : i % 5 === 3
                          ? 'linear-gradient(90deg, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.4) 100%)'
                          : 'linear-gradient(90deg, rgba(56,189,248,0.4) 0%, rgba(45,212,191,0.4) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--text-dim)] text-xs font-medium">{svc.id}</span>
                        <span className="block w-[7px] h-[7px] rounded-full bg-[var(--accent-indigo)]" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-white text-[17px] font-bold tracking-[-0.03em] leading-[1.2]">
                          {svc.title}
                        </span>
                        <span className="text-white/[0.68] text-xs leading-[1.6]">
                          {svc.summary}
                        </span>
                      </div>

                      <span className="text-[var(--accent-indigo)] text-[11px] font-bold tracking-[0.06em]">
                        EXPLORE →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
