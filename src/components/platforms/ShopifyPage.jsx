import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import SEOFooter from '../shared/SEOFooter'
import BeforeAfterSlider from '../BeforeAfterSlider'
import FAQ from '../shared/FAQ'
import { useModal } from '../../context/ModalContext'
import {
  BoltIcon as Zap,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CameraIcon,
  StarIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  ChartBarIcon,
  CursorArrowRippleIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  RocketLaunchIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

const ShopifyPage = () => {
  const { openModal } = useModal()
  const [isVisible, setIsVisible] = useState({})
  const [activeTab, setActiveTab] = useState('product-images')
  const [showBanner, setShowBanner] = useState(true)

  // Set page title
  useEffect(() => {
    document.title = 'SwiftPixel - Shopify Visual Optimization | Speed-Optimized Product Images'
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleBookAudit = () => {
    openModal('pricing')
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    {
      id: 'product-images',
      title: 'Product Images',
      description: 'WebP & AVIF conversion, compression, retina optimization',
      features: ['WebP/AVIF formats', 'Retina-ready quality', 'Speed optimized', 'SEO alt-text']
    },
    {
      id: 'banners',
      title: 'Banners',
      description: 'Responsive collection hero banners for all screen sizes',
      features: ['Mobile responsive', 'High-res displays', 'Fast loading', 'Brand consistent']
    },
    {
      id: 'campaign-kits',
      title: 'Campaign Kits',
      description: 'Complete visual packages for seasonal campaigns',
      features: ['Multi-format assets', 'Platform ready', 'Brand guidelines', 'Launch ready']
    }
  ]

  const processSteps = [
    { 
      step: 1, 
      title: 'Audit', 
      description: 'Free store speed & visual analysis',
      icon: MagnifyingGlassIcon,
      detail: 'Comprehensive site analysis including page speed, image optimization opportunities, and UX assessment',
      duration: '24h',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      step: 2, 
      title: 'Strategy', 
      description: 'Custom optimization roadmap',
      icon: LightBulbIcon,
      detail: 'Tailored optimization plan with prioritized improvements and expected performance gains',
      duration: '48h',
      color: 'from-purple-500 to-violet-500'
    },
    { 
      step: 3, 
      title: 'Create', 
      description: 'Pixel-perfect asset production',
      icon: WrenchScrewdriverIcon,
      detail: 'Professional image optimization, WebP/AVIF conversion, and responsive banner creation',
      duration: '3-4 days',
      color: 'from-emerald-500 to-green-500'
    },
    { 
      step: 4, 
      title: 'Implement', 
      description: 'Seamless store integration',
      icon: RocketLaunchIcon,
      detail: 'Code implementation with comprehensive guide and direct theme integration support',
      duration: '1-2 days',
      color: 'from-orange-500 to-red-500'
    },
    { 
      step: 5, 
      title: 'A/B Test', 
      description: 'Performance validation & optimization',
      icon: BeakerIcon,
      detail: 'Results monitoring, performance validation, and continuous optimization recommendations',
      duration: 'Ongoing',
      color: 'from-pink-500 to-rose-500'
    }
  ]


  const shopifyFAQ = [
    {
      id: 1,
      question: "What's included in the Shopify add-on?",
      answer: "The Shopify Store Optimizer includes WebP & AVIF conversion for all product images, 3 responsive collection hero banners, a comprehensive speed audit report, SEO alt-text injection sheet (CSV), and implementation guide with copy-paste snippets for Dawn 2.0+ themes."
    },
    {
      id: 2,
      question: "How fast will I see results?",
      answer: "The add-on is delivered within 5 days of booking. Speed improvements are typically visible immediately after implementation, with page load times improving by 30-70%."
    },
    {
      id: 3,
      question: "Is this compatible with my theme?",
      answer: "Our implementation guide includes snippets optimized for Dawn 2.0+ themes. For custom themes, we provide general implementation guidelines and support."
    },
    {
      id: 4,
      question: "Can I book just the audit without the add-on?",
      answer: "Yes, the audit is completely free with no obligations. However, 95% of merchants who see their audit results choose to add the SGD $290 Shopify Store Optimizer for immediate implementation."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>SwiftPixel - Shopify Visual Optimization | Speed-Optimized Product Images Singapore</title>
        <meta name="title" content="SwiftPixel - Shopify Visual Optimization | Speed-Optimized Product Images Singapore" />
        <meta name="description" content="Supercharge your Shopify store with pixel-perfect, speed-optimized visuals. Get 65% faster page loads, 47% higher conversion rates. SGD $290 Shopify Store Optimizer package with WebP/AVIF conversion, responsive banners, and 5-day delivery. Free audit available." />
        <meta name="keywords" content="Shopify optimization Singapore, Shopify speed optimization, WebP AVIF conversion, Shopify product images, e-commerce optimization Singapore, Shopify store optimizer, fast loading Shopify, Shopify visual optimization, Dawn theme optimization" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="SwiftPixel Studio" />
        <link rel="canonical" href="https://swiftpixel.com/shopify" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swiftpixel.com/shopify" />
        <meta property="og:title" content="SwiftPixel - Shopify Visual Optimization | Speed-Optimized Product Images" />
        <meta property="og:description" content="Supercharge your Shopify store with pixel-perfect, speed-optimized visuals. Get 65% faster page loads and 47% higher conversion rates with our SGD $290 Shopify Store Optimizer package." />
        <meta property="og:image" content="https://swiftpixel.com/images/portfolio/transformation-01v2.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SwiftPixel Studio" />
        <meta property="og:locale" content="en_SG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://swiftpixel.com/shopify" />
        <meta name="twitter:title" content="SwiftPixel - Shopify Visual Optimization | Speed-Optimized Product Images" />
        <meta name="twitter:description" content="Supercharge your Shopify store with pixel-perfect, speed-optimized visuals. Get 65% faster page loads and 47% higher conversion rates." />
        <meta name="twitter:image" content="https://swiftpixel.com/images/portfolio/transformation-01v2.jpg" />

        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "SwiftPixel Studio",
              "description": "Singapore's premier Shopify optimization specialist delivering speed-optimized product images and visual enhancements",
              "url": "https://swiftpixel.com/shopify",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG",
                "addressLocality": "Singapore"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 1.3521,
                "longitude": 103.8198
              },
              "priceRange": "SGD 290",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 1.3521,
                  "longitude": 103.8198
                },
                "geoRadius": "50000"
              },
              "areaServed": ["Singapore", "Southeast Asia"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Shopify Optimization Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Shopify Store Optimizer",
                      "description": "Complete Shopify visual optimization package with WebP/AVIF conversion, responsive banners, and speed audit"
                    },
                    "price": "290",
                    "priceCurrency": "SGD",
                    "availability": "InStock"
                  }
                ]
              }
            }
          `}
        </script>

        {/* Service Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Shopify Visual Optimization",
              "provider": {
                "@type": "Organization",
                "name": "SwiftPixel Studio",
                "url": "https://swiftpixel.com"
              },
              "description": "Professional Shopify store optimization service delivering 65% faster page loads and 47% higher conversion rates through speed-optimized product images and visual enhancements",
              "serviceType": "E-commerce Optimization",
              "areaServed": "Singapore",
              "offers": {
                "@type": "Offer",
                "name": "Shopify Store Optimizer Package",
                "price": "290",
                "priceCurrency": "SGD",
                "description": "Complete optimization package including WebP & AVIF conversion, responsive banners, speed audit, and implementation guide",
                "availability": "InStock"
              }
            }
          `}
        </script>
      </Helmet>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={true}
          scrollToSection={scrollToSection}
          currentPage="shopify"
          onGetStarted={handleBookAudit}
          showBanner={showBanner}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>

      {/* Hero Section */}
      <section id="hero" className={`bg-gradient-to-br from-violet-50 to-blue-50 py-16 px-6 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-5 py-3 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>15% Higher CTR Guaranteed</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-violet-950 mb-6">
              Supercharge your Shopify with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                pixel-perfect, speed-optimized
              </span>
              <br />
              visuals
            </h1>
            
            <p className="text-xl text-violet-800 mb-8 max-w-3xl mx-auto">
              No theme headaches. Get a <strong>free audit</strong> + add our SGD $290 optimizer for instant speed improvements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleBookAudit}
                className="bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <span>Book Free Audit</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-violet-50 transition-colors inline-flex items-center space-x-2 text-lg"
              >
                <PlayIcon className="w-5 h-5" />
                <span>See How It Works</span>
              </button>
            </div>
          </div>

          {/* Scrolling Before/After Mockup */}
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/transformation-01v2.jpg"
              afterImage="/images/portfolio/transformation-02.png"
              beforeAlt="Slow-loading Shopify store before optimization"
              afterAlt="Fast-loading optimized Shopify store"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section id="proof" className={`bg-white py-12 border-b transition-all duration-1000 ${isVisible.proof ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2.3s → 0.8s</div>
              <p className="text-gray-600">Average page load time improvement</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">+47%</div>
              <p className="text-gray-600">Average conversion rate increase</p>
            </div>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-violet-600 mb-2">85% Less</div>
              <p className="text-gray-600">Image file size reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section id="services" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-950 mb-4">
              Complete Visual Optimization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your Shopify store needs to load faster and convert better
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-full p-2 max-w-2xl mx-auto">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeTab === service.id
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${activeTab === service.id ? 'block' : 'hidden'}`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-violet-100 to-blue-100 rounded-xl p-8 text-center">
                    <CameraIcon className="w-16 h-16 text-violet-600 mx-auto mb-4" />
                    <p className="text-gray-600">Service visualization coming soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light-Lift Add-On Block */}
      <section id="addon" className={`bg-white py-16 transition-all duration-1000 ${isVisible.addon ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-950 mb-4">
              Shopify Store Optimizer Add-On
            </h2>
            <p className="text-xl text-gray-600">
              The perfect light-lift solution for immediate speed improvements
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 border-2 border-violet-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-violet-950">Shopify Store Optimizer</h3>
                    <p className="text-violet-600 font-semibold">SGD $290 flat rate</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span>Compress & convert all product images to WebP + AVIF</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span>3 responsive Collection Hero banners (retina-ready)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span>Speed audit report with actionable fixes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span>Alt-text SEO injection sheet (CSV)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span>Implementation guide (copy-paste snippets for Dawn 2.0+ themes)</span>
                  </li>
                </ul>

                <div className="bg-white rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>Delivery:</strong> Within 5 days • <strong>Add-on:</strong> Can be selected after audit booking
                  </p>
                </div>

                <button
                  onClick={handleBookAudit}
                  className="w-full bg-violet-600 text-white py-4 rounded-full font-semibold hover:bg-violet-700 transition-colors"
                >
                  Add to Audit Booking
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Performance Impact</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Page Load Speed</span>
                    <span className="text-emerald-600 font-semibold">+65% faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Image File Size</span>
                    <span className="text-emerald-600 font-semibold">-80% smaller</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">SEO Score</span>
                    <span className="text-emerald-600 font-semibold">+25 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mobile Experience</span>
                    <span className="text-emerald-600 font-semibold">Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced 5-Step Process */}
      <section id="process" className={`bg-gradient-to-br from-violet-50 via-white to-blue-50 py-20 transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-violet-950 mb-6">
              Our 5-Step Optimization Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From audit to A/B testing, we handle everything for maximum results with complete transparency
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Curved connecting line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1">
              <svg className="w-full h-full" viewBox="0 0 1000 100" fill="none">
                <path 
                  d="M0 50 Q250 10 500 50 T1000 50" 
                  stroke="url(#processGradient)" 
                  strokeWidth="3"
                  fill="none"
                />
                <defs>
                  <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="25%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="75%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {processSteps.map((step, index) => (
                <div key={step.step} className="group">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform hover:-translate-y-2 group-hover:scale-105">
                    {/* Header */}
                    <div className="text-center mb-6">
                      {/* Icon Container */}
                      <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>

                      {/* Duration Badge */}
                      <div className="inline-flex items-center space-x-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        <ClockIcon className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                    </div>

                    {/* Expandable Detail */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="text-xs text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {step.detail}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`bg-gradient-to-r ${step.color} h-1 rounded-full transition-all duration-1000 delay-${index * 200}`}
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Connector */}
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    {index < processSteps.length - 1 && (
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-violet-400 to-transparent"></div>
                        <ArrowRightIcon className="w-5 h-5 text-violet-400 rotate-90" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Summary */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Transparency</h4>
                  <p className="text-sm text-gray-600">You'll know exactly what we're doing at each step</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
                  <p className="text-sm text-gray-600">Complete optimization in 5-7 business days</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ChartBarIcon className="w-6 h-6 text-violet-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Measurable Results</h4>
                  <p className="text-sm text-gray-600">Track improvements with detailed analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Slider - Moët PDP + Veuve banner */}
      <section id="beforeafter" className={`bg-white py-16 transition-all duration-1000 ${isVisible.beforeafter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-950 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              Real Shopify store optimization results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Page Optimization</h3>
              <BeforeAfterSlider
                beforeImage="/images/portfolio/transformation-1.webp"
                afterImage="/images/portfolio/transformation-2.webp"
                beforeAlt="Unoptimized product page"
                afterAlt="Optimized product page with better performance"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collection Banner</h3>
              <BeforeAfterSlider
                beforeImage="/images/portfolio/transformation-3.webp"
                afterImage="/images/portfolio/transformation-4.webp"
                beforeAlt="Basic collection banner"
                afterAlt="Professional optimized collection banner"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Snapshot */}
      <section id="casestudy" className={`bg-gradient-to-br from-emerald-50 to-green-50 py-16 transition-all duration-1000 ${isVisible.casestudy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <ChartBarIcon className="w-4 h-4" />
                  <span>Case Study</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">LuxeLashes</h2>
                <div className="text-4xl font-bold text-emerald-600 mb-2">+38% CR</div>
                <p className="text-xl text-gray-600 mb-6">
                  Conversion rate increase within 30 days of optimization
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">2.8s → 1.1s</div>
                    <p className="text-sm text-gray-600">Page Load Time</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">90%</div>
                    <p className="text-sm text-gray-600">File Size Reduction</p>
                  </div>
                </div>

                <blockquote className="text-gray-600 italic mb-4">
                  "The speed improvement was immediate and dramatic. Our customers noticed the difference right away, and our conversion rate jumped significantly."
                </blockquote>
                <p className="text-sm text-gray-500 mb-6">— Sarah Chen, LuxeLashes Founder</p>
                
                <button
                  onClick={handleBookAudit}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
                >
                  <span>Get Similar Results</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-violet-100 to-blue-100 rounded-xl p-8 text-center">
                <ShoppingBagIcon className="w-24 h-24 text-violet-600 mx-auto mb-4" />
                <p className="text-gray-600">Case study visuals coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bridge - Compact */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-violet-950 mb-3">
              Ready for Similar Results?
            </h3>
            <p className="text-gray-600 mb-4">
              Book your free audit and add the SGD $290 optimizer at checkout
            </p>
            <button
              onClick={handleBookAudit}
              className="bg-violet-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Book Free Audit</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section id="trust" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.trust ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-violet-950 mb-8">
              Trusted by Shopify Merchants Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Shopify Partner</h3>
              <p className="text-gray-600">Official Shopify development partner with proven expertise</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">4.9/5 Rating</h3>
              <p className="text-gray-600">Based on 200+ client reviews and project completions</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600">Serving Shopify stores across 15+ countries</p>
            </div>
          </div>

          {/* Client Logos Placeholder */}
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500 mb-4">Trusted by leading e-commerce brands</p>
            <div className="flex justify-center items-center space-x-8 opacity-50">
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl p-8 mt-8 shadow-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-gray-700 mb-4">
              "SwiftPixel transformed our Shopify store completely. Page load times dropped by 60%, and our conversion rate increased by 42%. The optimization was seamless and the results were immediate."
            </blockquote>
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                alt="Client testimonial" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Alex Thompson</p>
                <p className="text-gray-600">Founder, TechGear Store</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={handleBookAudit}
                className="bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-colors inline-flex items-center justify-center space-x-2 text-lg"
              >
                <span>Join 200+ Happy Merchants</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ 
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our SGD $290 Shopify Store Optimizer"
        questions={shopifyFAQ}
        className="bg-white"
      />

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="font-bold text-gray-900">Ready to supercharge your Shopify?</h3>
            <p className="text-gray-600">Book your free audit → Add Optimizer at checkout</p>
          </div>
          <button
            onClick={handleBookAudit}
            className="bg-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-violet-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Book Free Audit</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer with bottom padding for sticky CTA */}
      <div className="pb-20">
        <Footer 
          scrollToSection={scrollToSection}
          openModal={openModal}
          showScrollButtons={true}
        />
        <SEOFooter pageType="shopify" />
      </div>
    </div>
  )
}

export default ShopifyPage