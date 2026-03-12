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

const values = [
  {
    icon: "💡",
    title: "Innovation First",
    desc: "We embrace emerging technologies and creative thinking to solve problems in ways others haven't imagined.",
  },
  {
    icon: "🎯",
    title: "Impact-Driven",
    desc: "Every line of code, every campaign, every design decision is measured by its real-world business impact.",
  },
  {
    icon: "🤝",
    title: "Radical Transparency",
    desc: "No black boxes. We keep you informed at every step with open communication and honest feedback.",
  },
  {
    icon: "🔄",
    title: "Continuous Growth",
    desc: "We invest in learning, experimentation, and improvement — for ourselves and for our clients.",
  },
  {
    icon: "⚡",
    title: "Speed & Quality",
    desc: "We move fast without cutting corners, delivering polished results on tight timelines.",
  },
  {
    icon: "🌍",
    title: "Client-Centric",
    desc: "Your goals are our goals. We tailor every solution to fit your unique business needs and vision.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            About VELIQ
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            We Blend Technology &amp; Creativity
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            A full-service digital partner delivering seamless experiences —
            from concept to launch and beyond.
          </p>
        </div>
      </section>

      {/* ── Who We Are + Stats ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Who We Are
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Your Digital Growth Partner
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              VELIQ is a full-service digital agency built by engineers,
              designers, and marketers who believe great software and smart
              marketing should work together — not in silos.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Whether you need a robust SaaS platform, a mobile app, or a
              data-driven marketing strategy, we bring the expertise, speed,
              and care to make it happen.
            </p>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Founded with a simple belief: businesses deserve a partner who
              understands both the technical and human sides of digital growth.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:mt-0 lg:w-1/2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm border border-slate-100 text-center"
              >
                <p className="text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-2 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-10 md:p-14 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.96-5.96M9.63 8.41A6 6 0 012.25 14.2" />
                  </svg>
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                  Our Mission
                </p>
                <h3 className="mt-3 text-2xl font-bold md:text-3xl leading-tight">
                  Empowering Businesses Through Digital Excellence
                </h3>
                <p className="mt-5 text-base text-indigo-100 leading-relaxed">
                  To deliver innovative, high-quality digital solutions that
                  drive measurable growth for our clients. We combine technical
                  expertise with creative strategy to transform ideas into
                  powerful digital products — helping businesses of all sizes
                  compete, scale, and thrive in the digital economy.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Innovate", "Deliver", "Grow"].map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-10 md:p-14 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm mb-6">
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                  Our Vision
                </p>
                <h3 className="mt-3 text-2xl font-bold md:text-3xl leading-tight">
                  The Go-To Partner for Digital Transformation
                </h3>
                <p className="mt-5 text-base text-slate-300 leading-relaxed">
                  To be the most trusted digital agency in the region —
                  recognized for building products that matter, campaigns that
                  convert, and partnerships that last. We envision a future
                  where every business, regardless of size, has access to
                  world-class digital solutions that unlock their full
                  potential.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Lead", "Transform", "Inspire"].map((word) => (
                    <span
                      key={word}
                      className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What Drives Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              The principles that guide every decision, every project, and every
              relationship we build.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl border border-slate-200 p-8 transition hover:shadow-lg hover:border-primary/40"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold">{v.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
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
