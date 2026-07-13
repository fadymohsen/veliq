import { ImageResponse } from "next/og";
import { SERVICES, getService } from "@/lib/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service?.title ?? "Service";
  const subtitle = service?.subtitle ?? "";

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
          <div style={{ fontSize: "14px", color: "#a5b4fc", letterSpacing: "2px" }}>SERVICE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "64px", fontWeight: 700, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1 }}>
            {title}
          </div>
          <div style={{ fontSize: "24px", color: "#a5b4fc", lineHeight: 1.4, maxWidth: "800px" }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
