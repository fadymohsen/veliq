import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

/* Pick projects with the most impressive results to showcase */
const FEATURED_RESULTS = [
  { slug: "alfa-transport", quote: "The platform now generates 3x more qualified enterprise inquiries per month.", person: "Alfa Transport Team", role: "Saudi Arabia" },
  { slug: "fanous-clinic", quote: "Appointment bookings increased 75%, with a 40% reduction in phone inquiries.", person: "Fanous Clinic", role: "Egypt" },
  { slug: "coach-shiko", quote: "Organic inquiries grew from zero to 40+ per month within five months of launch.", person: "Coach Mohamed Roshdy", role: "Egypt" },
  { slug: "redbone-gym", quote: "New member sign-ups increased 90% in the first quarter post-launch.", person: "RedBone Gym", role: "Egypt" },
];

export default function ResultsSection() {
  return (
    <section className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <span className="section-label text-[var(--accent-teal)]">Real Results</span>
          <h2
            className="text-white font-semibold tracking-[-0.05em] leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            What our clients achieved.
          </h2>
          <p className="text-[var(--text-body)] text-base leading-[1.7] max-w-[56ch]">
            Every number below is from a real project. Click any card to see the full case study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_RESULTS.map((item) => {
            const project = PROJECTS.find((p) => p.slug === item.slug);
            if (!project?.results) return null;
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group card p-8 flex flex-col gap-6 transition-colors hover:border-[var(--accent-indigo)]"
              >
                {/* Metrics row */}
                <div className="flex gap-6">
                  {project.results.slice(0, 2).map((r) => (
                    <div key={r.metric} className="flex flex-col gap-1">
                      <span className="text-[var(--accent-indigo)] font-bold tracking-[-0.04em] leading-none" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                        {r.metric}
                      </span>
                      <span className="text-[var(--text-body)] text-xs leading-[1.4]">{r.detail}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[var(--text-secondary)] text-sm leading-[1.65] italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold">{item.person}</span>
                    <span className="text-[var(--text-subtle)] text-xs">{item.role}</span>
                  </div>
                  <span className="text-[var(--accent-indigo)] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View case study →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
