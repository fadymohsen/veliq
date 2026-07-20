import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

const ICONS: Record<string, React.ReactNode> = {
  "website-development": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  "website-support": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  "seo": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
};

export const metadata = {
  title: "Website Development, SEO & Support Services",
  description: "VELIQ is a website development company offering custom web development with SEO built in, ongoing website support, and technical SEO services across Egypt, Saudi Arabia, UAE, and the US.",
  alternates: { canonical: "https://veliq.co/services" },
};

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <h1 className="heading-1 text-white">Services.</h1>
          <p className="para-32 text-[rgb(201,201,201)] max-w-2xl">
            Three focused disciplines. One dedicated team. Every channel aligned to one direction — your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col gap-6 p-8 rounded-[24px] transition-all duration-300 hover:border-[rgb(99,102,241)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)]"
              style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-[16px] shrink-0"
                style={{ width: 64, height: 64, backgroundColor: "rgb(99,102,241)" }}
              >
                {ICONS[service.slug]}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <span className="text-[rgb(124,124,124)]" style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  0{i + 1}
                </span>
                <h2 className="text-white" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                  {service.title}
                </h2>
                <p className="text-[rgb(201,201,201)]" style={{ fontSize: "14px", lineHeight: 1.65 }}>
                  {service.desc}
                </p>
              </div>

              <span
                className="self-start text-white group-hover:gap-2 transition-all"
                style={{ fontSize: "13px", fontWeight: 600, color: "rgb(99,102,241)" }}
              >
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA + Blog link */}
        <div
          className="rounded-[20px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-white" style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Not sure which service fits?
            </h2>
            <p className="text-[rgb(160,160,160)]" style={{ fontSize: "14px", lineHeight: 1.5 }}>
              Book a free discovery meeting or explore our blog for insights on web development, SEO, and growth strategy.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-80 transition-opacity"
              style={{ border: "1px solid rgb(40,40,40)", fontSize: "13px", fontWeight: 500, padding: "10px 20px" }}
            >
              Read the Blog →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "rgb(99,102,241)", fontSize: "13px", fontWeight: 600, padding: "10px 20px" }}
            >
              Book a Meeting →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
