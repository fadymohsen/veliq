"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "Blog",     href: "/blog"     },
];

function DotsIcon() {
  return (
    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden>
      <circle cx="2" cy="3" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="3" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="14" cy="3" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setCompact(false);
      } else if (y > lastY + 4) {
        setCompact(true);
      } else if (y < lastY - 4) {
        setCompact(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); return; }
      if (e.key !== "Tab") return;
      const menu = mobileMenuRef.current;
      if (!menu) return;
      const focusable = menu.querySelectorAll<HTMLElement>("a,button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const expanded = !compact || hovered;

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          aria-label="Main navigation"
          className="pointer-events-auto flex items-center rounded-full bg-[rgba(18,18,18,0.96)] backdrop-blur-[18px] border border-white/[0.07] shadow-[0_4px_32px_rgba(0,0,0,0.45)] p-[6px] gap-[2px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center rounded-full hover:bg-white/10 transition-colors px-3 py-[5px]"
          >
            <Image
              src="/branding/colored-logo.png"
              alt="VELIQ"
              width={72}
              height={24}
              className="object-contain h-[22px] w-auto"
              priority
            />
          </Link>

          {/* Expanded: links + contact */}
          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="expanded"
                className="hidden md:flex items-center gap-1 overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-px h-4 mx-1 bg-white/12" />

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`nav-link ${
                      pathname === link.href ? "nav-link--active" : "nav-link--default"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="w-px h-4 mx-1 bg-white/12" />

                <Link
                  href="/contact"
                  className="flex items-center rounded-full text-white bg-[var(--accent-indigo)] text-[13px] font-semibold px-[18px] py-[7px] whitespace-nowrap hover:brightness-110 transition-all"
                >
                  Contact
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                className="hidden md:flex items-center overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-px text-white/60 px-[10px] py-[7px]">
                  <DotsIcon />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-[5px] cursor-pointer w-11 h-11"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block bg-white origin-center w-4 h-[1.5px]"
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block bg-white w-4 h-[1.5px]"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block bg-white origin-center w-4 h-[1.5px]"
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.nav>
      </header>

      {/* Full-page mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[var(--surface-dark)]"
          >
            <div className="h-20" />

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`flex items-center gap-3 py-4 transition-colors border-b border-[rgb(22,22,22)] font-semibold tracking-[-0.04em] ${
                      pathname === link.href ? "text-white" : "text-[var(--text-body-dark)] hover:text-white"
                    }`}
                    style={{ fontSize: "clamp(28px, 7vw, 42px)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.05 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-full text-white font-semibold w-full bg-[var(--accent-indigo)] text-base py-4 hover:brightness-110 transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="px-8 pb-10 flex items-center justify-between"
            >
              <a
                href="mailto:admin@veliq.co"
                className="text-[13px] font-medium text-[var(--accent-indigo)] hover:opacity-75 transition-opacity"
              >
                admin@veliq.co
              </a>
              <span className="text-xs text-[rgb(50,50,50)]">
                &copy; {new Date().getFullYear()} VELIQ
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
