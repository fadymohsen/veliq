import { ImageResponse } from "next/og";
import { SERVICES, getService } from "@/lib/services";
import { readFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const SERVICE_ACCENT: Record<string, string> = {
  "website-development":  "#818cf8",
  "seo":                   "#c084fc",
  "mobile-applications":   "#fb923c",
  "website-support":       "#22d3ee",
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service?.title ?? "Service";
  const subtitle = service?.subtitle ?? "";
  const accent = SERVICE_ACCENT[slug] ?? "#818cf8";

  let imgSrc: string | undefined;
  if (service?.image) {
    try {
      const buf = await readFile(join(process.cwd(), "public", service.image));
      const jpegBuf = await sharp(buf).jpeg({ quality: 70 }).toBuffer();
      imgSrc = `data:image/jpeg;base64,${jpegBuf.toString("base64")}`;
    } catch {
      imgSrc = undefined;
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#050310" }}>
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
          background: "linear-gradient(135deg, rgba(5,3,20,0.92) 0%, rgba(5,3,20,0.62) 60%, rgba(5,3,20,0.78) 100%)",
          display: "flex",
        }} />
        {/* Accent glow top-right */}
        <div style={{
          position: "absolute",
          top: "-80px", right: "-80px",
          width: "500px", height: "500px",
          borderRadius: "9999px",
          background: accent,
          opacity: 0.14,
          filter: "blur(100px)",
          display: "flex",
        }} />
        {/* Accent glow bottom-left */}
        <div style={{
          position: "absolute",
          bottom: "-60px", left: "-40px",
          width: "300px", height: "300px",
          borderRadius: "9999px",
          background: accent,
          opacity: 0.1,
          filter: "blur(70px)",
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
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "4px" }}>VELIQ</div>
            <div style={{ width: "36px", height: "2px", background: accent, display: "flex" }} />
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px" }}>SERVICE</div>
          </div>

          {/* Main */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "66px", fontWeight: 800, color: "#fff", letterSpacing: "-3px", lineHeight: 1.05 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, maxWidth: "760px" }}>
                {subtitle}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "32px", height: "2px", background: accent, display: "flex" }} />
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>veliq.co</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
