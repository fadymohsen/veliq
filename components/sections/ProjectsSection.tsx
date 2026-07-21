"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";

const CARD_W   = 760;
const CARD_H   = Math.round(CARD_W * 9 / 16);
const CARD_GAP = 20;
const ONE_SET  = PROJECTS.length * (CARD_W + CARD_GAP);

function BrowserCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex-shrink-0 flex flex-col gap-3 group"
      style={{ width: `${CARD_W}px` }}
    >
      {/* Browser shell */}
      <div className="overflow-hidden rounded-[14px] border border-[rgb(36,36,36)] bg-[rgb(16,16,16)]">
        {/* Chrome bar */}
        <div className="h-[34px] bg-[rgb(22,22,22)] border-b border-[rgb(36,36,36)] flex items-center gap-1.5 px-3.5">
          <div className="flex gap-[5px] shrink-0">
            <span className="block w-[9px] h-[9px] rounded-full bg-[rgb(255,95,87)]" />
            <span className="block w-[9px] h-[9px] rounded-full bg-[rgb(255,189,46)]" />
            <span className="block w-[9px] h-[9px] rounded-full bg-[rgb(39,201,63)]" />
          </div>
          <div className="flex-1 ml-2 bg-[var(--surface-card)] rounded-[5px] h-5 flex items-center px-2 overflow-hidden">
            <span className="text-[9px] text-[rgb(90,90,90)] tracking-[0.01em] whitespace-nowrap">
              🔒 {domain}
            </span>
          </div>
        </div>

        {/* Screenshot viewport */}
        <div className="relative overflow-hidden bg-[var(--surface-card-alt)]" style={{ width: CARD_W, height: CARD_H }}>
          <Image
            src={project.preview}
            alt={project.title}
            fill
            sizes="760px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-2.5 right-2.5 z-[2] bg-[var(--accent-indigo)] text-black rounded-full px-3 py-1 text-[11px] font-semibold tracking-[-0.2px]">
            {project.category}
          </span>
        </div>
      </div>

      <span className="text-[var(--text-secondary)] text-[22px] font-semibold tracking-[-0.04em]">
        {project.title}
      </span>
    </Link>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full flex flex-col gap-16 md:gap-[120px]">

        <motion.div
          className="flex justify-between items-end px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="flex items-start gap-3">
            <h2 className="heading-1 text-white">Projects.</h2>
            <span className="para-12 text-[var(--text-secondary)] mt-4">(12)</span>
          </div>
          <div className="hidden md:block">
            <Button label="All Projects" href="/projects" variant="outline" />
          </div>
        </motion.div>

        {/* Layer 1 — full-bleed */}
        <div
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            overflow: "hidden",
          }}
        >
          {/* Layer 2 — perspective */}
          <div style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}>
            {/* Layer 3 — static 3D tilt */}
            <div style={{ transform: "rotateY(-28deg)", transformStyle: "preserve-3d" }}>
              {/* Layer 4 — CSS animation */}
              <div
                className="veliq-ticker flex w-max"
                style={{
                  gap: `${CARD_GAP}px`,
                  "--ticker-dist": `-${ONE_SET}px`,
                  "--ticker-dur": "55s",
                } as React.CSSProperties}
              >
                {[...PROJECTS, ...PROJECTS].map((p, i) => (
                  <BrowserCard key={`${p.slug}-${i}`} project={p} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-center">
          <Button label="All Projects" href="/projects" variant="outline" />
        </div>

      </div>
    </section>
  );
}
