import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Website Development & SEO Pricing",
  description: "Simple, transparent pricing. Website packages, monthly support plans, and SEO services — all with clear pricing.",
  alternates: { canonical: "https://www.veliq.co/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Pricing", url: "https://www.veliq.co/pricing" },
      ])} />
      {children}
    </>
  );
}
