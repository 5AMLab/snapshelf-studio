import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import SEOFooter from '../shared/SEOFooter'
import Camera from 'lucide-react/dist/esm/icons/camera'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Zap from 'lucide-react/dist/esm/icons/zap'
import Award from 'lucide-react/dist/esm/icons/award'
import Users from 'lucide-react/dist/esm/icons/users'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Star from 'lucide-react/dist/esm/icons/star'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import MousePointer from 'lucide-react/dist/esm/icons/mouse-pointer'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles'
import Heart from 'lucide-react/dist/esm/icons/heart'

const HealthBeauty = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Health & Beauty Content Creation | SwiftPixel Studio - Professional Beauty Photo Editing'
    window.scrollTo(0, 0)
    // Cleanup on unmount
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

  const healthBeautyServices = [
    {
      title: "Skincare Products",
      description: "Professional photography for moisturizers, serums, cleansers, and skincare essentials",
      features: ["Product texture enhancement", "Clean background removal", "Ingredient highlighting", "Before/after comparisons"],
      icon: <Sparkles className="w-8 h-8 text-pink-500" />
    },
    {
      title: "Makeup & Cosmetics",
      description: "Stunning visuals for lipsticks, foundations, eyeshadows, and beauty collections",
      features: ["Color accuracy enhancement", "Texture and finish optimization", "Swatch photography", "Lifestyle beauty shots"],
      icon: <Heart className="w-8 h-8 text-rose-500" />
    },
    {
      title: "Hair Care",
      description: "Professional editing for shampoos, conditioners, styling products, and hair tools",
      features: ["Product bottle enhancement", "Hair transformation visuals", "Ingredient spotlighting", "Usage demonstration photos"],
      icon: <Sparkles className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Wellness & Supplements",
      description: "Trust-building imagery for vitamins, protein powders, and health products",
      features: ["Clean, medical-grade editing", "Nutritional benefit highlighting", "Before/after testimonials", "Ingredient transparency"],
      icon: <CheckCircle className="w-8 h-8 text-green-500" />
    },
    {
      title: "Personal Care",
      description: "Professional visuals for toothbrushes, razors, body care, and daily essentials",
      features: ["Product functionality display", "Hygiene-focused editing", "Usage scenario photography", "Brand consistency maintenance"],
      icon: <Users className="w-8 h-8 text-blue-500" />
    }
  ]

  const portfolioExamples = [
    {
      category: "Skincare",
      beforeImage: "/images/portfolio/touch-up-before.jpg",
      afterImage: "/images/portfolio/touch-up-after.jpg",
      description: "Skincare product with enhanced texture and clean background"
    },
    {
      category: "Beauty",
      beforeImage: "/images/portfolio/removebg-before.jpg",
      afterImage: "/images/portfolio/removebg-after.jpg",
      description: "Makeup products with professional background removal"
    },
    {
      category: "Wellness",
      beforeImage: "/images/portfolio/touch-up-v2-before.jpg",
      afterImage: "/images/portfolio/touch-up-v2-after.jpg",
      description: "Health supplements with clean, trustworthy presentation"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-pink-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Health & Beauty
              <span className="block text-pink-600">Content Creation</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional photo editing services tailored specifically for health and beauty brands. 
              Enhance your skincare, makeup, wellness, and personal care products with stunning visuals that drive sales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/book" 
                className="bg-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/pricing" 
                className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Specialized Health & Beauty Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each category requires unique expertise. Our team understands the specific needs of health and beauty brands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthBeautyServices.map((service, index) => (
              <div 
                key={index}
                id={`service-${index}`}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                  isVisible[`service-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="flex items-center mb-6">
                  {service.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Examples */}
      <section id="portfolio" className="py-16 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Health & Beauty Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our specialized editing transforms health and beauty products into sales-driving visuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioExamples.map((example, index) => (
              <div 
                key={index}
                id={`portfolio-${index}`}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                  isVisible[`portfolio-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <div className="relative">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img 
                        src={example.beforeImage} 
                        alt={`${example.category} Before`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={example.afterImage} 
                        alt={`${example.category} After`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        After
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{example.category}</h3>
                  <p className="text-gray-600 text-sm">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Health & Beauty */}
      <section id="why-choose" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Health & Beauty Brands Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Industry Expertise</h3>
              <p className="text-gray-600 text-sm">Deep understanding of health & beauty marketing requirements</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">48-hour delivery for beauty campaigns and product launches</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-sm">Unlimited revisions until your beauty products look perfect</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted by Brands</h3>
              <p className="text-gray-600 text-sm">500+ health & beauty brands trust our editing services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health & Beauty Products?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join hundreds of health and beauty brands who trust SwiftPixel Studio for their product photography needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/book" 
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Beauty Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              to="/pricing" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* SEO Footer */}
      <SEOFooter pageType="health-beauty" />
    </div>
  )
}

export default HealthBeauty