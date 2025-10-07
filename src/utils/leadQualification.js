// Lead Qualification System for AI Chat
import { PRICING_CONFIG } from '../config/pricing'

export class LeadQualificationManager {
  constructor() {
    this.qualificationThresholds = {
      hot: 8,      // Ready to buy
      warm: 5,     // Interested, needs nurturing  
      cold: 2      // Just browsing
    }
  }

  // Calculate lead score based on conversation
  calculateLeadScore(conversationData) {
    let score = 0
    const { messages, userInfo, engagement } = conversationData

    // Engagement scoring
    score += this.scoreEngagement(engagement)
    
    // Intent scoring  
    score += this.scoreIntent(messages)
    
    // Business qualification scoring
    score += this.scoreBusinessQualification(userInfo)
    
    // Urgency scoring
    score += this.scoreUrgency(messages)

    return Math.min(score, 10) // Cap at 10
  }

  scoreEngagement(engagement) {
    let score = 0
    
    // Messages count
    if (engagement.messageCount > 10) score += 2
    else if (engagement.messageCount > 5) score += 1
    
    // Session duration
    if (engagement.sessionDuration > 300) score += 2 // 5+ minutes
    else if (engagement.sessionDuration > 120) score += 1 // 2+ minutes
    
    // Return visits
    if (engagement.returnVisit) score += 1
    
    return score
  }

  scoreIntent(messages) {
    let score = 0
    const messageText = messages.map(m => m.text.toLowerCase()).join(' ')
    
    // High intent keywords
    const highIntentKeywords = [
      'ready to start', 'how much', 'pricing', 'cost', 'buy', 'purchase',
      'when can you start', 'how soon', 'need designs', 'want to order'
    ]
    
    const mediumIntentKeywords = [
      'compare packages', 'which package', 'recommend', 'best option',
      'timeline', 'delivery', 'process', 'how it works'
    ]

    // Count keyword matches
    highIntentKeywords.forEach(keyword => {
      if (messageText.includes(keyword)) score += 2
    })
    
    mediumIntentKeywords.forEach(keyword => {
      if (messageText.includes(keyword)) score += 1
    })

    return Math.min(score, 4) // Cap at 4 for intent
  }

  scoreBusinessQualification(userInfo) {
    let score = 0
    
    // Business type
    if (userInfo.businessType === 'ecommerce') score += 2
    if (userInfo.platformsUsed?.length > 0) score += 1
    
    // Business size indicators
    if (userInfo.monthlyDesignNeeds > 10) score += 2
    else if (userInfo.monthlyDesignNeeds > 5) score += 1
    
    // Budget indicators
    if (userInfo.budgetRange === 'high') score += 2
    else if (userInfo.budgetRange === 'medium') score += 1
    
    return score
  }

  scoreUrgency(messages) {
    let score = 0
    const messageText = messages.map(m => m.text.toLowerCase()).join(' ')
    
    const urgencyKeywords = [
      'urgent', 'asap', 'rush', 'emergency', 'need it now',
      'launching soon', 'campaign starting', 'deadline'
    ]
    
    urgencyKeywords.forEach(keyword => {
      if (messageText.includes(keyword)) score += 1
    })
    
    return Math.min(score, 2) // Cap at 2 for urgency
  }

  // Get lead qualification status
  getLeadStatus(score) {
    if (score >= this.qualificationThresholds.hot) {
      return {
        status: 'hot',
        description: 'Ready to buy - Priority follow-up',
        action: 'immediate_contact',
        priority: 'high'
      }
    } else if (score >= this.qualificationThresholds.warm) {
      return {
        status: 'warm', 
        description: 'Interested prospect - Nurture with value',
        action: 'follow_up_sequence',
        priority: 'medium'
      }
    } else {
      return {
        status: 'cold',
        description: 'Early stage - Educational content',
        action: 'content_nurturing', 
        priority: 'low'
      }
    }
  }

  // Generate qualification questions
  getQualificationQuestions(currentScore, userInfo) {
    const questions = []
    
    if (!userInfo.businessType) {
      questions.push({
        question: "What type of business do you run?",
        options: ["E-commerce store", "Digital marketing agency", "Content creator", "Other"],
        weight: 2
      })
    }
    
    if (!userInfo.platformsUsed) {
      questions.push({
        question: "Which platforms do you sell on?",
        options: ["Shopee", "Lazada", "Amazon", "Instagram", "Multiple platforms"],
        weight: 1
      })
    }
    
    if (!userInfo.monthlyDesignNeeds) {
      questions.push({
        question: "How many product designs do you typically need per month?",
        options: ["1-5", "5-15", "15-30", "30+"],
        weight: 2
      })
    }
    
    if (currentScore >= 5 && !userInfo.timeline) {
      questions.push({
        question: "When would you like to start your first project?",
        options: ["This week", "Next week", "Within a month", "Just exploring"],
        weight: 3
      })
    }
    
    return questions
  }

  // Determine next best action
  getNextAction(leadData) {
    const score = this.calculateLeadScore(leadData)
    const status = this.getLeadStatus(score)
    
    switch (status.action) {
      case 'immediate_contact':
        return {
          type: 'human_handoff',
          message: "You seem ready to get started! Let me connect you with our team to begin your project right away.",
          cta: "Start My Project Now",
          urgency: 'high'
        }
        
      case 'follow_up_sequence':
        return {
          type: 'package_recommendation',
          message: "Based on our conversation, I'd recommend our Professional package. Would you like to see a detailed breakdown?",
          cta: "Show Me Professional Package",
          urgency: 'medium'
        }
        
      case 'content_nurturing':
        return {
          type: 'educational_content',
          message: "Would you like to see some examples of transformations we've done for businesses like yours?",
          cta: "Show Examples",
          urgency: 'low'
        }
        
      default:
        return {
          type: 'continue_conversation',
          message: "What other questions can I answer about our design service?",
          cta: "Ask Another Question",
          urgency: 'low'
        }
    }
  }

  // Generate personalized recommendations
  getPersonalizedRecommendations(userInfo, conversationHistory) {
    const recommendations = []
    
    // Package recommendation
    if (userInfo.monthlyDesignNeeds) {
      if (userInfo.monthlyDesignNeeds <= 5) {
        recommendations.push({
          type: 'package',
          title: 'Essential Package Recommended',
          message: `Perfect for testing our service with ${PRICING_CONFIG.packages.essential.assets} asset transformations`,
          package: 'essential'
        })
      } else if (userInfo.monthlyDesignNeeds <= 25) {
        recommendations.push({
          type: 'package', 
          title: 'Professional Package - Best Value',
          message: `Most popular choice with best cost per asset (SGD ${PRICING_CONFIG.packages.professional.perEdit} vs SGD ${PRICING_CONFIG.packages.essential.perEdit})`,
          package: 'professional'
        })
      } else if (userInfo.monthlyDesignNeeds <= 50) {
        recommendations.push({
          type: 'package',
          title: 'Advanced Package - Perfect for Growth',
          message: `Ideal for expanding businesses (SGD ${PRICING_CONFIG.packages.advanced.perEdit} per edit with 34% bulk savings)`,
          package: 'advanced'
        })
      } else {
        recommendations.push({
          type: 'package',
          title: 'Enterprise Package for Scale',
          message: 'Complete done-for-you service for high-volume needs',
          package: 'enterprise'
        })
      }
    }
    
    // Platform-specific recommendations
    if (userInfo.platformsUsed?.includes('amazon')) {
      recommendations.push({
        type: 'feature',
        title: 'Amazon Infographics Included',
        message: 'Professional+ packages include data-driven Amazon infographics'
      })
    }
    
    // Urgency-based recommendations
    if (userInfo.urgency === 'high') {
      recommendations.push({
        type: 'delivery',
        title: 'Rush Delivery Available', 
        message: 'Professional: 24h, Enterprise: 12h delivery included'
      })
    }
    
    return recommendations
  }
}

export default LeadQualificationManager