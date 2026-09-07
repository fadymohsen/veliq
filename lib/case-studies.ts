export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  excerpt: string;
  image: string;
  challenge: string;
  approach: string;
  solution: string;
  results: { metric: string; detail: string }[];
  services: string[];
  testimonial?: { quote: string; name: string; role: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "alfa-transport-logistics-platform",
    title: "How Alfa Transport 3x'd Enterprise Inquiries with a Bilingual Logistics Platform",
    client: "Alfa Transport",
    category: "Website Development",
    industry: "Logistics & Transport",
    excerpt: "A Saudi fleet operator managing 120+ vehicles across three countries had no digital presence that matched the scale of their operations. We built a bilingual platform that became their primary sales tool.",
    image: "/uploads/alfa-transport-screen.jpg",
    challenge:
      "Alfa Transport was managing a fleet of 120+ vehicles across Saudi Arabia, Egypt, and the UAE with nothing but a basic contact page. Enterprise clients couldn't verify credentials, request quotes, or assess fleet capabilities online. The company was losing contracts to competitors with modern digital presences, despite offering superior logistics services. Their sales team spent hours on phone calls answering questions that a well-built website would handle in seconds.",
    approach:
      "We started with a deep discovery phase — interviewing the sales team about the questions they answered most frequently, analyzing competitor sites across the Saudi logistics market, and mapping the decision journey of enterprise procurement managers. Every design and content decision was informed by this research, not assumptions.",
    solution:
      "We designed and built a bilingual Arabic/English website with an integrated quote request system, a fleet overview with real specifications, and a media-rich credential section featuring certifications, client logos, and operational data. The site was built on Next.js with server-side rendering for fast load times across the region, and structured data markup to improve visibility in local search results. The quote request flow was specifically designed to qualify leads before they reached the sales team — collecting shipment type, origin/destination, and volume upfront so the first conversation could be productive rather than exploratory.",
    results: [
      { metric: "3x", detail: "More qualified enterprise inquiries per month" },
      { metric: "120+", detail: "Vehicles showcased across the platform" },
      { metric: "60%", detail: "Reduction in unqualified sales calls" },
      { metric: "2", detail: "Languages supported (Arabic & English)" },
    ],
    services: ["website-development", "seo"],
  },
  {
    slug: "yamin-estate-property-platform",
    title: "How Yamin Estate Generated 450 Qualified Leads in 30 Days with an Immersive Property Platform",
    client: "Yamin Estate",
    category: "Website Development",
    industry: "Real Estate",
    excerpt: "A premium residential developer was losing buyers to competitors with superior online property showcases. We built an immersive platform that converted browsers into committed buyers before they ever visited the showroom.",
    image: "/uploads/yamin-estate-screen.jpg",
    challenge:
      "Yamin Estate was launching a premium residential development, but their digital presence couldn't convey the quality of the properties. Prospective buyers were visiting competitor sites with immersive virtual tours and 3D renders, choosing them without ever booking an in-person visit with Yamin. The sales team was spending significant time on showroom visits that didn't convert because buyers had already formed preferences based on competitors' superior online experiences.",
    approach:
      "We conducted competitive analysis of the top five real estate developers in the market, audited the buyer journey from initial online search through to purchase decision, and identified the specific moments where Yamin was losing prospects. The insight: buyers weren't choosing competitors for better properties — they were choosing them for a better online preview experience that built confidence before the showroom visit.",
    solution:
      "We created a premium real estate website with an interactive unit explorer that let buyers filter by floor, view, size, and price range. A detailed floor plan viewer showed room dimensions and orientations. The automated lead qualification flow captured buyer preferences, budget range, and timeline before routing to the right sales agent. The entire experience was designed to replicate the confidence a showroom visit provides — so that by the time a prospect booked a visit, they were already emotionally committed to a specific unit type.",
    results: [
      { metric: "450", detail: "Qualified leads generated in the first 30 days" },
      { metric: "12%", detail: "Lead-to-consultation conversion rate" },
      { metric: "#1", detail: "Best launch performance in company history" },
      { metric: "40%", detail: "Reduction in unqualified showroom visits" },
    ],
    services: ["website-development"],
  },
  {
    slug: "saudi-hayat-healthcare-platform",
    title: "How Saudi Hayat Unified Three Cities Under One Healthcare Platform and Grew Appointments 120%",
    client: "Saudi Hayat",
    category: "Website Development",
    industry: "Healthcare",
    excerpt: "A regional healthcare provider with clinics across three Saudi cities had disconnected online properties that confused patients. We unified everything into a single authoritative platform.",
    image: "/uploads/saudi-hayat-screen.jpg",
    challenge:
      "Saudi Hayat operated clinics across three Saudi cities, but each had a separate, inconsistent web presence. Patients couldn't find unified information about services, doctors, or locations. The brand that should project trust and authority was instead projecting fragmentation. Online appointment bookings were almost nonexistent — most patients called each clinic directly, leading to long hold times and a poor first impression.",
    approach:
      "We mapped every patient touchpoint across all three cities, audited the existing web properties for content overlap and gaps, and interviewed clinic managers about the most common patient questions and booking friction points. The goal was a single platform that felt like one healthcare brand while still serving location-specific needs.",
    solution:
      "We built a unified multilingual (Arabic/English) platform with location-based filtering that automatically prioritized the nearest clinic. A unified doctor directory let patients search by specialty, language, and location. The online appointment booking system connected to each clinic's scheduling infrastructure, reducing phone volume and giving patients 24/7 booking access. Structured data markup for medical specialties and locations improved visibility across Google's local search results for healthcare queries in all three cities.",
    results: [
      { metric: "120%", detail: "Increase in patient appointment requests" },
      { metric: "3", detail: "Cities unified under one platform" },
      { metric: "45%", detail: "Reduction in appointment-related phone calls" },
      { metric: "2", detail: "Languages (Arabic & English)" },
    ],
    services: ["website-development", "seo"],
  },
  {
    slug: "coach-shiko-seo-lead-generation",
    title: "How Coach Shiko Went from Zero Organic Leads to 40+ Per Month with SEO-Driven Lead Generation",
    client: "Coach Shiko",
    category: "SEO",
    industry: "Business Coaching",
    excerpt: "A business development coach with years of results and strong testimonials was getting zero organic leads. We rebuilt his digital presence around SEO and generated 40+ qualified inquiries per month within five months.",
    image: "/uploads/coach-shiko-screen.jpg",
    challenge:
      "Despite years of transformative coaching results and glowing client reviews, Coach Shiko's website had no SEO foundation, no clear positioning, and no mechanism to capture interested visitors. All leads came from expensive paid referrals and one-to-one networking events. His cost per acquisition was unsustainably high, and his growth was capped by the number of events he could physically attend.",
    approach:
      "We started by auditing his competitive landscape — identifying which coaching-related search terms had real commercial intent and manageable competition. We then worked with him to articulate his proprietary methodology in a way that both resonated with his ideal clients and gave us a strong content foundation to build around.",
    solution:
      "We crafted a positioning-first website built around his proprietary coaching framework, with dedicated pages for each service tier optimized for the commercial-intent keywords we identified. A free resource funnel — offering a diagnostic assessment in exchange for contact information — gave organic visitors a low-commitment entry point. Supporting blog content targeted long-tail informational queries that his ideal clients were searching before they were ready to hire a coach, building authority and creating internal linking pathways to his commercial pages.",
    results: [
      { metric: "0 to 40+", detail: "Monthly qualified organic inquiries in 5 months" },
      { metric: "Page 1", detail: "Rankings for 12 commercial-intent keywords" },
      { metric: "85%", detail: "Reduction in cost per lead vs. paid referrals" },
      { metric: "SEO", detail: "Now the primary lead generation channel" },
    ],
    services: ["website-development", "seo"],
  },
  {
    slug: "redbone-gym-brand-membership",
    title: "How RedBone Gym Increased New Memberships 90% by Repositioning Their Brand Online",
    client: "RedBone Gym",
    category: "Website Development",
    industry: "Fitness",
    excerpt: "A premium gym with top-tier equipment and certified trainers was competing on price against budget chains. We repositioned their brand and built a high-converting digital experience that justified premium pricing.",
    image: "/uploads/redbone-gym-screen.jpg",
    challenge:
      "RedBone Gym had genuinely superior facilities — top-tier equipment, certified trainers, and documented client transformation results. But their digital presence made them look like any other local gym. The outdated website had no booking system, no compelling visual identity, and no mechanism to communicate the premium experience that justified their higher pricing. They were losing potential members to budget chains that simply looked better online.",
    approach:
      "We conducted a positioning audit — comparing how RedBone presented itself versus how their actual members described the experience. The gap was significant: members talked about personalized training programs and real body transformations, while the website talked about square footage and equipment lists. We also analyzed the booking and trial-visit funnel, identifying every point where a prospect could drop off.",
    solution:
      "We created a bold visual identity that matched the energy of the gym itself. The high-converting membership landing page led with transformation testimonials and before/after documentation rather than facility photos. A streamlined online trial booking flow reduced the steps from interest to first visit from five to two. The pricing page was restructured to emphasize value per outcome rather than cost per month, with clear tier differentiation that made the premium option feel like the obvious choice for serious fitness goals.",
    results: [
      { metric: "90%", detail: "Increase in new member sign-ups" },
      { metric: "Q1", detail: "Results achieved within first quarter post-launch" },
      { metric: "Premium", detail: "Pricing justified through brand repositioning" },
      { metric: "2x", detail: "Online trial bookings vs. walk-ins" },
    ],
    services: ["website-development"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
