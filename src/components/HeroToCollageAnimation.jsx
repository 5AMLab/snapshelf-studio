import React, { useEffect, useRef, useState } from 'react'
import './HeroToCollageAnimation.css'

const HeroToCollageAnimation = () => {
  const containerRef = useRef(null)
  const heroImageRef = useRef(null)
  const heroOverlayRef = useRef(null)
  const galleryItemsRef = useRef([])
  const flipFrontRef = useRef(null)
  const flipBackRef = useRef(null)
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(false)

  useEffect(() => {
    // Feature detection for animation-timeline
    const checkScrollTimelineSupport = () => {
      try {
        const testElement = document.createElement('div')
        testElement.style.animationTimeline = 'scroll()'
        return testElement.style.animationTimeline === 'scroll()'
      } catch (e) {
        return false
      }
    }

    const hasSupport = checkScrollTimelineSupport()
    setSupportsScrollTimeline(hasSupport)

    // If no native support, implement JavaScript fallback
    if (!hasSupport) {
      const handleScroll = () => {
        if (!containerRef.current) return

        const container = containerRef.current
        const rect = container.getBoundingClientRect()
        const containerHeight = container.offsetHeight
        const viewportHeight = window.innerHeight
        
        // Calculate scroll progress (0 to 1)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const containerTop = scrollTop + rect.top
        const scrollProgress = Math.max(0, Math.min(1, 
          (scrollTop - containerTop + viewportHeight) / (containerHeight + viewportHeight)
        ))

        // Hero image and overlay animations (0% to 50% of scroll)
        const heroProgress = Math.max(0, Math.min(1, scrollProgress * 2))
        
        if (heroImageRef.current && heroOverlayRef.current) {
          const scale = 1 - (heroProgress * 0.4) // Scale from 1 to 0.6
          const translateY = heroProgress * -40 // Move up by 40px
          const opacity = 1 - heroProgress // Fade out
          
          heroImageRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`
          heroImageRef.current.style.opacity = opacity
          heroOverlayRef.current.style.opacity = heroProgress > 0.3 ? 0 : 1 - (heroProgress * 3.33)
        }

        // Gallery items reveal (20% to 80% of scroll)
        const galleryStart = 0.2
        const galleryEnd = 0.8
        const galleryProgress = Math.max(0, Math.min(1, 
          (scrollProgress - galleryStart) / (galleryEnd - galleryStart)
        ))

        galleryItemsRef.current.forEach((item, index) => {
          if (item) {
            const itemDelay = index * 0.1
            const itemProgress = Math.max(0, Math.min(1, galleryProgress - itemDelay))
            
            const opacity = itemProgress
            const scale = 0.8 + (itemProgress * 0.2) // Scale from 0.8 to 1
            const translateY = (1 - itemProgress) * 40 // Move from 40px down to 0
            
            item.style.opacity = opacity
            item.style.transform = `scale(${scale}) translateY(${translateY}px)`
          }
        })

        // Footer flip animation (70% to 90% of scroll)
        const flipStart = 0.7
        const flipEnd = 0.9
        const flipProgress = Math.max(0, Math.min(1, 
          (scrollProgress - flipStart) / (flipEnd - flipStart)
        ))

        if (flipFrontRef.current && flipBackRef.current) {
          const frontRotation = flipProgress * -180
          const backRotation = 180 - (flipProgress * 180)
          
          flipFrontRef.current.style.transform = `rotateY(${frontRotation}deg)`
          flipBackRef.current.style.transform = `rotateY(${backRotation}deg)`
        }
      }

      // Set initial styles for fallback
      if (heroImageRef.current) {
        heroImageRef.current.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out'
      }
      if (heroOverlayRef.current) {
        heroOverlayRef.current.style.transition = 'opacity 0.1s ease-out'
      }
      
      galleryItemsRef.current.forEach(item => {
        if (item) {
          item.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out'
          item.style.opacity = '0'
          item.style.transform = 'scale(0.8) translateY(40px)'
        }
      })

      if (flipFrontRef.current && flipBackRef.current) {
        flipFrontRef.current.style.transition = 'transform 0.2s ease-out'
        flipBackRef.current.style.transition = 'transform 0.2s ease-out'
      }

      // Add scroll listener with throttling
      let ticking = false
      const throttledHandleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', throttledHandleScroll, { passive: true })
      
      // Initial call
      handleScroll()

      return () => {
        window.removeEventListener('scroll', throttledHandleScroll)
      }
    }
  }, [])

  return (
    <div className="hero-to-collage-container" ref={containerRef}>
      {/* Feature detection indicator */}
      {!supportsScrollTimeline && (
        <div className="js-fallback-indicator" style={{
          position: 'fixed', 
          top: '100px', 
          right: '20px', 
          background: 'rgba(139, 92, 246, 0.9)', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: '6px', 
          fontSize: '12px', 
          zIndex: 1002
        }}>
          JS Fallback Active
        </div>
      )}
      
      {/* Main scroll container */}
      <div className="scroll-container">
        
        {/* Hero section - single full-screen image */}
        <section className="hero-section">
          <div className="hero-image-container">
            <img 
              ref={heroImageRef}
              src="/images/hero/transformation-1.webp" 
              alt="Professional product photography transformation"
              className="hero-image"
              loading="eager"
            />
            <div className="hero-overlay" ref={heroOverlayRef}>
              <h1 className="hero-title">Transform Your Product Photos</h1>
              <p className="hero-subtitle">Professional editing that makes your products stand out</p>
            </div>
          </div>
        </section>

        {/* Gallery section - 5x3 photo collage */}
        <section className="gallery-section">
          <div className="gallery-grid">
            {/* Row 1 */}
            <div className="gallery-item" style={{'--delay': '0s'}} ref={el => galleryItemsRef.current[0] = el}>
              <img src="/images/portfolio/touch-up-v2-after.jpg" alt="Touch-up editing example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.1s'}} ref={el => galleryItemsRef.current[1] = el}>
              <img src="/images/portfolio/removebg-01-after.jpg" alt="Background removal example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.2s'}} ref={el => galleryItemsRef.current[2] = el}>
              <img src="/images/portfolio/bulk-resizing-after.jpg" alt="Bulk resizing example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.3s'}} ref={el => galleryItemsRef.current[3] = el}>
              <img src="/images/portfolio/infographic-02-after.jpg" alt="Infographic design example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.4s'}} ref={el => galleryItemsRef.current[4] = el}>
              <img src="/images/portfolio/banner-after.gif" alt="Banner design example" loading="lazy" />
            </div>

            {/* Row 2 */}
            <div className="gallery-item" style={{'--delay': '0.5s'}} ref={el => galleryItemsRef.current[5] = el}>
              <img src="/images/portfolio/edit-sales-ad-after.jpg" alt="Sales ad creation example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.6s'}} ref={el => galleryItemsRef.current[6] = el}>
              <img src="/images/hero/transformation-2.webp" alt="Product transformation example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.7s'}} ref={el => galleryItemsRef.current[7] = el}>
              <img src="/images/hero/transformation-3.webp" alt="Professional editing example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.8s'}} ref={el => galleryItemsRef.current[8] = el}>
              <img src="/images/hero/transformation-4.webp" alt="Creative design example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '0.9s'}} ref={el => galleryItemsRef.current[9] = el}>
              <img src="/images/portfolio/creative-ad.jpg" alt="Creative advertisement example" loading="lazy" />
            </div>

            {/* Row 3 */}
            <div className="gallery-item" style={{'--delay': '1.0s'}} ref={el => galleryItemsRef.current[10] = el}>
              <img src="/images/portfolio/bg-remove-v2-after.webp" alt="Background removal v2 example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '1.1s'}} ref={el => galleryItemsRef.current[11] = el}>
              <img src="/images/portfolio/touch-up-after.jpg" alt="Touch-up after example" loading="lazy" />
            </div>
            <div className="gallery-item center-item" style={{'--delay': '1.2s'}} ref={el => galleryItemsRef.current[12] = el}>
              <img src="/images/hero/edit-v2-03.jpg" alt="Professional edit showcase" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '1.3s'}} ref={el => galleryItemsRef.current[13] = el}>
              <img src="/images/portfolio/infographic-after.jpg" alt="Infographic after example" loading="lazy" />
            </div>
            <div className="gallery-item" style={{'--delay': '1.4s'}} ref={el => galleryItemsRef.current[14] = el}>
              <img src="/images/portfolio/bulkresize-after.jpg" alt="Bulk resize after example" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Footer section with playful gag */}
        <section className="footer-section">
          <div className="footer-content">
            <div className="footer-gag">
              <span className="gag-text">✨ Magic happens here ✨</span>
              <div className="flip-animation">
                <span className="flip-front" ref={flipFrontRef}>📸</span>
                <span className="flip-back" ref={flipBackRef}>🎨</span>
              </div>
            </div>
            <p className="footer-description">
              From ordinary photos to extraordinary results
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}

export default HeroToCollageAnimation