import Link from "next/link";
import fs from "fs/promises";
import path from "path";

interface Service {
  id: number;
  icon: string;
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

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services — VELIQ",
  description:
    "Explore VELIQ's full range of digital services including web development, mobile apps, SEO, marketing, analytics, and brand strategy.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            What We Do
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            End-to-End Digital Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            From concept to launch — we design, build, and market digital
            products that help businesses scale.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-indigo-200 text-lg">
            Let&apos;s discuss how our services can help grow your business.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
