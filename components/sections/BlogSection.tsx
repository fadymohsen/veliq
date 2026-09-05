"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { BLOG_POSTS } from "@/lib/blog";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ACCENT_MAP: Record<string, string> = {
  "Web Development":    "#6366f1",
  "SEO":                "#a855f7",
  "Mobile Development": "#f97316",
  "Data & Analytics":   "#06b6d4",
  "Brand Strategy":     "#f59e0b",
  "Digital Marketing":  "#22c55e",
};

function BlogCard({ post, index }: { post: (typeof BLOG_POSTS)[number]; index: number }) {
  const accent = ACCENT_MAP[post.category] ?? "#6366f1";
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
          style={{ aspectRatio: "1.6" }}
        >
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full uppercase"
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: accent,
              backgroundColor: `${accent}18`,
              border: `1px solid ${accent}40`,
              backdropFilter: "blur(6px)",
            }}
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
