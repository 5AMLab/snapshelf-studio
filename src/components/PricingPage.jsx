import React from 'react'
import { Link } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import FAQ from './shared/FAQ'
import NewPricingCalculator from './NewPricingCalculator'
import { PRICING_FAQ } from '../config/faq'
import { BoltIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon, PercentBadgeIcon } from '@heroicons/react/24/outline'

const PricingPage = () => {
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
    document.title = 'Transparent Pricing - Sprintix Studio Pte. Ltd.'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          scrollToSection={scrollToSection}
          currentPage="pricing"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>
      
      {/* Unified Pricing Section */}
      <section className="bg-gradient-to-b from-violet-100 via-white to-violet-50 py-8 sm:px-6 lg:px-6 pb-16 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/hero/main-hero-bg-graphic.png")',
            backgroundPosition: 'center top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950 text-white mb-8">
              <span className="text-sm font-semibold">pricing</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-violet-950">Flexible </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-violet-300">Pricing</span>
            </h1>

            <p className="text-xl text-violet-950 max-w-3xl mx-auto mb-12">
              Simple, transparent pricing that scales with your business. No subscriptions, no commitments—pay only for what you need with automatic volume discounts.
            </p>
          </div>

          {/* Key Benefits Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
            {/* Left Column — single tall card */}
            <div className="bg-white rounded-xl p-8 border border-violet-100 flex flex-col">
              <div className="flex mb-3">
                <CheckCircleIcon className="w-10 h-10 text-lime-500" />
              </div>
              <h4 className="font-bold text-violet-950 text-lg mb-2">Every Order Includes</h4>
              <ul className="space-y-4 text-sm text-violet-950">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Background removal (simple)
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Basic colour correction
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Minor retouching (dust, blemishes, surface scratches)
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Drop shadow creation
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Crop & resize for 2 platforms (buyer chooses on order form)
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-violet-950 rounded-full mr-3 flex-shrink-0"></span>
                  Web optimisation (compressed WebP/JPEG/PNG)
                </li>
              </ul>
            </div>

            {/* Right Column — two stacked cards */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl p-8 border border-violet-100 flex-1">
                <div className="flex mb-3">
                  <BoltIcon className="w-10 h-10 text-lime-500" />
                </div>
                <h4 className="font-bold text-violet-950 text-lg mb-2">No Minimum Hassle</h4>
                <p className="text-sm text-violet-950">
                  Start with just 5 photos or scale to 500+. Perfect for testing or growing.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 border border-violet-100 flex-1">
                <div className="flex mb-3">
                  <PercentBadgeIcon className="w-10 h-10 text-lime-500" />
                </div>
                <h4 className="font-bold text-violet-950 text-lg mb-2">Automatic Savings</h4>
                <p className="text-sm text-violet-950">
                  Save up to 37% with volume pricing. The more you order, the less you pay per edit.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Calculator */}
          <div id="calculator-section">
            <NewPricingCalculator />
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <FAQ 
        title="Pricing Questions"
        subtitle="Common questions about our pricing structure"
        questions={PRICING_FAQ}
        className="py-16 bg-white"
      />

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        openModal={() => {}}
        showScrollButtons={false}
      />
    </div>
  )
}

export default PricingPage