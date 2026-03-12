import Link from "next/link";
import fs from "fs/promises";
import path from "path";

interface Service {
  id: number;
  icon: string;
  title: string;
  desc: string;
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Software &amp; Marketing{" "}
            <span className="text-primary">Solutions</span> That Drive Growth
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            We design, build, and market digital products that help businesses
            scale — from custom software platforms to high-impact marketing
            campaigns.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/services"
              className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition"
            >
              Explore Our Services
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
            >
              See Our Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
            What We Do
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            End-to-End Digital Services
          </h2>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-slate-200 p-8 transition hover:shadow-lg hover:border-primary/40"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                  {s.icon}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
            >
              View All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects Preview ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Our Work
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            Recent Projects
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
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
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition">{p.title}</h3>
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

      {/* ── Blog Preview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
            From Our Blog
          </p>
          <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">
            Latest Insights
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
              >
                <div className={`h-48 ${b.bg}`} />
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
              className="inline-block rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
            >
              View All Articles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <svg className="mx-auto h-10 w-10 opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.3 2.6C6.1 5.1 3 9.7 3 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S10.5 12 8 12c-.3 0-.6 0-.9.1C7.7 8.5 9.7 5.8 12.6 4l-1.3-1.4zm10 0C16.1 5.1 13 9.7 13 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S20.5 12 18 12c-.3 0-.6 0-.9.1C17.7 8.5 19.7 5.8 22.6 4l-1.3-1.4z" />
          </svg>
          <blockquote className="mt-8 text-2xl font-medium leading-relaxed md:text-3xl">
            &ldquo;VELIQ transformed our online presence. Their software expertise
            paired with sharp marketing strategy doubled our customer
            acquisition in just six months.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-indigo-200">
            — Sarah Mitchell, CEO at BrightPath
          </p>
        </div>
      </section>
    </>
  );
}
