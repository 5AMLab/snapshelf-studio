import React, { useState, useEffect } from 'react'
import { Camera, Clock, DollarSign, Users, Star, ArrowRight, Calendar, CheckCircle, Zap, Heart, Award, Phone, Mail, MapPin, Menu, X, ChevronDown, Send } from 'lucide-react'
import PackageSelector from './PackageSelector'
import ContactForm from './ContactForm'
import CalendlyBooking from './CalendlyBooking'

const SnapShelfStudio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [bookingMethod, setBookingMethod] = useState(null)

  // FAQ Component
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-gray-900">{question}</span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-gray-600">
              {typeof answer === 'string' ? <p>{answer}</p> : answer}
            </div>
          </div>
        )}
      </div>
    )
  }

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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const testimonials = [
    {
      name: "David Lim",
      business: "TechGear Paradise",
      rating: 5,
      text: "I used to waste 20 hours per week on Canva. Now I send SnapShelf my photos and wake up to perfect campaigns across all platforms. They even handle posting to my Instagram!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      business: "Bloom Botanicals",
      rating: 5,
      text: "Complete game-changer. I don't touch any design tools anymore—just send them my brief and product photos. Their team posts everything to my Shopee store while I sleep.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Wong",
      business: "Urban Style SG",
      rating: 5,
      text: "Finally found my 'design department.' They handle everything from Amazon infographics to Instagram stories. I literally just send photos and approve the final campaigns.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  const pricingPlans = [
    {
      name: "Essential",
      price: "SGD 199",
      duration: "per package",
      serviceLevel: {
        icon: "🎨",
        title: "Design Only", 
        effort: "You handle posting",
        timeRequired: "2-3 hours posting"
      },
      features: [
        "5 asset transformations",
        "3 platform size variations each",
        "Basic infographic (1 design)",
        "48-hour delivery",
        "2 rounds of revisions",
        "High-res + web formats"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: "SGD 399",
      duration: "per package", 
      serviceLevel: {
        icon: "📋",
        title: "Design + Guidance",
        effort: "We guide you through posting", 
        timeRequired: "30 mins with guidance"
      },
      features: [
        "10 asset transformations",
        "5 platform size variations each",
        "3 Amazon infographics",
        "Social media template set",
        "24-hour rush delivery",
        "3 rounds of revisions",
        "All platform formats included"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise",
      price: "SGD 699",
      duration: "per package",
      serviceLevel: {
        icon: "🚀",
        title: "Complete Done-For-You",
        effort: "We handle everything",
        timeRequired: "5 mins brief only"
      },
      features: [
        "15 asset transformations",
        "Unlimited size variations",
        "5 data-driven infographics", 
        "Complete social media suite",
        "12-hour emergency delivery",
        "Unlimited revisions",
        "Brand guideline creation",
        "Priority support channel"
      ],
      popular: false,
      cta: "Go Premium"
    },
    {
      name: "Deploy Plus",
      price: "SGD 999",
      duration: "per package",
      serviceLevel: {
        icon: "⚡",
        title: "Design + Full Implementation",
        effort: "Zero effort required",
        timeRequired: "0 minutes - we do everything"
      },
      features: [
        "20 asset transformations",
        "All platform formats",
        "6-hour emergency delivery",
        "Complete platform deployment",
        "Campaign launch included", 
        "Performance monitoring",
        "Priority support channel"
      ],
      popular: false,
      isNew: true,
      cta: "Ultimate Hands-Off"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SnapShelf Studio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-purple-600 transition-colors">Services</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-purple-600 transition-colors">Reviews</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('booking')} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">Send Assets</button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-purple-600">Services</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-purple-600">Pricing</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-purple-600">Reviews</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-2 text-gray-600 hover:text-purple-600">FAQ</button>
              <button onClick={() => scrollToSection('booking')} className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg mx-4 mt-2">Send Assets</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className={`pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>48-Hour Delivery Guaranteed</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Send Us Your Assets.
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"> We Handle Everything <br></br>Else.</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Your complete e-commerce design department. No Canva skills needed, no platform juggling required. 
                We design, optimize, and even deploy your visuals while you focus on what makes you money.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Send Assets</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  See What We Create
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Design Skills Required</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Hands-Off Service</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5 min</div>
                  <div className="text-sm text-gray-500">To Brief Us</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="/images/hero/transformation-1.jpg" 
                    alt="Product Photography Example 1"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <img 
                    src="/images/hero/transformation-2.jpg" 
                    alt="Product Photography Example 2"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="/images/hero/transformation-3.jpg" 
                    alt="Product Photography Example 3"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <img 
                    src="/images/hero/transformation-4.jpg" 
                    alt="Product Photography Example 4"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                ✓ We Deploy For You
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-bounce">
                🚀 Zero Skills Required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Services Section */}
      <section id="services" className={`py-20 bg-gray-50 transition-all duration-1000 delay-200 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Complete E-commerce Design Department
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handle everything design-related so you can focus on what makes you money. No learning curves, no platform juggling, no stress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Zero Learning Curve Required</h3>
              <p className="text-gray-600">No Canva skills needed. No platform training required. Just send us your photos and brief—we handle everything else.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">We Speak Every Platform's Language</h3>
              <p className="text-gray-600">Perfect formatting for every channel—Shopee banners, Instagram stories, Amazon listings. We know all the specs by heart.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design + Deploy Service</h3>
              <p className="text-gray-600">We don't just create—we can publish for you. Share your credentials and wake up to live campaigns across all platforms.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Completely Hands-Off Service</h3>
              <p className="text-gray-600">Focus on selling while we handle all visual complexity. Your only job: send assets and approve final results.</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our "Send & Forget" Process</h3>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              The last design workflow you'll ever need to learn. We handle everything from creation to deployment.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "1", 
                  title: "Send Assets + Brief", 
                  description: "Upload your photos, share your goals, tell us your platforms. Takes 5 minutes max.",
                  badge: "⏱️ 5 minutes max",
                  color: "purple"
                },
                { 
                  step: "2", 
                  title: "We Handle Everything", 
                  description: "Design, optimize, resize, format—all platforms covered. Zero input needed from you.",
                  badge: "🎯 Professional team",
                  color: "blue"
                },
                { 
                  step: "3", 
                  title: "Wake Up to Results", 
                  description: "Download files OR we deploy directly to your platforms. Your campaigns go live automatically.",
                  badge: "🚀 Optional deployment",
                  color: "green"
                }
              ].map((item, index) => (
                <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg">
                  <div className={`w-16 h-16 bg-${item.color}-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl`}>
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className={`bg-${item.color}-50 text-${item.color}-700 rounded-lg p-3 text-sm font-medium`}>
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>
            
            {/* New Implementation Service Callout */}
            <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-bold mb-4">NEW: Complete Implementation Service</h4>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Don't want to handle posting? Share your login credentials and we'll deploy everything directly to your platforms. 
                Wake up to live campaigns with zero effort on your part.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                  ✅ Shopee Store Updates
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                  ✅ Instagram Posting
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                  ✅ Facebook Campaign Launch
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                  ✅ Amazon Listing Updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transformation Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we transform existing assets into platform-ready visuals that drive sales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Before/After Example 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="/images/portfolio/before-after-1.jpg"
                  alt="SnapShelf Studio transformation example - product optimization"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Before → After
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shopee Banner Optimization</h3>
                <p className="text-gray-600 text-sm">Transformed basic product photo into eye-catching Shopee banner with 45% higher CTR</p>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-medium">+45% CTR</span>
                  <span className="text-blue-600 font-medium">5 Platform Sizes</span>
                </div>
              </div>
            </div>

            {/* Amazon Infographic Example */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="/images/portfolio/amazon-infographic.jpg"
                  alt="SnapShelf Studio Amazon infographic design example"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Infographic
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Amazon Listing Infographic</h3>
                <p className="text-gray-600 text-sm">Data-driven infographic highlighting key product benefits and comparisons</p>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-medium">+62% Conversion</span>
                  <span className="text-purple-600 font-medium">Amazon Optimized</span>
                </div>
              </div>
            </div>

            {/* Social Media Suite */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src="/images/portfolio/social-media-suite.jpg"
                  alt="SnapShelf Studio social media template design"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Social Suite
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram Story Templates</h3>
                <p className="text-gray-600 text-sm">Complete social media template set for Instagram posts, stories, and ads</p>
                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <span className="text-green-600 font-medium">10+ Templates</span>
                  <span className="text-blue-600 font-medium">Multi-Platform</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Send Us Your Assets
            </button>
          </div>
        </div>
      </section>
       

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 transition-all duration-1000 delay-300 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your "Done-For-You" Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From design-only to complete deployment—we handle as much or as little as you want.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative ${plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''} ${plan.isNew ? 'border-2 border-yellow-400' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {plan.isNew && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-2xl z-10">
                    NEW!
                  </div>
                )}
                
                <div className="p-6">
                  {/* Service Level Section */}
                  <div className="text-center mb-6">
                    <div className="text-3xl mb-2">{plan.serviceLevel.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <div className="text-sm font-medium text-purple-600 mb-2">{plan.serviceLevel.title}</div>
                    <div className="text-xs text-gray-500 mb-4">{plan.serviceLevel.effort}</div>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.duration}</span>
                    </div>
                  </div>

                  {/* Time Investment Indicator */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
                    <div className="text-xs text-gray-500 mb-1">Your time investment:</div>
                    <div className="font-medium text-gray-700 text-sm">{plan.serviceLevel.timeRequired}</div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-sm text-gray-500 pl-7">
                        +{plan.features.length - 4} more features...
                      </li>
                    )}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    onClick={() => scrollToSection('booking')}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : plan.isNew
                          ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {plan.serviceLevel.title}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fixed: Informational Comparison Section - No Selection Required */}
          <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                How Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Service Levels</span> Work
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding what each package means for your time and involvement
              </p>
            </div>
            
            {/* Static Comparison Chart - Not Interactive */}
            <div className="relative">
              {/* Effort Scale Header */}
              <div className="flex justify-between mb-6 px-4">
                <div className="text-sm font-medium text-red-600">High Effort</div>
                <div className="text-sm font-medium text-green-600">Zero Effort</div>
              </div>
              
              {/* Progress Line */}
              <div className="relative mb-8">
                <div className="h-2 bg-gradient-to-r from-red-200 via-yellow-200 via-blue-200 to-green-200 rounded-full"></div>
                <div className="absolute top-0 left-0 right-0 flex justify-between">
                  {pricingPlans.map((plan, index) => {
                    const effortColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
                    return (
                      <div key={index} className={`w-4 h-4 ${effortColors[index]} rounded-full border-2 border-white shadow-lg transform -translate-y-1`}></div>
                    );
                  })}
                </div>
              </div>

              {/* Information Cards - Static Design */}
              <div className="grid md:grid-cols-4 gap-6">
                {pricingPlans.map((plan, index) => {
                  const effortLevels = ['High Effort', 'Medium Effort', 'Low Effort', 'Zero Effort'];
                  const borderColors = ['border-red-200', 'border-yellow-200', 'border-blue-200', 'border-green-200'];
                  const bgColors = ['bg-red-25', 'bg-yellow-25', 'bg-blue-25', 'bg-green-25'];
                  
                  return (
                    <div key={index} className={`bg-white rounded-xl p-6 border-2 ${borderColors[index]} shadow-sm`}>
                      {/* Static Icon - No Hover Effects */}
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto mb-3 text-3xl flex items-center justify-center bg-gray-50 rounded-xl">
                          {plan.serviceLevel.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">{plan.serviceLevel.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{plan.serviceLevel.effort}</p>
                      </div>
                      
                      {/* Time Investment */}
                      <div className="text-center mb-4">
                        <div className="text-xs text-gray-500 mb-1">Your time investment:</div>
                        <div className="font-semibold text-gray-800">{plan.serviceLevel.timeRequired}</div>
                      </div>
                      
                      {/* What You Do vs What We Do */}
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-medium text-gray-700 mb-1">You handle:</div>
                          <div className="text-xs text-gray-600">
                            {index === 0 && "Design, posting, optimization"}
                            {index === 1 && "Posting with our guidance"}
                            {index === 2 && "Just the initial brief"}
                            {index === 3 && "Nothing - we do everything"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-purple-700 mb-1">We handle:</div>
                          <div className="text-xs text-purple-600">
                            {index === 0 && "Design files only"}
                            {index === 1 && "Design + instructions"}
                            {index === 2 && "Design + some posting"}
                            {index === 3 && "Design + full deployment"}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price Reference - Small and Non-prominent */}
                      <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                        <div className="text-xs text-gray-400">Starts at {plan.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Clear Call-to-Action to Go Back to Selection */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 mb-4">
                Ready to choose? Scroll back up to select your perfect package.
              </p>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                ↑ Back to Package Selection
              </button>
            </div>
          </div>

          {/* Redesigned Implementation Services Section */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">
                  What <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">"We Deploy For You"</span> Means
                </h3>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Complete platform deployment—from upload to optimization to monitoring
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: '🛍️',
                    title: 'E-commerce Stores',
                    description: 'Shopee, Lazada, Amazon listing updates',
                    features: ['Product image uploads', 'A+ content creation', 'Listing optimization'],
                    color: 'from-green-400 to-emerald-600'
                  },
                  {
                    icon: '📱',
                    title: 'Social Media',
                    description: 'Instagram posts, Facebook page updates',
                    features: ['Scheduled posting', 'Story creation', 'Hashtag optimization'],
                    color: 'from-pink-400 to-rose-600'
                  },
                  {
                    icon: '🎯',
                    title: 'Ad Campaigns',
                    description: 'Facebook Ads, Google Ads setup',
                    features: ['Campaign creation', 'Audience targeting', 'Budget optimization'],
                    color: 'from-blue-400 to-indigo-600'
                  },
                  {
                    icon: '📊',
                    title: 'Performance Tracking',
                    description: 'We monitor initial performance metrics',
                    features: ['Analytics setup', 'Performance reports', 'Optimization tips'],
                    color: 'from-purple-400 to-violet-600'
                  }
                ].map((service, index) => (
                  <div key={index} className="group hover:scale-105 transition-all duration-300">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full border border-white/20 hover:border-white/40 transition-all">
                      {/* Icon with Gradient Background */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      
                      <h4 className="font-bold text-white mb-3 text-lg text-center">{service.title}</h4>
                      <p className="text-gray-300 text-sm text-center mb-4">{service.description}</p>
                      
                      {/* Feature List */}
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-300">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full flex-shrink-0`}></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-yellow-400 text-2xl">⚡</div>
                  <div>
                    <div className="text-white font-semibold">Ready for hands-off success?</div>
                    <div className="text-gray-300 text-sm">Enterprise & Deploy Plus packages include everything above</div>
                  </div>
                  <button 
                    onClick={() => scrollToSection('booking')}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Value Comparison */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Why Choose Done-For-You vs DIY?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* DIY Column */}
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-xl">😰</span>
                  </div>
                  <h4 className="text-red-800 font-bold text-lg">DIY Design Platforms</h4>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    '45+ hours learning curves',
                    'Template limitations',
                    'Inconsistent brand results', 
                    'Platform-specific resize headaches',
                    'Constant design tool subscriptions',
                    'Time away from selling'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-red-700">
                      <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Done-For-You Column */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-xl">😌</span>
                  </div>
                  <h4 className="text-green-800 font-bold text-lg">SnapShelf Done-For-You</h4>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    '5 minutes to brief us',
                    'Custom, professional designs',
                    'Perfect brand consistency',
                    'All platforms handled automatically',
                    'One flat fee, no subscriptions',
                    'Focus on what makes you money'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-green-700">
                      <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Need something custom? We've got you covered.</p>
            <button 
              onClick={() => scrollToSection('booking')}
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              Contact us for enterprise packages →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 bg-gray-50 transition-all duration-1000 delay-400 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              "Finally, No More Design Stress"
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how sellers across Southeast Asia transformed their workflow with our hands-off design service.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-20 transition-all duration-1000 delay-500 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              "Do I Really Need Zero Design Skills?"
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our hands-off design service. Spoiler: Yes, we handle absolutely everything.
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="Do I need to know anything about design platforms?"
              answer={
                <div>
                  <p className="mb-3"><strong>Absolutely not.</strong> That's the whole point of our service.</p>
                  <p className="mb-2">You'll never need to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Learn Canva, Photoshop, or any design tools</li>
                    <li>Figure out optimal image sizes for different platforms</li>
                    <li>Understand platform-specific design requirements</li>
                    <li>Stress about brand consistency across channels</li>
                  </ul>
                  <p className="mt-3 text-purple-600 font-medium">Your only job: Send us your photos and tell us your goals. We handle everything else.</p>
                </div>
              }
            />

            <FAQItem 
              question="How does the 'we deploy for you' service work?"
              answer={
                <div>
                  <p className="mb-3"><strong>Complete hands-off deployment included in Enterprise+ packages:</strong></p>
                  <p className="mb-2"><strong>What you provide:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-3">
                    <li>Login credentials for your platforms (temporary access)</li>
                    <li>Campaign dates and any posting preferences</li>
                    <li>Budget limits for ad campaigns (if applicable)</li>
                  </ul>
                  <p className="mb-2"><strong>What we handle:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-3">
                    <li>Upload images to Shopee/Lazada product listings</li>
                    <li>Post to Instagram/Facebook with optimized captions</li>
                    <li>Set up ad campaigns with your new visuals</li>
                    <li>Update Amazon listing images and A+ content</li>
                  </ul>
                  <p className="text-green-600 font-medium">✓ Secure process: We access, deploy, then immediately revoke credentials</p>
                </div>
              }
            />

            <FAQItem 
              question="Is it safe to share my platform login credentials?"
              answer={
                <div>
                  <p className="mb-3"><strong>We use enterprise-grade security protocols:</strong></p>
                  <p className="mb-2"><strong>Security measures:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-3">
                    <li>Encrypted credential storage during project only</li>
                    <li>Limited-access team members (max 2 people)</li>
                    <li>No financial/payment access required</li>
                    <li>Immediate credential deletion post-deployment</li>
                    <li>NDA protection and liability insurance</li>
                  </ul>
                  <p className="mb-2"><strong>Alternative options:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>Supervised deployment:</strong> We guide your team member via screenshare</li>
                    <li><strong>Sub-account creation:</strong> Create limited-access accounts for us</li>
                    <li><strong>Design-only:</strong> You handle posting with our detailed instructions</li>
                  </ul>
                </div>
              }
            />

            <FAQItem 
              question="What exactly counts as '1 asset transformation'?"
              answer={
                <div>
                  <p className="mb-3"><strong>1 asset transformation = 1 original image you provide → 1 completely redesigned visual + all platform size variations</strong></p>
                  <p className="mb-2"><strong>Example:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>Input:</strong> Your product photo on white background</li>
                    <li><strong>Output:</strong> Enhanced design with lifestyle elements + 5 platform sizes:</li>
                    <li className="ml-4">• Shopee banner (1200x1200px)</li>
                    <li className="ml-4">• Instagram post (1080x1080px)</li>
                    <li className="ml-4">• Instagram story (1080x1920px)</li>
                    <li className="ml-4">• Facebook ad (1200x628px)</li>
                    <li className="ml-4">• Amazon main image (2000x2000px)</li>
                  </ul>
                  <p className="mt-3 text-purple-600 font-medium">So 10 transformations = 10 unique designs delivered in 50+ total files.</p>
                </div>
              }
            />

            <FAQItem 
              question="Do you handle physical products?"
              answer="No. We're a 100% digital service. We only work with existing digital assets you provide—no product photography, shipping, or physical handling required. Simply upload your photos and we'll transform them into platform-ready visuals."
            />

            <FAQItem 
              question="How does the 48-hour delivery work?"
              answer="48 hours starts when you upload all assets and approve the project brief. We deliver all files organized by platform in a secure download link. Rush delivery available: 24-hour (Professional+) and 12-hour (Enterprise) for additional fees."
            />

            <FAQItem 
              question="What file formats will I receive?"
              answer={
                <div>
                  <p className="mb-2">For each transformation, you'll receive:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>High-res versions:</strong> PNG/JPG at 300dpi</li>
                    <li><strong>Web-optimized:</strong> JPG/PNG under 1MB each</li>
                    <li><strong>Platform-specific:</strong> Exact dimensions for each channel</li>
                    <li><strong>Organized delivery:</strong> Files sorted by transformation and platform</li>
                  </ul>
                  <p className="mt-2 text-green-600 font-medium">✓ Full commercial usage rights included</p>
                </div>
              }
            />

            <FAQItem 
              question="Can I get additional transformations?"
              answer={
                <div>
                  <p className="mb-2">Yes! Add-on rates:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Essential tier: +SGD 40 per additional transformation</li>
                    <li>Professional tier: +SGD 35 per additional transformation</li>
                    <li>Enterprise tier: +SGD 30 per additional transformation</li>
                  </ul>
                  <p className="mt-2">Each additional transformation includes all platform size variations and follows the same quality standards.</p>
                </div>
              }
            />

            <FAQItem 
              question="What if I need changes after delivery?"
              answer="Revision rounds are included in every package: Essential (2 rounds), Professional (3 rounds), Enterprise (unlimited). Minor tweaks like color adjustments or text changes are processed within 24 hours. We guarantee your satisfaction with our final deliverables."
            />
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Have more questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hello@snapshelfstudio.com"
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Email us directly →
              </a>
              <span className="hidden sm:block text-gray-300">|</span>
              <button 
                onClick={() => scrollToSection('booking')}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Book a free consultation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className={`py-20 transition-all duration-1000 delay-600 ${isVisible.booking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready for Zero Design Stress?
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Choose your level of hands-off service. From design-only to complete deployment—we handle as much as you want.
          </p>
      
          {/* Urgency Indicator */}
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            <span>⚡ Only 3 spots left this week for deployment service</span>
            </div>
          </div>

          {/* Package Selection */}
          <div className="mb-16">
            <PackageSelector 
            selectedPackage={selectedPackage}
            onPackageSelect={setSelectedPackage}
            />
          </div>

           {/* Improved Step 2 - Action-Oriented Choices */}
            {selectedPackage && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Step 2: How Would You Like to Proceed?
                  </h3>
                  <p className="text-gray-600">
                    Choose based on your readiness level
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Ready to Start Option */}
                  <div 
                    onClick={() => setBookingMethod('upload')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      bookingMethod === 'upload' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">🚀 I'm Ready to Start</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Upload my assets and start the project immediately
                      </p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Upload photos & brief</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Start within 24 hours</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Pay {selectedPackage.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Need Discussion Option */}
                  <div 
                    onClick={() => setBookingMethod('consultation')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      bookingMethod === 'consultation' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">💬 Let's Discuss First</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Book a consultation to discuss my specific needs
                      </p>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Free 15-min consultation</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Discuss project scope</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Confirm final pricing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guidance for Choice */}
                <div className="mt-8 max-w-3xl mx-auto">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3 text-center">Not sure which to choose?</h4>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="font-medium text-green-700 mb-2">✅ Choose "Ready to Start" if you:</div>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Have your product photos ready</li>
                          <li>• Know which platforms you need</li>
                          <li>• Understand the {selectedPackage.serviceLevel?.title} service</li>
                          <li>• Want to start immediately</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-blue-700 mb-2">💬 Choose "Discuss First" if you:</div>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Have specific brand requirements</li>
                          <li>• Need help choosing platforms</li>
                          <li>• Have complex project needs</li>
                          <li>• Want to see our previous work</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Assets Flow - Show if "Ready to Start" selected */}
            {selectedPackage && bookingMethod === 'upload' && (
              <div className="mb-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Perfect! Let's Get Started</h3>
                    <p className="text-gray-600">Upload your assets and we'll begin your {selectedPackage.name} package</p>
                  </div>

                  {/* Project Brief Form */}
                  <ContactForm selectedPackage={selectedPackage} />
                </div>
              </div>
            )}

            {/* Consultation Flow - Show if "Discuss First" selected */}
            {selectedPackage && bookingMethod === 'consultation' && (
              <div className="mb-16">
                <CalendlyBooking selectedPackage={selectedPackage} />
              </div>
            )}

            {/* Trust Elements */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h4>
                  <p className="text-sm text-gray-600">Not happy? We'll revise until you love it or refund 100%</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">48-Hour Guarantee</h4>
                  <p className="text-sm text-gray-600">Your visuals delivered on time, every time, or we work for free</p>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dedicated Designer</h4>
                  <p className="text-sm text-gray-600">Direct access to your assigned designer throughout the project</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Sarah just booked Professional package</span>
                  </div>
                  <div className="hidden md:block text-gray-300">•</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Marcus scheduled his consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SnapShelf Studio</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your complete e-commerce design department. No Canva skills needed, no platform juggling required. 
                100% digital service based in Singapore, serving Southeast Asia.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Behance</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors">Reviews</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => scrollToSection('booking')} className="text-gray-300 hover:text-white transition-colors">Send Assets</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">hello@snapshelfstudio.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">+65 8123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Singapore, SG</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 SnapShelf Studio. All rights reserved. | 48-hour delivery guarantee | Zero design skills required
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SnapShelfStudio