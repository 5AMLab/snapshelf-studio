import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle, 
  Edit3, 
  Clock, 
  Tag, 
  Shield, 
  CreditCard,
  AlertCircle,
  Info,
  ChevronRight,
  Package,
  User,
  Mail,
  ExternalLink
} from 'lucide-react'
import StripePayment from '../components/StripePayment'

const OrderSummaryPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Extract order data from location state
  const { orderData, customerData, discountApplied } = location.state || {}

  useEffect(() => {
    document.title = 'Review Your Order - Sprintix Studio Pte. Ltd.'
    
    // Debug logging (remove in production)
    // console.log('OrderSummary - location.state:', location.state)
    
    // Add a small delay to ensure navigation is complete
    const timer = setTimeout(() => {
      if (!orderData || !customerData) {
        console.log('OrderSummary - Missing data, redirecting to pricing')
        navigate('/pricing', { replace: true })
        return
      }
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [orderData, customerData, navigate, location.state])

  const handleEditOrder = () => {
    // Go back to booking page with current data
    navigate('/book', { 
      state: { 
        selectedPackage: orderData,
        existingData: customerData,
        discountApplied
      }
    })
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      setIsProcessing(true)
      
      // Submit order to backend
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...customerData,
          packageName: orderData.name,
          packagePrice: orderData.priceDisplay,
          quantity: orderData.quantity,
          addOns: orderData.addOns,
          discount: discountApplied,
          paymentIntentId: paymentIntent.id,
          orderId: orderData.id,
          totalAmount: orderData.price,
          submissionType: 'Order Summary Checkout',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        // Navigate to success page with all order details
        navigate('/checkout/success', {
          state: {
            selectedPackage: orderData,
            projectData: customerData,
            paymentIntent: paymentIntent,
            totalAmount: orderData.price,
            discountApplied: discountApplied
          }
        })
      } else {
        throw new Error('Failed to process order')
      }
    } catch (error) {
      console.error('Error processing order:', error)
      setError('Failed to process your order. Please try again or contact support.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentError = (error) => {
    console.error('Payment error:', error)
    setError('Payment failed. Please check your card details and try again.')
    setIsProcessing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order summary...</p>
        </div>
      </div>
    )
  }

  if (!orderData || !customerData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 border border-gray-200 max-w-md mx-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Data Missing</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your order information. Please start over from the pricing page.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors"
          >
            Back to Pricing
          </button>
        </div>
      </div>
    )
  }

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
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <button
                    onClick={handleEditOrder}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors md:ml-2"
                  >
                    Booking
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Review Order
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleEditOrder}
                className="flex items-center text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Edit Order
              </button>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-bold text-gray-900">Review Your Order</h1>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-violet-600">{orderData.priceDisplay}</div>
              <div className="text-sm text-gray-600">{orderData.quantity} photos</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Package Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Package Details</h3>
                <button
                  onClick={handleEditOrder}
                  className="flex items-center text-violet-600 hover:text-violet-700 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                {/* Package Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{orderData.name}</h4>
                    <p className="text-sm text-gray-600">
                      {orderData.quantity} professional photo edits
                    </p>
                    {orderData.pricePerEdit && (
                      <p className="text-sm text-violet-600">
                        ${orderData.pricePerEdit}/photo
                        {orderData.volumeDiscount > 0 && (
                          <span className="ml-2 text-emerald-600">
                            ({(orderData.volumeDiscount * 100).toFixed(0)}% volume discount)
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      ${(orderData.quantity * orderData.pricePerEdit).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Included Services:</p>
                  <div className="grid gap-1">
                    {orderData.features?.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {orderData.features?.length > 4 && (
                      <p className="text-xs text-gray-500 ml-5">
                        +{orderData.features.length - 4} more services
                      </p>
                    )}
                  </div>
                </div>

                {/* Add-ons */}
                {orderData.addOns && orderData.addOns.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-2">Add-ons:</p>
                    {orderData.addOns.map((addOn, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-gray-600">{addOn.description}</span>
                          {addOn.quantity > 1 && (
                            <span className="text-gray-500"> × {addOn.quantity}</span>
                          )}
                        </div>
                        <span className="font-medium">${(addOn.totalCost || addOn.totalPrice || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${orderData.subtotal?.toFixed(2) || (orderData.quantity * orderData.pricePerEdit).toFixed(2)}</span>
                  </div>
                  
                  {orderData.savings > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Volume Discount Savings</span>
                      <span>-${orderData.savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {discountApplied && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        <span>Discount ({discountApplied.code})</span>
                      </div>
                      <span>-${discountApplied.amount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-violet-600">{orderData.priceDisplay}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Customer Information</h3>
                <button
                  onClick={handleEditOrder}
                  className="flex items-center text-violet-600 hover:text-violet-700 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">{customerData.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{customerData.email}</p>
                  </div>
                </div>

                {customerData.assetUrl && (
                  <div className="flex items-start space-x-3">
                    <ExternalLink className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Photos Location</p>
                      <p className="font-medium text-gray-900 text-sm break-all">
                        {customerData.assetUrl}
                      </p>
                    </div>
                  </div>
                )}

                {customerData.projectDescription && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Special Instructions</p>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {customerData.projectDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Service Timeline */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-violet-600 mr-2" />
                Expected Timeline
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Order Processing</span>
                  <span className="text-violet-700 font-medium">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Asset Review</span>
                  <span className="text-violet-700 font-medium">Within 2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Professional Editing</span>
                  <span className="text-violet-700 font-medium">
                    {orderData.addOns?.some(addon => addon.description?.includes('24h')) 
                      ? '24 hours' 
                      : '24-48 hours'
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Final Delivery</span>
                  <span className="text-emerald-700 font-medium">
                    {orderData.addOns?.some(addon => addon.description?.includes('24h')) 
                      ? '24 hours' 
                      : '48-72 hours'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-6">
            {/* Payment Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Complete your order with secure payment</p>
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <StripePayment
                selectedPackage={{
                  ...orderData,
                  // Ensure amount is passed correctly to Stripe
                  price: orderData.price
                }}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                disabled={isProcessing}
              />
            </div>

            {/* Security & Trust */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                Your Security & Privacy
              </h4>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Bank-level security</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>We never store your card details</span>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Package className="w-5 h-5 text-emerald-600 mr-2" />
                Our Quality Guarantee
              </h4>
              
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-emerald-600 mr-1 mt-0.5 flex-shrink-0" />
                  <span>100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-emerald-600 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Unlimited revisions included</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-emerald-600 mr-1 mt-0.5 flex-shrink-0" />
                  <span>Professional quality editing</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 text-emerald-600 mr-1 mt-0.5 flex-shrink-0" />
                  <span>On-time delivery promise</span>
                </li>
              </ul>
            </div>

            {/* Support Info */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Need Help?</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Our support team is here to help with any questions.
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Email:</strong> support@sprintix.asia<br />
                    <strong>Response:</strong> Within 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummaryPage