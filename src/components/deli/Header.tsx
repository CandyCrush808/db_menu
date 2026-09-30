import { AnimatePresence, motion } from "motion/react";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { useDeli } from "@/lib/deli-store";
import { restaurant } from "@/data/dishes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
  { label: "Order Online", href: "#order" },
];

export function Header() {
  const { navOpen, setNavOpen, setSearchOpen, setCartOpen, cartCount } = useDeli();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#home" className="group flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-ink md:text-xl">
              {restaurant.name}
            </span>
            <span className="eyebrow mt-1">PURE VEG • PCMC</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search dishes"
              className="flex size-11 items-center justify-center rounded-full bg-card/80 text-ink shadow-soft backdrop-blur transition-colors hover:bg-card"
            >
              <Search className="size-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart, ${cartCount} items`}
              className="relative hidden size-11 items-center justify-center rounded-full bg-card/80 text-ink shadow-soft backdrop-blur transition-colors hover:bg-card md:flex"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation menu"
              className="flex size-11 items-center justify-center rounded-full bg-ink text-ink-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              <Menu className="size-[18px]" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink text-ink-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 py-5 md:px-10">
              <div className="flex items-start justify-between">
                <div className="flex flex-col leading-none">
                  <span className="font-display text-lg font-extrabold tracking-[-0.03em]">
                    {restaurant.name}
                  </span>
                  <span className="eyebrow mt-1 text-ink-foreground/50">PURE VEG • PCMC</span>
                </div>
                <button
                  type="button"
                  onClick={() => setNavOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex size-11 items-center justify-center rounded-full border border-ink-foreground/20 transition-colors hover:bg-ink-foreground/10"
                >
                  <X className="size-[18px]" strokeWidth={1.6} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-4xl font-light tracking-[-0.03em] transition-colors hover:text-accent md:text-6xl"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <p className="eyebrow text-ink-foreground/50">
                {restaurant.subtitle} • {restaurant.locality}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
