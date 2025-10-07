import React, { lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import X from 'lucide-react/dist/esm/icons/x'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'

// Lazy load modal components
const PricingPopup = lazy(() => import('./PricingPopup'))
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'))
const CookiePolicy = lazy(() => import('./CookiePolicy'))
const TermsOfService = lazy(() => import('./TermsOfService'))

const ModalManager = () => {
  const { activeModal, modalProps, closeModal } = useModal()
  const navigate = useNavigate()

  if (!activeModal) return null

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) return null

  // Loading fallback component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  )

  // Modal backdrop and container
  const ModalContent = () => {
    const handleBackdropClick = (e) => {
      // Only close modal if clicking directly on the backdrop, not on any child elements
      if (e.target === e.currentTarget) {
        closeModal()
      }
    }

    // Ensure proper modal behavior on mount
    React.useEffect(() => {
      // Prevent any potential event propagation issues
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          closeModal()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [closeModal])

    const renderModalContent = () => {
      switch (activeModal) {
        case 'pricing':
          return <PricingPopup {...modalProps} isOpen={true} onClose={closeModal} />
        
        
        case 'privacy':
          return (
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900">Privacy Policy</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-0">
                <PrivacyPolicy />
              </div>
            </div>
          )
        
        case 'cookies':
          return (
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900">Cookie Policy</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-0">
                <CookiePolicy />
              </div>
            </div>
          )
        
        case 'terms':
          return (
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900">Terms of Service</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-0">
                <TermsOfService />
              </div>
            </div>
          )
        
        default:
          return null
      }
    }

    return (
      <div 
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleBackdropClick}
        onMouseDown={(e) => {
          // Prevent backdrop clicks from interfering with input focus
          if (e.target === e.currentTarget) {
            e.preventDefault()
          }
        }}
        style={{ 
          // Ensure modal doesn't interfere with input focus
          pointerEvents: 'auto',
          isolation: 'isolate'
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <Suspense fallback={<LoadingSpinner />}>
            {renderModalContent()}
          </Suspense>
        </div>
      </div>
    )
  }

  return createPortal(<ModalContent />, modalRoot)
}

export default ModalManager