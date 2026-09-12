"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

type Shot = { src: string; col: string; row: string; rotate: number };

// 3 columns x 3 rows — every tile is one uniform cell, gap keeps tiles from ever touching.
const DESKTOP_SHOTS: Shot[] = [
  { src: "/uploads/brandlab-screen.png", col: "1", row: "1", rotate: -3 },
  { src: "/uploads/coach-shiko-screen.jpg", col: "2", row: "1", rotate: 4 },
  { src: "/uploads/captain-maged-1.png", col: "3", row: "1", rotate: -4 },
  { src: "/uploads/initio-screen.jpg", col: "1", row: "2", rotate: 3 },
  { src: "/uploads/yamin-estate-screen.jpg", col: "2", row: "2", rotate: -2 },
  { src: "/uploads/redbone-gym-screen.jpg", col: "3", row: "2", rotate: 5 },
  { src: "/uploads/saudi-hayat-screen.jpg", col: "1", row: "3", rotate: -5 },
  { src: "/uploads/enjazcare-screen.png", col: "2", row: "3", rotate: 3 },
  { src: "/uploads/fanous-clinic-screen.jpg", col: "3", row: "3", rotate: -3 },
];

// 2 columns x 5 rows — same rule: one uniform cell per tile, never overlapping.
const MOBILE_SHOTS: Shot[] = [
  { src: "/uploads/brandlab-screen.png", col: "1", row: "1", rotate: -4 },
  { src: "/uploads/coach-shiko-screen.jpg", col: "2", row: "1", rotate: 4 },
  { src: "/uploads/initio-screen.jpg", col: "1", row: "2", rotate: 3 },
  { src: "/uploads/yamin-estate-screen.jpg", col: "2", row: "2", rotate: -3 },
  { src: "/uploads/captain-maged-1.png", col: "1", row: "3", rotate: 2 },
  { src: "/uploads/redbone-gym-screen.jpg", col: "2", row: "3", rotate: -4 },
  { src: "/uploads/saudi-hayat-screen.jpg", col: "1", row: "4", rotate: 4 },
  { src: "/uploads/enjazcare-screen.png", col: "2", row: "4", rotate: -3 },
  { src: "/uploads/fanous-clinic-screen.jpg", col: "1", row: "5", rotate: 3 },
];

function BackgroundShots({
  shots,
  className,
  gridCols,
  gridRows,
  opacity = 0.6,
}: {
  shots: Shot[];
  className?: string;
  gridCols: number;
  gridRows: number;
  opacity?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 grid ${className ?? ""}`}
      style={{
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
        gap: "22px",
        padding: "22px",
      }}
    >
      {shots.map((shot, i) => (
        <motion.div
          key={shot.src + i}
          className="relative rounded-xl overflow-hidden border border-white/10 bg-black"
          style={{ gridColumn: shot.col, gridRow: shot.row, rotate: `${shot.rotate}deg` }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 + i * 0.06, ease: EASE }}
        >
          <Image src={shot.src} alt="" fill sizes="40vw" className="object-contain" />
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Full-bleed grid of project screenshots — each tile isolated, never overlapping */}
      <BackgroundShots shots={DESKTOP_SHOTS} gridCols={3} gridRows={3} className="hidden md:grid" opacity={0.85} />
      <BackgroundShots shots={MOBILE_SHOTS} gridCols={2} gridRows={5} className="md:hidden" opacity={0.9} />

      {/* Dark overlay for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "min(800px, 120vw)",
            height: "min(800px, 120vw)",
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.03) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 px-6 py-24 text-center max-w-[860px]">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="text-white font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.1rem, 8vw, 5rem)" }}
        >
          Built for those
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--accent-indigo), var(--accent-purple), var(--accent-teal))",
            }}
          >
            who don&apos;t settle.
          </span>
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="text-[rgb(190,190,190)] max-w-[480px] px-2"
          style={{ fontSize: "clamp(15px, 4vw, 17px)", lineHeight: 1.6 }}
        >
          Websites, apps, and marketing, engineered by a team obsessed with getting it right.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
        >
          <Link href="/contact" className="btn-primary text-[15px] w-full sm:w-auto justify-center">
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/projects" className="btn-outline w-full sm:w-auto justify-center">
            View Our Work
          </Link>
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
