export type Career = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  posted: string;
  shortDesc: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export const CAREERS: Career[] = [
  {
    slug: "senior-frontend-developer",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Cairo, Egypt (Hybrid)",
    type: "Full-time",
    posted: "September 2026",
    shortDesc: "Build high-performance websites and web apps using Next.js, React, and TypeScript for clients across Egypt, Saudi Arabia, and the US.",
    description:
      "We are looking for a Senior Frontend Developer who cares about performance as much as design. You will own the frontend architecture for client projects — from marketing sites to complex web applications — working directly with designers and project leads to ship work that loads fast, converts well, and is built to last.",
    responsibilities: [
      "Architect and build production websites and web apps using Next.js, React, and TypeScript.",
      "Translate Figma designs into pixel-perfect, responsive, accessible interfaces.",
      "Own frontend performance — set and enforce Core Web Vitals budgets on every project.",
      "Implement SEO-aware markup, structured data, and server-side rendering strategies.",
      "Collaborate with backend developers on API contracts and data fetching patterns.",
      "Mentor junior developers through code review and pair programming.",
    ],
    requirements: [
      "4+ years of professional frontend development experience.",
      "Deep proficiency with React, Next.js (App Router), and TypeScript.",
      "Strong understanding of Tailwind CSS or modern CSS approaches.",
      "Demonstrated experience optimizing for Core Web Vitals and Lighthouse scores.",
      "Familiarity with Git workflows, CI/CD pipelines, and deployment platforms like Vercel.",
      "Portfolio of live, production websites you can share.",
    ],
    niceToHave: [
      "Experience with Framer Motion or other animation libraries.",
      "Background in bilingual / RTL web development.",
      "Familiarity with headless CMS platforms (Sanity, Contentful, Payload).",
      "Experience with React Native or cross-platform mobile development.",
    ],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    department: "Marketing",
    location: "Cairo, Egypt (Hybrid)",
    type: "Full-time",
    posted: "September 2026",
    shortDesc: "Drive organic growth for client websites through technical audits, content strategy, and commercial-intent keyword targeting.",
    description:
      "We need an SEO Specialist who thinks in revenue, not vanity metrics. You will run technical audits, build keyword strategies around commercial intent, and work alongside our development team to ensure every site we ship is built to rank from day one.",
    responsibilities: [
      "Conduct technical SEO audits and implement fixes across client websites.",
      "Build keyword strategies focused on commercial intent and conversion potential.",
      "Collaborate with the development team to ensure SEO-first architecture on new builds.",
      "Monitor rankings, organic traffic, and conversion metrics using Google Search Console, Ahrefs, and GA4.",
      "Develop content briefs and on-page optimization recommendations.",
      "Track competitor movements and adjust strategies accordingly.",
    ],
    requirements: [
      "2+ years of hands-on SEO experience with measurable ranking results.",
      "Proficiency with Google Search Console, Ahrefs or Semrush, and Screaming Frog.",
      "Strong understanding of technical SEO: crawlability, indexation, canonicals, structured data.",
      "Experience with Core Web Vitals optimization and page speed analysis.",
      "Ability to communicate SEO requirements clearly to developers and designers.",
      "English fluency (written and spoken).",
    ],
    niceToHave: [
      "Experience with local SEO and Google Business Profile optimization.",
      "Background in content marketing or copywriting.",
      "Familiarity with Next.js or modern JavaScript frameworks from an SEO perspective.",
      "Arabic language proficiency for regional SEO work.",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    posted: "September 2026",
    shortDesc: "Design conversion-focused interfaces for websites and applications that look exceptional and perform measurably.",
    description:
      "We are hiring a UI/UX Designer who designs for outcomes, not just aesthetics. You will create interfaces for client websites and applications — from wireframes through high-fidelity prototypes — working closely with developers to ensure every design decision translates into a fast, accessible, high-converting experience.",
    responsibilities: [
      "Design responsive, mobile-first interfaces in Figma from wireframes to final prototypes.",
      "Conduct user research and competitor analysis to inform design decisions.",
      "Create and maintain design systems with reusable component libraries.",
      "Collaborate closely with frontend developers to ensure design fidelity in production.",
      "Present design rationale to clients and incorporate feedback efficiently.",
      "Ensure WCAG 2.2 AA accessibility compliance across all deliverables.",
    ],
    requirements: [
      "3+ years of UI/UX design experience for web and mobile projects.",
      "Expert-level Figma proficiency including auto-layout, components, and variables.",
      "Strong portfolio demonstrating both visual design skill and UX thinking.",
      "Understanding of responsive design, typography systems, and color theory.",
      "Ability to articulate design decisions in terms of user behavior and business goals.",
      "English fluency (written and spoken).",
    ],
    niceToHave: [
      "Experience designing bilingual (Arabic/English) and RTL interfaces.",
      "Familiarity with motion design and micro-interactions.",
      "Understanding of frontend development constraints (CSS, component architecture).",
      "Experience with design-to-code workflows and developer handoff best practices.",
    ],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    department: "Marketing",
    location: "Cairo, Egypt (On-site)",
    type: "Full-time",
    posted: "September 2026",
    shortDesc: "Plan, produce, and manage social content across platforms for VELIQ and our clients — with a focus on engagement and measurable growth.",
    description:
      "We need a Social Media Manager who treats social as a publishing operation, not an afterthought. You will plan content calendars, coordinate shoots, manage community engagement, and report on performance — for both VELIQ's brand and our client accounts.",
    responsibilities: [
      "Develop and execute content calendars across Instagram, TikTok, LinkedIn, and Facebook.",
      "Plan and coordinate monthly content shoots (photo and short-form video).",
      "Write platform-native captions and adapt content for each channel's format and algorithm.",
      "Manage community engagement — respond to comments and DMs within hours.",
      "Track and report on engagement, reach, follower growth, and content-to-inquiry attribution.",
      "Stay current on platform algorithm changes and trending content formats.",
    ],
    requirements: [
      "2+ years managing social media accounts for brands or agencies.",
      "Proven ability to grow engagement and reach with organic content strategies.",
      "Experience with short-form video creation and editing (CapCut, Premiere, or similar).",
      "Strong copywriting skills adapted to each platform's voice.",
      "Proficiency with scheduling and analytics tools (Meta Business Suite, Later, or similar).",
      "English and Arabic fluency.",
    ],
    niceToHave: [
      "Experience with influencer outreach and UGC coordination.",
      "Background in paid social (Meta Ads, TikTok Ads).",
      "Photography or videography skills.",
      "Experience managing multiple client accounts simultaneously.",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    department: "Operations",
    location: "Cairo, Egypt (Hybrid)",
    type: "Full-time",
    posted: "September 2026",
    shortDesc: "Keep client projects on track, on scope, and on budget — coordinating across design, development, and marketing teams.",
    description:
      "We are looking for a Project Manager who keeps complex, multi-discipline projects running smoothly. You will be the primary client contact and internal coordinator — ensuring timelines hold, scope stays clear, and every team member knows what they owe and when.",
    responsibilities: [
      "Manage end-to-end delivery of web development, SEO, and marketing projects.",
      "Serve as the primary point of contact for clients throughout the engagement.",
      "Define project scope, timelines, and milestones in collaboration with technical leads.",
      "Coordinate across design, development, and marketing teams to keep work on track.",
      "Run weekly internal syncs and client status updates.",
      "Identify and escalate risks before they become blockers.",
    ],
    requirements: [
      "3+ years of project management experience in a digital agency or tech environment.",
      "Strong organizational and communication skills — written and verbal.",
      "Experience with project management tools (Notion, Asana, Linear, or similar).",
      "Ability to manage multiple concurrent projects without dropping details.",
      "Understanding of web development and digital marketing workflows.",
      "English fluency; Arabic is a strong plus.",
    ],
    niceToHave: [
      "PMP, Scrum Master, or equivalent certification.",
      "Experience managing bilingual or multi-region projects.",
      "Technical background or familiarity with development processes.",
      "Client-facing experience in a B2B service context.",
    ],
  },
];

export function getCareer(slug: string): Career | undefined {
  return CAREERS.find((c) => c.slug === slug);
}
