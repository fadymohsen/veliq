import Link from "next/link";

export const metadata = {
  title: "About Us — VELIQ",
  description:
    "Learn about VELIQ — a full-service digital partner blending technology and creativity.",
};

const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "40+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            About VELIQ
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            We Blend Technology &amp; Creativity
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            A full-service digital partner delivering seamless experiences —
            from concept to launch and beyond.
          </p>
        </div>
      </section>

      {/* ── About Content ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold md:text-4xl">
              Who We Are
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
              <div key={s.label} className="rounded-2xl bg-slate-50 p-8 shadow-sm text-center">
                <p className="text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
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

      {/* ── CTA ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Want to Work With Us?
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            We&apos;d love to hear about your project. Let&apos;s make it happen.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
