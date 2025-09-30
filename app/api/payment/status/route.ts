import { PAYMENT_METHODS, PaymentMethod } from 'lib/payment/config';
import { PaymentProcessor } from 'lib/payment/processor';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const method = searchParams.get('method');
    const paymentId = searchParams.get('paymentId');

    // Validate required fields
    if (!method || !paymentId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (!Object.values(PAYMENT_METHODS).includes(method as PaymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    const processor = new PaymentProcessor();
    const result = await processor.getPaymentStatus(method as PaymentMethod, paymentId);

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
    console.error('Get payment status error:', error);
    return NextResponse.json(
      { error: 'Internal server error while getting payment status' },
      { status: 500 }
    );
  }
}


