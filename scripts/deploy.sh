#!/bin/bash

# Production Deployment Script for Bahola Labs E-commerce Store

echo "🚀 Starting deployment process..."

# Check if all required environment variables are set
required_vars=(
  "SWELL_STORE_ID"
  "SWELL_PUBLIC_KEY"
  "SWELL_REVALIDATION_SECRET"
  "RAZORPAY_KEY_ID"
  "RAZORPAY_KEY_SECRET"
  "RAZORPAY_WEBHOOK_SECRET"
  "PAYU_MERCHANT_ID"
  "PAYU_MERCHANT_KEY"
  "PAYU_MERCHANT_SALT"
  "PAYU_AUTH_HEADER"
  "NEXT_PUBLIC_BASE_URL"
)

echo "🔍 Checking environment variables..."
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Error: $var is not set"
    exit 1
  fi
done

echo "✅ All environment variables are set"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running type checking..."
npm run type-check || echo "⚠️ Type checking failed, continuing..."

# Run linting
echo "🧹 Running linting..."
npm run lint || echo "⚠️ Linting failed, continuing..."

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
else
  echo "❌ Build failed!"
  exit 1
fi

# Run tests (if available)
if [ -f "package.json" ] && grep -q '"test"' package.json; then
  echo "🧪 Running tests..."
  npm test || echo "⚠️ Tests failed, continuing..."
fi

echo "🎉 Deployment preparation complete!"
echo "📋 Next steps:"
echo "1. Deploy to your chosen platform (Vercel/Netlify/AWS/etc.)"
echo "2. Configure your custom domain"
echo "3. Set up SSL certificate"
echo "4. Configure webhook URLs in Razorpay and PayU dashboards"
echo "5. Test payment flows"


