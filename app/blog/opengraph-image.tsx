import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/lib/blog";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Use the first three blog images as a triptych background
  const photos = BLOG_POSTS.slice(0, 3).map((p) => p.image);
  const imgSrcs: (string | undefined)[] = [];
  for (const photo of photos) {
    try {
      const buf = await readFile(join(process.cwd(), "public", photo));
      const pngBuf = await sharp(buf).png().toBuffer();
      imgSrcs.push(`data:image/png;base64,${pngBuf.toString("base64")}`);
    } catch {
      imgSrcs.push(undefined);
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#080814" }}>
        {/* Triptych background */}
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {imgSrcs.map((src, i) =>
            src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                style={{ width: "33.33%", height: "100%", objectFit: "cover", opacity: i === 0 ? 1 : i === 1 ? 0.7 : 0.4 }}
              />
            ) : (
              <div key={i} style={{ width: "33.33%", height: "100%", background: "#111" }} />
            )
          )}
        </div>
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-80px", left: "-60px",
          width: "400px", height: "400px",
          borderRadius: "9999px",
          background: "#6366f1",
          opacity: 0.18,
          filter: "blur(90px)",
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
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff", letterSpacing: "3px" }}>VELIQ</div>
            <div style={{ width: "36px", height: "2px", background: "#818cf8", display: "flex" }} />
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px" }}>BLOG</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "66px", fontWeight: 800, color: "#fff", letterSpacing: "-3px", lineHeight: 1.05 }}>
              Blog
            </div>
            <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, maxWidth: "680px" }}>
              Insights on web development, SEO, and digital strategy for growing businesses.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "32px", height: "2px", background: "#818cf8", display: "flex" }} />
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>veliq.co</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
