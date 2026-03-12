"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          VELIQ
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname.startsWith(link.href)
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark transition"
        >
          Get in Touch
        </Link>
      </nav>
    </header>
  );
}
