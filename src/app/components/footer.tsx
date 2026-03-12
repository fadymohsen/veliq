"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      className={`border-t py-12 ${
        isHome
          ? "border-white/10 bg-[#0a0a14]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          isHome ? "text-slate-600" : "text-slate-500"
        }`}
      >
        <p>&copy; {new Date().getFullYear()} VELIQ. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className={`transition ${isHome ? "hover:text-indigo-400" : "hover:text-primary"}`}>Privacy</a>
          <a href="#" className={`transition ${isHome ? "hover:text-indigo-400" : "hover:text-primary"}`}>Terms</a>
          <a href="#" className={`transition ${isHome ? "hover:text-indigo-400" : "hover:text-primary"}`}>LinkedIn</a>
          <a href="#" className={`transition ${isHome ? "hover:text-indigo-400" : "hover:text-primary"}`}>Twitter</a>
        </div>
      </div>
    </footer>
  );
}
