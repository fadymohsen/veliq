import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About Us | VELIQ Website Development Company",
  description: "VELIQ is a website development company in Cairo, Egypt serving clients across Egypt, Saudi Arabia, UAE, and the US with custom web development, SEO, and ongoing website support.",
  alternates: { canonical: "https://www.veliq.co/about" },
  openGraph: {
    title: "About VELIQ — Website Development Company",
    description: "VELIQ is a website development company in Cairo, Egypt serving clients across Egypt, Saudi Arabia, UAE, and the US with custom web development, SEO, and ongoing support.",
    url: "https://www.veliq.co/about",
    images: [{ url: "https://www.veliq.co/about/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About VELIQ — Website Development Company",
    description: "VELIQ is a website development company in Cairo, Egypt serving clients across Egypt, Saudi Arabia, UAE, and the US.",
    images: ["https://www.veliq.co/about/opengraph-image"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "About", url: "https://www.veliq.co/about" },
      ])} />
      {children}
    </>
  );
}
