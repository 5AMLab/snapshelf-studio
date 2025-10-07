// Error Handler Service - Centralized error handling and user feedback

class ErrorHandler {
  constructor() {
    this.errorCallbacks = new Set()
  }

  /**
   * Register a callback to be called when errors occur
   * @param {Function} callback - Function to call with error details
   */
  onError(callback) {
    this.errorCallbacks.add(callback)
    return () => this.errorCallbacks.delete(callback)
  }

  /**
   * Handle and categorize errors
   * @param {Error|string} error - Error object or message
   * @param {Object} context - Additional context about the error
   * @returns {Object} Formatted error object
   */
  handleError(error, context = {}) {
    const errorDetails = this.parseError(error, context)
    
    // Log error for debugging
    console.error('Error occurred:', errorDetails)
    
    // Notify registered callbacks
    this.errorCallbacks.forEach(callback => {
      try {
        callback(errorDetails)
      } catch (callbackError) {
        console.error('Error in error callback:', callbackError)
      }
    })

    return errorDetails
  }

  /**
   * Parse error into a standardized format
   * @param {Error|string} error - Error to parse
   * @param {Object} context - Additional context
   * @returns {Object} Parsed error details
   */
  parseError(error, context = {}) {
    const timestamp = new Date().toISOString()
    const userAgent = navigator.userAgent
    
    let errorDetails = {
      timestamp,
      userAgent,
      context,
      id: this.generateErrorId()
    }

    if (error instanceof Error) {
      errorDetails = {
        ...errorDetails,
        name: error.name,
        message: error.message,
        stack: error.stack,
        type: this.categorizeError(error)
      }
    } else if (typeof error === 'string') {
      errorDetails = {
        ...errorDetails,
        message: error,
        type: 'generic'
      }
    } else {
      errorDetails = {
        ...errorDetails,
        message: 'An unknown error occurred',
        originalError: error,
        type: 'unknown'
      }
    }

    // Add user-friendly message
    errorDetails.userMessage = this.getUserFriendlyMessage(errorDetails)
    
    return errorDetails
  }

  /**
   * Categorize error type for better handling
   * @param {Error} error - Error object
   * @returns {string} Error category
   */
  categorizeError(error) {
    const message = error.message.toLowerCase()
    
    if (error.name === 'TypeError') return 'type'
    if (error.name === 'ReferenceError') return 'reference'
    if (error.name === 'NetworkError' || message.includes('fetch')) return 'network'
    if (message.includes('payment') || message.includes('stripe')) return 'payment'
    if (message.includes('validation') || message.includes('invalid')) return 'validation'
    if (message.includes('auth') || message.includes('unauthorized')) return 'auth'
    if (message.includes('timeout')) return 'timeout'
    
    return 'generic'
  }

  /**
   * Generate user-friendly error messages
   * @param {Object} errorDetails - Error details object
   * @returns {string} User-friendly message
   */
  getUserFriendlyMessage(errorDetails) {
    const type = errorDetails.type
    const originalMessage = errorDetails.message

    switch (type) {
      case 'network':
        return 'Connection problem. Please check your internet connection and try again.'
      
      case 'payment':
        if (originalMessage.includes('card')) {
          return 'Payment failed. Please check your card details and try again.'
        }
        return 'Payment processing failed. Please try again or contact support.'
      
      case 'validation':
        return 'Please check your information and try again.'
      
      case 'auth':
        return 'Authentication failed. Please try again.'
      
      case 'timeout':
        return 'Request timed out. Please try again.'
      
      case 'type':
      case 'reference':
        return 'Something went wrong. Please refresh the page and try again.'
      
      default:
        // Try to make the original message more user-friendly
        if (originalMessage.includes('fetch')) {
          return 'Unable to connect to our servers. Please try again later.'
        }
        if (originalMessage.includes('JSON')) {
          return 'Server response error. Please try again.'
        }
        return originalMessage.length > 100 
          ? 'An unexpected error occurred. Please try again or contact support.'
          : originalMessage
    }
  }

  /**
   * Generate unique error ID for tracking
   * @returns {string} Error ID
   */
  generateErrorId() {
    return `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  }

  /**
   * Handle async function errors with automatic retry
   * @param {Function} asyncFn - Async function to execute
   * @param {Object} options - Options for retry behavior
   * @returns {Promise} Promise that resolves with result or rejects with handled error
   */
  async withRetry(asyncFn, options = {}) {
    const {
      maxRetries = 3,
      delayMs = 1000,
      backoffMultiplier = 2,
      retryCondition = (error) => error.type === 'network'
    } = options

    let lastError
    let delay = delayMs

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFn()
      } catch (error) {
        const handledError = this.handleError(error, { 
          attempt: attempt + 1,
          maxRetries,
          function: asyncFn.name
        })
        
        lastError = handledError
        
        // Don't retry on last attempt or if retry condition not met
        if (attempt === maxRetries || !retryCondition(handledError)) {
          throw handledError
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= backoffMultiplier
      }
    }

    throw lastError
  }

  /**
   * Validate form data with detailed error messages
   * @param {Object} data - Form data to validate
   * @param {Object} schema - Validation schema
   * @returns {Object} Validation result
   */
  validateFormData(data, schema) {
    const errors = {}
    
    Object.entries(schema).forEach(([field, rules]) => {
      const value = data[field]
      const fieldErrors = []

      // Required validation
      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        fieldErrors.push(`${rules.label || field} is required`)
      }

      // Type validation
      if (value && rules.type) {
        if (rules.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.push('Please enter a valid email address')
        } else if (rules.type === 'url' && !/^https?:\/\/.+/.test(value)) {
          fieldErrors.push('Please enter a valid URL')
        } else if (rules.type === 'number' && isNaN(value)) {
          fieldErrors.push('Please enter a valid number')
        }
      }

      // Length validation
      if (value && rules.minLength && value.length < rules.minLength) {
        fieldErrors.push(`Must be at least ${rules.minLength} characters`)
      }
      if (value && rules.maxLength && value.length > rules.maxLength) {
        fieldErrors.push(`Must be no more than ${rules.maxLength} characters`)
      }

      // Custom validation
      if (value && rules.validate) {
        const customError = rules.validate(value, data)
        if (customError) {
          fieldErrors.push(customError)
        }
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors
      }
    })

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      firstError: Object.values(errors)[0]?.[0]
    }
  }

  /**
   * Report error to external service (analytics, error tracking, etc.)
   * @param {Object} errorDetails - Error details to report
   */
  async reportError(errorDetails) {
    try {
      // In production, you might send to services like Sentry, LogRocket, etc.
      if (process.env.NODE_ENV === 'production') {
        // Example: await fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorDetails) })
        console.info('Error would be reported to external service:', errorDetails.id)
      }
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler()

export default errorHandler

// Named exports for convenience
export const handleError = errorHandler.handleError.bind(errorHandler)
export const withRetry = errorHandler.withRetry.bind(errorHandler)
export const validateFormData = errorHandler.validateFormData.bind(errorHandler)

// React hook for error handling
export const useErrorHandler = () => {
  const [errors, setErrors] = React.useState({})
  
  React.useEffect(() => {
    const cleanup = errorHandler.onError((error) => {
      setErrors(prev => ({
        ...prev,
        [error.context?.component || 'global']: error
      }))
    })
    
    return cleanup
  }, [])
  
  const clearError = (component = 'global') => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[component]
      return newErrors
    })
  }
  
  const clearAllErrors = () => setErrors({})
  
  return {
    errors,
    clearError,
    clearAllErrors,
    handleError: (error, context) => errorHandler.handleError(error, context)
  }
}