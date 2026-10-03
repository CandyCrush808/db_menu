import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { dishes } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";
import { useReducedMotionPref } from "@/lib/use-reduced-motion";

export function DishCarousel() {
  const { activeIndex, goTo, next, prev } = useDeli();
  const reduced = useReducedMotionPref();
  const dragStart = useRef<number | null>(null);

  const relativePosition = (index: number) => {
    const raw = (index - activeIndex + dishes.length) % dishes.length;
    return raw > dishes.length / 2 ? raw - dishes.length : raw;
  };

  const slots = {
    "-3": { left: "-8%", scale: 0.62, opacity: 0, zIndex: 0 },
    "-2": { left: "12%", scale: 0.78, opacity: 0.58, zIndex: 1 },
    "-1": { left: "31%", scale: 0.9, opacity: 0.78, zIndex: 2 },
    "0": { left: "50%", scale: 1.1, opacity: 1, zIndex: 4 },
    "1": { left: "69%", scale: 0.9, opacity: 0.78, zIndex: 2 },
    "2": { left: "88%", scale: 0.78, opacity: 0.58, zIndex: 1 },
    "3": { left: "108%", scale: 0.62, opacity: 0, zIndex: 0 },
  } as const;

  return (
    <div
      className="w-full select-none"
      onPointerDown={(e) => {
        dragStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        if (Math.abs(dx) > 40) {
          if (dx < 0) next();
          else prev();
        }
        dragStart.current = null;
      }}
      onPointerLeave={() => {
        dragStart.current = null;
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous dish"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-soft transition-all hover:bg-card hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:size-12"
        >
          <ChevronLeft className="size-5" strokeWidth={1.8} />
        </button>

        <div
          role="tablist"
          aria-label="Featured signature dishes"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              next();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              prev();
            }
          }}
          className="relative h-[108px] min-w-0 flex-1 overflow-hidden rounded-2xl py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:h-[132px]"
        >
          {dishes.map((dish, i) => {
            const active = i === activeIndex;
            const position = relativePosition(i);
            const slot = slots[String(Math.max(-3, Math.min(3, position))) as keyof typeof slots];
            return (
              <motion.button
                key={dish.id}
                data-index={i}
                role="tab"
                aria-selected={active}
                aria-label={`Show ${dish.name}, price ${inr(dish.price)}`}
                onClick={() => goTo(i)}
                initial={false}
                animate={{
                  left: slot.left,
                  scale: reduced ? (active ? 1 : 0.9) : slot.scale,
                  opacity: reduced ? (active ? 1 : 0.62) : slot.opacity,
                }}
                transition={{ duration: reduced ? 0.16 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: slot.zIndex }}
                className={`absolute top-1/2 flex h-[92px] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border px-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[116px] sm:w-[22%] sm:gap-2 sm:px-3 ${
                  active
                    ? "border-transparent bg-card text-ink shadow-lift ring-2 ring-accent/30"
                    : "border-border/60 bg-card/75 text-ink hover:border-border hover:bg-card"
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={112}
                  height={112}
                  className={`rounded-full object-cover shadow-sm ${active ? "size-14 sm:size-16" : "size-10 sm:size-12"}`}
                />
                <span className="min-w-0 max-w-full">
                  <span
                    className={`block truncate font-semibold leading-snug ${active ? "text-[11px] sm:text-[13px]" : "text-[9px] sm:text-[11px]"}`}
                  >
                    {dish.name}
                  </span>
                  <span className="block text-[10px] font-medium text-muted-foreground sm:text-[11px]">
                    {inr(dish.price)}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next dish"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-soft transition-all hover:bg-card hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:size-12"
        >
          <ChevronRight className="size-5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
