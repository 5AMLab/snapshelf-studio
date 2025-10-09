import React, { useState, useEffect } from 'react'

/**
 * Reusable Logos component for displaying platform/brand logos
 * Can be customized with different variants and configurations
 *
 * @param {Object} props
 * @param {string} props.variant - 'hero' | 'footer' | 'default' - Controls styling and layout
 * @param {string} props.title - Optional title/heading above logos
 * @param {string} props.subtitle - Optional subtitle/description
 * @param {boolean} props.showTitle - Show/hide title section (default: false)
 * @param {string} props.className - Additional CSS classes
 * @param {Array} props.logos - Custom logos array (optional, uses default if not provided)
 * @param {boolean} props.animate - Enable auto-scroll animation (default: false)
 * @param {number} props.animationSpeed - Animation duration in seconds (default: 20)
 * @param {number} props.pauseDuration - Pause duration in seconds (default: 2)
 */
const Logos = ({
  variant = 'default',
  title = 'Trusted by leading platforms',
  subtitle = '',
  showTitle = false,
  className = '',
  logos = null,
  animate = false,
  animationSpeed = 20,
  pauseDuration = 2
}) => {
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)

  // Default logos configuration
  const defaultLogos = [
    {
      name: 'Zalora',
      src: '/images/logos/zalora-logo.svg',
      width: 60,
      height: 20,
      className: 'col-span-2 max-h-10 lg:max-h-16 pt-4 w-full object-contain md:col-span-1 lg:col-span-1'
    },
    {
      name: 'Shopee',
      src: '/images/logos/Shopee-horizontal-logo.svg',
      width: 59,
      height: 19,
      className: 'col-span-2 max-h-9 lg:max-h-14 pb-1 w-full object-contain md:col-span-1 lg:col-span-1'
    },
    {
      name: 'Amazon',
      src: '/images/logos/amazon-logo.svg',
      width: 60,
      height: 20,
      className: 'col-span-2 max-h-10 lg:max-h-16 pt-4 w-full object-contain md:col-span-1 lg:col-span-1'
    },
    {
      name: 'Lazada',
      src: '/images/logos/lazada-logo.svg',
      width: 74,
      height: 19,
      className: 'col-span-2 max-h-9 lg:max-h-14 pt-2 w-full object-contain md:col-span-1 lg:col-span-1'
    },
    {
      name: 'Shopify',
      src: '/images/logos/shopify-logo.svg',
      width: 57,
      height: 17,
      className: 'col-span-2 col-start-2 max-h-8 lg:max-h-12 w-full object-contain sm:col-start-auto md:col-span-1 md:col-start-auto lg:col-span-1'
    },
    {
      name: 'Meta/Instagram',
      src: '/images/logos/meta-logo-2.svg',
      width: 60,
      height: 20,
      className: 'col-span-2 max-h-8 lg:max-h-12 w-full object-contain sm:col-start-2 md:col-span-1 md:col-start-auto lg:col-span-1'
    },
    {
      name: 'WooCommerce',
      src: '/images/logos/woocommerce-logo.svg',
      width: 60,
      height: 20,
      className: 'col-span-2 max-h-8 lg:max-h-12 w-full object-contain md:col-span-1 lg:col-span-1'
    }
  ]

  const logosToRender = logos || defaultLogos

  // Toggle manual pause
  const togglePause = () => {
    setIsManuallyPaused(!isManuallyPaused)
  }

  // Variant-based container styling
  const getContainerClasses = () => {
    switch (variant) {
      case 'hero':
        return 'w-full py-3 md:py-4 lg:py-5'
      case 'footer':
        return 'w-full py-8'
      case 'compact':
        return 'w-full py-6'
      default:
        return 'w-full py-8'
    }
  }

  // Render animated version
  if (animate) {
    return (
      <div className={`${getContainerClasses()} ${className} overflow-hidden`}>
        {showTitle && (
          <div className="text-center mb-8">
            {title && (
              <p className="text-lg font-semibold text-violet-950">
                {title}
              </p>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 mt-2">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative flex items-center">
          {/* Pause/Play Button */}
          <button
            onClick={togglePause}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-violet-950 hover:bg-violet-900 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label={isManuallyPaused ? 'Play animation' : 'Pause animation'}
          >
            {isManuallyPaused ? (
              // Play icon
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              // Pause icon
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            )}
          </button>

          {/* Scrolling container */}
          <div
            className="flex gap-12 md:gap-16 lg:gap-20"
            style={{
              animation: `scroll-left ${animationSpeed}s linear infinite`,
              animationPlayState: isManuallyPaused ? 'paused' : 'running'
            }}
          >
            {/* First set of logos */}
            {logosToRender.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex-shrink-0 w-32 sm:w-32 lg:w-40 flex items-center justify-center">
                <img
                  alt={logo.name}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-12 lg:max-h-12 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logosToRender.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex-shrink-0 w-32 sm:w-32 lg:w-40 flex items-center justify-center">
                <img
                  alt={logo.name}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-12 lg:max-h-12 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Third set for ultra-smooth scrolling */}
            {logosToRender.map((logo, index) => (
              <div key={`logo-3-${index}`} className="flex-shrink-0 w-32 sm:w-32 lg:w-40 flex items-center justify-center">
                <img
                  alt={logo.name}
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-12 lg:max-h-12 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}</style>
      </div>
    )
  }

  // Static grid version (original)
  const getGridClasses = () => {
    const base = 'w-full grid items-center justify-items-center gap-x-4 gap-y-10 sm:gap-x-6 lg:gap-x-8'

    switch (variant) {
      case 'hero':
        return `${base} grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-7`
      case 'footer':
        return `${base} grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 opacity-60`
      case 'compact':
        return `${base} grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5`
      default:
        return `${base} grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-7`
    }
  }

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          {title && (
            <p className="text-lg font-semibold text-violet-950">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 mt-2">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={getGridClasses()}>
        {logosToRender.map((logo, index) => (
          <img
            key={index}
            alt={logo.name}
            src={logo.src}
            width={logo.width}
            height={logo.height}
            className={logo.className}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}

export default Logos
