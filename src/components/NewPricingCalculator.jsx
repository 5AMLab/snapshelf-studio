import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  calculateOrderTotal,
  getVolumeDiscount,
  getEnterprisePlans,
  PRICING_CONFIG
} from '../config/pricing'
import {
  CalculatorIcon as Calculator,
  CheckCircleIcon as CheckCircle,
  StarIcon as Star,
  ChartBarIcon as TrendingUp,
  TagIcon,
  ClockIcon as Clock,
  ArrowRightIcon as ArrowRight,
  ExclamationTriangleIcon as AlertTriangle
} from '@heroicons/react/24/outline'
import orderQueueService from '../services/orderQueueService'

const NewPricingCalculator = () => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(5)
  const [addOns, setAddOns] = useState({
    additionalMarketplace: 0,
    complexBackgroundRemoval: 0,
    advancedRetouching: 0,
    creativeGraphics: 0,
    rush24h: false
  })
  const [selectedMarketplace, setSelectedMarketplace] = useState('')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [capacityStatus, setCapacityStatus] = useState(null)
  const [deliveryEstimate, setDeliveryEstimate] = useState(null)

  // Load capacity status and calculate delivery estimates
  useEffect(() => {
    const loadCapacityInfo = () => {
      const capacity = orderQueueService.getCapacityStatus()
      const urgency = orderQueueService.getUrgencyIndicator()
      const delivery = orderQueueService.calculateDeliveryDate('standard', addOns.rush24h, addOns.rush24h ? '24h' : null)

      setCapacityStatus({ capacity, urgency })
      setDeliveryEstimate(delivery)
    }

    loadCapacityInfo()
    // Refresh every 5 minutes
    const interval = setInterval(loadCapacityInfo, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [addOns.rush24h])
  
  const calculation = calculateOrderTotal(quantity, addOns)
  const volumeTier = getVolumeDiscount(quantity)
  const enterprisePlans = getEnterprisePlans()

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || PRICING_CONFIG.basePricing.minimumOrder
    const newQuantity = Math.max(PRICING_CONFIG.basePricing.minimumOrder, value)
    setQuantity(newQuantity)
    
    // Auto-sync additional marketplace quantity if it's enabled
    if (addOns.additionalMarketplace > 0) {
      setAddOns(prev => ({
        ...prev,
        additionalMarketplace: newQuantity
      }))
    }
  }

  const handleAddOnChange = (addOnKey, value) => {
    setAddOns(prev => ({
      ...prev,
      [addOnKey]: addOnKey === 'rush24h' ? value : Math.max(0, parseInt(value) || 0)
    }))
  }

  const handleGetStarted = () => {
    // Create order data in the format expected by the checkout flow
    const orderData = {
      id: 'new-pricing-structure',
      name: 'Custom Order',
      quantity: quantity,
      price: calculation.grandTotal,
      priceDisplay: `$${calculation.grandTotal.toFixed(2)}`,
      pricePerEdit: calculation.pricePerEdit,
      basePrice: PRICING_CONFIG.basePricing.basePrice,
      volumeDiscount: calculation.discount,
      volumeTier: calculation.label,
      savings: calculation.savings,
      addOns: calculation.appliedAddOns,
      selectedMarketplace: selectedMarketplace,
      breakdown: calculation.breakdown,
      features: [
        'Background removal',
        'Basic color correction', 
        'Crop and resize',
        'Platform optimization',
        `${calculation.pricePerEdit < PRICING_CONFIG.basePricing.basePrice ? `${(calculation.discount * 100).toFixed(0)}% volume discount` : 'Standard pricing'}`,
        'Professional quality guarantee'
      ],
      serviceLevel: {
        timeRequired: '48-72 hours',
        title: 'Professional Editing Package',
        effort: `${quantity} photo${quantity !== 1 ? 's' : ''} professionally edited`
      }
    }

    // Navigate to checkout with order data
    navigate('/book', { 
      state: { 
        selectedPackage: orderData,
        isNewPricingStructure: true 
      }
    })
  }

  const quickQuantityButtons = [5, 25, 50, 100]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Capacity Indicator */}
      {capacityStatus && (
        <div className="flex justify-center mb-12">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${
            capacityStatus.urgency.color === 'red'
              ? 'bg-red-50 text-red-700 border-red-200'
              : capacityStatus.urgency.color === 'orange'
                ? 'bg-orange-50 text-orange-700 border-orange-200'
                : capacityStatus.urgency.color === 'yellow'
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              capacityStatus.urgency.color === 'red' ? 'bg-red-500' :
              capacityStatus.urgency.color === 'orange' ? 'bg-orange-500' :
              capacityStatus.urgency.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
            } ${capacityStatus.urgency.animate ? 'animate-pulse' : ''}`}></div>
            <Clock className="w-4 h-4" />
            <span>{capacityStatus.urgency.message}</span>
            {deliveryEstimate && (
              <span className="text-xs opacity-80">
                • Delivery: {deliveryEstimate.message}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Calculator Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Calculate Your Price</h3>
          </div>

          {/* Quantity Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How many photos do you need edited?
            </label>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="number"
                min={PRICING_CONFIG.basePricing.minimumOrder}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
              <span className="text-gray-600">photos</span>
            </div>
            
            {/* Quick Select Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuantityButtons.map(num => (
                <button
                  key={num}
                  onClick={() => {
                    setQuantity(num)
                    // Auto-sync additional marketplace quantity if it's enabled
                    if (addOns.additionalMarketplace > 0) {
                      setAddOns(prev => ({
                        ...prev,
                        additionalMarketplace: num
                      }))
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    quantity === num
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Volume Discount Display */}
            <div className="bg-violet-50 rounded-lg p-3 sm:p-4 border border-violet-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <TagIcon className="w-5 h-5 text-violet-600" />
                  <span className="font-medium text-violet-900">
                    {volumeTier.label} tier
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg font-bold text-violet-600">
                    ${volumeTier.price}/edit
                  </div>
                  {volumeTier.discount > 0 && (
                    <div className="text-sm text-violet-700">
                      {(volumeTier.discount * 100).toFixed(0)}% discount
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Optional Add-ons</h4>
            <div className="space-y-4">
              {Object.entries(PRICING_CONFIG.basePricing.addOns).map(([key, addOn]) => {
                if (key === 'rush24h') {
                  const isRushAvailable = capacityStatus?.capacity.rush24h.available > 0
                  const rushCapacityText = capacityStatus ?
                    `${capacityStatus.capacity.rush24h.available}/${capacityStatus.capacity.rush24h.capacity} slots left` : ''

                  return (
                    <div key={key} className="py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1">
                            <div className="font-medium text-gray-900 text-sm mb-1">
                              {addOn.description}
                            </div>
                            {capacityStatus && (
                              <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                                isRushAvailable
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {isRushAvailable ? rushCapacityText : 'FULL'}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {addOn.priceDisplay} of order total
                            {deliveryEstimate && addOns[key] && (
                              <span className="block text-green-600 font-medium">
                                ⚡ {deliveryEstimate.message}
                              </span>
                            )}
                          </div>
                          {!isRushAvailable && capacityStatus && (
                            <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                              <AlertTriangle className="w-3 h-3 inline mr-1" />
                              Rush capacity full. Next available: Tomorrow
                            </div>
                          )}
                        </div>
                        <div className="flex items-center ml-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={addOns[key] || false}
                              disabled={!isRushAvailable}
                              onChange={(e) => handleAddOnChange(key, e.target.checked)}
                              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <span className={`ml-2 text-sm ${!isRushAvailable ? 'text-gray-400' : 'text-gray-700'}`}>
                              {isRushAvailable ? 'Enable' : 'Unavailable'}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )
                }
                
                // Special handling for additional marketplace - should match photo quantity
                if (key === 'additionalMarketplace') {
                  const isEnabled = addOns[key] > 0
                  const selectedOption = addOn.options.find(opt => opt.value === selectedMarketplace)
                  
                  return (
                    <div key={key} className="py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm mb-1">
                            {addOn.description}
                          </div>
                          <div className="text-sm text-gray-600">
                            {addOn.priceDisplay} per photo × {quantity} photos = ${(addOn.price * quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={(e) => {
                                const enabled = e.target.checked
                                handleAddOnChange(key, enabled ? quantity : 0)
                                if (!enabled) {
                                  setSelectedMarketplace('')
                                }
                              }}
                              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Enable</span>
                          </label>
                        </div>
                      </div>
                      
                      {/* Marketplace Selection Dropdown */}
                      {isEnabled && (
                        <div className="mt-3 pl-4 border-l-2 border-violet-200">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select marketplace to optimize for:
                          </label>
                          <select
                            value={selectedMarketplace}
                            onChange={(e) => setSelectedMarketplace(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                          >
                            <option value="">Choose a marketplace...</option>
                            {addOn.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          
                          {selectedOption && (
                            <div className="mt-2 p-2 bg-violet-50 rounded-lg border border-violet-200">
                              <div className="text-xs text-violet-700">
                                <strong>Requirements:</strong> {selectedOption.requirements}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        {addOn.description}
                      </div>
                      <div className="text-sm text-gray-600">
                        {addOn.priceDisplay} per item
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleAddOnChange(key, addOns[key] - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
                        disabled={addOns[key] <= 0}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{addOns[key]}</span>
                      <button
                        onClick={() => handleAddOnChange(key, addOns[key] + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Total Display */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
            <div className="text-center">
              <div className="text-sm text-green-700 font-medium mb-2">
                Total for {quantity} edit{quantity !== 1 ? 's' : ''}
                {calculation.appliedAddOns.length > 0 && ' + add-ons'}
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-green-800 mb-2">
                ${calculation.grandTotal.toFixed(2)}
              </div>
              {calculation.savings > 0 && (
                <div className="text-sm text-green-600">
                  You save ${calculation.savings.toFixed(2)} with volume pricing!
                </div>
              )}
              
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-sm text-green-700 underline mt-2 hover:text-green-800"
              >
                {showBreakdown ? 'Hide' : 'Show'} price breakdown
              </button>
              
              {showBreakdown && (
                <div className="mt-4 text-left bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-sm space-y-1 text-gray-700">
                    <div className="font-medium text-gray-900 mb-2">Price Breakdown:</div>
                    <div>{calculation.breakdown.baseEdits}</div>
                    {calculation.breakdown.addOns.map((addOn, index) => (
                      <div key={index}>{addOn}</div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 font-semibold text-gray-900">
                      Total: {calculation.breakdown.total}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center">
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto mt-4 bg-violet-950 text-white px-8 py-3 rounded-[3rem] font-semibold hover:bg-violet-900 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Submit & Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise & Volume Tiers */}
        <div className="space-y-6 lg:space-y-8">
          {/* Volume Discount Tiers */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-violet-600 mr-2" />
              Volume Discount Tiers
            </h3>
            <div className="space-y-3">
              {PRICING_CONFIG.basePricing.volumeDiscounts.map((tier, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-colors ${
                    quantity >= tier.minQuantity && quantity <= tier.maxQuantity
                      ? 'border-violet-300 bg-violet-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{tier.label}</div>
                      {tier.discount > 0 && (
                        <div className="text-sm text-violet-600">
                          {(tier.discount * 100).toFixed(0)}% discount
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${tier.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">per edit</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Plans */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-amber-500 mr-2" />
              Enterprise Plans
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              For high-volume businesses needing 100+ edits per month
            </p>
            
            <div className="space-y-4">
              {enterprisePlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`border rounded-lg p-4 ${
                    plan.popular 
                      ? 'border-amber-300 bg-amber-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center">
                        {plan.name}
                        {plan.popular && (
                          <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{plan.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${plan.basePrice}/edit
                      </div>
                      <div className="text-sm text-gray-500">
                        {plan.priceDisplay}
                      </div>
                    </div>
                  </div>
                  
                  {plan.savings && (
                    <div className="text-sm text-green-600 font-medium mb-2">
                      {plan.savings}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {plan.features[3]} {/* Delivery time feature */}
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Dedicated support
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => navigate('/book', {
                state: {
                  isEnterprise: true,
                  inquiryType: 'enterprise',
                  selectedPlan: enterprisePlans.find(p => p.popular) || enterprisePlans[0]
                }
              })}
              className="w-full mt-4 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Contact Sales</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPricingCalculator