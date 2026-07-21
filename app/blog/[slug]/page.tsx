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
    alternates: { canonical: `https://veliq.co/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedServiceSlug = CATEGORY_TO_SERVICE[post.category];
  const relatedService = relatedServiceSlug ? getService(relatedServiceSlug) : undefined;

  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://veliq.co" },
        { name: "Blog", url: "https://veliq.co/blog" },
        { name: post.title, url: `https://veliq.co/blog/${post.slug}` },
      ])} />
      <article className="section-padding max-w-[760px] mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-4">
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
            <span className="para-12 text-[rgb(201,201,201)]">{post.date} · {post.readTime}</span>
          </div>
          <h1
            className="text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 600, lineHeight: "110%", letterSpacing: "-0.04em" }}
          >
            {post.title}
          </h1>
          <p className="text-[rgb(201,201,201)]" style={{ fontSize: "18px", lineHeight: 1.6 }}>
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[rgb(28,28,28)]" />

        {/* Content */}
        <div className="flex flex-col gap-6">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-white"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em", marginTop: "8px" }}
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-[rgb(201,201,201)] leading-relaxed"
                style={{ fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em" }}
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

        {/* Related Blog Posts */}
        {(() => {
          const related = BLOG_POSTS
            .filter((p) => p.slug !== post.slug && p.category === post.category)
            .slice(0, 3);
          if (related.length === 0) return null;
          return (
            <div className="flex flex-col gap-6 pt-6 border-t border-[rgb(28,28,28)]">
              <h2
                className="text-white"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
              >
                Related articles
              </h2>
              <div className="flex flex-col gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-[16px] p-5 transition-colors hover:border-[rgba(99,102,241,0.4)]"
                    style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-white group-hover:text-[rgb(201,201,201)] transition-colors" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                        {r.title}
                      </span>
                      <span className="text-[rgb(160,160,160)]" style={{ fontSize: "12px" }}>
                        {r.date} · {r.readTime}
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

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-[rgb(28,28,28)]">
          <div
            className="flex items-center justify-center rounded-full text-white"
            style={{ width: 40, height: 40, backgroundColor: "rgb(99,102,241)", fontSize: "14px", fontWeight: 700 }}
          >
            V
          </div>
          <div className="flex flex-col">
            <span className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{post.author}</span>
            <span className="text-[rgb(201,201,201)]" style={{ fontSize: "12px" }}>veliq.agency@gmail.com</span>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
