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
  {
    slug: "initio",
    image: "/uploads/initio-proj.png",
    tag: "Website Development",
    title: "Initio",
    desc: "A premium digital experience for Saudi Arabia's leading event and production company, serving clients like Saudi Aramco and Riyadh Season.",
    fullDesc: "Initio needed a website that matched the caliber of their clients: Saudi Aramco, SABIC, Sadara, and Riyadh Season. We built a high-end Next.js application with cinematic video backgrounds, custom cursor interactions, and smooth scroll animations that reflect the precision and luxury of their event production work. The site communicates their integrated model across event management, technology, branding, and digital production in a way that feels as polished as the events they produce.",
    client: "Initio",
    industry: "Events & Production",
    timeline: "6 weeks",
    url: "https://www.initio.sa",
    services: ["Website Development", "UI/UX Design", "Motion & Animation"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"],
    challenge: "Initio operates at the highest level of event production in Saudi Arabia, working with government entities and Fortune 500 companies. Their previous online presence did not reflect the quality of their work. They needed a website that communicates luxury, precision, and capability without being flashy or overdesigned.",
    solution: "We designed a dark, cinematic interface with a video hero section, custom cursor system, and smooth scroll animations. The typography pairs EB Garamond (luxury serif) with Montserrat (modern sans) to balance elegance with professionalism. Each service is presented with rich imagery from real events, and the four-step process section builds trust through transparency. The site loads fast despite heavy media thanks to optimized video preloading and Next.js image optimization.",
    results: [
      { label: "Page Load", value: "<3s" },
      { label: "Client Tier", value: "Enterprise" },
      { label: "Services Shown", value: "4 Core" },
      { label: "Languages", value: "2 (EN/AR)" },
    ],
    features: [
      "Cinematic video hero with preloaded media for instant playback",
      "Custom cursor system that enhances the premium browsing experience",
      "Smooth scroll animations with parallax effects throughout",
      "Four-pillar service showcase: Events, Technology, Branding, Digital Production",
      "Client roster featuring Saudi Aramco, SABIC, Sadara, and Riyadh Season",
      "Bilingual support with English and Arabic content",
      "WhatsApp integration for instant client communication",
      "Mobile-optimized with performance-first architecture",
    ],
    testimonial: {
      quote: "VELIQ understood our brand from day one. The website captures exactly who we are: precise, premium, and focused on delivering unforgettable experiences.",
      author: "Initio Team",
      role: "Initio, Saudi Arabia",
    },
    gallery: [
      { image: "", caption: "Cinematic video hero with smooth scroll interactions" },
      { image: "", caption: "Service showcase with real event photography" },
      { image: "", caption: "Client roster featuring top Saudi organizations" },
      { image: "", caption: "Four-step process methodology" },
    ],
  },
  {
    slug: "saudi-hayat",
    image: "/uploads/saudi-hayat-proj.png",
    tag: "Website Development",
    title: "Hayat Saudi Real Estate",
    desc: "A bilingual corporate website for one of Saudi Arabia's leading real estate developers, aligned with Vision 2030.",
    fullDesc: "Hayat Saudi Real Estate needed a digital presence that reflects 11+ years of experience building inspiring urban environments across the Kingdom. We designed and developed a bilingual (Arabic/English) corporate website with full RTL support, showcasing their portfolio of residential and commercial developments, four core service lines, and their commitment to sustainable urban living. The site positions Hayat as a trusted partner in Saudi Arabia's Vision 2030 transformation.",
    client: "Hayat Saudi Real Estate",
    industry: "Real Estate & Development",
    timeline: "5 weeks",
    url: "https://www.saudihayat.com",
    services: ["Website Development", "UI/UX Design", "Bilingual Support"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    challenge: "Hayat needed a website that could serve both Arabic and English-speaking audiences with seamless RTL/LTR switching, while presenting complex real estate projects and corporate credentials in a way that builds trust with high-net-worth investors and family buyers in the Saudi market.",
    solution: "We built a fully bilingual Next.js application with native RTL support for Arabic content. The design uses a clean, professional aesthetic with dark mode capability, high-quality project photography, and prominent display of their ISO 45001:2018 certification. Each service line (development, management, marketing, consulting) has dedicated sections with clear value propositions. Key company stats are presented with animated counters to build credibility on first impression.",
    results: [
      { label: "Languages", value: "2 (AR/EN)" },
      { label: "Experience", value: "11+ Years" },
      { label: "Services", value: "4 Core" },
      { label: "ISO Certified", value: "45001" },
    ],
    features: [
      "Full bilingual support with native Arabic RTL layout and English LTR",
      "Project portfolio showcase with high-quality imagery of completed developments",
      "Four service pillars: Development, Management, Marketing, Consulting",
      "Animated statistics displaying years of experience, projects, and team size",
      "ISO 45001:2018 certification badge for trust and credibility",
      "Dark mode toggle for enhanced browsing experience",
      "Careers section for talent acquisition aligned with Saudi talent development",
      "Mobile-first responsive design optimized for all devices",
    ],
    testimonial: {
      quote: "The website perfectly represents our vision of building inspiring urban environments for generations. The bilingual experience is seamless and our clients love navigating our project portfolio.",
      author: "Hayat Team",
      role: "Hayat Saudi Real Estate",
    },
    gallery: [
      { image: "", caption: "Homepage hero with company tagline and Vision 2030 alignment" },
      { image: "", caption: "Project portfolio showcasing Hayat Tower and residential developments" },
      { image: "", caption: "Four-pillar service showcase with dedicated sections" },
      { image: "", caption: "Company statistics with animated counters" },
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
