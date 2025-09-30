'use server';

import { addToCart, applyCoupon, applyGiftCard, removeCoupon, removeFromCart, removeGiftCard, updateCart } from 'lib/swell';
import { SwellCartItemOptionInput } from 'lib/swell/__generated__/graphql';
import { cookies } from 'next/headers';

export const addItem = async (
  productId: string | undefined,
  options: SwellCartItemOptionInput[] | undefined
): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!productId) {
    return new Error('Missing variantId');
  }

  try {
    const data = await addToCart(cartId, { quantity: 1, productId, options });
    if (data.headers.get('X-Session')) {
      cookies().set('sessionToken', data.headers.get('X-Session'));
    }
  } catch (e) {
    return new Error('Error adding item', { cause: e });
  }
};

export const removeItem = async (itemId: string): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }
  try {
    await removeFromCart(cartId, itemId);
  } catch (e) {
    return new Error('Error removing item', { cause: e });
  }
};

export const updateItemQuantity = async ({
  itemId,
  quantity
}: {
  itemId: string;
  quantity: number;
}): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }
  try {
    await updateCart(cartId, {
      itemId,
      quantity
    });
  } catch (e) {
    return new Error('Error updating item quantity', { cause: e });
  }
};

export const applyCouponCode = async (couponCode: string): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }

  if (!couponCode) {
    return new Error('Coupon code is required');
  }

  try {
    await applyCoupon(cartId, couponCode);
  } catch (e) {
    return new Error('Error applying coupon code', { cause: e });
  }
};

export const removeCouponCode = async (): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }

  try {
    await removeCoupon(cartId);
  } catch (e) {
    return new Error('Error removing coupon code', { cause: e });
  }
};

export const applyGiftCardCode = async (giftCardCode: string): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }

  if (!giftCardCode) {
    return new Error('Gift card code is required');
  }

  try {
    await applyGiftCard(cartId, giftCardCode);
  } catch (e) {
    return new Error('Error applying gift card code', { cause: e });
  }
};

export const removeGiftCardCode = async (giftCardId: string): Promise<Error | undefined> => {
  const cartId = cookies().get('sessionToken')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }

  if (!giftCardId) {
    return new Error('Gift card ID is required');
  }

  try {
    await removeGiftCard(cartId, giftCardId);
  } catch (e) {
    return new Error('Error removing gift card', { cause: e });
  }
};
