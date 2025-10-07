import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import BeforeAfterSlider from '../BeforeAfterSlider'
import FAQ from '../shared/FAQ'
import { ChevronRight, Check, Star, ArrowRight, Package, Clock, Users, TrendingUp } from 'lucide-react'

const BannerPackPage = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all'])
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { label: 'CTR Increase', value: '17%', icon: TrendingUp },
    { label: 'Bounce Reduction', value: '11%', icon: Users },
    { label: 'AOV Boost', value: '8%', icon: Package }
  ]

  const packageContents = [
    { name: 'Storefront Hero', size: '1920×600px', description: 'Main banner for your store homepage' },
    { name: 'Campaign Promos', size: '1200×628px', description: '3 promotional banners for campaigns' },
    { name: 'Square Ads', size: '1080×1080px', description: '2 social media ready squares' },
    { name: 'App Carousel', size: '1080×540px', description: 'Mobile app carousel banner' },
    { name: 'Source Files', size: 'PSD/AI', description: 'Editable source files included' },
    { name: 'Web Exports', size: 'WebP', description: 'Optimized web formats' }
  ]

  const processSteps = [
    { step: 1, title: 'Brief', description: 'Share your campaign goals, brand assets, and platform requirements' },
    { step: 2, title: 'Moodboard', description: 'We create visual concepts aligned with your brand identity' },
    { step: 3, title: 'Design', description: 'Professional banners designed for maximum conversion' },
    { step: 4, title: 'Deliver', description: 'ZIP package with all formats plus usage guidelines' }
  ]

  const addOns = [
    { name: 'Motion GIF/MP4', price: '$90', description: 'Animated versions for social media' },
    { name: 'Language Localisation', price: '$60', description: 'Text translation for global markets' },
    { name: 'A/B Test Variant', price: '$70', description: 'Alternative design for testing' }
  ]

  const bannerFAQ = [
    {
      id: 1,
      question: "What's the typical turnaround time for the Banner Pack?",
      answer: "Standard delivery is 72 hours from brief approval. Rush orders (24-48h) available for +50% fee."
    },
    {
      id: 2,
      question: "How many revisions are included?",
      answer: "2 rounds of revisions are included. Additional revisions are $30 each."
    },
    {
      id: 3,
      question: "Do you follow platform-specific guidelines?",
      answer: "Yes, all banners are designed according to each platform's specifications (Shopee, Lazada, Amazon, etc.) including file size limits and content policies."
    },
    {
      id: 4,
      question: "Can you create animated banners?",
      answer: "Motion graphics are available as an add-on (+$90) and include GIF and MP4 formats optimized for each platform."
    },
    {
      id: 5,
      question: "What file formats do I receive?",
      answer: "You'll get WebP and JPEG exports (under 200KB each), plus source PSD/AI files for future edits."
    }
  ]

  return (
    <>
      <Helmet>
        <title>E-Commerce Banner Pack | SwiftPixel - Banners That Sell</title>
        <meta name="description" content="Professional e-commerce banner design service. Hero, promo & campaign graphics in 72h—pixel-perfect for every platform. 17% CTR increase guaranteed." />
        <meta name="keywords" content="e-commerce banner design, Lazada storefront banner, Shopee banner design, Amazon banner service" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "E-Commerce Banner Pack",
            "description": "Professional banner design service for e-commerce platforms",
            "provider": {
              "@type": "Organization",
              "name": "SwiftPixel"
            },
            "offers": {
              "@type": "Offer",
              "price": "320",
              "priceCurrency": "SGD"
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-50 via-white to-blue-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-violet-950 mb-6">
                Banners That Sell, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Everywhere</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Hero, promo & campaign graphics in 72h—pixel-perfect for every platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Order Banner Pack
                </button>
                <button className="border-2 border-violet-600 text-violet-600 hover:bg-violet-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                  View Examples
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>72h Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>All Platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Source Files Included</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Hero Banner</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">Promo 1</span>
                    </div>
                    <div className="h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">Promo 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="bg-violet-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-orange-400" />
                  <span className="text-3xl font-bold text-white">+{stat.value}</span>
                </div>
                <p className="text-violet-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Contents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              What's in the Pack
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete banner set optimized for all major e-commerce platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageContents.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-violet-600 font-medium mb-2">{item.size}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From brief to delivery in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-violet-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Before vs After
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how professional banners transform your store's performance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/banner-before.jpg"
              afterImage="/images/portfolio/banner-after.jpg"
              beforeAlt="Generic banner before SwiftPixel"
              afterAlt="Professional banner after SwiftPixel"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-6">
                  DrinkUp Campaign Success
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Our banner redesign helped DrinkUp achieve a <span className="font-bold text-violet-600">+24% click-through rate</span> increase in just 7 days across all platforms.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">+24%</div>
                    <div className="text-sm text-gray-600">CTR Increase</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-violet-600">7 Days</div>
                    <div className="text-sm text-gray-600">To Results</div>
                  </div>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  View Full Case Study
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Campaign Results</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Shopee CTR</span>
                      <span className="font-bold">+28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lazada Conversion</span>
                      <span className="font-bold">+19%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TikTok Shop AOV</span>
                      <span className="font-bold">+31%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional banners that drive results, delivered in 72 hours
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white border-2 border-violet-200 rounded-2xl shadow-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Banner Pack</h3>
                <div className="text-4xl font-bold text-violet-600 mb-2">
                  SGD $320
                  <span className="text-lg text-gray-500 font-normal"> / campaign</span>
                </div>
                <p className="text-gray-600">Complete banner set for one campaign</p>
              </div>

              <div className="space-y-4 mb-8">
                {packageContents.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item.name} ({item.size})</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 mb-6">
                Order Banner Pack
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Bulk Discounts Available:</p>
                <div className="text-sm space-y-1">
                  <div>3-5 campaigns: <span className="font-semibold text-green-600">10% off</span></div>
                  <div>6-10 campaigns: <span className="font-semibold text-green-600">15% off</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Add-On Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your banner pack with these premium options
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-violet-600 mb-4">{addon.price}</div>
                  <p className="text-gray-600 mb-6">{addon.description}</p>
                  <button className="w-full border-2 border-violet-600 text-violet-600 hover:bg-violet-50 py-2 rounded-lg font-semibold transition-colors duration-200">
                    Add to Pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Trusted by Leading Brands
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
              <div className="text-2xl font-bold">Moët</div>
              <div className="text-2xl font-bold">Veuve Clicquot</div>
              <div className="text-2xl font-bold">DFS</div>
              <div className="text-2xl font-bold">DrinkUp</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "SwiftPixel's banner pack completely transformed our campaign performance. The designs are not just beautiful—they convert."
              </blockquote>
              <cite className="text-gray-600 font-semibold">
                Sarah Chen, Marketing Director at DrinkUp
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ 
        title="Banner Pack FAQ"
        subtitle="Everything you need to know about our banner service"
        questions={bannerFAQ}
        className="bg-gray-50"
      />

      {/* Sticky CTA */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">Ready to boost your conversions?</div>
              <div className="text-sm text-gray-600">Professional banners delivered in 72h</div>
            </div>
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2">
              Order Banner Pack
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default BannerPackPage