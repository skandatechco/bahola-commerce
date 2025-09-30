import crypto from 'crypto';
import { getPaymentConfig } from './config';

const config = getPaymentConfig();

export class PayUPayment {
  private merchantId: string;
  private merchantKey: string;
  private merchantSalt: string;
  private authHeader: string;
  private baseUrl: string;

  constructor() {
    this.merchantId = config.payu.merchantId;
    this.merchantKey = config.payu.merchantKey;
    this.merchantSalt = config.payu.merchantSalt;
    this.authHeader = config.payu.authHeader;
    this.baseUrl = config.payu.baseUrl;
  }

  generateHash(data: string): string {
    return crypto
      .createHash('sha512')
      .update(data)
      .digest('hex')
      .toLowerCase();
  }

  async createPaymentRequest({
    txnId,
    amount,
    productInfo,
    firstName,
    email,
    phone,
    surl,
    furl,
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = ''
  }: {
    txnId: string;
    amount: number;
    productInfo: string;
    firstName: string;
    email: string;
    phone: string;
    surl: string;
    furl: string;
    udf1?: string;
    udf2?: string;
    udf3?: string;
    udf4?: string;
    udf5?: string;
  }) {
    try {
      const hashString = `${this.merchantKey}|${txnId}|${amount}|${productInfo}|${firstName}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${this.merchantSalt}`;
      const hash = this.generateHash(hashString);

      const paymentData = {
        key: this.merchantKey,
        txnid: txnId,
        amount: amount.toString(),
        productinfo: productInfo,
        firstname: firstName,
        email: email,
        phone: phone,
        surl: surl,
        furl: furl,
        hash: hash,
        udf1: udf1,
        udf2: udf2,
        udf3: udf3,
        udf4: udf4,
        udf5: udf5,
        service_provider: 'payu_paisa'
      };

      return {
        success: true,
        paymentData,
        hash,
        txnId
      };
    } catch (error) {
      console.error('PayU payment request creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create PayU payment request'
      };
    }
  }

  async verifyPayment({
    txnId,
    amount,
    productInfo,
    firstName,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    status,
    hash
  }: {
    txnId: string;
    amount: string;
    productInfo: string;
    firstName: string;
    email: string;
    udf1: string;
    udf2: string;
    udf3: string;
    udf4: string;
    udf5: string;
    status: string;
    hash: string;
  }) {
    try {
      const hashString = `${this.merchantSalt}|${status}||||||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstName}|${productInfo}|${amount}|${txnId}|${this.merchantKey}`;
      const calculatedHash = this.generateHash(hashString);

      const isAuthentic = calculatedHash === hash.toLowerCase();

      if (isAuthentic && status === 'success') {
        return {
          success: true,
          txnId,
          amount: parseFloat(amount),
          status: 'success',
          verified: true
        };
      } else {
        return {
          success: false,
          error: 'Invalid payment signature or failed status',
          status: status || 'failed'
        };
      }
    } catch (error) {
      console.error('PayU payment verification error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed'
      };
    }
  }

  async getPaymentStatus(txnId: string) {
    try {
      const hashString = `${this.merchantKey}|status|${txnId}|${this.merchantSalt}`;
      const hash = this.generateHash(hashString);

      const response = await fetch(`${this.baseUrl}/merchant/postservice.php?form=2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.authHeader
        },
        body: new URLSearchParams({
          key: this.merchantKey,
          command: 'verify_payment',
          hash: hash,
          var1: txnId
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        return {
          success: true,
          txnId: data.txnid,
          amount: parseFloat(data.amount),
          status: data.status,
          productInfo: data.productinfo,
          firstName: data.firstname,
          email: data.email,
          phone: data.phone,
          createdAt: data.addedon
        };
      } else {
        return {
          success: false,
          error: data.msg || 'Failed to get payment status'
        };
      }
    } catch (error) {
      console.error('PayU get payment status error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get payment status'
      };
    }
  }

  async refundPayment({
    txnId,
    amount,
    refundType = 'FULL'
  }: {
    txnId: string;
    amount: number;
    refundType?: 'FULL' | 'PARTIAL';
  }) {
    try {
      const hashString = `${this.merchantKey}|${txnId}|${amount}|${refundType}|${this.merchantSalt}`;
      const hash = this.generateHash(hashString);

      const response = await fetch(`${this.baseUrl}/merchant/postservice.php?form=2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.authHeader
        },
        body: new URLSearchParams({
          key: this.merchantKey,
          command: 'cancel_refund_transaction',
          hash: hash,
          var1: txnId,
          var2: amount.toString(),
          var3: refundType
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        return {
          success: true,
          refundId: data.refund_id,
          amount: parseFloat(data.amount),
          status: data.status,
          message: data.msg
        };
      } else {
        return {
          success: false,
          error: data.msg || 'Refund failed'
        };
      }
    } catch (error) {
      console.error('PayU refund error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Refund failed'
      };
    }
  }
}


