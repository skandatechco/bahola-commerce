# Payment Gateway Integration - Razorpay & PayU

This document outlines the complete payment gateway integration for Bahola Labs e-commerce store using Razorpay and PayU payment gateways.

## 🚀 Features Implemented

### ✅ Payment Gateways
- **Razorpay**: Credit/Debit Cards, UPI, Net Banking, Wallets
- **PayU**: Credit/Debit Cards, UPI, Wallets, EMI
- **Cash on Delivery (COD)**: Pay when order arrives

### ✅ Core Functionality
- Payment order creation
- Payment verification
- Webhook handling
- Payment status tracking
- Refund processing
- Email notifications

## 📁 File Structure

```
lib/payment/
├── config.ts              # Payment configuration
├── razorpay.ts            # Razorpay payment processor
├── payu.ts                # PayU payment processor
└── processor.ts           # Unified payment processor

app/api/payment/
├── create/route.ts        # Create payment order
├── verify/route.ts        # Verify payment
└── status/route.ts        # Get payment status

app/api/webhooks/
├── razorpay/route.ts      # Razorpay webhook handler
└── payu/route.ts          # PayU webhook handler

app/payment/
├── success/page.tsx       # Payment success page
└── failure/page.tsx       # Payment failure page

components/payment/
└── payment-gateway.tsx    # Payment UI component
```

## 🔧 Environment Variables

Add these to your `.env.local` file:

```env
# Swell Configuration
SWELL_STORE_ID=baholalabs
SWELL_PUBLIC_KEY=your_swell_public_key
SWELL_REVALIDATION_SECRET=your_swell_revalidation_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# PayU Configuration
PAYU_MERCHANT_ID=your_payu_merchant_id
PAYU_MERCHANT_KEY=your_payu_merchant_key
PAYU_MERCHANT_SALT=your_payu_merchant_salt
PAYU_AUTH_HEADER=your_payu_auth_header
PAYU_BASE_URL=https://test.payu.in

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🛠️ Setup Instructions

### 1. Razorpay Setup
1. Create account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your API keys from Settings > API Keys
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/razorpay`
4. Configure webhook events: `payment.captured`, `payment.failed`, `order.paid`

### 2. PayU Setup
1. Create account at [PayU Dashboard](https://dashboard.payu.in/)
2. Get your merchant credentials
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/payu`
4. Configure return URLs for success/failure

### 3. Swell Integration
1. Ensure your Swell store is configured with `baholalabs`
2. Set up order status tracking
3. Configure email templates for order confirmations

## 💻 Usage Examples

### Creating a Payment

```typescript
import { PaymentProcessor } from 'lib/payment/processor';
import { PAYMENT_METHODS } from 'lib/payment/config';

const processor = new PaymentProcessor();

const paymentRequest = {
  amount: 1000,
  currency: 'INR',
  orderId: 'ORDER_123',
  customerInfo: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210'
  },
  productInfo: 'Bahola Dilutions - Aconite 30C',
  returnUrls: {
    success: 'https://yourdomain.com/payment/success',
    failure: 'https://yourdomain.com/payment/failure'
  }
};

const result = await processor.createPayment(PAYMENT_METHODS.RAZORPAY, paymentRequest);
```

### Verifying Payment

```typescript
const verificationData = {
  razorpay_order_id: 'order_123',
  razorpay_payment_id: 'pay_456',
  razorpay_signature: 'signature_789'
};

const result = await processor.verifyPayment(PAYMENT_METHODS.RAZORPAY, verificationData);
```

### Using Payment Component

```tsx
import { PaymentGateway } from 'components/payment/payment-gateway';

<PaymentGateway
  cart={cartData}
  customerInfo={customerInfo}
  onPaymentSuccess={(details) => console.log('Payment successful:', details)}
  onPaymentError={(error) => console.error('Payment failed:', error)}
/>
```

## 🔄 Payment Flow

### 1. Razorpay Flow
1. User selects Razorpay payment
2. Create order via `/api/payment/create`
3. Redirect to Razorpay checkout
4. User completes payment
5. Razorpay redirects to success/failure page
6. Verify payment via `/api/payment/verify`
7. Update order status in Swell
8. Send confirmation email

### 2. PayU Flow
1. User selects PayU payment
2. Create payment request via `/api/payment/create`
3. Submit form to PayU gateway
4. User completes payment
5. PayU redirects to success/failure page
6. Verify payment via webhook
7. Update order status in Swell
8. Send confirmation email

### 3. COD Flow
1. User selects COD payment
2. Create order with pending status
3. Confirm order immediately
4. Send confirmation email
5. Process payment on delivery

## 📊 API Endpoints

### Payment Creation
```
POST /api/payment/create
Content-Type: application/json

{
  "method": "razorpay",
  "amount": 1000,
  "currency": "INR",
  "orderId": "ORDER_123",
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210"
  },
  "productInfo": "Product description",
  "returnUrls": {
    "success": "https://yourdomain.com/payment/success",
    "failure": "https://yourdomain.com/payment/failure"
  }
}
```

### Payment Verification
```
POST /api/payment/verify
Content-Type: application/json

{
  "method": "razorpay",
  "verificationData": {
    "razorpay_order_id": "order_123",
    "razorpay_payment_id": "pay_456",
    "razorpay_signature": "signature_789"
  }
}
```

### Payment Status
```
GET /api/payment/status?method=razorpay&paymentId=pay_456
```

## 🔐 Security Features

- **Signature Verification**: All webhooks are verified using HMAC signatures
- **HTTPS Only**: All payment communications use HTTPS
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: All inputs are validated before processing
- **Error Handling**: Comprehensive error handling and logging

## 📧 Email Notifications

The system automatically sends emails for:
- Order confirmation
- Payment success
- Payment failure
- Order status updates

## 🐛 Testing

### Test Cards (Razorpay)
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test Cards (PayU)
- **Success**: 5123 4567 8901 2346
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🚨 Troubleshooting

### Common Issues

1. **Payment Creation Fails**
   - Check environment variables
   - Verify API keys
   - Check network connectivity

2. **Payment Verification Fails**
   - Verify webhook signatures
   - Check payment data format
   - Ensure proper error handling

3. **Webhook Not Received**
   - Check webhook URL configuration
   - Verify HTTPS setup
   - Check firewall settings

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📈 Monitoring

Monitor payment success rates and failures through:
- Swell dashboard analytics
- Payment gateway dashboards
- Application logs
- Email notifications

## 🔄 Maintenance

Regular maintenance tasks:
- Update payment gateway SDKs
- Monitor webhook endpoints
- Review security configurations
- Update test credentials
- Monitor transaction logs

## 📞 Support

For payment-related issues:
- Razorpay Support: support@razorpay.com
- PayU Support: support@payu.in
- Bahola Labs: support@baholalabs.com

---

**Note**: This integration is designed specifically for the Bahola Labs Swell store and includes all necessary security measures and error handling for production use.
