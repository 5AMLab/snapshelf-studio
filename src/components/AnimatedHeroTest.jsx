import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import {
  ArrowRightIcon,
  StarIcon,
  SparklesIcon,
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const AnimatedHeroTest = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const heroRef = useRef(null)

  const teamMembers = [
    { 
      name: "Sarah Chen", 
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      name: "David Kim", 
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    { 
      name: "Maria Rodriguez", 
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    { 
      name: "Jessica Wong", 
      role: "Photo Editor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwcGVvcGxlfGVufDB8fDB8fHww"
    },
    { 
      name: "Alex Thompson", 
      role: "Marketing Lead",
      image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2Zlc3Npb25hbCUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    { 
      name: "Michael Chen", 
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]

  useEffect(() => {
    document.title = 'Animated Hero Test | SwiftPixel'
    setIsVisible(true)

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        updateCarousel(currentIndex - 1)
      } else if (e.key === 'ArrowRight') {
        updateCarousel(currentIndex + 1)
      }
    }

    // Touch navigation
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      const swipeThreshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          updateCarousel(currentIndex + 1)
        } else {
          updateCarousel(currentIndex - 1)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentIndex])

  const updateCarousel = (newIndex) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 800)
  }

  const handlePrevious = () => {
    updateCarousel(currentIndex - 1)
  }

  const handleNext = () => {
    updateCarousel(currentIndex + 1)
  }

  const handleDotClick = (index) => {
    updateCarousel(index)
  }

  const handleCardClick = (index) => {
    updateCarousel(index)
  }

  const getCardClass = (index) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length
    
    if (offset === 0) return 'carousel-card-center'
    if (offset === 1) return 'carousel-card-right-1'
    if (offset === 2) return 'carousel-card-right-2'
    if (offset === teamMembers.length - 1) return 'carousel-card-left-1'
    if (offset === teamMembers.length - 2) return 'carousel-card-left-2'
    return 'carousel-card-hidden'
  }

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header 
          showScrollButtons={false}
          currentPage="test"
          onGetStarted={handleGetStartedClick}
        />
      </div>

      <div className="h-[80px]"></div>

      {/* 3D Team Carousel Hero Section */}
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
            onClick={handlePrevious}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="carousel-track">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`carousel-card ${getCardClass(index)}`}
                onClick={() => handleCardClick(index)}
              >
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="carousel-card-image"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            className="carousel-nav-arrow carousel-nav-right"
            onClick={handleNext}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Member Info */}
        <div className="carousel-member-info">
          <h2 className="carousel-member-name">
            {teamMembers[currentIndex].name}
          </h2>
          <p className="carousel-member-role">
            {teamMembers[currentIndex].role}
          </p>
        </div>

       
      </section>

      {/* Demo Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              This is a test page for the animated hero
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The hero section above demonstrates various animation techniques
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />

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
          filter: grayscale(100%);
        }

        .carousel-card-left-1 {
          z-index: 5;
          transform: translateX(-200px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .carousel-card-left-1 .carousel-card-image {
          filter: grayscale(100%);
        }

        .carousel-card-right-1 {
          z-index: 5;
          transform: translateX(200px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .carousel-card-right-1 .carousel-card-image {
          filter: grayscale(100%);
        }

        .carousel-card-right-2 {
          z-index: 1;
          transform: translateX(400px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .carousel-card-right-2 .carousel-card-image {
          filter: grayscale(100%);
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

        

        .carousel-member-name::before {
          left: -120px;
        }

        .carousel-member-name::after {
          right: -120px;
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

        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 60px;
        }

        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(8, 42, 123, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background: rgb(8, 42, 123);
          transform: scale(1.2);
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

          .carousel-member-name::before,
          .carousel-member-name::after {
            width: 50px;
          }

          .carousel-member-name::before {
            left: -70px;
          }

          .carousel-member-name::after {
            right: -70px;
          }
        }
      `}</style>
    </>
  )
}

export default AnimatedHeroTest