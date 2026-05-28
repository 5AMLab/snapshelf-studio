import React, { useState, useEffect } from 'react'
import { Cookie, X, Settings, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    if (allAccepted.analytics) initializeAnalytics()
  }

  const handleAcceptSelected = () => {
    localStorage.setItem('sprintix-cookie-consent', JSON.stringify(cookiePreferences))
    setShowBanner(false)
    setShowSettings(false)
    if (cookiePreferences.analytics) initializeAnalytics()
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
    console.log('Analytics initialized')
  }

  const handlePreferenceChange = (category, value) => {
    if (category === 'necessary') return
    setCookiePreferences(prev => ({ ...prev, [category]: value }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* ── Cookie Banner ─────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 shadow-2xl z-[1020] px-4 py-4 md:px-6 md:py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  We use cookies
                </h3>
                <p className="text-sm text-zinc-400 max-w-2xl">
                  We use cookies to enhance your experience, analyse site usage, and support our marketing
                  efforts. Manage your preferences or read our{' '}
                  <Link
                    to="/cookie-policy"
                    className="text-lime-400 hover:text-lime-300 underline underline-offset-2 transition-colors"
                  >
                    cookie policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 min-w-max">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Manage
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-bold text-zinc-900 bg-lime-400 rounded-xl hover:bg-lime-300 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cookie Settings Modal ─────────────────────────── */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1030] p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2
                className="text-xl font-black text-white flex items-center gap-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <span className="w-7 h-7 rounded-lg bg-lime-400 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-zinc-900" />
                </span>
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-zinc-400 text-sm mb-6">
                Choose which cookies you want to accept. You can change these settings at any time.
              </p>

              <div className="space-y-3">
                {/* Necessary */}
                <CookieCategory
                  title="Necessary Cookies"
                  description="Essential for the website to function. They enable core functionality such as security, network management, and accessibility."
                  examples="Session management, form data persistence, security tokens"
                  badge={<span className="bg-lime-400 text-zinc-900 px-2 py-0.5 rounded-lg text-xs font-bold">Always Active</span>}
                />

                {/* Analytics */}
                <CookieCategory
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with our website by collecting and reporting information anonymously."
                  examples="Google Analytics, page views, user behaviour tracking"
                  toggle
                  checked={cookiePreferences.analytics}
                  onChange={(val) => handlePreferenceChange('analytics', val)}
                />

                {/* Marketing */}
                <CookieCategory
                  title="Marketing Cookies"
                  description="Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness."
                  examples="Facebook Pixel, Google Ads, retargeting pixels"
                  toggle
                  checked={cookiePreferences.marketing}
                  onChange={(val) => handlePreferenceChange('marketing', val)}
                />

                {/* Functional */}
                <CookieCategory
                  title="Functional Cookies"
                  description="Enable enhanced functionality and personalisation, such as chat widgets and personalised content."
                  examples="Chat widgets, user preferences, language settings"
                  toggle
                  checked={cookiePreferences.functional}
                  onChange={(val) => handlePreferenceChange('functional', val)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRejectAll}
                  className="px-5 py-3 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-5 py-3 text-sm font-medium text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-3 text-sm font-bold text-zinc-900 bg-lime-400 rounded-xl hover:bg-lime-300 transition-colors"
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

/* ── Category row ─────────────────────────────────────────── */
function CookieCategory({ title, description, examples, badge, toggle, checked, onChange }) {
  return (
    <div className="border border-zinc-800 rounded-2xl p-4 bg-zinc-900">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h3>
        {badge}
        {toggle && (
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={`relative w-10 h-6 rounded-full transition-colors duration-200 ease-in-out peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-lime-400/40 ${
                checked ? 'bg-lime-400' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`absolute top-0.5 left-[2px] bg-white rounded-full h-5 w-5 shadow transition-transform duration-200 ease-in-out ${
                  checked ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        )}
      </div>
      <p className="text-zinc-400 text-sm mb-2">{description}</p>
      <p className="text-zinc-600 text-xs">Examples: {examples}</p>
    </div>
  )
}

export default CookieConsent
