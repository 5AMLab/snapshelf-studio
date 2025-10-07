// This is a sample backend API endpoint for creating Stripe payment intents
// You can implement this in your preferred backend framework (Express, Next.js API routes, etc.)

import Stripe from 'stripe'
import { body, validationResult } from 'express-validator'

// Validation middleware
export const validatePaymentIntent = [
  body('amount').isNumeric().custom((value) => {
    const num = parseFloat(value)
    if (num <= 0 || num > 999999) {
      throw new Error('Amount must be between 0.01 and 999999')
    }
    return true
  }),
  body('currency').isLength({ min: 3, max: 3 }).matches(/^[A-Z]{3}$/),
  body('packageName').isLength({ min: 1, max: 100 }).trim().escape(),
]

const createPaymentIntent = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
  try {
    // Check validation results
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Invalid input data',
        details: errors.array()
      })
    }

    const { amount, currency, packageName, packageDetails } = req.body

    // Additional validation
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' })
    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: currency.toLowerCase(),
      metadata: {
        package_name: packageName,
        package_price: packageDetails?.price || '',
        service_level: packageDetails?.serviceLevel?.title || '',
      },
      // Enable automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    // Don't expose internal error details in production
    const isProduction = process.env.NODE_ENV === 'production'
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      ...(isProduction ? {} : { message: error.message })
    })
  }
}

// For Express.js
// app.post('/api/create-payment-intent', createPaymentIntent)

// For Next.js API routes
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     return createPaymentIntent(req, res)
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }

export { createPaymentIntent }