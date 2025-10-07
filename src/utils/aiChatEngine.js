import { knowledgeBase, responsePatterns } from './aiChatKnowledgeBase.js'
import { LeadQualificationManager } from './leadQualification.js'

export class AIChatEngine {
  constructor() {
    this.conversationContext = {
      userInterests: [],
      questionsAsked: [],
      leadScore: 0,
      hasSeenPricing: false,
      preferredPackage: null,
      businessType: null,
      urgency: 'normal',
      sessionStart: new Date(),
      messageCount: 0,
      platformsUsed: [],
      monthlyDesignNeeds: null,
      budgetRange: null
    }
    this.leadQualifier = new LeadQualificationManager()
  }

  // Main response generator
  generateResponse(userMessage, conversationHistory = []) {
    const message = userMessage.toLowerCase().trim()
    this.conversationContext.messageCount++
    
    // Update conversation context
    this.updateContext(message, conversationHistory)
    
    // Calculate lead score
    const leadData = this.getLeadData(conversationHistory)
    this.conversationContext.leadScore = this.leadQualifier.calculateLeadScore(leadData)
    
    // Pattern matching for response type
    const responseType = this.identifyIntent(message)
    
    // Generate contextual response
    const response = this.createResponse(responseType, message)
    
    // Add follow-up questions or actions
    const enhancedResponse = this.addFollowUp(response, responseType)
    
    // Get next recommended action
    const nextAction = this.leadQualifier.getNextAction(leadData)
    
    return {
      text: enhancedResponse,
      quickActions: this.getRelevantQuickActions(responseType),
      shouldQualifyLead: this.shouldQualifyLead(),
      leadScore: this.conversationContext.leadScore,
      nextAction,
      recommendations: this.leadQualifier.getPersonalizedRecommendations(this.conversationContext, conversationHistory)
    }
  }

  // Identify user intent from message
  identifyIntent(message) {
    if (responsePatterns.greeting.some(pattern => pattern.test(message))) {
      return 'greeting'
    }
    if (responsePatterns.packages.some(pattern => pattern.test(message))) {
      return 'packages'
    }
    if (responsePatterns.process.some(pattern => pattern.test(message))) {
      return 'process'
    }
    if (responsePatterns.platforms.some(pattern => pattern.test(message))) {
      return 'platforms'
    }
    if (responsePatterns.delivery.some(pattern => pattern.test(message))) {
      return 'delivery'
    }
    if (responsePatterns.design.some(pattern => pattern.test(message))) {
      return 'design'
    }
    if (responsePatterns.quality.some(pattern => pattern.test(message))) {
      return 'quality'
    }
    
    // Fallback: search knowledge base
    return this.searchKnowledgeBase(message)
  }

  // Search knowledge base for relevant answer
  searchKnowledgeBase(message) {
    const faq = knowledgeBase.faq
    
    for (const [key, answer] of Object.entries(faq)) {
      if (message.includes(key) || this.fuzzyMatch(message, key)) {
        return { type: 'faq', key, answer }
      }
    }
    
    return 'general'
  }

  // Fuzzy matching for flexible responses
  fuzzyMatch(message, key) {
    const messageWords = message.split(' ')
    const keyWords = key.split(' ')
    
    const matches = messageWords.filter(word => 
      keyWords.some(keyWord => 
        word.includes(keyWord) || keyWord.includes(word)
      )
    )
    
    return matches.length >= Math.min(2, keyWords.length)
  }

  // Create contextual response
  createResponse(responseType, message) {
    if (typeof responseType === 'object' && responseType.type === 'faq') {
      return responseType.answer
    }

    switch (responseType) {
      case 'greeting':
        return this.getRandomGreeting()
        
      case 'packages':
        return this.createPackageResponse(message)
        
      case 'process':
        return `Our "Send & Forget" process is super simple:\n\n📱 **Step 1**: Upload your photos + brief (5 mins)\n🎨 **Step 2**: We design everything (our team handles it)\n✅ **Step 3**: Download files or we post for you\n\n**Zero design skills needed!** Which part would you like me to explain more?`
        
      case 'platforms':
        return `We support ALL major platforms:\n\n🛒 **E-commerce**: Shopee, Lazada, Amazon\n📱 **Social**: Instagram, Facebook, TikTok\n🎯 **Ads**: Google Ads, Facebook Ads\n🌐 **Web**: Website banners, blogs\n\nEach design comes in perfect dimensions for every platform. Which platforms do you use most?`
        
      case 'delivery':
        return this.createDeliveryResponse(message)
        
      case 'design':
        return `**ZERO design skills needed!** 🎉\n\nThat's literally our whole value proposition:\n• No Canva learning\n• No Photoshop needed\n• No platform juggling\n• No design experience required\n\nYou just send photos → We send back professional designs. Simple!\n\nWhat platforms do you need designs for?`
        
      case 'quality':
        return `We guarantee your satisfaction! 💯\n\n✅ **Essential**: 1 revision round\n✅ **Professional**: 3 revision rounds  \n✅ **Enterprise**: Unlimited revisions\n\n**Plus**: 100% money-back guarantee if not satisfied.\n\nOur Singapore-based team has 5+ years e-commerce design experience. Ready to see the difference?`
        
      default:
        return this.createGeneralResponse(message)
    }
  }

  createPackageResponse(message) {
    if (message.includes('compare') || message.includes('difference')) {
      return `Here's how our packages compare:\n\n🎨 **Essential (${knowledgeBase.packages.essential.price})**: ${knowledgeBase.packages.essential.assets}\n⭐ **Professional (${knowledgeBase.packages.professional.price})**: ${knowledgeBase.packages.professional.assets} (BEST VALUE)\n⚡ **Advanced (${knowledgeBase.packages.advanced.price})**: ${knowledgeBase.packages.advanced.assets}\n🚀 **Enterprise (${knowledgeBase.packages.enterprise.price})**: ${knowledgeBase.packages.enterprise.assets}\n\n**Quick question**: How many product photos do you typically need designed per month?`
    }
    
    if (message.includes('recommend') || message.includes('best')) {
      return `Most clients love **Professional** (${knowledgeBase.packages.professional.price}) because:\n\n💰 Best value at ${knowledgeBase.packages.professional.costPerAsset}/asset (vs ${knowledgeBase.packages.essential.costPerAsset} for Essential)\n🎯 Perfect for regular product launches\n⏰ 48-hour delivery included\n📱 ${knowledgeBase.packages.professional.serviceLevel}\n\nBut it depends on your needs! How many designs do you typically need?`
    }
    
    return `We have 4 packages designed for different needs:\n\n🎨 **Essential (${knowledgeBase.packages.essential.price})**: ${knowledgeBase.packages.essential.bestFor}\n⭐ **Professional (${knowledgeBase.packages.professional.price})**: ${knowledgeBase.packages.professional.bestFor}, most popular\n⚡ **Advanced (${knowledgeBase.packages.advanced.price})**: ${knowledgeBase.packages.advanced.bestFor}\n🚀 **Enterprise (${knowledgeBase.packages.enterprise.price})**: ${knowledgeBase.packages.enterprise.bestFor}\n\nWhat's your typical monthly design needs? That'll help me recommend the best fit!`
  }

  createDeliveryResponse(message) {
    if (message.includes('rush') || message.includes('urgent') || message.includes('emergency')) {
      this.conversationContext.urgency = 'high'
      return `For urgent projects:\n\n⚡ **Professional**: 24-hour delivery included\n🚀 **Enterprise**: 12-hour delivery included\n🔥 **Emergency**: 6-hour delivery available (+50% fee)\n\n**Only 2 Enterprise spots left this week!** \n\nHow soon do you need your designs?`
    }
    
    return `Our delivery is guaranteed:\n\n📅 **Essential**: 48 hours\n⚡ **Professional**: 24 hours\n🚀 **Enterprise**: 12 hours\n\n**All packages include revisions** to ensure perfection!\n\nWhen do you need your designs delivered?`
  }

  createGeneralResponse(message) {
    // Attempt to provide helpful fallback
    if (message.includes('help') || message.includes('confused')) {
      return `I'm here to help! 😊\n\nHere's what I can explain:\n• Package differences and pricing\n• How our design process works\n• Platform support and delivery times\n• Getting started steps\n\nWhat specific question do you have? Or would you prefer to **speak with our human team**?`
    }
    
    return `That's a great question! While I don't have that specific info handy, our human team can definitely help.\n\n**Quick options**:\n📞 WhatsApp: +65 8123 4567 (instant reply)\n📧 Email: hello@sprintix.asia\n💬 Or ask me about packages, pricing, or process!\n\nWhat else can I help clarify?`
  }

  getRandomGreeting() {
    const greetings = knowledgeBase.greetings
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Get lead data for qualification
  getLeadData(conversationHistory) {
    const sessionDuration = (new Date() - this.conversationContext.sessionStart) / 1000
    
    return {
      messages: conversationHistory,
      userInfo: {
        businessType: this.conversationContext.businessType,
        platformsUsed: this.conversationContext.platformsUsed,
        monthlyDesignNeeds: this.conversationContext.monthlyDesignNeeds,
        budgetRange: this.conversationContext.budgetRange,
        urgency: this.conversationContext.urgency,
        timeline: this.conversationContext.timeline
      },
      engagement: {
        messageCount: this.conversationContext.messageCount,
        sessionDuration,
        returnVisit: localStorage.getItem('sprintix-chat-return') === 'true'
      }
    }
  }

  // Update conversation context for personalization
  updateContext(message, conversationHistory) {
    // Track package interests
    if (message.includes('enterprise')) {
      this.conversationContext.preferredPackage = 'enterprise'
    } else if (message.includes('professional')) {
      this.conversationContext.preferredPackage = 'professional' 
    } else if (message.includes('essential')) {
      this.conversationContext.preferredPackage = 'essential'
    }

    // Track business type
    if (message.includes('ecommerce') || message.includes('e-commerce') || 
        message.includes('online store') || message.includes('selling online')) {
      this.conversationContext.businessType = 'ecommerce'
    }

    // Track platforms
    const platforms = ['shopee', 'lazada', 'amazon', 'instagram', 'facebook', 'tiktok']
    platforms.forEach(platform => {
      if (message.includes(platform) && !this.conversationContext.platformsUsed.includes(platform)) {
        this.conversationContext.platformsUsed.push(platform)
      }
    })

    // Track design volume needs
    if (message.includes('many') || message.includes('lots') || message.includes('100') || message.includes('50')) {
      this.conversationContext.monthlyDesignNeeds = 'high'
    } else if (message.includes('few') || message.includes('5') || message.includes('10')) {
      this.conversationContext.monthlyDesignNeeds = 'low'
    }

    // Track urgency
    if (message.includes('urgent') || message.includes('asap') || message.includes('rush') || 
        message.includes('soon') || message.includes('quickly')) {
      this.conversationContext.urgency = 'high'
    }

    // Track pricing interest
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      this.conversationContext.hasSeenPricing = true
    }

    // Set return visitor flag
    localStorage.setItem('sprintix-chat-return', 'true')
  }

  // Add contextual follow-up questions
  addFollowUp(response, responseType) {
    if (this.conversationContext.leadScore >= 5 && !this.conversationContext.questionsAsked.includes('ready_to_start')) {
      this.conversationContext.questionsAsked.push('ready_to_start')
      return response + `\n\n**Ready to transform your photos?** I can help you start a project right now! 🚀`
    }
    
    if (responseType === 'packages' && !this.conversationContext.questionsAsked.includes('business_size')) {
      this.conversationContext.questionsAsked.push('business_size')
      return response + `\n\n💡 **Tip**: Most e-commerce sellers need 5-15 designs per month. Sound about right for you?`
    }

    return response
  }

  // Get relevant quick actions based on context
  getRelevantQuickActions(responseType) {
    const baseActions = knowledgeBase.quickActions

    if (responseType === 'packages') {
      return [
        { text: "Compare All Packages", query: "show me detailed comparison" },
        { text: "What's Most Popular?", query: "which package is most popular" },
        { text: "Start Project Now", query: "I want to start" }
      ]
    }

    if (this.conversationContext.leadScore >= 3) {
      return [
        { text: "Start My Project", query: "ready to begin" },
        { text: "Speak to Human", query: "connect me with support" },
        { text: "See Pricing", query: "show me all prices" }
      ]
    }

    return baseActions.slice(0, 3)
  }

  // Determine if lead should be qualified
  shouldQualifyLead() {
    return this.conversationContext.leadScore >= 5 || 
           this.conversationContext.hasSeenPricing ||
           this.conversationContext.preferredPackage !== null
  }

  // Get conversation summary for handoff
  getConversationSummary() {
    return {
      leadScore: this.conversationContext.leadScore,
      interests: this.conversationContext.userInterests,
      preferredPackage: this.conversationContext.preferredPackage,
      businessType: this.conversationContext.businessType,
      urgency: this.conversationContext.urgency,
      readyForHandoff: this.shouldQualifyLead()
    }
  }
}

export default AIChatEngine