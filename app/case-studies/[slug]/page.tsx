import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { getService } from "@/lib/services";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.excerpt,
    alternates: { canonical: `https://www.veliq.co/case-studies/${slug}` },
  };
}

function SectionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:gap-16 gap-6">
      <span
        className="shrink-0 self-start px-4 py-1.5 rounded-full text-black"
        style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600 }}
      >
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const relatedStudies = CASE_STUDIES.filter((s) => s.slug !== cs.slug).slice(0, 3);

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Case Studies", url: "https://www.veliq.co/case-studies" },
        { name: cs.client, url: `https://www.veliq.co/case-studies/${cs.slug}` },
      ])} />

      <div className="section-padding max-w-[900px] mx-auto flex flex-col gap-12">

        {/* Breadcrumb */}
        <Reveal>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-1.5 text-[rgb(124,124,124)] hover:text-white transition-colors w-fit"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>
        </Reveal>

        {/* Hero image */}
        <Reveal>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
            <Image
              src={cs.image}
              alt={cs.client}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="rounded-full text-black px-3 py-1"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "12px", fontWeight: 600 }}
              >
                {cs.category}
              </span>
              <span className="text-[rgb(160,160,160)]" style={{ fontSize: "13px" }}>
                {cs.industry} &middot; {cs.client}
              </span>
            </div>
            <h1
              className="text-white"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, lineHeight: "112%", letterSpacing: "-0.04em" }}
            >
              {cs.title}
            </h1>
            <p style={{ fontSize: "17px", fontWeight: 450, lineHeight: 1.65, color: "rgb(210,210,210)" }}>
              {cs.excerpt}
            </p>
          </div>
        </Reveal>

        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* Challenge */}
        <Reveal>
          <SectionBlock label="Challenge">
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgb(180,180,180)" }}>
              {cs.challenge}
            </p>
          </SectionBlock>
        </Reveal>

        {/* Approach */}
        <Reveal>
          <SectionBlock label="Approach">
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgb(180,180,180)" }}>
              {cs.approach}
            </p>
          </SectionBlock>
        </Reveal>

        {/* Solution */}
        <Reveal>
          <SectionBlock label="Solution">
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgb(180,180,180)" }}>
              {cs.solution}
            </p>
          </SectionBlock>
        </Reveal>

        {/* Results */}
        <Reveal>
          <div className="flex flex-col gap-6">
            <span
              className="self-start px-4 py-1.5 rounded-full text-black"
              style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600 }}
            >
              Results
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cs.results.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 p-5 rounded-[16px]"
                  style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                >
                  <span style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "rgb(99,102,241)", lineHeight: 1 }}>
                    {r.metric}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "rgb(160,160,160)", lineHeight: 1.4 }}>
                    {r.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Services used */}
        {cs.services.length > 0 && (
          <Reveal>
            <div className="flex flex-col gap-4">
              <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Services delivered
              </h2>
              <div className="flex flex-wrap gap-2">
                {cs.services.map((svcSlug) => {
                  const svc = getService(svcSlug);
                  if (!svc) return null;
                  return (
                    <Link
                      key={svcSlug}
                      href={`/services/${svcSlug}`}
                      className="px-4 py-2 rounded-full text-white transition-colors hover:border-[rgb(99,102,241)]"
                      style={{ fontSize: "13px", fontWeight: 500, backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                    >
                      {svc.title} →
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
        )}

        {/* Testimonial */}
        {cs.testimonial && (
          <Reveal>
            <blockquote
              className="rounded-[20px] p-8 flex flex-col gap-4"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <p className="text-white italic" style={{ fontSize: "17px", lineHeight: 1.7, fontWeight: 450 }}>
                &ldquo;{cs.testimonial.quote}&rdquo;
              </p>
              <div className="flex flex-col">
                <span className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{cs.testimonial.name}</span>
                <span className="text-[rgb(160,160,160)]" style={{ fontSize: "13px" }}>{cs.testimonial.role}</span>
              </div>
            </blockquote>
          </Reveal>
        )}

        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* CTA */}
        <Reveal>
          <div
            className="rounded-[20px] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-white" style={{ fontSize: "19px", fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
                Want results like these?
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                Book a free discovery meeting — we'll assess your needs and recommend the right approach.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ border: "1px solid rgba(99,102,241,0.4)", fontSize: "13px", fontWeight: 500, padding: "10px 18px", color: "rgba(255,255,255,0.8)" }}
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full text-white hover:brightness-110 transition-all"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 18px" }}
              >
                Get a Quote →
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Related case studies */}
        {relatedStudies.length > 0 && (
          <div className="flex flex-col gap-6 pt-4">
            <h2
              className="text-white"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
            >
              More case studies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedStudies.map((r) => (
                <Link
                  key={r.slug}
                  href={`/case-studies/${r.slug}`}
                  className="group flex flex-col justify-between gap-4 h-full rounded-[16px] p-5 transition-colors hover:border-[rgba(99,102,241,0.4)]"
                  style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-white group-hover:text-[rgb(201,201,201)] transition-colors" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                      {r.client}
                    </span>
                    <span className="text-[rgb(160,160,160)] line-clamp-2" style={{ fontSize: "12px", lineHeight: 1.5 }}>
                      {r.excerpt}
                    </span>
                  </div>
                  <svg
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(99,102,241)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}
