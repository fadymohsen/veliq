import ContactForm from "./contact-form";
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

export default async function Home() {
  const services = await getServices();
  const allProjects = await getProjects();
  const projects = allProjects.slice(0, 6);
  return (
    <>
      {/* ── Navbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="text-2xl font-bold tracking-tight text-primary">
            VELIQ
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-primary transition">Services</a>
            <a href="#about" className="hover:text-primary transition">About</a>
            <a href="#work" className="hover:text-primary transition">Work</a>
            <Link href="/projects" className="hover:text-primary transition">Projects</Link>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark transition"
          >
            Get in Touch
          </a>
        </nav>
      </header>

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
            <a
              href="#services"
              className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition"
            >
              Explore Our Services
            </a>
            <a
              href="#work"
              className="rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 hover:border-primary hover:text-primary transition"
            >
              See Our Work
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-white">
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
        </div>
      </section>

      {/* ── About / Stats ── */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              About VELIQ
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              We Blend Technology &amp; Creativity
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              VELIQ is a full-service digital partner. Our team of engineers,
              designers, and marketers collaborate to deliver seamless digital
              experiences — from concept to launch and beyond.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Whether you need a robust SaaS platform, a mobile app, or a
              data-driven marketing strategy, we have the expertise to make it
              happen.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:mt-0 lg:w-1/2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-8 shadow-sm text-center">
                <p className="text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work / Portfolio ── */}
      <section id="work" className="py-24 bg-white">
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
                className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
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

      {/* ── Contact ── */}
      <section id="contact" className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact Us
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Let&apos;s Build Something Great
          </h2>
          <p className="mt-4 text-slate-600">
            Ready to take your business to the next level? Drop us a line and
            we&apos;ll get back to you within 24 hours.
          </p>
          <ContactForm />
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

/* ── Data ── */

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "40+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
  { value: "99%", label: "Client Satisfaction" },
];
