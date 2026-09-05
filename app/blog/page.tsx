import Footer from "@/components/sections/Footer";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Insights on web development, SEO, mobile apps, data analytics, brand strategy, and digital marketing.",
  alternates: { canonical: "https://www.veliq.co/blog" },
};

const ACCENT_MAP: Record<string, string> = {
  "Web Development":   "#6366f1",
  "SEO":               "#a855f7",
  "Mobile Development":"#f97316",
  "Data & Analytics":  "#06b6d4",
  "Brand Strategy":    "#f59e0b",
  "Digital Marketing": "#22c55e",
};

function PostThumb({ category, image, featured = false, index = 0 }: { category: string; image: string; size?: number; featured?: boolean; index?: number }) {
  const accent = ACCENT_MAP[category] ?? "#6366f1";
  return (
    <div
      className="w-full rounded-[15px] overflow-hidden relative"
      style={{ aspectRatio: featured ? "1.5" : "1.6" }}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="object-cover"
        priority={index === 0}
      />
      {/* Category badge */}
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
        {category}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">
        <Reveal>
          <div className="flex flex-col gap-4 max-w-[640px]">
            <span className="section-label" style={{ color: "rgb(99,102,241)" }}>Insights</span>
            <h1 className="heading-1 text-white">Blog.</h1>
            <p className="text-[rgb(160,160,160)]" style={{ fontSize: "16px", lineHeight: 1.6 }}>
              Notes on web development, SEO, and building sites that actually convert.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-12 rounded-[20px] p-3 lg:p-4 -m-3 lg:-m-4 transition-colors hover:bg-white/[0.02]"
              >
                <div className="relative">
                  <PostThumb category={featured.category} image={featured.image} featured index={0} />
                  <span
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-white uppercase"
                    style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", backgroundColor: "rgb(99,102,241)" }}
                  >
                    Latest
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="para-12 text-[rgb(124,124,124)]">{featured.date} &middot; {featured.readTime}</span>
                  <h2
                    className="text-white group-hover:text-[rgb(201,201,201)] transition-colors"
                    style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.2 }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-[rgb(160,160,160)]" style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "52ch" }}>
                    {featured.excerpt}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 mt-1"
                    style={{ fontSize: "13px", fontWeight: 600, color: "rgb(99,102,241)" }}
                  >
                    Read article
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4 h-full">
                  <PostThumb category={post.category} image={post.image} index={i + 1} />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className="para-12 text-[rgb(124,124,124)]">{post.date} &middot; {post.readTime}</span>
                    <h2
                      className="text-white group-hover:text-[rgb(201,201,201)] transition-colors"
                      style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: "1.3em" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-[rgb(124,124,124)] line-clamp-2" style={{ fontSize: "13px", lineHeight: 1.55 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 transition-colors"
                    style={{ fontSize: "12px", fontWeight: 600, color: "rgb(99,102,241)" }}
                  >
                    Read article
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
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
                See our work in action
              </h2>
              <p className="text-[rgb(160,160,160)]" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                Browse our client projects or explore the services behind them.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ border: "1px solid rgb(40,40,40)", fontSize: "13px", fontWeight: 500, padding: "10px 20px" }}
              >
                View Projects →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 20px" }}
              >
                Our Services →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <Footer />
    </main>
  );
}
