import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, Search, Mic } from "lucide-react";
import { dishes, ratingsNote } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";

const EASE = [0.22, 1, 0.36, 1] as const;

function Shade({ onClose }: { onClose: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="Close"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 size-full cursor-default bg-ink/45 backdrop-blur-sm"
    />
  );
}

export function OrderDrawer() {
  const { orderDish, setOrderDish, addToCart } = useDeli();
  const [qty, setQty] = useState(1);

  return (
    <AnimatePresence>
      {orderDish && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Order dish">
          <Shade onClose={() => setOrderDish(null)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[520px] rounded-t-[28px] bg-card p-6 shadow-lift md:bottom-6 md:right-6 md:left-auto md:mx-0 md:rounded-[28px]"
          >
            <div className="flex items-start justify-between">
              <p className="eyebrow">Order</p>
              <button
                type="button"
                onClick={() => setOrderDish(null)}
                aria-label="Close order drawer"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink"
              >
                <X className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <img
                src={orderDish.image}
                alt={orderDish.name}
                loading="lazy"
                width={160}
                height={160}
                className="size-20 rounded-2xl object-cover"
              />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">{orderDish.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{inr(orderDish.price)}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-border p-2">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex size-11 items-center justify-center rounded-lg bg-secondary text-ink"
              >
                <Minus className="size-4" strokeWidth={1.6} />
              </button>
              <span className="font-display text-lg font-semibold text-ink" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex size-11 items-center justify-center rounded-lg bg-secondary text-ink"
              >
                <Plus className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(orderDish, qty);
                setQty(1);
                setOrderDish(null);
              }}
              className="mt-5 min-h-12 w-full rounded-xl bg-ink text-sm font-medium tracking-[0.08em] text-ink-foreground transition-opacity hover:opacity-90"
            >
              ADD TO CART · {inr(orderDish.price * qty)}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, cartTotal } = useDeli();

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your cart">
          <Shade onClose={() => setCartOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-card p-6 shadow-lift"
          >
            <div className="flex items-start justify-between">
              <p className="eyebrow">Your cart</p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink"
              >
                <X className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {cart.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing here yet. Pick a dish and tap Order Now.
                </p>
              )}
              {cart.map((line) => (
                <div key={line.dish.id} className="flex items-center gap-3">
                  <img
                    src={line.dish.image}
                    alt={line.dish.name}
                    loading="lazy"
                    width={120}
                    height={120}
                    className="size-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{line.dish.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {line.qty} × {inr(line.dish.price)}
                    </p>
                  </div>
                  <span className="text-sm text-ink">{inr(line.qty * line.dish.price)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Total</span>
                <span className="font-display text-xl font-bold text-ink">{inr(cartTotal)}</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Online checkout is not connected yet — the restaurant's ordering link goes here.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function WatchDishModal() {
  const { watchDish, setWatchDish } = useDeli();

  return (
    <AnimatePresence>
      {watchDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Watch ${watchDish.name}`}
        >
          <Shade onClose={() => setWatchDish(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-[720px] overflow-hidden rounded-[28px] bg-ink shadow-lift"
          >
            <button
              type="button"
              onClick={() => setWatchDish(null)}
              aria-label="Close dish view"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-ink/60 text-ink-foreground backdrop-blur"
            >
              <X className="size-4" strokeWidth={1.6} />
            </button>
            {watchDish.video ? (
              <video
                src={watchDish.video}
                poster={watchDish.image}
                muted
                playsInline
                controls
                autoPlay
                className="aspect-video w-full object-cover"
              />
            ) : (
              <img
                src={watchDish.image}
                alt={watchDish.name}
                width={1024}
                height={1024}
                className="aspect-video w-full object-cover"
              />
            )}
            <div className="p-6">
              <p className="eyebrow text-ink-foreground/50">{watchDish.category}</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink-foreground">
                {watchDish.name}
              </h2>
              <p className="mt-2 text-sm text-ink-foreground/60">{watchDish.description}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, goTo, setOrderDish } = useDeli();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return dishes;
    return dishes.filter((d) =>
      [d.name, d.category, d.menuCategory, d.description, ...d.tags, ...d.ingredients]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [q]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search dishes"
        >
          <Shade onClose={() => setSearchOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative mx-auto mt-20 mb-10 w-[min(720px,92vw)] rounded-[28px] bg-card p-6 shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Search className="size-5 text-muted-foreground" strokeWidth={1.6} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search your favourite dish..."
                aria-label="Search your favourite dish"
                className="w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink"
              >
                <X className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {results.map((dish) => (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => {
                    goTo(dishes.findIndex((d) => d.id === dish.id));
                    setSearchOpen(false);
                    setQ("");
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-border p-3 text-left transition-colors hover:bg-secondary"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    width={120}
                    height={120}
                    className="size-12 rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{dish.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {dish.menuCategory} · {inr(dish.price)}
                    </span>
                  </span>
                </button>
              ))}
              {results.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No dishes match that. Try “paneer”, “biryani” or “punjabi”.
                </p>
              )}
            </div>
            <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">{ratingsNote}</p>
            <button
              type="button"
              onClick={() => {
                const first = results[0];
                if (first) setOrderDish(first);
              }}
              className="sr-only"
            >
              Order first result
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const cravings: { label: string; match: (d: (typeof dishes)[number]) => boolean }[] = [
  { label: "Something spicy", match: (d) => /spicy|masala|chilli|tikka/i.test(d.description + d.ingredients.join(" ")) },
  { label: "Paneer dishes", match: (d) => /paneer/i.test(d.name + d.ingredients.join(" ")) },
  { label: "Best starters", match: (d) => d.menuCategory === "Starters" },
  { label: "Jain-friendly options", match: (d) => /paneer|curd/i.test(d.ingredients.join(" ")) },
  { label: "Something under ₹250", match: (d) => d.price < 250 },
];

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const { goTo } = useDeli();

  const matches = picked ? dishes.filter(cravings.find((c) => c.label === picked)!.match) : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open the craving assistant"
        aria-expanded={open}
        className="fixed bottom-24 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lift transition-transform hover:scale-105 md:bottom-28"
      >
        <Mic className="size-5" strokeWidth={1.6} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-44 right-5 z-40 w-[min(320px,88vw)] rounded-[24px] bg-card p-5 shadow-lift md:bottom-28"
            role="dialog"
            aria-label="Craving assistant"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-display text-lg font-bold text-ink">What are you craving?</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex size-8 items-center justify-center rounded-full bg-secondary text-ink"
              >
                <X className="size-3.5" strokeWidth={1.6} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {cravings.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setPicked(c.label)}
                  className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                    picked === c.label
                      ? "border-transparent bg-ink text-ink-foreground"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {picked && (
              <ul className="mt-4 space-y-1.5">
                {matches.map((d) => (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => {
                        goTo(dishes.findIndex((x) => x.id === d.id));
                        setOpen(false);
                      }}
                      className="w-full rounded-lg px-2 py-2 text-left text-sm text-ink transition-colors hover:bg-secondary"
                    >
                      {d.name} · {inr(d.price)}
                    </button>
                  </li>
                ))}
                {matches.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    Nothing on today's list fits that.
                  </li>
                )}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
