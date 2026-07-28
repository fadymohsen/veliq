import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import JourneyMapSection, { type JourneyStop } from "@/components/sections/JourneyMapSection";
import FadeIn from "@/components/ui/FadeIn";
import AuditCtaSection from "./AuditCtaSection";

export const metadata: Metadata = {
  title: "Website Development with SEO Built In",
  description:
    "VELIQ is a website development company that builds SEO into every website from day one. Custom web development with technical SEO, Core Web Vitals optimization, and structured data — serving Egypt, Saudi Arabia, UAE, and the US.",
  alternates: { canonical: "https://www.veliq.co/website-development-with-seo" },
  openGraph: {
    title: "Website Development with SEO Built In — VELIQ",
    description: "A website development company that builds SEO-optimized websites from the ground up. No retrofitting, no afterthoughts.",
    url: "https://www.veliq.co/website-development-with-seo",
  },
};

const INDIGO = "rgb(99,102,241)";

const JOURNEY_STOPS: JourneyStop[] = [
  {
    title: "The problem with most website development",
    desc: "Most companies build your site, hand it over, and wish you luck with SEO. The result: bloated code, missing meta tags, no structured data, broken mobile layouts, and a 4-second load time Google penalizes. Then you pay an SEO agency to fix what should've been built right the first time.",
  },
  {
    title: "SEO Architecture from Day One",
    desc: "Clean URL structures, semantic HTML, proper heading hierarchy, and crawlable site architecture — built into the foundation, not bolted on after launch.",
  },
  {
    title: "Core Web Vitals by Default",
    desc: "Every site ships with sub-2-second load times, zero layout shift, and instant interactivity. Google rewards fast sites with higher rankings.",
  },
  {
    title: "Structured Data Built In",
    desc: "JSON-LD schema markup for your business, services, FAQs, and articles — enabling rich results and better search visibility from launch day.",
  },
  {
    title: "Mobile-First Development",
    desc: "70%+ of your traffic is mobile. Every layout is designed and tested on phones first, ensuring fast load times and a seamless experience where it matters most.",
  },
  {
    title: "Conversion-Led Design",
    desc: "Every page has one job. Strategic CTA placement, clear user journeys, and copy that converts — not just a pretty design that wins awards and loses leads.",
  },
  {
    title: "Ongoing Support & SEO Growth",
    desc: "After launch, we monitor performance, track rankings, and continuously optimize. Your website improves every month, not just on launch day.",
  },
  {
    title: "Discovery & SEO Audit",
    desc: "We analyze your market, competitors, and target keywords before writing a single line of code. SEO strategy informs every design and development decision.",
  },
  {
    title: "Design & Architecture",
    desc: "Mobile-first wireframes and UI design built around your SEO keyword map. Every page targets specific search intent with the right content hierarchy.",
  },
  {
    title: "Development & Optimization",
    desc: "Clean, performant code with Next.js. Technical SEO implemented during development: meta tags, schema markup, image optimization, internal linking.",
  },
  {
    title: "Launch & Growth",
    desc: "We deploy, submit to search engines, and begin tracking rankings. Ongoing support and SEO refinement keep your site climbing month after month.",
  },
];

const FAQS = [
  {
    q: "Why should website development and SEO happen together?",
    a: "Because SEO is not something you add after a website is built. The most impactful SEO factors — site architecture, URL structure, page speed, mobile usability, and internal linking — are all determined during development. Retrofitting SEO onto a finished site is slower, more expensive, and less effective than building it in from the start.",
  },
  {
    q: "What makes VELIQ different from other website development companies?",
    a: "We are a website development company that treats SEO as a core development requirement, not an upsell. Every site we build includes technical SEO foundations, Core Web Vitals optimization, structured data markup, and a content architecture designed for search visibility. Most agencies build first and optimize later — we do both simultaneously.",
  },
  {
    q: "How long does a website with SEO take to build?",
    a: "A standard 5-page website with full SEO optimization takes 1-2 weeks. More complex projects with multiple service pages, blog infrastructure, and multilingual support typically take 2-4 weeks. SEO results begin showing within 30-90 days of launch.",
  },
  {
    q: "Do you work with businesses outside Egypt?",
    a: "Yes. We serve clients across Egypt, Saudi Arabia, UAE, and the United States. Our website development and SEO services are fully remote, and we have experience optimizing for both English and Arabic search markets.",
  },
  {
    q: "What technologies do you use for website development?",
    a: "We build with Next.js, React, TypeScript, and Tailwind CSS — deployed on Vercel for maximum performance. This modern stack delivers server-side rendering, automatic code splitting, and edge caching that template-based platforms cannot match.",
  },
  {
    q: "Do you offer ongoing SEO after the website launches?",
    a: "Yes. We offer monthly support plans that include SEO monitoring, content optimization, keyword tracking, and technical audits. Your website is a living system that needs continuous improvement to maintain and grow its search rankings.",
  },
];

export default function WebDevWithSeoPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={faqSchema(FAQS)} />

      {/* Hero */}
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col items-center text-center gap-8">
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Website Development Company
        </span>
        <h1
          className="text-white"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", maxWidth: "18ch" }}
        >
          Website Development{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, rgb(99,102,241), rgb(168,85,247), rgb(45,212,191))" }}>
            with SEO Built In.
          </span>
        </h1>
        <p style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 400, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: "56ch" }}>
          Most websites are built first and optimized later. We do both at the same time. Every website we develop is engineered for search engines from the first line of code — so you launch with speed, structure, and rankings from day one.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full text-white hover:brightness-110 transition-all"
            style={{ backgroundColor: INDIGO, fontSize: 14, fontWeight: 600, padding: "14px 32px" }}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full text-white hover:bg-white/5 transition-all"
            style={{ fontSize: 14, fontWeight: 500, padding: "14px 32px", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* Problem + Benefits + Process — one continuous journey map */}
      <JourneyMapSection
        stops={JOURNEY_STOPS}
        heading="From problem to launch, one route."
        subheading="SEO is woven into every stop along the way — not added as a final checkbox."
      />

      {/* CTA */}
      <FadeIn>
        <AuditCtaSection />
      </FadeIn>

      {/* FAQ */}
      <section className="section-padding max-w-[900px] mx-auto flex flex-col gap-10">
        <h2 className="text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4">
          {FAQS.map((faq) => (
            <FadeIn key={faq.q}>
              <div
                className="flex flex-col gap-3 rounded-[16px] p-7"
                style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(24,24,24)" }}
              >
                <h3 className="text-white" style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
