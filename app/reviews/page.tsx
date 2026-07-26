import Footer from "@/components/sections/Footer";
import ReviewCard from "@/components/ui/ReviewCard";
import { REVIEWS } from "@/lib/reviews";

export const metadata = {
  title: "Reviews — VELIQ",
  description: "5.0 rating from 6 client reviews on Google.",
};

export default function ReviewsPage() {
  return (
    <main className="bg-black min-h-screen pt-16">
      <section className="section-padding max-w-[1200px] mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h1 className="heading-1 text-white">Reviews.</h1>
          <p className="para-32 text-[var(--text-secondary)] max-w-2xl">
            5.0 rating from 6 reviews on Google.
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
