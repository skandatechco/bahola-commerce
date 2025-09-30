import { GridTileImage } from 'components/grid/tile';
import { PLACEHOLDER_IMAGE } from 'lib/constants';
import { getProducts } from 'lib/swell';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: ProductFragment;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.slug}`}>
        <GridTileImage
          src={item.images.length === 0 ? PLACEHOLDER_IMAGE : item.images[0]?.file.url || ''}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string,
            amount: String(item.price),
            currencyCode: 'USD'
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Get all products instead of filtering by category
  let homepageItems;
  try {
    homepageItems = await getProducts({});
  } catch (error) {
    console.error('Error fetching products for three item grid:', error);
    // Return a fallback grid instead of null
    return (
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        <div className="md:col-span-4 md:row-span-2 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Featured Products</h3>
            <p className="text-gray-600">Loading homeopathic remedies...</p>
          </div>
        </div>
        <div className="md:col-span-2 md:row-span-1 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Product 2</p>
        </div>
        <div className="md:col-span-2 md:row-span-1 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Product 3</p>
        </div>
      </section>
    );
  }

  if (!homepageItems || !homepageItems[0] || !homepageItems[1] || !homepageItems[2]) {
    return (
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
        <div className="md:col-span-4 md:row-span-2 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Featured Products</h3>
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        </div>
        <div className="md:col-span-2 md:row-span-1 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Coming Soon</p>
        </div>
        <div className="md:col-span-2 md:row-span-1 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Coming Soon</p>
        </div>
      </section>
    );
  }

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
