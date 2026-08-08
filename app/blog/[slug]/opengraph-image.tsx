import { ImageResponse } from "next/og";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const CATEGORY_THEME: Record<string, { bg: string; glow: string; accent: string; label: string }> = {
  "Web Development":   { bg: "#080814", glow: "#6366f1", accent: "#818cf8", label: "#c7d2fe" },
  "SEO":               { bg: "#0a0812", glow: "#a855f7", accent: "#c084fc", label: "#e9d5ff" },
  "Mobile Development":{ bg: "#0d0800", glow: "#f97316", accent: "#fb923c", label: "#fed7aa" },
  "Data & Analytics":  { bg: "#00080d", glow: "#06b6d4", accent: "#22d3ee", label: "#a5f3fc" },
  "Brand Strategy":    { bg: "#0d0a00", glow: "#f59e0b", accent: "#fbbf24", label: "#fde68a" },
  "Digital Marketing": { bg: "#020d04", glow: "#22c55e", accent: "#4ade80", label: "#bbf7d0" },
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Blog Post";
  const category = post?.category ?? "Blog";
  const readTime = post?.readTime ?? "";
  const excerpt = post?.excerpt ?? "";

  const theme = CATEGORY_THEME[category] ?? CATEGORY_THEME["Web Development"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          background: theme.bg,
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div style={{
          position: "absolute",
          bottom: "-120px",
          left: "-80px",
          width: "600px",
          height: "600px",
          borderRadius: "9999px",
          background: theme.glow,
          opacity: 0.18,
          filter: "blur(80px)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          top: "-80px",
          right: "100px",
          width: "300px",
          height: "300px",
          borderRadius: "9999px",
          background: theme.glow,
          opacity: 0.1,
          filter: "blur(60px)",
          display: "flex",
        }} />

        {/* Grid lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${theme.glow}18 1px, transparent 1px), linear-gradient(90deg, ${theme.glow}18 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          display: "flex",
        }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "56px 80px", position: "relative" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "3px" }}>VELIQ</div>
              <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)", display: "flex" }} />
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px" }}>BLOG</div>
            </div>
            {/* Category badge */}
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              color: theme.bg,
              background: theme.accent,
              padding: "8px 20px",
              borderRadius: "100px",
              letterSpacing: "0.5px",
              display: "flex",
            }}>
              {category}
            </div>
          </div>

          {/* Main title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
            <div style={{ fontSize: "54px", fontWeight: 800, color: "#fff", letterSpacing: "-2.5px", lineHeight: 1.1 }}>
              {title}
            </div>
            {excerpt && (
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, maxWidth: "780px" }}>
                {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ width: "36px", height: "2px", background: theme.accent, display: "flex" }} />
            <div style={{ fontSize: "14px", color: theme.label }}>veliq.co</div>
            {readTime && (
              <>
                <div style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.3)", display: "flex" }} />
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>{readTime}</div>
              </>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
