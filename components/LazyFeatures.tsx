import dynamic from "next/dynamic";

export const LazyFeaturedProductsSection = dynamic(() => import("./heavy/FeaturedProductsSection").then(m => m.FeaturedProductsSection), { loading: () => <div className="container-gutter"><div className="mx-auto max-w-7xl"><div className="h-32 animate-pulse bg-gray-200 rounded"></div></div></div> });
export const LazyTestimonialsSection = dynamic(() => import("./heavy/TestimonialsSection").then(m => m.TestimonialsSection), { ssr: false, loading: () => null });
export const LazyAboutSection = dynamic(() => import("./heavy/AboutSection").then(m => m.AboutSection), { ssr: false, loading: () => null });
