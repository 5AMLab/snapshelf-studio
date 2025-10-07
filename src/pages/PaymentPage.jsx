import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, Zap, Mail, Phone, MessageCircle } from 'lucide-react'
import FormCard from '../components/shared/FormCard'
import StripePayment from '../components/StripePayment'

const PaymentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [projectData, setProjectData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Payment - Sprintix Studio Pte. Ltd.'
    
    // Get data from location state or localStorage
    if (location.state?.selectedPackage && location.state?.projectData) {
      setSelectedPackage(location.state.selectedPackage)
      setProjectData(location.state.projectData)
    } else {
      // Try localStorage
      const savedPackage = localStorage.getItem('sprintix_checkout_package')
      const savedProject = localStorage.getItem('sprintix_project_details')
      
      if (savedPackage && savedProject) {
        setSelectedPackage(JSON.parse(savedPackage))
        setProjectData(JSON.parse(savedProject))
      } else {
        navigate('/pricing')
        return
      }
    }
  }, [location.state, navigate])

  const handlePaymentSuccess = async (paymentIntent) => {
    setIsSubmitting(true)
    
    try {
      // Submit project data to backend
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectData,
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.priceDisplay,
          paymentIntentId: paymentIntent.id,
          submissionType: 'Paid Project Submission'
        })
      })

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('sprintix_checkout_package')
        localStorage.removeItem('sprintix_project_details')
        
        navigate('/checkout/success', {
          state: {
            selectedPackage,
            projectData,
            paymentIntent
          }
        })
      }
    } catch (error) {
      console.error('Error submitting project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToDetails = () => {
    navigate('/checkout/details', { 
      state: { selectedPackage } 
    })
  }

  if (!selectedPackage || !projectData) return null

  const platformOptions = [
    { id: 'shopee', name: 'Shopee' },
    { id: 'lazada', name: 'Lazada' },
    { id: 'amazon', name: 'Amazon' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'google-ads', name: 'Google Ads' },
    { id: 'website', name: 'Website' }
  ]

  const projectTypes = [
    { id: 'product-photography', name: 'Product Photography Enhancement' },
    { id: 'social-media', name: 'Social Media Content Creation' },
    { id: 'website-banner', name: 'Website Banner Design' },
    { id: 'print-material', name: 'Print Material Design' },
    { id: 'lifestyle-scenes', name: 'Lifestyle Scene Creation' }
  ]

  const requirementOptions = [
    { id: 'background-removal', name: 'Background Removal' },
    { id: 'color-correction', name: 'Color Correction' },
    { id: 'text-logo-addition', name: 'Text/Logo Addition' },
    { id: 'size-optimization', name: 'Size Optimization' },
    { id: 'bulk-processing', name: 'Bulk Processing' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackToDetails}
            className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project Details
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-200/50 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Complete Your Order - {selectedPackage.name} Package</h1>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{selectedPackage.priceDisplay}</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="text-sm font-medium text-emerald-900">Project Details</span>
                </div>
                <div className="w-12 h-0.5 bg-emerald-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-sm font-medium text-emerald-900">Payment & Complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-sm text-gray-600">
              Project: {selectedPackage.assetsIncluded || '30'} assets
              {selectedPackage.extraAssets > 0 && ` + ${selectedPackage.extraAssets} extra`}
              {selectedPackage.complexBgRemoval > 0 && ` + ${selectedPackage.complexBgRemoval} complex BG removals`}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Project Summary */}
          <FormCard title="Project Summary">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Contact</div>
                  <div className="text-gray-900">{projectData.name}</div>
                  <div className="text-gray-600 text-sm">{projectData.email}</div>
                  {projectData.company && <div className="text-gray-600 text-sm">{projectData.company}</div>}
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Platform</div>
                  <div className="text-gray-900">{platformOptions.find(p => p.id === projectData.platforms[0])?.name}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Project Types</div>
                  <div className="text-gray-900">
                    {projectData.projectType.map(typeId => 
                      projectTypes.find(p => p.id === typeId)?.name
                    ).join(', ')}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Style Preference</div>
                  <div className="text-gray-900">{projectData.stylePreference || 'Not specified'}</div>
                </div>
              </div>
              {projectData.requirements.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-gray-600 mb-1">Requirements</div>
                  <div className="text-gray-900">
                    {projectData.requirements.map(reqId => 
                      requirementOptions.find(r => r.id === reqId)?.name
                    ).join(', ')}
                  </div>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-semibold text-gray-600 mb-1">Assets</div>
                <a href={projectData.assetUrl} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 text-sm break-all">
                  {projectData.assetUrl}
                </a>
              </div>
            </div>
          </FormCard>

          {/* Delivery Timeline */}
          <FormCard title="Delivery Timeline" icon={Clock}>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{selectedPackage.name} Package Delivery</div>
                  <div className="text-sm text-gray-600">Standard delivery included</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">
                    {selectedPackage.serviceLevel?.timeRequired || '48-72 hours'}
                  </div>
                  <div className="text-xs text-gray-500">Guaranteed</div>
                </div>
              </div>
            </div>
          </FormCard>

          {/* Payment Section */}
          <FormCard title="Secure Payment">
            <StripePayment
              selectedPackage={selectedPackage}
              projectData={projectData}
              onPaymentSuccess={handlePaymentSuccess}
              isSubmitting={isSubmitting}
            />
          </FormCard>

          {/* Support Info */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Need Help? We're Here!</h4>
            <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center space-y-2">
                <Mail className="w-6 h-6 text-purple-600" />
                <div className="font-medium">Email Support</div>
                <div className="text-gray-600">hello@sprintix.asia</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Phone className="w-6 h-6 text-purple-600" />
                <div className="font-medium">WhatsApp</div>
                <div className="text-gray-600">+65 8123 4567</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <div className="font-medium">Response Time</div>
                <div className="text-gray-600">Within 2 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage