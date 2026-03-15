"use client";

const clients = [
  { name: "BrightPath", width: 120 },
  { name: "NovaTech", width: 110 },
  { name: "Meridian", width: 115 },
  { name: "Quantum Labs", width: 130 },
  { name: "Skyline", width: 100 },
  { name: "Atlas Digital", width: 125 },
  { name: "Vertex", width: 95 },
  { name: "Prism Co", width: 110 },
];

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-8"
      style={{ width }}
    >
      <span className="whitespace-nowrap text-base font-bold tracking-wide text-white/20 transition-all duration-500 hover:text-white/50 select-none">
        {name}
      </span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.04]">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-white/[0.01]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          Trusted by forward-thinking companies
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0a0a14] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0a0a14] to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {/* Duplicate the list for seamless loop */}
          {[...clients, ...clients, ...clients, ...clients].map((c, i) => (
            <LogoPlaceholder key={`${c.name}-${i}`} name={c.name} width={c.width} />
          ))}
        </div>
      </div>
    </section>
  );
}
