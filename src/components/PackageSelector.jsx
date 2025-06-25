import React from 'react'
import { CheckCircle, Star } from 'lucide-react'

const PackageSelector = ({ onPackageSelect, selectedPackage }) => {
  const packages = [
    {
      id: 'essential',
      name: 'Essential',
      price: 'SGD 199',
      duration: 'per package',
      features: [
        '5 asset transformations',
        '3 platform size variations each',
        'Basic infographic (1 design)',
        '48-hour delivery',
        '2 rounds of revisions',
        'High-res + web formats'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 'SGD 399',
      duration: 'per package',
      features: [
        '10 asset transformations',
        '5 platform size variations each',
        '3 Amazon infographics',
        'Social media template set',
        '24-hour rush delivery',
        '3 rounds of revisions',
        'All platform formats included'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'SGD 699',
      duration: 'per package',
      features: [
        '15 asset transformations',
        'Unlimited size variations',
        '5 data-driven infographics',
        'Complete social media suite',
        '12-hour emergency delivery',
        'Unlimited revisions',
        'Brand guideline creation',
        'Priority support channel'
      ],
      popular: false
    }
  ]

  const handleSelectPackage = (packageData) => {
    console.log('Package selected:', packageData)
    if (onPackageSelect) {
      onPackageSelect(packageData)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Step 1: Select Your Package
        </h3>
        <p className="text-gray-600">
          Choose the perfect package for your asset transformation needs
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
              selectedPackage?.id === pkg.id 
                ? 'border-purple-500 ring-2 ring-purple-200 scale-105' 
                : pkg.popular 
                  ? 'border-purple-300' 
                  : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {/* Popular Badge */}
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            {/* Selection Indicator */}
            {selectedPackage?.id === pkg.id && (
              <div className="absolute -top-2 -right-2 z-10">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                  <span className="text-gray-500 ml-2">{pkg.duration}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
                {pkg.features.length > 4 && (
                  <li className="text-sm text-gray-500 pl-7">
                    +{pkg.features.length - 4} more features...
                  </li>
                )}
              </ul>

              {/* Selection Button */}
              <button 
                type="button"
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  selectedPackage?.id === pkg.id
                    ? 'bg-green-600 text-white'
                    : pkg.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600'
                }`}
              >
                {selectedPackage?.id === pkg.id ? (
                  <span className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Selected</span>
                  </span>
                ) : (
                  `Choose ${pkg.name}`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Package Summary */}
      {selectedPackage && (
        <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="font-semibold text-purple-900 mb-1">
                Selected: {selectedPackage.name} Package
              </h4>
              <p className="text-purple-700 text-sm">
                {selectedPackage.features[0]} • {selectedPackage.features[3]}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-900">{selectedPackage.price}</div>
              <div className="text-sm text-purple-600">{selectedPackage.duration}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageSelector