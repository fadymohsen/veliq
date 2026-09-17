import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { BLOG_POSTS } from "@/lib/blog";
import { CAREERS } from "@/lib/careers";
import { CASE_STUDIES } from "@/lib/case-studies";

const BASE = "https://www.veliq.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date("2026-09-17"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/website-development-with-seo`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: new Date("2026-09-17"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date("2026-09-17"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/legal/privacy`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/terms`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/refund`, lastModified: new Date("2026-06-30"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/reviews`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/careers`, lastModified: new Date("2026-09-17"), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE}/case-studies`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/studio`, lastModified: new Date("2026-09-17"), changeFrequency: "monthly" as const, priority: 0.5 },
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

  const careerPages: MetadataRoute.Sitemap = CAREERS.map((c) => ({
    url: `${BASE}/careers/${c.slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/case-studies/${cs.slug}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...servicePages, ...blogPages, ...careerPages, ...caseStudyPages];
}
