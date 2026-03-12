"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const socials = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const dark = isHome;
  const textMuted = dark ? "text-slate-500" : "text-slate-500";
  const textDefault = dark ? "text-slate-400" : "text-slate-600";
  const hoverColor = dark ? "hover:text-white" : "hover:text-slate-900";
  const socialHover = dark
    ? "hover:bg-white/10 hover:text-white hover:border-white/20"
    : "hover:bg-slate-900 hover:text-white hover:border-slate-900";
  const dividerColor = dark ? "border-white/10" : "border-slate-200";

  return (
    <footer
      className={`border-t pt-16 pb-8 ${
        dark ? "border-white/10 bg-[#0a0a14]" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Top section */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className={`text-2xl font-bold tracking-tight ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              VELIQ
            </Link>
            <p className={`mt-4 text-sm leading-relaxed ${textMuted}`}>
              Software &amp; marketing solutions that drive growth. We design,
              build, and market digital products for ambitious businesses.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
                    dark
                      ? "border-white/10 text-slate-500"
                      : "border-slate-200 text-slate-400"
                  } ${socialHover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`text-xs font-semibold uppercase tracking-widest ${
                dark ? "text-slate-400" : "text-slate-900"
              }`}
            >
              Navigation
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm ${textMuted} ${hoverColor} transition`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className={`text-xs font-semibold uppercase tracking-widest ${
                dark ? "text-slate-400" : "text-slate-900"
              }`}
            >
              Services
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { href: "/services/website-development", label: "Web Development" },
                { href: "/services/mobile-development", label: "Mobile Development" },
                { href: "/services/seo-setup", label: "SEO Setup" },
                { href: "/services/digital-marketing", label: "Digital Marketing" },
                { href: "/services/data-analytics", label: "Data & Analytics" },
                { href: "/services/brand-strategy", label: "Brand Strategy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm ${textMuted} ${hoverColor} transition`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-xs font-semibold uppercase tracking-widest ${
                dark ? "text-slate-400" : "text-slate-900"
              }`}
            >
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@veliq.com"
                  className={`text-sm ${textDefault} ${hoverColor} transition`}
                >
                  hello@veliq.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+201234567890"
                  className={`text-sm ${textDefault} ${hoverColor} transition`}
                >
                  +20 123 456 7890
                </a>
              </li>
              <li className={`text-sm ${textMuted}`}>Cairo, Egypt</li>
              <li className={`text-sm ${textMuted}`}>Sun – Thu, 9AM – 6PM</li>
            </ul>
            <Link
              href="/contact"
              className={`mt-6 inline-block rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                dark
                  ? "bg-white text-[#0a0a14] hover:bg-slate-200"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-14 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-8 text-xs ${dividerColor} ${textMuted}`}
        >
          <p>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className={`${hoverColor} transition`}>
              Privacy Policy
            </a>
            <a href="#" className={`${hoverColor} transition`}>
              Terms of Service
            </a>
            <a href="#" className={`${hoverColor} transition`}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
