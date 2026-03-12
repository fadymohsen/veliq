import Link from "next/link";
import ScrollReveal from "../components/scroll-reveal";

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
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Innovation First",
    desc: "We embrace emerging technologies and creative thinking to solve problems in ways others haven't imagined.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Impact-Driven",
    desc: "Every line of code, every campaign, every design decision is measured by its real-world business impact.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Radical Transparency",
    desc: "No black boxes. We keep you informed at every step with open communication and honest feedback.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    title: "Continuous Growth",
    desc: "We invest in learning, experimentation, and improvement — for ourselves and for our clients.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Speed & Quality",
    desc: "We move fast without cutting corners, delivering polished results on tight timelines.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Client-Centric",
    desc: "Your goals are our goals. We tailor every solution to fit your unique business needs and vision.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a14]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse-glow" />
          <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] animate-float-slow" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div className="animate-fade-in-up">
            <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              About VELIQ
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              We Blend Technology &amp;{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Creativity
              </span>
            </h1>
          </div>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
            A full-service digital partner delivering seamless experiences —
            from concept to launch and beyond.
          </p>
        </div>
      </section>

      {/* ── Who We Are + Stats ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-16">
          <ScrollReveal animation="fade-up" className="lg:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Who We Are
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Your Digital Growth Partner
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              VELIQ is a full-service digital agency built by engineers,
              designers, and marketers who believe great software and smart
              marketing should work together — not in silos.
            </p>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Whether you need a robust SaaS platform, a mobile app, or a
              data-driven marketing strategy, we bring the expertise, speed,
              and care to make it happen.
            </p>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Founded with a simple belief: businesses deserve a partner who
              understands both the technical and human sides of digital growth.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:mt-0 lg:w-1/2">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} animation="scale" delay={i * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 text-center transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30">
                  <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Mission & Vision ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <ScrollReveal animation="fade-up">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 md:p-14">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] mb-6">
                    <svg className="h-7 w-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.96-5.96M9.63 8.41A6 6 0 012.25 14.2" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                    Our Mission
                  </p>
                  <h3 className="mt-3 text-2xl font-bold md:text-3xl leading-tight text-white">
                    Empowering Businesses Through Digital Excellence
                  </h3>
                  <p className="mt-5 text-base text-slate-400 leading-relaxed">
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
                        className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 md:p-14">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] mb-6">
                    <svg className="h-7 w-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                    Our Vision
                  </p>
                  <h3 className="mt-3 text-2xl font-bold md:text-3xl leading-tight text-white">
                    The Go-To Partner for Digital Transformation
                  </h3>
                  <p className="mt-5 text-base text-slate-400 leading-relaxed">
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
                        className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* ── Core Values ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-cyan-600/6 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              What Drives Us
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-white">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              The principles that guide every decision, every project, and every
              relationship we build.
            </p>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} animation="fade-up" delay={i * 100}>
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/30 hover:-translate-y-2">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/15 group-hover:border-white/25">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider glow line ── */}
      <div className="mx-auto max-w-xs h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Testimonial ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="scale">
            <svg className="mx-auto h-12 w-12 text-indigo-500/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.3 2.6C6.1 5.1 3 9.7 3 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S10.5 12 8 12c-.3 0-.6 0-.9.1C7.7 8.5 9.7 5.8 12.6 4l-1.3-1.4zm10 0C16.1 5.1 13 9.7 13 15c0 3.3 2.2 6 5 6 2.5 0 4.5-2 4.5-4.5S20.5 12 18 12c-.3 0-.6 0-.9.1C17.7 8.5 19.7 5.8 22.6 4l-1.3-1.4z" />
            </svg>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <blockquote className="mt-8 text-2xl font-medium leading-relaxed md:text-3xl text-white">
              &ldquo;VELIQ transformed our online presence. Their software expertise
              paired with sharp marketing strategy doubled our customer
              acquisition in just six months.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-slate-500">
              — Sarah Mitchell, CEO at BrightPath
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-indigo-600/12 blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl font-bold md:text-5xl text-white">
              Want to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Work With Us
              </span>
              ?
            </h2>
            <p className="mt-6 text-lg text-slate-400">
              We&apos;d love to hear about your project. Let&apos;s make it happen.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              Get in Touch
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
