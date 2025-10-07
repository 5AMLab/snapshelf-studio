import React, { useState, useEffect } from 'react'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Star from 'lucide-react/dist/esm/icons/star'
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign'
import X from 'lucide-react/dist/esm/icons/x'
import Clock from 'lucide-react/dist/esm/icons/clock'
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle'
import { getPackageArray, PRICING_CONFIG } from '../config/pricing'
import orderQueueService from '../services/orderQueueService'

// Extract numeric values from price strings like "SGD 99" or plain numbers
const extractPrice = (priceValue) => {
  if (typeof priceValue === 'number') return priceValue
  if (typeof priceValue === 'string') {
    const match = priceValue.match(/[\d.]+/)
    return match ? parseFloat(match[0]) : 0
  }
  return 0
}

const UnifiedPackageSelector = ({ 
  onPackageSelect, 
  selectedPackage, 
  assessmentData = null,
  showRecommendations = false,
  onClose
}) => {
  const [step, setStep] = useState('selection') // 'selection', 'review'
  const [showComparison, setShowComparison] = useState(false)
  const [tempSelectedPackage, setTempSelectedPackage] = useState(selectedPackage)
  const [extraAssets, setExtraAssets] = useState(0)
  const [complexBgRemoval, setComplexBgRemoval] = useState(0)
  const [rushJob, setRushJob] = useState('none') // 'none', '24h', '12h'
  const [capacityStatus, setCapacityStatus] = useState(null)
  const [urgencyIndicator, setUrgencyIndicator] = useState(null)

  const packages = getPackageArray()

  // Load capacity status on component mount
  useEffect(() => {
    const loadCapacityStatus = () => {
      const status = orderQueueService.getCapacityStatus()
      const urgency = orderQueueService.getUrgencyIndicator()
      setCapacityStatus(status)
      setUrgencyIndicator(urgency)
    }

    loadCapacityStatus()
    // Refresh every 5 minutes
    const interval = setInterval(loadCapacityStatus, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Get recommended package based on assessment
  const getRecommendedPackage = () => {
    if (!assessmentData) return null
    const { estimatedEdits, recommendedPackage } = assessmentData
    return packages.find(pkg => pkg.id === recommendedPackage)
  }

  const recommendedPkg = getRecommendedPackage()

  const handleSelectPackage = (packageData) => {
    setTempSelectedPackage(packageData)
    setStep('review')
  }

  const handleReviewComplete = () => {
    if (!tempSelectedPackage) return
    
    // Calculate final package with extras
    const basePrice = extractPrice(tempSelectedPackage.price)
    const perEditPrice = extractPrice(tempSelectedPackage.perEdit)
    const complexBgPrice = complexBgRemoval * 24.90
    
    // Rush job pricing
    let rushJobPrice = 0
    if (rushJob === '24h') {
      rushJobPrice = basePrice * 0.25 // 25% surcharge for 24h
    } else if (rushJob === '12h') {
      rushJobPrice = basePrice * 0.5 // 50% surcharge for 12h
    }
    
    const totalPrice = basePrice + (extraAssets * perEditPrice) + complexBgPrice + rushJobPrice
    const totalAssets = tempSelectedPackage.assets + extraAssets
    
    const finalPackage = {
      ...tempSelectedPackage,
      assets: totalAssets,
      price: totalPrice,
      priceDisplay: `${totalPrice.toFixed(2)}`,
      extraAssets: extraAssets,
      complexBgRemoval: complexBgRemoval,
      rushJob: rushJob,
      rushJobPrice: rushJobPrice,
      originalPrice: basePrice,
      originalAssets: tempSelectedPackage.assets
    }
    
    onPackageSelect(finalPackage)
  }

  const handleBackToSelection = () => {
    setStep('selection')
    setExtraAssets(0)
    setComplexBgRemoval(0)
    setRushJob('none')
  }

  if (step === 'review') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
            <p className="text-gray-600">Customize your package with add-ons</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Selected Package Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{tempSelectedPackage.name} Package</h3>
              <p className="text-sm text-gray-600">{tempSelectedPackage.assets} assets included • SGD {tempSelectedPackage.perEdit} per edit</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{tempSelectedPackage.priceDisplay}</div>
            </div>
          </div>

          {/* Package Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {tempSelectedPackage.features?.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="space-y-4 mb-6">
          {/* Extra Assets */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">📦 Add Extra Assets</h4>
            <div className="flex items-center space-x-4 mb-3">
              <label className="text-sm font-medium text-blue-800">Extra assets needed:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExtraAssets(Math.max(0, extraAssets - 1))}
                  className="w-8 h-8 bg-white border border-blue-300 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{extraAssets}</span>
                <button
                  onClick={() => setExtraAssets(extraAssets + 1)}
                  className="w-8 h-8 bg-white border border-blue-300 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-blue-700">@ SGD {tempSelectedPackage.perEdit} each</span>
            </div>
            <div className="text-xs text-blue-700">
              💡 Package rate vs SGD 21/edit separately
            </div>
          </div>

          {/* Complex Background Removal */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-3">✂️ Complex Background Removal</h4>
            <div className="flex items-center space-x-4 mb-3">
              <label className="text-sm font-medium text-amber-800">Complex removals needed:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setComplexBgRemoval(Math.max(0, complexBgRemoval - 1))}
                  className="w-8 h-8 bg-white border border-amber-300 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{complexBgRemoval}</span>
                <button
                  onClick={() => setComplexBgRemoval(complexBgRemoval + 1)}
                  className="w-8 h-8 bg-white border border-amber-300 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-amber-700">@ SGD 24.90 each</span>
            </div>
            <div className="text-xs text-amber-700">
              🎯 For intricate hair, fur, jewelry, or detailed edges
            </div>
          </div>

          {/* Rush Job Add-on */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h4 className="font-medium text-red-900 mb-3 flex items-center">
              ⚡ Rush Job Options
              {capacityStatus && (
                <span className="ml-2 text-xs bg-white px-2 py-1 rounded text-red-600">
                  24h: {capacityStatus.rush24h.available}/{capacityStatus.rush24h.capacity} slots •
                  12h: {capacityStatus.rush12h.available}/{capacityStatus.rush12h.capacity} slots
                </span>
              )}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="rush-none"
                  name="rush-job"
                  value="none"
                  checked={rushJob === 'none'}
                  onChange={(e) => setRushJob(e.target.value)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                />
                <label htmlFor="rush-none" className="text-sm font-medium text-red-800 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Standard Delivery ({tempSelectedPackage.serviceLevel?.timeRequired || '48-72 hours'}) - No extra cost
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="rush-24h"
                  name="rush-job"
                  value="24h"
                  checked={rushJob === '24h'}
                  onChange={(e) => setRushJob(e.target.value)}
                  disabled={capacityStatus && capacityStatus.rush24h.available === 0}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 disabled:opacity-50"
                />
                <label htmlFor="rush-24h" className={`text-sm font-medium flex items-center ${
                  capacityStatus && capacityStatus.rush24h.available === 0
                    ? 'text-red-400 opacity-60'
                    : 'text-red-800'
                }`}>
                  <Clock className="w-4 h-4 mr-1" />
                  24-Hour Rush Delivery - <span className="font-bold">+25% surcharge</span>
                  {capacityStatus && capacityStatus.rush24h.available === 0 && (
                    <span className="ml-2 text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded">FULL</span>
                  )}
                  <span className="text-xs text-red-600 block ml-5">+SGD {(extractPrice(tempSelectedPackage.price) * 0.25).toFixed(2)}</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="rush-12h"
                  name="rush-job"
                  value="12h"
                  checked={rushJob === '12h'}
                  onChange={(e) => setRushJob(e.target.value)}
                  disabled={capacityStatus && capacityStatus.rush12h.available === 0}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 disabled:opacity-50"
                />
                <label htmlFor="rush-12h" className={`text-sm font-medium flex items-center ${
                  capacityStatus && capacityStatus.rush12h.available === 0
                    ? 'text-red-400 opacity-60'
                    : 'text-red-800'
                }`}>
                  <AlertCircle className="w-4 h-4 mr-1" />
                  12-Hour Express Delivery - <span className="font-bold">+50% surcharge</span>
                  {capacityStatus && capacityStatus.rush12h.available === 0 && (
                    <span className="ml-2 text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded">FULL</span>
                  )}
                  <span className="text-xs text-red-600 block ml-5">+SGD {(extractPrice(tempSelectedPackage.price) * 0.5).toFixed(2)}</span>
                </label>
              </div>
            </div>

            <div className="mt-3 text-xs text-red-700">
              ⚠️ Rush jobs are subject to availability and may require pre-approval for complex requests
              {capacityStatus && (capacityStatus.rush24h.available === 0 || capacityStatus.rush12h.available === 0) && (
                <div className="mt-2 p-2 bg-red-100 rounded border border-red-300">
                  <strong>Limited Availability:</strong> Rush slots fill up quickly. Consider booking early or choose standard delivery.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {(extraAssets > 0 || complexBgRemoval > 0 || rushJob !== 'none') && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base package ({tempSelectedPackage.assets} assets):</span>
                <span>SGD {extractPrice(tempSelectedPackage.price).toFixed(2)}</span>
              </div>
              {extraAssets > 0 && (
                <div className="flex justify-between">
                  <span>Extra assets ({extraAssets} × SGD {tempSelectedPackage.perEdit}):</span>
                  <span>SGD {(extraAssets * extractPrice(tempSelectedPackage.perEdit)).toFixed(2)}</span>
                </div>
              )}
              {complexBgRemoval > 0 && (
                <div className="flex justify-between">
                  <span>Complex BG removal ({complexBgRemoval} × SGD 24.90):</span>
                  <span>SGD {(complexBgRemoval * 24.90).toFixed(2)}</span>
                </div>
              )}
              {rushJob !== 'none' && (
                <div className="flex justify-between">
                  <span>Rush delivery ({rushJob === '24h' ? '24-hour' : '12-hour'} - {rushJob === '24h' ? '+50%' : '+80%'}):</span>
                  <span>SGD {(extractPrice(tempSelectedPackage.price) * (rushJob === '24h' ? 0.5 : 0.8)).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-base">
                <span>Total ({tempSelectedPackage.assets + extraAssets} assets{complexBgRemoval > 0 ? ` + ${complexBgRemoval} complex` : ''}{rushJob !== 'none' ? ` + ${rushJob} rush` : ''}):</span>
                <span>SGD {(extractPrice(tempSelectedPackage.price) + extraAssets * extractPrice(tempSelectedPackage.perEdit) + complexBgRemoval * 24.90 + (rushJob === '24h' ? extractPrice(tempSelectedPackage.price) * 0.5 : rushJob === '12h' ? extractPrice(tempSelectedPackage.price) * 0.8 : 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleBackToSelection}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back to Packages
          </button>
          <button
            onClick={handleReviewComplete}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            Continue to Payment
            {(extraAssets > 0 || complexBgRemoval > 0 || rushJob !== 'none') && (
              <span className="ml-2">
                (SGD {(extractPrice(tempSelectedPackage.price) + extraAssets * extractPrice(tempSelectedPackage.perEdit) + complexBgRemoval * 24.90 + (rushJob === '24h' ? extractPrice(tempSelectedPackage.price) * 0.5 : rushJob === '12h' ? extractPrice(tempSelectedPackage.price) * 0.8 : 0)).toFixed(2)})
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {showRecommendations ? 'Your Recommended Packages' : 'Choose Your Edit Package'}
          </h2>
          <p className="text-gray-600">
            {showRecommendations 
              ? 'Based on your needs, we recommend these packages'
              : `Select your preferred bulk package or choose à la carte pricing (${PRICING_CONFIG.alacarte.priceDisplay})`
            }
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Dynamic Urgency Indicator */}
      <div className="flex justify-center mb-6">
        {urgencyIndicator && (
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium border ${
            urgencyIndicator.color === 'red'
              ? 'bg-red-50 text-red-700 border-red-200'
              : urgencyIndicator.color === 'orange'
                ? 'bg-orange-50 text-orange-700 border-orange-200'
                : urgencyIndicator.color === 'yellow'
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              urgencyIndicator.color === 'red' ? 'bg-red-500' :
              urgencyIndicator.color === 'orange' ? 'bg-orange-500' :
              urgencyIndicator.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
            } ${urgencyIndicator.animate ? 'animate-pulse' : ''}`}></div>
            <span>⚡ {urgencyIndicator.message}</span>
            {capacityStatus && urgencyIndicator.level !== 'normal' && (
              <span className="text-xs opacity-80">
                • {capacityStatus.regular.available}/{capacityStatus.regular.capacity} slots left
              </span>
            )}
          </div>
        )}
      </div>

      {/* Recommended Package (if applicable) */}
      {recommendedPkg && showRecommendations && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-900">🎯 Perfect Match for You</h3>
                <p className="text-sm text-purple-700">Based on your {assessmentData.estimatedEdits} estimated edits</p>
              </div>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900">{recommendedPkg.name} Package</h4>
                <p className="text-sm text-gray-600">{recommendedPkg.assets} assets • {recommendedPkg.priceDisplay}</p>
              </div>
              <div className="md:text-right">
                <button
                  onClick={() => handleSelectPackage(recommendedPkg)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Select Recommended
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Grid */}
      <div className="grid md:grid-cols-2 gap-12 px-4 mb-8">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`relative bg-white rounded-3xl transition-all duration-300 ${
              pkg.popular 
                ? 'border-2 border-indigo-500 shadow-xl' 
                : recommendedPkg?.id === pkg.id && showRecommendations
                  ? 'border-2 border-green-500 shadow-xl'
                  : 'border border-gray-200 shadow-md hover:shadow-lg'
            } ${tempSelectedPackage?.id === pkg.id ? 'ring-2 ring-indigo-200' : ''}`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute -top-3 right-6">
                <div className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most popular
                </div>
              </div>
            )}

            {/* New Badge */}
            {pkg.isNew && !pkg.popular && (
              <div className="absolute -top-3 right-6">
                <div className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  New Package
                </div>
              </div>
            )}

            {/* Recommended Badge */}
            {recommendedPkg?.id === pkg.id && showRecommendations && !pkg.popular && (
              <div className="absolute -top-3 right-6">
                <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Plan Name */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pkg.serviceLevel?.effort || pkg.duration}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{pkg.priceDisplay}</span>
                  <span className="text-gray-500 ml-2">/package</span>
                </div>
              </div>

              {/* Buy Button */}
              <button 
                type="button"
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 mb-8 ${
                  tempSelectedPackage?.id === pkg.id
                    ? 'bg-green-600 text-white'
                    : pkg.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : recommendedPkg?.id === pkg.id && showRecommendations
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'border border-gray-300 text-gray-700 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {tempSelectedPackage?.id === pkg.id ? (
                  <span className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Selected</span>
                  </span>
                ) : (
                  pkg.cta || 'Choose Plan'
                )}
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {pkg.features?.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
                
                {/* Per-edit pricing highlight */}
                <li className="flex items-center space-x-3 pt-2 border-t border-gray-100">
                  <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-emerald-600 text-sm font-medium">SGD {pkg.perEdit} per edit ({pkg.discount}% bulk discount)</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Package Comparison */}
      <div className="text-center">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
        >
          <BarChart3 className="w-4 h-4" />
          <span>{showComparison ? 'Hide' : 'Show'} Package Comparison</span>
        </button>
      </div>

      {/* Comparison Table */}
      {showComparison && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                  {packages.map((pkg) => (
                    <th key={pkg.id} className={`px-6 py-4 text-center text-sm font-medium text-gray-900 ${
                      pkg.popular ? 'bg-indigo-50 text-indigo-900' : ''
                    }`}>
                      <div className="relative">
                        {pkg.name}
                        {pkg.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <span className="bg-indigo-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                              Most Popular
                            </span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Package Price Row */}
                <tr className="bg-blue-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Package Price</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`px-6 py-4 text-center ${
                      pkg.popular ? 'bg-indigo-50' : ''
                    }`}>
                      <div className="text-lg font-bold text-gray-900">{pkg.priceDisplay}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Assets Included</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`px-6 py-4 text-center text-sm text-gray-600 ${
                      pkg.popular ? 'bg-indigo-50' : ''
                    }`}>
                      {pkg.assets}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Price per Edit</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`px-6 py-4 text-center text-sm ${
                      pkg.popular ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600'
                    }`}>
                      SGD {pkg.perEdit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Delivery Time</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`px-6 py-4 text-center text-sm text-gray-600 ${
                      pkg.popular ? 'bg-indigo-50' : ''
                    }`}>
                      {pkg.serviceLevel?.timeRequired}
                    </td>
                  ))}
                </tr>
                {/* Buy Buttons Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-6 text-sm font-medium text-gray-900">Choose Plan</td>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className={`px-6 py-6 text-center ${
                      pkg.popular ? 'bg-indigo-50' : ''
                    }`}>
                      <button
                        onClick={() => handleSelectPackage(pkg)}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                          tempSelectedPackage?.id === pkg.id
                            ? 'bg-green-600 text-white'
                            : pkg.popular
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}
                      >
                        {tempSelectedPackage?.id === pkg.id ? 'Selected' : 'Choose Plan'}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default UnifiedPackageSelector