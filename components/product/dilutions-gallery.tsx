'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function DilutionsGallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <div className="space-y-6">
      {/* Hero Image - Above the fold */}
      <div className="relative">
        {/* Desktop: 45% width, Mobile: 65% height */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 lg:aspect-square lg:max-h-[600px] h-[65vh] lg:h-auto">
          {images[imageIndex] && (
            <Image
              className="h-full w-full object-contain p-4"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={images[imageIndex]?.altText as string}
              src={images[imageIndex]?.src as string}
              priority={true}
            />
          )}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform">
              <div className="flex h-12 items-center rounded-full border border-white bg-white/90 text-neutral-700 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-300">
                <Link
                  aria-label="Previous product image"
                  href={previousUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowLeftIcon className="h-5" />
                </Link>
                <div className="mx-1 h-6 w-px bg-neutral-300 dark:bg-neutral-600"></div>
                <Link
                  aria-label="Next product image"
                  href={nextUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowRightIcon className="h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur">
            {imageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - 4-6 supporting images */}
      {images.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Additional Views
          </h3>
          
          {/* Thumbnail grid - responsive layout */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {images.map((image, index) => {
              const isActive = index === imageIndex;
              const imageSearchParams = new URLSearchParams(searchParams.toString());
              imageSearchParams.set('image', index.toString());

              // Determine image type for better organization
              const getImageType = (index: number) => {
                if (index === 0) return 'Front Label';
                if (index === 1) return 'Back Label';
                if (index === 2) return 'Lifestyle';
                if (index === 3) return 'Process';
                if (index === 4) return 'Pack Shot';
                return `View ${index + 1}`;
              };

              return (
                <div key={image.src} className="group relative">
                  <Link
                    aria-label={`View ${getImageType(index)}`}
                    href={createUrl(pathname, imageSearchParams)}
                    scroll={false}
                    className="block"
                  >
                    <div className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                      isActive 
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                        : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                    }`}>
                      <Image
                        alt={image.altText}
                        src={image.src}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      
                      {/* Overlay with image type */}
                      <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/20">
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {getImageType(index)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white dark:ring-neutral-900"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image descriptions for better UX */}
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            <p>Click thumbnails to view: Front label, back label, lifestyle shots, and packaging details</p>
          </div>
        </div>
      )}

      {/* Zoom functionality hint */}
      <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          💡 <strong>Tip:</strong> Click and drag to zoom in on bottle labels for detailed ingredient information
        </p>
      </div>
    </div>
  );
}
