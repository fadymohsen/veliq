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
