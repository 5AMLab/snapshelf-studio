import React, { useState, useRef, useEffect } from 'react'
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left'
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'

const BeforeAfterSlider = React.memo(({ 
  beforeImage, 
  afterImage, 
  beforeAlt = "Before image", 
  afterAlt = "After image",
  className = "",
  loading = "lazy"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [beforeLoaded, setBeforeLoaded] = useState(false)
  const [afterLoaded, setAfterLoaded] = useState(false)
  const containerRef = useRef(null)
  const sliderRef = useRef(null)

  const bothImagesLoaded = beforeLoaded && afterLoaded

  const handleMouseDown = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const updateSliderPosition = (clientX) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const newPosition = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Global event listeners for drag behavior
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none rounded-2xl ${className}`}
      style={{ aspectRatio: '16/10', minHeight: '224px' }} // Prevent layout shift
    >
      {/* Loading Skeleton */}
      {!bothImagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl" />
      )}

      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        loading={loading}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          bothImagesLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        draggable={false}
        onLoad={() => setBeforeLoaded(true)}
        onError={() => setBeforeLoaded(true)} // Still show on error
      />

      {/* After Image (Clipped Overlay) */}
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
          bothImagesLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          loading={loading}
          className="w-full h-full object-cover"
          draggable={false}
          onLoad={() => setAfterLoaded(true)}
          onError={() => setAfterLoaded(true)} // Still show on error
        />
      </div>

      {/* Loading Indicator */}
      {!bothImagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="text-gray-500 text-sm font-medium">Loading...</div>
        </div>
      )}

      {/* Slider Line - Only show when loaded */}
      {bothImagesLoaded && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div
            ref={sliderRef}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-10 h-10 bg-white rounded-full shadow-lg cursor-ew-resize 
                       flex items-center justify-center transition-all duration-150
                       ${isDragging ? 'scale-110 shadow-xl' : 'hover:scale-105'}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="flex items-center space-x-0.5">
              <ChevronLeft className="w-3 h-3 text-gray-600" />
              <ChevronRight className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
      )}

    </div>
  )
})

BeforeAfterSlider.displayName = 'BeforeAfterSlider'

export default BeforeAfterSlider