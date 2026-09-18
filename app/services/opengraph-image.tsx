import { ImageResponse } from "next/og";
import { SERVICES } from "@/lib/services";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  // Use the first three service images as a triptych
  const photos = SERVICES.slice(0, 3).map((s) => s.image);
  const imgSrcs: (string | undefined)[] = [];
  for (const photo of photos) {
    try {
      const buf = await readFile(join(process.cwd(), "public", photo));
      const ext = photo.endsWith(".png") ? "png" : "jpeg";
      imgSrcs.push(`data:image/${ext};base64,${buf.toString("base64")}`);
    } catch {
      imgSrcs.push(undefined);
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#050310" }}>
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
          background: "linear-gradient(90deg, rgba(5,3,20,0.94) 0%, rgba(5,3,20,0.72) 50%, rgba(5,3,20,0.5) 100%)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          top: "-80px", right: "-80px",
          width: "450px", height: "450px",
          borderRadius: "9999px",
          background: "#818cf8",
          opacity: 0.15,
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
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#fff", letterSpacing: "4px" }}>VELIQ</div>
            <div style={{ width: "36px", height: "2px", background: "#818cf8", display: "flex" }} />
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "3px" }}>SERVICES</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: "66px", fontWeight: 800, color: "#fff", letterSpacing: "-3px", lineHeight: 1.05 }}>
              Our Services
            </div>
            <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.6)", lineHeight: 1.4, maxWidth: "680px" }}>
              Website development, SEO, and mobile apps — built for results.
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
