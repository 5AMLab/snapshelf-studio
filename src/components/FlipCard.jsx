import React, { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const FlipCard = ({ pkg, onAddToCart, className = "" }) => {
  const [isActive, setIsActive] = useState(false)

  const handleCardClick = () => {
    setIsActive(!isActive)
  }

  const handleLearnMore = (e) => {
    e.stopPropagation() // Prevent card flip when clicking learn more
    // Handle learn more action
    console.log('Learn more clicked for:', pkg.name)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Prevent card flip when clicking add to cart
    onAddToCart(pkg)
  }

  // Generate reviews display
  const renderStars = (rating = 5) => {
    const stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg key={i} fill="#FFC324" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    }
    return stars
  }

  // Map package data to card content
  const getCardImage = () => {
    if (pkg.id.includes('banner')) return '/images/portfolio/banner-after.jpg'
    if (pkg.id.includes('shopify')) return '/images/portfolio/touch-up-v2-after.jpg'
    if (pkg.id.includes('amazon')) return '/images/portfolio/infographic-02-after.jpg'
    if (pkg.id.includes('lazada')) return '/images/portfolio/removebg-after.jpg'
    if (pkg.id.includes('brand')) return '/images/portfolio/creative-ad.jpg'
    if (pkg.id.includes('campaign')) return '/images/portfolio/edit-sales-ad-after.jpg'
    return '/images/portfolio/banner-after.jpg'
  }

  const getReviewCount = () => {
    const counts = {
      'banner-complete': 23,
      'banner-starter': 15,
      'shopify-complete': 39,
      'amazon-complete': 31,
      'lazada-complete': 26,
      'brand-package': 18,
      'campaign-package': 29
    }
    return counts[pkg.id] || 20
  }

  return (
    <div className={`relative w-full max-w-sm mx-auto ${className}`}>
      <div 
        className={`card-container ${isActive ? 'active' : ''}`}
        style={{
          perspective: '1000px',
          width: '100%',
          maxWidth: '320px',
          height: '400px',
          minWidth: '280px',
          minHeight: '400px',
          margin: '0 auto'
        }}
      >
        <div 
          className="card"
          onClick={handleCardClick}
          style={{
            display: 'inline-block',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            transform: isActive ? 'translateZ(0px) rotateY(180deg)' : 'translateZ(-100px)',
            transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.transform = 'translateZ(0px) scale(1.02)'
              // Show shadow on hover
              const shadow = e.currentTarget.querySelector('.card-shadow')
              if (shadow) shadow.style.opacity = '1'
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.transform = 'translateZ(-100px)'
              // Hide shadow when not hovering
              const shadow = e.currentTarget.querySelector('.card-shadow')
              if (shadow) shadow.style.opacity = '0'
            }
          }}
        >
          {/* Card shadow effect - only on hover */}
          <div 
            className="card-shadow"
            style={{
              content: '',
              position: 'absolute',
              zIndex: -1,
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 14px 50px -4px hsla(0, 0%, 0%, 0.15)',
              opacity: 0,
              transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1.4)'
            }}
          />

          {/* Front Side */}
          <div 
            className="side front"
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'white',
              zIndex: 2
            }}
          >
            <div 
              className="img"
              style={{
                backgroundColor: '#dfe4ea',
                backgroundImage: `url(${getCardImage()})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '16px 16px 0 0',
                width: '100%',
                height: '250px'
              }}
            />
            <div className="info p-4">
              <h2 className="text-xl font-bold text-violet-950 mb-2 uppercase tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '700' }}>
                {pkg.name}
              </h2>
              <p className="text-gray-600 leading-5 text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '400' }}>
                {pkg.description}
              </p>
            </div>
          </div>

          {/* Back Side */}
          <div 
            className="side back"
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              backgroundColor: 'white',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="info p-4 relative h-full">
              <h2 className="text-xl font-bold text-violet-950 mb-3 mt-1 uppercase tracking-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '700' }}>
                At a glance
              </h2>
              
              {/* Reviews */}
              <div className="reviews flex items-center mb-3 cursor-pointer group">
                <div className="flex">
                  {renderStars(5)}
                </div>
                <p className="text-gray-400 font-light ml-2 mt-0.5 transition-colors duration-300 group-hover:text-violet-600 text-sm" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '300' }}>
                  {getReviewCount()} Reviews
                </p>
              </div>

              {/* Key Features */}
              <ul className="space-y-1 mb-4 pl-5">
                {pkg.deliverables?.slice(0, 3).map((item, index) => (
                  <li key={index} className="text-gray-600 text-sm leading-5 list-disc" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '400' }}>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div 
                className="btn absolute bottom-4 left-4 right-4 h-14 flex items-center justify-center rounded-xl cursor-pointer group"
                style={{
                  background: 'linear-gradient(-90deg, #7c3aed, #a855f7)',
                  backgroundColor: '#8b5cf6'
                }}
                onClick={handleAddToCart}
              >
                <h4 className="text-white font-medium uppercase transform transition-transform duration-300 group-hover:translate-x-0 translate-x-3" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', fontWeight: '600' }}>
                  Add to Cart
                </h4>
                <ArrowRightIcon 
                  className="w-6 h-6 text-white ml-1 mt-0.5 transform transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2 opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard