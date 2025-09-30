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
  params: { category: string };
}): Promise<Metadata> {
  const category = await getCategory(params.category);

  if (!category) return notFound();

  return {
    title: category.name,
    description: category.metaDescription || category.description || `${category.name} products`,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(category.name)}`,
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
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProductsByCategory(params.category, {
    query: searchValue,
    sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container-gutter">
        <div className="mx-auto max-w-7xl py-8">
          <section>
            <div className="mb-8">
              <h1 className="text-3xl font-bold capitalize text-foreground">
                {params.category.replace('-', ' ')}
              </h1>
              {searchValue && (
                <p className="mt-2 text-lg text-muted-foreground">
                  Search results for: <span className="font-semibold">{searchValue}</span>
                </p>
              )}
            </div>
            {products.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  {searchValue 
                    ? `No products found for "${searchValue}" in this category`
                    : `No products found in this category`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Grid className="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <ProductGridItems products={products as any} />
                </Grid>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
