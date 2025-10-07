import React from 'react'
import { Shield, Cookie, Eye, Target, Settings, Calendar, Mail, Phone } from 'lucide-react'

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button - Top Left */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-violet-600 hover:text-violet-700 font-medium flex items-center"
          >
            ← Back to Website
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            How Sprintix Studio uses cookies to enhance your experience
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-violet-100 p-8 space-y-8">
          
          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Cookie className="w-6 h-6 mr-2 text-violet-600" />
              What Are Cookies?
            </h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
            <p className="text-gray-600">
              At Sprintix Studio, we use cookies to enhance your browsing experience, analyze site usage,
              and help us provide better services tailored to your needs.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
            
            <div className="grid gap-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Settings className="w-5 h-5 mr-2 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Necessary Cookies</h3>
                  <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Always Active
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  These cookies are essential for the website to function properly. They enable core functionality 
                  such as security, network management, and accessibility.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700 font-medium mb-2">Examples:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Session management and user authentication</li>
                    <li>• Form data persistence (contact forms, package selections)</li>
                    <li>• Security tokens and CSRF protection</li>
                    <li>• Load balancing and website functionality</li>
                  </ul>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                  <span className="ml-auto bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    Optional
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  Help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700 font-medium mb-2">Examples:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Google Analytics for website traffic analysis</li>
                    <li>• Page views and user behavior tracking</li>
                    <li>• Performance monitoring and optimization</li>
                    <li>• Popular content and feature usage statistics</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                  <span className="ml-auto bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    Optional
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  Used to track visitors across websites to display relevant advertisements and measure 
                  campaign effectiveness.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700 font-medium mb-2">Examples:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Facebook Pixel for social media advertising</li>
                    <li>• Google Ads conversion tracking</li>
                    <li>• Retargeting and remarketing pixels</li>
                    <li>• Campaign effectiveness measurement</li>
                  </ul>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Settings className="w-5 h-5 mr-2 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                  <span className="ml-auto bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                    Optional
                  </span>
                </div>
                <p className="text-gray-600 mb-3">
                  Enable enhanced functionality and personalization, such as chat widgets and personalized content.
                </p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700 font-medium mb-2">Examples:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Live chat widgets and customer support tools</li>
                    <li>• User preferences and settings</li>
                    <li>• Language and region settings</li>
                    <li>• Personalized content recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-violet-600" />
              How Long Do Cookies Last?
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Session Cookies</h3>
                <p className="text-gray-600">
                  Temporary cookies that are deleted when you close your browser. Used for essential functions 
                  like maintaining your session during your visit.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Persistent Cookies</h3>
                <p className="text-gray-600">
                  Remain on your device for a specified period (typically 30 days to 2 years) or until you 
                  manually delete them. Used for analytics and user preferences.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <div className="space-y-4">
              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-900 mb-2">On Our Website</h3>
                <p className="text-violet-800 mb-3">
                  You can manage your cookie preferences at any time using our cookie consent tool.
                </p>
                <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                  Manage Cookie Preferences
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">In Your Browser</h3>
                <p className="text-gray-600 mb-2">
                  You can also control cookies through your browser settings:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li>• <strong>Edge:</strong> Settings → Privacy → Cookies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We use the following third-party services that may set cookies:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Website traffic analysis and user behavior tracking.
                </p>
                <a href="https://policies.google.com/privacy" className="text-violet-600 hover:text-violet-700 text-sm">
                  Privacy Policy →
                </a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Facebook Pixel</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Social media advertising and conversion tracking.
                </p>
                <a href="https://www.facebook.com/privacy/explanation" className="text-violet-600 hover:text-violet-700 text-sm">
                  Privacy Policy →
                </a>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for 
              other operational, legal, or regulatory reasons. We will notify you of any material changes 
              by posting the updated policy on our website with a revised "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Cookie Policy or our use of cookies, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">hello@sprintix.sg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+65 8123 4567</p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default CookiePolicy