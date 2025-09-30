# 🏥 Bahola Commerce - Homeopathic E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.0.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC)](https://tailwindcss.com/)
[![Swell](https://img.shields.io/badge/Swell-Integration-purple)](https://swell.is/)

A modern, full-featured e-commerce platform built for Bahola Labs, specializing in homeopathic remedies and natural health solutions. Built with Next.js 14, TypeScript, and integrated with Swell for seamless e-commerce functionality.

## 🌟 Features

### 🛒 **Core E-commerce**
- **Product Catalog** - Browse homeopathic remedies, dilutions, and natural health products
- **Advanced Search** - Search by product name, condition, or category
- **Category Navigation** - Organized by Mother Tinctures, Dilutions, Biochemics, and more
- **Product Variants** - Support for different potencies and dilutions
- **Shopping Cart** - Full cart functionality with quantity management
- **Responsive Design** - Mobile-first approach with beautiful UI

### 💳 **Payment Integration**
- **Dual Payment Gateways** - Razorpay & PayU integration
- **Cash on Delivery** - COD option for Indian customers
- **Secure Processing** - PCI-compliant payment handling
- **Webhook Support** - Real-time payment status updates
- **Multi-currency** - Support for INR and other currencies

### 🏠 **Specialized Features**
- **Dilutions Layout** - Custom product pages for homeopathic dilutions
- **Consultation Booking** - Online and in-person consultation scheduling
- **Health Conditions** - Browse remedies by health concerns
- **Doctor Resources** - Specialized section for healthcare professionals
- **Bach Flower Remedies** - Dedicated section for Bach flower products

### 🔧 **Technical Features**
- **Next.js 14** - Latest App Router with Server Components
- **TypeScript** - Full type safety throughout the application
- **GraphQL Integration** - Efficient data fetching with Swell
- **Performance Optimized** - Lazy loading, image optimization, caching
- **SEO Ready** - Meta tags, structured data, sitemaps
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Swell store account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/skandatechco/bahola-commerce.git
   cd bahola-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Swell Configuration
   SWELL_STORE_ID=your_store_id
   SWELL_PUBLIC_KEY=your_public_key
   SWELL_REVALIDATION_SECRET=your_secret
   
   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   
   # PayU Configuration
   PAYU_MERCHANT_ID=your_merchant_id
   PAYU_MERCHANT_KEY=your_merchant_key
   PAYU_MERCHANT_SALT=your_merchant_salt
   PAYU_AUTH_HEADER=your_auth_header
   PAYU_BASE_URL=https://test.payu.in
   
   # Application Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Generate GraphQL types**
   ```bash
   npm run codegen
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bahola-commerce/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── payment/             # Payment processing
│   │   ├── webhooks/            # Payment webhooks
│   │   └── checkout/            # Checkout flow
│   ├── category/                # Category pages
│   ├── product/                 # Product pages
│   ├── search/                  # Search functionality
│   └── payment/                 # Payment success/failure pages
├── components/                   # React components
│   ├── cart/                    # Shopping cart components
│   ├── header/                  # Navigation and header
│   ├── product/                 # Product-specific components
│   ├── payment/                 # Payment gateway components
│   └── heavy/                   # Lazy-loaded components
├── lib/                         # Utility libraries
│   ├── swell/                   # Swell integration
│   ├── payment/                 # Payment processing
│   └── utils.ts                 # Helper functions
└── public/                      # Static assets
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run codegen      # Generate GraphQL types
```

### Debug Pages

The project includes several debug pages for development:

- `/debug-products` - View all products in a category
- `/debug-variant-prices` - Debug product variant pricing
- `/debug-product` - Individual product debugging

## 💳 Payment Integration

This project includes comprehensive payment integration with:

### Supported Payment Methods
- **Razorpay** - Credit/Debit cards, UPI, Net Banking, Wallets
- **PayU** - Credit/Debit cards, UPI, Wallets, EMI
- **Cash on Delivery** - Pay when order arrives

### Payment Flow
1. User selects payment method
2. Payment order is created
3. User completes payment
4. Payment is verified via webhook
5. Order status is updated
6. Confirmation email is sent

For detailed payment integration documentation, see [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md).

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **React Server Components** for optimal performance
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Headless UI** for accessible components

### Backend
- **Swell** for e-commerce backend
- **GraphQL** for efficient data fetching
- **Server Actions** for mutations
- **Edge Runtime** for optimal performance

### Payment Processing
- **Razorpay SDK** for payment processing
- **PayU Integration** for alternative payments
- **Webhook handling** for payment verification
- **Secure token management**

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Configure environment variables

### Docker
```bash
docker build -t bahola-commerce .
docker run -p 3000:3000 bahola-commerce
```

## 🔧 Configuration

### Swell Setup
1. Create a Swell store
2. Get your Store ID and Public Key
3. Set up webhooks for real-time updates
4. Configure payment methods

### Payment Gateway Setup
1. **Razorpay**: Create account and get API keys
2. **PayU**: Set up merchant account
3. Configure webhook endpoints
4. Test with sandbox credentials

## 📊 Current Status

### ✅ Completed Features
- [x] Product catalog and search
- [x] Shopping cart functionality
- [x] Payment integration (Razorpay & PayU)
- [x] Category navigation
- [x] Product variants and pricing
- [x] Responsive design
- [x] SEO optimization
- [x] Error handling

### 🚧 In Progress
- [ ] User authentication
- [ ] Checkout flow completion
- [ ] Order management
- [ ] Email notifications

### 📋 Planned Features
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Bahola Labs. All rights reserved.

## 🆘 Support

For support and questions:
- **Email**: support@baholalabs.com
- **Documentation**: [PAYMENT_INTEGRATION.md](./PAYMENT_INTEGRATION.md)
- **Issues**: [GitHub Issues](https://github.com/skandatechco/bahola-commerce/issues)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- E-commerce powered by [Swell](https://swell.is/)
- Payment processing by [Razorpay](https://razorpay.com/) and [PayU](https://payu.in/)
- UI components by [Headless UI](https://headlessui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Built with ❤️ for Bahola Labs - Trusted homeopathy since 1939**