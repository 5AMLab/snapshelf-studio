import React, { useState, useEffect } from 'react'
import { Mail, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react'

const ContactForm = ({ selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: selectedPackage?.id || '',
    projectDetails: '',
    urgency: 'standard'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/myzjbenr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          package: selectedPackage?.id || '',
          projectDetails: '',
          urgency: 'standard'
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
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thanks for your interest! We'll get back to you within 2 hours with your project quote and next steps.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Your Quote</h3>
        <p className="text-gray-600">Tell us about your project and we'll send you a detailed quote within 2 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
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
              placeholder="Your full name"
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

        {/* Phone and Package Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Package
            </label>
            {selectedPackage ? (
              <div className="w-full px-4 py-3 border border-purple-300 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-purple-900">
                    {selectedPackage.name} Package
                  </span>
                  <span className="text-purple-700 font-bold">
                    {selectedPackage.price}
                  </span>
                </div>
                <p className="text-sm text-purple-600 mt-1">
                  {selectedPackage.features[0]}
                </p>
              </div>
            ) : (
              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a package</option>
                <option value="essential">Essential (SGD 199)</option>
                <option value="professional">Professional (SGD 399)</option>
                <option value="enterprise">Enterprise (SGD 699)</option>
                <option value="custom">Custom Quote</option>
              </select>
            )}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Urgency
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'standard', label: '48h Standard', price: 'Included' },
              { value: 'rush', label: '24h Rush', price: '+25%' },
              { value: 'emergency', label: '12h Emergency', price: '+50%' }
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
                <div className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  formData.urgency === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Details *
          </label>
          <textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Tell us about your project:
                • How many product images do you have?
                • Which platforms do you sell on? (Shopee, Amazon, Instagram, etc.)
                • Any specific requirements or brand guidelines?
                • Timeline and goals for the project"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Get My Quote</span>
            </>
          )}
        </button>
      </form>

      {/* Contact Info */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Mail className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Email</div>
            <div className="text-sm text-gray-600">hello@snapshelfstudio.com</div>
          </div>
          <div>
            <Phone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Phone</div>
            <div className="text-sm text-gray-600">+65 8123 4567</div>
          </div>
          <div>
            <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Response Time</div>
            <div className="text-sm text-gray-600">Within 2 hours</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm