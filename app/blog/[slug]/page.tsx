import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { getService } from "@/lib/services";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const CATEGORY_TO_SERVICE: Record<string, string> = {
  "Web Development": "website-development",
  "Mobile Development": "website-development",
  "Brand Strategy": "website-development",
  "Digital Marketing": "website-development",
  "SEO": "seo",
  "Data & Analytics": "website-support",
};

const CATEGORY_COVER: Record<string, { glow: string; accent: string; grid: string }> = {
  "Web Development":   { glow: "#6366f1", accent: "#818cf8", grid: "#6366f118" },
  "SEO":               { glow: "#a855f7", accent: "#c084fc", grid: "#a855f718" },
  "Mobile Development":{ glow: "#f97316", accent: "#fb923c", grid: "#f9731618" },
  "Data & Analytics":  { glow: "#06b6d4", accent: "#22d3ee", grid: "#06b6d418" },
  "Brand Strategy":    { glow: "#f59e0b", accent: "#fbbf24", grid: "#f59e0b18" },
  "Digital Marketing": { glow: "#22c55e", accent: "#4ade80", grid: "#22c55e18" },
};

function CategoryCoverIcon({ category }: { category: string }) {
  const common = { width: 64, height: 64, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (category) {
    case "Web Development":   return <svg {...common}><path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" /></svg>;
    case "SEO":               return <svg {...common}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case "Mobile Development":return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
    case "Data & Analytics":  return <svg {...common}><line x1="6" y1="20" x2="6" y2="14" /><line x1="12" y1="20" x2="12" y2="8" /><line x1="18" y1="20" x2="18" y2="4" /></svg>;
    case "Brand Strategy":    return <svg {...common}><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>;
    case "Digital Marketing": return <svg {...common}><path d="M3 11l18-6v14l-18-6v-2z" /><path d="M7 15v4a2 2 0 0 0 2 2h1" /></svg>;
    default:                  return null;
  }
}

function BlogCoverImage({ category, postIndex }: { category: string; postIndex: number }) {
  const cover = CATEGORY_COVER[category] ?? CATEGORY_COVER["Web Development"];
  const num = String(postIndex + 1).padStart(2, "0");
  return (
    <div
      className="w-full rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: "1200/420", background: "#080812" }}
      aria-hidden="true"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${cover.grid} 1px, transparent 1px), linear-gradient(90deg, ${cover.grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow bottom-left */}
      <div className="absolute" style={{ bottom: "-80px", left: "-60px", width: "420px", height: "420px", borderRadius: "9999px", background: cover.glow, opacity: 0.22, filter: "blur(80px)" }} />
      {/* Glow top-right */}
      <div className="absolute" style={{ top: "-60px", right: "120px", width: "200px", height: "200px", borderRadius: "9999px", background: cover.glow, opacity: 0.12, filter: "blur(50px)" }} />
      {/* Large post number */}
      <span
        className="absolute select-none font-bold"
        style={{
          right: "40px",
          bottom: "-16px",
          fontSize: "clamp(100px, 18vw, 200px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.06em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {num}
      </span>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-widest" style={{ fontSize: 13, letterSpacing: "3px" }}>VELIQ</span>
          <span className="opacity-30 text-white">·</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>BLOG</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{ fontSize: 12, letterSpacing: "0.5px", border: `1px solid ${cover.accent}55`, color: cover.accent, background: `${cover.glow}22` }}
          >
            {category}
          </div>
          <div style={{ opacity: 0.5 }}>
            <CategoryCoverIcon category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function renderLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link key={i} href={match[2]} className="text-[rgb(99,102,241)] hover:underline transition-colors">
          {match[1]}
        </Link>
      );
    }
    return part;
  });
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.veliq.co/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedServiceSlug = CATEGORY_TO_SERVICE[post.category];
  const relatedService = relatedServiceSlug ? getService(relatedServiceSlug) : undefined;
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);

  const toc = post.content
    .filter((block) => block.startsWith("## "))
    .map((block) => {
      const text = block.replace("## ", "");
      return { id: slugify(text), text };
    });

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Blog", url: "https://www.veliq.co/blog" },
        { name: post.title, url: `https://www.veliq.co/blog/${post.slug}` },
      ])} />

      <div className="section-padding max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-x-16 gap-y-12">

        <article className="max-w-[700px] flex flex-col gap-10">

          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-[rgb(124,124,124)] hover:text-white transition-colors w-fit"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Cover image */}
          <BlogCoverImage category={post.category} postIndex={postIndex} />

          {/* Header */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="rounded-full text-black"
                style={{
                  backgroundColor: "rgb(99,102,241)",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 14px",
                  letterSpacing: "-0.2px",
                }}
              >
                {post.category}
              </span>
              <span className="para-12 text-[rgb(201,201,201)]">{post.date} &middot; {post.readTime}</span>
            </div>
            <h1
              className="text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: "108%", letterSpacing: "-0.04em" }}
            >
              {post.title}
            </h1>
            <p style={{ fontSize: "19px", fontWeight: 450, lineHeight: 1.65, color: "rgb(210,210,210)" }}>
              {post.excerpt}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[rgb(28,28,28)]" />

          {/* Content */}
          <div className="flex flex-col gap-6">
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                const text = block.replace("## ", "");
                return (
                  <div key={i} id={slugify(text)} className="flex items-center gap-3 scroll-mt-28" style={{ marginTop: "20px" }}>
                    <span aria-hidden style={{ width: "20px", height: "1px", backgroundColor: "rgb(99,102,241)", flexShrink: 0 }} />
                    <h2
                      className="text-white"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
                    >
                      {text}
                    </h2>
                  </div>
                );
              }
              if (block.startsWith("### ")) {
                const text = block.replace("### ", "");
                return (
                  <p
                    key={i}
                    className="text-white"
                    style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.5, marginTop: "8px" }}
                  >
                    {text}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  style={{ fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.75, color: "rgb(180,180,180)" }}
                >
                  {renderLinks(block)}
                </p>
              );
            })}
          </div>

          {/* Related service */}
          {relatedService && (
            <Link
              href={`/services/${relatedService.slug}`}
              className="group flex items-center justify-between gap-4 rounded-[16px] p-6 transition-colors hover:border-[rgba(99,102,241,0.4)]"
              style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
            >
              <div className="flex flex-col gap-1">
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(99,102,241)" }}>
                  Related Service
                </span>
                <span className="text-white" style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {relatedService.title}
                </span>
                <span className="text-[rgb(160,160,160)]" style={{ fontSize: "13px", lineHeight: 1.5, maxWidth: "56ch" }}>
                  {relatedService.desc}
                </span>
              </div>
              <svg
                className="shrink-0 transition-transform group-hover:translate-x-1"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(99,102,241)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </article>

        {/* On this page */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div
              className="sticky flex flex-col gap-4"
              style={{ top: "112px", maxHeight: "calc(100vh - 136px)", overflowY: "auto" }}
            >
              <span className="section-label-sm text-[rgb(124,124,124)]">On this page</span>
              <nav className="flex flex-col gap-3 border-l border-[rgb(28,28,28)] pl-4 pb-2">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="text-[rgb(140,140,140)] hover:text-white transition-colors"
                    style={{ fontSize: "13px", lineHeight: 1.4 }}
                  >
                    {t.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Related Blog Posts */}
        {(() => {
          const sameCategory = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
          const others = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
          const related = [...sameCategory, ...others].slice(0, 3);
          if (related.length === 0) return null;
          return (
            <div className="lg:col-span-2 flex flex-col gap-6 pt-10 border-t border-[rgb(28,28,28)]">
              <h2
                className="text-white"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
              >
                Related articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col justify-between gap-4 h-full rounded-[16px] p-5 transition-colors hover:border-[rgba(99,102,241,0.4)]"
                    style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-white group-hover:text-[rgb(201,201,201)] transition-colors" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                        {r.title}
                      </span>
                      <span className="text-[rgb(160,160,160)]" style={{ fontSize: "12px" }}>
                        {r.date} &middot; {r.readTime}
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
          );
        })()}

      </div>
      <Footer />
    </main>
  );
}
