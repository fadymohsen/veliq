"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_ALT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PLANS = [
  {
    name: "Design Support",
    description: "Perfect for startups needing consistent social and marketing assets.",
    price: "1,999",
    cta: "Get Started",
    href: "/checkout/design-support",
    dim: false,
    ctaDark: false,
    features: [
      "One active request at a time",
      "2-day average turnaround",
      "Social media & Ad creatives",
    ],
  },
  {
    name: "Web & Growth",
    description: "Comprehensive support for growing companies, including web development.",
    price: "4,499",
    cta: "Scale Now",
    href: "/checkout/web-and-growth",
    dim: false,
    ctaDark: false,
    features: [
      "Two active requests at a time",
      "Website development & updates",
      "Landing page optimization",
      "Basic SEO setup",
      "Presentation decks",
      "Stock photo sourcing",
    ],
  },
  {
    name: "Agency Partner",
    description: "A fully dedicated design team integrated directly into your workflow.",
    price: "8,999",
    cta: "Book a Call",
    href: "/checkout/agency-partner",
    dim: true,
    ctaDark: true,
    features: [
      "Four active requests at a time",
      "Priority support via Slack",
      "Unlimited brands",
      "Advanced 3D & Motion graphics",
      "Strategy workshops",
      "Weekly sync calls",
      "Dedicated Project Manager",
      "Same-day turnaround on small tasks",
    ],
  },
] as const;

const FADE = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: EASE },
  }),
};

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section ref={ref} className="w-full bg-black rounded-[30px] section-padding overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-20">

        <motion.h2
          className="heading-1 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_ALT }}
        >
          Pricing.
        </motion.h2>

        {/* Testimonial row */}
        <motion.div
          className="flex flex-col md:flex-row items-start justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_ALT }}
        >
          <div className="flex items-center gap-3 shrink-0">
            <Image
              src="https://framerusercontent.com/images/Yu9jCAlIsZa9Zjjiuq1z4zV4JBo.png"
              alt="Michael Williams"
              width={54}
              height={54}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col gap-0.5">
              <span className="para-16 text-white">Michael Williams</span>
              <span className="para-14 text-[var(--text-label)]">CEO @Vixopedia</span>
            </div>
          </div>
          <p className="para-32 text-white md:w-[55%]">
            Most agencies sell time. We sell displacement. Choose a high-impact
            sprint to accelerate your market position, or partner with us for the long haul.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="flex flex-col md:flex-row gap-[10px]">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="flex-1 card p-8 flex flex-col gap-6"
              style={{ opacity: plan.dim ? 0.65 : 1 }}
              variants={FADE}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-bold tracking-[-0.03em]">
                  {plan.name}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-[1.55]">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-[2px]">
                <sup className="text-white text-lg font-medium leading-none">$</sup>
                <span className="text-white text-[60px] font-bold tracking-[-0.04em] leading-none">
                  {plan.price}
                </span>
                <span className="text-[13px] text-[var(--text-muted)] ml-1.5">/ Month</span>
              </div>

              <Link
                href={plan.href}
                className="w-full flex items-center justify-center rounded-full text-white text-sm font-semibold py-[15px] hover:brightness-110 transition-all"
                style={{ backgroundColor: plan.ctaDark ? "rgb(32,32,32)" : "var(--accent-indigo)" }}
              >
                {plan.cta}
              </Link>

              <div className="divider" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />

              <div className="flex flex-col gap-3">
                <span className="text-white text-[15px] font-bold">What&apos;s included</span>
                <ul className="flex flex-col gap-[10px]">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span className="feature-bar" />
                      <span className="text-[13px] text-white/75 leading-[1.45]">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
