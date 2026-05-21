import React from 'react'
import {
  CheckCircleIcon as CheckCircle,
  SparklesIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const CustomerPersonas = () => {
  const personas = [
    {
      image: "/images/personas/ecommerce-seller.jpg",
      title: "E-commerce Entrepreneurs",
      description: "Focus on growing your business, not editing photos",
      benefits: [
        "Launch products faster",
        "Professional images in 24-48hrs",
        "Scale without hiring designers"
      ],
      icon: SparklesIcon
    },
    {
      image: "/images/personas/amazon-seller.jpg",
      title: "Amazon Sellers",
      description: "Meet marketplace standards without the stress",
      benefits: [
        "Amazon-compliant images guaranteed",
        "Consistent quality across listings",
        "More time for strategy & growth"
      ],
      icon: ChartBarIcon
    },
    {
      image: "/images/personas/small-business.jpg",
      title: "Small Business Owners",
      description: "Premium quality without premium overhead",
      benefits: [
        "Studio-quality on any budget",
        "No equipment or training needed",
        "Unlimited revisions included"
      ],
      icon: ClockIcon
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-violet-950 mb-4">
              Built for Busy Entrepreneurs
            </h2>
            <p className="text-xl text-violet-700 max-w-3xl mx-auto">
              Join thousands of sellers who've eliminated photo editing stress and reclaimed their time to focus on what matters most—growing their business.
            </p>
          </div>

          {/* Personas Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((persona, index) => {
              const Icon = persona.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-b from-violet-50 to-white rounded-2xl overflow-hidden border border-violet-100 hover:border-violet-300 transition-all hover:shadow-lg"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={persona.image}
                      alt={persona.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.classList.add('flex', 'items-center', 'justify-center')
                        e.target.parentElement.innerHTML = '<div class="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center"><svg class="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>'
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-violet-950">
                        {persona.title}
                      </h3>
                    </div>

                    <p className="text-violet-700 mb-4 text-sm leading-relaxed">
                      {persona.description}
                    </p>

                    <ul className="space-y-2">
                      {persona.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-violet-950">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-lg text-violet-700 mb-6">
              No matter your platform or product category, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-violet-600 font-medium">
              <span className="px-4 py-2 bg-violet-50 rounded-full">Shopify</span>
              <span className="px-4 py-2 bg-violet-50 rounded-full">Amazon</span>
              <span className="px-4 py-2 bg-violet-50 rounded-full">Etsy</span>
              <span className="px-4 py-2 bg-violet-50 rounded-full">Lazada</span>
              <span className="px-4 py-2 bg-violet-50 rounded-full">Shopee</span>
              <span className="px-4 py-2 bg-violet-50 rounded-full">eBay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerPersonas
