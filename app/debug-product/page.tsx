import { getProduct } from 'lib/swell';

export default async function DebugProductPage() {
  // Get the specific product that's having issues
  const product = await getProduct('abel-moschus-ch');

  return (
    <div className="min-h-screen bg-background">
      <div className="container-gutter">
        <div className="mx-auto max-w-7xl py-8">
          <h1 className="text-3xl font-bold mb-8">Debug: Abel Moschus CH Product Data</h1>
          
          {product ? (
            <div className="space-y-6">
              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Basic Product Info</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <strong>Name:</strong> {product.name}
                  </div>
                  <div>
                    <strong>ID:</strong> {product.id}
                  </div>
                  <div>
                    <strong>Slug:</strong> {product.slug}
                  </div>
                  <div>
                    <strong>Price:</strong> {product.price} (Type: {typeof product.price})
                  </div>
                  <div>
                    <strong>Currency:</strong> {product.currency}
                  </div>
                  <div>
                    <strong>Stock Tracking:</strong> {product.stockTracking ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Stock Purchasable:</strong> {product.stockPurchasable ? 'Yes' : 'No'}
                  </div>
                  <div>
                    <strong>Stock Level:</strong> {product.stockLevel}
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Variants ({product.variants.results.length})</h2>
                {product.variants.results.map((variant, index) => (
                  <div key={variant.id} className="mb-4 p-4 border rounded">
                    <div><strong>Variant {index + 1}:</strong> {variant.name}</div>
                    <div><strong>SKU:</strong> {variant.sku}</div>
                    <div><strong>Stock Level:</strong> {variant.stockLevel}</div>
                    <div><strong>Currency:</strong> {variant.currency}</div>
                    <div><strong>Prices:</strong> {JSON.stringify(variant.prices)}</div>
                    <div><strong>Option Value IDs:</strong> {JSON.stringify(variant.optionValueIds)}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Options ({product.options.length})</h2>
                {product.options.map((option, index) => (
                  <div key={option.id} className="mb-4 p-4 border rounded">
                    <div><strong>Option {index + 1}:</strong> {option.name}</div>
                    <div><strong>ID:</strong> {option.id}</div>
                    <div><strong>Variant:</strong> {option.variant ? 'Yes' : 'No'}</div>
                    <div><strong>Description:</strong> {option.description}</div>
                    <div><strong>Values ({option.values.length}):</strong></div>
                    <ul className="ml-4">
                      {option.values.map((value) => (
                        <li key={value.id}>
                          {value.name} (ID: {value.id}, Price: {value.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Raw Product Data</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(product, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Product not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


