import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VELIQ — Coming Soon | Software & Marketing Solutions",
  description:
    "VELIQ is launching soon. We build custom software, mobile apps, and data-driven marketing strategies that accelerate business growth. Get in touch to start early.",
  keywords: [
    "VELIQ",
    "software development",
    "digital marketing",
    "web development",
    "mobile app development",
    "SEO",
    "brand strategy",
    "data analytics",
  ],
  openGraph: {
    title: "VELIQ — Something Great Is Coming",
    description:
      "We're crafting cutting-edge software and marketing solutions to drive your business growth. Stay tuned or reach out now.",
    url: "https://veliq.co",
    siteName: "VELIQ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELIQ — Something Great Is Coming",
    description:
      "Software & marketing solutions that drive growth. Launching soon.",
  },
  metadataBase: new URL("https://veliq.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
