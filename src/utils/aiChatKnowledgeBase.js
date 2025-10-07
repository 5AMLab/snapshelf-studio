// Sprintix Studio Pte. Ltd. AI Chat Knowledge Base
import { getPackageArray } from '../config/pricing'

const packages = getPackageArray()

export const knowledgeBase = {
  // Company Information
  company: {
    name: "Sprintix Studio Pte. Ltd.",
    service: "E-commerce design transformation service",
    location: "Singapore",
    target: "Southeast Asia e-commerce sellers",
    delivery: "72 hours guaranteed",
    specialty: "Platform-ready designs from phone photos"
  },

  // Packages Information - Updated to use centralized pricing
  packages: {
    essential: {
      name: packages[0].name,
      price: packages[0].priceDisplay,
      assets: `${packages[0].assets} asset transformations`,
      variations: "Platform-specific size variations",
      delivery: "72 hours",
      revisions: "2 rounds",
      serviceLevel: packages[0].serviceLevel.title,
      timeInvestment: "Standard delivery",
      bestFor: packages[0].serviceLevel.effort,
      costPerAsset: `SGD ${packages[0].perEdit}`
    },
    professional: {
      name: packages[1].name,
      price: packages[1].priceDisplay,
      assets: `${packages[1].assets} asset transformations`,
      variations: "Platform-specific size variations",
      delivery: "48 hours",
      revisions: "2 rounds",
      serviceLevel: packages[1].serviceLevel.title,
      timeInvestment: "Priority delivery",
      bestFor: packages[1].serviceLevel.effort,
      popular: true,
      costPerAsset: `SGD ${packages[1].perEdit}`
    },
    advanced: {
      name: packages[2].name,
      price: packages[2].priceDisplay,
      assets: `${packages[2].assets} asset transformations`,
      variations: "Platform-specific size variations",
      delivery: "36 hours",
      revisions: "3 rounds",
      serviceLevel: packages[2].serviceLevel.title,
      timeInvestment: "Priority delivery",
      bestFor: packages[2].serviceLevel.effort,
      costPerAsset: `SGD ${packages[2].perEdit}`
    },
    enterprise: {
      name: packages[3].name,
      price: packages[3].priceDisplay,
      assets: `${packages[3].assets} asset transformations`,
      variations: "Platform-specific size variations",
      delivery: "12 hours emergency delivery",
      revisions: "Unlimited",
      serviceLevel: packages[3].serviceLevel.title,
      timeInvestment: "Emergency delivery available",
      bestFor: packages[3].serviceLevel.effort,
      includes: "Brand guideline creation, Priority support",
      costPerAsset: `SGD ${packages[3].perEdit}`
    }
  },

  // Platform Support
  platforms: [
    "Shopee", "Lazada", "Amazon", "Instagram", "Facebook", 
    "TikTok", "Google Ads", "Website banners"
  ],

  // Common Questions & Answers
  faq: {
    "what do you do": "We transform your phone photos into 50+ platform-ready designs. You send us photos, we send back professional designs for Shopee, Instagram, Amazon, and more - all in 48 hours.",
    
    "how does it work": "Simple 3-step process: 1) Upload your photos and brief (5 mins), 2) We design everything (our team handles it), 3) Download files or we post for you (depends on package). Zero design skills needed.",
    
    "delivery time": "Standard 48 hours, Professional gets 24 hours, Enterprise gets 12 hours. Rush delivery available for urgent campaigns.",
    
    "what platforms": "All major e-commerce and social platforms: Shopee, Lazada, Amazon, Instagram, Facebook, TikTok, Google Ads, and website banners. Each design comes in perfect sizes for each platform.",
    
    "design skills needed": "ZERO design skills needed! That's our whole point. No Canva, no Photoshop, no learning curves. Just send photos and get professional results.",
    
    "revisions": "Essential: 1 round, Professional: 3 rounds, Enterprise: Unlimited revisions. We guarantee your satisfaction.",
    
    "file formats": "High-res PNG/JPG at 300dpi for print, web-optimized under 1MB for digital, all platform-specific dimensions included. Full commercial usage rights.",
    
    "payment": "Secure payment via Stripe. We accept all major credit cards. Payment processed only after you approve the project scope.",
    
    "refund policy": "100% satisfaction guarantee. Not happy with results? We'll revise until perfect or provide full refund.",
    
    "team": "Human designers, not AI. Singapore-based team with 5+ years e-commerce design experience. Each project gets a dedicated designer.",
    
    "rush delivery": "Yes! Professional: 24h, Enterprise: 12h included. Emergency delivery available for additional cost.",
    
    "brand guidelines": "Enterprise package includes brand guideline creation. Other packages can follow your existing guidelines or we'll maintain consistency across designs.",
    
    "deployment service": "Enterprise package includes optional deployment - we can post directly to your platforms using your credentials (secure process).",
    
    "capacity": "Limited slots available each week to maintain quality. Currently 2 Enterprise spots remaining this week.",
    
    "languages": "Service provided in English. Design text can be in English, Mandarin, Malay, or Bahasa Indonesia.",
    
    "physical products": "We're 100% digital. No physical product photography - we work with existing photos you provide.",
    
    "asset upload": "Upload via secure link after booking. Support photos, logos, brand assets. Google Drive/Dropbox links accepted for large files."
  },

  // Lead Qualification Questions
  leadQualification: {
    businessType: "What type of business do you run?",
    platforms: "Which platforms do you sell on?", 
    currentPain: "What's your biggest design challenge right now?",
    timeline: "When do you need designs delivered?",
    budget: "What's your monthly design budget?",
    teamSize: "Do you have a design team or handle it yourself?"
  },

  // Conversation Starters
  greetings: [
    "Hi! I'm Alex, SnapShelf's AI assistant 🤖\n\nI can help you choose the perfect package and answer questions about our 48-hour design service. What would you like to know?",
    "Welcome to SnapShelf Studio! 👋\n\nI'm here to help you transform your phone photos into professional e-commerce designs. What questions do you have?",
    "Hello! Ready to skip the Canva struggle? 🎨\n\nI can explain how we turn your product photos into 50+ platform-ready designs in just 48 hours. How can I help?"
  ],

  // Quick Actions
  quickActions: [
    { text: "Package Comparison", query: "compare packages" },
    { text: "Pricing Info", query: "what does it cost" },
    { text: "How It Works", query: "how does the process work" },
    { text: "Delivery Time", query: "how fast delivery" },
    { text: "Platform Support", query: "what platforms supported" },
    { text: "See Examples", query: "show me examples" }
  ]
}

// AI Response Patterns
export const responsePatterns = {
  // Greeting patterns
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon)/i,
    /^(start|begin|help)/i
  ],

  // Package related
  packages: [
    /package|pricing|price|cost|how much/i,
    /essential|professional|enterprise/i,
    /compare|difference|which package/i
  ],

  // Process questions
  process: [
    /how (does it|do you) work/i,
    /process|steps|procedure/i,
    /what do I (do|need)/i
  ],

  // Platform questions
  platforms: [
    /platform|shopee|lazada|amazon|instagram|facebook|tiktok/i,
    /where can I use|what sites|which platforms/i
  ],

  // Delivery questions
  delivery: [
    /delivery|timeline|how (fast|quick|long)/i,
    /when will I get|how soon/i,
    /rush|urgent|emergency/i
  ],

  // Design questions
  design: [
    /design skill|do I need|learn|canva|photoshop/i,
    /experience|knowledge|training/i
  ],

  // Quality questions
  quality: [
    /revision|change|modify|edit/i,
    /satisfaction|guarantee|refund/i,
    /quality|professional/i
  ]
}

export default { knowledgeBase, responsePatterns }