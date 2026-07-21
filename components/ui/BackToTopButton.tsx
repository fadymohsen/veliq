"use client";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity w-fit"
      style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}
    >
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid rgb(38,38,38)", color: "white", fontSize: "14px",
      }}>↑</span>
      Back to top
    </button>
  );
}
