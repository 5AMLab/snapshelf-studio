import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import CTASection from '../components/CTASection'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
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

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950 text-white mb-8">
            <span className="text-sm font-semibold">our services</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-violet-300 to-violet-700">Made for Commerce</span>
          </h1>
          <p className="text-xl text-violet-950 max-w-3xl mx-auto">
            Professional photo editing services designed specifically for e-commerce businesses.
            From product photography to creative graphics - we help your products stand out online.
          </p>
        </div>
      </section>

      {/* Services Grid + Platform Logos */}
      <section className="pt-8 pb-16 bg-gradient-to-b from-white via-violet-100 to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
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
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-violet-950">Optimized for every marketplace</p>
          </div>

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
      </section>

      {/* Simple Process Section */}
      <section className="py-16 bg-gradient-to-b from-white to-violet-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
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