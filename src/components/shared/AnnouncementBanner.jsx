import React, { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline'

const AnnouncementBanner = ({ 
  show = true,
  type = 'info', // 'info', 'warning', 'success', 'announcement'
  title,
  message,
  ctaText,
  ctaLink,
  onCtaClick,
  onClose,
  dismissible = true,
  autoHide = false,
  autoHideDelay = 5000
}) => {
  const [isVisible, setIsVisible] = useState(show)

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        handleClose()
      }, autoHideDelay)
      
      return () => clearTimeout(timer)
    }
  }, [autoHide, autoHideDelay, isVisible])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  const handleCtaClick = (e) => {
    if (onCtaClick) {
      e.preventDefault()
      onCtaClick()
    }
  }

  if (!isVisible) return null

  // Type-based styling
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: ExclamationTriangleIcon,
          iconColor: 'text-amber-600',
          cta: 'bg-amber-700 hover:bg-amber-800 text-white'
        }
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircleIcon,
          iconColor: 'text-green-600',
          cta: 'bg-green-700 hover:bg-green-800 text-white'
        }
      case 'announcement':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          icon: MegaphoneIcon,
          iconColor: 'text-purple-600',
          cta: 'bg-purple-700 hover:bg-purple-800 text-white'
        }
      default: // 'info'
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: InformationCircleIcon,
          iconColor: 'text-blue-600',
          cta: 'bg-blue-700 hover:bg-blue-800 text-white'
        }
    }
  }

  const styles = getTypeStyles()
  const IconComponent = styles.icon

  return (
    <div className={`relative isolate flex items-center justify-between overflow-hidden ${styles.bg} ${styles.border} border-b px-6 py-3 sm:px-3.5`}>
      {/* Background decorative elements */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      
      <div className="flex flex-1 items-center gap-x-4 gap-y-2">
        {/* Icon */}
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${styles.iconColor}`} aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0 flex-1">
          <p className={`text-sm leading-6 ${styles.text}`}>
            {title && (
              <strong className="font-semibold">{title}</strong>
            )}
            {title && message && (
              <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
            )}
            {message}
          </p>

          {/* CTA Button */}
          {(ctaText || ctaLink) && (
            <a
              href={ctaLink || "#"}
              onClick={handleCtaClick}
              className={`flex-none rounded-full px-3.5 py-1 text-sm font-semibold shadow-sm transition-colors ${styles.cta} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              {ctaText}
              {ctaText && <span aria-hidden="true"> &rarr;</span>}
            </a>
          )}
        </div>
      </div>

      {/* Close button */}
      {dismissible && (
        <div className="flex flex-shrink-0 px-2">
          <button 
            type="button" 
            className={`-m-1.5 flex-none p-1.5 ${styles.text} hover:opacity-75 transition-opacity rounded-full hover:bg-black/5`}
            onClick={handleClose}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

// Predefined announcement presets for common use cases
export const AnnouncementPresets = {
  discount: (discount = "15%", ctaAction) => ({
    type: 'announcement',
    title: 'Limited Time Offer',
    message: `Get ${discount} off all packages - First 5 customers only!`,
    ctaText: 'Claim Discount',
    onCtaClick: ctaAction
  }),
  
  limitedCapacity: (spotsLeft = "3", ctaAction) => ({
    type: 'warning',
    title: 'Limited Availability',
    message: `Only ${spotsLeft} spots remaining this month`,
    ctaText: 'Book Now',
    onCtaClick: ctaAction
  }),
  
  notTakingRequests: (reopenDate) => ({
    type: 'info',
    title: 'Temporarily Closed',
    message: reopenDate 
      ? `Not accepting new requests until ${reopenDate}` 
      : 'Currently not accepting new requests',
    dismissible: true
  }),
  
  maintenance: (duration = "30 minutes") => ({
    type: 'warning',
    title: 'Scheduled Maintenance',
    message: `Service may be temporarily unavailable for ${duration}`,
    autoHide: false
  }),
  
  newFeature: (feature, ctaAction) => ({
    type: 'success',
    title: 'New Feature Released!',
    message: `Check out our latest feature: ${feature}`,
    ctaText: 'Learn More',
    onCtaClick: ctaAction
  })
}

export default AnnouncementBanner