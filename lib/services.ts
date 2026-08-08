export type Service = {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  fullDesc: string;
  problemHeading: string;
  problemBody: string;
  differentiators: string[];
  tiers: {
    name: string;
    tagline: string;
    features: string[];
  }[];
  signatureTitle: string;
  signaturePromise: string;
  signatureItems: string[];
  results: string[];
  whyFaq: { q: string; a: string }[];
  features: string[];
  process: { step: string; desc: string }[];
  technologies: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    icon: "W",
    title: "Website Development",
    subtitle: "A website that earns its first 7 seconds — and every second after.",
    desc: "As a website development company, we engineer sites for the customers who actually use them: scanned in seconds, mobile-first by default, SEO-optimized from the first pixel.",
    fullDesc: "Most websites are designed for the agency that built them. As a website development company, we engineer sites for the customers who actually use them: scanned in seconds, mobile-first by default, SEO-optimized and conversion-led from the first pixel to the last form field.",
    problemHeading: "The Problem We Saw",
    problemBody: "We have audited dozens of websites that won awards and lost leads. They looked beautiful in a portfolio and crawled on a phone. They had clever interactions that confused a 45-year-old buyer. They were built around the designer's ego, not the customer's task. We build websites the way clients actually use them.",
    differentiators: [
      "Pre-build discovery as standard. Before we open Figma, we study your traffic, your competitors, and what your audience actually does on the web.",
      "Mobile-first by default — because 70%+ of your traffic is. Every layout is designed for the phone first.",
      "Speed is a budget, not a hope. We set a performance budget on day one and hold it through launch.",
      "Conversion-aware from copy to CTA. Every page has one job. Every section earns its place.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 5 pages", "Template-based customized design", "Basic CMS + on-page SEO setup", "Contact form integration", "1 language", "2 revision rounds"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 10 pages", "Custom UI design + speed optimization", "CRM + booking + analytics integrations", "Up to 2 languages", "Full on-page SEO", "4 revision rounds + partial copywriting"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["Unlimited pages", "Full custom UX/UI design system", "Technical SEO audit + ongoing speed monitoring", "Full third-party ecosystem integrations", "Up to 3 languages", "Unlimited revisions + full copywriting"],
      },
    ],
    signatureTitle: "The 7-Second Test",
    signaturePromise: "Every homepage is judged in 7 seconds. Here is what yours must pass.",
    signatureItems: [
      "What does this company do? (In plain language, above the fold.)",
      "Who is it for? (Am I in the right place?)",
      "What's the one specific outcome they promise me?",
      "Why should I trust them? (Logos, proof, numbers — not adjectives.)",
      "How do they do it differently? (One sentence, not a manifesto.)",
      "What's the next step? (One primary CTA, not five.)",
      "Does this look like it was built recently? (Visual currency = brand currency.)",
    ],
    results: [
      "First Contentful Paint under 1.5 seconds on 4G mobile.",
      "Conversion-rate baseline lift within 90 days of launch.",
      "Bounce-rate reduction on top entry pages.",
      "Time-to-form-submission cut by removing friction in the path.",
    ],
    whyFaq: [
      { q: "Why don't you publish prices?", a: "Because the same site costs different money in Cairo, Riyadh, and New York. The discovery meeting calibrates the price to your market and scope." },
      { q: "Why mobile-first when our buyers are on desktop?", a: "Even buyers who close on desktop research on mobile. Mobile-first forces every layout to earn its place. If it works on a phone, it will work on a desktop." },
      { q: "Why custom over a template?", a: "Templates are fine for a side project. For a serious operation, every layout decision you outsource to a template is a position you lose to a competitor who didn't." },
      { q: "Why is bilingual harder than it looks?", a: "Bilingual sites that 'work' often break RTL layouts, mix font hierarchies, or duplicate content in ways that hurt SEO. We architect bilingual sites with the language switch as a first-class citizen." },
    ],
    features: [
      "Custom web application development",
      "E-commerce solutions with payment integration",
      "Progressive Web Apps (PWA)",
      "API development & third-party integrations",
      "Performance optimization & Core Web Vitals",
      "Bilingual / multilingual architecture",
    ],
    process: [
      { step: "Discovery", desc: "We analyze your traffic, competitors, and audience behavior to define the project scope with data, not assumptions." },
      { step: "Design", desc: "We create wireframes and high-fidelity prototypes, mobile-first, aligned with your brand identity." },
      { step: "Development", desc: "We build your site using modern frameworks with clean code, performance budgets, and thorough testing." },
      { step: "Launch & Support", desc: "We deploy, monitor, and provide ongoing maintenance to keep your platform running at peak performance." },
    ],
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Vercel", "AWS"],
  },
  {
    slug: "website-support",
    icon: "S",
    title: "Website Support",
    subtitle: "Your site, watched and improved every week — without you having to ask.",
    desc: "We treat your live website like a system that needs daily attention — not an asset that has already been delivered.",
    fullDesc: "Most websites are launched and forgotten. By the time someone notices the broken contact form, weeks of leads are already lost. We treat your live website like a system that needs daily attention — not an asset that has already been delivered.",
    problemHeading: "The Problem We Saw",
    problemBody: "Sites decay quietly. Plugins break. Forms stop sending. Speed degrades as content piles up. Security holes open the day after launch. The companies who notice last are the ones losing the most.",
    differentiators: [
      "Defined response-time SLA per tier (48 hours / 24 hours / same day). We answer the contract, not the mood.",
      "Proactive monitoring of uptime, page speed, and security — you don't have to discover problems for us to fix them.",
      "Monthly performance reports with the WHY attached: not just 'page speed dropped 12%,' but why, and what we are doing about it.",
      "One support team that already knows your codebase. No tickets handed to a stranger every time.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 3 monthly updates", "48-hour response time", "Bug fixes + basic monitoring", "Security updates", "Text-only content updates"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 8 monthly updates", "24-hour response time", "Monthly performance report", "Text + image content updates", "Monthly analytics reporting"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["Unlimited monthly updates", "Same-day response time", "Weekly performance report", "Full content management", "Weekly analytics reporting"],
      },
    ],
    signatureTitle: "The Same-Day Promise",
    signaturePromise: "What happens inside our same-day SLA — minute by minute.",
    signatureItems: [
      "00:00 — Issue logged via shared channel (WhatsApp, Slack, or email).",
      "Within 1 hour — Acknowledged by a named team member with an initial assessment.",
      "Within 4 hours — Diagnosis confirmed. You receive the root cause and the planned fix in writing.",
      "Within 8 hours — Fix deployed to staging. Internal QA complete.",
      "Within same business day — Fix live in production. You receive confirmation + a one-line WHY.",
    ],
    results: [
      "Uptime kept above 99.9% measured by external monitoring.",
      "Page speed held within performance budget month over month.",
      "Zero post-launch security incidents on covered sites.",
      "Bug-to-fix cycle time tracked and reported every month.",
    ],
    whyFaq: [
      { q: "Why a monthly retainer instead of paying per fix?", a: "Because by the time you are paying per fix, you are paying for problems we could have prevented. The retainer covers prevention — monitoring, updates, security patching — not just reaction." },
      { q: "Why monitor performance proactively?", a: "Because every 100ms of page-load delay costs measurable conversions. Performance does not stay where you launched it — it decays." },
      { q: "Why named team members instead of a ticket queue?", a: "Because tickets handed to a stranger waste the most expensive hour of any support engagement — the hour of re-learning your codebase." },
    ],
    features: [
      "Monthly software & plugin updates",
      "Security monitoring & threat response",
      "Performance optimization & Core Web Vitals",
      "Content updates & copywriting revisions",
      "Bug fixes & cross-browser testing",
      "Monthly analytics & performance reports",
    ],
    process: [
      { step: "Onboard", desc: "We audit your current site, set up monitoring, and document all configurations and access." },
      { step: "Maintain", desc: "We run monthly update cycles, security scans, and proactive performance checks." },
      { step: "Report", desc: "You receive a monthly report covering uptime, performance metrics, and completed tasks." },
      { step: "Evolve", desc: "We handle change requests and improvements as your business grows and needs shift." },
    ],
    technologies: ["Vercel", "Cloudflare", "Google PageSpeed", "Uptime Robot", "Sentry", "Hotjar", "Google Analytics", "GTM"],
  },
  {
    slug: "seo",
    icon: "E",
    title: "SEO",
    subtitle: "Show up where the buying decision actually starts.",
    desc: "We work the queries that move revenue — fewer keywords, all commercial-intent, all tied to a documented revenue path.",
    fullDesc: "Most SEO is busywork sold as strategy — keyword lists no one searches, content no one reads, links no one clicks. We work the opposite way: fewer keywords, all of them commercial-intent, all of them tied to a documented revenue path. Then we explain every move.",
    problemHeading: "The Problem We Saw",
    problemBody: "The SEO industry has trained clients to expect monthly reports full of vanity numbers — rankings on keywords no one buys from, traffic from countries that don't convert, 'backlinks acquired' from sites no one visits. We work the opposite way.",
    differentiators: [
      "Keyword research tied to commercial intent — not search volume. Volume is vanity. Conversion is the metric.",
      "Technical SEO audit before any content. A site with broken indexing cannot be saved by content alone.",
      "Educated reporting on every move. Every ranking shift gets a WHY: was it our work, an algorithm update, or competitor movement?",
      "Competitor tracking that names names. We tell you exactly which competitor took which keyword from you — and how we plan to take it back.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "The essentials done right.",
        features: ["Up to 10 keywords targeted", "On-page optimization", "Basic technical audit", "Monthly content recommendations", "Monthly reporting"],
      },
      {
        name: "Precision",
        tagline: "Strategy + execution together.",
        features: ["Up to 25 keywords", "Full technical SEO audit", "Bi-weekly content recommendations", "Basic backlink building + local SEO", "Monthly reporting + insights"],
      },
      {
        name: "Mastery",
        tagline: "Full ownership + maximum output.",
        features: ["50+ keywords", "Full + ongoing technical SEO", "Weekly content recommendations", "Advanced backlinks + local SEO + competitor tracking", "Weekly reporting + strategy call"],
      },
    ],
    signatureTitle: "The 48-Hour Visibility Audit",
    signaturePromise: "Before you hire us, see what we'll find in 48 hours.",
    signatureItems: [
      "Your top 20 commercial-intent keywords — and where you actually rank for each.",
      "The 5 keywords competitors own that you should — with the page-by-page strategy to take them back.",
      "Your technical SEO health score — indexing issues, broken canonicals, slow pages, mobile-usability errors.",
      "Your content gap map — pages that should exist and don't, ranked by search volume × commercial intent.",
      "Your domain authority versus the three closest competitors — with the realistic 6-month plan to close the gap.",
    ],
    results: [
      "Ranking velocity on commercial-intent keywords (movement up, not just total positions).",
      "Organic conversions — not organic sessions.",
      "Page-1 capture rate on tracked keywords over rolling 90 days.",
      "Domain authority growth versus named competitors.",
    ],
    whyFaq: [
      { q: "Why a retainer instead of a project?", a: "Because SEO is a system, not a project. The first 90 days are technical and content. Months 4–12 are authority and competitive defense. Stop the work and your competitors take back what you earned." },
      { q: "Why so few keywords on the Core tier?", a: "Because 10 commercial-intent keywords driving revenue beat 100 vanity keywords that don't. We would rather rank you #1 on what matters than #15 on a list that looks impressive." },
      { q: "Why does local SEO matter so much?", a: "Because Google's local pack returns three results — not ten. If you are a service business and you are not in those three results, you do not exist to the customer who is buying right now." },
    ],
    features: [
      "Technical SEO audits & implementation",
      "On-page optimization & content strategy",
      "Local SEO & Google Business Profile",
      "Schema markup & structured data",
      "Link building & digital PR",
      "Competitor tracking & intelligence",
    ],
    process: [
      { step: "Audit", desc: "We perform a 48-hour visibility audit of your site's technical health, content, and competitive landscape." },
      { step: "Strategy", desc: "We develop a prioritized roadmap targeting the highest-impact commercial-intent opportunities." },
      { step: "Execute", desc: "Our team implements technical fixes, optimizes content, and builds high-quality backlinks." },
      { step: "Measure & Refine", desc: "We track rankings, conversions, and competitor movement to continuously refine results." },
    ],
    technologies: ["Google Search Console", "Ahrefs", "Screaming Frog", "Schema.org", "Google Analytics", "Semrush", "Core Web Vitals", "Microsoft Clarity"],
  },
  {
    slug: "website-applications",
    icon: "A",
    title: "Website Applications",
    subtitle: "Software that ships fast, holds under pressure, and improves with every sprint.",
    desc: "We build web applications the agile way — in tight, reviewable cycles that keep you in control and your users in mind. Every two weeks, you see real progress, not a slideshow.",
    fullDesc: "Most web app projects fail not from bad code but from bad process: requirements locked too early, clients kept out until it's too late to change anything meaningful, and 'launch day' as the only feedback point. We run two-week sprints with a client review baked into every single one. You see working software, not decks, and your feedback shapes the next cycle before the code calculates the next wrong direction.",
    problemHeading: "The Problem We Saw",
    problemBody: "Web applications are promised in months, delivered in years, and abandoned halfway. The culprit is almost never the technology — it's the process. Long requirement phases, delayed feedback loops, and 'we'll fix it post-launch' cultures produce software nobody wants to use. We work in tight sprints because the cost of a wrong assumption is two weeks, not two years.",
    differentiators: [
      "Sprint reviews are contractual. Every two-week cycle ends with a working demo and a scheduled call — not a status update email.",
      "Architecture-first, always. We design the data model and API contracts before writing the first UI component. Refactoring architecture costs 10x more than refactoring UI.",
      "User testing in cycle. We test every major feature with real users before it ships to production — not after complaints start arriving.",
      "Transparent backlog. You own the Jira or Linear board. Every ticket is visible, every priority is yours to set, and every estimate is explained.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "MVP-grade, production-ready.",
        features: ["Up to 5 core features", "3 sprint cycles with client review each", "Authentication + basic CRUD", "Responsive UI", "Database + REST API", "2 rounds of revisions per sprint"],
      },
      {
        name: "Precision",
        tagline: "Full-featured. Fully yours.",
        features: ["Up to 15 features", "6 sprint cycles with client review each", "Role-based access + advanced auth", "Third-party API integrations", "Analytics dashboard + admin panel", "Real-time notifications + webhooks"],
      },
      {
        name: "Mastery",
        tagline: "Scale-ready. Enterprise-grade.",
        features: ["Unlimited features", "Continuous sprint delivery", "Microservices or modular monolith architecture", "Full CI/CD pipeline + automated testing", "Multi-tenancy + custom billing integration", "Performance SLA + post-launch support retainer"],
      },
    ],
    signatureTitle: "The Sprint Review Promise",
    signaturePromise: "What you see at the end of every two-week sprint — no exceptions.",
    signatureItems: [
      "A live, working demo of everything built this sprint — running in a staging environment, not a slideshow.",
      "A clear written summary of what was completed, what was deferred, and why.",
      "A recorded walkthrough you can share with your team and stakeholders.",
      "An open Q&A where your feedback directly shapes the next sprint's priorities.",
      "A revised backlog reflecting your decisions — updated within 24 hours of the review.",
      "A velocity report showing how fast we're moving and what's realistically achievable next.",
    ],
    results: [
      "Working software in your hands within 2 weeks of kickoff — not 2 months.",
      "Sprint velocity tracked and reported every cycle so scope changes are priced instantly.",
      "Zero surprise technical debt: architectural decisions are documented and reviewed with you.",
      "Post-launch error rate below 0.1% on covered features.",
    ],
    whyFaq: [
      { q: "Why two-week sprints specifically?", a: "One week is too short to build anything meaningful. One month is too long to catch a wrong assumption early. Two weeks is the unit of delivery that balances momentum with control." },
      { q: "Why do you involve us in every sprint review?", a: "Because software you haven't seen in six weeks is software you no longer understand. When you review every sprint, you never get a surprise at launch — you've already approved everything in it." },
      { q: "Why architecture before UI?", a: "Every hour you spend on UI that rests on an unvalidated data model is an hour you may have to undo. We lock the architecture in the first sprint so every sprint after it builds on solid ground." },
      { q: "Can we change priorities mid-project?", a: "Yes — and we expect it. The backlog is yours. You can re-prioritize before any sprint planning session. We'll show you the trade-off (what gets pushed back) before we commit." },
    ],
    features: [
      "Custom SaaS & dashboard development",
      "Customer & admin portal design",
      "REST & GraphQL API development",
      "Real-time features (WebSockets, live updates)",
      "Role-based access control & multi-tenancy",
      "Automated testing (unit, integration, E2E)",
    ],
    process: [
      { step: "Discovery & Architecture", desc: "We define user stories, design the data model, and agree on the full feature backlog before writing a single line of code." },
      { step: "Sprint Development", desc: "We build in 2-week cycles. Each sprint ends with a working demo and a review call where your feedback reshapes the next sprint." },
      { step: "Client Review & Iteration", desc: "You test real features in a staging environment, raise changes, and sign off before anything reaches production." },
      { step: "QA & Release", desc: "Automated and manual testing before every release. Every deploy is smoke-tested. No silent failures, no untested paths to production." },
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Redis", "TypeScript", "Prisma", "AWS / Vercel"],
  },
  {
    slug: "mobile-applications",
    icon: "M",
    title: "Mobile Applications",
    subtitle: "Apps your users actually open — built sprint by sprint, reviewed by you at every step.",
    desc: "We build iOS and Android apps in agile sprints with a client demo at the end of every cycle. You never wait months to discover we built the wrong thing.",
    fullDesc: "Mobile apps fail in two ways: they ship late and over budget, or they ship on time and nobody uses them. The second failure is the more expensive one. We prevent it by keeping you inside the build process — every two weeks, you hold working software in your hands and tell us what to change before the next cycle begins.",
    problemHeading: "The Problem We Saw",
    problemBody: "Most mobile projects are scoped in week one and reviewed in month six. By then, the market has shifted, the feedback is obsolete, and the cost of changing anything is enormous. We run short, reviewable sprints so the feedback that shapes the product happens while changing it is still cheap.",
    differentiators: [
      "Bi-weekly builds on your device. Every sprint ends with a TestFlight or Google Play internal build you can run on your actual phone — not a simulator screenshot.",
      "Cross-platform without compromise. We use React Native to ship iOS and Android from one codebase without sacrificing native performance or platform conventions.",
      "UX validation before code. We test core user flows with clickable prototypes before development begins — because usability problems found in Figma cost zero to fix.",
      "App Store expertise. We handle provisioning, signing, metadata, and review compliance so your launch isn't held up by an Apple rejection on submission day.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "Your MVP in real users' hands.",
        features: ["Up to 5 screens / core flows", "iOS + Android from one codebase", "3 sprint cycles with device builds each", "Push notifications + basic auth", "REST API integration", "App Store + Play Store submission"],
      },
      {
        name: "Precision",
        tagline: "Feature-complete. Market-ready.",
        features: ["Up to 20 screens + user flows", "6 sprint cycles with client review each", "Social auth + biometric login", "Offline-first architecture", "In-app purchases or subscription billing", "Analytics + crash reporting integration"],
      },
      {
        name: "Mastery",
        tagline: "Native-grade. Ecosystem-connected.",
        features: ["Unlimited screens + flows", "Continuous sprint delivery", "Custom native modules where needed", "CI/CD pipeline + automated device testing", "Advanced integrations (maps, AR, payments, IoT)", "Post-launch performance SLA + support retainer"],
      },
    ],
    signatureTitle: "The Device-in-Hand Promise",
    signaturePromise: "What you experience at the end of every two-week sprint — on your actual device.",
    signatureItems: [
      "A TestFlight (iOS) or internal Play Store (Android) build delivered to your device before the sprint review call.",
      "A structured walkthrough of every new feature — what it does, what edge cases we handled, and what we deliberately deferred.",
      "Side-by-side comparison against the agreed designs, with any intentional deviations explained.",
      "An open testing window: you and your team try to break it before we close the sprint.",
      "A prioritized change log based on your feedback — committed to the next sprint before the call ends.",
      "A release readiness score: percentage of features complete, test coverage, and known issues — transparently tracked.",
    ],
    results: [
      "Working app on your device within 2 weeks of kickoff.",
      "Crash-free rate above 99.5% on monitored production releases.",
      "App Store rating maintained above 4.5 through proactive review management.",
      "Feature delivery velocity tracked every sprint so budget forecasts stay accurate.",
    ],
    whyFaq: [
      { q: "Why React Native instead of native Swift/Kotlin?", a: "Because for most business applications, the performance difference is imperceptible to users and the maintenance cost difference is enormous. One codebase, two platforms, half the long-term support cost. We'll tell you the exceptions — and build native when they apply." },
      { q: "Why test on real devices every sprint?", a: "Simulators lie. Performance, camera access, push notifications, GPS — all behave differently on real hardware. Discovering that on submission day is expensive. Discovering it on sprint day costs two hours." },
      { q: "Why UX prototypes before development?", a: "Because a user who can't find the core action in a prototype is a user who will delete your app. Prototypes are cheap. Refactoring a shipped navigation structure is not." },
      { q: "What if Apple rejects our app?", a: "We pre-audit against App Store guidelines before every submission. If a rejection happens, we handle the response and resubmission — it's covered in the engagement, not billed as extra work." },
    ],
    features: [
      "iOS & Android apps (React Native)",
      "Custom native modules for advanced hardware access",
      "Offline-first architecture & local data sync",
      "Push notifications & in-app messaging",
      "In-app purchases & subscription management",
      "CI/CD with automated device testing (Detox / Maestro)",
    ],
    process: [
      { step: "Discovery & Prototype", desc: "We map every user flow, build a clickable prototype, and validate it before a line of code is written." },
      { step: "Sprint Development", desc: "2-week sprints with a real device build at the end of each. You test on your phone, not a simulator." },
      { step: "Client Review & Sign-Off", desc: "You review working features, surface changes, and sign off before anything moves to the next sprint." },
      { step: "QA, Store Submission & Launch", desc: "Full regression testing, App Store and Play Store compliance review, and a monitored production launch." },
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "RevenueCat", "Fastlane"],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
