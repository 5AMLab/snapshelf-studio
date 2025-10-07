import React from 'react'
import { MessageCircle, AlertCircle } from 'lucide-react'
import FormCard from './FormCard'

const ContactInfoSection = ({ formData, handleChange, validationErrors }) => {
  return (
    <FormCard title="Contact Information" icon={MessageCircle}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
              validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="Your full name"
          />
          {validationErrors.name && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationErrors.name}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
              validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}
            placeholder="your@email.com"
          />
          {validationErrors.email && (
            <div className="mt-2 flex items-center text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationErrors.email}
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Company (optional)
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="Your company name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            WhatsApp Number (optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="+65 1234 5678"
          />
        </div>
      </div>
    </FormCard>
  )
}

export default ContactInfoSection