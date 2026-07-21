import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";

const BASE = "https://veliq.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date("2026-07-21"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/website-development-with-seo`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: new Date("2026-07-21"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date("2026-07-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date("2026-07-21"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/legal/privacy`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/terms`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/refund`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...servicePages, ...blogPages];
}
