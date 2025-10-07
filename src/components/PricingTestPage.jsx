import React from 'react'
import { Link } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import FAQ from './shared/FAQ'
import NewPricingCalculator from './NewPricingCalculator'
import { PRICING_FAQ } from '../config/faq'
import { ArrowLeftIcon as ArrowLeft } from '@heroicons/react/24/outline'

const PricingTestPage = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    const calculatorSection = document.getElementById('calculator-section')
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  React.useEffect(() => {
    document.title = 'New Pricing Structure Test - SnapShelf Studio'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          scrollToSection={scrollToSection}
          currentPage="pricing-test"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>
      
      {/* Test Page Header */}
      <section className="bg-gradient-to-b from-violet-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-violet-100 text-violet-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🧪</span>
            <span>Test Page - New Pricing Structure</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transparent Pricing
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            <span className="font-bold text-violet-600">$18.90 per edit</span> with automatic volume discounts. 
            No packages to choose from, just order what you need.
          </p>

      

          {/* Key Benefits */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Any Quantity</h3>
              <p className="text-gray-600 text-sm">
                From 1 photo to 500+. Volume discounts apply automatically.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Pay Per Use</h3>
              <p className="text-gray-600 text-sm">
                No monthly fees or unused credits. Order when you need it.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Volume Discounts</h3>
              <p className="text-gray-600 text-sm">
                Pricing scales from $18.90 down to $11.34 per edit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section id="calculator-section" className="py-16 bg-white">
        <NewPricingCalculator />
      </section>

      {/* Comparison with Old Structure */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            How This Compares to Current Packages
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-900">Scenario</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-gray-900">Current</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-gray-900">New</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-medium text-gray-900">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">5 edits</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$99 = $19.80</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$94.50</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-green-600 font-medium">$4.50</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">25 edits</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$399 = $15.96</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$378</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-green-600 font-medium">$21</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">50 edits</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$699 = $13.98</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$661.50</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-green-600 font-medium">$37.50</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">100 edits</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$1,199 = $11.99</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$1,134</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-green-600 font-medium">$65</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">3 edits</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">Must buy $99</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-600">$56.70</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-green-600 font-medium">$42.30</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              <span>✅</span>
              <span>New structure is more affordable across all volume levels</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Transparent Pricing Questions"
        subtitle="Common questions about our new pricing structure"
        questions={PRICING_FAQ}
        className="py-16 bg-white"
      />

      {/* Testing Notes */}
      <section className="py-8 sm:py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-violet-50 rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-violet-200">
            <h3 className="text-lg sm:text-xl font-bold text-violet-900 mb-4">
              🧪 Testing Notes & Feedback
            </h3>
            <div className="space-y-4 text-violet-800">
              <div>
                <h4 className="font-semibold mb-2">Test the following scenarios:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Try different quantities (1, 5, 25, 50, 100+ edits)</li>
                  <li>Add different combinations of add-on services</li>
                  <li>Compare total costs with current package structure</li>
                  <li>Check if pricing feels intuitive and transparent</li>
                  <li>Test enterprise plan attractiveness for high-volume users</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Questions to consider:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Does the $18.90 base price feel right for the market?</li>
                  <li>Are the volume discounts compelling enough?</li>
                  <li>Should add-on pricing be adjusted?</li>
                  <li>Is the enterprise plan positioned correctly?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        openModal={() => {}}
        showScrollButtons={false}
      />
    </div>
  )
}

export default PricingTestPage