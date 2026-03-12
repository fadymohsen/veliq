import Link from "next/link";
import fs from "fs/promises";
import path from "path";

interface Service {
  id: number;
  icon: string;
  title: string;
  desc: string;
  slug: string;
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

async function getBlogs(): Promise<Blog[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/blogs.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await getServices();
  const allProjects = await getProjects();
  const projects = allProjects.slice(0, 6);
  const blogs = (await getBlogs()).slice(0, 3);
  return (
    <>
      {/* ── Hero (Dark, animated — matching main branch style) ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a14]">
        {/* Glowing orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] animate-float-slow" />
          <div className="absolute left-1/4 bottom-1/3 h-[250px] w-[250px] rounded-full bg-blue-600/10 blur-[100px] animate-float" />
        </div>

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Our Services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
            >
              See Our Projects
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Services Preview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center animate-fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What We Do
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              End-to-End Digital Services
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link
                key={s.title}
                href={`/services/${s.slug}`}
                className={`animate-fade-in-up delay-${(i % 3 + 1) * 200} group rounded-2xl border border-slate-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1`}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition">{s.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center animate-fade-in-up delay-500">
            <Link
              href="/services"
              className="inline-block rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-primary hover:text-primary hover:shadow-md"
            >
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects Preview (Dark section) ── */}
      <section className="relative py-24 bg-[#0a0a14] overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/3 top-0 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Our Work
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Recent Projects
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-white/20 hover:-translate-y-1"
              >
                <div className={`h-48 ${p.bg} transition-transform duration-500 group-hover:scale-105`} />
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-indigo-300 transition">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 hover:border-white/40"
            >
              View All Projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              From Our Blog
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Latest Insights
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`h-48 ${b.bg} transition-transform duration-500 group-hover:scale-105`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
                      {b.category}
                    </span>
                    <span className="text-slate-400">{b.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold group-hover:text-primary transition leading-snug">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{b.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-primary hover:text-primary hover:shadow-md"
            >
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonial (Dark) ── */}
      <section className="relative py-24 bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <svg className="mx-auto h-10 w-10 text-indigo-500 opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.3 2.6C6.1 5.1 3 9.7 3 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S10.5 12 8 12c-.3 0-.6 0-.9.1C7.7 8.5 9.7 5.8 12.6 4l-1.3-1.4zm10 0C16.1 5.1 13 9.7 13 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S20.5 12 18 12c-.3 0-.6 0-.9.1C17.7 8.5 19.7 5.8 22.6 4l-1.3-1.4z" />
          </svg>
          <blockquote className="mt-8 text-2xl font-medium leading-relaxed md:text-3xl text-white">
            &ldquo;VELIQ transformed our online presence. Their software expertise
            paired with sharp marketing strategy doubled our customer
            acquisition in just six months.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-slate-500">
            — Sarah Mitchell, CEO at BrightPath
          </p>
        </div>
      </section>
    </>
  );
}
