import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve } from "path";

const envContent = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const projects = [
  {
    slug: "coach-mohamed-roshdy",
    image: "/uploads/coach-shiko-proj.jpg",
    tag: "Website Development",
    title: "Coach Mohamed Roshdy",
    desc: "A bilingual fitness coaching platform with personalized training programs, nutrition plans, and client transformation showcases.",
    fullDesc: "Coach Mohamed Roshdy needed a professional online presence that could handle bilingual content (English/Arabic), showcase client transformations, and convert visitors into coaching clients. We built a high-performance Next.js application with a dark, motivational design that matches the intensity of his brand. The site features five tiered coaching packages with multi-currency pricing (USD/EGP), a transformation gallery with before/after imagery, and seamless WhatsApp integration for direct client communication. Every element was designed to build trust and drive conversions.",
    client: "Mohamed Roshdy",
    industry: "Fitness & Coaching",
    timeline: "4 weeks",
    url: "https://coachmohamedroshdy.com",
    services: ["Website Development", "UI/UX Design", "Bilingual Support"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    challenge: "The client needed a platform that could serve both English and Arabic-speaking audiences with a seamless language toggle, while maintaining a high-energy, motivational brand feel. The site also needed to clearly present five different coaching tiers with transparent pricing in multiple currencies.",
    solution: "We built a fully bilingual Next.js application with RTL support for Arabic content. The design uses dark backgrounds with high-contrast typography to create an intense, gym-inspired atmosphere. Each coaching plan is presented in a clear comparison format with pricing in both USD and EGP. The transformation gallery uses optimized image loading with blob storage for fast performance.",
    results: [
      { label: "Page Load Time", value: "<2s" },
      { label: "Languages", value: "2 (EN/AR)" },
      { label: "Coaching Plans", value: "5 Tiers" },
      { label: "Mobile Score", value: "96/100" },
    ],
    features: [
      "Bilingual support with English/Arabic toggle and full RTL layout",
      "5 tiered coaching packages ($75-$500/mo) with multi-currency pricing",
      "Client transformation gallery with before/after showcases",
      "WhatsApp integration for direct coach communication",
      "Mobile-first responsive design optimized for all devices",
      "SEO-optimized with structured data for local search visibility",
    ],
    testimonial: {
      quote: "The website perfectly captures the energy of my coaching brand. My clients love how easy it is to browse plans and see real transformation results.",
      author: "Mohamed Roshdy",
      role: "Founder & Head Coach",
    },
    gallery: [
      { image: "", caption: "Hero section with motivational messaging and clear CTAs" },
      { image: "", caption: "Five-tier coaching plans with transparent pricing" },
      { image: "", caption: "Client transformation gallery showcasing real results" },
      { image: "", caption: "Bilingual interface with seamless English/Arabic toggle" },
    ],
  },
];

async function seed() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    console.error("DATABASE_URL or POSTGRES_URL not set in .env.local");
    process.exit(1);
  }

  const sql = neon(url);

  await sql`
    CREATE TABLE IF NOT EXISTS collections (
      name TEXT PRIMARY KEY,
      data JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO collections (name, data, updated_at)
    VALUES ('projects', ${JSON.stringify(projects)}::jsonb, NOW())
    ON CONFLICT (name)
    DO UPDATE SET data = ${JSON.stringify(projects)}::jsonb, updated_at = NOW()
  `;

  console.log(`Seeded ${projects.length} projects: ${projects.map(p => p.title).join(", ")}`);
}

seed().catch(console.error);
