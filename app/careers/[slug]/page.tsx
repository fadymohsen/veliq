import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CAREERS, getCareer } from "@/lib/careers";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return CAREERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) return {};
  return {
    title: `${career.title} — Careers at VELIQ`,
    description: career.shortDesc,
    alternates: { canonical: `https://www.veliq.co/careers/${slug}` },
  };
}

function SectionList({ title, items, accent = "rgb(99,102,241)" }: { title: string; items: string[]; accent?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white" style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.03em" }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span style={{ fontSize: "15px", lineHeight: 1.65, color: "rgb(180,180,180)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = getCareer(slug);
  if (!career) notFound();

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Careers", url: "https://www.veliq.co/careers" },
        { name: career.title, url: `https://www.veliq.co/careers/${career.slug}` },
      ])} />

      <div className="section-padding max-w-[800px] mx-auto flex flex-col gap-10">

        {/* Breadcrumb */}
        <Reveal>
          <Link
            href="/careers"
            className="group inline-flex items-center gap-1.5 text-[rgb(124,124,124)] hover:text-white transition-colors w-fit"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Positions
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-black"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "12px", fontWeight: 600 }}
              >
                {career.department}
              </span>
              <span className="text-[rgb(160,160,160)]" style={{ fontSize: "13px" }}>
                {career.type} &middot; {career.location}
              </span>
            </div>
            <h1
              className="text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, lineHeight: "108%", letterSpacing: "-0.04em" }}
            >
              {career.title}
            </h1>
            <p style={{ fontSize: "17px", fontWeight: 450, lineHeight: 1.65, color: "rgb(210,210,210)" }}>
              {career.description}
            </p>
          </div>
        </Reveal>

        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* Content sections */}
        <Reveal>
          <SectionList title="What you'll do" items={career.responsibilities} />
        </Reveal>

        <Reveal>
          <SectionList title="What we're looking for" items={career.requirements} />
        </Reveal>

        {career.niceToHave.length > 0 && (
          <Reveal>
            <SectionList title="Nice to have" items={career.niceToHave} accent="rgb(160,160,160)" />
          </Reveal>
        )}

        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* Apply CTA */}
        <Reveal>
          <div
            className="rounded-[20px] p-8 flex flex-col gap-4"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <h3 className="text-white" style={{ fontSize: "19px", fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
              Interested in this role?
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
              Send your CV and portfolio (if applicable) to <a href="mailto:admin@veliq.co" className="text-[rgb(99,102,241)] hover:underline">admin@veliq.co</a> with the role title in the subject line. We respond within 3 business days.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href={`mailto:admin@veliq.co?subject=Application: ${career.title}`}
                className="inline-flex items-center gap-2 rounded-full text-white hover:brightness-110 transition-all"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 20px" }}
              >
                Apply Now →
              </a>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ border: "1px solid rgb(40,40,40)", fontSize: "13px", fontWeight: 500, padding: "10px 20px" }}
              >
                View All Positions
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
      <Footer />
    </main>
  );
}
