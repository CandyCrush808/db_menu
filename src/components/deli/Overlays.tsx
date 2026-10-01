import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Minus,
  Plus,
  Search,
  Mic,
  Trash2,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  User,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { dishes, ratingsNote, restaurant } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";

const EASE = [0.22, 1, 0.36, 1] as const;

function Shade({ onClose }: { onClose: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="Close modal overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 size-full cursor-default bg-ink/50 backdrop-blur-sm"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* ORDER DRAWER                                                               */
/* -------------------------------------------------------------------------- */
export function OrderDrawer() {
  const { orderDish, setOrderDish, addToCart } = useDeli();
  const [qty, setQty] = useState(1);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && orderDish) setOrderDish(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [orderDish, setOrderDish]);

  return (
    <AnimatePresence>
      {orderDish && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Order dish">
          <Shade onClose={() => setOrderDish(null)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[520px] rounded-t-[28px] border-t border-border bg-card p-6 shadow-lift md:bottom-6 md:right-6 md:left-auto md:mx-0 md:rounded-[28px] md:border"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">{orderDish.category}</p>
                <h2 className="font-display text-lg font-bold text-ink mt-0.5">{orderDish.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOrderDish(null)}
                aria-label="Close order drawer"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink hover:bg-border/60 transition-colors"
              >
                <X className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <img
                src={orderDish.image}
                alt={orderDish.name}
                loading="lazy"
                width={160}
                height={160}
                className="size-20 rounded-2xl object-cover shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="font-display text-xl font-bold text-ink">
                  {inr(orderDish.price)}
                </span>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {orderDish.description}
                </p>
                {orderDish.jainAvailable && (
                  <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent uppercase">
                    Jain Available
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-border p-2 bg-secondary/30">
              <span className="text-xs font-medium text-muted-foreground px-3">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-10 items-center justify-center rounded-xl bg-card border border-border text-ink hover:bg-secondary transition-colors"
                >
                  <Minus className="size-4" strokeWidth={1.8} />
                </button>
                <span
                  className="font-display text-lg font-bold text-ink min-w-6 text-center"
                  aria-live="polite"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex size-10 items-center justify-center rounded-xl bg-card border border-border text-ink hover:bg-secondary transition-colors"
                >
                  <Plus className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(orderDish, qty);
                setQty(1);
                setOrderDish(null);
              }}
              className="mt-5 min-h-12 w-full rounded-xl bg-ink text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:opacity-90 shadow-soft"
            >
              ADD TO CART · {inr(orderDish.price * qty)}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* CART DRAWER                                                                */
/* -------------------------------------------------------------------------- */
export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartTotal,
    updateCartQty,
    removeFromCart,
    clearCart,
    getWhatsAppOrderUrl,
  } = useDeli();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen, setCartOpen]);

  const waUrl = getWhatsAppOrderUrl();

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your cart">
          <Shade onClose={() => setCartOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-card p-6 shadow-lift border-l border-border"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div>
                <p className="eyebrow">Order Selection</p>
                <h2 className="font-display text-xl font-bold text-ink mt-0.5">Your Cart</h2>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-destructive underline px-2"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink hover:bg-border/60 transition-colors"
                >
                  <X className="size-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4">
                    <Sparkles className="size-8" strokeWidth={1.4} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink">Your table is waiting</h3>
                  <p className="mt-2 text-xs text-muted-foreground max-w-[26ch]">
                    Browse our signature dishes and pick your favourites to place an order.
                  </p>
                  <a
                    href="#menu"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 inline-flex items-center rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-ink-foreground tracking-[0.08em] uppercase"
                  >
                    EXPLORE MENU
                  </a>
                </div>
              ) : (
                cart.map((line) => (
                  <div
                    key={line.dish.id}
                    className="flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card p-3 shadow-sm"
                  >
                    <img
                      src={line.dish.image}
                      alt={line.dish.name}
                      loading="lazy"
                      width={120}
                      height={120}
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">{line.dish.name}</p>
                      <p className="text-xs font-semibold text-accent mt-0.5">
                        {inr(line.dish.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQty(line.dish.id, line.qty - 1)}
                        aria-label={`Decrease ${line.dish.name} quantity`}
                        className="flex size-7 items-center justify-center rounded-md bg-card text-ink hover:bg-secondary"
                      >
                        <Minus className="size-3" strokeWidth={2} />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-ink">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(line.dish.id, line.qty + 1)}
                        aria-label={`Increase ${line.dish.name} quantity`}
                        className="flex size-7 items-center justify-center rounded-md bg-card text-ink hover:bg-secondary"
                      >
                        <Plus className="size-3" strokeWidth={2} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(line.dish.id)}
                      aria-label={`Remove ${line.dish.name} from cart`}
                      className="flex size-8 items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="size-4" strokeWidth={1.8} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout Actions */}
            {cart.length > 0 && (
              <div className="mt-5 border-t border-border/60 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-2xl font-extrabold text-ink">
                    {inr(cartTotal)}
                  </span>
                </div>

                {restaurant.orderUrl ? (
                  <a
                    href={restaurant.orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:opacity-90 shadow-soft"
                  >
                    PROCEED TO CHECKOUT
                    <ExternalLink className="size-4" strokeWidth={1.8} />
                  </a>
                ) : (
                  <div className="rounded-xl bg-secondary p-3 text-center border border-border/40">
                    <p className="text-xs text-muted-foreground">
                      Direct online checkout link will be available here soon.
                    </p>
                  </div>
                )}

                <div className="grid gap-2">
                  {restaurant.whatsapp && waUrl && (
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-veg/40 bg-veg/10 text-xs font-semibold tracking-[0.08em] text-veg uppercase transition-all hover:bg-veg hover:text-white"
                    >
                      <MessageCircle className="size-4" strokeWidth={1.8} />
                      ORDER VIA WHATSAPP
                    </a>
                  )}

                  {restaurant.phone && (
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card text-xs font-semibold tracking-[0.08em] text-ink uppercase transition-all hover:bg-secondary"
                    >
                      <Phone className="size-4" strokeWidth={1.8} />
                      CALL TO ORDER ({restaurant.phone})
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* DINE-IN RESERVATION MODAL (Requirement #13)                               */
/* -------------------------------------------------------------------------- */
export function ReservationModal() {
  const { reservationOpen, setReservationOpen } = useDeli();
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [jainReq, setJainReq] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && reservationOpen) setReservationOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [reservationOpen, setReservationOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const getWaReservationUrl = () => {
    if (!restaurant.whatsapp) return null;
    const msg = `Hello ${restaurant.name}, I would like to reserve a table:\n\n• Name: ${name}\n• Phone: ${phone}\n• Date: ${date}\n• Time: ${time}\n• Guests: ${guests}\n• Jain Food Request: ${jainReq ? "Yes" : "No"}${notes ? `\n• Notes: ${notes}` : ""}\n\nPlease confirm table availability. Thank you!`;
    return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <AnimatePresence>
      {reservationOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Table reservation"
        >
          <Shade onClose={() => setReservationOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-[500px] overflow-hidden rounded-[28px] bg-card p-6 md:p-8 shadow-lift border border-border"
          >
            <div className="flex items-start justify-between border-b border-border/50 pb-4">
              <div>
                <p className="eyebrow">Dine-In Booking</p>
                <h2 className="font-display text-2xl font-bold text-ink mt-0.5">Book a Table</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReservationOpen(false);
                  setSubmitted(false);
                }}
                aria-label="Close reservation modal"
                className="flex size-10 items-center justify-center rounded-full bg-secondary text-ink hover:bg-border/60 transition-colors"
              >
                <X className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            {submitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="size-16 rounded-full bg-veg/10 text-veg mx-auto flex items-center justify-center">
                  <CheckCircle2 className="size-8" strokeWidth={2} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">Request Submitted</h3>
                <p className="text-xs leading-relaxed text-muted-foreground max-w-[36ch] mx-auto">
                  Your table reservation request for {guests} guests on {date} at {time} is ready.
                  Please contact the restaurant to confirm live availability.
                </p>

                <div className="pt-2 grid gap-2.5">
                  {restaurant.phone && (
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:opacity-90"
                    >
                      <Phone className="size-4" strokeWidth={1.8} />
                      CALL RESTAURANT ({restaurant.phone})
                    </a>
                  )}

                  {restaurant.whatsapp && getWaReservationUrl() && (
                    <a
                      href={getWaReservationUrl()!}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-veg/40 bg-veg/10 text-xs font-semibold tracking-[0.08em] text-veg uppercase transition-all hover:bg-veg hover:text-white"
                    >
                      <MessageCircle className="size-4" strokeWidth={1.8} />
                      SEND VIA WHATSAPP
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-ink outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                      Time
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-ink outline-none focus:border-accent"
                    >
                      {[
                        "12:00",
                        "13:00",
                        "14:00",
                        "19:00",
                        "19:30",
                        "20:00",
                        "20:30",
                        "21:00",
                        "21:30",
                        "22:00",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-ink outline-none focus:border-accent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-ink outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-ink outline-none focus:border-accent"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="jainReq"
                    checked={jainReq}
                    onChange={(e) => setJainReq(e.target.checked)}
                    className="size-4 accent-accent rounded"
                  />
                  <label htmlFor="jainReq" className="text-xs text-ink cursor-pointer">
                    Request Jain preparation where available
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="High chair, quiet table, birthday request..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-xs text-ink outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 min-h-12 w-full rounded-xl bg-ink text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:opacity-90 shadow-soft"
                >
                  SUBMIT RESERVATION REQUEST
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* WATCH DISH PREVIEW MODAL (Requirement #15)                                 */
/* -------------------------------------------------------------------------- */
export function WatchDishModal() {
  const { watchDish, setWatchDish, setOrderDish } = useDeli();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && watchDish) setWatchDish(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [watchDish, setWatchDish]);

  return (
    <AnimatePresence>
      {watchDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${watchDish.name}`}
        >
          <Shade onClose={() => setWatchDish(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-[720px] overflow-hidden rounded-[28px] bg-ink shadow-lift border border-border/20"
          >
            <button
              type="button"
              onClick={() => setWatchDish(null)}
              aria-label="Close dish preview"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-ink/70 text-ink-foreground backdrop-blur-md hover:bg-ink transition-colors"
            >
              <X className="size-4" strokeWidth={1.8} />
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
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={watchDish.image}
                  alt={watchDish.name}
                  width={1024}
                  height={1024}
                  className="size-full object-cover opacity-90"
                />
                <div className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-bold tracking-widest text-ink-foreground uppercase backdrop-blur-md">
                  Dish Visual Preview
                </div>
              </div>
            )}

            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="eyebrow text-accent">{watchDish.category}</span>
                <h2 className="mt-1 font-display text-2xl font-bold text-ink-foreground">
                  {watchDish.name}
                </h2>
                <p className="mt-2 text-xs text-ink-foreground/70 max-w-[44ch]">
                  {watchDish.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-display text-2xl font-bold text-ink-foreground">
                  {inr(watchDish.price)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const target = watchDish;
                    setWatchDish(null);
                    setOrderDish(target);
                  }}
                  className="rounded-xl bg-accent px-5 py-3 text-xs font-bold tracking-[0.08em] text-accent-foreground uppercase transition-all hover:opacity-90 shadow-soft"
                >
                  ORDER THIS DISH
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* SEARCH OVERLAY (Requirement #16)                                           */
/* -------------------------------------------------------------------------- */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen, goTo, setOrderDish } = useDeli();
  const [q, setQ] = useState("");

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, setSearchOpen]);

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
          aria-label="Search menu dishes"
        >
          <Shade onClose={() => setSearchOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative mx-auto mt-16 mb-10 w-[min(720px,92vw)] rounded-[28px] border border-border bg-card p-6 shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <Search className="size-5 text-muted-foreground shrink-0" strokeWidth={1.8} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by dish name, ingredient, category..."
                aria-label="Search menu dishes"
                className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted-foreground/70"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  aria-label="Clear search input"
                  className="text-xs text-muted-foreground hover:text-ink px-2"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search overlay"
                className="flex size-9 items-center justify-center rounded-full bg-secondary text-ink hover:bg-border/60 transition-colors"
              >
                <X className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>{q ? `Matches for "${q}"` : "All Dishes"}</span>
              <span className="font-semibold text-ink">{results.length} found</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1">
              {results.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-card p-3 transition-colors hover:bg-secondary/60"
                >
                  <button
                    type="button"
                    onClick={() => {
                      goTo(dishes.findIndex((d) => d.id === dish.id));
                      setSearchOpen(false);
                      const el = document.getElementById("home");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex flex-1 items-center gap-3 text-left min-w-0"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      width={120}
                      height={120}
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-bold text-ink">{dish.name}</span>
                      <span className="block text-[11px] text-muted-foreground">
                        {dish.menuCategory} · {inr(dish.price)}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setOrderDish(dish);
                    }}
                    aria-label={`Order ${dish.name}`}
                    className="flex size-8 items-center justify-center rounded-full bg-ink text-ink-foreground shrink-0 hover:opacity-90"
                  >
                    <Plus className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              ))}

              {results.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-sm font-semibold text-ink">Nothing matched your craving</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try searching for “paneer”, “biryani”, “chaap” or “starter”.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-5 text-[11px] text-muted-foreground border-t border-border/40 pt-3">
              {ratingsNote}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* CRAVING ASSISTANT (Requirement #17)                                       */
/* -------------------------------------------------------------------------- */
const cravings: { label: string; match: (d: (typeof dishes)[number]) => boolean }[] = [
  {
    label: "Something spicy",
    match: (d) =>
      /spicy|masala|chilli|tikka/i.test(d.description + d.ingredients.join(" ") + d.tags.join(" ")),
  },
  { label: "Paneer dishes", match: (d) => /paneer/i.test(d.name + d.ingredients.join(" ")) },
  { label: "Best starters", match: (d) => d.menuCategory === "Starters" },
  { label: "Jain-friendly options", match: (d) => !!d.jainAvailable },
  { label: "Something under ₹250", match: (d) => d.price <= 250 },
];

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | null>("Something spicy");
  const { goTo, setOrderDish } = useDeli();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const activeCraving = cravings.find((c) => c.label === picked);
  const matches = picked && activeCraving ? dishes.filter(activeCraving.match) : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open the craving assistant"
        aria-expanded={open}
        className="fixed bottom-20 right-5 z-30 flex size-13 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lift transition-all hover:scale-105 active:scale-95 md:bottom-24 md:right-8"
      >
        <Sparkles className="size-5" strokeWidth={1.8} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-36 right-5 z-40 w-[min(340px,88vw)] rounded-[24px] border border-border bg-card p-5 shadow-lift md:bottom-28 md:right-8"
            role="dialog"
            aria-label="Craving assistant"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-accent">Deli Belly Assistant</p>
                <h2 className="font-display text-base font-bold text-ink mt-0.5">
                  What are you craving?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex size-7 items-center justify-center rounded-full bg-secondary text-ink hover:bg-border/60 transition-colors"
              >
                <X className="size-3.5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {cravings.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setPicked(c.label)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    picked === c.label
                      ? "border-transparent bg-ink text-ink-foreground shadow-sm"
                      : "border-border/60 bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-ink"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {picked && (
              <div className="mt-4 max-h-[200px] overflow-y-auto space-y-1.5 pr-1">
                {matches.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-xl border border-border/40 p-2 text-left transition-colors hover:bg-secondary/60"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        goTo(dishes.findIndex((x) => x.id === d.id));
                        setOpen(false);
                        const el = document.getElementById("home");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="min-w-0 flex-1 pr-2"
                    >
                      <span className="block truncate text-xs font-semibold text-ink">
                        {d.name}
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        {inr(d.price)}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setOrderDish(d);
                      }}
                      aria-label={`Order ${d.name}`}
                      className="rounded-lg bg-ink px-2.5 py-1 text-[10px] font-semibold text-ink-foreground uppercase"
                    >
                      Order
                    </button>
                  </div>
                ))}
                {matches.length === 0 && (
                  <p className="text-xs text-muted-foreground py-2 text-center">
                    No dishes fit this recommendation today.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
