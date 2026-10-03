import { Home, UtensilsCrossed, Calendar, ShoppingBag } from "lucide-react";
import { useDeli } from "@/lib/deli-store";

export function BottomNav() {
  const { cartCount, setCartOpen, setReservationOpen } = useDeli();

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium tracking-[0.06em] text-muted-foreground transition-colors hover:text-ink active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/95 backdrop-blur-md md:hidden shadow-lift"
    >
      <div className="mx-auto flex max-w-[600px] items-center justify-around">
        <a href="#home" className={itemClass}>
          <Home className="size-5" strokeWidth={1.6} />
          <span>Home</span>
        </a>
        <a href="#menu" className={itemClass}>
          <UtensilsCrossed className="size-5" strokeWidth={1.6} />
          <span>Menu</span>
        </a>
        <button type="button" onClick={() => setReservationOpen(true)} className={itemClass}>
          <Calendar className="size-5" strokeWidth={1.6} />
          <span>Reserve</span>
        </button>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className={`${itemClass} relative`}
          aria-label={`Cart, ${cartCount} items`}
        >
          <ShoppingBag className="size-5" strokeWidth={1.6} />
          {cartCount > 0 && (
            <span className="absolute right-3 top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-sm">
              {cartCount}
            </span>
          )}
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
}
