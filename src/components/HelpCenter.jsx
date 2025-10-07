import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './shared/Header'
import Footer from './shared/Footer'
import FAQ from './shared/FAQ'
import SEOFooter from './shared/SEOFooter'
import { 
  GETTING_STARTED_FAQ, 
  PRICING_FAQ, 
  DELIVERY_FAQ, 
  SUPPORT_FAQ, 
  LEGAL_FAQ,
  PLATFORM_FAQ,
  SERVICES_FAQ,
  TECHNICAL_FAQ
} from '../config/faq.jsx'
import { useModal } from '../context/ModalContext'
import {
  MagnifyingGlassIcon as Search,
  BookOpenIcon as Book,
  ArrowRightIcon,
  EnvelopeIcon as Mail,
  RocketLaunchIcon,
  DevicePhoneMobileIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ClockIcon,
  HeartIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

// Lazy load AI chat widget
const AIChatWidget = lazy(() => import('./AIChatWidget'))

const HelpCenter = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredQuestions, setFilteredQuestions] = useState([])

  // Handle get started click
  const handleGetStartedClick = () => {
    navigate('/pricing')
  }

  // Set page title and scroll to top
  useEffect(() => {
    document.title = 'Help Center - Sprintix Studio Pte. Ltd. | FAQ, Support & Guidance'
    window.scrollTo(0, 0)
  }, [])

  // All questions for search
  const allQuestions = [
    ...GETTING_STARTED_FAQ,
    ...PLATFORM_FAQ,
    ...SERVICES_FAQ,
    ...PRICING_FAQ,
    ...TECHNICAL_FAQ,
    ...DELIVERY_FAQ,
    ...SUPPORT_FAQ,
    ...LEGAL_FAQ
  ]

  // Filter questions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQuestions([])
    } else {
      const filtered = allQuestions.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof q.answer === 'string' && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredQuestions(filtered)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: RocketLaunchIcon,
      description: 'New to Sprintix? Start here for the basics',
      questions: GETTING_STARTED_FAQ,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'platforms',
      name: 'Platform Services',
      icon: DevicePhoneMobileIcon,
      description: 'Amazon, Shopify, Lazada optimization services',
      questions: PLATFORM_FAQ,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'services',
      name: 'Service Details',
      icon: WrenchScrewdriverIcon,
      description: 'Catalog processing, background removal, editing specifics',
      questions: SERVICES_FAQ,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'pricing',
      name: 'Pricing & Packages',
      icon: CurrencyDollarIcon,
      description: 'Understanding our pricing structure and options',
      questions: PRICING_FAQ,
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'technical',
      name: 'Technical Specs',
      icon: Cog6ToothIcon,
      description: 'File formats, resolution, brand guidelines',
      questions: TECHNICAL_FAQ,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
    },
    {
      id: 'delivery',
      name: 'Delivery & Process',
      icon: ClockIcon,
      description: 'Timeline, deliverables, and what to expect',
      questions: DELIVERY_FAQ,
      color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
    },
    {
      id: 'support',
      name: 'Support & Quality',
      icon: HeartIcon,
      description: 'Revisions, guarantees, and quality assurance',
      questions: SUPPORT_FAQ,
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
    },
    {
      id: 'legal',
      name: 'Legal & Privacy',
      icon: DocumentTextIcon,
      description: 'Terms, privacy policy, and legal information',
      questions: LEGAL_FAQ,
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage="help"
        onGetStarted={handleGetStartedClick}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-violet-100 to-white pt-8 pb-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: 'url("/images/hero/main-hero-bg-graphic.png")',
            backgroundPosition: 'center top',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-950 text-white mb-8">
            <span className="text-sm font-semibold">help center</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-violet-300 to-violet-700">How can we help you?</span>
          </h1>

          <p className="text-xl text-violet-950 mb-12 max-w-3xl mx-auto leading-normal">
            Find answers to common questions, explore our comprehensive FAQ, or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStartedClick}
              className="inline-flex items-center px-6 py-3 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-all duration-300 transform hover:scale-105"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </button>
            <a
              href="mailto:hello@sprintix.asia"
              className="inline-flex items-center px-6 py-3 border-2 border-violet-600 text-violet-600 font-semibold rounded-full hover:bg-violet-50 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="mr-2 w-4 h-4" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchTerm && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results for "{searchTerm}"
            </h2>
            {filteredQuestions.length > 0 ? (
              <FAQ 
                questions={filteredQuestions} 
                showHeader={false}
                containerClassName="max-w-4xl"
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No results found. Try a different search term.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-violet-100 text-violet-700 font-semibold rounded-full hover:bg-violet-200 transition-all duration-300 transform hover:scale-105"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Categories Section */}
      {!searchTerm && (
        <>
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Browse by Category
                </h2>
                <p className="text-xl text-gray-600">
                  Find answers organized by topic
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <div
                      key={category.id}
                      className="group relative bg-white border-2 border-gray-100 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-violet-200 hover:-translate-y-1"
                      onClick={() => {
                        const element = document.getElementById(`category-${category.id}`)
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      {/* Background Gradient on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-900 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600 mb-3 group-hover:text-gray-700 transition-colors">
                            {category.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="inline-flex items-center px-2 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full">
                              {category.questions.length} articles
                            </div>
                          </div>
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* FAQ Sections by Category */}
          {categories.map((category, index) => {
            const isOdd = index % 2 === 1
            const IconComponent = category.icon

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className={`py-12 ${isOdd ? 'bg-gradient-to-r from-violet-50 to-purple-50' : 'bg-white'}`}
              >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Enhanced Category Header */}
                  <div className="text-center mb-12">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl">
                      <IconComponent className="w-8 h-8 text-violet-600" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      {category.name}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                      <div className="h-1 w-1 bg-violet-300 rounded-full"></div>
                      <div className="h-1 w-1 bg-violet-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* FAQ Content with Reduced Padding */}
                  <div className="max-w-4xl mx-auto">
                    <FAQ
                      questions={category.questions}
                      showHeader={false}
                      containerClassName=""
                      className="py-0"
                    />
                  </div>
                </div>
              </section>
            )
          })}
        </>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-violet-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you get the most out of Sprintix Studio Pte. Ltd.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <Mail className="w-8 h-8 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed help via email</p>
              <a
                href="mailto:hello@sprintix.asia"
                className="inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold"
              >
                hello@sprintix.asia
                <ArrowRightIcon className="ml-1 w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <Book className="w-8 h-8 text-violet-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
              <p className="text-gray-600 mb-4">Ready to transform your photos?</p>
              <button
                onClick={handleGetStartedClick}
                className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-700 font-semibold rounded-full hover:bg-violet-200 transition-all duration-300 transform hover:scale-105"
              >
                Start your project
                <ArrowRightIcon className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      {/* <Suspense fallback={null}>
        <AIChatWidget />
      </Suspense> */}

      <Footer />

      {/* SEO Footer */}
      <SEOFooter pageType="help" />
    </div>
  )
}

export default HelpCenter