import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import SEOFooter from './shared/SEOFooter'
import './Gallery.css'
// Import essential icons that are used immediately
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import BeforeAfterSlider from './BeforeAfterSlider'
import Footer from './shared/Footer'
import FAQ from './shared/FAQ'
import { PRICING_CONFIG } from '../config/pricing'
import { useModal } from '../context/ModalContext'
const HeroTestPage = lazy(() => import('./HeroTestPage'))
import useImagePreloader from '../hooks/useImagePreloader'
import CTASection from './CTASection'

// Lazy load heavy components
const AIChatWidget = lazy(() => import('./AIChatWidget'))
const ServicesCarousel = lazy(() => import('./ServicesCarousel'))
const OurProcess = lazy(() => import('./OurProcess'))


const SprintixStudio = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState({})
  const [heroVisible, setHeroVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [slideWidth, setSlideWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [desktopScrollPosition, setDesktopScrollPosition] = useState(0)
  const heroRef = useRef(null)
  const desktopScrollerRef = useRef(null)

  // Only preload absolutely critical images (above the fold)
  const criticalImages = [
    '/images/features/bg-remove.svg', // BG Remove card - visible immediately
    '/images/features/commerce.svg', // Commerce card
    '/images/features/brands.svg', // Brands card
    '/images/features/cropping.svg'  // Cropping card
  ]

  // Preload critical images with timeout to prevent blocking
  const { imagesLoaded } = useImagePreloader(criticalImages)

  // Mobile detection and slide width calculation
  useEffect(() => {
    const updateCarouselSettings = () => {
      const width = window.innerWidth
      setIsMobile(width <= 767)
      if (width <= 767) {
        setSlideWidth(width * 0.8) // 80vw
      }
    }

    updateCarouselSettings()
    window.addEventListener('resize', updateCarouselSettings)
    return () => window.removeEventListener('resize', updateCarouselSettings)
  }, [])

  // Auto-advance carousel on mobile - DISABLED
  // useEffect(() => {
  //   if (!isMobile) return

  //   const interval = setInterval(() => {
  //     setCurrentSlide(prev => (prev + 1) % 6)
  //   }, 4000)

  //   return () => clearInterval(interval)
  // }, [isMobile])

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  const handlePrevSlide = () => {
    if (isMobile) {
      setCurrentSlide(prev => prev > 0 ? prev - 1 : 5)
    } else {
      // Desktop: scroll left by 4 slides at a time
      if (desktopScrollerRef.current) {
        const slideWidth = desktopScrollerRef.current.querySelector('.scroller-slide')?.offsetWidth || 0
        const gap = parseInt(getComputedStyle(desktopScrollerRef.current).gap) || 0
        const scrollAmount = (slideWidth + gap) * 4 // Move 4 slides
        const newPosition = Math.max(0, desktopScrollPosition - scrollAmount)
        setDesktopScrollPosition(newPosition)
        desktopScrollerRef.current.style.transform = `translateX(-${newPosition}px)`
      }
    }
  }

  const handleNextSlide = () => {
    if (isMobile) {
      setCurrentSlide(prev => prev < 5 ? prev + 1 : 0)
    } else {
      // Desktop: scroll right by 4 slides at a time
      if (desktopScrollerRef.current) {
        const slideWidth = desktopScrollerRef.current.querySelector('.scroller-slide')?.offsetWidth || 0
        const gap = parseInt(getComputedStyle(desktopScrollerRef.current).gap) || 0
        const scrollAmount = (slideWidth + gap) * 4 // Move 4 slides
        const maxScroll = (slideWidth + gap) * 6 // 6 original slides
        const newPosition = desktopScrollPosition + scrollAmount

        // Reset to beginning if we've scrolled past the first set
        if (newPosition >= maxScroll) {
          setDesktopScrollPosition(0)
          desktopScrollerRef.current.style.transform = `translateX(0)`
        } else {
          setDesktopScrollPosition(newPosition)
          desktopScrollerRef.current.style.transform = `translateX(-${newPosition}px)`
        }
      }
    }
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchEnd(0) // Reset touchEnd
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

    if (isLeftSwipe && currentSlide < 5) {
      setCurrentSlide(prev => prev + 1)
    } else if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }


  // Set page title and add resource hints
  useEffect(() => {
    document.title = 'Sprintix Studio - Professional Photo Editing Services | Transform Your Product Photos'
    
    // Add DNS prefetch for external resources
    const addResourceHint = (rel, href, as = null) => {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (as) link.as = as
      document.head.appendChild(link)
    }

    // Only essential preconnects
    addResourceHint('preconnect', 'https://fonts.googleapis.com')
    
    // Defer non-critical prefetches
    setTimeout(() => {
      addResourceHint('prefetch', '/pricing')
    }, 2000)
  }, [])

  // Hero section animation observer
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !heroVisible) {
            setHeroVisible(true)
            heroObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (heroRef.current) {
      heroObserver.observe(heroRef.current)
    }

    return () => heroObserver.disconnect()
  }, [heroVisible])

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
            // Unobserve after first intersection to improve performance
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px' // Load slightly before visible
      }
    )

    // Only observe sections, not all elements with IDs
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])



  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Elements Container */}
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        {/* Navigation */}
        <Header 
          showScrollButtons={true}
          scrollToSection={scrollToSection}
          currentPage="home"
          onGetStarted={handleGetStartedClick}
          showBanner={false}
        />
      </div>

      {/* Content Spacer */}
      <div className="h-[80px]"></div>
    
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="bg-gradient-to-b from-violet-100 to-white py-8 sm:px-6 lg:px-6 pb-16 relative overflow-hidden" style={{
        minHeight: '600px', 
        display: 'block', 
        visibility: 'visible'
      }}>
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/hero/main-hero-bg-graphic.png")',
            backgroundPosition: 'center top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
           
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Content */}
          <div className="mb-4 relative" style={{display: 'block', visibility: 'visible'}}>
            
            <div className="relative max-w-4xl mx-auto">
              <h1 className={`text-5xl md:text-6xl font-bold text-violet-950 mb-6 text-center transition-all duration-700 delay-200 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Transform products into<br></br><span className="text-transparent text-pretty bg-clip-text bg-gradient-to-r from-violet-700 to-violet-300">post-ready assets</span>
                
              </h1>
              
            </div>
            
            <p className={`text-xl text-violet-950 mb-8 text-center max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Optimized for every marketplace where your customers shop
            </p>
            
          </div>

          {/* First Product Row - After Header/Paragraph */}
          <div className="relative mb-8" style={{ 
            opacity: imagesLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }}>
            {/* 72-hour badge - left side */}
            <div 
              className={`absolute left-2 sm:left-4 md:left-2 lg:left-12 -top-14 z-20 pointer-events-none transition-all duration-700 delay-400 ${
                heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
              }`}
            >
              <img 
                src="/images/cta/badge-72h.png" 
                alt="Ready 72 Hour" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>
            
            {/* Commerce badge - right side */}
            <div 
              className={`absolute right-4 sm:right-8 md:right-16 -bottom-12 z-20 pointer-events-none transition-all duration-700 delay-500 ${
                heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
              }`}
            >
              <img 
                src="/images/cta/badge-commerce.png" 
                alt="Commerce Ready" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              />
            </div>
            
            <div className={`scroller-container ${isMobile ? 'mobile-carousel' : ''}`}>
              {isMobile ? (
                <>
                  <div
                    className="mobile-carousel-track"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div
                      className="mobile-carousel-wrapper"
                      style={{
                        transform: `translateX(-${currentSlide * slideWidth}px)`
                      }}
                    >
                      <div className="scroller-slide">
                        <img src="/images/hero/perfume.webp" alt="Product 1" loading="lazy" decoding="async" />
                      </div>
                      <div className="scroller-slide">
                        <img src="/images/hero/handbottle.webp" alt="Product 2" loading="lazy" decoding="async" />
                      </div>
                      <div className="scroller-slide">
                        <img src="/images/hero/lipstick.webp" alt="Product 3" loading="lazy" decoding="async" />
                      </div>
                      <div className="scroller-slide">
                        <img src="/images/hero/serum.webp" alt="Product 4" loading="lazy" decoding="async" />
                      </div>
                      <div className="scroller-slide">
                        <img src="/images/hero/handcream.webp" alt="Product 5" loading="lazy" decoding="async" />
                      </div>
                      <div className="scroller-slide">
                        <img src="/images/hero/handbag-2.webp" alt="Product 6" loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile carousel dots */}
                  <div className="carousel-dots">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="desktop-carousel-container">
                  {/* Previous button */}
                  <button
                    onClick={handlePrevSlide}
                    className="carousel-nav-btn carousel-nav-btn-prev"
                    aria-label="Previous slide"
                  >
                    <ChevronLeftIcon className="h-8 w-8" />
                  </button>

                  <div className="scroller-wrapper" ref={desktopScrollerRef}>
                    <div className="scroller-slide">
                      <img src="/images/hero/perfume.webp" alt="Product 1" loading="lazy" decoding="async" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handbottle.webp" alt="Product 2" loading="lazy" decoding="async" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/lipstick.webp" alt="Product 3" loading="lazy" decoding="async" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/serum.webp" alt="Product 4" loading="lazy" decoding="async" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handcream.webp" alt="Product 5" loading="lazy" decoding="async" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handbag-2.webp" alt="Product 6" loading="lazy" decoding="async" />
                    </div>

                    {/* Repeat slides for seamless loop */}
                    <div className="scroller-slide">
                      <img src="/images/hero/perfume.webp" alt="Product 1" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handbottle.webp" alt="Product 2" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/lipstick.webp" alt="Product 3" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/serum.webp" alt="Product 4" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handcream.webp" alt="Product 5" />
                    </div>
                    <div className="scroller-slide">
                      <img src="/images/hero/handbag-2.webp" alt="Product 6" />
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNextSlide}
                    className="carousel-nav-btn carousel-nav-btn-next"
                    aria-label="Next slide"
                  >
                    <ChevronRightIcon className="h-8 w-8" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Platforms Logos Section */}  
          <div className={`mx-auto max-w-7xl px-8 lg:px-8 mb-8 transition-all duration-700 delay-400 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center justify-items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-7">
            <img
              alt="Zalora"
              src="/images/logos/zalora-logo.svg"
              width={60}
              height={20}
              className="col-span-2 max-h-10 lg:max-h-16 pt-4 w-full object-contain md:col-span-1 lg:col-span-1"
            />
            <img
              alt="Shopee"
              src="/images/logos/Shopee-horizontal-logo.svg"
              width={59}
              height={19}
              className="col-span-2 max-h-9 lg:max-h-14 pb-1 w-full object-contain md:col-span-1 lg:col-span-1"
            />
            <img
              alt="Amazon"
              src="/images/logos/amazon-logo.svg"
              width={60}
              height={20}
              className="col-span-2 max-h-10 lg:max-h-16 pt-4 w-full object-contain md:col-span-1 lg:col-span-1"
            />
            <img
              alt="Lazada"
              src="/images/logos/lazada-logo.svg"
              width={74}
              height={19}
              className="col-span-2 max-h-9 lg:max-h-14 pt-2 w-full object-contain md:col-span-1 lg:col-span-1"
            />
            <img
              alt="Shopify"
              src="/images/logos/shopify-logo.svg"
              width={57}
              height={17}
              className="col-span-2 col-start-2 max-h-8 lg:max-h-12 w-full object-contain sm:col-start-auto md:col-span-1 md:col-start-auto lg:col-span-1"
            />
            <img
              alt="Meta/Instagram"
              src="/images/logos/meta-logo-2.svg"
              width={60}
              height={20}
              className="col-span-2 max-h-8 lg:max-h-12 w-full object-contain sm:col-start-2 md:col-span-1 md:col-start-auto lg:col-span-1"
            />
            <img
              alt="WooCommerce"
              src="/images/logos/woocommerce-logo.svg"
              width={60}
              height={20}
              className="col-span-2 max-h-8 lg:max-h-12 w-full object-contain md:col-span-1 lg:col-span-1"
            />
           </div>

          </div>

          {/* Hero CTA Button - After Platform Logos */}
          <div className={`flex justify-center mt-12 mb-2 transition-all duration-700 delay-500 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Link
              to="/pricing"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-violet-950 text-white font-semibold rounded-[3rem] hover:bg-violet-900 transition-all duration-300 text-base sm:text-lg min-h-[48px] touch-manipulation"
            >
              get started
            </Link>
          </div>

        </div>


      </section>


      {/* Our Process Section */}
      <Suspense fallback={
        <div className="w-full h-auto flex items-center justify-center bg-gray-50">
          <div className="animate-pulse text-gray-500">Loading Process...</div>
        </div>
      }>
        <OurProcess />
      </Suspense>

      {/* Horizontal Gallery Section */}
      <Suspense fallback={
        <div className="w-full h-auto flex items-center justify-center bg-gray-50">
          <div className="animate-pulse text-gray-500">Loading Services...</div>
        </div>
      }>
        <ServicesCarousel />
      </Suspense>

      

      {/* FAQ Section */}
      <FAQ 
        id="faq"
        className={`transition-all duration-1000 delay-200 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      />

      {/* New CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer 
        scrollToSection={scrollToSection}
        openModal={openModal}
        showScrollButtons={true}
      />

      {/* AI Chat Widget */}
      {/* <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense> */}

      {/* SEO Footer */}
      <SEOFooter pageType="general" />

    </div>
  )
}

export default SprintixStudio