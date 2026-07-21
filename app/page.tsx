import { Suspense } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import HeaderBar from "@/components/ui/HeaderBar";
import IntroSection from "@/components/sections/IntroSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Footer from "@/components/sections/Footer";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));
const CtaSection = dynamic(() => import("@/components/sections/CtaSection"));

const HOME_FAQS = [
  { q: "What specific services do you provide?", a: "We specialize in three core pillars: Website Development, Website Support, and Technical SEO. We focus purely on digital experiences." },
  { q: "How long does a typical project take?", a: "A standard 5-page marketing site typically takes 3-7 days from kickoff to launch. Comprehensive branding and complex platform migrations usually range from 2-4 weeks." },
  { q: "Can I update the website myself after launch?", a: "Absolutely. We build websites with user-friendly content management in mind. Once we launch, we provide training and documentation showing you exactly how to edit text, swap images, and publish blog posts without writing code." },
  { q: "How do payments and deposits work?", a: "We require a 50% deposit to secure your slot in our production calendar. The remaining 50% is due upon project completion, just before we hand over the final credentials." },
  { q: "Do you offer ongoing support or maintenance?", a: "Yes. We offer monthly support and maintenance plans covering bug fixes, content edits, new page builds, SEO monitoring, and performance optimization." },
];

export default function Home() {
  return (
    <main className="bg-black">
      <JsonLd data={faqSchema(HOME_FAQS)} />
      {/* Hero — full-bleed, fills the entire viewport */}
      <HeroSection />

      {/* Everything below keeps the inset rounded-card stack look */}
      <div className="flex flex-col gap-[10px] p-2">
        <HeaderBar label="About Us" />
        <IntroSection />
        <MissionVisionSection />

        <HeaderBar label="Portfolio" />
        <ProjectsSection />

        <HeaderBar label="Services" />
        <Suspense>
          <ServicesSection />
        </Suspense>

        <Suspense>
          <StatsSection />
        </Suspense>

        <HeaderBar label="FAQ" />
        <Suspense>
          <FaqSection />
        </Suspense>

        <Suspense>
          <CtaSection />
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}
