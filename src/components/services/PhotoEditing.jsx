import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import FAQ from '../shared/FAQ'
import BeforeAfterSlider from '../BeforeAfterSlider'
import SEOFooter from '../shared/SEOFooter'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  TrophyIcon,
  CubeIcon,
  ScissorsIcon,
  SwatchIcon,
  ComputerDesktopIcon,
  DocumentIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  CursorArrowRippleIcon,
  GlobeAltIcon,
  CloudArrowUpIcon,
  PaintBrushIcon,
  CheckBadgeIcon,
  FolderArrowDownIcon,
  ChevronRightIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

const ECommerceFullSuite = () => {
  const navigate = useNavigate()
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    document.title = 'E-Commerce Full Suite | SwiftPixel - All-In-One Photo Editing Service'
    window.scrollTo(0, 0)
    
    const handleScroll = () => {
      setShowSticky(window.scrollY > window.innerHeight * 0.25)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  const problemSolutionStats = [
    { 
      label: 'Image Rejections', 
      value: '90%', 
      trend: 'down',
      icon: ArrowTrendingDownIcon,
      color: 'text-green-600'
    },
    { 
      label: 'Time Saved per 100 Images', 
      value: '12h', 
      trend: 'up',
      icon: ClockIcon,
      color: 'text-blue-600'
    },
    { 
      label: 'Click-Through Rate Increase', 
      value: '21%', 
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-600'
    }
  ]

  const suiteIncludes = [
    {
      title: 'Remove Background',
      icon: ScissorsIcon,
      description: 'Professional background removal with precise edge detection'
    },
    {
      title: 'Change BG Colour',
      icon: SwatchIcon,
      description: 'Custom background colors that match your brand'
    },
    {
      title: 'Smart Crop & Resize',
      icon: ComputerDesktopIcon,
      description: 'Optimized for all platforms (Shopee, Lazada, Amazon, etc.)'
    },
    {
      title: '1 Product Infographic',
      icon: DocumentIcon,
      description: 'Professional infographic highlighting key features'
    },
    {
      title: '1 Simple Sales Ad',
      icon: CursorArrowRippleIcon,
      description: 'Logo + compelling copy + clear CTA button'
    },
    {
      title: 'WebP/AVIF Compression',
      icon: BoltIcon,
      description: 'Optimized file formats for faster loading'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Upload',
      description: 'Send us your raw product photos and specify requirements',
      icon: CloudArrowUpIcon,
      timeframe: '5 min',
      detail: 'Drag & drop interface with instant preview'
    },
    {
      step: 2,
      title: 'Edit & Design',
      description: 'Our team handles all editing and creates your infographic + ad',
      icon: PaintBrushIcon,
      timeframe: '24-36h',
      detail: 'Professional editing + custom graphics creation'
    },
    {
      step: 3,
      title: 'Quality Check',
      description: 'Every asset is reviewed for compliance and consistency',
      icon: CheckBadgeIcon,
      timeframe: '2-4h',
      detail: 'Platform compliance + brand consistency review'
    },
    {
      step: 4,
      title: 'Download ZIP',
      description: 'Receive all assets organized and ready for upload',
      icon: FolderArrowDownIcon,
      timeframe: 'Instant',
      detail: 'Organized by platform + usage guidelines included'
    }
  ]

  const addOns = [
    {
      name: '24-Hour Rush',
      price: '+50%',
      description: 'Priority processing for urgent campaigns'
    },
    {
      name: 'Multi-Language Text',
      price: '+$30',
      description: 'Localized text for international markets'
    }
  ]

  const fullSuiteFAQ = [
    {
      id: 1,
      question: "What's the typical turnaround time for the Full Suite?",
      answer: "Standard delivery is 48 hours from order confirmation. Rush service (24 hours) is available for +50% fee for urgent campaign launches."
    },
    {
      id: 2,
      question: "How many revisions are included?",
      answer: "2 rounds of revisions are included for all suite components. Additional revisions are $25 each to maintain quality standards."
    },
    {
      id: 3,
      question: "What background colors can you create?",
      answer: "We can create any solid color background you need - white, transparent, brand colors, or custom hex codes. Gradient backgrounds available on request."
    },
    {
      id: 4,
      question: "Do I own the copyright to the finished images?",
      answer: "Yes, you receive full commercial usage rights for all edited images, infographics, and sales ads. Perfect for unlimited platform use and marketing campaigns."
    },
    {
      id: 5,
      question: "Can you work with low-quality source images?",
      answer: "We can enhance most images, but results depend on source quality. We'll let you know upfront if your images need higher resolution for best results."
    }
  ]

  return (
    <>
      <Helmet>
        <title>E-Commerce Full Suite | SwiftPixel - All-In-One Photo Editing Service</title>
        <meta name="description" content="From raw shot to ready-to-sell—SwiftPixel handles every pixel so you can handle the profits. Background removal + infographic design + sales ads in 48h." />
        <meta name="keywords" content="product photo editing service, remove background infographic design, e-commerce photo editing, product photography editing" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "E-Commerce Full Suite",
            "description": "Complete photo editing service with background removal, infographics, and sales ads",
            "provider": {
              "@type": "Organization",
              "name": "SwiftPixel"
            }
          })}
        </script>
      </Helmet>

      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          currentPage="photo-editing"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      <div className="h-[80px]"></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-violet-100 to-slate-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-violet-950 mb-6">
                Your All In One <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300">Photo-Editing Suite</span>
              </h1>
              <p className="text-xl text-gray-600 text-pretty mb-20 ">
                 In just 48 hours, you’ll receive background-free images, color-matched hero shots, conversion driven infographics, and ad creatives, ready to upload straight to Lazada, Shopee, and Amazon.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button 
                  onClick={handleGetStartedClick}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3.5 rounded-full font-semibold text-lg transition-all duration-200 flex items-center gap-2"
                >
                  Order Full Suite
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
                <button className="border-2 border-violet-600 text-violet-600 hover:bg-violet-100 px-6 py-2.5 rounded-full font-semibold text-lg transition-all duration-200">
                  View Examples
                </button>
              </div>

              {/* Quick Benefits */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-md text-violet-950">
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-5 h-5" />
                  <span>48h Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>All Platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CubeIcon className="w-5 h-5" />
                  <span>Complete Package</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">Raw Product Photo</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✗</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <ArrowRightIcon className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <span className="text-lg font-semibold text-purple-600">SwiftPixel Magic</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="h-20 bg-gradient-to-r from-lime-400 to-green-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">Clean BG</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">Sales Ad</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              What's Included in Every Suite
            </h2>
            <p className="text-xl text-gray-600 text-pretty max-w-xl mx-auto">
              Complete photo editing package designed  <br></br>for e-commerce success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suiteIncludes.map((item, index) => (
              <div key={index} className="group bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:border-purple-200">
                <item.icon className="w-8 h-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Before/After Carousel */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Raw → Polished Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the complete transformation: background change + infographic frame + sales ad mock
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/infographic-02-before.jpg"
              afterImage="/images/portfolio/infographic-02-after.jpg"
              beforeAlt="Raw product photo before Full Suite editing"
              afterAlt="Complete Full Suite transformation with clean background and graphics"
              className="border-2 border-violet-500 rounded-2xl"
              loading="eager"
            />
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Package
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete photo editing suite with transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter Package */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-colors duration-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">$99</div>
                <p className="text-gray-600 text-sm">5 products included</p>
              </div>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Get Started
              </button>
            </div>

            {/* Essential Package - Popular */}
            <div className="bg-white border-2 border-purple-300 rounded-2xl p-6 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Essential</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">$399</div>
                <p className="text-gray-600 text-sm">25 products included</p>
              </div>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Best Value
              </button>
            </div>

            {/* Professional Package */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-colors duration-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">$699</div>
                <p className="text-gray-600 text-sm">50 products included</p>
              </div>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Scale Up
              </button>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-colors duration-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">$1,199</div>
                <p className="text-gray-600 text-sm">100 products included</p>
              </div>
              <button 
                onClick={handleGetStartedClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Enterprise Volume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4">
              Premium Add-Ons
            </h2>
            <p className="text-2xl text-violet-600 max-w-2xl mx-auto">
              Enhance your suite with these optional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gradient-to-t from-violet-50 to-violet-100 rounded-xl p-6 duration-200">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{addon.name}</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-4">{addon.price}</div>
                  <p className="text-gray-600 mb-6">{addon.description}</p>
                  <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-full font-semibold transition-colors duration-200">
                    Add to Suite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <FAQ 
        title="Full Suite FAQ"
        subtitle="Everything you need to know about our all-in-one service"
        questions={fullSuiteFAQ}
        className="bg-gray-50"
      />

      {/* Sticky CTA */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">Upgrade My Photos—Order the Suite</div>
              <div className="text-sm text-gray-600">Complete transformation in 48 hours</div>
            </div>
            <button 
              onClick={handleGetStartedClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              Order Full Suite
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <Footer />
      <SEOFooter pageType="photo-editing" />
    </>
  )
}

export default ECommerceFullSuite