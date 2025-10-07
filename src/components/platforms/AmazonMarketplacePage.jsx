import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../shared/Header'
import SEOFooter from '../shared/SEOFooter'
import Footer from '../shared/Footer'
import FAQ from '../shared/FAQ'
import BeforeAfterSlider from '../BeforeAfterSlider'
import { useModal } from '../../context/ModalContext'

// Heroicons imports
import {
  ShoppingBagIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon as Award,
  ChartBarIcon,
  EyeIcon,
  CurrencyDollarIcon as DollarSign,
  SparklesIcon,
  StarIcon,
  ShieldCheckIcon,
  BoltIcon as Zap,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'

const AmazonMarketplacePage = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})
  const [activeTab, setActiveTab] = useState('main-image')

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Amazon Marketplace Visual Optimization | SwiftPixel Studio - Win the Buy Box with Better Images'
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

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  const handleQuoteClick = () => {
    openModal('pricing', { packageType: 'amazon-listing' })
  }

  // Pain to Profit stats with animation
  const stats = [
    { label: 'Average CTR Increase', value: '+22%', icon: EyeIcon },
    { label: 'Session-to-Unit CR Boost', value: '+18%', icon: ChartBarIcon },
    { label: 'Returns Reduction', value: '-15%', icon: ArrowTrendingUpIcon }
  ]

  // Deliverables tabs data
  const deliverables = {
    'main-image': {
      title: 'Main Image',
      description: 'Compliant hero shots that pass Amazon\'s strict guidelines',
      features: ['White background (RGB 255,255,255)', '1000+ pixels minimum', '85% product fill', 'No watermarks or text'],
      image: '/images/portfolio/removebg-01-after.jpg'
    },
    'infographics': {
      title: 'Infographics',
      description: 'Data-rich secondary images that educate and convert',
      features: ['Feature highlights', 'Benefit comparisons', 'Size guides', 'Usage instructions'],
      image: '/images/portfolio/infographic-02-after.jpg'
    },
    'lifestyle': {
      title: 'Lifestyle Renders',
      description: 'Context shots showing real-world product usage',
      features: ['In-use scenarios', 'Scale references', 'Environment shots', 'Emotional connection'],
      image: '/images/portfolio/touch-up-v2-after.jpg'
    },
    'a-content': {
      title: 'A+ Content',
      description: 'Enhanced brand content for premium listings',
      features: ['Brand storytelling', 'Product modules', 'Comparison charts', 'Rich media layouts'],
      image: '/images/portfolio/edit-sales-ad-after.jpg'
    }
  }

  // 5-step process
  const processSteps = [
    { title: 'Audit', description: 'Review current listing performance and compliance', icon: '🔍' },
    { title: 'Strategy', description: 'Create conversion-focused visual strategy', icon: '📋' },
    { title: 'Shoot/Design', description: 'Professional photography and graphic design', icon: '📸' },
    { title: 'QC', description: 'Amazon compliance check and quality assurance', icon: '✅' },
    { title: 'Deliver', description: 'Upload-ready files in 72 hours', icon: '🚀' }
  ]

  // FAQ data
  const amazonFAQ = [
    {
      id: 1,
      question: 'What happens if Amazon rejects my images?',
      answer: 'We guarantee Amazon compliance. If any image gets rejected due to guideline violations, we\'ll redesign it for free until it\'s approved.'
    },
    {
      id: 2,
      question: 'Do you handle photography or just design work?',
      answer: 'Both! We can work with your existing product photos or arrange professional product photography. Our team handles the complete visual pipeline.'
    },
    {
      id: 3,
      question: 'Can you create 3D renders if I don\'t have product photos?',
      answer: 'Yes, we can create photorealistic 3D renders from product specifications, technical drawings, or reference images. Perfect for pre-launch listings.'
    },
    {
      id: 4,
      question: 'What\'s your turnaround time?',
      answer: 'Standard turnaround is 72 hours from brief approval. Rush delivery (24-48 hours) available for urgent launches at +50% fee.'
    },
    {
      id: 5,
      question: 'Do you optimize for mobile viewing?',
      answer: 'Absolutely. All images are tested for mobile clarity since 70%+ of Amazon shoppers browse on mobile devices.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          currentPage="amazon-marketplace"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>

      {/* Hero Section */}
      <section id="hero" className={`bg-gradient-to-br from-orange-50 to-yellow-50 pt-16 pb-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Amazon badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-5 py-3 rounded-full text-sm font-medium mb-8">
              <ShoppingBagIcon className="w-4 h-4" />
              <span>Amazon Transparency Certified</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Win the Buy Box with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500"> Better Images</span>
            </h1>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Comply, captivate, and convert—SwiftPixel makes Amazon listings retail-ready in 72 hours.
            </p>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleQuoteClick}
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get My Listing Pack</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mock carousel before/after */}
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/removebg-01-before.jpg"
              afterImage="/images/portfolio/removebg-01-after.jpg"
              beforeAlt="Basic product photo before Amazon optimization"
              afterAlt="Professional Amazon-compliant product image"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Pain to Profit Stats Bar */}
      <section id="stats" className={`bg-white py-8 border-b border-gray-200 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-orange-600">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Tabs */}
      <section id="deliverables" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.deliverables ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What You Get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete Amazon listing optimization package
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 max-w-2xl mx-auto">
            {Object.entries(deliverables).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === key
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {deliverables[activeTab].title}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {deliverables[activeTab].description}
              </p>
              <ul className="space-y-3">
                {deliverables[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-first lg:order-last">
              <img
                src={deliverables[activeTab].image}
                alt={`${deliverables[activeTab].title} example`}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amazon Rules Cheat Sheet */}
      <section id="rules" className={`bg-white py-16 transition-all duration-1000 ${isVisible.rules ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Amazon Compliance Checklist
            </h2>
            <p className="text-xl text-gray-600">
              We ensure every image meets Amazon's strict requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { rule: 'White Background', description: 'Pure white (RGB 255,255,255)', icon: '⚪' },
              { rule: '1000px Minimum', description: 'High resolution for zoom', icon: '📏' },
              { rule: '85% Product Fill', description: 'Optimal product-to-frame ratio', icon: '📐' },
              { rule: 'No Watermarks', description: 'Clean, unbranded images', icon: '🚫' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.rule}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section id="process" className={`bg-gradient-to-br from-orange-500 to-yellow-500 py-16 transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our 5-Step Process
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              From audit to delivery in 72 hours
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/90 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Slider */}
      <section id="results" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See the Transformation
            </h2>
            <p className="text-xl text-gray-600">
              From basic product photos to conversion-optimized Amazon listings
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/infographic-02-before.jpg"
              afterImage="/images/portfolio/infographic-02-after.jpg"
              beforeAlt="Basic product photo before optimization"
              afterAlt="Professional Amazon listing with infographics"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Case Study Snapshot */}
      <section id="case-study" className={`bg-white py-16 transition-all duration-1000 ${isVisible['case-study'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Award className="w-4 h-4" />
                  <span>Success Story</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  PetPaws Leash Success
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Complete listing optimization including main image redesign, 5 infographic panels, and A+ content resulted in significant performance improvements.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">+27%</div>
                    <div className="text-sm text-gray-600">Sales Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">30 Days</div>
                    <div className="text-sm text-gray-600">Time to Results</div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/images/portfolio/touch-up-v2-after.jpg"
                  alt="PetPaws leash case study"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Pricing Card */}
      <section id="pricing" className={`bg-gradient-to-br from-orange-500 to-yellow-500 py-16 transition-all duration-1000 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <SparklesIcon className="w-4 h-4" />
                <span>Complete Package</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Amazon Listing Pack
              </h2>
              <div className="text-4xl font-bold text-orange-600 mb-4">
                SGD $590 <span className="text-lg text-gray-600 font-normal">/ SKU</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    '1 compliant main image',
                    '5 secondary infographics',
                    '2 lifestyle composites',
                    'Bonus A+ header design'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Guarantees:</h3>
                <ul className="space-y-3">
                  {[
                    '72-hour delivery',
                    'Amazon compliance certified',
                    '3 rounds of revisions',
                    '100% satisfaction guarantee'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={handleQuoteClick}
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Get My Listing Pack</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section id="trust" className={`bg-gray-50 py-16 transition-all duration-1000 ${isVisible.trust ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Amazon Sellers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Amazon Badge */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Amazon Certified</h3>
              <p className="text-gray-600">Official Amazon Transparency program partner</p>
            </div>

            {/* Client Logos placeholder */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">500+ Brands</h3>
              <p className="text-gray-600">Trusted by leading e-commerce businesses</p>
            </div>

            {/* Testimonial */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">98% Success Rate</h3>
              <p className="text-gray-600">Images pass Amazon review on first submission</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our Amazon listing optimization"
        questions={amazonFAQ}
        className="bg-white"
      />

      {/* Sticky CTA */}
      <section id="final-cta" className={`bg-gradient-to-r from-orange-600 to-yellow-500 py-16 transition-all duration-1000 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Win the Buy Box?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get Amazon-compliant listing images that convert browsers into buyers. 72-hour delivery guaranteed.
          </p>
          
          <button 
            onClick={handleQuoteClick}
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mx-auto text-lg"
          >
            <span>Get My Listing Pack</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>

          <div className="mt-8 flex items-center justify-center space-x-8 text-white/90">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5" />
              <span>72h Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5" />
              <span>Amazon Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>100% Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        showScrollButtons={true}
      />

      {/* SEO Footer */}
      <SEOFooter pageType="amazon-marketplace" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "SwiftPixel Amazon Marketplace Visual Optimization",
          "description": "Professional Amazon listing optimization service. Win the Buy Box with compliant, conversion-optimized product images.",
          "provider": {
            "@type": "Organization",
            "name": "SwiftPixel Studio"
          },
          "serviceType": "Amazon Listing Optimization",
          "areaServed": "Singapore",
          "offers": {
            "@type": "Offer",
            "name": "Amazon Listing Pack",
            "price": "590",
            "priceCurrency": "SGD",
            "description": "Complete Amazon listing optimization including main image, infographics, lifestyle renders, and A+ content"
          }
        })}
      </script>
    </div>
  )
}

export default AmazonMarketplacePage