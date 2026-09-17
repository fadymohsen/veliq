import type { Metadata } from "next";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Website Development & SEO Pricing",
  description: "Simple, transparent pricing. Website packages, monthly support plans, and SEO services, all with clear pricing.",
  alternates: { canonical: "https://www.veliq.co/pricing" },
  openGraph: {
    title: "Website Development & SEO Pricing — VELIQ",
    description: "Simple, transparent pricing for website development, SEO, and support. No hidden fees. Get a quote within 24 hours.",
    url: "https://www.veliq.co/pricing",
    images: [{ url: "https://www.veliq.co/pricing/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Website Development & SEO Pricing — VELIQ",
    description: "Simple, transparent pricing for website development, SEO, and support. No hidden fees.",
    images: ["https://www.veliq.co/pricing/opengraph-image"],
  },
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
