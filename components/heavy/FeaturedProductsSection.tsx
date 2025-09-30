import { getProducts } from "lib/swell";
import Link from "next/link";
import { GridTileImage } from "../grid/tile";

export async function FeaturedProductsSection() {
  let products;
  try {
    products = await getProducts({});
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to static products
    const fallbackProducts = [
      { id: "1", name: "Arnica Montana 200C", price: 120, slug: "arnica-200c", images: [] },
      { id: "2", name: "Nux Vomica 30C", price: 99, slug: "nux-vomica-30c", images: [] },
      { id: "3", name: "Belladonna 30C", price: 110, slug: "belladonna-30c", images: [] },
    ];
    return (
      <section className="container-gutter">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-lg font-semibold">Featured products</h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {fallbackProducts.map((p) => (
              <a key={p.id} href={`/product/${p.slug}`} className="rounded-xl border border-border bg-card p-4 text-sm shadow-sm hover:shadow">
                <div className="aspect-square rounded-md bg-muted" />
                <div className="mt-2 font-medium">{p.name}</div>
                <div className="text-foreground/70">₹{p.price.toFixed(2)}</div>
              </a>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/search" className="btn btn-ghost">View all</Link>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // Take first 3 products
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="container-gutter featured-products-section">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-lg font-semibold">Featured products</h3>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all group-hover:shadow-md">
                <GridTileImage
                  alt={product.name}
                  src={product.images?.[0]?.file?.url || "/placeholder.svg"}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="mt-2 text-sm font-medium">{product.name}</div>
              <div className="text-sm text-foreground/70">
                {product.price ? `₹${product.price}` : "Price on request"}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/search" className="btn btn-ghost">View all</Link>
        </div>
      </div>
    </section>
  );
}
