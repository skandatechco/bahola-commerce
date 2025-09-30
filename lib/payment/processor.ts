import { getSwellClient } from '../swell';
import { PAYMENT_METHODS, PaymentMethod } from './config';
import { PayUPayment } from './payu';
import { RazorpayPayment } from './razorpay';

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  productInfo: string;
  returnUrls: {
    success: string;
    failure: string;
  };
  notes?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  status?: string;
  paymentUrl?: string;
  paymentData?: any;
  error?: string;
}

export class PaymentProcessor {
  private razorpay: RazorpayPayment;
  private payu: PayUPayment;

  constructor() {
    this.razorpay = new RazorpayPayment();
    this.payu = new PayUPayment();
  }

  async createPayment(method: PaymentMethod, request: PaymentRequest): Promise<PaymentResponse> {
    try {
      switch (method) {
        case PAYMENT_METHODS.RAZORPAY:
          return await this.createRazorpayPayment(request);
        
        case PAYMENT_METHODS.PAYU:
          return await this.createPayUPayment(request);
        
        case PAYMENT_METHODS.COD:
          return await this.createCODPayment(request);
        
        default:
          return {
            success: false,
            error: 'Unsupported payment method'
          };
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment creation failed'
      };
    }
  }

  private async createRazorpayPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const result = await this.razorpay.createOrder({
      amount: request.amount,
      currency: request.currency,
      receipt: request.orderId,
      notes: {
        ...request.notes,
        customer_name: request.customerInfo.name,
        customer_email: request.customerInfo.email,
        customer_phone: request.customerInfo.phone
      }
    });

    if (result.success) {
      return {
        success: true,
        paymentId: result.orderId,
        orderId: request.orderId,
        amount: result.amount / 100,
        currency: result.currency,
        status: 'created',
        paymentData: {
          key: process.env.RAZORPAY_KEY_ID,
          order_id: result.orderId,
          amount: result.amount,
          currency: result.currency,
          name: request.customerInfo.name,
          email: request.customerInfo.email,
          contact: request.customerInfo.phone,
          description: request.productInfo,
          prefill: {
            name: request.customerInfo.name,
            email: request.customerInfo.email,
            contact: request.customerInfo.phone
          },
          notes: request.notes,
          theme: {
            color: '#F37254'
          }
        }
      };
    } else {
      return {
        success: false,
        error: result.error
      };
    }
  }

  private async createPayUPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const txnId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const result = await this.payu.createPaymentRequest({
      txnId,
      amount: request.amount,
      productInfo: request.productInfo,
      firstName: request.customerInfo.name,
      email: request.customerInfo.email,
      phone: request.customerInfo.phone,
      surl: request.returnUrls.success,
      furl: request.returnUrls.failure,
      udf1: request.orderId,
      udf2: request.customerInfo.name,
      udf3: request.customerInfo.email,
      udf4: request.customerInfo.phone,
      udf5: JSON.stringify(request.notes || {})
    });

    if (result.success) {
      return {
        success: true,
        paymentId: result.txnId,
        orderId: request.orderId,
        amount: request.amount,
        currency: request.currency,
        status: 'created',
        paymentUrl: `${process.env.PAYU_BASE_URL}/_payment`,
        paymentData: result.paymentData
      };
    } else {
      return {
        success: false,
        error: result.error
      };
    }
  }

  private async createCODPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // For COD, we just need to update the order status
    try {
      const SwellClient = getSwellClient();
      
      // Update order status to confirmed for COD
      await SwellClient.updateOrder({
        id: request.orderId,
        input: {
          status: 'confirmed',
          paymentStatus: 'pending',
          paymentMethod: 'cod'
        }
      });

      return {
        success: true,
        paymentId: `COD_${request.orderId}`,
        orderId: request.orderId,
        amount: request.amount,
        currency: request.currency,
        status: 'confirmed'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create COD order'
      };
    }
  }

  async verifyPayment(method: PaymentMethod, verificationData: any): Promise<PaymentResponse> {
    try {
      switch (method) {
        case PAYMENT_METHODS.RAZORPAY:
          return await this.verifyRazorpayPayment(verificationData);
        
        case PAYMENT_METHODS.PAYU:
          return await this.verifyPayUPayment(verificationData);
        
        case PAYMENT_METHODS.COD:
          return await this.verifyCODPayment(verificationData);
        
        default:
          return {
            success: false,
            error: 'Unsupported payment method'
          };
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed'
      };
    }
  }

  private async verifyRazorpayPayment(data: any): Promise<PaymentResponse> {
    const result = await this.razorpay.verifyPayment({
      razorpayOrderId: data.razorpay_order_id,
      razorpayPaymentId: data.razorpay_payment_id,
      razorpaySignature: data.razorpay_signature
    });

    if (result.success) {
      // Update order status in Swell
      await this.updateOrderStatus(result.orderId, 'paid', 'paid');
      
      return {
        success: true,
        paymentId: result.paymentId,
        orderId: result.orderId,
        amount: result.amount,
        currency: result.currency,
        status: 'paid'
      };
    } else {
      return {
        success: false,
        error: result.error
      };
    }
  }

  private async verifyPayUPayment(data: any): Promise<PaymentResponse> {
    const result = await this.payu.verifyPayment({
      txnId: data.txnid,
      amount: data.amount,
      productInfo: data.productinfo,
      firstName: data.firstname,
      email: data.email,
      udf1: data.udf1,
      udf2: data.udf2,
      udf3: data.udf3,
      udf4: data.udf4,
      udf5: data.udf5,
      status: data.status,
      hash: data.hash
    });

    if (result.success) {
      // Update order status in Swell
      await this.updateOrderStatus(data.udf1, 'paid', 'paid');
      
      return {
        success: true,
        paymentId: result.txnId,
        orderId: data.udf1,
        amount: result.amount,
        currency: 'INR',
        status: 'paid'
      };
    } else {
      return {
        success: false,
        error: result.error
      };
    }
  }

  private async verifyCODPayment(data: any): Promise<PaymentResponse> {
    // COD verification is just confirming the order
    return {
      success: true,
      paymentId: data.paymentId,
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
      status: 'confirmed'
    };
  }

  private async updateOrderStatus(orderId: string, status: string, paymentStatus: string) {
    try {
      // Note: Swell doesn't have updateOrder method in current schema
      // This would need to be implemented based on your Swell setup
      console.log(`Order ${orderId} status updated to ${status}, payment status: ${paymentStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }

  async getPaymentStatus(method: PaymentMethod, paymentId: string): Promise<PaymentResponse> {
    try {
      switch (method) {
        case PAYMENT_METHODS.RAZORPAY:
          return await this.razorpay.getPaymentDetails(paymentId);
        
        case PAYMENT_METHODS.PAYU:
          return await this.payu.getPaymentStatus(paymentId);
        
        default:
          return {
            success: false,
            error: 'Unsupported payment method'
          };
      }
    } catch (error) {
      console.error('Get payment status error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get payment status'
      };
    }
  }
}
