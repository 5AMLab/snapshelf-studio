import React, { useState } from 'react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { PRICING_CONFIG } from '../config/pricing'
import { useNavigate } from 'react-router-dom'

const PricingPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState('25') // Default to "Up to 25"
  
  if (!isOpen) return null

  // Pricing tiers for quick overview - using current volume discount structure
  const pricingTiers = [
    { value: '5', label: '5-9 edits', price: 18.90, assets: 5, totalPrice: 18.90 * 5, popular: false },
    { value: '25', label: '25-49 edits', price: 15.12, assets: 25, totalPrice: 15.12 * 25, popular: true },
    { value: '50', label: '50-99 edits', price: 13.23, assets: 50, totalPrice: 13.23 * 50, popular: false },
    { value: '100', label: '100+ edits', price: 11.34, assets: 100, totalPrice: 11.34 * 100, popular: false }
  ]

  const activeTier = pricingTiers.find(tier => tier.value === selectedTier) || pricingTiers[1]

  // What's included in all packages
  const includedFeatures = [
    'Background removal',
    'Color correction & enhancement',
    'Crop & resize for all platforms',
    'Creative graphics & infographics',
    '72-hour delivery guarantee'
  ]

  return (
    <div 
      className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        // Only close modal if clicking directly on the backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onMouseDown={(e) => {
        // Prevent backdrop clicks from interfering with input focus
        if (e.target === e.currentTarget) {
          e.preventDefault()
        }
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full h-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative text-center pt-8 pb-4">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pricing Overview
          </h2>
          <p className="text-gray-600 text-sm">Professional photo editing starting from $18.90/edit</p>
        </div>

        {/* Content */}
        <div className="px-6 max-w-md mx-auto">
          
          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {pricingTiers.map((tier) => (
              <button
                key={tier.value}
                onClick={() => setSelectedTier(tier.value)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  selectedTier === tier.value
                    ? 'border-violet-400 bg-violet-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="text-sm text-gray-600 mb-1">{tier.label}</div>
                <div className="text-2xl font-bold text-gray-900">${tier.price}</div>
                <div className="text-xs text-gray-500">per asset</div>
                <div className="text-sm font-medium text-violet-600 mt-2">
                  ${tier.totalPrice.toFixed(0)} total
                </div>
              </button>
            ))}
          </div>

          {/* What's Included */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 text-center">Everything included:</h4>
            <ul className="space-y-2">
              {includedFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-violet-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PricingPopup