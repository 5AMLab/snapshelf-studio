import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import FAQ from '../components/shared/FAQ'
import FlipCard from '../components/FlipCard'
import {
  CheckIcon,
  ArrowRightIcon as ArrowRight,
  ArrowRightIcon,
  CurrencyDollarIcon as DollarSign,
  ClockIcon as Clock,
  StarIcon as Star,
  BoltIcon as Zap,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useModal } from '../context/ModalContext'
import SEOFooter from '../components/shared/SEOFooter'

// Lazy load AI chat widget
const AIChatWidget = lazy(() => import('../components/AIChatWidget'))

// Image Carousel Component
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    {
      src: "/images/portfolio/banner-after.gif",
      alt: "Professional banner design showcase",
      title: "Banner Packages"
    },
    {
      src: "/images/portfolio/infographic-02-after.jpg", 
      alt: "E-commerce platform optimization",
      title: "Platform Ready"
    },
    {
      src: "/images/portfolio/touch-up-v2-after.jpg",
      alt: "Custom brand solutions",
      title: "Custom Solutions"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="max-w-md mx-auto">
      {/* Simple Carousel Container */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
        
        {/* Image Container with 1:1 aspect ratio */}
        <div className="relative aspect-[1/1] overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Simple image title overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white px-3 py-2 rounded">
                  <h4 className="font-semibold text-gray-900 text-sm">{image.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Navigation Arrows */}
        <button
          onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const PackagesPage = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all') // 'all', 'banners', 'platforms', 'custom'
  const [cart, setCart] = useState([]) // Shopping cart for multiple packages
  const [showCart, setShowCart] = useState(false)
  const [showAllPackages, setShowAllPackages] = useState(false) // Show limited vs all packages
  const [currentIndex, setCurrentIndex] = useState(0) // For 3D carousel

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Service Packages - SwiftPixel Studio | Complete Design Solutions'
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    scrollToSection('packages-section')
  }

  const handleBookAudit = () => {
    navigate('/contact', {
      state: {
        selectedService: 'consultation',
        message: 'I\'d like to book a free consultation to discuss my project needs.'
      }
    })
  }

  // One-time service packages
  const servicePackages = {
    banners: {
      complete: {
        id: 'banner-complete',
        name: 'Complete Banner Package',
        price: 320,
        priceDisplay: '$320',
        deliveryTime: '5-7 days',
        valueMessage: 'Save 65% vs hiring designers',
        description: 'Everything you need for successful campaigns',
        businessImpact: 'Increase click-through rates by 40% on average',
        deliverables: [
          '1 Hero banner for homepage (1920x800px)',
          '3 Promotional campaign banners (various sizes)',
          '2 Social media square ads (1080x1080px)',
          '1 Mobile app carousel banner (800x400px)',
          'All banners in 3 platform-specific sizes each',
          'Source files (PSD/AI) included',
          'Web-optimized formats (WebP, JPG, PNG)',
          '2 rounds of revisions included'
        ],
        addOns: [
          { name: 'Animated versions (GIF/MP4)', price: 90, description: 'Motion graphics for social media' },
          { name: 'Multi-language versions', price: 60, description: 'Expand to global markets' },
          { name: 'A/B test variant set', price: 70, description: 'Double your success rate' }
        ],
        cta: 'Get Complete Banner Package',
        popular: true,
        guarantee: '100% satisfaction guarantee'
      },
      starter: {
        id: 'banner-starter',
        name: 'Banner Starter Pack',
        price: 180,
        priceDisplay: '$180',
        deliveryTime: '3-5 days',
        valueMessage: 'Perfect for testing campaigns',
        description: 'Essential banners to get started',
        businessImpact: 'Professional look without the budget',
        deliverables: [
          '1 Hero banner for homepage',
          '2 Promotional banners',
          '1 Social media ad',
          'Platform-optimized sizes',
          'Web-ready formats',
          '1 round of revisions'
        ],
        cta: 'Start With Basics',
        popular: false,
        guarantee: '100% satisfaction guarantee'
      }
    },
    platforms: {
      shopify: {
        id: 'shopify-complete',
        name: 'Shopify Speed & Sales Booster',
        price: 290,
        priceDisplay: '$290',
        deliveryTime: '5-7 days',
        valueMessage: 'Recover lost sales from slow loading',
        description: 'Complete Shopify optimization package',
        businessImpact: 'Boost conversions by 25% with faster loading',
        deliverables: [
          'Convert 20 existing images to WebP format',
          '3 Mobile-optimized collection banners',
          '1 Homepage hero banner optimization',
          'Speed audit & optimization report',
          'SEO image tags & alt text setup',
          'Installation guide with screenshots',
          'Theme compatibility check'
        ],
        metrics: {
          pageSpeed: '+65% faster loading',
          fileSize: '80% smaller images',
          seoScore: '+25 Google ranking points'
        },
        cta: 'Speed Up My Store',
        popular: true,
        guarantee: 'See results in 30 days or money back'
      },
      amazon: {
        id: 'amazon-complete',
        name: 'Amazon Success Package',
        price: 590,
        priceDisplay: '$590',
        suffix: 'per product',
        deliveryTime: '7-10 days',
        valueMessage: 'ROI typically pays for itself in 2 weeks',
        description: 'Complete Amazon listing optimization',
        businessImpact: 'Average 40% increase in Amazon sales',
        deliverables: [
          '1 Amazon-compliant main image (2000x2000px)',
          '5 Conversion-focused infographic images',
          '2 Lifestyle product photos',
          '1 Professional A+ content module design',
          'Amazon listing copy optimization',
          'Keyword-optimized image titles',
          'Amazon expert review included'
        ],
        metrics: {
          ctr: '+22% click-through rate',
          conversion: '+18% more sales',
          returns: '15% fewer returns'
        },
        cta: 'Dominate Amazon',
        popular: false,
        guarantee: 'Amazon approval guaranteed'
      },
      lazada: {
        id: 'lazada-complete',
        name: 'Lazada Growth Package',
        price: 450,
        priceDisplay: '$450',
        deliveryTime: '5-7 days',
        valueMessage: '340% higher click rates proven',
        description: 'Complete Lazada listing optimization',
        businessImpact: '2.3x more conversions on average',
        deliverables: [
          '5 Perfect 800x800px main images',
          '8 Additional product angle shots',
          '3 Sale event graphics (11.11, 12.12, Flash Sale)',
          'LazMall quality compliance check',
          'Mobile-first image optimization',
          'Lazada listing description graphics'
        ],
        metrics: {
          ctr: '+340% click-through rate',
          views: '+85% more visibility',
          conversion: '2.3x better conversions'
        },
        cta: 'Grow on Lazada',
        popular: false,
        guarantee: 'LazMall approval guaranteed'
      }
    },
    custom: {
      brand: {
        id: 'brand-package',
        name: 'Brand Identity Package',
        price: 890,
        priceDisplay: '$890',
        deliveryTime: '10-14 days',
        valueMessage: 'Complete brand foundation',
        description: 'Everything you need for consistent branding',
        businessImpact: 'Professional brand recognition across all channels',
        deliverables: [
          'Brand guidelines document (PDF)',
          'Logo variations and usage rules',
          '5 Custom brand templates',
          'Color palette and typography guide',
          'Social media template set',
          'Email signature designs',
          'Business card & letterhead design'
        ],
        cta: 'Build My Brand',
        popular: false,
        guarantee: 'Unlimited revisions until satisfied'
      },
      campaign: {
        id: 'campaign-package',
        name: 'Marketing Campaign Package',
        price: 650,
        priceDisplay: '$650',
        deliveryTime: '7-10 days',
        valueMessage: 'Complete campaign ready to launch',
        description: 'Full marketing campaign across all channels',
        businessImpact: 'Cohesive messaging increases campaign effectiveness by 60%',
        deliverables: [
          '5 Social media post designs',
          '3 Email marketing banners',
          '2 Website popup designs',
          '1 Landing page hero section',
          'Google Ads banner set (5 sizes)',
          'Campaign messaging guide',
          'Performance tracking setup guide'
        ],
        cta: 'Launch My Campaign',
        popular: true,
        guarantee: 'Campaign performance guarantee'
      }
    }
  }

  const categories = [
    { id: 'all', name: 'All', description: 'All available packages' },
    { id: 'banners', name: 'Banner Packages', description: 'Complete banner sets with source files' },
    { id: 'platforms', name: 'Platform Optimization', description: 'Marketplace-specific solutions' },
    { id: 'custom', name: 'Custom Solutions', description: 'Brand identity & campaign packages' }
  ]

  const getCurrentPackages = () => {
    let packages = []
    if (activeCategory === 'all') {
      // Return all packages from all categories
      packages = [
        ...Object.values(servicePackages.banners),
        ...Object.values(servicePackages.platforms),
        ...Object.values(servicePackages.custom)
      ]
    } else {
      packages = Object.values(servicePackages[activeCategory])
    }
    
    // Limit to 6 packages if showAllPackages is false
    return showAllPackages ? packages : packages.slice(0, 6)
  }

  const getTotalPackagesCount = () => {
    if (activeCategory === 'all') {
      return Object.values(servicePackages.banners).length + 
             Object.values(servicePackages.platforms).length + 
             Object.values(servicePackages.custom).length
    }
    return Object.values(servicePackages[activeCategory]).length
  }

  // Cart management functions
  const addToCart = (pkg) => {
    const existingItem = cart.find(item => item.id === pkg.id)
    if (existingItem) {
      // If package already in cart, increase quantity
      setCart(cart.map(item => 
        item.id === pkg.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      // Add new package to cart
      setCart([...cart, { ...pkg, quantity: 1 }])
    }
  }

  const removeFromCart = (packageId) => {
    setCart(cart.filter(item => item.id !== packageId))
  }

  const updateQuantity = (packageId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(packageId)
    } else {
      setCart(cart.map(item => 
        item.id === packageId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    
    navigate('/contact', { 
      state: { 
        selectedPackages: cart,
        cartTotal: getCartTotal(),
        isMultiplePackages: true
      } 
    })
  }

  // Featured packages for carousel with images from reference
  const featuredPackages = [
    {
      name: 'Shoes Collection',
      description: 'Premium footwear photography',
      priceDisplay: '$399',
      category: 'photo-editing',
      image: '/images/hero/edit-01.jpg'
    },
    {
      name: 'Jewelry Showcase',
      description: 'Elegant jewelry presentation',
      priceDisplay: '$590',
      category: 'photo-editing',
      image: '/images/hero/model-head-flower-whitebg.jpg'
    },
    {
      name: 'Beauty Products',
      description: 'Cosmetics and skincare',
      priceDisplay: '$320',
      category: 'photo-editing', 
      image: '/images/hero/hermesbottle.png'
    },
    {
      name: 'Fashion Accessories',
      description: 'Style and elegance',
      priceDisplay: '$450',
      category: 'photo-editing',
      image: '/images/hero/removebg-01-after.jpg'
    },
    {
      name: 'Lifestyle Products',
      description: 'Home and lifestyle',
      priceDisplay: '$280',
      category: 'photo-editing',
      image: '/images/hero/touchup.jpg'
    }
  ]

  // Carousel helper function
  const getCardClass = (index) => {
    const offset = (index - currentIndex + featuredPackages.length) % featuredPackages.length
    
    if (offset === 0) return 'carousel-card-center'
    if (offset === 1) return 'carousel-card-right-1'
    if (offset === 2) return 'carousel-card-right-2'
    if (offset === featuredPackages.length - 1) return 'carousel-card-left-1'
    if (offset === featuredPackages.length - 2) return 'carousel-card-left-2'
    return 'carousel-card-hidden'
  }

  // Mobile carousel helper function (3 cards only)
  const getMobileCardClass = (index) => {
    const offset = (index - currentIndex + featuredPackages.length) % featuredPackages.length
    
    if (offset === 0) return 'carousel-card-center'
    if (offset === 1) return 'carousel-card-right-1'
    if (offset === featuredPackages.length - 1) return 'carousel-card-left-1'
    return 'carousel-card-hidden'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Elements Container */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        {/* Navigation */}
        <Header 
          showScrollButtons={false}
          scrollToSection={scrollToSection}
          currentPage="packages"
          onGetStarted={handleGetStartedClick}
          showBanner={false}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[50px]"></div>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-violet-100 to-slate-50 flex flex-col items-center justify-center overflow-hidden relative">
        
        {/* Large Background Title */}
        <h1 className="carousel-title">
          CREATIVE KITS
        </h1>

        {/* 3D Carousel Container */}
        <div className="carousel-container">
          {/* Left Arrow - Hidden on mobile */}
          <button 
            className="carousel-nav-arrow carousel-nav-left hidden lg:flex"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredPackages.length) % featuredPackages.length)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="carousel-track">
            {featuredPackages.map((pkg, index) => (
              <div
                key={index}
                className={`carousel-card ${getCardClass(index)} hidden md:block`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="carousel-card-image"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                  <h3 className="text-white font-bold text-base md:text-lg leading-tight">{pkg.name}</h3>
                  <p className="text-white/80 text-xs md:text-sm leading-tight mt-1">{pkg.description}</p>
                  <div className="text-white font-semibold text-lg md:text-xl mt-1">{pkg.priceDisplay}</div>
                </div>
              </div>
            ))}
            
            {/* Mobile-specific carousel (3 cards only) */}
            {featuredPackages.map((pkg, index) => (
              <div
                key={`mobile-${index}`}
                className={`carousel-card ${getMobileCardClass(index)} block md:hidden`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="carousel-card-image"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                  <h3 className="text-white font-bold text-base md:text-lg leading-tight">{pkg.name}</h3>
                  <p className="text-white/80 text-xs md:text-sm leading-tight mt-1">{pkg.description}</p>
                  <div className="text-white font-semibold text-lg md:text-xl mt-1">{pkg.priceDisplay}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Hidden on mobile */}
          <button 
            className="carousel-nav-arrow carousel-nav-right hidden lg:flex"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredPackages.length)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

         {/* Tagline */}
        <div className="text-center mt-4 px-4">
          <p className="text-base sm:text-lg text-gray-600 mb-2">
            <span className="font-bold">Skip the membership</span> and grab an all-inclusive, one-off bundle — every asset you need, delivered in just 5-14 days.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-4 pt-2 pb-8">
          <div 
            className="ico animated cursor-pointer"
            onClick={() => scrollToSection('packages-section')}
          >
            <div className="circle circle-top"></div>  
            <div className="circle circle-main"></div>
            <div className="circle circle-bottom"></div>  
            
            <svg className="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style={{enableBackground:'new 0 0 612 612'}} xmlSpace="preserve">
              <defs>
                <clipPath id="cut-off-arrow">
                  <circle cx="306" cy="306" r="287"/>
                </clipPath>
                
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
              <path className="st-arrow" d="M317.5,487.6c0.3-0.3,0.4-0.7,0.7-1.1l112.6-112.6c6.3-6.3,6.3-16.5,0-22.7c-6.3-6.3-16.5-6.3-22.7,0
                          l-86,86V136.1c0-8.9-7.3-16.2-16.2-16.2c-8.9,0-16.2,7.3-16.2,16.2v301.1l-86-86c-6.3-6.3-16.5-6.3-22.7,0
                          c-6.3,6.3-6.3,16.5,0,22.7l112.7,112.7c0.3,0.3,0.4,0.7,0.7,1c0.5,0.5,1.2,0.5,1.7,0.9c1.7,1.4,3.6,2.3,5.6,2.9
                          c0.8,0.2,1.5,0.4,2.3,0.4C308.8,492.6,313.8,491.3,317.5,487.6z"/>
            </svg>
          </div>
        </div>

       

        
        
      </section>

      {/* Cart Button - Fixed Position */}
          {getCartItemCount() > 0 && (
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
              <button
                onClick={() => setShowCart(true)}
                className="bg-violet-600 text-stone-50 px-3 sm:px-6 py-3 sm:py-4 rounded-full font-semibold hover:bg-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                <span>🛒</span>
                <span className="hidden sm:inline">Cart </span>
                <span>({getCartItemCount()})</span>
                <span className="bg-violet-500 px-2 py-1 rounded-full text-xs sm:text-sm">
                  ${getCartTotal()}
                </span>
              </button>
            </div>
          )}

      {/* Scrolling Platforms Logos Section */}  
      <section className="bg-violet-950 pt-2 pb-4 px-4 lg:px-4 py-2">
        <div className="mx-auto max-w">
          
          {/* Scrolling Logo Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-logos space-x-12 items-center">
              {/* First set of logos */}
              <img
                alt="Amazon"
                src="/images/logos/amazon-logo.svg"
                width={80}
                height={30}
                className="h-12 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Shopee"
                src="/images/logos/Shopee-horizontal-logo.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Lazada"
                src="/images/logos/lazada-logo.svg"
                width={90}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Meta/Instagram"
                src="/images/logos/meta-logo-2.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Shopify"
                src="/images/logos/shopify-logo.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              
              {/* Duplicate set for seamless loop */}
              <img
                alt="Amazon"
                src="/images/logos/amazon-logo.svg"
                width={80}
                height={30}
                className="h-12 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Shopee"
                src="/images/logos/Shopee-horizontal-logo.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Lazada"
                src="/images/logos/lazada-logo.svg"
                width={90}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Meta/Instagram"
                src="/images/logos/meta-logo-2.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <img
                alt="Shopify"
                src="/images/logos/shopify-logo.svg"
                width={80}
                height={30}
                className="h-10 w-auto object-contain flex-shrink-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="packages-section" className="pt-8 py-16 bg-violet-50 pt-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          

          {/* Category tabs */}
          <div className="flex justify-center mb-8 md:mb-16 px-2">
            <div className="flex flex-wrap justify-center bg-violet-100 rounded-2xl p-1 gap-1 sm:gap-0 max-w-full">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setShowAllPackages(false) // Reset to limited view when changing categories
                  }}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold transition-all duration-200 text-sm sm:text-base flex-shrink-0 ${
                    activeCategory === category.id
                      ? 'bg-white text-violet-600 shadow-md'
                      : 'text-violet-700 hover:text-violet-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-6 md:mb-8 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-violet-950 mb-3 md:mb-4">
              Choose Your  <span className="text-transparent text-pretty bg-clip-text bg-gradient-to-b from-violet-700 to-violet-300">
                Creative Kit </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto">
              Each kit is a complete solution delivered once <br className="hidden sm:block"></br>with everything you need to launch successfully
            </p>
          </div>

          {/* Package Cards - Flip Card Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-4 max-w-5xl mx-auto">
            {getCurrentPackages().map((pkg) => (
              <FlipCard
                key={pkg.id}
                pkg={pkg}
                onAddToCart={addToCart}
                className=""
              />
            ))}
          </div>

          {/* See All Button */}
          {getTotalPackagesCount() > 6 && !showAllPackages && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllPackages(true)}
                className="border-2 border-violet-600 text-violet-600 px-8 py-3 rounded-full font-semibold hover:border-violet-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>See All({getTotalPackagesCount()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllPackages && getTotalPackagesCount() > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllPackages(false)}
                className="border-2 border-violet-600 text-violet-600 px-8 py-3 rounded-full font-semibold hover:bg-violet-50 transition-colors inline-flex items-center space-x-2"
              >
                <span>Show Less</span>
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Comparison with Memberships */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-violet-950 mb-4 ">
              Service Packages vs Memberships
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the difference between our one-time <br></br>packages and recurring memberships
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Creative Kits */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Service Packages</h3>
                <p className="text-blue-600 font-semibold">One-time deliverables</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Complete solution delivered once</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">5-14 day delivery timeline</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Source files & assets included</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Perfect for specific projects</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                <p className="text-sm text-blue-800">
                  <strong>Best for:</strong> Launching new campaigns, one-time optimization projects, complete rebrands
                </p>
              </div>
            </div>

            {/* Memberships */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Memberships</h3>
                <p className="text-violet-600 font-semibold">Recurring credit system</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Monthly credits to use anytime</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">2-5 day per-edit turnaround</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Credits rollover for 90 days</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Perfect for ongoing needs</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-violet-50 rounded-2xl">
                <p className="text-sm text-violet-800">
                  <strong>Best for:</strong> Regular product uploads, seasonal campaigns, ongoing catalog management
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to="/pricing"
                  className="bg-violet-600 text-white py-3 rounded-full font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center"
                >
                  View Membership Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Package Questions"
        subtitle="Common questions about our service packages"
        questions={[
          {
            question: "How are service packages different from memberships?",
            answer: "Service packages are complete, one-time deliverables (like a full banner set) delivered within 5-14 days. Memberships give you monthly credits to use for individual photo edits over time."
          },
          {
            question: "Can I customize a package?",
            answer: "Yes! All packages can be customized. Contact us with your specific needs and we'll create a custom quote."
          },
          {
            question: "What's included in the source files?",
            answer: "You'll receive PSD, AI, or Figma files (depending on the project) so you can make future edits or create variations."
          },
          {
            question: "How do revisions work?",
            answer: "Most packages include 2-3 rounds of revisions. We'll work with you until you're completely satisfied with the results."
          },
          {
            question: "Can I combine packages?",
            answer: "Absolutely! Many clients combine banner packages with platform optimization. We offer bundle discounts for multiple packages."
          }
        ]}
        className="py-16 bg-white"
      />

      {/* CTA Section */}
      <section className="bg-violet-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Launch Your Next Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose a complete package above or contact us for a custom solution tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-violet-600 text-stone-50 px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/pricing"
              className="border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-full font-semibold hover:bg-violet-50 transition-colors"
            >
              View Memberships Instead
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-0">
        <Footer 
          scrollToSection={scrollToSection}
          openModal={openModal}
          showScrollButtons={false}
        />
      </div>

      {/* AI Chat Widget */}
      {/* <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense> */}

      {/* SEO Footer */}
      <SEOFooter pageType="packages" />

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Package Selection</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-violet-600 text-stone-50 px-6 py-2 rounded-2xl font-semibold hover:bg-violet-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-2xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>Delivered in {item.deliveryTime}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-violet-600">
                              ${(item.price * item.quantity).toFixed(0)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price} each
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bundle Discount Notice */}
                  {cart.length > 1 && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-green-700">
                        <span>🎉</span>
                        <span className="font-semibold">Bundle Discount Available!</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        You're ordering multiple packages - we'll apply a 10-15% bundle discount when you contact us.
                      </p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-gray-900">Subtotal</span>
                      <span className="text-2xl font-bold text-violet-600">${getCartTotal()}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Final pricing will be confirmed during consultation with potential bundle discounts applied.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCart(false)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 bg-violet-600 text-stone-50 py-3 rounded-2xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      
      {/* Custom 3D Carousel Styles */}
      <style jsx>{`
        .carousel-title {
          font-size: 7.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          white-space: nowrap;
          font-family: "Arial Black", "Arial Bold", Arial, sans-serif;
          background: linear-gradient(
            to bottom,
            rgb(124 58 237 / 35%) 30%,
            rgb(255 255 255 / 0%) 76%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          z-index: 15;
        }

        .carousel-container {
          width: 100%;
          max-width: 1200px;
          height: 450px;
          position: relative;
          perspective: 1000px;
          margin-top: 80px;
          z-index: 10;
        }

        .carousel-track {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .carousel-card {
          position: absolute;
          width: 280px;
          height: 380px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .carousel-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .carousel-card-center {
          z-index: 10;
          transform: scale(1.1) translateZ(0);
        }

        .carousel-card-center .carousel-card-image {
          filter: none;
        }

        .carousel-card-left-2 {
          z-index: 1;
          transform: translateX(-400px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .carousel-card-left-2 .carousel-card-image {
          filter: grayscale(50%);
        }

        .carousel-card-left-1 {
          z-index: 5;
          transform: translateX(-200px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .carousel-card-left-1 .carousel-card-image {
          filter: grayscale(30%);
        }

        .carousel-card-right-1 {
          z-index: 5;
          transform: translateX(200px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .carousel-card-right-1 .carousel-card-image {
          filter: grayscale(30%);
        }

        .carousel-card-right-2 {
          z-index: 1;
          transform: translateX(400px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .carousel-card-right-2 .carousel-card-image {
          filter: grayscale(50%);
        }

        .carousel-card-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .carousel-member-info {
          text-align: center;
          margin-top: 40px;
          transition: all 0.5s ease-out;
        }

        .carousel-member-name {
          color: rgb(124, 58, 237);
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
        }

        .carousel-member-role {
          color: #848696;
          font-size: 1.5rem;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          padding: 10px 0;
          margin-top: -15px;
          position: relative;
        }

        .carousel-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(124, 58, 237, 0.7);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          border: none;
          outline: none;
        }

        .carousel-nav-arrow:hover {
          background: rgba(124, 58, 237, 0.9);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav-left {
          left: 20px;
        }

        .carousel-nav-right {
          right: 20px;
        }

        /* Animated CTA Button Styles */
        .ico {
          margin: 0 auto;
          text-align: center;
          width: 50px;
          height: 50px;
          position: relative;
          filter: url("#goo");
          transition: transform 0.2s ease;
        }

        .ico:hover {
          transform: scale(1.05);
        }

        .ico .circle {
          background: #ffffff;
          border-radius: 50%;
          display: inline-block;
          height: 50px;
          width: 50px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          transform-origin: 0%;
        }

        .ico .circle.circle-top {
          height: 17px;
          width: 21px;
          animation: blob-1-anim 3s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
          z-index: 0;
          top: 0;
        }

        .ico .circle.circle-bottom {
          height: 17px;
          width: 21px;
          animation: blob-2-anim 3s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
          z-index: 9;
          bottom: 0px;
        }

        .ico .st-arrow {
          fill: rgb(124, 58, 237);
          animation: scrolly 3s cubic-bezier(0.770, 0.000, 0.175, 1.000) forwards infinite;
          perspective: 9000px;
          transform: translateZ(0);
          transform-origin: bottom;
        }

        .ico .svg {
          z-index: 9;
          position: relative;
        }

        @keyframes blob-1-anim {
          0% {
            transform: translateX(-50%) translateY(0);
          }
          14% {
            transform: translateX(-50%) translateY(-8px);
          }
          24% {
            transform: translateX(-50%) translateY(0);
          }
          100% {
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes blob-2-anim {
          0% {
            transform: scale(1) translate(-50%, 10px);
          }
          30% {
            transform: scale(1) translate(-50%, 10px);
          }
          70% {
            transform: scale(1) translate(-50%, 10px);
          }
          95% {
            transform: scale(1) translate(-50%, 26px);
          }
          100% {
            transform: scale(1) translate(-50%, 10px);
          }
        }

        @keyframes scrolly {
          0% {
            transform: translate3d(0, -150%, 0) rotateX(90deg) scale(0.5) skewX(3deg);
          }
          30% {
            transform: translate3d(0, 0, 0) rotateX(0deg) scale(1) skewX(0deg);
          }
          70% {
            transform: translate3d(0, 0, 0) rotateX(0deg) scale(1) skewX(0deg);
          }
          95% {
            transform: translate3d(0, 50%, 0) rotateX(-90deg) scale(0.5) skewX(-3deg);
          }
          100% {
            transform: translate3d(0, 50%, 0) rotateX(-90deg) scale(0.5) skewX(-3deg);
          }
        }

        /* Fix for footer white space */
        body {
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          .carousel-title {
            font-size: 3.5rem;
            top: 20%;
            transform: translateX(-50%) translateY(-50%);
          }

          .carousel-container {
            height: 400px;
            margin-top: -100px;
            padding: 0 20px;
          }

          .carousel-card {
            width: 220px;
            height: 280px;
          }

          .carousel-card-center {
            z-index: 10;
            transform: scale(1) translateZ(0);
          }

          .carousel-card-left-1 {
            z-index: 5;
            transform: translateX(-160px) scale(0.75) translateZ(-120px);
            opacity: 0.8;
          }

          .carousel-card-right-1 {
            z-index: 5;
            transform: translateX(160px) scale(0.75) translateZ(-120px);
            opacity: 0.8;
          }

          .carousel-card-left-2 {
            transform: translateX(-200px) scale(0.7) translateZ(-200px);
          }

          .carousel-card-right-2 {
            transform: translateX(200px) scale(0.7) translateZ(-200px);
          }

          .carousel-member-name {
            font-size: 1.8rem;
          }

          .carousel-member-role {
            font-size: 1rem;
          }

          .ico {
            width: 40px;
            height: 40px;
          }

          .ico .circle {
            width: 40px;
            height: 40px;
          }

          .ico .circle.circle-top,
          .ico .circle.circle-bottom {
            height: 14px;
            width: 17px;
          }

          .carousel-nav-arrow {
            width: 35px;
            height: 35px;
          }

          .carousel-nav-left {
            left: 10px;
          }

          .carousel-nav-right {
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .carousel-title {
            font-size: 2.8rem;
            top: 15%;
            transform: translateX(-50%) translateY(-50%);
          }

          .carousel-container {
            height: 350px;
            margin-top: -80px;
            padding: 0 16px;
          }

          .carousel-card {
            width: 200px;
            height: 260px;
          }

          .carousel-card-center {
            z-index: 10;
            transform: scale(1) translateZ(0);
          }

          .carousel-card-left-1 {
            z-index: 5;
            transform: translateX(-140px) scale(0.7) translateZ(-100px);
            opacity: 0.7;
          }

          .carousel-card-right-1 {
            z-index: 5;
            transform: translateX(140px) scale(0.7) translateZ(-100px);
            opacity: 0.7;
          }

          .carousel-card-left-2 {
            transform: translateX(-160px) scale(0.6) translateZ(-150px);
          }

          .carousel-card-right-2 {
            transform: translateX(160px) scale(0.6) translateZ(-150px);
          }

          .carousel-nav-arrow {
            width: 30px;
            height: 30px;
          }

          .carousel-nav-left {
            left: 5px;
          }

          .carousel-nav-right {
            right: 5px;
          }
        }
      `}</style>
    </div>
  )
}

export default PackagesPage