// Unified Pricing Service - Handles all pricing calculations consistently
// Consolidates new pricing structure with legacy package support

import { PRICING_CONFIG } from '../config/pricing'

class PricingService {
  constructor() {
    this.basePrice = PRICING_CONFIG.basePricing.basePrice
    this.minimumOrder = PRICING_CONFIG.basePricing.minimumOrder
    this.volumeDiscounts = PRICING_CONFIG.basePricing.volumeDiscounts
    this.addOns = PRICING_CONFIG.basePricing.addOns
  }

  /**
   * Calculate pricing for a given quantity with add-ons
   * @param {number} quantity - Number of photos to edit
   * @param {Object} addOns - Add-on selections
   * @param {Object} options - Additional options like marketplace selection
   * @returns {Object} Complete pricing breakdown
   */
  calculatePricing(quantity, addOns = {}, options = {}) {
    const validatedQuantity = Math.max(this.minimumOrder, parseInt(quantity) || this.minimumOrder)
    
    // Get volume tier
    const volumeTier = this.getVolumeTier(validatedQuantity)
    
    // Calculate base cost
    const baseCost = validatedQuantity * volumeTier.price
    
    // Calculate add-on costs
    const addOnCosts = this.calculateAddOnCosts(validatedQuantity, addOns, options)
    
    // Calculate subtotal
    const subtotal = baseCost + addOnCosts.total
    
    // Calculate savings from volume discount
    const fullPriceCost = validatedQuantity * this.basePrice
    const volumeSavings = Math.max(0, fullPriceCost - baseCost)
    
    return {
      quantity: validatedQuantity,
      basePrice: this.basePrice,
      pricePerEdit: volumeTier.price,
      volumeTier: volumeTier,
      baseCost: Math.round(baseCost * 100) / 100,
      addOns: addOnCosts,
      subtotal: Math.round(subtotal * 100) / 100,
      volumeSavings: Math.round(volumeSavings * 100) / 100,
      volumeDiscount: volumeTier.discount,
      breakdown: this.generateBreakdown(validatedQuantity, volumeTier, addOnCosts)
    }
  }

  /**
   * Get the appropriate volume tier for a quantity
   * @param {number} quantity - Number of photos
   * @returns {Object} Volume tier information
   */
  getVolumeTier(quantity) {
    for (let i = this.volumeDiscounts.length - 1; i >= 0; i--) {
      const tier = this.volumeDiscounts[i]
      if (quantity >= tier.minQuantity && quantity <= tier.maxQuantity) {
        return tier
      }
    }
    
    // Fallback to base pricing
    return {
      label: 'Standard',
      price: this.basePrice,
      discount: 0,
      minQuantity: 1,
      maxQuantity: this.minimumOrder - 1
    }
  }

  /**
   * Calculate add-on costs
   * @param {number} quantity - Base quantity
   * @param {Object} addOns - Add-on selections
   * @param {Object} options - Additional options
   * @returns {Object} Add-on cost breakdown
   */
  calculateAddOnCosts(quantity, addOns, options = {}) {
    const costs = {
      items: [],
      total: 0
    }

    Object.entries(this.addOns).forEach(([key, addOnConfig]) => {
      const addOnQuantity = addOns[key] || 0

      if (key === 'rush24h' && addOns[key] === true) {
        // Rush delivery is a percentage of the base cost
        const baseCost = quantity * this.getVolumeTier(quantity).price
        const rushCost = baseCost * addOnConfig.percentage
        
        costs.items.push({
          key,
          description: addOnConfig.description,
          quantity: 1,
          unitPrice: rushCost,
          totalPrice: rushCost,
          type: 'percentage'
        })
        
        costs.total += rushCost
      } else if (addOnQuantity > 0) {
        const totalPrice = addOnQuantity * addOnConfig.price
        
        costs.items.push({
          key,
          description: addOnConfig.description,
          quantity: addOnQuantity,
          unitPrice: addOnConfig.price,
          totalPrice,
          type: 'fixed',
          // Include marketplace-specific info if applicable
          ...(key === 'additionalMarketplace' && options.selectedMarketplace && {
            marketplaceInfo: addOnConfig.options.find(opt => opt.value === options.selectedMarketplace)
          })
        })
        
        costs.total += totalPrice
      }
    })

    costs.total = Math.round(costs.total * 100) / 100
    return costs
  }

  /**
   * Generate a human-readable pricing breakdown
   * @param {number} quantity - Quantity of photos
   * @param {Object} volumeTier - Volume tier information
   * @param {Object} addOnCosts - Add-on cost breakdown
   * @returns {Object} Formatted breakdown
   */
  generateBreakdown(quantity, volumeTier, addOnCosts) {
    const breakdown = {
      baseEdits: `${quantity} photo edits × $${volumeTier.price} = $${(quantity * volumeTier.price).toFixed(2)}`,
      addOns: [],
      total: ''
    }

    // Add volume discount info
    if (volumeTier.discount > 0) {
      breakdown.volumeDiscount = `${volumeTier.label} - ${(volumeTier.discount * 100).toFixed(0)}% volume discount applied`
    }

    // Add-on breakdown
    addOnCosts.items.forEach(item => {
      if (item.type === 'percentage') {
        breakdown.addOns.push(`${item.description}: +$${item.totalPrice.toFixed(2)}`)
      } else {
        breakdown.addOns.push(`${item.description} (${item.quantity}): +$${item.totalPrice.toFixed(2)}`)
      }
    })

    const total = (quantity * volumeTier.price) + addOnCosts.total
    breakdown.total = `Total: $${total.toFixed(2)}`

    return breakdown
  }

  /**
   * Convert legacy package to new pricing structure
   * @param {Object} legacyPackage - Legacy package object
   * @returns {Object} Normalized pricing object
   */
  normalizeLegacyPackage(legacyPackage) {
    const quantity = legacyPackage.assetsIncluded || legacyPackage.quantity || 30
    const price = typeof legacyPackage.price === 'number' 
      ? legacyPackage.price 
      : parseFloat(legacyPackage.priceDisplay?.replace(/[^\d.]/g, '') || '0')
    
    // Calculate equivalent per-edit price
    const pricePerEdit = quantity > 0 ? price / quantity : this.basePrice
    
    return {
      id: legacyPackage.id || 'legacy',
      name: legacyPackage.name,
      quantity: quantity,
      price: price,
      pricePerEdit: Math.round(pricePerEdit * 100) / 100,
      priceDisplay: legacyPackage.priceDisplay || `$${price.toFixed(2)}`,
      features: legacyPackage.features || this.getDefaultFeatures(),
      serviceLevel: legacyPackage.serviceLevel || { timeRequired: '48-72 hours' },
      isLegacy: true
    }
  }

  /**
   * Create order data in consistent format
   * @param {Object} pricingResult - Result from calculatePricing
   * @param {Object} options - Additional options (marketplace, etc.)
   * @param {Object} discountInfo - Applied discount information
   * @returns {Object} Order data object
   */
  createOrderData(pricingResult, options = {}, discountInfo = null) {
    const orderId = this.generateOrderId()
    
    let finalPrice = pricingResult.subtotal
    if (discountInfo && discountInfo.amount > 0) {
      finalPrice = Math.max(0, pricingResult.subtotal - discountInfo.amount)
    }
    
    return {
      id: orderId,
      name: 'Custom Photo Editing Package',
      quantity: pricingResult.quantity,
      price: Math.round(finalPrice * 100) / 100,
      priceDisplay: `$${finalPrice.toFixed(2)}`,
      pricePerEdit: pricingResult.pricePerEdit,
      basePrice: pricingResult.basePrice,
      volumeDiscount: pricingResult.volumeDiscount,
      volumeTier: pricingResult.volumeTier.label,
      savings: pricingResult.volumeSavings,
      addOns: pricingResult.addOns.items,
      selectedMarketplace: options.selectedMarketplace,
      breakdown: pricingResult.breakdown,
      discount: discountInfo,
      subtotal: pricingResult.subtotal,
      features: this.getPackageFeatures(pricingResult),
      serviceLevel: this.getServiceLevel(pricingResult),
      createdAt: new Date(),
      isNewPricingStructure: true
    }
  }

  /**
   * Get default features for packages
   * @returns {Array} List of default features
   */
  getDefaultFeatures() {
    return [
      'Professional background removal',
      'Color correction & enhancement',
      'Image optimization for web',
      'Platform-ready formatting',
      'Unlimited revisions',
      'Quality guarantee'
    ]
  }

  /**
   * Get features based on pricing configuration
   * @param {Object} pricingResult - Pricing calculation result
   * @returns {Array} List of features
   */
  getPackageFeatures(pricingResult) {
    const baseFeatures = [
      'Background removal',
      'Basic color correction',
      'Crop and resize',
      'Platform optimization'
    ]

    // Add volume discount feature
    if (pricingResult.volumeDiscount > 0) {
      baseFeatures.push(`${(pricingResult.volumeDiscount * 100).toFixed(0)}% volume discount`)
    }

    // Add add-on features
    pricingResult.addOns.items.forEach(addOn => {
      baseFeatures.push(addOn.description)
    })

    baseFeatures.push('Professional quality guarantee')
    return baseFeatures
  }

  /**
   * Get service level based on add-ons
   * @param {Object} pricingResult - Pricing calculation result
   * @returns {Object} Service level information
   */
  getServiceLevel(pricingResult) {
    const hasRushDelivery = pricingResult.addOns.items.some(
      addOn => addOn.key === 'rush24h'
    )

    return {
      timeRequired: hasRushDelivery ? '24 hours' : '48-72 hours',
      title: 'Professional Editing Package',
      effort: `${pricingResult.quantity} photo${pricingResult.quantity !== 1 ? 's' : ''} professionally edited`
    }
  }

  /**
   * Generate a unique order ID
   * @returns {string} Order ID
   */
  generateOrderId() {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substr(2, 3).toUpperCase()
    return `SS${timestamp}${random}`
  }

  /**
   * Validate pricing input
   * @param {number} quantity - Quantity to validate
   * @param {Object} addOns - Add-ons to validate
   * @returns {Object} Validation result
   */
  validateInput(quantity, addOns = {}) {
    const errors = []
    
    const qty = parseInt(quantity)
    if (!qty || qty < this.minimumOrder) {
      errors.push(`Minimum order is ${this.minimumOrder} photos`)
    }
    
    if (qty > 10000) {
      errors.push('Maximum order is 10,000 photos. Please contact us for larger orders.')
    }

    // Validate add-ons
    Object.entries(addOns).forEach(([key, value]) => {
      if (key === 'rush24h') {
        if (typeof value !== 'boolean') {
          errors.push('Rush delivery must be true or false')
        }
      } else {
        const numValue = parseInt(value)
        if (value !== 0 && (!numValue || numValue < 0)) {
          errors.push(`Invalid quantity for ${key}`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors
    }
  }
}

// Create and export singleton instance
const pricingService = new PricingService()
export default pricingService

// Named exports for convenience
export const calculatePricing = pricingService.calculatePricing.bind(pricingService)
export const getVolumeTier = pricingService.getVolumeTier.bind(pricingService)
export const normalizeLegacyPackage = pricingService.normalizeLegacyPackage.bind(pricingService)
export const createOrderData = pricingService.createOrderData.bind(pricingService)