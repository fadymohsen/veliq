"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#000", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif", margin: 0 }}>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", maxWidth: "448px" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Critical Error
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
              Something broke.
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
              We hit an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: "rgb(99,102,241)",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                fontSize: 14,
                fontWeight: 600,
                padding: "12px 28px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
