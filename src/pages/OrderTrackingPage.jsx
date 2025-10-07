import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  Search, 
  AlertCircle, 
  Home,
  Mail,
  Download,
  ArrowRight,
  Copy,
  Calendar,
  User,
  Eye
} from 'lucide-react'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

const OrderTrackingPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [searchOrderId, setSearchOrderId] = useState(orderId || '')
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copyStatus, setCopyStatus] = useState(null)

  // Mock order data - In production, this would come from your backend API
  const mockOrderData = {
    'SS123456': {
      id: 'SS123456',
      status: 'in_progress',
      statusLabel: 'In Progress',
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      package: {
        name: 'Custom Order',
        quantity: 25,
        priceDisplay: '$378.00'
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      timeline: [
        { 
          status: 'confirmed', 
          label: 'Order Confirmed', 
          completed: true, 
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          description: 'Payment processed and order confirmed'
        },
        { 
          status: 'review', 
          label: 'Asset Review', 
          completed: true, 
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
          description: 'Your photos have been reviewed and approved for editing'
        },
        { 
          status: 'in_progress', 
          label: 'Professional Editing', 
          completed: false, 
          date: null,
          description: 'Our team is currently editing your photos',
          inProgress: true
        },
        { 
          status: 'quality_check', 
          label: 'Quality Check', 
          completed: false, 
          date: null,
          description: 'Final quality review and approval'
        },
        { 
          status: 'completed', 
          label: 'Delivery', 
          completed: false, 
          date: null,
          description: 'Photos delivered to your email'
        }
      ],
      files: [
        { name: 'Original Photos', url: 'https://drive.google.com/drive/folders/example1', type: 'source' },
      ],
      notes: 'Standard e-commerce photo editing with background removal and color correction.',
      support: {
        assignedEditor: 'Sarah Chen',
        contactEmail: 'support@sprintix.asia'
      }
    },
    'SS789012': {
      id: 'SS789012',
      status: 'completed',
      statusLabel: 'Completed',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      package: {
        name: 'Bulk Processing Package',
        quantity: 50,
        priceDisplay: '$661.50'
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      timeline: [
        { 
          status: 'confirmed', 
          label: 'Order Confirmed', 
          completed: true, 
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          description: 'Payment processed and order confirmed'
        },
        { 
          status: 'review', 
          label: 'Asset Review', 
          completed: true, 
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
          description: 'Your photos have been reviewed and approved for editing'
        },
        { 
          status: 'in_progress', 
          label: 'Professional Editing', 
          completed: true, 
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          description: 'Photos professionally edited by our expert team'
        },
        { 
          status: 'quality_check', 
          label: 'Quality Check', 
          completed: true, 
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000),
          description: 'Quality review completed and approved'
        },
        { 
          status: 'completed', 
          label: 'Delivery', 
          completed: true, 
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          description: 'Final edited photos delivered via email'
        }
      ],
      files: [
        { name: 'Original Photos', url: 'https://drive.google.com/drive/folders/example1', type: 'source' },
        { name: 'Edited Photos (Final)', url: 'https://drive.google.com/drive/folders/example2', type: 'delivered' },
        { name: 'Preview Gallery', url: 'https://sprintix.asia/preview/SS789012', type: 'preview' }
      ],
      notes: 'Bulk processing with background removal for e-commerce listings. Delivered ahead of schedule.',
      support: {
        assignedEditor: 'Michael Rodriguez',
        contactEmail: 'support@sprintix.asia'
      }
    }
  }

  useEffect(() => {
    document.title = orderId ? `Track Order ${orderId} - Sprintix Studio Pte. Ltd.` : 'Track Your Order - Sprintix Studio Pte. Ltd.'
    
    if (orderId) {
      handleSearch(orderId)
    }
  }, [orderId])

  const handleSearch = async (searchId = searchOrderId) => {
    if (!searchId.trim()) {
      setError('Please enter an order ID')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const upperSearchId = searchId.toUpperCase()
      if (mockOrderData[upperSearchId]) {
        setOrderData(mockOrderData[upperSearchId])
        setSearchOrderId(upperSearchId)
        // Update URL without causing a re-render
        window.history.replaceState(null, '', `/track/${upperSearchId}`)
      } else {
        setError(`Order "${searchId}" not found. Please check your order ID and try again.`)
        setOrderData(null)
      }
    } catch (err) {
      setError('Unable to fetch order details. Please try again later.')
      setOrderData(null)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus(type)
      setTimeout(() => setCopyStatus(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'quality_check': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (step, isActive, isCompleted) => {
    if (isCompleted) return <CheckCircle className="w-5 h-5 text-green-600" />
    if (isActive) return <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />
    
    switch (step.status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-gray-400" />
      case 'review': return <Eye className="w-5 h-5 text-gray-400" />
      case 'in_progress': return <Package className="w-5 h-5 text-gray-400" />
      case 'quality_check': return <CheckCircle className="w-5 h-5 text-gray-400" />
      case 'completed': return <Truck className="w-5 h-5 text-gray-400" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      <div className="pt-20">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
            <p className="text-gray-600 mb-6">
              Enter your order ID to check the status and progress of your photo editing project
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter Order ID (e.g., SS123456)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Track</span>
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="mt-3 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Order Timeline */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Header */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Order {orderData.id}</h2>
                      <p className="text-gray-600">Placed on {orderData.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(orderData.status)}`}>
                      {orderData.statusLabel}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{Math.round((orderData.timeline.filter(step => step.completed).length / orderData.timeline.length) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-violet-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(orderData.timeline.filter(step => step.completed).length / orderData.timeline.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  {orderData.status !== 'completed' && (
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-violet-600" />
                        <span className="text-sm font-medium text-violet-900">
                          Estimated delivery: {orderData.estimatedDelivery.toLocaleDateString()} at {orderData.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Completion Notice */}
                  {orderData.status === 'completed' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">
                          Order completed on {orderData.completedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h3>
                  
                  <div className="space-y-6">
                    {orderData.timeline.map((step, index) => {
                      const isActive = step.inProgress && !step.completed
                      const isCompleted = step.completed
                      
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-100' : isActive ? 'bg-yellow-100' : 'bg-gray-100'
                          }`}>
                            {getStatusIcon(step, isActive, isCompleted)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold ${isActive ? 'text-yellow-700' : isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                                {step.label}
                              </h4>
                              {step.date && (
                                <span className="text-sm text-gray-500">
                                  {step.date.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {step.description}
                            </p>
                            {isActive && (
                              <div className="mt-2 flex items-center space-x-2 text-xs text-yellow-700">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span>Currently in progress</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Files & Downloads */}
                {orderData.files && orderData.files.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Files & Downloads</h3>
                    
                    <div className="space-y-3">
                      {orderData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                              {file.type === 'delivered' ? (
                                <Download className="w-4 h-4 text-violet-600" />
                              ) : file.type === 'preview' ? (
                                <Eye className="w-4 h-4 text-violet-600" />
                              ) : (
                                <Package className="w-4 h-4 text-violet-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500 capitalize">{file.type}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(file.url, `file-${index}`)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              {copyStatus === `file-${index}` ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 px-3 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                            >
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary & Support */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package</span>
                      <span className="font-medium">{orderData.package.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-medium">{orderData.package.quantity} photos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Paid</span>
                      <span className="font-bold text-lg">{orderData.package.priceDisplay}</span>
                    </div>
                  </div>

                  {orderData.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="text-sm font-medium text-gray-600">Project Notes</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg mt-2">
                        {orderData.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{orderData.customer.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{orderData.customer.email}</span>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Assigned Editor</p>
                      <p className="font-medium text-gray-900">{orderData.support.assignedEditor}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        to="/support"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Contact Support</span>
                      </Link>
                      
                      <a
                        href={`mailto:${orderData.support.contactEmail}?subject=Order ${orderData.id} - Support Request`}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Email Directly</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-3">
                    <Link
                      to="/pricing"
                      className="w-full bg-violet-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Order More Photos</span>
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
          </div>
        )}

        {/* Demo Order IDs */}
        {!orderData && !loading && !error && (
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Try Our Demo</h3>
              <p className="text-gray-600 mb-6">
                Don't have an order yet? Try these demo order IDs to see how tracking works:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => {
                    setSearchOrderId('SS123456')
                    handleSearch('SS123456')
                  }}
                  className="p-4 border border-violet-200 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-colors"
                >
                  <div className="font-mono text-lg font-bold text-violet-600 mb-1">SS123456</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </button>
                
                <button
                  onClick={() => {
                    setSearchOrderId('SS789012')
                    handleSearch('SS789012')
                  }}
                  className="p-4 border border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="font-mono text-lg font-bold text-green-600 mb-1">SS789012</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default OrderTrackingPage