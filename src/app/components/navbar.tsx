"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
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

  const showSolid = !isHome || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        showSolid
          ? "bg-white/80 backdrop-blur border-b border-slate-200"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
            showSolid ? "text-primary" : "text-white"
          }`}
        >
          VELIQ
        </Link>
        <div
          className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
            showSolid ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname.startsWith(link.href)
                  ? showSolid
                    ? "text-primary font-semibold"
                    : "text-white font-semibold"
                  : showSolid
                    ? "hover:text-primary transition"
                    : "hover:text-white transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className={`rounded-full px-5 py-2 text-sm font-semibold shadow transition-all duration-300 ${
            showSolid
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-white text-[#0a0a14] hover:shadow-indigo-500/40 hover:scale-[1.02]"
          }`}
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
