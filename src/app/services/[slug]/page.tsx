import { notFound } from "next/navigation";
import Link from "next/link";
import ContactForm from "../../contact-form";
import ScrollReveal from "../../components/scroll-reveal";
import { ServiceIcon } from "../../components/service-icons";
import { getCollection } from "@/lib/db";

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
  return getCollection<Service>("services");
}

async function getProjects(): Promise<Project[]> {
  return getCollection<Project>("projects");
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
    <div className="bg-[#0a0a14]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute right-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-purple-600/10 blur-[100px] animate-float-slow" />
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
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white transition mb-8"
          >
            &larr; All Services
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="md:max-w-2xl animate-fade-in-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white shadow-lg shadow-indigo-500/10">
                  <ServiceIcon slug={service.slug} />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-white">
                  {service.title}
                </h1>
              </div>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed md:text-xl">
                {service.fullDesc}
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98]"
              >
                Start a Project
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:w-80 shrink-0 animate-fade-in-up delay-200">
              {service.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30"
                >
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{h.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              What We Offer
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Capabilities & Expertise
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">{feature}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Our Process ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              How We Work
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Our Process
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <ScrollReveal key={i} animation="scale" delay={i * 150}>
                <div className="relative">
                  {i < service.process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent -translate-x-1/2 z-0" />
                  )}
                  <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 h-full transition-all duration-500 hover:bg-white/[0.08] hover:border-purple-500/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-lg font-bold mb-5">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.step}</h3>
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Technologies ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Tech Stack
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Technologies We Use
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-indigo-500/30 hover:text-indigo-300 hover:bg-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <>
          <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <section className="relative py-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-600/6 blur-[100px]" />
            </div>
            <div className="relative z-10 mx-auto max-w-7xl px-6">
              <ScrollReveal animation="fade-up" className="text-center mb-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                  Our Work
                </p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
                  {service.title} Projects
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                  See how we&apos;ve helped businesses succeed with our {service.title.toLowerCase()} expertise.
                </p>
              </ScrollReveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((p, i) => (
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
              <ScrollReveal animation="fade-up" delay={300} className="mt-12 text-center">
                <Link
                  href="/projects"
                  className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                >
                  View All Projects &rarr;
                </Link>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      {/* ── Other Services ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/3 bottom-0 h-[350px] w-[350px] rounded-full bg-indigo-600/6 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Explore More
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Other Services
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s, i) => (
              <ScrollReveal key={s.slug} animation="fade-up" delay={i * 80}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 block transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30 hover:-translate-y-2"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/25 group-hover:scale-110">
                    <ServiceIcon slug={s.slug} />
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                    {s.desc}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/12 blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold md:text-5xl text-white">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {service.title}
              </span>{" "}
              Project?
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              Let&apos;s discuss your goals and create something exceptional together.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in Touch
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
