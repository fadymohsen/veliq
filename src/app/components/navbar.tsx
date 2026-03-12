"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a14]/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-white/[0.03] backdrop-blur-md border-b border-white/[0.06]"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition-colors duration-300"
        >
          VELIQ
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname.startsWith(link.href)
                  ? "text-white font-semibold"
                  : "hover:text-white transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
