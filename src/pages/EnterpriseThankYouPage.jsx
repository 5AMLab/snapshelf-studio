import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Clock, Mail, ArrowRight, Home } from 'lucide-react'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'

const EnterpriseThankYouPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { name, email, inquiryRef } = location.state || {}

  useEffect(() => {
    document.title = 'Inquiry Received - Sprintix Studio Pte. Ltd.'
    window.scrollTo(0, 0)

    if (!inquiryRef) {
      navigate('/', { replace: true })
      return
    }

    sessionStorage.removeItem('sprintix_cart')
    sessionStorage.removeItem('sprintix_form')
  }, [inquiryRef, navigate])

  if (!inquiryRef) return null

  const firstName = name ? name.split(' ')[0] : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-[1000]">
        <Header showScrollButtons={false} />
      </div>
      <div className="h-[80px]" />

      {/* Hero */}
      <div className="bg-gradient-to-b from-violet-100 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-violet-950 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-800 text-sm font-medium mb-6">
            Inquiry Received
          </div>
          <h1 className="text-4xl font-bold text-violet-950 mb-4">
            {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your enterprise inquiry has been submitted. Our sales team will reach out within{' '}
            <strong>2 business hours</strong>.
          </p>
          <div className="bg-white border border-violet-100 rounded-xl px-6 py-4 inline-block shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Your reference number</p>
            <p className="text-2xl font-bold text-violet-950 font-mono tracking-wider">{inquiryRef}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* What happens next */}
          <div className="bg-white rounded-xl p-8 border border-violet-100">
            <h2 className="text-lg font-bold text-violet-950 mb-6">What happens next</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-violet-950 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Inquiry review</h4>
                  <p className="text-sm text-gray-500 mt-0.5">We review your requirements and match you with the right account manager</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-violet-950 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Discovery call</h4>
                  <p className="text-sm text-gray-500 mt-0.5">
                    We contact you{email ? ` at ${email}` : ''} to align on your workflow, volume, and delivery needs
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Custom proposal</h4>
                  <p className="text-sm text-gray-500 mt-0.5">You receive tailored pricing, SLA terms, and an onboarding timeline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-violet-100">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-violet-950 text-sm mb-1">Response time</h4>
                  <p className="text-sm text-gray-600">
                    Within 2 business hours on weekdays. Weekend submissions are handled next business day.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-violet-100">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-violet-950 text-sm mb-1">Need a faster response?</h4>
                  <p className="text-sm text-gray-600">
                    Email{' '}
                    <a href="mailto:hello@sprintix.asia" className="text-violet-600 font-medium hover:underline">
                      hello@sprintix.asia
                    </a>{' '}
                    directly with your reference number.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-violet-950 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-violet-300">Enterprise includes</h4>
              <ul className="space-y-2">
                {[
                  'Dedicated account manager',
                  'Priority queue processing',
                  'Custom SLA & delivery terms',
                  'Volume pricing from $2.50/edit',
                  'Unlimited revisions',
                ].map((item) => (
                  <li key={item} className="flex items-center text-sm text-violet-100">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-violet-950 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-800 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/support"
            className="flex items-center justify-center space-x-2 bg-white text-violet-950 px-8 py-3 rounded-xl font-semibold border border-violet-200 hover:bg-violet-50 transition-colors"
          >
            <span>Visit Help Centre</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default EnterpriseThankYouPage
