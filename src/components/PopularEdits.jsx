import React from 'react'
import BeforeAfterSlider from './BeforeAfterSlider'

const PopularEdits = () => {
  return (
    <section id="portfolio" className="p-2 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-2">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-pretty sm:text-4xl font-bold text-violet-950 mb-4 pb-4">
            Popular Edits
          </h2>
          <p className="text-2xl text-pretty text-violet-950 tracking-[.0015em] px-4 max-w-3xl mx-auto">
            Professional editing services to make your products stand out
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-8xl">
          {/* Touch-up product photos */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/touch-up-v2-after.jpg"
              afterImage="/images/portfolio/touch-up-v2-before.jpg"
              beforeAlt="Dull product photo before touch-up"
              afterAlt="Enhanced product photo after professional touch-up"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Touch-up Product Photos</h3>
              <p className="text-gray-600 text-sm">Professional retouching to enhance your product photos with color correction and detail enhancement</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Professional Quality</span>
                <span className="text-blue-600 font-medium">Quick Turnaround</span>
              </div>
            </div>
          </div>

          {/* Remove backgrounds */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/removebg-01-after.jpg"
              afterImage="/images/portfolio/removebg-01-before.jpg"
              beforeAlt="Product photo with messy background"
              afterAlt="Product photo with clean white background"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Remove Background</h3>
              <p className="text-gray-600 text-sm">Clean, background removal to make your products stand out with crisp edges</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Clean Results</span>
                <span className="text-purple-600 font-medium">White/Colour BG</span>
                <span className="text-orange-400 font-medium">.png file</span>
              </div>
            </div>
          </div>

          {/* Cropping images */}
          <div className="bg-white rounded-2xl overflow-hidden ">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/bulk-resizing-after.jpg"
              afterImage="/images/portfolio/bulk-resizing-before.jpg"
              beforeAlt="Single product image"
              afterAlt="Multiple platform-optimized sizes"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cropping/Resizing Images </h3>
              <p className="text-gray-600 text-sm">Crop multiple images to platform-specific dimensions with optimal quality</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Web-Optimise</span>
                <span className="text-blue-600 font-medium">WebP/JPEG</span>
                <span className="text-blue-600 font-medium">All Platforms</span>
              </div>
            </div>
          </div>
          
          {/* Design infographics */}
          <div className="bg-white rounded-2xl border border-violet-200 overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/infographic-02-after.jpg"
              afterImage="/images/portfolio/infographic-02-before.jpg"
              beforeAlt="Plain product photo"
              afterAlt="Data-rich product infographic"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Infographic</h3>
              <p className="text-gray-600 text-sm">Professional infographic design to showcase product features, benefits, and comparisons</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Data-Driven</span>
                <span className="text-blue-600 font-medium">Engaging Design</span>
              </div>
            </div>
          </div>

          {/* Banner Design */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/banner-after.gif"
              afterImage="/images/portfolio/gifbanner-before.jpg"
              beforeAlt="Basic product photo"
              afterAlt="Professional branded banner"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Animated GIF</h3>
              <p className="text-gray-600 text-sm">Add motion to your marketing with looping GIF banners that highlight key features, pricing flashes, and limited-time offers. We size and compress each file for Lazada, Amazon, and Instagram, guaranteeing quick load times and extra eye-catching scroll-stops.</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Data-Driven</span>
                <span className="text-blue-600 font-medium">Engaging Design</span>
              </div>
            </div>
          </div>

          {/* CreativeAd */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/portfolio/edit-sales-ad-after.jpg"
              afterImage="/images/portfolio/edit-sales-ad-before.jpg"
              beforeAlt="Standard product photo"
              afterAlt="Eye-catching ad creative"
              className="rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Sales Ads</h3>
              <p className="text-gray-600 text-sm">Turn your product photos into scroll-stopping ad creatives—perfectly sized for Lazada Sponsored Ads, Amazon Sponsored Brands, and Instagram feed & story placements—so your campaigns grab attention and drive clicks fast.</p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="text-green-600 font-medium">Data-Driven</span>
                <span className="text-blue-600 font-medium">Engaging Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularEdits