import { ImageResponse } from "next/og";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const CATEGORY_ACCENT: Record<string, string> = {
  "Web Development":    "#818cf8",
  "SEO":                "#c084fc",
  "Mobile Development": "#fb923c",
  "Data & Analytics":   "#22d3ee",
  "Brand Strategy":     "#fbbf24",
  "Digital Marketing":  "#4ade80",
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "Blog Post";
  const category = post?.category ?? "Blog";
  const readTime = post?.readTime ?? "";
  const excerpt = post?.excerpt ?? "";
  const accent = CATEGORY_ACCENT[category] ?? "#818cf8";

  let imgSrc: string | undefined;
  if (post?.image) {
    try {
      const buf = await readFile(join(process.cwd(), "public", post.image));
      const jpegBuf = await sharp(buf).jpeg({ quality: 70 }).toBuffer();
      imgSrc = `data:image/jpeg;base64,${jpegBuf.toString("base64")}`;
    } catch {
      imgSrc = undefined;
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#080814" }}>
        {/* Background photo */}
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.75) 100%)",
          display: "flex",
        }} />
        {/* Accent glow */}
        <div style={{
          position: "absolute",
          bottom: "-80px", left: "-60px",
          width: "420px", height: "420px",
          borderRadius: "9999px",
          background: accent,
          opacity: 0.18,
          filter: "blur(90px)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          top: "-60px", right: "80px",
          width: "260px", height: "260px",
          borderRadius: "9999px",
          background: accent,
          opacity: 0.1,
          filter: "blur(60px)",
          display: "flex",
        }} />

        {/* Content */}
        <div style={{
          position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "52px 72px",
          height: "100%", width: "100%",
          fontFamily: "sans-serif",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "3px" }}>VELIQ</div>
              <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.25)", display: "flex" }} />
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px" }}>BLOG</div>
            </div>
            <div style={{
              fontSize: "12px", fontWeight: 700,
              color: "#000",
              background: accent,
              padding: "7px 18px",
              borderRadius: "100px",
              letterSpacing: "0.5px",
              display: "flex",
            }}>
              {category}
            </div>
          </div>

          {/* Main */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "860px" }}>
            <div style={{ fontSize: "52px", fontWeight: 800, color: "#fff", letterSpacing: "-2.5px", lineHeight: 1.1 }}>
              {title}
            </div>
            {excerpt && (
              <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, maxWidth: "720px" }}>
                {excerpt.length > 110 ? excerpt.slice(0, 110) + "…" : excerpt}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "32px", height: "2px", background: accent, display: "flex" }} />
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>veliq.co</div>
            {readTime && (
              <>
                <div style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.25)", display: "flex" }} />
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{readTime}</div>
              </>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
