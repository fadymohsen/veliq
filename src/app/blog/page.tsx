import Link from "next/link";
import fs from "fs/promises";
import path from "path";

interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  bg: string;
}

async function getBlogs(): Promise<Blog[]> {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/data/blogs.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — VELIQ",
  description:
    "Insights, tips, and strategies on web development, marketing, SEO, and digital growth from the VELIQ team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-6xl">
            Insights &amp; Ideas
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 md:text-xl">
            Practical advice on building better products, growing your brand,
            and winning in the digital landscape.
          </p>
        </div>
      </section>

      {/* ── Featured Post ── */}
      <section className="pb-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 lg:grid-cols-2 items-center rounded-3xl border border-slate-200 overflow-hidden transition hover:shadow-xl"
          >
            <div className={`h-64 lg:h-full min-h-[320px] ${featured.bg}`} />
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
                  {featured.category}
                </span>
                <span className="text-slate-400">{featured.readTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl group-hover:text-primary transition leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                Read Article
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── All Posts ── */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold md:text-3xl mb-12">All Articles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg"
              >
                <div className={`h-48 ${blog.bg}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                    <span className="rounded-full bg-primary/10 text-primary px-3 py-1">
                      {blog.category}
                    </span>
                    <span className="text-slate-400">{blog.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold group-hover:text-primary transition leading-snug">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-slate-400">
                    {formatDate(blog.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
