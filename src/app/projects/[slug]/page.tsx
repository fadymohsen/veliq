import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import ContactForm from "../../contact-form";
import ScrollReveal from "../../components/scroll-reveal";

interface GalleryItem {
  bg: string;
  caption: string;
}

interface Project {
  slug: string;
  bg: string;
  tag: string;
  title: string;
  desc: string;
  fullDesc: string;
  gallery: GalleryItem[];
}

async function getProjects(): Promise<Project[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/projects.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — VELIQ`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const related = projects.filter(
    (p) => p.tag === project.tag && p.slug !== project.slug
  );

  return (
    <div className="bg-[#0a0a14]">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/12 blur-[120px] animate-pulse-glow" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white transition"
            >
              &larr; Back to Projects
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 animate-fade-in-up">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                {project.tag}
              </span>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl text-white">
                {project.title}
              </h1>
              <p className="mt-3 text-lg text-slate-400 max-w-2xl">
                {project.desc}
              </p>
            </div>
          </div>
          <div className="animate-fade-in-up delay-200">
            <div
              className={`w-full h-64 md:h-96 rounded-2xl ${project.bg} border border-white/10`}
            />
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-indigo-600/6 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-bold md:text-3xl text-white">About This Project</h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              {project.fullDesc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Gallery ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-bold md:text-3xl text-white mb-10">Gallery</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((item, i) => (
              <ScrollReveal key={i} animation={i % 2 === 0 ? "fade-up" : "scale"} delay={i * 100}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30">
                  <div className={`h-56 md:h-72 ${item.bg}`} />
                  <div className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-400">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <>
          <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <section className="relative py-20 overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/6 blur-[100px]" />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-6">
              <ScrollReveal animation="fade-up">
                <h2 className="text-2xl font-bold md:text-3xl text-white mb-10">
                  Related Projects
                </h2>
              </ScrollReveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <ScrollReveal key={p.slug} animation="fade-up" delay={i * 100}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
                    >
                      <div className="overflow-hidden">
                        <div className={`h-48 ${p.bg} transition-all duration-700 group-hover:scale-110`} />
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                          {p.tag}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">{p.desc}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Contact ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <section className="relative py-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/12 blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Interested?
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Let&apos;s Build Something Like This
            </h2>
            <p className="mt-4 text-slate-400">
              Have a similar project in mind? Get in touch and we&apos;ll bring
              your vision to life.
            </p>
          </ScrollReveal>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
