import Footer from "@/components/sections/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export const metadata = {
  title: "Projects — VELIQ",
  description: "Real client projects across web development, SEO, mobile, brand strategy, and digital marketing.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
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
      <Footer />
    </main>
  );
}
