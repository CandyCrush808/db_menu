import { Home, UtensilsCrossed, BadgePercent, ShoppingBag, User } from "lucide-react";
import { useDeli } from "@/lib/deli-store";

export function BottomNav() {
  const { cartCount, setCartOpen, setNavOpen } = useDeli();

  const item = "flex flex-1 flex-col items-center gap-1 py-3 text-[10px] tracking-[0.08em]";

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden"
    >
      <div className="mx-auto flex max-w-[600px]">
        <a href="#home" className={`${item} text-ink`}>
          <Home className="size-5" strokeWidth={1.5} />
          Home
        </a>
        <a href="#menu" className={`${item} text-muted-foreground`}>
          <UtensilsCrossed className="size-5" strokeWidth={1.5} />
          Menu
        </a>
        <a href="#order" className={`${item} text-muted-foreground`}>
          <BadgePercent className="size-5" strokeWidth={1.5} />
          Offers
        </a>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className={`${item} relative text-muted-foreground`}
        >
          <ShoppingBag className="size-5" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute right-1/4 top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
              {cartCount}
            </span>
          )}
          Cart
        </button>
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          className={`${item} text-muted-foreground`}
        >
          <User className="size-5" strokeWidth={1.5} />
          Account
        </button>
      </div>
    </nav>
  );
}
