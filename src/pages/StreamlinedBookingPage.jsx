import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Upload, ExternalLink, Plus, Minus, Clock, Tag, X, AlertCircle, Loader2 } from 'lucide-react'
import discountService from '../services/discountService'
import pricingService from '../services/pricingService'
import errorHandler from '../services/errorHandler'

const StreamlinedBookingPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    assetUrl: '',
    projectDescription: '',
    marketplace: '',
    editingType: []
  })
  const [addOns, setAddOns] = useState({
    extraAssets: 0,
    complexBgRemoval: 0,
    rushJob: 'none' // 'none', '24h'
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [step, setStep] = useState('details') // 'details' or 'payment'
  const [showAddOns, setShowAddOns] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(null)
  const [discountError, setDiscountError] = useState('')
  const [discountLoading, setDiscountLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = location.state?.isEnterprise
      ? 'Enterprise Inquiry - SnapShelf Studio'
      : 'Book Your Package - SnapShelf Studio'

    // Handle enterprise inquiries
    if (location.state?.isEnterprise) {
      const enterprisePlan = location.state?.selectedPlan || {
        id: 'enterprise-inquiry',
        name: 'Enterprise Plan',
        priceDisplay: 'Custom Pricing',
        description: 'High-volume photo editing for businesses',
        features: [
          '100+ edits at volume pricing',
          'Priority queue processing',
          'Dedicated account manager',
          '24-hour delivery standard',
          'Unlimited revisions',
          'API integration available',
          'Custom workflow setup'
        ]
      }
      setSelectedPackage(enterprisePlan)
    } else if (location.state?.selectedPackage) {
      setSelectedPackage(location.state.selectedPackage)
    } else {
      // Redirect back to pricing if no package selected
      navigate('/pricing')
      return
    }
  }, [location.state, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const { [name]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleMarketplaceChange = (marketplace) => {
    setFormData(prev => ({
      ...prev,
      marketplace: marketplace
    }))

    // Clear validation error
    if (validationErrors.marketplace) {
      setValidationErrors(prev => {
        const { marketplace: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleEditingTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      editingType: prev.editingType.includes(type)
        ? prev.editingType.filter(t => t !== type)
        : [...prev.editingType, type]
    }))
    
    // Clear validation error
    if (validationErrors.editingType) {
      setValidationErrors(prev => {
        const { editingType: _, ...rest } = prev
        return rest
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Asset URL is optional for enterprise inquiries
    if (!location.state?.isEnterprise && !formData.assetUrl.trim()) {
      errors.assetUrl = 'Please provide asset URL or upload files'
    }

    // Platform selection is required for legacy packages
    if (!location.state?.isNewPricingStructure && !location.state?.isEnterprise) {
      if (!formData.marketplace.trim()) errors.marketplace = 'Please select a target platform'
      if (formData.editingType.length === 0) errors.editingType = 'Please select at least one type of editing'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle discount code application with new service
  const handleApplyDiscount = async () => {
    const code = discountCode.trim()
    
    if (!code) {
      setDiscountError('Please enter a discount code')
      return
    }

    setDiscountLoading(true)
    setDiscountError('')

    try {
      const orderValue = calculateSubtotal()
      const discount = await discountService.validateDiscount(code, orderValue)
      const calculation = discountService.calculateDiscount(discount, orderValue)
      
      if (calculation.error) {
        setDiscountError(calculation.error)
        setAppliedDiscount(null)
      } else {
        setAppliedDiscount({
          ...discount,
          amount: calculation.amount
        })
        setDiscountError('')
      }
    } catch (error) {
      const handledError = errorHandler.handleError(error, { 
        component: 'DiscountValidation',
        code,
        orderValue: calculateSubtotal()
      })
      setDiscountError(handledError.userMessage)
      setAppliedDiscount(null)
    } finally {
      setDiscountLoading(false)
    }
  }

  // Calculate subtotal before discount
  const calculateSubtotal = () => {
    if (!selectedPackage) return 0
    
    // Check if this is using the new pricing structure
    if (location.state?.isNewPricingStructure) {
      // For new pricing structure, the price is already calculated with add-ons
      // Just add any additional add-ons from the booking form
      let basePrice = selectedPackage.price
      const extraAssetsCost = addOns.extraAssets * selectedPackage.pricePerEdit
      const complexBgCost = addOns.complexBgRemoval * 24.90
      const rushCost = addOns.rushJob === '24h' ? basePrice * 0.25 : 0
      
      const subtotal = basePrice + extraAssetsCost + complexBgCost + rushCost
      return Math.round(subtotal * 100) / 100
    } else {
      // Legacy pricing structure calculation
      const basePrice = typeof selectedPackage.price === 'number' 
        ? selectedPackage.price 
        : parseFloat(selectedPackage.price.toString().replace(/[^\d.]/g, ''))
      
      const extraAssetsCost = addOns.extraAssets * (selectedPackage.perEdit ? parseFloat(selectedPackage.perEdit.toString().replace(/[^\d.]/g, '')) : 15)
      const complexBgCost = addOns.complexBgRemoval * 24.90
      const rushCost = addOns.rushJob === '24h' ? basePrice * 0.25 : 0
      
      const subtotal = basePrice + extraAssetsCost + complexBgCost + rushCost
      return Math.round(subtotal * 100) / 100
    }
  }

  // Calculate discount amount using service
  const calculateDiscountAmount = () => {
    if (!appliedDiscount) return 0
    return appliedDiscount.amount || 0
  }

  // Calculate final total price with discount
  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal()
    const discountAmount = calculateDiscountAmount()
    const total = Math.max(0, subtotal - discountAmount)
    return Math.round(total * 100) / 100
  }

  const handleAddOnChange = (type, value) => {
    // Ensure rushJob can only be 'none' or '24h'
    if (type === 'rushJob' && value !== 'none' && value !== '24h') {
      value = 'none'
    }
    setAddOns(prev => ({ ...prev, [type]: value }))
  }


  // Handle discount code removal
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null)
    setDiscountCode('')
    setDiscountError('')
  }

  // Handle discount input change
  const handleDiscountInputChange = (e) => {
    setDiscountCode(e.target.value)
    setDiscountError('') // Clear error when user types
  }

  const handleContinueToOrderSummary = async () => {
    try {
      setLoading(true)
      setErrors({})

      // Validate form data
      const isValid = validateForm()

      if (!isValid) {
        setLoading(false)
        return
      }

      // Handle enterprise inquiries differently
      if (location.state?.isEnterprise) {
        // Submit enterprise inquiry directly
        const response = await fetch('https://formspree.io/f/myzjbenr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            inquiryType: 'Enterprise Sales Inquiry',
            selectedPlan: selectedPackage.name,
            estimatedVolume: formData.projectDescription.includes('100+') ? '100+' : 'To be discussed',
            submissionType: 'Enterprise Inquiry',
            priority: 'HIGH - Enterprise Lead'
          })
        })

        if (response.ok) {
          // Navigate to a thank you page or show success message
          navigate('/checkout/success', {
            state: {
              isEnterprise: true,
              message: 'Thank you for your enterprise inquiry. Our sales team will contact you within 2 hours.'
            }
          })
        } else {
          throw new Error('Failed to submit enterprise inquiry')
        }
        return
      }

      // Regular order flow
      // Create unified order data using pricing service
      let orderData
      try {
        orderData = location.state?.isNewPricingStructure
          ? selectedPackage
          : pricingService.normalizeLegacyPackage(selectedPackage)
      } catch (pricingError) {
        console.error('Error with pricing service:', pricingError)
        // Fallback to using selectedPackage as-is
        orderData = selectedPackage
      }

      // Debug the data being passed
      const summaryData = {
        orderData: {
          ...orderData,
          price: calculateTotalPrice(),
          subtotal: calculateSubtotal()
        },
        customerData: formData,
        discountApplied: appliedDiscount
      }

      // Data ready for order summary

      // Navigate to order summary with all data
      navigate('/checkout/summary', {
        state: summaryData
      })
    } catch (error) {
      const handledError = errorHandler.handleError(error, {
        component: 'OrderSummary',
        step: 'navigation'
      })
      setErrors({ general: handledError.userMessage })
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Submit to backend
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPackage.name,
          packagePrice: `${calculateTotalPrice().toFixed(2)}`,
          basePackage: selectedPackage.priceDisplay,
          subtotal: `${calculateSubtotal().toFixed(2)}`,
          addOns: addOns,
          discount: appliedDiscount ? {
            code: appliedDiscount.code,
            description: appliedDiscount.description,
            amount: calculateDiscountAmount()
          } : null,
          paymentIntentId: paymentIntent.id,
          submissionType: 'Streamlined Booking'
        })
      })

      if (response.ok) {
        navigate('/checkout/success', {
          state: {
            selectedPackage,
            projectData: formData,
            paymentIntent
          }
        })
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
    }
  }

  if (!selectedPackage) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <button
                    onClick={() => navigate('/pricing')}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors md:ml-2"
                  >
                    Pricing
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {location.state?.isEnterprise ? 'Enterprise' : 'Booking'}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 -mx-4 px-4 -mt-8 pt-4 pb-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/pricing')}
                className="flex items-center text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Pricing
              </button>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-bold text-gray-900">
                {location.state?.isEnterprise ? 'Enterprise Inquiry' : 'Complete Your Booking'}
              </h1>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-violet-600">{selectedPackage.priceDisplay}</div>
              <div className="text-sm text-gray-600">
                {location.state?.isEnterprise
                  ? 'Custom pricing'
                  : `${selectedPackage.quantity || selectedPackage.assets || '25'} photos`
                }
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Package Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6  border border-violet-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedPackage.name}</h3>
                <div className="text-right">
                  {(addOns.extraAssets > 0 || addOns.complexBgRemoval > 0 || addOns.rushJob !== 'none' || appliedDiscount) ? (
                    <div>
                      <div className="text-sm text-gray-500 line-through">{selectedPackage.priceDisplay}</div>
                      <div className="text-2xl font-bold text-emerald-600">SGD {calculateTotalPrice().toFixed(2)}</div>
                      {appliedDiscount && (
                        <div className="text-xs text-emerald-600 flex items-center justify-end">
                          <Tag className="w-3 h-3 mr-1" />
                          {appliedDiscount.code} applied
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-violet-600">{selectedPackage.priceDisplay}</div>
                  )}
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                {/* Show dynamic features based on pricing structure */}
                {location.state?.isNewPricingStructure && selectedPackage.features ? (
                  selectedPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>{selectedPackage.assetsIncluded || selectedPackage.quantity || 30} high-quality edited photos</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Professional background removal</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Color correction & enhancement</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>48-72 hour delivery</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Unlimited revisions</span>
                    </div>
                  </>
                )}
              </div>

              {/* Add-ons & Discount Summary */}
              {(addOns.extraAssets > 0 || addOns.complexBgRemoval > 0 || addOns.rushJob !== 'none' || appliedDiscount) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Order Details:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Base package</span>
                      <span>SGD {selectedPackage.priceDisplay.replace('SGD ', '')}</span>
                    </div>
                    {addOns.extraAssets > 0 && (
                      <div className="flex justify-between">
                        <span>Extra assets ({addOns.extraAssets})</span>
                        <span>+SGD {(addOns.extraAssets * (selectedPackage.perEdit ? parseFloat(selectedPackage.perEdit.toString().replace(/[^\d.]/g, '')) : 15)).toFixed(2)}</span>
                      </div>
                    )}
                    {addOns.complexBgRemoval > 0 && (
                      <div className="flex justify-between">
                        <span>Complex BG removal ({addOns.complexBgRemoval})</span>
                        <span>+SGD {(addOns.complexBgRemoval * 24.90).toFixed(2)}</span>
                      </div>
                    )}
                    {addOns.rushJob !== 'none' && (
                      <div className="flex justify-between">
                        <span>Rush delivery ({addOns.rushJob})</span>
                        <span>+SGD {(calculateSubtotal() * 0.25).toFixed(2)}</span>
                      </div>
                    )}
                    {appliedDiscount && (
                      <div className="flex justify-between text-emerald-600">
                        <span className="flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          Discount ({appliedDiscount.code})
                        </span>
                        <span>-SGD {calculateDiscountAmount().toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* What Happens Next */}
            <div className="bg-gradient-to-r from-violet-50 to-violet-300 rounded-2xl p-6 border border-violet-200">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <div className="space-y-2 text-sm text-gray-700">
                {location.state?.isEnterprise ? (
                  <>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                      <span>Our sales team will contact you within 2 hours to discuss your needs</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                      <span>We'll create a custom pricing proposal and workflow plan</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                      <span>Setup dedicated account management and priority processing</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                      <span>We'll review your assets and contact you within 2 hours</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                      <span>Professional editing begins immediately</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                      <span>Delivery within 48-72 hours via email</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            {step === 'details' ? (
              <>
                {/* Contact Details Section */}
                <div className="bg-white rounded-2xl p-6  border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Details</h3>
                  
                  <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                            validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                          }`}
                          placeholder="Your name"
                        />
                        {validationErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                            validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                          }`}
                          placeholder="your@email.com"
                        />
                        {validationErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Asset Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Your Photos {location.state?.isEnterprise ? '(Optional)' : '*'}
                      </label>
                      <input
                        type="url"
                        name="assetUrl"
                        value={formData.assetUrl}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                          validationErrors.assetUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        }`}
                        placeholder="Paste Google Drive, Dropbox, or WeTransfer link"
                      />
                      {validationErrors.assetUrl && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.assetUrl}</p>
                      )}
                      
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start">
                          <ExternalLink className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Quick sharing tips:</p>
                            <p>• Google Drive: Right-click folder → Share → "Anyone with link"</p>
                            <p>• Dropbox: Click Share → Create link</p>
                            <p>• WeTransfer: Upload and share the download link</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details Section - For new pricing structure */}
                {location.state?.isNewPricingStructure && (
                  <div className="bg-white rounded-2xl p-6  border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Project Details</h3>
                  
                  <div className="space-y-6">
                    {/* Platform/Marketplace Selection - Always show this */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Primary Target Platform <span className="text-xs text-gray-500">(Optional)</span>
                      </label>
                      <select
                        value={formData.marketplace}
                        onChange={(e) => handleMarketplaceChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                          validationErrors.marketplace ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <option value="">Choose your primary platform...</option>
                        <option value="shopee">Shopee</option>
                        <option value="lazada">Lazada</option>
                        <option value="amazon">Amazon</option>
                        <option value="shopify">Shopify</option>
                        <option value="meta">Meta/Facebook</option>
                        <option value="tiktok">TikTok Shop</option>
                        <option value="instagram">Instagram</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                      </select>
                      {validationErrors.marketplace && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.marketplace}</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Select your main platform to optimize photo dimensions and quality. You can mention additional platforms in the project description.
                      </p>
                    </div>

                    {/* Show configured services summary for new pricing */}
                    {location.state?.isNewPricingStructure && selectedPackage.addOns && selectedPackage.addOns.length > 0 && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Your Selected Add-on Services
                        </label>
                        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                          <div className="space-y-2 text-sm text-violet-800">
                            {selectedPackage.addOns.map((addOn, index) => (
                              <div key={index} className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-violet-600 mr-2" />
                                <span>{addOn.description} ({addOn.quantity} × ${addOn.pricePerUnit})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Special Instructions */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="Any specific requirements, style preferences, brand guidelines, or special notes..."
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Describe any specific editing requirements, brand colors, style preferences, or other important details.
                      </p>
                    </div>
                  </div>
                </div>
                )}

                {/* Legacy Project Details Section - Only for old packages */}
                {!location.state?.isNewPricingStructure && (
                  /* Original Project Details for Legacy Packages */
                  <div className="bg-white rounded-2xl p-6  border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Project Details</h3>
                    
                    <div className="space-y-6">
                      {/* Marketplace Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Primary Target Platform *
                        </label>
                        <select
                          value={formData.marketplace}
                          onChange={(e) => handleMarketplaceChange(e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                            validationErrors.marketplace ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <option value="">Choose your primary platform...</option>
                          <option value="lazada">Lazada</option>
                          <option value="shopee">Shopee</option>
                          <option value="amazon">Amazon</option>
                          <option value="shopify">Shopify</option>
                          <option value="meta">Meta</option>
                          <option value="other">Other</option>
                        </select>
                        {validationErrors.marketplace && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.marketplace}</p>
                        )}
                      </div>

                      {/* Editing Type Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          Type of Editing * <span className="text-xs text-gray-500">(Select all that apply)</span>
                        </label>
                        <div className="space-y-3">
                          {[
                            { id: 'background-removal', name: 'Background Removal', desc: 'Remove/replace product backgrounds' },
                            { id: 'color-correction', name: 'Color Correction', desc: 'Adjust brightness, contrast, and colors' },
                            { id: 'product-enhancement', name: 'Product Enhancement', desc: 'General touch-ups and improvements' },
                            { id: 'creative-design', name: 'Creative Design', desc: 'Add graphics, text, or design elements' },
                            { id: 'bulk-resizing', name: 'Bulk Resizing', desc: 'Resize images for different platforms' },
                            { id: 'custom', name: 'Custom Requirements', desc: 'Specific editing needs (describe below)' }
                          ].map((type) => (
                            <label key={type.id} className="flex items-start cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.editingType.includes(type.id)}
                                onChange={() => handleEditingTypeChange(type.id)}
                                className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500 mt-1"
                              />
                              <div className="ml-3">
                                <span className="text-sm font-medium text-gray-900">{type.name}</span>
                                <p className="text-xs text-gray-500">{type.desc}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                        {validationErrors.editingType && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.editingType}</p>
                        )}
                      </div>

                      {/* Special Instructions */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Special Instructions (Optional)
                        </label>
                        <textarea
                          name="projectDescription"
                          value={formData.projectDescription}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                          placeholder="Any specific requirements, style preferences, or special notes..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Discount Code Section - Available for all pricing structures */}
                <div className="bg-white rounded-2xl p-6  border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      Have a discount code?
                    </h4>
                  </div>

                  {appliedDiscount ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-emerald-600 mr-2" />
                          <span className="text-sm font-medium text-emerald-800">
                            {appliedDiscount.code} - {appliedDiscount.description}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveDiscount}
                          className="text-emerald-600 hover:text-emerald-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-emerald-600">
                        You save SGD {calculateDiscountAmount().toFixed(2)}!
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={handleDiscountInputChange}
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
                          placeholder="Enter discount code"
                          className="flex-1 px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all uppercase"
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          disabled={discountLoading}
                          className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                          {discountLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Checking...</span>
                            </>
                          ) : (
                            <span>Apply</span>
                          )}
                        </button>
                      </div>
                      {discountError && (
                        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                          {discountError}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        💡 Try: WELCOME10, SAVE20, NEWCLIENT, or FLASH25
                      </div>
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                {/* General Error Display */}
                {errors.general && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <p className="text-red-800 text-sm">{errors.general}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleContinueToOrderSummary}
                  disabled={loading}
                  className="w-full bg-violet-600 text-white py-4 rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : location.state?.isEnterprise ? (
                    <>
                      <span>Submit Enterprise Inquiry</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>Review Order - ${calculateTotalPrice().toFixed(2)}</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-6  border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Secure Payment</h3>
                  <button
                    onClick={() => setStep('details')}
                    className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                  >
                    ← Edit Details
                  </button>
                </div>
                <StripePayment
                  amount={calculateTotalPrice()}
                  onSuccess={handlePaymentSuccess}
                  packageData={selectedPackage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreamlinedBookingPage