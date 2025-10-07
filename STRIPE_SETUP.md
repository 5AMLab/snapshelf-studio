# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payments for your SnapShelf Studio website.

## 🚀 Quick Start

### 1. Get Your Stripe Keys

1. Sign up for a [Stripe account](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Copy your **Publishable Key** and **Secret Key**

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Update `.env` with your actual Stripe keys:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# For webhooks (optional, for production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Install Backend Dependencies (if using Express.js)

```bash
# Install backend packages
npm install --save express cors stripe dotenv

# For development
npm install --save-dev nodemon
```

### 4. Start Your Backend Server

```bash
# Start the Express server
node server.js

# Or for development with auto-restart
npx nodemon server.js
```

**Note**: The project uses ES modules. All backend files use `import/export` syntax instead of `require/module.exports`.

### 5. Update Frontend API URLs

If your backend runs on a different port, update the API URLs in:
- `src/components/StripePayment.jsx` (line ~44)
- `src/components/PaymentWorkflow.jsx` (line ~32)

```javascript
// Change this:
const response = await fetch('/api/create-payment-intent', {

// To this (if backend is on port 3001):
const response = await fetch('http://localhost:3001/api/create-payment-intent', {
```

## 🏗️ Architecture Overview

### Frontend Components

1. **PaymentWorkflow.jsx** - Main payment flow component
2. **StripePayment.jsx** - Stripe Elements payment form
3. **ContactForm.jsx** - Modified to work with payment flow

### Backend API Endpoints

1. **POST /api/create-payment-intent** - Creates Stripe payment intent
2. **POST /api/projects** - Handles completed projects after payment
3. **POST /api/stripe-webhook** - Processes Stripe webhook events

### Payment Flow

```
1. Customer fills project details
     ↓
2. Customer proceeds to payment
     ↓
3. Frontend calls /api/create-payment-intent
     ↓
4. Stripe processes payment
     ↓
5. Frontend calls /api/projects with payment confirmation
     ↓
6. Project is created and customer is notified
```

## 🔧 Configuration Options

### Package Pricing

Update pricing in `src/components/SnapShelfStudio.jsx`:

```javascript
const pricingPlans = [
  {
    name: "Essential",
    price: "SGD 47", // Update this
    // ... other fields
  }
]
```

### Supported Currencies

Update in `src/components/StripePayment.jsx`:

```javascript
body: JSON.stringify({
  amount: parseFloat(selectedPackage.price.replace('SGD ', '')) * 100,
  currency: 'sgd', // Change currency here
  // ...
})
```

### Rush Delivery Pricing

Modify in `src/components/ContactForm.jsx`:

```javascript
{ 
  value: 'rush', 
  label: 'Rush Delivery', 
  time: '24 hours', 
  price: '+25%', // Update pricing
  desc: 'Need it faster'
}
```

## 🔐 Security Best Practices

### Environment Variables
- Never commit `.env` files
- Use different keys for development and production
- Store production keys securely (e.g., Vercel env vars, AWS Secrets Manager)

### Webhook Verification
- Always verify webhook signatures in production
- Use HTTPS for webhook endpoints
- Implement idempotency for webhook processing

### Payment Validation
- Always verify payment status on your backend
- Don't trust client-side payment confirmations
- Implement proper error handling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Add environment variables in your hosting platform
2. Deploy your React app as usual

### Backend Options

#### Option 1: Vercel API Routes
Move API files to `api/` directory and deploy with Vercel.

#### Option 2: Railway/Heroku
Deploy the Express.js server to Railway or Heroku.

#### Option 3: AWS Lambda
Convert API functions to Lambda functions.

### Webhook Setup (Production)
1. Deploy your webhook endpoint
2. Add webhook URL in Stripe Dashboard
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret to environment variables

## 🧪 Testing

### Test Cards
Use Stripe's test cards:

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0000 0000 3220
```

### Test Flow
1. Select a package
2. Fill in project details
3. Use test card numbers
4. Verify payment in Stripe Dashboard

## 📊 Monitoring

### Stripe Dashboard
- Monitor payments and failures
- View customer details
- Handle disputes and refunds

### Error Tracking
Add error tracking to your backend:

```javascript
// Add to your API endpoints
const Sentry = require('@sentry/node')

try {
  // Your payment logic
} catch (error) {
  Sentry.captureException(error)
  console.error('Payment error:', error)
}
```

## 🔧 Troubleshooting

### Common Issues

1. **"No such payment intent"**
   - Check if payment intent was created successfully
   - Verify API keys are correct

2. **"Invalid currency"**
   - Ensure currency is lowercase (e.g., 'sgd', not 'SGD')
   - Check if currency is supported in your region

3. **Webhook signature verification failed**
   - Verify webhook secret is correct
   - Ensure raw body is passed to webhook handler

4. **CORS errors**
   - Add your frontend domain to CORS allowlist
   - Check if backend is running on correct port

### Debug Mode

Enable debug mode in Stripe:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
  telemetry: false
})
```

## 📞 Support

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Test Your Integration**: https://stripe.com/docs/testing

## 🎯 Next Steps

1. Set up production webhook endpoints
2. Implement email notifications
3. Add refund handling
4. Set up subscription billing (if needed)
5. Implement proper logging and monitoring

---

**Need help?** Check the Stripe documentation or contact their support team.