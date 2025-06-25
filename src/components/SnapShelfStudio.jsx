import React, { useState, useEffect } from 'react'
import { Camera, Clock, DollarSign, Users, Star, ArrowRight, Calendar, CheckCircle, Zap, Heart, Award, Phone, Mail, MapPin, Menu, X, ChevronDown, Send } from 'lucide-react'
import PackageSelector from './PackageSelector'
import ContactForm from './ContactForm'
import CalendlyBooking from './CalendlyBooking'

const SnapShelfStudio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [bookingMethod, setBookingMethod] = useState('form')

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
      name: "Sarah Chen",
      business: "Luxe Accessories SG",
      rating: 5,
      text: "SnapShelf transformed our old product photos into stunning platform-ready visuals! Our Shopee CTR increased 40% using their optimized sizes.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Tan",
      business: "TechGear Paradise",
      rating: 5,
      text: "Their Amazon infographics are game-changers! Conversion rate doubled after implementing their data-driven designs. Pure digital magic.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lisa Wong",
      business: "Bloom Botanicals",
      rating: 5,
      text: "Love the asset reuse approach! They made my existing photos work across 6 different platforms. Saved me thousands on new shoots.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  const pricingPlans = [
    {
      name: "Essential",
      price: "SGD 199",
      duration: "per package",
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
              <button onClick={() => scrollToSection('booking')} className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">Book Now</button>
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
              <button onClick={() => scrollToSection('booking')} className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg mx-4 mt-2">Book Now</button>
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
                Transform Your 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"> Existing Assets</span> 
                Into Sales Gold
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                We repurpose your existing visuals into fresh, platform-optimized imagery for Shopee, Lazada, Amazon, and Instagram. 
                100% digital service—no physical products needed, just human-driven creativity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Your Slot</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  View Our Work
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">48h</div>
                  <div className="text-sm text-gray-500">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-500">Client Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop" 
                    alt="Product Photography Example 1"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" 
                    alt="Product Photography Example 2"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop" 
                    alt="Product Photography Example 3"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop" 
                    alt="Product Photography Example 4"
                    className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                ✓ Just Delivered
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
              Why E-commerce Sellers Choose SnapShelf
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maximize the value of your existing assets, transforming them into platform-ready visuals that drive conversions across all channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Asset Reuse Efficiency</h3>
              <p className="text-gray-600">Transform your existing photos into fresh, engaging visuals. No waste, maximum impact from assets you already own.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform-Optimized Resizing</h3>
              <p className="text-gray-600">Perfect formatting for every channel—Shopee banners, Instagram stories, Amazon listings, and more. All sizes covered.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amazon Infographic Expertise</h3>
              <p className="text-gray-600">Data-driven infographics that make your Amazon listings stand out. Convert features into compelling visual stories.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">100% Digital Service</h3>
              <p className="text-gray-600">Fully online workflow. Simply upload your assets and receive platform-ready visuals. No shipping, no hassle.</p>
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Simple 4-Step Digital Process</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Book Your Package", description: "Choose your service and upload your existing assets" },
                { step: "2", title: "Asset Analysis", description: "We analyze your materials and create an optimization plan" },
                { step: "3", title: "Digital Transformation", description: "Our designers repurpose and resize for all platforms" },
                { step: "4", title: "Download & Deploy", description: "Receive optimized files ready for immediate use" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 transition-all duration-1000 delay-300 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing, No Surprises
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that fits your campaign needs. All packages include our 48-hour delivery guarantee and revision rounds.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative ${plan.popular ? 'ring-2 ring-purple-600 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.duration}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => scrollToSection('booking')}
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-colors ${
                      plan.popular 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
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
              Trusted by Growing E-commerce Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how SnapShelf Studio has helped sellers across Southeast Asia boost their sales with stunning visuals.
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
              Questions? We've Got Answers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our digital transformation service.
            </p>
          </div>

          <div className="space-y-4">
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
          Ready to Maximize Your Existing Assets?
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Choose your package and get your transformation quote. 100% digital service—fast, efficient, effective.
          </p>
      
          {/* Urgency Indicator */}
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Clock className="w-4 h-4" />
            <span>⚡ Only 3 spots left this week</span>
            </div>
          </div>

          {/* Package Selection */}
          <div className="mb-16">
            <PackageSelector 
            selectedPackage={selectedPackage}
            onPackageSelect={setSelectedPackage}
            />
          </div>

           {/* Booking Method Selection - Only show if package is selected */}
            {selectedPackage && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Step 2: How Would You Like to Proceed?
                  </h3>
                  <p className="text-gray-600">
                    Choose your preferred way to get started with your project
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Quick Quote Option */}
                  <div 
                    onClick={() => setBookingMethod('form')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      bookingMethod === 'form' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Get Quick Quote</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Fill out our form and receive a detailed quote within 2 hours
                      </p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div>✓ Instant submission</div>
                        <div>✓ Detailed project form</div>
                        <div>✓ 2-hour response time</div>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Option */}
                  <div 
                    onClick={() => setBookingMethod('calendar')}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      bookingMethod === 'calendar' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Book Consultation</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        30-minute video call to discuss your project and get instant quote
                      </p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div>✓ Personal discussion</div>
                        <div>✓ Screen share review</div>
                        <div>✓ Instant pricing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form - Show if form method selected */}
            {selectedPackage && bookingMethod === 'form' && (
              <div className="mb-16">
                <ContactForm selectedPackage={selectedPackage} />
              </div>
            )}

            {/* Calendly Booking - Show if calendar method selected */}
            {selectedPackage && bookingMethod === 'calendar' && (
              <div className="mb-16">
                <CalendlyBooking selectedPackage={selectedPackage} />
              </div>
            )}

            {/* What Happens Next - Only show if booking method is selected */}
            {selectedPackage && (bookingMethod === 'form' || bookingMethod === 'calendar') && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                  What Happens Next?
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      1
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {bookingMethod === 'form' ? 'Quote Review' : 'Consultation Call'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {bookingMethod === 'form' 
                        ? 'We review your requirements and send detailed quote' 
                        : 'Discuss your project and get instant pricing'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      2
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Asset Upload</h4>
                    <p className="text-sm text-gray-600">Upload your photos via secure link. Our team reviews and creates optimization plan</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      3
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Design & Transform</h4>
                    <p className="text-sm text-gray-600">Our designers create your platform-optimized visuals within 48 hours</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      4
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Download & Launch</h4>
                    <p className="text-sm text-gray-600">Receive organized files ready for immediate deployment across all platforms</p>
                  </div>
                </div>
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
                Transforming your existing assets into platform-ready visuals that convert. 
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
                <li><button onClick={() => scrollToSection('booking')} className="text-gray-300 hover:text-white transition-colors">Book Now</button></li>
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
              © 2025 SnapShelf Studio. All rights reserved. | 48-hour delivery guarantee | Revision included
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SnapShelfStudio