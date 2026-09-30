import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { dishes, type Dish } from "@/data/dishes";

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

  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  orderDish: Dish | null;
  setOrderDish: (d: Dish | null) => void;
  watchDish: Dish | null;
  setWatchDish: (d: Dish | null) => void;
};

const DeliContext = createContext<DeliState | null>(null);

export function DeliProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderDish, setOrderDish] = useState<Dish | null>(null);
  const [watchDish, setWatchDish] = useState<Dish | null>(null);

  const value = useMemo<DeliState>(() => {
    const goTo = (i: number) => {
      const target = ((i % dishes.length) + dishes.length) % dishes.length;
      setDirection(target === activeIndex ? 0 : target > activeIndex ? 1 : -1);
      setIndex(target);
    };
    const cartCount = cart.reduce((s, l) => s + l.qty, 0);
    return {
      activeIndex,
      activeDish: dishes[activeIndex]!,
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
      cartTotal: cart.reduce((s, l) => s + l.qty * l.dish.price, 0),
      addToCart: (dish, qty) =>
        setCart((prev) => {
          const existing = prev.find((l) => l.dish.id === dish.id);
          if (existing) {
            return prev.map((l) => (l.dish.id === dish.id ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { dish, qty }];
        }),
      navOpen,
      setNavOpen,
      searchOpen,
      setSearchOpen,
      cartOpen,
      setCartOpen,
      orderDish,
      setOrderDish,
      watchDish,
      setWatchDish,
    };
  }, [activeIndex, direction, cart, navOpen, searchOpen, cartOpen, orderDish, watchDish]);

  return <DeliContext.Provider value={value}>{children}</DeliContext.Provider>;
}

export function useDeli() {
  const ctx = useContext(DeliContext);
  if (!ctx) throw new Error("useDeli must be used inside DeliProvider");
  return ctx;
}

export const inr = (n: number) => `₹${n}`;
