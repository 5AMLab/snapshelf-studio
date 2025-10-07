import React, { useEffect } from 'react'
import { Calendar, Clock, Video, CheckCircle } from 'lucide-react'

const CalendlyBooking = ({ selectedPackage }) => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Pre-fill Calendly with package information
  const calendlyUrl = selectedPackage 
    ? `https://calendly.com/sprintix/project-consultation?name=&email=&a1=${selectedPackage.name}&a2=${selectedPackage.price}`
    : 'https://calendly.com/sprintix/project-consultation'

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Step 2: Schedule Your Consultation
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Book a free 30-minute consultation to discuss your project details and get a personalized quote
        </p>
      </div>

      {/* Selected Package Summary */}
      {selectedPackage && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-900">
                Consultation for: {selectedPackage.name} Package
              </h4>
              <p className="text-purple-700 text-sm">{selectedPackage.price} • {selectedPackage.features[0]}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      )}

      {/* What to Expect */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">30 Minutes</h4>
          <p className="text-sm text-gray-600">Quick but thorough project review</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <Video className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Video Call</h4>
          <p className="text-sm text-gray-600">Screen sharing to review your assets</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Instant Quote</h4>
          <p className="text-sm text-gray-600">Walk away with final pricing</p>
        </div>
      </div>

      {/* Calendly Widget */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div 
          className="calendly-inline-widget" 
          data-url={calendlyUrl}
          style={{ minWidth: '320px', height: '630px' }}
        />
      </div>

      {/* Backup Contact Options */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Can't find a suitable time? Contact us directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:hello@sprintix.asia?subject=Consultation Request - Sprintix Studio Pte. Ltd.&body=Hi! I'd like to schedule a consultation for the package I selected on your website."
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Email Us
          </a>
          <a 
            href={`https://wa.me/6581234567?text=Hi! I'd like to schedule a consultation for ${selectedPackage?.name || 'a'} package with Sprintix Studio Pte. Ltd.`}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default CalendlyBooking