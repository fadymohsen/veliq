"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export type JourneyStop = { title: string; desc: string };

type Point = { x: number; y: number };

// Catmull-Rom -> cubic Bezier. Smooth, continuous tangents through every
// point, including the first and last — no manual per-segment tuning.
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function Pin({ number }: { number: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: 56,
        height: 56,
        fontSize: 18,
        background: "linear-gradient(135deg, rgb(99,102,241), rgb(168,85,247))",
        boxShadow: "0 0 0 6px rgba(99,102,241,0.1), 0 10px 28px rgba(99,102,241,0.32)",
      }}
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}

// The trail jitters gently inside this x-range only; text always starts
// well clear of it, so the line can never cross the copy.
const TRAIL_X_MIN = 420;
const TRAIL_X_MAX = 560;
const TEXT_X = 660;
const VIEWBOX_W = 1000;

function DesktopStop({ stop, index, x, y, viewboxH }: {
  stop: JourneyStop; index: number; x: number; y: number; viewboxH: number;
}) {
  // Positioning (left/top) lives on plain, transform-free divs so they stay
  // anchored to the outer map container. Framer Motion's `animate` prop sets
  // an inline `transform`, and per the CSS spec any element with a transform
  // becomes the containing block for its `position: absolute` descendants —
  // nesting the positioned pin/text inside the animated wrapper made every
  // stop position relative to its own (collapsed) wrapper instead of the
  // map, collapsing all 11 stops onto the same spot. The fade animation is
  // isolated to inner motion.divs that have no absolutely-positioned children.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <div ref={ref}>
      <div
        className="absolute"
        style={{
          left: `${(x / VIEWBOX_W) * 100}%`,
          top: `${(y / viewboxH) * 100}%`,
          marginLeft: -28,
          marginTop: -28,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Pin number={index + 1} />
        </motion.div>
      </div>

      <div
        className="absolute flex flex-col gap-2"
        style={{
          left: `${(TEXT_X / VIEWBOX_W) * 100}%`,
          top: `${(y / viewboxH) * 100}%`,
          marginTop: -40,
          width: 320,
        }}
      >
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h3 className="text-white" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {stop.title}
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
            {stop.desc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function MobileStop({ stop, index, isLast }: { stop: JourneyStop; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5 pb-10 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {!isLast && (
        <span
          className="absolute left-[27px] top-[58px] bottom-0 w-px"
          style={{ background: "linear-gradient(rgb(99,102,241), rgb(168,85,247))", opacity: 0.3 }}
        />
      )}
      <Pin number={index + 1} />
      <div className="flex flex-col gap-2 pt-2">
        <h3 className="text-white" style={{ fontSize: 16, fontWeight: 600 }}>{stop.title}</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{stop.desc}</p>
      </div>
    </motion.div>
  );
}

export default function JourneyMapSection({ stops, heading, subheading }: {
  stops: JourneyStop[]; heading: string; subheading: string;
}) {
  const GAP = 320;
  const nodes: Point[] = stops.map((_, i) => ({
    x: i % 2 === 0 ? TRAIL_X_MIN : TRAIL_X_MAX,
    y: 90 + i * GAP,
  }));
  const viewboxH = nodes[nodes.length - 1].y + 130;
  const routePath = smoothPath(nodes);

  return (
    <section className="section-padding max-w-[1100px] mx-auto flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
          {heading}
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: "50ch", lineHeight: 1.6 }}>
          {subheading}
        </p>
      </div>

      {/* Desktop — winding trail, single text column clear of the line */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: `${VIEWBOX_W} / ${viewboxH}` }}>
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${viewboxH}`}
          className="absolute inset-0 w-full h-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="journeyRoute" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(99,102,241)" />
              <stop offset="50%" stopColor="rgb(168,85,247)" />
              <stop offset="100%" stopColor="rgb(45,212,191)" />
            </linearGradient>
          </defs>
          <path
            d={routePath}
            stroke="url(#journeyRoute)"
            strokeWidth="3"
            strokeDasharray="2 14"
            strokeLinecap="round"
            opacity={0.85}
          />
        </svg>

        {stops.map((stop, i) => (
          <DesktopStop key={stop.title} stop={stop} index={i} x={nodes[i].x} y={nodes[i].y} viewboxH={viewboxH} />
        ))}
      </div>

      {/* Mobile — simplified vertical route */}
      <div className="flex md:hidden flex-col">
        {stops.map((stop, i) => (
          <MobileStop key={stop.title} stop={stop} index={i} isLast={i === stops.length - 1} />
        ))}
      </div>
    </section>
  );
}
