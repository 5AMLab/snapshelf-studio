import React, { useEffect, useRef, useState } from 'react'

const FeatureV2 = () => {
  const headingRef = useRef(null)
  const sectionRef = useRef(null)
  const [showSticker, setShowSticker] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    console.log('FeatureV2: Component mounted')
    
    // Preload images immediately (lightweight)
    const preloadImages = [
      '/images/hero/hero-bg-graphic.png',
      '/images/hero/sticker-graphic.png',
      '/images/hero/sticker-graphic-2.png'
    ]
    
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Intersection Observer to detect when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            console.log('FeatureV2: Section visible, starting animation')
            setIsVisible(true)
            observer.unobserve(entry.target) // Stop observing once triggered
          }
        })
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Separate effect for GSAP loading - only when visible
  useEffect(() => {
    if (!isVisible || scriptsLoaded) return

    // Optimized GSAP script loading (only load what we need)
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const initMaskedTextReveal = () => {
      console.log('FeatureV2: Attempting to initialize text reveal')
      const heading = headingRef.current
      if (!heading) {
        console.warn('FeatureV2: Heading element not found')
        return
      }

      // Safari-specific: Wait for GSAP to be fully loaded
      if (!window.gsap || !window.SplitText || !window.CustomEase) {
        console.log('FeatureV2: GSAP libraries not ready, retrying...')
        setTimeout(initMaskedTextReveal, 50)
        return
      }

      console.log('FeatureV2: GSAP libraries loaded, initializing...')
      const { gsap, SplitText, CustomEase } = window

      try {
        // Register plugins and create custom ease
        gsap.registerPlugin(SplitText, CustomEase)
        CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1")

        // Safari-specific: Add delay before creating SplitText
        requestAnimationFrame(() => {
          // Create split text with line masking for proper reveal effect
          SplitText.create(heading, {
            type: "lines, words",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word"
          })

          // Safari-specific: Wait for DOM to update
          requestAnimationFrame(() => {
            const targets = heading.querySelectorAll('.word')
            
            if (targets.length === 0) {
              console.warn('No word targets found, retrying...')
              setTimeout(initMaskedTextReveal, 100)
              return
            }
            
            // Show heading and animate
            gsap.set(heading, { opacity: 1 })
            gsap.fromTo(
              targets,
              { yPercent: 110 },
              { 
                yPercent: 0, 
                duration: 0.6, 
                stagger: 0.06, 
                ease: "osmo-ease",
                onComplete: () => setShowSticker(true)
              }
            )
          })
        })
      } catch (error) {
        console.warn('GSAP initialization failed:', error)
        // Fallback: Show text without animation
        heading.style.opacity = '1'
        setShowSticker(true)
      }
    }

    // Load only required GSAP scripts
    console.log('FeatureV2: Loading GSAP scripts...')
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/CustomEase.min.js')
    ]).then(() => {
      console.log('FeatureV2: GSAP scripts loaded successfully')
      // Safari-specific: Longer delays for better compatibility
      const fontTimeout = setTimeout(initMaskedTextReveal, 200)
      
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          console.log('FeatureV2: Fonts ready')
          clearTimeout(fontTimeout)
          // Safari-specific: Additional delay after fonts load
          setTimeout(initMaskedTextReveal, 50)
        }).catch(() => {
          console.warn('FeatureV2: Fonts.ready failed, using fallback')
          // Fallback if fonts.ready fails in Safari
          clearTimeout(fontTimeout)
          setTimeout(initMaskedTextReveal, 300)
        })
      }
    }).catch((error) => {
      console.error('FeatureV2: GSAP script loading failed:', error)
      // Show text without animation as fallback
      const heading = headingRef.current
      if (heading) {
        console.log('FeatureV2: Showing fallback text')
        heading.style.opacity = '1'
        setShowSticker(true)
      }
    })

    setScriptsLoaded(true)
  }, [isVisible, scriptsLoaded])

  return (
    <section 
      ref={sectionRef}
      className="flex justify-center items-center min-h-[60vh] py-16 bg-gradient-to-b from-white to-violet-50 relative overflow-hidden"
    >
      {/* Background graphic overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/hero/hero-bg-graphic.png")',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-y',
          opacity: 1
        }}
      ></div>
      
      {/* Lightweight background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-violet-300/20 to-transparent rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-blue-300/20 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-5xl mx-auto px-5">
        <div className="relative">
          <h1 
            ref={headingRef}
            className="text-center font-medium text-4xl sm:text-5xl lg:text-6xl leading-tight text-violet-950 mb-0 geist-heading"
            data-split="heading"
            style={{ 
              lineHeight: '1.05',
              opacity: 0
            }}
          >
            We transform your product photos into polished banners, thumbnails, and infographics for Lazada, Amazon & Instagram ready to launch.
          </h1>
          
          {/* Sticker graphic - top left of text */}
          {showSticker && (
            <div 
              className="absolute top-0 left-0 -translate-x-8 -translate-y-4 z-20 pointer-events-none"
              style={{
                width: '102px',
                height: '102px',
                backgroundImage: 'url("/images/hero/sticker-graphic-2.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                animation: 'fadeInBounceLeft 0.6s ease-out 0.2s both'
              }}
            ></div>
          )}

          {/* Sticker graphic - bottom right of text */}
          {showSticker && (
            <div 
              className="absolute bottom-0 right-0 translate-x-8 translate-y-4 z-20 pointer-events-none animate-bounce"
              style={{
                width: '102px',
                height: '102px',
                backgroundImage: 'url("/images/hero/sticker-graphic.png")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                animation: 'fadeInBounce 0.6s ease-out 0.4s both'
              }}
            ></div>
          )}
        </div>
        
      </div>

      {/* Line masking styles and Geist font - required for proper animation */}
      <style jsx>{`
        .geist-heading {
          font-family: "Geist", sans-serif;
          font-optical-sizing: auto;
          font-weight: 600;
          font-style: normal;
          line-height: 1.05;
        }
        .line {
          overflow: hidden;
          padding-bottom: 0.1em;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        .word {
          display: inline-block;
        }
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateX(2rem) translateY(1rem) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateX(2rem) translateY(1rem) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateX(2rem) translateY(1rem) scale(1);
          }
        }
        @keyframes fadeInBounceLeft {
          0% {
            opacity: 0;
            transform: translateX(-2rem) translateY(-1rem) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateX(-2rem) translateY(-1rem) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateX(-2rem) translateY(-1rem) scale(1);
          }
        }
      `}</style>
    </section>
  )
}

export default FeatureV2