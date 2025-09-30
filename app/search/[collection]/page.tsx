import { defaultSort, sorting } from 'lib/constants';
import { getCategory, getProductsByCategory } from 'lib/swell';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

// export const runtime = 'edge'; // Removed to fix WASM error

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCategory(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.name,
    description:
      collection.metaDescription || collection.description || `${collection.name} products`,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(collection.name)}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue, subcategory } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  // Handle cases where subcategory might be part of the collection name
  // e.g., "homeopathic-dilutions-dil-a" should become "homeopathic-dilutions" with subcategory "dil-a"
  let collectionName = params.collection;
  let extractedSubcategory = subcategory;

  // Check if collection name contains a subcategory pattern (e.g., "homeopathic-dilutions-dil-a")
  const subcategoryMatch = collectionName.match(/^(.+)-dil-([a-z])$/);
  if (subcategoryMatch && subcategoryMatch[1] && subcategoryMatch[2]) {
    collectionName = subcategoryMatch[1]; // "homeopathic-dilutions"
    extractedSubcategory = `dil-${subcategoryMatch[2]}`; // "dil-a"
  }

  // If subcategory is provided, use it as the search query to filter products
  const query = extractedSubcategory ? extractedSubcategory : searchValue;

  const products = await getProductsByCategory(collectionName, {
    query: query,
    sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
  });

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold capitalize">
          {collectionName.replace('-', ' ')}
        </h1>
        {extractedSubcategory && (
          <p className="text-lg text-muted-foreground">
            Showing products for: <span className="font-semibold">{extractedSubcategory}</span>
          </p>
        )}
      </div>
      {products.length === 0 ? (
        <p className="py-3 text-lg">
          {extractedSubcategory 
            ? `No products found for "${extractedSubcategory}" in this collection`
            : `No products found in this collection`
          }
        </p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products as any} />
        </Grid>
      )}
    </section>
  );
}
