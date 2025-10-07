import React, { useState } from 'react'
import { CheckCircle, Star, Calculator, ArrowRight, Users, Clock, Award } from 'lucide-react'
import { getPackageArray } from '../config/pricing'

const PersonalizedPackageRecommendation = ({ assessmentData, onPackageSelect, onBookConsultation }) => {
  const { formData, estimatedEdits, recommendedPackage } = assessmentData
  const [selectedOption, setSelectedOption] = useState('package')

  // Convert the pricing config to match the expected format
  const packageArray = getPackageArray()
  const packages = {
    essential: {
      ...packageArray[0],
      edits: packageArray[0].assets,
      pricePerEdit: packageArray[0].perEdit,
      price: packageArray[0].priceDisplay,
      suitable: estimatedEdits <= packageArray[0].assets
    },
    professional: {
      ...packageArray[1],
      edits: packageArray[1].assets,
      pricePerEdit: packageArray[1].perEdit,
      price: packageArray[1].priceDisplay,
      suitable: estimatedEdits <= packageArray[1].assets
    },
    advanced: {
      ...packageArray[2],
      edits: packageArray[2].assets,
      pricePerEdit: packageArray[2].perEdit,
      price: packageArray[2].priceDisplay,
      suitable: estimatedEdits <= packageArray[2].assets && estimatedEdits > packageArray[1].assets
    },
    enterprise: {
      ...packageArray[3],
      edits: packageArray[3].assets,
      pricePerEdit: packageArray[3].perEdit,
      price: packageArray[3].priceDisplay,
      suitable: estimatedEdits > packageArray[2].assets
    }
  }


  const getRecommendedPackages = () => {
    const recommended = packages[recommendedPackage]
    const alternatives = Object.values(packages).filter(pkg => pkg.id !== recommendedPackage)
    return { recommended, alternatives }
  }


  const { recommended, alternatives } = getRecommendedPackages()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Personalized Recommendations
        </h2>
        <p className="text-gray-600">
          Based on your business needs and requirements
        </p>
      </div>

      {/* Business Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8 border border-purple-200">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-900">{formData.businessName}</div>
            <div className="text-sm text-purple-700">{formData.businessType}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-900">{formData.monthlyPhotoVolume}</div>
            <div className="text-sm text-purple-700">photos/month</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-900">{formData.platforms.length}</div>
            <div className="text-sm text-purple-700">platforms</div>
          </div>
        </div>
      </div>

      {/* Option Selection */}
      <div className="mb-8">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedOption('package')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedOption === 'package'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            View Package Options
          </button>
          <button
            onClick={() => setSelectedOption('consultation')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedOption === 'consultation'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Book Consultation
          </button>
        </div>
      </div>

      {selectedOption === 'package' ? (
        <div className="space-y-8">
          {/* Recommended Package */}
          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Recommended for You</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{recommended.name} Package</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">{recommended.price}</div>
                <div className="text-green-600 font-medium">
                  SGD {recommended.pricePerEdit} per edit ({recommended.discount}% bulk discount)
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Package Includes:</h4>
                <ul className="space-y-2">
                  {recommended.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onPackageSelect(recommended)}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Choose {recommended.name} Package</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Alternative Packages */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Other Package Options</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {alternatives.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                    <div className="text-sm text-gray-600">
                      SGD {pkg.pricePerEdit} per edit ({pkg.discount}% discount)
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-sm text-gray-500">
                        +{pkg.features.length - 4} more features...
                      </li>
                    )}
                  </ul>

                  <button
                    onClick={() => onPackageSelect(pkg)}
                    className="w-full border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    Choose {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Consultation Option */
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Consultation</h3>
            <p className="text-gray-600">
              Let's discuss your specific needs and create a custom solution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">15-Minute Call</h4>
              <p className="text-sm text-gray-600">Quick consultation to understand your needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Custom Quote</h4>
              <p className="text-sm text-gray-600">Personalized pricing based on your requirements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">No Obligation</h4>
              <p className="text-sm text-gray-600">Free consultation with no commitment required</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">What We'll Discuss:</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Your specific business requirements</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Platform-specific optimization needs</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Custom pricing options</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Timeline and delivery expectations</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onBookConsultation}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default PersonalizedPackageRecommendation