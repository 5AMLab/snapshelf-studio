import React, { useState, useEffect } from 'react'
import {
  TrophyIcon as Award,
  CheckCircleIcon as CheckCircle
} from '@heroicons/react/24/outline'

const TeamMembers = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const totalSlides = 3


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

  const teamMembers = [
    {
      name: "Farid",
      role: "Head of Production",
      image: "/images/team/farid-p.jpg"
    },
    {
      name: "Diana",
      role: "Project Manager",
      image: "/images/team/diana.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Members Content - Ready for customization */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-violet-300 to-violet-700">Our Team</span>
          </h2>
          <p className="text-xl text-violet-950 mb-12 max-w-3xl mx-auto leading-normal">
            Our team brings <span className="text-violet-600 font-semibold">15+ years of design experience</span> across Southeast Asia's premium retail landscape.
          </p>

          {/* Team Member Cards - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-violet-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white px-4 text-left">
                  <h3 className="text-lg font-medium text-violet-950 mb-0 pt-2">{member.name}</h3>
                  <p className="text-sm text-violet-600 font-medium pb-2">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Single Team Member Carousel - Mobile Only */}
          <div className="block md:hidden w-full max-w-sm mx-auto">
            <div
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border border-violet-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white px-4 text-left">
                      <h3 className="text-lg font-medium text-violet-950 mb-0 pt-2">{member.name}</h3>
                      <p className="text-sm text-violet-600 font-medium pb-2">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Carousel indicators - Outside image container */}
            <div className="flex justify-center mt-6 space-x-2">
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
        </div>
      </div>
    </section>
  )
}

export default TeamMembers