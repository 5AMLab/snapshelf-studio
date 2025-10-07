// Centralized pricing configuration
// New simplified base price + volume discount structure

export const PRICING_CONFIG = {
  currency: 'SGD',
  
  // Base pricing structure
  basePricing: {
    basePrice: 18.90,
    basePriceDisplay: '$18.90',
    description: 'Standard edit includes: Background removal, basic color correction, crop and resize to one marketplace',
    minimumOrder: 5,
    
    // Volume discount tiers
    volumeDiscounts: [
      { minQuantity: 5, maxQuantity: 9, discount: 0.00, label: '5-9 edits', price: 18.90 },
      { minQuantity: 10, maxQuantity: 24, discount: 0.09, label: '10-24 edits', price: 17.20 },
      { minQuantity: 25, maxQuantity: 49, discount: 0.18, label: '25-49 edits', price: 15.50 },
      { minQuantity: 50, maxQuantity: 99, discount: 0.27, label: '50-99 edits', price: 13.80 },
      { minQuantity: 100, maxQuantity: 9999, discount: 0.36, label: '100+ edits', price: 12.10 }
    ],
    
    // Add-on services
    addOns: {
      additionalMarketplace: {
        price: 4.00,
        priceDisplay: '+$4.00',
        description: 'Optimize for additional marketplace',
        options: [
          { value: 'amazon', label: 'Amazon', requirements: 'White background, 1000x1000px minimum' },
          { value: 'instagram', label: 'Instagram Shop', requirements: '1:1 ratio, aesthetic background' },
          { value: 'lazada', label: 'Lazada', requirements: '1:1 ratio, white/transparent background' },
          { value: 'shopee', label: 'Shopee', requirements: '1:1 ratio, white background' },
          { value: 'shopify', label: 'Shopify', requirements: '1:1 ratio, white/transparent background' },
          { value: 'woocommerce', label: 'WooCommerce', requirements: '1:1 ratio, white/transparent background' },
          { value: 'zalora', label: 'Zalora', requirements: '1:1 ratio, white background' },
          { value: 'other', label: 'Other marketplace', requirements: 'Custom specifications' }
        ]
      },
      complexBackgroundRemoval: {
        price: 24.90,
        priceDisplay: '+$24.90',
        description: 'Complex background removal for intricate hair, fur, jewelry, or detailed edges'
      },
      advancedRetouching: {
        price: 10.00,
        priceDisplay: '+$10.00',
        description: 'Advanced retouching, color enhancement, and touch-ups'
      },
      creativeGraphics: {
        price: 20.00,
        priceDisplay: '+$20.00',
        description: 'Custom graphics, infographics, and creative compositions'
      },
      rush24h: {
        price: 0, // Price calculated as percentage in component
        priceDisplay: '+25%',
        description: '24-hour rush delivery (25% of order total)'
      }
    }
  },
  
  // Enterprise payment plans
  enterprisePlans: {
    monthly: {
      id: 'enterprise-monthly',
      name: 'Enterprise Monthly',
      type: 'monthly',
      basePrice: 10.90, // 10% better than 100+ volume pricing
      minimumEdits: 100,
      priceDisplay: '$1,090/month',
      description: 'Monthly subscription for 100+ edits',
      features: [
        '100+ edits at $10.90 each',
        'Priority queue processing',
        'Dedicated account manager',
        '24-hour delivery standard',
        'Unlimited revisions',
        'API integration available',
        'Custom workflow setup'
      ],
      popular: false
    },
    annual: {
      id: 'enterprise-annual',
      name: 'Enterprise Annual', 
      type: 'annual',
      basePrice: 9.59, // 12% additional discount vs monthly
      minimumEdits: 100,
      priceDisplay: '$959/month',
      yearlyPrice: 11508,
      yearlyPriceDisplay: '$11,508/year',
      savings: 'Save $1,572/year',
      description: 'Annual subscription for 100+ edits with maximum savings',
      features: [
        '100+ edits at $9.59 each',
        'Priority queue processing',
        'Dedicated account manager',
        '12-hour delivery standard',
        'Unlimited revisions',
        'API integration included',
        'Custom workflow setup',
        'Quarterly business review'
      ],
      popular: true
    }
  },
  
  // Legacy packages (kept for compatibility, marked as deprecated)
  packages: {
    essential: {
      id: 'essential',
      name: 'Starter',
      price: 99,
      priceDisplay: '$99',
      assets: 5,
      duration: '5 assets + 1 Free included',
      perEdit: 18.90,
      discount: 24,
      discountText: '24% bulk discount',
      serviceLevel: {
        icon: '🎨',
        title: 'Starter Package',
        effort: 'Perfect for 3-5 photos',
        timeRequired: '$18.9 per edit (24% bulk discount)'
      },
      features: [
        '5 assets included + 1 free',
        '72-hour delivery',
        '2 rounds of revisions',
        'WebP/JPEG/PNG',
        'Photo background removal',
        'Change background colour',
        'Image resizing',
        'Ad graphic creative',
        'Infographics'
      ],
      popular: false,
      cta: 'Start with 5 Edits'
    },
    
    professional: {
      id: 'professional',
      name: 'Essential',
      price: 399,
      priceDisplay: '$399',
      assets: 25,
      duration: '25 assets included',
      perEdit: 15.90,
      discount: 31,
      discountText: '31% bulk discount',
      serviceLevel: {
        icon: '📋',
        title: 'Essential Package',
        effort: 'Perfect for 5-25 photos',
        timeRequired: '$15.90 per edit (31% bulk discount)'
      },
      features: [
        '25 assets included + 2 free',
        '48-hour delivery',
        '2 rounds of revisions',
        'WebP/JPEG/PNG',
        'Photo background removal',
        'Change background colour',
        'Image resizing',
        'Ad graphic creative',
        'Infographics'
      ],
      popular: true,
      cta: 'Best Value - 25 Edits'
    },
    
    advanced: {
      id: 'advanced',
      name: 'Professional',
      price: 699,
      priceDisplay: '$699',
      assets: 50,
      duration: '50 assets included',
      perEdit: 13.90,
      discount: 34,
      discountText: '34% bulk discount',
      serviceLevel: {
        icon: '⚡',
        title: 'Professional Package',
        effort: 'Perfect for 25-50 photos',
        timeRequired: '$13.90 per edit (34% bulk discount)'
      },
      features: [
        '50 assets included + 3 free',
        '36-hour delivery',
        '3 rounds of revisions',
        'Priority support',
        'WebP/JPEG/PNG',
        'Photo background removal',
        'Change background colour',
        'Image resizing',
        'Ad graphic creative',
        'Infographics'
      ],
      popular: false,
      cta: 'Scale Your Business'
    },
    
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1199,
      priceDisplay: '$1,199',
      assets: 100,
      duration: '100 edits included',
      perEdit: 11.90,
      discount: 43,
      discountText: '43% bulk discount',
      serviceLevel: {
        icon: '🚀',
        title: 'Large Catalog Package',
        effort: 'Perfect for 50+ photos',
        timeRequired: '$11.90 per edit (43% bulk discount)'
      },
      features: [
        '100 edits included + 3 free',
        '12-hour emergency delivery',
        '3 rounds of revisions',
        'Dedicated project manager',
        'Dedicated graphic designer',
        'WebP/JPEG/PNG',
        'Photo background removal',
        'Change background colour',
        'Image resizing',
        'Ad graphic creative',
        'Infographics'
      ],
      popular: false,
      cta: 'Enterprise Volume'
    }
  },
  
  // À la carte pricing from PricingPopup.jsx
  alacarte: {
    perEdit: 21,
    minimum: 0,
    priceDisplay: '$21 per edit',
    description: 'No minimum order'
  },
  
  // Bulk pricing tiers from PricingPopup.jsx
  bulkTiers: [
    { assets: 5, perEdit: 17.01, label: 'Up to 5' },
    { assets: 25, perEdit: 15.12, label: 'Up to 25' },
    { assets: 50, perEdit: 13.23, label: 'Up to 50' },
    { assets: 100, perEdit: 11.34, label: 'Up to 100' }
  ],

  // Bulk catalog processing - simplified e-commerce operations
  catalogProcessing: {
    volume50: {
      id: 'catalog-50',
      name: 'Catalog Starter',
      assets: 50,
      price: 661,
      priceDisplay: '$661',
      perEdit: 13.23,
      discount: 30,
      discountText: '30% bulk discount',
      description: 'Perfect for small to medium catalogs',
      features: [
        'Background removal (white/transparent)',
        'Standardized cropping & resizing', 
        'Basic color correction',
        'Platform-specific formatting',
        'Batch consistency guarantee',
        '48-hour delivery',
        '1 revision round'
      ],
      limitations: [
        'No creative graphics',
        'No infographics', 
        'No custom compositions'
      ]
    },
    volume100: {
      id: 'catalog-100', 
      name: 'Catalog Professional',
      assets: 100,
      price: 1134,
      priceDisplay: '$1,134',
      perEdit: 11.34,
      discount: 40,
      discountText: '40% bulk discount',
      description: 'Ideal for full product catalogs',
      features: [
        'Background removal (white/transparent)',
        'Standardized cropping & resizing',
        'Enhanced color correction',
        'Multi-platform formatting',
        'Batch consistency guarantee', 
        '36-hour delivery',
        '2 revision rounds',
        'Dedicated catalog manager'
      ],
      limitations: [
        'No creative graphics',
        'No infographics',
        'No custom compositions'
      ]
    },
    volume200: {
      id: 'catalog-200',
      name: 'Catalog Enterprise', 
      assets: 200,
      price: 1890,
      priceDisplay: '$1,890',
      perEdit: 9.45,
      discount: 50,
      discountText: '50% bulk discount',
      description: 'For large e-commerce operations',
      features: [
        'Background removal (white/transparent)',
        'Advanced cropping & resizing',
        'Professional color correction',
        'Multi-platform optimization',
        'Batch consistency guarantee',
        '24-hour delivery',
        '2 revision rounds',
        'Dedicated project manager',
        'Custom workflow setup'
      ],
      limitations: [
        'No creative graphics',
        'No infographics', 
        'No custom compositions'
      ]
    }
  },
  
  // Delivery options
  delivery: {
    standard: {
      time: '72 hours',
      price: 0,
      priceDisplay: 'Included',
      description: 'Perfect for most projects'
    },
    rush: {
      time: '48 hours',
      price: 0.25, // 25% surcharge
      priceDisplay: '+25%',
      description: 'Need it faster'
    },
    emergency: {
      time: '24 hours',
      price: 0.50, // 50% surcharge
      priceDisplay: '+50%',
      description: 'Urgent campaign launch'
    }
  }
}

// Helper functions
export const getPackageById = (packageId) => {
  return PRICING_CONFIG.packages[packageId] || null
}

export const getPackagePrice = (packageId) => {
  const pkg = getPackageById(packageId)
  return pkg ? pkg.priceDisplay : null
}

export const getPackagePerEdit = (packageId) => {
  const pkg = getPackageById(packageId)
  return pkg ? pkg.perEdit : null
}

export const calculateTotalPrice = (packageId, deliveryOption = 'standard') => {
  const pkg = getPackageById(packageId)
  const delivery = PRICING_CONFIG.delivery[deliveryOption]
  
  if (!pkg || !delivery) return 0
  
  const basePrice = pkg.price
  const surcharge = basePrice * delivery.price
  return basePrice + surcharge
}

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`
}

export const getAllPackages = () => {
  return Object.values(PRICING_CONFIG.packages)
}

export const getPackageArray = () => {
  return [
    PRICING_CONFIG.packages.essential,
    PRICING_CONFIG.packages.professional,
    PRICING_CONFIG.packages.advanced,
    PRICING_CONFIG.packages.enterprise
  ]
}

export const getCatalogProcessingArray = () => {
  return [
    PRICING_CONFIG.catalogProcessing.volume50,
    PRICING_CONFIG.catalogProcessing.volume100,
    PRICING_CONFIG.catalogProcessing.volume200
  ]
}

// New helper functions for base pricing structure
export const getVolumeDiscount = (quantity) => {
  const tier = PRICING_CONFIG.basePricing.volumeDiscounts.find(
    discount => quantity >= discount.minQuantity && quantity <= discount.maxQuantity
  )
  return tier || PRICING_CONFIG.basePricing.volumeDiscounts[0]
}

export const calculateBasePrice = (quantity) => {
  const tier = getVolumeDiscount(quantity)
  return {
    pricePerEdit: tier.price,
    totalPrice: tier.price * quantity,
    discount: tier.discount,
    label: tier.label,
    savings: quantity * (PRICING_CONFIG.basePricing.basePrice - tier.price)
  }
}

export const calculateOrderTotal = (quantity, addOns = {}) => {
  const baseCalculation = calculateBasePrice(quantity)
  let addOnTotal = 0
  let rushDeliveryTotal = 0
  const appliedAddOns = []
  
  // Calculate add-on costs
  Object.entries(addOns).forEach(([addOnKey, addOnQuantity]) => {
    if (addOnKey === 'rush24h' && addOnQuantity === true) {
      // Handle rush delivery as percentage of base + other add-ons
      const baseAndAddOns = baseCalculation.totalPrice + addOnTotal
      rushDeliveryTotal = baseAndAddOns * 0.25
      appliedAddOns.push({
        name: addOnKey,
        quantity: 1,
        pricePerUnit: rushDeliveryTotal,
        totalCost: rushDeliveryTotal,
        description: PRICING_CONFIG.basePricing.addOns[addOnKey].description
      })
    } else if (addOnQuantity > 0 && PRICING_CONFIG.basePricing.addOns[addOnKey]) {
      const addOn = PRICING_CONFIG.basePricing.addOns[addOnKey]
      const addOnCost = addOn.price * addOnQuantity
      addOnTotal += addOnCost
      appliedAddOns.push({
        name: addOnKey,
        quantity: addOnQuantity,
        pricePerUnit: addOn.price,
        totalCost: addOnCost,
        description: addOn.description
      })
    }
  })
  
  // If rush delivery is selected, recalculate it based on final base + add-ons
  if (addOns.rush24h === true) {
    const baseAndAddOns = baseCalculation.totalPrice + addOnTotal
    rushDeliveryTotal = baseAndAddOns * 0.25
    // Update the rush delivery item in appliedAddOns
    const rushIndex = appliedAddOns.findIndex(item => item.name === 'rush24h')
    if (rushIndex !== -1) {
      appliedAddOns[rushIndex].pricePerUnit = rushDeliveryTotal
      appliedAddOns[rushIndex].totalCost = rushDeliveryTotal
    }
  }
  
  return {
    ...baseCalculation,
    addOnTotal,
    rushDeliveryTotal,
    appliedAddOns,
    grandTotal: baseCalculation.totalPrice + addOnTotal + rushDeliveryTotal,
    breakdown: {
      baseEdits: `${quantity} edits × $${baseCalculation.pricePerEdit} = $${baseCalculation.totalPrice.toFixed(2)}`,
      addOns: appliedAddOns.map(addOn => {
        if (addOn.name === 'rush24h') {
          return `${addOn.description}: $${addOn.totalCost.toFixed(2)}`
        }
        return `${addOn.description}: ${addOn.quantity} × $${addOn.pricePerUnit} = $${addOn.totalCost.toFixed(2)}`
      }),
      total: `$${(baseCalculation.totalPrice + addOnTotal + rushDeliveryTotal).toFixed(2)}`
    }
  }
}

export const getEnterprisePlans = () => {
  return Object.values(PRICING_CONFIG.enterprisePlans)
}

export const getEnterprisePlan = (planType) => {
  return PRICING_CONFIG.enterprisePlans[planType] || null
}

export default PRICING_CONFIG