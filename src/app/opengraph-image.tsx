import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VELIQ — Software & Marketing Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a14 0%, #172554 50%, #0a0a14 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            background: "linear-gradient(90deg, #1E3A8A 0%, #2563EB 55%, #38BDF8 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          VELIQ
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            background: "linear-gradient(90deg, #7dd3fc, #60a5fa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Something Great Is Coming
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#94a3b8",
            marginTop: 20,
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Software & Marketing Solutions That Drive Growth
        </div>
      </div>
    ),
    { ...size }
  );
}
