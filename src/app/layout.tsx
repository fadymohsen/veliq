import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/layout-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://veliq.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VELIQ — Software & Marketing Solutions",
    template: "%s — VELIQ",
  },
  description:
    "VELIQ delivers cutting-edge software development and data-driven marketing solutions to accelerate your business growth.",
  keywords: [
    "software development",
    "digital marketing",
    "web development",
    "mobile app development",
    "SEO",
    "brand strategy",
    "data analytics",
    "digital agency",
    "Cairo",
    "Egypt",
  ],
  authors: [{ name: "VELIQ" }],
  creator: "VELIQ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "VELIQ",
    title: "VELIQ — Software & Marketing Solutions",
    description:
      "We design, build, and market digital products that help businesses scale — from custom software platforms to high-impact marketing campaigns.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELIQ — Software & Marketing Solutions",
    description:
      "We design, build, and market digital products that help businesses scale.",
    creator: "@veliq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VELIQ",
  url: SITE_URL,
  description:
    "Full-service digital agency delivering software development and marketing solutions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+20-123-456-7890",
    contactType: "customer service",
    email: "hello@veliq.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/veliq",
    "https://twitter.com/veliq",
    "https://www.instagram.com/veliq",
    "https://www.facebook.com/veliq",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
