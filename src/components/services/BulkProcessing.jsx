import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import SEOFooter from '../shared/SEOFooter'
import PricingPopup from '../PricingPopup'
import { PRICING_CONFIG, getCatalogProcessingArray } from '../../config/pricing'

// Heroicons
import {
  ArrowRightIcon,
  CalculatorIcon,
  CheckCircleIcon,
  BoltIcon as Zap,
  TrophyIcon as Award,
  ShieldCheckIcon as Shield,
  ArrowUpTrayIcon as Upload,
  CogIcon as Settings,
  FolderOpenIcon,
  ArrowDownTrayIcon as Download,
  ArrowTrendingUpIcon,
  ClockIcon,
  StarIcon,
  UsersIcon,
  GlobeAltIcon as Target,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/outline'

const BulkProcessing = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('full-service')
  const [animatedCounts, setAnimatedCounts] = useState({ 
    volume1: 0, 
    volume2: 0, 
    volume3: 0, 
    volume4: 0 
  })

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Professional Bulk Image Processing Singapore | Volume Photo Editing - SwiftPixel'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'SwiftPixel Studio - Professional Photo Editing Services'
    }
  }, [])

  // Counter animation for hero section
  useEffect(() => {
    const animateCounters = () => {
      const targets = { volume1: 5, volume2: 25, volume3: 50, volume4: 100 }
      const duration = 2000
      const startTime = Date.now()
      
      const updateCounters = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        setAnimatedCounts({
          volume1: Math.floor(targets.volume1 * progress),
          volume2: Math.floor(targets.volume2 * progress),
          volume3: Math.floor(targets.volume3 * progress),
          volume4: Math.floor(targets.volume4 * progress)
        })
        
        if (progress < 1) {
          requestAnimationFrame(updateCounters)
        }
      }
      
      requestAnimationFrame(updateCounters)
    }

    if (isVisible.hero) {
      animateCounters()
    }
  }, [isVisible.hero])

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
      { threshold: 0.1, rootMargin: '50px' }
    )

    document.querySelectorAll('[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  const handleCalculatorClick = () => {
    setIsPricingOpen(true)
  }

  // Bulk-specific FAQ data
  const bulkFAQs = [
    {
      id: 1,
      question: "Can you handle 100+ images in one project?",
      answer: "Yes! Our Enterprise package is specifically designed for 100 assets with 12-hour express delivery. For projects larger than 100 images, we can create custom bulk solutions with dedicated project management."
    },
    {
      id: 2,
      question: "Do you maintain quality at volume?",
      answer: "Absolutely. Whether it's your 1st image or your 100th, every asset receives the same professional attention. Our bulk processing workflow includes systematic quality control checkpoints and manual review of every single image."
    },
    {
      id: 3,
      question: "How do bulk revisions work?",
      answer: "Each bulk package includes 2-3 revision rounds (Enterprise gets 3). You can request changes on any or all images in your batch. We handle revisions systematically to maintain consistency across your entire volume."
    },
    {
      id: 4,
      question: "What's the largest bulk project you've handled?",
      answer: "We've successfully processed individual projects of 200+ images for major Singapore retailers. Our largest single client processed over 1,000 product images across multiple bulk packages for their full catalog launch."
    },
    {
      id: 5,
      question: "Can I mix different editing services in one bulk project?",
      answer: "Yes! All our bulk packages include background removal, color correction, platform resizing, creative graphics, and infographics. You can specify different editing requirements for different images within the same bulk order."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          currentPage="bulk-processing"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>

      {/* Hero Section */}
      <section id="hero" className={`bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 pt-16 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div className="order-1 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <ArrowTrendingUpIcon className="w-4 h-4" />
                <span>Volume Processing Specialist</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Professional{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Bulk Image Processing
                </span>{' '}
                Singapore
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                From 5 to 200 images processed with precision—save up to 64% with catalog processing and get faster delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('calculator')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <CalculatorIcon className="w-5 h-5" />
                  <span>Calculate Bulk Savings</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={() => scrollToSection('packages')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  View Volume Packages
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <ClockIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">12-72h Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Quality at Scale</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Up to 43% Savings</span>
                </div>
              </div>
            </div>

            {/* Volume Counter Animation */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Volume Processing Capacity</h3>
                <div className="grid grid-cols-2 gap-6">
                  
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{animatedCounts.volume1}</div>
                    <div className="text-sm text-gray-600">Small Batch</div>
                    <div className="text-xs text-gray-500">Starter Package</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{animatedCounts.volume2}</div>
                    <div className="text-sm text-gray-600">Volume Processing</div>
                    <div className="text-xs text-purple-600 font-medium">★ Most Popular</div>
                  </div>
                  
                  <div className="text-center p-4 bg-indigo-50 rounded-xl">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{animatedCounts.volume3}</div>
                    <div className="text-sm text-gray-600">Professional Bulk</div>
                    <div className="text-xs text-gray-500">Advanced Package</div>
                  </div>
                  
                  <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{animatedCounts.volume4}</div>
                    <div className="text-sm text-gray-600">Enterprise Bulk</div>
                    <div className="text-xs text-gray-500">Maximum Volume</div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">10,000+</span> images processed for Singapore businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Volume Selector */}
      <section id="calculator" className={`bg-white py-16 transition-all duration-1000 ${isVisible.calculator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Bulk Package
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your volume and see instant pricing with up to 43% savings
            </p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl p-8 border border-violet-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalculatorIcon className="w-8 h-8 text-violet-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How many assets do you have?
              </h3>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Select your volume range to see bulk pricing and savings compared to individual rates
              </p>

              <button
                onClick={handleCalculatorClick}
                className="bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-colors text-lg flex items-center justify-center space-x-3 mx-auto"
              >
                <span>View Bulk Pricing</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Small Batch</div>
                  <div className="text-xs text-green-600 font-medium">Save 19%</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-600">Standard Volume</div>
                  <div className="text-xs text-green-600 font-medium">Save 29%</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">50+</div>
                  <div className="text-sm text-gray-600">Catalog Processing</div>
                  <div className="text-xs text-green-600 font-medium">Save 48%</div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">200+</div>
                  <div className="text-sm text-gray-600">Catalog Enterprise</div>
                  <div className="text-xs text-green-600 font-medium">Save 64%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Processing Options */}
      <section id="packages" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.packages ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Processing Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Select the service level that matches your project needs
            </p>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-full p-1 border border-gray-200">
                <button
                  onClick={() => setActiveTab('full-service')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'full-service' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Full-Service Packages
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'catalog' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Catalog Processing
                </button>
              </div>
            </div>
          </div>

          {/* Full-Service Packages */}
          {activeTab === 'full-service' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Full-Service Bulk Processing</h3>
                <p className="text-gray-600">Complete creative work including graphics, infographics, and custom designs</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Small Batch Processing */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Small Batch Processing</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.essential.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.essential.assets} assets included</p>
                <p className="text-sm text-blue-600 font-medium">SGD {PRICING_CONFIG.packages.essential.perEdit}/edit</p>
                <p className="text-xs text-gray-500 mt-1">Perfect for testing bulk workflow</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">72-hour processing time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">All editing services included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">2 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Organized bulk delivery</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Start Small Batch
              </button>
            </div>

            {/* Volume Processing - Most Popular */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-300 p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ⭐ Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Volume Processing</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.professional.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.professional.assets} assets included</p>
                <p className="text-sm text-purple-600 font-bold">SGD {PRICING_CONFIG.packages.professional.perEdit}/edit</p>
                <p className="text-xs text-purple-600 font-medium mt-1">24% savings vs individual edits</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">48-hour bulk delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Priority processing queue</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">2 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Volume workflow optimization</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Choose Volume Processing
              </button>
            </div>

            {/* Professional Bulk Processing */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-blue-300 transition-colors">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Bulk</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.advanced.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.advanced.assets} assets included</p>
                <p className="text-sm text-indigo-600 font-medium">SGD {PRICING_CONFIG.packages.advanced.perEdit}/edit</p>
                <p className="text-xs text-gray-500 mt-1">34% savings vs individual edits</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">36-hour priority processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Advanced bulk workflow</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">3 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Priority support</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Choose Professional
              </button>
            </div>

            {/* Enterprise Bulk Solution */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-300 p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Ultimate Volume
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise Bulk</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.enterprise.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.enterprise.assets} assets included</p>
                <p className="text-sm text-emerald-600 font-bold">SGD {PRICING_CONFIG.packages.enterprise.perEdit}/edit</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">43% maximum savings</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">12-hour express delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Dedicated project manager</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">3 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Enterprise workflow</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Choose Enterprise
              </button>
            </div>
              </div>
            </div>
          )}

          {/* Catalog Processing Packages */}
          {activeTab === 'catalog' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">E-commerce Catalog Processing</h3>
                <p className="text-gray-600">Streamlined processing for standardized catalog operations—background removal, resizing, basic corrections</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {getCatalogProcessingArray().map((pkg, index) => (
                  <div key={pkg.id} className="bg-white rounded-2xl border-2 border-emerald-200 p-6 hover:border-emerald-300 transition-colors relative">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-emerald-600 mb-1">{pkg.priceDisplay}</div>
                      <p className="text-emerald-700 font-medium">SGD {pkg.perEdit}/edit</p>
                      <p className="text-sm text-gray-600 mt-2">{pkg.assets} assets • {pkg.discountText}</p>
                      <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {pkg.features.slice(0, 4).map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center space-x-3">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleGetStartedClick}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Choose {pkg.name}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-white rounded-2xl p-6 border border-emerald-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    <strong>Not included in catalog processing:</strong> Creative graphics, infographics, custom compositions
                  </p>
                  <p className="text-sm text-gray-500">
                    Need full creative services? Switch to "Full-Service Packages" above
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Why Choose Our Bulk Processing */}
      <section id="benefits" className={`bg-white py-16 transition-all duration-1000 ${isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Bulk Processing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Five key advantages that make us Singapore's trusted volume processing specialist
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Volume Expertise */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <UsersIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Volume Expertise</h3>
              <p className="text-gray-600">Processed 10,000+ images for Singapore businesses. We understand the unique challenges of maintaining quality at scale.</p>
            </div>

            {/* Consistent Quality */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Consistent Quality</h3>
              <p className="text-gray-600">Same professional standards from image 1 to image 100. Our quality control ensures every asset meets your brand requirements.</p>
            </div>

            {/* Bulk Efficiency */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Zap className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bulk Efficiency</h3>
              <p className="text-gray-600">Streamlined workflow designed for volume. Faster delivery times and better coordination for large projects.</p>
            </div>

            {/* Transparent Pricing */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                <CalculatorIcon className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees, clear volume discounts. You know exactly what you pay before starting your bulk project.</p>
            </div>

            {/* All Services Included */}
            <div className="text-center group md:col-span-2 lg:col-span-1">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                <CheckCircleIcon className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">All Services Included</h3>
              <p className="text-gray-600">Background removal, color correction, resizing, graphics—every bulk package includes our complete editing suite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Processing Workflow */}
      <section id="workflow" className={`bg-blue-600 py-16 transition-all duration-1000 ${isVisible.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Optimized Bulk Processing Workflow
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Systematic 4-step process designed specifically for volume projects
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1: Bulk Upload */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Bulk Upload</h3>
              <p className="text-white/90">Secure transfer of 5-100 images through our optimized bulk upload system.</p>
            </div>

            {/* Step 2: Volume Assessment */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Volume Assessment</h3>
              <p className="text-white/90">Quality check and systematic processing plan tailored to your bulk requirements.</p>
            </div>

            {/* Step 3: Batch Processing */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Batch Processing</h3>
              <p className="text-white/90">Systematic editing with integrated quality control checkpoints throughout the volume.</p>
            </div>

            {/* Step 4: Organized Delivery */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderOpenIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Organized Delivery</h3>
              <p className="text-white/90">All images delivered in structured folders with clear naming conventions.</p>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="mt-12 bg-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Processing Timeline by Volume</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">72h</div>
                <div className="text-white/80 text-sm">5 images</div>
                <div className="text-white/60 text-xs">Starter</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">48h</div>
                <div className="text-white/80 text-sm">25 images</div>
                <div className="text-yellow-300/80 text-xs">★ Essential</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">36h</div>
                <div className="text-white/80 text-sm">50 images</div>
                <div className="text-white/60 text-xs">Professional</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-300">12h</div>
                <div className="text-white/80 text-sm">100 images</div>
                <div className="text-emerald-300/80 text-xs">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Processing Capabilities */}
      <section id="capabilities" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.capabilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Volume Processing Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Technical specifications and capabilities for handling your bulk projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Processing Capacity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Processing Capacity</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• 5-100 images per project</li>
                <li>• Scalable to 200+ with custom plans</li>
                <li>• Parallel processing capabilities</li>
                <li>• Enterprise-grade infrastructure</li>
              </ul>
            </div>

            {/* File Support */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <FolderOpenIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">File Support</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• JPG, PNG, TIFF, PSD formats</li>
                <li>• Max 50MB per image</li>
                <li>• RAW file compatibility</li>
                <li>• Batch format conversion</li>
              </ul>
            </div>

            {/* Delivery & Storage */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <Download className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delivery & Storage</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Organized ZIP files</li>
                <li>• Cloud storage access</li>
                <li>• Structured naming conventions</li>
                <li>• Instant download links</li>
              </ul>
            </div>

            {/* Processing Time */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Processing Time</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• 12-72 hours delivery</li>
                <li>• Faster with larger volumes</li>
                <li>• Express options available</li>
                <li>• Real-time progress updates</li>
              </ul>
            </div>

            {/* Quality Control */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Quality Control</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Every image manually reviewed</li>
                <li>• Consistency checks across batch</li>
                <li>• Brand guideline compliance</li>
                <li>• Quality assurance reports</li>
              </ul>
            </div>

            {/* Project Management */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <UsersIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Project Management</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Dedicated project coordinators</li>
                <li>• Progress tracking dashboard</li>
                <li>• Direct communication channels</li>
                <li>• Custom workflow setup</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Pricing Comparison Table */}
      <section id="comparison" className={`bg-white py-16 transition-all duration-1000 ${isVisible.comparison ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bulk Pricing Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See exactly how much you save with volume packages vs. individual rates
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden border border-blue-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="text-left p-4 font-semibold">Volume</th>
                    <th className="text-center p-4 font-semibold">Individual Rate</th>
                    <th className="text-center p-4 font-semibold">Bulk Package</th>
                    <th className="text-center p-4 font-semibold">Your Savings</th>
                    <th className="text-center p-4 font-semibold">Savings %</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">5 images</td>
                    <td className="p-4 text-center text-red-600 font-semibold">$105</td>
                    <td className="p-4 text-center text-green-600 font-semibold">$99</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">$6</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">6%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-purple-50">
                    <td className="p-4 font-medium text-gray-900">25 images ⭐</td>
                    <td className="p-4 text-center text-red-600 font-semibold">$525</td>
                    <td className="p-4 text-center text-green-600 font-semibold">$399</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">$126</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">24%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">50 images</td>
                    <td className="p-4 text-center text-red-600 font-semibold">$1,050</td>
                    <td className="p-4 text-center text-green-600 font-semibold">$699</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">$351</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">33%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-emerald-50">
                    <td className="p-4 font-medium text-gray-900">100 images 🎯</td>
                    <td className="p-4 text-center text-red-600 font-semibold">$2,100</td>
                    <td className="p-4 text-center text-green-600 font-semibold">$1,199</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">$901</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">43%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-emerald-50 p-6 border-t border-emerald-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Maximum Savings with Enterprise Package</h3>
                <p className="text-emerald-700">
                  Save up to <strong>$901</strong> with our Enterprise bulk package vs. individual rates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Processing FAQ */}
      <section id="bulk-faq" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible['bulk-faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Bulk Processing FAQ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about our volume processing services
            </p>
          </div>

          <div className="space-y-6">
            {bulkFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      <PlusIcon className="w-5 h-5 text-gray-500 group-open:hidden" />
                      <MinusIcon className="w-5 h-5 text-gray-500 hidden group-open:block" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study: Volume Success */}
      <section id="case-study" className={`bg-gradient-to-br from-purple-600 to-blue-600 py-16 text-white transition-all duration-1000 ${isVisible['case-study'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Volume Success Story
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              How one Singapore retailer saved $300 and improved their marketplace performance
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Case Study Content */}
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <StarIcon className="w-4 h-4" />
                  <span>Client Success Story</span>
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Electronics Plus: 75 Product Images for Shopee Expansion
                </h3>
                
                <div className="space-y-4 mb-6">
                  <p className="text-white/90 leading-relaxed">
                    Electronics Plus needed to process 75 product images for their major Shopee store expansion. 
                    Using individual editing would have cost $1,575 and taken weeks.
                  </p>
                  
                  <p className="text-white/90 leading-relaxed">
                    With our Professional Bulk package, they processed all 75 images for just $1,048, 
                    saving $527 while maintaining perfect brand consistency across their entire catalog.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">$527</div>
                    <div className="text-white/80 text-sm">Total Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">75</div>
                    <div className="text-white/80 text-sm">Images Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">36h</div>
                    <div className="text-white/80 text-sm">Delivery Time</div>
                  </div>
                </div>

                <blockquote className="border-l-4 border-white/30 pl-4 text-white/90 italic">
                  "SwiftPixel's bulk processing saved us both time and money. The consistency across 
                  all 75 images was perfect, and our Shopee approval rate improved dramatically."
                </blockquote>
                
                <div className="text-white/80 text-sm mt-2">
                  — Marcus Tan, Store Manager, Electronics Plus
                </div>
              </div>

              {/* Visual Elements */}
              <div className="text-center">
                <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm">
                  <h4 className="text-xl font-bold mb-6">Processing Breakdown</h4>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Individual Rate (75 × $21):</span>
                      <span className="font-bold text-red-300">$1,575</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Bulk Package (Professional):</span>
                      <span className="font-bold text-green-300">$1,048</span>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">Total Savings:</span>
                        <span className="font-bold text-emerald-300">$527</span>
                      </div>
                      <div className="text-center text-emerald-300 text-sm mt-2">
                        33% savings with bulk processing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="final-cta" className={`bg-white py-16 transition-all duration-1000 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready for Bulk Processing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Singapore businesses saving time and money with our volume processing solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => scrollToSection('calculator')}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <CalculatorIcon className="w-5 h-5" />
              <span>Calculate Volume Savings</span>
            </button>
            
            <button
              onClick={handleGetStartedClick}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Bulk Project
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-blue-600" />
              <span>12-72h Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-blue-600" />
              <span>Up to 43% Savings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Quality at Scale</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <SEOFooter 
        pageType="general" 
        customContent="SwiftPixel Studio provides professional bulk image processing services across Singapore and Southeast Asia. Our volume packages handle 5 to 200 images with up to 64% savings compared to individual editing rates. Whether you need batch background removal, volume color correction, or bulk platform optimization for Shopee, Lazada, and Amazon, our streamlined bulk processing workflow delivers consistent quality at scale. From small batch processing (5 images) to enterprise catalog solutions (200 images), we maintain the same professional standards while offering significant bulk discounts. Our specialized e-commerce catalog processing starts at just $7.50 per edit for standardized operations like background removal, cropping, and basic color correction. For creative projects requiring custom graphics and infographics, our standard bulk processing starts at $11.90 per edit. Singapore businesses trust our volume processing expertise for product launches, catalog updates, and seasonal campaigns across all major platforms."
      />

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        showScrollButtons={true}
      />

      {/* Pricing Popup */}
      <PricingPopup 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
      />
    </div>
  )
}

export default BulkProcessing