import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import GlobalBackground from "@/components/ui/GlobalBackground";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { SplashScreen, CustomCursor } from "@/components/ui/ClientOnly";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://veliq.co"),
  title: {
    default: "VELIQ — Website Development Company with SEO",
    template: "%s — VELIQ",
  },
  description:
    "VELIQ builds SEO-optimized websites for businesses in Egypt, Saudi Arabia, UAE, and the US. Custom web development, technical SEO, and ongoing support.",
  keywords: ["website development company", "website development with SEO", "web development agency", "website development company in Egypt", "SEO-friendly website development", "custom website development", "website support", "web development Cairo", "SEO services Egypt", "website development Saudi Arabia"],
  authors: [{ name: "VELIQ", url: "https://veliq.co" }],
  openGraph: {
    title: "VELIQ — Website Development Company with SEO",
    description: "Website development company building SEO-optimized websites for businesses in Egypt, Saudi Arabia, UAE, and the US.",
    url: "https://veliq.co",
    siteName: "VELIQ",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VELIQ — Website Development Company with SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELIQ — Website Development Company with SEO",
    description: "Website development company building SEO-optimized websites for businesses in Egypt, Saudi Arabia, UAE, and the US.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://veliq.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="relative bg-black text-white min-h-full antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          style={{ backgroundColor: "rgb(99,102,241)" }}
        >
          Skip to content
        </a>
        <SplashScreen />
        <GlobalBackground />
        <CustomCursor />
        <Navbar />
        <div id="main" tabIndex={-1}>{children}</div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
