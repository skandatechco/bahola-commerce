'use client';

import { AlertCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const error = searchParams.get('error') || 'Payment could not be processed';
    setErrorMessage(error);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          {errorMessage}
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700">
              Your payment could not be processed. Please check your payment details and try again.
            </p>
          </div>
        </div>

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

        <div className="mt-6 text-sm text-gray-500">
          <p>Need help? Contact our support team:</p>
          <p className="font-medium">support@baholalabs.com</p>
        </div>
      </div>
    </div>
  );
}


