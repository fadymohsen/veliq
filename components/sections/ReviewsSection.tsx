"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HOMEPAGE_REVIEWS } from "@/lib/reviews";
import ReviewCard from "@/components/ui/ReviewCard";

const AUTO_SWIPE_MS = 3000;
const RESUME_AFTER_MS = 5000;

export default function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<number | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HOMEPAGE_REVIEWS.length);
    }, AUTO_SWIPE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    return () => window.clearTimeout(resumeTimer.current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  }, [index]);

  function handleInteraction() {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }

  return (
    <section className="w-full bg-black section-padding">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="heading-1 text-white">Reviews.</h2>
          <p className="para-32 text-[var(--text-secondary)] max-w-2xl">
            5.0 rating from {HOMEPAGE_REVIEWS.length} reviews on Google.
          </p>
        </div>

        {/* Desktop — static 3x2 grid, all 6 shown */}
        <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4">
          {HOMEPAGE_REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        {/* Mobile — auto-advancing slider */}
        <div
          ref={trackRef}
          onTouchStart={handleInteraction}
          onPointerDown={handleInteraction}
          className="flex md:hidden gap-4 overflow-x-auto -mx-4 px-4 pb-1"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {HOMEPAGE_REVIEWS.map((review) => (
            <div key={review.name} className="shrink-0" style={{ width: "85%", scrollSnapAlign: "start" }}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* CTA — mobile only, desktop already shows all 6 */}
        <Link
          href="/reviews"
          className="btn-outline text-sm self-start md:hidden"
        >
          See More Reviews
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
