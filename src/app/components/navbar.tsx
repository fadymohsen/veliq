"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    {
      href: "/services",
      label: "Services",
      desc: "What we do",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      href: "/about",
      label: "About",
      desc: "Who we are",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      href: "/projects",
      label: "Projects",
      desc: "Our work",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
      ),
    },
    {
      href: "/blog",
      label: "Blog",
      desc: "Latest insights",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      ),
    },
    {
      href: "/contact",
      label: "Contact Us",
      desc: "Get in touch",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
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

          {/* Desktop links */}
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

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-block rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30"
          >
            Get in Touch
          </Link>

          {/* Mobile burger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition-all duration-300 hover:bg-white/10"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0a0a14]/98 backdrop-blur-2xl transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Glowing orbs for visual effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`absolute left-1/2 top-1/3 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[120px] transition-all duration-700 ${
              menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />
          <div
            className={`absolute right-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] transition-all duration-700 delay-200 ${
              menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Menu content */}
        <div className="relative z-10 flex flex-col h-full pt-24 px-8 pb-10">
          {/* Navigation links */}
          <div className="flex-1 flex flex-col justify-center -mt-10">
            <div className="space-y-2">
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-500 ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  } ${
                    pathname.startsWith(link.href)
                      ? "bg-white/[0.08] border border-white/10"
                      : "hover:bg-white/[0.05]"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms",
                  }}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      pathname.startsWith(link.href)
                        ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400"
                        : "border-white/10 bg-white/[0.04] text-slate-500 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/[0.08]"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        pathname.startsWith(link.href)
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {link.label}
                    </p>
                    <p className="text-xs text-slate-600">{link.desc}</p>
                  </div>
                  {pathname.startsWith(link.href) && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom section: CTA + socials */}
          <div
            className={`space-y-6 transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-[#0a0a14] shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <p className="text-center text-xs text-slate-600">
              Software &amp; Marketing Solutions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
