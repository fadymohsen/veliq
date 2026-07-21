import Link from "next/link";
import Image from "next/image";
import BackToTopButton from "@/components/ui/BackToTopButton";

const MENU_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing",  href: "/pricing" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Website Development with SEO", href: "/website-development-with-seo" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",      href: "/legal/privacy" },
  { label: "Terms & Conditions",  href: "/legal/terms" },
  { label: "Refund Policy",       href: "/legal/refund" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/veliq.co",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/veliq.co/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/veliq-co",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-col bg-black">
      {/* Top content */}
      <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-12 px-8 pt-16 pb-12">

        {/* Left: CTA + contact */}
        <div className="flex flex-col gap-6 max-w-xs">
          <div className="flex flex-col gap-1">
            <span className="section-label">Ready to build?</span>
            <h3
              className="text-white font-semibold tracking-[-0.04em] leading-[1.2]"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 28px)" }}
            >
              Let&apos;s create something<br />that moves people.
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="mailto:admin@veliq.co"
              className="text-sm font-semibold text-[var(--accent-indigo)] hover:opacity-75 transition-opacity w-fit"
            >
              admin@veliq.co
            </a>
            <a
              href="tel:+201551164671"
              className="text-sm text-[var(--text-body-light)] hover:text-white transition-colors w-fit"
            >
              +20 155 116 4671
            </a>
            <span className="text-sm text-[var(--text-body-light)]">
              8 Samoiel Markos, St, Shobra, Cairo
            </span>
          </div>

          <BackToTopButton />
        </div>

        {/* Right: nav + social */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="section-label-sm">Menu</span>
            <ul className="flex flex-col gap-[10px]">
              {MENU_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-[var(--text-body-light)] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="section-label-sm">Legal</span>
            <ul className="flex flex-col gap-[10px]">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-[var(--text-body-light)] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="section-label-sm">Social</span>
            <div className="flex flex-col border-t border-[var(--border-subtle)]">
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 text-[var(--text-body-light)] border-b border-[var(--border-subtle)] transition-colors duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="group-hover:text-white transition-colors duration-200">
                      {l.icon}
                    </span>
                    <span className="text-[13px] font-medium tracking-[0.01em] group-hover:text-white transition-colors duration-200">
                      {l.label}
                    </span>
                  </div>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgb(18,18,18)] mx-8" />

      {/* Bottom brand row */}
      <div className="w-full flex items-center justify-between px-8 py-6">
        <Image
          src="/branding/colored-logo.png"
          alt="VELIQ"
          width={100}
          height={32}
          className="object-contain opacity-85"
        />
        <span className="text-xs text-[var(--text-body)] tracking-[-0.01em]">
          © {new Date().getFullYear()} VELIQ. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
