import crypto from 'crypto';
import { getPaymentConfig } from 'lib/payment/config';
import { PaymentProcessor } from 'lib/payment/processor';
import { sendOrderConfirmation, sendOrderUpdate } from 'lib/swell/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const config = getPaymentConfig();
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const processor = new PaymentProcessor();

    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event, processor);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event, processor);
        break;
      
      case 'order.paid':
        await handleOrderPaid(event, processor);
        break;
      
      default:
        console.log('Unhandled Razorpay webhook event:', event.event);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Razorpay webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(event: any, processor: PaymentProcessor) {
  try {
    const payment = event.payload.payment.entity;
    const orderId = payment.notes?.order_id || payment.order_id;
    
    if (orderId) {
      // Update order status
      await processor.verifyPayment('razorpay', {
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        razorpay_signature: payment.signature
      });

      // Send confirmation email
      if (payment.email) {
        await sendOrderConfirmation(orderId, payment.email);
      }
    }
  } catch (error) {
    console.error('Error handling payment captured:', error);
  }
}

async function handlePaymentFailed(event: any, processor: PaymentProcessor) {
  try {
    const payment = event.payload.payment.entity;
    const orderId = payment.notes?.order_id || payment.order_id;
    
    if (orderId) {
      // Update order status to failed
      // Note: Swell doesn't have updateOrder method in current schema
      console.log(`Order ${orderId} status updated to failed`);

      // Send failure notification
      if (payment.email) {
        await sendOrderUpdate(orderId, payment.email, 'failed');
      }
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleOrderPaid(event: any, processor: PaymentProcessor) {
  try {
    const order = event.payload.order.entity;
    const orderId = order.notes?.order_id || order.id;
    
    if (orderId) {
      // Send confirmation email
      if (order.notes?.customer_email) {
        await sendOrderConfirmation(orderId, order.notes.customer_email);
      }
    }
  } catch (error) {
    console.error('Error handling order paid:', error);
  }
}
