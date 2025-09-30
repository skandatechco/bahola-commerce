'use client';

import clsx from 'clsx';
import { ProductFragment } from 'lib/swell/__generated__/graphql';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  params: URLSearchParams;
  [key: string]: string | boolean | URLSearchParams; // ie. { color: 'Red', size: 'Large', ... }
};

type ParamsMap = {
  [key: string]: string; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
  stockPurchasable
}: {
  options: ProductFragment['options'];
  variants: ProductFragment['variants']['results'];
  stockPurchasable: boolean;

}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  // Discard any unexpected options or values from url and create params map.
  const variantParamsMap: ParamsMap = Object.fromEntries(
    Array.from(currentParams.entries()).filter(([key, value]) =>
      options.find(
        (option) =>
          option.variant &&
          option.name.toLowerCase() === key &&
          option.values.find((v) => v.name === value)
      )
    )
  );

  // Discard any unexpected options or values from url and create params map.
  const paramsMap: ParamsMap = Object.fromEntries(
    Array.from(currentParams.entries()).filter(([key, value]) =>
      options.find(
        (option) => option.name.toLowerCase() === key && option.values.find((v) => v.name === value)
      )
    )
  );


  const combinations: Combination[] = variants.map((variant) => {
    // Variant stock logic: 
    // - If stockPurchasable is null/undefined, assume available (no inventory management)
    // - If stockPurchasable is true, check variant stock level
    // - If stockPurchasable is false, not available
    const variantAvailable = variant.stockLevel === null || variant.stockLevel > 0;
    const isVariantAvailable = stockPurchasable === null ? true : 
      (stockPurchasable === true ? variantAvailable : false);
    
    const optimized: Combination = {
      id: variant.id,
      availableForSale: isVariantAvailable,
      params: new URLSearchParams()
    };

    // Debug logging for variant stock values
    console.log('Variant Stock Debug:', {
      variantId: variant.id,
      variantName: variant.name,
      stockLevel: variant.stockLevel,
      variantAvailable,
      stockPurchasable,
      isVariantAvailable,
      availableForSale: optimized.availableForSale
    });

    variant.optionValueIds.forEach((selectedOptionValueID) => {
      const selectedOption = options.find((option) =>
        option.values.find((value) => value.id === selectedOptionValueID)
      );
      const selectedOptionValue = selectedOption?.values.find(
        (value) => value.id === selectedOptionValueID
      );

      if (!selectedOption || !selectedOptionValue) return;
      const name = selectedOption.name.toLowerCase();
      if (selectedOptionValue) {
        optimized[name] = selectedOptionValue.name;
        optimized.params.set(name, selectedOptionValue.name);
      }
    });

    return optimized;
  });

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(searchParams.toString());

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value.name);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // In order to determine if an option is available for sale, we need to:
          //
          // 1. Filter out all other param state
          // 2. Filter out invalid options
          // 3. Check if the option combination is available for sale
          //
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.
          const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
            options.find(
              (option) => option.name.toLowerCase() === key && option.values.find((a)=> a.name === value)
            )
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) => combination[key] === value && combination.availableForSale
            )
          );

          // The option is active if it's in the url params.

          const isActive = option.variant
          ? searchParams.get(optionNameLowerCase) === value.name
          : paramsMap[option.name.toLowerCase()] === value.name;

          return (
            <button
              key={value.id}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                {
                  'cursor-default ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                    !isAvailableForSale
                }
              )}
            >
              {value.name}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
