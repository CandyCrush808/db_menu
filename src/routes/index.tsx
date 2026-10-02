import { createFileRoute } from "@tanstack/react-router";
import { DeliProvider } from "@/lib/deli-store";
import { Header } from "@/components/deli/Header";
import { Hero } from "@/components/deli/Hero";
import {
  MenuSection,
  AboutSection,
  ExperienceSection,
  LocationSection,
  FinalCTA,
  Footer,
} from "@/components/deli/Sections";
import { BottomNav } from "@/components/deli/BottomNav";
import {
  OrderDrawer,
  CartDrawer,
  ReservationModal,
  WatchDishModal,
  SearchOverlay,
  VoiceAssistant,
} from "@/components/deli/Overlays";

const title = "DELI BELLY — Pure Veg Restaurant in PCMC, Pune";
const description =
  "Experience premium 100% pure vegetarian dining at Deli Belly in Nigdi, PCMC, Pune. Explore signature North Indian dishes, Punjabi gravies, street food, and authentic house specials.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "DELI BELLY",
          image: "https://delibelly.in/assets/ambience-interior.jpg",
          description,
          servesCuisine: ["North Indian", "Punjabi", "Pure Vegetarian", "Street Food"],
          priceRange: "₹150 - ₹350",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot No-1/27A, HDFC Building, PCNTDA, Nigdi",
            addressLocality: "PCMC, Pune",
            addressRegion: "Maharashtra",
            postalCode: "411044",
            addressCountry: "IN",
          },
          telephone: "+91 8956928081",
          acceptsReservations: "True",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "08:00",
              closes: "23:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <DeliProvider>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <MenuSection />
        <AboutSection />
        <ExperienceSection />
        <LocationSection />
        <FinalCTA />
        <Footer />
      </main>
      <BottomNav />
      <VoiceAssistant />
      <OrderDrawer />
      <CartDrawer />
      <ReservationModal />
      <WatchDishModal />
      <SearchOverlay />
    </DeliProvider>
  );
}
