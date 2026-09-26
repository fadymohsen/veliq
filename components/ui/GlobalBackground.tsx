export default function GlobalBackground() {
  return (
    <>
      {/* ─── Desktop: fixed corner glows ─── */}
      <div
        aria-hidden="true"
        className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2, contain: "layout paint" }}
      >
        {/* Indigo — top-left corner */}
        <div style={{
          position: "absolute", top: "-25%", left: "-25%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
        {/* Purple — top-right corner */}
        <div style={{
          position: "absolute", top: "-20%", right: "-25%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
        {/* Teal — mid-left edge */}
        <div style={{
          position: "absolute", top: "40%", left: "-30%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(45,212,191,0.11) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
        {/* Pink — mid-right edge */}
        <div style={{
          position: "absolute", top: "50%", right: "-30%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(236,72,153,0.11) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
        {/* Sky — bottom-left corner */}
        <div style={{
          position: "absolute", bottom: "-20%", left: "-20%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
        {/* Green — bottom-right corner */}
        <div style={{
          position: "absolute", bottom: "-20%", right: "-20%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 60%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* ─── Mobile: reduced glows (fewer layers = faster paint) ─── */}
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2, contain: "layout paint" }}
      >
        {[
          { top: "4%",  c: "rgba(99,102,241,0.22)",  c2: "rgba(168,85,247,0.10)", w: "150vw" },
          { top: "40%", c: "rgba(45,212,191,0.14)",  c2: "rgba(56,189,248,0.08)", w: "140vw" },
          { top: "76%", c: "rgba(99,102,241,0.16)",  c2: "rgba(74,222,128,0.08)", w: "150vw" },
        ].map((g, i) => (
          <div key={i} style={{
            position: "absolute", top: g.top, left: "50%", transform: "translateX(-50%)",
            width: g.w, height: g.w,
            background: `radial-gradient(circle, ${g.c} 0%, ${g.c2} 38%, transparent 66%)`,
            borderRadius: "50%",
          }} />
        ))}
      </div>
    </>
  );
}
