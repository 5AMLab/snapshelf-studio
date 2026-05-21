import React, { useState, useEffect } from 'react'
import {
  TrophyIcon as Award,
  CheckCircleIcon as CheckCircle,
  AcademicCapIcon,
  BriefcaseIcon,
  SparklesIcon
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
      name: "Ollie",
      role: "Lead Photo Editor",
      image: "/images/team/Ollie.jpg"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Team Members Content - Ready for customization */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-violet-950 mb-8">
            Our Team
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

          {/* New Credentials & Expertise Section */}
          <div className="mt-20 pt-16 border-t border-violet-200">
            <h3 className="text-3xl md:text-4xl font-bold text-violet-950 mb-4">
              Expertise That Delivers Results
            </h3>
            <p className="text-lg text-violet-700 mb-12 max-w-2xl mx-auto">
              Our team combines deep industry knowledge with proven execution across thousands of successful projects.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              {/* Experience Card */}
              <div className="bg-white rounded-xl p-6 border border-violet-100 hover:border-violet-300 transition-colors">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <BriefcaseIcon className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="text-xl font-semibold text-violet-950 mb-3">15+ Years Combined Experience</h4>
                <ul className="space-y-2 text-violet-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Southeast Asia's premium retail brands</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>E-commerce platforms: Amazon, Shopify, Lazada</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>10,000+ products photographed & edited</span>
                  </li>
                </ul>
              </div>

              {/* Certifications Card */}
              <div className="bg-white rounded-xl p-6 border border-violet-100 hover:border-violet-300 transition-colors">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="text-xl font-semibold text-violet-950 mb-3">Professional Credentials</h4>
                <ul className="space-y-2 text-violet-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Adobe Certified Professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Advanced color grading specialists</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Amazon imaging standards experts</span>
                  </li>
                </ul>
              </div>

              {/* Quality & Speed Card */}
              <div className="bg-white rounded-xl p-6 border border-violet-100 hover:border-violet-300 transition-colors">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <SparklesIcon className="w-6 h-6 text-violet-600" />
                </div>
                <h4 className="text-xl font-semibold text-violet-950 mb-3">Proven Track Record</h4>
                <ul className="space-y-2 text-violet-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>98% client satisfaction rate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>24-48hr turnaround guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unlimited revisions included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="mt-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">15+</div>
                  <div className="text-violet-100 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">10K+</div>
                  <div className="text-violet-100 text-sm">Products Edited</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
                  <div className="text-violet-100 text-sm">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1">24-48hr</div>
                  <div className="text-violet-100 text-sm">Turnaround Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamMembers