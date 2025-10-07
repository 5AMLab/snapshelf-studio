import React, { useState, useEffect } from 'react'
import { Cookie, X, Settings, Shield } from 'lucide-react'

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('sprintix-cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setCookiePreferences(savedPreferences)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setCookiePreferences(allAccepted)
    localStorage.setItem('sprintix-cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    setShowSettings(false)
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      initializeAnalytics()
    }
  }

  const handleAcceptSelected = () => {
    localStorage.setItem('sprintix-cookie-consent', JSON.stringify(cookiePreferences))
    setShowBanner(false)
    setShowSettings(false)
    
    // Initialize analytics if accepted
    if (cookiePreferences.analytics) {
      initializeAnalytics()
    }
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setCookiePreferences(onlyNecessary)
    localStorage.setItem('sprintix-cookie-consent', JSON.stringify(onlyNecessary))
    setShowBanner(false)
    setShowSettings(false)
  }

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other tracking
    // This would be where you'd add your analytics code
    console.log('Analytics initialized')
  }

  const handlePreferenceChange = (category, value) => {
    if (category === 'necessary') return // Can't change necessary cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[1020] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start space-x-3">
              <Cookie className="w-6 h-6 text-violet-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">🍪 We use cookies</h3>
                <p className="text-sm text-gray-600 max-w-2xl">
                  We use cookies to enhance your experience, analyze site usage, and assist with our marketing efforts. 
                  You can manage your preferences or learn more in our{' '}
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="text-violet-600 hover:text-violet-700 underline"
                  >
                    cookie policy
                  </button>
                  .
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-max">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Manage</span>
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1030] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-violet-600" />
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Choose which cookies you want to accept. You can change these settings at any time.
              </p>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Necessary Cookies</h3>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                  </p>
                  <div className="text-xs text-gray-500">
                    Examples: Session management, form data persistence, security tokens
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 transition-colors duration-200 ease-in-out ${
                        cookiePreferences.analytics ? 'bg-violet-600' : 'bg-gray-200'
                      }`}>
                        <div className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ease-in-out ${
                          cookiePreferences.analytics ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <div className="text-xs text-gray-500">
                    Examples: Google Analytics, page views, user behavior tracking
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 transition-colors duration-200 ease-in-out ${
                        cookiePreferences.marketing ? 'bg-violet-600' : 'bg-gray-200'
                      }`}>
                        <div className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ease-in-out ${
                          cookiePreferences.marketing ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.
                  </p>
                  <div className="text-xs text-gray-500">
                    Examples: Facebook Pixel, Google Ads, retargeting pixels
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookiePreferences.functional}
                        onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 transition-colors duration-200 ease-in-out ${
                        cookiePreferences.functional ? 'bg-violet-600' : 'bg-gray-200'
                      }`}>
                        <div className={`absolute top-0.5 left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 ease-in-out ${
                          cookiePreferences.functional ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Enable enhanced functionality and personalization, such as chat widgets and personalized content.
                  </p>
                  <div className="text-xs text-gray-500">
                    Examples: Chat widgets, user preferences, language settings
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent