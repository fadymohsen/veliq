import Link from "next/link";
import fs from "fs/promises";
import path from "path";

interface Project {
  slug: string;
  bg: string;
  tag: string;
  title: string;
  desc: string;
}

async function getProjects(): Promise<Project[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/projects.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Projects — VELIQ",
  description:
    "Explore our portfolio of software, marketing, and branding projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const tags = Array.from(new Set(projects.map((p) => p.tag)));

  return (
    <>
      {/* ── Navbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-primary"
          >
            VELIQ
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/#services" className="hover:text-primary transition">
              Services
            </Link>
            <Link href="/#about" className="hover:text-primary transition">
              About
            </Link>
            <Link
              href="/projects"
              className="text-primary font-semibold"
            >
              Work
            </Link>
            <Link href="/#contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>
          <Link
            href="/#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark transition"
          >
            Get in Touch
          </Link>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Work
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Projects &amp; Case Studies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Explore our portfolio of work across software development,
            marketing, analytics, and brand strategy.
          </p>
        </div>
      </section>

      {/* ── Projects by Category ── */}
      {tags.map((tag) => {
        const tagProjects = projects.filter((p) => p.tag === tag);
        return (
          <section key={tag} className="py-16 even:bg-slate-50 odd:bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold md:text-3xl mb-10">{tag}</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {tagProjects.map((p) => (
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
            </div>
          </section>
        );
      })}

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mt-4 text-indigo-200 text-lg">
            Let&apos;s turn your idea into reality. Get in touch to discuss your
            next project.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">Privacy</a>
            <a href="#" className="hover:text-primary transition">Terms</a>
            <a href="#" className="hover:text-primary transition">LinkedIn</a>
            <a href="#" className="hover:text-primary transition">Twitter</a>
          </div>
        </div>
      </footer>
    </>
  );
}
