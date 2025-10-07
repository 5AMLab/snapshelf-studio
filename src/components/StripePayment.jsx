import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PaymentForm = ({ selectedPackage, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [customerName, setCustomerName] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    const cardElement = elements.getElement(CardElement)

    try {
      // Create payment intent
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
      const response = await fetch(`${apiBaseUrl}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(selectedPackage.price * 100), // Convert to cents
          currency: 'sgd',
          packageName: selectedPackage.name,
          packageDetails: selectedPackage
        }),
      })

      const { client_secret } = await response.json()

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName || 'Anonymous Customer',
          },
        },
      })

      if (error) {
        setPaymentError(error.message)
        onError?.(error)
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true)
        onSuccess?.(paymentIntent)
      }
    } catch (error) {
      setPaymentError('An unexpected error occurred. Please try again.')
      onError?.(error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-2xl border-2 border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
        <p className="text-green-600 mb-4">
          Your {selectedPackage.name} package has been purchased successfully.
        </p>
        <p className="text-sm text-green-600">
          You'll receive a confirmation email shortly with next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{selectedPackage.name} Package</span>
          <span className="font-semibold text-gray-900">{selectedPackage.priceDisplay}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-xl text-purple-600">{selectedPackage.priceDisplay}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        {paymentError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-800 text-sm">{paymentError}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pay {selectedPackage.priceDisplay}</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center space-y-3">
        <div className="flex justify-center items-center space-x-4">
          <img 
            src="/images/security/stripe-badge.svg" 
            alt="Secured by Stripe" 
            className="h-8"
          />
          <img 
            src="/images/security/ssl-badge.svg" 
            alt="SSL Secured" 
            className="h-8"
          />
        </div>
        <p className="text-xs text-gray-500">
          🔒 Bank-level security • 256-bit SSL encryption • PCI DSS compliant
        </p>
        <p className="text-xs text-gray-400">
          Your payment details are processed securely by Stripe. We never store your card information.
        </p>
      </div>
    </form>
  )
}

const StripePayment = ({ selectedPackage, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        selectedPackage={selectedPackage}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
}

export default StripePayment