import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import ContactForm from "../../contact-form";

interface Highlight {
  label: string;
  value: string;
}

interface ProcessStep {
  step: string;
  desc: string;
}

interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  desc: string;
  fullDesc: string;
  color: string;
  bg: string;
  highlights: Highlight[];
  features: string[];
  process: ProcessStep[];
  technologies: string[];
}

interface Project {
  slug: string;
  bg: string;
  tag: string;
  title: string;
  desc: string;
}

async function getServices(): Promise<Service[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/services.json"),
    "utf-8"
  );
  return JSON.parse(data);
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
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} — VELIQ`,
    description: service.desc,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  const allProjects = await getProjects();
  const relatedProjects = allProjects.filter((p) => p.tag === service.title);

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className={`absolute inset-0 -z-10 ${service.bg} opacity-[0.07]`} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition mb-8"
          >
            &larr; All Services
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${service.bg} text-3xl text-white shadow-lg`}>
                  {service.icon}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                  {service.title}
                </h1>
              </div>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed md:text-xl">
                {service.fullDesc}
              </p>
              <Link
                href="/contact"
                className={`mt-8 inline-block rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-lg transition ${service.bg} hover:opacity-90`}
              >
                Start a Project
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-80 shrink-0">
              {service.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 text-center"
                >
                  <p className="text-2xl font-extrabold text-primary">{h.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What We Offer
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Capabilities & Expertise
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-slate-200 p-6 transition hover:shadow-md hover:border-primary/30"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${service.bg} text-white text-sm font-bold`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How We Work
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Our Process
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={i} className="relative">
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-slate-300 -translate-x-1/2 z-0" />
                )}
                <div className="relative z-10 rounded-2xl bg-white p-8 shadow-sm border border-slate-100 h-full">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg} text-white text-lg font-bold mb-5`}>
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.step}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technologies ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Tech Stack
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Technologies We Use
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Work
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                {service.title} Projects
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                See how we&apos;ve helped businesses succeed with our {service.title.toLowerCase()} expertise.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg bg-white"
                >
                  <div className={`h-48 ${p.bg}`} />
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {p.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="inline-block rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
              >
                View All Projects &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Other Services ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Explore More
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Other Services
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-2xl border border-slate-200 p-6 transition hover:shadow-lg hover:border-primary/40"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${s.bg} text-2xl text-white`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`py-20 ${service.bg} text-white`}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Your {service.title} Project?
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Let&apos;s discuss your goals and create something exceptional together.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold shadow-lg hover:bg-white/90 transition text-slate-900"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
