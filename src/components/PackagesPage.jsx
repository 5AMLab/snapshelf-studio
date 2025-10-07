import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import FAQ from './shared/FAQ'
import AnnouncementBanner, { AnnouncementPresets } from './shared/AnnouncementBanner'
import { PRICING_FAQ } from '../config/faq.jsx'

// Lazy load AI chat widget
const AIChatWidget = lazy(() => import('./AIChatWidget'))
import {
  CheckCircleIcon as CheckCircle,
  StarIcon as Star,
  ChartBarIcon as BarChart3,
  ArrowRightIcon as ArrowRight,
  ClockIcon as Clock,
  BoltIcon as Zap,
  CurrencyDollarIcon as DollarSign,
  UsersIcon as Users,
  TrophyIcon as Award,
  PresentationChartLineIcon as Target,
  XMarkIcon as X,
  CheckIcon,
  ShoppingBagIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { useModal } from '../context/ModalContext'
import SEOFooter from './shared/SEOFooter'

const PackagesPage = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [showBanner, setShowBanner] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  // All service packages as products
  const allPackages = [
    // Photo Editing Packages
    {
      id: 'starter-pack',
      name: 'Starter Pack',
      category: 'photo-editing',
      platforms: ['shopee', 'lazada'],
      price: 99,
      priceDisplay: '$99',
      assets: '5 products',
      thumbnail: '📸',
      badge: 'Best for Testing',
      description: 'Perfect for testing our service quality',
      includes: [
        '5 professional photo edits',
        'Background removal',
        'Color correction',
        'Platform optimization',
        '2 revision rounds'
      ],
      deliveryTime: '72 hours',
      cta: 'Try SwiftPixel',
      popular: false
    },
    {
      id: 'growth-pack',
      name: 'Growth Pack',
      category: 'photo-editing', 
      platforms: ['shopee', 'lazada', 'amazon'],
      price: 399,
      priceDisplay: '$399',
      assets: '25 products',
      thumbnail: '🚀',
      badge: 'Most Popular',
      description: 'Best value for scaling businesses',
      includes: [
        '25 professional photo edits',
        'Product infographics',
        'Sales ad graphics',
        'Multi-platform resizing',
        'Priority support'
      ],
      deliveryTime: '48 hours',
      cta: 'Start Growing',
      popular: true
    },
    {
      id: 'scale-pack',
      name: 'Scale Pack',
      category: 'photo-editing',
      platforms: ['shopee', 'lazada', 'amazon', 'shopify'],
      price: 999,
      priceDisplay: '$999',
      assets: '100 products',
      thumbnail: '⚡',
      badge: 'Enterprise',
      description: 'Maximum savings for high-volume businesses',
      includes: [
        '100 professional photo edits',
        'Advanced retouching',
        'Custom brand templates',
        'A+ content design',
        'Dedicated account manager'
      ],
      deliveryTime: '24 hours',
      cta: 'Scale Business',
      popular: false
    },
    // Banner Design Packages
    {
      id: 'banner-essentials',
      name: 'Banner Essentials',
      category: 'banners',
      platforms: ['shopee', 'lazada'],
      price: 189,
      priceDisplay: '$189',
      assets: '4 banners',
      thumbnail: '🎨',
      badge: 'Starter',
      description: 'Essential banners for your marketing campaigns',
      includes: [
        '1 hero banner',
        '2 campaign banners',
        '1 social media ad',
        'Web-optimized formats',
        '2 revision rounds'
      ],
      deliveryTime: '72 hours',
      cta: 'Get Banners',
      popular: false
    },
    {
      id: 'complete-banner-pack',
      name: 'Complete Banner Pack',
      category: 'banners',
      platforms: ['shopee', 'lazada', 'amazon', 'shopify'],
      price: 320,
      priceDisplay: '$320',
      assets: '7 banners',
      thumbnail: '🎯',
      badge: 'Complete',
      description: 'Everything you need for successful campaigns',
      includes: [
        '1 hero banner',
        '3 campaign banners', 
        '2 social media ads',
        '1 mobile carousel banner',
        'Source files included'
      ],
      deliveryTime: '48 hours',
      cta: 'Get Complete Pack',
      popular: true
    },
    {
      id: 'premium-banner-suite',
      name: 'Premium Banner Suite',
      category: 'banners',
      platforms: ['shopee', 'lazada', 'amazon', 'shopify'],
      price: 599,
      priceDisplay: '$599',
      assets: '12+ banners',
      thumbnail: '✨',
      badge: 'Premium',
      description: 'Complete brand campaign with premium design',
      includes: [
        'Everything in Complete Pack',
        '2 campaign variations',
        '15-second video banner',
        'Email newsletter header',
        'Multi-language versions'
      ],
      deliveryTime: '24 hours',
      cta: 'Go Premium',
      popular: false
    },
    // Platform-Specific Packages
    {
      id: 'shopify-optimizer',
      name: 'Shopify Speed Booster',
      category: 'platforms',
      platforms: ['shopify'],
      price: 290,
      priceDisplay: '$290',
      assets: 'Store optimization',
      thumbnail: '🛍️',
      badge: 'Speed Boost',
      description: 'Make your store 65% faster in 5 days',
      includes: [
        'Image format conversion',
        '3 mobile-optimized banners',
        'Speed audit report',
        'SEO improvements',
        'Installation guide'
      ],
      deliveryTime: '5 days',
      cta: 'Speed Up Store',
      popular: true
    },
    {
      id: 'amazon-listing',
      name: 'Amazon Success Pack',
      category: 'platforms',
      platforms: ['amazon'],
      price: 590,
      priceDisplay: '$590',
      assets: 'Per product',
      thumbnail: '📦',
      badge: 'Amazon Ready',
      description: 'Complete Amazon listing that sells',
      includes: [
        'Amazon-compliant main image',
        '5 conversion infographics',
        '2 lifestyle photos',
        'A+ content design',
        'Amazon expert review'
      ],
      deliveryTime: '72 hours',
      cta: 'Dominate Amazon',
      popular: false
    },
    {
      id: 'lazada-optimization',
      name: 'Lazada Growth Pack',
      category: 'platforms',
      platforms: ['lazada'],
      price: 450,
      priceDisplay: '$450',
      assets: 'Full optimization',
      thumbnail: '🏪',
      badge: 'Lazada Pro',
      description: 'Lazada listings that get noticed',
      includes: [
        'Perfect 800x800px images',
        '8 product angles',
        'Sale event graphics',
        'LazMall compliance',
        'Mobile optimization'
      ],
      deliveryTime: '48 hours',
      cta: 'Grow on Lazada',
      popular: false
    },
    {
      id: 'shopee-specialist',
      name: 'Shopee Specialist Pack',
      category: 'platforms',
      platforms: ['shopee'],
      price: 380,
      priceDisplay: '$380',
      assets: 'Complete setup',
      thumbnail: '🛒',
      badge: 'Shopee Expert',
      description: 'Optimized for Shopee algorithm & trends',
      includes: [
        '9 square product images',
        'Shopee Live graphics',
        'Flash sale banners',
        'Mall compliance check',
        'Keyword optimization'
      ],
      deliveryTime: '48 hours',
      cta: 'Boost Shopee Sales',
      popular: false
    }
  ]

  // Featured packages for carousel with images from reference
  const featuredPackages = [
    {
      name: 'Shoes Collection',
      description: 'Premium footwear photography',
      priceDisplay: '$399',
      category: 'photo-editing',
      image: '/images/hero/2_7371edc9-6824-4ce7-8acf-52d392f7cc82.webp'
    },
    {
      name: 'Jewelry Showcase',
      description: 'Elegant jewelry presentation',
      priceDisplay: '$590',
      category: 'photo-editing',
      image: '/images/hero/transformation-01v2.jpg'
    },
    {
      name: 'Beauty Products',
      description: 'Cosmetics and skincare',
      priceDisplay: '$320',
      category: 'photo-editing', 
      image: '/images/hero/transformation-2.webp'
    },
    {
      name: 'Fashion Accessories',
      description: 'Style and elegance',
      priceDisplay: '$450',
      category: 'photo-editing',
      image: '/images/hero/transformation-3.webp'
    },
    {
      name: 'Lifestyle Products',
      description: 'Home and lifestyle',
      priceDisplay: '$280',
      category: 'photo-editing',
      image: '/images/hero/transformation-4.webp'
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

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All Packages', count: allPackages.length },
    { id: 'photo-editing', label: 'Photo Editing', count: allPackages.filter(p => p.category === 'photo-editing').length },
    { id: 'banners', label: 'Banner Design', count: allPackages.filter(p => p.category === 'banners').length },
    { id: 'platforms', label: 'Platform Services', count: allPackages.filter(p => p.category === 'platforms').length },
    { id: 'popular', label: 'Most Popular', count: allPackages.filter(p => p.popular).length }
  ]

  // Platform filter options
  const platformFilters = [
    { id: 'shopee', label: 'Shopee', color: 'bg-orange-100 text-orange-700' },
    { id: 'lazada', label: 'Lazada', color: 'bg-blue-100 text-blue-700' },
    { id: 'amazon', label: 'Amazon', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'shopify', label: 'Shopify', color: 'bg-green-100 text-green-700' }
  ]

  // Filter packages based on active filter and search
  const filteredPackages = allPackages.filter(pkg => {
    // Filter by category/type
    if (activeFilter !== 'all') {
      if (activeFilter === 'popular' && !pkg.popular) return false
      if (activeFilter !== 'popular' && pkg.category !== activeFilter) return false
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return pkg.name.toLowerCase().includes(query) || 
             pkg.description.toLowerCase().includes(query) ||
             pkg.includes.some(item => item.toLowerCase().includes(query))
    }
    
    return true
  })

  // Legacy object structure for compatibility
  // eslint-disable-next-line no-unused-vars
  const packageCategories = {
    'photo-editing': {
      title: 'Photo Editing Packages',
      description: 'Complete photo editing solutions for e-commerce success',
      icon: '📸',
      packages: [
        {
          id: 'starter-pack',
          name: 'Starter Pack',
          price: 99,
          priceDisplay: '$99',
          assets: 5,
          perEdit: 19.80,
          description: 'Perfect for testing our service quality',
          businessImpact: 'Try risk-free with 100% satisfaction guarantee',
          features: [
            'Professional photo editing',
            'Background removal',
            'Color correction & enhancement',
            'Platform optimization (Shopee, Lazada)',
            '72-hour delivery guarantee',
            '2 revision rounds included',
            'Standard email support'
          ],
          cta: 'Try SwiftPixel',
          popular: false,
          guarantee: '100% satisfaction or money back'
        },
        {
          id: 'growth-pack',
          name: 'Growth Pack',
          price: 399,
          priceDisplay: '$399',
          assets: 25,
          perEdit: 15.96,
          description: 'Best value for scaling businesses',
          businessImpact: 'Increase sales by 40% with professional photos',
          features: [
            'Everything in Starter Pack',
            'Product infographics design',
            'Sales ad graphics creation',
            'Multi-platform resizing included',
            '48-hour delivery guarantee',
            'Priority support',
            'Bulk upload system access'
          ],
          cta: 'Start Growing Sales',
          popular: true,
          guarantee: 'Dedicated account manager support'
        },
        {
          id: 'scale-pack',
          name: 'Scale Pack',
          price: 999,
          priceDisplay: '$999',
          assets: 100,
          perEdit: 9.99,
          description: 'Maximum savings for high-volume businesses',
          businessImpact: 'Dedicated account manager & priority processing',
          features: [
            'Everything in Growth Pack',
            'Advanced retouching services',
            'Custom brand template creation',
            'A+ content design for Amazon',
            '24-hour rush delivery included',
            'Dedicated account manager',
            'API integration available'
          ],
          cta: 'Scale My Business',
          popular: false,
          guarantee: 'White-glove service with SLA'
        }
      ]
    },
    'banners': {
      title: 'Banner Design Packages',
      description: 'Professional marketing banners that convert visitors to customers',
      icon: '🎨',
      packages: [
        {
          id: 'banner-essentials',
          name: 'Banner Essentials',
          price: 189,
          priceDisplay: '$189',
          description: 'Essential banners for your marketing campaigns',
          businessImpact: 'Perfect starter pack for new campaigns',
          features: [
            '1 hero banner for homepage',
            '2 promotional campaign banners',
            '1 social media square ad',
            'Web-optimized formats (PNG, JPG)',
            '72-hour delivery guarantee',
            '2 revision rounds included',
            'Source files provided'
          ],
          addOns: [
            { name: 'Extra banner', price: 45, description: 'Additional campaign banner' },
            { name: 'Animated version', price: 60, description: 'GIF/MP4 format' }
          ],
          cta: 'Get Essential Banners',
          popular: false,
          guarantee: '100% satisfaction guarantee'
        },
        {
          id: 'complete-banner-pack',
          name: 'Complete Banner Package',
          price: 320,
          priceDisplay: '$320',
          description: 'Everything you need to launch successful campaigns',
          businessImpact: 'Increase click-through rates by 40% on average',
          features: [
            'Hero banner for your homepage',
            '3 promotional campaign banners', 
            '2 social media square ads',
            'Mobile app carousel banner',
            'Source files for future editing',
            'Web-optimized formats',
            '48-hour delivery guarantee'
          ],
          addOns: [
            { name: 'Animated versions', price: 90, description: 'GIF/MP4 for social media' },
            { name: 'Multi-language', price: 60, description: 'Expand to global markets' },
            { name: 'A/B test variant', price: 70, description: 'Double your success rate' }
          ],
          cta: 'Get Complete Package',
          popular: true,
          guarantee: 'Save 65% vs hiring designers'
        },
        {
          id: 'premium-banner-suite',
          name: 'Premium Banner Suite',
          price: 599,
          priceDisplay: '$599',
          description: 'Complete brand campaign with premium design',
          businessImpact: 'Professional brand consistency across all channels',
          features: [
            'Everything in Complete Package',
            '2 additional campaign variations',
            'Video banner (15-second MP4)',
            'Email newsletter header design',
            'Custom brand guideline document',
            'Multi-language versions (3 languages)',
            '24-hour delivery guarantee'
          ],
          addOns: [
            { name: 'Extra language', price: 45, description: 'Additional language version' },
            { name: 'Video variations', price: 120, description: '3 additional video formats' }
          ],
          cta: 'Go Premium',
          popular: false,
          guarantee: 'Dedicated designer & unlimited revisions'
        }
      ]
    },
    'platforms': {
      title: 'Platform-Specific Services',
      description: 'Specialized optimization for major e-commerce platforms',
      icon: '🛒',
      packages: [
        {
          id: 'shopify-optimizer',
          name: 'Shopify Speed Booster',
          price: 290,
          priceDisplay: '$290',
          description: 'Make your store 65% faster in 5 days',
          businessImpact: 'Boost conversions by 25% with faster loading',
          features: [
            'Convert all images to fast formats',
            '3 mobile-optimized banners',
            'Speed audit & optimization report',
            'SEO improvements for Google ranking',
            'Easy installation guide',
            '5-day delivery guarantee'
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
        {
          id: 'amazon-listing',
          name: 'Amazon Success Package',
          price: 590,
          priceDisplay: '$590',
          suffix: 'per product',
          description: 'Complete Amazon listing that sells',
          businessImpact: 'Average 40% increase in Amazon sales',
          features: [
            'Amazon-compliant main image',
            '5 conversion-focused infographics',
            '2 lifestyle product photos',
            'Professional A+ content design',
            '72-hour delivery',
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
        {
          id: 'lazada-optimization',
          name: 'Lazada Growth Package',
          price: 450,
          priceDisplay: '$450',
          description: 'Lazada listings that get noticed',
          businessImpact: '2.3x more conversions on average',
          features: [
            'Perfect 800x800px main images',
            '8 additional product angles',
            'Sale event graphics (11.11, 12.12)',
            'LazMall quality compliance',
            'Mobile-first optimization',
            '48-hour delivery'
          ],
          metrics: {
            ctr: '+340% click-through rate',
            views: '+85% more visibility',
            conversion: '2.3x better conversions'
          },
          cta: 'Grow on Lazada',
          popular: false,
          guarantee: 'LazMall approval guaranteed'
        },
        {
          id: 'shopee-specialist',
          name: 'Shopee Specialist Package',
          price: 380,
          priceDisplay: '$380',
          description: 'Optimized for Shopee algorithm & trends',
          businessImpact: 'Designed for Shopee\'s unique requirements',
          features: [
            '9 square product images (1:1 ratio)',
            'Shopee Live streaming graphics',
            'Flash sale & discount banners',
            'Shopee Mall compliance check',
            'Keyword-optimized image text',
            '48-hour delivery guarantee'
          ],
          metrics: {
            visibility: '+120% better ranking',
            engagement: '+85% more clicks',
            sales: '+45% conversion boost'
          },
          cta: 'Boost Shopee Sales',
          popular: false,
          guarantee: 'Shopee Mall ready guarantee'
        }
      ]
    }
  }

  const handlePlatformFilter = (platformId) => {
    // Toggle platform filter logic can be added here
    console.log('Filter by platform:', platformId)
  }

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Service Packages - SnapShelf Studio | Complete E-commerce Solutions'
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    const packagesSection = document.getElementById('packages-section')
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Elements Container */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        {/* Announcement Banner */}
        {showBanner && (
          <AnnouncementBanner 
            show={showBanner}
            {...AnnouncementPresets.limitedCapacity("2", handleGetStartedClick)}
            onClose={() => setShowBanner(false)}
          />
        )}

        {/* Navigation */}
        <Header 
          showScrollButtons={false}
          scrollToSection={scrollToSection}
          currentPage="packages"
          onGetStarted={handleGetStartedClick}
          showBanner={showBanner}
        />
      </div>

      {/* Content Spacer */}
      <div className={`${showBanner ? 'h-[140px]' : 'h-[80px]'}`}></div>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-violet-100 to-slate-50 flex flex-col items-center justify-center overflow-hidden relative">
        
        {/* Large Background Title */}
        <h1 className="carousel-title">
          CREATIVE KITS
        </h1>

        {/* 3D Carousel Container */}
        <div className="carousel-container">
          {/* Left Arrow */}
          <button 
            className="carousel-nav-arrow carousel-nav-left"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredPackages.length) % featuredPackages.length)}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="carousel-track">
            {featuredPackages.map((pkg, index) => (
              <div
                key={index}
                className={`carousel-card ${getCardClass(index)}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="carousel-card-image"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{pkg.name}</h3>
                  <p className="text-white/80 text-sm">{pkg.description}</p>
                  <div className="text-white font-semibold text-xl mt-2">{pkg.priceDisplay}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            className="carousel-nav-arrow carousel-nav-right"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredPackages.length)}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Package Info */}
        <div className="carousel-member-info">
          <h2 className="carousel-member-name">
            {featuredPackages[currentIndex]?.name}
          </h2>
          <p className="carousel-member-role">
            {featuredPackages[currentIndex]?.category.replace('-', ' ').toUpperCase()} • {featuredPackages[currentIndex]?.priceDisplay}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => scrollToSection('packages-section')}
            className="bg-violet-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Creative Kits
          </button>
        </div>

        {/* Tagline */}
        <div className="text-center mt-8 px-4">
          <p className="text-lg text-gray-900 font-medium mb-2">
            <span className="font-bold">Skip the membership</span> and grab an all-inclusive, one-off bundle
          </p>
          <p className="text-lg text-gray-600">
            — every asset you need, delivered in just 5-14 days.
          </p>
        </div>
        
      </section>

      {/* Packages Listing Section */}
      <section id="packages-section" className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Header */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredPackages.length} of {allPackages.length} packages
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Platform Filters */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 flex items-center mr-3">Platforms:</span>
              {platformFilters.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformFilter(platform.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${platform.color} hover:scale-105`}
                >
                  {platform.label}
                </button>
              ))}
            </div>
          </div>

          {/* Package Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer group ${
                  pkg.popular
                    ? 'border-violet-300 ring-2 ring-violet-100'
                    : 'border-gray-200 hover:border-violet-200'
                }`}
                onClick={() => navigate('/book', {
                  state: {
                    selectedPackage: {
                      id: pkg.id,
                      name: pkg.name,
                      price: pkg.price,
                      assets: pkg.assets || 1
                    }
                  }
                })}
              >
                {/* Package Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-violet-50 to-white flex items-center justify-center">
                  <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-200">
                    {pkg.thumbnail}
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pkg.popular 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-white text-gray-700 shadow-sm'
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Platform Icons */}
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {pkg.platforms.slice(0, 3).map((platform) => {
                      const platformConfig = platformFilters.find(p => p.id === platform)
                      return platformConfig ? (
                        <span
                          key={platform}
                          className={`px-2 py-1 rounded text-xs font-medium ${platformConfig.color}`}
                        >
                          {platformConfig.label}
                        </span>
                      ) : null
                    })}
                    {pkg.platforms.length > 3 && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        +{pkg.platforms.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Package Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="text-2xl font-bold text-violet-600">
                        {pkg.priceDisplay}
                      </div>
                      <div className="text-sm text-gray-500">
                        {pkg.assets}
                      </div>
                    </div>
                  </div>

                  {/* What's Included - Condensed */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">What's included:</h4>
                    <div className="space-y-1">
                      {pkg.includes.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckIcon className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">{item}</span>
                        </div>
                      ))}
                      {pkg.includes.length > 3 && (
                        <div className="text-xs text-gray-500 pl-5">
                          +{pkg.includes.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{pkg.deliveryTime}</span>
                    </div>
                    <button className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
                      {pkg.cta} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setActiveFilter('all')
                  setSearchQuery('')
                }}
                className="bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Package Comparison CTA */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team can help you select the perfect combination of services for your business goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/pricing"
              className="border-2 border-violet-600 text-violet-600 px-8 py-4 rounded-xl font-semibold hover:bg-violet-50 transition-colors"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        title="Package Questions"
        subtitle="Common questions about our service packages"
        questions={PRICING_FAQ}
        className="py-16 bg-white"
      />

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        openModal={openModal}
        showScrollButtons={false}
      />

      {/* AI Chat Widget */}
      {/* <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense> */}

      {/* SEO Footer */}
      <SEOFooter pageType="packages" />

      {/* Custom 3D Carousel Styles */}
      <style jsx>{`
        .carousel-title {
          font-size: 7.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: absolute;
          top: 45px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          white-space: nowrap;
          font-family: "Arial Black", "Arial Bold", Arial, sans-serif;
          background: linear-gradient(
            to bottom,
            rgb(8 42 123 / 35%) 30%,
            rgb(255 255 255 / 0%) 76%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .carousel-container {
          width: 100%;
          max-width: 1200px;
          height: 450px;
          position: relative;
          perspective: 1000px;
          margin-top: 80px;
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
          color: rgb(8, 42, 123);
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
          background: rgba(8, 42, 123, 0.6);
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
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav-left {
          left: 20px;
        }

        .carousel-nav-right {
          right: 20px;
        }

        @media (max-width: 768px) {
          .carousel-title {
            font-size: 4.5rem;
          }

          .carousel-card {
            width: 200px;
            height: 280px;
          }

          .carousel-card-left-2 {
            transform: translateX(-250px) scale(0.8) translateZ(-300px);
          }

          .carousel-card-left-1 {
            transform: translateX(-120px) scale(0.9) translateZ(-100px);
          }

          .carousel-card-right-1 {
            transform: translateX(120px) scale(0.9) translateZ(-100px);
          }

          .carousel-card-right-2 {
            transform: translateX(250px) scale(0.8) translateZ(-300px);
          }

          .carousel-member-name {
            font-size: 2rem;
          }

          .carousel-member-role {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default PackagesPage