import { getProductsByCategory } from 'lib/swell';

export default async function DebugProductsPage() {
  // Get all products from homeopathic-dilutions category
  const allProducts = await getProductsByCategory('homeopathic-dilutions', {
    sort: 'name asc'
  });

  // Get products starting with 'N' (for Dil-N)
  const nProducts = await getProductsByCategory('homeopathic-dilutions', {
    query: 'n',
    sort: 'name asc'
  });

  // Get products starting with 'A' (for Dil-A)
  const aProducts = await getProductsByCategory('homeopathic-dilutions', {
    query: 'a',
    sort: 'name asc'
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container-gutter">
        <div className="mx-auto max-w-7xl py-8">
          <h1 className="text-3xl font-bold mb-8">Debug: Products in Homeopathic Dilutions</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Products ({allProducts.length})</h2>
              <div className="grid grid-cols-1 gap-4">
                {allProducts.map((product, index) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                    <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                    <p className="text-sm text-muted-foreground">Price: {product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Products starting with 'N' ({nProducts.length})</h2>
              <div className="grid grid-cols-1 gap-4">
                {nProducts.map((product, index) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                    <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                    <p className="text-sm text-muted-foreground">Price: {product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Products starting with 'A' ({aProducts.length})</h2>
              <div className="grid grid-cols-1 gap-4">
                {aProducts.map((product, index) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                    <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                    <p className="text-sm text-muted-foreground">Price: {product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


