import React, { useState, useEffect } from 'react'
import { Mail, Phone, MessageCircle, Send, CheckCircle, Upload, Clock, Zap } from 'lucide-react'

const ContactForm = ({ selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: selectedPackage?.id || '',
    platforms: [],
    projectDetails: '',
    urgency: 'standard',
    hasAssets: 'yes'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Update form data when selectedPackage changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        package: selectedPackage.id
      }))
    }
  }, [selectedPackage])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          platforms: formData.platforms.join(', '),
          submissionType: 'Asset Upload & Project Brief'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          package: selectedPackage?.id || '',
          platforms: [],
          projectDetails: '',
          urgency: 'standard',
          hasAssets: 'yes'
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 text-center border border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Your Project is Queued!</h3>
        <div className="max-w-md mx-auto mb-6">
          <p className="text-gray-600 mb-4">
            Perfect! Your {selectedPackage?.name} package is ready to go. Here's what happens next:
          </p>
          <div className="space-y-3 text-sm text-left">
            <div className="flex items-center space-x-3 bg-white rounded-lg p-3">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span>We'll review your assets within 2 hours</span>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-lg p-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span>Payment link sent to your email</span>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-lg p-3">
              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span>Design work begins immediately</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-green-200 mb-6">
          <div className="text-sm text-gray-600">
            <strong>Next email from us:</strong> Within 2 hours<br/>
            <strong>Your designs ready:</strong> {selectedPackage?.serviceLevel?.timeRequired || '48 hours'}
          </div>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
        >
          Submit Another Project
        </button>
      </div>
    )
  }

  const platformOptions = [
    { id: 'shopee', name: 'Shopee', icon: '🛒' },
    { id: 'lazada', name: 'Lazada', icon: '🛍️' },
    { id: 'amazon', name: 'Amazon', icon: '📦' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'facebook', name: 'Facebook', icon: '👥' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'google-ads', name: 'Google Ads', icon: '🎯' },
    { id: 'website', name: 'Website', icon: '🌐' }
  ]

  return (
    <div className="space-y-8">
      {/* Header with Package Confirmation */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Transform Your Assets
        </h3>
        <p className="text-gray-600 mb-4">
          Let's get your {selectedPackage?.name} package started. Just upload your photos and tell us your goals—we'll handle the rest.
        </p>
        
        {/* Package Summary */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 inline-block">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{selectedPackage?.serviceLevel?.icon}</div>
            <div className="text-left">
              <div className="font-semibold text-purple-900">{selectedPackage?.name} Package</div>
              <div className="text-sm text-purple-700">{selectedPackage?.serviceLevel?.effort}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-purple-900">{selectedPackage?.price}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
            Your Contact Details
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number (for quick updates)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="+65 1234 5678"
            />
          </div>
        </div>

        {/* Platform Selection */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Where Will You Use These Designs? *
          </h4>
          <p className="text-sm text-gray-600 mb-4">Select all platforms where you'll deploy your new visuals</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platformOptions.map((platform) => (
              <label key={platform.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.platforms.includes(platform.id)}
                  onChange={() => handlePlatformChange(platform.id)}
                  className="sr-only"
                />
                <div className={`p-3 rounded-lg border-2 text-center transition-all ${
                  formData.platforms.includes(platform.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="text-xl mb-1">{platform.icon}</div>
                  <div className="text-xs font-medium">{platform.name}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            When Do You Need This?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                value: 'standard', 
                label: 'Standard Delivery', 
                time: '48 hours', 
                price: 'Included',
                desc: 'Perfect for most projects'
              },
              { 
                value: 'rush', 
                label: 'Rush Delivery', 
                time: '24 hours', 
                price: '+25%',
                desc: 'Need it faster'
              },
              { 
                value: 'emergency', 
                label: 'Emergency', 
                time: '12 hours', 
                price: '+50%',
                desc: 'Urgent campaign launch'
              }
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  value={option.value}
                  checked={formData.urgency === option.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-4 rounded-lg border-2 transition-all ${
                  formData.urgency === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500 mb-1">{option.desc}</div>
                  <div className="font-bold text-purple-600">{option.time}</div>
                  <div className="text-xs text-gray-500">{option.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Project Brief */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-purple-600" />
            Your Project Brief
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us about your project & goals *
              </label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Help us create perfect designs for you:

• What products/services are you promoting?
• What's the main message or goal for these visuals?
• Any specific brand colors, fonts, or style preferences?
• Are there competitor designs you love or hate?
• Any text/copy that must be included?
• Special requirements or important details?

Don't worry about being perfect—we'll ask follow-up questions if needed!"
              />
            </div>

            {/* Asset Upload Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2">📁 How to Send Your Photos/Assets:</h5>
              <div className="text-sm text-blue-700 space-y-1">
                <p>After submitting this form, we'll send you a secure upload link where you can:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Upload your product photos, logos, or existing graphics</li>
                  <li>Share Google Drive or Dropbox links for large files</li>
                  <li>Include any brand guidelines or reference materials</li>
                </ul>
                <p className="mt-2 font-medium">💡 No assets yet? No problem! We can work with placeholder content and you can add real photos later.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting Your Project...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Start My {selectedPackage?.name} Package</span>
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            🔒 Your information is secure. We'll respond within 2 hours with next steps.
          </p>
        </div>
      </form>

      {/* Support Info */}
      <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 text-center">Need Help? We're Here!</h4>
        <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center space-y-2">
            <Mail className="w-6 h-6 text-purple-600" />
            <div className="font-medium">Email Support</div>
            <div className="text-gray-600">hello@snapshelfstudio.com</div>
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
  )
}

export default ContactForm