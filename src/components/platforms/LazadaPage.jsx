import React, { useEffect, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import FAQ from '../shared/FAQ'
import SEOFooter from '../shared/SEOFooter'
import BeforeAfterSlider from '../BeforeAfterSlider'
import MockLazadaListing from '../MockLazadaListing'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import Star from 'lucide-react/dist/esm/icons/star'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import Zap from 'lucide-react/dist/esm/icons/zap'
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Award from 'lucide-react/dist/esm/icons/award'
import Target from 'lucide-react/dist/esm/icons/target'
import Users from 'lucide-react/dist/esm/icons/users'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Image from 'lucide-react/dist/esm/icons/image'

// Lazy load AI chat widget
const AIChatWidget = lazy(() => import('../AIChatWidget'))

const LazadaPage = () => {
  const navigate = useNavigate()

  // Handle get started click
  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Lazada Product Photography | Professional Images for Lazada Sellers - SnapShelf Studio'
    window.scrollTo(0, 0)
  }, [])

  // Lazada success metrics
  const successMetrics = [
    { value: '340%', label: 'Average CTR Increase' },
    { value: '85%', label: 'More Product Views' },
    { value: '2.3x', label: 'Conversion Rate Boost' },
    { value: '48hrs', label: 'Delivery Guarantee' }
  ]

  // Lazada-specific FAQ
  const lazadaFAQ = [
    {
      id: 'lazada-requirements',
      question: "What are Lazada's image requirements?",
      answer: (
        <div>
          <p className="mb-3"><strong>Lazada has specific technical requirements for product images:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><strong>Main Image:</strong> 800x800px minimum, white background required</li>
            <li><strong>Additional Images:</strong> Up to 8 images per product</li>
            <li><strong>File Format:</strong> JPG or PNG (JPG recommended for faster loading)</li>
            <li><strong>File Size:</strong> Maximum 2MB per image</li>
            <li><strong>Quality:</strong> High resolution, no watermarks or borders</li>
          </ul>
          <p className="mt-3 text-violet-600 font-medium">✓ We ensure 100% compliance with all Lazada image policies</p>
        </div>
      )
    },
    {
      id: 'mega-campaigns',
      question: "Do you create images for Lazada mega campaigns like 11.11?",
      answer: (
        <div>
          <p className="mb-3"><strong>Yes! We specialize in mega campaign graphics for all major Lazada sales events:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><strong>11.11 Single's Day:</strong> Custom sale badges, countdown timers, special offer graphics</li>
            <li><strong>12.12 Year-End Sale:</strong> Holiday-themed designs and promotional overlays</li>
            <li><strong>3.3 Super Brand Day:</strong> Brand-focused campaign materials</li>
            <li><strong>9.9 Super Shopping Day:</strong> Flash sale optimized images</li>
            <li><strong>LazMall campaigns:</strong> Premium brand event graphics</li>
          </ul>
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-orange-800 text-sm">
              <strong>📅 Campaign Rush Service:</strong> 24-hour delivery available during mega campaign periods. Book early to secure your slot!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'lazmall-requirements',
      question: "Can you create images that meet LazMall standards?",
      answer: (
        <div>
          <p className="mb-3"><strong>Absolutely! We understand LazMall's premium requirements:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><strong>Higher Quality Standards:</strong> Premium image editing for brand credibility</li>
            <li><strong>Brand Consistency:</strong> Professional styling that matches your brand identity</li>
            <li><strong>Enhanced Details:</strong> Close-up shots, texture highlights, feature callouts</li>
            <li><strong>Lifestyle Context:</strong> Product-in-use scenarios for premium appeal</li>
          </ul>
          <p className="mt-3 text-violet-600 font-medium">Many of our clients successfully upgraded to LazMall status after using our images</p>
        </div>
      )
    },
    {
      id: 'lazada-categories',
      question: "Do you work with all Lazada product categories?",
      answer: (
        <div>
          <p className="mb-3"><strong>Yes! We have experience with all major Lazada categories:</strong></p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Popular Categories:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                <li>Electronics & Gadgets</li>
                <li>Fashion & Accessories</li>
                <li>Health & Beauty</li>
                <li>Home & Living</li>
                <li>Sports & Outdoors</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Specialized Services:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                <li>Food & Beverage packaging</li>
                <li>Baby & Kids safety compliance</li>
                <li>Automotive parts showcase</li>
                <li>Books & Media covers</li>
                <li>Groceries & Fresh products</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-violet-600 font-medium">Each category has specific visual requirements - we know them all!</p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Elements Container */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        {/* Navigation */}
        <Header 
          showScrollButtons={false}
          currentPage="lazada"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>
      
      {/* Hero Section - Brand themed */}
      <section className="bg-gradient-to-br from-violet-50 to-white pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Lazada Badge */}
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <ShoppingBag className="w-4 h-4" />
                <span>Lazada Optimized • 100% Policy Compliant</span>
              </div>
              
              <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-violet-900 mb-6">
                Lazada product photos
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-300"> that convert 
                </span> 
              </h1>
              
              <p className="text-2xl text-violet-950 mb-8 leading-9">
                Boost your Lazada sales with professional product images. From daily listings to 11.11 mega campaigns, 
                we create images that drive clicks, conversions, and revenue.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button
                  onClick={handleGetStartedClick}
                  className="inline-flex items-center px-6 py-3.5 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-colors text-lg"
                >
                  <span>Get started</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <Link
                  to="/support"
                  className="inline-flex items-center px-6 py-3.5 border-2 border-violet-600 text-violet-600 font-semibold rounded-full hover:bg-violet-50 transition-colors text-lg"
                >
                  <span>View Examples</span>
                </Link>
              </div>

              {/* Success Metrics */}
              <div className="grid grid-cols-2 gap-6">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-violet-600 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div>
              
              
              <MockLazadaListing
                beforeImage="/images/portfolio/touch-up-before.jpg"
                afterImage="/images/portfolio/touch-up-after.jpg"
                product={{
                  title: "Wireless Bluetooth Headphones - Premium Sound Quality with Noise Cancellation",
                  price: "29.99",
                  rating: 4.2,
                  seller: "TechGear Paradise"
                }}
                beforeMetrics={{
                  views: 127,
                  ctr: 0.8,
                  sales: 2,
                  revenue: 60,
                  ranking: 847
                }}
                afterMetrics={{
                  views: 559,
                  ctr: 2.7,
                  sales: 47,
                  revenue: 1410,
                  ranking: 12
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lazada Requirements Section */}
      <section className="py-16 bg-violet-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              100% Lazada Compliant Images
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We ensure every image meets Lazada's technical requirements and quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 ">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <Image className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Compliance</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />800x800px minimum resolution</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />White background main images</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Optimized file sizes (&lt;2MB)</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />JPG/PNG formats</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">LazMall Ready</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Premium quality standards</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Brand consistency</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Professional styling</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Enhanced details</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversion Focused</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Eye-catching thumbnails</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Multiple angle shots</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Feature highlights</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Lifestyle contexts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mega Campaigns Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Mega Campaign Specialist
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't miss out on Lazada's biggest sales events. We create campaign-ready graphics that grab attention and drive sales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* 11.11 Campaign */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-red-600 mb-2">11.11</div>
                <h3 className="font-semibold text-gray-900">Single's Day</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Custom sale badges</li>
                <li>• Countdown graphics</li>
                <li>• Flash sale overlays</li>
                <li>• Discount highlights</li>
              </ul>
            </div>

            {/* 12.12 Campaign */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-600 mb-2">12.12</div>
                <h3 className="font-semibold text-gray-900">Year-End Sale</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Holiday themes</li>
                <li>• Year-end promotions</li>
                <li>• Gift-ready styling</li>
                <li>• Festive overlays</li>
              </ul>
            </div>

            {/* 9.9 Campaign */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-purple-600 mb-2">9.9</div>
                <h3 className="font-semibold text-gray-900">Super Shopping Day</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Flash sale ready</li>
                <li>• Quick conversion</li>
                <li>• Bold call-to-actions</li>
                <li>• Urgency indicators</li>
              </ul>
            </div>

            {/* 3.3 Campaign */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">3.3</div>
                <h3 className="font-semibold text-gray-900">Super Brand Day</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Brand-focused design</li>
                <li>• Premium styling</li>
                <li>• Logo integration</li>
                <li>• Brand storytelling</li>
              </ul>
            </div>
          </div>

          {/* Campaign Rush Service */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 mr-2" />
              <h3 className="text-2xl font-bold">Campaign Rush Service</h3>
            </div>
            <p className="text-lg mb-6 opacity-90">
              24-hour delivery during mega campaigns • Limited slots available • Book early to secure your spot
            </p>
            <button
              onClick={handleGetStartedClick}
              className="bg-white text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Reserve Your Campaign Slot
            </button>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              From Upload to Lazada Ready in 48 Hours
            </h2>
            <p className="text-xl text-gray-600">
              Simple process, professional results, guaranteed compliance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Photos</h3>
              <p className="text-gray-600">Send us your raw product photos and specify your Lazada category and target campaigns</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Editing</h3>
              <p className="text-gray-600">Our Lazada specialists optimize your images for compliance, conversion, and campaigns</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">Every image is checked against Lazada's latest requirements and quality standards</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-violet-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lazada Ready Delivery</h3>
              <p className="text-gray-600">Receive your optimized images in all required sizes, ready to upload and convert</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Lazada Seller FAQs"
        subtitle="Everything you need to know about optimizing for Lazada"
        questions={lazadaFAQ}
        className="py-16 bg-gray-50"
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-t from-violet-200 to-violet-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Dominate Lazada?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful Lazada sellers who trust us with their product images. 
            From daily listings to mega campaigns, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStartedClick}
              className="bg-white text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Start Your Lazada Success Story
            </button>
            <Link
              to="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-violet-600 transition-colors text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      {/* <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense> */}

      <Footer />

      {/* SEO Footer */}
      <SEOFooter pageType="lazada" />
    </div>
  )
}

export default LazadaPage