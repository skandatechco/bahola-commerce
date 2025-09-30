import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DilutionsGallery } from 'components/product/dilutions-gallery';
import { DilutionsProductDescription } from 'components/product/dilutions-product-description';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/swell';

// export const runtime = 'edge'; // Removed to fix WASM error

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { caption, file } = (product.images && product.images[0]) || {};
  const indexable = !product.tags?.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: file
      ? {
          images: [
            {
              url: file.url,
              width: file.width,
              height: file.height,
              alt: caption
            }
          ]
        }
      : null
  };
}
export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // Check if this is a dilutions product based on categories or tags
  console.log('Product data for dilutions detection:', {
    name: product.name,
    categories: (product as any).categories,
    tags: product.tags,
    slug: product.slug
  });
  
  const isDilutionsProduct = (product as any).categories?.some((cat: any) => 
    cat.slug?.includes('dilutions') || cat.name?.toLowerCase().includes('dilution')
  ) || product.tags?.some(tag => 
    tag.toLowerCase().includes('dilution') || tag.toLowerCase().includes('dil-')
  ) || product.slug?.includes('dil-') || product.name?.toLowerCase().includes('dilution') || 
  // Temporary: Force dilutions template for testing specific products
  product.slug?.includes('abel-moschus') || product.name?.toLowerCase().includes('abel');
  
  console.log('Is dilutions product:', isDilutionsProduct);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.[0]?.file?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.stockTracking === false || product.stockPurchasable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.currency,
      price: product.price
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        {isDilutionsProduct ? (
          // Specialized layout for dilutions products
          <div className="space-y-8">
            {/* Top section with image and basic product info */}
            <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black md:p-8 lg:flex-row lg:gap-12">
              {/* Image section - 45% width on desktop, 65% height on mobile */}
              <div className="w-full lg:w-[45%]">
                <DilutionsGallery
                  images={product.images.map((image) => ({
                    src: image.file.url,
                    altText: image.caption || product.name
                  }))}
                />
              </div>

              {/* Product info section - 55% width on desktop */}
              <div className="w-full lg:w-[55%] lg:pl-8">
                <DilutionsProductDescription product={product} />
              </div>
            </div>
            
            {/* Tabbed content section - full width below */}
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black md:p-8">
              <DilutionsProductDescription product={product} showTabsOnly={true} />
            </div>
          </div>
        ) : (
          // Standard layout for other products
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
            <div className="h-full w-full basis-full lg:basis-4/6">
              <Gallery
                images={product.images.map((image) => ({
                  src: image.file.url,
                  altText: image.caption || product.name
                }))}
              />
            </div>

            <div className="basis-full lg:basis-2/6">
              <ProductDescription product={product} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
