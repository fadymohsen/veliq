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
  {
    slug: "social-media",
    icon: "SM",
    title: "Social Media",
    subtitle: "Content that gets watched, shared, and remembered — not scrolled past.",
    desc: "We run social accounts like a publishing operation: a content system, a posting cadence, and a feedback loop — not a monthly folder of graphics uploaded and forgotten.",
    fullDesc: "Most brands treat social media as an obligation — a monthly batch of graphics uploaded on a schedule nobody reviews for performance. We treat it as a publishing operation: research what your audience actually stops scrolling for, produce content built for how each platform's algorithm actually distributes it, and report on engagement and reach the way a media company would — not a checklist.",
    problemHeading: "The Problem We Saw",
    problemBody: "We have inherited more abandoned social accounts than we can count — beautiful grids, zero engagement, posting streaks that die the moment the agency stops caring. The pattern is always the same: content designed to please the client in a review call instead of the algorithm and the audience. A feed can look perfect and reach nobody.",
    differentiators: [
      "Platform-native content, not repurposed leftovers. What works on TikTok fails on LinkedIn. We plan and shoot for the platform first, then adapt — never the reverse.",
      "A real content calendar, reviewed monthly against performance. Posts that don't perform get diagnosed, not repeated. We kill formats that stop working, fast.",
      "Community management included, not billed as an afterthought. Comments and DMs are where trust is won or lost in real time — we respond inside hours, not days.",
      "Every post ties back to a goal — awareness, engagement, or conversion. A post with no defined job doesn't ship.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "Consistent presence, done right.",
        features: ["2 platforms managed", "12 posts / month", "Monthly content calendar + captions", "Basic community management", "Monthly performance report"],
      },
      {
        name: "Precision",
        tagline: "Content built to grow, not just exist.",
        features: ["3 platforms managed", "20 posts / month incl. Reels/TikToks", "Content shoot day (photo + short video)", "Daily community management", "Hashtag + trend research", "Bi-weekly performance reporting"],
      },
      {
        name: "Mastery",
        tagline: "A full in-house team, without the overhead.",
        features: ["4+ platforms managed", "Daily posting cadence", "Monthly content shoot + editing suite", "Influencer / UGC coordination", "Real-time community management", "Weekly reporting + strategy call"],
      },
    ],
    signatureTitle: "The First-3-Seconds Rule",
    signaturePromise: "Every piece of content is built to survive the scroll — here's the checklist it has to pass.",
    signatureItems: [
      "Does the first frame stop the scroll without sound? (Most viewers watch muted.)",
      "Is the hook a question, a claim, or a visual — not a logo intro? (Logos are for frame two, not frame one.)",
      "Does the caption work if no one watches the video? (It has to carry meaning on its own.)",
      "Is there one clear reason to comment, save, or share — not just 'like if you agree'?",
      "Does it look native to the platform, or does it look like an ad that wandered in?",
      "Is there a next step? (Profile visit, link in bio, DM — something measurable.)",
    ],
    results: [
      "Engagement rate tracked against platform and industry benchmark, not a vanity target.",
      "Follower growth that correlates with reach — not purchased or bot-inflated numbers.",
      "Save and share rate — the two signals platforms weight most in distribution.",
      "Content-to-inquiry attribution tracked via link clicks, DMs, and promo codes.",
    ],
    whyFaq: [
      { q: "Why not just post more often?", a: "Because volume without a content system produces noise, not growth. Five posts built around what your audience actually engages with outperform thirty posts that guess." },
      { q: "Why do you need a monthly shoot day instead of stock content?", a: "Because platforms and audiences can tell the difference, and algorithms increasingly favor original video over recycled stock. Authentic footage of your actual product, team, or space outperforms generic content nearly every time." },
      { q: "Why is community management part of the package, not an add-on?", a: "Because a comment left unanswered for three days signals neglect to everyone who sees it, not just the commenter. Response time is a trust signal as visible as your logo." },
      { q: "Do you guarantee follower counts?", a: "No — and any agency that does is optimizing for a number that doesn't pay your bills. We optimize for engagement and conversion, because a smaller, engaged audience outperforms a large, silent one." },
    ],
    features: [
      "Platform-native content strategy (Instagram, TikTok, LinkedIn, Facebook)",
      "Short-form video production & editing",
      "Content calendar planning & scheduling",
      "Community management & DM response",
      "Influencer & UGC coordination",
      "Monthly performance reporting & optimization",
    ],
    process: [
      { step: "Audit", desc: "We review your current presence, competitors, and audience behavior to identify what's working and what's wasting effort." },
      { step: "Content System", desc: "We build a content calendar, pillar themes, and a shoot schedule aligned to your goals and each platform's format." },
      { step: "Produce & Publish", desc: "We shoot, edit, caption, and post on a consistent cadence — with community management running in parallel." },
      { step: "Measure & Refine", desc: "We report on engagement, reach, and conversion monthly, and adjust the content mix based on what the data says, not what we assumed." },
    ],
    technologies: ["Meta Business Suite", "TikTok Ads Manager", "CapCut", "Canva", "Later", "Notion", "Meta Creator Studio", "Google Analytics"],
  },
  {
    slug: "marketing-strategy",
    icon: "MS",
    title: "Marketing Strategy",
    subtitle: "The plan before the spend — so every channel pulls in one direction.",
    desc: "We build the strategy layer most businesses skip: one positioning, one set of priorities, and a channel plan that tells every other service — web, SEO, social, ads — what to actually do.",
    fullDesc: "Most businesses buy channels before they buy a strategy: a website here, some ads there, a social account nobody planned for. Each piece might be well executed, but none of them are pulling toward the same goal. We build the strategy layer first — positioning, priorities, and a channel plan — so every dollar spent afterward compounds instead of competing with itself.",
    problemHeading: "The Problem We Saw",
    problemBody: "We meet businesses running five marketing channels with five different messages, no shared metric of success, and no one accountable for how they fit together. The result is wasted spend: a social team celebrating engagement while a sales team wonders why leads are not qualified. Strategy is the layer that makes every channel accountable to the same number.",
    differentiators: [
      "Positioning before tactics. We define who you're for and why you win before recommending a single channel.",
      "One shared scorecard across every channel. Web, SEO, social, and ads all report against the same defined metrics — no more five departments claiming five different kinds of success.",
      "Channel prioritization based on your actual sales cycle and margin — not what's trending. A channel that doesn't fit your business model doesn't make the plan, no matter how popular it is.",
      "Quarterly strategy reviews, not a document that ships once and gets ignored. Markets shift; the plan has to be a living process, not a PDF.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "Clarity on where to focus.",
        features: ["Positioning & messaging workshop", "Competitor & market analysis", "Channel prioritization roadmap", "Quarterly strategy document", "One strategy review call"],
      },
      {
        name: "Precision",
        tagline: "A plan every channel executes against.",
        features: ["Everything in Core", "Full go-to-market plan", "Cross-channel content & campaign calendar", "Shared KPI scorecard across channels", "Monthly strategy check-in"],
      },
      {
        name: "Mastery",
        tagline: "Ongoing strategic partnership.",
        features: ["Everything in Precision", "Embedded strategic oversight across all active channels", "Budget allocation modeling & reforecasting", "Competitive response planning", "Weekly strategy sync + on-call advisory"],
      },
    ],
    signatureTitle: "The One-Page Strategy Test",
    signaturePromise: "If your marketing strategy can't fit on one page, it isn't a strategy yet. Here's what that page has to answer.",
    signatureItems: [
      "Who is the customer, specifically — not 'everyone who might need us'?",
      "What do we want them to believe about us that no competitor can credibly claim?",
      "Which two or three channels actually reach that customer at the stage they're in?",
      "What is the one metric that proves this is working — defined before the campaign starts, not after?",
      "What does each channel owe the others? (Does social feed the email list? Does SEO content fuel ads?)",
      "What will we stop doing to fund what we're starting?",
    ],
    results: [
      "A documented positioning statement every channel can be checked against.",
      "Reduced channel redundancy — measurable cut in spend on overlapping, underperforming tactics.",
      "One shared KPI dashboard replacing conflicting channel-level reports.",
      "Faster campaign launch time because channel decisions are pre-made, not re-argued each quarter.",
    ],
    whyFaq: [
      { q: "Why pay for strategy separately from execution?", a: "Because an agency executing without a strategy is optimizing for its own channel's metric, not your business outcome. Strategy sits above any single channel and keeps every executor honest to the same goal." },
      { q: "Why quarterly reviews instead of an annual plan?", a: "Because markets, competitors, and platforms change faster than a year. A plan that doesn't get revisited quarterly is a plan that's wrong by month four and nobody notices." },
      { q: "Do we need this if we already have an in-house marketing team?", a: "Often yes — an outside strategic view catches blind spots an internal team is too close to see, and gives your team a documented plan to execute against instead of competing priorities from different stakeholders." },
    ],
    features: [
      "Brand positioning & messaging strategy",
      "Competitor & market analysis",
      "Go-to-market planning",
      "Channel prioritization & budget allocation",
      "Cross-channel KPI frameworks",
      "Quarterly strategy reviews & reforecasting",
    ],
    process: [
      { step: "Discover", desc: "We study your market, competitors, customers, and current channel performance to find where the real opportunity is." },
      { step: "Define", desc: "We set positioning, priorities, and the shared scorecard every channel will be measured against." },
      { step: "Plan", desc: "We build the channel roadmap and campaign calendar, sequencing what launches first and why." },
      { step: "Review & Adapt", desc: "We revisit the plan on a defined cadence, reallocating budget and priorities based on real performance data." },
    ],
    technologies: ["Google Analytics 4", "Semrush", "HubSpot", "Looker Studio", "Miro", "Meta Business Suite", "Google Ads", "Notion"],
  },
  {
    slug: "media-buying",
    icon: "MB",
    title: "Media Buying",
    subtitle: "Every dollar tracked back to a lead, a sale, or cut.",
    desc: "We plan and run paid media across Meta, Google, and TikTok with one rule: if a dollar can't be traced to a result, it doesn't stay in the budget.",
    fullDesc: "Paid media fails most often not from bad creative but from bad accountability — budgets spread across platforms with no shared measurement, optimizing for cheap clicks instead of qualified leads. We plan and run paid media with one non-negotiable rule: every dollar is tracked to a lead, a sale, or it gets reallocated.",
    problemHeading: "The Problem We Saw",
    problemBody: "We've audited ad accounts burning thousands of dollars a month on 'engagement' campaigns that never intended to sell anything, tracked with pixels that were never verified, reported with screenshots instead of attribution. The advertiser rarely knows what's actually working — only that money is leaving the account.",
    differentiators: [
      "Verified tracking before spend, not after. We confirm pixels, conversion events, and attribution windows are correct before the first dollar goes live — not after month one's report raises questions.",
      "Budget follows performance, weekly. Underperforming ad sets get cut or reworked within the week, not left running until the monthly review.",
      "Creative testing built into the media plan. We test 3-5 creative variations per campaign as standard — because the algorithm rewards fresh, tested creative over stagnant single ads.",
      "Full transparency on spend and platform fees. You see exactly what goes to media spend versus management — no bundled black-box retainers.",
    ],
    tiers: [
      {
        name: "Core",
        tagline: "Structured spend, real tracking.",
        features: ["1 platform (Meta or Google)", "Up to $3,000/mo ad spend managed", "Conversion tracking setup & audit", "Weekly optimization", "Monthly performance report"],
      },
      {
        name: "Precision",
        tagline: "Multi-platform, actively managed.",
        features: ["2 platforms (Meta + Google or TikTok)", "Up to $10,000/mo ad spend managed", "Creative testing (3-5 variants/campaign)", "Landing page conversion review", "Bi-weekly optimization + reporting"],
      },
      {
        name: "Mastery",
        tagline: "Full-funnel paid media operation.",
        features: ["3+ platforms managed", "$10,000+/mo ad spend managed", "Full-funnel campaign structure (awareness → retargeting)", "Advanced audience & lookalike modeling", "Weekly optimization + strategy call"],
      },
    ],
    signatureTitle: "The Tracking Verification Checklist",
    signaturePromise: "Before a single dollar of your budget goes live, this is what we confirm.",
    signatureItems: [
      "Is the pixel or conversion API firing correctly on every key page — not just installed, but verified event by event?",
      "Are we tracking the action that actually matters (a purchase, a qualified lead) — not a proxy like a page view?",
      "Is the attribution window set correctly for your actual sales cycle, not the platform's default?",
      "Can we trace a single conversion back to the exact ad, audience, and creative that produced it?",
      "Is there a clear, agreed cost-per-result target before launch — not a number invented after the first report looks disappointing?",
    ],
    results: [
      "Cost per qualified lead or sale — not cost per click, which is a vanity metric on its own.",
      "Return on ad spend (ROAS) tracked against a pre-agreed target, reviewed weekly.",
      "Creative performance ranked and reported, so winning formats get more budget fast.",
      "Wasted spend identified and reallocated within the same billing cycle it's found.",
    ],
    whyFaq: [
      { q: "Why weekly budget shifts instead of monthly?", a: "Because a losing ad set left running for a full month is a full month of wasted spend. Platforms give you daily performance data — ignoring it until the monthly report is a choice, not a limitation." },
      { q: "Why do you test multiple creatives per campaign?", a: "Because ad fatigue is real and fast — a single creative's performance decays within days on some platforms. Testing isn't optional overhead, it's how you keep cost-per-result from climbing." },
      { q: "How is this different from just boosting posts?", a: "Boosting optimizes for engagement on a post. Media buying builds a funnel — awareness, retargeting, conversion — with tracking that ties spend to revenue, not likes." },
      { q: "Do you take a percentage of ad spend?", a: "Management fees are agreed upfront and disclosed separately from ad spend, so you always know exactly what's going to the platform versus to us." },
    ],
    features: [
      "Meta, Google, and TikTok ads management",
      "Conversion tracking & pixel/API implementation",
      "Full-funnel campaign structuring",
      "Creative testing & ad variation development",
      "Audience research & lookalike modeling",
      "Weekly optimization & transparent spend reporting",
    ],
    process: [
      { step: "Audit & Setup", desc: "We verify or install tracking, audit any existing campaigns, and confirm the metrics that actually matter for your business." },
      { step: "Plan", desc: "We build the funnel structure, audience targeting, and creative brief before a single ad goes live." },
      { step: "Launch & Test", desc: "We launch with multiple creative and audience variants running in parallel to identify what performs fastest." },
      { step: "Optimize Weekly", desc: "We reallocate budget toward what's working and cut what isn't — every week, not once a month." },
    ],
    technologies: ["Meta Ads Manager", "Google Ads", "TikTok Ads Manager", "Google Tag Manager", "Google Analytics 4", "Looker Studio", "Snapchat Ads", "Conversions API"],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
