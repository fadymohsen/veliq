import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata = {
  title: "Case Studies",
  description: "In-depth case studies showing how VELIQ helped real businesses grow through web development, SEO, and digital strategy.",
  alternates: { canonical: "https://www.veliq.co/case-studies" },
};

const CATEGORY_ACCENT: Record<string, string> = {
  "Website Development": "#6366f1",
  "SEO":                 "#a855f7",
  "Mobile Development":  "#f97316",
  "Marketing Strategy":  "#22c55e",
};

export default function CaseStudiesPage() {
  const [featured, ...rest] = CASE_STUDIES;

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">

        <Reveal>
          <div className="flex flex-col gap-4 max-w-[640px]">
            <span className="section-label" style={{ color: "rgb(99,102,241)" }}>Results</span>
            <h1 className="heading-1 text-white">Case Studies.</h1>
            <p className="text-[rgb(160,160,160)]" style={{ fontSize: "16px", lineHeight: 1.6 }}>
              The full story behind our client results — challenge, approach, solution, and measurable outcomes.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {/* Featured */}
          {featured && (
            <Reveal>
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-12 rounded-[20px] p-3 lg:p-4 -m-3 lg:-m-4 transition-colors hover:bg-white/[0.02]"
              >
                <div className="relative w-full rounded-[15px] overflow-hidden" style={{ aspectRatio: "1.5" }}>
                  <Image
                    src={featured.image}
                    alt={featured.client}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full uppercase"
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: CATEGORY_ACCENT[featured.category] ?? "#6366f1",
                      backgroundColor: `${CATEGORY_ACCENT[featured.category] ?? "#6366f1"}18`,
                      border: `1px solid ${CATEGORY_ACCENT[featured.category] ?? "#6366f1"}40`,
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {featured.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="para-12 text-[rgb(124,124,124)]">{featured.industry} &middot; {featured.client}</span>
                  <h2
                    className="text-white group-hover:text-[rgb(201,201,201)] transition-colors"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.2 }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[rgb(160,160,160)]" style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "52ch" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {featured.results.slice(0, 3).map((r, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-white" style={{ fontSize: "20px", fontWeight: 700, color: "rgb(99,102,241)" }}>{r.metric}</span>
                        <span className="text-[rgb(124,124,124)]" style={{ fontSize: "11px" }}>{r.detail}</span>
                      </div>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 mt-1"
                    style={{ fontSize: "13px", fontWeight: 600, color: "rgb(99,102,241)" }}
                  >
                    Read case study
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="w-full h-px" style={{ backgroundColor: "rgb(20,20,20)" }} />

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {rest.map((cs, i) => {
              const accent = CATEGORY_ACCENT[cs.category] ?? "#6366f1";
              return (
                <Reveal key={cs.slug} delay={Math.min(i * 0.06, 0.3)}>
                  <Link href={`/case-studies/${cs.slug}`} className="group flex flex-col gap-4 h-full">
                    <div className="relative w-full rounded-[15px] overflow-hidden" style={{ aspectRatio: "1.6" }}>
                      <Image
                        src={cs.image}
                        alt={cs.client}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <span
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full uppercase"
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: accent,
                          backgroundColor: `${accent}18`,
                          border: `1px solid ${accent}40`,
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {cs.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <span className="para-12 text-[rgb(124,124,124)]">{cs.industry} &middot; {cs.client}</span>
                      <h2
                        className="text-white group-hover:text-[rgb(201,201,201)] transition-colors"
                        style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: "1.3em" }}
                      >
                        {cs.title}
                      </h2>
                      <p className="text-[rgb(124,124,124)] line-clamp-2" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                        {cs.excerpt}
                      </p>
                    </div>
                    <span
                      className="inline-flex items-center gap-1 transition-colors"
                      style={{ fontSize: "12px", fontWeight: 600, color: "rgb(99,102,241)" }}
                    >
                      Read case study
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Cross-links */}
        <Reveal>
          <div
            className="rounded-[20px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                Ready to become the next case study?
              </h2>
              <p className="text-[rgb(160,160,160)]" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                Book a free discovery meeting or browse our services to find the right fit.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ border: "1px solid rgb(40,40,40)", fontSize: "13px", fontWeight: 500, padding: "10px 20px" }}
              >
                Our Services →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 20px" }}
              >
                Book a Meeting →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  );
}
