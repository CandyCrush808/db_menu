import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function ChaiGlass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M10 14h22l-3 26a5 5 0 0 1-5 4.5H18A5 5 0 0 1 13 40z"
        fill="var(--accent)"
        opacity=".9"
      />
      <path
        d="M32 18c5 0 7 2.5 7 6s-3.5 6.5-8 6.5"
        fill="none"
        stroke="var(--veg)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 22h15l-1.2 10.5"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 14c0-3 2-4 2-6.5"
        fill="none"
        stroke="var(--veg)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Chili({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M14 12c1 14 6 24 18 26 6 1 10-2 9-5-6 1-12-2-14-10-1.5-6-1-11-1-11z"
        fill="var(--accent)"
      />
      <path
        d="M13 6c2.5 0 4.5 2 4.5 4.5S15.5 15 13 15s-3-2.5-3-4.5S10.5 6 13 6z"
        fill="var(--veg)"
      />
      <path
        d="M16 10c4 0 7 1 9 3"
        fill="none"
        stroke="var(--veg)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 6C13 10 8 20 10 34c14 2 24-3 28-14-4-8-8-12-14-14z"
        fill="var(--veg)"
        opacity=".85"
      />
      <path
        d="M14 30C18 22 24 16 32 12"
        fill="none"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".7"
      />
    </svg>
  );
}

export function ReviewHero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".review-hero-reveal", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.to(".review-hero-float", {
        y: -10,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
      gsap.to(".review-scroll-line", {
        scaleY: 0.25,
        transformOrigin: "top",
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="review-hero">
      <span className="review-hero-reveal eyebrow">Deli Belly · Customer Stories</span>
      <h1 className="review-hero-reveal review-display-xl">DELI BELLY</h1>
      <p className="review-hero-reveal review-display-sub">
        REAL PEOPLE. <span className="text-accent">REAL REVIEWS.</span>
      </p>
      <p className="review-hero-reveal review-display-lg">
        EVERY BITE
        <br />
        HAS A STORY.
      </p>
      <p className="review-hero-reveal review-lede">
        From our kitchen to your table, these are the stories our customers brought back to us.
      </p>
      <div className="review-hero-reveal review-scroll">
        <span>SCROLL TO START THE JOURNEY</span>
        <span className="review-scroll-track">
          <span className="review-scroll-line" />
        </span>
        <em>journey</em>
      </div>
      <ChaiGlass className="review-hero-float review-hero-accent review-hero-accent-1" />
      <Chili className="review-hero-float review-hero-accent review-hero-accent-2" />
      <Leaf className="review-hero-float review-hero-accent review-hero-accent-3" />
    </section>
  );
}
