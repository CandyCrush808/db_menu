import { forwardRef } from "react";
import { cardTilt, type Review } from "@/data/reviews";
function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="review-stars-empty">{"★".repeat(5 - rating)}</span>
    </span>
  );
}
type Props = { review: Review; index: number; total: number };
export const ReviewCard = forwardRef<HTMLDivElement, Props>(function ReviewCard(
  { review, index, total },
  ref,
) {
  const initials = review.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    meta = [review.dish, review.location, review.date].filter(Boolean).join(" · ");
  return (
    <div ref={ref} className="review-card-shell will-change-transform">
      <article
        className="review-card"
        style={{ "--tilt": `${cardTilt(index)}deg` } as React.CSSProperties}
      >
        <div className="review-card-tape" />
        <p className="review-chapter">
          Stop {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} —{" "}
          {review.chapter}
        </p>
        <div className="review-photo" aria-hidden={!review.image}>
          {review.image ? (
            <img
              src={review.image}
              alt={`Photo of ${review.name}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <Stars rating={review.rating} />
        <blockquote className="review-quote">“{review.review}”</blockquote>
        <p className="review-name">— {review.name}</p>
        <p className="review-meta">{meta}</p>
        {review.isPlaceholder && <p className="review-placeholder">Placeholder review</p>}
      </article>
    </div>
  );
});
