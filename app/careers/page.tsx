import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CAREERS } from "@/lib/careers";

export const metadata = {
  title: "Careers",
  description: "Join VELIQ — open positions in engineering, design, marketing, and operations. Build websites and digital experiences that actually move the needle.",
  alternates: { canonical: "https://www.veliq.co/careers" },
};

const DEPT_COLORS: Record<string, string> = {
  Engineering: "#6366f1",
  Marketing:   "#22c55e",
  Design:      "#f59e0b",
  Operations:  "#06b6d4",
};

export default function CareersPage() {
  const departments = [...new Set(CAREERS.map((c) => c.department))];

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">

        <Reveal>
          <div className="flex flex-col gap-4 max-w-[640px]">
            <span className="section-label" style={{ color: "rgb(99,102,241)" }}>Join the team</span>
            <h1 className="heading-1 text-white">Careers.</h1>
            <p className="text-[rgb(160,160,160)]" style={{ fontSize: "16px", lineHeight: 1.6 }}>
              We build websites and digital experiences that actually move the needle. If that sounds like the kind of work you want to do, we'd like to hear from you.
            </p>
          </div>
        </Reveal>

        {/* Why VELIQ */}
        <Reveal>
          <div
            className="rounded-[20px] p-8 grid grid-cols-1 sm:grid-cols-3 gap-8"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            {[
              { title: "Real client work from day one", desc: "No internal busywork. You'll ship production work for real businesses within your first week." },
              { title: "Small team, big ownership", desc: "No layers of approvals. You own your work end-to-end and see the impact directly." },
              { title: "Growth over titles", desc: "We invest in skills, not org charts. Learn across disciplines and grow into the role you want." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <h3 className="text-white" style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {item.title}
                </h3>
                <p className="text-[rgb(160,160,160)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Open positions by department */}
        <div className="flex flex-col gap-12">
          {departments.map((dept) => {
            const positions = CAREERS.filter((c) => c.department === dept);
            const accent = DEPT_COLORS[dept] ?? "#6366f1";
            return (
              <Reveal key={dept}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <h2 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                      {dept}
                    </h2>
                    <span className="text-[rgb(124,124,124)]" style={{ fontSize: "13px" }}>
                      {positions.length} {positions.length === 1 ? "position" : "positions"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {positions.map((career) => (
                      <Link
                        key={career.slug}
                        href={`/careers/${career.slug}`}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 p-5 rounded-[16px] transition-all duration-200 hover:border-[rgb(99,102,241)]"
                        style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                      >
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="text-white group-hover:text-[rgb(201,201,201)] transition-colors" style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                            {career.title}
                          </h3>
                          <p className="text-[rgb(124,124,124)]" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                            {career.shortDesc}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[rgb(160,160,160)]" style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                            {career.location}
                          </span>
                          <span
                            className="px-2.5 py-1 rounded-full"
                            style={{ fontSize: "11px", fontWeight: 600, color: accent, backgroundColor: `${accent}18`, border: `1px solid ${accent}40` }}
                          >
                            {career.type}
                          </span>
                          <svg
                            className="shrink-0 transition-transform group-hover:translate-x-1"
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(99,102,241)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Don't see a fit CTA */}
        <Reveal>
          <div
            className="rounded-[20px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Don't see a role that fits?
              </h2>
              <p className="text-[rgb(160,160,160)]" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                Send us your portfolio anyway. We're always looking for talented people and create roles for the right ones.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity shrink-0"
              style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 20px" }}
            >
              Get in Touch →
            </Link>
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  );
}
