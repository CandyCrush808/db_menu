import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, ShoppingCart, Leaf } from "lucide-react";
import ambience from "@/assets/ambience-interior.jpg";
import { useDeli, inr } from "@/lib/deli-store";
import { useReducedMotionPref } from "@/lib/use-reduced-motion";
import { DishCarousel } from "./DishCarousel";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { activeDish, direction, setOrderDish, setWatchDish } = useDeli();
  const [tab, setTab] = useState<"overview" | "ingredients">("overview");
  const reduced = useReducedMotionPref();

  const slide = (d: number) => (reduced ? 0 : d * 50);

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={ambience}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-20 size-full object-cover opacity-20"
      />
      <div
        className="absolute inset-0 -z-10 bg-background/75 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pt-36">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Circular Organic Food Image */}
          <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[520px]">
            <div
              className="absolute inset-0 rounded-full bg-accent/20 blur-3xl"
              aria-hidden="true"
            />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={activeDish.id}
                src={activeDish.image}
                alt={activeDish.name}
                width={1024}
                height={1024}
                initial={{ opacity: 0, x: slide(direction), scale: reduced ? 1 : 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: slide(-direction), scale: reduced ? 1 : 0.98 }}
                transition={{ duration: reduced ? 0.2 : 0.5, ease: EASE }}
                className="relative size-full rounded-full object-cover shadow-lift"
              />
            </AnimatePresence>
          </div>

          {/* Dish Information */}
          <div className="flex flex-col items-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE }}
                className="w-full"
              >
                <div className="flex items-center gap-2">
                  <span className="eyebrow">{activeDish.category}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-veg/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-veg uppercase">
                    <Leaf className="size-3" strokeWidth={2} />
                    Pure Veg
                  </span>
                </div>

                <h1 className="mt-3">
                  <span className="dish-title-light block text-[clamp(2.25rem,5.5vw,4.25rem)] text-ink">
                    {activeDish.displayName[0]}
                  </span>
                  <span className="dish-title-bold block text-[clamp(2.5rem,6.5vw,4.75rem)] text-ink">
                    {activeDish.displayName[1]}
                  </span>
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {inr(activeDish.price)}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-accent">{activeDish.stars}</span>
                    <span className="font-semibold text-ink">{activeDish.ratingText}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activeDish.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.12em] uppercase ${
                        tag === "PURE VEG"
                          ? "bg-veg/10 text-veg"
                          : "border border-border/70 bg-card/80 text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {activeDish.jainAvailable && (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-accent uppercase">
                      Jain Available
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Overview / Ingredients Card */}
            <div className="surface-card mt-7 w-full max-w-[480px] p-6">
              <div
                role="tablist"
                aria-label="Dish description details"
                className="flex gap-1 rounded-xl bg-secondary p-1"
              >
                {(["overview", "ingredients"] as const).map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-lg py-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-all ${
                      tab === t
                        ? "bg-card text-ink shadow-soft"
                        : "text-muted-foreground hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab + activeDish.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.35, ease: EASE }}
                  className="pt-5"
                >
                  {tab === "overview" ? (
                    <div>
                      <div className="flex items-end gap-3">
                        <span className="font-display text-4xl font-extrabold leading-none text-ink">
                          {activeDish.rating.toFixed(1)}
                        </span>
                        <div className="pb-0.5">
                          <span className="block text-accent leading-none">{activeDish.stars}</span>
                          <span className="text-[11px] text-muted-foreground">Guest rating</span>
                        </div>
                      </div>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                        {activeDish.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.14em] text-veg uppercase">
                        Key Ingredients & Preparation
                      </p>
                      <ul className="mt-3 space-y-2">
                        {activeDish.ingredients.map((ing) => (
                          <li
                            key={ing}
                            className="flex items-start gap-2.5 text-[14px] leading-snug text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOrderDish(activeDish)}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-ink px-7 text-sm font-semibold tracking-[0.06em] text-ink-foreground transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-soft"
              >
                <ShoppingCart className="size-4" strokeWidth={1.8} />
                ORDER NOW
              </button>
              <button
                type="button"
                onClick={() => setWatchDish(activeDish)}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-border bg-card/90 px-7 text-sm font-semibold tracking-[0.06em] text-ink transition-all hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] shadow-soft"
              >
                <Play className="size-4 text-accent" strokeWidth={1.8} />
                WATCH DISH
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <DishCarousel />
        </div>
      </div>
    </section>
  );
}
