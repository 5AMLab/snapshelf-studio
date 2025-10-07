import React, { useState } from 'react'
import { FAQ_DATA } from '../../config/faq.jsx'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full px-0 py-6 text-left hover:text-violet-600 transition-colors flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-gray-900 pr-4">{question}</span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-gray-600"></div>
            </div>
          ) : (
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-gray-600"></div>
              <div className="w-0.5 h-4 bg-gray-600 absolute"></div>
            </div>
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-0 pb-6 -mt-2">
          <div className="text-gray-600 text-base leading-relaxed pr-10">
            {typeof answer === 'string' ? <p>{answer}</p> : answer}
          </div>
        </div>
      )}
    </div>
  )
}

const FAQ = ({ 
  id,
  title = "Got Questions?",
  subtitle = "Quick answers about our services",
  className = "",
  containerClassName = "",
  questions = FAQ_DATA,
  showHeader = true 
}) => {
  return (
    <section id={id} className={`py-16 pb-24 ${className}`}>
      <div className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 ${containerClassName}`}>
        <div className="text-center">
          {/* Centered Header */}
          {showHeader && (
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-violet-950 mb-4">
                {title}
              </h2>
              <p className="text-xl text-pretty text-violet-950 tracking-[.0015em]">
                {subtitle}
              </p>
            </div>
          )}
          
          {/* Centered FAQ Items */}
          <div className="space-y-0 bg-transparent rounded-lg divide-y divide-gray-200 text-left">
            {questions.map((faq) => (
              <FAQItem 
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ