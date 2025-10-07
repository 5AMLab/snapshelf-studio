import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import BeforeAfterSlider from '../BeforeAfterSlider'
import FAQ from '../shared/FAQ'
import SEOFooter from '../shared/SEOFooter'
import { PRICING_CONFIG } from '../../config/pricing'

// Lucide React Icons
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Zap from 'lucide-react/dist/esm/icons/zap'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Shield from 'lucide-react/dist/esm/icons/shield'
import Upload from 'lucide-react/dist/esm/icons/upload'
import Bot from 'lucide-react/dist/esm/icons/bot'
import User from 'lucide-react/dist/esm/icons/user'
import Download from 'lucide-react/dist/esm/icons/download'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Star from 'lucide-react/dist/esm/icons/star'
import Users from 'lucide-react/dist/esm/icons/users'
import X from 'lucide-react/dist/esm/icons/x'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Hash from 'lucide-react/dist/esm/icons/hash'

const BackgroundRemoval = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})
  const [showContactModal, setShowContactModal] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    images: ''
  })

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Background Removal Service Singapore | SwiftPixel - Lazada Shopee Amazon Compliance'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'SwiftPixel Studio - Professional Photo Editing Services'
    }
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
      { threshold: 0.1, rootMargin: '50px' }
    )

    document.querySelectorAll('[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Sticky bar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroHeight = 600 // Approximate hero section height
      setShowStickyBar(scrollPosition > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    setShowContactModal(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Navigate to payment page with form data
    navigate('/checkout/payment', { state: { service: 'background-removal', ...formData } })
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // FAQ data specific to background removal
  const backgroundRemovalFAQs = [
    {
      id: 1,
      question: "What's your turnaround time for background removal?",
      answer: `We deliver professionally edited images within ${PRICING_CONFIG.delivery.standard.time} for our standard packages. Our Professional package offers 36-hour delivery, and Enterprise package provides 12-hour emergency delivery. Rush delivery is available with surcharges.`
    },
    {
      id: 2,
      question: "Which file formats do you accept and deliver?",
      answer: "We accept JPEG, PNG, TIFF, PSD, and RAW files. We deliver in your preferred format - PNG for transparency, JPEG for web optimization, or high-resolution TIFF for print."
    },
    {
      id: 3,
      question: "What if I'm not satisfied with the results?",
      answer: "We offer 2-3 free revisions (depending on your package) and a 100% satisfaction guarantee. If you're still not happy, we provide a full refund within 7 days of delivery."
    },
    {
      id: 4,
      question: "How does your bulk pricing work?",
      answer: `Background removal is included in all our bulk packages. Our Essential package (${PRICING_CONFIG.packages.professional.assets} edits) offers the best value at SGD ${PRICING_CONFIG.packages.professional.perEdit} per edit. For single edits, our à la carte rate is SGD ${PRICING_CONFIG.alacarte.perEdit} per edit.`
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          currentPage="background-removal"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>

      {/* Hero Section */}
      <section id="hero" className={`bg-gradient-to-br from-purple-50 to-blue-50 pt-16 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Image with Animation Effect */}
            <div className="order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                {/* Checkerboard pattern overlay */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                <img
                  src="/images/portfolio/removebg-01-after.jpg"
                  alt="Background removal transformation example"
                  className="w-full h-full object-cover rounded-xl"
                  loading="eager"
                  priority="high"
                />
                {/* Floating elements for visual appeal */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 pt-2 space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Goodbye Clutter.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Hello Conversions.
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Marketplace-ready backgrounds in 24 h—no DIY, no rejects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStartedClick}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Remove My Backgrounds</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">72h Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">No Subscription</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">From SGD {PRICING_CONFIG.packages.professional.perEdit}/edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Pain Section */}
      <section id="problems" className={`bg-white py-16 transition-all duration-1000 ${isVisible.problems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Problem Images */}
            <div className="space-y-6">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <img
                  src="/images/portfolio/removebg-01-before.jpg"
                  alt="Messy background example"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-red-700 font-medium text-center">❌ Rejected by Marketplace</p>
              </div>
            </div>

            {/* Problem List */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Tired of Image Rejections?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Stop losing sales to poor product photos. Here's what's costing you money:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Images rejected by Lazada QC</h3>
                    <p className="text-gray-600">Inconsistent backgrounds fail marketplace compliance standards</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Shadows you can't erase</h3>
                    <p className="text-gray-600">DIY tools leave artifacts that look unprofessional</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hours wasted per SKU</h3>
                    <p className="text-gray-600">Time better spent growing your business, not editing photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.solution ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SwiftPixel strips away the busy work—so your products pop, compliance boxes are ticked, and sales climb.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Speed */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <Zap className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Speed</h3>
              <p className="text-gray-600">Lightning-fast 24h turnaround gets your products live faster than competitors.</p>
            </div>

            {/* Precision */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precision</h3>
              <p className="text-gray-600">Pixel-perfect edges and flawless transparency that passes every quality check.</p>
            </div>

            {/* Compliance */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance</h3>
              <p className="text-gray-600">Marketplace-ready formats that meet Lazada, Shopee, and Amazon standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className={`bg-purple-600 py-16 transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Simple 4-step process to get marketplace-ready backgrounds in {PRICING_CONFIG.delivery.standard.time}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1: Upload */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Upload</h3>
              <p className="text-white/90">Send us your product images through our secure upload portal.</p>
            </div>

            {/* Step 2: AI-assist pass */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI-assist pass</h3>
              <p className="text-white/90">Our advanced AI handles the initial background removal with precision.</p>
            </div>

            {/* Step 3: Human polish */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Human polish</h3>
              <p className="text-white/90">Expert designers perfect every edge and detail by hand.</p>
            </div>

            {/* Step 4: Download */}
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-purple-600" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sm font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Download in {PRICING_CONFIG.delivery.standard.time}</h3>
              <p className="text-white/90">Receive your professionally edited images ready for upload.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section id="gallery" className={`bg-white py-16 transition-all duration-1000 ${isVisible.gallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional results that make your products stand out from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gallery Item 1 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <BeforeAfterSlider
                beforeImage="/images/portfolio/removebg-01-before.jpg"
                afterImage="/images/portfolio/removebg-01-after.jpg"
                beforeAlt="Product with cluttered background"
                afterAlt="Product with clean white background"
                className="rounded-xl"
              />
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <BeforeAfterSlider
                beforeImage="/images/portfolio/bg-remove-v2-before.jpg"
                afterImage="/images/portfolio/bg-remove-v2-after.jpg"
                beforeAlt="Product with messy background"
                afterAlt="Product with professional white background"
                className="rounded-xl"
              />
            </div>

            {/* Gallery Item 3 - Premium hint with Moët */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden md:col-span-2 lg:col-span-1">
              <BeforeAfterSlider
                beforeImage="/images/portfolio/removebg-before.jpg"
                afterImage="/images/portfolio/removebg-after.jpg"
                beforeAlt="Premium product with complex background"
                afterAlt="Premium product with clean background"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible['social-proof'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Client Logos */}
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-8">Trusted by premium brands worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Moët & Chandon</span>
              </div>
              <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Veuve Clicquot</span>
              </div>
              <div className="h-8 w-24 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-sm font-medium">DFS</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 mb-6 italic">
                "SwiftPixel transformed our product catalog. What used to take our team days now happens overnight, 
                and the quality is consistently marketplace-ready. Our Lazada approval rate went from 60% to 98%."
              </blockquote>
              <cite className="text-gray-600 font-medium">
                Sarah Chen, E-commerce Manager at Premium Electronics SG
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`bg-white py-16 transition-all duration-1000 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Background Removal Package Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Background removal is included in all our bulk packages. Better value with volume!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Starter Package */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-300 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{PRICING_CONFIG.packages.essential.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.essential.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.essential.assets} assets included</p>
                <p className="text-sm text-green-600 font-medium">SGD {PRICING_CONFIG.packages.essential.perEdit}/edit</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Background removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">72-hour delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">2 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Platform optimization</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Choose Starter
              </button>
            </div>

            {/* Essential Package - Popular */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-300 p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{PRICING_CONFIG.packages.professional.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.professional.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.professional.assets} assets included</p>
                <p className="text-sm text-purple-600 font-bold">SGD {PRICING_CONFIG.packages.professional.perEdit}/edit</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Background removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">48-hour delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">2 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Priority support</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Choose Essential
              </button>
            </div>

            {/* Professional Package */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-300 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{PRICING_CONFIG.packages.advanced.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.advanced.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.advanced.assets} assets included</p>
                <p className="text-sm text-green-600 font-medium">SGD {PRICING_CONFIG.packages.advanced.perEdit}/edit</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Background removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">36-hour delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">3 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
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

            {/* Enterprise Package */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-purple-300 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{PRICING_CONFIG.packages.enterprise.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {PRICING_CONFIG.packages.enterprise.priceDisplay}
                </div>
                <p className="text-gray-600">{PRICING_CONFIG.packages.enterprise.assets} assets included</p>
                <p className="text-sm text-green-600 font-medium">SGD {PRICING_CONFIG.packages.enterprise.perEdit}/edit</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Background removal included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">12-hour emergency delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">3 revision rounds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Dedicated manager</span>
                </div>
              </div>

              <button
                onClick={handleGetStartedClick}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Choose Enterprise
              </button>
            </div>
          </div>

          {/* À la carte option */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Just One Edit?</h3>
              <p className="text-gray-600">Pay per edit without bulk commitments</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">
                SGD {PRICING_CONFIG.alacarte.perEdit}
                <span className="text-base font-normal text-gray-600">/edit</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{PRICING_CONFIG.alacarte.description}</p>
              <button
                onClick={handleGetStartedClick}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Order Single Edit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQ
          id="faq"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our background removal service"
          questions={backgroundRemovalFAQs}
          className="bg-gray-50"
        />
      </section>

      {/* Final CTA */}
      <section id="cta" className={`bg-purple-600 py-16 transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready in {PRICING_CONFIG.delivery.standard.time}—Start Now
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of Southeast Asian sellers who've boosted their conversion rates with professional background removal.
          </p>
          
          <button
            onClick={handleGetStartedClick}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 text-lg"
          >
            <span>Remove My Backgrounds</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{PRICING_CONFIG.delivery.standard.time} Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Secure & Confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Footer */}
      <SEOFooter pageType="background-removal" />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Images</label>
                <input
                  type="number"
                  name="images"
                  value={formData.images}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How many images need editing?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sticky CTA Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-4 px-4 z-[1500] shadow-lg transform animate-slideUp">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg">Ready in {PRICING_CONFIG.delivery.standard.time}—Start Now</h3>
              <p className="text-white/90 text-sm">Professional background removal from SGD {PRICING_CONFIG.packages.professional.perEdit}/edit</p>
            </div>
            <button
              onClick={handleGetStartedClick}
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 flex-shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        showScrollButtons={true}
      />
    </div>
  )
}

export default BackgroundRemoval