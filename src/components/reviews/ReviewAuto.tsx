import { forwardRef } from "react";

export const AUTO_ASPECT = 1320 / 605;

export const ReviewAuto = forwardRef<HTMLDivElement, { width: number }>(function ReviewAuto(
  { width },
  ref,
) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-0 top-0 will-change-transform"
      style={{ width }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1320 605" className="review-auto-svg" role="img">
        <ellipse cx="660" cy="510" rx="470" ry="45" fill="oklch(0 0 0 / .16)" />
        <rect x="260" y="120" width="800" height="350" rx="150" fill="var(--color-veg)" />
        <path
          d="M310 180 Q660 65 1010 180 L960 245 Q660 170 360 245Z"
          fill="var(--color-foreground)"
        />
        <rect x="390" y="235" width="540" height="150" rx="70" fill="var(--color-secondary)" />
        <rect
          x="430"
          y="270"
          width="460"
          height="90"
          rx="45"
          fill="var(--color-foreground)"
          opacity=".16"
        />
        <path d="M260 285 Q155 305 125 365 Q110 395 145 410 L275 410Z" fill="var(--color-accent)" />
        <path
          d="M1060 285 Q1165 305 1195 365 Q1210 395 1175 410 L1045 410Z"
          fill="var(--color-accent)"
        />
        <circle cx="275" cy="405" r="34" fill="var(--color-foreground)" />
        <circle cx="1045" cy="405" r="34" fill="var(--color-foreground)" />
        <circle cx="275" cy="405" r="15" fill="var(--color-secondary)" />
        <circle cx="1045" cy="405" r="15" fill="var(--color-secondary)" />
        <path
          d="M520 470 Q660 540 800 470"
          fill="none"
          stroke="var(--color-foreground)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <circle cx="660" cy="300" r="45" fill="var(--color-accent)" />
        <path
          d="M630 300h60M660 270v60"
          stroke="var(--color-accent-foreground)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});
