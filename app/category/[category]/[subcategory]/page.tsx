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
  params: { category: string; subcategory: string };
}): Promise<Metadata> {
  const category = await getCategory(params.category);

  if (!category) return notFound();

  const subcategoryName = params.subcategory.replace('-', ' ').toUpperCase();

  return {
    title: `${subcategoryName} - ${category.name}`,
    description: `Browse ${subcategoryName} products in ${category.name} category`,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`${subcategoryName} - ${category.name}`)}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default async function SubcategoryPage({
  params,
  searchParams
}: {
  params: { category: string; subcategory: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  // Use subcategory as the search query to filter products
  // Try multiple search variations to find products
  let products = await getProductsByCategory(params.category, {
    query: params.subcategory,
    sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
  });

  // If no products found with exact subcategory, try without the "dil-" prefix
  if (products.length === 0 && params.subcategory.startsWith('dil-')) {
    const letter = params.subcategory.replace('dil-', '');
    products = await getProductsByCategory(params.category, {
      query: letter,
      sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
    });
  }

  // If still no products, try searching for products that start with the letter
  if (products.length === 0 && params.subcategory.startsWith('dil-')) {
    const letter = params.subcategory.replace('dil-', '').toUpperCase();
    products = await getProductsByCategory(params.category, {
      query: letter,
      sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
    });
  }

  // If still no products, get all products from the category to show what's available
  if (products.length === 0) {
    products = await getProductsByCategory(params.category, {
      sort: `${sortKey} ${reverse ? 'desc' : 'asc'}`
    });
  }

  const subcategoryDisplayName = params.subcategory.replace('-', ' ').toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="container-gutter">
        <div className="mx-auto max-w-7xl py-8">
          <section>
            <div className="mb-8">
              <h1 className="text-3xl font-bold capitalize text-foreground">
                {subcategoryDisplayName}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Products in {params.category.replace('-', ' ')} category
              </p>
            </div>
            {products.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No products found for "{subcategoryDisplayName}" in this category
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try browsing all products in the {params.category.replace('-', ' ')} category
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    {products.length > 0 && params.subcategory && products[0]?.name && !params.subcategory.includes(products[0].name.charAt(0).toLowerCase()) && 
                      ` (showing all products in ${params.category.replace('-', ' ')} category)`
                    }
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
