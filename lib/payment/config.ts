export interface PaymentConfig {
  razorpay: {
    keyId: string;
    keySecret: string;
    webhookSecret: string;
  };
  payu: {
    merchantId: string;
    merchantKey: string;
    merchantSalt: string;
    authHeader: string;
    baseUrl: string;
  };
}

export const getPaymentConfig = (): PaymentConfig => {
  return {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      keySecret: process.env.RAZORPAY_KEY_SECRET || '',
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || ''
    },
    payu: {
      merchantId: process.env.PAYU_MERCHANT_ID || '',
      merchantKey: process.env.PAYU_MERCHANT_KEY || '',
      merchantSalt: process.env.PAYU_MERCHANT_SALT || '',
      authHeader: process.env.PAYU_AUTH_HEADER || '',
      baseUrl: process.env.PAYU_BASE_URL || 'https://test.payu.in'
    }
  };
};

export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  PAYU: 'payu',
  COD: 'cod'
} as const;

export type PaymentMethod = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];


