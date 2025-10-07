import React, { useState } from 'react'
import Star from 'lucide-react/dist/esm/icons/star'
import Heart from 'lucide-react/dist/esm/icons/heart'
import Eye from 'lucide-react/dist/esm/icons/eye'
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart'
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up'
import Users from 'lucide-react/dist/esm/icons/users'

const MockLazadaListing = ({ 
  beforeImage, 
  afterImage, 
  product,
  beforeMetrics,
  afterMetrics
}) => {
  const [sliderValue, setSliderValue] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  
  // Additional product images for thumbnails
  const productImages = [
    { before: beforeImage, after: afterImage },
    { before: "/images/portfolio/removebg-before.jpg", after: "/images/portfolio/removebg-after.jpg" },
    { before: "/images/portfolio/infographic-02-before.jpg", after: "/images/portfolio/infographic-02-after.jpg" },
    { before: "/images/portfolio/bulk-resizing-before.jpg", after: "/images/portfolio/bulk-resizing-after.jpg" },
    { before: "/images/portfolio/edit-sales-ad-before.jpg", after: "/images/portfolio/edit-sales-ad-after.jpg" }
  ]

  // Calculate current metrics based on slider position
  const currentMetrics = {
    views: Math.round(beforeMetrics.views + (afterMetrics.views - beforeMetrics.views) * (sliderValue / 100)),
    ctr: (beforeMetrics.ctr + (afterMetrics.ctr - beforeMetrics.ctr) * (sliderValue / 100)).toFixed(1),
    sales: Math.round(beforeMetrics.sales + (afterMetrics.sales - beforeMetrics.sales) * (sliderValue / 100)),
    revenue: Math.round(beforeMetrics.revenue + (afterMetrics.revenue - beforeMetrics.revenue) * (sliderValue / 100)),
    ranking: Math.round(beforeMetrics.ranking + (afterMetrics.ranking - beforeMetrics.ranking) * (sliderValue / 100))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mock Lazada Listing Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Lazada Header Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-white font-bold text-lg">lazada</div>
              <div className="bg-white/20 text-white text-xs px-2 py-1 rounded">SG</div>
            </div>
            <div className="text-white text-sm">Search: "wireless headphones"</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image with Interactive Slider */}
          <div className="relative">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              {/* Before Image */}
              <img 
                src={productImages[activeImage].before}
                alt="Before editing"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  clipPath: sliderValue > 50 ? `inset(0 ${100 - sliderValue}% 0 0)` : 'inset(0 50% 0 0)'
                }}
              />
              {/* After Image */}
              <img 
                src={productImages[activeImage].after}
                alt="After editing"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  clipPath: sliderValue > 50 ? `inset(0 0 0 ${sliderValue}%)` : 'inset(0 0 0 50%)'
                }}
              />
              
              {/* Slider Control */}
              <div className="absolute inset-x-0 bottom-4">
                <div className="mx-4">
                  <div className="flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 mb-2">
                    <span>Before</span>
                    <span>After</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${sliderValue}%, rgba(255,255,255,0.3) ${sliderValue}%, rgba(255,255,255,0.3) 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 space-y-1">
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded">Flash Sale</div>
                {sliderValue > 50 && (
                  <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded">LazChoice</div>
                )}
              </div>

              {/* Favorite Button */}
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Additional Images Thumbnails */}
            <div className="flex space-x-2 mt-3">
              {productImages.slice(0, 4).map((image, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded border-2 cursor-pointer overflow-hidden transition-all ${
                    activeImage === i 
                      ? 'border-orange-500 ring-2 ring-orange-500/20' 
                      : 'border-gray-300 hover:border-orange-400'
                  }`}
                >
                  <img 
                    src={sliderValue > 50 ? image.after : image.before}
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
                <span className="text-sm text-gray-500">• {currentMetrics.views} sold</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-red-500">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">${(parseFloat(product.price.replace('$', '')) + 10).toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">-25%</span>
              </div>
              <div className="text-sm text-gray-600">Free Shipping • Min. spend $40</div>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{product.seller}</div>
                  <div className="text-sm text-gray-600">
                    {sliderValue > 50 ? '98.5% Positive' : '94.2% Positive'} • 
                    {sliderValue > 50 ? 'LazMall' : 'Regular Seller'}
                  </div>
                </div>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50">
                  View Shop
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors">
                Add to Cart
              </button>
              <button className="w-full border-2 border-orange-500 text-orange-500 py-3 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Performance Metrics Bar */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-t p-4">
          <div className="flex items-center justify-between text-center">
            <div className="flex-1">
              <div className="flex items-center justify-center text-violet-600 mb-1">
                <Eye className="w-4 h-4 mr-1" />
                <span className="font-semibold">{currentMetrics.views.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-600">Views</div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-center text-violet-600 mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="font-semibold">{currentMetrics.ctr}%</span>
              </div>
              <div className="text-xs text-gray-600">CTR</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-center text-violet-600 mb-1">
                <ShoppingCart className="w-4 h-4 mr-1" />
                <span className="font-semibold">{currentMetrics.sales}</span>
              </div>
              <div className="text-xs text-gray-600">Sales</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-center text-violet-600 mb-1">
                <span className="font-semibold">${currentMetrics.revenue}</span>
              </div>
              <div className="text-xs text-gray-600">Revenue</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-center text-violet-600 mb-1">
                <span className="font-semibold">#{currentMetrics.ranking}</span>
              </div>
              <div className="text-xs text-gray-600">Ranking</div>
            </div>
          </div>
        </div>

        {/* Performance Improvement Indicators */}
        {sliderValue > 75 && (
          <div className="bg-green-50 border-t p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="text-green-600">
                <div className="font-bold text-lg">+340%</div>
                <div className="text-xs">Views Increase</div>
              </div>
              <div className="text-green-600">
                <div className="font-bold text-lg">+2.3x</div>
                <div className="text-xs">Conversion Rate</div>
              </div>
              <div className="text-green-600">
                <div className="font-bold text-lg">+156%</div>
                <div className="text-xs">Revenue Boost</div>
              </div>
              <div className="text-green-600">
                <div className="font-bold text-lg">Top 10</div>
                <div className="text-xs">Search Ranking</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">👆 Drag the slider</span> to see how professional images transform your Lazada listing performance
        </p>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}

export default MockLazadaListing