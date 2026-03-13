import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/layout-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VELIQ — Software & Marketing Solutions",
  description:
    "VELIQ delivers cutting-edge software development and data-driven marketing solutions to accelerate your business growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
