// API endpoint for handling completed projects after payment
import Stripe from 'stripe'

const createProject = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  try {
    const { projectData, paymentIntent, selectedPackage } = req.body

    // Verify the payment intent
    const verifiedPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntent.id)
    
    if (verifiedPaymentIntent.status !== 'succeeded') {
      return res.status(400).json({ 
        error: 'Payment not completed' 
      })
    }

    // Here you would typically:
    // 1. Save the project to your database
    // 2. Send confirmation emails
    // 3. Notify your team
    // 4. Create project tracking records

    const project = {
      id: `proj_${Date.now()}`,
      customerInfo: {
        name: projectData.name,
        email: projectData.email,
        phone: projectData.phone,
      },
      package: selectedPackage,
      platforms: projectData.platforms,
      projectDetails: projectData.projectDetails,
      urgency: projectData.urgency,
      paymentIntentId: paymentIntent.id,
      amountPaid: verifiedPaymentIntent.amount,
      currency: verifiedPaymentIntent.currency,
      status: 'paid',
      createdAt: new Date().toISOString(),
      estimatedDelivery: calculateDeliveryDate(projectData.urgency)
    }

    // TODO: Save to database
    // await saveProjectToDatabase(project)

    // TODO: Send confirmation email
    // await sendConfirmationEmail(project)

    // TODO: Notify team via Slack/email
    // await notifyTeam(project)

    res.json({
      success: true,
      project: project,
      message: 'Project created successfully'
    })

  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({ 
      error: 'Failed to create project',
      message: error.message 
    })
  }
}

const calculateDeliveryDate = (urgency) => {
  const now = new Date()
  
  switch (urgency) {
    case 'emergency':
      now.setHours(now.getHours() + 12)
      break
    case 'rush':
      now.setHours(now.getHours() + 24)
      break
    case 'standard':
    default:
      now.setHours(now.getHours() + 48)
      break
  }
  
  return now.toISOString()
}

// For Express.js
// app.post('/api/projects', createProject)

// For Next.js API routes
// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     return createProject(req, res)
//   } else {
//     res.setHeader('Allow', 'POST')
//     res.status(405).end('Method Not Allowed')
//   }
// }

export { createProject }