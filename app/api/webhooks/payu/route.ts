import { PaymentProcessor } from 'lib/payment/processor';
import { sendOrderConfirmation, sendOrderUpdate } from 'lib/swell/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txnid, status, amount, productinfo, firstname, email, phone, hash } = body;

    if (!txnid || !status) {
      return NextResponse.json(
        { error: 'Missing required PayU webhook data' },
        { status: 400 }
      );
    }

    const processor = new PaymentProcessor();

    // Verify the payment
    const verificationResult = await processor.verifyPayment('payu', {
      txnId: txnid,
      amount: amount,
      productInfo: productinfo,
      firstName: firstname,
      email: email,
      udf1: txnid, // Assuming order ID is stored in udf1
      udf2: firstname,
      udf3: email,
      udf4: phone,
      udf5: '',
      status: status,
      hash: hash
    });

    if (verificationResult.success) {
      // Send confirmation email
      if (email) {
        await sendOrderConfirmation(txnid, email);
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified successfully' 
      });
    } else {
      // Send failure notification
      if (email) {
        await sendOrderUpdate(txnid, email, 'failed');
      }

      return NextResponse.json({ 
        success: false, 
        error: verificationResult.error 
      }, { status: 400 });
    }

  } catch (error) {
    console.error('PayU webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}


