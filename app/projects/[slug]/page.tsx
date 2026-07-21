import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import DeviceMockups from "@/components/ui/DeviceMockups";
import { PROJECTS, getProject, getOtherProjects } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `https://veliq.co/projects/${slug}` },
  };
}

// Dark-grey meta pill (Service / Client / Year) used in the intro.
function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span style={{ fontSize: "12px", fontWeight: 400, color: "rgb(201,201,201)", letterSpacing: "-0.5px" }}>
        {label}
      </span>
      <span
        className="text-white"
        style={{
          backgroundColor: "rgb(20,20,20)",
          borderRadius: "30px",
          padding: "8px 14px",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "-0.2px",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// Yellow "Problem" / "Solution" highlighter tag (sticky on the left).
function HighlighterTag({ label }: { label: string }) {
  return (
    <span
      className="shrink-0"
      style={{
        backgroundColor: "rgb(99,102,241)",
        color: "rgb(0,0,0)",
        borderRadius: "100px",
        padding: "7px 18px",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "-0.2px",
      }}
    >
      {label}
    </span>
  );
}

function ContentBlock({
  label,
  heading,
  body,
}: {
  label: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row md:justify-between items-start gap-10 md:gap-[120px] py-[60px]">
      <HighlighterTag label={label} />
      <div className="w-full md:w-[72%] flex flex-col gap-7">
        <h2 className="text-white" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
          {heading}
        </h2>
        <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.6, color: "rgb(201,201,201)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = getOtherProjects(slug, 4);

  return (
    <main className="bg-black min-h-screen flex flex-col items-center" style={{ padding: "0 24px 0" }}>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://veliq.co" },
        { name: "Projects", url: "https://veliq.co/projects" },
        { name: project.title, url: `https://veliq.co/projects/${project.slug}` },
      ])} />

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="w-full max-w-[1200px] flex items-center gap-2 text-sm text-[var(--text-body-light)]" style={{ paddingTop: "94px" }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span className="text-[var(--text-dim)]">/</span>
        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
        <span className="text-[var(--text-dim)]">/</span>
        <span className="text-white font-medium">{project.title}</span>
      </nav>

      {/* ── Intro ── */}
      <section className="w-full flex flex-col items-center gap-10 pt-6">
        <div className="w-full max-w-[600px] flex flex-col items-center text-center gap-4">
          <h1 className="heading-1 text-white">{project.title}</h1>
          <p className="para-26 text-white" style={{ textAlign: "center" }}>{project.description}</p>

          {/* Meta pills */}
          <div className="flex items-end justify-center gap-5 mt-2 flex-wrap">
            {(() => {
              const svc = SERVICES.find((s) => s.title === project.category);
              return svc ? (
                <Link href={`/services/${svc.slug}`} className="hover:opacity-80 transition-opacity">
                  <MetaPill label="Service" value={project.category} />
                </Link>
              ) : (
                <MetaPill label="Service" value={project.category} />
              );
            })()}
            <MetaPill label="Client" value={project.client} />
            <MetaPill label="Year" value={project.year} />
          </div>

          <Button
            label="Visit Website"
            href={project.url}
            variant="primary"
            openInNewTab
            className="mt-2"
          />
        </div>

        {/* ── Device mockups ── */}
        <div className="w-full max-w-[1200px]">
          <DeviceMockups
            url={project.url}
            title={project.title}
            previewImage={project.noEmbed ? project.preview : undefined}
            previewImageMobile={project.noEmbed ? (project.previewMobile ?? project.preview) : undefined}
          />
        </div>
      </section>

      {/* ── Problem ── */}
      <ContentBlock label="Problem" heading={project.problemHeading} body={project.problemBody} />

      {/* ── Two images side by side ── */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-1">
        {[project.image1, project.image2].map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden" style={{ aspectRatio: "1.246", borderRadius: "25px" }}>
            <Image src={src} alt={`${project.title} website design — screenshot ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={i === 0} />
          </div>
        ))}
      </div>

      {/* ── Solution ── */}
      <ContentBlock label="Solution" heading={project.solutionHeading} body={project.solutionBody} />

      {/* ── Results ── */}
      {project.results && project.results.length > 0 && (
        <section className="w-full max-w-[1200px] py-[60px]">
          <div className="flex flex-col gap-8">
            <HighlighterTag label="Results" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 p-6 rounded-[20px]"
                  style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                >
                  <span
                    className="text-white"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: "rgb(99,102,241)",
                    }}
                  >
                    {r.metric}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "rgb(201,201,201)", lineHeight: 1.4 }}>
                    {r.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section className="w-full max-w-[1520px] flex flex-col gap-[10px]">
        {project.gallery.map((src, i) => (
          <div key={i} className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", borderRadius: "25px" }}>
            <Image src={src} alt={`${project.title} website — full page view ${i + 1}`} fill sizes="100vw" className="object-cover" />
          </div>
        ))}
      </section>

      <div className="w-full flex justify-center" style={{ paddingTop: "60px" }}>
        <Button label="Visit Website" href={project.url} variant="primary" openInNewTab />
      </div>

      {/* ── CTA ── */}
      <section className="w-full max-w-[1200px] py-[60px]">
        <div
          className="rounded-[20px] p-10 flex flex-col items-center text-center gap-5"
          style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
        >
          <h2 className="text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Want results like these for your business?
          </h2>
          <p style={{ fontSize: "16px", color: "rgb(160,160,160)", lineHeight: 1.6, maxWidth: "50ch" }}>
            Book a free discovery meeting. We'll assess your needs and recommend the right approach — no commitment required.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "rgb(99,102,241)", fontSize: "14px", fontWeight: 600, padding: "12px 28px" }}
            >
              Get in Touch →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
              style={{ border: "1px solid rgb(40,40,40)", fontSize: "14px", fontWeight: 500, padding: "12px 24px" }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── Next project ── */}
      <section className="w-full max-w-[1200px] flex flex-col gap-20" style={{ padding: "100px 0" }}>
        <div className="flex justify-between items-end gap-6">
          <h2 className="heading-1 text-white">Next project.</h2>
          <Button label="All projects" href="/projects" variant="primary" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[10px] gap-y-10">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <div className="w-full" style={{ marginInline: "-24px", width: "calc(100% + 48px)" }}>
        <Footer />
      </div>
    </main>
  );
}
