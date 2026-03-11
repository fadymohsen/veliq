import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import ContactForm from "../../contact-form";

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
            <Link href="/#work" className="hover:text-primary transition">
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
      <section className="relative pt-28 pb-0">
        <div className={`mx-auto max-w-7xl px-6`}>
          <div className="mb-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition"
            >
              &larr; Back to Projects
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {project.tag}
              </span>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                {project.desc}
              </p>
            </div>
          </div>
          <div
            className={`w-full h-64 md:h-96 rounded-2xl ${project.bg}`}
          />
        </div>
      </section>

      {/* ── Description ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl">About This Project</h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            {project.fullDesc}
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl mb-10">Gallery</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((item, i) => (
              <div key={i} className="overflow-hidden rounded-2xl">
                <div className={`h-56 md:h-72 ${item.bg}`} />
                <div className="bg-white px-5 py-4 border border-t-0 border-slate-200 rounded-b-2xl">
                  <p className="text-sm font-medium text-slate-700">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl mb-10">
              Related Projects
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
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
      )}

      {/* ── Contact ── */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Interested?
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Let&apos;s Build Something Like This
          </h2>
          <p className="mt-4 text-slate-600">
            Have a similar project in mind? Get in touch and we&apos;ll bring
            your vision to life.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary transition">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
