import Footer from "@/components/sections/Footer";
import ReviewCard from "@/components/ui/ReviewCard";
import { REVIEWS } from "@/lib/reviews";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Client Reviews — 5.0 Stars",
  description: `5.0 rating from ${REVIEWS.length} client reviews on Google. See what businesses in Egypt, Saudi Arabia, UAE, and the US say about working with VELIQ.`,
  alternates: { canonical: "https://www.veliq.co/reviews" },
  openGraph: {
    title: "Client Reviews — 5.0 Stars | VELIQ",
    description: `5.0 rating from ${REVIEWS.length} client reviews on Google. See what businesses across Egypt, Saudi Arabia, UAE, and the US say about VELIQ.`,
    url: "https://www.veliq.co/reviews",
    images: [{ url: "https://www.veliq.co/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Client Reviews — 5.0 Stars | VELIQ",
    description: `5.0 rating from ${REVIEWS.length} Google reviews. See what our clients say.`,
    images: ["https://www.veliq.co/og-image.png"],
  },
};

export default function ReviewsPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.veliq.co" },
        { name: "Reviews", url: "https://www.veliq.co/reviews" },
      ])} />
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="heading-1 text-white">Reviews.</h1>
          <p className="para-32 text-[var(--text-secondary)] max-w-2xl">
            5.0 rating from {REVIEWS.length} reviews on Google.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} clampText={false} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
