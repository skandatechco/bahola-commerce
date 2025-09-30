'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: ProductFragment }) {
  const searchParams = useSearchParams();
  
  // Stock availability logic: 
  // - If stock tracking is disabled (false), always available
  // - If stock tracking is enabled (true), check if purchasable and has stock
  // - If stock tracking is null/undefined, assume available (no inventory management)
  const isAvailableForSale = product.stockTracking === false || 
    (product.stockTracking === true ? 
      (product.stockPurchasable && (product.stockLevel === null || product.stockLevel > 0)) :
      true // If stockTracking is null/undefined, assume available
    );

  // Find the currently selected variant based on URL parameters
  const selectedVariant = useMemo(() => {
    if (!product.variants?.results?.length) return null;
    
    // Get current variant parameters from URL
    const variantParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      // Check if this parameter corresponds to a product option
      const option = product.options?.find(opt => 
        opt.name.toLowerCase() === key && 
        opt.values?.some(val => val.name === value)
      );
      if (option) {
        variantParams[key] = value;
      }
    });

    // Debug logging
    console.log('Variant Selection Debug:', {
      variantParams,
      availableVariants: product.variants.results.map(v => ({
        id: v.id,
        name: v.name,
        optionValueIds: v.optionValueIds,
        prices: v.prices
      })),
      productOptions: product.options?.map(opt => ({
        name: opt.name,
        values: opt.values?.map(val => ({ id: val.id, name: val.name }))
      }))
    });

    // Find the variant that matches all selected parameters
    const matchingVariant = product.variants.results.find(variant => {
      if (!variant.optionValueIds?.length) return false;
      
      // Get all selected option value IDs
      const selectedOptionValueIds: string[] = [];
      Object.entries(variantParams).forEach(([optionName, selectedValue]) => {
        const option = product.options?.find(opt => opt.name.toLowerCase() === optionName);
        const optionValue = option?.values?.find(val => val.name === selectedValue);
        if (optionValue?.id) {
          selectedOptionValueIds.push(optionValue.id);
        }
      });

      console.log('Matching variant check:', {
        variantId: variant.id,
        variantOptionValueIds: variant.optionValueIds,
        selectedOptionValueIds,
        isMatch: selectedOptionValueIds.length > 0 && 
                 selectedOptionValueIds.every(id => variant.optionValueIds?.includes(id)) &&
                 selectedOptionValueIds.length === variant.optionValueIds?.length
      });

      // Check if this variant has exactly the same option value IDs as selected
      return selectedOptionValueIds.length > 0 && 
             selectedOptionValueIds.every(id => variant.optionValueIds?.includes(id)) &&
             selectedOptionValueIds.length === variant.optionValueIds?.length;
    });

    console.log('Selected Variant:', matchingVariant);
    return matchingVariant || null;
  }, [product.variants?.results, product.options, searchParams]);

  // Determine the price to display (variant price or base product price)
  // Handle cases where prices might be null or undefined
  const variantPriceFromArray = selectedVariant?.prices?.[0]?.price;
  const variantDirectPrice = selectedVariant?.price;
  const basePrice = product.price;
  const basePriceFromArray = product.prices?.[0]?.price;
  
  // Try variant price from prices array first, then direct price, then base price
  const variantPrice = variantPriceFromArray !== null && variantPriceFromArray !== undefined ? variantPriceFromArray :
                      (variantDirectPrice !== null && variantDirectPrice !== undefined ? variantDirectPrice : null);
  
  // Use variant price if available, otherwise base price (from array or direct), otherwise show "Price on request"
  const displayPrice = variantPrice !== null && variantPrice !== undefined ? variantPrice : 
                      (basePrice !== null && basePrice !== undefined ? basePrice : 
                       (basePriceFromArray !== null && basePriceFromArray !== undefined ? basePriceFromArray : null));
  const displayCurrency = selectedVariant?.currency || product.currency;

  // Debug logging for stock values and price
  console.log('Product Stock Debug:', {
    name: product.name,
    stockTracking: product.stockTracking,
    stockPurchasable: product.stockPurchasable,
    stockLevel: product.stockLevel,
    isAvailableForSale,
    selectedVariant: selectedVariant?.name,
    selectedVariantPrices: selectedVariant?.prices,
    variantPriceFromArray,
    variantDirectPrice,
    variantPrice,
    basePrice,
    basePriceFromArray,
    displayPrice,
    displayCurrency,
    baseProductPrice: product.price,
    baseProductPrices: product.prices,
    baseProductCurrency: product.currency,
    allVariants: product.variants?.results?.map(v => ({
      id: v.id,
      name: v.name,
      price: v.price,
      prices: v.prices,
      currency: v.currency
    }))
  });

  return (
    <>
        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
          <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
          <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
            {displayPrice !== null ? (
              <Price
                amount={displayPrice}
                currencyCode={displayCurrency}
              />
            ) : (
              <span>Price on request</span>
            )}
          </div>
          {selectedVariant && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {selectedVariant.name}
            </p>
          )}
        </div>
      <VariantSelector 
        options={product.options} 
        variants={product.variants.results} 
        stockPurchasable={isAvailableForSale}
      />

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <AddToCart product={product} availableForSale={isAvailableForSale} />
    </>
  );
}
