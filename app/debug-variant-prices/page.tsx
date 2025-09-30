import { getProduct, getProductVariants } from 'lib/swell';

export const runtime = 'edge';

export default async function DebugVariantPricesPage() {
  const product = await getProduct('abel-moschus-ch');
  const productVariants = await getProductVariants('abel-moschus-ch');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Variant Price Debug Page</h1>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Product Data</h2>
          <div className="rounded-md bg-card p-4 shadow-sm">
            <pre className="text-sm text-foreground overflow-auto">
              {JSON.stringify({
                name: product?.name,
                price: product?.price,
                prices: product?.prices,
                currency: product?.currency,
                variants: product?.variants?.results?.map(v => ({
                  id: v.id,
                  name: v.name,
                  price: v.price,
                  prices: v.prices,
                  currency: v.currency
                }))
              }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Product Variants Query</h2>
          <div className="rounded-md bg-card p-4 shadow-sm">
            <pre className="text-sm text-foreground overflow-auto">
              {JSON.stringify({
                name: productVariants?.name,
                variants: productVariants?.variants?.results?.map(v => ({
                  id: v.id,
                  name: v.name,
                  price: v.price,
                  prices: v.prices,
                  currency: v.currency
                }))
              }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Comparison</h2>
          <div className="rounded-md bg-card p-4 shadow-sm">
            <p className="text-sm text-foreground">
              This page compares the variant prices returned by the regular product query vs. the dedicated variant query.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


