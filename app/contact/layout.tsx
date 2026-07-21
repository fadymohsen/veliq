import type { Metadata } from "next";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

const CONTACT_FAQS = [
  { q: "How quickly can you start on my project?", a: "Most projects kick off within 1–2 weeks of signing. We'll schedule a discovery call to understand your needs and align on timelines before we begin." },
  { q: "What's your typical project timeline?", a: "It depends on scope. A marketing campaign might take 2–4 weeks, while a full web application could take 2–4 months. We'll give you a clear timeline during our proposal phase." },
  { q: "Do you work with startups or only established businesses?", a: "We work with both. Whether you're a startup looking for an MVP or an enterprise needing a complex platform, we tailor our approach to fit your stage and budget." },
  { q: "What if I need ongoing support after launch?", a: "We offer flexible maintenance and support plans. Many of our clients continue working with us long after launch for updates, optimization, and new features." },
];

export const metadata: Metadata = {
  title: "Contact VELIQ — Website Development Company",
  description: "Get in touch with VELIQ for custom website development, SEO, and ongoing support. We'll get back to you within 24 hours.",
  alternates: { canonical: "https://veliq.co/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqSchema(CONTACT_FAQS)} />
      {children}
    </>
  );
}
