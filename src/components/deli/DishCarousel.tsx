import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dishes } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";
import { useReducedMotionPref } from "@/lib/use-reduced-motion";

const AUTOPLAY_MS = 6000;
const RESUME_MS = 12000;

export function DishCarousel() {
  const { activeIndex, goTo, next, prev } = useDeli();
  const reduced = useReducedMotionPref();
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    const el = trackRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, reduced]);

  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_MS);
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={pause}
      onPointerDown={(e) => {
        pause();
        dragStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const dx = e.clientX - dragStart.current;
        if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
        dragStart.current = null;
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            pause();
            prev();
          }}
          aria-label="Previous dish"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-ink shadow-soft transition-colors hover:bg-secondary md:flex"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        <div
          ref={trackRef}
          role="tablist"
          aria-label="Featured dishes"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              pause();
              next();
            }
            if (e.key === "ArrowLeft") {
              pause();
              prev();
            }
          }}
          className="flex flex-1 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dishes.map((dish, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={dish.id}
                data-index={i}
                role="tab"
                aria-selected={active}
                aria-label={`Show ${dish.name}`}
                onClick={() => {
                  pause();
                  goTo(i);
                }}
                className={`flex min-w-[168px] snap-center items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-500 ${
                  active
                    ? "scale-[1.04] border-transparent bg-ink text-ink-foreground shadow-lift"
                    : "border-border bg-card/70 text-ink hover:bg-card"
                }`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={112}
                  height={112}
                  className="size-12 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium leading-tight">
                    {dish.name}
                  </span>
                  <span
                    className={`block text-[11px] ${active ? "text-ink-foreground/60" : "text-muted-foreground"}`}
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
            pause();
            next();
          }}
          aria-label="Next dish"
          className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-ink shadow-soft transition-colors hover:bg-secondary md:flex"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
