import { createFileRoute } from "@tanstack/react-router";
import { DeliProvider } from "@/lib/deli-store";
import { Header } from "@/components/deli/Header";
import { Hero } from "@/components/deli/Hero";
import {
  MenuSection,
  AboutSection,
  ExperienceSection,
  ReviewsSection,
  LocationSection,
  FinalCTA,
  Footer,
} from "@/components/deli/Sections";
import { BottomNav } from "@/components/deli/BottomNav";
import {
  OrderDrawer,
  CartDrawer,
  WatchDishModal,
  SearchOverlay,
  VoiceAssistant,
} from "@/components/deli/Overlays";

const title = "Deli Belly — Pure Veg Restaurant in PCMC";
const description =
  "An immersive digital menu from Deli Belly, a pure vegetarian restaurant in PCMC, Maharashtra. Explore signature dishes, ratings and order your favourites.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <ReviewsSection />
        <LocationSection />
        <FinalCTA />
        <Footer />
      </main>
      <BottomNav />
      <VoiceAssistant />
      <OrderDrawer />
      <CartDrawer />
      <WatchDishModal />
      <SearchOverlay />
    </DeliProvider>
  );
}
