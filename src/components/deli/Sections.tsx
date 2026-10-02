import { useState } from "react";
import {
  Leaf,
  Flame,
  Heart,
  Plus,
  MapPin,
  Phone,
  ArrowUpRight,
  MessageCircle,
  Calendar,
  Clock,
} from "lucide-react";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import ctaSpread from "@/assets/cta-spread.jpg";
import ambience from "@/assets/ambience-interior.jpg";
import { dishes, menuCategories, restaurant, ratingsNote } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";

export function MenuSection() {
  const [cat, setCat] = useState("All");
  const { setOrderDish, goTo } = useDeli();
  const list = cat === "All" ? dishes : dishes.filter((d) => d.menuCategory === cat);

  return (
    <section id="menu" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Explore the menu</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,3rem)] font-light tracking-[-0.03em] text-ink">
            A little something for <span className="font-extrabold">every craving.</span>
          </h2>
        </div>
        <p className="text-xs text-muted-foreground md:text-right max-w-[280px]">
          Tap any dish image to feature it in the signature hero experience above.
        </p>
      </div>

      {/* Filter Categories */}
      <div className="mt-8 flex flex-wrap gap-2">
        {menuCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`min-h-11 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.06em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              cat === c
                ? "border-transparent bg-ink text-ink-foreground shadow-soft"
                : "border-border/70 bg-card/80 text-muted-foreground hover:bg-secondary hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Dish Grid */}
      {list.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-12 text-center">
          <p className="text-sm font-medium text-ink">More dishes coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dishes in the "{cat}" category are being added to the digital menu.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-border/70 bg-card transition-all duration-300 hover:border-border hover:shadow-lift"
            >
              <button
                type="button"
                onClick={() => {
                  goTo(dishes.findIndex((d) => d.id === dish.id));
                  const el = document.getElementById("home");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative aspect-[4/3] w-full overflow-hidden bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Show ${dish.name} in main hero view`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="rounded-full bg-background/90 px-2.5 py-1 text-[9px] font-bold tracking-wider text-veg uppercase backdrop-blur-sm">
                    Pure Veg
                  </span>
                  {dish.jainAvailable && (
                    <span className="rounded-full bg-accent/90 px-2.5 py-1 text-[9px] font-bold tracking-wider text-accent-foreground uppercase backdrop-blur-sm">
                      Jain
                    </span>
                  )}
                </div>
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[10px]">{dish.category}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-ink">
                    <span className="text-accent">{dish.stars}</span>
                    {dish.rating.toFixed(1)}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-base font-bold text-ink leading-snug">
                  {dish.name}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/40">
                  <span className="font-display text-lg font-bold text-ink">{inr(dish.price)}</span>
                  <button
                    type="button"
                    onClick={() => setOrderDish(dish)}
                    aria-label={`Add ${dish.name} to order`}
                    className="flex size-10 items-center justify-center rounded-full bg-ink text-ink-foreground transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Plus className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-muted-foreground">{ratingsNote}</p>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">About Deli Belly</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-none tracking-[-0.03em] text-ink">
            <span className="font-light">GOOD FOOD.</span>{" "}
            <span className="font-extrabold block mt-1">PURE VEG.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground">
            Deli Belly brings together comforting Indian favourites, rich Punjabi gravies, crisp
            tandoori delights, satisfying street food and modern vegetarian creations — all prepared
            freshly in our 100% vegetarian kitchen in PCMC, Maharashtra.
          </p>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground">
            Whether you are dropping in for a quick bite with family or ordering your favourite
            North Indian thali at home, we focus on genuine spice blends, rich textures, and warm
            hospitality.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {["100% PURE VEG", "FRESH INGREDIENTS", "PCMC, MAHARASHTRA", "AUTHENTIC SPICES"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/80 bg-card px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative">
          <img
            src={aboutKitchen}
            alt="A chef plating a vegetarian dish at Deli Belly"
            loading="lazy"
            width={1200}
            height={1500}
            className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-lift"
          />
          <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lift">
            <div className="flex size-12 items-center justify-center rounded-xl bg-veg/10 text-veg">
              <Leaf className="size-6" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-ink">Pure Vegetarian Kitchen</p>
              <p className="text-xs text-muted-foreground">Serving Nigdi & PCMC area</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const experiencePillars = [
  {
    num: "01",
    icon: Leaf,
    title: "100% Pure Veg Kitchen",
    copy: "Our entire kitchen and menu are dedicated strictly to pure vegetarian culinary creations.",
  },
  {
    num: "02",
    icon: Flame,
    title: "Slow-Cooked Authenticity",
    copy: "From overnight-simmered Dal Makhani to hand-spun lassi, every recipe preserves traditional richness.",
  },
  {
    num: "03",
    icon: Heart,
    title: "Contemporary Atmosphere",
    copy: "Clean, comfortable dining room created for families, friends, and everyday cravings.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="border-y border-border/60 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-28">
        <p className="eyebrow">The Dining Experience</p>
        <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,3rem)] tracking-[-0.03em] text-ink">
          <span className="font-light">COME HUNGRY.</span>{" "}
          <span className="font-extrabold">LEAVE HAPPY.</span>
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-14">
          {experiencePillars.map(({ num, icon: Icon, title, copy }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border/40 bg-secondary/50 p-7 transition-all duration-300 hover:bg-secondary hover:border-border"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold tracking-[0.2em] text-accent">
                  {num}
                </span>
                <Icon
                  className="size-6 text-accent transition-transform group-hover:scale-110"
                  strokeWidth={1.6}
                />
              </div>
              <h3 className="mt-6 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  const { setCartOpen, setReservationOpen, getWhatsAppOrderUrl } = useDeli();
  const waUrl = getWhatsAppOrderUrl();

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Location & Hours</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-ink">
            <span className="font-light">VISIT</span>{" "}
            <span className="font-extrabold block">DELI BELLY</span>
          </h2>

          <div className="mt-6 space-y-3">
            <p className="flex items-start gap-3 text-[15px] text-ink">
              <MapPin className="size-5 shrink-0 text-accent mt-0.5" strokeWidth={1.8} />
              <span>
                <strong className="block font-semibold">Address:</strong>
                {restaurant.addressLine}
              </span>
            </p>

            <p className="flex items-center gap-3 text-[15px] text-ink">
              <Clock className="size-5 shrink-0 text-accent" strokeWidth={1.8} />
              <span>
                <strong className="inline font-semibold">Hours: </strong>
                {restaurant.hours}
              </span>
            </p>

            {restaurant.phone && (
              <p className="flex items-center gap-3 text-[15px] text-ink">
                <Phone className="size-5 shrink-0 text-accent" strokeWidth={1.8} />
                <span>
                  <strong className="inline font-semibold">Phone: </strong>
                  <a href={`tel:${restaurant.phone}`} className="hover:underline">
                    {restaurant.phone}
                  </a>
                </span>
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {restaurant.mapsUrl && (
              <a
                href={restaurant.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-ink px-6 text-xs font-semibold tracking-[0.08em] text-ink-foreground transition-all hover:opacity-90 shadow-soft"
              >
                GET DIRECTIONS
                <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </a>
            )}

            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-xs font-semibold tracking-[0.08em] text-ink transition-all hover:bg-secondary"
              >
                <Phone className="size-4" strokeWidth={1.8} />
                CALL RESTAURANT
              </a>
            )}

            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-accent/50 bg-accent/10 px-6 text-xs font-semibold tracking-[0.08em] text-accent uppercase transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="size-4" strokeWidth={1.8} />
              BOOK TABLE
            </button>

            {restaurant.whatsapp && (
              <a
                href={waUrl || `https://wa.me/${restaurant.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-veg/40 bg-veg/10 px-6 text-xs font-semibold tracking-[0.08em] text-veg transition-all hover:bg-veg hover:text-white"
              >
                <MessageCircle className="size-4" strokeWidth={1.8} />
                WHATSAPP ORDER
              </a>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] shadow-lift">
          <img
            src={ambience}
            alt="Inside the Deli Belly dining room"
            loading="lazy"
            width={1920}
            height={1280}
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent p-6 flex flex-col justify-end text-white">
            <p className="font-display text-xl font-bold">{restaurant.name}</p>
            <p className="text-xs text-white/80">{restaurant.locality}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { activeDish, setOrderDish, setReservationOpen } = useDeli();

  return (
    <section id="order" className="relative isolate overflow-hidden">
      <img
        src={ctaSpread}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-ink/75 backdrop-blur-[1px]" aria-hidden="true" />
      <div className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10 md:py-36">
        <p className="eyebrow text-accent">Pure Veg Dining</p>
        <h2 className="mx-auto mt-3 max-w-[20ch] font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-none tracking-[-0.03em] text-ink-foreground">
          <span className="font-light block">WHAT ARE YOU</span>{" "}
          <span className="font-extrabold block mt-1">CRAVING TODAY?</span>
        </h2>
        <p className="mt-6 text-[17px] text-ink-foreground/80 max-w-[50ch] mx-auto">
          Discover traditional Indian flavors, authentic spices, and signature vegetarian dishes at
          Deli Belly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#menu"
            className="inline-flex min-h-12 items-center rounded-xl border border-ink-foreground/30 px-7 text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:bg-ink-foreground/10"
          >
            EXPLORE MENU
          </a>
          <button
            type="button"
            onClick={() => setOrderDish(activeDish)}
            className="inline-flex min-h-12 items-center rounded-xl bg-accent px-7 text-xs font-semibold tracking-[0.08em] text-accent-foreground uppercase transition-all hover:opacity-90 shadow-lift"
          >
            ORDER NOW
          </button>
          <button
            type="button"
            onClick={() => setReservationOpen(true)}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-ink-foreground/30 bg-ink-foreground/10 px-7 text-xs font-semibold tracking-[0.08em] text-ink-foreground uppercase transition-all hover:bg-ink-foreground/20"
          >
            <Calendar className="size-4" strokeWidth={1.8} />
            BOOK TABLE
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 border-t border-border/40">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[320px]">
          <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-ink">
            {restaurant.name}
          </p>
          <p className="eyebrow mt-1.5">{restaurant.subtitle}</p>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            {restaurant.addressLine}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer Navigation">
          {["Home", "Menu", "About", "Experience", "Reviews", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="eyebrow">Connect</p>
          <div className="flex gap-2">
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Maps"
              className="flex size-10 items-center justify-center rounded-full border border-border text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
            >
              MAP
            </a>
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                aria-label="Phone"
                className="flex size-10 items-center justify-center rounded-full border border-border text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
              >
                TEL
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>{ratingsNote}</p>
        <p>
          © {new Date().getFullYear()} {restaurant.name} • All rights reserved
        </p>
      </div>
    </footer>
  );
}
