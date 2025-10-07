// Discount Service - Handles discount code validation and application
// This service communicates with the backend API to validate and apply discount codes

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

class DiscountService {
  /**
   * Validate a discount code
   * @param {string} code - The discount code to validate
   * @param {number} orderValue - The order value to check minimum requirements
   * @returns {Promise<Object>} Discount details or error
   */
  async validateDiscount(code, orderValue = 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/discounts/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          orderValue,
          timestamp: Date.now()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to validate discount code')
      }

      const discountData = await response.json()
      
      // Validate the response structure
      if (!discountData.valid) {
        throw new Error(discountData.message || 'Invalid discount code')
      }

      return {
        valid: true,
        code: discountData.code,
        type: discountData.type, // 'percentage' or 'fixed'
        value: discountData.value,
        description: discountData.description,
        minimumOrder: discountData.minimumOrder || 0,
        maximumDiscount: discountData.maximumDiscount,
        expiresAt: discountData.expiresAt,
        usageCount: discountData.usageCount,
        usageLimit: discountData.usageLimit
      }
    } catch (error) {
      // Fallback to client-side validation for development/demo
      if (API_BASE_URL.includes('localhost') || import.meta.env.DEV) {
        return this.validateDiscountFallback(code, orderValue)
      }
      
      throw error
    }
  }

  /**
   * Apply a discount to an order value
   * @param {Object} discount - The validated discount object
   * @param {number} orderValue - The order value to apply discount to
   * @returns {Object} Discount calculation details
   */
  calculateDiscount(discount, orderValue) {
    if (!discount.valid) {
      return { amount: 0, finalPrice: orderValue, error: 'Invalid discount' }
    }

    // Check minimum order requirement
    if (discount.minimumOrder && orderValue < discount.minimumOrder) {
      return { 
        amount: 0, 
        finalPrice: orderValue, 
        error: `Minimum order value of $${discount.minimumOrder.toFixed(2)} required` 
      }
    }

    let discountAmount = 0

    if (discount.type === 'percentage') {
      discountAmount = orderValue * (discount.value / 100)
      
      // Apply maximum discount limit if specified
      if (discount.maximumDiscount && discountAmount > discount.maximumDiscount) {
        discountAmount = discount.maximumDiscount
      }
    } else if (discount.type === 'fixed') {
      discountAmount = Math.min(discount.value, orderValue) // Don't exceed order value
    }

    const finalPrice = Math.max(0, orderValue - discountAmount) // Ensure price doesn't go negative

    return {
      amount: Math.round(discountAmount * 100) / 100, // Round to 2 decimal places
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(discountAmount * 100) / 100,
      error: null
    }
  }

  /**
   * Fallback validation for development/demo purposes
   * In production, this should be removed and all validation done server-side
   */
  validateDiscountFallback(code, orderValue) {
    const fallbackDiscounts = {
      'WELCOME10': {
        valid: true,
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        description: '10% off your first order',
        minimumOrder: 50,
        maximumDiscount: 100,
        expiresAt: null,
        usageCount: 0,
        usageLimit: 1
      },
      'SAVE20': {
        valid: true,
        code: 'SAVE20',
        type: 'percentage',
        value: 20,
        description: '20% discount',
        minimumOrder: 100,
        maximumDiscount: 200,
        expiresAt: null,
        usageCount: 0,
        usageLimit: null
      },
      'NEWCLIENT': {
        valid: true,
        code: 'NEWCLIENT',
        type: 'percentage',
        value: 15,
        description: '15% off for new clients',
        minimumOrder: 0,
        maximumDiscount: 150,
        expiresAt: null,
        usageCount: 0,
        usageLimit: 1
      },
      'FLASH25': {
        valid: true,
        code: 'FLASH25',
        type: 'percentage',
        value: 25,
        description: '25% flash sale discount',
        minimumOrder: 200,
        maximumDiscount: 300,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        usageCount: 0,
        usageLimit: 100
      },
      'FIXED50': {
        valid: true,
        code: 'FIXED50',
        type: 'fixed',
        value: 50,
        description: '$50 off your order',
        minimumOrder: 150,
        maximumDiscount: null,
        expiresAt: null,
        usageCount: 0,
        usageLimit: null
      },
      'BULK100': {
        valid: true,
        code: 'BULK100',
        type: 'fixed',
        value: 100,
        description: '$100 off bulk orders',
        minimumOrder: 500,
        maximumDiscount: null,
        expiresAt: null,
        usageCount: 0,
        usageLimit: null
      }
    }

    const upperCode = code.toUpperCase().trim()
    
    if (fallbackDiscounts[upperCode]) {
      const discount = fallbackDiscounts[upperCode]
      
      // Check expiration
      if (discount.expiresAt && new Date() > new Date(discount.expiresAt)) {
        throw new Error('This discount code has expired')
      }
      
      // Check usage limit
      if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
        throw new Error('This discount code has reached its usage limit')
      }
      
      return discount
    }

    throw new Error('Invalid discount code')
  }

  /**
   * Get available discount codes for display (admin/demo purposes)
   * @returns {Array} List of available discount codes
   */
  getAvailableDiscounts() {
    return [
      { code: 'WELCOME10', description: '10% off first order (min $50)' },
      { code: 'SAVE20', description: '20% off (min $100)' },
      { code: 'NEWCLIENT', description: '15% off for new clients' },
      { code: 'FLASH25', description: '25% flash sale (min $200)' },
      { code: 'FIXED50', description: '$50 off (min $150)' },
      { code: 'BULK100', description: '$100 off bulk orders (min $500)' }
    ]
  }

  /**
   * Track discount usage (to be called after successful payment)
   * @param {string} code - The discount code that was used
   * @param {number} orderValue - The order value
   * @param {string} orderId - The order ID
   */
  async trackDiscountUsage(code, orderValue, orderId) {
    try {
      await fetch(`${API_BASE_URL}/api/discounts/track-usage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.toUpperCase().trim(),
          orderValue,
          orderId,
          timestamp: Date.now()
        }),
      })
    } catch (error) {
      console.warn('Failed to track discount usage:', error)
      // Don't throw error as this is non-critical
    }
  }
}

// Create and export a singleton instance
const discountService = new DiscountService()

export default discountService

// Named exports for convenience
export const validateDiscount = discountService.validateDiscount.bind(discountService)
export const calculateDiscount = discountService.calculateDiscount.bind(discountService)
export const trackDiscountUsage = discountService.trackDiscountUsage.bind(discountService)