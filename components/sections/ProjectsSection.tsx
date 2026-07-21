"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function BrowserCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const domain = project.url.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex-shrink-0 flex flex-col gap-3 group"
        style={{ width: "100%" }}
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
          <div className="relative w-full overflow-hidden bg-[var(--surface-card-alt)]" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={project.preview}
              alt={`${project.title} website screenshot — ${project.description.slice(0, 80)}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-2.5 right-2.5 z-[2] bg-[var(--accent-indigo)] text-black rounded-full px-3 py-1 text-[11px] font-semibold tracking-[-0.2px]">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[var(--text-secondary)] text-lg font-semibold tracking-[-0.03em]">
            {project.title}
          </span>
          <span className="text-[var(--text-body)] text-[13px] leading-[1.5] line-clamp-2">
            {project.description}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  /* Show first 6 projects on homepage */
  const featured = PROJECTS.slice(0, 6);

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16">

        <motion.div
          className="flex justify-between items-end px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-start gap-3">
            <h2 className="heading-1 text-white">Projects.</h2>
            <span className="para-12 text-[var(--text-secondary)] mt-4">({PROJECTS.length})</span>
          </div>
          <div className="hidden md:block">
            <Button label="All Projects" href="/projects" variant="outline" />
          </div>
        </motion.div>

        {/* Browsable grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
          {featured.map((p, i) => (
            <BrowserCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button label="View All Projects" href="/projects" variant="outline" />
        </div>

      </div>
    </section>
  );
}
