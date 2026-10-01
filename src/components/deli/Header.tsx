import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Menu, X, ShoppingBag, Calendar } from "lucide-react";
import { useDeli } from "@/lib/deli-store";
import { restaurant } from "@/data/dishes";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#contact" },
];

export function Header() {
  const { navOpen, setNavOpen, setSearchOpen, setCartOpen, setReservationOpen, cartCount } =
    useDeli();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Escape key to close navigation drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navOpen) {
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navOpen, setNavOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-background/85 py-3 shadow-soft backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            className="group flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
          >
            <span className="font-display text-lg font-extrabold tracking-[-0.03em] text-ink md:text-xl">
              {restaurant.name}
            </span>
            <span className="eyebrow mt-1 text-[10px]">PURE VEG • PCMC</span>
          </a>

          {/* Desktop Navigation Anchors */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium tracking-[0.1em] text-accent uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="size-3.5" strokeWidth={1.8} />
              Book Table
            </button>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search dishes"
              className="flex size-11 items-center justify-center rounded-full border border-border/50 bg-card/90 text-ink shadow-soft backdrop-blur-sm transition-all hover:bg-card hover:scale-105 active:scale-95"
            >
              <Search className="size-[18px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart with ${cartCount} items`}
              className="relative flex size-11 items-center justify-center rounded-full border border-border/50 bg-card/90 text-ink shadow-soft backdrop-blur-sm transition-all hover:bg-card hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={navOpen}
              className="flex size-11 items-center justify-center rounded-full bg-ink text-ink-foreground shadow-soft transition-all hover:opacity-90 hover:scale-105 active:scale-95 lg:hidden"
            >
              <Menu className="size-[18px]" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile / Drawer Nav */}
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
            aria-label="Navigation Menu"
          >
            <div className="mx-auto flex h-full max-w-[1400px] flex-col px-6 py-6 md:px-10">
              <div className="flex items-start justify-between">
                <div className="flex flex-col leading-none">
                  <span className="font-display text-xl font-extrabold tracking-[-0.03em]">
                    {restaurant.name}
                  </span>
                  <span className="eyebrow mt-1 text-[10px] text-ink-foreground/50">
                    PURE VEG • PCMC
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setNavOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex size-11 items-center justify-center rounded-full border border-ink-foreground/20 text-ink-foreground transition-colors hover:bg-ink-foreground/10"
                >
                  <X className="size-[18px]" strokeWidth={1.6} />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-4xl font-light tracking-[-0.03em] transition-colors hover:text-accent sm:text-5xl md:text-6xl"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * navLinks.length,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pt-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setNavOpen(false);
                      setReservationOpen(true);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium tracking-[0.08em] text-accent-foreground uppercase transition-opacity hover:opacity-90"
                  >
                    <Calendar className="size-4" strokeWidth={1.8} />
                    Reserve Table
                  </button>
                </motion.div>
              </nav>

              <div className="border-t border-ink-foreground/15 pt-4 text-xs text-ink-foreground/60">
                <p className="eyebrow text-ink-foreground/50">
                  {restaurant.subtitle} • {restaurant.locality}
                </p>
                <p className="mt-1">{restaurant.addressLine}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
