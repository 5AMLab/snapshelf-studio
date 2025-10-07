import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalGallery.css'

gsap.registerPlugin(ScrollTrigger)

const HorizontalGallery = () => {
  const galleryRef = useRef(null)
  const stripRef = useRef(null)

  const portfolioImages = [
    {
      src: '/images/portfolio/service-1.webp',
      alt: 'Background removal service - professional product photography',
      title: 'Product Touch-ups'
    },
    {
      src: '/images/portfolio/service-2.webp',
      alt: 'Product touch-up and enhancement',
      title: 'Remove Background'
    },
    {
      src: '/images/portfolio/service-3.webp',
      alt: 'Custom infographic design for e-commerce',
      title: 'Cropping & Resizing'
    },
    {
      src: '/images/portfolio/service-4.webp',
      alt: 'Creative advertising design',
      title: 'Catalog Processing'
    },
    {
      src: '/images/portfolio/removebg-01-after.jpg',
      alt: 'Professional background removal',
      title: 'Processing'
    }
  ]

  useEffect(() => {
    if (!galleryRef.current || !stripRef.current) return

    const gallery = galleryRef.current
    const strip = stripRef.current

    let pinWrapWidth
    let horizontalScrollLength

    function refresh() {
      pinWrapWidth = strip.scrollWidth
      horizontalScrollLength = pinWrapWidth - window.innerWidth
    }

    refresh()

    const scrollTrigger = ScrollTrigger.create({
      trigger: gallery,
      pin: gallery,
      scrub: 0.2,
      start: 'center center',
      end: () => `+=${pinWrapWidth}`,
      invalidateOnRefresh: true,
      animation: gsap.to(strip, {
        x: () => -horizontalScrollLength + window.innerWidth * 0.05,
        ease: 'none'
      })
    })

    const refreshHandler = () => refresh()
    ScrollTrigger.addEventListener('refreshInit', refreshHandler)

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.removeEventListener('refreshInit', refreshHandler)
    }
  }, [])

  return (
    <div className="horizontal-gallery-section bg-gradient-to-b from-violet-50 to-white">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">Our Services</h2>
      </div>

      <section ref={galleryRef} className="horizontal-gallery">
        <div className="horiz-gallery-wrapper">
          <div ref={stripRef} className="horiz-gallery-strip">
            {portfolioImages.map((image, index) => (
              <div key={index} className="project-wrap">
                <div className="image-container relative">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                  />
                  
                  {/* Title overlay inside image */}
                  {image.title && (
                    <div className="title-overlay">
                      <h3 className="title-text">
                        {image.title}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default HorizontalGallery