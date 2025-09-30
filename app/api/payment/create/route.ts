import { PAYMENT_METHODS, PaymentMethod } from 'lib/payment/config';
import { PaymentProcessor } from 'lib/payment/processor';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      method, 
      amount, 
      currency = 'INR',
      orderId,
      customerInfo,
      productInfo,
      returnUrls,
      notes = {}
    } = body;

    // Validate required fields
    if (!method || !amount || !orderId || !customerInfo || !productInfo) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
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
    
    const paymentRequest = {
      amount: parseFloat(amount),
      currency,
      orderId,
      customerInfo: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || ''
      },
      productInfo,
      returnUrls: {
        success: returnUrls?.success || `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        failure: returnUrls?.failure || `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`
      },
      notes
    };

    const result = await processor.createPayment(method as PaymentMethod, paymentRequest);

    if (result.success) {
      return NextResponse.json({
        success: true,
        paymentId: result.paymentId,
        orderId: result.orderId,
        amount: result.amount,
        currency: result.currency,
        status: result.status,
        paymentUrl: result.paymentUrl,
        paymentData: result.paymentData
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment creation' },
      { status: 500 }
    );
  }
}


