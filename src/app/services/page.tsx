import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import ScrollReveal from "../components/scroll-reveal";
import { ServiceIcon } from "../components/service-icons";

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
            {services.map((s, i) => (
              <ScrollReveal key={s.slug} animation="fade-up" delay={i * 100}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 transition-all duration-500 hover:shadow-xl hover:border-primary/40 hover:-translate-y-2"
                >
                  <div className={`h-2 ${s.bg} transition-all duration-500 group-hover:h-3`} />
                  <div className="p-8">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 text-slate-900 transition-all duration-500 group-hover:border-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                      <ServiceIcon slug={s.slug} />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                      {s.desc}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {s.highlights.slice(0, 2).map((h) => (
                        <div key={h.label} className="rounded-lg bg-slate-50 px-3 py-2 text-center transition-colors duration-300 group-hover:bg-primary/5">
                          <p className="text-lg font-bold text-primary">{h.value}</p>
                          <p className="text-xs text-slate-500">{h.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
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
        </div>
      </section>

      {/* ── Why VELIQ ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              What Sets VELIQ Apart
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} animation="fade-up" delay={i * 120}>
                <div className="text-center group">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 text-primary transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Overview ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
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
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {generalProcess.map((step, i) => (
              <ScrollReveal key={i} animation="scale" delay={i * 150}>
                <div className="relative text-center group">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-primary text-xl font-bold transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-indigo-200 text-lg">
              Tell us about your project and we&apos;ll show you how we can help.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-lg transition-all duration-300 hover:bg-indigo-50 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

const whyUs = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "We move quickly without cutting corners — launching projects on time, every time.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Results-Driven",
    desc: "Every decision is backed by data. We focus on metrics that matter to your business.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "True Partnership",
    desc: "We embed with your team, not just deliver a product. Your success is our success.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
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
