import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "About Us — VELIQ Website Development Company",
  description: "VELIQ is a website development company in Cairo, Egypt serving clients across Egypt, Saudi Arabia, UAE, and the US with custom web development, SEO, and ongoing website support.",
  alternates: { canonical: "https://www.veliq.co/about" },
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
