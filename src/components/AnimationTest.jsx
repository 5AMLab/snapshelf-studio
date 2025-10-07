import React, { useEffect, useState, useRef } from 'react'

// Import external dependencies
import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

// Import portfolio images - using mix of local and Unsplash
const portfolioImages = {
  touchUpBefore: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=750&fit=crop',
  touchUpAfter: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
  removebgBefore: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=750&fit=crop',
  removebgAfter: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=750&fit=crop',
  bulkresizeBefore: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=750&fit=crop',
  bulkresizeAfter: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=750&fit=crop',
  infographicBefore: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=750&fit=crop',
  infographicAfter: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=750&fit=crop',
  centralLandscape: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
}

const AnimationTest = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSprintix, setShowSprintix] = useState(false)
  const scrollSectionRef = useRef(null)
  const layersRef = useRef([])
  const scalerRef = useRef(null)

  const sentences = [
    "Clear goals",
    "Sharp storytelling", 
    "Rapid iteration",
    "Real-world testing",
    "Files that simply work"
  ]

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentCharIndex < currentSentence.length) {
          setDisplayedText(currentSentence.substring(0, currentCharIndex + 1))
          setCurrentCharIndex(prev => prev + 1)
        } else {
          // Pause at end of sentence before deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting phase
        if (currentCharIndex > 0) {
          setDisplayedText(currentSentence.substring(0, currentCharIndex - 1))
          setCurrentCharIndex(prev => prev - 1)
        } else {
          // Move to next sentence
          setIsDeleting(false)
          setCurrentSentenceIndex(prev => (prev + 1) % sentences.length)
        }
      }
    }, isDeleting ? 50 : 100) // Faster deleting, slower typing
    
    return () => clearTimeout(timeout)
  }, [currentCharIndex, isDeleting, currentSentenceIndex, sentences])

  useEffect(() => {
    const sprintixTimeout = setTimeout(() => {
      setShowSprintix(true)
    }, 4000) // Matches the clipUp animation duration
    
    return () => clearTimeout(sprintixTimeout)
  }, [])

  // Enhanced scroll-driven animations with GSAP fallback
  useEffect(() => {
    if (typeof window === 'undefined' || !scrollSectionRef.current) return

    // Check for CSS scroll-driven animation support
    const hasScrollSupport = CSS.supports('animation-timeline: view()')
    
    if (!hasScrollSupport) {
      // Force GSAP fallback for testing
      if (true) {
        console.log('Using GSAP fallback')
        // Enhanced GSAP ScrollTrigger fallback
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
        script.onload = () => {
          if (window.gsap && window.ScrollTrigger) {
            window.gsap.registerPlugin(window.ScrollTrigger)
            
            // Animate scaler
            if (scalerRef.current) {
              console.log('Setting up GSAP scaler animations', scalerRef.current)
              
              // Create main timeline for scaler
              window.gsap.timeline({
                scrollTrigger: {
                  trigger: scrollSectionRef.current,
                  start: 'top -10%',
                  end: 'bottom 80%',
                  scrub: true,
                  onUpdate: self => {
                    console.log('Scaler progress:', self.progress)
                  }
                }
              })
              .from(scalerRef.current, {
                height: window.innerHeight - 32,
                width: window.innerWidth - 32,
                ease: 'power1.inOut'
              })
            }
            
            // Animate layers with staggered timing
            layersRef.current.forEach((layer, index) => {
              if (layer) {
                console.log(`Setting up GSAP layer ${index + 1}`)
                
                // Set initial state
                window.gsap.set(layer, { opacity: 0, scale: 0 })
                
                // Create staggered animation
                window.gsap.to(layer, {
                  opacity: 1,
                  scale: 1,
                  ease: index === 0 ? 'power1.inOut' : index === 1 ? 'power3.inOut' : 'power4.inOut',
                  scrollTrigger: {
                    trigger: scrollSectionRef.current,
                    start: `top -${30 + (index * 10)}%`,
                    end: 'bottom 60%',
                    scrub: true,
                    onUpdate: self => {
                      console.log(`Layer ${index + 1} progress:`, self.progress)
                    }
                  }
                })
              }
            })
          }
        }
        document.head.appendChild(script)
        
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script)
          }
        }
      }
    } else {
      console.log('Using CSS scroll-driven animations')
    }
  }, [])

  return (
    <div className="min-h-screen">
      <div className="content">
        <section>
          <img 
            src="https://images.unsplash.com/photo-1455245737663-3edc3b61dd1a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=59b8de4f8d04c0fa7ead62083bfe68bb&auto=format&fit=crop&w=1350&q=80" 
            alt="Photo by Andy Watkins on Unsplash" 
            height="250px" 
            width="100%" 
            style={{objectFit: 'cover'}}
          />
          <h2>SwiftPixel Services</h2>
          <p>Professional photo editing and design services</p>
        </section>

        {/* SwiftPixel Services Animation Section */}
        <section className="simple-section">
          <div className="section-header">
            <h2 className="section-title">SwiftPixel Services Animation</h2>
            <div className="hover-card">
              <svg className="icon icon-left" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
              </svg>
              <svg className="icon icon-center" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8" fill="currentColor"/>
              </svg>
              <svg className="icon icon-right" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <h3 className="card-title">Transform Your Vision</h3>
              <p className="card-description">Professional design services that bring your ideas to life with precision and creativity.</p>
              <button className="card-button">Get Started</button>
            </div>
          </div>
        </section>

        {/* Aurora Text Effect Section */}
        <section className="aurora-section">
          <header className="aurora-header">
            <div className="aurora-nav-container">
              <div className="aurora-logo">
                <span className="aurora-logo-text">SwiftPixel™</span>
              </div>
              <nav className="aurora-nav">
                <a href="#" className="aurora-nav-item">Home</a>
                <a href="#" className="aurora-nav-item">Services</a>
                <a href="#" className="aurora-nav-item">Portfolio</a>
                <a href="#" className="aurora-nav-item">About</a>
                <a href="#" className="aurora-nav-item">Contact</a>
              </nav>
              <div className="aurora-cta">
                <button className="aurora-cta-button">Get Quote</button>
              </div>
            </div>
          </header>
          
          <div className="aurora-container">
            <div className="aurora-blobs">
              <div className="aurora-blob aurora-blob-1"></div>
              <div className="aurora-blob aurora-blob-2"></div>
              <div className="aurora-blob aurora-blob-3"></div>
            </div>
            <h1 className="aurora-title">SwiftPixel™</h1>
            <p className="aurora-subtitle">Professional Design Studio</p>
          </div>
        </section>

        {/* Typing Animation Section */}
        <section className="typing-section">
          <div className="typing-container">
            <div className="typing-text">
              We value{' '}
              <span className="typed-text">{displayedText}</span>
              <span className="cursor">|</span>
            </div>
            <div className={`sprintix-container ${showSprintix ? 'show' : ''}`}>
              <h2 className="sprintix-text">SwiftPixel Studio</h2>
            </div>
          </div>
        </section>

        {/* Masking Section */}
        <section className="masking-section">
          <div className="mock-header">
            <div className="header-content">
              <div className="logo">SwiftPixel</div>
              <nav className="nav-menu">
                <a href="#" className="nav-link">Services</a>
                <a href="#" className="nav-link">Portfolio</a>
                <a href="#" className="nav-link">Contact</a>
              </nav>
              <button className="cta-button">Get Quote</button>
            </div>
          </div>
          
          <div className="content-container">
            <div className="image2"></div>
            <div className="masked-content">
              <h1 className="masked-title">Professional</h1>
              <h1 className="masked-title">Design</h1>
              <h1 className="masked-title">Services</h1>
            </div>
          </div>
        </section>

        {/* Scrolling Gallery Section */}
        <section className="gallery-section" ref={scrollSectionRef}>
          <div className="gallery-content">
            <div className="grid">
              <div className="layer" ref={el => layersRef.current[0] = el}>
                <img src={portfolioImages.touchUpBefore} alt="Original product photo" />
                <img src={portfolioImages.removebgBefore} alt="Product with background" />
                <img src={portfolioImages.bulkresizeBefore} alt="Standard size image" />
                <img src={portfolioImages.infographicBefore} alt="Basic infographic" />
              </div>
              <div className="layer" ref={el => layersRef.current[1] = el}>
                <img src={portfolioImages.touchUpAfter} alt="Enhanced product photo" />
                <img src={portfolioImages.removebgAfter} alt="Background removed" />
                <img src={portfolioImages.bulkresizeAfter} alt="Optimized size image" />
                <img src={portfolioImages.infographicAfter} alt="Professional infographic" />
              </div>
              <div className="layer" ref={el => layersRef.current[2] = el}>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=750&fit=crop" alt="Design sample 1" />
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=750&fit=crop" alt="Design sample 2" />
              </div>
              <div className="scaler">
                <img src={portfolioImages.centralLandscape} alt="Transform your products" ref={scalerRef} />
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Perfection Section */}
        <main>
          <section>
            <h1 className="fluid">we're<br />scrolling<br />towards</h1>
            <h2 className="fluid-end">perfection.</h2>
            <div className="table-flip">
              <span className="flip-text">(╯°□°)╯︵ ┻━┻</span>
            </div>
          </section>
        </main>
      </div>
      
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #e0e7ff;
        }

        /* First section basic styles */
        section:first-child {
          width: 100%;
          text-align: center;
          padding: 40px;
          background: white;
        }

        section:first-child h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 20px 0 10px 0;
          color: #1f2937;
        }

        section:first-child p {
          color: #6b7280;
          font-size: 1.1rem;
        }

        /* SwiftPixel Services Animation Section */
        .simple-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .section-header {
          text-align: center;
          color: white;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        /* Hover Card Styles */
        .hover-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          max-width: 400px;
          cursor: pointer;
        }

        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }

        .icon {
          width: 48px;
          height: 48px;
          color: #fff;
          transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: absolute;
          top: 30px;
        }

        .icon-left {
          left: 30px;
        }

        .icon-center {
          left: 50%;
          transform: translateX(-50%);
        }

        .icon-right {
          right: 30px;
        }

        .hover-card:hover .icon-left {
          transform: translateX(-20px) rotate(-15deg) translateY(-4px);
        }

        .hover-card:hover .icon-right {
          transform: translateX(20px) rotate(15deg) translateY(-4px);
        }

        .hover-card:hover .icon-center {
          transform: translateX(-50%) scale(1.2) translateY(-2px);
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin: 40px 0 16px 0;
          letter-spacing: -0.02em;
        }

        .card-description {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .card-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          border-radius: 50px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          padding: 12px 24px;
          margin-top: 16px;
          box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.4), 0 4px 6px -2px rgba(124, 58, 237, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card-button:hover {
          background: linear-gradient(135deg, #6d28d9, #9333ea);
          box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.5), 0 10px 10px -5px rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
        }

        .card-button:active {
          transform: translateY(0);
          box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);
        }

        @media (max-width: 768px) {
          .hover-card {
            padding: 40px 24px;
            max-width: 90%;
          }
          
          .icon {
            width: 40px;
            height: 40px;
          }
          
          .hover-card:hover .icon-left {
            transform: translateX(-16px) rotate(-12deg) translateY(-2px);
          }
          
          .hover-card:hover .icon-right {
            transform: translateX(16px) rotate(12deg) translateY(-2px);
          }
          
          .card-title {
            font-size: 15px;
          }
          
          .card-description {
            font-size: 13px;
          }
          
          .card-button {
            padding: 8px 14px;
            font-size: 14px;
          }
        }

        /* Aurora Text Effect Styles */
        .aurora-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #000000;
          color: #fff;
          font-family: "Inter", "DM Sans", Arial, sans-serif;
          position: relative;
        }

        .aurora-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .aurora-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
        }

        .aurora-logo {
          flex-shrink: 0;
        }

        .aurora-logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.025em;
        }

        .aurora-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          margin: 0 40px;
        }

        .aurora-nav-item {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: color 0.2s ease;
          padding: 8px 0;
          position: relative;
        }

        .aurora-nav-item:hover {
          color: #ffffff;
        }

        .aurora-nav-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          transition: width 0.3s ease;
        }

        .aurora-nav-item:hover::after {
          width: 100%;
        }

        .aurora-cta {
          flex-shrink: 0;
        }

        .aurora-cta-button {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }

        .aurora-cta-button:hover {
          background: linear-gradient(135deg, #6d28d9, #9333ea);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
        }

        .aurora-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          position: relative;
          z-index: 10;
        }

        .aurora-blobs {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: multiply;
          filter: blur(40px);
          animation: blob 7s infinite;
        }

        .aurora-blob-1 {
          top: 0;
          left: 0;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #ff006e, #8338ec);
          animation-delay: -3s;
        }

        .aurora-blob-2 {
          top: 50%;
          right: 0;
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #3a86ff, #06ffa5);
          animation-delay: -1s;
        }

        .aurora-blob-3 {
          bottom: 0;
          left: 50%;
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #ffbe0b, #fb5607);
          animation-delay: -2s;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .aurora-title {
          font-size: 4rem;
          font-weight: 800;
          text-align: center;
          background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradient 3s ease infinite;
          margin-bottom: 1rem;
        }

        .aurora-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          font-weight: 300;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Typing Section Styles */
        .typing-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3a8a, #1e40af, #3b82f6);
          color: white;
          padding: 80px 40px;
        }

        .typing-container {
          text-align: center;
          max-width: 800px;
        }

        .typing-text {
          font-size: 3.5rem;
          font-weight: 600;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(45deg, #ffffff, #e2e8f0, #cbd5e1);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .typed-text {
          display: inline;
        }

        .cursor {
          color: #7c3aed;
          animation: blink 1s infinite;
          font-weight: normal;
        }

        .sprintix-container {
          margin-top: 20px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-in-out;
        }

        .sprintix-container.show {
          opacity: 1;
          transform: translateY(0);
        }

        .sprintix-text {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(45deg, #7c3aed, #a855f7, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Masking Section Styles */
        .masking-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #e0e7ff;
          font-family: 'Arial', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .mock-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 24px;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1f2937;
          letter-spacing: -0.025em;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: color 0.2s ease;
          padding: 8px 0;
          position: relative;
        }

        .nav-link:hover {
          color: #1f2937;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cta-button {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #6d28d9, #9333ea);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
        }

        .content-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .image2 {
          width: 100%;
          height: 100%;
          background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80') center/cover;
          position: absolute;
          top: 0;
          left: 0;
          clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 0%);
          animation: clipUp 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .masked-content {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 2rem;
        }

        .masked-title {
          font-size: 4rem;
          font-weight: 800;
          color: #1f2937;
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @keyframes clipUp {
          from {
            clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 0%);
          }
          to {
            clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
          }
        }

        /* Gallery Section Styles */
        .gallery-section {
          min-height: 240vh;
          view-timeline: --driver;
        }

        .gallery-content {
          position: sticky;
          top: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          overflow: hidden;
        }

        .grid {
          --offset: 0;
          align-content: center;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 8%;
          width: 1600px;
          max-width: calc(100% - 4rem);
          margin: 0 auto;
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
            --offset: -1;
          }
          .grid > div:nth-of-type(1) {
            display: none;
          }
        }

        .grid .layer {
          display: grid;
          grid-column: 1 / -1;
          grid-row: 1 / -1;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 8%;
        }

        /* Layer 1: Outer edge positioning - corners */
        .grid .layer:nth-of-type(1) img:nth-of-type(1) {
          grid-column: 1;
          grid-row: 1;
        }
        .grid .layer:nth-of-type(1) img:nth-of-type(2) {
          grid-column: -1;
          grid-row: 1;
        }
        .grid .layer:nth-of-type(1) img:nth-of-type(3) {
          grid-column: 1;
          grid-row: -1;
        }
        .grid .layer:nth-of-type(1) img:nth-of-type(4) {
          grid-column: -1;
          grid-row: -1;
        }

        /* Layer 2: Inner positioning - middle edges */
        .grid .layer:nth-of-type(2) img:nth-of-type(1) {
          grid-column: 2;
          grid-row: 1;
        }
        .grid .layer:nth-of-type(2) img:nth-of-type(2) {
          grid-column: -2;
          grid-row: 1;
        }
        .grid .layer:nth-of-type(2) img:nth-of-type(3) {
          grid-column: 2;
          grid-row: -1;
        }
        .grid .layer:nth-of-type(2) img:nth-of-type(4) {
          grid-column: -2;
          grid-row: -1;
        }

        /* Layer 3: Center column top/bottom */
        .grid .layer:nth-of-type(3) img:nth-of-type(1) {
          grid-column: 3;
          grid-row: 1;
        }
        .grid .layer:nth-of-type(3) img:nth-of-type(2) {
          grid-column: 3;
          grid-row: -1;
        }

        .grid .scaler {
          grid-area: 2 / 3;
        }

        .grid .scaler img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(124, 58, 237, 0.25);
        }

        .grid img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 4px 6px -2px rgba(124, 58, 237, 0.05);
        }

        /* Scrolling Perfection Section Styles */
        main {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
          padding: 80px 40px;
        }

        main section {
          text-align: center;
          max-width: 800px;
        }

        .fluid {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          background: linear-gradient(45deg, #f8fafc, #e2e8f0, #cbd5e1);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .fluid-end {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.1;
          margin: 20px 0;
          background: linear-gradient(45deg, #7c3aed, #a855f7, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .table-flip {
          margin-top: 40px;
          font-size: 2rem;
          opacity: 0.8;
        }

        .flip-text {
          font-family: monospace;
          color: #cbd5e1;
        }

        @media (prefers-reduced-motion: reduce) {
          .image2 {
            animation: none;
          }
          .cursor {
            animation: none;
          }
          .sprintix-container {
            transition: none;
            opacity: 1;
            transform: translateY(0);
          }
          .aurora-blob {
            animation: none;
          }
          .grid .layer {
            animation: none;
          }
          .grid .scaler img {
            animation: none;
          }
        }

        @media (max-width: 768px) {
          .typing-text {
            font-size: 1.5rem;
          }
          .typing-section {
            padding: 40px 20px;
          }
          .sprintix-text {
            font-size: 2rem;
          }
          .aurora-title {
            font-size: 2.5rem;
          }
          .section-title {
            font-size: 2rem;
          }
          .masked-title {
            font-size: 2.5rem;
          }
          .aurora-nav {
            display: none;
          }
          .fluid, .fluid-end {
            font-size: 2.5rem;
          }
          .flip-text {
            font-size: 1.5rem;
          }
          main {
            padding: 40px 20px;
          }
          .grid .layer {
            animation: none !important;
          }
          .grid .scaler img {
            width: 100% !important;
            height: 100% !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AnimationTest