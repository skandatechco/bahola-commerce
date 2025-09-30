'use client';

import { PAYMENT_METHODS, PaymentMethod } from 'lib/payment/config';
import { CreditCard, Smartphone, Truck } from 'lucide-react';
import { useState } from 'react';

interface PaymentGatewayProps {
  cart: {
    subTotal: number;
    grandTotal: number;
    currency: string;
    items: Array<{
      id: string;
      product: {
        name: string;
      };
      quantity: number;
      price: number;
    }>;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onPaymentSuccess: (paymentDetails: any) => void;
  onPaymentError: (error: string) => void;
}

export function PaymentGateway({ 
  cart, 
  customerInfo, 
  onPaymentSuccess, 
  onPaymentError 
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PAYMENT_METHODS.RAZORPAY);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: PAYMENT_METHODS.RAZORPAY,
      name: 'Razorpay',
      description: 'Credit/Debit Cards, UPI, Net Banking',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      id: PAYMENT_METHODS.PAYU,
      name: 'PayU',
      description: 'Credit/Debit Cards, UPI, Wallets',
      icon: Smartphone,
      color: 'text-green-600'
    },
    {
      id: PAYMENT_METHODS.COD,
      name: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: Truck,
      color: 'text-orange-600'
    }
  ];

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      onPaymentError('Please fill in all customer details');
      return;
    }

    setIsProcessing(true);

    try {
      const productInfo = cart.items.map(item => 
        `${item.product.name} (Qty: ${item.quantity})`
      ).join(', ');

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: selectedMethod,
          amount: cart.grandTotal,
          currency: cart.currency,
          orderId: `ORDER_${Date.now()}`,
          customerInfo,
          productInfo,
          returnUrls: {
            success: `${window.location.origin}/payment/success`,
            failure: `${window.location.origin}/payment/failure`
          },
          notes: {
            source: 'bahola-commerce',
            cart_items: cart.items.length
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        if (selectedMethod === PAYMENT_METHODS.COD) {
          // COD doesn't need external payment processing
          onPaymentSuccess(result);
        } else {
          // Redirect to payment gateway
          if (selectedMethod === PAYMENT_METHODS.RAZORPAY) {
            await handleRazorpayPayment(result.paymentData);
          } else if (selectedMethod === PAYMENT_METHODS.PAYU) {
            await handlePayUPayment(result.paymentData);
          }
        }
      } else {
        onPaymentError(result.error || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpayPayment = async (paymentData: any) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          ...paymentData,
          handler: function (response: any) {
            onPaymentSuccess({
              ...response,
              method: 'razorpay'
            });
            resolve(response);
          },
          modal: {
            ondismiss: function () {
              onPaymentError('Payment cancelled by user');
              reject(new Error('Payment cancelled'));
            }
          }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      script.onerror = () => {
        onPaymentError('Failed to load Razorpay');
        reject(new Error('Failed to load Razorpay'));
      };
      document.body.appendChild(script);
    });
  };

  const handlePayUPayment = async (paymentData: any) => {
    // Create a form and submit to PayU
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paymentData.paymentUrl || 'https://test.payu.in/_payment';

    Object.keys(paymentData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <label
              key={method.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(e) => setSelectedMethod(e.target.value as PaymentMethod)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${method.color}`} />
                <div>
                  <div className="font-medium text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">{method.description}</div>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{cart.grandTotal.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay ₹${cart.grandTotal.toFixed(2)}`
          )}
        </button>

        <p className="text-xs text-gray-500 mt-2 text-center">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}


