import { PAYMENT_METHODS, PaymentMethod } from 'lib/payment/config';
import { PaymentProcessor } from 'lib/payment/processor';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, verificationData } = body;

    // Validate required fields
    if (!method || !verificationData) {
      return NextResponse.json(
        { error: 'Missing required verification fields' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!Object.values(PAYMENT_METHODS).includes(method)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    const processor = new PaymentProcessor();
    const result = await processor.verifyPayment(method as PaymentMethod, verificationData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        paymentId: result.paymentId,
        orderId: result.orderId,
        amount: result.amount,
        currency: result.currency,
        status: result.status
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment verification' },
      { status: 500 }
    );
  }
}


