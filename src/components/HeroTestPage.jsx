import React, { useEffect, useState, useCallback } from 'react';
import './HeroTestPage.css';

const HeroTestPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Throttle function for performance
  const throttle = useCallback((func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('our-services');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Simple visibility check - no complex calculations
        const isInView = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };
    
    // Throttled scroll handler - only runs every 16ms (60fps)
    const throttledScroll = throttle(handleScroll, 16);
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttle]);

  return (
    <div className="hero-test-page">
      {/* Hero Section with Optimized Animation */}
      <div className="hero-container">
        <div className="floating-cards">
          <img 
            src="/images/features/bg-remove.svg"
            alt="BG Remove"
            className={`service-card card-1 ${isVisible ? 'animate-in' : ''}`}
            style={{ 
              transform: 'rotate(-15deg) scale(0.6)',
              animationDelay: '0ms'
            }}
          />
          
          <img 
            src="/images/features/commerce.svg"
            alt="Made for Commerce"
            className={`service-card card-2 ${isVisible ? 'animate-in' : ''}`}
            style={{ 
              transform: 'rotate(8deg) scale(0.6)',
              animationDelay: '150ms'
            }}
          />
          
          <img 
            src="/images/features/brands.svg"
            alt="Build for Brands"
            className={`service-card card-3 ${isVisible ? 'animate-in' : ''}`}
            style={{ 
              transform: 'rotate(-10deg) scale(0.6)',
              animationDelay: '300ms'
            }}
          />
          
          <img 
            src="/images/features/cropping.svg"
            alt="Cropping & Resizing"
            className={`service-card card-4 ${isVisible ? 'animate-in' : ''}`}
            style={{ 
              transform: 'rotate(12deg) scale(0.6)',
              animationDelay: '450ms'
            }}
          />
          
          <img 
            src="/images/features/cropping.svg"
            alt="Cropping & Resizing"
            className={`service-card card-5 ${isVisible ? 'animate-in' : ''}`}
            style={{ 
              transform: 'rotate(-18deg) scale(0.6)',
              animationDelay: '600ms'
            }}
          />
        </div>
        
        <div className="hero-content">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-violet-950 mb-6" style={{lineHeight: '1.2', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
            We transform your product photos into
            <br />
            <span className="highlight">polished banners, thumbnails, and</span>
            <br />
            <span className="highlight">infographics for Lazada, Amazon &</span>
            <br />
            <span className="highlight">Instagram ready to launch.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroTestPage;