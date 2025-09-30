import { getProducts } from 'lib/swell';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Get all products instead of filtering by category
  let products;
  try {
    products = await getProducts({});
  } catch (error) {
    console.error('Error fetching products for carousel:', error);
    // Return a fallback message instead of null
    return (
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Our Products</h3>
            <p className="text-gray-600">Loading homeopathic remedies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Our Products</h3>
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.slug}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.slug}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price,
                  currencyCode: product.currency
                }}
                src={product.images[0]?.file.url || ''}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
