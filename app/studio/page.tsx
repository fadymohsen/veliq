import Footer from "@/components/sections/Footer";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "VELIQ Studio | Design & Automation Lab",
  description: "VELIQ Studio is a design and automation lab that removes friction from digital operations. We integrate AI and kinetic workflows to transform companies into self-driving entities.",
  alternates: { canonical: "https://www.veliq.co/studio" },
  openGraph: {
    title: "VELIQ Studio — Design & Automation Lab",
    description: "A design and automation lab dedicated to removing friction. Advanced AI and kinetic workflows that transform companies into self-driving entities.",
    url: "https://www.veliq.co/studio",
    images: [{ url: "https://www.veliq.co/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "VELIQ Studio — Design & Automation Lab",
    description: "A design and automation lab dedicated to removing friction from digital operations.",
    images: ["https://www.veliq.co/og-image.png"],
  },
};

export default function StudioPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Studio", url: "https://www.veliq.co/studio" },
      ])} />
      <section className="section-padding max-w-[1200px] mx-auto">
        <h1 className="heading-1 text-white">Studio.</h1>
        <p className="para-32 text-[rgb(201,201,201)] mt-8 max-w-2xl">
          We are a design and automation lab dedicated to removing friction. By
          integrating advanced AI and kinetic workflows, we transform static
          companies into self-driving entities.
        </p>
      </section>
      <Footer />
    </main>
  );
}
