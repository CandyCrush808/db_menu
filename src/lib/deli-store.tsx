import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dishes, restaurant, type Dish } from "@/data/dishes";

export type CartLine = { dish: Dish; qty: number };

type DeliState = {
  activeIndex: number;
  activeDish: Dish;
  setActiveIndex: (i: number) => void;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  direction: number;

  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (dish: Dish, qty: number) => void;
  updateCartQty: (dishId: string, qty: number) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;

  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  reservationOpen: boolean;
  setReservationOpen: (v: boolean) => void;
  orderDish: Dish | null;
  setOrderDish: (d: Dish | null) => void;
  watchDish: Dish | null;
  setWatchDish: (d: Dish | null) => void;

  getWhatsAppOrderUrl: (customLines?: CartLine[]) => string | null;
};

const DeliContext = createContext<DeliState | null>(null);

const CART_STORAGE_KEY = "deli_belly_cart_v1";

export function DeliProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cart, setCart] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Validate stored dishes against dataset
          return parsed
            .map((item: { dishId: string; qty: number }) => {
              const matched = dishes.find((d) => d.id === item.dishId);
              return matched && item.qty > 0 ? { dish: matched, qty: item.qty } : null;
            })
            .filter((item): item is CartLine => item !== null);
        }
      }
    } catch (e) {
      console.warn("Could not load cart from storage", e);
    }
    return [];
  });

  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [orderDish, setOrderDish] = useState<Dish | null>(null);
  const [watchDish, setWatchDish] = useState<Dish | null>(null);

  // Sync cart to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const toSave = cart.map((l) => ({ dishId: l.dish.id, qty: l.qty }));
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn("Could not save cart to storage", e);
    }
  }, [cart]);

  const value = useMemo<DeliState>(() => {
    const goTo = (i: number) => {
      const target = ((i % dishes.length) + dishes.length) % dishes.length;
      setDirection(target === activeIndex ? 0 : target > activeIndex ? 1 : -1);
      setIndex(target);
    };

    const cartCount = cart.reduce((s, l) => s + l.qty, 0);
    const cartTotal = cart.reduce((s, l) => s + l.qty * l.dish.price, 0);

    const getWhatsAppOrderUrl = (customLines?: CartLine[]) => {
      const linesToUse = customLines || cart;
      if (!restaurant.whatsapp || linesToUse.length === 0) return null;
      let text = `Hello ${restaurant.name}, I would like to place an order:\n\n`;
      linesToUse.forEach((line) => {
        text += `• ${line.dish.name} × ${line.qty} — ₹${line.dish.price * line.qty}\n`;
      });
      const total = linesToUse.reduce((s, l) => s + l.qty * l.dish.price, 0);
      text += `\nTotal: ₹${total}\nLocation: ${restaurant.locality}\n\nPlease confirm availability and delivery time. Thank you!`;
      return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(text)}`;
    };

    return {
      activeIndex,
      activeDish: dishes[activeIndex] || dishes[0],
      setActiveIndex: goTo,
      goTo,
      next: () => {
        setDirection(1);
        setIndex((i) => (i + 1) % dishes.length);
      },
      prev: () => {
        setDirection(-1);
        setIndex((i) => (i - 1 + dishes.length) % dishes.length);
      },
      direction,
      cart,
      cartCount,
      cartTotal,
      addToCart: (dish, qty) => {
        const safeQty = Math.max(1, Math.floor(qty));
        setCart((prev) => {
          const existing = prev.find((l) => l.dish.id === dish.id);
          if (existing) {
            return prev.map((l) => (l.dish.id === dish.id ? { ...l, qty: l.qty + safeQty } : l));
          }
          return [...prev, { dish, qty: safeQty }];
        });
      },
      updateCartQty: (dishId, qty) => {
        const targetQty = Math.floor(qty);
        setCart((prev) => {
          if (targetQty <= 0) return prev.filter((l) => l.dish.id !== dishId);
          return prev.map((l) => (l.dish.id === dishId ? { ...l, qty: targetQty } : l));
        });
      },
      removeFromCart: (dishId) => {
        setCart((prev) => prev.filter((l) => l.dish.id !== dishId));
      },
      clearCart: () => setCart([]),
      navOpen,
      setNavOpen,
      searchOpen,
      setSearchOpen,
      cartOpen,
      setCartOpen,
      reservationOpen,
      setReservationOpen,
      orderDish,
      setOrderDish,
      watchDish,
      setWatchDish,
      getWhatsAppOrderUrl,
    };
  }, [
    activeIndex,
    direction,
    cart,
    navOpen,
    searchOpen,
    cartOpen,
    reservationOpen,
    orderDish,
    watchDish,
  ]);

  return <DeliContext.Provider value={value}>{children}</DeliContext.Provider>;
}

export function useDeli() {
  const ctx = useContext(DeliContext);
  if (!ctx) throw new Error("useDeli must be used inside DeliProvider");
  return ctx;
}

export const inr = (n: number) => `₹${n}`;
