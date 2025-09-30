import { GraphQLClient } from 'graphql-request';
import { SWELL_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { SwellCartItemOptionInput, getSdk } from './__generated__/graphql';

// Function to get Swell client with proper environment variable handling
export const getSwellClient = () => {
  const storeId = process.env.SWELL_STORE_ID;
  const publicKey = process.env.SWELL_PUBLIC_KEY;
  
  if (!storeId || !publicKey) {
    console.error('Missing Swell environment variables:', {
      storeId: !!storeId,
      publicKey: !!publicKey
    });
    throw new Error('Missing required Swell environment variables');
  }

  const domain = `https://${storeId}.swell.store`;
  const endpoint = `${domain}${SWELL_GRAPHQL_API_ENDPOINT}`;

  // Debug logging
  console.log('Swell Config:', {
    storeId,
    domain,
    endpoint,
    hasKey: !!publicKey
  });

  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: publicKey
    },
    fetch
  });
  
  return getSdk(client);
};

export const getProduct = async (slug: string) => {
  const SwellClient = getSwellClient();
  const { data } = await SwellClient.getProduct({
    slug
  });
  return data.productBySlug;
};

export const getProductVariants = async (slug: string) => {
  const SwellClient = getSwellClient();
  const { data } = await SwellClient.getProductVariants({
    slug
  });
  return data.productBySlug;
};

export const getProducts = async ({ query, sort }: { query?: string; sort?: string }) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.getProducts({
      search: query,
      sort
    });
    return data.products.results || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return some mock products for testing
    return [
      {
        id: 'mock-1',
        name: 'Sample Product 1',
        slug: 'sample-product-1',
        price: 29.99,
        currency: 'USD',
        description: 'Sample product description',
        stockTracking: false,
        stockPurchasable: true,
        stockLevel: null,
        metaTitle: 'Sample Product 1',
        metaDescription: 'Sample product meta description',
        tags: ['sample'],
        images: [{ file: { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop' } }]
      },
      {
        id: 'mock-2',
        name: 'Sample Product 2',
        slug: 'sample-product-2',
        price: 39.99,
        currency: 'USD',
        description: 'Sample product description',
        stockTracking: false,
        stockPurchasable: true,
        stockLevel: null,
        metaTitle: 'Sample Product 2',
        metaDescription: 'Sample product meta description',
        tags: ['sample'],
        images: [{ file: { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop' } }]
      }
    ];
  }
};

export const getCart = async (sessionToken: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.getCart();
    return data.getCart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
};

export const addToCart = async (
  sessionToken: string | undefined,
  {
    productId,
    quantity,
    options
  }: { productId: string; quantity: number; options: SwellCartItemOptionInput[] | undefined }
) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.addToCart({
      productId,
      quantity,
      options
    });
    return data.addCartItem;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCart = async (
  sessionToken: string,
  {
    itemId,
    quantity
  }: {
    itemId: string;
    quantity: number;
  }
) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.editCartItem({
      itemId,
      quantity
    });
    return data.updateCartItem;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (sessionToken: string, itemId: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.removeFromCart({
      itemId
    });
    return data.deleteCartItem;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const applyCoupon = async (sessionToken: string, couponCode: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.applyCoupon({
      couponCode
    });
    return data.applyCoupon;
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
};

export const removeCoupon = async (sessionToken: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.removeCoupon();
    return data.removeCoupon;
  } catch (error) {
    console.error('Error removing coupon:', error);
    throw error;
  }
};

export const applyGiftCard = async (sessionToken: string, giftCardCode: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.applyGiftCard({
      giftCardCode
    });
    return data.applyGiftcard;
  } catch (error) {
    console.error('Error applying gift card:', error);
    throw error;
  }
};

export const removeGiftCard = async (sessionToken: string, giftCardId: string) => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.removeGiftCard({
      giftCardId
    });
    return data.removeGiftcard;
  } catch (error) {
    console.error('Error removing gift card:', error);
    throw error;
  }
};

export const getCategory = async (slug: string) => {
  const SwellClient = getSwellClient();
  const { data } = await SwellClient.getGategory({
    slug
  });
  return data.categoryBySlug;
};

export const getProductsByCategory = async (
  category: string,
  params?: {
    query?: string;
    sort?: string;
  }
) => {
  try {
    const { sort, query } = params || {};
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.getProductsByCategory({
      category,
      sort,
      search: query
    });
    return data?.products.results || [];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    // Return some mock products for testing
    return [
      {
        id: `mock-${category}-1`,
        name: `Sample ${category} Product 1`,
        slug: `sample-${category}-product-1`,
        price: 29.99,
        currency: 'USD',
        description: `Sample ${category} product description`,
        stockTracking: false,
        stockPurchasable: true,
        stockLevel: null,
        metaTitle: `Sample ${category} Product 1`,
        metaDescription: `Sample ${category} product meta description`,
        tags: ['sample', category],
        images: [{ file: { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop' } }]
      },
      {
        id: `mock-${category}-2`,
        name: `Sample ${category} Product 2`,
        slug: `sample-${category}-product-2`,
        price: 39.99,
        currency: 'USD',
        description: `Sample ${category} product description`,
        stockTracking: false,
        stockPurchasable: true,
        stockLevel: null,
        metaTitle: `Sample ${category} Product 2`,
        metaDescription: `Sample ${category} product meta description`,
        tags: ['sample', category],
        images: [{ file: { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop' } }]
      }
    ];
  }
};

export const getCategories = async () => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.getCategories();
    return data.categories.results;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return some mock categories for testing
    return [
      { name: 'Mother tinctures', slug: 'mother-tinctures' },
      { name: 'Homeopathic Dilutions', slug: 'homeopathic-dilutions' },
      { name: 'LM Potencies', slug: 'lm-potencies' },
      { name: 'Bio Chemics', slug: 'bio-chemics' }
    ];
  }
};

export const getMenus = async () => {
  try {
    const SwellClient = getSwellClient();
    const { data } = await SwellClient.getMenus();
    return data.menuSettings;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return { sections: [] };
  }
};

export const getMenu = async (id: string) => {
  const menus = await getMenus();
  return menus.sections.find((menu) => menu.id === id);
};

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const collectionWebhooks = ['category.created', 'category.deleted', 'category.updated'];
  const productWebhooks = ['product.created', 'product.deleted', 'product.updated'];
  const { type } = await req.json();
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(type);
  const isProductUpdate = productWebhooks.includes(type);

  if (!secret || secret !== process.env.SWELL_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
