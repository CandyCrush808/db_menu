import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dishes } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";
import { useReducedMotionPref } from "@/lib/use-reduced-motion";

const AUTOPLAY_MS = 6000;
const RESUME_MS = 10000;

export function DishCarousel() {
  const { activeIndex, goTo, next, prev } = useDeli();
  const reduced = useReducedMotionPref();
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  // Autoplay interval
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  // Scroll active dish into center view
  useEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, reduced]);

  const pauseTemporary = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_MS);
  };

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={pauseTemporary}
      onPointerDown={(e) => {
        pauseTemporary();
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
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            pauseTemporary();
            prev();
          }}
          aria-label="Previous dish"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-soft transition-all hover:bg-card hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex"
        >
          <ChevronLeft className="size-5" strokeWidth={1.8} />
        </button>

        <div
          ref={trackRef}
          role="tablist"
          aria-label="Featured signature dishes"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              pauseTemporary();
              next();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              pauseTemporary();
              prev();
            }
          }}
          className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dishes.map((dish, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={dish.id}
                data-index={i}
                role="tab"
                aria-selected={active}
                aria-label={`Show ${dish.name}, price ${inr(dish.price)}`}
                onClick={() => {
                  pauseTemporary();
                  goTo(i);
                }}
                className={`flex min-w-[175px] snap-center items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? "scale-[1.03] border-transparent bg-ink text-ink-foreground shadow-lift ring-2 ring-accent/30"
                    : "border-border/60 bg-card/80 text-ink hover:border-border hover:bg-card"
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={112}
                  height={112}
                  className="size-12 shrink-0 rounded-full object-cover shadow-sm"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold leading-snug">
                    {dish.name}
                  </span>
                  <span
                    className={`block text-[11px] font-medium ${
                      active ? "text-ink-foreground/75" : "text-muted-foreground"
                    }`}
                  >
                    {inr(dish.price)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            pauseTemporary();
            next();
          }}
          aria-label="Next dish"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-ink shadow-soft transition-all hover:bg-card hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex"
        >
          <ChevronRight className="size-5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
