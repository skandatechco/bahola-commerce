// Performance optimization utilities

export const optimizeImages = {
  // Image optimization settings
  quality: 80,
  formats: ['image/webp', 'image/avif'],
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/Inter-Bold.ttf';
    fontLink.as = 'font';
    fontLink.type = 'font/ttf';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  }
};

export const lazyLoadImages = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

export const optimizeBundle = {
  // Bundle optimization settings
  chunkSizeWarningLimit: 1000,
  maxChunks: 5,
};


