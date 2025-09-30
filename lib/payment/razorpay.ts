import crypto from 'crypto';
import Razorpay from 'razorpay';
import { getPaymentConfig } from './config';

const config = getPaymentConfig();

export class RazorpayPayment {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret
    });
  }

  async createOrder({
    amount,
    currency = 'INR',
    receipt,
    notes = {}
  }: {
    amount: number;
    currency?: string;
    receipt: string;
    notes?: Record<string, any>;
  }) {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt,
        notes: {
          ...notes,
          source: 'bahola-commerce'
        }
      };

      const order = await this.razorpay.orders.create(options);
      
      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        createdAt: order.created_at
      };
    } catch (error) {
      console.error('Razorpay order creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create Razorpay order'
      };
    }
  }

  async verifyPayment({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature
  }: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', config.razorpay.keySecret)
        .update(body.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === razorpaySignature;

      if (isAuthentic) {
        // Fetch payment details from Razorpay
        const payment = await this.razorpay.payments.fetch(razorpayPaymentId);
        
        return {
          success: true,
          paymentId: payment.id,
          orderId: payment.order_id,
          amount: payment.amount / 100, // Convert from paise to rupees
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          captured: payment.captured,
          createdAt: payment.created_at
        };
      } else {
        return {
          success: false,
          error: 'Invalid payment signature'
        };
      }
    } catch (error) {
      console.error('Razorpay payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed'
      };
    }
  }

  async capturePayment(paymentId: string, amount: number) {
    try {
      const payment = await this.razorpay.payments.capture(paymentId, amount * 100);
      
      return {
        success: true,
        paymentId: payment.id,
        captured: payment.captured,
        amount: payment.amount / 100
      };
    } catch (error) {
      console.error('Razorpay payment capture error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment capture failed'
      };
    }
  }

  async refundPayment({
    paymentId,
    amount,
    notes = {}
  }: {
    paymentId: string;
    amount: number;
    notes?: Record<string, any>;
  }) {
    try {
      const refund = await this.razorpay.payments.refund(paymentId, {
        amount: amount * 100, // Convert to paise
        notes: {
          ...notes,
          reason: 'requested_by_customer'
        }
      });

      return {
        success: true,
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        createdAt: refund.created_at
      };
    } catch (error) {
      console.error('Razorpay refund error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Refund failed'
      };
    }
  }

  async getPaymentDetails(paymentId: string) {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      
      return {
        success: true,
        paymentId: payment.id,
        orderId: payment.order_id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        captured: payment.captured,
        createdAt: payment.created_at
      };
    } catch (error) {
      console.error('Razorpay get payment details error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch payment details'
      };
    }
  }
}


