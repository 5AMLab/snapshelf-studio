import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Amazon Seller",
      platform: "Health & Beauty",
      rating: 5,
      quote: "Sprintix transformed our product listings. Our conversion rate increased by 35% within the first month. The turnaround time is incredible—what used to take us days now takes hours.",
      initials: "SC",
      color: "bg-violet-500"
    },
    {
      name: "Marcus Rodriguez",
      role: "Shopify Store Owner",
      platform: "Fashion & Accessories",
      rating: 5,
      quote: "Finally, a service that understands e-commerce. They don't just edit photos—they optimize them for sales. Our bounce rate dropped significantly after switching to their professionally edited images.",
      initials: "MR",
      color: "bg-purple-500"
    },
    {
      name: "Priya Sharma",
      role: "Lazada Seller",
      platform: "Home & Kitchen",
      rating: 5,
      quote: "I was skeptical at first, but the quality exceeded my expectations. The team understands platform requirements perfectly. I've saved over 10 hours per week and my listings look more professional than ever.",
      initials: "PS",
      color: "bg-indigo-500"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6">
              <CheckBadgeIcon className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">VERIFIED REVIEWS</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-violet-950 mb-4">
              Don't Just Take Our Word For It
            </h2>
            <p className="text-xl text-violet-700 max-w-3xl mx-auto">
              Hear from entrepreneurs who've transformed their product listings with Sprintix.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-violet-100 hover:border-violet-300 transition-all hover:shadow-lg flex flex-col"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-violet-950 leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center pt-4 border-t border-violet-100">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-violet-950">{testimonial.name}</div>
                    <div className="text-sm text-violet-600">{testimonial.role}</div>
                    <div className="text-xs text-violet-500">{testimonial.platform}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators - Simple version without fake numbers */}
          <div className="bg-white rounded-2xl p-8 border border-violet-200">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-violet-950 mb-1">5.0 Rating</div>
                <div className="text-sm text-violet-600">From verified customers</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-violet-950 mb-2">24-48hr</div>
                <div className="text-sm text-violet-600">Average turnaround time</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-violet-950 mb-2">100%</div>
                <div className="text-sm text-violet-600">Satisfaction guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
