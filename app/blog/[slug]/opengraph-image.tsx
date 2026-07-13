import { ImageResponse } from "next/og";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Blog Post";
  const category = post?.category ?? "Blog";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0a0a14 0%, #1e1b4b 50%, #0a0a14 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "auto" }}>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#fff", letterSpacing: "4px" }}>VELIQ</div>
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #818cf8, #a78bfa)" }} />
          <div style={{ fontSize: "14px", color: "#a5b4fc", letterSpacing: "2px" }}>BLOG</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ background: "#6366f1", color: "#000", fontSize: "14px", fontWeight: 600, padding: "6px 16px", borderRadius: "100px" }}>
              {category}
            </div>
            <div style={{ color: "#94a3b8", fontSize: "14px", padding: "6px 0" }}>
              {readTime}
            </div>
          </div>
          <div style={{ fontSize: "52px", fontWeight: 700, color: "#fff", letterSpacing: "-2px", lineHeight: 1.15, maxWidth: "900px" }}>
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
