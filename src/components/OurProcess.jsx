import React, { useState, useEffect, useRef } from 'react'
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, SparklesIcon, Square3Stack3DIcon, CubeTransparentIcon, BoltIcon } from '@heroicons/react/24/outline'

const OurProcess = () => {
  const [isVisible, setIsVisible] = useState({})
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const processSteps = [
    {
      id: 'submit',
      number: '01',
      title: 'Submit',
      description: 'Share photos and requirements',
      icon: Square3Stack3DIcon,
      features: ['Project brief templates', 'Drag-drop upload']
    },
    {
      id: 'transform',
      number: '02',
      title: 'Transform',
      description: 'Pro editing within 72h',
      icon: CubeTransparentIcon,
      features: ['Professional editing', 'Quality assurance']
    },
    {
      id: 'launch',
      number: '03',
      title: 'Launch',
      description: 'Download ready-to-use assets',
      icon: BoltIcon,
      features: ['Multiple formats', 'Revision support']
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="process"
      className="pt-2 pb-2 sm:pb-4 lg:pb-8 bg-gradient-to-b from-white to-violet-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 delay-200 ${
          isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-violet-950 mb-6 leading-tight">
            Built for You
          </h2>
          <p className="text-xl text-violet-950 max-w-3xl mx-auto">
          From upload to launch in three steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative transition-all duration-700 ${
                  isVisible.process 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 300}ms` }}
              >
                {/* Step Card */}
                <div className="relative bg-violet-950 rounded-2xl p-8 border border-violet-800 transition-all duration-300 group h-full flex flex-col overflow-hidden">
                  {/* SVG Background Pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${step.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(167, 139, 250)" strokeWidth="1" />
                      </pattern>
                      <linearGradient id={`gradient-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(167, 139, 250)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="rgb(124, 58, 237)" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${step.id})`} />
                    <rect width="100%" height="100%" fill={`url(#gradient-${step.id})`} />
                  </svg>

                  {/* Icon */}
                  <div className="relative z-10 mb-12">
                    <div>
                      <step.icon className="w-12 h-12 text-violet-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mb-6">
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-xl text-violet-100">
                      {step.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="relative z-10 space-y-3 flex-grow">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        <span className="text-violet-100 text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        
      </div>
    </section>
  )
}

export default OurProcess