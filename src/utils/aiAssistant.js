// AI Assistant for form completion and recommendations
export class AIFormAssistant {
  constructor() {
    this.platformKeywords = {
      shopee: ['shopee', 'shp', 'shopee.sg', 'shopee.com', 'shopee marketplace'],
      lazada: ['lazada', 'lzd', 'lazada.sg', 'lazada.com', 'lazada marketplace'],
      amazon: ['amazon', 'amz', 'amazon.sg', 'amazon.com', 'aws marketplace'],
      instagram: ['instagram', 'ig', 'insta', 'instagram.com', 'ig post', 'ig story', 'instagram story', 'instagram feed'],
      facebook: ['facebook', 'fb', 'facebook.com', 'fb post', 'facebook ad', 'meta'],
      tiktok: ['tiktok', 'tik tok', 'tiktok.com', 'tt', 'tiktok video'],
      'google-ads': ['google ads', 'google ad', 'adwords', 'google adwords', 'ppc', 'sem'],
      website: ['website', 'web', 'site', 'homepage', 'landing page', 'blog']
    }

    this.complexityKeywords = {
      hair: ['hair', 'hairy', 'curly hair', 'long hair', 'flowing hair', 'blonde hair', 'brunette', 'hair strand'],
      jewelry: ['jewelry', 'jewellery', 'necklace', 'chain', 'bracelet', 'earring', 'ring', 'pendant', 'charm'],
      glass: ['glass', 'transparent', 'crystal', 'clear', 'see-through', 'translucent', 'glassy'],
      fur: ['fur', 'furry', 'fluffy', 'fabric texture', 'wool', 'cashmere', 'velvet'],
      intricate: ['detailed', 'intricate', 'complex pattern', 'fine details', 'delicate', 'ornate']
    }

    this.businessTypeKeywords = {
      'ecommerce-product': [
        'selling', 'product', 'marketplace', 'ecommerce', 'e-commerce', 'shop', 'store', 'listing',
        'inventory', 'catalogue', 'catalog', 'sku', 'variant', 'size', 'color option'
      ],
      'social-media': [
        'campaign', 'promotion', 'brand awareness', 'engagement', 'followers', 'social media',
        'content creation', 'viral', 'trending', 'hashtag', 'influencer', 'ugc'
      ],
      'marketing-campaign': [
        'marketing', 'advertising', 'launch', 'campaign', 'multi-platform', 'brand', 'corporate',
        'comprehensive', 'strategy', 'omnichannel', 'integrated marketing'
      ],
      'quick-edit': [
        'quick', 'simple', 'basic', 'touch up', 'cleanup', 'fix', 'enhance', 'improve',
        'minimal', 'straightforward', 'easy edit'
      ]
    }

    this.urgencyKeywords = {
      rush: ['urgent', 'asap', 'quickly', 'fast', 'rush', 'hurry', 'soon', 'deadline tomorrow'],
      emergency: ['emergency', 'immediately', 'today', 'right now', 'critical', 'crisis', 'urgent deadline']
    }
  }

  // Detect platforms mentioned in text
  detectPlatforms(text) {
    const detectedPlatforms = []
    const lowerText = text.toLowerCase()

    for (const [platform, keywords] of Object.entries(this.platformKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          detectedPlatforms.push({
            platform,
            keyword,
            confidence: this.calculateKeywordConfidence(keyword, lowerText)
          })
          break // Only add each platform once
        }
      }
    }

    return detectedPlatforms.sort((a, b) => b.confidence - a.confidence)
  }

  // Detect complexity elements that affect pricing
  detectComplexity(text) {
    const complexityIssues = []
    const lowerText = text.toLowerCase()
    let totalAdditionalCost = 0

    for (const [type, keywords] of Object.entries(this.complexityKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          const confidence = this.calculateKeywordConfidence(keyword, lowerText)
          complexityIssues.push({
            type,
            keyword,
            confidence,
            additionalCost: 25, // $25 per complex item type
            description: this.getComplexityDescription(type)
          })
          totalAdditionalCost += 25
          break // Only count each type once
        }
      }
    }

    return {
      issues: complexityIssues.sort((a, b) => b.confidence - a.confidence),
      totalAdditionalCost,
      hasComplexity: complexityIssues.length > 0
    }
  }

  // Recommend template based on business type
  recommendTemplate(text) {
    const lowerText = text.toLowerCase()
    const templateScores = {}

    for (const [templateId, keywords] of Object.entries(this.businessTypeKeywords)) {
      let score = 0
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          score += this.calculateKeywordConfidence(keyword, lowerText)
        }
      }
      templateScores[templateId] = score
    }

    const sortedTemplates = Object.entries(templateScores)
      .filter(([_, score]) => score > 0)
      .sort(([, a], [, b]) => b - a)
      .map(([templateId, score]) => ({
        templateId,
        confidence: Math.min(score * 20, 95), // Scale to percentage, cap at 95%
        reason: this.getTemplateRecommendationReason(templateId, lowerText)
      }))

    return sortedTemplates.slice(0, 3) // Return top 3 recommendations
  }

  // Detect urgency level
  detectUrgency(text) {
    const lowerText = text.toLowerCase()

    for (const [level, keywords] of Object.entries(this.urgencyKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return {
            level,
            keyword,
            confidence: this.calculateKeywordConfidence(keyword, lowerText),
            suggestion: this.getUrgencySuggestion(level)
          }
        }
      }
    }

    return null
  }

  // Extract potential asset count
  extractAssetCount(text) {
    const numbers = text.match(/(\d+)\s*(photo|image|picture|asset|product|item)/gi)
    if (numbers && numbers.length > 0) {
      const counts = numbers.map(match => {
        const num = parseInt(match.match(/\d+/)[0])
        return { count: num, context: match }
      })
      
      const maxCount = Math.max(...counts.map(c => c.count))
      return {
        estimatedCount: maxCount,
        context: counts.find(c => c.count === maxCount)?.context,
        confidence: maxCount > 0 ? 80 : 0
      }
    }

    return null
  }

  // Comprehensive analysis of form input
  analyzeInput(text, platforms = [], urgency = 'standard') {
    if (!text || text.trim().length < 10) {
      return { suggestions: [], warnings: [], recommendations: [] }
    }

    const platformDetection = this.detectPlatforms(text)
    const complexityAnalysis = this.detectComplexity(text)
    const templateRecommendations = this.recommendTemplate(text)
    const urgencyDetection = this.detectUrgency(text)
    const assetCount = this.extractAssetCount(text)

    return {
      platforms: {
        detected: platformDetection,
        suggestions: this.getPlatformSuggestions(platformDetection, platforms)
      },
      complexity: complexityAnalysis,
      templates: templateRecommendations,
      urgency: urgencyDetection,
      assetCount,
      overallRecommendations: this.generateOverallRecommendations(
        platformDetection, 
        complexityAnalysis, 
        templateRecommendations,
        urgencyDetection,
        assetCount
      )
    }
  }

  // Helper methods
  calculateKeywordConfidence(keyword, text) {
    const keywordLength = keyword.length
    const contextWindow = 50 // characters around keyword
    const position = text.indexOf(keyword)
    
    let confidence = 60 // base confidence

    // Longer keywords are more specific
    if (keywordLength > 8) confidence += 20
    else if (keywordLength > 5) confidence += 10

    // Keywords near beginning of text are often more important
    if (position < text.length * 0.3) confidence += 10

    // Whole word matches are better than partial
    const beforeChar = position > 0 ? text[position - 1] : ' '
    const afterChar = position + keywordLength < text.length ? text[position + keywordLength] : ' '
    if (/\s/.test(beforeChar) && /\s/.test(afterChar)) {
      confidence += 15
    }

    return Math.min(confidence, 95)
  }

  getComplexityDescription(type) {
    const descriptions = {
      hair: 'Hair and flowing elements require precise edge detection',
      jewelry: 'Jewelry chains and fine details need specialized processing',
      glass: 'Transparent and reflective surfaces require advanced techniques',
      fur: 'Textured and fuzzy materials need careful edge handling',
      intricate: 'Fine details and complex patterns require extra attention'
    }
    return descriptions[type] || 'Complex element detected'
  }

  getTemplateRecommendationReason(templateId, text) {
    const reasons = {
      'ecommerce-product': 'Detected e-commerce/marketplace keywords',
      'social-media': 'Identified social media campaign elements',
      'marketing-campaign': 'Found comprehensive marketing campaign indicators',
      'quick-edit': 'Simple editing requirements detected'
    }
    return reasons[templateId] || 'Based on content analysis'
  }

  getUrgencySuggestion(level) {
    const suggestions = {
      rush: 'Consider Rush delivery (24h, +25%) for faster turnaround',
      emergency: 'Emergency delivery (12h, +50%) recommended for urgent needs'
    }
    return suggestions[level] || ''
  }

  getPlatformSuggestions(detected, currentPlatforms) {
    const suggestions = []
    
    detected.forEach(({ platform, confidence }) => {
      if (confidence > 70 && !currentPlatforms.includes(platform)) {
        suggestions.push({
          platform,
          confidence,
          message: `Consider adding ${this.getPlatformDisplayName(platform)} to your platform list`
        })
      }
    })

    return suggestions
  }

  getPlatformDisplayName(platform) {
    const displayNames = {
      shopee: 'Shopee',
      lazada: 'Lazada', 
      amazon: 'Amazon',
      instagram: 'Instagram',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      'google-ads': 'Google Ads',
      website: 'Website'
    }
    return displayNames[platform] || platform
  }

  generateOverallRecommendations(platforms, complexity, templates, urgency, assetCount) {
    const recommendations = []

    // Template recommendation
    if (templates.length > 0 && templates[0].confidence > 60) {
      recommendations.push({
        type: 'template',
        priority: 'high',
        message: `${templates[0].templateId.replace('-', ' ')} template recommended (${templates[0].confidence}% match)`,
        action: 'select_template',
        data: templates[0]
      })
    }

    // Platform suggestions
    if (platforms.detected.length > 0) {
      const topPlatform = platforms.detected[0]
      if (topPlatform.confidence > 70) {
        recommendations.push({
          type: 'platform',
          priority: 'medium',
          message: `Auto-detected ${this.getPlatformDisplayName(topPlatform.platform)} in your description`,
          action: 'suggest_platform',
          data: topPlatform
        })
      }
    }

    // Complexity warnings
    if (complexity.hasComplexity) {
      recommendations.push({
        type: 'pricing',
        priority: 'high',
        message: `Complex elements detected: +$${complexity.totalAdditionalCost} additional cost`,
        action: 'show_complexity_warning',
        data: complexity
      })
    }

    // Urgency suggestions
    if (urgency && urgency.confidence > 70) {
      recommendations.push({
        type: 'urgency',
        priority: 'medium',
        message: urgency.suggestion,
        action: 'suggest_urgency',
        data: urgency
      })
    }

    // Asset count estimation
    if (assetCount && assetCount.confidence > 70) {
      recommendations.push({
        type: 'package',
        priority: 'medium',
        message: `Estimated ${assetCount.estimatedCount} assets - verify package size`,
        action: 'suggest_package',
        data: assetCount
      })
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }
}

// Export singleton instance
export const aiAssistant = new AIFormAssistant()