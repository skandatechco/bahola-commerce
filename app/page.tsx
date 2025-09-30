import { LazyAboutSection, LazyFeaturedProductsSection, LazyTestimonialsSection } from "@/components/LazyFeatures";
import { SearchActionBar } from "@/components/SearchActionBar";
import { ConsultSection, DiscoverSection } from "@/components/features";
import { ShopHeroCarousel } from "@/components/shop/ShopHeroCarousel";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ShopHeroCarousel />
      
      <div className="py-12 space-y-12">
        <SearchActionBar />
        <ConsultSection />
        <DiscoverSection />
        
        <LazyFeaturedProductsSection />
        <LazyAboutSection />
        <LazyTestimonialsSection />
      </div>
      
      <main className="container-gutter">
        <div className="mx-auto max-w-7xl py-8">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Bahola Labs
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Your trusted source for homeopathic remedies and natural health solutions.
          </p>
          <div className="mt-8">
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </main>
    </div>
  );
}