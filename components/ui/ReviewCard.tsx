import type { Review } from "@/lib/reviews";

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#FBBC05" : "#3a3a3a"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review, clampText = true }: { review: Review; clampText?: boolean }) {
  return (
    <div
      className="flex flex-col gap-3 rounded-[16px] p-5"
      style={{ height: "100%", backgroundColor: "rgb(14,14,14)", border: "1px solid rgb(28,28,28)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          {review.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.avatar}
              alt={review.name}
              className="shrink-0 rounded-full object-cover"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <span
              className="flex shrink-0 items-center justify-center rounded-full text-white font-semibold"
              style={{ width: 40, height: 40, backgroundColor: review.avatarColor, fontSize: 16 }}
            >
              {review.initial}
            </span>
          )}
          <div className="flex flex-col min-w-0">
            <span className="truncate text-white" style={{ fontSize: 14, fontWeight: 600 }}>
              {review.name}
            </span>
            <span className="truncate" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
              {review.subtitle}
            </span>
          </div>
        </div>
        <GoogleG />
      </div>

      <div className="flex items-center gap-2">
        <Stars rating={review.rating} />
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{review.date}</span>
      </div>

      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.75)",
          ...(clampText
            ? { display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }
            : {}),
        }}
      >
        {review.text}
      </p>
    </div>
  );
}
