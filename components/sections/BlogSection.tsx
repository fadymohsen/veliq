"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BLOG_POSTS } from "@/lib/blog";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const HUE_MAP: Record<string, string> = {
  "Web Development":    "230",
  "SEO":                "290",
  "Mobile Development": "25",
  "Data & Analytics":   "180",
  "Brand Strategy":     "40",
  "Digital Marketing":  "150",
};

function CategoryIcon({ category, size = 56 }: { category: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (category) {
    case "Web Development":
      return <svg {...common}><path d="M9 18l-6-6 6-6" /><path d="M15 6l6 6-6 6" /></svg>;
    case "SEO":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case "Mobile Development":
      return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>;
    case "Data & Analytics":
      return <svg {...common}><line x1="6" y1="20" x2="6" y2="14" /><line x1="12" y1="20" x2="12" y2="8" /><line x1="18" y1="20" x2="18" y2="4" /></svg>;
    case "Brand Strategy":
      return <svg {...common}><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>;
    case "Digital Marketing":
      return <svg {...common}><path d="M3 11l18-6v14l-18-6v-2z" /><path d="M7 15v4a2 2 0 0 0 2 2h1" /></svg>;
    default:
      return null;
  }
}

function BlogCard({ post, index }: { post: (typeof BLOG_POSTS)[number]; index: number }) {
  const hue = HUE_MAP[post.category] ?? "220";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4 h-full">
        <div
          className="w-full rounded-[15px] overflow-hidden relative"
          style={{
            aspectRatio: "1.6",
            background: `linear-gradient(135deg, hsl(${hue}, 20%, 10%) 0%, hsl(${hue}, 12%, 6%) 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse at 50% 110%, hsl(${hue}, 35%, 16%) 0%, transparent 70%)` }}
          />
          <div className="absolute opacity-[0.14] group-hover:opacity-25 transition-opacity duration-500" style={{ bottom: "14px", right: "14px" }}>
            <CategoryIcon category={post.category} />
          </div>
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[rgb(201,201,201)] uppercase"
            style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", backgroundColor: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {post.category}
          </span>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <span className="para-12 text-[rgb(124,124,124)]">{post.date} &middot; {post.readTime}</span>
          <h3
            className="text-white group-hover:text-[rgb(201,201,201)] transition-colors"
            style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: "1.3em" }}
          >
            {post.title}
          </h3>
          <p className="text-[rgb(124,124,124)] line-clamp-2" style={{ fontSize: "13px", lineHeight: 1.55 }}>
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  const featured = BLOG_POSTS.slice(0, 3);

  return (
    <section ref={ref} className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-16">

        <motion.div
          className="flex justify-between items-end px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-start gap-3">
            <h2 className="heading-1 text-white">Blog.</h2>
            <span className="para-12 text-[var(--text-secondary)] mt-4">({BLOG_POSTS.length})</span>
          </div>
          <div className="hidden md:block">
            <Button label="All Articles" href="/blog" variant="outline" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {featured.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="flex justify-center md:hidden">
          <Button label="View All Articles" href="/blog" variant="outline" />
        </div>

      </div>
    </section>
  );
}
