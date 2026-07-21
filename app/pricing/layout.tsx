import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development & SEO Pricing",
  description: "Simple, transparent pricing. Website packages, monthly support plans, and SEO services — all with clear pricing.",
  alternates: { canonical: "https://veliq.co/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
