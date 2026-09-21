import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import SplashScreen from "@/components/ui/SplashScreen";

const LeadMagnetSection = dynamic(() => import("@/components/sections/LeadMagnetSection"));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));
const CtaSection = dynamic(() => import("@/components/sections/CtaSection"));

const HOME_FAQS = [
  { q: "What specific services do you provide?", a: "We offer six focused services: Website Development, Mobile App Development, SEO, Social Media, Marketing Strategy, and Media Buying, all under one dedicated team." },
  { q: "How long does a typical project take?", a: "A standard 5-page marketing site typically takes 3-7 days from kickoff to launch. Comprehensive branding and complex platform migrations usually range from 2-4 weeks." },
  { q: "Can I update the website myself after launch?", a: "Absolutely. We build websites with user-friendly content management in mind. Once we launch, we provide training and documentation showing you exactly how to edit text, swap images, and publish blog posts without writing code." },
  { q: "How do payments and deposits work?", a: "We require a 50% deposit to secure your slot in our production calendar. The remaining 50% is due upon project completion, just before we hand over the final credentials." },
  { q: "Do you offer ongoing support or maintenance?", a: "Yes. We offer monthly support and maintenance plans covering bug fixes, content edits, new page builds, SEO monitoring, and performance optimization." },
];

export default function Home() {
  return (
    <main className="bg-black">
      <SplashScreen />
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* 1. Hero — clear value prop + primary CTA */}
      <HeroSection />

      <div className="flex flex-col gap-[10px] p-2">

        {/* 2. Client Logos + instant credibility */}
        <IntroSection />

        {/* 2.5. Google Reviews — real client social proof */}
        <ReviewsSection />

        {/* 3. Services — server-rendered grid (crawlable, no scroll-jacking) */}
        <section className="w-full bg-black section-padding">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="heading-1 text-white">Services.</h2>
              <p className="para-32 text-[var(--text-secondary)] max-w-2xl">
                Six focused disciplines. One dedicated team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="card p-7 flex flex-col gap-4 transition-colors hover:border-[var(--accent-indigo)]"
                >
                  <h3 className="text-white text-lg font-bold tracking-[-0.03em]">{service.title}</h3>
                  <p className="text-[15px] md:text-sm text-[var(--text-body)] leading-[1.65]">{service.desc}</p>
                  <span className="text-[var(--accent-indigo)] text-[13px] font-semibold mt-auto">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Projects — browsable grid */}
        <ProjectsSection />

        {/* 5. SEO dev features + Lead magnet */}
        <Suspense fallback={<div className="w-full section-padding" />}>
          <LeadMagnetSection />
        </Suspense>

        {/* 7.5. Blog — latest articles */}
        <Suspense fallback={
          <section className="w-full bg-black section-padding">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16">
              <div className="h-10 w-24 rounded-lg bg-[rgb(18,18,18)] animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-full rounded-[15px] bg-[rgb(18,18,18)] animate-pulse" style={{ aspectRatio: "1.6" }} />
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-24 rounded bg-[rgb(24,24,24)] animate-pulse" />
                      <div className="h-5 w-full rounded bg-[rgb(24,24,24)] animate-pulse" />
                      <div className="h-5 w-3/4 rounded bg-[rgb(24,24,24)] animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }>
          <BlogSection />
        </Suspense>

        {/* 8. FAQ */}
        <Suspense fallback={<div className="w-full section-padding" />}>
          <FaqSection />
        </Suspense>

        {/* 9. Final CTA */}
        <Suspense fallback={<div className="w-full section-padding" />}>
          <CtaSection />
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}
