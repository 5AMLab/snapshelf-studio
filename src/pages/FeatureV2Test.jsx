import React from 'react'
import FeatureV2 from '../components/FeatureV2'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const FeatureV2Test = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation back to home */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          to="/"
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
        >
          <ArrowLeftIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Back to Home</span>
        </Link>
      </div>

      {/* Test Header */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-violet-100 rounded-full px-4 py-2 border border-violet-200">
          <span className="text-sm font-medium text-violet-700">FeatureV2 Test</span>
        </div>
      </div>

      {/* FeatureV2 Component */}
      <FeatureV2 />

    </div>
  )
}

export default FeatureV2Test