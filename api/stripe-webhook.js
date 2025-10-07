// Stripe webhook handler for processing payment events
import Stripe from 'stripe'

const handleStripeWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  let event

  try {
    const sig = req.headers['stripe-signature']
    const body = req.body

    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Webhook signature verification failed' })
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object)
        break

      case 'payment_intent.requires_action':
        await handlePaymentRequiresAction(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    
    // Don't expose internal error details
    res.status(500).json({ error: 'Internal server error' })
  }
}

const handlePaymentSucceeded = async (paymentIntent) => {
  console.log('Payment succeeded:', paymentIntent.id)
  
  // TODO: Update project status in database
  // TODO: Send success notification to customer
  // TODO: Notify team to start work
  
  const metadata = paymentIntent.metadata
  console.log('Package:', metadata.package_name)
  console.log('Service Level:', metadata.service_level)
}

const handlePaymentFailed = async (paymentIntent) => {
  console.log('Payment failed:', paymentIntent.id)
  
  // TODO: Log failed payment
  // TODO: Send notification to customer about failed payment
  // TODO: Update project status to 'payment_failed'
}

const handlePaymentRequiresAction = async (paymentIntent) => {
  console.log('Payment requires action:', paymentIntent.id)
  
  // TODO: Send customer notification about required action
  // TODO: Set reminder to follow up if not completed
}

// For Express.js (with raw body parsing)
// app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), handleStripeWebhook)

// For Next.js API routes
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     return handleStripeWebhook(req, res)
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }

export { handleStripeWebhook }