import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Home, Mail, Clock, Copy, Download, ExternalLink, ArrowRight, Tag, Star } from 'lucide-react'

const OrderSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [copyStatus, setCopyStatus] = useState(null)
  const [orderData, setOrderData] = useState(null)
  
  const { selectedPackage, projectData, paymentIntent, totalAmount, discountApplied } = location.state || {}

  useEffect(() => {
    document.title = 'Order Confirmed - Sprintix Studio Pte. Ltd.'
    
    // If no order data, redirect to home
    if (!selectedPackage || !projectData) {
      navigate('/', { replace: true })
      return
    }

    // Generate order ID and set up order data
    const orderId = paymentIntent?.id ? paymentIntent.id.slice(-8).toUpperCase() : `SS${Date.now().toString().slice(-6)}`
    
    setOrderData({
      id: orderId,
      package: selectedPackage,
      customer: projectData,
      payment: paymentIntent,
      totalPaid: totalAmount || selectedPackage?.price || parseFloat(selectedPackage?.priceDisplay?.replace(/[^\d.]/g, '') || '0'),
      discount: discountApplied,
      createdAt: new Date(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + (selectedPackage?.addOns?.some(addon => addon.description?.includes('24h')) ? 24 : 72) * 60 * 60 * 1000)
    })
  }, [selectedPackage, projectData, paymentIntent, totalAmount, discountApplied, navigate])

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(type)
      setTimeout(() => setCopyStatus(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleDownloadReceipt = () => {
    if (!orderData) return
    
    const receipt = `
Sprintix Studio Pte. Ltd. - Order Receipt
===============================

Order ID: ${orderData.id}
Date: ${orderData.createdAt.toLocaleDateString()}
Customer: ${orderData.customer?.name}
Email: ${orderData.customer?.email}

Package Details:
- ${orderData.package.name}
- ${orderData.package.quantity || orderData.package.assetsIncluded} photos
- ${orderData.package.priceDisplay}

${orderData.discount ? `Discount Applied: ${orderData.discount.code} (-$${orderData.discount.amount.toFixed(2)})` : ''}

Total Paid: $${orderData.totalPaid.toFixed(2)}

Project Details:
${orderData.customer?.projectDescription || 'Standard editing package'}

Assets Location: ${orderData.customer?.assetUrl || 'Provided via form'}

Thank you for choosing Sprintix Studio Pte. Ltd.!
Visit: https://sprintix.asia/track/${orderData.id}
`

    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Sprintix-Receipt-${orderData.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-green-100 mb-6">
            Thank you {orderData.customer?.name}! Your order has been successfully placed.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
            <p className="text-sm text-green-100 mb-1">Your Order ID</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">{orderData.id}</p>
              <button
                onClick={() => copyToClipboard(orderData.id, 'orderId')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copyStatus === 'orderId' ? (
                  <CheckCircle className="w-4 h-4 text-green-200" />
                ) : (
                  <Copy className="w-4 h-4 text-green-200" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Package Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Package Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{orderData.package.name}</h4>
                    <p className="text-sm text-gray-600">
                      {orderData.package.quantity || orderData.package.assetsIncluded} professional photo edits
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{orderData.package.priceDisplay}</div>
                    {orderData.package.pricePerEdit && (
                      <div className="text-sm text-gray-500">${orderData.package.pricePerEdit}/edit</div>
                    )}
                  </div>
                </div>

                {/* Services Included */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">Services Included:</p>
                  <div className="grid gap-2">
                    {(orderData.package.features || [
                      'Background removal',
                      'Color correction & enhancement',
                      'Professional image optimization',
                      'Platform-ready formatting'
                    ]).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-ons if any */}
                {orderData.package.addOns && orderData.package.addOns.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-2">Add-ons:</p>
                    {orderData.package.addOns.map((addOn, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{addOn.description}</span>
                        <span className="font-medium">${addOn.price?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Discount Applied */}
                {orderData.discount && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-emerald-600">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>Discount ({orderData.discount.code})</span>
                      </div>
                      <span className="font-medium text-emerald-600">
                        -${orderData.discount.amount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Paid</span>
                    <span className="text-xl font-bold text-green-600">${orderData.totalPaid.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{orderData.payment?.id || 'Processing'}</span>
                    {orderData.payment?.id && (
                      <button
                        onClick={() => copyToClipboard(orderData.payment.id, 'transactionId')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copyStatus === 'transactionId' ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="font-medium">{orderData.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Next Steps & Actions */}
          <div className="space-y-6">
            {/* What Happens Next */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Confirmation Email</h4>
                    <p className="text-sm text-gray-600">You'll receive a detailed confirmation email within 5 minutes at {orderData.customer?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Asset Review</h4>
                    <p className="text-sm text-gray-600">Our team will review your uploaded photos and start editing within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Editing</h4>
                    <p className="text-sm text-gray-600">Your photos undergo professional editing by our expert team</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Final edited photos delivered by <strong>{orderData.estimatedDelivery.toLocaleDateString()}</strong>
                    </p>
                    <div className="flex items-center text-xs text-emerald-600 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>
                        {orderData.package.addOns?.some(addon => addon.description?.includes('24h')) 
                          ? '24-hour rush delivery' 
                          : '48-72 hour standard delivery'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer</label>
                  <p className="text-gray-900">{orderData.customer?.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{orderData.customer?.email}</p>
                </div>
                
                {orderData.customer?.projectDescription && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Special Instructions</label>
                    <p className="text-gray-900 text-sm bg-gray-50 p-3 rounded-lg">
                      {orderData.customer.projectDescription}
                    </p>
                  </div>
                )}
                
                {orderData.customer?.assetUrl && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Assets Location</label>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-900 text-sm truncate flex-1">{orderData.customer.assetUrl}</p>
                      <button
                        onClick={() => copyToClipboard(orderData.customer?.assetUrl, 'assetUrl')}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copyStatus === 'assetUrl' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  to={`/track/${orderData.id}`}
                  className="w-full bg-violet-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Track Your Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <button
                  onClick={handleDownloadReceipt}
                  className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>
                
                <Link
                  to="/support"
                  className="w-full bg-blue-50 text-blue-700 py-3 px-4 rounded-xl font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Support</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full bg-gray-50 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Need Another Order?</h3>
            <p className="text-violet-100 mb-6">
              Loved our service? Order more photo editing for your business!
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center bg-white text-violet-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors space-x-2"
            >
              <span>Order More Photos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage