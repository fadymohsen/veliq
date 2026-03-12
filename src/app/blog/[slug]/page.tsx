import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  bg: string;
  content: string[];
}

async function getBlogs(): Promise<Blog[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/blogs.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Post Not Found" };
  return {
    title: `${blog.title} — VELIQ Blog`,
    description: blog.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  const related = blogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div className={`absolute inset-0 -z-10 ${blog.bg} opacity-[0.07]`} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition mb-8"
          >
            &larr; All Articles
          </Link>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
              {blog.category}
            </span>
            <span className="text-slate-400">{blog.readTime}</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
            {blog.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
            <span>{blog.author}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{formatDate(blog.date)}</span>
          </div>
        </div>
      </section>

      {/* ── Cover ── */}
      <div className="mx-auto max-w-5xl px-6 -mt-4 mb-16">
        <div className={`h-64 md:h-96 rounded-2xl ${blog.bg}`} />
      </div>

      {/* ── Content ── */}
      <article className="pb-24 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          {blog.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-12 mb-4 text-2xl font-bold text-slate-900"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="mt-4 text-lg text-slate-600 leading-relaxed"
              >
                {block}
              </p>
            );
          })}
        </div>
      </article>

      {/* ── Share + CTA ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Enjoyed this article?
          </p>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">
            Let&apos;s Talk About Your Project
          </h2>
          <p className="mt-3 text-slate-600">
            If this resonated with you, imagine what we could build together.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold md:text-3xl mb-12">
              More Articles
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blog/${b.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 transition hover:shadow-lg"
                >
                  <div className={`h-48 ${b.bg}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                      <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
                        {b.category}
                      </span>
                      <span className="text-slate-400">{b.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold group-hover:text-primary transition leading-snug">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{b.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
