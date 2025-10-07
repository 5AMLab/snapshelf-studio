import React, { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import ContactInfoSection from './shared/ContactInfoSection'
import PlatformSelector from './shared/PlatformSelector'
import ProjectTypeSelector from './shared/ProjectTypeSelector'
import AssetUploadSection from './shared/AssetUploadSection'

const SimpleContactForm = ({ selectedPackage, onSubmit, hideSubmissionSuccess = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    platforms: [],
    projectType: '',
    stylePreference: '',
    requirements: [],
    assetUrl: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    // Load saved form data
    const saved = localStorage.getItem('sprintix-form-data')
    if (saved) {
      const savedData = JSON.parse(saved)
      setFormData(prev => ({ ...prev, ...savedData }))
    }
  }, [])

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (formData.platforms.length === 0) errors.platforms = 'Please select a platform'
    if (!formData.projectType.trim()) errors.projectType = 'Please select a project type'
    if (!formData.assetUrl.trim()) errors.assetUrl = 'Please provide an asset URL'
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newData)
    localStorage.setItem('sprintix-form-data', JSON.stringify(newData))
    
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
    localStorage.setItem('sprintix-form-data', JSON.stringify(newData))
    
    if (validationErrors.platforms) {
      setValidationErrors(prev => {
        const { platforms: removed, ...rest } = prev
        return rest
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageName: selectedPackage?.name,
          packagePrice: selectedPackage?.priceDisplay,
          platforms: formData.platforms.join(', '),
          requirements: formData.requirements.join(', '),
          submissionType: 'Contact Form Submission'
        })
      })

      if (response.ok) {
        if (onSubmit) {
          onSubmit(formData)
        } else {
          setIsSubmitted(true)
          localStorage.removeItem('sprintix-form-data')
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted && !hideSubmissionSuccess) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 text-center border border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest! We'll review your project details and get back to you within 2 hours.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {selectedPackage && (
        <div className="bg-white rounded-2xl shadow-lg border border-violet-200/50 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-violet-700 text-white px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">Get Started - {selectedPackage.name} Package</h3>
                <p className="text-violet-100 text-sm">Tell us about your project requirements</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{selectedPackage.priceDisplay}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Submit Button */}
        <div className="bg-white rounded-2xl shadow-lg border border-violet-200/50 p-8">
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Send Project Details</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SimpleContactForm