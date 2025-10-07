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
import Activity from 'lucide-react/dist/esm/icons/activity'
import Target from 'lucide-react/dist/esm/icons/target'
import Trophy from 'lucide-react/dist/esm/icons/trophy'
import Dumbbell from 'lucide-react/dist/esm/icons/dumbbell'
import Mountain from 'lucide-react/dist/esm/icons/mountain'

const SportsLifestyle = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Sports & Lifestyle Product Photography | SwiftPixel Studio - Professional Athletic & Outdoor Gear Photo Editing'
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

  const sportsLifestyleServices = [
    {
      title: "Athletic Apparel",
      description: "Dynamic photography for sportswear, activewear, and performance clothing",
      features: ["Action-oriented product shots", "Fabric texture enhancement", "Lifestyle context imagery", "Size and fit visualization"],
      icon: <Activity className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Fitness Equipment",
      description: "Professional visuals for gym equipment, weights, and home fitness gear",
      features: ["Technical specification highlights", "Usage demonstration shots", "Space-efficient displays", "Durability showcasing"],
      icon: <Dumbbell className="w-8 h-8 text-red-500" />
    },
    {
      title: "Outdoor Gear",
      description: "Adventure-ready photography for camping, hiking, and outdoor equipment",
      features: ["Weather-resistant product display", "Adventure context imagery", "Feature functionality focus", "Durability emphasis"],
      icon: <Mountain className="w-8 h-8 text-green-500" />
    },
    {
      title: "Sports Accessories",
      description: "Detailed photography for sports equipment, bags, bottles, and accessories",
      features: ["Multi-angle product views", "Functionality demonstrations", "Brand logo enhancement", "Performance benefit highlighting"],
      icon: <Target className="w-8 h-8 text-orange-500" />
    },
    {
      title: "Athletic Footwear",
      description: "Dynamic shoe photography showcasing performance and style features",
      features: ["Sole technology highlights", "Comfort feature emphasis", "Style versatility display", "Performance context shots"],
      icon: <Trophy className="w-8 h-8 text-purple-500" />
    }
  ]

  const portfolioExamples = [
    {
      category: "Athletic Wear",
      beforeImage: "/images/portfolio/touch-up-before.jpg",
      afterImage: "/images/portfolio/touch-up-after.jpg",
      description: "Athletic apparel with enhanced fabric details and dynamic presentation"
    },
    {
      category: "Fitness Equipment",
      beforeImage: "/images/portfolio/removebg-before.jpg",
      afterImage: "/images/portfolio/removebg-after.jpg",
      description: "Fitness equipment with clean background and technical highlighting"
    },
    {
      category: "Outdoor Gear",
      beforeImage: "/images/portfolio/touch-up-v2-before.jpg",
      afterImage: "/images/portfolio/touch-up-v2-after.jpg",
      description: "Outdoor equipment with adventure-ready presentation"
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
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sports & Lifestyle
              <span className="block text-blue-600">Product Photography</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional photo editing services designed for sports and lifestyle brands. 
              Showcase your athletic apparel, fitness equipment, and outdoor gear with dynamic visuals that inspire action.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/book" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/pricing" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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
              Specialized Sports & Lifestyle Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From high-performance gear to everyday activewear, we understand what makes sports and lifestyle products compelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportsLifestyleServices.map((service, index) => (
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
      <section id="portfolio" className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sports & Lifestyle Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our specialized editing transforms sports and lifestyle products into motivation-driven visuals.
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

      {/* Why Choose Us for Sports & Lifestyle */}
      <section id="why-choose" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Sports & Lifestyle Brands Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Athletic Expertise</h3>
              <p className="text-gray-600 text-sm">Deep understanding of sports marketing and athletic performance needs</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dynamic Editing</h3>
              <p className="text-gray-600 text-sm">Action-focused editing that captures movement and energy</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Performance Focus</h3>
              <p className="text-gray-600 text-sm">Highlighting technical features and performance benefits</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted by Athletes</h3>
              <p className="text-gray-600 text-sm">300+ sports brands trust our specialized editing services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports-Specific Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sports Photography Specializations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the unique requirements of sports and lifestyle product photography.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <Activity className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Action Photography</h3>
              <p className="text-gray-600 text-sm">Dynamic shots that capture products in motion and real-world usage scenarios.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <Target className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Technical Features</h3>
              <p className="text-gray-600 text-sm">Detailed highlighting of performance specs, materials, and innovative technologies.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <Mountain className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Environment Context</h3>
              <p className="text-gray-600 text-sm">Products showcased in their natural athletic and outdoor environments.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <Trophy className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Benefits</h3>
              <p className="text-gray-600 text-sm">Visual emphasis on how products enhance athletic performance and comfort.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <Dumbbell className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Durability Focus</h3>
              <p className="text-gray-600 text-sm">Showcasing product strength, weather resistance, and long-lasting quality.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <Users className="w-10 h-10 text-indigo-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-3">Lifestyle Integration</h3>
              <p className="text-gray-600 text-sm">Products integrated seamlessly into active lifestyle and fitness routines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Energize Your Sports & Lifestyle Brand?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of sports and lifestyle brands who trust SwiftPixel Studio for dynamic product photography.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/book" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Athletic Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              to="/pricing" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* SEO Footer */}
      <SEOFooter pageType="sports-lifestyle" />
    </div>
  )
}

export default SportsLifestyle