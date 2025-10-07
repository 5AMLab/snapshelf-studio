// Categorized FAQ data for help center
export const GETTING_STARTED_FAQ = [
  {
    id: 'design-experience',
    question: "Do I need any design experience?",
    answer: (
      <div>
        <p className="mb-3"><strong>Not at all! We welcome complete beginners.</strong></p>
        <p className="mb-2">Many clients have never used design software before. Our service is built for busy business owners who want professional results without the learning curve.</p>
        <p className="mb-2">Simply share your product photos and tell us your goals. We'll handle everything from concept to final delivery.</p>
        <p className="mt-3 text-purple-600 font-medium">We handle all technical details, platform specs, and design expertise.</p>
      </div>
    )
  },
  {
    id: 'getting-started',
    question: "How do I get started?",
    answer: (
      <div>
        <p className="mb-3"><strong>Simple 3-step process to get professional designs:</strong></p>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <div>
              <p className="font-semibold text-gray-900">Calculate Your Price</p>
              <p className="text-gray-600 text-sm">Choose quantity and add-ons with automatic volume discounts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <div>
              <p className="font-semibold text-gray-900">Share Your Vision</p>
              <p className="text-gray-600 text-sm">Upload photos and tell us your goals via our simple brief form</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <div>
              <p className="font-semibold text-gray-900">Receive & Launch</p>
              <p className="text-gray-600 text-sm">Get your professional designs delivered on time, ready to use</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-violet-600 font-medium">Ready to transform your product photos? Click "Get Started" to begin!</p>
      </div>
    )
  }
]

export const PRICING_FAQ = [
  {
    id: 'pricing-structure',
    question: "How does your pricing work?",
    answer: (
      <div>
        <p className="mb-3"><strong>Simple pay-per-edit pricing with automatic volume discounts:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Base price:</strong> $18.90 per edit (includes background removal, color correction, crop & resize)</li>
          <li><strong>Volume discounts:</strong> 10-40% off automatically applied</li>
          <li><strong>Add-on services:</strong> Additional marketplaces, complex backgrounds, rush delivery</li>
          <li><strong>No packages:</strong> Order exactly what you need, from 1 to 500+ edits</li>
        </ul>
        <p className="mt-3 text-purple-600 font-medium">Volume discounts: 25+ edits (20% off), 50+ edits (30% off), 100+ edits (40% off)</p>
      </div>
    )
  },
  {
    id: 'pricing-example',
    question: "Can you show me a pricing example?",
    answer: (
      <div>
        <p className="mb-3"><strong>Pricing examples:</strong></p>
        <div className="space-y-3 mb-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">Small Order: 5 edits</p>
            <p className="text-blue-700 text-sm">5 × $18.90 = $94.50 (No volume discount)</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-900 mb-2">Medium Order: 25 edits</p>
            <p className="text-green-700 text-sm">25 × $15.12 = $378.00 (20% volume discount)</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-purple-900 mb-2">Large Order: 100 edits</p>
            <p className="text-purple-700 text-sm">100 × $11.34 = $1,134.00 (40% volume discount)</p>
          </div>
        </div>
        <p className="mt-3 text-purple-600 font-medium">Add-ons available: Extra marketplaces (+$4), Complex backgrounds (+$24.90), Rush delivery (+25%)</p>
      </div>
    )
  },
  {
    id: 'additional-edits',
    question: "Can I add more edits to my order later?",
    answer: (
      <div>
        <p className="mb-3"><strong>Yes! Flexible ordering options:</strong></p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>During active project:</strong> Add more edits at your current volume discount rate</li>
          <li><strong>After project completion:</strong> Place a new order with any quantity (1-500+ edits)</li>
          <li><strong>Volume upgrade:</strong> Increase quantity mid-project to unlock higher volume discounts</li>
        </ul>
        <div className="bg-green-50 p-3 rounded-lg mt-3">
          <p className="text-green-700 text-sm">
            <strong>Pro tip:</strong> Order larger quantities upfront to maximize volume discounts - you can always use credits later.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'bulk-processing',
    question: "What add-on services are available?",
    answer: (
      <div>
        <p className="mb-3"><strong>Optional add-ons to customize your order:</strong></p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">Additional Marketplaces (+$4.00)</p>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li>Optimize for extra platforms (Shopee, Lazada, Amazon, etc.)</li>
              <li>Platform-specific sizing and formatting</li>
              <li>Compliance with each marketplace's requirements</li>
            </ul>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <p className="font-semibold text-emerald-900 mb-2">Complex Background Removal (+$24.90)</p>
            <ul className="list-disc pl-5 space-y-1 text-emerald-700 text-sm">
              <li>Intricate hair, fur, jewelry, or detailed edges</li>
              <li>Complex textures and transparent materials</li>
              <li>Professional hand-tracing for pixel-perfect results</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-purple-900 mb-2">Rush 24h Delivery (+25%)</p>
            <ul className="list-disc pl-5 space-y-1 text-purple-700 text-sm">
              <li>Express delivery within 24 hours</li>
              <li>Perfect for urgent campaigns and last-minute needs</li>
              <li>Priority queue processing</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-purple-600 font-medium">Mix and match add-ons as needed - pricing updates automatically in your cart.</p>
      </div>
    )
  },
  {
    id: 'bulk-savings',
    question: "How much can I save with volume discounts?",
    answer: (
      <div>
        <p className="mb-3"><strong>Automatic volume discounts - the more you order, the more you save:</strong></p>
        <div className="space-y-3 mb-3">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
            <p className="font-semibold text-gray-900 mb-2">1-24 edits: $18.90/edit</p>
            <p className="text-gray-600 text-sm">Standard pricing - great for small batches and testing</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="font-semibold text-blue-900 mb-2">25-49 edits: $15.12/edit (20% off)</p>
            <p className="text-blue-700 text-sm">Medium volume - save $93.60 on a 25-edit order</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <p className="font-semibold text-green-900 mb-2">50-99 edits: $13.23/edit (30% off)</p>
            <p className="text-green-700 text-sm">High volume - save $283.50 on a 50-edit order</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <p className="font-semibold text-purple-900 mb-2">100+ edits: $11.34/edit (40% off)</p>
            <p className="text-purple-700 text-sm">Maximum savings - save $756 on a 100-edit order</p>
          </div>
        </div>
        <p className="text-purple-600 font-medium">Volume discounts apply automatically - no codes needed!</p>
      </div>
    )
  },
  {
    id: 'enterprise-options',
    question: "Do you offer enterprise plans for high-volume clients?",
    answer: (
      <div>
        <p className="mb-3"><strong>Yes! Monthly and annual plans for businesses needing 100+ edits per month:</strong></p>
        <div className="space-y-3 mb-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">Monthly Enterprise Plan</p>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li>$9.99/edit for 100+ edits per month</li>
              <li>24-hour delivery standard</li>
              <li>Dedicated account manager</li>
              <li>Priority support and processing</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-purple-900 mb-2">Annual Enterprise Plan</p>
            <ul className="list-disc pl-5 space-y-1 text-purple-700 text-sm">
              <li>$8.99/edit for 100+ edits per month</li>
              <li>12-hour delivery standard</li>
              <li>Dedicated design team</li>
              <li>Custom workflow integration</li>
            </ul>
          </div>
        </div>
        <p className="text-purple-600 font-medium">Perfect for agencies, large e-commerce stores, and businesses with consistent high-volume needs.</p>
      </div>
    )
  }
]

export const DELIVERY_FAQ = [
  {
    id: 'delivery-time',
    question: "How quickly can you deliver my designs?",
    answer: (
      <div>
        <p className="mb-3"><strong>Guaranteed delivery times based on your package:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Standard (72 hours):</strong> Perfect for planned campaigns</li>
          <li><strong>Priority (48 hours):</strong> For upcoming sales or launches</li>
          <li><strong>Express (24 hours):</strong> Last-minute campaigns and urgent needs</li>
        </ul>
        <p className="mt-3 text-purple-600 font-medium">Rush delivery available for urgent campaigns - contact us for same-day options.</p>
      </div>
    )
  },
  {
    id: 'deliverables',
    question: "What exactly will I receive?",
    answer: (
      <div>
        <p className="mb-3"><strong>Professional marketing materials optimized for your platforms:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>High-resolution files</strong> for print and digital use</li>
          <li><strong>Multiple format options:</strong> JPG, PNG, PDF as needed</li>
          <li><strong>Platform-specific sizes:</strong> Shopee, Lazada, Amazon, Instagram, Facebook</li>
          <li><strong>Source files available</strong> upon request (additional charge may apply)</li>
        </ul>
        <p className="mt-3 text-green-600 font-medium">✓ Full commercial usage rights included with every order</p>
      </div>
    )
  }
]

export const SUPPORT_FAQ = [
  {
    id: 'satisfaction-guarantee',
    question: "What if I'm not satisfied with the results?",
    answer: (
      <div>
        <p className="mb-3"><strong>100% satisfaction guarantee with generous revision policy:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Unlimited minor revisions</strong> (color adjustments, text changes, small tweaks)</li>
          <li><strong>Major revisions included</strong> in your package (complete redesigns if needed)</li>
          <li><strong>Direct communication</strong> with your designer throughout the process</li>
          <li><strong>Preview approvals</strong> before final delivery</li>
        </ul>
        <p className="mt-3 text-emerald-500 font-medium">If we can't achieve your vision after working through your included revisions, we'll part ways with a refund minus our standard project initiation fee—ensuring fair compensation for design time invested.</p>
      </div>
    )
  },
  {
    id: 'platform-support',
    question: "What platforms do you support?",
    answer: (
      <div>
        <p className="mb-3"><strong>We create designs optimized for all major e-commerce platforms:</strong></p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">E-commerce Platforms:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Shopee (banners, thumbnails)</li>
              <li>Lazada (product images, promotions)</li>
              <li>Amazon (listings, A+ content)</li>
              <li>eBay, Etsy, and other marketplaces</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Social Media:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Instagram (posts, stories, reels)</li>
              <li>Facebook (ads, posts, covers)</li>
              <li>TikTok (product showcases)</li>
              <li>YouTube (thumbnails)</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-purple-600 font-medium">Free resizing to all platform specifications included with every order.</p>
      </div>
    )
  },
  {
    id: 'product-photography',
    question: "Do you handle product photography?",
    answer: (
      <div>
        <p className="mb-3"><strong>We specialize in digital design services only.</strong></p>
        <p className="mb-2">You provide the photos (even phone photos work great!), and we transform them into professional marketing materials.</p>
        <p className="mb-2">Our expertise is in taking your existing product images and creating stunning banners, infographics, and promotional materials that drive sales.</p>
        <p className="mt-3 text-purple-600 font-medium">Everything is handled digitally for maximum convenience and speed.</p>
      </div>
    )
  }
]

export const LEGAL_FAQ = [
  {
    id: 'terms-of-service',
    question: "Terms of Service",
    answer: (
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprintix Studio Pte. Ltd. Terms of Service</h3>
        <p className="mb-4 text-gray-700"><strong>Last updated: January 2025</strong></p>
        
        <h4 className="font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h4>
        <p className="mb-4 text-gray-600">
          By using SnapShelf Studio services, you agree to these Terms of Service. If you don't agree with any part of these terms, you may not use our services.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">2. Service Description</h4>
        <p className="mb-4 text-gray-600">
          Sprintix Studio Pte. Ltd. provides professional product photo editing and design services for e-commerce sellers. We transform your product images into high-converting marketing materials optimized for various platforms.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">3. Payment Terms</h4>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>Payment is required upfront before work begins</li>
          <li>We accept major credit cards and PayPal</li>
          <li>All prices are in USD unless otherwise specified</li>
          <li>Refunds are subject to our satisfaction guarantee policy</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">4. Delivery and Revisions</h4>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>Delivery times are guaranteed based on your selected package</li>
          <li>Unlimited minor revisions included in all packages</li>
          <li>Major revisions included per package specifications</li>
          <li>Additional revisions beyond package limits may incur extra charges</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">5. Intellectual Property</h4>
        <p className="mb-4 text-gray-600">
          Upon full payment, you receive full commercial usage rights to the final designs. You retain ownership of your original product images and content provided to us.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">6. Limitation of Liability</h4>
        <p className="mb-4 text-gray-600">
          Sprintix Studio Pte. Ltd.'s liability is limited to the amount paid for services. We are not responsible for any indirect, incidental, or consequential damages.
        </p>
      </div>
    )
  },
  {
    id: 'privacy-policy',
    question: "Privacy Policy", 
    answer: (
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprintix Studio Pte. Ltd. Privacy Policy</h3>
        <p className="mb-4 text-gray-700"><strong>Last updated: January 2025</strong></p>
        
        <h4 className="font-semibold text-gray-900 mb-2">1. Information We Collect</h4>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li><strong>Personal Information:</strong> Name, email address, billing information</li>
          <li><strong>Project Information:</strong> Product images, design briefs, project requirements</li>
          <li><strong>Usage Data:</strong> Website interactions, service usage patterns</li>
          <li><strong>Communication Data:</strong> Messages, feedback, support interactions</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">2. How We Use Your Information</h4>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>Provide and deliver our design services</li>
          <li>Process payments and send receipts</li>
          <li>Communicate about your projects and orders</li>
          <li>Improve our services and user experience</li>
          <li>Send important updates and promotional materials (with your consent)</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">3. Information Sharing</h4>
        <p className="mb-4 text-gray-600">
          We do not sell, trade, or share your personal information with third parties except:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>With your explicit consent</li>
          <li>To provide services (payment processors, cloud storage)</li>
          <li>When required by law or to protect our rights</li>
          <li>In connection with business transfers or mergers</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">4. Data Security</h4>
        <p className="mb-4 text-gray-600">
          We implement industry-standard security measures to protect your information. All data is encrypted in transit and at rest. Access is limited to authorized personnel only.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">5. Your Rights</h4>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>Access and review your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (subject to business requirements)</li>
          <li>Opt-out of marketing communications</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">6. Contact Us</h4>
        <p className="mb-4 text-gray-600">
          For privacy-related questions, contact us at: <a href="mailto:privacy@sprintix.asia" className="text-violet-600 hover:text-violet-700">privacy@sprintix.asia</a>
        </p>
      </div>
    )
  },
  {
    id: 'cookie-policy',
    question: "Cookie Policy",
    answer: (
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprintix Studio Pte. Ltd. Cookie Policy</h3>
        <p className="mb-4 text-gray-700"><strong>Last updated: January 2025</strong></p>
        
        <h4 className="font-semibold text-gray-900 mb-2">1. What Are Cookies</h4>
        <p className="mb-4 text-gray-600">
          Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and understand how you use our services.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">2. Types of Cookies We Use</h4>
        <div className="space-y-3 mb-4">
          <div>
            <p className="font-semibold text-gray-900">Essential Cookies</p>
            <p className="text-gray-600 text-sm">Required for basic website functionality, including security and authentication.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Performance Cookies</p>
            <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website to improve performance.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Functional Cookies</p>
            <p className="text-gray-600 text-sm">Remember your preferences and provide enhanced features.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Marketing Cookies</p>
            <p className="text-gray-600 text-sm">Track your activity across websites to deliver relevant advertising (with your consent).</p>
          </div>
        </div>
        
        <h4 className="font-semibold text-gray-900 mb-2">3. Third-Party Cookies</h4>
        <p className="mb-4 text-gray-600">
          We may use third-party services that set their own cookies:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li><strong>Google Analytics:</strong> Website usage statistics</li>
          <li><strong>Stripe:</strong> Payment processing</li>
          <li><strong>Calendly:</strong> Booking and scheduling</li>
        </ul>
        
        <h4 className="font-semibold text-gray-900 mb-2">4. Managing Cookies</h4>
        <p className="mb-4 text-gray-600">
          You can control cookies through:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-600 space-y-1">
          <li>Browser settings - disable or delete cookies</li>
          <li>Our cookie consent banner - manage preferences</li>
          <li>Opt-out links provided by third-party services</li>
        </ul>
        <p className="mb-4 text-gray-600">
          Note: Disabling essential cookies may affect website functionality.
        </p>
        
        <h4 className="font-semibold text-gray-900 mb-2">5. Updates to This Policy</h4>
        <p className="mb-4 text-gray-600">
          We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.
        </p>
      </div>
    )
  }
]

// Platform-specific FAQ sections
export const PLATFORM_FAQ = [
  {
    id: 'amazon-marketplace-pack',
    question: "What's included in the Amazon Marketplace Pack (SGD $590/SKU)?",
    answer: (
      <div>
        <p className="mb-3"><strong>Complete Amazon listing optimization package:</strong></p>
        <div className="bg-orange-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-orange-900 mb-2">Amazon Listing Pack - SGD $590/SKU includes:</h4>
          <ul className="list-disc pl-5 space-y-1 text-orange-700 text-sm">
            <li><strong>1 compliant main image</strong> - White background, 1000px+, 85% product fill</li>
            <li><strong>5 secondary infographics</strong> - Feature highlights, benefits, comparisons</li>
            <li><strong>2 lifestyle composites</strong> - Real-world usage scenarios</li>
            <li><strong>Bonus A+ header design</strong> - Enhanced brand content module</li>
            <li><strong>Amazon compliance certification</strong> - Guaranteed approval</li>
            <li><strong>72-hour delivery</strong> - Ready for immediate upload</li>
          </ul>
        </div>
        <p className="text-orange-600 font-medium">Perfect for sellers wanting to win the Buy Box with professional, conversion-optimized listings.</p>
      </div>
    )
  },
  {
    id: 'shopify-optimization',
    question: "How do you optimize images for Shopify stores?",
    answer: (
      <div>
        <p className="mb-3"><strong>Shopify-specific optimization focuses on speed and conversion:</strong></p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Speed Optimization</h4>
            <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
              <li>WebP format for 30% smaller file sizes</li>
              <li>Progressive JPEG loading</li>
              <li>Optimized compression without quality loss</li>
              <li>Mobile-first responsive sizing</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Conversion Focus</h4>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li>Product gallery optimization</li>
              <li>Zoom-friendly high resolution</li>
              <li>Consistent brand styling</li>
              <li>Trust-building product shots</li>
            </ul>
          </div>
        </div>
        <p className="text-violet-600 font-medium">Results: Faster page loads + higher conversion rates = more sales.</p>
      </div>
    )
  },
  {
    id: 'lazada-requirements',
    question: "What are Lazada's specific image requirements?",
    answer: (
      <div>
        <p className="mb-3"><strong>Lazada has strict image guidelines we ensure compliance with:</strong></p>
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-red-900 mb-2">Lazada Image Requirements</h4>
          <ul className="list-disc pl-5 space-y-1 text-red-700 text-sm">
            <li><strong>Dimensions:</strong> Minimum 800x800px, recommended 1200x1200px</li>
            <li><strong>Format:</strong> JPG or PNG, maximum 2MB file size</li>
            <li><strong>Main image:</strong> Clean white/neutral background, product centered</li>
            <li><strong>Banner specs:</strong> 1200x400px for store banners</li>
            <li><strong>No text overlay</strong> on main product images</li>
            <li><strong>Professional lighting</strong> - no shadows or reflections</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">We Handle:</h4>
          <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
            <li>Automatic resizing to Lazada specifications</li>
            <li>Background cleanup and standardization</li>
            <li>Quality optimization for fast loading</li>
            <li>Promotional banner creation (separate from main images)</li>
          </ul>
        </div>
        <p className="text-violet-600 font-medium">We guarantee your images will pass Lazada's review process on first submission.</p>
      </div>
    )
  },
  {
    id: 'platform-differences',
    question: "How do you handle different platform requirements simultaneously?",
    answer: (
      <div>
        <p className="mb-3"><strong>We create master designs then optimize for each platform automatically:</strong></p>
        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Step 1: Master Design Creation</p>
            <p className="text-gray-600 text-sm">Create your design in the highest quality format with all elements</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Step 2: Platform Adaptation</p>
            <p className="text-gray-600 text-sm">Automatically resize and optimize for Lazada, Amazon, Shopify, Instagram, etc.</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Step 3: Format Optimization</p>
            <p className="text-gray-600 text-sm">Export in platform-specific formats (WebP for web, PNG for transparency, JPG for compatibility)</p>
          </div>
        </div>
        <p className="text-violet-600 font-medium">You receive a complete package ready for immediate upload to all your selling channels.</p>
      </div>
    )
  }
]

export const SERVICES_FAQ = [
  {
    id: 'catalog-vs-fullservice',
    question: "When should I choose Catalog Processing vs Full-Service?",
    answer: (
      <div>
        <p className="mb-3"><strong>Choose based on your specific needs and budget:</strong></p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-400">
            <h4 className="font-semibold text-emerald-900 mb-2">Choose Catalog Processing If:</h4>
            <ul className="list-disc pl-5 space-y-1 text-emerald-700 text-sm">
              <li>You have 50+ similar products</li>
              <li>Need consistent, clean product shots</li>
              <li>Budget-conscious (up to 64% savings)</li>
              <li>Basic editing: background removal, cropping, color correction</li>
              <li>Standardized e-commerce catalog look</li>
            </ul>
            <p className="text-emerald-800 font-medium mt-2">Price: SGD 7.50-10.90/edit</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-900 mb-2">Choose Full-Service If:</h4>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li>Need creative graphics and infographics</li>
              <li>Want promotional banners and ads</li>
              <li>Require multiple concept variations</li>
              <li>Building brand identity through design</li>
              <li>Complex compositions and layouts</li>
            </ul>
            <p className="text-blue-800 font-medium mt-2">Price: SGD 11.90-18.90/edit</p>
          </div>
        </div>
        <p className="text-violet-600 font-medium">Most clients start with Full-Service for hero products, then use Catalog Processing for inventory expansion.</p>
      </div>
    )
  },
  {
    id: 'background-removal-process',
    question: "What's your background removal process and quality?",
    answer: (
      <div>
        <p className="mb-3"><strong>Professional-grade background removal with pixel-perfect precision:</strong></p>
        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Manual Path Tracing</p>
            <p className="text-gray-600 text-sm">No automated tools - every edge is hand-traced by experienced designers</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Hair & Fine Detail Masking</p>
            <p className="text-gray-600 text-sm">Specialized techniques for complex textures, fur, fabric, and transparent materials</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Quality Control</p>
            <p className="text-gray-600 text-sm">100% zoom inspection, color fringing removal, edge refinement</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">What You Get:</h4>
          <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
            <li><strong>PNG with transparency</strong> - Use on any background</li>
            <li><strong>White background version</strong> - Platform compliance</li>
            <li><strong>Custom background options</strong> - Colors, gradients, patterns</li>
            <li><strong>Multiple formats</strong> - PNG, JPG, WebP as needed</li>
          </ul>
        </div>
        <p className="text-violet-600 font-medium">Result: Clean, professional product shots that look like they were photographed in a studio.</p>
      </div>
    )
  },
  {
    id: 'bulk-processing-workflow',
    question: "How does bulk processing work for large catalogs?",
    answer: (
      <div>
        <p className="mb-3"><strong>Streamlined workflow designed for high-volume efficiency:</strong></p>
        <div className="space-y-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold text-blue-900 mb-1">1. Batch Upload & Organization</p>
            <p className="text-blue-700 text-sm">Secure cloud upload, automatic file naming, categorization by product type</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold text-blue-900 mb-1">2. Style Guide Creation</p>
            <p className="text-blue-700 text-sm">Establish consistent editing rules based on your first few samples</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold text-blue-900 mb-1">3. Parallel Processing</p>
            <p className="text-blue-700 text-sm">Multiple designers work simultaneously following your approved style guide</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="font-semibold text-blue-900 mb-1">4. Quality Control & Delivery</p>
            <p className="text-blue-700 text-sm">Batch review, consistent naming, organized folder delivery</p>
          </div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h4 className="font-semibold text-emerald-900 mb-2">Volume Discounts:</h4>
          <ul className="list-disc pl-5 space-y-1 text-emerald-700 text-sm">
            <li><strong>50-100 images:</strong> 48-58% savings</li>
            <li><strong>100-200 images:</strong> 58-64% savings</li>
            <li><strong>200+ images:</strong> Custom enterprise pricing</li>
          </ul>
        </div>
        <p className="text-violet-600 font-medium">Turnaround: 3-7 business days depending on volume and complexity.</p>
      </div>
    )
  },
  {
    id: 'photo-editing-techniques',
    question: "What photo editing techniques do you use?",
    answer: (
      <div>
        <p className="mb-3"><strong>Professional editing techniques to make your products irresistible:</strong></p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Color & Lighting:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              <li>Color temperature adjustment</li>
              <li>Exposure and contrast optimization</li>
              <li>Highlight/shadow recovery</li>
              <li>Vibrance and saturation enhancement</li>
              <li>White balance correction</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Detail Enhancement:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              <li>Sharpening and clarity adjustment</li>
              <li>Noise reduction</li>
              <li>Texture enhancement</li>
              <li>Spot and blemish removal</li>
              <li>Surface reflection control</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Product Presentation:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              <li>Perspective correction</li>
              <li>Product alignment and centering</li>
              <li>Shadow creation and removal</li>
              <li>Background replacement</li>
              <li>Multi-angle composition</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Creative Elements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              <li>Text overlay and graphics</li>
              <li>Promotional badges</li>
              <li>Brand logo integration</li>
              <li>Infographic elements</li>
              <li>Call-to-action buttons</li>
            </ul>
          </div>
        </div>
        <p className="text-violet-600 font-medium">We use Adobe Creative Suite (Photoshop, Lightroom) with custom actions for consistent, professional results.</p>
      </div>
    )
  }
]

export const TECHNICAL_FAQ = [
  {
    id: 'file-formats-accepted',
    question: "What file formats do you accept and deliver?",
    answer: (
      <div>
        <p className="mb-3"><strong>We accept virtually any image format and deliver optimized files:</strong></p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Accepted Formats:</h4>
            <ul className="list-disc pl-5 space-y-1 text-green-700 text-sm">
              <li><strong>Photos:</strong> JPG, PNG, TIFF, RAW, HEIC</li>
              <li><strong>Graphics:</strong> PSD, AI, SVG, PDF</li>
              <li><strong>Mobile:</strong> iPhone/Android photos</li>
              <li><strong>Professional:</strong> Camera RAW files</li>
              <li><strong>Maximum size:</strong> 50MB per file</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Delivered Formats:</h4>
            <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
              <li><strong>Web optimized:</strong> JPG, PNG, WebP</li>
              <li><strong>Print ready:</strong> High-res TIFF, PDF</li>
              <li><strong>Transparent:</strong> PNG with alpha channel</li>
              <li><strong>Platform specific:</strong> Exact specs for each platform</li>
              <li><strong>Source files:</strong> PSD available on request</li>
            </ul>
          </div>
        </div>
        <p className="text-violet-600 font-medium">Don't have high-quality photos? Even smartphone photos can be transformed into professional marketing materials.</p>
      </div>
    )
  },
  {
    id: 'image-resolution-requirements',
    question: "What resolution should my original photos be?",
    answer: (
      <div>
        <p className="mb-3"><strong>Higher resolution = better results, but we work with what you have:</strong></p>
        <div className="space-y-3 mb-4">
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
            <p className="font-semibold text-green-900 mb-1">Ideal: 2000x2000px or higher</p>
            <p className="text-green-700 text-sm">Professional camera quality - allows for maximum flexibility and detail</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
            <p className="font-semibold text-yellow-900 mb-1">Good: 1200x1200px minimum</p>
            <p className="text-yellow-700 text-sm">Smartphone quality - works well for most editing and platform requirements</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
            <p className="font-semibold text-orange-900 mb-1">Workable: 800x800px</p>
            <p className="text-orange-700 text-sm">Lower quality but still usable for basic edits and smaller formats</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What We Can Do With Lower Resolution:</h4>
          <ul className="list-disc pl-5 space-y-1 text-blue-700 text-sm">
            <li>AI upscaling to increase resolution</li>
            <li>Optimize for specific platform sizes</li>
            <li>Focus on color and lighting improvements</li>
            <li>Creative compositions to minimize quality issues</li>
          </ul>
        </div>
        <p className="text-violet-600 font-medium">We'll always let you know upfront if image quality might limit certain editing options.</p>
      </div>
    )
  },
  {
    id: 'brand-guidelines',
    question: "Can you work with our existing brand guidelines?",
    answer: (
      <div>
        <p className="mb-3"><strong>Absolutely! We integrate seamlessly with your brand identity:</strong></p>
        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Brand Assets We Work With:</p>
            <p className="text-gray-600 text-sm">Logos, color palettes, fonts, style guides, existing templates</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Consistency Across Platforms:</p>
            <p className="text-gray-600 text-sm">Maintain brand identity while optimizing for each platform's specific requirements</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900 mb-1">Brand Guideline Creation:</p>
            <p className="text-gray-600 text-sm">Don't have guidelines? We can help establish consistent visual standards</p>
          </div>
        </div>
        <div className="bg-violet-50 p-4 rounded-lg">
          <h4 className="font-semibold text-violet-900 mb-2">What To Provide:</h4>
          <ul className="list-disc pl-5 space-y-1 text-violet-700 text-sm">
            <li><strong>Logo files:</strong> High-res PNG/SVG versions</li>
            <li><strong>Color codes:</strong> Hex codes, Pantone colors, RGB values</li>
            <li><strong>Fonts:</strong> Brand font files or closest web-safe alternatives</li>
            <li><strong>Style preferences:</strong> Examples of layouts you like/dislike</li>
            <li><strong>Existing materials:</strong> Current designs for reference</li>
          </ul>
        </div>
        <p className="text-violet-600 font-medium">We create custom templates ensuring all future designs maintain perfect brand consistency.</p>
      </div>
    )
  }
]

// Streamlined FAQ data for homepage (conversion-focused)
export const HOMEPAGE_FAQ = [
  {
    id: 'getting-started',
    question: "How do I get started?",
    answer: (
      <div>
        <p className="mb-3"><strong>Simple 3-step process to get professional designs:</strong></p>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <div>
              <p className="font-semibold text-gray-900">Calculate Your Price</p>
              <p className="text-gray-600 text-sm">Choose quantity and add-ons with automatic volume discounts</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <div>
              <p className="font-semibold text-gray-900">Share Your Vision</p>
              <p className="text-gray-600 text-sm">Upload photos and tell us your goals via our simple brief form</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <div>
              <p className="font-semibold text-gray-900">Receive & Launch</p>
              <p className="text-gray-600 text-sm">Get your professional designs delivered on time, ready to use</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-violet-600 font-medium">Ready to transform your product photos? Click "Get Started" to begin!</p>
      </div>
    )
  },
  {
    id: 'design-experience',
    question: "Do I need any design experience?",
    answer: (
      <div>
        <p className="mb-3"><strong>Not at all! We welcome complete beginners.</strong></p>
        <p className="mb-2">Many clients have never used design software before. Our service is built for busy business owners who want professional results without the learning curve.</p>
        <p className="mb-2">Simply share your product photos and tell us your goals. We'll handle everything from concept to final delivery.</p>
        <p className="mt-3 text-purple-600 font-medium">We handle all technical details, platform specs, and design expertise.</p>
      </div>
    )
  },
  {
    id: 'delivery-time',
    question: "How quickly can you deliver my designs?",
    answer: (
      <div>
        <p className="mb-3"><strong>Guaranteed delivery times based on your package:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Standard (72 hours):</strong> Perfect for planned campaigns</li>
          <li><strong>Priority (48 hours):</strong> For upcoming sales or launches</li>
          <li><strong>Express (24 hours):</strong> Last-minute campaigns and urgent needs</li>
        </ul>
        <p className="mt-3 text-purple-600 font-medium">Rush delivery available for urgent campaigns - contact us for same-day options.</p>
      </div>
    )
  },
  {
    id: 'pricing-structure',
    question: "How does your pricing work?",
    answer: (
      <div>
        <p className="mb-3"><strong>Simple pay-per-edit pricing with automatic volume discounts:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Base price:</strong> $18.90 per edit (includes background removal, color correction, crop & resize)</li>
          <li><strong>Volume discounts:</strong> 10-40% off automatically applied</li>
          <li><strong>Add-on services:</strong> Additional marketplaces, complex backgrounds, rush delivery</li>
          <li><strong>No packages:</strong> Order exactly what you need, from 1 to 500+ edits</li>
        </ul>
        <p className="mt-3 text-purple-600 font-medium">Volume discounts: 25+ edits (20% off), 50+ edits (30% off), 100+ edits (40% off)</p>
      </div>
    )
  },
  {
    id: 'deliverables',
    question: "What exactly will I receive?",
    answer: (
      <div>
        <p className="mb-3"><strong>Professional marketing materials optimized for your platforms:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>High-resolution files</strong> for print and digital use</li>
          <li><strong>Multiple format options:</strong> JPG, PNG, PDF as needed</li>
          <li><strong>Platform-specific sizes:</strong> Shopee, Lazada, Amazon, Instagram, Facebook</li>
          <li><strong>Source files available</strong> upon request (additional charge may apply)</li>
        </ul>
        <p className="mt-3 text-green-600 font-medium">✓ Full commercial usage rights included with every order</p>
      </div>
    )
  },
  {
    id: 'platform-support',
    question: "What platforms do you support?",
    answer: (
      <div>
        <p className="mb-3"><strong>We create designs optimized for all major e-commerce platforms:</strong></p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-900 mb-2">E-commerce Platforms:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Shopee (banners, thumbnails)</li>
              <li>Lazada (product images, promotions)</li>
              <li>Amazon (listings, A+ content)</li>
              <li>eBay, Etsy, and other marketplaces</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Social Media:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Instagram (posts, stories, reels)</li>
              <li>Facebook (ads, posts, covers)</li>
              <li>TikTok (product showcases)</li>
              <li>YouTube (thumbnails)</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-purple-600 font-medium">Free resizing to all platform specifications included with every order.</p>
      </div>
    )
  },
  {
    id: 'satisfaction-guarantee',
    question: "What if I'm not satisfied with the results?",
    answer: (
      <div>
        <p className="mb-3"><strong>100% satisfaction guarantee with generous revision policy:</strong></p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Unlimited minor revisions</strong> (color adjustments, text changes, small tweaks)</li>
          <li><strong>Major revisions included</strong> in your package (complete redesigns if needed)</li>
          <li><strong>Direct communication</strong> with your designer throughout the process</li>
          <li><strong>Preview approvals</strong> before final delivery</li>
        </ul>
        <p className="mt-3 text-emerald-500 font-medium">If we can't achieve your vision after working through your included revisions, we'll part ways with a refund minus our standard project initiation fee—ensuring fair compensation for design time invested.</p>
      </div>
    )
  },
  {
    id: 'additional-edits',
    question: "Can I add more edits to my order later?",
    answer: (
      <div>
        <p className="mb-3"><strong>Yes! Flexible ordering options:</strong></p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>During active project:</strong> Add more edits at your current volume discount rate</li>
          <li><strong>After project completion:</strong> Place a new order with any quantity (1-500+ edits)</li>
          <li><strong>Volume upgrade:</strong> Increase quantity mid-project to unlock higher volume discounts</li>
        </ul>
        <div className="bg-green-50 p-3 rounded-lg mt-3">
          <p className="text-green-700 text-sm">
            <strong>Pro tip:</strong> Order larger quantities upfront to maximize volume discounts - you can always use credits later.
          </p>
        </div>
      </div>
    )
  }
]

// Combined FAQ data for general use (kept for backward compatibility)
export const FAQ_DATA = HOMEPAGE_FAQ