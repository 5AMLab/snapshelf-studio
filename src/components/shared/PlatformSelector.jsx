import React from 'react'
import { Zap, AlertCircle } from 'lucide-react'
import FormCard from './FormCard'

const PlatformSelector = ({ formData, handlePlatformChange, validationErrors }) => {
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

  return (
    <FormCard title="Where Will You Use These Designs? *" icon={Zap}>
      <p className="text-gray-600 mb-6">Select your primary platform (designs can be used on multiple platforms, but choose your main one)</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platformOptions.map((platform) => (
          <label key={platform.id} className="cursor-pointer">
            <input
              type="radio"
              name="primaryPlatform"
              value={platform.id}
              checked={formData.platforms.length > 0 && formData.platforms[0] === platform.id}
              onChange={(e) => handlePlatformChange(e.target.value)}
              className="sr-only"
            />
            <div className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
              formData.platforms.length > 0 && formData.platforms[0] === platform.id
                ? 'border-violet-500 bg-violet-50 shadow-md'
                : 'border-gray-200 bg-gray-50 hover:border-violet-300'
            }`}>
              <div className="text-sm font-semibold text-gray-900">{platform.name}</div>
            </div>
          </label>
        ))}
      </div>
      {validationErrors.platforms && (
        <div className="mt-4 flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 mr-2" />
          {validationErrors.platforms}
        </div>
      )}
    </FormCard>
  )
}

export default PlatformSelector