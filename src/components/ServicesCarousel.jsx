import React, { useEffect, useRef, useState } from 'react';
import './ServicesCarousel.css';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const carouselRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideGap, setSlideGap] = useState(0);
  
  const services = [
    { image: "/images/hero/perfume.webp", title: "Photo Retouching", alt: "Perfume" },
    { image: "/images/hero/remove-bg-sq.jpg", title: "Background Removal", alt: "Shoe" },
    { image: "/images/hero/headphone.webp", title: "Image Optimization", alt: "Headphone" },
    { image: "/images/hero/sale-info-sq.jpg", title: "Sales Infographics", alt: "Sunscreen" },
    { image: "/images/hero/lipstick.webp", title: "Gif Banner", alt: "Lipstick" },
    { image: "/images/hero/handcream.webp", title: "Ad Creatives", alt: "Hand Cream" }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const totalGroups = Math.ceil(services.length / slidesToShow);
      return (prev + 1) % totalGroups;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const totalGroups = Math.ceil(services.length / slidesToShow);
      return prev <= 0 ? totalGroups - 1 : prev - 1;
    });
  };

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      // Desktop: fixed 900px slides
      setSlidesToShow(3);
      setSlideWidth(900);
      setSlideGap(0);
    } else if (width >= 768) {
      // Tablet: responsive sizing
      setSlidesToShow(3);
      const trackWidth = Math.min(width - 64, 650); // 100vw - 4rem padding, max 650px
      setSlideWidth(trackWidth);
      setSlideGap(0);
    } else {
      // Mobile: Full width minus padding for alignment with other content
      setSlidesToShow(1);
      const calculatedWidth = width - 32; // Full width minus 2rem (32px) padding
      setSlideWidth(calculatedWidth);
      setSlideGap(0);
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    setCurrentIndex(0); // Always start at position 0
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    setCurrentIndex(0); // Reset to first position when slides to show changes
  }, [slidesToShow]);

  // useEffect(() => {
  //   const timer = setInterval(nextSlide, 3000);
  //   return () => clearInterval(timer);
  // }, [slidesToShow]);

  return (
    <div className="py-16 sm:py-20 lg:py-24 font-geist bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-center">
          <span className="text-violet-950">Made for Commerce</span>
        </h1>
        <p className="text-xl text-violet-950 text-center max-w-3xl mx-auto mb-16">
        From background removal to color correction, we help businesses create stunning visuals that drive sales.
        </p>
      </div>

      <div>
        {/* Navigation arrows container - positioned outside carousel */}
        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-12 md:left-16 lg:left-4 top-1/2 -translate-y-1/2 z-30 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-3 transition-all duration-200 hidden md:flex items-center justify-center"
            style={{ marginTop: '-10px' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-12 md:right-16 lg:right-4 top-1/2 -translate-y-1/2 z-30 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-3 transition-all duration-200 hidden md:flex items-center justify-center"
            style={{ marginTop: '-10px' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="carousel-container relative max-w-7xl mx-auto">

          {/* Carousel track */}
          <div 
            className="carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="carousel-slides flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: slidesToShow === 1 
                  ? `translateX(-${currentIndex * slideWidth}px)`
                  : `translateX(-${currentIndex * slideWidth}px)`,
                width: slidesToShow === 1 
                  ? `${services.length * slideWidth}px`
                  : window.innerWidth >= 1024 
                    ? `${services.length * 300 + 20}px`
                    : `${services.length * ((slideWidth - 60) / 3 + 20)}px`
              }}
            >
              {services.map((service, index) => (
                <div key={index} className="carousel-cell relative flex-shrink-0">
                  <img 
                    src={service.image} 
                    alt={service.alt} 
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white mx-2 px-3 py-2 rounded-2xl">
                      <h3 className="text-sm font-bold text-gray-900 text-center">{service.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* Dots indicator - Outside container for proper mobile positioning */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: Math.ceil(services.length / slidesToShow) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-violet-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;