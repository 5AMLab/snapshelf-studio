import React from 'react'
import { Link } from 'react-router-dom'
import HeroToCollageAnimation from './HeroToCollageAnimation'

const HeroToCollageDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1001] bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-violet-600">
            SnapShelf Studio
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors">
              Home
            </Link>
            <button 
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Refresh Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>

      {/* Demo Instructions */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8 mx-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              <strong>Demo Instructions:</strong> Scroll down slowly to see the hero image transform into a collage of portfolio images. 
              The animation is tied to your scroll position and works best in Chrome 116+, Firefox 128+ (with flag), or Safari Technology Preview.
            </p>
          </div>
        </div>
      </div>

      {/* Hero to Collage Animation */}
      <HeroToCollageAnimation />

      {/* Additional Content for Context */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Scroll-Driven Animation Demo Complete
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            You've just experienced a cutting-edge CSS scroll-driven animation. 
            This technique provides buttery-smooth animations that run at 120 FPS 
            without any JavaScript!
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-violet-50 rounded-lg">
              <h3 className="font-semibold text-violet-900 mb-2">Performance</h3>
              <p className="text-violet-700 text-sm">
                Animations run on the compositor thread for optimal performance
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Accessibility</h3>
              <p className="text-green-700 text-sm">
                Respects prefers-reduced-motion settings automatically
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Future-Ready</h3>
              <p className="text-blue-700 text-sm">
                Uses native CSS features with progressive enhancement
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Back to Main Site
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroToCollageDemo