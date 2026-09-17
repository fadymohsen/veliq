import Link from "next/link";
import Footer from "@/components/sections/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Website Development Portfolio",
  description: "Real client projects across web development, SEO, mobile, brand strategy, and digital marketing — built by VELIQ for businesses in Egypt, Saudi Arabia, UAE, and the US.",
  alternates: { canonical: "https://www.veliq.co/projects" },
  openGraph: {
    title: "Website Development Portfolio — VELIQ",
    description: "Real client projects across web development, SEO, mobile, brand strategy, and digital marketing for businesses in Egypt, Saudi Arabia, UAE, and the US.",
    url: "https://www.veliq.co/projects",
    images: [{ url: "https://www.veliq.co/projects/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Website Development Portfolio — VELIQ",
    description: "Real client projects across web development, SEO, mobile, and digital marketing.",
    images: ["https://www.veliq.co/projects/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Projects", url: "https://www.veliq.co/projects" },
      ])} />
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="flex items-start gap-3">
          <h1 className="heading-1 text-white">Projects.</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] gap-y-10">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="section-padding max-w-[1200px] mx-auto">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to start your project?</h2>
            <p className="mt-3 text-slate-400 text-base max-w-lg">Explore our services or read our blog for insights on web development, SEO, and digital strategy.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/services" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition text-center">Our Services</Link>
            <Link href="/blog" className="rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-300 hover:bg-white/[0.1] hover:text-white transition text-center">Read the Blog</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
