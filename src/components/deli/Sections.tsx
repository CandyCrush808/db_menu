import { useState } from "react";
import { Leaf, Flame, Heart, Plus, Quote, MapPin, Phone, ArrowUpRight } from "lucide-react";
import aboutKitchen from "@/assets/about-kitchen.jpg";
import ctaSpread from "@/assets/cta-spread.jpg";
import ambience from "@/assets/ambience-interior.jpg";
import { dishes, menuCategories, placeholderReviews, restaurant, ratingsNote } from "@/data/dishes";
import { useDeli, inr } from "@/lib/deli-store";

export function MenuSection() {
  const [cat, setCat] = useState("All");
  const { setOrderDish, goTo } = useDeli();
  const list = cat === "All" ? dishes : dishes.filter((d) => d.menuCategory === cat);

  return (
    <section id="menu" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <p className="eyebrow">Explore the menu</p>
      <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-light tracking-[-0.03em] text-ink">
        A little something for <span className="font-extrabold">every craving.</span>
      </h2>

      <div className="mt-8 flex flex-wrap gap-2">
        {menuCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
              cat === c
                ? "border-transparent bg-ink text-ink-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          Dishes in this category are being added to the online menu.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col overflow-hidden rounded-[24px] border border-border bg-card"
            >
              <button
                type="button"
                onClick={() => {
                  goTo(dishes.findIndex((d) => d.id === dish.id));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="aspect-[4/3] overflow-hidden"
                aria-label={`Feature ${dish.name} in the hero`}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">{dish.category}</p>
                <h3 className="mt-2 font-display text-base font-bold text-ink">{dish.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-accent">{dish.stars}</span>
                  {dish.rating.toFixed(1)}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-ink">
                    {inr(dish.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOrderDish(dish)}
                    aria-label={`Add ${dish.name} to cart`}
                    className="flex size-11 items-center justify-center rounded-full bg-ink text-ink-foreground transition-opacity hover:opacity-90"
                  >
                    <Plus className="size-4" strokeWidth={1.8} />
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
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] tracking-[-0.03em] text-ink">
            <span className="font-light">GOOD FOOD.</span>{" "}
            <span className="font-extrabold">PURE VEG.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-muted-foreground">
            Deli Belly brings together comforting Indian favourites, rich Punjabi flavours,
            satisfying street food and modern vegetarian creations — all served with the warmth of a
            neighbourhood restaurant.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["PURE VEGETARIAN", "FRESHLY PREPARED", "PCMC"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-4 py-2 text-[11px] tracking-[0.16em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <img
          src={aboutKitchen}
          alt="A chef plating a vegetarian dish at Deli Belly"
          loading="lazy"
          width={1200}
          height={1500}
          className="aspect-[4/5] w-full rounded-[28px] object-cover shadow-soft"
        />
      </div>
    </section>
  );
}

const experience = [
  {
    icon: Flame,
    title: "Freshly Prepared",
    copy: "Food prepared with care and served fresh.",
  },
  {
    icon: Leaf,
    title: "Pure Vegetarian",
    copy: "A menu created entirely around vegetarian favourites.",
  },
  {
    icon: Heart,
    title: "Made To Crave",
    copy: "Comfort food, street food and signature dishes for every mood.",
  },
];

export function ExperienceSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-28">
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] tracking-[-0.03em] text-ink">
          <span className="font-light">COME HUNGRY.</span>{" "}
          <span className="font-extrabold">LEAVE HAPPY.</span>
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {experience.map(({ icon: Icon, title, copy }) => (
            <div key={title}>
              <Icon className="size-6 text-accent" strokeWidth={1.3} />
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <p className="eyebrow">Reviews</p>
      <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-light tracking-[-0.03em] text-ink">
        What guests <span className="font-extrabold">say.</span>
      </h2>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {placeholderReviews.map((r) => (
          <figure
            key={r.id}
            className="min-w-[300px] max-w-[420px] flex-1 snap-start rounded-[28px] border border-border bg-card p-7"
          >
            <Quote className="size-7 text-accent" strokeWidth={1.2} />
            <blockquote className="mt-5 text-[17px] leading-relaxed text-ink">{r.quote}</blockquote>
            <figcaption className="mt-6">
              <span className="block text-accent">{"★".repeat(r.rating)}</span>
              <span className="mt-2 block text-sm font-medium text-ink">{r.name}</span>
              <span className="eyebrow">Customer review</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Sample reviews shown as placeholders — to be replaced with real guest reviews.
      </p>
    </section>
  );
}

export function LocationSection() {
  const { setCartOpen } = useDeli();

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Location</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em] text-ink">
            <span className="font-light">VISIT</span>{" "}
            <span className="font-extrabold">DELI BELLY</span>
          </h2>
          <p className="mt-5 flex items-center gap-2 text-[17px] text-muted-foreground">
            <MapPin className="size-4 text-accent" strokeWidth={1.6} />
            {restaurant.locality}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {restaurant.addressLine} · {restaurant.phone || "Phone number to be added"}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={restaurant.mapsUrl || "#contact"}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-ink px-6 text-sm tracking-[0.06em] text-ink-foreground transition-opacity hover:opacity-90"
            >
              GET DIRECTIONS
              <ArrowUpRight className="size-4" strokeWidth={1.6} />
            </a>
            <a
              href={restaurant.phone ? `tel:${restaurant.phone}` : "#contact"}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm tracking-[0.06em] text-ink transition-colors hover:bg-secondary"
            >
              <Phone className="size-4" strokeWidth={1.6} />
              CALL RESTAURANT
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex min-h-12 items-center rounded-xl border border-border bg-card px-6 text-sm tracking-[0.06em] text-ink transition-colors hover:bg-secondary"
            >
              ORDER ONLINE
            </button>
          </div>
        </div>

        <img
          src={ambience}
          alt="Inside the Deli Belly dining room"
          loading="lazy"
          width={1920}
          height={1280}
          className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-soft"
        />
      </div>
    </section>
  );
}

export function FinalCTA() {
  const { activeDish, setOrderDish } = useDeli();

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
      <div className="absolute inset-0 -z-10 bg-ink/70" aria-hidden="true" />
      <div className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-10 md:py-40">
        <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(2rem,6vw,4.5rem)] tracking-[-0.03em] text-ink-foreground">
          <span className="font-light">WHAT ARE YOU</span>{" "}
          <span className="font-extrabold">CRAVING TODAY?</span>
        </h2>
        <p className="mt-6 text-[17px] text-ink-foreground/70">
          Discover your next favourite dish at Deli Belly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#menu"
            className="inline-flex min-h-12 items-center rounded-xl border border-ink-foreground/25 px-7 text-sm tracking-[0.06em] text-ink-foreground transition-colors hover:bg-ink-foreground/10"
          >
            EXPLORE MENU
          </a>
          <button
            type="button"
            onClick={() => setOrderDish(activeDish)}
            className="inline-flex min-h-12 items-center rounded-xl bg-accent px-7 text-sm tracking-[0.06em] text-accent-foreground transition-opacity hover:opacity-90"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl font-extrabold tracking-[-0.03em] text-ink">
            {restaurant.name}
          </p>
          <p className="eyebrow mt-2">
            {restaurant.subtitle} • {restaurant.locality.split(",")[0]}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
          {["Home", "Menu", "About", "Reviews", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-muted-foreground transition-colors hover:text-ink"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={restaurant.instagram || "#contact"}
            aria-label="Instagram"
            className="flex size-11 items-center justify-center rounded-full border border-border text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            IG
          </a>
          <a
            href={restaurant.facebook || "#contact"}
            aria-label="Facebook"
            className="flex size-11 items-center justify-center rounded-full border border-border text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            FB
          </a>
        </div>
      </div>

      <p className="mt-12 max-w-[70ch] text-xs leading-relaxed text-muted-foreground">
        {ratingsNote}
      </p>
      <p className="mt-4 text-xs text-muted-foreground">© Deli Belly</p>
    </footer>
  );
}
