import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import ContactInfoSection from '../components/shared/ContactInfoSection'
import PlatformSelector from '../components/shared/PlatformSelector'
import ProjectTypeSelector from '../components/shared/ProjectTypeSelector'
import AssetUploadSection from '../components/shared/AssetUploadSection'

const ProjectDetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    platforms: [],
    projectType: [],
    stylePreference: '',
    requirements: [],
    assetUrl: ''
  })
  
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [validationErrors, setValidationErrors] = useState({})
  const [formProgress, setFormProgress] = useState(0)

  useEffect(() => {
    document.title = 'Project Details - SwiftPixel Studio'
    
    // Get package from location state or localStorage
    if (location.state?.selectedPackage) {
      setSelectedPackage(location.state.selectedPackage)
      localStorage.setItem('swiftpixel_checkout_package', JSON.stringify(location.state.selectedPackage))
    } else {
      const savedPackage = localStorage.getItem('swiftpixel_checkout_package')
      if (savedPackage) {
        setSelectedPackage(JSON.parse(savedPackage))
      } else {
        navigate('/pricing')
        return
      }
    }

    // Load saved form data
    const saved = localStorage.getItem('swiftpixel_project_details')
    if (saved) {
      const savedData = JSON.parse(saved)
      setFormData(prev => ({ ...prev, ...savedData }))
    }
  }, [location.state, navigate])

  // Calculate progress
  const calculateProgress = () => {
    const requiredFields = ['name', 'email', 'platforms', 'projectType', 'assetUrl']
    const completedFields = requiredFields.filter(field => {
      if (field === 'platforms' || field === 'projectType') return formData[field].length > 0
      return formData[field] && formData[field].trim() !== ''
    })
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  useEffect(() => {
    setFormProgress(calculateProgress())
  }, [formData])

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (formData.platforms.length === 0) errors.platforms = 'Please select a platform'
    if (formData.projectType.length === 0) errors.projectType = 'Please select at least one project type'
    if (!formData.assetUrl.trim()) errors.assetUrl = 'Please provide an asset URL'
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newData)
    localStorage.setItem('swiftpixel_project_details', JSON.stringify(newData))
    
    // Clear field error
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => {
        const { [e.target.name]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const handlePlatformChange = (platform) => {
    const newData = { ...formData, platforms: [platform] }
    setFormData(newData)
    localStorage.setItem('swiftpixel_project_details', JSON.stringify(newData))
    
    if (validationErrors.platforms) {
      setValidationErrors(prev => {
        const { platforms: removed, ...rest } = prev
        return rest
      })
    }
  }

  const handleContinueToPayment = () => {
    if (validateForm()) {
      navigate('/checkout/payment', { 
        state: { 
          selectedPackage, 
          projectData: formData 
        } 
      })
    }
  }

  if (!selectedPackage) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </button>
        </div>

        {/* Main Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-200/50 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 text-white px-6 py-6">
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
          <div className="px-6 py-4 bg-violet-50 border-b border-violet-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-sm font-medium text-violet-900">Project Details</span>
                </div>
                <div className="w-12 h-0.5 bg-violet-300"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-sm font-medium text-gray-600">Payment & Complete</span>
                </div>
              </div>
              {formProgress === 100 && (
                <div className="text-emerald-600 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Ready to continue!
                </div>
              )}
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

        {/* Form Sections */}
        <div className="space-y-6">
          <ContactInfoSection 
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />

          <PlatformSelector 
            formData={formData}
            handlePlatformChange={handlePlatformChange}
            validationErrors={validationErrors}
          />

          <ProjectTypeSelector 
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />

          <AssetUploadSection 
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />

          {/* Continue Button */}
          <div className="bg-white rounded-2xl shadow-lg border border-violet-200/50 p-8">
            <div className="text-center">
              <button
                onClick={handleContinueToPayment}
                disabled={formProgress < 100}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <span>Continue to Payment</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsPage