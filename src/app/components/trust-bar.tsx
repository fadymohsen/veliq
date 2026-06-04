"use client";

import Image from "next/image";

const clients = [
  { name: "Coach Mohamed Roshdy", logo: "/clients/coach-mohamed-roshdy.svg" },
  { name: "Yamin Estate", logo: "/clients/yamin-estate.png" },
  { name: "Alfa Transport", logo: "/clients/alfa-transport.png" },
  { name: "Fanous Clinic", logo: "/clients/fanous-clinic.png" },
  { name: "CrewHub Studio", logo: "/clients/crewhub-studio.png" },
  { name: "Initio", logo: "/clients/initio.svg" },
  { name: "RedBone Gym", logo: "/clients/redbone-gym.png" },
];

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 gap-2">
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="h-16 w-auto object-contain opacity-60 transition-all duration-500 hover:opacity-100"
      />
      <span className="text-[10px] font-medium text-slate-600 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.01]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          Trusted by growing businesses
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#0a0a14] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#0a0a14] to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {[...clients, ...clients, ...clients, ...clients].map((c, i) => (
            <ClientLogo key={`${c.name}-${i}`} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
