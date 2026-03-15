import Link from "next/link";
import ScrollReveal from "./components/scroll-reveal";
import { ServiceIcon } from "./components/service-icons";
import TrustBar from "./components/trust-bar";
import { TeamPreview } from "./components/team-section";
import TestimonialsCarousel from "./components/testimonials-carousel";
import { getCollection } from "@/lib/db";

interface Service {
  id: number;
  icon: string;
  title: string;
  desc: string;
  slug: string;
  bg: string;
}

interface Project {
  slug: string;
  bg: string;
  tag: string;
  title: string;
  desc: string;
}

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  bg: string;
}

async function getServices(): Promise<Service[]> {
  return getCollection<Service>("services");
}

async function getProjects(): Promise<Project[]> {
  return getCollection<Project>("projects");
}

async function getBlogs(): Promise<Blog[]> {
  return getCollection<Blog>("blogs");
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await getServices();
  const allProjects = await getProjects();
  const projects = allProjects.slice(0, 6);
  const blogs = (await getBlogs()).slice(0, 3);
  return (
    <div className="bg-[#0a0a14]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Glowing orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] animate-float-slow" />
          <div className="absolute left-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-blue-600/10 blur-[100px] animate-float" />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="animate-fade-in-up">
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
              Software &amp; Marketing{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>{" "}
              That Drive Growth
            </h1>
          </div>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            We design, build, and market digital products that help businesses
            scale — from custom software platforms to high-impact marketing
            campaigns.
          </p>
          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Our Services
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              See Our Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <TrustBar />

      {/* ── Services Preview ── */}
      <section className="relative py-28 overflow-hidden">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/8 blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              What We Do
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              End-to-End Digital Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              From strategy to execution — everything you need to win online.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} animation="fade-up" delay={i * 100}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-indigo-500/10 blur-[60px]" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/15 group-hover:border-white/25 group-hover:shadow-lg group-hover:shadow-white/5">
                      <ServiceIcon slug={s.slug} />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">{s.title}</h3>
                    <p className="mt-3 text-slate-500 leading-relaxed text-sm group-hover:text-slate-400 transition-colors duration-300">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Learn More
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400} className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              View All Services &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── About Us ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[130px]" />
          <div className="absolute left-1/3 bottom-0 h-[250px] w-[250px] rounded-full bg-purple-600/6 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left — Text */}
            <ScrollReveal animation="fade-up">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Who We Are
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
                Your Digital{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Growth Partner
                </span>
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                VELIQ is a full-service digital agency built by engineers,
                designers, and marketers who believe great software and smart
                marketing should work together — not in silos.
              </p>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Founded with a simple belief: businesses deserve a partner who
                understands both the technical and human sides of digital growth.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition-all duration-300 hover:text-indigo-300"
              >
                Learn More About Us
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>

            {/* Right — Stats */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "120+", label: "Projects Delivered", delay: 0 },
                { value: "40+", label: "Happy Clients", delay: 100 },
                { value: "15+", label: "Team Members", delay: 200 },
                { value: "99%", label: "Client Satisfaction", delay: 300 },
              ].map((s) => (
                <ScrollReveal key={s.label} animation="scale" delay={s.delay}>
                  <div className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30 hover:-translate-y-1">
                    <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent md:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                      {s.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Mission & Vision ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-purple-600/8 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              What Drives Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Mission &amp; Vision
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <ScrollReveal animation="fade-up">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 h-full transition-all duration-500 hover:bg-white/[0.06] hover:border-indigo-500/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] mb-5 transition-all duration-500 group-hover:bg-white/[0.12] group-hover:scale-110">
                    <svg className="h-6 w-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.96-5.96M9.63 8.41A6 6 0 012.25 14.2" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                    Our Mission
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white md:text-2xl leading-snug">
                    Empowering Businesses Through Digital Excellence
                  </h3>
                  <p className="mt-4 text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                    Delivering innovative digital solutions that drive measurable
                    growth — combining technical expertise with creative strategy
                    to help businesses compete, scale, and thrive.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Innovate", "Deliver", "Grow"].map((word) => (
                      <span
                        key={word}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-xs font-semibold tracking-wide text-slate-400 transition-all duration-300 group-hover:border-indigo-500/20 group-hover:text-slate-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 h-full transition-all duration-500 hover:bg-white/[0.06] hover:border-purple-500/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] mb-5 transition-all duration-500 group-hover:bg-white/[0.12] group-hover:scale-110">
                    <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                    Our Vision
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white md:text-2xl leading-snug">
                    The Go-To Partner for Digital Transformation
                  </h3>
                  <p className="mt-4 text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                    To be the most trusted digital agency in the region —
                    recognized for building products that matter, campaigns that
                    convert, and partnerships that last.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Lead", "Transform", "Inspire"].map((word) => (
                      <span
                        key={word}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1 text-xs font-semibold tracking-wide text-slate-400 transition-all duration-300 group-hover:border-purple-500/20 group-hover:text-slate-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Projects Preview ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/3 top-0 h-[400px] w-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
          <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-600/6 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Our Work
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Recent Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Real results for real businesses. See what we&apos;ve built.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ScrollReveal key={p.slug} animation={i % 2 === 0 ? "fade-up" : "scale"} delay={i * 80}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
                >
                  <div className="overflow-hidden">
                    <div className={`h-48 ${p.bg} transition-all duration-700 group-hover:scale-110 group-hover:brightness-110`} />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {p.tag}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{p.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-purple-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      View Project
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={300} className="mt-14 text-center">
            <Link
              href="/projects"
              className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-purple-500/5"
            >
              View All Projects &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Blog Preview ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/4 h-[350px] w-[350px] rounded-full bg-cyan-600/6 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              From Our Blog
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Latest Insights
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Tips, strategies, and ideas to help your business grow.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => (
              <ScrollReveal key={b.slug} animation="slide-left" delay={i * 150}>
                <Link
                  href={`/blog/${b.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2"
                >
                  <div className="overflow-hidden">
                    <div className={`h-48 ${b.bg} transition-all duration-700 group-hover:scale-110 group-hover:brightness-110`} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                      <span className="rounded-full bg-cyan-500/10 text-cyan-400 px-3 py-1 border border-cyan-500/20">
                        {b.category}
                      </span>
                      <span className="text-slate-600">{b.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{b.excerpt}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Read Article
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={300} className="mt-14 text-center">
            <Link
              href="/blog"
              className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              View All Articles &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Team Preview ── */}
      <TeamPreview />

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Testimonials ── */}
      <TestimonialsCarousel />

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/12 blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold md:text-5xl text-white">
              Ready to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Get Started
              </span>
              ?
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              Let&apos;s turn your vision into reality. Tell us about your project.
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
