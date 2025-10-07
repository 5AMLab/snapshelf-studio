import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    document.title = 'Checkout - SwiftPixel Studio'
    
    // Redirect to streamlined booking flow
    if (location.state?.selectedPackage) {
      // Redirect to new streamlined booking
      navigate('/book', { 
        state: { selectedPackage: location.state.selectedPackage },
        replace: true
      })
    } else {
      // Try to reconstruct package from URL params
      const packageName = searchParams.get('package')
      const price = searchParams.get('price')
      const assets = searchParams.get('assets')
      
      if (packageName && price && assets) {
        const reconstructedPackage = {
          name: packageName,
          price: parseFloat(price),
          priceDisplay: `${price}`,
          assetsIncluded: parseInt(assets),
          serviceLevel: { timeRequired: '48-72 hours' }
        }
        
        navigate('/book', { 
          state: { selectedPackage: reconstructedPackage },
          replace: true
        })
      } else {
        // No package data, redirect to pricing
        navigate('/pricing', { replace: true })
      }
    }
  }, [location.state, searchParams, navigate])

  // Loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to checkout...</p>
      </div>
    </div>
  )
}

export default CheckoutPage