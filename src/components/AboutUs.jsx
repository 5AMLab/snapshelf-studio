import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import SEOFooter from './shared/SEOFooter'
import TeamMembers from './shared/TeamMembers'
import Jobs from './shared/Jobs'
import CTASection from './CTASection'
import {
  TrophyIcon as Award,
  StarIcon as Star,
  CheckCircleIcon as CheckCircle,
  UsersIcon as Users,
  ChartBarIcon as Chart
} from '@heroicons/react/24/outline'

const AboutUs = () => {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const totalSlides = 3

  // Handle get started click
  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'About Us | Sprintix Studio Pte. Ltd. - Professional Photo Editing Services'
    window.scrollTo(0, 0)
  }, [])


  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null) // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage="about"
        onGetStarted={handleGetStartedClick}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-violet-100 to-white pt-8 pb-24 overflow-hidden">
        {/* Background Image - Hidden on mobile */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: 'url("/images/hero/main-hero-bg-graphic.png")',
            backgroundPosition: 'center top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>


        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950 text-white mb-8">
            <span className="text-sm font-semibold">about sprintix</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-violet-300 to-violet-700">Our Vision</span>
          </h1>

          <p className="text-xl text-violet-950 mb-12 max-w-3xl mx-auto leading-normal">
            We focus <span className="text-violet-600 font-semibold">exclusively</span> on helping e-commerce sellers turn product photos into sales-driving visuals.
          </p>

          {/* Three Images Container - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-2xl border border-violet-100 aspect-square">
              <img
                src="/images/hero/handcream.webp"
                alt="Professional product editing example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-violet-100 aspect-square">
              <img
                src="/images/hero/shoe-2.webp"
                alt="E-commerce graphics example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-violet-100 aspect-square">
              <img
                src="/images/hero/edit-sale-ad.jpg"
                alt="Sales-driving visuals example"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Single Image Carousel - Mobile Only */}
          <div className="block md:hidden w-full max-w-sm mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl border border-violet-100 aspect-square"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out w-full h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="w-full h-full flex-shrink-0">
                  <img
                    src="/images/hero/handcream.webp"
                    alt="Professional product editing example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full flex-shrink-0">
                  <img
                    src="/images/hero/shoe-2.webp"
                    alt="E-commerce graphics example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full h-full flex-shrink-0">
                  <img
                    src="/images/hero/edit-sale-ad.jpg"
                    alt="Sales-driving visuals example"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Badge 72h - Upper left overlay */}
              <div className="absolute top-2 left-2 z-20 pointer-events-none">
                <img
                  src="/images/cta/badge-72h.png"
                  alt="Ready 72 Hour"
                  className="w-[85px] h-[85px] object-contain"
                />
              </div>

              {/* Badge Commerce - Lower right overlay */}
              <div className="absolute bottom-2 right-2 z-20 pointer-events-none">
                <img
                  src="/images/cta/badge-commerce.png"
                  alt="Commerce Ready"
                  className="w-[85px] h-[85px] object-contain"
                />
              </div>
            </div>

            {/* Carousel indicators - Outside image container */}
            <div className="flex justify-center mt-4 space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-violet-600'
                      : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* Platform Logos */}
          <div className="mt-16 text-center">
            <p className="text-lg font-semibold text-violet-950 mb-8">Trusted by sellers on</p>
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center justify-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-7">
              <img
                alt="Zalora"
                src="/images/logos/zalora-logo.svg"
                width={60}
                height={20}
                className="col-span-2 max-h-12 lg:max-h-20 pt-4 w-full object-contain md:col-span-1 lg:col-span-1"
              />
              <img
                alt="Shopee"
                src="/images/logos/Shopee-horizontal-logo.svg"
                width={59}
                height={19}
                className="col-span-2 max-h-11 lg:max-h-17 pb-1 w-full object-contain md:col-span-1 lg:col-span-1"
              />
              <img
                alt="Amazon"
                src="/images/logos/amazon-logo.svg"
                width={60}
                height={20}
                className="col-span-2 max-h-12 lg:max-h-20 pt-4 w-full object-contain md:col-span-1 lg:col-span-1"
              />
              <img
                alt="Lazada"
                src="/images/logos/lazada-logo.svg"
                width={74}
                height={19}
                className="col-span-2 max-h-11 lg:max-h-17 pt-2 w-full object-contain md:col-span-1 lg:col-span-1"
              />
              <img
                alt="Shopify"
                src="/images/logos/shopify-logo.svg"
                width={57}
                height={17}
                className="col-span-2 col-start-2 max-h-10 lg:max-h-14 w-full object-contain sm:col-start-auto md:col-span-1 md:col-start-auto lg:col-span-1"
              />
              <img
                alt="Meta/Instagram"
                src="/images/logos/meta-logo-2.svg"
                width={60}
                height={20}
                className="col-span-2 max-h-10 lg:max-h-14 w-full object-contain sm:col-start-2 md:col-span-1 md:col-start-auto lg:col-span-1"
              />
              <img
                alt="WooCommerce"
                src="/images/logos/woocommerce-logo.svg"
                width={60}
                height={20}
                className="col-span-2 max-h-10 lg:max-h-14 w-full object-contain md:col-span-1 lg:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <TeamMembers />

      {/* Jobs Section */}
      <Jobs />

      <CTASection />

      <Footer />
      <SEOFooter pageType="about" />
    </div>
  )
}

export default AboutUs