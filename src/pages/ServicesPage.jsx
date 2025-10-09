import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import CTASection from '../components/CTASection'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Logos from '../components/shared/Logos'
import { BoltIcon, CheckCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const ServicesPage = () => {
  const navigate = useNavigate()

  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  useEffect(() => {
    document.title = 'Services - Made for Commerce | Sprintix Studio'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onGetStarted={handleGetStartedClick} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-violet-100 to-white py-8 sm:px-6 lg:px-6 pb-8 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950 text-white mb-8">
            <span className="text-sm font-semibold">our services</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-violet-950">Made for </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-violet-300">Commerce</span>
          </h1>
          <p className="text-xl text-violet-950 max-w-3xl mx-auto">
            Professional photo editing services designed specifically for e-commerce businesses.
            From product photography to creative graphics - we help your products stand out online.
          </p>
        </div>
      </section>

      {/* Services Grid + Platform Logos */}
      <section className="pt-8 pb-16 bg-gradient-to-b from-white via-violet-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Service 1: Photo Editing */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-[600px]">
              <div className="relative overflow-hidden rounded-t-2xl flex-[3] flex items-center justify-center">
                <BeforeAfterSlider
                  beforeImage="/images/portfolio/removebg-01-before.jpg"
                  afterImage="/images/portfolio/removebg-01-after.jpg"
                  altText="Photo Editing"
                  className="!rounded-none h-full w-full [&_img]:object-cover"
                />
              </div>
              <div className="p-8 text-center flex-[1] flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Photo Editing</h3>
                <p className="text-lg text-gray-600">
                  Transform product photos into marketplace-ready images
                </p>
              </div>
            </div>

            {/* Service 2: Creative Graphics */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-[600px]">
              <div className="relative overflow-hidden rounded-t-2xl flex-[3] flex items-center justify-center">
                <BeforeAfterSlider
                  beforeImage="/images/portfolio/infographic-before.jpg"
                  afterImage="/images/portfolio/infographic-after.jpg"
                  altText="Creative Graphics"
                  className="!rounded-none h-full w-full [&_img]:object-cover"
                />
              </div>
              <div className="p-8 text-center flex-[1] flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Creative Graphics</h3>
                <p className="text-lg text-gray-600">
                  Engaging visuals that boost conversions and sales
                </p>
              </div>
            </div>

            {/* Service 3: Platform Optimization */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-[600px]">
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 to-yellow-300 flex-[3] flex items-center justify-center">
                <img
                  src="/images/hero/gadget-2.webp"
                  alt="Platform Optimization"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center flex-[1] flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Platform Optimization</h3>
                <p className="text-lg text-gray-600">
                  Perfect sizing and formatting for every marketplace
                </p>
              </div>
            </div>
          </div>

          {/* Platform Logos */}
          <Logos
            variant="default"
            showTitle={true}
            title="Optimized for every marketplace"
          />
        </div>
      </section>

      {/* Simple Process Section */}
      <section className="py-16 bg-gradient-to-b from-white to-violet-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-violet-950 mb-4">How It Works</h2>
            <p className="text-xl text-violet-950">Simple, fast, and professional</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-950 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-violet-950 mb-4">Submit Your Photos</h3>
              <p className="text-xl text-violet-950">
                Upload your product images and tell us what you need
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-950 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-violet-950 mb-4">We Edit & Optimize</h3>
              <p className="text-xl text-violet-950">
                Our team transforms your images within 72 hours
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-950 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-violet-950 mb-4">Download & Sell</h3>
              <p className="text-xl text-violet-950">
                Download and start selling immediately
              </p>
            </div>
          </div>

          {/* Key Features Below Process */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border border-violet-100">
              <div className="flex justify-center mb-2">
                <BoltIcon className="w-8 h-8 text-lime-500" />
              </div>
              <h4 className="font-bold text-violet-950 mb-2">Expert Designers</h4>
              <p className="text-sm text-violet-950">Pro team with e-commerce expertise</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-violet-100">
              <div className="flex justify-center mb-2">
                <CheckCircleIcon className="w-8 h-8 text-lime-500" />
              </div>
              <h4 className="font-bold text-violet-950 mb-2">Commercial License</h4>
              <p className="text-sm text-violet-950">Full rights to use images anywhere</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-violet-100">
              <div className="flex justify-center mb-2">
                <RocketLaunchIcon className="w-8 h-8 text-lime-500" />
              </div>
              <h4 className="font-bold text-violet-950 mb-2">Satisfaction Guaranteed</h4>
              <p className="text-sm text-violet-950">We refine until you're 100% happy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  )
}

export default ServicesPage