'use client';

import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const orderId = searchParams.get('order_id');
        const method = searchParams.get('method');

        if (!paymentId || !orderId || !method) {
          setPaymentStatus('failed');
          return;
        }

        // Verify payment with backend
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method,
            verificationData: {
              razorpay_order_id: searchParams.get('razorpay_order_id'),
              razorpay_payment_id: searchParams.get('razorpay_payment_id'),
              razorpay_signature: searchParams.get('razorpay_signature'),
              txnid: searchParams.get('txnid'),
              amount: searchParams.get('amount'),
              productinfo: searchParams.get('productinfo'),
              firstname: searchParams.get('firstname'),
              email: searchParams.get('email'),
              phone: searchParams.get('phone'),
              udf1: searchParams.get('udf1'),
              udf2: searchParams.get('udf2'),
              udf3: searchParams.get('udf3'),
              udf4: searchParams.get('udf4'),
              udf5: searchParams.get('udf5'),
              status: searchParams.get('status'),
              hash: searchParams.get('hash')
            }
          })
        });

        const result = await response.json();

        if (result.success) {
          setPaymentStatus('success');
          setPaymentDetails(result);
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and you will receive a confirmation email shortly.
          </p>
          
          {paymentDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Order ID:</span> {paymentDetails.orderId}</p>
                <p><span className="font-medium">Payment ID:</span> {paymentDetails.paymentId}</p>
                <p><span className="font-medium">Amount:</span> ₹{paymentDetails.amount}</p>
                <p><span className="font-medium">Status:</span> {paymentDetails.status}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/orders"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but your payment could not be processed. Please try again or contact support if the problem persists.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/cart"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors inline-block"
            >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}


