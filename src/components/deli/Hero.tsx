import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, ShoppingCart } from "lucide-react";
import ambience from "@/assets/ambience-interior.jpg";
import { useDeli, inr } from "@/lib/deli-store";
import { useReducedMotionPref } from "@/lib/use-reduced-motion";
import { DishCarousel } from "./DishCarousel";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { activeDish, direction, setOrderDish, setWatchDish } = useDeli();
  const [tab, setTab] = useState<"overview" | "ingredients">("overview");
  const reduced = useReducedMotionPref();

  const slide = (d: number) => (reduced ? 0 : d * 60);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <img
        src={ambience}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-20 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-background/70" aria-hidden="true" />

      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 pb-8 pt-28 md:px-10 md:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Food image */}
          <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[540px]">
            <div className="absolute inset-0 rounded-full bg-card/50 blur-2xl" aria-hidden="true" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={activeDish.id}
                src={activeDish.image}
                alt={activeDish.name}
                width={1024}
                height={1024}
                initial={{ opacity: 0, x: slide(direction), scale: reduced ? 1 : 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: slide(-direction), scale: reduced ? 1 : 0.98 }}
                transition={{ duration: reduced ? 0.25 : 0.6, ease: EASE }}
                className="relative size-full rounded-full object-cover shadow-lift"
              />
            </AnimatePresence>
          </div>

          {/* Dish info */}
          <div className="flex flex-col items-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE }}
                className="w-full"
              >
                <p className="eyebrow">{activeDish.category}</p>
                <h1 className="mt-4">
                  <span className="dish-title-light block text-[clamp(2rem,6vw,4.25rem)] text-ink">
                    {activeDish.displayName[0]}
                  </span>
                  <span className="dish-title-bold block text-[clamp(2.25rem,7vw,5rem)] text-ink">
                    {activeDish.displayName[1]}
                  </span>
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="font-display text-2xl font-semibold text-ink">
                    {inr(activeDish.price)}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-accent">{activeDish.stars}</span>
                    {activeDish.ratingText}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeDish.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-[11px] tracking-[0.14em] ${
                        tag === "PURE VEG"
                          ? "bg-veg/10 text-veg"
                          : "border border-border bg-card text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating info card */}
            <div className="surface-card mt-8 w-full max-w-[460px] p-6 md:p-7">
              <div
                role="tablist"
                aria-label="Dish details"
                className="flex gap-1 rounded-xl bg-secondary p-1"
              >
                {(["overview", "ingredients"] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-lg py-2.5 text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      tab === t ? "bg-card text-ink shadow-soft" : "text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab + activeDish.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.4, ease: EASE }}
                  className="pt-6"
                >
                  {tab === "overview" ? (
                    <div>
                      <div className="flex items-end gap-4">
                        <span className="font-display text-5xl font-extrabold leading-none text-ink">
                          {activeDish.rating.toFixed(1)}
                        </span>
                        <span className="pb-1">
                          <span className="block text-accent">{activeDish.stars}</span>
                          <span className="text-xs text-muted-foreground">Customer rating</span>
                        </span>
                      </div>
                      <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                        {activeDish.description}
                      </p>
                      <p className="mt-4 text-xs tracking-[0.14em] text-veg uppercase">
                        Pure vegetarian
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs tracking-[0.14em] text-veg uppercase">Pure vegetarian</p>
                      <ul className="mt-4 space-y-2.5">
                        {activeDish.ingredients.map((ing) => (
                          <li
                            key={ing}
                            className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setOrderDish(activeDish)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-ink px-7 text-sm font-medium tracking-[0.06em] text-ink-foreground transition-opacity hover:opacity-90"
              >
                <ShoppingCart className="size-4" strokeWidth={1.6} />
                ORDER NOW
              </button>
              <button
                type="button"
                onClick={() => setWatchDish(activeDish)}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-medium tracking-[0.06em] text-ink transition-colors hover:bg-secondary"
              >
                <Play className="size-4" strokeWidth={1.6} />
                WATCH DISH
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <DishCarousel />
        </div>
      </div>
    </section>
  );
}
