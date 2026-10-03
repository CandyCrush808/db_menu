import { createFileRoute } from "@tanstack/react-router";
import "@/styles/reviews.css";
import { DeliProvider } from "@/lib/deli-store";
import { Header } from "@/components/deli/Header";
import { Footer } from "@/components/deli/Sections";
import { BottomNav } from "@/components/deli/BottomNav";
import { ReviewHero } from "@/components/reviews/ReviewHero";
import { ReviewJourney } from "@/components/reviews/ReviewJourney";
import { ReviewFinalCTA } from "@/components/reviews/ReviewFinalCTA";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Deli Belly — Customer Stories & Reviews" },
      { name: "description", content: "Real customer stories and reviews from Deli Belly." },
      { property: "og:title", content: "Every Bite Has A Story — Deli Belly Reviews" },
      {
        property: "og:description",
        content: "A scroll-driven journey through Deli Belly customer reviews.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <DeliProvider>
      <Header />
      <main className="review-page pb-16 md:pb-0">
        <ReviewHero />
        <ReviewJourney />
        <ReviewFinalCTA />
      </main>
      <Footer />
      <BottomNav />
    </DeliProvider>
  );
}
