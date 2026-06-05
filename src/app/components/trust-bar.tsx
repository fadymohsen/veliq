"use client";

import Image from "next/image";

const clients = [
  { name: "Coach Mohamed Roshdy", logo: "/clients/coach-mohamed-roshdy.svg" },
  { name: "Yamin Estate", logo: "/clients/yamin-estate.png" },
  { name: "Saudi Hayat", logo: "/clients/saudi-hayat.png" },
  { name: "Alfa Transport", logo: "/clients/alfa-transport.png" },
  { name: "Fanous Clinic", logo: "/clients/fanous-clinic.png" },
  { name: "CrewHub Studio", logo: "/clients/crewhub-studio.png" },
  { name: "Initio", logo: "/clients/initio.svg" },
  { name: "RedBone Gym", logo: "/clients/redbone-gym.png" },
  { name: "Captain Maged", logo: "/clients/captain-maged.png" },
  { name: "Bedouin Trails", logo: "/clients/bedouin-trails.png" },
];

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="h-14 w-auto object-contain opacity-60 transition-all duration-500 hover:opacity-100"
      />
      <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="relative py-12 overflow-hidden border-y border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-white/[0.01]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
          Trusted by growing businesses
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {clients.map((c) => (
            <ClientLogo key={c.name} name={c.name} logo={c.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
