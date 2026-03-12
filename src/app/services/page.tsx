import Link from "next/link";
import fs from "fs/promises";
import path from "path";

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
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            What We Do
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            End-to-End Digital Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            From concept to launch and beyond — we design, build, and market
            digital products that help businesses scale and succeed.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-xl hover:border-primary/40"
              >
                {/* Colored header bar */}
                <div className={`h-2 ${s.bg}`} />
                <div className="p-8">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg} text-2xl text-white shadow-md`}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                    {s.desc}
                  </p>

                  {/* Key highlights */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {s.highlights.slice(0, 2).map((h) => (
                      <div key={h.label} className="rounded-lg bg-slate-50 px-3 py-2 text-center">
                        <p className="text-lg font-bold text-primary">{h.value}</p>
                        <p className="text-xs text-slate-500">{h.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn More
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why VELIQ ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              What Sets VELIQ Apart
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Overview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Approach
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              How We Deliver Results
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Every project follows our proven methodology — ensuring quality,
              transparency, and outcomes you can measure.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {generalProcess.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
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
            Tell us about your project and we&apos;ll show you how we can help.
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

const whyUs = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    desc: "We move quickly without cutting corners — launching projects on time, every time.",
  },
  {
    icon: "🎯",
    title: "Results-Driven",
    desc: "Every decision is backed by data. We focus on metrics that matter to your business.",
  },
  {
    icon: "🤝",
    title: "True Partnership",
    desc: "We embed with your team, not just deliver a product. Your success is our success.",
  },
  {
    icon: "🔄",
    title: "End-to-End",
    desc: "From strategy to execution to ongoing support — one team, no handoffs, no gaps.",
  },
];

const generalProcess = [
  {
    title: "Discover",
    desc: "We listen, research, and understand your goals, audience, and competitive landscape.",
  },
  {
    title: "Strategize",
    desc: "We craft a clear roadmap with milestones, deliverables, and success metrics.",
  },
  {
    title: "Execute",
    desc: "Our experts build, design, and launch with precision, keeping you in the loop at every step.",
  },
  {
    title: "Grow",
    desc: "We measure results, optimize performance, and help you scale what works.",
  },
];
