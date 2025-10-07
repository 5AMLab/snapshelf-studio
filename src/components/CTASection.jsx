import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon, CheckCircleIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useModal } from '../context/ModalContext'

const CTASection = () => {
  const { openModal } = useModal()
  const [showBadges, setShowBadges] = useState({
    hourBadge: false,
    easyBadge: false,
    commerceBadge: false,
    bottomEasyBadge: false
  })
  const [showText, setShowText] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true)
            observer.unobserve(entry.target) // Stop observing once triggered
          }
        })
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isInView])

  useEffect(() => {
    // Only start animations when section is in view
    if (!isInView) return

    // Force reset by using a microtask
    Promise.resolve().then(() => {
      setShowText(false)
      setShowBadges({
        hourBadge: false,
        easyBadge: false,
        commerceBadge: false,
        bottomEasyBadge: false
      })
    })

    // Show text first
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 300)

    // Show badges with staggered delays
    const timer1 = setTimeout(() => {
      setShowBadges(prev => ({ ...prev, easyBadge: true }))
    }, 600)

    const timer2 = setTimeout(() => {
      setShowBadges(prev => ({ ...prev, hourBadge: true }))
    }, 900)

    const timer3 = setTimeout(() => {
      setShowBadges(prev => ({ ...prev, commerceBadge: true }))
    }, 1200)

    const timer4 = setTimeout(() => {
      setShowBadges(prev => ({ ...prev, bottomEasyBadge: true }))
    }, 1500)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-violet-100 to-white relative min-h-[80vh] overflow-visible" style={{ isolation: 'isolate' }}>
      {/* Background graphic overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero/hero-bg-graphic.png")',
          backgroundPosition: 'center center',
          backgroundSize: '1200px auto',
          backgroundRepeat: 'no-repeat',
          
        }}
      ></div>

      <div className="w-full text-center relative z-10 flex flex-col items-center justify-center min-h-[60vh]" style={{ borderRadius: '0' }}>
        {/* 72-Hour Badge - Above heading top-left */}
        <div className="relative w-full max-w-4xl mx-auto">
          {showBadges.hourBadge && (
            <div 
              className="absolute top-0 -left-18 sm:top-0 sm:-left-16 md:-left-8 lg:left-0 xl:left-8 z-20"
              style={{
                animation: 'fadeInBounceLeft 0.6s ease-out both'
              }}
            >
            <img 
              src="/images/cta/badge-72h.png" 
              alt="Ready 72 Hour" 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
            />
            </div>
          )}
        </div>


        {/* Main Heading */}
        <div className="relative">
          <h2 
            className={`text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight transition-all duration-700 delay-100 px-4 sm:px-0 ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-violet-950">Ready to</span>
            <br />
            <span className="text-transparent text-pretty bg-clip-text bg-gradient-to-r from-violet-700 to-violet-300">get started?</span>
          </h2>
          
          {/* Bottom Badge - positioned relative to heading */}
          {showBadges.commerceBadge && (
            <div 
              className="hidden sm:block absolute -bottom-16 -right-40 sm:-bottom-20 sm:-right-52 lg:-right-60 xl:-right-52 z-20 pointer-events-none"
              style={{
                animation: 'fadeInBounce 0.6s ease-out both'
              }}
            >
              <img 
                src="/images/cta/badge-commerce.png" 
                alt="" 
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
                
              />
            </div>
          )}
        </div>

        {/* Subheading */}
        <p 
          className={`text-xl text-gray-900 mb-8 max-w-2xl mx-auto px-4 sm:px-0 transition-all duration-700 delay-200 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Professional edits from <span className="font-bold text-violet-950">$11.9</span> per asset
        </p>

        {/* Trust Indicators */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 sm:mb-12 transition-all duration-700 delay-300 ${
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-start space-x-2 text-left">
            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-900 text-lg">satisfaction guarantee</span>
          </div>
          <div className="flex items-start space-x-2 text-left">
            <ClockIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-900 text-lg">ready in 72-hour</span>
          </div>
          <div className="flex items-start space-x-2 text-left">
            <UsersIcon className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-900 text-lg">dedicated designer</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0 transition-all duration-700 delay-400 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => openModal('pricing')}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-violet-950 font-semibold rounded-[3rem] border-2 border-violet-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-300 text-base sm:text-lg min-h-[48px] touch-manipulation"
          >
            pricing
          </button>
          <Link
            to="/pricing"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-violet-950 text-white font-semibold rounded-[3rem] hover:bg-violet-900 transition-all duration-300 text-base sm:text-lg min-h-[48px] touch-manipulation"
          >
            get started
          </Link>
        </div>


      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes fadeInBounceLeft {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(10deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.1) rotate(-5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </section>
  )
}

export default CTASection