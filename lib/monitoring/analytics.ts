// Analytics and monitoring utilities for production

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, properties);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, properties);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  }
};

export const trackPurchase = (transactionId: string, value: number, currency: string = 'INR') => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
  });
};

export const trackPaymentInitiated = (paymentMethod: string, amount: number) => {
  trackEvent('payment_initiated', {
    payment_method: paymentMethod,
    value: amount,
    currency: 'INR',
  });
};

export const trackPaymentCompleted = (paymentMethod: string, amount: number, success: boolean) => {
  trackEvent('payment_completed', {
    payment_method: paymentMethod,
    value: amount,
    currency: 'INR',
    success: success,
  });
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  console.error('Error tracked:', error, context);
  
  // Send to error tracking service (e.g., Sentry)
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, {
      tags: {
        context: context || 'unknown',
      },
    });
  }
};


