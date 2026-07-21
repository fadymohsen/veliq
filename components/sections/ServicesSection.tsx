"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
function IconSupport() {
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M28 6L12 13v16c0 11 7.5 21.2 16 23.5C44.5 50.2 52 40 52 29V13L28 6z" stroke="white" strokeWidth="3.5" strokeLinejoin="round"/>
      <path d="M20 29l6 6 12-12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Data */
const SERVICES = [
  { id: "01", title: "Web Dev",     slug: "website-development", Icon: IconWebDev,   summary: "Fast, beautiful websites and web apps built to convert and scale." },
  { id: "02", title: "Web Support", slug: "website-support",     Icon: IconSupport,  summary: "Ongoing maintenance, updates, and security so your site never sleeps." },
  { id: "03", title: "SEO",         slug: "seo",                 Icon: IconSEO,      summary: "Rank higher and drive qualified traffic with technical SEO & content." },
] as const;

/* Fan geometry */
const D_X   = [-320, 0, 320];
const D_Y   = [44,   0,  44];
const D_ROT = [-18,  0,  18];
const STACK_R = [-4, 0, 4];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    const GAP = 16;
    const usableH = vp.h * 0.82;
    CH = Math.max(110, Math.min(190, (usableH - 2 * GAP) / 3));
    CW = Math.min(CH * 0.82, vp.w * 0.74);
    const S = CH + GAP;
    FAN_Y = [-1, 0, 1].map((m) => Math.round(m * S));
    const sway = Math.max(0, Math.min(14, (vp.w * 0.8 - CW) / 2));
    FAN_X = [-1, 0, 1].map((m) => Math.round(m * sway));
    FAN_ROT = [-4, 0, 4];
  } else {
    CW = 150; CH = 200;
    FAN_X = D_X; FAN_Y = D_Y; FAN_ROT = D_ROT;
  }

  const [flippedId, setFlippedId] = useState<string | null>(null);
  const handleCardClick = (id: string, slug: string) => {
    if (flippedId === id) router.push(`/services/${slug}`);
    else setFlippedId(id);
  };

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 90, damping: 24, restDelta: 0.001 });

  const x0 = useTransform(progress, [0.05, 0.5], [0, FAN_X[0]]);
  const x1 = useTransform(progress, [0.2, 0.6], [0, FAN_X[1]]);
  const x2 = useTransform(progress, [0.35, 0.7], [0, FAN_X[2]]);

  const y0 = useTransform(progress, [0.05, 0.5], [0, FAN_Y[0]]);
  const y1 = useTransform(progress, [0.2, 0.6], [0, FAN_Y[1]]);
  const y2 = useTransform(progress, [0.35, 0.7], [0, FAN_Y[2]]);

  const r0 = useTransform(progress, [0.05, 0.5], [STACK_R[0], FAN_ROT[0]]);
  const r1 = useTransform(progress, [0.2, 0.6], [STACK_R[1], FAN_ROT[1]]);
  const r2 = useTransform(progress, [0.35, 0.7], [STACK_R[2], FAN_ROT[2]]);

  const textOpacity = useTransform(progress, [0, 0.3, 0.6], [0.5, 0.7, 1]);

  const slots = [
    { x: x0, y: y0, r: r0 },
    { x: x1, y: y1, r: r1 },
    { x: x2, y: y2, r: r2 },
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
                <button
                  type="button"
                  className={`service-card w-full h-full cursor-pointer${flippedId === svc.id ? " is-flipped" : ""}`}
                  style={{ perspective: "800px", background: "none", border: "none", padding: 0 }}
                  onClick={() => handleCardClick(svc.id, svc.slug)}
                  aria-label={`${svc.title} — ${flippedId === svc.id ? "click to open" : "click to see details"}`}
                >
                  <div className="service-card-inner">
                    {/* Front */}
                    <div className="service-card-face flex flex-col items-center justify-center bg-[var(--surface-input)]">
                      <span className="absolute top-3 right-3.5 text-white text-[13px] font-medium opacity-80">
                        {svc.id}
                      </span>
                      <svc.Icon />
                      <span className="absolute bottom-4 text-white text-lg font-bold tracking-[-0.02em]">
                        {svc.title}
                      </span>
                    </div>

                    {/* Back */}
                    <div className="service-card-face service-card-back flex flex-col justify-between bg-[var(--surface-input)] p-4">
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
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
